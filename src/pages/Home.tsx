import { Link } from 'react-router-dom';
import { usePhotos } from '../hooks/usePhotos'
import { testimonials } from '../data/testimonials';
import { PhotoCard } from '../components/PhotoCard';
import { Newsletter } from '../components/Newsletter';
import { StarRating } from '../components/StarRating';
import { BrandLogo } from '../components/BrandLogo';

export default function Home() {
  const photos = usePhotos();
  const featured = photos.filter(p => p.is_featured);
  const bestSellers = [...photos].sort((a, b) => b.downloads_count - a.downloads_count).slice(0, 4);
  const newArrivals = [...photos].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,164,90,0.08)_0%,_transparent_70%)]" />

        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A45A]/20 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-px h-1/3 bg-gradient-to-b from-transparent via-[#C8A45A]/10 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <BrandLogo size="lg" layout="stacked" className="mb-8" />
          <div className="inline-block mb-6">
            <span className="px-4 py-1.5 border border-[#C8A45A]/30 rounded-full text-[#C8A45A] text-xs uppercase tracking-[0.2em]">
              Option B — Signature Brand Identity
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F5F0] leading-none mb-6">
            Every Frame Tells a{' '}
            <span className="gold-text">Continent's Story</span>
          </h1>
          <p className="text-[#888880] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover extraordinary moments captured across Africa. From the golden dunes of the Sahara
            to the vibrant medinas of Morocco — each photograph is a window into a world of beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="px-8 py-3.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium text-sm hover:bg-[#D4B66A] gold-transition inline-flex items-center justify-center gap-2"
            >
              Explore Gallery
              <span>→</span>
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 border border-[#2A2A2A] text-[#F5F5F0] rounded-full font-medium text-sm hover:border-[#C8A45A] gold-transition inline-flex items-center justify-center"
            >
              About the Artist
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-8 border-t border-[#1A1A1A]">
            {[
              { value: '500+', label: 'Photographs' },
              { value: '45+', label: 'Countries' },
              { value: '12K+', label: 'Customers' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold gold-text font-['Cormorant_Garamond']">{stat.value}</div>
                <div className="text-[#888880] text-xs uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[bounce_2s_infinite]">
          <div className="w-5 h-8 rounded-full border-2 border-[#2A2A2A] flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-[#C8A45A]/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Curated Selection</span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#F5F5F0] mt-3 mb-4">
              Featured Masterpieces
            </h2>
            <p className="text-[#888880] max-w-xl mx-auto">
              Hand-picked works that showcase the finest moments from across the continent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-[#C8A45A] hover:text-[#D4B66A] gold-transition text-sm font-medium"
            >
              View Full Collection <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Browse By</span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mt-3">Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Landscape', icon: '🏔️', count: 42 },
              { name: 'Urban', icon: '🏙️', count: 38 },
              { name: 'Portrait', icon: '👤', count: 29 },
              { name: 'Wildlife', icon: '🦁', count: 24 },
              { name: 'Nature', icon: '🌿', count: 35 },
              { name: 'Abstract', icon: '🎨', count: 18 },
            ].map(cat => (
              <Link
                key={cat.name}
                to={`/gallery?category=${cat.name}`}
                className="group p-6 bg-[#141414] border border-[#2A2A2A] rounded-2xl text-center gold-transition hover:border-[#C8A45A]/40 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-[#F5F5F0] font-medium text-sm mb-1 group-hover:text-[#C8A45A] gold-transition">{cat.name}</h3>
                <p className="text-[#888880] text-xs">{cat.count} photos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Popular</span>
              <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mt-3">Best Sellers</h2>
            </div>
            <Link to="/gallery?sort=popular" className="hidden sm:block text-[#C8A45A] text-sm hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      </section>

      {/* Region Map */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Explore By Region</span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mt-3 mb-8">
            Where Do You Want to Explore?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {['North Africa', 'West Africa', 'East Africa', 'Southern Africa', 'Central Africa'].map(region => (
              <Link
                key={region}
                to={`/gallery?region=${region}`}
                className="p-5 bg-[#141414] border border-[#2A2A2A] rounded-xl gold-transition hover:border-[#C8A45A]/40 hover:bg-[#1A1A1A] text-center"
              >
                <span className="text-[#F5F5F0] text-sm font-medium block">{region}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Testimonials</span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mt-3">What Collectors Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="p-6 bg-[#141414] border border-[#2A2A2A] rounded-2xl">
                <StarRating rating={t.rating} size="md" />
                <p className="text-[#C8A45A] text-4xl font-['Cormorant_Garamond'] mt-2 mb-3">"</p>
                <p className="text-[#888880] text-sm leading-relaxed mb-4">{t.text}</p>
                <div className="border-t border-[#2A2A2A] pt-4">
                  <p className="text-[#F5F5F0] font-medium text-sm">{t.name}</p>
                  <p className="text-[#888880] text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Fresh from the lens</span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#F5F5F0] mt-3">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-[#141414] border border-[#2A2A2A] rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45A]/5 to-transparent" />
          <div className="relative z-10">
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#F5F5F0] mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-[#888880] text-lg max-w-lg mx-auto mb-8">
              Bring the beauty of Africa into your home or office with museum-quality prints.
            </p>
            <Link
              to="/gallery"
              className="inline-block px-10 py-3.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4B66A] gold-transition"
            >
              Start Collecting
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
