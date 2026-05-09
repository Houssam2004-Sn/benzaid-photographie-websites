import { useState, useRef, useEffect } from 'react';
import { photos as initialPhotos, type Photo } from '../../data/photos';
import { useCurrency } from '../../context/CurrencyContext';
import { formatCurrency } from '../../utils/formatCurrency';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = Photo['category'];

interface FormData {
  title: string;
  description: string;
  category: Category;
  continent_region: string;
  tags: string;
  price_small: string;
  price_large: string;
  price_print_A4: string;
  price_print_A3: string;
  price_print_A2: string;
  price_canvas: string;
  price_commercial: string;
  image_url: string;
  watermarked_preview_url: string;
  resolution: string;
  file_size: string;
  camera_model: string;
  location_taken: string;
  date_taken: string;
  stock_prints: string;
  dominant_color: string;
  is_featured: boolean;
  is_visible: boolean;
}

const CATEGORIES: Category[] = ['Nature', 'Urban', 'Portrait', 'Landscape', 'Wildlife', 'Abstract'];
const REGIONS = ['North Africa', 'West Africa', 'East Africa', 'Southern Africa', 'Central Africa'];

const emptyForm: FormData = {
  title: '',
  description: '',
  category: 'Landscape',
  continent_region: 'North Africa',
  tags: '',
  price_small: '',
  price_large: '',
  price_print_A4: '',
  price_print_A3: '',
  price_print_A2: '',
  price_canvas: '',
  price_commercial: '',
  image_url: '',
  watermarked_preview_url: '',
  resolution: '',
  file_size: '',
  camera_model: '',
  location_taken: '',
  date_taken: '',
  stock_prints: '',
  dominant_color: '#C8A45A',
  is_featured: false,
  is_visible: true,
};

