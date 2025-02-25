// Entité du domaine
export interface Publication {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  validFrom: Date;
  validTo: Date;
  createdAt: Date;
  likes: number;
  category: string;
  status: PublicationStatus;
  authorId: string;
}

export type PublicationStatus = 'pending' | 'published';

export interface CreatePublicationDTO {
  title: string;
  content: string;
  imageUrl: string;
  validFrom: string;
  validTo: string;
  category: string;
  sendNewsletter?: boolean;
}