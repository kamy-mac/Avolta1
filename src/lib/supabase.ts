import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createPublication(data: {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  validFrom: string;
  validTo: string;
}) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error('User not authenticated');
  }

  const { data: publication, error } = await supabase
    .from('publications')
    .insert({
      title: data.title,
      content: data.content,
      image_url: data.imageUrl,
      category: data.category,
      valid_from: data.validFrom,
      valid_to: data.validTo,
      created_by: user.data.user.id
    })
    .select()
    .single();

  if (error) throw error;
  return publication;
}

export async function getPublications() {
  const { data, error } = await supabase
    .from('publications')
    .select(`
      *,
      comments (
        id,
        content,
        created_at,
        user_id
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getNewsletterSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addComment(publicationId: string, content: string) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      publication_id: publicationId,
      user_id: user.data.user.id,
      content
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function likePublication(publicationId: string) {
  const { error } = await supabase.rpc('increment_likes', {
    publication_id: publicationId
  });

  if (error) throw error;
}

export async function deleteNewsletterSubscriber(id: string) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}