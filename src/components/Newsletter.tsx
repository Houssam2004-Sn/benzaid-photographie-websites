import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45A]/5 to-transparent" />
          <div className="relative z-10">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#F5F5F0] mb-3">
              Join the Inner Circle
            </h2>
            <p className="text-[#888880] mb-6 max-w-md mx-auto">
              Subscribe for exclusive access to limited edition drops, early access to new collections, and photography stories from across Africa.
            </p>
            {subscribed ? (
              <div className="text-[#4CAF7A] font-medium text-lg">
                ✓ Welcome aboard! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-full text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
