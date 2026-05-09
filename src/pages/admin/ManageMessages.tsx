import { useState } from 'react';

const messages = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@example.com', phone: '+1 555-0100', subject: 'Custom Commission Inquiry', message: 'I am interested in commissioning a series of photographs for our hotel lobby in Manhattan. We need 5 large-format prints showcasing North African landscapes.', is_read: false, date: '2 hours ago' },
  { id: '2', name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+20 111-2222', subject: 'Licensing Question', message: 'What are the terms for using one of your images as a book cover? I\'m publishing a travel memoir about Egypt and would love to use one of your Sahara shots.', is_read: false, date: '1 day ago' },
  { id: '3', name: 'Maria Santos', email: 'maria@example.com', phone: '+34 666-7777', subject: 'Print Order Issue', message: 'I ordered a canvas print of "Chefchaouen Blue" but the tracking number doesn\'t seem to work. Can you help me check the status?', is_read: true, date: '2 days ago' },
  { id: '4', name: 'Thomas Mueller', email: 'thomas@example.com', phone: '+49 123-4567', subject: 'Collaboration Proposal', message: 'I represent a gallery in Berlin and we would love to feature your work in an upcoming exhibition on contemporary African photography.', is_read: true, date: '3 days ago' },
  { id: '5', name: 'Yuki Tanaka', email: 'yuki@example.com', phone: '+81 90-1234', subject: 'Digital Download Issue', message: 'I purchased the digital large file of "Atlas Peaks Majesty" but the download link says it has expired. I only attempted to download once.', is_read: false, date: '4 days ago' },
];

export default function ManageMessages() {
  const [messageList, setMessageList] = useState(messages);
  const [selectedMsg, setSelectedMsg] = useState<typeof messages[0] | null>(null);

  const markAsRead = (id: string) => {
    setMessageList(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    setSelectedMsg(prev => prev && prev.id === id ? { ...prev, is_read: true } : prev);
  };

  const unreadCount = messageList.filter(m => !m.is_read).length;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Messages</h1>
            <p className="text-[#888880] text-sm">{unreadCount} unread</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#2A2A2A] max-h-[600px] overflow-y-auto">
              {messageList.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => { setSelectedMsg(msg); markAsRead(msg.id); }}
                  className={`w-full text-left p-4 gold-transition cursor-pointer ${
                    selectedMsg?.id === msg.id ? 'bg-[#1A1A1A] border-l-2 border-[#C8A45A]' : 'hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#F5F5F0] text-sm font-medium truncate">{msg.name}</span>
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A45A] shrink-0" />}
                  </div>
                  <p className="text-[#888880] text-xs truncate">{msg.subject}</p>
                  <p className="text-[#555] text-xs mt-1">{msg.date}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
            {selectedMsg ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[#F5F5F0] text-xl font-medium">{selectedMsg.subject}</h2>
                    <p className="text-[#888880] text-sm">From: {selectedMsg.name} ({selectedMsg.email})</p>
                    {selectedMsg.phone && <p className="text-[#888880] text-sm">Phone: {selectedMsg.phone}</p>}
                  </div>
                  <span className="text-[#888880] text-xs">{selectedMsg.date}</span>
                </div>
                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 mb-6">
                  <p className="text-[#888880] leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                    className="px-5 py-2.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full text-sm font-medium hover:bg-[#D4B66A] gold-transition"
                  >
                    Reply via Email
                  </a>
                  <button className="px-5 py-2.5 border border-[#2A2A2A] text-[#888880] rounded-full text-sm hover:border-[#C8A45A] hover:text-[#F5F5F0] gold-transition cursor-pointer">
                    Mark as Unread
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] text-[#888880]">
                Select a message to view
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
