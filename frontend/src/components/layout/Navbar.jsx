import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, User, LogIn, Package, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBalance } from '../../context/BalanceContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { balance } = useBalance();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to explore page with search query
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-900">smart<span className="text-primary-500">Rent</span></span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block md:w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for items to rent..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/explore" className="text-sm font-medium text-gray-700 hover:text-primary-500">
              Explore
            </Link>
            <Link to="/list-item" className="btn-primary">
              List an Item
            </Link>
            
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-500"
                >
                  {!isAdmin && (
                    <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-1">
                      <Wallet size={16} className="text-primary-500" />
                      <span className="text-sm font-medium">${balance.toFixed(2)}</span>
                    </div>
                  )}
                  <User size={20} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    {isAdmin ? (
                      <>
                        <Link 
                          to="/admin" 
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                        <Link 
                          to="/profile/me" 
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/dashboard" 
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/profile/me" 
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link 
                          to="/favorites" 
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Favorites
                        </Link>
                        <Link 
                          to="/my-rentals" 
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Rentals
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary-500">
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-primary-500 md:hidden" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile search - shown only on mobile */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for items to rent..."
              className="input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/explore"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Explore
              </Link>
              <Link
                to="/list-item"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                List an Item
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile/me"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/favorites"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Favorites
                  </Link>
                  <Link
                    to="/my-rentals"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    My Rentals
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;