import { Newsletter } from '../components/Newsletter';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">The Artist</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-bold text-[#F5F5F0] mt-3 mb-6">
            Behind the Lens
          </h1>
          <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-[#141414] border-2 border-[#C8A45A]/30 flex items-center justify-center">
            <span className="text-4xl">📸</span>
          </div>
        </div>

        {/* Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20">
          <div className="lg:col-span-2">
            <div className="aspect-[3/4] rounded-2xl bg-[#141414] border border-[#2A2A2A] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#141414] flex items-center justify-center">
                <div className="text-center text-[#888880]">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-sm">Benzaid Photography</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0] mb-6">
              A Lifetime of Capturing Africa's Soul
            </h2>
            <div className="space-y-4 text-[#888880] leading-relaxed">
              <p>
                For over 15 years, I've traversed the vast and diverse landscapes of Africa — from the windswept
                dunes of the Sahara to the misty highlands of Ethiopia, from the bustling medinas of Fez to the
                serene coastline of Zanzibar. My camera has been my constant companion, witnessing the
                extraordinary beauty that this continent offers.
              </p>
              <p>
                What drives me is not just capturing beautiful images, but telling stories. Each photograph in
                this collection represents a moment of connection — with a person, a place, a fleeting light,
                or an ancient tradition. I believe that photography is not about the gear; it's about seeing
                what others overlook and having the patience to wait for the decisive moment.
              </p>
              <p>
                My work has been featured in National Geographic, Condé Nast Traveler, and exhibited in galleries
                across Europe and North Africa. But my greatest satisfaction comes when a collector tells me
                that one of my images transported them — that they can feel the warmth of the desert sun or
                hear the crash of Atlantic waves just by looking at my print.
              </p>
              <p className="text-[#F5F5F0] italic border-l-2 border-[#C8A45A] pl-4 py-1">
                "Photography is the art of observation. It's about finding something interesting in an ordinary
                place. I've found it has little to do with the things you see and everything to do with the way
                you see them."
              </p>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div className="mb-20">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0] text-center mb-10">
            The Tools of the Trade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Sony A7R IV',
                desc: '61MP full-frame mirrorless — my primary body for landscapes and wildlife',
                icon: '📷',
              },
              {
                name: 'Canon EOS R5',
                desc: '45MP with exceptional color science — preferred for portraits and street',
                icon: '📸',
              },
              {
                name: 'Fujifilm GFX 100S',
                desc: '102MP medium format — for when every detail matters',
                icon: '🎯',
              },
            ].map(gear => (
              <div key={gear.name} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{gear.icon}</div>
                <h3 className="text-[#F5F5F0] font-medium mb-2">{gear.name}</h3>
                <p className="text-[#888880] text-sm">{gear.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibitions */}
        <div className="mb-20">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0] text-center mb-10">
            Exhibitions & Features
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { year: '2025', title: 'Eyes of Africa — Solo Exhibition', venue: 'Galerie 127, Marrakech' },
              { year: '2024', title: 'World Press Photo — Honorable Mention', venue: 'Amsterdam, Netherlands' },
              { year: '2023', title: 'National Geographic — Feature Story', venue: 'Print & Digital' },
              { year: '2022', title: 'African Visions — Group Show', venue: 'Tate Modern, London' },
              { year: '2021', title: 'Conde Nast Traveler — Cover Photo', venue: 'September Issue' },
            ].map(ex => (
              <div key={ex.year} className="flex gap-4 p-4 bg-[#141414] border border-[#2A2A2A] rounded-xl">
                <span className="text-[#C8A45A] font-bold text-lg shrink-0 w-14">{ex.year}</span>
                <div>
                  <p className="text-[#F5F5F0] font-medium">{ex.title}</p>
                  <p className="text-[#888880] text-sm">{ex.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-[#141414] border border-[#2A2A2A] rounded-3xl p-10 max-w-2xl mx-auto">
          <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#F5F5F0] mb-3">
            Let's Work Together
          </h2>
          <p className="text-[#888880] mb-6">
            Interested in commissioning work, licensing images, or collaborating on a project? I'd love to hear from you.
          </p>
          <a
            href="mailto:Bb784867@gmail.com"
            className="inline-block px-8 py-3 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
