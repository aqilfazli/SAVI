import { useState } from 'react';
import { Search, Filter, Edit, ChevronDown, Home } from 'lucide-react';
import { Button } from './ui/button';
import { can } from '../utils/permissions';
import { UserData } from '../types/user';
import { getInitials } from '../utils/string';
import { Input } from './ui/input';
import { ThreadCard } from './ThreadCard';
import { CreatePostDialog } from './CreatePostDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ForumPageProps {
  userData: UserData | null;
  onNavigateToThread: (threadId: string) => void;
  onBackToHome?: () => void;
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

const mockThreads: Thread[] = [
  {
    id: '1',
    author: {
      name: 'Jhon Anderson',
      avatar: 'JA',
      role: 'customer',
    },
    title: 'BAGAIMANA CARA MEMPERBAIKI RODA PADA ROBOT',
    date: '04 Nov 2025',
    time: '09:30',
    upvotes: 0,
    downvotes: 0,
    views: 13000,
    comments: 20,
    hasTechnicianReply: true,
    hasMedia: true,
    mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    mediaType: 'image',
  },
  {
    id: '2',
    author: {
      name: 'Willy Knight',
      avatar: 'WK',
      role: 'customer',
    },
    title: 'BAGAIMANA CARA MEMPERBAIKI RODA PADA ROBOT',
    date: '04 Nov 2025',
    time: '09:30',
    upvotes: 0,
    downvotes: 0,
    views: 13000,
    comments: 20,
    hasTechnicianReply: false,
    hasMedia: true,
    mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    mediaType: 'image',
  },
  {
    id: '3',
    author: {
      name: 'Sarah Green',
      avatar: 'SG',
      role: 'customer',
    },
    title: 'SENSOR KELEMBABAN TIDAK AKURAT',
    date: '03 Nov 2025',
    time: '14:20',
    upvotes: 5,
    downvotes: 1,
    views: 8500,
    comments: 15,
    hasTechnicianReply: true,
    hasMedia: false,
  },
  {
    id: '4',
    author: {
      name: 'Mike Johnson',
      avatar: 'MJ',
      role: 'customer',
    },
    title: 'CARA MENGOPTIMALKAN PENYIRAMAN OTOMATIS',
    date: '02 Nov 2025',
    time: '11:45',
    upvotes: 12,
    downvotes: 2,
    views: 15000,
    comments: 28,
    hasTechnicianReply: true,
    hasMedia: true,
    mediaUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8',
    mediaType: 'video',
  },
];

export function ForumPage({ userData, onNavigateToThread, onBackToHome }: ForumPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState<'newest' | 'oldest' | 'active' | 'media'>('newest');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>(mockThreads);

  const canCreatePost = can(userData?.role, 'forum');

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
        avatar: getInitials(userData?.fullName || userData?.email) || 'AN',
        role: (userData?.role as 'customer' | 'technician' | 'admin') || 'customer',
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

          {canCreatePost && (
            <Button
              onClick={() => setIsCreatePostOpen(true)}
              className="bg-[#4CAF50] hover:bg-[#45a049] rounded-xl px-6 shadow-lg"
            >
              <Edit className="h-4 w-4 mr-2" />
              Buat Post
            </Button>
          )}
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
            <div className="text-center py-16">
              <p className="text-gray-500">Tidak ada thread yang ditemukan</p>
            </div>
          )}
        </div>

        {/* Create Post Dialog */}
        {canCreatePost && (
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