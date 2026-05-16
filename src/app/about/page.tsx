import Image from "next/image";
import Link from "next/link";
import BlueFeaturesStrip from "@/components/common/BlueFeaturesStrip";

export const metadata = { title: "About" };

const processingFeatures = [
  {
    id: "delivery",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <rect x="4" y="24" width="40" height="24" rx="3" />
        <path d="M44 32h8l8 8v8h-16V32z" />
        <circle cx="16" cy="52" r="5" />
        <circle cx="48" cy="52" r="5" />
        <path d="M4 32h40M20 24V16a4 4 0 014-4h12" strokeLinecap="round" />
      </svg>
    ),
    title: "EFFICIENT, FAST DELIVERY",
    description:
      "Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.",
  },
  {
    id: "installation",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <circle cx="32" cy="32" r="12" />
        <path d="M32 4v8M32 52v8M4 32h8M52 32h8" strokeLinecap="round" />
        <path d="M14 14l6 6M44 44l6 6M14 50l6-6M44 20l6-6" strokeLinecap="round" />
        <circle cx="32" cy="32" r="4" fill="currentColor" />
      </svg>
    ),
    title: "QUALIFIED INSTALLATION",
    description:
      "Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.",
  },
  {
    id: "after",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24" strokeLinecap="round" />
        <path d="M44 8l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 32l6 6 12-12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "AFTER INSTALLATION SERVICES",
    description:
      "Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── AQUZERA FOR BUSINESSES ── */}
      <section className="bg-white py-16">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1
              className="text-2xl md:text-3xl font-black text-gray-900"
              style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
            >
              Aquzera for Businesses
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Bring clarity to your Business Restaurant, or Office
            </p>
          </div>

          {/* Office image */}
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-10">
            <Image
              src="/images/office-business.png"
              alt="Aquzera for businesses — office scene"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Body text + CTA */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              Learn why thousands of businesses and offices are opting for Aquzera water purifiers.
              Most people are at work for at least one-third of the day. Make sure to have a healthy
              environment for yourself, your employees, and your customers with Aquzera and our
              regular filter changes through our rental program.
            </p>
            <Link
              href="/product"
              className="mt-8 inline-flex items-center gap-2 bg-primary text-white text-xs font-bold tracking-[0.2em] px-8 py-3.5 hover:bg-blue-700 transition-colors"
            >
              EXPLORE NOW →
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK AND EFFICIENT PROCESSING ── */}
      <section className="bg-gray-950 py-16">
        <div className="container">
          {/* Top: heading + description */}
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <div>
              <h2
                className="text-3xl md:text-4xl font-black text-white leading-tight"
                style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
              >
                Quick and
                <br />
                Efficient
                <br />
                Processing
              </h2>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                Aquzera purification systems elevate your everyday hydration
                through advanced filtration and refined engineering.
                <br /><br />
                Aquzera purification systems elevate your everyday hydration
                through advanced filtration and refined engineering.
              </p>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-0 divide-y divide-white/10">
            {processingFeatures.map((feature, idx) => (
              <div
                key={feature.id}
                className="flex items-start gap-6 py-8"
              >
                {/* Icon in circle — alternating left/right */}
                {idx % 2 === 0 ? (
                  <>
                    {/* Icon left */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/70">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase mb-2">
                        {feature.title}
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                        {feature.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 text-right hidden md:block" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase mb-2">
                        {feature.title}
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/70">
                      {feature.icon}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLUE FEATURES ── */}
      <BlueFeaturesStrip />
    </>
  );
}
