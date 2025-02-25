import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Send } from 'lucide-react';
import { subscribeToNewsletter } from '../../lib/storage';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    try {
      await subscribeToNewsletter(email);
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:contact@avolta.be" className="hover:text-white transition-colors">
                  contact@avolta.be
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+32123456789" className="hover:text-white transition-colors">
                  +32 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Brussels Airport, Belgium</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Restez informé des dernières actualités et événements d'Avolta Belgique.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="px-6 py-2 bg-[#6A0DAD] text-white rounded-r-md hover:bg-[#5a0b91] transition-colors flex items-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  S'abonner
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="text-green-400 text-sm">Inscription réussie !</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-sm">Une erreur est survenue. Veuillez réessayer.</p>
              )}
            </form>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">À propos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="hover:text-white transition-colors">Notre histoire</Link>
                  </li>
                  <li>
                    <Link to="/team" className="hover:text-white transition-colors">Notre équipe</Link>
                  </li>
                  <li>
                    <Link to="/careers" className="hover:text-white transition-colors">Carrières</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Légal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:text-white transition-colors">Conditions</Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4">
              <div className=" flex items-center justify-center">
                 <Link to="/" className="flex items-center">
              <img
                src="https://th.bing.com/th/id/OIP.q7Hyp5YOHI6M_X8f510pkQHaCO?w=343&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Logo Avolta"
                className="w-25 h-10"
              />
            </Link>
              </div>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Avolta Belgique. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}