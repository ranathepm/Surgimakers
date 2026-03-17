"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaArrowDown, FaAward, FaGlobe, FaTag, FaBriefcaseMedical, FaTooth, FaSpa } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const catalogs = [
  {
    id: "surgical",
    name: "Surgical Instruments",
    description:
      "A focused catalog of general surgical patterns, forceps, scissors, retractors, and precision instruments for hospital and distributor sourcing.",
    file: "/Surgical Catalog - Surgi Makers.pdf",
    icon: <FaBriefcaseMedical size={58} />,
    details: ["Forceps and scissors", "Needle holders", "General surgery tools"],
  },
  {
    id: "dental",
    name: "Dental Instruments",
    description:
      "Browse extraction, periodontal, restorative, and specialist dental instrument ranges organized for faster product review.",
    file: "/Dental Catalog -Surgi Makers.pdf",
    icon: <FaTooth size={58} />,
    details: ["Extraction tools", "Scalers and elevators", "Clinical dental sets"],
  },
  {
    id: "beauty",
    name: "Beauty Instruments",
    description:
      "A curated presentation of salon, manicure, pedicure, and beauty tools built for private label and repeat wholesale supply.",
    file: "/Beauty Catalog - Surgi Makers.pdf",
    icon: <FaSpa size={58} />,
    details: ["Scissors and tweezers", "Cuticle and nail tools", "Professional beauty kits"],
  },
];

const strengths = [
  {
    icon: <FaGlobe size={30} />,
    title: "Global Distribution",
    description:
      "Catalogs are prepared for importers, resellers, clinics, and procurement teams that need fast review and export-ready product access.",
  },
  {
    icon: <FaAward size={30} />,
    title: "Reliable Manufacturing",
    description:
      "Each catalog reflects the same production standards, quality control, and material consistency used across Surgi Makers manufacturing.",
  },
  {
    icon: <FaTag size={30} />,
    title: "Private Label Friendly",
    description:
      "The ranges shown here are suitable for OEM discussion, custom branding, and tailored packaging for international buyers.",
  },
];

export default function CatalogsPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <section className="mb-14 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="flex flex-col justify-center" data-aos="fade-right">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Product Catalogs
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              Download Surgi Makers catalogs in a cleaner, buyer-ready format.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300">
              Explore surgical, dental, and beauty instrument catalogs designed for quicker product review, sourcing conversations, and export inquiries.
            </p>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem]" data-aos="fade-left">
            <Image
              src="/Product page photo.jpg"
              alt="Surgi Makers product catalogs"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,31,0.08),rgba(6,16,31,0.6))]" />
          </div>
        </section>

        <section className="mb-16" data-aos="fade-up">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Browse Collections
            </p>
            <h2 className="text-3xl font-bold text-white">
              Choose the catalog most relevant to your sourcing needs.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {catalogs.map((catalog, index) => (
              <article
                key={catalog.id}
                data-aos="fade-up"
                data-aos-delay={index * 90}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] shadow-[0_16px_44px_rgba(0,0,0,0.14)]"
              >
                <div className="px-7 pt-7 pb-4">
                  <div className="mx-auto flex items-center justify-center text-red-500">
                    {catalog.icon}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7 pt-0 text-center">
                  <h3 className="text-xl font-bold text-white">
                    {catalog.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    {catalog.description}
                  </p>
                  <div className="mt-5 space-y-2">
                    {catalog.details.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <a
                      href={catalog.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      View Catalog
                    </a>
                    <a
                      href={catalog.file}
                      download
                      className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      <FaArrowDown className="text-sm" />
                      Download Catalog
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-6 lg:grid-cols-3" data-aos="fade-up">
          {strengths.map((feature, index) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={index * 90}
              className="rounded-[1.5rem] border border-white/10 bg-white/6 p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section
          className="grid gap-8 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr]"
          data-aos="fade-up"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Need Something Specific?
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Request a catalog, shortlist, or private label discussion.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-gray-300">
              If you need a focused catalog for a product family, an OEM discussion, or direct support on export-ready instrument ranges, the Surgi Makers team can prepare the right next step.
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Contact Us
            </Link>
            <Link
              href="/oem-manufacturing"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Explore OEM Manufacturing
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
