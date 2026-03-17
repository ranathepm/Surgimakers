"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaLocationDot, FaClock, FaHeadset } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function Section1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to send email");
      }
    } catch (error) {
      setErrorMessage("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-white" />,
      label: "Call Us",
      lines: ["+1 (903) 608-9241", "+92 321 545 0050"],
    },
    {
      icon: <FaEnvelope className="text-white" />,
      label: "Email Us",
      lines: ["hello@surgimakers.com", "info@surgimakers.com"],
    },
    {
      icon: <FaClock className="text-white" />,
      label: "Business Hours",
      lines: ["9:00 AM CST - 6:00 PM CST", "Sunday is off"],
    },
  ];

  const addresses = [
    {
      icon: <FaLocationDot className="text-white" />,
      city: "Dallas, USA",
      address: "539 W. Commerce St. #3899, Dallas, TX 75208",
    },
    {
      icon: <FaLocationDot className="text-white" />,
      city: "Sialkot, Pakistan",
      address: "Roras Rd, Muzaffar Pur, Sialkot, Punjab, 51310",
    },
    {
      icon: <FaLocationDot className="text-white" />,
      city: "Lahore, Pakistan",
      address: "201 Fatima Height, Jinnah Block, Bahria Town, Lahore",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <section className="mb-14 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="flex flex-col justify-center" data-aos="fade-right">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Get in Touch
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              Contact Surgi Makers for products, catalogs, and manufacturing support.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300">
              Whether you need product details, sourcing guidance, OEM discussion, or export-related support, the team is available to help you move faster.
            </p>
          </div>

          <div
            className="rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.16)]"
            data-aos="fade-left"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600">
              <FaHeadset className="text-white text-xl" />
            </div>
            <h2 className="mt-5 text-center text-2xl font-bold text-white">
              Have questions or need assistance?
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-gray-300">
              Reach out for product information, quotations, or technical clarification. Surgi Makers supports both direct buyers and long-term manufacturing clients.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="https://calendly.com/ranathepm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <FaCalendarAlt />
                Schedule a Meeting
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-16 grid gap-6 md:grid-cols-3" data-aos="fade-up">
          {contactInfo.map((info, index) => (
            <div
              key={info.label}
              className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              data-aos="fade-up"
              data-aos-delay={index * 90}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600">
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{info.label}</h3>
              <div className="mt-4 space-y-2">
                {info.lines.map((line) => (
                  <p key={line} className="text-base font-medium text-gray-100">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-16" data-aos="fade-up">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Our Locations
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Reach Surgi Makers across Pakistan and the United States.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {addresses.map((item, index) => (
              <div
                key={item.city}
                className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={index * 90}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{item.city}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.address}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
                    name="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {formData.file && (
                  <p className="mt-3 text-xs text-gray-300">{formData.file.name}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                disabled={isSubmitting}
                aria-label={isSubmitting ? "Submitting message" : "Send message"}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
              {isSubmitted && (
                <p className="text-center font-medium text-green-600">
                  Form submitted successfully! We&apos;ll get back to you soon.
                </p>
              )}
              {errorMessage && (
                <p className="text-center text-red-600">{errorMessage}</p>
              )}
            </form>
          </div>
        </section>

        <section
          className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Need More Information?
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Explore products or review catalogs before reaching out.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Browse the Surgi Makers range, review available catalogs, or contact the team directly for personalized support.
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
                href="/catalogs"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                View Catalogs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Section1;
