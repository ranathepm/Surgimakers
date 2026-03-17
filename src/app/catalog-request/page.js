"use client";

import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaArrowLeft, FaEnvelope, FaPhone, FaHeadset } from "react-icons/fa6";
import Link from "next/link";

export default function CatalogRequestPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    requirements: "",
    attachment: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      const response = await fetch("/api/catalog-request", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setErrorMessage("");
        setFormData({ name: "", email: "", phone: "", company: "", serviceType: "", requirements: "", attachment: null });
      } else {
        setErrorMessage("Failed to submit request");
      }
    } catch (error) {
      setErrorMessage("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Lathe CNC parts/instruments manufacturing",
    "Custom parts manufacturing",
    "Dental implants manufacturing",
    "Surgical implants manufacturing",
    "Patents manufacturing",
    "Other (specify in requirements)"
  ];

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)] min-h-screen">
      {/* Header */}
      <header className="bg-black/10 border-b border-white/10 py-4 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_35%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Request Service</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Submit Your Requirements
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tell us about your instrument or parts manufacturing needs and our team will get back to you with a detailed quotation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-8 px-4 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_35%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <FaPhone className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pakistan</p>
                <p className="font-semibold">+92 321 545 0050</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <FaPhone className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">USA</p>
                <p className="font-semibold">+1 (903) 608-9241</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-semibold">hello@surgimakers.com / info@surgimakers.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Request Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Request Form</h2>
                <p className="mb-6 text-gray-600">
                  Fill out the form below and we'll get back to you with a detailed quotation.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 mb-4 lg:mb-0 px-2">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name *"
                        className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email *"
                        className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full mb-4 lg:mb-0 md:w-1/2 px-2">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                    >
                      <option value="">Select Service Type *</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Describe your requirements in detail *"
                      className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      Attach a file (any size, any format)
                    </label>
                    <input
                      type="file"
                      name="attachment"
                      onChange={handleFileChange}
                      className="w-full p-3 border text-sm text-gray-800 font-medium bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Upload drawings, specifications, or any relevant documents
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                  {errorMessage && (
                    <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
