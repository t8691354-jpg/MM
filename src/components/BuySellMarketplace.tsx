import React, { useState } from 'react';
import { 
  Building2, 
  Tag, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Trash2, 
  AlertCircle,
  Eye,
  Filter,
  SlidersHorizontal,
  ThumbsUp,
  Clock
} from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  specs: string;
  price: number;
  condition: string; // e.g. "9/10"
  seller: string;
  sellerContact: string;
  isApproved: boolean;
  image: string;
  category: 'laptop' | 'gpu' | 'ram' | 'storage';
  location: string;
}

export default function BuySellMarketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>([
    {
      id: 'm1',
      title: 'ThinkPad T480s Business Ultrabook',
      specs: 'Intel Core i5 8th Gen | 16GB DDR4 RAM | 256GB SSD | 14" FHD Screen',
      price: 52000,
      condition: '9.2/10 Clean',
      seller: 'Ali Hamza (Kotli Town)',
      sellerContact: '923430407210',
      isApproved: true,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=300',
      category: 'laptop',
      location: 'Kotli, Azad Kashmir'
    },
    {
      id: 'm2',
      title: 'HP Victus 16 Gaming Powerhouse',
      specs: 'AMD Ryzen 5 5600H | 16GB RAM | 512GB NVMe SSD | GTX 1650 4G Graphics',
      price: 135000,
      condition: '9.5/10 Like Brand New',
      seller: 'Dr. Shahzad (Chowk Bazar)',
      sellerContact: '923430407210',
      isApproved: true,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=300',
      category: 'laptop',
      location: 'Chowk Bazar, Kotli'
    },
    {
      id: 'm3',
      title: 'ZOTAC NVIDIA GTX 1060 6GB GPU',
      specs: '6GB GDDR5 Video Memory | Compact Dual Fan cooler | Sourced clean unit',
      price: 24500,
      condition: '8.5/10 Solid',
      seller: 'Zain Tariq (Sarsawa)',
      sellerContact: '923430407210',
      isApproved: true,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=300',
      category: 'gpu',
      location: 'Sarsawa, Kotli'
    },
    {
      id: 'm4',
      title: 'Lexar DDR4 8GB 3200MHz Laptop RAM',
      specs: 'Standard SO-DIMM low latency high capacity memory',
      price: 4800,
      condition: '10/10 Seald Pack',
      seller: 'MM Computer certified refurb',
      sellerContact: '923430407210',
      isApproved: true,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=300',
      category: 'ram',
      location: 'MM Store'
    }
  ]);

  // Filters State
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'laptop' | 'gpu' | 'ram' | 'storage'>('all');

  // Multi-Form listing builder states
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSpecs, setNewSpecs] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCondition, setNewCondition] = useState('9/10');
  const [newSeller, setNewSeller] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newCategory, setNewCategory] = useState<'laptop' | 'gpu' | 'ram' | 'storage'>('laptop');
  const [newLocation, setNewLocation] = useState('Kotli');

  // Mini simulation state
  const [approvalMessage, setApprovalMessage] = useState<string | null>(null);

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newSeller) return;

    const priceNum = parseFloat(newPrice) || 0;

    const submission: MarketplaceItem = {
      id: 'm_temp_' + Date.now(),
      title: newTitle,
      specs: newSpecs || "Standard physical configurations",
      price: priceNum,
      condition: newCondition,
      seller: newSeller,
      sellerContact: newContact || "923430407210",
      isApproved: false, // Must be approved by MM Team
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=300',
      category: newCategory,
      location: newLocation
    };

    setItems(prev => [submission, ...prev]);
    setShowForm(false);
    
    // Auto-Trigger simulated admin audit steps
    setApprovalMessage('🚨 Submission Saved! Admin Saqib is doing price validation checks. Your listing will publish to Kotli community in 10 seconds...');
    
    // Clear form fields
    setNewTitle('');
    setNewSpecs('');
    setNewPrice('');
    setNewSeller('');
    setNewContact('');

    // Fast-Forward Simulated Admin approval after 8s
    setTimeout(() => {
      setItems(prev => 
        prev.map(it => it.id === submission.id ? { ...it, isApproved: true } : it)
      );
      setApprovalMessage('✅ Congratulations! Admin Saqib verified your specs & market value. Listing is now LIVE on Al-Zamin Plaza marketplace!');
      setTimeout(() => setApprovalMessage(null), 5000);
    }, 8000);
  };

  const handleBuyWhatsapp = (item: MarketplaceItem) => {
    const rawMsg = `Salam Alaykum! I saw your listing on the MM Computer Kotli Marketplace:
- Device Model: ${item.title}
- System Specifications: ${item.specs}
- Listed Resale Price: Rs ${item.price.toLocaleString()}
- Posted by Seller: ${item.seller}
- Condition rating: ${item.condition}

I want to inspect or purchase this device part. Please coordinate slot!`;
    const encoded = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
  };

  const filteredItems = items.filter(it => {
    if (selectedFilter === 'all') return true;
    return it.category === selectedFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Marketplace Intro Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-850 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-1.5 flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] uppercase font-black tracking-widest text-[#FBBF24]">
            <Clock className="w-3.5 h-3.5" />
            <span>MM Peer-to-Peer Tech Exchange</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Kotli Live Buy/Sell Hub</h4>
          <p className="text-xs text-slate-450 max-w-xl">
            List your used laptops, graphics cards, or memory pins. Avoid broker cuts. MM Computer guarantees diagnostic verification on demand!
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 font-bold uppercase tracking-wider text-xs text-black rounded-xl cursor-pointer transition shadow-xl shadow-amber-500/10 flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-black" />
          <span>List Laptop for Sale</span>
        </button>
      </div>

      {simulationNotice(approvalMessage)}

      {/* RENDER LISTING FORM OVERLAY MODAL */}
      {showForm && (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-fade-in text-xs font-semibold">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-850">
            <h5 className="text-sm font-black uppercase text-[#FBBF24]">Publish Device Parameters</h5>
            <button
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-white uppercase text-[10px] font-bold"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmitListing} className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-400 uppercase text-[9px] tracking-wider block">Specific Device Title</label>
              <input
                type="text"
                placeholder="e.g. Dell Inspiron 15 (Super Clean)..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-slate-100 placeholder-slate-600 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 uppercase text-[9px] tracking-wider block">Price Expectations (PKR)</label>
              <input
                type="number"
                placeholder="e.g. 45000..."
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-slate-100 placeholder-slate-600 text-xs text-emerald-400 font-bold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 uppercase text-[9px] tracking-wider block">Full Specifications</label>
              <input
                type="text"
                placeholder="e.g. i5 10th Gen | 8GB RAM | 256GB SSD..."
                value={newSpecs}
                onChange={e => setNewSpecs(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-slate-100 placeholder-slate-600 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 uppercase text-[9px] tracking-wider block">Humble Condition (x/10)</label>
              <select
                value={newCondition}
                onChange={e => setNewCondition(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-slate-300 text-xs"
              >
                <option value="10/10 Seald Box">10/10 Sealed Box</option>
                <option value="9.5/10 Pristine">9.5/10 Pristine Condition</option>
                <option value="9/10 Minor Scratches">9/10 Minor Scratches</option>
                <option value="8/10 Rough Backside">8/10 Budget Rough Unit</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 uppercase text-[9px] tracking-wider block">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Usama Javed..."
                value={newSeller}
                onChange={e => setNewSeller(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-slate-100 placeholder-slate-600 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 uppercase text-[9px] tracking-wider block">Location in Kotli</label>
              <input
                type="text"
                placeholder="e.g. Kotli Hub / Sarsawa Road..."
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-slate-100 placeholder-slate-600 text-xs"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white uppercase text-[10px] font-black tracking-widest rounded-xl hover:shadow-xl transition cursor-pointer"
              >
                Publish Listing to Community
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTER CHIPS ROW */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none font-semibold">
        <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0 mr-1.5" />
        {[
          { code: 'all', name: 'All listings' },
          { code: 'laptop', name: '💻 Laptops' },
          { code: 'gpu', name: '🎮 Graphics Cards' },
          { code: 'ram', name: '⚡ RAM sticks' },
          { code: 'storage', name: '💾 SSD Hard Drives' }
        ].map(flt => (
          <button
            key={flt.code}
            onClick={() => setSelectedFilter(flt.code as any)}
            className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition ${
              selectedFilter === flt.code
                ? 'bg-sky-505/10 text-sky-400 border border-sky-500/30'
                : 'bg-slate-900/40 text-slate-400 border border-slate-850 hover:text-white'
            }`}
          >
            {flt.name}
          </button>
        ))}
      </div>

      {/* GRID ITEMS MATRIX */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`rounded-2xl border bg-slate-950/70 p-4 space-y-3.5 transition group hover:-translate-y-1 hover:shadow-xl ${
              item.isApproved ? 'border-slate-850 hover:border-slate-700' : 'border-amber-500/25 bg-amber-500/[0.01]'
            }`}
          >
            {/* Visual Frame */}
            <div className="w-full h-36 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-850">
              <img 
                src={item.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                alt="" 
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay badges */}
              <div className="absolute top-2 left-2 bg-slate-950/80 border border-slate-850 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase text-[#FBBF24]">
                {item.condition}
              </div>

              {!item.isApproved && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col justify-center items-center text-center p-3 gap-1.5">
                  <Clock className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-wide">Verification auditing</span>
                  <span className="text-[8px] text-slate-500">Checking specifications & resold value...</span>
                </div>
              )}
            </div>

            {/* Content particulars */}
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">{item.location}</span>
                {item.isApproved && (
                  <span className="inline-flex items-center gap-0.5 text-[8.5px] font-black uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-1.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" /> MM-Verified
                  </span>
                )}
              </div>
              <h5 className="text-sm font-black text-white group-hover:text-amber-400 transition truncate leading-snug">{item.title}</h5>
              <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 min-h-[30px] font-medium">{item.specs}</p>
            </div>

            {/* Price section and whatsapp purchase */}
            <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-xs font-semibold">
              <div>
                <span className="text-[8px] text-slate-500 uppercase tracking-widest block leading-none">Listed cost</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono mt-1 block">Rs {item.price.toLocaleString()}</span>
              </div>

              {item.isApproved && (
                <button
                  type="button"
                  onClick={() => handleBuyWhatsapp(item)}
                  className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black uppercase text-[9px] tracking-wide rounded-lg cursor-pointer transition inline-flex items-center gap-1 shrink-0"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-300" />
                  <span>Buy now</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

function simulationNotice(msg: string | null) {
  if (!msg) return null;
  const isOk = msg.startsWith('✅');
  return (
    <div className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs animate-fade-in ${
      isOk 
        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
        : 'bg-amber-500/5 border-amber-500/20 text-[#FBBF24]'
    }`}>
      {isOk ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />}
      <p className="leading-relaxed font-bold">{msg}</p>
    </div>
  );
}
