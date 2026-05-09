import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, regions } from '../data/photos';
import { usePhotos } from '../hooks/usePhotos';
import { PhotoCard } from '../components/PhotoCard';

export default function Gallery() {
  const photos = usePhotos();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [priceRange] = useState<[number, number]>([0, 500]);

  const filteredPhotos = useMemo(() => {
    let result = [...photos].filter(p => p.is_visible);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.location_taken.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedRegion !== 'All') {
      result = result.filter(p => p.continent_region === selectedRegion);
    }

    result = result.filter(p => p.price_small >= priceRange[0] && p.price_small <= priceRange[1]);

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.downloads_count - a.downloads_count);
        break;
      case 'price_low':
        result.sort((a, b) => a.price_small - b.price_small);
        break;
      case 'price_high':
        result.sort((a, b) => b.price_small - a.price_small);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [search, selectedCategory, selectedRegion, sortBy, priceRange]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'All') params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#C8A45A] text-xs uppercase tracking-[0.2em]">Collection</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#F5F5F0] mt-3">
            Explore the Gallery
          </h1>
          <p className="text-[#888880] mt-3 max-w-lg mx-auto">
            {filteredPhotos.length} photographs available — each one a unique story from Africa.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); updateParams('q', e.target.value); }}
              placeholder="Search photos, locations, tags..."
              className="w-full px-5 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-full text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888880]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); updateParams('category', cat); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium gold-transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#C8A45A] text-[#0A0A0A]'
                      : 'bg-[#1A1A1A] text-[#888880] hover:text-[#F5F5F0] hover:bg-[#2A2A2A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-[#2A2A2A] hidden sm:block" />

            {/* Region */}
            <select
              value={selectedRegion}
              onChange={e => { setSelectedRegion(e.target.value); updateParams('region', e.target.value); }}
              className="px-3.5 py-1.5 bg-[#1A1A1A] text-[#888880] text-xs rounded-full border border-[#2A2A2A] cursor-pointer hover:border-[#C8A45A] gold-transition focus:outline-none"
            >
              {regions.map(r => (
                <option key={r} value={r} className="bg-[#0A0A0A]">{r === 'All' ? 'All Regions' : r}</option>
              ))}
            </select>

            <div className="h-6 w-px bg-[#2A2A2A] hidden sm:block" />

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); updateParams('sort', e.target.value); }}
              className="px-3.5 py-1.5 bg-[#1A1A1A] text-[#888880] text-xs rounded-full border border-[#2A2A2A] cursor-pointer hover:border-[#C8A45A] gold-transition focus:outline-none"
            >
              <option value="newest" className="bg-[#0A0A0A]">Newest</option>
              <option value="popular" className="bg-[#0A0A0A]">Most Popular</option>
              <option value="rating" className="bg-[#0A0A0A]">Highest Rated</option>
              <option value="price_low" className="bg-[#0A0A0A]">Price: Low to High</option>
              <option value="price_high" className="bg-[#0A0A0A]">Price: High to Low</option>
            </select>

            {/* View toggle */}
            <div className="ml-auto flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg gold-transition cursor-pointer ${viewMode === 'grid' ? 'bg-[#2A2A2A] text-[#F5F5F0]' : 'text-[#888880] hover:text-[#F5F5F0]'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg gold-transition cursor-pointer ${viewMode === 'masonry' ? 'bg-[#2A2A2A] text-[#F5F5F0]' : 'text-[#888880] hover:text-[#F5F5F0]'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="10" rx="1"/><rect x="14" y="3" width="7" height="6" rx="1"/><rect x="3" y="17" width="7" height="4" rx="1"/><rect x="14" y="13" width="7" height="8" rx="1"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#888880] text-lg mb-4">No photos match your criteria</p>
            <button
              onClick={() => {
                setSearch(''); setSelectedCategory('All'); setSelectedRegion('All'); setSortBy('newest');
                setSearchParams({});
              }}
              className="text-[#C8A45A] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'masonry' ? (
          <div className="masonry">
            {filteredPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
