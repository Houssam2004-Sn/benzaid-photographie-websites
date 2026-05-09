import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Photo } from '../data/photos';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPhotos(data as Photo[]);
      });
  }, []);

  return photos;
}