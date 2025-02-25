import { useState, useEffect } from 'react';
import { Publication } from '../../core/domain/entities/Publication';
import { PublicationService } from '../../core/application/services/PublicationService';
import { SupabasePublicationRepository } from '../../infrastructure/repositories/SupabasePublicationRepository';

const publicationService = new PublicationService(
  new SupabasePublicationRepository()
);

export function usePublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      setIsLoading(true);
      const data = await publicationService.getPublications();
      setPublications(data);
    } catch (err) {
      setError('Erreur lors du chargement des publications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createPublication = async (data: any) => {
    try {
      const newPublication = await publicationService.createPublication(data);
      setPublications(prev => [newPublication, ...prev]);
      return newPublication;
    } catch (err) {
      setError('Erreur lors de la création de la publication');
      throw err;
    }
  };

  return {
    publications,
    isLoading,
    error,
    createPublication,
    refreshPublications: loadPublications
  };
}