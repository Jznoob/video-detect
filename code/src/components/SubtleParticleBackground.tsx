import React, { useMemo, useState, useEffect } from 'react';
import Particles from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";

const SubtleParticleBackground: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);
    
    const particleOptions = useMemo(() => ({
        background: {
            color: {
                value: 'transparent',
            },
        },
        fullScreen: {
            enable: true,
            zIndex: -1
        },
        fpsLimit: 60,
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: isDarkMode ? "#ffffff" : "#808080",
            },
            shape: {
                type: 'circle',
            },
            opacity: {
                value: 0.15,
                random: true,
            },
            size: {
                value: 2,
                random: true,
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                out_mode: 'out',
            },
        },
        interactivity: {
            events: {
                onhover: {
                    enable: false,
                },
            },
        },
        detectRetina: true,
    }), [isDarkMode]);

    const particlesLoaded = async (container?: Container) => {};

    return (
        <Particles
            id="subtle-tsparticles"
            particlesLoaded={particlesLoaded}
            options={particleOptions as any}
        />
    );
}

export default SubtleParticleBackground; 