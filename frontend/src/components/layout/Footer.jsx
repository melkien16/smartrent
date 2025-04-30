import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary-500" />
              <span className="text-lg font-bold text-gray-900">smart<span className="text-primary-500">Rent</span></span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Rent what you need, share what you don't - the smartest way to access without ownership.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-500">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-500">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-500">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-sm text-gray-600 hover:text-primary-500">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/explore?popular=true" className="text-sm text-gray-600 hover:text-primary-500">
                  Popular Items
                </Link>
              </li>
              <li>
                <Link to="/explore?recent=true" className="text-sm text-gray-600 hover:text-primary-500">
                  Recent Listings
                </Link>
              </li>
              <li>
                <Link to="/list-item" className="text-sm text-gray-600 hover:text-primary-500">
                  List Your Item
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-sm text-gray-600 hover:text-primary-500">
                  Sign Up / Login
                </Link>
              </li>
              <li>
                <Link to="/profile/me" className="text-sm text-gray-600 hover:text-primary-500">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/my-rentals" className="text-sm text-gray-600 hover:text-primary-500">
                  My Rentals
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-gray-600 hover:text-primary-500">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-primary-500">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-gray-600 hover:text-primary-500">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@smartrent.com" className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-500">
                  <Mail size={16} />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-xs text-gray-500">
            &copy; {currentYear} smartRent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;