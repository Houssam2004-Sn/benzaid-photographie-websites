export default function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mb-2">Privacy Policy</h1>
        <p className="text-[#888880] mb-8">Last updated: January 1, 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-[#888880] leading-relaxed">
          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide when creating an account, placing an order, or contacting us:
              name, email address, phone number, shipping address, and payment information.
              Payment data is processed securely by Stripe, PayPal, or NOWPayments and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">2. How We Use Your Information</h2>
            <p>Your information is used solely for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations and download links</li>
              <li>Responding to customer service inquiries</li>
              <li>Sending newsletter updates (only with your explicit consent)</li>
              <li>Improving our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">3. Data Protection</h2>
            <p>
              We implement industry-standard security measures including SSL encryption,
              secure password hashing (bcrypt), and regular security audits. Your personal data
              is never sold, traded, or shared with third parties except as necessary to fulfill
              your order (e.g., sharing your address with a shipping carrier).
            </p>
          </section>

          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">4. Cookies</h2>
            <p>
              We use essential cookies for cart functionality and session management. Analytics
              cookies (Google Analytics) are used only if you accept them. You can manage cookie
              preferences through our cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">5. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at Bb784867@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">6. DMCA Copyright Protection</h2>
            <p>
              All photographs on this website are protected by copyright law and DMCA.
              Unauthorized reproduction, distribution, or use of any image without a valid license
              is strictly prohibited and will result in legal action.
            </p>
          </section>

          <section>
            <h2 className="text-[#F5F5F0] text-xl font-medium mb-3">7. Contact</h2>
            <p>
              For privacy-related inquiries, contact us at{' '}
              <a href="mailto:Bb784867@gmail.com" className="text-[#C8A45A] hover:underline">Bb784867@gmail.com</a>{' '}
              or call <span className="text-[#F5F5F0]">+212 698-788743</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
