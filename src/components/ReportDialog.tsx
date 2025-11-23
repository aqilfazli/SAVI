import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentType: 'post' | 'comment';
  contentId: string;
  reportedBy: string;
}

const reportReasons = [
  { value: 'negative', label: 'Kata-kata Negatif / Kasar' },
  { value: 'pornography', label: 'Konten Pornografi' },
  { value: 'spam', label: 'Spam / Iklan Tidak Relevan' },
  { value: 'harassment', label: 'Pelecehan / Bullying' },
  { value: 'misinformation', label: 'Informasi Menyesatkan' },
  { value: 'other', label: 'Lainnya' },
];

export function ReportDialog({ open, onOpenChange, contentType, contentId, reportedBy }: ReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason) {
      toast.error('Pilih alasan pelaporan');
      return;
    }

    // Simulate sending report to admin/super admin
    const report = {
      contentType,
      contentId,
      reason: selectedReason,
      additionalInfo,
      reportedBy,
      timestamp: new Date().toISOString(),
    };

    // In a real app, this would send to backend and notify admins
    console.log('Report submitted:', report);
    
    // Simulate admin notification
    toast.success('Laporan berhasil dikirim ke Admin', {
      description: 'Admin akan meninjau konten yang dilaporkan',
      duration: 5000,
    });

    // Reset form
    setSelectedReason('');
    setAdditionalInfo('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedReason('');
    setAdditionalInfo('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Laporkan Konten
          </DialogTitle>
          <DialogDescription>
            Laporkan {contentType === 'post' ? 'postingan' : 'komentar'} yang melanggar aturan komunitas
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>Alasan Pelaporan</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {reportReasons.map((reason) => (
                <div key={reason.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.value} id={reason.value} />
                  <Label htmlFor={reason.value} className="cursor-pointer">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additional-info">Informasi Tambahan (Opsional)</Label>
            <Textarea
              id="additional-info"
              placeholder="Jelaskan lebih detail tentang pelanggaran..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
              className="rounded-xl border-2 focus:border-red-500 resize-none"
            />
          </div>

          {/* Warning Note */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Catatan:</strong> Laporan palsu dapat mengakibatkan sanksi pada akun Anda. 
              Admin akan meninjau laporan ini dan mengambil tindakan yang sesuai.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
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
              className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl"
            >
              Kirim Laporan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
