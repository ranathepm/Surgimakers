"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import {
  FaCertificate,
  FaEarthAmericas,
  FaHandshake,
  FaShieldHalved,
  FaTrophy,
  FaUsers,
} from "react-icons/fa6";

export default function AboutUsPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const values = [
    {
      icon: <FaTrophy className="text-2xl" />,
      title: "Quality Excellence",
      description:
        "We maintain high production standards through premium materials, rigorous checks, and disciplined manufacturing workflows.",
    },
    {
      icon: <FaShieldHalved className="text-2xl" />,
      title: "Customer Satisfaction",
      description:
        "Every buyer relationship is built around responsiveness, product clarity, and dependable support before and after delivery.",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Expert Team",
      description:
        "Our team combines instrument-making experience, export understanding, and practical manufacturing knowledge across multiple categories.",
    },
    {
      icon: <FaEarthAmericas className="text-2xl" />,
      title: "Global Reach",
      description:
        "Surgi Makers serves buyers across international markets with production consistency and reliable cross-border supply support.",
    },
  ];

  const benefits = [
    "Premium quality stainless steel instruments",
    "ISO 13485 aligned manufacturing systems",
    "CE-oriented production and compliance awareness",
    "Custom manufacturing capabilities",
    "Competitive pricing with controlled quality",
    "Fast and reliable worldwide shipping",
    "Responsive customer support",
    "Long-term supply partnership focus",
  ];

  const metrics = [
    { value: "15+", label: "Years Experience" },
    { value: "5000+", label: "Products" },
    { value: "50+", label: "Countries Served" },
    { value: "100%", label: "Quality Focused" },
  ];

  const certifications = [
    {
      title: "ISO 13485",
      description: "Quality management system discipline for medical-device manufacturing environments.",
    },
    {
      title: "CE Marking",
      description: "Production awareness aligned with health, safety, and market expectations in regulated regions.",
    },
    {
      title: "FDA Registration",
      description: "Manufacturing credibility for buyers working within United States sourcing requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <main className="mx-auto max-w-7xl px-4 pb-6 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <section className="mb-14 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="flex flex-col justify-center" data-aos="fade-right">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              About Surgi Makers
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              Precision manufacturing backed by quality systems and dependable export support.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300">
              Surgi Makers manufactures surgical, dental, beauty, and implant instruments with a practical focus on quality consistency, buyer confidence, and long-term supply relationships.
            </p>
          </div>

          <div
            className="grid grid-cols-2 gap-4"
            data-aos="fade-left"
          >
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_36%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-5 text-center shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
              >
                <div className="text-4xl font-bold text-red-600">{item.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.16em] text-gray-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm lg:p-10"
            data-aos="fade-up"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Our Story
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Built around manufacturing trust, not just product listings.
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-8 text-gray-300">
              <p>
                Surgi Makers was founded to supply healthcare professionals and buyers with instruments that meet strong expectations for precision, durability, and dependable production quality.
              </p>
              <p>
                With experience across surgical, dental, and beauty instrument manufacturing, the company has developed a practical understanding of what distributors, importers, and professional buyers expect from a long-term supply partner.
              </p>
              <p>
                Based in Pakistan with strategic presence in the United States, Surgi Makers serves global markets with a manufacturing approach built on process control, responsive communication, and export readiness.
              </p>
              <p>
                Our work is shaped by the realities of international sourcing: consistent product specification, clear communication, dependable lead times, and the flexibility to support both standard catalogs and custom manufacturing programs.
              </p>
              <p>
                That approach allows Surgi Makers to support buyers who need more than a supplier. We aim to be a practical manufacturing partner for repeat orders, OEM development, private label projects, and long-term supply growth.
              </p>
            </div>
          </div>

          <div
            className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Why Buyers Work With Us
            </p>
            <div className="mt-6 grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4"
                >
                  <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
                    <FaHandshake className="text-sm" />
                  </div>
                  <span className="text-sm leading-7 text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16" data-aos="fade-up">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Core Values
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              The principles behind every Surgi Makers partnership.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_32%),linear-gradient(135deg,rgba(2,6,23,0.9)_0%,rgba(15,23,42,0.86)_58%,rgba(31,41,55,0.86)_100%)] p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={index * 90}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div
            className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm"
            data-aos="fade-right"
          >
            <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
              <FaCertificate className="text-red-600" />
              Quality & Certifications
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-300">
              Surgi Makers works with rigorous production standards and quality-control discipline to support buyer confidence, product reliability, and smoother international sourcing.
            </p>
            <div className="mt-8 space-y-4">
              {certifications.map((item) => (
                <div key={item.title}>
                  <p className="text-lg font-bold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src="https://business.thomasnet.com/hs-fs/hubfs/Thomas-Logo-Light-Registered.png?height=87&name=Thomas-Logo-Light-Registered.png&width=288"
                alt="Thomasnet logo"
                className="h-12 w-auto"
              />
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                Recognized Industrial Supplier
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Trusted sourcing visibility for serious industrial buyers
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Surgi Makers is listed on Thomasnet, supporting stronger buyer trust for industrial sourcing, global export visibility, and precision manufacturing credibility.
              </p>
              <img
                src="https://cdn.thomasnet.com/badges/thomas-verified-supplier.png"
                alt="Thomas Verified Supplier badge"
                className="mt-6 h-28 w-auto"
              />
              <a
                href="https://www.thomasnet.com/company/surgi-makers-30991200/profile"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-w-[320px] justify-center rounded-xl bg-red-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-red-700"
              >
                View Our Verified Thomasnet Profile
              </a>
            </div>
          </div>
        </section>

        <section
          className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Ready to Work With Us?
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Explore the product range or speak with the team directly.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Browse instruments, review our capabilities, or contact Surgi Makers for manufacturing and sourcing support.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
