import React, { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Search, 
  Info, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  Coins, 
  ArrowDownLeft, 
  ArrowUpRight 
} from 'lucide-react';

interface ComponentPriceIndex {
  id: string;
  name: string;
  category: string;
  currentPricePKR: number;
  priceChangePercent: number; // Negative means discounted
  trend: 'holding' | 'dipping' | 'inflated';
  lastUpdated: string;
  kotliStockStatus: 'In Lab Stock' | 'Pre-booking Ready' | 'Import Pending';
}

export default function PriceIntelligence() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [prices, setPrices] = useState<ComponentPriceIndex[]>([
    {
      id: 'p1',
      name: "Intel Core i5 12400F Processor Core",
      category: "Processor / CPU",
      currentPricePKR: 34500,
      priceChangePercent: -4.8,
      trend: 'dipping',
      lastUpdated: '12 Minutes Ago',
      kotliStockStatus: 'In Lab Stock'
    },
    {
      id: 'p2',
      name: "NVIDIA GeForce RTX 4560 Twin GPU",
      category: "Dedicated Graphics Card",
      currentPricePKR: 95500,
      priceChangePercent: 3.2,
      trend: 'inflated',
      lastUpdated: '3 Hours Ago',
      kotliStockStatus: 'Import Pending'
    },
    {
      id: 'p3',
      name: "Crucial DDR4 16GB Dual Channel 3200MHz RAM",
      category: "System RAM Memory",
      currentPricePKR: 9800,
      priceChangePercent: -7.5,
      trend: 'dipping',
      lastUpdated: 'Yesterday',
      kotliStockStatus: 'In Lab Stock'
    },
    {
      id: 'p4',
      name: "Samsung 980 Pro 512GB NVMe SSD Drive",
      category: "Storage / SSD",
      currentPricePKR: 11000,
      priceChangePercent: 0,
      trend: 'holding',
      lastUpdated: '2 Hours Ago',
      kotliStockStatus: 'Pre-booking Ready'
    },
    {
      id: 'p5',
      name: "Corsair CV550 550W Certified PSU",
      category: "Power Supply Unit",
      currentPricePKR: 7500,
      priceChangePercent: -2.1,
      trend: 'dipping',
      lastUpdated: 'Yesterday',
      kotliStockStatus: 'In Lab Stock'
    }
  ]);

  const filtered = prices.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-850 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-1 text-center md:text-left flex-grow">
          <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] font-black uppercase text-[#FBBF24]">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Priced Indexes Matrix Pakistan</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Live Price Intelligence Platform</h4>
          <p className="text-xs text-slate-450 max-w-xl">
            Live prices of major computer hardware segments monitored 24/7 across Rawalpindi and Custom Kotli markets. Buy at the optimal moment!
          </p>
        </div>

        {/* Global Stock indicator */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 flex items-center gap-3 shrink-0">
          <Coins className="w-5 h-5 text-emerald-400" />
          <div className="text-xs font-semibold">
            <span className="block text-[8px] text-slate-500 uppercase">AJK Dollar Index</span>
            <span className="text-white block font-black font-mono">1 USD = 278.4 PKR</span>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH INPUT AND METRICS TILES */}
      <div className="grid md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 relative flex items-center">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 w-4 h-4" />
          <input
            type="text"
            placeholder="Search price trends (e.g. SSD, GTX Graphics, Processor)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-850 p-3 rounded-xl text-xs pl-9 text-slate-200 placeholder-slate-600 outline-none font-medium"
          />
        </div>

        {/* Dynamic status chips summarizing database */}
        <div className="md:col-span-6 flex flex-wrap gap-2 justify-end text-xs font-semibold">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 inline-flex items-center gap-1.5 font-bold uppercase tracking-wide">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Optimal Deals Active</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 inline-flex items-center gap-1.5 font-bold uppercase tracking-wide">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
            <span>Syncing Hourly</span>
          </div>
        </div>
      </div>

      {/* PRICE TABLE LISTINGS CARD */}
      <div className="rounded-2xl border border-slate-850 bg-slate-950/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full p-1 text-left text-xs font-semibold border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-850 text-slate-500 uppercase tracking-wider text-[9px] font-black">
                <th className="p-4">Component Specs</th>
                <th className="p-4">Category</th>
                <th className="p-4">Estimated Rate (PKR)</th>
                <th className="p-4">Change Log</th>
                <th className="p-4">Trend Status</th>
                <th className="p-4">Al-Zamin Plaza Store Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 font-medium">
              {filtered.map(item => {
                const change = item.priceChangePercent;
                const isDown = change < 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-900/30 transition text-slate-305 text-xs font-bold">
                    <td className="p-4">
                      <div>
                        <span className="text-white block font-black truncate max-w-xs">{item.name}</span>
                        <span className="text-[9px] text-slate-500 block leading-none mt-1">Refreshed {item.lastUpdated}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400 uppercase tracking-widest text-[9px] font-black">{item.category}</td>
                    <td className="p-4 text-slate-200 text-sm font-black font-mono">Rs {item.currentPricePKR.toLocaleString()}</td>
                    <td className="p-4">
                      {change === 0 ? (
                        <span className="text-slate-500 uppercase text-[9px] font-black tracking-wider">Unchanged</span>
                      ) : (
                        <span className={`inline-flex items-center gap-0.5 text-[10px] font-black font-mono px-2 py-0.5 rounded ${
                          isDown ? 'bg-emerald-500/10 text-emerald-450' : 'bg-rose-500/10 text-rose-450'
                        }`}>
                          {isDown ? <ArrowDownLeft className="w-3 h-3 text-emerald-400 shrink-0" /> : <ArrowUpRight className="w-3 h-3 text-rose-400 shrink-0" />}
                          {isDown ? '' : '+'}{change}%
                        </span>
                      )}
                    </td>
                    <td className="p-4 uppercase text-[9.5px] font-bold">
                      {item.trend === 'dipping' && (
                        <span className="text-emerald-400 bg-emerald-550/10 px-2 py-1 rounded border border-emerald-500/15">🔥 Dip [Buy now!]</span>
                      )}
                      {item.trend === 'holding' && (
                        <span className="text-sky-400 bg-sky-550/10 px-2 py-1 rounded border border-sky-500/15">⏱️ Holding Flat</span>
                      )}
                      {item.trend === 'inflated' && (
                        <span className="text-amber-500 bg-amber-550/10 px-2 py-1 rounded border border-amber-500/15">⚠️ Peak [Wait]</span>
                      )}
                    </td>
                    <td className="p-4">
                      {item.kotliStockStatus === 'In Lab Stock' && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 py-1 px-2.5 rounded-full font-black uppercase">
                          <CheckCircle className="w-3 h-3 text-emerald-400 fill-none" /> Live Stock
                        </span>
                      )}
                      {item.kotliStockStatus === 'Pre-booking Ready' && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#FBBF24] bg-amber-500/10 py-1 px-2.5 rounded-full font-black uppercase">
                          <AlertCircle className="w-3 h-3 text-amber-400 fill-none" /> 24h Ready
                        </span>
                      )}
                      {item.kotliStockStatus === 'Import Pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900 py-1 px-2.5 rounded-full font-black uppercase">
                          <Info className="w-3 h-3 text-slate-500 fill-none" /> Import queue
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
