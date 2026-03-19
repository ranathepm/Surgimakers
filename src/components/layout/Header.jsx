"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiBars3 } from "react-icons/hi2";
import { FaArrowRight, FaChevronDown, FaScissors, FaGear } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaCalendarAlt, FaTooth, FaHospital } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { PRODUCT_CATEGORIES } from "../../app/products/categories";
import { useTranslation } from "../../contexts/LanguageContext";

export default function Header({}) {
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const productsMenuTimeoutRef = useRef(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (productsMenuTimeoutRef.current) {
      clearTimeout(productsMenuTimeoutRef.current);
    }
    setProductsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    productsMenuTimeoutRef.current = setTimeout(() => {
      setProductsMenuOpen(false);
    }, 180);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      dental: <FaTooth />,
      surgical: <FaScissors />,
      laparoscopy: <FaGear />,
      holloware: <FaHospital />
    };
    return icons[category] || <FaScissors />;
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsetY = window.scrollY;
      setIsSticky(
        offsetY > 50 ||
          pathname === "/contact" ||
          pathname === "/about-us" ||
          pathname === "/catalogs" ||
          pathname === "/blogs" ||
          pathname === "/products" ||
          pathname === "/partner" ||
          pathname === "/catalog-request" ||
          pathname === "/oem-manufacturing" ||
          pathname === "/quality-control"
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`${
        isSticky
          ? "bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.2),transparent_32%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] shadow-lg py-2.5"
          : "bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.2),transparent_32%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] py-3"
      } fixed top-0 w-full z-50 transition-all duration-300`}
    >
      <nav
        className="mx-auto max-w-6xl flex items-center px-4 lg:px-5"
        aria-label="Global"
      >
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="-m-1.5 relative z-10">
            <Image
              className="h-[50px] w-auto lg:h-[54px]"
              src="/LOGO_Red__White.png"
              width={120}
              height={80}
              alt="Surgi Makers - Premium Surgical, Dental and Beauty Instruments Logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-between ml-10">
          <div className="flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="header-nav-link group"
            >
              {t('header.home')}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 header-nav-link group"
              >
                {t('header.products')}
                <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Mega Menu Dropdown */}
              <div
                className={`fixed left-1/2 top-[88px] z-50 w-[min(96vw,1220px)] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.94)_52%,rgba(31,41,55,0.92)_100%)] shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 ${
                  productsMenuOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                  <div className="px-5 py-5">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
                        <div
                          key={key}
                          className="group/category overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-colors"
                        >
                          <Link
                            href={`/products?cat=${key}`}
                            className="flex flex-col items-center gap-2 px-4 py-3 text-center transition-colors hover:bg-white/5"
                          >
                            <div className="flex items-center justify-center gap-2 text-center">
                              <h3 className="text-sm font-semibold text-white transition-colors group-hover/category:text-red-600">
                                {t(`categories.${key}`)}
                              </h3>
                              <p className="text-sm font-semibold text-red-500">
                                {category.subcategories.length}
                              </p>
                            </div>
                          </Link>
                          <div className="px-4 pb-4">
                            <div className="mb-2 h-px bg-white/10"></div>
                            <div
                              className={`grid gap-1.5 ${
                                key === "dental"
                                  ? "grid-cols-5"
                                  : key === "surgical"
                                    ? "grid-cols-4"
                                    : "grid-cols-2"
                              }`}
                            >
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/products?cat=${key}&sub=${sub.id}`}
                                  className="block rounded-lg border border-transparent bg-white/[0.03] px-2.5 py-1.5 text-[10px] leading-tight text-gray-300 transition-colors hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                                >
                                  {t(`categories.${sub.id}`)}
                                </Link>
                              ))}
                            </div>
                            <Link
                              href={`/products?cat=${key}`}
                              className="mt-4 inline-flex items-center justify-center rounded-full bg-red-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                            >
                              Browse all {t(`categories.${key}`)}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
            <Link
              href="/catalogs"
              className="header-nav-link group"
            >
              {t('header.catalogs')}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about-us"
              className="header-nav-link group"
            >
              {t('header.about')}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="header-nav-link group"
            >
              {t('header.contact')}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blogs"
              className="header-nav-link group"
            >
              {t('header.blogs')}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/oem-manufacturing"
              className="header-nav-link group"
            >
              OEM
              <span className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-red-600 transition-all duration-300 ${pathname === "/oem-manufacturing" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
            <Link
              href="/quality-control"
              className="header-nav-link group"
            >
              Quality
              <span className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-red-600 transition-all duration-300 ${pathname === "/quality-control" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
            <Link
              href="/partner"
              className="header-nav-link group"
            >
              Partner Us
              <span className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-red-600 transition-all duration-300 ${pathname === "/partner" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
          </div>
          <div className="flex items-center gap-2.5 ml-4">
            <Link
              href="/contact"
              className="ui-button hidden lg:flex whitespace-nowrap bg-red-600 items-center justify-center px-4 py-2.5 text-[11px] leading-5 text-white font-medium hover:bg-red-700 transition-colors rounded-lg uppercase"
              aria-label="Request a quote for products"
            >
              Get Quote <FaArrowRight className="ml-2" />
            </Link>
            <Link
              href="https://calendly.com/ranathepm"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-button hidden lg:flex whitespace-nowrap border border-white/10 bg-gray-900 items-center justify-center px-4 py-2.5 text-[11px] leading-5 text-white font-medium hover:bg-gray-800 transition-colors rounded-lg uppercase"
              aria-label="Schedule a meeting with us"
            >
              <FaCalendarAlt className="mr-2" />
              {t('header.meeting')}
            </Link>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_32%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] px-4 py-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  className="h-[55px] w-[75px]"
                  src="/LOGO_Red__White.png"
                  width={75}
                  height={75}
                  alt="Surgi Makers - Premium Surgical, Dental and Beauty Instruments Logo"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <HiOutlineXMark className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-4">
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {t('header.home')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/products"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {t('header.products')}
                  </Link>
                  <Link
                    href="/catalogs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {t('header.catalogs')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/about-us"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {t('header.about')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {t('header.contact')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/blogs"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {t('header.blogs')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/oem-manufacturing"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    OEM Manufacturing
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/quality-control"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    Quality Control
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/partner"
                    className="-mx-3 block rounded-lg px-3 py-3 text-[15px] font-medium text-red-500 hover:bg-white/5 transition-colors"
                  >
                    Partner Us
                  </Link>
                </div>
                <div className="space-y-2 py-4">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="ui-button -mx-3 block rounded-lg bg-red-600 px-3 py-3 text-[14px] font-medium text-white text-center hover:bg-red-700 transition-colors uppercase"
                  >
                    Get Quote
                  </Link>
                  <Link
                    href="https://calendly.com/ranathepm"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="ui-button -mx-3 block rounded-lg bg-red-600 px-3 py-3 text-[14px] font-medium text-white text-center hover:bg-red-700 transition-colors uppercase"
                  >
                    {t('header.meeting')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
