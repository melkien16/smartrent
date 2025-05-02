import React from 'react';
import HeroSection from '../components/homepage/HeroSection';
import FeaturedCategories from '../components/homepage/FeaturedCategories';
import FeaturedItems from '../components/homepage/FeaturedItems';
import HowItWorks from '../components/homepage/HowItWorks';
import Testimonials from '../components/homepage/Testimonials';
import CallToAction from '../components/homepage/CallToAction';
import { useHomePageData } from '../hooks/useHomePageData';

const HomePage = () => {
  const { items } = useHomePageData();

  return (
    <main>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedItems items={items} />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default HomePage;
