import { useState } from 'react';
import { ArrowLeft, ArrowBigUp, ArrowBigDown, Eye, MessageCircle, Share2, Send, ImageIcon, Video, ImagePlus, Flag, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReportDialog } from './ReportDialog';
import { toast } from 'sonner@2.0.3';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

interface ThreadDetailPageProps {
  threadId: string;
  userData: UserData | null;
  onBack: () => void;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: 'customer' | 'technician' | 'admin';
  };
  content: string;
  date: string;
  time: string;
  isTechnicianReply?: boolean;
  hasMedia?: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

const mockThread = {
  id: '1',
  author: {
    name: 'Jhon Anderson',
    avatar: 'JA',
    role: 'customer' as const,
  },
  title: 'BAGAIMANA CARA MEMPERBAIKI RODA PADA ROBOT',
  content: 'Halo semua, saya mengalami masalah dengan roda robot panen sayuran saya. Roda kiri sering tergelincir dan tidak bisa bergerak dengan baik di tanah yang basah. Sudah saya cek bearing-nya masih bagus, tapi tetap saja masalahnya ada. Apakah ada yang pernah mengalami hal serupa? Bagaimana cara mengatasinya? Terima kasih sebelumnya.',
  date: '04 Nov 2025',
  time: '09:30',
  upvotes: 24,
  downvotes: 3,
  views: 13000,
  hasMedia: true,
  mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  mediaType: 'image' as const,
};

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Tech Support SAVI',
      avatar: 'TS',
      role: 'technician',
    },
    content: 'Halo Jhon! Terima kasih sudah menghubungi kami. Untuk masalah roda yang tergelincir di tanah basah, kemungkinan besar masalahnya ada di traksi roda. Saya sarankan untuk: 1) Cek tekanan ban, pastikan tidak terlalu keras atau terlalu lembek. 2) Bersihkan permukaan roda dari lumut atau kotoran yang menempel. 3) Jika masih bermasalah, mungkin perlu diganti dengan roda yang memiliki grip lebih baik. Kami juga menyediakan upgrade kit untuk roda dengan traksi superior di halaman Products. Semoga membantu!',
    date: '04 Nov 2025',
    time: '10:15',
    isTechnicianReply: true,
  },
  {
    id: '2',
    author: {
      name: 'Sarah Green',
      avatar: 'SG',
      role: 'customer',
    },
    content: 'Saya juga pernah mengalami hal yang sama! Setelah saya ikuti saran dari teknisi untuk mengganti ban dengan yang lebih bergerigi, masalahnya langsung teratasi. Sangat recommended!',
    date: '04 Nov 2025',
    time: '11:30',
  },
];

