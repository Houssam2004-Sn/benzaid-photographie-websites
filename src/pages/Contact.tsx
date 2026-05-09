import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending to Bb784867@gmail.com
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Get in Touch</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#F5F5F0] mt-3 mb-4">
            Contact Us
          </h1>
          <p className="text-[#888880] max-w-lg mx-auto">
            Have a question about a photo, need a custom commission, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: '📧', label: 'Email', value: 'Bb784867@gmail.com', href: 'mailto:Bb784867@gmail.com' },
              { icon: '📞', label: 'Phone', value: '+212 698-788743', href: 'tel:+212698788743' },
              { icon: '🌍', label: 'Website', value: 'benzaidphotography.com', href: '#' },
              { icon: '📸', label: 'Instagram', value: '@benzaidphotography', href: '#' },
              { icon: '📍', label: 'Location', value: 'Morocco, North Africa', href: '#' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                className="block p-5 bg-[#141414] border border-[#2A2A2A] rounded-xl gold-transition hover:border-[#C8A45A]/40"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-[#888880] text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-[#F5F5F0] font-medium">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Business Hours */}
            <div className="p-5 bg-[#141414] border border-[#2A2A2A] rounded-xl">
              <h3 className="text-[#F5F5F0] font-medium mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM (GMT+1)' },
                  { day: 'Saturday', hours: '10:00 AM – 4:00 PM (GMT+1)' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map(schedule => (
                  <div key={schedule.day} className="flex justify-between">
                    <span className="text-[#888880]">{schedule.day}</span>
                    <span className="text-[#F5F5F0]">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-5">
              {sent && (
                <div className="bg-[#4CAF7A]/10 border border-[#4CAF7A]/30 rounded-xl p-4 text-[#4CAF7A] text-sm">
                  ✓ Your message has been sent! We'll get back to you within 24 hours.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Phone (optional)', key: 'phone', type: 'tel' },
                  { label: 'Subject', key: 'subject', type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-[#888880] text-xs mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      required={field.key !== 'phone'}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[#888880] text-xs mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={6}
                  placeholder="Tell us about your project or inquiry..."
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition resize-none"
                />
              </div>

              <p className="text-[#888880] text-xs">
                This form sends directly to <span className="text-[#C8A45A]">Bb784867@gmail.com</span>.
                We typically respond within 24 hours.
              </p>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
