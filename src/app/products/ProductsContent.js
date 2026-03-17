"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronRight, FaHospital, FaMagnifyingGlass, FaScissors, FaTooth } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT_CATEGORIES } from "./categories";
import { useTranslation } from "../../contexts/LanguageContext";
import { useProducts } from "../../hooks/useProducts";

// Rotating Product Carousel Component
function ProductCarousel({ products, onProductClick }) {
  // Use useMemo for deterministic carousel product selection
  const carouselProducts = useMemo(() => {
    if (products.length > 0) {
      return products.filter(p => p.imageUrl).slice(0, 12);
    }
    return [];
  }, [products]);

  return (
    <div className="w-full overflow-hidden bg-gray-100">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-5px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .product-card {
          animation: slideIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <div className="flex gap-4 animate-scroll">
        {carouselProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            onClick={() => onProductClick(product.id)}
            className="flex-shrink-0 w-44 cursor-pointer group product-card"
            style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
          >
            <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    unoptimized
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4="
                  />
                ) : null}
              </div>
              <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
        {carouselProducts.map((product, index) => (
          <div
            key={`${product.id}-second-${index}`}
            onClick={() => onProductClick(product.id)}
            className="flex-shrink-0 w-44 cursor-pointer group product-card"
            style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
          >
            <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    unoptimized
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4="
                  />
                ) : null}
              </div>
              <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("cat");
  const subcategoryParam = searchParams.get("sub");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [expandedCategory, setExpandedCategory] = useState(categoryParam || Object.keys(PRODUCT_CATEGORIES)[0]);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { products: productsFullList, isLoading } = useProducts();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    if (categoryParam && PRODUCT_CATEGORIES[categoryParam]) {
      setExpandedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryParam, subcategoryParam, searchQuery, sortBy]);

  const getCategoryIcon = (category) => {
    const icons = {
      dental: <FaTooth />,
      surgical: <FaScissors />,
    };
    return icons[category] || <FaScissors />;
  };

  const activeCategoryKey = categoryParam && PRODUCT_CATEGORIES[categoryParam] ? categoryParam : "";

  const getFilteredProducts = () => {
    let filtered = productsFullList;
    if (activeCategoryKey && PRODUCT_CATEGORIES[activeCategoryKey]) {
      const category = PRODUCT_CATEGORIES[activeCategoryKey];
      if (subcategoryParam) {
        const subcategory = category.subcategories.find(s => s.id === subcategoryParam);
        filtered = filtered.filter(p => subcategory && p.category === subcategory.name);
      } else {
        filtered = filtered.filter(p => category.subcategories.some(s => p.category === s.name));
      }
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.sku?.toLowerCase().includes(query)
      );
    }
    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sortBy === "featured") {
      for (let i = products.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }
      return products;
    }

    return products.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const selectedCategory = activeCategoryKey ? PRODUCT_CATEGORIES[activeCategoryKey] : null;
  const selectedSubcategory = selectedCategory?.subcategories.find(s => s.id === subcategoryParam);
  const productsPerPage = 18;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = sortedProducts.slice(
    (safeCurrentPage - 1) * productsPerPage,
    safeCurrentPage * productsPerPage
  );

  const allCategoriesCount = Object.entries(PRODUCT_CATEGORIES).reduce((acc, [, category]) => {
    return acc + productsFullList.filter(p => category.subcategories.some(s => p.category === s.name)).length;
  }, 0);

  const categoryCounts = Object.entries(PRODUCT_CATEGORIES).reduce((acc, [key, category]) => {
    acc[key] = productsFullList.filter((p) =>
      category.subcategories.some((s) => p.category === s.name)
    ).length;
    return acc;
  }, {});

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const pageTitle = "Products";
  const pageCategoryLabel = selectedSubcategory?.name || selectedCategory?.name || t("products.allProducts");
  const breadcrumbText = selectedSubcategory
    ? `Home / Products / ${selectedCategory?.name} / ${selectedSubcategory.name}`
    : selectedCategory
      ? `Home / Products / ${selectedCategory.name}`
      : "Home / Products";
  const visibleStart = sortedProducts.length ? (safeCurrentPage - 1) * productsPerPage + 1 : 0;
  const visibleEnd = Math.min(safeCurrentPage * productsPerPage, sortedProducts.length);
  const visiblePageNumbers = (() => {
    const pages = [];
    const start = Math.max(1, safeCurrentPage - 2);
    const end = Math.min(totalPages, safeCurrentPage + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("ellipsis-start");
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis-end");
      pages.push(totalPages);
    }

    return pages;
  })();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <section className="mb-8 pb-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div>
              <h1 className="text-4xl font-bold text-white">{pageTitle}</h1>
              <p className="mt-3 text-lg font-medium text-gray-200">{pageCategoryLabel}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-gray-400">
                {breadcrumbText}
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-[290px]">
            <div className="rounded-2xl border border-white/10 bg-[#0b1524]/78 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.2)] lg:sticky lg:top-24">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Product Catalog</h2>
                <button
                  type="button"
                  onClick={() => setMobileCatalogOpen((prev) => !prev)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-300 lg:hidden"
                >
                  {mobileCatalogOpen ? "Close" : "Open"}
                </button>
              </div>

              <div className={`${mobileCatalogOpen ? "block" : "hidden"} space-y-1 lg:block`}>
                <Link
                  href="/products"
                  className={`mb-2 flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    !activeCategoryKey ? "bg-red-600 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-xs opacity-80">({allCategoriesCount})</span>
                </Link>

                {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => {
                  const isExpanded = expandedCategory === key;
                  const totalProducts = categoryCounts[key] || 0;

                  return (
                    <div key={key} className="border-b border-white/8 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedCategory(isExpanded ? "" : key);
                          router.push(`/products?cat=${key}`);
                        }}
                        className={`flex w-full items-center justify-between gap-3 py-3 text-left text-sm transition-colors ${
                          activeCategoryKey === key && !subcategoryParam
                            ? "text-white"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-red-500">{getCategoryIcon(key)}</span>
                          <span className="font-medium">{category.name}</span>
                        </span>
                        <span className="flex items-center gap-2 text-gray-400">
                          <span className="text-xs">({totalProducts})</span>
                          <FaChevronRight className={`text-[11px] transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="ml-6 space-y-1 pb-3">
                          {category.subcategories.map((sub) => {
                            const subCount = productsFullList.filter((p) => p.category === sub.name).length;
                            if (!subCount) return null;

                            return (
                              <Link
                                key={sub.id}
                                href={`/products?cat=${key}&sub=${sub.id}`}
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                  subcategoryParam === sub.id
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

          <div className="flex-1">
            <div className="mb-6 flex justify-center">
              <div className="flex w-full max-w-[980px] flex-col items-center gap-3 md:flex-row md:justify-center">
                <div className="w-full max-w-[680px] lg:max-w-[720px] xl:max-w-[780px]">
                  <div className="flex items-center rounded-full border border-white/10 bg-[#0c1626]/90 px-4 py-2.5 transition focus-within:border-red-600">
                    <FaMagnifyingGlass className="mr-3 text-sm text-gray-500" />
                    <input
                      type="text"
                      placeholder={t("products.searchProducts")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-[#0c1626]/90 px-4 py-2.5 text-sm text-white outline-none transition focus:border-red-500 md:w-[220px]"
                >
                  <option value="featured">Sort by featured</option>
                  <option value="name-asc">Sort by name: A to Z</option>
                  <option value="name-desc">Sort by name: Z to A</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center">
                <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
                <p className="text-lg text-gray-300">{t("products.loadingProducts")}</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0b1524]/58 py-20 text-center shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
                <p className="text-lg text-gray-300">{t("products.noProductsFound")}</p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">
                    Showing {visibleStart}-{visibleEnd} of {sortedProducts.length} results
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product, index) => (
                  <div
                    key={product.id || index}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_18px_36px_rgba(0,0,0,0.16)]"
                  >
                    <button
                      type="button"
                      onClick={() => handleProductClick(product.id)}
                      className="relative aspect-[4/3] overflow-hidden bg-white text-left"
                    >
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <FaHospital className="text-5xl text-gray-300" />
                          </div>
                        )}
                    </button>
                      <div className="flex flex-1 flex-col p-6">
                        <button
                          type="button"
                          onClick={() => handleProductClick(product.id)}
                          className="min-h-[3.25rem] text-left text-lg font-semibold leading-6 text-gray-900 line-clamp-2"
                        >
                          {product.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleProductClick(product.id)}
                          className="mt-auto rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  {visiblePageNumbers.map((item) => (
                    item === "ellipsis-start" || item === "ellipsis-end" ? (
                      <span
                        key={item}
                        className="px-2 text-sm font-semibold text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCurrentPage(item)}
                        className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition-colors ${
                          safeCurrentPage === item
                            ? "bg-red-600 text-white"
                            : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
                    disabled={safeCurrentPage === totalPages}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                  <select
                    value={safeCurrentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="h-10 rounded-lg border border-white/10 bg-[#0c1626] px-3 text-sm font-medium text-white outline-none focus:border-red-500"
                  >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => {
                      const pageNumber = pageIndex + 1;
                      return (
                        <option key={pageNumber} value={pageNumber}>
                          Page {pageNumber}
                        </option>
                      );
                    })}
                  </select>
                  </div>
                )}
              </>
            )}

          </div>
        </div>

        <section className="px-0 pb-6 pt-14">
          <div
            className="mx-auto mb-10 max-w-[76rem] rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-sm backdrop-blur-sm"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-6 text-center">
              <div className="max-w-3xl mx-auto">
                <img
                  src="https://business.thomasnet.com/hs-fs/hubfs/Thomas-Logo-Light-Registered.png?height=87&name=Thomas-Logo-Light-Registered.png&width=288"
                  alt="Thomasnet logo"
                  className="h-12 w-auto mx-auto"
                />
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                  Recognized Industrial Supplier
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  Trusted sourcing visibility for serious industrial buyers
                </h3>
                <p className="mt-4 text-gray-300 leading-7">
                  Surgi Makers is listed on Thomasnet, supporting stronger buyer trust for
                  industrial sourcing, global export visibility, and precision manufacturing
                  credibility.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://cdn.thomasnet.com/badges/thomas-verified-supplier.png"
                  alt="Thomas Verified Supplier badge"
                  className="h-28 w-auto"
                />
                <a
                  href="https://www.thomasnet.com/company/surgi-makers-30991200/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[280px] justify-center rounded-full bg-red-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  View Our Verified Thomasnet Profile
                </a>
              </div>
            </div>
          </div>

          <div
            className="mx-auto max-w-[76rem] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Ready to Work With Us?
                </p>
                <h2 className="mt-4 text-3xl font-bold text-white">
                  Need help shortlisting products or discussing manufacturing options?
                </h2>
                <p className="mt-4 text-sm leading-8 text-gray-300">
                  Browse the Surgi Makers range, request product guidance, or contact the team directly for sourcing, OEM, and export-ready manufacturing support.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Contact Us
                </Link>
                <Link
                  href="/oem-manufacturing"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Explore OEM Manufacturing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductsContent;
