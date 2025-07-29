"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function MouseFollower() {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setTrail((prevTrail) => {
        const newDot: TrailDot = {
          id: nextId.current++,
          x: event.clientX,
          y: event.clientY,
          opacity: 0.6, // Initial opacity
          size: 20, // Initial size
        };
        // Keep only a certain number of dots in the trail
        const updatedTrail = [newDot, ...prevTrail.slice(0, 15)]; // Max 15 dots
        return updatedTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setTrail((prevTrail) => {
        return prevTrail.map((dot) => ({
          ...dot,
          opacity: dot.opacity - 0.05, // Fade out
          size: dot.size + 1, // Grow slightly as it fades
        })).filter((dot) => dot.opacity > 0); // Remove fully faded dots
      });
    }, 50); // Update every 50ms for smooth fading

    return () => clearInterval(fadeInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-blue-400 mix-blend-screen filter blur-md"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            transform: 'translate(-50%, -50%)', // Center the dot
            transition: 'opacity 0.05s linear, transform 0.05s linear, width 0.05s linear, height 0.05s linear', // Smooth transitions
          }}
        />
      ))}
    </div>
  );
}
