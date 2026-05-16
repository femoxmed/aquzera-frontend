import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import BlueFeaturesStrip from "@/components/common/BlueFeaturesStrip";

export const metadata = { title: "Products" };

export default function ProductPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/kitchen-bg.png"
          alt="Aquzera Water Purifier kitchen scene"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex h-full">
          {/* Left: text */}
          <div className="flex flex-col justify-center px-6 md:px-16 max-w-lg">
            <h1
              className="text-4xl md:text-5xl font-black text-white leading-[1.05]"
              style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
            >
              Aquzera
              <br />
              Water Purifier*
            </h1>
            <p className="mt-4 text-sm text-white/75 max-w-xs leading-relaxed">
              Aquzera purification systems elevate your everyday hydration
              through advanced filtration and refined engineering.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link
                href="/product/aquzera-water-purifier"
                className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold tracking-widest px-6 py-3 hover:bg-blue-700 transition-colors"
              >
                BUY NOW →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center border border-white/60 text-white text-xs font-bold tracking-widest px-6 py-3 hover:bg-white/10 transition-colors"
              >
                LEARN MORE
              </Link>
            </div>
          </div>

          {/* Right: purifier image */}
          <div className="hidden md:flex flex-1 items-center justify-center pr-16">
            <div className="relative w-60 h-80">
              <Image
                src="/images/purifier-black.png"
                alt="Aquzera Water Purifier"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Starting price banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 flex items-center justify-center gap-3">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-white/80 uppercase">
            STARTING FROM ₦200,000*
          </span>
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── NEO SENSE SPLIT ── */}
      <section className="grid md:grid-cols-2 min-h-[420px]">
        {/* Left: white bg, filter image */}
        <div className="bg-white flex items-center justify-center py-16 px-8">
          <div className="relative w-48 h-72">
            <Image
              src="/images/neo-sense-filter.png"
              alt="Neo Sense Water Filter"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: dark bg, text */}
        <div className="bg-gray-950 flex flex-col justify-center px-10 md:px-16 py-16">
          <h2
            className="text-3xl md:text-4xl font-black text-white leading-tight"
            style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
          >
            Neo Sense
            <br />
            Water Filter
          </h2>
          <p className="mt-4 text-sm text-white/70 max-w-xs leading-relaxed">
            Aquzera purification systems elevate your everyday hydration through
            advanced filtration and refined engineering.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/product/neo-sense-filter"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold tracking-widest px-6 py-3 hover:bg-blue-700 transition-colors"
            >
              BUY NOW →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center border border-white/50 text-white text-xs font-bold tracking-widest px-5 py-3 hover:bg-white/10 transition-colors"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLUE FEATURES ── */}
      <BlueFeaturesStrip />
    </>
  );
}
