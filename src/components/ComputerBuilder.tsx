import React, { useState, useMemo } from 'react';
import { Cpu, HardDrive, Zap, MessageSquare, Plus, Check, RefreshCw, ShoppingCart } from 'lucide-react';

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

  const handleSelect = (categoryKey: string, optionId: string) => {
    setSelected((prev) => ({ ...prev, [categoryKey]: optionId }));
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

  // Handle WhatsApp quotation
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
      
      {/* Selector Side Panel (Category list) */}
      <div className="lg:col-span-8 space-y-6">
        {categories.map((cat) => {
          const activeOptionId = selected[cat.key];
          return (
            <div key={cat.key} className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-950/70 relative">
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
                          : 'bg-slate-900/60 border-slate-850 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                      } ${opt.price === 0 ? 'sm:col-span-5 md:col-span-2' : 'md:col-span-5'}`}
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
                        <span className="text-sm font-black text-sky-400">
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

      {/* Analytics & Budget sticky column */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 gap-6 flex flex-col">
        
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
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
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
          <p className="text-slate-400 leading-relaxed">
            <strong>Certified Compatibility Pledge:</strong> Our master technical team in Al-Zamin Plaza, Kotli inspects each CPU socket, RAM pin matching, dynamic PCI compatibility, and casing cooler clearances manually prior to build handoff.
          </p>
        </div>

      </div>

    </div>
  );
}
