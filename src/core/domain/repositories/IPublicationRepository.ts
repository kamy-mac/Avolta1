import { Publication, CreatePublicationDTO } from '../entities/Publication';

export interface IPublicationRepository {
  create(data: CreatePublicationDTO): Promise<Publication>;
  findById(id: string): Promise<Publication | null>;
  findAll(): Promise<Publication[]>;
  findPublished(): Promise<Publication[]>;
  findPending(): Promise<Publication[]>;
  update(id: string, data: Partial<Publication>): Promise<Publication>;
  delete(id: string): Promise<void>;
  approve(id: string): Promise<void>;
  reject(id: string): Promise<void>;
  like(id: string): Promise<void>;
}