import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MessageSquare, ThumbsUp, Clock } from 'lucide-react';

const discussions = [
  {
    id: 1,
    author: 'Sarah Johnson',
    initials: 'SJ',
    title: 'Best practices for maintaining optimal humidity in lettuce greenhouses',
    excerpt: 'I\'ve been experimenting with different humidity levels and found that...',
    replies: 24,
    likes: 45,
    time: '2 hours ago',
  },
  {
    id: 2,
    author: 'Michael Chen',
    initials: 'MC',
    title: 'SAVI robot calibration tips for better harvesting accuracy',
    excerpt: 'After weeks of testing, here are my top recommendations for...',
    replies: 18,
    likes: 62,
    time: '5 hours ago',
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    initials: 'ER',
    title: 'Question about IoT sensor integration with existing systems',
    excerpt: 'Has anyone successfully integrated the SAVI sensors with...',
    replies: 31,
    likes: 28,
    time: '1 day ago',
  },
];

export function CommunityForum() {
  return (
    <section id="forum" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#1B5E20] mb-4" style={{ fontSize: '42px', fontWeight: 700 }}>
            Community Forum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with fellow farmers and technicians to share insights and solve challenges together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {discussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#4CAF50] text-white">
                    {discussion.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900" style={{ fontWeight: 600 }}>
                    {discussion.author}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="h-3 w-3" />
                    <span>{discussion.time}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-gray-900 mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
                {discussion.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {discussion.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{discussion.replies}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#4CAF50] to-[#1B5E20] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <h3 className="mb-2" style={{ fontSize: '28px', fontWeight: 600 }}>
              Have a question or idea to share?
            </h3>
            <p className="text-white/90 text-lg">
              Join thousands of farmers in our growing community
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-[#1B5E20] hover:bg-gray-100 px-8 py-6 rounded-2xl flex-shrink-0"
          >
            Join Discussion
          </Button>
        </div>
      </div>
    </section>
  );
}
