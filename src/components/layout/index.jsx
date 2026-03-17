"use client";

import { FaWhatsapp } from "react-icons/fa6";
import Footer from "./Footer";
import Header from "./Header";
import { useTranslation } from "../../contexts/LanguageContext";

function Layout({ children }) {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <section className="">{children}</section>
      <Footer />
      <a
        href="https://wa.me/+923281446634"
        className="fixed bottom-6 right-4 flex items-center bg-red-600 text-white font-medium gap-1 py-1.5 px-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300 text-sm"
        target="_blank"
        rel="noopener noreferrer"
        style={{ zIndex: 1000 }}
      >
        <FaWhatsapp size="20" />
        {t('header.howMayWeHelp')}
      </a>
    </main>
  );
}

export default Layout;
