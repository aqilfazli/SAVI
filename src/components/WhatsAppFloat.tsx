import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '6285811083442'; // Format internasional tanpa +
    const message = encodeURIComponent('Hello, saya butuh bantuan dengan platform SAVI.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center p-0"
      title="Hubungi Kami via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
}
