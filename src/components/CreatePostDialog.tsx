import { useState } from 'react';
import { ImagePlus, Video, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, content: string, media?: { url: string; type: 'image' | 'video' }) => void;
}

export function CreatePostDialog({ open, onOpenChange, onSubmit }: CreatePostDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Judul tidak boleh kosong');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Konten tidak boleh kosong');
      return;
    }

    const media = mediaUrl && mediaType ? { url: mediaUrl, type: mediaType } : undefined;
    onSubmit(title, content, media);
    
    // Reset form
    setTitle('');
    setContent('');
    setMediaUrl('');
    setMediaType(null);
    
    toast.success('Thread berhasil dibuat!');
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setMediaUrl('');
    setMediaType(null);
    onOpenChange(false);
  };

  const handleAddImage = () => {
    const url = prompt('Masukkan URL gambar:');
    if (url) {
      setMediaUrl(url);
      setMediaType('image');
      toast.success('Gambar berhasil ditambahkan');
    }
  };

  const handleAddVideo = () => {
    const url = prompt('Masukkan URL video:');
    if (url) {
      setMediaUrl(url);
      setMediaType('video');
      toast.success('Video berhasil ditambahkan');
    }
  };

  const removeMedia = () => {
    setMediaUrl('');
    setMediaType(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#1B5E20]">Buat Thread Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Judul Thread</Label>
            <Input
              id="title"
              placeholder="Masukkan judul thread..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border-2 focus:border-[#4CAF50]"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Deskripsi</Label>
            <Textarea
              id="content"
              placeholder="Jelaskan masalah atau pertanyaan Anda..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="rounded-xl border-2 focus:border-[#4CAF50] resize-none"
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label>Media (Opsional)</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddImage}
                className="flex-1 rounded-xl border-2 hover:border-[#4CAF50] hover:bg-[#E8F5E9]"
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Tambah Gambar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddVideo}
                className="flex-1 rounded-xl border-2 hover:border-[#4CAF50] hover:bg-[#E8F5E9]"
              >
                <Video className="h-4 w-4 mr-2" />
                Tambah Video
              </Button>
            </div>
            
            {/* Media Preview */}
            {mediaUrl && mediaType && (
              <div className="relative mt-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <button
                  type="button"
                  onClick={removeMedia}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3">
                  {mediaType === 'image' ? (
                    <ImagePlus className="h-6 w-6 text-[#4CAF50]" />
                  ) : (
                    <Video className="h-6 w-6 text-[#4CAF50]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{mediaUrl}</p>
                    <p className="text-xs text-gray-500 capitalize">{mediaType}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-xl border-2"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
            >
              Posting Thread
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
