import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield, CornerRightDown, ArrowRight } from 'lucide-react';
import CategoryList from '../components/items/CategoryList';
import ItemGrid from '../components/items/ItemGrid';
import { featuredItems, recentItems, popularCategories, testimonials } from '../data/mockData';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-primary-600 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Rent anything you need. <br />
              <span className="text-accent-300">Share what you don't.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-white/80">
              Access thousands of items without the burden of ownership. Or make money by renting out your belongings.
            </p>
            
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/explore" className="btn bg-white px-6 py-3 text-primary-600 hover:bg-gray-100">
                Browse Items
              </Link>
              <Link to="/list-item" className="btn border border-white bg-transparent px-6 py-3 text-white hover:bg-white/10">
                List Your Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mt-2 text-lg text-gray-600">Find exactly what you need from our wide selection of categories</p>
          </div>
          
          <CategoryList />
          
          <div className="mt-8 text-center">
            <Link 
              to="/explore" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <span className="font-medium">View all categories</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
            <p className="mt-2 text-lg text-gray-600">Discover our most popular rental items</p>
          </div>
          
          <ItemGrid items={featuredItems.slice(0, 4)} />
          
          <div className="mt-10 text-center">
            <Link 
              to="/explore?featured=true" 
              className="btn-primary px-6 py-3"
            >
              View All Featured Items
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">How smartRent Works</h2>
            <p className="mt-2 text-lg text-gray-600">Renting has never been easier</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Search size={32} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Search & Discover</h3>
              <p className="mt-2 text-gray-600">Browse thousands of items available for rent in your area</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <CornerRightDown size={32} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Book & Pay</h3>
              <p className="mt-2 text-gray-600">Book the items you need for the dates you want and pay securely online</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <TrendingUp size={32} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Pickup & Return</h3>
              <p className="mt-2 text-gray-600">Meet the owner to pickup your rental, enjoy, and return when you're done</p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link to="/how-it-works" className="inline-flex items-center text-primary-600 hover:text-primary-700">
              <span className="font-medium">Learn more about how it works</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <p className="mt-2 text-lg text-gray-600">The most rented categories on smartRent</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularCategories.map(category => (
              <Link 
                key={category.id}
                to={`/explore?category=${category.id}`}
                className="group overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[4/3]">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p>{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
            <p className="mt-2 text-lg text-gray-600">Check out the newest items available for rent</p>
          </div>
          
          <ItemGrid items={recentItems} />
          
          <div className="mt-10 text-center">
            <Link 
              to="/explore?sort=newest" 
              className="btn-outline px-6 py-3"
            >
              View All New Items
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-2 text-lg text-gray-600">Read how smartRent has helped thousands of people</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between rounded-xl bg-white p-8 shadow-lg md:flex-row">
            <div className="mb-6 max-w-2xl md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Ready to start renting?</h2>
              <p className="mt-2 text-lg text-gray-600">
                Join thousands of people who are already saving money and earning extra income through smartRent.
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/explore" className="btn-primary px-6 py-3">
                Find Items to Rent
              </Link>
              <Link to="/list-item" className="btn-outline px-6 py-3">
                List Your Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Trust & Safety</h2>
            <p className="mt-2 text-lg text-gray-600">Your security is our top priority</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Shield size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Secure Payments</h3>
              <p className="mt-2 text-gray-600">
                All transactions are processed securely. We never store your payment information.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Shield size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Verified Users</h3>
              <p className="mt-2 text-gray-600">
                We verify the identity of all users on our platform to ensure a safe community.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Shield size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Secure Insurance</h3>
              <p className="mt-2 text-gray-600">
                Optional insurance coverage to protect both owners and renters during the rental period.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/safety" className="inline-flex items-center text-primary-600 hover:text-primary-700">
              <span className="font-medium">Learn more about our safety measures</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;