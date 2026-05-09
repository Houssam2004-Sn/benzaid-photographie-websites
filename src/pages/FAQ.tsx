import { useState } from 'react';
import { faqItems } from '../data/faq';
import { Newsletter } from '../components/Newsletter';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Help Center</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#F5F5F0] mt-3 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#888880]">
            Everything you need to know about purchasing, licensing, and prints.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer gold-transition hover:bg-[#1A1A1A]"
              >
                <span className="text-[#F5F5F0] font-medium pr-4">{item.question}</span>
                <span className={`text-[#C8A45A] gold-transition shrink-0 ${openIndex === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-[#888880] text-sm leading-relaxed animate-[slideDown_0.2s_ease-out]">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-12 p-8 bg-[#141414] border border-[#2A2A2A] rounded-2xl">
          <h3 className="text-[#F5F5F0] text-lg font-medium mb-2">Still have questions?</h3>
          <p className="text-[#888880] text-sm mb-4">
            We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:Bb784867@gmail.com"
            className="inline-block px-6 py-2.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full text-sm font-medium hover:bg-[#D4B66A] gold-transition"
          >
            Contact Support
          </a>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
