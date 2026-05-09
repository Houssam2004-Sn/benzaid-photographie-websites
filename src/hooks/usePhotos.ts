import { useState, useEffect } from 'react';
import { photos as initialPhotos, type Photo } from '../data/photos';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const saved = localStorage.getItem('benzaid_photos');
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem('benzaid_photos');
      if (saved) setPhotos(JSON.parse(saved));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return photos;
}