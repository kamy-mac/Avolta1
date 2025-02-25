import { supabase } from '../../lib/supabase';
import { Publication, CreatePublicationDTO } from '../../core/domain/entities/Publication';
import { IPublicationRepository } from '../../core/domain/repositories/IPublicationRepository';

export class SupabasePublicationRepository implements IPublicationRepository {
  async create(data: CreatePublicationDTO): Promise<Publication> {
    const { data: publication, error } = await supabase
      .from('publications')
      .insert({
        title: data.title,
        content: data.content,
        image_url: data.imageUrl,
        category: data.category,
        valid_from: data.validFrom,
        valid_to: data.validTo,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapToPublication(publication);
  }

  async findById(id: string): Promise<Publication | null> {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? this.mapToPublication(data) : null;
  }

  async findAll(): Promise<Publication[]> {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToPublication);
  }

  async findPublished(): Promise<Publication[]> {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToPublication);
  }

  async findPending(): Promise<Publication[]> {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToPublication);
  }

  private mapToPublication(data: any): Publication {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      imageUrl: data.image_url,
      validFrom: new Date(data.valid_from),
      validTo: new Date(data.valid_to),
      createdAt: new Date(data.created_at),
      likes: data.likes,
      category: data.category,
      status: data.status,
      authorId: data.created_by
    };
  }

  // Implémentez les autres méthodes...
}