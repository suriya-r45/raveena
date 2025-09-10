import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Home, 
  Sparkles, 
  Settings, 
  Check,
  Crown,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export type HomepageType = 'default' | 'daily' | 'secondary';

interface HomepagePreferenceSelectorProps {
  onPreferenceChange?: (preference: HomepageType) => void;
  className?: string;
}

export default function HomepagePreferenceSelector({ 
  onPreferenceChange, 
  className 
}: HomepagePreferenceSelectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current homepage preference
  const { data: currentPreference } = useQuery({
    queryKey: ['/api/settings/homepage_preference'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/settings/homepage_preference');
        const data = await response.json();
        return data.value || 'default';
      } catch (error) {
        return 'default';
      }
    },
    staleTime: 10000,
  });

  // Mutation to update homepage preference
  const updatePreferenceMutation = useMutation({
    mutationFn: async (preference: HomepageType) => {
      const response = await apiRequest('POST', '/api/settings', {
        key: 'homepage_preference',
        value: preference,
        description: 'User selected homepage layout preference'
      });
      return await response.json();
    },
    onSuccess: (_, preference) => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/homepage_preference'] });
      onPreferenceChange?.(preference);
      toast({
        title: "Homepage Updated",
        description: `Successfully switched to ${preference} homepage`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update homepage preference",
        variant: "destructive",
      });
    },
  });

  const handlePreferenceChange = async (preference: HomepageType) => {
    if (preference === currentPreference) return;
    
    setIsLoading(true);
    try {
      await updatePreferenceMutation.mutateAsync(preference);
    } finally {
      setIsLoading(false);
    }
  };

  const homepageOptions = [
    {
      id: 'default' as HomepageType,
      title: 'Classic Homepage',
      description: 'Our traditional elegant layout with featured collections',
      icon: Home,
      preview: 'Traditional luxury layout with jewelry carousel',
      theme: 'Classic Elegance',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'daily' as HomepageType,
      title: 'Daily Collection',
      description: 'Unique designs that change every day of the week',
      icon: Calendar,
      preview: 'Sunday: Divine, Monday: Royal, Tuesday: Modern...',
      theme: 'Ever-changing',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'secondary' as HomepageType,
      title: 'Festival Edition',
      description: 'Special occasion layout with enhanced animations',
      icon: Sparkles,
      preview: 'Luxurious festival-themed showcase',
      theme: 'Celebration',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const getCurrentDayTheme = () => {
    const day = new Date().getDay();
    const themes = [
      { name: 'Divine Elegance', icon: Sun, color: 'text-amber-500' },
      { name: 'Royal Majesty', icon: Crown, color: 'text-purple-500' },
      { name: 'Modern Luxe', icon: Zap, color: 'text-emerald-500' },
      { name: 'Elegant Classic', icon: Moon, color: 'text-blue-500' },
      { name: 'Vintage Romance', icon: Home, color: 'text-rose-500' },
      { name: 'Contemporary', icon: Settings, color: 'text-indigo-500' },
      { name: 'Royal Heritage', icon: Crown, color: 'text-amber-600' }
    ];
    return themes[day];
  };

  const todayTheme = getCurrentDayTheme();

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Homepage Experience
        </h3>
        <p className="text-gray-600">
          Select how you want to experience our jewelry collections
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {homepageOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = currentPreference === option.id;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative"
            >
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePreferenceChange(option.id)}
                data-testid={`homepage-option-${option.id}`}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${option.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{option.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {option.theme}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {option.description}
                </p>

                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">Preview:</p>
                  <p className="text-sm text-gray-700">
                    {option.id === 'daily' ? (
                      <span className="flex items-center gap-2">
                        <todayTheme.icon className={`w-4 h-4 ${todayTheme.color}`} />
                        Today: {todayTheme.name}
                      </span>
                    ) : option.preview}
                  </p>
                </div>

                {/* Action Button */}
                <Button 
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  disabled={isLoading || isSelected}
                  data-testid={`button-select-${option.id}`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    `Select ${option.title}`
                  )}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Current Selection Info */}
      {currentPreference && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <div className="flex items-center gap-2 text-blue-800">
            <Settings className="w-4 h-4" />
            <span className="font-medium">Current Homepage:</span>
            <span className="capitalize">{currentPreference}</span>
            {currentPreference === 'daily' && (
              <span className="ml-2 flex items-center gap-1">
                - <todayTheme.icon className={`w-4 h-4 ${todayTheme.color}`} />
                {todayTheme.name}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}