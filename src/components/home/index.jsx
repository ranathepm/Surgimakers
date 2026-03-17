"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPlus, FaMinus, FaPhone, FaEnvelope, FaHeadset, FaGlobe, FaAward, FaTag, FaTruck, FaStar, FaCheckCircle, FaCogs, FaCalendar, FaBox, FaGlobeAmericas, FaCertificate, FaShip, FaCheck, FaGem, FaBriefcaseMedical, FaTooth, FaSpa } from "react-icons/fa";
import HeroSection from "../layout/HeroSection";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "../../hooks/useProducts";

// Animated Counter Component
function AnimatedCounter({ endValue, duration, prefix = "", suffix = "", isDecimal = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = endValue * easeOutQuart;

      if (isDecimal) {
        setCount(currentCount.toFixed(1));
      } else {
        setCount(Math.floor(currentCount));
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, isDecimal]);

  return (
    <span>{prefix}{count}{suffix}</span>
  );
}

// Product Stats Component
function ProductStats() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [dentalCount, setDentalCount] = useState(0);
  const [surgicalCount, setSurgicalCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const { products: loadedProducts } = useProducts();

  useEffect(() => {
    if (!loadedProducts.length) return;

    setTotalProducts(loadedProducts.length);

    // Count dental products
    const dentalProducts = loadedProducts.filter(p => {
      const category = p.category?.toLowerCase() || "";
      return category.includes('dental') || category.includes('tooth') ||
             category.includes('scaler') || category.includes('elevator') ||
             category.includes('forcep') && category.includes('dental');
    });
    setDentalCount(dentalProducts.length);

    // Count surgical products
    const surgicalProducts = loadedProducts.filter(p => {
      const category = p.category?.toLowerCase() || "";
      return category.includes('surgical') || category.includes('scissors') ||
             category.includes('forcep') || category.includes('retractor') ||
             category.includes('needle') || category.includes('clamp');
    });
    setSurgicalCount(surgicalProducts.length);

    // Count unique categories
    const uniqueCategories = new Set(loadedProducts.map(p => p.category));
    setCategoryCount(uniqueCategories.size);
  }, [loadedProducts]);

  const stats = [
    { value: totalProducts, label: "Total Products", icon: <FaBox />, prefix: "", suffix: "+" },
    { value: dentalCount, label: "Dental Instruments", icon: <FaGlobeAmericas />, prefix: " ", suffix: "+" },
    { value: surgicalCount, label: "Surgical Instruments", icon: <FaCheck />, prefix: " ", suffix: "+" },
    { value: categoryCount, label: "Categories", icon: <FaGlobe />, prefix: "", suffix: "+" },
  ];

  return (
    <section className="relative px-4 pb-14 pt-10 bg-transparent">
      {/* Decorative Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 right-0 h-72 w-72 rounded-full bg-red-600/8 blur-3xl"></div>
        <div className="absolute -bottom-28 left-8 h-60 w-60 rounded-full bg-red-500/6 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Product Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-red-600 text-3xl mb-3 flex justify-center">{stat.icon}</div>
              <p className="text-white text-4xl font-bold mb-2">
                <AnimatedCounter endValue={stat.value} duration={2000} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Item Component with Accordion
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm hover:border-red-600 transition-colors"
      data-aos="fade-up"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between text-white"
      >
        <span className="text-lg font-semibold pr-4">{question}</span>
        <span className="text-red-600 flex-shrink-0">
          {isOpen ? <FaMinus size={20} /> : <FaPlus size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function HomeComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    attachment: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("up");

  const services = [
    {
      title: "Surgical Implants Manufacturing",
      description: "Precision-made implant parts and surgical components built for dependable fit, repeatable quality, and global medical supply programs.",
    },
    {
      title: "Precision Manufacturing",
      description: "We help transform protected ideas into practical production-ready instruments with careful handling, controlled development, and scalable manufacturing support.",
    },
    {
      title: "Product Invention",
      description: "From early concept refinement to manufacturable design, we support new instrument ideas with technical input, prototyping, and production planning.",
    },
    {
      title: "Lathe & CNC Parts Manufacturing",
      description: "High-tolerance CNC and lathe machining for stainless steel, titanium, and medical-grade alloys used in demanding precision applications.",
    },
    {
      title: "Custom Parts Manufacturing",
      description: "Tailored parts production for OEM buyers who need custom dimensions, finishing standards, and reliable repeatability across every batch.",
    },
    {
      title: "Product Design Services",
      description: "We support instrument design development with manufacturable concepts, CAD refinement, ergonomic thinking, and production-ready detailing for new ideas.",
    },
  ];

  useEffect(() => {
    let animationTimeout;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setAnimationDirection((prev) => (prev === "up" ? "down" : "up"));
      animationTimeout = setTimeout(() => {
        setCurrentKeyword((prev) => (prev + 1) % services.length);
        setIsAnimating(false);
      }, 260);
    }, 3600);
    return () => {
      clearInterval(interval);
      clearTimeout(animationTimeout);
    };
  }, [services.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      attachment: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setErrorMessage("");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", attachment: null });
      } else {
        setErrorMessage("Failed to send email");
      }
    } catch (error) {
      setErrorMessage("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 450,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const fourFeatures = [
    {
      icon: <FaCheckCircle size={40} />,
      title: "Precision Engineering",
      description: "Our instruments are crafted with unparalleled accuracy and reliability for complex medical procedures.",
    },
    {
      icon: <FaGlobe size={40} />,
      title: "Global Accessibility",
      description: "Strategic partnerships and distribution network ensuring premium instruments reach healthcare providers worldwide.",
    },
    {
      icon: <FaHeadset size={40} />,
      title: "Innovative Designs",
      description: "Continuously developing ergonomic product designs that enhance surgical precision and reduce fatigue.",
    },
    {
      icon: <FaCogs size={40} />,
      title: "Customized Solutions",
      description: "Offering tailored instrument solutions to meet specific medical facility and surgical specialty requirements.",
    },
  ];

  const sixFeatures = [
    {
      icon: <FaAward size={50} />,
      title: "Unmatched Quality",
      description: "Stringent testing and quality control ensures top-tier performance for every instrument.",
    },
    {
      icon: <FaCheckCircle size={50} />,
      title: "Reliable Instruments",
      description: "Globally recognized instruments trusted by healthcare professionals worldwide.",
    },
    {
      icon: <FaCheckCircle size={50} />,
      title: "Pioneering Innovation",
      description: "Continuously advancing medical instrument technology with cutting-edge solutions.",
    },
    {
      icon: <FaTruck size={50} />,
      title: "Worldwide Shipping",
      description: "Global logistics ensuring premium instruments reach healthcare providers everywhere.",
    },
    {
      icon: <FaGem size={50} />,
      title: "Best Quality",
      description: "Rigorous precision and durability standards exceeding industry requirements.",
    },
    {
      icon: <FaCogs size={50} />,
      title: "Customized Instruments/Parts",
      description: "Custom manufacturing solutions tailored to your specific instrument and parts requirements.",
    },
  ];

  const capabilityGroups = [
    {
      icon: <FaCogs size={26} />,
      eyebrow: "Manufacturing Expertise",
      title: "Precision instrument production",
      description: "Surgi Makers manufactures dental, surgical, implant, and beauty instruments with high-tolerance CNC machining and medical-grade material control.",
      items: [
        "Dental and surgical instruments",
        "Implant components and accessories",
        "Beauty and aesthetic tools",
        "OEM and private label manufacturing",
      ],
    },
    {
      icon: <FaCalendar size={26} />,
      eyebrow: "Engineering",
      title: "From concept to manufacturable design",
      description: "We support product development with CAD workflows, technical drawings, prototyping, and custom instrument engineering for specialized requirements.",
      items: [
        "Product design and development",
        "CAD models and technical drawings",
        "Prototype development",
        "Custom instrument engineering",
      ],
    },
    {
      icon: <FaCogs size={26} />,
      eyebrow: "Advanced Processes",
      title: "Production methods built for repeatability",
      description: "Our process chain covers forging, laser cutting, heat treatment, finishing, electropolishing, passivation, and precision assembly.",
      items: [
        "Precision forging and micro-machining",
        "Heat treatment and hardening",
        "Surface finishing and polishing",
        "Electropolishing, passivation, and assembly",
      ],
    },
    {
      icon: <FaCertificate size={26} />,
      eyebrow: "Quality and Export Readiness",
      title: "Built for global supply",
      description: "Every project is supported by inspection discipline, sterilization-ready manufacturing, export packaging, and material handling suited to international medical markets.",
      items: [
        "Dimensional and functional inspection",
        "Medical-grade stainless steel and titanium processing",
        "Sterilization-ready production standards",
        "Custom packaging and export preparation",
      ],
    },
  ];

  const catalogCards = [
    {
      title: "Surgical Instruments",
      description: "Precision-engineered instruments for unparalleled accuracy in complex medical procedures.",
      href: "/Surgical Catalog - Surgi Makers.pdf",
      icon: <FaBriefcaseMedical size={58} />,
      details: ["Forceps and scissors", "Needle holders", "General surgery tools"],
    },
    {
      title: "Dental Instruments",
      description: "Designed for precision and patient comfort for a wide range of dental treatments.",
      href: "/Dental Catalog -Surgi Makers.pdf",
      icon: <FaTooth size={58} />,
      details: ["Extraction tools", "Scalers and elevators", "Clinical dental sets"],
    },
    {
      title: "Beauty Instruments",
      description: "Crafted with best material for precision hairdressing, beauty, manicure, and pedicure.",
      href: "/Beauty Catalog - Surgi Makers.pdf",
      icon: <FaSpa size={58} />,
      details: ["Scissors and tweezers", "Cuticle and nail tools", "Professional beauty kits"],
    },
  ];

  const reviews = [
    {
      name: "Dr. Sarah Mitchell",
      title: "Orthopedic Surgeon",
      rating: 5,
      date: "2 weeks ago",
      text: "Outstanding quality surgical instruments. The precision and durability of Surgi Makers products have significantly improved our surgical outcomes. Highly recommend!",
    },
    {
      name: "James Wilson",
      title: "Hospital Procurement Manager",
      rating: 5,
      date: "1 month ago",
      text: "Excellent customer service and fast delivery. The team at Surgi Makers is professional and always helpful. We've been ordering from them for years.",
    },
    {
      name: "Dr. Emily Chen",
      title: "Dental Surgeon",
      rating: 5,
      date: "3 weeks ago",
      text: "The dental instruments are top-notch quality. The attention to detail and craftsmanship is evident in every tool. Best supplier we've found!",
    },
    {
      name: "Michael Brown",
      title: "Clinic Director",
      rating: 5,
      date: "2 months ago",
      text: "Reliable supplier with consistent quality. The instruments meet all our requirements and exceed expectations. Great value for the price.",
    },
  ];

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <HeroSection />

      {/* Product Stats Section */}
      <ProductStats />

      {/* Capabilities Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12" data-aos="fade-up">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
                Our Capabilities
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                Manufacturing, engineering, and OEM support under one roof
              </h2>
            </div>
            <p className="max-w-2xl text-gray-300 leading-relaxed">
              Surgi Makers combines CNC precision machining, instrument manufacturing, prototype development, advanced finishing, and export-ready quality control for global dental, surgical, implant, and beauty brands.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {capabilityGroups.map((group, index) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-300 hover:border-red-500/30"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] text-red-500">
                    {group.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-500">
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-2 text-[22px] font-bold leading-[1.15] text-white">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-center text-sm leading-6 text-gray-300">
                  {group.description}
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  {group.items.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-center gap-3 text-center text-sm text-gray-200"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                      <span className="leading-5">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-aos="fade-up">
            <Link
              href="/oem-manufacturing"
              className="inline-flex items-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Explore OEM Manufacturing
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Discuss a Private Label Project
            </Link>
          </div>

          <div
            className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.16),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.84)_0%,rgba(17,24,39,0.9)_55%,rgba(31,41,55,0.82)_100%)] text-white shadow-xl backdrop-blur-sm"
            data-aos="fade-up"
          >
            <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                  Quality Control Process
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">
                  Explore the quality process behind every Surgi Makers order
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300">
                  Explore our buyer-facing quality workflow covering material inspection,
                  CNC machining, manual finishing, quality testing, and sterilization-ready
                  packaging standards.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  href="/quality-control"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  View Quality Process
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Ask About QC Standards
                </Link>
              </div>
            </div>
          </div>

          <div
            className="mt-10 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-sm backdrop-blur-sm"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-6 text-center">
              <div className="max-w-3xl mx-auto">
                <img
                  src="https://business.thomasnet.com/hs-fs/hubfs/Thomas-Logo-Light-Registered.png?height=87&name=Thomas-Logo-Light-Registered.png&width=288"
                  alt="Thomasnet logo"
                  className="h-12 w-auto mx-auto"
                />
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                  Recognized Industrial Supplier
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  Trusted sourcing visibility for serious industrial buyers
                </h3>
                <p className="mt-4 text-gray-300 leading-7">
                  Surgi Makers is listed on Thomasnet, supporting stronger buyer trust for
                  industrial sourcing, global export visibility, and precision manufacturing
                  credibility.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://cdn.thomasnet.com/badges/thomas-verified-supplier.png"
                  alt="Thomas Verified Supplier badge"
                  className="h-28 w-auto"
                />
                <a
                  href="https://www.thomasnet.com/company/surgi-makers-30991200/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[280px] justify-center rounded-full bg-red-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  View Our Verified Thomasnet Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Feature Section - Surgical Instruments Card */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8" data-aos="fade-up">
            <div className="lg:w-1/2">
              <p className="text-red-600 font-semibold mb-2">Surgical Instruments</p>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our surgical instruments are precision-engineered to offer unparalleled accuracy and reliability in complex medical procedures.
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Crafted from premium surgical-grade stainless steel, each instrument undergoes rigorous quality control to ensure superior performance and durability. Our extensive range includes scissors, forceps, retractors, needle holders, and specialized tools designed for various surgical specialties.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With ISO 13485 certification and CE marking, our instruments meet the highest international quality standards trusted by healthcare professionals worldwide.
              </p>
              <Link
                href="/catalogs"
                className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-colors mt-4"
              >
                View Catalogs
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/Solatch-Sons_Hp_About-us-pic1.png"
                alt="Surgical Instruments"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Four Column Grid */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fourFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] border border-white/10 rounded-xl p-8 text-center transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center text-red-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-white/10 mb-12"></div>
          <h2 className="text-4xl font-bold text-white mb-12 text-center" data-aos="fade-up">
            About Surgi Makers
          </h2>
          <div className="flex flex-col lg:flex-row gap-12 items-center" data-aos="fade-up">
            <div className="lg:w-[40%] text-gray-300 leading-relaxed space-y-4 order-2 lg:order-1">
              <p>
                Surgi Makers is a leading manufacturer of premium surgical, dental, and beauty instruments, dedicated to excellence in precision engineering and quality craftsmanship. With decades of experience in the medical device industry, we have established ourselves as a trusted partner for healthcare professionals and institutions worldwide.
              </p>
              <p>
                Our state-of-the-art manufacturing facilities are equipped with advanced CNC machinery and staffed by skilled artisans who combine traditional craftsmanship with modern technology. Every instrument undergoes rigorous quality control processes to ensure it meets the highest international standards, including ISO 13485 certification and CE marking.
              </p>
              <p>
                At Surgi Makers, we understand that precision instruments are critical to patient safety and surgical success. That's why we use only the finest surgical-grade stainless steel and premium materials sourced from certified suppliers. Our commitment to continuous innovation and improvement drives us to develop new instruments that meet the evolving needs of the healthcare industry.
              </p>
              <p>
                From our headquarters in Sialkot, Pakistan, with additional offices in Lahore and Dallas, USA, we serve a global clientele including hospitals, surgical centers, dental practices, beauty salons, and medical distributors. Our dedicated customer service team works closely with each client to provide personalized solutions, competitive pricing, and reliable delivery.
              </p>
            </div>
            <div className="lg:w-[60%] order-1 lg:order-2">
              <img
                src="/Surgi_Makers_Photo.webp"
                alt="Surgi Makers Production"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Six Feature Box Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sixFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8 text-center">
                  <div className="flex justify-center text-red-600 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Product Category Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12 text-center" data-aos="fade-up">
            Delivering High Quality Instruments for Healthcare Industry!
          </h1>

          {/* Horizontal Catalog Cards */}
          <div className="grid md:grid-cols-3 gap-6" data-aos="fade-up">
            {catalogCards.map((card) => (
              <div
                key={card.title}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] shadow-[0_16px_44px_rgba(0,0,0,0.14)]"
              >
                <div className="px-7 pt-7 pb-4">
                  <div className="mx-auto flex items-center justify-center text-red-500">
                    {card.icon}
                  </div>
                </div>
                <div className="p-6 pt-0 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-300 text-sm mb-5">
                    {card.description}
                  </p>
                  <div className="mb-6 space-y-2">
                    {card.details.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-5 rounded-full transition-colors"
                  >
                    View Catalog
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Manufacturing Section */}
      <section className="pb-12 px-4">
        <div
          className="max-w-6xl mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.9)_55%,rgba(31,41,55,0.88)_100%)] shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
          data-aos="fade-up"
        >
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[320px] overflow-hidden border-b border-white/10 lg:min-h-[420px] lg:border-b-0 lg:border-r">
              <img
                src="/Surgi Makers Steel 2.jpg"
                alt="Advanced manufacturing capabilities"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28),rgba(2,6,23,0.74))]" />
              <div className="relative z-10 flex h-full flex-col justify-between p-7 lg:p-9">
                <div />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-300">
                      Workflow
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Design, prototype, production
                    </p>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-300">
                      Buyer Focus
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      OEM, private label, export supply
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                Advanced Manufacturing Programs
              </p>
              <div
                className={`mt-5 max-w-3xl min-h-[170px] transition-all duration-500 ${
                  isAnimating
                    ? `opacity-0 ${
                        animationDirection === "up" ? "-translate-y-4" : "translate-y-4"
                      }`
                    : "opacity-100 translate-y-0"
                }`}
              >
                <h2 className="text-[28px] font-bold leading-[1.08] text-white sm:text-[34px] lg:text-[42px]">
                  {services[currentKeyword].title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                  {services[currentKeyword].description}
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className={`rounded-[1.25rem] border px-4 py-4 transition-all duration-300 ${
                      index === currentKeyword
                        ? "border-red-500/40 bg-red-600/10 shadow-[0_10px_25px_rgba(220,38,38,0.12)]"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <p className={`text-sm font-semibold ${index === currentKeyword ? "text-white" : "text-gray-200"}`}>
                      {service.title}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-gray-400">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/catalog-request"
                  className="inline-flex items-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Submit Project
                </Link>
                <Link
                  href="/oem-manufacturing"
                  className="inline-flex items-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Explore OEM Manufacturing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Logos Row */}
      <section className="border-y border-white/10 bg-black/15 text-white py-2 px-4 overflow-hidden backdrop-blur-sm">
        <h2 className="text-sm font-bold text-center mb-2">
          Certified Manufacturer & Exporter
        </h2>
        <div className="relative w-full">
          <div className="flex animate-marquee whitespace-nowrap" style={{ width: '200%' }}>
            {[
              "SECP_Logo.png",
              "Surgi_Makers.png",
              "sialkot-chamber-of-commerce-industries-logo-F8C579481E.png",
              "The_Surgical_Instruments_Manufacturing_Association_of_Pakistan.png",
              "ISO_13485.png",
              "CE_Surgi_Makers.png",
              "unnamed.png",
              "thomasnet-badge",
              "SECP_Logo.png",
              "Surgi_Makers.png",
              "sialkot-chamber-of-commerce-industries-logo-F8C579481E.png",
              "The_Surgical_Instruments_Manufacturing_Association_of_Pakistan.png",
              "ISO_13485.png",
              "CE_Surgi_Makers.png",
              "unnamed.png",
              "thomasnet-badge",
            ].map((src, index) => (
              <div key={index} className="flex items-center mx-4">
                {src === "thomasnet-badge" ? (
                  <img
                    src="https://cdn.thomasnet.com/badges/thomas-verified-supplier.png"
                    alt="Thomas Verified Supplier badge"
                    className="h-[112px] w-auto object-contain"
                  />
                ) : (
                  <Image
                    src={`/${src}`}
                    width={130}
                    height={130}
                    className="object-contain"
                    alt="Certification Logo"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Customer Reviews - Trustpilot Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Trustpilot Banner */}
          <div className="border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.82)_0%,rgba(17,24,39,0.88)_55%,rgba(31,41,55,0.82)_100%)] text-white rounded-xl shadow-lg p-8 mb-12 backdrop-blur-sm" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="https://www.trustpilot.com/review/surgimakers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-transparent hover:bg-transparent transition-colors"
              >
                <img
                  src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg"
                  alt="Trustpilot"
                  className="h-16"
                />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-green-500" size={16} />
                  ))}
                </div>
              </a>
            </div>
          </div>

          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-red-600 font-semibold mb-3">Customer Reviews</p>
            <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex gap-1 text-red-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-white text-2xl font-bold">5.0</span>
              <span className="text-gray-300">based on 39 reviews</span>
            </div>
            <a
              href="https://www.trustpilot.com/review/surgimakers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors"
            >
              Read more on Trustpilot
            </a>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-6 text-center">
                  <div className="mb-3 flex justify-center gap-1 text-red-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} size={16} />
                    ))}
                  </div>
                  <p className="mb-4 text-sm italic leading-relaxed text-gray-300">&ldquo;{review.text}&rdquo;</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Section with CEO Quote */}
      <section className="bg-transparent pb-16 px-4 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-red-600 font-semibold mb-3">Our Commitment</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Crafting Tomorrow's Instruments Today!
            </h1>
            <p className="text-xl text-gray-300">
              Precision Engineered for Optimal Performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                At Surgi Makers, we combine decades of craftsmanship with cutting-edge technology to produce instruments that meet the highest international standards. Every instrument undergoes rigorous quality control to ensure excellence in precision, durability, and performance.
              </p>
              <blockquote className="border-l-4 border-red-600 pl-6 mb-8">
                <p className="text-white text-xl italic mb-4">
                  "Surgi Makers innovates to meet medical professional's unique challenges, advancing healthcare through quality, precision, and reliability."
                </p>
                <footer className="text-gray-300">
                  <cite>Rana Arslan Khan — CEO & Founder, Surgi Makers</cite>
                </footer>
              </blockquote>
              <Link
                href="https://calendly.com/ranathepm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-colors"
              >
                <FaCalendar />
                Schedule a Meeting
              </Link>
            </div>
            <div className="flex justify-center" data-aos="fade-left">
              <img
                src="/pfp.png"
                alt="Rana Arslan Khan"
                className="h-64 lg:h-72 object-cover rounded-full shadow-lg -scale-x-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up">
            <p className="text-red-600 font-semibold text-center mb-3">
              Get in Touch
            </p>
            <h1 className="text-4xl font-bold text-white mb-4 text-center">
              Contact Us
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              Have questions about our premium surgical instruments? Our team is here to help you find exactly what you need.
            </p>
          </div>
          <div className="flex flex-wrap lg:items-stretch" data-aos="fade-up">
            {/* Left Side - Info */}
            <div className="w-full lg:w-5/12 pr-0 lg:pr-8 mb-8 lg:mb-0">
              <div className="h-full bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_35%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] text-white rounded-xl shadow-lg p-8">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                  <FaHeadset className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Have questions or need assistance?
                </h2>
                <p className="mb-4 text-gray-200">
                  Contact us today— we&apos;re here to help!
                </p>
                <p className="mb-6 leading-6 text-gray-300">
                  Whether you need product information, pricing details, or technical support, our dedicated team is ready to assist you with personalized service and expert advice.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Pakistan</p>
                      <p className="text-white font-semibold">+92 321 545 0050</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">USA</p>
                      <p className="text-white font-semibold">+1 (903) 608-9241</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">General Inquiries</p>
                      <p className="text-white font-semibold">hello@surgimakers.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Business Email</p>
                      <p className="text-white font-semibold">info@surgimakers.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-7/12">
              <div className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm" data-aos="fade-up">
                <h2 className="text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                <p className="mb-6 max-w-xl text-sm leading-7 text-gray-300">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    required
                  ></textarea>
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-300">
                    <label className="flex cursor-pointer items-center gap-4 text-left">
                      <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white">
                        Choose File
                      </span>
                      <span>Attach file if needed</span>
                      <input
                        type="file"
                        name="attachment"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {formData.attachment && (
                      <p className="mt-3 text-xs text-gray-300">{formData.attachment.name}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Message"}
                  </button>
                  {isSubmitted && (
                    <p className="mt-4 text-green-600 text-center font-medium">
                      Form submitted successfully! We&apos;ll get back to you soon.
                    </p>
                  )}
                  {errorMessage && (
                    <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-16 px-4 bg-transparent">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up">
            <p className="text-red-600 font-semibold text-center mb-3">
              Got Questions?
            </p>
            <h1 className="text-4xl font-bold text-white mb-4 text-center">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Find answers to common questions about Surgi Makers products, services, and policies below.
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Who is Surgi Makers?"
              answer="Surgi Makers is a premium manufacturer of surgical, dental, and beauty instruments. We combine cutting-edge technology with unparalleled craftsmanship to produce the finest medical instruments that meet global quality standards including ISO 13485 certification."
            />
            <FAQItem
              question="What products does Surgi Makers offer?"
              answer="We manufacture a comprehensive range of medical instruments including surgical instruments (scissors, forceps, retractors, needle holders), dental instruments and implants (extraction forceps, elevators, scalers, curettes, mirrors), and beauty instruments (tweezers, scissors, nail tools). All our products are crafted from premium stainless steel."
            />
            <FAQItem
              question="What quality certifications do you have?"
              answer="Surgi Makers is ISO 13485 certified, which is the internationally recognized standard for medical device quality management systems. We also comply with FDA requirements and CE marking standards for the European market."
            />
            <FAQItem
              question="Do you offer international shipping?"
              answer="Yes, we ship worldwide. We partner with major international shipping carriers to deliver our products to wholesalers, retailers, and healthcare professionals across the globe. Shipping costs and delivery times vary by destination and order size."
            />
            <FAQItem
              question="What is your minimum order quantity?"
              answer="Our minimum order varies by product category. For standard instruments, the minimum order starts from 10 pieces per item. For custom orders and bulk purchases, please contact our sales team for special pricing and terms."
            />
            <FAQItem
              question="How do I place an order?"
              answer="You can place an order through our website catalog, by email at hello@surgimakers.com for general help or info@surgimakers.com for formal business inquiries, or by calling our sales line directly. Our team will assist you in finding the right instruments for your needs and provide a detailed quotation."
            />
            <FAQItem
              question="Do you offer custom instrument manufacturing?"
              answer="Yes, we offer custom manufacturing services for specialized instruments. Our engineering team can work with you to design and produce instruments according to your exact specifications. Contact us to discuss your custom requirements."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, bank transfers, and PayPal for international orders. For institutional clients, we also offer Net 30 payment terms upon credit approval."
            />
            <FAQItem
              question="What is your return and warranty policy?"
              answer="All our instruments come with a warranty against manufacturing defects. If you receive a defective product, we will replace it free of charge. Returns are accepted within 30 days of purchase for unused items in original packaging."
            />
            <FAQItem
              question="If I have a product idea or patent, can you make it for us?"
              answer="Yes, absolutely! We offer comprehensive product design and manufacturing services for custom inventions and patented products. Our experienced engineering team can help transform your concept into a manufacturable design and then produce it to your exact specifications. Whether you have a rough idea, detailed drawings, or a patent, we have the expertise to bring your vision to life."
            />
            <FAQItem
              question="What is the pricing?"
              answer="Pricing varies based on several factors including order quantity, steel grade quality, finish/polish level, tungsten carbide vs standard steel, and size specifications. Larger orders naturally receive better pricing due to economies of scale. For accurate quotes, please contact our sales team with your specific requirements and we'll provide you with a detailed quotation."
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div
              className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm"
              data-aos="fade-right"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Direct Contact
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Speak with a real team that understands manufacturing requirements.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                From catalog requests to OEM development and production inquiries, we can route your message to the right team quickly.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">USA</p>
                    <p className="font-semibold text-white">+1 (903) 608-9241</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pakistan</p>
                    <p className="font-semibold text-white">+92 321 545 0050</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">General Inquiries</p>
                    <p className="font-semibold text-white">hello@surgimakers.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Business Inquiries</p>
                    <p className="font-semibold text-white">info@surgimakers.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm"
              data-aos="fade-left"
            >
              <h2 className="text-3xl font-bold text-white">Send Us a Message</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-300">
                Fill out the form below and the Surgi Makers team will get back to you as soon as possible.
              </p>
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  required
                ></textarea>
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-300">
                  <label className="flex cursor-pointer items-center gap-4 text-left">
                    <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white">
                      Choose File
                    </span>
                    <span>Attach file if needed</span>
                    <input
                      type="file"
                      name="attachment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.attachment && (
                    <p className="mt-3 text-xs text-gray-300">{formData.attachment.name}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
                {isSubmitted && (
                  <p className="mt-4 text-center font-medium text-green-600">
                    Form submitted successfully! We&apos;ll get back to you soon.
                  </p>
                )}
                {errorMessage && (
                  <p className="mt-4 text-center text-red-600">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-16">
        <div
          className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Ready to Work With Us?
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Learn more about our products or speak with the team directly.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Browse the Surgi Makers range, request more information, or contact us for personalized assistance on sourcing and manufacturing needs.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomeComponent;
