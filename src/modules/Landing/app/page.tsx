'use client';

import React from 'react';
import Background from '@/modules/Landing/components/Hero/Background';
import Content from '@/modules/Landing/components/Hero/Content';

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <Content />
    </div>
  );
};

export default PortfolioPage;