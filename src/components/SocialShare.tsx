import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
}

const SocialShare = ({ title, url, description }: SocialShareProps) => {
  const { toast } = useToast();

  // Get current URL properly
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const shareData = {
    title,
    url: currentUrl,
    text: description || title,
  };

  const handleNativeShare = async () => {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: 'Berhasil Dibagikan!',
          description: 'Artikel telah dibagikan.',
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.log('Error sharing:', error);
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: 'Link Disalin!',
        description: 'Link artikel telah disalin ke clipboard.',
      });
    } catch (error) {
      console.error('Error copying link:', error);

      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast({
          title: 'Link Disalin!',
          description: 'Link artikel telah disalin ke clipboard.',
        });
      } catch (fallbackError) {
        toast({
          title: 'Error',
          description: 'Gagal menyalin link.',
          variant: 'destructive',
        });
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSocialShare = (platform: string, shareUrl: string) => {
    try {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      toast({
        title: 'Error',
        description: `Gagal membuka ${platform}. Silakan coba lagi.`,
        variant: 'destructive',
      });
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-600 hover:scale-110',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      color: 'hover:bg-sky-500 hover:scale-110',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-700 hover:scale-110',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-fade-in hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4 animate-slide-in">
        <Share2 className="w-5 h-5 text-blue-600 mr-2 animate-bounce-subtle" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bagikan Artikel</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social, index) => (
          <Button
            key={social.name}
            variant="outline"
            size="sm"
            onClick={() => handleSocialShare(social.name, social.url)}
            className={`flex items-center transition-all duration-300 transform ${social.color} hover:text-white animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <social.icon className="w-4 h-4 mr-2" />
            {social.name}
          </Button>
        ))}

        <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex items-center hover:bg-gray-600 hover:text-white hover:scale-110 transition-all duration-300 transform animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Copy className="w-4 h-4 mr-2" />
          Salin Link
        </Button>

        {navigator.share && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            className="flex items-center hover:bg-green-600 hover:text-white hover:scale-110 transition-all duration-300 transform animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialShare;
