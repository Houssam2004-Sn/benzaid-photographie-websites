import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('benzaid_cookies');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('benzaid_cookies', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 animate-[slideUp_0.5s_ease-out]">
      <div className="max-w-6xl mx-auto bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow-2xl">
        <p className="text-[#888880] text-sm flex-1">
          We use cookies to enhance your browsing experience. By continuing, you agree to our{' '}
          <a href="/privacy" className="text-[#C8A45A] hover:underline">Privacy Policy</a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="px-6 py-2 bg-[#C8A45A] text-[#0A0A0A] rounded-full text-sm font-medium hover:bg-[#D4B66A] gold-transition cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={accept}
            className="px-6 py-2 border border-[#2A2A2A] text-[#F5F5F0] rounded-full text-sm hover:border-[#C8A45A] gold-transition cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
