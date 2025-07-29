"use client";

import React, { useState, useEffect } from 'react';

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: 'hidden' }} // Ensure the circle doesn't cause scrollbars
    >
      <div
        className="absolute w-6 h-6 rounded-full bg-blue-400 mix-blend-multiply filter blur-sm opacity-10 transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)', // Center the circle on the cursor
        }}
      ></div>
    </div>
  );
}