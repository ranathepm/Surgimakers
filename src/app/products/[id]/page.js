"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaArrowLeft, FaChevronLeft, FaChevronRight,
  FaEnvelope
} from "react-icons/fa6";
import Link from "next/link";
import { useTranslation } from "../../../contexts/LanguageContext";
import { useProducts } from "../../../hooks/useProducts";
import { PRODUCT_CATEGORIES } from "../categories";

function ProductImageZoom({ imageUrl, alt }) {
  const imageFrameRef = useRef(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomActive, setIsZoomActive] = useState(false);

  const handleMouseMove = (event) => {
    if (!imageFrameRef.current) return;

    const bounds = imageFrameRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  return (
    <div
      ref={imageFrameRef}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden relative group cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomActive(true)}
      onMouseLeave={() => setIsZoomActive(false)}
    >
      {imageUrl ? (
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-contain transition-transform duration-150 ease-out"
            style={{
              transform: isZoomActive ? "scale(2.15)" : "scale(1)",
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>
      ) : (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400">No image available</p>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [expandedCategory, setExpandedCategory] = useState("");
  const { products, isLoading } = useProducts();

  const activeCategoryEntry = Object.entries(PRODUCT_CATEGORIES).find(([, category]) =>
    category.subcategories.some((sub) => sub.name === product?.category)
  );
  const activeCategoryKey = activeCategoryEntry?.[0] || "";
  const activeCategory = activeCategoryEntry?.[1] || null;
  const activeSubcategory = activeCategory?.subcategories.find((sub) => sub.name === product?.category) || null;

  const categoryCounts = Object.entries(PRODUCT_CATEGORIES).reduce((acc, [key, category]) => {
    acc[key] = products.filter((item) =>
      category.subcategories.some((sub) => item.category === sub.name)
    ).length;
    return acc;
  }, {});

  // Find current product and its index
  useEffect(() => {
    if (!products.length) return;

    const foundProduct = products.find(p => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentIndex(products.findIndex(p => p.id === params.id));
    }
  }, [params.id, products]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (activeCategoryKey) {
      setExpandedCategory(activeCategoryKey);
    }
  }, [activeCategoryKey]);

  const goToNextProduct = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    const nextProduct = products[nextIndex];
    router.push(`/products/${nextProduct.id}`);
  };

  const goToPrevProduct = () => {
    const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    const prevProduct = products[prevIndex];
    router.push(`/products/${prevProduct.id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 text-lg">{t('productDetail.loadingProduct')}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 text-lg mb-4">{t('productDetail.productNotFound')}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('header.products')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)] min-h-screen">
      {/* Header */}
      <header className="bg-black/10 border-b border-white/10 py-2 backdrop-blur-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft />
            {t('products.allProducts')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid max-w-8xl gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-8 mx-auto items-start">
          <aside data-aos="fade-right">
            <div className="rounded-2xl border border-white/10 bg-[#0b1524]/78 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.2)] lg:sticky lg:top-24">
              <h2 className="mb-5 text-lg font-bold text-white">Product Catalog</h2>
              <div className="space-y-1">
                <Link
                  href="/products"
                  className="mb-2 flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span>All Products</span>
                </Link>

                {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => {
                  const isExpanded = expandedCategory === key;
                  const totalProducts = categoryCounts[key] || 0;

                  return (
                    <div key={key} className="border-b border-white/8 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setExpandedCategory(isExpanded ? "" : key)}
                        className={`flex w-full items-center justify-between gap-3 py-3 text-left text-sm transition-colors ${
                          activeCategoryKey === key ? "text-white" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="flex items-center gap-2 text-gray-400">
                          <span className="text-xs">({totalProducts})</span>
                          <FaChevronRight className={`text-[11px] transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="ml-6 space-y-1 pb-3">
                          {category.subcategories.map((sub) => {
                            const subCount = products.filter((item) => item.category === sub.name).length;
                            if (!subCount) return null;

                            return (
                              <Link
                                key={sub.id}
                                href={`/products?cat=${key}&sub=${sub.id}`}
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                  activeSubcategory?.id === sub.id
                                    ? "bg-red-600 text-white"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                              >
                                <span className="flex items-center justify-between gap-3">
                                  <span>{sub.name}</span>
                                  <span className="text-xs opacity-70">({subCount})</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-8 items-start">
              {/* Product Image */}
              <div data-aos="fade-right">
                <ProductImageZoom
                  imageUrl={product.imageUrl}
                  alt={product.name}
                />

                {/* Navigation */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={goToPrevProduct}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-red-600 hover:scale-105 transition-all text-sm"
                  >
                    <FaChevronLeft />
                    {t('common.previous')}
                  </button>
                  <button
                    onClick={goToNextProduct}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-red-600 hover:scale-105 transition-all text-sm"
                  >
                    {t('common.next')}
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div data-aos="fade-left" className="flex flex-col gap-3 pt-4 lg:pt-10">
                <p className="text-red-600 font-semibold uppercase tracking-wide text-sm">
                  {activeCategory?.name || product.category}
                </p>

                {product.sku && (
                  <p className="text-gray-500 text-sm">
                    {t('productDetail.sku')}: {product.sku}
                  </p>
                )}

                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {product.description ? (
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-gray-900">{t('productDetail.description')}</h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-2">
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {t('productDetail.defaultDescription')}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <p className="text-gray-500 text-xs">{t('productDetail.category')}</p>
                    <p className="font-bold text-gray-900 text-sm">{t(`categories.${product.category.toLowerCase().replace(/\s+/g, '-')}`)}</p>
                  </div>
                  {product.sku && (
                    <div className="bg-white rounded-lg p-2 shadow-lg">
                      <p className="text-gray-500 text-xs">{t('productDetail.sku')}</p>
                      <p className="font-bold text-gray-900 text-sm">{product.sku}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-2.5 px-6 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
                  >
                    <FaEnvelope />
                    {t('header.requestQuote')}
                  </Link>

                  <a
                    href={`mailto:info@surgimakers.com?subject=${encodeURIComponent(t('header.requestQuote'))} - ${encodeURIComponent(product.name)}&body=${encodeURIComponent(`I'm interested in: ${product.name}\nSKU: ${product.sku || ''}\nPlease provide pricing and availability.`)}`}
                    className="flex items-center justify-center gap-2 w-full bg-white text-gray-900 py-2.5 px-6 rounded-lg font-semibold text-sm border-2 border-gray-200 hover:border-red-600 hover:text-red-600 transition-colors"
                  >
                    <FaEnvelope />
                    {t('productDetail.emailUs')}
                  </a>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {products.length > 0 && currentIndex >= 0 && (
              <section data-aos="fade-up">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('productDetail.moreProducts')}</h2>

                {(() => {
                  const relatedProducts = products.filter(
                    p => p.category === product.category && p.id !== product.id
                  ).slice(0, 4);

                  if (relatedProducts.length > 0) {
                    return (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                          {t('productDetail.similarTo')} "{product.name}"
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {relatedProducts.map((relatedProduct) => (
                            <Link
                              key={relatedProduct.id}
                              href={`/products/${relatedProduct.id}`}
                              className="block"
                            >
                              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                  {relatedProduct.imageUrl ? (
                                    <img
                                      src={relatedProduct.imageUrl}
                                      alt={relatedProduct.name}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <p className="text-gray-400 text-sm">No image</p>
                                    </div>
                                  )}
                                </div>
                                <div className="p-2">
                                  <h3 className="text-xs text-gray-900 line-clamp-2 leading-snug font-medium">
                                    {relatedProduct.name}
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
