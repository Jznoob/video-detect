import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import ParticleBackground from '../../components/ParticleBackground';

const LoginPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
            <ParticleBackground />
            <div className="z-10 text-center animate-fade-in-down">
                <h1 className="text-7xl md:text-9xl font-black tracking-widest uppercase"
                    style={{ fontFamily: `'Orbitron', sans-serif`, textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                    LUXTRACE
                </h1>
                <div className="mt-12 flex justify-center gap-4">
                    <button className="px-6 py-2 border border-white/50 rounded-md hover:bg-white/10 transition-colors">
                        Sign Up
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-white text-gray-900 font-bold rounded-md hover:bg-gray-200 transition-colors">
                        Log In
                    </button>
                    <button className="px-6 py-2 border border-white/50 rounded-md hover:bg-white/10 transition-colors">
                        Explore
                    </button>
                </div>
            </div>

            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default LoginPage; 