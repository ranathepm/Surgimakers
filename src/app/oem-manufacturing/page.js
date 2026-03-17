import Link from "next/link";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCompassDrafting,
  FaFlask,
  FaGear,
  FaIndustry,
} from "react-icons/fa6";

export const metadata = {
  title: "OEM & Private Label Manufacturing",
  description:
    "Surgi Makers partners with global brands for OEM and private label manufacturing of dental instruments, surgical instruments, implant components, and precision CNC parts.",
  keywords: [
    "OEM surgical instruments",
    "private label surgical instruments",
    "OEM dental instruments",
    "implant components manufacturer",
    "precision CNC parts manufacturer",
    "Surgi Makers OEM",
  ],
};

const processSteps = [
  {
    icon: <FaCompassDrafting />,
    title: "Drawings",
    description:
      "We work from client drawings, CAD files, reference samples, or concept inputs to define production-ready specifications.",
  },
  {
    icon: <FaFlask />,
    title: "Prototypes",
    description:
      "Prototype development helps validate fit, function, ergonomics, and technical requirements before scaling into production.",
  },
  {
    icon: <FaIndustry />,
    title: "Production",
    description:
      "Dental, surgical, implant, and precision CNC components are produced with repeatable workflows, process control, and inspection discipline.",
  },
  {
    icon: <FaGear />,
    title: "Finishing",
    description:
      "Surface finishing, passivation, assembly, polishing, and other final-stage requirements are aligned with the product type and brand needs.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Packaging",
    description:
      "Private label packaging, inserts, labels, and export-ready presentation can be adapted to match your distribution requirements.",
  },
];

const capabilities = [
  "Dental and surgical instruments built to custom specifications",
  "Implant components including abutments, drivers, screws, and accessories",
  "Precision CNC machined parts in stainless steel, titanium, and medical alloys",
  "OEM and private label manufacturing for distributors and global brands",
];

const oemScope = [
  "Custom dimensions, working ends, and technical modifications",
  "Branding, laser marking, labels, and private label packaging",
  "Sample approval and prototype refinement before production",
  "Export-ready manufacturing support for recurring purchase programs",
];

export default function OEMManufacturingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,#06101f_0%,#0f172a_24%,#111827_56%,#18212f_100%)]">
      <header className="border-b border-white/10 bg-black/10 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <section className="mb-14 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              OEM & Private Label Manufacturing
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              Custom manufacturing for serious dental, surgical, and implant buyers.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300">
              Surgi Makers partners with global brands to manufacture dental surgical instruments, implant components, and precision CNC parts according to custom specifications, technical drawings, and private label requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Discuss Your OEM Project
              </Link>
              <Link
                href="/catalog-request"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Request Manufacturing Details
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-7 text-center shadow-[0_16px_48px_rgba(0,0,0,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              What We Support
            </p>
            <div className="mt-6 space-y-3">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-4 text-sm leading-7 text-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              How We Work
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              A cleaner OEM workflow from concept to export-ready delivery.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-gray-300">
              Serious buyers need more than generic catalog supply. Our OEM process is structured to move from technical input to production and finishing with the control needed for repeat orders and branded distribution.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_32%),linear-gradient(135deg,rgba(2,6,23,0.9)_0%,rgba(15,23,42,0.86)_58%,rgba(31,41,55,0.86)_100%)] p-6 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-xl text-white">
                  {step.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Why This Matters
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Built for distributors, importers, and private label brands
            </h2>
            <div className="mt-5 space-y-5 text-sm leading-8 text-gray-300">
              <p>
                Buyers looking for OEM surgical instruments or private label dental instrument manufacturing usually need one supplier who can handle drawings, prototype review, repeat production quality, finishing, and packaging under a single workflow.
              </p>
              <p>
                Whether the requirement is a custom surgical instrument pattern, implant accessory, or precision-machined component, Surgi Makers helps brands move from concept to finished product with the documentation and responsiveness serious buyers expect.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 text-center shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Typical OEM Scope
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-300">
              {oemScope.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Explore Partnership Options
              </Link>
            </div>
          </div>
        </section>

        <section
          className="mb-16 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-sm backdrop-blur-sm"
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
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Ready to Build?
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Start the OEM discussion with drawings, samples, or a concept brief.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                Share your product requirements and Surgi Makers can help define the right path from prototype to repeat manufacturing.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Contact Us
              </Link>
              <Link
                href="/quality-control"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                View Quality Process
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
