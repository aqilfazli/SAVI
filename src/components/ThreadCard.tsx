import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, Eye, MessageCircle, Share2, ImageIcon, Video, Flag } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReportDialog } from './ReportDialog';
import { toast } from 'sonner@2.0.3';
import type { Thread } from './ForumPage';

interface ThreadCardProps {
  thread: Thread;
  onVote: (threadId: string, voteType: 'up' | 'down') => void;
  onNavigate: () => void;
  currentUserName?: string;
}

export function ThreadCard({ thread, onVote, onNavigate, currentUserName = 'Guest' }: ThreadCardProps) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleUpvote = () => {
    if (hasDownvoted) {
      setHasDownvoted(false);
    }
    if (!hasUpvoted) {
      onVote(thread.id, 'up');
      setHasUpvoted(true);
    }
  };

  const handleDownvote = () => {
    if (hasUpvoted) {
      setHasUpvoted(false);
    }
    if (!hasDownvoted) {
      onVote(thread.id, 'down');
      setHasDownvoted(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/forum/thread/${thread.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: thread.title,
          text: `Lihat diskusi: ${thread.title}`,
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

  return (
    <Card className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#4CAF50]/30">
      <div className="flex items-start gap-4">
        {/* Left: Avatar and Author Info */}
        <div className="flex-shrink-0">
          <Avatar className="h-12 w-12 border-2 border-[#4CAF50]/30">
            <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
              {thread.author.avatar}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-900">{thread.author.name}</span>
            <Badge variant="outline" className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(thread.author.role)}`}>
              {getRoleLabel(thread.author.role)}
            </Badge>
          </div>
          
          {/* Date and Time */}
          <div className="text-sm text-gray-500 mb-3">
            {thread.date} • {thread.time}
          </div>

          {/* Title and Media */}
          <div className="flex items-start gap-4 mb-4">
            <button
              onClick={onNavigate}
              className="flex-1 text-left group"
            >
              <h3 className="text-gray-900 group-hover:text-[#4CAF50] transition-colors cursor-pointer line-clamp-2">
                {thread.title}
              </h3>
            </button>

            {/* Media Thumbnail */}
            {thread.hasMedia && thread.mediaUrl && (
              <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 group cursor-pointer" onClick={onNavigate}>
                {thread.mediaType === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Video className="h-8 w-8 text-gray-400" />
                  </div>
                ) : (
                  <ImageWithFallback
                    src={thread.mediaUrl}
                    alt="Thread media"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                {thread.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[10px] border-l-[#4CAF50] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Technician Reply Button */}
          {thread.hasTechnicianReply && (
            <Button
              onClick={onNavigate}
              variant="outline"
              size="sm"
              className="mb-4 rounded-lg border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
            >
              Lihat Balasan Teknisi
            </Button>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-6 text-gray-600">
            {/* Upvote/Downvote */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpvote}
                className={`p-1 rounded-lg transition-colors ${
                  hasUpvoted ? 'text-[#4CAF50] bg-[#E8F5E9]' : 'hover:bg-gray-100'
                }`}
                title="Upvote"
              >
                <ArrowBigUp className={`h-5 w-5 ${hasUpvoted ? 'fill-current' : ''}`} />
              </button>
              <span className="text-sm min-w-[30px] text-center">
                {formatNumber(thread.upvotes - thread.downvotes)}
              </span>
              <button
                onClick={handleDownvote}
                className={`p-1 rounded-lg transition-colors ${
                  hasDownvoted ? 'text-red-500 bg-red-50' : 'hover:bg-gray-100'
                }`}
                title="Downvote"
              >
                <ArrowBigDown className={`h-5 w-5 ${hasDownvoted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Views */}
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="text-sm">{formatNumber(thread.views)}</span>
            </div>

            {/* Comments */}
            <button
              onClick={onNavigate}
              className="flex items-center gap-2 hover:text-[#4CAF50] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{thread.comments}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-[#4CAF50] transition-colors"
              title="Bagikan"
            >
              <Share2 className="h-5 w-5" />
            </button>

            {/* Report */}
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-2 hover:text-red-500 transition-colors"
              title="Laporkan"
            >
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Report Dialog */}
      <ReportDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        contentType="post"
        contentId={thread.id}
        reportedBy={currentUserName}
      />
    </Card>
  );
}