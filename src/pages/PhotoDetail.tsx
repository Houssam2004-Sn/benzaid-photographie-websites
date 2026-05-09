import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { photos } from '../data/photos';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';
import { StarRating } from '../components/StarRating';
import { Lightbox } from '../components/Lightbox';

const formatOptions = [
  { key: 'digital_small' as const, label: 'Digital Small', desc: '1080px, watermark-free', priceKey: 'price_small' as const },
  { key: 'digital_large' as const, label: 'Digital Large', desc: 'Full resolution, print-ready', priceKey: 'price_large' as const },
  { key: 'commercial' as const, label: 'Commercial License', desc: 'Business usage rights', priceKey: 'price_commercial' as const },
  { key: 'print_A4' as const, label: 'Fine Art Print A4', desc: '21×29.7cm, shipped', priceKey: 'price_print_A4' as const },
  { key: 'print_A3' as const, label: 'Fine Art Print A3', desc: '29.7×42cm, shipped', priceKey: 'price_print_A3' as const },
  { key: 'print_A2' as const, label: 'Fine Art Print A2', desc: '42×59.4cm, shipped', priceKey: 'price_print_A2' as const },
  { key: 'canvas' as const, label: 'Canvas Print', desc: 'Stretched canvas, ready to hang', priceKey: 'price_canvas' as const },
];

export default function PhotoDetail() {
  const { id } = useParams();
  const photo = photos.find(p => p.id === id);
  const { addToCart } = useCart();
  const { currency } = useCurrency();
  const [selected, setSelected] = useState(formatOptions[1]);
  const [added, setAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!photo) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-[#888880] text-lg">Photo not found</p>
        <Link to="/gallery" className="text-[#C8A45A] hover:underline mt-4 inline-block">Back to Gallery</Link>
      </div>
    );
  }

  const price = photo[selected.priceKey];

  const handleAdd = () => {
    addToCart(photo, selected.key, price);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedPhotos = photos
    .filter(p => p.id !== photo.id && (p.category === photo.category || p.continent_region === photo.continent_region))
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888880] mb-8">
          <Link to="/" className="hover:text-[#C8A45A] gold-transition">Home</Link>
          <span>/</span>
          <Link to="/gallery" className="hover:text-[#C8A45A] gold-transition">Gallery</Link>
          <span>/</span>
          <span className="text-[#C8A45A]">{photo.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1A1A] cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
            <img
              src={photo.image_url}
              alt={photo.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.style.backgroundColor = photo.dominant_color;
              }}
            />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent opacity-0 group-hover:opacity-100 gold-transition flex items-center justify-center">
                <span className="text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full">🔍 Click to zoom</span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-[#C8A45A] text-xs uppercase tracking-wider">
                  {photo.category}
                </span>
              </div>
            </div>

            {/* Thumbnails row — decorative */}
            <div className="flex gap-2 mt-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-20 h-16 rounded-lg bg-[#141414] border border-[#2A2A2A] overflow-hidden" style={{ backgroundColor: photo.dominant_color, opacity: 0.6 + i * 0.15 }} />
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#F5F5F0] leading-tight mb-3">
              {photo.title}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={photo.rating} count={photo.review_count} size="md" />
              <span className="text-[#888880] text-sm">|</span>
              <span className="text-[#888880] text-sm">{photo.downloads_count} downloads</span>
            </div>
            <p className="text-[#888880] leading-relaxed mb-6">{photo.description}</p>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Location', value: photo.location_taken },
                { label: 'Date Taken', value: new Date(photo.date_taken).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Camera', value: photo.camera_model },
                { label: 'Resolution', value: photo.resolution },
                { label: 'File Size', value: photo.file_size },
                { label: 'Print Stock', value: `${photo.stock_prints} available` },
              ].map(meta => (
                <div key={meta.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-3">
                  <p className="text-[#888880] text-[10px] uppercase tracking-wider">{meta.label}</p>
                  <p className="text-[#F5F5F0] text-sm mt-0.5">{meta.value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {photo.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full text-[#888880] text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Format Selection */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
              <h3 className="text-[#F5F5F0] font-medium mb-4">Select Format</h3>
              <div className="space-y-2">
                {formatOptions.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setSelected(opt)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border gold-transition cursor-pointer ${
                      selected.key === opt.key
                        ? 'border-[#C8A45A] bg-[#C8A45A]/5'
                        : 'border-[#2A2A2A] hover:border-[#3A3A3A]'
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-[#F5F5F0] text-sm font-medium">{opt.label}</p>
                      <p className="text-[#888880] text-xs">{opt.desc}</p>
                    </div>
                    <span className="text-[#C8A45A] font-medium text-sm">
                      {formatCurrency(photo[opt.priceKey], currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-full font-medium text-sm gold-transition cursor-pointer ${
                added
                  ? 'bg-[#4CAF7A] text-white'
                  : 'bg-[#C8A45A] text-[#0A0A0A] hover:bg-[#D4B66A]'
              }`}
            >
              {added ? '✓ Added to Cart!' : `Add to Cart — ${formatCurrency(price, currency)}`}
            </button>

            {/* Share */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#2A2A2A]">
              <span className="text-[#888880] text-xs">Share:</span>
              {['Twitter', 'Facebook', 'Pinterest', 'Email'].map(s => (
                <button key={s} className="text-[#888880] hover:text-[#C8A45A] gold-transition text-xs cursor-pointer">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedPhotos.length > 0 && (
          <section className="mt-20 pt-20 border-t border-[#1A1A1A]">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPhotos.map(p => (
                <Link
                  key={p.id}
                  to={`/photo/${p.id}`}
                  className="group block bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden gold-transition hover:border-[#C8A45A]/40"
                >
                  <div className="aspect-[4/3] bg-[#1A1A1A]" style={{ backgroundColor: p.dominant_color }} />
                  <div className="p-4">
                    <h3 className="text-[#F5F5F0] text-sm font-medium group-hover:text-[#C8A45A] gold-transition">{p.title}</h3>
                    <p className="text-[#888880] text-xs mt-1">{p.location_taken}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox src={photo.image_url} alt={photo.title} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
