import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { Video, Product } from '@shared/schema';
import { Plus, Edit, Trash2, Upload, Eye, Play, Film } from 'lucide-react';

export default function VideoManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productId: '',
    videoFile: null as File | null,
    thumbnailFile: null as File | null,
    isFeatured: false,
    isActive: true,
    displayOrder: 0,
  });

  // Fetch videos
  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
    queryFn: async () => {
      const response = await fetch('/api/videos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },
    enabled: !!token,
  });

  // Fetch products for dropdown
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
    enabled: !!token,
  });

  // Create/Update video mutation
  const saveVideoMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const url = editingVideo ? `/api/videos/${editingVideo.id}` : '/api/videos';
      const method = editingVideo ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: data,
      });
      
      if (!response.ok) throw new Error(`Failed to ${editingVideo ? 'update' : 'create'} video`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Video ${editingVideo ? 'updated' : 'created'} successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${editingVideo ? 'update' : 'create'} video`,
        variant: "destructive",
      });
    },
  });

  // Delete video mutation
  const deleteVideoMutation = useMutation({
    mutationFn: async (videoId: string) => {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete video');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Video deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete video",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.productId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!editingVideo && !formData.videoFile) {
      toast({
        title: "Error", 
        description: "Please select a video file",
        variant: "destructive",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('productId', formData.productId);
    formDataToSend.append('isFeatured', formData.isFeatured.toString());
    formDataToSend.append('isActive', formData.isActive.toString());
    formDataToSend.append('displayOrder', formData.displayOrder.toString());
    
    if (formData.videoFile) {
      formDataToSend.append('video', formData.videoFile);
    }
    if (formData.thumbnailFile) {
      formDataToSend.append('thumbnail', formData.thumbnailFile);
    }

    saveVideoMutation.mutate(formDataToSend);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      productId: '',
      videoFile: null,
      thumbnailFile: null,
      isFeatured: false,
      isActive: true,
      displayOrder: 0,
    });
    setEditingVideo(null);
    setIsFormOpen(false);
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      productId: video.productId,
      videoFile: null,
      thumbnailFile: null,
      isFeatured: video.isFeatured,
      isActive: video.isActive,
      displayOrder: video.displayOrder,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (videoId: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      deleteVideoMutation.mutate(videoId);
    }
  };

  if (videosLoading) {
    return <div>Loading videos...</div>;
  }

  return (
    <div className="space-y-6" data-testid="video-management">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Video Management</h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-amber-600 hover:bg-amber-700"
          data-testid="button-add-video"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>

      {/* Video Form */}
      {isFormOpen && (
        <Card data-testid="video-form">
          <CardHeader>
            <CardTitle>
              {editingVideo ? 'Edit Video' : 'Add New Video'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter video title"
                    required
                    data-testid="input-video-title"
                  />
                </div>

                <div>
                  <Label htmlFor="productId">Associated Product *</Label>
                  <Select 
                    value={formData.productId} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, productId: value }))}
                  >
                    <SelectTrigger data-testid="select-product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter video description"
                  rows={3}
                  data-testid="textarea-video-description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="videoFile">Video File {!editingVideo && '*'}</Label>
                  <Input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, videoFile: e.target.files?.[0] || null }))}
                    data-testid="input-video-file"
                  />
                  {editingVideo && (
                    <p className="text-sm text-gray-500 mt-1">Leave empty to keep current video</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="thumbnailFile">Thumbnail Image</Label>
                  <Input
                    id="thumbnailFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnailFile: e.target.files?.[0] || null }))}
                    data-testid="input-thumbnail-file"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    min="0"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                    data-testid="input-display-order"
                  />
                </div>

                <div className="flex items-center space-x-3 p-2 min-h-[44px]">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                    data-testid="switch-featured"
                    className="data-[state=checked]:bg-amber-600 data-[state=unchecked]:bg-gray-300"
                  />
                  <Label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">Featured</Label>
                </div>

                <div className="flex items-center space-x-3 p-2 min-h-[44px]">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    data-testid="switch-active"
                    className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
                  />
                  <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Active</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit"
                  disabled={saveVideoMutation.isPending}
                  data-testid="button-save-video"
                >
                  {saveVideoMutation.isPending ? 'Saving...' : editingVideo ? 'Update' : 'Create'} Video
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Videos List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-8">
              <Film className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No videos uploaded yet</p>
              <p className="text-sm text-gray-400">Add your first video to get started</p>
            </CardContent>
          </Card>
        ) : (
          videos.map((video) => (
            <Card key={video.id} data-testid={`video-card-${video.id}`}>
              <CardContent className="p-4">
                {/* Video Preview */}
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  {video.thumbnailUrl ? (
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Thumbnail failed to load:', video.thumbnailUrl);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gray-200">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Play className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <h3 className="font-semibold mb-1" data-testid="video-title">
                  {video.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-2" data-testid="video-description">
                  {video.description || 'No description'}
                </p>

                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.viewCount} views
                  </span>
                  {video.isFeatured && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  {!video.isActive && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Associated Product */}
                {video.product && (
                  <p className="text-xs text-gray-500 mb-3">
                    Product: {video.product.name}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(video)}
                    data-testid={`button-edit-${video.id}`}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(video.id)}
                    disabled={deleteVideoMutation.isPending}
                    data-testid={`button-delete-${video.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  {video.videoUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(video.videoUrl, '_blank')}
                      data-testid={`button-view-${video.id}`}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}