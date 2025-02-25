import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePublication from './pages/admin/CreatePublication';
import EditPublication from './pages/admin/EditPublication';
import Publications from './pages/admin/Publications';
import PendingPublications from './pages/admin/PendingPublications';
import Newsletter from './pages/admin/Newsletter';
import UserManagement from './pages/admin/UserManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SuperAdminRoute from './components/auth/SuperAdminRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route path="create" element={<CreatePublication />} />
            <Route path="publications" element={<Publications />} />
            <Route path="publications/edit/:id" element={<EditPublication />} />
            <Route path="pending" element={
              <SuperAdminRoute>
                <PendingPublications />
              </SuperAdminRoute>
            } />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="users" element={
              <SuperAdminRoute>
                <UserManagement />
              </SuperAdminRoute>
            } />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;