function photoToForm(p: Photo): FormData {
  return {
    title: p.title,
    description: p.description,
    category: p.category,
    continent_region: p.continent_region,
    tags: p.tags.join(', '),
    price_small: String(p.price_small),
    price_large: String(p.price_large),
    price_print_A4: String(p.price_print_A4),
    price_print_A3: String(p.price_print_A3),
    price_print_A2: String(p.price_print_A2),
    price_canvas: String(p.price_canvas),
    price_commercial: String(p.price_commercial),
    image_url: p.image_url,
    watermarked_preview_url: p.watermarked_preview_url,
    resolution: p.resolution,
    file_size: p.file_size,
    camera_model: p.camera_model,
    location_taken: p.location_taken,
    date_taken: p.date_taken,
    stock_prints: String(p.stock_prints),
    dominant_color: p.dominant_color,
    is_featured: p.is_featured,
    is_visible: p.is_visible,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({
  label, name, value, onChange, type = 'text', placeholder = '', required = false,
}: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#888880] text-xs uppercase tracking-wider">
        {label}{required && <span className="text-[#C8A45A] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="px-3 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#F5F5F0] text-sm placeholder-[#444] focus:outline-none focus:border-[#C8A45A] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options,
}: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#888880] text-xs uppercase tracking-wider">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#F5F5F0] text-sm focus:outline-none focus:border-[#C8A45A] transition-colors"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Photo Modal ──────────────────────────────────────────────────────────────

function PhotoModal({
  mode, photo, onClose, onSave,
}: {
  mode: 'add' | 'edit';
  photo: Photo | null;
  onClose: () => void;
  onSave: (data: FormData, previewUrl: string) => void;
}) {
  const [form, setForm] = useState<FormData>(mode === 'edit' && photo ? photoToForm(photo) : emptyForm);
  const [previewUrl, setPreviewUrl] = useState<string>(mode === 'edit' && photo ? photo.image_url : '');
  const [activeTab, setActiveTab] = useState<'info' | 'pricing' | 'meta'>('info');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPreviewUrl(url);
      setForm(prev => ({ ...prev, image_url: url, watermarked_preview_url: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, previewUrl);
  };

  const tabs = [
    { id: 'info', label: 'Informations' },
    { id: 'pricing', label: 'Prix' },
    { id: 'meta', label: 'Métadonnées' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
          <h2 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#F5F5F0]">
            {mode === 'add' ? '+ Ajouter une photo' : 'Modifier la photo'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] text-[#888880] hover:text-[#F5F5F0] hover:bg-[#2A2A2A] transition-colors cursor-pointer text-lg"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2A2A2A] px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors cursor-pointer -mb-px ${
                activeTab === tab.id
                  ? 'border-[#C8A45A] text-[#C8A45A]'
                  : 'border-transparent text-[#888880] hover:text-[#F5F5F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">

          {/* ── Tab: Informations ── */}
          {activeTab === 'info' && (
            <div className="space-y-5">
              {/* Image Upload */}
              <div className="flex flex-col gap-1">
                <label className="text-[#888880] text-xs uppercase tracking-wider">
                  Image <span className="text-[#C8A45A]">*</span>
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all ${
                    dragOver ? 'border-[#C8A45A] bg-[#C8A45A]/5' : 'border-[#2A2A2A] hover:border-[#C8A45A]/50 hover:bg-[#1A1A1A]'
                  }`}
                  style={{ minHeight: 160 }}
                >
                  {previewUrl ? (
                    <div className="relative">
                      <img src={previewUrl} alt="preview" className="w-full object-cover" style={{ maxHeight: 220 }} />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Changer l'image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                      <span className="text-3xl">🖼️</span>
                      <p className="text-[#888880] text-sm">Glisser une image ou cliquer pour choisir</p>
                      <p className="text-[#555] text-xs">JPG, PNG, WEBP — max 50 MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                {/* OR: image URL */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-px bg-[#2A2A2A]" />
                  <span className="text-[#555] text-xs">ou URL</span>
                  <div className="flex-1 h-px bg-[#2A2A2A]" />
                </div>
                <input
                  type="text"
                  name="image_url"
                  value={form.image_url.startsWith('data:') ? '' : form.image_url}
                  onChange={e => {
                    setForm(prev => ({ ...prev, image_url: e.target.value }));
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="/images/photo-13.jpg ou https://..."
                  className="px-3 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#F5F5F0] text-sm placeholder-[#444] focus:outline-none focus:border-[#C8A45A] transition-colors"
                />
              </div>

              <InputField label="Titre" name="title" value={form.title} onChange={handleChange} placeholder="Sahara's Golden Dawn" required />

              <div className="flex flex-col gap-1">
                <label className="text-[#888880] text-xs uppercase tracking-wider">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Description de la photo..."
                  className="px-3 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#F5F5F0] text-sm placeholder-[#444] focus:outline-none focus:border-[#C8A45A] transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Catégorie" name="category" value={form.category} onChange={handleChange} options={CATEGORIES} />
                <SelectField label="Région" name="continent_region" value={form.continent_region} onChange={handleChange} options={REGIONS} />
              </div>

              <InputField label="Lieu de prise de vue" name="location_taken" value={form.location_taken} onChange={handleChange} placeholder="Merzouga, Morocco" />
              <InputField label="Date de prise de vue" name="date_taken" value={form.date_taken} onChange={handleChange} type="date" />
              <InputField label="Tags (séparés par des virgules)" name="tags" value={form.tags} onChange={handleChange} placeholder="desert, sunrise, sahara" />

              {/* Toggles */}
              <div className="flex gap-6">
                {[
                  { name: 'is_visible', label: 'Visible', checked: form.is_visible },
                  { name: 'is_featured', label: 'En vedette ★', checked: form.is_featured },
                ].map(toggle => (
                  <label key={toggle.name} className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name={toggle.name}
                        checked={toggle.checked}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-[#2A2A2A] rounded-full peer-checked:bg-[#C8A45A] transition-colors" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                    </div>
                    <span className="text-[#F5F5F0] text-sm">{toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: Pricing ── */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <p className="text-[#888880] text-xs">Tous les prix en USD ($)</p>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Digital Small" name="price_small" value={form.price_small} onChange={handleChange} type="number" placeholder="9.99" />
                <InputField label="Digital Large" name="price_large" value={form.price_large} onChange={handleChange} type="number" placeholder="39.99" />
                <InputField label="Print A4" name="price_print_A4" value={form.price_print_A4} onChange={handleChange} type="number" placeholder="45.00" />
                <InputField label="Print A3" name="price_print_A3" value={form.price_print_A3} onChange={handleChange} type="number" placeholder="75.00" />
                <InputField label="Print A2" name="price_print_A2" value={form.price_print_A2} onChange={handleChange} type="number" placeholder="120.00" />
                <InputField label="Canvas" name="price_canvas" value={form.price_canvas} onChange={handleChange} type="number" placeholder="160.00" />
                <InputField label="Licence commerciale" name="price_commercial" value={form.price_commercial} onChange={handleChange} type="number" placeholder="250.00" />
                <InputField label="Stock prints" name="stock_prints" value={form.stock_prints} onChange={handleChange} type="number" placeholder="50" />
              </div>
            </div>
          )}

          {/* ── Tab: Métadonnées ── */}
          {activeTab === 'meta' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Appareil photo" name="camera_model" value={form.camera_model} onChange={handleChange} placeholder="Sony A7R IV" />
                <InputField label="Résolution" name="resolution" value={form.resolution} onChange={handleChange} placeholder="6000x4000" />
                <InputField label="Taille fichier" name="file_size" value={form.file_size} onChange={handleChange} placeholder="18.2 MB" />
                <InputField label="URL preview watermark" name="watermarked_preview_url" value={form.watermarked_preview_url} onChange={handleChange} placeholder="/images/photo-wm.jpg" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[#888880] text-xs uppercase tracking-wider">Couleur dominante</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="dominant_color"
                    value={form.dominant_color}
                    onChange={handleChange}
                    className="w-10 h-10 rounded-lg border border-[#2A2A2A] bg-transparent cursor-pointer"
                  />
                  <span className="text-[#F5F5F0] text-sm font-mono">{form.dominant_color}</span>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2A2A2A]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-[#2A2A2A] text-[#888880] rounded-full text-sm hover:border-[#F5F5F0] hover:text-[#F5F5F0] transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="submit"
            form=""
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full text-sm font-semibold hover:bg-[#D4B66A] transition-colors cursor-pointer"
          >
            {mode === 'add' ? 'Ajouter' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────

function DeleteModal({ photo, onClose, onConfirm }: { photo: Photo; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141414] border border-[#E05252]/30 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E05252]/10 flex items-center justify-center text-xl">🗑️</div>
          <h3 className="font-['Cormorant_Garamond'] text-lg font-bold text-[#F5F5F0]">Supprimer la photo</h3>
        </div>
        <p className="text-[#888880] text-sm mb-1">
          Vous êtes sur le point de supprimer :
        </p>
        <p className="text-[#F5F5F0] font-medium mb-1">"{photo.title}"</p>
        <p className="text-[#888880] text-xs mb-6">Cette action est irréversible.</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-[#2A2A2A] text-[#888880] rounded-full text-sm hover:border-[#F5F5F0] hover:text-[#F5F5F0] transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-[#E05252] text-white rounded-full text-sm font-semibold hover:bg-[#C04040] transition-colors cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ManagePhotos() {
  const [photoList, setPhotoList] = useState<Photo[]>(() => {
  const saved = localStorage.getItem('benzaid_photos');
  return saved ? JSON.parse(saved) : initialPhotos;
});
  useEffect(() => {
  localStorage.setItem('benzaid_photos', JSON.stringify(photoList));
}, [photoList]);
   
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const { currency } = useCurrency();

  // Modals state
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Photo | null>(null);

  // Filters
  const filtered = photoList.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.location_taken.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  // Actions
  const toggleVisibility = (id: string) =>
    setPhotoList(prev => prev.map(p => p.id === id ? { ...p, is_visible: !p.is_visible } : p));

  const toggleFeatured = (id: string) =>
    setPhotoList(prev => prev.map(p => p.id === id ? { ...p, is_featured: !p.is_featured } : p));

  const deletePhoto = (id: string) =>
    setPhotoList(prev => prev.filter(p => p.id !== id));

  const handleSave = (data: FormData, _previewUrl: string) => {
    if (modalMode === 'add') {
      const newPhoto: Photo = {
        id: String(Date.now()),
        title: data.title,
        description: data.description,
        category: data.category,
        continent_region: data.continent_region,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
        price_small: parseFloat(data.price_small) || 0,
        price_large: parseFloat(data.price_large) || 0,
        price_print_A4: parseFloat(data.price_print_A4) || 0,
        price_print_A3: parseFloat(data.price_print_A3) || 0,
        price_print_A2: parseFloat(data.price_print_A2) || 0,
        price_canvas: parseFloat(data.price_canvas) || 0,
        price_commercial: parseFloat(data.price_commercial) || 0,
        image_url: data.image_url,
        watermarked_preview_url: data.watermarked_preview_url || data.image_url,
        resolution: data.resolution,
        file_size: data.file_size,
        camera_model: data.camera_model,
        location_taken: data.location_taken,
        date_taken: data.date_taken,
        is_featured: data.is_featured,
        is_visible: data.is_visible,
        stock_prints: parseInt(data.stock_prints) || 0,
        downloads_count: 0,
        rating: 0,
        review_count: 0,
        dominant_color: data.dominant_color,
        created_at: new Date().toISOString().split('T')[0],
      };
      setPhotoList(prev => [newPhoto, ...prev]);
    } else if (modalMode === 'edit' && selectedPhoto) {
      setPhotoList(prev => prev.map(p =>
        p.id === selectedPhoto.id
          ? {
              ...p,
              title: data.title,
              description: data.description,
              category: data.category,
              continent_region: data.continent_region,
              tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
              price_small: parseFloat(data.price_small) || p.price_small,
              price_large: parseFloat(data.price_large) || p.price_large,
              price_print_A4: parseFloat(data.price_print_A4) || p.price_print_A4,
              price_print_A3: parseFloat(data.price_print_A3) || p.price_print_A3,
              price_print_A2: parseFloat(data.price_print_A2) || p.price_print_A2,
              price_canvas: parseFloat(data.price_canvas) || p.price_canvas,
              price_commercial: parseFloat(data.price_commercial) || p.price_commercial,
              image_url: data.image_url,
              watermarked_preview_url: data.watermarked_preview_url || data.image_url,
              resolution: data.resolution,
              file_size: data.file_size,
              camera_model: data.camera_model,
              location_taken: data.location_taken,
              date_taken: data.date_taken,
              is_featured: data.is_featured,
              is_visible: data.is_visible,
              stock_prints: parseInt(data.stock_prints) || p.stock_prints,
              dominant_color: data.dominant_color,
            }
          : p
      ));
    }
    setModalMode(null);
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#F5F5F0]">Manage Photos</h1>
            <p className="text-[#888880] text-sm">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => { setSelectedPhoto(null); setModalMode('add'); }}
            className="px-5 py-2.5 bg-[#C8A45A] text-[#0A0A0A] rounded-full text-sm font-semibold hover:bg-[#D4B66A] gold-transition cursor-pointer"
          >
            + Add New Photo
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par titre, catégorie, lieu..."
            className="flex-1 max-w-md px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-full text-[#F5F5F0] placeholder-[#555] focus:outline-none focus:border-[#C8A45A] gold-transition text-sm"
          />
          <div className="flex gap-2 flex-wrap">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                  filterCategory === cat
                    ? 'bg-[#C8A45A] text-[#0A0A0A]'
                    : 'bg-[#141414] border border-[#2A2A2A] text-[#888880] hover:border-[#C8A45A]/50 hover:text-[#F5F5F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] text-[#888880] text-xs uppercase tracking-wider">
                  <th className="text-left p-4">Photo</th>
                  <th className="text-left p-4 hidden md:table-cell">Catégorie</th>
                  <th className="text-left p-4 hidden lg:table-cell">Prix</th>
                  <th className="text-center p-4">Statut</th>
                  <th className="text-center p-4 hidden sm:table-cell">Vedette</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-[#555]">
                      <span className="text-3xl block mb-2">🔍</span>
                      Aucune photo trouvée
                    </td>
                  </tr>
                ) : filtered.map(photo => (
                  <tr key={photo.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#1A1A1A] gold-transition">
                    {/* Photo + Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden"
                          style={{ backgroundColor: photo.dominant_color }}
                        >
                          {photo.image_url && !photo.image_url.startsWith('/') && (
                            <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="text-[#F5F5F0] font-medium leading-tight">{photo.title}</p>
                          <p className="text-[#888880] text-xs">{photo.location_taken}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-[#C8A45A] hidden md:table-cell">{photo.category}</td>

                    {/* Price */}
                    <td className="p-4 text-[#888880] hidden lg:table-cell text-xs">
                      {formatCurrency(photo.price_small, currency)} – {formatCurrency(photo.price_commercial, currency)}
                    </td>

                    {/* Visibility */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleVisibility(photo.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          photo.is_visible
                            ? 'bg-[#4CAF7A]/10 text-[#4CAF7A] hover:bg-[#4CAF7A]/20'
                            : 'bg-[#E05252]/10 text-[#E05252] hover:bg-[#E05252]/20'
                        }`}
                      >
                        {photo.is_visible ? 'Visible' : 'Caché'}
                      </button>
                    </td>

                    {/* Featured */}
                    <td className="p-4 text-center hidden sm:table-cell">
                      <button
                        onClick={() => toggleFeatured(photo.id)}
                        className={`text-xl cursor-pointer transition-colors ${photo.is_featured ? 'text-[#C8A45A]' : 'text-[#3A3A3A] hover:text-[#C8A45A]/50'}`}
                        title={photo.is_featured ? 'Retirer de la sélection' : 'Mettre en vedette'}
                      >
                        {photo.is_featured ? '★' : '☆'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => { setSelectedPhoto(photo); setModalMode('edit'); }}
                          className="text-[#888880] hover:text-[#C8A45A] text-xs font-medium cursor-pointer transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => setDeleteTarget(photo)}
                          className="text-[#888880] hover:text-[#E05252] text-xs font-medium cursor-pointer transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Photo count summary */}
        <p className="text-[#555] text-xs text-center mt-4">
          {photoList.length} photo{photoList.length !== 1 ? 's' : ''} au total · {photoList.filter(p => p.is_visible).length} visibles · {photoList.filter(p => p.is_featured).length} en vedette
        </p>
      </div>

      {/* Modals */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <PhotoModal
          mode={modalMode}
          photo={selectedPhoto}
          onClose={() => { setModalMode(null); setSelectedPhoto(null); }}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          photo={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => { deletePhoto(deleteTarget.id); setDeleteTarget(null); }}
        />
      )}
    </div>
  );
}
