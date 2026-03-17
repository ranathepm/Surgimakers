"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaArrowLeft,
  FaHandshake,
  FaGear,
  FaCircleCheck,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaTruck,
  FaBuilding,
} from "react-icons/fa6";
import Link from "next/link";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    partnershipType: "",
    message: "",
    attachment: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

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

      const response = await fetch("/api/partner-request", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setErrorMessage("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          partnershipType: "",
          message: "",
          attachment: null,
        });
      } else {
        setErrorMessage("Failed to submit request");
      }
    } catch (error) {
      setErrorMessage("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <FaCircleCheck size={28} />,
      title: "Premium Quality Products",
      description:
        "Access to surgical, dental, and beauty instruments produced with strong quality discipline and buyer-focused consistency.",
    },
    {
      icon: <FaGear size={28} />,
      title: "Custom Manufacturing",
      description:
        "Flexible manufacturing support for custom specifications, repeat production, and private label requirements.",
    },
    {
      icon: <FaTruck size={28} />,
      title: "Global Logistics",
      description:
        "Reliable export support and worldwide shipping readiness for distributors, importers, and procurement teams.",
    },
    {
      icon: <FaGlobe size={28} />,
      title: "Competitive Pricing",
      description:
        "Partnership models designed to support sustainable margins without sacrificing manufacturing quality.",
    },
  ];

  const partnershipTypes = [
    "Wholesale Distribution",
    "Retail Partnership",
    "Manufacturing Partnership",
    "Joint Venture",
    "Private Label/White Label",
    "Procurement Partnership",
    "Exclusive Distributorship",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <header className="border-b border-white/10 bg-black/10 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <section className="mb-14 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Join Our Network
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight !text-white lg:text-5xl">
              Partner with Surgi Makers for long-term growth and dependable supply.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300">
              Build a stronger business relationship with Surgi Makers through distribution, private label, procurement, or manufacturing partnership opportunities designed for global buyers.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.16)] min-h-[320px]">
            <img
              src="/partner-hero.jpg"
              alt="Surgi Makers partnership"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,31,0.22),rgba(6,16,31,0.72))]" />
            <div className="relative flex h-full flex-col justify-end p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
                <FaHandshake className="text-2xl" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-white">
                Ready to Become a Partner?
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                Share your business details and our team will review the opportunity and respond within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Why Partner with Surgi Makers?
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Built for distributors, retailers, healthcare buyers, and procurement teams.
            </h2>
            <div className="mt-5 space-y-5 text-sm leading-8 text-gray-300">
              <p>
                Surgi Makers manufactures surgical, dental, and beauty instruments with a practical focus on process consistency, export readiness, and responsive buyer support.
              </p>
              <p>
                We support flexible partnership models for businesses of different sizes, from wholesale distributors and retailers to healthcare institutions and procurement agencies looking for a dependable manufacturing partner.
              </p>
              <p>
                With competitive pricing, production discipline, and global delivery support, we aim to create long-term relationships built around mutual growth.
              </p>
              <p>
                For partners who need more than standard supply, Surgi Makers can also support OEM development, product customization, private label presentation, and clearer communication through each stage of the sourcing cycle.
              </p>
              <p>
                The objective is straightforward: create a stable relationship where product quality, timelines, and buyer expectations stay aligned across repeat orders and expanding programs.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <img
              src="/Surgi_Makers_Photo.webp"
              alt="Surgi Makers Manufacturing"
              className="h-full min-h-[340px] w-full object-cover"
            />
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Partnership Benefits
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              The practical advantages of working with Surgi Makers.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_32%),linear-gradient(135deg,rgba(2,6,23,0.9)_0%,rgba(15,23,42,0.86)_58%,rgba(31,41,55,0.86)_100%)] p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                  {benefit.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Direct Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Speak with the team about distribution, procurement, or private label plans.
            </h2>
            <p className="mt-4 text-sm leading-8 text-gray-300">
              If you are evaluating Surgi Makers for long-term supply, distribution support, or a private label program, this is the fastest way to start a direct conversation with the right team.
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-300">
              Share your market, business model, and sourcing goals, and we can help identify the most practical partnership path.
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

          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-600/15 text-green-400">
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Partnership Request Submitted
                </h2>
                <p className="mt-4 text-sm leading-8 text-gray-300">
                  Thank you for your interest in partnering with Surgi Makers. Our team will review your request and respond within 24 hours.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white">Partnership Request Form</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">
                  Tell us about your business and the type of partnership you're interested in.
                </p>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email *"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                      required
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name *"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                      required
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country *"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                      required
                    />
                    <select
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                      required
                    >
                      <option value="">Select Partnership Type *</option>
                      {partnershipTypes.map((type) => (
                        <option key={type} value={type} className="text-gray-900">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business and partnership goals *"
                    className="h-32 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 outline-none ring-0 transition focus:border-red-600 focus:outline-none focus:ring-0"
                    required
                  ></textarea>
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm text-gray-300">
                    <label className="mb-3 block">Attach a file if needed</label>
                    <input
                      type="file"
                      name="attachment"
                      onChange={handleFileChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white file:mr-4 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                    />
                    <p className="mt-2 text-xs text-gray-400">
                      Upload company profile, business plan, or any relevant documents
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                  </button>
                  {errorMessage && (
                    <p className="text-center text-red-400">{errorMessage}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Explore More
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Review products, quality systems, or manufacturing capabilities next.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Browse the Surgi Makers range, review quality process details, or continue to OEM manufacturing information before starting the partnership conversation.
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
                href="/quality-control"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                View Quality Process
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
