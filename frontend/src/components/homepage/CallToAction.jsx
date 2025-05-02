import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => (
  <section className="bg-primary-600 py-16 px-4 text-white sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to Start Renting?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Join thousands of users who are already renting and earning on our platform.
        </p>
        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Link
            to="/signup"
            className="btn bg-white px-6 py-3 text-primary-600 hover:bg-gray-100"
          >
            Sign Up Now
          </Link>
          <Link
            to="/explore"
            className="btn border border-white bg-transparent px-6 py-3 text-white hover:bg-white/10"
          >
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default React.memo(CallToAction); 