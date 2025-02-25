import { Publication, CreatePublicationDTO } from '../../domain/entities/Publication';
import { IPublicationRepository } from '../../domain/repositories/IPublicationRepository';

export class PublicationService {
  constructor(private repository: IPublicationRepository) {}

  async createPublication(data: CreatePublicationDTO): Promise<Publication> {
    return this.repository.create(data);
  }

  async getPublications(): Promise<Publication[]> {
    return this.repository.findAll();
  }

  async getPublishedPublications(): Promise<Publication[]> {
    return this.repository.findPublished();
  }

  async getPendingPublications(): Promise<Publication[]> {
    return this.repository.findPending();
  }

  async approvePublication(id: string): Promise<void> {
    await this.repository.approve(id);
  }

  async rejectPublication(id: string): Promise<void> {
    await this.repository.reject(id);
  }

  async likePublication(id: string): Promise<void> {
    await this.repository.like(id);
  }
}