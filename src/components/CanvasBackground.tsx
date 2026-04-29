"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 107;
const START_FRAME = 104;

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll(); // Tracks the entire document scroll

  // Preload frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let firstFrameLoaded = false;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = START_FRAME + i;
      const indexStr = frameNum.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${indexStr}.jpg`;

      const onLoadOrError = () => {
        loadedCount++;
        
        // Draw the very first frame as soon as it's ready, so the screen isn't blank
        if (i === 0 && !firstFrameLoaded) {
          firstFrameLoaded = true;
          setImages([...loadedImages]);
          requestAnimationFrame(() => drawFrame(1, loadedImages));
        }

        // Once all images have loaded (or errored), update state to enable full scrolling
        if (loadedCount === FRAME_COUNT) {
          setImages([...loadedImages]);
        }
      };

      img.onload = onLoadOrError;
      img.onerror = () => {
        console.error(`Failed to load frame ${indexStr}`);
        onLoadOrError();
      };
      
      loadedImages.push(img);
    }
  }, []);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  const drawFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || imgArray.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure index is within bounds
    const safeIndex = Math.max(1, Math.min(Math.floor(index), FRAME_COUNT));
    const img = imgArray[safeIndex - 1];
    
    // Only draw if image is fully loaded and has width
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const windowRatio = window.innerWidth / window.innerHeight;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width / (window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2) : 1);
    let drawHeight = canvas.height / (window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2) : 1);
    let offsetX = 0;
    let offsetY = 0;

    if (windowRatio > imgRatio) {
      // Fit to width to ensure it covers on mobile
      drawWidth = window.innerWidth;
      drawHeight = window.innerWidth / imgRatio;
      offsetY = (window.innerHeight - drawHeight) / 2;
    } else {
      // Fit to height
      drawHeight = window.innerHeight;
      drawWidth = window.innerHeight * imgRatio;
      offsetX = (window.innerWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // Draw with slight opacity to keep it subtle
    ctx.globalAlpha = 0.5; 
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.globalAlpha = 1.0;
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length > 0) {
      requestAnimationFrame(() => drawFrame(latest, images));
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Cap pixelRatio to 2 for mobile performance (prevents huge canvases on phones)
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.width = window.innerWidth * pixelRatio;
        canvasRef.current.height = window.innerHeight * pixelRatio;
        
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(pixelRatio, pixelRatio);

        if (images.length > 0) {
          drawFrame(frameIndex.get(), images);
        }
      }
    };
    
    handleResize(); // Initial resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div className="fixed inset-0 w-full h-screen z-0 bg-[#050505] pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/80 mix-blend-multiply pointer-events-none z-10" />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
        style={{ filter: 'contrast(1.1) brightness(0.9) grayscale(20%)' }} // Subdued for academic feel
      />
    </div>
  );
}
