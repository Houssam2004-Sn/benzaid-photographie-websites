import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../utils/formatCurrency';
import { StarRating } from './StarRating';
import type { Photo } from '../data/photos';

export function PhotoCard({ photo }: { photo: Photo }) {
  const { currency } = useCurrency();

  return (
    <Link
      to={`/photo/${photo.id}`}
      className="group block bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden gold-transition hover:border-[#C8A45A]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C8A45A]/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
        <img
          src={photo.image_url}
          alt={photo.title}
          className="w-full h-full object-cover gold-transition group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.style.backgroundColor = photo.dominant_color;
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 gold-transition" />
        <div className="absolute inset-0 bg-[#C8A45A]/0 group-hover:bg-[#C8A45A]/5 gold-transition" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-[#C8A45A] text-[10px] uppercase tracking-wider">
            {photo.category}
          </span>
        </div>

        {/* Featured badge */}
        {photo.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-[#C8A45A]/90 text-[#0A0A0A] rounded-full text-[10px] font-bold uppercase tracking-wider">
              ★ Featured
            </span>
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 gold-transition translate-y-2 group-hover:translate-y-0 flex gap-2">
          <span className="flex-1 py-2 bg-[#C8A45A] text-[#0A0A0A] text-center rounded-full text-xs font-medium">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-[#F5F5F0] font-['Cormorant_Garamond'] text-lg font-semibold leading-tight mb-1 group-hover:text-[#C8A45A] gold-transition">
          {photo.title}
        </h3>
        <p className="text-[#888880] text-xs mb-2">{photo.location_taken}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#C8A45A] font-medium text-sm">
            {formatCurrency(photo.price_small, currency)} – {formatCurrency(photo.price_commercial, currency)}
          </span>
          <StarRating rating={photo.rating} count={photo.review_count} size="sm" />
        </div>
      </div>
    </Link>
  );
}
