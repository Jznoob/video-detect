import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubtleParticleBackground from '../components/SubtleParticleBackground';

const MainLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      <SubtleParticleBackground />
      <Navbar />
      <main className="pt-16 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
