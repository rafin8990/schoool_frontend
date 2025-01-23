'use client';

import { useGetList } from '@/hooks/APIHooks';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

const fallbackImages = ['/slider/1.jpg', '/slider/2.jpg', '/slider/3.jpg'];

type AnimationType = 'flip' | 'slide-over' | 'fade';

const animations = {
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { duration: 0.6 },
  },
  'slide-over': {
    initial: { x: '100%', zIndex: 2 },
    animate: { x: 0, zIndex: 2 },
    exit: { x: '-100%', zIndex: 1 },
    transition: { duration: 0.5 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  },
};

interface SliderData {
  _id: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds
const INTERACTION_PAUSE_DURATION = 10000; // 10 seconds

export default function ImageSlider() {
  const { data: sliderData, isLoading } = useGetList<SliderData>('/slider', 'slider');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationType] = useState<AnimationType>('flip');
  const [isPaused, setIsPaused] = useState(false);

  const activeImages = useMemo(() => {
    if (!sliderData) return fallbackImages;
    const activeSlides = sliderData.filter((slide) => (slide.status as string) === 'active');
    return activeSlides.length > 0
      ? activeSlides.map((slide) => slide.image as string)
      : fallbackImages;
  }, [sliderData]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? activeImages.length - 1 : prevIndex - 1));
    setIsPaused(true);
  }, [activeImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1));
    setIsPaused(true);
  }, [activeImages.length]);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(autoSlideInterval);
  }, [isPaused, handleNext]);

  useEffect(() => {
    if (isPaused) {
      const resumeTimer = setTimeout(() => {
        setIsPaused(false);
      }, INTERACTION_PAUSE_DURATION);

      return () => clearTimeout(resumeTimer);
    }
  }, [isPaused]);

  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      <div className="overflow-hidden bg-gray-200 relative aspect-[16/9]">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            {...animations[animationType]}
          >
            {isLoading ? (
              <div
                role="status"
                className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
              >
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Image
                src={
                  activeImages[currentIndex]
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${activeImages[currentIndex]}`
                    : fallbackImages[0]
                }
                alt={`Slide ${currentIndex + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {activeImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
