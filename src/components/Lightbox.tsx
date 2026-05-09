import { useEffect, useCallback } from 'react';

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl gold-transition z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
      >
        ✕
      </button>
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45A]/10 to-transparent pointer-events-none rounded-lg" />
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          style={{ boxShadow: '0 0 80px rgba(200,164,90,0.15)' }}
        />
        <p className="text-center mt-4 text-white/60 text-sm font-[DM_Sans]">{alt}</p>
      </div>
    </div>
  );
}
