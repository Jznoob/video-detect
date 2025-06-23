import React, { useMemo } from 'react';
import Particles from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";

const ParticleBackground: React.FC = () => {
    const particlesLoaded = async (container?: Container) => {
        console.log("particles.js loaded", container);
    };

    const particleOptions = useMemo(() => ({
        background: {
            color: {
                value: '#181A20', // 深色背景
            },
        },
        fullScreen: {
            enable: true,
            zIndex: -1 // 确保在内容之下
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'repulse',
                },
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: '#ffffff',
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80,
            },
            opacity: {
                value: 0.2,
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }), []);

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={particleOptions as any}
        />
    );
}

export default ParticleBackground; 