import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
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
);

export default React.memo(HeroSection); 