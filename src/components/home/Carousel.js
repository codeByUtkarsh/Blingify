"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  const images = [
    "/image/carousel1.webp",
    "/image/carousel2.webp",
    "/image/carousel3.webp",
    "/image/carousel4.webp",
    "/image/carousel5.webp",
    "/image/carousel6.webp",
    "/image/carousel7.webp",
    "/image/carousel8.webp",
    "/image/carousel9.webp",
    "/image/carousel10.webp",
    "/image/carousel11.webp",
  ];

  const imagesWithClones = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextImage();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === imagesWithClones.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning]);

  const goToImage = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
      <div
        className={`w-full h-full flex ${
          isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {imagesWithClones.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={image}
              alt={`Carousel Image ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Link
          href="/products"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 pointer-events-auto"
        >
          Explore Now
        </Link>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index + 1 === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
