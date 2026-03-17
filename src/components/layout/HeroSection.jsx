"use client";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "../../hooks/useProducts";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [randomImages, setRandomImages] = useState([]);
  const { products: loadedProducts } = useProducts();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Get random images from loaded products
  useEffect(() => {
    if (!loadedProducts.length) return;

    // Get products with images
    const productsWithImages = loadedProducts.filter(p => p.imageUrl);
    // Shuffle and take up to 10 random images for horizontal slider
    const shuffled = [...productsWithImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 10).map((p) => ({
      image: p.imageUrl,
      title: p.name || 'Surgical Instrument',
      category: p.category || 'Instrument'
    })));
  }, [loadedProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(randomImages.length - 4, 1));
    }, 1000); // Super fast slider - 1 second
    return () => clearInterval(interval);
  }, [randomImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(randomImages.length - 4, 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(randomImages.length - 4, 1)) % Math.max(randomImages.length - 4, 1));
  };

  return (
    <div
      className="relative bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_35%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] min-h-[85vh] flex items-center"
      data-aos="fade-in"
    >
      {/* Decorative Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(17,24,39,0.62)_52%,rgba(24,33,47,0.98)_100%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div
          className="text-center max-w-4xl mx-auto lg:py-16"
          data-aos="fade-up"
        >
          <h1 className="hero-display text-[42px] sm:text-[52px] lg:text-[62px] xl:text-[72px] mb-6 text-white">
            Premium Surgical Instruments!
          </h1>
          <p className="mt-4 leading-7 text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            At Surgi Makers, we craft premium and precise Dental, Surgical,
            and Beauty instruments trusted by healthcare professionals worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
              href="/catalogs"
            >
              <span>Explore Catalogs</span>
            </Link>
            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
              href="/products"
            >
              <span>View Products</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Image Slider Section */}
      <div className="relative w-full h-[180px] overflow-hidden rounded-tl-2xl rounded-bl-2xl lg:h-[210px]">
        {randomImages.length > 0 ? (
          <>
            <div
              className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: `translateX(-${(currentSlide / (randomImages.length - 4)) * 100}%)` }}
            >
              {randomImages.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex"
                >
                  {randomImages.slice(index, index + 5).map((img, imgIndex) => (
                    <div
                      key={`${index}-${imgIndex}`}
                      className="flex-1 h-full relative overflow-hidden"
                    >
                      <Image
                        src={img.image}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        fill
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110 z-20"
              aria-label="Previous slide"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110 z-20"
              aria-label="Next slide"
            >
              <FaChevronRight />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              {Array.from({ length: Math.max(randomImages.length - 4, 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-red-600 w-4" : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Loading products...
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
