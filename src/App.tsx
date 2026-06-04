/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Laptop, 
  Wrench, 
  BatteryCharging, 
  Keyboard, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Check, 
  Menu, 
  X, 
  ArrowUp, 
  ExternalLink,
  ThumbsUp, 
  MessageSquare,
  HelpCircle,
  TrendingUp,
  Upload,
  Camera,
  Printer,
  Database,
  Globe,
  Zap,
  Tag,
  ChevronDown,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MMLogo from './components/MMLogo';
import BusinessCards from './components/BusinessCards';
import RepairTracker from './components/RepairTracker';
import ComputerBuilder from './components/ComputerBuilder';
import InteractiveTroubleshooter from './components/InteractiveTroubleshooter';
import LaptopComparer from './components/LaptopComparer';

// Laptop Data Type Definition
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
  price: number; // in PKR
  image: string;
  condition: string;
  category: 'New' | 'Used' | 'Gaming';
  isPopular?: boolean;
}

// Comprehensive supported translation languages
const ALL_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'pa', name: 'Punjabi', native: 'پنجابی' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'ps', name: 'Pashto', native: 'پښتو' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'zh-CN', name: 'Chinese', native: '中文' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
];

// Accent palette states definition
type ColorAccent = 'cyan' | 'gold' | 'emerald' | 'ruby';

