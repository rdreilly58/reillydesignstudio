import Link from "next/link";
import { ArrowRight, Cpu, Zap, Radio, Heart, Shield, Satellite, Activity, Gauge, Battery, CircuitBoard, Server, Code } from "lucide-react";

const services = [
  {
    icon: CircuitBoard,
    title: "Board Bring-Up",
    price: "From $5,000",
    duration: "2–6 weeks",
    desc: "Taking a board from bare PCB to fully booting and validated. Power rail sequencing, clock configuration, peripheral bring-up, BSP development, and the methodical process of making hardware and software agree with each other.",
    features: [
      "Power sequencing validation and debug",
      "Clock tree configuration and PLL tuning",
      "Peripheral bring-up (UART, SPI, I²C, Ethernet, USB, PCIe)",
      "Memory controller initialization (DDR3/4/5, NAND, NOR)",
      "Boot loader development and configuration (U-Boot, custom)",
      "Hardware/software integration and acceptance testing",
    ],
  },
  {
    icon: Gauge,
    title: "RTOS Development",
    price: "From $4,000",
    duration: "2–8 weeks",
    desc: "Deterministic, real-time software for systems where timing isn't a suggestion. Deep experience with FreeRTOS, VxWorks, and bare-metal schedulers across safety-critical and high-reliability domains.",
    features: [
      "FreeRTOS application architecture and task design",
      "VxWorks BSP development and system integration",
      "Bare-metal firmware with custom scheduling",
      "Low-power design — sleep modes, duty cycling, power budgets",
      "Inter-task communication and synchronization design",
      "MISRA-C compliance and static analysis",
    ],
  },
  {
    icon: Server,
    title: "Embedded Linux",
    price: "From $4,000",
    duration: "2–6 weeks",
    desc: "When your embedded system needs the full power of Linux — custom BSPs, device drivers, optimized builds, and production images that boot fast and run lean.",
    features: [
      "Custom Linux BSP for ARM, x86, RISC-V",
      "Device driver development (character, block, network, platform)",
      "Yocto Project / Buildroot custom distribution builds",
      "Boot time optimization (sub-second where needed)",
      "Root filesystem hardening and security",
      "OTA update system design and implementation",
    ],
  },
  {
    icon: Code,
    title: "Firmware Development",
    price: "From $3,500",
    duration: "2–8 weeks",
    desc: "Production firmware that ships — ARM Cortex-M and Cortex-A, RISC-V, and legacy architectures. Bootloaders, application firmware, field update mechanisms, and the kind of reliability that comes from two decades of shipping products.",
    features: [
      "ARM Cortex-M0/M3/M4/M7 and Cortex-A application development",
      "RISC-V firmware and toolchain setup",
      "Custom bootloader development with secure boot",
      "Over-the-air (OTA) firmware update systems",
      "Hardware abstraction layers (HAL) and middleware",
      "Production test firmware and manufacturing support",
    ],
  },
];

const domains = [
  {
    icon: Satellite,
    title: "Satellite & RF Communications",
    desc: "Satellite modem firmware, telemetry systems, RF front-end control, and waveform processing. Systems that work 22,000 miles from the nearest debugger.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Defense & Intelligence",
    desc: "Embedded systems for military and IC applications. SIGINT platforms, electronic warfare, tactical communications, and systems built to MIL-STD reliability standards.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Heart,
    title: "Biomedical Devices",
    desc: "Firmware for medical and biomedical devices — patient monitoring, diagnostic instruments, and wearable health tech. Where software quality isn't optional.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Radio,
    title: "Telemetry & IoT",
    desc: "Remote telemetry units, sensor networks, and industrial IoT platforms. Low-power designs that run for years on batteries and report reliably over constrained links.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const capabilities = [
  { label: "FreeRTOS", category: "RTOS" },
  { label: "VxWorks", category: "RTOS" },
  { label: "Embedded Linux", category: "OS" },
  { label: "Bare Metal", category: "OS" },
  { label: "ARM Cortex-M", category: "Architecture" },
  { label: "ARM Cortex-A", category: "Architecture" },
  { label: "RISC-V", category: "Architecture" },
  { label: "Low-Power Design", category: "Specialty" },
  { label: "JTAG / SWD Debug", category: "Tools" },
  { label: "Logic Analyzer", category: "Tools" },
  { label: "Oscilloscope", category: "Tools" },
  { label: "U-Boot", category: "Bootloader" },
  { label: "Yocto / Buildroot", category: "Build System" },
  { label: "GCC / LLVM Toolchains", category: "Toolchain" },
  { label: "Git / CI-CD", category: "Process" },
  { label: "MISRA-C", category: "Standard" },
  { label: "UART / SPI / I²C", category: "Interface" },
  { label: "Ethernet / USB / PCIe", category: "Interface" },
  { label: "CAN / LIN", category: "Interface" },
  { label: "BLE / WiFi / LoRa", category: "Wireless" },
];

export default function EmbeddedPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-6 border border-amber-500/20">
          <Cpu size={12} /> Embedded Systems
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Software That Touches Hardware
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Two decades of embedded software engineering — satellite modems, defense platforms,
          biomedical devices, and telemetry systems. From board bring-up to production firmware.
        </p>
      </div>

      {/* Service Cards */}
      <div className="space-y-8 mb-24">
        {services.map((svc) => (
          <div key={svc.title} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 hover:border-amber-900/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <svc.icon className="text-amber-400" size={26} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-semibold">{svc.price}</span>
                    <span className="text-zinc-600 text-sm">· {svc.duration}</span>
                  </div>
                </div>
                <p className="text-zinc-400 mb-5">{svc.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {svc.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Domain Experience */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Domain Experience</h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
          Twenty years of shipping embedded products across industries where failure isn&apos;t an option.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {domains.map((domain) => (
            <div key={domain.title} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
              <div className={`w-12 h-12 rounded-xl ${domain.bg} flex items-center justify-center mb-4`}>
                <domain.icon className={domain.color} size={22} />
              </div>
              <h3 className="text-white font-semibold mb-2">{domain.title}</h3>
              <p className="text-zinc-400 text-sm">{domain.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Low Power Callout */}
      <div className="mb-24 rounded-2xl bg-gradient-to-b from-amber-950/30 to-zinc-900 border border-amber-900/30 p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Battery className="text-amber-400" size={26} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Low-Power Design Specialist</h3>
            <p className="text-zinc-400 mb-4">
              When your device runs on a coin cell for five years, every microamp matters. Deep experience
              with sleep mode architectures, duty-cycled radio designs, power domain management, and
              the dark art of getting real-world power consumption to match the datasheet.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Sleep mode optimization", "Duty-cycled radios", "Power budgeting", "Current profiling", "Energy harvesting"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs border border-zinc-700">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Cloud */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Technical Capabilities</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {capabilities.map((cap) => (
            <span
              key={cap.label}
              className="px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-300 text-sm border border-zinc-800 hover:border-amber-800 hover:text-amber-300 transition-colors"
            >
              {cap.label}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-b from-amber-950/40 to-zinc-900 border border-amber-900/30 p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Have a board that needs software?</h2>
        <p className="text-zinc-400 max-w-lg mx-auto mb-8">
          Whether it&apos;s a new design that needs bring-up or a legacy system that needs modernization,
          let&apos;s talk. Twenty years of experience, and I still love the moment the first UART prints &quot;Hello World.&quot;
        </p>
        <Link href="/shop/services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors">
          Request a Quote <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
