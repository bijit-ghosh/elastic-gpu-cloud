
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import IntegrationsSection from '@/components/landing/IntegrationsSection';
import WorkloadSection from '@/components/landing/WorkloadSection';
import TestimonialSection from '@/components/landing/TestimonialSection';
import CTASection from '@/components/landing/CTASection';
import NavBar from '@/components/landing/NavBar';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <IntegrationsSection />
        <WorkloadSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