export default function App() {
  // Glow Accent State & Theme Colors Mapping
  const [accent, setAccent] = useState<ColorAccent>('cyan');

  const glowStyle = useMemo(() => {
    const palette: Record<ColorAccent, {
      gradient: string;
      text: string;
      border: string;
      bgLight: string;
      glow: string;
      raw: string;
    }> = {
      cyan: {
        gradient: "from-sky-400 via-sky-500 to-sky-600",
        text: "text-sky-400",
        border: "border-sky-500/20 dark:border-sky-500/25",
        bgLight: "bg-sky-500/10",
        glow: "shadow-sky-500/20",
        raw: "#0ea5e9"
      },
      gold: {
        gradient: "from-amber-400 via-amber-500 to-amber-600",
        text: "text-amber-400",
        border: "border-amber-500/20 dark:border-amber-500/25",
        bgLight: "bg-amber-500/15",
        glow: "shadow-amber-500/25",
        raw: "#f59e0b"
      },
      emerald: {
        gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
        text: "text-emerald-400",
        border: "border-emerald-500/20 dark:border-emerald-500/25",
        bgLight: "bg-emerald-500/10",
        glow: "shadow-emerald-500/20",
        raw: "#10b981"
      },
      ruby: {
        gradient: "from-rose-400 via-rose-500 to-rose-600",
        text: "text-rose-400",
        border: "border-rose-500/20 dark:border-rose-500/25",
        bgLight: "bg-rose-500/10",
        glow: "shadow-rose-500/20",
        raw: "#f43f5e"
      }
    };
    return palette[accent];
  }, [accent]);

  // English Dedicated Sourced Translations Matrix
  const texts = useMemo(() => {
    return {
      tagline: "Mega Master Laptop & Computer",
      yearsTrusted: "12 Years Certified Trust in Kotli, Azad Kashmir",
      heroTitle1: "Pristine Laptop Repairs",
      heroTitle2: "& Sourced Certified Sales",
      heroSub: "MM Computer is Kotli's elite tech solutions center. Fast diagnosis, OEM screen arrays, genuine warranties, and high-performance certified notebooks built to survive years.",
      repairBtn: "Repair Now (Diagnostic Fault Hub)",
      laptopStockBtn: "Showroom Catalog Grid",
      compleatedTitle: "Lab completed Repair Queues Today",
      stockTitle: "Premium Stock Sourced Models",
      availNow: "Active Models Available Now",
      exploreWorkspace: "Explore Multi-functional Interactive workspace Boards",
      showroomTab: "💻 Sourced Laptop Showroom",
      repairTab: "🔧 Laboratory Fault-Finder & Tracker",
      builderTab: "🛠️ Workstation Custom PC Builder",
      credentialsTab: "📞 Trust Credentials & Contact",
      promoAlert: "🔥 Apply Promo Code 'MMSTU20' on Whatsapp for special 10% student/corp repair concession!",
      searchPlaceholder: "Search specifications, CPU cores, or brands (e.g. i5, RTX, M1, Thinkpad)...",
      allCategories: "🔥 Sourced Stock",
      gamingCat: "🎮 Extreme GPU Gaming",
      newCat: "✨ Brand New Packs",
      usedCat: "📦 Corporate Return Used",
      comparerTitle: "Visual Specs Side-by-Side Comparer Panel",
      pcBuilderTitle: "Interactive Budget & Workload Assembler",
      troubleshooterTitle: "Interactive Diagnostic Assistant Expert System",
      trackerTitle: "Diagnostic Queue Stage Ticket Tracker",
      addressLabel: "Physical Plaza Address",
      emailLabel: "Corporate Support Inbox",
      faqSectionTitle: "Expert Technical FAQ Library",
      locatorTitle: "Interactive Address Map Pin",
    };
  }, []);

  // Main Interactive Navigation Tabs System
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'showroom' | 'repair' | 'builder' | 'credentials'>('showroom');

  // Search state for laptops grid
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  // Selling laptop state variables
  const [sellForm, setSellForm] = useState({
    name: '',
    phone: '',
    model: '',
    condition: 'Used (9.8/10 Like New)',
    notes: '',
  });
  const [deviceImagePreview, setDeviceImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sellSubmitted, setSellSubmitted] = useState(false);

  // Business Phone Configurations
  const WHATSAPP_RAW = '923430407210';

  // Searchable Translator States
  const [selectedLang, setSelectedLang] = useState('en');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [langSearchQuery, setLangSearchQuery] = useState('');

  // Handle click outside to close language dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownOpen && !(e.target as HTMLElement).closest('.translation-searchable-wrapper')) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [langDropdownOpen]);

  // Sync state with Google Translate
  useEffect(() => {
    const interval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo && combo.value) {
        setSelectedLang(combo.value);
        clearInterval(interval);
      } else {
        const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
        if (match && match[1]) {
          setSelectedLang(match[1]);
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load Google Translate Widget dynamically for all users to translate to any language
  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'en',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTopVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Searchable Translator Memoized Values and Handlers
  const activeLangObj = useMemo(() => {
    return ALL_LANGUAGES.find(l => l.code === selectedLang) || { code: 'en', name: 'English', native: 'English' };
  }, [selectedLang]);

  const filteredLanguages = useMemo(() => {
    if (!langSearchQuery) return ALL_LANGUAGES;
    const q = langSearchQuery.toLowerCase().trim();
    return ALL_LANGUAGES.filter(l => 
      l.name.toLowerCase().includes(q) || 
      l.native.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  }, [langSearchQuery]);

  const handleLanguageSelect = (code: string) => {
    setSelectedLang(code);
    setLangDropdownOpen(false);
    setLangSearchQuery('');
    
    const googleCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (googleCombo) {
      googleCombo.value = code;
      googleCombo.dispatchEvent(new Event('change'));
    } else {
      document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${code}; path=/`;
    }
  };

  // Sourced Laptops Database (Total 12 Certified units)
  const laptops: LaptopItem[] = [
    {
      id: "hp-victus-15",
      name: "HP Victus 15 GameEngine",
      specs: {
        cpu: "Intel Core i5-12450H",
        ram: "16GB DDR4 Dual-Channel",
        storage: "512GB PCIe Gen4 SSD",
        gpu: "NVIDIA RTX 3050 4GB DDR6",
        screen: "15.6\" FHD IPS 144Hz Slim-Bezel"
      },
      price: 185000,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
      condition: "Brand New Box Packed",
      category: "Gaming",
      isPopular: true
    },
    {
      id: "lenovo-thinkpad-x1",
      name: "Lenovo ThinkPad X1 Carbon Gen 8",
      specs: {
        cpu: "Intel Core i7-10610U vPro",
        ram: "16GB LPDDR3 Ultra-Fast",
        storage: "512GB NVMe M.2 High-Speed SSD",
        gpu: "Intel UHD Graphics 620",
        screen: "14.0\" FHD IPS Anti-Glare Touch screen"
      },
      price: 85000,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
      condition: "Used (9.5/10 condition)",
      category: "Used",
      isPopular: true
    },
    {
      id: "dell-latitude-7490",
      name: "Dell Latitude 7490 Robust",
      specs: {
        cpu: "Intel Core i5-8350U Quad-Core",
        ram: "8GB DDR4 (Customizable to 16GB)",
        storage: "256GB Solid State Drive (SATA/NVMe)",
        gpu: "Intel Integrated HD Graphics",
        screen: "14.0\" FHD IPS Anti-Reflective display"
      },
      price: 42000,
      image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=600&q=80",
      condition: "Used (9/10 Grade-A)",
      category: "Used"
    },
    {
      id: "apple-macbook-air-m1",
      name: "Apple MacBook Air M1 Space Gray",
      specs: {
        cpu: "Apple M1 Silicon Chip (8-Core)",
        ram: "8GB Unified Memory Architecture",
        storage: "256GB Superfast SSD Storage",
        gpu: "7-Core Apple GPU Co-processor",
        screen: "13.3\" Retina Display with True Tone"
      },
      price: 165000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      condition: "Used (Mint 10/10 Condition)",
      category: "Used",
      isPopular: true
    },
    {
      id: "asus-rog-strix-g15",
      name: "ASUS ROG Strix G15 RGB Pro",
      specs: {
        cpu: "AMD Ryzen 7 5800H Octa-Core",
        ram: "16GB DDR4 3200MHz RAM",
        storage: "1TB HyperDrive PCIe Gen3 SSD",
        gpu: "NVIDIA GeForce RTX 3060 6GB GDDR6",
        screen: "15.6\" FHD IPS 300Hz 3ms eSports Display"
      },
      price: 245000,
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      condition: "Used (9.8/10 Collector Grade)",
      category: "Gaming"
    },
    {
      id: "hp-elitebook-840-g8",
      name: "HP EliteBook 840 G8 Alumash",
      specs: {
        cpu: "Intel Core i5-1145G7 Turbo",
        ram: "16GB DDR4 3200MHz System RAM",
        storage: "256GB Solid State NVMe Drive",
        gpu: "Intel Iris Xe Premium Graphics",
        screen: "14.0\" Full HD IPS anti-glare screen"
      },
      price: 92000,
      image: "https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=600&q=80",
      condition: "Used (9.5/10 Executive Sourced)",
      category: "Used"
    },
    {
      id: "lenovo-ideapad-slim-3",
      name: "Lenovo IdeaPad Slim 3 15IAU7",
      specs: {
        cpu: "Intel Core i3-1215U Advanced",
        ram: "8GB DDR4 High Speed memory",
        storage: "512GB NVMe Gen4 SSD Array",
        gpu: "Intel Ultra-HD Integrated GPU",
        screen: "15.6\" FHD IPS 300nits Anti-Glare"
      },
      price: 98000,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
      condition: "Brand New Box Packed",
      category: "New"
    },
    {
      id: "dell-inspiron-15-3520",
      name: "Dell Inspiron 15 Carbon Sleek",
      specs: {
        cpu: "Intel Core i5-1235U 10-Cores",
        ram: "8GB DDR4 Expandable Memory",
        storage: "512GB Fast NVMe M.2 Storage SSD",
        gpu: "Intel UHD Iris Xe Graphics",
        screen: "15.6\" Full HD IPS 120Hz Fluid Panel"
      },
      price: 135000,
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
      condition: "Brand New International Box",
      category: "New",
      isPopular: true
    },
    {
      id: "acer-nitro-v-15",
      name: "Acer Nitro V 15 Ultimate",
      specs: {
        cpu: "Intel Core i5-13420H 13th Gen",
        ram: "16GB DDR5 High-Bandwidth RAM",
        storage: "512GB PCIe Gen4 M.2 SSD",
        gpu: "NVIDIA GeForce RTX 4050 6GB GDDR6",
        screen: "15.6\" FHD 144Hz IPS Matte Display"
      },
      price: 225000,
      image: "https://images.unsplash.com/photo-1629131726617-431975e17154?auto=format&fit=crop&w=600&q=80",
      condition: "Brand New Sealed Box",
      category: "Gaming"
    },
    {
      id: "hp-probook-440-g9",
      name: "HP ProBook 440 G9 Enterprise",
      specs: {
        cpu: "Intel Core i7-1255U Ten-Cores",
        ram: "16GB DDR4 High-Speed RAM",
        storage: "512GB NVMe SSD Drive",
        gpu: "Intel Iris Xe Graphic Accelerators",
        screen: "14.0\" FHD Narrow-Margin IPS Tech"
      },
      price: 175000,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
      condition: "Brand New Box Packed",
      category: "New"
    },
    {
      id: "dell-g15-5530-rtx",
      name: "Dell G15 5530 Heavy Duty",
      specs: {
        cpu: "Intel Core i7-13650HX 14-Cores",
        ram: "16GB Dual-Channel DDR5 4800MHz",
        storage: "512GB Gen4 High Velocity SSD",
        gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
        screen: "15.6\" FHD Active-Matrix 165Hz G-Sync"
      },
      price: 285000,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
      condition: "Brand New Retail Version",
      category: "Gaming",
      isPopular: true
    },
    {
      id: "lenovo-thinkpad-l14-g2",
      name: "Lenovo ThinkPad L14 Gen 2 AMD",
      specs: {
        cpu: "AMD Ryzen 5 Pro 5650U Hexa-Core",
        ram: "16GB DDR4 Robust Memory",
        storage: "512GB NVMe Gen3 PCIe SSD",
         gpu: "AMD Radeon RX Vega 7 Graphics",
        screen: "14.0\" Full HD IPS Anti-Glare"
      },
      price: 78000,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80",
      condition: "Used (9.2/10 Elite Business Asset)",
      category: "Used"
    }
  ];

  // Services Catalog Reference Dataset
  const services = [
    {
      title: "Display Panels Replacing",
      costRange: "Starting Rs 2,500",
      desc: "Full HD, IPS sRGB and anti-glare screen panels replaced professionally while you check.",
      icon: Monitor,
    },
    {
      title: "OEM Sourced Batteries",
      costRange: "Starting Rs 2,500",
      desc: "Genuine high-health long duration laptop batteries with store testing warranties.",
      icon: BatteryCharging,
    },
    {
      title: "Premium Keyboard Slabs",
      costRange: "Starting Rs 2,000",
      desc: "Key mechanics or full hardware panel replacements under professional dust extraction.",
      icon: Keyboard,
    },
    {
      title: "RAM & Gen-4 NVMe SSDs",
      costRange: "Starting Rs 1,500",
      desc: "Massive fast dual-channel RAM modules and super high velocity SSD storage array swaps.",
      icon: Database,
    }
  ];

  // Helper WhatsApp Launch
  const openWhatsApp = (msg: string) => {
    const link = `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(msg)}`;
    window.open(link, '_blank');
  };

  const scrollTo = (id: string) => {
     const element = document.getElementById(id);
     if (element) {
       element.scrollIntoView({ behavior: 'smooth' });
     }
  };

  // Live filter computation
  const filteredLaptops = useMemo(() => {
    return laptops.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.cpu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.specs.gpu && item.specs.gpu.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Form Selling Handlers
  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellForm.name || !sellForm.phone || !sellForm.model) {
      alert("Name, phone, and device details are strictly required!");
      return;
    }
    const picAlert = deviceImagePreview ? "📸 Attaching loaded photo of hardware model directly to this workspace chat." : "Not attached.";
    const compileMsg = `Assalam-o-Alaikum MM Computer Kotli!
My Name is: ${sellForm.name}
Phone/Whatsapp: ${sellForm.phone}
Selling/Trade Target: ${sellForm.model}
Current Physical Condition: ${sellForm.condition}
Notes: ${sellForm.notes || "None provided"}
${picAlert}`;

    openWhatsApp(compileMsg);
    setSellSubmitted(true);
    setTimeout(() => {
      setSellSubmitted(false);
    }, 4500);
  };

  return (
    <div id="appContainer" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden relative transition-colors duration-300">
      
      {/* 20x Dynamic Floating background particles & ambient gradient mesh */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-radial-gradient from-sky-500/10 via-transparent to-transparent pointer-events-none" />
      <div className={`absolute top-[400px] right-0 w-[450px] h-[450px] ${glowStyle.bgLight} rounded-full blur-[160px] pointer-events-none transition-all duration-500`} />
      <div className="absolute bottom-[600px] left-[-100px] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber ambient top bar alerts (20x Professional) */}
      <div className="w-full bg-[#080d1a] border-b border-slate-900 px-4 py-2 text-center text-[11px] font-black tracking-widest text-[#FBBF24] uppercase flex justify-between items-center gap-3 relative z-[51]">
         <div className="hidden sm:flex items-center gap-1">
           <Zap className="w-3.5 h-3.5 animate-pulse text-yellow-500" />
           <span>{texts.yearsTrusted}</span>
         </div>
         <span className="mx-auto sm:mx-0 truncate">{texts.promoAlert}</span>
         
         {/* Beautiful styled Google Translate container dropdown with search list on a single line */}
         <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg py-0.5 px-2 shrink-0 select-none relative translation-searchable-wrapper">
           <div id="google_translate_element" className="hidden pointer-events-none absolute w-0 h-0 overflow-hidden" aria-hidden="true" />
           <Globe className="w-3.5 h-3.5 text-sky-450 shrink-0 select-none" />
           <span className="text-[10px] font-black text-slate-300 hidden md:inline tracking-wider uppercase select-none">Translate / زبان:</span>
           
           {/* Compact single-line trigger */}
           <button
             type="button"
             onClick={() => setLangDropdownOpen(!langDropdownOpen)}
             className="flex items-center gap-1 px-1 focus:outline-none text-[10px] font-black tracking-wider uppercase text-amber-400 cursor-pointer select-none min-h-[22px]"
           >
             <span>{activeLangObj.name}</span>
             <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
           </button>

           {/* Floating popover with search box */}
           {langDropdownOpen && (
             <div className="absolute right-0 top-full mt-2 w-64 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2.5 z-[200] flex flex-col gap-2 normal-case font-sans">
               <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5">
                 <Search className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-2" />
                 <input 
                   type="text"
                   value={langSearchQuery}
                   onChange={(e) => setLangSearchQuery(e.target.value)}
                   placeholder="Search / زبان تلاش کریں..."
                   className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none p-0 font-medium"
                   autoFocus
                 />
                 {langSearchQuery && (
                   <button 
                     type="button"
                     onClick={() => setLangSearchQuery('')}
                     className="text-slate-500 hover:text-slate-300 p-0.5"
                   >
                     <X className="w-3 h-3" />
                   </button>
                 )}
               </div>

               <div className="max-h-52 overflow-y-auto custom-scrollbar flex flex-col gap-0.5 pr-1 text-slate-200">
                 {filteredLanguages.length > 0 ? (
                   filteredLanguages.map((langItem) => {
                     const isSelected = selectedLang === langItem.code;
                     return (
                       <button
                         key={langItem.code}
                         type="button"
                         onClick={() => handleLanguageSelect(langItem.code)}
                         className={`w-full flex items-center justify-between text-left px-2.5 py-2 rounded-lg text-xs transition duration-150 cursor-pointer ${
                           isSelected 
                             ? 'bg-sky-500/20 text-sky-400 font-bold border border-sky-500/10' 
                             : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                         }`}
                       >
                         <span className="font-bold">{langItem.name} <span className="text-[10px] text-slate-500 font-medium font-sans">({langItem.native})</span></span>
                         {isSelected && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                       </button>
                     );
                   })
                 ) : (
                   <div className="text-center py-4 text-xs text-slate-500 font-bold uppercase tracking-wider">
                     No match found
                   </div>
                 )}
               </div>
             </div>
           )}
         </div>
      </div>

      {/* 1. Header & Technical Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with interactive click reset */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <MMLogo size={52} glow={true} className="shrink-0 transition transform group-hover:rotate-6" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-sky-450 to-sky-400 bg-clip-text text-transparent uppercase flex items-center gap-1.5 leading-none">
                <span>MM Computer</span>
              </h1>
              <p className="text-[10px] tracking-wider uppercase font-black opacity-80 text-sky-400 mt-1">
                {texts.tagline}
              </p>
            </div>
          </div>

          {/* Color Shifter Controls: Customize the website glow profile dynamically! */}
          <div className="hidden lg:flex items-center gap-2.5 bg-slate-900/60 px-4 py-1.5 rounded-2xl border border-slate-900">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
               <Zap className={`w-3.5 h-3.5 ${glowStyle.text}`} />
               Accent Aura:
             </span>
             <div className="flex gap-1.5">
               {(['cyan', 'gold', 'emerald', 'ruby'] as ColorAccent[]).map((col) => (
                 <button
                   key={col}
                   type="button"
                   onClick={() => setAccent(col)}
                   className={`h-4.5 w-4.5 rounded-full transition-transform transform active:scale-90 relative ${
                     col === 'cyan' ? 'bg-sky-500' : col === 'gold' ? 'bg-amber-500' : col === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
                   } ${accent === col ? 'ring-2 ring-white scale-125' : 'hover:scale-110 opacity-70'} cursor-pointer`}
                   title={`Switch to ${col} system aura`}
                 />
               ))}
             </div>
          </div>

          {/* Quick Consultation CTA */}
          <div className="flex items-center gap-3.5">
            <button
               onClick={() => openWhatsApp("Assalam-o-Alaikum! Please connect me with Saqib Saheb regarding immediate technical computer enquiries.")}
               className={`hidden px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm text-slate-950 uppercase tracking-wider bg-gradient-to-r ${glowStyle.gradient} transform hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer shadow-lg`}
            >
              Consult CEO
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Interactive Board */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
           <div className="grid lg:grid-cols-12 gap-12 items-center">
             
             {/* Text Content block */}
             <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-900 border ${glowStyle.border} ${glowStyle.text}`}>
                  <ShieldCheck className="w-4.5 h-4.5" />
                  {texts.yearsTrusted}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
                  {texts.heroTitle1} <br />
                  <span className={`bg-gradient-to-r ${glowStyle.gradient} bg-clip-text text-transparent`}>
                    {texts.heroTitle2}
                  </span>
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  {texts.heroSub}
                </p>

                {/* Main Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                   <button 
                     onClick={() => {
                       setActiveWorkspaceTab('repair');
                       scrollTo('workspaceBoard');
                     }}
                     className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs sm:text-sm text-slate-950 uppercase tracking-wider bg-gradient-to-r ${glowStyle.gradient} shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 pointeractive:translate-y-0 cursor-pointer`}
                   >
                     {texts.repairBtn}
                   </button>
                   
                   <button 
                     onClick={() => {
                       setActiveWorkspaceTab('showroom');
                       scrollTo('workspaceBoard');
                     }}
                     className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs sm:text-sm text-slate-300 border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:text-white transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                   >
                     {texts.laptopStockBtn}
                   </button>
                </div>

                {/* 20x Performance Analytics Dashboard in Hero bottom */}
                <div className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-8 mt-6">
                   <div className="text-center lg:text-left">
                     <span className={`text-2xl sm:text-3xl font-black block leading-none ${glowStyle.text}`}>12+ Years</span>
                     <span className="text-[10px] text-slate-500 font-extrabold uppercase mt-2 block tracking-wider">Kotli Leadership</span>
                   </div>
                   <div className="text-center lg:text-left">
                     <span className={`text-2xl sm:text-3xl font-black block leading-none ${glowStyle.text}`}>100% Sourced</span>
                     <span className="text-[10px] text-slate-500 font-extrabold uppercase mt-2 block tracking-wider">OEM Parts Assurance</span>
                   </div>
                   <div className="text-center lg:text-left">
                     <span className={`text-2xl sm:text-3xl font-black block leading-none ${glowStyle.text}`}>30-Days</span>
                     <span className="text-[10px] text-slate-500 font-extrabold uppercase mt-2 block tracking-wider">Testing Warranty</span>
                   </div>
                </div>

             </div>

             {/* Interactive Visual Stats Center Widget */}
             <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md relative">
                  
                  {/* Neon Glow backdrop */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${glowStyle.gradient} rounded-3xl blur opacity-30 animate-pulse`} />
                  
                  <div className="relative p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col gap-6">
                     
                     <div className="flex justify-between items-center pb-3.5 border-b border-slate-900">
                        <span className="text-xs font-black uppercase text-yellow-400 flex items-center gap-1.5">
                           <TrendingUp className="w-4 h-4 animate-bounce" />
                           <span>Tech Center Load</span>
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black tracking-widest uppercase">
                           LIVE WORKSPACE
                        </span>
                     </div>

                     {/* Dynamic stats bars */}
                     <div className="space-y-4">
                        <div>
                           <div className="flex justify-between text-[11px] font-bold text-slate-450 mb-1">
                              <span>{texts.compleatedTitle}</span>
                              <span className="font-mono text-emerald-400 font-extrabold">12 Queue Orders Perfect</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                           </div>
                        </div>

                        <div>
                           <div className="flex justify-between text-[11px] font-bold text-slate-450 mb-1">
                              <span>{texts.stockTitle}</span>
                              <span className="font-mono text-sky-400 font-extrabold">12 Checked Units Active</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-sky-500 rounded-full" style={{ width: '82%' }}></div>
                           </div>
                        </div>
                     </div>

                     {/* Immediate CEO Whatsapp launcher */}
                     <div className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl text-slate-950 bg-emerald-500 shrink-0`}>
                           <Phone className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] text-emerald-400 font-black tracking-widest uppercase">Support Hotline</p>
                           <p className="text-sm font-extrabold text-white leading-tight">Muhammad Saqib Saheb</p>
                           <p className="text-xs text-slate-400 font-bold font-mono mt-0.5">0343-0407210 / 0345-6799101</p>
                        </div>
                     </div>

                     <button 
                       onClick={() => openWhatsApp("Hello MM Computer Kotli! I checked your live status panel. Please tell me if custom configurations are available.")}
                       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition font-black text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                     >
                       <MessageSquare className="w-4 h-4 shrink-0" />
                       <span>Open Instant WhatsApp chat</span>
                     </button>

                  </div>

                </div>
             </div>

           </div>
         </div>
      </section>

      {/* Dynamic interactive announcement banner */}
      <section className="bg-slate-900/40 border-t border-b border-slate-900/80 py-4 text-center">
         <span className="text-xs text-slate-400 font-semibold px-4 block">
            ⭐ <strong>Shop Diagnostic Pledge :</strong> Bring in any laptop for checking. MM Computer offers a <strong>100% Free Diagnostics Checkup</strong> with absolutely zero service or checking fee obligations!
         </span>
      </section>

      {/* 3. The 20x Interactive Workbench Command Center */}
      <section id="workspaceBoard" className="py-20 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Section Header */}
           <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className={`text-xs uppercase font-extrabold tracking-widest leading-none ${glowStyle.text}`}>
                MM Digital Command deck
              </span>
              <h3 className="text-2xl sm:text-3.5xl font-black text-white uppercase tracking-tight">
                {texts.exploreWorkspace}
              </h3>
              <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full" />
           </div>

           {/* Interactive Board Selector Tabs */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-5xl mx-auto">
             {[
               { id: 'showroom', label: texts.showroomTab },
               { id: 'repair', label: texts.repairTab },
               { id: 'builder', label: texts.builderTab },
               { id: 'credentials', label: texts.credentialsTab }
             ].map((board) => {
               const isActive = activeWorkspaceTab === board.id;
               return (
                 <button
                   key={board.id}
                   type="button"
                   onClick={() => setActiveWorkspaceTab(board.id as any)}
                   className={`p-4 rounded-2xl border text-center font-black text-xs sm:text-sm transition-all transform active:scale-95 cursor-pointer flex flex-col justify-center items-center gap-2 ${
                     isActive
                       ? `bg-slate-900 border-sky-500 text-sky-400 ring-2 ring-sky-500/10`
                       : `bg-slate-900/40 border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-white`
                   }`}
                 >
                   <span>{board.label}</span>
                 </button>
               );
             })}
           </div>

           {/* Active Tab Screen render pipeline (20x Fast) */}
           <div className="w-full">
             
             {/* Showroom Tab component render */}
             {activeWorkspaceTab === 'showroom' && (
               <div className="space-y-12 animate-fade-in-up">
                  
                  {/* Laptop stock finder filters */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-850 flex-wrap">
                     <span className="text-xs uppercase font-extrabold text-white flex items-center gap-1.5">
                       <Check className="w-4 h-4 text-emerald-400" />
                       <span>{texts.availNow}</span>
                     </span>

                     <div className="flex flex-wrap gap-2">
                       {[
                         { label: texts.allCategories, value: 'all' },
                         { label: texts.gamingCat, value: 'gaming' },
                         { label: texts.newCat, value: 'new' },
                         { label: texts.usedCat, value: 'used' }
                       ].map((btn) => (
                         <button
                           key={btn.value}
                           type="button"
                           onClick={() => setActiveCategory(btn.value)}
                           className={`px-4 py-2 rounded-full text-xs font-black transition cursor-pointer ${
                             activeCategory === btn.value
                               ? 'bg-sky-500 text-slate-950 font-bold'
                               : 'bg-slate-950 text-slate-350 border border-slate-850 hover:text-white hover:border-slate-700'
                           }`}
                         >
                           {btn.label}
                         </button>
                       ))}
                     </div>

                     {/* Search bar inputs */}
                     <div className="w-full md:w-auto flex-grow md:flex-grow-0 relative">
                        <input
                           type="text"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           placeholder={texts.searchPlaceholder}
                           className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <Monitor className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                     </div>
                  </div>

                  {/* Laptops grid results view */}
                  {filteredLaptops.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl border border-slate-850 bg-slate-900/20 text-slate-400">
                      <p className="text-sm font-bold">No laptops match your target search query currently in active inventory.</p>
                      <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-xs text-sky-400 underline font-semibold">Reset Search Inputs</button>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredLaptops.map((laptop) => (
                        <div 
                          key={laptop.id}
                          className="flex flex-col justify-between p-5 rounded-2xl border border-slate-900 bg-slate-950 hover:border-sky-500/40 hover:shadow-2xl transition duration-300 relative group"
                        >
                           <div>
                             <div className="aspect-video overflow-hidden rounded-xl bg-slate-900 relative mb-4">
                                <img 
                                  src={laptop.image} 
                                  alt={laptop.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                                   <span className="text-[9px] font-black uppercase text-white bg-slate-950/80 px-2 py-1 rounded backdrop-blur-sm">
                                      {laptop.condition}
                                   </span>
                                   <span className="text-[9px] font-black uppercase text-slate-950 bg-amber-400 px-2 py-1 rounded">
                                      {laptop.category}
                                   </span>
                                </div>
                             </div>

                             <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-sky-400 transition-colors">
                                {laptop.name}
                             </h4>

                             {/* Dynamic specs layout lines */}
                             <ul className="space-y-1.5 py-4 my-4 border-t border-b border-slate-900 text-xs text-slate-400">
                               <li className="flex items-center gap-2">
                                 <Cpu className="w-3.5 h-3.5 text-sky-400" />
                                 <span className="truncate">{laptop.specs.cpu}</span>
                               </li>
                               <li className="flex items-center gap-2">
                                 <Database className="w-3.5 h-3.5 text-indigo-400" />
                                 <span className="truncate">{laptop.specs.ram} / {laptop.specs.storage}</span>
                               </li>
                               {laptop.specs.gpu && (
                                 <li className="flex items-center gap-2">
                                   <Zap className="w-3.5 h-3.5 text-orange-400" />
                                   <span className="truncate">{laptop.specs.gpu}</span>
                                 </li>
                               )}
                               <li className="flex items-center gap-2">
                                 <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                                 <span className="truncate">{laptop.specs.screen}</span>
                               </li>
                             </ul>
                           </div>

                           {/* Dynamic Price + Whatsapp enquiry */}
                           <div className="flex justify-between items-center pt-2">
                             <div>
                                <span className="text-[9px] text-slate-500 block uppercase font-bold">Standard Rate</span>
                                <span className="text-base font-black text-sky-400">Rs {laptop.price.toLocaleString()}</span>
                             </div>

                             <button
                               onClick={() => {
                                 const msg = `Hello Saqib Saheb! I am extremely interested in buying ${laptop.name} (Specs: Core CPU ${laptop.specs.cpu}, ${laptop.specs.ram}) from Kotli stock. Is this available for purchase or physical checkout?`;
                                 openWhatsApp(msg);
                               }}
                               className="px-3.5 py-2 hover:bg-emerald-600 bg-emerald-500 text-slate-950 font-black rounded-lg text-xs tracking-wider uppercase transition cursor-pointer"
                             >
                               Enquire
                             </button>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Embed the comparison panel inside the showroom */}
                  <div className="py-12 border-t border-slate-900">
                     <div className="max-w-4xl mx-auto mb-6">
                        <h4 className="text-sm font-black uppercase text-sky-400 tracking-widest text-center">
                          {texts.comparerTitle}
                        </h4>
                        <p className="text-xs text-slate-400 text-center mt-1">
                          Select and lock up to 3 individual catalog models side-by-side to find the ultimate price-for-value ratio!
                        </p>
                     </div>
                     <LaptopComparer laptopList={laptops} />
                  </div>

               </div>
             )}

             {/* Laboratory Tools Tab component render */}
             {activeWorkspaceTab === 'repair' && (
               <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
                  
                  {/* Left Side: Troubleshooting Assistant helper */}
                  <div className="lg:col-span-6 space-y-6">
                     <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                        <span className="text-xs font-black text-sky-400 uppercase tracking-widest block">
                           {texts.troubleshooterTitle}
                        </span>
                     </div>
                     <InteractiveTroubleshooter />
                  </div>

                  {/* Right Side: Step Status Tracker */}
                  <div className="lg:col-span-6 space-y-6">
                     <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                        <span className="text-xs font-black text-[#FBBF24] uppercase tracking-widest block">
                           {texts.trackerTitle}
                        </span>
                     </div>
                     <RepairTracker />
                  </div>

                  {/* Services & Typical Rates table overlay list */}
                  <div className="lg:col-span-12 p-6 sm:p-8 rounded-3xl border border-slate-900 bg-slate-950 shadow-xl mt-4">
                     <div className="max-w-xl mb-6">
                        <h4 className="text-sm font-black uppercase text-sky-400 tracking-widest">{texts.servicesNav}</h4>
                        <p className="text-xs text-slate-400 mt-1">All services carry extreme technical checkup checkmarks, keyboard cleaning & micro-welded connector tests under static protection.</p>
                     </div>

                     <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                       {services.map((ser, sIdx) => {
                         const IconObj = ser.icon;
                         return (
                            <div key={sIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex flex-col gap-3 justify-between">
                              <div className="flex justify-between items-start">
                                 <div className="p-2 rounded bg-sky-500/10 text-sky-400 shrink-0">
                                    <IconObj className="w-5 h-5" />
                                 </div>
                                 <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                                   {ser.costRange}
                                 </span>
                              </div>
                              <div>
                                 <h5 className="text-xs sm:text-sm font-extrabold text-white">{ser.title}</h5>
                                 <p className="text-[10px] text-slate-400 leading-relaxed mt-1.5">{ser.desc}</p>
                              </div>
                              <button 
                                onClick={() => {
                                  const msg = `Hello MM Computer Kotli! I require professional ${ser.title} diagnostics. Please coordinate typical price values and timing.`;
                                  openWhatsApp(msg);
                                }}
                                className="w-full py-2 bg-slate-800 hover:bg-slate-705 text-[10px] font-black uppercase text-slate-200 hover:text-white rounded transition mt-2 cursor-pointer"
                              >
                                Request Service
                              </button>
                            </div>
                         );
                       })}
                     </div>
                  </div>

               </div>
             )}

             {/* Desktop PC Custom Builder Workbench Tab */}
             {activeWorkspaceTab === 'builder' && (
               <div className="space-y-6 animate-fade-in-up">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-850 max-w-4xl mx-auto text-center">
                     <h4 className="text-sm font-black uppercase text-sky-400 tracking-widest">
                       {texts.pcBuilderTitle}
                     </h4>
                     <p className="text-xs text-slate-400 mt-1.5">
                       Configure your own extreme desktop workstation, processor architecture, dedicated graphics matrices, and SSD files speed. Live estimates calculate on the fly!
                     </p>
                  </div>

                  <ComputerBuilder />
               </div>
             )}

             {/* Trust Cards & Customer Contact Tab */}
             {activeWorkspaceTab === 'credentials' && (
               <div className="space-y-12 animate-fade-in-up">
                  
                  {/* Two columns: Interactive business cards + locator */}
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                     
                     <div className="lg:col-span-6 space-y-6">
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                           <span className="text-xs font-black text-sky-400 uppercase tracking-widest block text-center">
                             Platinum Wallet Business Cards (Click to Flip 3D)
                           </span>
                        </div>
                        <BusinessCards darkMode={true} openWhatsApp={openWhatsApp} />
                     </div>

                     {/* Right locator cards */}
                     <div className="lg:col-span-6 space-y-6 h-full flex flex-col justify-between">
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                           <span className="text-xs font-black text-[#FBBF24] uppercase tracking-widest block text-center">
                             Google Map Store Locator Kotli
                           </span>
                        </div>

                        {/* Embed Maps */}
                        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-900 shadow-xl relative min-h-[300px]">
                           <iframe 
                             title="MM Computer Kotli Location Map"
                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26665.3409197904!2d73.88206898492021!3d33.51651877684078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391fec0be5fbeb7d%3A0xc6cb512e2c056dcd!2sKotli!5e0!3m2!1sen!2spk!4v1717240000000!5m2!1sen!2spk" 
                             width="100%" 
                             height="100%" 
                             style={{ border: 0 }} 
                             allowFullScreen={true} 
                             loading="lazy"
                             referrerPolicy="no-referrer-when-downgrade"
                             className="filter dark:contrast-[.85] dark:invert-[.92] dark:hue-rotate-[180deg]"
                           ></iframe>
                        </div>

                        {/* Physical attributes labels */}
                        <div className="grid sm:grid-cols-2 gap-4">
                           <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                              <span className="text-[10px] text-slate-500 font-bold block uppercase">{texts.addressLabel}</span>
                              <p className="text-xs font-bold text-white mt-1 leading-snug">
                                MM Computer, Al-Zamin Plaza, Pindi Road, Kotli, AJK
                              </p>
                           </div>

                           <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                              <span className="text-[10px] text-slate-500 font-bold block uppercase">{texts.emailLabel}</span>
                              <p className="text-xs font-mono font-bold text-sky-400 mt-1">
                                contact@mmcomputer.pk
                              </p>
                           </div>
                        </div>

                     </div>

                  </div>

               </div>
             )}

           </div>

        </div>
      </section>

      {/* 4. Sell / Trade Your Device Portal Section (20x Features) */}
      <section id="sellDevicePortal" className="py-20 border-t border-slate-900/80 bg-slate-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
               
               {/* Left copy blocks */}
               <div className="lg:col-span-5 space-y-6">
                  <span className={`text-xs font-black uppercase text-sky-400 tracking-widest block leading-none`}>
                     Recycle & Liquidation Services
                  </span>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-white uppercase tracking-tight">
                     Want to Liquidity-Sell or Trade old computers?
                  </h3>
                  <div className="w-16 h-1 bg-sky-500" />
                  
                  <p className="text-sm text-slate-405 leading-relaxed font-semibold">
                     We actively acquire old, vintage, or discarded laptops, full workstation set-ups, LED screens, monitors, and parts. Simply describe specs below for safe appraisal value estimates directly from Saqib Saheb.
                  </p>

                  <ul className="space-y-2.5 text-xs font-bold text-slate-400">
                     <li className="flex items-center gap-2">
                        <span className="text-emerald-500">✔</span>
                        <span>Instant appraisal quote checks</span>
                     </li>
                     <li className="flex items-center gap-2">
                        <span className="text-emerald-500">✔</span>
                        <span>Same-day payment disbursed physically in Kotli plaza store</span>
                     </li>
                  </ul>
               </div>

               {/* Selling Form workspace with Drag & Drop components */}
               <div className="lg:col-span-7">
                  <div className="p-6 sm:p-8 rounded-3xl border border-slate-900 bg-slate-900/40 shadow-2xl relative">
                     <h4 className="text-sm font-black uppercase text-[#FBBF24] mb-6 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-amber-500" />
                        <span>Interactive Sourcing Appraisal Board</span>
                     </h4>

                     <form onSubmit={handleSellSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Full Name *</label>
                              <input 
                                 type="text" 
                                 required
                                 placeholder="e.g. Asim Malik"
                                 value={sellForm.name}
                                 onChange={(e) => setSellForm({...sellForm, name: e.target.value})}
                                 className="w-full p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
                              />
                           </div>

                           <div>
                              <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Whatsapp Contact *</label>
                              <input 
                                 type="tel" 
                                 required
                                 placeholder="e.g. +92 343"
                                 value={sellForm.phone}
                                 onChange={(e) => setSellForm({...sellForm, phone: e.target.value})}
                                 className="w-full p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
                              />
                           </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Hardware Model / RAM / Storage *</label>
                              <input 
                                 type="text" 
                                 required
                                 placeholder="e.g. Thinkpad T480 i5 8GB / 256GB"
                                 value={sellForm.model}
                                 onChange={(e) => setSellForm({...sellForm, model: e.target.value})}
                                 className="w-full p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
                              />
                           </div>

                           <div>
                              <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Estimated Body Condition *</label>
                              <select
                                 value={sellForm.condition}
                                 onChange={(e) => setSellForm({...sellForm, condition: e.target.value})}
                                 className="w-full p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs text-slate-350 focus:outline-none"
                              >
                                 <option value="Used (9.8/10 Like New)">Used (9.8/10 LIKE NEW - Barely minor scratches)</option>
                                 <option value="Used (8.5/10 Normal)">Used (8.5/10 Grade-A normal usage signs)</option>
                                 <option value="Hardware Damaged / Screens broken">Hardware Damaged / Defective cells / Needs repair</option>
                              </select>
                           </div>
                        </div>

                        <div>
                           <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Describe custom issues, missing box / accessories (Optional)</label>
                           <textarea 
                              rows={2}
                              placeholder="Describe charger conditions, keyboard status, etc..."
                              value={sellForm.notes}
                              onChange={(e) => setSellForm({...sellForm, notes: e.target.value})}
                              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
                           />
                        </div>

                        {/* File Upload drag space component */}
                        <div>
                          <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Upload Model Photo reference (Optional)</label>
                          <div 
                             onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                             onDragLeave={() => setIsDragOver(false)}
                             onDrop={(e) => {
                               e.preventDefault();
                               setIsDragOver(false);
                               const file = e.dataTransfer.files?.[0];
                               if (file && file.type.startsWith('image/')) {
                                   const reader = new FileReader();
                                   reader.onload = () => setDeviceImagePreview(reader.result as string);
                                   reader.readAsDataURL(file);
                               }
                             }}
                             className={`p-4 border border-dashed rounded-xl text-center transition ${
                               isDragOver ? 'bg-sky-500/10 border-sky-400' : 'bg-slate-950 border-slate-850 hover:border-slate-700'
                             }`}
                          >
                             {deviceImagePreview ? (
                               <div className="flex flex-col items-center gap-1.5">
                                 <img src={deviceImagePreview} alt="Device Sourced" className="w-16 h-16 object-cover rounded-lg border-2 border-sky-500 shadow-md" />
                                 <button type="button" onClick={() => setDeviceImagePreview(null)} className="text-[10px] text-red-400 cursor-pointer hover:underline font-bold">Remove photo</button>
                               </div>
                             ) : (
                               <label className="cursor-pointer block text-[11px] font-bold text-slate-400">
                                 <input 
                                   type="file" 
                                   accept="image/*" 
                                   className="hidden" 
                                   onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => setDeviceImagePreview(reader.result as string);
                                        reader.readAsDataURL(file);
                                      }
                                   }}
                                 />
                                 <span>📥 Click or Drop Device Screen Photo here to attach reference</span>
                               </label>
                             )}
                          </div>
                        </div>

                        <button 
                           type="submit"
                           className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 font-black text-slate-950 uppercase text-xs sm:text-sm rounded-xl tracking-wider hover:text-white transition cursor-pointer"
                        >
                           Send Listing details to CEO
                        </button>

                        {sellSubmitted && (
                           <p className="text-xs text-emerald-400 font-bold text-center animate-pulse">
                              ✔ Routing to MM official WhatsApp with pre-filled appraisal message sheet!
                           </p>
                        )}
                     </form>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. Frequently Asked Questions block Section */}
      <section className="py-20 border-t border-slate-900 bg-slate-950">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
               <span className="text-xs font-black uppercase text-sky-400 tracking-wider block mb-2">{texts.faqSectionTitle}</span>
               <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Got Questions? We Have Answers!</h3>
               <div className="w-12 h-1 bg-sky-500 mx-auto rounded-full mt-3" />
            </div>

            <div className="space-y-4">
               {[
                 {
                   q: "Will microelectronic board repairs require several working days?",
                   a: "Most standard chip level bios flash or charging IC repairs require 24 to 48 hours for complete lab stability stress checking. Common items are handled faster."
                 },
                 {
                   q: "Are diagnostic checking procedures totally free of cost?",
                   a: "Absolutely! We do not charge anything for opening up, checking, testing voltage parameters, or diagnosing any laptop error. You only pay for hardware replacements."
                 },
                 {
                   q: "What quality is the screen replacements fitted at the store?",
                   a: "Each display panel replacement is sourced directly from certified original equipment manufacturers (OEMs). We supply high dynamic sRGB sRGB panels, 144Hz options for gaming setups, or high resolution matte anti-glare screen modules with complete physical warrants."
                 }
               ].map((faq, fIdx) => (
                 <details key={fIdx} className="group p-5 bg-slate-900/60 border border-slate-850 rounded-2xl [&_summary::-webkit-details-marker]:hidden transition duration-300">
                    <summary className="flex justify-between items-center cursor-pointer font-extrabold text-xs sm:text-sm text-white focus:outline-none">
                       <span>{faq.q}</span>
                       <span className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-500 group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed pt-3 border-t border-slate-950">
                       {faq.a}
                    </p>
                 </details>
               ))}
            </div>

         </div>
      </section>

      {/* 6. High-Trust Footer section */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950 text-slate-450 text-xs text-center border-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 border-b border-slate-900/80">
               
               <div className="flex items-center gap-3">
                  <MMLogo size={46} glow={false} />
                  <div className="text-left">
                     <h4 className="text-base font-black text-white">MM Computer Kotli</h4>
                     <p className="text-[9px] text-sky-400 font-extrabold tracking-widest uppercase mt-0.5">{texts.tagline}</p>
                  </div>
               </div>

               <div className="flex gap-4 font-extrabold">
                  <button onClick={() => scrollTo('appContainer')} className="hover:text-white transition cursor-pointer">Back to top</button>
                  <span>•</span>
                  <button onClick={() => { setActiveWorkspaceTab('repair'); scrollTo('workspaceBoard'); }} className="hover:text-white transition cursor-pointer">Repair Lab Diagnostics</button>
                  <span>•</span>
                  <button onClick={() => { setActiveWorkspaceTab('showroom'); scrollTo('workspaceBoard'); }} className="hover:text-white transition cursor-pointer">Sourced Stock</button>
               </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-semibold">
               <p>© {new Date().getFullYear()} MM Computer, Al-Zamin Plaza, Pindi Road, Kotli, AJK. All rights reserved.</p>
               <p className="flex items-center gap-1 hover:text-white cursor-pointer" onClick={() => openWhatsApp("Hello!")}>
                  <span>Fast, Powerful, Beautiful Sourced Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
               </p>
            </div>

         </div>
      </footer>

      {/* Fixed bottom-right action widgets bubble (20x Fast + Beautiful floating tooltips!) */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-[100]">
         
         {/* Back to top scroll widget button */}
         <AnimatePresence>
            {scrollTopVisible && (
               <motion.button
                 initial={{ scale: 0.85, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.85, opacity: 0 }}
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white shadow-2xl transition-transform hover:-translate-y-1 transform active:translate-y-0 cursor-pointer"
                 title="Scroll to dynamic top header"
               >
                 <ArrowUp className="w-5 h-5" />
               </motion.button>
            )}
         </AnimatePresence>

         {/* Sourced Whatsapp bubble with live flash notice */}
         <button
           onClick={() => openWhatsApp("Hello MM Computer Kotli! I checked output on your virtual tech cockpit website and require support.")}
           className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-4 rounded-full shadow-2xl relative group flex items-center justify-center transition-transform hover:-translate-y-1 transform active:translate-y-0 cursor-pointer animate-fade-in"
           title="Start immediate customer help support channel"
         >
           <MessageSquare className="w-6 h-6 shrink-0 animate-pulse" />
           <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-ping" />
           <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
           
           <span className="absolute right-14 scale-0 group-hover:scale-100 bg-slate-950 border border-slate-800 text-white text-[11px] font-black tracking-wider uppercase py-1.5 px-3 rounded-lg whitespace-nowrap transition shadow-md">
              WhatsApp Support Online
           </span>
         </button>

      </div>

    </div>
  );
}
