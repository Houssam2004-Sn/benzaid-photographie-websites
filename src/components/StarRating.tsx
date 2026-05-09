export function StarRating({ rating, count, size = 'sm' }: { rating: number; count?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';
  return (
    <div className={`flex items-center gap-1 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'text-[#C8A45A]' : 'text-[#3A3A3A]'}>
          ★
        </span>
      ))}
      {count !== undefined && (
        <span className="text-[#888880] ml-1">({count})</span>
      )}
    </div>
  );
}
