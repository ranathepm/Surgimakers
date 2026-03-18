"use client";

import Link from "next/link";
import { FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { FaTooth, FaStethoscope, FaMicroscope, FaBrain } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

// Blog posts data
const blogPosts = [
  {
    slug: "stainless-steel-quality-surgical-instruments",
    title: "Why Stainless Steel Quality Matters in Surgical Instrument Manufacturing",
    excerpt: "Learn how steel grade, heat treatment, passivation, and corrosion resistance directly impact precision, durability, and patient safety in surgical instruments.",
    date: "March 7, 2026",
    author: "Surgi Makers Quality Team",
    category: "Manufacturing",
    readTime: "9 min read",
    image: "/blog/quality-standards.svg",
    icon: <FaBrain />
  },
  {
    slug: "dental-instrument-manufacturing-process",
    title: "How Dental Instruments Are Manufactured: From Forging to Final Inspection",
    excerpt: "A practical look at how quality dental instruments move from raw steel to finished mirrors, forceps, scalers, and elevators through controlled manufacturing steps.",
    date: "March 10, 2026",
    author: "Surgi Makers Dental Production Team",
    category: "Dental Manufacturing",
    readTime: "8 min read",
    image: "/blog/dental-instruments.svg",
    icon: <FaTooth />
  },
  {
    slug: "precision-implant-manufacturing",
    title: "Precision in Implant Manufacturing: Materials, Machining, and Surface Treatment",
    excerpt: "Learn why tolerances, titanium selection, machining quality, and surface treatment are critical in manufacturing reliable orthopedic and dental implants.",
    date: "March 5, 2026",
    author: "Surgi Makers Implant Engineering Team",
    category: "Implants",
    readTime: "10 min read",
    image: "/blog/medical-devices-trend.svg",
    icon: <FaMicroscope />
  },
  {
    slug: "forging-vs-cnc-surgical-instruments",
    title: "Forging vs CNC Machining in Surgical Instrument Production",
    excerpt: "Compare the strengths of forged and CNC-machined surgical instruments, and understand where each process fits in precision medical manufacturing.",
    date: "March 1, 2026",
    author: "Surgi Makers Manufacturing Team",
    category: "Production Methods",
    readTime: "7 min read",
    image: "/blog/surgical-technology.svg",
    icon: <FaStethoscope />
  },
  {
    slug: "surface-finishing-passivation-medical-instruments",
    title: "Why Surface Finishing and Passivation Matter for Medical Instruments",
    excerpt: "Discover how polishing, satin finishing, electropolishing, and passivation improve corrosion resistance, cleanability, and long-term instrument performance.",
    date: "February 24, 2026",
    author: "Surgi Makers Finishing Department",
    category: "Finishing",
    readTime: "8 min read",
    image: "/blog/quality-standards.svg",
    icon: <FaBrain />
  },
  {
    slug: "sialkot-surgical-instruments-manufacturer-guide",
    title: "Why Sialkot Remains a Global Hub for Surgical Instruments Manufacturing",
    excerpt: "See why buyers worldwide source from Sialkot surgical instruments manufacturers, and what quality, export, and compliance factors separate premium suppliers like Surgi Makers.",
    date: "February 20, 2026",
    author: "Surgi Makers Export Team",
    category: "Sialkot Manufacturing",
    readTime: "9 min read",
    image: "/blog/surgical-technology.svg",
    icon: <FaMicroscope />
  },
  {
    slug: "oem-private-label-surgical-instruments",
    title: "OEM and Private Label Surgical Instruments: What Global Distributors Should Ask",
    excerpt: "A practical SEO-focused guide for distributors looking for OEM surgical instruments manufacturers, private label production, custom branding, and export-ready documentation.",
    date: "February 14, 2026",
    author: "Surgi Makers Business Development",
    category: "OEM Manufacturing",
    readTime: "8 min read",
    image: "/blog/medical-devices-trend.svg",
    icon: <FaStethoscope />
  },
  {
    slug: "dental-extraction-forceps-manufacturer-guide",
    title: "How to Choose a Dental Extraction Forceps Manufacturer for Long-Term Quality",
    excerpt: "Learn what importers, clinics, and distributors should evaluate when sourcing dental extraction forceps, elevators, and oral surgery instruments from manufacturers.",
    date: "February 8, 2026",
    author: "Surgi Makers Dental Sales Team",
    category: "Dental Sourcing",
    readTime: "7 min read",
    image: "/blog/dental-instruments.svg",
    icon: <FaTooth />
  },
  {
    slug: "reusable-vs-single-use-surgical-instruments",
    title: "Reusable vs Single-Use Surgical Instruments: A Manufacturer's Perspective",
    excerpt: "Compare reusable and single-use surgical instruments across cost, sterilization, sustainability, and manufacturing quality for hospitals and medical distributors.",
    date: "February 2, 2026",
    author: "Surgi Makers Product Strategy Team",
    category: "Buyer Guide",
    readTime: "8 min read",
    image: "/blog/quality-standards.svg",
    icon: <FaBrain />
  },
  {
    slug: "surgical-instrument-supplier-checklist",
    title: "Surgical Instrument Supplier Checklist: 12 Questions Before You Place an Order",
    excerpt: "Use this supplier checklist to evaluate surgical instrument manufacturers, verify certifications, inspect quality systems, and reduce sourcing risk before ordering.",
    date: "January 29, 2026",
    author: "Surgi Makers Commercial Team",
    category: "Supplier Guide",
    readTime: "9 min read",
    image: "/blog/quality-standards.svg",
    icon: <FaBrain />
  },
  {
    slug: "medical-device-trends-2026",
    title: "Top Medical Device Industry Trends Shaping Healthcare in 2026",
    excerpt: "Explore the transformative trends revolutionizing medical devices in 2026: from AI-powered diagnostics to minimally invasive surgical innovations and smart implantable technologies.",
    date: "February 17, 2026",
    author: "Surgi Makers Industry Insights",
    category: "Industry Trends",
    readTime: "12 min read",
    image: "/blog/medical-devices-trend.svg",
    icon: <FaStethoscope />
  },
  {
    slug: "dental-instruments-guide",
    title: "Dental Instruments Guide: Essential Tools Every Dental Practice Needs in 2025",
    excerpt: "Comprehensive guide to dental instruments including extraction forceps, elevators, scalers, curettes, and mirrors. Learn about quality standards and selection tips.",
    date: "February 15, 2025",
    author: "Dr. Sarah Mitchell",
    category: "Dental Instruments",
    readTime: "8 min read",
    image: "/blog/dental-instruments.svg",
    icon: <FaTooth />
  },
  {
    slug: "advancements-surgical-instruments",
    title: "Advancements in Surgical Instruments Technology: What's New in 2025",
    excerpt: "Discover the latest innovations in surgical instrument technology, from smart surgical tools to advanced materials and precision engineering.",
    date: "February 10, 2025",
    author: "Surgi Makers Research Team",
    category: "Surgical Technology",
    readTime: "10 min read",
    image: "/blog/surgical-technology.svg",
    icon: <FaMicroscope />
  },
  {
    slug: "surgical-instrument-maintenance",
    title: "The Importance of Surgical Instrument Maintenance: Complete Care Guide",
    excerpt: "Learn essential maintenance techniques for surgical instruments including cleaning, sterilization, inspection, and storage to extend instrument life.",
    date: "January 25, 2025",
    author: "Dr. James Wilson",
    category: "Maintenance",
    readTime: "9 min read",
    image: "/blog/instrument-maintenance.svg",
    icon: <FaStethoscope />
  },
  {
    slug: "quality-standards-manufacturing",
    title: "Quality Standards in Surgical Instrument Manufacturing: ISO & Beyond",
    excerpt: "Understanding ISO certifications and quality control processes that define premium surgical instrument production. Learn why quality matters.",
    date: "January 18, 2025",
    author: "Surgi Makers Quality Team",
    category: "Manufacturing",
    readTime: "7 min read",
    image: "/blog/quality-standards.svg",
    icon: <FaBrain />
  },
];

export default function BlogsPage() {
  useEffect(() => {
    AOS.init({ duration: 320, once: true, easing: "ease-out", offset: 24 });
  }, []);

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)] min-h-screen">
      {/* Hero Section */}
      <header className="bg-transparent py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="blog-title-display mb-8 text-center text-4xl font-bold text-white md:text-5xl" data-aos="fade-up">
            Blog & Insights
          </h1>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.95fr)] lg:items-stretch">
            <div
              className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl"
              data-aos="fade-up"
              data-aos-delay="40"
            >
              <div className="relative h-[340px] md:h-[430px]">
                <img
                  src="/Surgi_Makers_Photo.webp"
                  alt="Surgi Makers blog hero"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                      Featured Insights
                    </p>
                    <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
                      Manufacturing knowledge for global dental, surgical, and OEM buyers
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 md:p-10 shadow-xl backdrop-blur-sm"
              data-aos="fade-left"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/90">
                  <FaEnvelope className="text-lg text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                    Subscribe
                  </p>
                  <h2 className="text-3xl font-bold text-white">Get new blog updates</h2>
                </div>
              </div>
              <p className="mb-6 text-base leading-7 text-gray-300">
                Join our mailing list to receive fresh articles, product insights, and manufacturing updates directly in your inbox.
              </p>
              <form className="flex max-w-md flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-red-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="rounded-full bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-xs text-gray-500">
                No spam. Only relevant updates from Surgi Makers.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] shadow-lg transition-shadow duration-300 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={index * 35}
            >
              <div className="flex h-48 items-center justify-center bg-[linear-gradient(135deg,rgba(220,38,38,0.32),rgba(127,29,29,0.2))]">
                <div className="text-6xl text-white/60">
                  {post.icon}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm">{post.readTime}</span>
                </div>
                <h2 className="blog-card-title mb-3 line-clamp-2 text-xl font-bold text-white">
                  <Link href={`/blogs/${post.slug}`} className="hover:text-red-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-4 line-clamp-3 text-sm text-gray-300">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{post.date}</span>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Read More <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

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
                Explore more products or speak with the team directly.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Browse the Surgi Makers range, review product categories, or contact us for sourcing guidance and manufacturing support.
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
