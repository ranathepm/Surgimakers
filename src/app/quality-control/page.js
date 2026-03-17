import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCircleCheck,
  FaFlask,
  FaHandshake,
  FaMagnifyingGlass,
  FaMicroscope,
  FaRepeat,
  FaWandMagicSparkles,
} from "react-icons/fa6";

export const metadata = {
  title: "Quality Control Process",
  description:
    "Explore the Surgi Makers quality control process, from raw material inspection and CNC precision machining to manual finishing, quality testing, sterilization, and packaging.",
  keywords: [
    "surgical instrument quality control",
    "dental instrument quality process",
    "raw material inspection",
    "CNC precision machining quality",
    "sterilization and packaging",
    "Surgi Makers quality control",
  ],
};

const qualityStages = [
  {
    icon: <FaMagnifyingGlass />,
    title: "Raw Material Inspection",
    description:
      "Incoming stainless steel, titanium, and medical-grade alloys are checked for specification match, surface condition, and production suitability before machining starts.",
  },
  {
    icon: <FaMicroscope />,
    title: "CNC Precision Machining",
    description:
      "Critical geometries are produced through monitored CNC machining and dimensional checks to protect tolerance accuracy across dental, surgical, implant, and custom components.",
  },
  {
    icon: <FaWandMagicSparkles />,
    title: "Manual Finishing",
    description:
      "Working ends, joints, edges, and visible surfaces are refined through grinding, polishing, passivation, and assembly checks for clean presentation and reliable function.",
  },
  {
    icon: <FaFlask />,
    title: "Quality Testing",
    description:
      "In-process and final inspection includes dimensional review, hardness verification, functional checks, and visual control for batch consistency and performance confidence.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Sterilization & Packaging",
    description:
      "Finished products move through final review, labeling, and export packaging procedures designed to support hygienic standards and international delivery.",
  },
];

const qualityNotes = [
  {
    icon: <FaCircleCheck />,
    title: "Process Control",
    description:
      "Each stage protects a different part of the manufacturing result, from material integrity and geometry to function, finish, and shipment readiness.",
  },
  {
    icon: <FaHandshake />,
    title: "Buyer Confidence",
    description:
      "A visible quality workflow helps reduce sourcing risk for distributors, importers, and private label buyers evaluating long-term supply partners.",
  },
  {
    icon: <FaRepeat />,
    title: "Repeatability",
    description:
      "The goal is not only a good sample, but consistent outcomes across production runs, inspections, and export-ready deliveries.",
  },
];

const factoryGallery = [
  {
    src: "/Surgi_Makers_Photo.webp",
    title: "Production Floor",
    caption:
      "A view into the Surgi Makers manufacturing environment and daily production workflow.",
    span: "lg:col-span-2",
  },
  {
    src: "/Surgi Makers Steel.jpg",
    title: "Material and Production Handling",
    caption:
      "Controlled material flow and production stages that support process consistency and readiness.",
    span: "",
  },
  {
    src: "/Surgi Makers Steel 2.jpg",
    title: "Finishing and Inspection Workflow",
    caption:
      "Factory activity focused on finishing standards, inspection discipline, and shipment readiness.",
    span: "lg:col-span-3",
  },
];

export default function QualityControlPage() {
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
              Quality Control Process
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight !text-white lg:text-5xl">
              A clearer look at how Surgi Makers controls quality from intake to dispatch.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300">
              This page outlines how Surgi Makers approaches inspection, machining, finishing, testing, and packaging so buyers can understand the practical controls behind each order.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Ask About Quality Standards
              </Link>
              <Link
                href="/oem-manufacturing"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View OEM Manufacturing
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/Surgi Makers Steel 2.jpg"
              alt="Surgi Makers quality control"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,31,0.12),rgba(6,16,31,0.66))]" />
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Process Overview
            </p>
            <h2 className="text-3xl font-bold text-white">
              Five core stages that shape the final manufacturing result.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {qualityStages.map((stage) => (
              <div
                key={stage.title}
                className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_32%),linear-gradient(135deg,rgba(2,6,23,0.9)_0%,rgba(15,23,42,0.86)_58%,rgba(31,41,55,0.86)_100%)] p-6 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-xl text-white">
                  {stage.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{stage.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-6 lg:grid-cols-3">
          {qualityNotes.map((note) => (
            <div
              key={note.title}
              className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-7 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                {note.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{note.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-300">{note.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <div className="mb-8 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Factory Images
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Visual snapshots from the Surgi Makers production environment.
              </h2>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Discuss Supply Partnership
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {factoryGallery.map((image) => (
              <article
                key={image.src}
                className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] shadow-[0_16px_44px_rgba(0,0,0,0.14)] backdrop-blur-sm ${image.span}`}
              >
                <div className="h-[320px] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{image.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">{image.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.88)_55%,rgba(31,41,55,0.88)_100%)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Need More Information?
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Review the process, then continue into OEM or direct contact.
              </h2>
              <p className="mt-4 text-sm leading-8 text-gray-300">
                If you need deeper QC details, OEM support, or a supply discussion, the Surgi Makers team can help define the next step.
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
                href="/oem-manufacturing"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Explore OEM Manufacturing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
