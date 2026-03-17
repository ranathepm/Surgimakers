"use client";

import Image from "next/image";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "../../contexts/LanguageContext";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_35%),linear-gradient(135deg,#020617_0%,#111827_55%,#1f2937_100%)] text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 py-5 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-lg font-bold mb-2.5 text-white">Trust & Resources</h3>
            <img
              src="https://business.thomasnet.com/hs-fs/hubfs/Thomas-Logo-Light-Registered.png?height=87&name=Thomas-Logo-Light-Registered.png&width=288"
              alt="Thomasnet logo"
              className="h-7 w-auto"
            />
            <div className="mt-2.5 space-y-1 text-sm">
              <Link
                href="/oem-manufacturing"
                className="block text-gray-300 transition-colors hover:text-white"
              >
                OEM & Private Label Manufacturing
              </Link>
              <Link
                href="/quality-control"
                className="block text-gray-300 transition-colors hover:text-white"
              >
                Quality Control Process
              </Link>
              <a
                href="https://www.thomasnet.com/company/surgi-makers-30991200/profile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
              >
                <span>View Our Verified Thomasnet Profile</span>
                <img
                  src="https://cdn.thomasnet.com/badges/thomas-verified-supplier.png"
                  alt="Thomas Verified Supplier badge"
                  className="h-6 w-auto"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2.5 text-white">Address</h3>
            <div className="space-y-2 text-xs text-gray-300">
              <p className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">
                  <FaLocationDot size={16} />
                </span>
                <span>539 W. Commerce St. #3899, Dallas, TX 75208</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">
                  <FaLocationDot size={16} />
                </span>
                <span>Roras Rd, Muzaffar Pur, Sialkot, Punjab, 51310</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">
                  <FaLocationDot size={16} />
                </span>
                <span>201 Fatima Height, Jinnah Block, Bahria Town, Lahore</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2.5 text-white">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <MdEmail className="text-red-500" size={18} />
                <a href="mailto:hello@surgimakers.com" className="hover:text-white transition-colors">
                  hello@surgimakers.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MdEmail className="text-red-500" size={18} />
                <a href="mailto:info@surgimakers.com" className="hover:text-white transition-colors">
                  info@surgimakers.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-red-500" size={14} />
                <span>+1 (903) 608-9241</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-red-500" size={14} />
                <span>+92 321 545 0050</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">
              {t('footer.certifications')}
            </h2>
            <div className="-mt-1 grid grid-cols-3 gap-3 items-center justify-items-center">
              {[
                "SECP_Logo.png",
                "sialkot-chamber-of-commerce-industries-logo-F8C579481E.png",
                "The_Surgical_Instruments_Manufacturing_Association_of_Pakistan.png",
                "ISO_13485.png",
                "unnamed.png",
                "CE_Surgi_Makers.png",
              ].map((src, index) => (
                <div key={index} className="flex items-center justify-center p-2">
                  <Image
                    src={`/${src}`}
                    width={src === "CE_Surgi_Makers.png" ? 40 : 52}
                    height={src === "CE_Surgi_Makers.png" ? 40 : 52}
                    className="object-contain"
                    alt={`${index === 0 ? "SECP" : index === 1 ? "Sialkot Chamber of Commerce" : index === 2 ? "Surgical Instruments Manufacturers Association" : index === 3 ? "ISO 13485" : index === 4 ? "FDA Registration" : "CE Certification"} Certification Logo`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-wrap gap-4 py-3.5 items-center justify-between border-t border-gray-800">
          <div className="flex space-x-4 order-2 md:order-1">
            <a
              href="https://www.facebook.com/profile.php?id=61561965284084"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Surgi Makers on Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/thesurgimakers/"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Surgi Makers on Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/103958507/"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Surgi Makers on LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-400 order-1 md:order-2">
            &copy; {new Date().getFullYear()} Surgi Makers. {t('footer.allRightsReserved')}{' '}
            <a href="https://surgimakers.com" className="text-red-500 hover:text-red-400">
              surgimakers.com
            </a>{' '}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
