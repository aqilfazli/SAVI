import { useState } from 'react';
import { Search, Filter, Edit, ChevronDown, Home, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ThreadCard } from './ThreadCard';
import { CreatePostDialog } from './CreatePostDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface UserData {
  fullName: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  joinDate: string;
}

interface ForumPageProps {
  userData: UserData | null;
  isLoggedIn: boolean;
  onNavigateToThread: (threadId: string) => void;
  onBackToHome?: () => void;
  onNavigateToLogin: () => void;
}

export interface Thread {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: 'customer' | 'technician' | 'admin';
  };
  title: string;
  date: string;
  time: string;
  upvotes: number;
  downvotes: number;
  views: number;
  comments: number;
  hasTechnicianReply: boolean;
  hasMedia: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

const mockThreads: Thread[] = [];

export function ForumPage({ userData, isLoggedIn, onNavigateToThread, onBackToHome, onNavigateToLogin }: ForumPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState<'newest' | 'oldest' | 'active' | 'media'>('newest');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>(mockThreads);

  const handleVote = (threadId: string, voteType: 'up' | 'down') => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        if (voteType === 'up') {
          return { ...thread, upvotes: thread.upvotes + 1 };
        } else {
          return { ...thread, downvotes: thread.downvotes + 1 };
        }
      }
      return thread;
    }));
  };

  const handleCreatePost = (title: string, content: string, media?: { url: string; type: 'image' | 'video' }) => {
    const newThread: Thread = {
      id: String(Date.now()),
      author: {
        name: userData?.fullName || 'Anonymous',
        avatar: userData?.fullName.split(' ').map(n => n[0]).join('') || 'AN',
        role: userData?.role || 'customer',
      },
      title: title.toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      upvotes: 0,
      downvotes: 0,
      views: 0,
      comments: 0,
      hasTechnicianReply: false,
      hasMedia: !!media,
      mediaUrl: media?.url,
      mediaType: media?.type,
    };
    
    setThreads([newThread, ...threads]);
    setIsCreatePostOpen(false);
  };

  const filteredThreads = threads
    .filter(thread => 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (filterOption) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'active':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'media':
          return (b.hasMedia ? 1 : 0) - (a.hasMedia ? 1 : 0);
        case 'newest':
        default:
          return new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime();
      }
    });

  const getFilterLabel = () => {
    switch (filterOption) {
      case 'oldest':
        return 'Terlama';
      case 'active':
        return 'Teraktif';
      case 'media':
        return 'Foto / Video';
      case 'newest':
      default:
        return 'Terbaru';
    }
  };

  const handleCreatePostClick = () => {
    if (!isLoggedIn) {
      onNavigateToLogin();
      return;
    }
    
    if (userData?.role !== 'customer') {
      return;
    }
    
    setIsCreatePostOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#E8F5E9] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        {onBackToHome && (
          <Button
            onClick={onBackToHome}
            variant="ghost"
            className="mb-6 hover:bg-gray-100 rounded-xl"
          >
            <Home className="h-5 w-5 mr-2" />
            Kembali ke Home
          </Button>
        )}
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[#1B5E20] mb-2">FIND SOLUTION</h1>
          <p className="text-gray-600">Temukan solusi dan diskusi seputar smart farming</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Cari Kata Kunci"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-100 text-gray-600"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filter and Create Post Buttons */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 px-6 min-w-[140px] justify-between"
              >
                <Filter className="h-4 w-4 mr-2" />
                {getFilterLabel()}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-xl">
              <DropdownMenuItem
                onClick={() => setFilterOption('newest')}
                className={filterOption === 'newest' ? 'bg-[#E8F5E9]' : ''}
              >
                Terbaru
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterOption('oldest')}
                className={filterOption === 'oldest' ? 'bg-[#E8F5E9]' : ''}
              >
                Terlama
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterOption('active')}
                className={filterOption === 'active' ? 'bg-[#E8F5E9]' : ''}
              >
                Teraktif
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterOption('media')}
                className={filterOption === 'media' ? 'bg-[#E8F5E9]' : ''}
              >
                Foto / Video
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={handleCreatePostClick}
            className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl px-6 shadow-lg"
          >
            <Edit className="h-4 w-4 mr-2" />
            Buat Post
          </Button>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                onVote={handleVote}
                onNavigate={() => onNavigateToThread(thread.id)}
                currentUserName={userData?.fullName || 'Guest'}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
              <div className="max-w-md mx-auto px-4">
                <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-[#4CAF50]" />
                </div>
                <h3 className="text-gray-900 mb-2">Belum Ada Thread</h3>
                <p className="text-gray-500 mb-6">
                  {isLoggedIn && userData?.role === 'customer'
                    ? 'Jadilah yang pertama membuat thread diskusi!'
                    : !isLoggedIn
                    ? 'Login untuk membuat thread diskusi pertama!'
                    : 'Belum ada thread diskusi yang tersedia.'}
                </p>
                {(!isLoggedIn || userData?.role === 'customer') && (
                  <Button
                    onClick={handleCreatePostClick}
                    className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl px-6"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isLoggedIn ? 'Buat Thread Pertama' : 'Login untuk Buat Thread'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Create Post Dialog */}
        {userData?.role === 'customer' && (
          <CreatePostDialog
            open={isCreatePostOpen}
            onOpenChange={setIsCreatePostOpen}
            onSubmit={handleCreatePost}
          />
        )}
      </div>
    </div>
  );
}