export function ThreadDetailPage({ threadId, userData, onBack }: ThreadDetailPageProps) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(mockThread.upvotes);
  const [downvotes, setDownvotes] = useState(mockThread.downvotes);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [commentMediaUrl, setCommentMediaUrl] = useState('');
  const [commentMediaType, setCommentMediaType] = useState<'image' | 'video' | null>(null);
  const [isReportPostOpen, setIsReportPostOpen] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<string | null>(null);

  const handleUpvote = () => {
    if (hasDownvoted) {
      setHasDownvoted(false);
      setDownvotes(prev => prev - 1);
    }
    if (!hasUpvoted) {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handleDownvote = () => {
    if (hasUpvoted) {
      setHasUpvoted(false);
      setUpvotes(prev => prev - 1);
    }
    if (!hasDownvoted) {
      setDownvotes(prev => prev + 1);
      setHasDownvoted(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/forum/thread/${threadId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockThread.title,
          text: `Lihat diskusi: ${mockThread.title}`,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Link berhasil disalin!');
    }).catch(() => {
      toast.error('Gagal menyalin link');
    });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast.error('Komentar tidak boleh kosong');
      return;
    }

    if (!userData) {
      toast.error('Anda harus login untuk berkomentar');
      return;
    }

    const comment: Comment = {
      id: String(Date.now()),
      author: {
        name: userData.fullName,
        avatar: userData.fullName.split(' ').map(n => n[0]).join(''),
        role: userData.role,
      },
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      hasMedia: !!commentMediaUrl,
      mediaUrl: commentMediaUrl,
      mediaType: commentMediaType,
    };

    setComments([...comments, comment]);
    setNewComment('');
    setCommentMediaUrl('');
    setCommentMediaType(null);
    toast.success('Komentar berhasil ditambahkan!');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'customer':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'technician':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'customer':
        return 'Customer';
      case 'technician':
        return 'Teknisi';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const technicianReplies = comments.filter(c => c.isTechnicianReply);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#E8F5E9] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-gray-100 rounded-xl"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Forum
        </Button>

        {/* Main Thread Card */}
        <Card className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-6">
          {/* Author Info */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-14 w-14 border-2 border-[#4CAF50]/30">
              <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
                {mockThread.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-900">{mockThread.author.name}</span>
                <Badge variant="outline" className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(mockThread.author.role)}`}>
                  {getRoleLabel(mockThread.author.role)}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">
                {mockThread.date} • {mockThread.time}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl text-gray-900 mb-6">{mockThread.title}</h1>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed mb-6">{mockThread.content}</p>

          {/* Media */}
          {mockThread.hasMedia && mockThread.mediaUrl && (
            <div className="mb-6 rounded-xl overflow-hidden border-2 border-gray-200">
              {mockThread.mediaType === 'video' ? (
                <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                  <Video className="h-16 w-16 text-gray-400" />
                </div>
              ) : (
                <ImageWithFallback
                  src={mockThread.mediaUrl}
                  alt="Thread media"
                  className="w-full max-h-96 object-cover"
                />
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-6 text-gray-600">
            {/* Upvote/Downvote */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpvote}
                className={`p-2 rounded-lg transition-colors ${
                  hasUpvoted ? 'text-[#4CAF50] bg-[#E8F5E9]' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowBigUp className={`h-6 w-6 ${hasUpvoted ? 'fill-current' : ''}`} />
              </button>
              <span className="text-sm min-w-[40px] text-center">
                {formatNumber(upvotes - downvotes)}
              </span>
              <button
                onClick={handleDownvote}
                className={`p-2 rounded-lg transition-colors ${
                  hasDownvoted ? 'text-red-500 bg-red-50' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowBigDown className={`h-6 w-6 ${hasDownvoted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Views */}
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="text-sm">{formatNumber(mockThread.views)}</span>
            </div>

            {/* Comments Count */}
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{comments.length}</span>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-[#4CAF50] transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>

            {/* Report */}
            <button
              onClick={() => setIsReportPostOpen(true)}
              className="flex items-center gap-2 hover:text-red-500 transition-colors"
              title="Laporkan"
            >
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </Card>

        {/* Technician Replies Section */}
        {technicianReplies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl text-[#1B5E20] mb-4 flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">Balasan Teknisi</Badge>
            </h2>
            <div className="space-y-4">
              {technicianReplies.map((comment) => (
                <Card key={comment.id} className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-6 shadow-md border-2 border-orange-200">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-orange-400">
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                        {comment.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-900">{comment.author.name}</span>
                        <Badge variant="outline" className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(comment.author.role)}`}>
                          {getRoleLabel(comment.author.role)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {comment.date} • {comment.time}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mb-6">
          <h2 className="text-xl text-[#1B5E20] mb-4">Komentar ({comments.filter(c => !c.isTechnicianReply).length})</h2>
          <div className="space-y-4">
            {comments.filter(c => !c.isTechnicianReply).map((comment) => (
              <Card key={comment.id} className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-[#4CAF50]/30">
                    <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
                      {comment.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{comment.author.name}</span>
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(comment.author.role)}`}>
                        {getRoleLabel(comment.author.role)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {comment.date} • {comment.time}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        {userData && (
          <Card className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <h3 className="text-lg text-[#1B5E20] mb-4">Tambah Komentar</h3>
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 border-2 border-[#4CAF50]/30 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
                  {userData.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Tulis komentar Anda..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="rounded-xl border-2 focus:border-[#4CAF50] resize-none"
                />
                
                {/* Media Attachment */}
                {commentMediaUrl && commentMediaType && (
                  <div className="relative p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <button
                      onClick={() => {
                        setCommentMediaUrl('');
                        setCommentMediaType(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-3">
                      {commentMediaType === 'image' ? (
                        <ImageIcon className="h-6 w-6 text-[#4CAF50]" />
                      ) : (
                        <Video className="h-6 w-6 text-[#4CAF50]" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{commentMediaUrl}</p>
                        <p className="text-xs text-gray-500 capitalize">{commentMediaType}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = prompt('Masukkan URL gambar:');
                        if (url) {
                          setCommentMediaUrl(url);
                          setCommentMediaType('image');
                          toast.success('Gambar berhasil ditambahkan');
                        }
                      }}
                      className="rounded-xl border-2 hover:border-[#4CAF50] hover:bg-[#E8F5E9]"
                    >
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Gambar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = prompt('Masukkan URL video:');
                        if (url) {
                          setCommentMediaUrl(url);
                          setCommentMediaType('video');
                          toast.success('Video berhasil ditambahkan');
                        }
                      }}
                      className="rounded-xl border-2 hover:border-[#4CAF50] hover:bg-[#E8F5E9]"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                  </div>
                  <Button
                    onClick={handleSubmitComment}
                    className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Komentar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {!userData && (
          <Card className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-gray-200">
            <p className="text-gray-600 mb-4">Anda harus login untuk berkomentar</p>
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl">
              Login / Register
            </Button>
          </Card>
        )}
      </div>
      
      {/* Report Dialogs */}
      <ReportDialog
        open={isReportPostOpen}
        onOpenChange={setIsReportPostOpen}
        contentType="post"
        contentId={threadId}
        reportedBy={userData?.fullName || 'Guest'}
      />
      
      {reportCommentId && (
        <ReportDialog
          open={!!reportCommentId}
          onOpenChange={(open) => !open && setReportCommentId(null)}
          contentType="comment"
          contentId={reportCommentId}
          reportedBy={userData?.fullName || 'Guest'}
        />
      )}
    </div>
  );
}