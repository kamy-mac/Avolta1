import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Image as ImageIcon, Send, Type, Bold, Italic, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { createPublication } from '../../lib/storage';
import { useAuth } from '../../context/AuthContext';

interface PublicationForm {
  title: string;
  content: string;
  imageUrl: string;
  validFrom: string;
  validTo: string;
  category: string;
  sendNewsletter: boolean;
}

export default function CreatePublication() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [publication, setPublication] = useState<PublicationForm>({
    title: '',
    content: '',
    imageUrl: '',
    validFrom: '',
    validTo: '',
    category: 'news',
    sendNewsletter: false
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPublication(publication);
      if (user?.role === 'admin') {
        alert('Votre publication a été soumise et est en attente de validation par un super administrateur.');
      }
      navigate('/admin/publications');
    } catch (error) {
      console.error('Error creating publication:', error);
      alert('Une erreur est survenue lors de la création de la publication.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPublication(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPublication(prev => ({ ...prev, [name]: checked }));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Créer une publication</h1>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-4 py-2 text-sm font-medium text-white bg-[#6A0DAD] rounded-md hover:bg-[#5a0b91] transition-colors"
        >
          {previewMode ? 'Éditer' : 'Prévisualiser'}
        </button>
      </div>

      {previewMode ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{publication.title || 'Titre de la publication'}</h2>
          {publication.imageUrl && (
            <img
              src={publication.imageUrl}
              alt={publication.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <div className="prose max-w-none">
            {publication.content || 'Contenu de la publication...'}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {publication.validFrom && (
              <p>Valide du {formatDate(publication.validFrom)}</p>
            )}
            {publication.validTo && (
              <p>jusqu'au {formatDate(publication.validTo)}</p>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Text Editor Toolbar */}
            <div className="flex items-center space-x-2 mb-4 p-2 border-b">
              <button type="button" className="p-2 hover:bg-gray-100 rounded">
                <Bold className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded">
                <Italic className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded">
                <LinkIcon className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-300 mx-2" />
              <button type="button" className="p-2 hover:bg-gray-100 rounded">
                <AlignLeft className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded">
                <AlignCenter className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded">
                <AlignRight className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Type className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={publication.title}
                  onChange={handleInputChange}
                  className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#6A0DAD] focus:border-[#6A0DAD]"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={publication.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#6A0DAD] focus:border-[#6A0DAD]"
              >
                <option value="news">Actualités</option>
                <option value="events">Événements</option>
                <option value="press">Communiqués de presse</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Contenu
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                value={publication.content}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6A0DAD] focus:border-[#6A0DAD]"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                URL de l'image
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <ImageIcon className="h-5 w-5" />
                </span>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={publication.imageUrl}
                  onChange={handleInputChange}
                  className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#6A0DAD] focus:border-[#6A0DAD]"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
                  Date de début
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <input
                    type="date"
                    id="validFrom"
                    name="validFrom"
                    value={publication.validFrom}
                    onChange={handleInputChange}
                    className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#6A0DAD] focus:border-[#6A0DAD]"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="validTo" className="block text-sm font-medium text-gray-700">
                  Date de fin
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <input
                    type="date"
                    id="validTo"
                    name="validTo"
                    value={publication.validTo}
                    onChange={handleInputChange}
                    className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#6A0DAD] focus:border-[#6A0DAD]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sendNewsletter"
                  name="sendNewsletter"
                  checked={publication.sendNewsletter}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-[#6A0DAD] focus:ring-[#6A0DAD] border-gray-300 rounded"
                />
                <label htmlFor="sendNewsletter" className="ml-2 block text-sm text-gray-700">
                  Envoyer par newsletter aux abonnés
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A0DAD] hover:bg-[#5a0b91] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A0DAD]"
              >
                <Send className="h-5 w-5 mr-2" />
                Publier
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}