import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Bell, Send, Eye, Settings, Plus, Trash2, Edit, CheckCircle, XCircle, AlertCircle, Loader, User, MessageSquare } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface NotificationService {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  services: {
    sendgrid: boolean;
    twilio: boolean;
  };
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  emailSubject?: string;
  emailHtmlTemplate?: string;
  smsTemplate?: string;
  whatsappTemplate?: string;
  whatsappMediaUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Notification {
  id: string;
  userId?: string;
  sessionId?: string;
  templateId?: string;
  type: string;
  channel: string;
  recipientEmail?: string;
  recipientPhone?: string;
  recipientName?: string;
  subject?: string;
  textContent?: string;
  htmlContent?: string;
  mediaUrl?: string;
  orderId?: string;
  productId?: string;
  campaignId?: string;
  status: string;
  externalId?: string;
  errorMessage?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  createdAt: Date;
}

interface SendNotificationRequest {
  type: string;
  channels: ('email' | 'sms' | 'whatsapp')[];
  recipientEmail?: string;
  recipientPhone?: string;
  recipientName?: string;
  subject?: string;
  message: string;
  templateId?: string;
  templateVariables?: Record<string, any>;
}

export default function AdminNotifications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch notification service status
  const { data: serviceStatus, isLoading: statusLoading } = useQuery<NotificationService>({
    queryKey: ['/api/notifications/status'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Fetch all notifications
  const { data: notifications, isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ['/api/notifications'],
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  // Fetch notification templates
  const { data: templates, isLoading: templatesLoading } = useQuery<NotificationTemplate[]>({
    queryKey: ['/api/notification-templates']
  });

  // Initialize sample templates mutation
  const initTemplatesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/notifications/init-templates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to initialize templates');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Templates Initialized",
        description: "Sample notification templates have been created successfully."
      });
      queryClient.invalidateQueries({ queryKey: ['/api/notification-templates'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to initialize templates",
        variant: "destructive"
      });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Loader className="w-4 h-4 animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return '📧';
      case 'sms':
        return '📱';
      case 'whatsapp':
        return '💬';
      default:
        return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50" data-testid="admin-notifications-page">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center" data-testid="page-title">
            <Bell className="mr-3 text-amber-600" />
            Notification Management
          </h1>
          <p className="text-gray-600" data-testid="page-description">
            Manage customer notifications, templates, and communication preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
            <TabsTrigger value="templates" data-testid="tab-templates">Templates</TabsTrigger>
            <TabsTrigger value="send" data-testid="tab-send">Send Message</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6" data-testid="overview-content">
            {/* Service Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2" />
                  Service Status
                </CardTitle>
                <CardDescription>Current status of notification services</CardDescription>
              </CardHeader>
              <CardContent>
                {statusLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-amber-600" />
                  </div>
                ) : serviceStatus ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📧</span>
                        <span className="font-medium">Email</span>
                      </div>
                      <Badge className={serviceStatus.email ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {serviceStatus.email ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📱</span>
                        <span className="font-medium">SMS</span>
                      </div>
                      <Badge className={serviceStatus.sms ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {serviceStatus.sms ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💬</span>
                        <span className="font-medium">WhatsApp</span>
                      </div>
                      <Badge className={serviceStatus.whatsapp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {serviceStatus.whatsapp ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Unable to load service status</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Latest 10 notifications sent</CardDescription>
              </CardHeader>
              <CardContent>
                {notificationsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-amber-600" />
                  </div>
                ) : notifications && notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.slice(0, 10).map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <span className="text-xl">{getChannelIcon(notification.channel)}</span>
                          <div>
                            <p className="font-medium">{notification.recipientName || 'Unknown'}</p>
                            <p className="text-sm text-gray-600">{notification.type} • {notification.channel}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(notification.status)}>
                            {getStatusIcon(notification.status)}
                            <span className="ml-1">{notification.status}</span>
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No notifications found</p>
                )}
              </CardContent>
            </Card>

            {/* Initialize Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Setup</CardTitle>
                <CardDescription>Initialize sample notification templates for common use cases</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => initTemplatesMutation.mutate()}
                  disabled={initTemplatesMutation.isPending}
                  className="bg-amber-600 hover:bg-amber-700"
                  data-testid="button-init-templates"
                >
                  {initTemplatesMutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Creating Templates...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Initialize Sample Templates
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  This will create templates for order updates, product launches, and marketing campaigns.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" data-testid="notifications-content">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>Complete notification history</CardDescription>
              </CardHeader>
              <CardContent>
                {notificationsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-amber-600" />
                  </div>
                ) : notifications && notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <Card key={notification.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <span className="text-2xl">{getChannelIcon(notification.channel)}</span>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{notification.recipientName || 'Unknown Recipient'}</h4>
                                <Badge variant="outline">{notification.type}</Badge>
                                <Badge className={getStatusColor(notification.status)}>
                                  {getStatusIcon(notification.status)}
                                  <span className="ml-1">{notification.status}</span>
                                </Badge>
                              </div>
                              
                              {notification.recipientEmail && (
                                <p className="text-sm text-gray-600">📧 {notification.recipientEmail}</p>
                              )}
                              {notification.recipientPhone && (
                                <p className="text-sm text-gray-600">📱 {notification.recipientPhone}</p>
                              )}
                              
                              {notification.subject && (
                                <p className="text-sm font-medium mt-2">{notification.subject}</p>
                              )}
                              
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {notification.textContent}
                              </p>
                              
                              {notification.errorMessage && (
                                <p className="text-sm text-red-600 mt-2">
                                  Error: {notification.errorMessage}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right text-sm text-gray-500">
                            <p>{new Date(notification.createdAt).toLocaleString()}</p>
                            {notification.sentAt && (
                              <p>Sent: {new Date(notification.sentAt).toLocaleString()}</p>
                            )}
                            {notification.deliveredAt && (
                              <p>Delivered: {new Date(notification.deliveredAt).toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No notifications found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" data-testid="templates-content">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>Manage reusable notification templates</CardDescription>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700" data-testid="button-create-template">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create Notification Template</DialogTitle>
                      <DialogDescription>
                        Create a reusable template for notifications
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="template-name">Template Name</Label>
                          <Input id="template-name" placeholder="e.g., order_shipped" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="template-type">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="order_update">Order Update</SelectItem>
                              <SelectItem value="product_launch">Product Launch</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="welcome">Welcome</SelectItem>
                              <SelectItem value="reminder">Reminder</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="template-description">Description</Label>
                        <Input id="template-description" placeholder="Brief description of this template" />
                      </div>
                      
                      <Tabs defaultValue="email" className="w-full">
                        <TabsList>
                          <TabsTrigger value="email">Email</TabsTrigger>
                          <TabsTrigger value="sms">SMS</TabsTrigger>
                          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email-subject">Email Subject</Label>
                            <Input id="email-subject" placeholder="e.g., Your Order {{orderId}} has been shipped!" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email-content">Email HTML Content</Label>
                            <Textarea 
                              id="email-content" 
                              placeholder="HTML email template with variables like {{customerName}}, {{orderId}}, etc."
                              className="min-h-[200px]"
                            />
                          </div>
                        </TabsContent>
                        <TabsContent value="sms" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="sms-content">SMS Template</Label>
                            <Textarea 
                              id="sms-content" 
                              placeholder="SMS message template (max 160 chars recommended)"
                              className="min-h-[100px]"
                            />
                          </div>
                        </TabsContent>
                        <TabsContent value="whatsapp" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="whatsapp-content">WhatsApp Template</Label>
                            <Textarea 
                              id="whatsapp-content" 
                              placeholder="WhatsApp message template with formatting"
                              className="min-h-[150px]"
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="template-active" />
                        <Label htmlFor="template-active">Active</Label>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-amber-600" />
                  </div>
                ) : templates && templates.length > 0 ? (
                  <div className="grid gap-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge variant="outline">{template.type}</Badge>
                              <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {template.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              {template.emailSubject && <span>📧 Email</span>}
                              {template.smsTemplate && <span>📱 SMS</span>}
                              {template.whatsappTemplate && <span>💬 WhatsApp</span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedTemplate(template);
                                setIsEditDialogOpen(true);
                              }}
                              data-testid={`button-edit-template-${template.id}`}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              data-testid={`button-delete-template-${template.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No templates found</p>
                    <p className="text-sm text-gray-400 mt-2">Create your first template or initialize sample templates</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Send Message Tab */}
          <TabsContent value="send" data-testid="send-content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="mr-2" />
                  Send Notification
                </CardTitle>
                <CardDescription>Send a direct notification to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 max-w-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="send-type">Notification Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order_update">Order Update</SelectItem>
                          <SelectItem value="product_launch">Product Launch</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Channels</Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="channel-email" />
                          <Label htmlFor="channel-email">📧 Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="channel-sms" />
                          <Label htmlFor="channel-sms">📱 SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="channel-whatsapp" />
                          <Label htmlFor="channel-whatsapp">💬 WhatsApp</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient-name">Recipient Name</Label>
                      <Input id="recipient-name" placeholder="Customer name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipient-email">Email</Label>
                      <Input id="recipient-email" type="email" placeholder="customer@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipient-phone">Phone Number</Label>
                    <Input id="recipient-phone" placeholder="+91XXXXXXXXXX" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message-subject">Subject</Label>
                    <Input id="message-subject" placeholder="Message subject" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message-content">Message</Label>
                    <Textarea 
                      id="message-content" 
                      placeholder="Your message content..."
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <Button className="bg-amber-600 hover:bg-amber-700" data-testid="button-send-notification">
                    <Send className="w-4 h-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}