import React, { useState } from 'react';
import { Laptop, X, Plus, Scaling, HelpCircle, CheckCircle, Flame } from 'lucide-react';

interface LaptopItem {
  id: string;
  name: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu?: string;
    screen: string;
  };
  price: number;
  condition: string;
  category: string;
  image: string;
}

interface LaptopComparerProps {
  laptopList: LaptopItem[];
}

export default function LaptopComparer({ laptopList }: LaptopComparerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['hp-victus-15', 'lenovo-thinkpad-x1']);

  const handleAddLaptop = (id: string) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 3) {
      // replace last element
      setSelectedIds([...selectedIds.slice(0, 2), id]);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveLaptop = (id: string) => {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  // Convert selected ids to laptop objects
  const selectedLaptops = selectedIds
    .map((id) => laptopList.find((l) => l.id === id))
    .filter(Boolean) as LaptopItem[];

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Selector pills list */}
      <div className="p-4 rounded-xl border border-slate-850 bg-slate-900/40">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#FBBF24] block mb-3">
          Select Laptop Models to compare (Max 3)
        </span>
        
        <div className="flex flex-wrap gap-2">
          {laptopList.map((laptop) => {
            const isAdded = selectedIds.includes(laptop.id);
            return (
              <button
                key={laptop.id}
                type="button"
                onClick={() => isAdded ? handleRemoveLaptop(laptop.id) : handleAddLaptop(laptop.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isAdded
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {isAdded ? (
                  <>
                    <span>✓ {laptop.name.split(' ')[0]} {laptop.name.split(' ')[1] || ''}</span>
                    <X className="w-3 h-3 hover:text-red-300" />
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    <span>{laptop.name}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Comparison blocks */}
      {selectedLaptops.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/20">
          <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-400">No laptops selected for comparison yet.</p>
          <p className="text-xs text-slate-500 mt-1">Click any laptop pill above to line them up side-by-side!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedLaptops.map((laptop) => {
            return (
              <div 
                key={laptop.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col justify-between relative shadow-xl hover:-translate-y-1 transition duration-300"
              >
                {/* Remove button overlay */}
                <button
                  type="button"
                  onClick={() => handleRemoveLaptop(laptop.id)}
                  className="absolute top-4 right-4 p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-full transition cursor-pointer z-10"
                  title="Remove from compare"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div>
                  {/* Laptop Mini header details */}
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 mb-4 border border-slate-800">
                    <img 
                      src={laptop.image} 
                      alt={laptop.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <span className="text-[9px] font-black uppercase text-sky-400 tracking-wider">
                    {laptop.category} • {laptop.condition}
                  </span>
                  
                  <h4 className="text-base font-black text-white leading-tight mt-1 mb-4">
                    {laptop.name}
                  </h4>

                  {/* Comparisons Row parameters */}
                  <div className="space-y-3.5 text-xs">
                    
                    <div className="py-2.5 border-t border-b border-slate-900 flex justify-between items-start gap-2">
                       <span className="text-slate-500 font-bold">Processor (CPU)</span>
                       <span className="text-slate-300 text-right font-semibold">{laptop.specs.cpu}</span>
                    </div>

                    <div className="py-2.5 border-b border-slate-900 flex justify-between items-start gap-2">
                       <span className="text-slate-500 font-bold">Graphics (GPU)</span>
                       <span className={`text-right font-semibold ${laptop.specs.gpu ? 'text-rose-400 font-extrabold' : 'text-slate-400'}`}>
                         {laptop.specs.gpu || 'Integrated On-Board'}
                       </span>
                    </div>

                    <div className="py-2.5 border-b border-slate-900 flex justify-between items-start gap-2">
                       <span className="text-slate-500 font-bold">RAM Memory</span>
                       <span className="text-slate-300 text-right font-semibold">{laptop.specs.ram}</span>
                    </div>

                    <div className="py-2.5 border-b border-slate-900 flex justify-between items-start gap-2">
                       <span className="text-slate-500 font-bold">Primary Storage</span>
                       <span className="text-slate-300 text-right font-semibold">{laptop.specs.storage}</span>
                    </div>

                    <div className="py-2.5 border-b border-slate-900 flex justify-between items-start gap-2">
                       <span className="text-slate-500 font-bold">Display screen</span>
                       <span className="text-slate-300 text-right font-semibold">{laptop.specs.screen}</span>
                    </div>

                  </div>
                </div>

                {/* Pricing & buy CTA */}
                <div className="pt-6 mt-6 border-t border-slate-900 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Local Rate PKR</span>
                    <span className="text-base font-black text-emerald-400">Rs {laptop.price.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => {
                      const msg = `Hello MM Computer! I compared laptop specs on your comparison module and decided to enquire about ${laptop.name} priced at Rs ${laptop.price.toLocaleString()}. Please let me know if physical checking is ready!`;
                      const encoded = encodeURIComponent(msg);
                      window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-white font-black text-xs uppercase tracking-wider rounded-lg transition"
                  >
                    Discuss
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
