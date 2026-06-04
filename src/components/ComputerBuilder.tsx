import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  MessageSquare, 
  Plus, 
  Check, 
  RefreshCw, 
  ShoppingCart, 
  Sparkles, 
  Gamepad2, 
  Flame, 
  Activity, 
  Sliders, 
  Settings 
} from 'lucide-react';

interface ComponentOption {
  id: string;
  name: string;
  price: number;
  wattage: number;
  performanceScore: number; // 1-100 rating
}

interface ComponentCategory {
  title: string;
  key: 'cpu' | 'motherboard' | 'gpu' | 'ram' | 'storage' | 'psu' | 'casing';
  options: ComponentOption[];
}

export default function ComputerBuilder() {
  const categories: ComponentCategory[] = [
    {
      title: 'Processor / CPU Core',
      key: 'cpu',
      options: [
        { id: 'cpu-budget', name: 'Intel Core i3 10th Gen (Standard Dual Quad)', price: 16500, wattage: 65, performanceScore: 40 },
        { id: 'cpu-mid', name: 'Intel Core i5 12th Gen (High-Speed Balanced)', price: 34500, wattage: 65, performanceScore: 72 },
        { id: 'cpu-high', name: 'Intel Core i7 13th Gen (Ultra-Thread Turbo Workload)', price: 78000, wattage: 125, performanceScore: 94 },
        { id: 'cpu-gaming', name: 'AMD Ryzen 5 5600X (Low-Latency Gaming Expert)', price: 38000, wattage: 65, performanceScore: 78 },
        { id: 'cpu-creator', name: 'AMD Ryzen 7 5700X (Heavy-Duty Rendering Core)', price: 54000, wattage: 65, performanceScore: 88 },
      ]
    },
    {
      title: 'Motherboard Platform',
      key: 'motherboard',
      options: [
        { id: 'mb-budget', name: 'H610 Core Solid Micro-ATX (Standard Core Boost)', price: 19500, wattage: 15, performanceScore: 45 },
        { id: 'mb-mid', name: 'B760 M-Pro Wifi Extreme (Dual Channel Boost)', price: 32000, wattage: 20, performanceScore: 75 },
        { id: 'mb-gaming', name: 'AMD B550 Gaming Pro Steel Legend Edition', price: 29500, wattage: 20, performanceScore: 72 },
      ]
    },
    {
      title: 'Dedicated Graphics Card (GPU)',
      key: 'gpu',
      options: [
        { id: 'gpu-integrated', name: 'Intel Integrated High-Definition Core Engine', price: 0, wattage: 5, performanceScore: 12 },
        { id: 'gpu-budget', name: 'NVIDIA GTX 1650 4GB Sourced Display Card', price: 32000, wattage: 75, performanceScore: 48 },
        { id: 'gpu-mid', name: 'NVIDIA RTX 3050 8GB DLSS Co-Processor', price: 68000, wattage: 115, performanceScore: 70 },
        { id: 'gpu-high', name: 'NVIDIA RTX 4060 8GB Twin-Cooler Extreme Active', price: 95500, wattage: 130, performanceScore: 92 },
      ]
    },
    {
      title: 'System RAM Memory',
      key: 'ram',
      options: [
        { id: 'ram-8', name: '8GB DDR4 High-Speed Module', price: 5500, wattage: 4, performanceScore: 40 },
        { id: 'ram-16', name: '16GB (8GBx2) Dual-Channel DDR4 Heat-sink Pack', price: 9800, wattage: 8, performanceScore: 75 },
        { id: 'ram-32', name: '32GB (16GBx2) High-Bandwidth Creator DDR5 Speed', price: 24500, wattage: 12, performanceScore: 98 },
      ]
    },
    {
      title: 'High-Speed Solid Storage (SSD)',
      key: 'storage',
      options: [
        { id: 'ssd-sata', name: '256GB High-Health 2.5" SATA SSD', price: 4200, wattage: 2, performanceScore: 35 },
        { id: 'ssd-nvme-mid', name: '512GB PCIe NVMe M.2 Generation 3 Elite Drive', price: 7800, wattage: 4, performanceScore: 75 },
        { id: 'ssd-nvme-high', name: '1TB Superfast Generation 4 SSD Storage Array', price: 14500, wattage: 6, performanceScore: 96 },
      ]
    },
    {
      title: 'Certified Power Supply (PSU)',
      key: 'psu',
      options: [
        { id: 'psu-budget', name: '450W Eco Reliable Standard Static PSU', price: 4800, wattage: 0, performanceScore: 40 },
        { id: 'psu-mid', name: '550W 80-Plus Bronze Certified Silent Cool', price: 7500, wattage: 0, performanceScore: 70 },
        { id: 'psu-high', name: '750W 80-Plus Gold Modular Corsair Gaming Core', price: 16500, wattage: 0, performanceScore: 95 },
      ]
    },
    {
      title: 'LED Gaming Casing & Aesthetics',
      key: 'casing',
      options: [
        { id: 'case-office', name: 'Elegant Solid Black Silent Office Chassis', price: 3800, wattage: 0, performanceScore: 35 },
        { id: 'case-rgb-mid', name: 'Aero-Cool Mesh Chassis with 3x Auto-RGB Fan Fans', price: 8500, wattage: 10, performanceScore: 75 },
        { id: 'case-gaming-high', name: 'Extreme Tempered Glass Panoramic Gaming Casing', price: 12500, wattage: 15, performanceScore: 98 },
      ]
    }
  ];

  // Default selection paths
  const [selected, setSelected] = useState<Record<string, string>>({
    cpu: 'cpu-mid',
    motherboard: 'mb-budget',
    gpu: 'gpu-integrated',
    ram: 'ram-8',
    storage: 'ssd-nvme-mid',
    psu: 'psu-budget',
    casing: 'case-office',
  });

  // --- AUTO AI BUILDER STATES ---
  const [targetBudget, setTargetBudget] = useState<number>(100000);
  const [buildType, setBuildType] = useState<'gaming' | 'editing' | 'office'>('gaming');
  const [bottleneckReport, setBottleneckReport] = useState<{ score: number; text: string; status: 'excellent' | 'good' | 'skewed' }>({
    score: 3.5,
    text: "Optimal Match. CPU/GPU pipeline balanced beautifully with 0 thermal leakage risk.",
    status: "excellent"
  });

  // --- BENCHMARK CENTER STATES ---
  const [selectedGame, setSelectedGame] = useState<'gta' | 'pubg' | 'valorant' | 'cs2'>('gta');

  const handleSelect = (categoryKey: string, optionId: string) => {
    setSelected((prev) => ({ ...prev, [categoryKey]: optionId }));
    calculateBottleneck(categoryKey, optionId);
  };

  // Helper dynamic bottleneck feedback generator
  const calculateBottleneck = (changedKey?: string, changedId?: string) => {
    // Determine active CPU & GPU ids
    const cpuId = changedKey === 'cpu' ? changedId : selected.cpu;
    const gpuId = changedKey === 'gpu' ? changedId : selected.gpu;

    let cpuPart = categories[0].options.find(o => o.id === cpuId);
    let gpuPart = categories[2].options.find(o => o.id === gpuId);

    const cpuScore = cpuPart ? cpuPart.performanceScore : 50;
    const gpuScore = gpuPart ? gpuPart.performanceScore : 50;

    const absoluteDivergence = Math.abs(cpuScore - gpuScore);
    let score = parseFloat((absoluteDivergence * 0.15 + (cpuScore < 50 && gpuScore > 80 ? 12 : 1)).toFixed(1));
    if (score < 1) score = 1.2;

    let text = "";
    let status: 'excellent' | 'good' | 'skewed' = 'excellent';

    if (score <= 5) {
      text = "Excellent Match! CPU and GPU pipelines are highly synchronized. Maximum gaming and work rates.";
      status = 'excellent';
    } else if (score <= 12) {
      text = "Good compatibility. Minor headroom difference present but system will execute fully.";
      status = 'good';
    } else {
      text = "Significant bottleneck risk detected. Your powerful display card is bottlenecked by a low dual-thread processor.";
      status = 'skewed';
    }

    setBottleneckReport({ score, text, status });
  };

  // Compute stats on fly
  const configStats = useMemo(() => {
    let totalPrice = 0;
    let totalWattage = 0;
    let totalScore = 0;

    categories.forEach((cat) => {
      const activeOptionId = selected[cat.key];
      const match = cat.options.find((opt) => opt.id === activeOptionId);
      if (match) {
        totalPrice += match.price;
        totalWattage += match.wattage;
        totalScore += match.performanceScore;
      }
    });

    const averagePerformance = Math.min(Math.round(totalScore / categories.length), 100);
    const safteyPSUWattage = Math.round(totalWattage * 1.5 + 100); // safety headroom calculation

    return {
      price: totalPrice,
      wattage: totalWattage,
      score: averagePerformance,
      recommendedPsu: safteyPSUWattage,
    };
  }, [selected, categories]);

  // Dynamic game-FPS logic
  const gameStats = useMemo(() => {
    // Core parameters to derive expected FPS
    const cpuPart = categories[0].options.find(o => o.id === selected.cpu);
    const gpuPart = categories[2].options.find(o => o.id === selected.gpu);
    const ramPart = categories[3].options.find(o => o.id === selected.ram);

    const cpuVal = cpuPart ? cpuPart.performanceScore : 40;
    const gpuVal = gpuPart ? gpuPart.performanceScore : 12;
    const ramVal = ramPart ? ramPart.performanceScore : 40;

    const gameFormulae = {
      gta: {
        name: "GTA V (Grand Theft Auto)",
        fps: Math.round(25 + gpuVal * 1.45 + cpuVal * 0.35 + (ramVal > 70 ? 10 : 0)),
        settings: gpuVal > 80 ? "Ultra settings 1080p" : gpuVal > 45 ? "High settings 1080p" : "Medium settings 720p",
        thermals: gpuVal > 80 ? "68°C - 74°C (Normal)" : "55°C - 62°C (Optimal)"
      },
      pubg: {
        name: "PUBG Mobile / PC",
        fps: Math.round(20 + gpuVal * 1.35 + cpuVal * 0.3 + (ramVal > 70 ? 15 : 0)),
        settings: gpuVal > 80 ? "Ultra 90 FPS active" : gpuVal > 45 ? "Extreme High 60 FPS" : "Balanced 45 FPS",
        thermals: "59°C - 68°C (Stable)"
      },
      valorant: {
        name: "Valorant (Competitive)",
        fps: Math.round(50 + gpuVal * 0.6 + cpuVal * 2.1 + (ramVal > 70 ? 20 : 0)),
        settings: cpuVal > 80 ? "Pro High 240Hz+ lock" : cpuVal > 45 ? "High 144Hz lock" : "Competetive Low 60Hz+",
        thermals: "48°C - 58°C (Cool)"
      },
      cs2: {
        name: "Counter Strike 2 (CS2)",
        fps: Math.round(40 + gpuVal * 0.95 + cpuVal * 1.6 + (ramVal > 70 ? 15 : 0)),
        settings: gpuVal > 80 ? "Max visual preset" : gpuVal > 45 ? "Performance layout" : "Custom competitive low",
        thermals: "52°C - 64°C (Controlled)"
      }
    };

    return gameFormulae[selectedGame];
  }, [selected, selectedGame]);

  // --- AUTOMATIC AI MATCHING ALGORITHM ---
  const handleAutoAssembleBuild = () => {
    // Generate selections dynamically to fit budget safely and optimize scores by type
    let budgetCap = targetBudget;
    
    // Pick the absolute best combination matching Cap limits
    let finalSelection: Record<string, string> = {};

    // Helper logic: Pre-configure a baseline
    if (budgetCap < 75000) {
      // Extremely cost-saving office setups
      finalSelection = {
        cpu: 'cpu-budget', // Intel i3
        motherboard: 'mb-budget', // H610
        gpu: 'gpu-integrated', // Integrated
        ram: 'ram-8', // 8GB RAM
        storage: 'ssd-sata', // 256GB SSD
        psu: 'psu-budget', // Standard PSU
        casing: 'case-office', // Elegant Case
      };
    } else if (budgetCap <= 135000) {
      // Mid-tier gaming/work setups
      if (buildType === 'gaming') {
        finalSelection = {
          cpu: 'cpu-gaming', // Ryzen 5 Low Latency
          motherboard: 'mb-gaming', // B550 Platform
          gpu: 'gpu-budget', // GTX 1650 Dedicated
          ram: 'ram-8', // 8GB RAM
          storage: 'ssd-nvme-mid', // 512GB M.2
          psu: 'psu-budget', // 450W
          casing: 'case-rgb-mid', // RGB Case
        };
      } else {
        finalSelection = {
          cpu: 'cpu-mid', // i5 Core
          motherboard: 'mb-budget', // H610
          gpu: 'gpu-integrated', // Integrated
          ram: 'ram-16', // 16GB Dual
          storage: 'ssd-nvme-mid', // 512GB NVMe
          psu: 'psu-budget', // standard PSU
          casing: 'case-office', // Silent case
        };
      }
    } else if (budgetCap <= 220000) {
      // Ultra performance setups
      if (buildType === 'gaming') {
        finalSelection = {
          cpu: 'cpu-gaming', // Ryzen 5 low latency
          motherboard: 'mb-gaming', // B550 Gaming Pro
          gpu: 'gpu-mid', // RTX 3050 8GB
          ram: 'ram-16', // 16GB RAM Dual Channel
          storage: 'ssd-nvme-mid', // 512GB SSD M.2
          psu: 'psu-mid', // 550W 80-Plus
          casing: 'case-rgb-mid', // Aero-Cool Box
        };
      } else if (buildType === 'editing') {
        finalSelection = {
          cpu: 'cpu-creator', // Ryzen 7 Core Creator
          motherboard: 'mb-gaming', // AMD B550
          gpu: 'gpu-budget', // GTX 1650 4GB
          ram: 'ram-16', // 16GB block
          storage: 'ssd-nvme-high', // 1TB SSD Array
          psu: 'psu-mid', // 550W
          casing: 'case-office', // Black silent
        };
      } else {
        finalSelection = {
          cpu: 'cpu-high', // Intel i7 13th
          motherboard: 'mb-mid', // B760 platform
          gpu: 'gpu-integrated', // Integrated
          ram: 'ram-16', // 16GB DDR4
          storage: 'ssd-nvme-high', // 1TB SSD
          psu: 'psu-mid', // 550W
          casing: 'case-office', // Silent black
        };
      }
    } else {
      // Beast setups (over 220K PKR)
      finalSelection = {
        cpu: 'cpu-high', // i7 Ultra
        motherboard: 'mb-mid', // B760 Plat
        gpu: 'gpu-high', // RTX 4060 8GB Extreme
        ram: 'ram-32', // 32GB Creator DDR5
        storage: 'ssd-nvme-high', // 1TB Superfast Drive
        psu: 'psu-high', // Gold modular PSU
        casing: 'case-gaming-high', // Glass Panoramic
      };
    }

    setSelected(finalSelection);
    setTimeout(() => {
      calculateBottleneck('cpu', finalSelection.cpu);
    }, 100);
  };

  const handleSendToCEO = () => {
    let specListLines = "";
    categories.forEach((cat) => {
      const activeOptionId = selected[cat.key];
      const match = cat.options.find((opt) => opt.id === activeOptionId);
      if (match) {
        specListLines += `\n• ${cat.title}: ${match.name} (Rs ${match.price.toLocaleString()})`;
      }
    });

    const bodyText = `Assalam-o-Alaikum Saqib Saheb!
I configured my Custom PC Build on your MM Computer website. Here is my selected hardware configurations list:
${specListLines}

📊 CUSTOM BUILD SUMMARY:
- PC Estimated Score: ${configStats.score}/100 Performance
- Power Draw (Est): ${configStats.wattage} Watts
- Safety PSU Recommendation: ${configStats.recommendedPsu}W Minimum
- Total System Price: Rs ${configStats.price.toLocaleString()}

Please coordinate with me regarding physical availability in your Kotli store and direct workspace service assembly!`;

    const link = `https://wa.me/923430407210?text=${encodeURIComponent(bodyText)}`;
    window.open(link, '_blank');
  };

  const handleReset = () => {
    setSelected({
      cpu: 'cpu-budget',
      motherboard: 'mb-budget',
      gpu: 'gpu-integrated',
      ram: 'ram-8',
      storage: 'ssd-sata',
      psu: 'psu-budget',
      casing: 'case-office',
    });
  };

  return (
    <div className="w-full grid lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT PANEL: SELECTOR AND NEW AI AUTOMATIC BUILDER */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Futuristic AI PC Builder Pro Section */}
        <div className="p-5 sm:p-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-sky-500/20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">AI Automated Compatibility Builder</h4>
              <p className="text-[10px] text-slate-400">Specify your budget in PKR and system target. We will do structural bottleneck matching on the spot!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4 items-end">
            
            {/* Custom budgeted selector */}
            <div className="md:col-span-5 space-y-1.5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Write Target Budget (PKR)</span>
              <div className="flex items-center bg-slate-950 border border-slate-850 rounded-xl p-3 text-white font-mono text-xs w-full gap-2">
                <span className="text-slate-500 font-extrabold uppercase">PKR</span>
                <input
                  type="number"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(parseInt(e.target.value) || 0)}
                  className="bg-transparent border-none outline-none font-bold text-sky-400 flex-grow text-sm"
                  min="30000"
                  max="1000000"
                />
              </div>
            </div>

            {/* Platform usage categories switcher */}
            <div className="md:col-span-4 space-y-1.5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Core Workload Profile</span>
              <div className="grid grid-cols-3 bg-slate-950 border border-slate-850 p-1 rounded-xl text-[9px] font-black text-center text-slate-400 uppercase">
                <button
                  type="button"
                  onClick={() => setBuildType('gaming')}
                  className={`py-2 rounded-lg cursor-pointer ${buildType === 'gaming' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 font-black' : ''}`}
                >
                  Gaming
                </button>
                <button
                  type="button"
                  onClick={() => setBuildType('editing')}
                  className={`py-2 rounded-lg cursor-pointer ${buildType === 'editing' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 font-black' : ''}`}
                >
                  Editing
                </button>
                <button
                  type="button"
                  onClick={() => setBuildType('office')}
                  className={`py-2 rounded-lg cursor-pointer ${buildType === 'office' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 font-black' : ''}`}
                >
                  Office
                </button>
              </div>
            </div>

            {/* Assemble trigger button */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={handleAutoAssembleBuild}
                className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-[10px] font-black uppercase tracking-wider text-white py-3.5 rounded-xl transition cursor-pointer shadow-lg shadow-sky-500/10"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Auto-Match Build</span>
              </button>
            </div>

          </div>

          {/* Core compat indicators */}
          {bottleneckReport && (
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-850/80 grid md:grid-cols-4 items-center gap-4 text-xs font-semibold">
              <div className="md:col-span-1 border-r border-slate-850/60 pr-2">
                <span className="text-[8px] text-slate-500 font-black tracking-widest block uppercase">Calculated Bottleneck</span>
                <span className={`text-lg font-black font-mono block mt-0.5 ${
                  bottleneckReport.status === 'excellent' ? 'text-emerald-400' : bottleneckReport.status === 'good' ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {bottleneckReport.score}%
                </span>
              </div>
              <div className="md:col-span-3">
                <p className="text-slate-400 leading-relaxed text-[11px] font-medium">&ldquo;{bottleneckReport.text}&rdquo;</p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic selector choices columns below */}
        {categories.map((cat) => {
          const activeOptionId = selected[cat.key];
          return (
            <div key={cat.key} className="p-4 sm:p-5 rounded-2xl border border-slate-850 bg-slate-950/40 relative">
              <span className="text-[10px] font-black uppercase text-sky-400 tracking-widest block mb-2">{cat.title}</span>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
                {cat.options.map((opt) => {
                  const isChecked = opt.id === activeOptionId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(cat.key, opt.id)}
                      className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-all relative select-none cursor-pointer ${
                        isChecked 
                          ? 'bg-gradient-to-br from-sky-500/10 to-sky-600/5 border-sky-400 text-white shadow-md' 
                          : 'bg-slate-900/60 border-slate-850 hover:border-slate-700 hover:bg-slate-900 text-slate-350'
                      }`}
                      style={{ gridColumn: 'span 5' }}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs sm:text-sm font-bold flex-grow">{opt.name}</span>
                        {isChecked && (
                          <span className="p-1 rounded-full bg-sky-500 text-white shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-3.5 pt-2.5 border-t border-slate-800/60 text-[10px] font-semibold text-slate-400 w-full">
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3 h-3 text-sky-400 shrink-0" />
                          {opt.wattage > 0 ? `${opt.wattage}W Power` : 'Static Unit'}
                        </span>
                        <span className="text-sm font-black text-sky-450">
                          {opt.price === 0 ? 'Included' : `Rs ${opt.price.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT PANEL: LIVE CAD SIGNAL & PRICE BOARD */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 gap-6 flex flex-col">
        
        {/* Futuristic Interactive Motherboard / Chassis CAD Board */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl overflow-hidden relative group">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded text-[8px] font-black text-sky-450 tracking-wider uppercase animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Live CAD Signal
          </div>
          
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
            <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
            Neon Hardware Socket Mapper
          </h4>
          
          {/* Schematic SVG Vector representation */}
          <div className="w-full h-44 bg-slate-900/60 rounded-xl border border-slate-850 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
            
            <svg viewBox="0 0 200 160" className="w-full h-full relative z-10">
              <rect x="15" y="10" width="170" height="140" rx="6" fill="#030712" stroke="#1e293b" strokeWidth="2" />
              <rect x="18" y="13" width="164" height="134" rx="4" fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
              
              <rect x="25" y="115" width="45" height="30" rx="3" fill="#0f172a" stroke={selected.psu ? "#10b981" : "#334155"} strokeWidth={selected.psu ? "1.5" : "1"} className="transition-all duration-300" />
              <text x="47" y="132" fill={selected.psu ? "#10b981" : "#475569"} fontSize="7" fontWeight="900" textAnchor="middle" className="font-mono">PSU</text>
              {selected.psu && <circle cx="32" cy="122" r="1.5" fill="#10b981" className="animate-ping" />}

              <rect x="65" y="25" width="36" height="36" rx="3" fill="#090d16" stroke={selected.cpu ? "#38bdf8" : "#334155"} strokeWidth={selected.cpu ? "2" : "1"} className="transition-all duration-300" />
              <rect x="69" y="29" width="28" height="28" rx="1" fill="#020617" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 1" />
              <text x="83" y="47" fill={selected.cpu ? "#38bdf8" : "#475569"} fontSize="8" fontWeight="bold" textAnchor="middle" className="font-mono">CPU</text>

              <g className="transition-all duration-300">
                <rect x="110" y="20" width="4" height="46" rx="1" fill="#0f172a" stroke={selected.ram ? "#f59e0b" : "#334155"} strokeWidth="1" />
                <rect x="118" y="20" width="4" height="46" rx="1" fill="#0f172a" stroke={selected.ram ? "#f59e0b" : "#334155"} strokeWidth="1" />
                <text x="116" y="73" fill={selected.ram ? "#f59e0b" : "#475569"} fontSize="7" fontWeight="bold" textAnchor="middle" className="font-mono uppercase">RAM</text>
              </g>

              <g className="transition-all duration-300">
                <rect x="65" y="75" width="85" height="22" rx="3" fill="#070a13" stroke={selected.gpu !== 'gpu-integrated' ? "#f43f5e" : "#1e293b"} strokeWidth={selected.gpu !== 'gpu-integrated' ? "2" : "1"} />
                <text x="107" y="88" fill={selected.gpu !== 'gpu-integrated' ? "#f43f5e" : "#475569"} fontSize="7" fontWeight="905" textAnchor="middle" className="font-mono">GPU SLOT</text>
              </g>

              <g className="transition-all duration-300">
                <rect x="115" y="108" width="30" height="10" rx="1" fill="#090d16" stroke={selected.storage ? "#06b6d4" : "#1e293b"} strokeWidth="1" />
                <text x="130" y="115" fill={selected.storage ? "#06b6d4" : "#475569"} fontSize="6" fontWeight="bold" textAnchor="middle" className="font-mono">SSD M.2</text>
              </g>

              <path d="M 47,115 L 47,100 L 65,100" stroke={selected.psu ? "#10b981" : "#1e293b"} strokeWidth={selected.psu ? "1.2" : "0.5"} fill="none" strokeDasharray={selected.psu ? "4 4" : "none"} className="transition-all duration-300" />
              <path d="M 70,115 L 70,61" stroke={selected.psu ? "#10b981" : "#1e293b"} strokeWidth={selected.psu ? "1" : "0.5"} fill="none" />
              <path d="M 101,43 L 110,43" stroke="#38bdf8" strokeWidth="1" fill="none" />
            </svg>
            
            <div className="absolute bottom-2 left-3 font-mono text-[8px] text-slate-500 font-bold uppercase tracking-wider">
              {categories.find(c => c.key === 'gpu')?.options.find(o => o.id === selected.gpu)?.price === 0 ? "⚡ INTEGRATED GRAPHICS ACTIVE" : "🔥 DEDICATED GPU PROTOCOL ON"}
            </div>
          </div>
        </div>

        {/* Dynamic Cost Board */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-850 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative flex flex-col gap-5">
            <h4 className="text-sm font-black tracking-widest text-[#FBBF24] uppercase">Configured PC Cost</h4>
            
            <div className="pb-4 border-b border-slate-800">
              <span className="text-xs block text-slate-400 font-semibold mb-1">Total Pricing (Estimated PKR)</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight block">
                Rs {configStats.price.toLocaleString()}
              </span>
              <span className="text-[11px] block text-slate-500 font-medium mt-1">Including professional dust-cleaning and master testing benchmark!</span>
            </div>

            {/* Performance Analytics metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>General Workload Rating</span>
                  <span>{configStats.score}/100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all" style={{ width: `${configStats.score}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Estimated Pure Power Draw</span>
                  <span>{configStats.wattage} Watts</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all" style={{ width: `${Math.min((configStats.wattage / 400) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* --- GAMING BENCHMARK CENTER --- */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850/80 space-y-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Gamepad2 className="w-4.5 h-4.5 text-sky-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gaming Benchmark Center</span>
              </div>

              {/* Game Tabs */}
              <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-900 rounded-lg text-[9px] font-black text-center text-slate-400 select-none uppercase">
                <button
                  type="button"
                  onClick={() => setSelectedGame('gta')}
                  className={`py-1.5 rounded cursor-pointer transition ${selectedGame === 'gta' ? 'bg-sky-500 text-white' : 'hover:bg-slate-800'}`}
                >
                  GTA V
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGame('pubg')}
                  className={`py-1.5 rounded cursor-pointer transition ${selectedGame === 'pubg' ? 'bg-sky-500 text-white' : 'hover:bg-slate-800'}`}
                >
                  PUBG
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGame('valorant')}
                  className={`py-1.5 rounded cursor-pointer transition ${selectedGame === 'valorant' ? 'bg-sky-500 text-white' : 'hover:bg-slate-800'}`}
                >
                  VALO
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGame('cs2')}
                  className={`py-1.5 rounded cursor-pointer transition ${selectedGame === 'cs2' ? 'bg-sky-500 text-white' : 'hover:bg-slate-800'}`}
                >
                  CS2
                </button>
              </div>

              {/* Dynamic Game results panel */}
              <div className="space-y-2 mt-1 font-semibold">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase truncate">{gameStats.name}</span>
                  <span className="text-xs font-black text-sky-400 font-mono">{gameStats.fps} FPS</span>
                </div>

                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all rounded-full" style={{ width: `${Math.min((gameStats.fps / 220) * 100, 100)}%` }} />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 uppercase text-[8px] font-black text-slate-500">
                  <div>
                    <span className="block">Recommended Quality</span>
                    <span className="text-white block font-mono text-[9px] mt-0.5">{gameStats.settings}</span>
                  </div>
                  <div>
                    <span className="block text-right">Thermal range</span>
                    <span className="text-amber-400 text-right block font-mono text-[9px] mt-0.5">{gameStats.thermals}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PSU Safety Recommendation Info */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 flex items-start gap-2.5">
              <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[11px] font-black uppercase text-amber-400 tracking-wide">PSU Safety Cushion Rating</h5>
                <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                  We highly recommend utilizing a power supply rated at minimum <strong>{configStats.recommendedPsu}W</strong> to guard against peak system spikes securely.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 mt-2">
              <button
                onClick={handleSendToCEO}
                className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 font-bold py-3.5 rounded-xl text-white text-xs uppercase hover:from-emerald-600 hover:to-emerald-700 transition shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span>Send Build to CEO</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 bg-slate-800 hover:bg-slate-705 text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
                title="Reset Builder Selection"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live compatibility indicator and note */}
        <div className="p-4 rounded-xl border border-slate-850 bg-slate-950/40 text-xs flex items-start gap-3">
          <ShoppingCart className="w-5 h-5 text-sky-400 shrink-0 " />
          <p className="text-slate-400 leading-relaxed font-semibold">
            <strong>Certified Compatibility Pledge:</strong> Our master technical team in Al-Zamin Plaza, Kotli inspects each CPU socket, RAM pin matching, dynamic PCI compatibility, and casing cooler clearances manually prior to build handoff.
          </p>
        </div>

      </div>

    </div>
  );
}
