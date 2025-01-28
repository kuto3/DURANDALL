"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Page = () => {
  const rocketRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const [xValue, setXValue] = useState(20);
  const path = useRef([]);

  useEffect(() => {
    const rocket = rocketRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let t = 0;

    // Set canvas size to match the container
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    // Generate random end point for each run
    const endX = Math.random() * (canvas.width - 50) + 50; // Ensures rocket stays within view but not at edges
    const endY = Math.random() * (canvas.height / 2) + 50; // Ensures rocket goes up but not too close to top

    // Pre-calculate the path with a random endpoint
    for (let i = 0; i < 500; i += 0.5) {
      const progress = i / 500;
      const x = progress * endX;
      const y = canvas.height - (progress * endY); // Invert y because canvas origin is top-left
      path.current.push({ x, y });
    }

    // Draw the entire path at the start
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    path.current.forEach(({ x, y }, index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const moveRocket = () => {
      // Use the pre-calculated path for smooth movement
      const currentIndex = Math.floor(t / 2);
      if (currentIndex < path.current.length) {
        const { x, y } = path.current[currentIndex];
        rocket.style.transform = `translate(${x}px, -${canvas.height - y}px)`;

        const newXValue = Math.floor(20 + t / 5); // Adjust the divisor to control the speed of increment
        setXValue(newXValue);

        t += 2; // Increment time (adjust speed)
        animationRef.current = requestAnimationFrame(moveRocket);
      } else {
        cancelAnimationFrame(animationRef.current);
      }
    };

    moveRocket(); // Start the animation

    // Stop animation after 10 seconds or when path ends
    const stopAnimation = setTimeout(() => {
      cancelAnimationFrame(animationRef.current);
    }, 10000);

    // Cleanup function to stop animations if the component unmounts before 10 seconds
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(stopAnimation);
    };
  }, []);

  return (
    <div className='h-screen-min mt-7'>
    <div className='flex-col justify-center items-center border-2 border-gray-800 rounded-xl h-full bg-gray-950'>
      <div className='h-6'></div>
      <div className='w-full flex justify-left items-center text-2xl'>
        <div className='w-12'></div>
        <div>THE CRASH GAME</div>
      </div>
      <div className='flex rounded-xl h-full my-5 w-full overflow-hidden'>
        <div className='h-96 w-3/12'>
        <div className='h-1/2 w-full  bg-gray-950'>
        <div className='h-1/4 flex-col justify-center items-center'>
        <div className='flex justify-center'>MANUEL</div>
        <div className='w-full mb-1 h-4 text-xs ml-4 '>Montant de la mise</div>
        <div className='flex justify-center h-8 mx-4 border-2 border-gray-700 bg-gray-900'></div>
        <div className='w-full mb-1 h-4 text-xs ml-4  '>Montant de la mise</div>
        <div className='flex justify-center h-8 mx-4 border-2 border-gray-700 bg-gray-900'></div>
        <div className='w-full mb-1 h-4 text-xs ml-4 '>Montant de la mise</div>
        <button className='w-11/12 flex justify-center items-center h-8 mx-4 border-2 border-gray-700 hover:bg-purple-700 bg-purple-700 rounded-lg text-white'>
          <div>Put the bet</div>

        </button>
        </div>
        </div>
        <div className='h-full w-full bg-gray-900'></div>
        </div>
        <div className='w-9/12 h-full bg-gray-900 relative'>
          <div className='flex  h-full w-full bg-neutral-900 relative'>
            <div className='w-11/12 h-full wrapper overflow-hidden relative'>
              <div className='text-7xl absolute top-0 left-0 z-10'>{xValue / 50}X</div>
              <div
                ref={rocketRef}
                className="absolute bottom-0 left-0 transform z-10"
                style={{ transition: "transform 0.1s linear" }}
              >
                <Image
                  src="/rocketpng.png"
                  layout="intrinsic"
                  alt="Rocket"
                  height={100}
                  width={100}
                  className="w-32 h-9"
                />
              </div>
              <canvas ref={canvasRef} className='absolute w-full h-full top-0 left-0'></canvas>
            </div>
            <div className='flex-col w-1/12 h-full bg-neutral-800'>
              <div className='h-8'>x20</div>
              <div className='border-t-2 border-gray-600 h-8'>x20</div>
              <div className='border-t-2 border-gray-600 h-8'>x20</div>
              <div className='border-t-2 border-gray-600 h-8'>x20</div>
              <div className='border-t-2 border-gray-600 h-8'>x20</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='h-12 w-full border-2 border-gray-600 rounded-xl mt-3 bg-gray-900'></div>
  </div>
  
  );
};

export default Page;