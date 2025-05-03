import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ItemDetailPage from './pages/ItemDetailPage';
import ProfilePage from './pages/ProfilePage';
import ListItemPage from './pages/ListItemPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FavoritesPage from './pages/FavoritesPage';
import PaymentPage from './pages/PaymentPage';
import SubscribePage from './pages/subscribePage';  

// Context providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { BookingProvider } from './context/BookingContext';
import { BalanceProvider } from './context/BalanceContext';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <CategoryProvider>
            <BookingProvider>
              <BalanceProvider>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/explore" element={<ExplorePage />} />
                      <Route path="/item/:id" element={<ItemDetailPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/profile/:id" element={<ProfilePage />} />
                      <Route path="/list-item" element={<ListItemPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/subscribe" element={<SubscribePage />} />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <DashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin" 
                        element={
                          <ProtectedRoute requireAdmin>
                            <AdminDashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                    </Routes>
                  </main>
                  <Footer />
                  <Toaster position="top-right" />
                </div>
              </BalanceProvider>
            </BookingProvider>
          </CategoryProvider>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;