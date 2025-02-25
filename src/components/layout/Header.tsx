import React from 'react';
import { Menu, Search, User, LogOut, Home, Calendar, MessageSquare, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { logout } from '../../lib/storage';

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { t } = useTranslation();

  const handleUserClick = () => {
    if (user) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://th.bing.com/th/id/OIP.q7Hyp5YOHI6M_X8f510pkQHaCO?w=343&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Logo Avolta"
                className="w-25 h-10"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/news" className="flex items-center text-gray-700 hover:text-[#6A0DAD]">
                <Calendar className="w-5 h-5 mr-2 text-[#6A0DAD]" />
                {t('header.news')}
              </Link>
              <Link to="/events" className="flex items-center text-gray-700 hover:text-[#6A0DAD]">
                <MessageSquare className="w-5 h-5 mr-2 text-[#6A0DAD]" />
                {t('header.events')}
              </Link>
              <Link to="/contact" className="flex items-center text-gray-700 hover:text-[#6A0DAD]">
                <Home className="w-5 h-5 mr-2 text-[#6A0DAD]" />
                {t('header.contact')}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search className="w-5 h-5 text-[#6A0DAD]" />
              </button>
              <button 
                onClick={handleUserClick}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="w-5 h-5 text-[#6A0DAD]" />
              </button>
              {user && (
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Se déconnecter"
                >
                  <LogOut className="w-5 h-5 text-[#6A0DAD]" />
                </button>
              )}
              <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
                <Menu className="w-5 h-5 text-[#6A0DAD]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}