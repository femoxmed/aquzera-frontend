"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import AnnouncementBar from "@/components/common/AnnouncementBar";

const COLORS = [
  { id: "charcoal", label: "CHARCOAL BLACK", bg: "bg-gray-900", border: "border-gray-900" },
  { id: "white", label: "WHITE", bg: "bg-white", border: "border-gray-300" },
];

const specSections = [
  {
    id: "general",
    title: "GENERAL",
    specs: [
      { label: "DIMENSION*", value: "12.6 x 21.3 x 16.0 inch" },
      { label: "POWER*", value: "100-240V ~ 2.5A\n50 - 60 Hz" },
      { label: "SMART DISPLAY", value: '15" Inches' },
      { label: "OPERATING TEMP.", value: "-30°C to 50°C (-22°F to 122°F)" },
      { label: "ENVIRONMENTAL RATING", value: "Meeting IP56 (Water Resistant), configured for indoor use" },
      { label: "COLOUR *", value: "Charcoal Black, White" },
    ],
  },
  {
    id: "water",
    title: "WATER FILTRATION",
    specs: [],
  },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedColor, setSelectedColor] = useState("charcoal");
  const [quantity, setQuantity] = useState(2);
  const [includeFilter, setIncludeFilter] = useState(true);
  const [openSection, setOpenSection] = useState("general");
  const [activeThumb, setActiveThumb] = useState(0);

  const isNeoSense = params.id === "neo-sense-filter";

  const productName = isNeoSense ? "Neo Sense Water Filter" : "Aquzera Water Purifier";
  const productPrice = isNeoSense ? 85608 : 200000;
  const productImage = isNeoSense ? "/images/neo-sense-filter.png" : "/images/purifier-black.png";

  const thumbnails = [productImage, productImage];

  function handleAddToCart() {
    addItem({
      id: params.id,
      name: productName,
      price: productPrice,
      quantity,
    });
    if (includeFilter && !isNeoSense) {
      addItem({
        id: "neo-sense-filter",
        name: "Neo Sense Filter",
        price: 85608,
        quantity: 1,
      });
    }
    router.push("/cart");
  }

  return (
    <>
      <AnnouncementBar />

      {/* ── PRODUCT SECTION ── */}
      <section className="bg-white">
        <div className="container py-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* LEFT: Image gallery */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {thumbnails.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 transition-colors ${
                      activeThumb === i ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <Image src={src} alt="" width={64} height={64} className="object-contain w-full h-full p-1" />
                  </button>
                ))}
                <button className="w-16 h-16 rounded border-2 border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-gray-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="text-[8px] tracking-wider">360° VIEW</span>
                </button>
              </div>

              {/* Main image */}
              <div className="flex-1 relative h-[420px] rounded-lg border border-gray-100 bg-gray-50 overflow-hidden">
                <Image
                  src={thumbnails[activeThumb]}
                  alt={productName}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            {/* RIGHT: Details */}
            <div>
              <h1
                className="text-2xl md:text-3xl font-black text-gray-900 leading-tight"
                style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
              >
                {productName}
              </h1>
              <p className="mt-2 text-xs text-gray-500 max-w-xs leading-relaxed">
                Aquzera purification systems elevate your everyday hydration
                through advanced filtration and refined engineering.
              </p>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-2">
                <span
                  className="text-xl font-black text-gray-900"
                  style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif" }}
                >
                  ₦ {productPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest font-medium">EXT. TAX</span>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-gray-100" />

              {/* Color selector */}
              {!isNeoSense && (
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 mb-3">COLOUR</p>
                  <div className="flex items-center gap-4">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded border-2 transition-colors ${
                          selectedColor === c.id
                            ? "border-primary"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full ${c.bg} ${c.border} border`} />
                        <span className="text-[10px] font-semibold tracking-widest text-gray-700">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-5 border-t border-gray-100" />

              {/* Quantity */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 mb-3">QUANTITY</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-500 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-gray-900 w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-500 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-100" />

              {/* CTA buttons */}
              <div className="flex gap-3">
                <Link
                  href="/product"
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 text-[10px] font-bold tracking-widest px-5 py-3 hover:border-gray-500 transition-colors"
                >
                  ✕ EXIT & CANCEL
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white text-[10px] font-bold tracking-widest px-5 py-3 hover:bg-blue-700 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>

          {/* ── EXTRA COMPATIBLE ADDITIONS ── */}
          {!isNeoSense && (
            <div className="mt-14 border-t border-gray-100 pt-10">
              <h2
                className="text-lg font-extrabold text-gray-900"
                style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
              >
                Extra Compatible Additions
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.
              </p>

              <div className="mt-5 max-w-sm border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                {/* Filter thumbnail */}
                <div className="relative w-16 h-20 flex-shrink-0">
                  <Image
                    src="/images/neo-sense-filter.png"
                    alt="Neo Sense Filter"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Neo Sense Filter</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
                        Aquzera purification system elevate your everyday hydration through advanced filtration and refined engineering.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1 ml-2">
                      <button
                        onClick={() => setIncludeFilter((v) => !v)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          includeFilter
                            ? "bg-primary border-primary text-white"
                            : "border-gray-300 text-transparent"
                        }`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-black text-gray-900 mt-2">
                    ₦85,608{" "}
                    <span className="text-[10px] font-medium text-gray-400 tracking-widest">EXT. TAX</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section className="brand-gradient py-12">
        <div className="container">
          <h2
            className="text-center text-2xl md:text-3xl font-black text-white mb-8"
            style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
          >
            Specifications
          </h2>

          {specSections.map((section) => (
            <div key={section.id} className="mb-2">
              <button
                onClick={() =>
                  setOpenSection(openSection === section.id ? "" : section.id)
                }
                className="w-full flex items-center justify-between py-4 border-b border-white/20 text-left group"
              >
                <span className="text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase">
                  {section.title}
                </span>
                <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-white/80 group-hover:border-white/70 transition-colors">
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openSection === section.id ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              {openSection === section.id && section.specs.length > 0 && (
                <div className="py-6 border-b border-white/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
                    {section.specs.map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[9px] font-bold tracking-[0.18em] text-white/60 uppercase mb-1">
                          {label}
                        </p>
                        <p className="text-sm text-white whitespace-pre-line leading-snug">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
