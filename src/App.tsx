/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MMLogo from './components/MMLogo';
import BusinessCards from './components/BusinessCards';

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
  condition: string; // e.g., "Brand New", "Used (9.5/10)"
  category: 'New' | 'Used' | 'Gaming';
  isPopular?: boolean;
}

export default function App() {
  // Theme & UI States
  // Set permanently to Dark Mode as requested
  const [darkMode] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeRepairType, setActiveRepairType] = useState<string>('Screen Repair');

  // Form State for Selling Laptop
  const [sellForm, setSellForm] = useState({
    name: '',
    phone: '',
    model: '',
    condition: 'Used (9.8/10 Like New)',
    problem: '',
  });

  const [deviceImage, setDeviceImage] = useState<File | null>(null);
  const [deviceImagePreview, setDeviceImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Business Phone & WhatsApp Configuration
  const WHATSAPP_NUMBER = '+923430407210';
  const WHATSAPP_RAW = '923430407210';

  // Apply Dark Mode Class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Monitor Scroll for Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Schema Markup Injection
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "MM Computer",
      "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
      "@id": "",
      "url": window.location.href,
      "telephone": "+923430407210",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Bazar, Near Chowk",
        "addressLocality": "Kotli",
        "addressRegion": "Azad Kashmir",
        "postalCode": "11100",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.5165,
        "longitude": 73.8821
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": []
    };

    const scriptId = 'mm-computer-seo-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schema);
  }, []);

  // 12 Realistic Laptops Dataset
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

  // Services Dataset
  const services = [
    {
      id: "service-screen",
      title: "Screen Repair & Replacement",
      icon: Monitor,
      price: "Starting from Rs 2,500",
      desc: "Full HD, IPS, Touch, and normal high-quality screen panels replaced within hours for HP, Dell, Lenovo, and Apple.",
      whatsappMsg: "Hello MM Computer! I need a Screen Repair/Replacement for my laptop. Please share the pricing details."
    },
    {
      id: "service-battery",
      title: "Battery Replacement",
      icon: BatteryCharging,
      price: "Starting from Rs 2,500",
      desc: "Get 100% genuine backup batteries with proper warranties. Stop charging issues and laptop shutdowns instantly.",
      whatsappMsg: "Hello MM Computer! I need a Battery Replacement for my laptop. Please let me know what brands/warranties are available."
    },
    {
      id: "service-keyboard",
      title: "Keyboard Fix & Replacements",
      icon: Keyboard,
      price: "Starting from Rs 2,500",
      desc: "Non-responsive keys, broken layouts, or liquid spill damaged keyboards completely replaced with OEM key modules.",
      whatsappMsg: "Hello MM Computer! I need a Keyboard Fix/Replacement for my laptop. Please coordinate the timeframe & pricing."
    },
    {
      id: "service-upgrade",
      title: "RAM & SSD Fast Upgradations",
      icon: Database,
      price: "Starting from Rs 1,500",
      desc: "Dramatically boost your device performance with ultra-fast NVMe/M.2 SSDs and high-speed RAM dual-channel expansions.",
      whatsappMsg: "Hello MM Computer! I want to upgrade my laptop's RAM and SSD storage. Please let me know the pricing for high-performance modules."
    },
    {
      id: "service-formatting",
      title: "OS Windows Formatting & Cleaning",
      icon: Laptop,
      price: "Starting from Rs 1,000",
      desc: "Fresh, official Windows 10/11 operating system configurations. Fully optimized driver setups and malware/virus cleanings.",
      whatsappMsg: "Hello MM Computer! My computer is sluggish. I need a fresh Windows OS installation, driver configurations, and complete security health optimization."
    },
    {
      id: "service-printer",
      title: "Printer Repair & Toner Refilling",
      icon: Printer,
      price: "Starting from Rs 1,500",
      desc: "Instant laser printer hardware diagnostics, critical gear repair, drum replacement, and high-density premium black toner refills.",
      whatsappMsg: "Hello MM Computer! I have laser printer problems and require premium toner refilling or replacement parts."
    }
  ];

  // Helper: Open WhatsApp link
  const openWhatsApp = (customMessage: string) => {
    const encodedText = encodeURIComponent(customMessage);
    const link = `https://wa.me/${WHATSAPP_RAW}?text=${encodedText}`;
    window.open(link, '_blank');
  };

  // Click on Buy Laptop button -> scrolls to products
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Image Upload Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDeviceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDeviceImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setDeviceImage(null);
    setDeviceImagePreview(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setDeviceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDeviceImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Submission
  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellForm.name || !sellForm.phone || !sellForm.model) {
      alert("Please fill in your Name, Phone Number, and Device/Model.");
      return;
    }

    let imageMessage = "";
    if (deviceImagePreview) {
      imageMessage = `\n📸 Photo Uploaded: YES [I've selected the photo '${deviceImage?.name || "product_image.jpg"}' on the website and will attach it in this chat now!]`;
    } else {
      imageMessage = `\n📸 Photo Uploaded: NO (I will capture/attach in chat if needed)`;
    }

    const compiledMessage = `Hello MM Computer Kotli!
My name is: ${sellForm.name}
Phone: ${sellForm.phone}
Sell/Trade Item: ${sellForm.model}
Condition: ${sellForm.condition}
Reported Issue / Notes: ${sellForm.problem || 'No description provided'}${imageMessage}`;

    openWhatsApp(compiledMessage);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Filter Logic
  const filteredLaptops = tabToLaptops(activeTab);

  function tabToLaptops(tab: string) {
    if (tab === 'all') return laptops;
    return laptops.filter(laptop => laptop.category.toLowerCase() === tab.toLowerCase());
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans`}>
      
      {/* 1. Header & Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-slate-950/85 border-slate-800' : 'bg-white/85 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <MMLogo size={48} glow={darkMode} className="shrink-0" />
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-sky-400 to-sky-500 bg-clip-text text-transparent leading-none">
                MM Computer
              </h1>
              <p className="text-[9px] tracking-widest uppercase font-bold opacity-85 text-sky-500 dark:text-sky-400 mt-0.5">
                Mega Master Laptop & Computer
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Services', id: 'services' },
              { label: 'Shop Laptops', id: 'products' },
              { label: 'Sell Laptop & Quote', id: 'sell' },
              { label: 'About Us', id: 'about' },
              { label: 'Contact', id: 'contact' }
            ].map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg hover:bg-sky-500/10 hover:text-sky-400 transition-all duration-200 cursor-pointer`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Icons Bar: CTA */}
          <div className="flex items-center gap-3">

            {/* Quick Consultation Button (Desktop) */}
            <button 
              onClick={() => openWhatsApp("Hello MM Computer, I need immediate laptop consultation.")}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-5 py-2.5 rounded-xl font-bold font-semibold hover:shadow-lg hover:shadow-sky-500/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Free Consultation</span>
            </button>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-xl border cursor-pointer ${darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sidebar/Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Services & Rates', id: 'services' },
                  { label: 'Shop 12 Laptops', id: 'products' },
                  { label: 'Sell Your Laptop', id: 'sell' },
                  { label: 'About Experience', id: 'about' },
                  { label: 'Address & Contact', id: 'contact' }
                ].map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${darkMode ? 'hover:bg-slate-900 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                  >
                    {link.label}
                  </button>
                ))}
                
                {/* Mobile Direct Whatsapp Action */}
                <button 
                  onClick={() => openWhatsApp("Hello MM Computer Kotli, I want to book a repair!")}
                  className="w-full flex items-center justify-center gap-2 mt-2 bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg cursor-pointer hover:bg-emerald-700 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section id="home" className="relative overflow-hidden py-16 lg:py-28">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left gap-6">
              
              {/* Trust Badge */}
              <div className="flex items-center justify-center lg:justify-start">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${darkMode ? 'bg-sky-400/10 text-sky-400 border border-sky-400/20' : 'bg-sky-50 text-sky-700 border border-sky-100'}`}>
                  <ShieldCheck className="w-4.5 h-4.5" />
                  12 Years Trusted Experience in Kotli
                </span>
              </div>

              {/* Mega Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Premium Laptop Repair <br className="hidden sm:inline" />
                <span className="text-sky-500 dark:text-sky-400">
                  & Certified Sales
                </span>{' '}
                in <span className="underline decoration-sky-500 decoration-wavy underline-offset-8">Kotli</span>
              </h1>

              {/* Explanatory subtitle */}
              <p className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                MM Computer is Kotli&apos;s leading tech partner. Whether your computer is flat dead, needs a battery/screen replacement, or you are looking to purchase high-quality New, Used, and Gaming laptops on budget — we have got you covered!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-3">
                <button 
                  onClick={() => scrollTo('sell')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-xl shadow-sky-500/20 px-8 py-4 rounded-2xl font-bold transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/30 active:translate-y-0 transition-all cursor-pointer"
                >
                  <Wrench className="w-5 h-5" />
                  <span>Repair Now (Free Quote)</span>
                </button>
                
                <button 
                  onClick={() => scrollTo('products')}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold border transform hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer ${darkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-white' : 'border-slate-300 bg-white hover:bg-slate-50'}`}
                >
                  <Laptop className="w-5 h-5" />
                  <span>Buy Premium Laptop</span>
                </button>
              </div>

              {/* Features Quick-Check */}
              <div className="grid grid-cols-3 gap-4 border-t pt-8 mt-4 border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-2xl text-sky-500">100%</span>
                  <span>Genuine Parts Used</span>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-2xl text-sky-500">3-Hour</span>
                  <span>Express Fast Turnaround</span>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-2xl text-sky-500">Free</span>
                  <span>Expert Tech Diagnostics</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Decorative absolute element */}
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl blur-md opacity-25 dark:opacity-40 animate-pulse" />
                
                <div className={`relative p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
                  
                  {/* Miniature Interactive Widget Panel */}
                  <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-sky-500 w-5 h-5" />
                    <span>Live Service Status</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Progress Bar 1 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1 opacity-75">
                        <span>Daily Completed Repair Queues</span>
                        <span>12/12 Clean</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    {/* Progress Bar 2 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1 opacity-75">
                        <span>Used Premium Stocks Available</span>
                        <span>8 Models Handpicked</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    {/* Feature Card inside Hero */}
                    <div className={`p-4 rounded-xl flex items-center gap-3.5 border ${darkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-150'}`}>
                      <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                        <Phone className="h-5 w-5 animate-bounce" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Connect Now</p>
                        <p className="text-sm font-extrabold tracking-tight">CEO WhatsApp Available</p>
                        <p className="text-xs opacity-70">+92 343 0407210</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => openWhatsApp("Hello! I want to ask about your current available laptop deals and pricing.")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 dark:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-emerald-700 transition duration-300 cursor-pointer text-xs uppercase"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat with CEO Directly
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className={`py-16 sm:py-24 border-t border-b transition-colors ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-sky-500 tracking-widest block">What We Deliver</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Our Premium Repair Services</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full" />
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              MM Computer uses high-quality OEM spares. Each replacement comes with clean setup, dust cleaning service, and a warranty period.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`flex flex-col p-6 sm:p-8 rounded-2xl border transition-all duration-350 hover:-translate-y-1.5 hover:shadow-xl group ${darkMode ? 'bg-slate-950 border-slate-800/80 hover:border-sky-500/40' : 'bg-white border-slate-200/80 hover:border-sky-500/40'}`}
                >
                  {/* Icon and Price Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-xl transition-all duration-300 group-hover:scale-105 ${darkMode ? 'bg-slate-900 text-sky-400 group-hover:bg-sky-500/10' : 'bg-sky-50 text-sky-600 group-hover:bg-sky-500/10'}`}>
                      <IconComp className="w-8 h-8" />
                    </div>
                    <span className={`text-xs font-black tracking-wide uppercase px-3.5 py-1.5 rounded-full ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-800 border border-emerald-100'}`}>
                      {service.price}
                    </span>
                  </div>

                  {/* Body Info */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-sky-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className={`text-sm mb-6 leading-relaxed flex-grow ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {service.desc}
                  </p>

                  {/* CTA repair order button */}
                  <button 
                    onClick={() => openWhatsApp(service.whatsappMsg)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-sky-600 dark:bg-slate-850 dark:group-hover:bg-gradient-to-r dark:group-hover:from-sky-500 dark:group-hover:to-sky-600 text-white font-bold py-3.5 rounded-xl transition-all font-semibold translate-y-0 text-sm cursor-pointer border border-transparent dark:border-slate-800"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Book Service Now
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick service diagnostic note */}
          <div className={`mt-12 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 border ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-sky-50/40 border-sky-100'}`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 text-sky-500 rounded-lg">
                <HelpCircle className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold tracking-tight">
                Don&apos;t know what is wrong? Bring your device for a 100% Free Diagnostics Checkup.
              </p>
            </div>
            
            <button 
              onClick={() => openWhatsApp("Hello MM Computer! I am not sure about the laptop fault. I want a free diagnostic checkup.")}
              className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-sm rounded-lg shadow-sm hover:shadow-sky-500/25 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Request Diagnostic Call
            </button>
          </div>

        </div>
      </section>

      {/* 4. Products Grid */}
      <section id="products" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-sky-500 tracking-widest block">Available Stock on Demand</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight animate-fade-in">Explore 12 Selected Laptop Models</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full" />
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Handpicked and tested thoroughly on more than 28 checkpoints. Our inventory features brand new sealed units and certified corporate return used laptops.
            </p>
          </div>

          {/* Category Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {[
              { label: '🔥 All Models', value: 'all' },
              { label: '✨ Brand New Pack', value: 'new' },
              { label: '📦 Expert Sourced Used', value: 'used' },
              { label: '🎮 Extreme Gaming', value: 'gaming' }
            ].map((btn) => (
              <button 
                key={btn.value}
                onClick={() => setActiveTab(btn.value)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 ${
                  activeTab === btn.value 
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 font-bold font-bold' 
                    : darkMode 
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Laptops Filterable Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredLaptops.map((laptop) => (
              <div 
                key={laptop.id}
                className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  darkMode ? 'bg-slate-900/60 border-slate-800/80 hover:border-sky-500/30' : 'bg-white border-slate-200 hover:border-sky-500/30'
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0">
                  <img 
                    src={laptop.image} 
                    alt={laptop.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-350 ease-out group-hover:scale-105"
                  />
                  
                  {/* Category overlay tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-md ${
                      laptop.category === 'Gaming'
                        ? 'bg-red-500 text-white'
                        : laptop.category === 'New'
                          ? 'bg-sky-500 text-white'
                          : 'bg-indigo-600 text-white'
                    }`}>
                      {laptop.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/75 text-white px-2.5 py-1.5 rounded-md backdrop-blur-sm">
                      {laptop.condition}
                    </span>
                  </div>

                  {/* Hot tag */}
                  {laptop.isPopular && (
                    <span className="absolute top-3 right-3 text-[10px] bg-yellow-500 text-slate-950 font-black tracking-widest px-2.5 py-1.5 rounded-md uppercase">
                      Top Deal
                    </span>
                  )}
                </div>

                {/* Info Card Body */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold group-hover:text-sky-500 transition-colors line-clamp-1 mb-2">
                      {laptop.name}
                    </h3>

                    {/* Specs List with custom Icons */}
                    <ul className="space-y-1.5 border-t border-b border-slate-150 dark:border-slate-800/80 py-3.5 my-3.5 text-xs text-slate-500 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-sky-400" />
                        <span className="truncate"><strong>CPU:</strong> {laptop.specs.cpu}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="truncate"><strong>Memory:</strong> {laptop.specs.ram} / {laptop.specs.storage}</span>
                      </li>
                      {laptop.specs.gpu && (
                        <li className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-red-400" />
                          <span className="truncate"><strong>GPU:</strong> {laptop.specs.gpu}</span>
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate"><strong>Screen:</strong> {laptop.specs.screen}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    {/* Bottom Row: PKR Price + WhatsApp redirect */}
                    <div className="flex items-end justify-between gap-2 mt-2">
                      <div>
                        <span className="text-[10px] font-bold block opacity-75">PKR Local Price</span>
                        <span className="text-xl font-black text-sky-500 tracking-tight">
                          Rs {laptop.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => openWhatsApp(`Hello MM Computer! I am interested in buying ${laptop.name} (Specs: CPU-${laptop.specs.cpu}, RAM-${laptop.specs.ram}, Drive-${laptop.specs.storage}) for Rs ${laptop.price.toLocaleString()}. Is this still in stock?`)}
                        className="flex items-center gap-1 bg-emerald-600 dark:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-emerald-700 transition cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice about stock availability */}
          <div className="mt-14 text-center max-w-xl mx-auto">
            <p className="text-xs opacity-75 leading-relaxed">
              * Stocks update daily. Brand new laptops come with 1 Year Official Local brand warranty. Sourced used laptops carry 30 Days Testing check Warranty.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Sell & Buy Form (Quote Generator) */}
      <section id="sell" className={`py-16 sm:py-24 border-t border-b transition-colors ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Info Left Block */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase text-sky-500 tracking-widest">We Buy Laptops, PCs & Accessories</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Want to Sell Your Old Laptop, Computer or PC Parts?
              </h2>
              <div className="w-16 h-1 bg-sky-500 rounded-full" />
              
              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                MM Computer is not just a retail store! **We actively buy old, used, or even broken laptops, full personal computer (PC) systems, LCDs, monitors, and all computer-related things.** 
              </p>
              <p className={`text-sm leading-relaxed -mt-3 italic ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                Ham har kism ke puranay laptops, computer systems, PC setup, LED monitors aur related cheezen khareedtay hain. Apni product ki tafseelat faram karein aur dukan anay se pehlay direct WhatsApp par rate paayein!
              </p>

              {/* Form Process Highlights */}
              <ul className="space-y-4 text-sm font-semibold opacity-90">
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">1</div>
                  <span>Fill the quick form details</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">2</div>
                  <span>Upload a picture of your device</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">3</div>
                  <span>Instant valuation & cash offer on CEO WhatsApp</span>
                </li>
              </ul>
            </div>

            {/* Quote Form Panel */}
            <div className="lg:col-span-12 xl:col-span-7">
              <div className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Wrench className="text-sky-500" />
                  <span>Interactive Selling & Valuation Engine</span>
                </h3>

                <form onSubmit={handleSellSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Your Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={sellForm.name}
                        onChange={(e) => setSellForm({...sellForm, name: e.target.value})}
                        placeholder="e.g. Asim Khan"
                        className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    {/* Your Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75">
                        Phone & Whatsapp Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={sellForm.phone}
                        onChange={(e) => setSellForm({...sellForm, phone: e.target.value})}
                        placeholder="e.g. +92 3XX XXXXXXX"
                        className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Laptop / PC Model */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75">
                        Device Name / Specs (Laptop, PC, Monitor, Parts) *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={sellForm.model}
                        onChange={(e) => setSellForm({...sellForm, model: e.target.value})}
                        placeholder="e.g. Core i5 Desktop, HP Elitebook, 24' LCD"
                        className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    {/* Condition */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75">
                        Current Physical Condition *
                      </label>
                      <select 
                        value={sellForm.condition}
                        onChange={(e) => setSellForm({...sellForm, condition: e.target.value})}
                        className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="Used (9.8/10 Like New)">Used (9.8/10 Condition - Near Box Packed)</option>
                        <option value="Used (9.2/10 Elite Business)">Used (9.2/10 Grade-A Normal Use)</option>
                        <option value="Used (8/10 Fair with scratches)">Used (8/10 Grade-B Cosmetic Scratches)</option>
                        <option value="Non-Working / Broken Hardware">Faulty / Parts Broken (Needs Work)</option>
                        <option value="Brand New Box Sealed">Brand New Box Sealed</option>
                      </select>
                    </div>
                  </div>

                  {/* Problem & Details description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75">
                      Describe Device Accessories / Hardware / Issues (Optional)
                    </label>
                    <textarea 
                      rows={2}
                      value={sellForm.problem}
                      onChange={(e) => setSellForm({...sellForm, problem: e.target.value})}
                      placeholder="Describe everything here. e.g. Box included, 16GB RAM, or if something is broken"
                      className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                      }`}
                    ></textarea>
                  </div>

                  {/* Upload Picture Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-sky-500" />
                      <span>Upload Product Photo (Optional but Recommended)</span>
                    </label>
                    
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                        deviceImagePreview 
                          ? (darkMode ? 'border-sky-500/50 bg-sky-500/5' : 'border-sky-500 bg-sky-50/50')
                          : (isDragging 
                              ? (darkMode ? 'border-sky-500 bg-sky-500/10' : 'border-sky-500 bg-sky-50')
                              : (darkMode ? 'border-slate-800 hover:border-slate-700 bg-slate-900/30' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'))
                      }`}
                    >
                      {deviceImagePreview ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative group inline-block">
                            <img 
                              src={deviceImagePreview} 
                              alt="Uploaded device preview" 
                              className="w-24 h-24 object-cover rounded-xl shadow-md border-2 border-sky-400"
                            />
                            <button
                              type="button"
                              onClick={handleImageRemove}
                              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-xs">
                            <p className="font-bold text-sky-500">{deviceImage?.name}</p>
                            <p className="text-slate-400 mt-1">📸 Photo Loaded! Remember to hit the attach button in WhatsApp when the chat starts to send this photo directly to the CEO.</p>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            className="hidden" 
                          />
                          <div className="flex flex-col items-center gap-2">
                            <Upload className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                            <span className="text-sm font-bold opacity-90 block">
                              Click or Drop Photo of your Laptop / Computer / PC Accessories
                            </span>
                            <span className="text-xs text-slate-400">
                              Supports JPG, PNG, WEBP
                            </span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl cursor-pointer shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Submit Valuation & Open WhatsApp</span>
                    </button>
                    
                    {formSubmitted && (
                      <p className="text-xs text-emerald-500 mt-2 font-bold text-center animate-pulse">
                        ✔ Opening WhatsApp to complete quote appraisal with MM Computer CEO.
                      </p>
                    )}
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Professional High-Trust Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-sky-500 tracking-widest block">Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-center">What People Say About MM Computer</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full" />
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Read active feedback from local Kotli customers who got their systems repaired or purchased laptops.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "testi-1",
                name: "Asad Mahmood",
                role: "Freelance Software Developer",
                testi: "I was extremely anxious when my HP Gaming laptop screen cracked. MM Computer replaced the IPS panel in just 4 hours at an extremely fair price. Outstanding turnaround in Kotli!",
                stars: 5
              },
              {
                id: "testi-2",
                name: "Maria Quresh",
                role: "UJS University Student",
                testi: "Bought a used MacBook Air M1 from MM Computer. The staff is polite, helped me check physical diagnostics, and even gifted a premium laptop skin. Highly recommended!",
                stars: 5
              },
              {
                id: "testi-3",
                name: "Kamran Ali",
                role: "Remote Graphic Designer",
                testi: "MM Computer helped me upgrade memory and battery on my Dell Latitude 7490. Backups are fabulous now. Best place in Kotli, Azad Kashmir.",
                stars: 5
              }
            ].map((review) => (
              <div 
                key={review.id}
                className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4 text-amber-500">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                
                {/* Text Content */}
                <p className="text-sm italic mb-6 leading-relaxed opacity-95">
                  &ldquo;{review.testi}&rdquo;
                </p>

                {/* Profile Footer */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="h-10 w-10 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{review.name}</h4>
                    <p className="text-xs opacity-75">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. About Section */}
      <section id="about" className={`py-16 sm:py-24 border-t transition-colors ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Grid Column */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80" 
                  alt="Laptop repair station" 
                  className="rounded-2xl w-full object-cover h-48 sm:h-56 filter brightness-95"
                />
                <div className="bg-sky-500 text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl font-black block">12+</span>
                  <span className="text-xs uppercase font-extrabold tracking-widest block opacity-90">Years Experience</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-emerald-600 text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl font-black block">1.5K+</span>
                  <span className="text-xs uppercase font-extrabold tracking-widest block opacity-90">Laptops Solved</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80" 
                  alt="Thinkpad lineup workspace" 
                  className="rounded-2xl w-full object-cover h-48 sm:h-56"
                />
              </div>
            </div>

            {/* Content Column Area */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase text-sky-500 tracking-widest block">About MM Computer</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Kotli&apos;s Premium One-Stop Laptop Destination
              </h2>
              <div className="w-16 h-1 bg-sky-500 rounded-full" />

              <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Established with a vision for transparent and professional tech service, **MM Computer** has spent the last 12 years as an industry authority for computer service in Kotli, Azad Kashmir.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                
                {/* Bullet 1 */}
                <div className="flex gap-3">
                  <div className="p-2 bg-sky-500/10 text-sky-500 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">OEM Sourced Spares</h4>
                    <p className="text-xs opacity-80 leading-relaxed">Genuine batteries, screens, dynamic high-capacity coolers, keyboards with standard warranties.</p>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Expert Craftsmanship</h4>
                    <p className="text-xs opacity-80 leading-relaxed">Each laptop repair is diagnosed completely down to microelectronic level repairs.</p>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="flex gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Premium Retail Quality</h4>
                    <p className="text-xs opacity-80 leading-relaxed">We source and check 12 premium laptop stocks regularly ensuring optimal conditions.</p>
                  </div>
                </div>

                {/* Bullet 4 */}
                <div className="flex gap-3">
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">100% Free Diagnostics</h4>
                    <p className="text-xs opacity-80 leading-relaxed">Bring your flat laptop anytime; we will analyze issues and consult with zero charge.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Business Credentials Sub-Module */}
          <div className={`mt-16 p-6 sm:p-10 rounded-3xl border transition-all ${darkMode ? 'bg-slate-950/45 border-slate-800' : 'bg-white border-slate-200'} shadow-lg`}>
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="text-[10px] font-black uppercase text-amber-500 dark:text-amber-400 tracking-widest block mb-2">Verified credentials wallet</span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">Our Official Store Credentials</h3>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Cross-verify our contact numbers, email addresses, physical location, and services catalog as printed on our physical business cards in Kotli.
              </p>
            </div>
            
            <BusinessCards darkMode={darkMode} openWhatsApp={openWhatsApp} />
          </div>

        </div>
      </section>

      {/* 8. Detailed FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-sky-500 tracking-widest block">Have Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight block">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What brands of laptops do you repair?",
                a: "We repair all major corporate and gaming brands including HP (Omen, Victus, EliteBook, ProBook), Dell (Latitude, Inspiron, XPS, Alienware), Lenovo (ThinkPad, IdeaPad, Legion), Apple MacBooks, Acer (Nitro, Predator), ASUS (ROG, TUF, ZenBook) and others."
              },
              {
                q: "How long does a typical battery or screen replacement take?",
                a: "In most cases, battery replacements and standard laptop screen replacements require 1 to 3 hours only. Common parts are in active stock. If custom components need procurement, it might take 1 to 2 working days."
              },
              {
                q: "Do you offer any check-up or diagnostic fees?",
                a: "No, at MM Computer, diagnostic checking is 100% free of charge! You only pay if a repair or replacement is initiated with your verbal/written consent."
              },
              {
                q: "What is your return checking warranty policy for used laptops?",
                a: "All other executive-sourced used laptops carry a 30-Day Testing Check Warranty. We check each hardware component (motherboard, RAM, storage integrity, battery backup level, keyboard mechanics, screen pixels) rigorously before displaying."
              }
            ].map((faq, index) => (
              <details 
                key={index}
                className={`group p-5 rounded-xl border [&_summary::-webkit-details-marker]:hidden transition-all duration-300 ${
                  darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 focus:outline-none">
                  <h3 className="text-sm sm:text-base font-bold select-none">{faq.q}</h3>
                  <div className={`p-1.5 rounded-lg border transition-colors shrink-0 ${darkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600'}`}>
                    <svg className="h-4 w-4 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="mt-4 leading-relaxed text-xs sm:text-sm border-t pt-4 border-slate-200 dark:border-slate-800">
                  <p className="opacity-90">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Address & Contact Section Container */}
      <section id="contact" className={`py-16 sm:py-24 border-t transition-colors ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase text-sky-500 tracking-widest block">Store Locator & Contact</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-center">Visit Us or Get in Touch Today</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full" />
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              We are located perfectly at the heart of Main Bazar Kotli. Feel free to give us a phone call or drop a direct message for customized system enquiries.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Reach Information Area */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              
              <div className="space-y-6">
                
                {/* Location Bullet */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 border border-sky-500/20">
                    <MapPin className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider mb-1">Our Store Address</h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      MM Computer, Al-Zamin Plaza, Pindi Road, <br />
                      Kotli, Azad Jammu & Kashmir (AJK)
                    </p>
                  </div>
                </div>

                {/* Main WhatsApp (Highly Integrated) */}
                <div className="flex gap-4 border-l-4 border-emerald-500 pl-4 py-1">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <Phone className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider mb-1">Direct Helpline (CEO)</h4>
                    <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      +92 343 0407210
                    </p>
                    <p className="text-[11px] font-bold text-sky-500 mt-0.5">
                      Alternate Line: +92 345 6799101
                    </p>
                    <p className="text-xs opacity-75 mt-0.5">Contact via Call, Text, or WhatsApp</p>
                  </div>
                </div>

                {/* Email Bullet */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 border border-sky-500/20">
                    <Mail className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider mb-1">Official Emails</h4>
                    <p className="text-sm opacity-90 font-mono">contact@mmcomputer.pk</p>
                    <p className="text-xs opacity-75 font-mono">saqibmm2@gmail.com</p>
                  </div>
                </div>

                {/* Clock Bullet */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 border border-sky-500/20">
                    <Clock className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider mb-1">Shop Working Hours</h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      <strong>Monday - Saturday:</strong> 9:00 AM - 8:00 PM <br />
                      <strong>Sunday:</strong> Shop Closed (Available Remote on WhatsApp)
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct Call Button */}
              <div className="pt-4">
                <button 
                  onClick={() => openWhatsApp("Hello MM Computer! I have read your contact information and want to schedule a meet.")}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold py-4 rounded-xl cursor-pointer shadow-lg transform hover:-translate-y-0.5 transition"
                >
                  <MessageSquare className="w-5 h-5 animate-pulse" />
                  <span>Start Live Chat Support</span>
                </button>
              </div>

            </div>

            {/* Google Map Iframe element */}
            <div className="lg:col-span-8 h-96 sm:h-[450px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative">
              <iframe 
                title="MM Computer Kotli Store Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26665.3409197904!2d73.88206898492021!3d33.51651877684078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391fec0be5fbeb7d%3A0xc6cb512e2c056dcd!2sKotli!5e0!3m2!1sen!2spk!4v1717240000000!5m2!1sen!2spk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter dark:contrast-[.85] dark:invert-[.92] dark:hue-rotate-[180deg]"
              ></iframe>

              {/* Floating Address Card on bottom left of map */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-slate-950/90 text-white p-4 rounded-xl backdrop-blur-md border border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">Main Chowk, Main Bazar</p>
                  <p className="text-sm font-extrabold">MM Computer Kotli, AK</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. Footer Section with credits and copyrights */}
      <footer className={`py-12 border-t transition-colors ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-800">
            
            {/* Brand Left */}
            <div className="flex items-center gap-3.5">
              <MMLogo size={52} glow={false} className="shrink-0" />
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">MM Computer</h3>
                <p className="text-xs opacity-75 text-sky-400 font-extrabold uppercase mt-0.5">Mega Master Laptop & Computer</p>
              </div>
            </div>

            {/* Quick footer Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-sky-400 transition cursor-pointer">Back to Top</button>
              <button onClick={() => scrollTo('services')} className="hover:text-sky-400 transition cursor-pointer">Services</button>
              <button onClick={() => scrollTo('products')} className="hover:text-sky-400 transition cursor-pointer">Shop 12 Laptops</button>
              <button onClick={() => scrollTo('sell')} className="hover:text-sky-400 transition cursor-pointer">Sell/Trade</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-sky-400 transition cursor-pointer">Location</button>
            </div>

            {/* Social Share Badges */}
            <div className="flex items-center gap-3.5">
              <button 
                onClick={() => openWhatsApp("Hello MM Computer! I am calling from social share channels.")}
                className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-emerald-600 hover:text-white transition flex items-center justify-center font-bold text-sm border border-slate-800 text-slate-400"
                aria-label="Direct WhatsApp Contact"
              >
                <Phone className="w-4.5 h-4.5" />
              </button>
              
              <button 
                onClick={() => openWhatsApp("Hello MM Computer! Please share catalogue information.")}
                className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-sky-500 hover:text-white transition flex items-center justify-center font-bold text-sm border border-slate-800 text-slate-400"
                aria-label="Join Community WhatsApp group"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs opacity-75">
            <p>
              &copy; {new Date().getFullYear()} MM Computer Kotli. All rights reserved. Registered Local Tech Solution Partner.
            </p>
            <p className="flex items-center gap-1">
              <span>Crafted for high performance & SEO</span>
              <ExternalLink className="w-3 h-3" />
            </p>
          </div>

        </div>
      </footer>

      {/* 11. Floating Quick-Access Action Widgets */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        
        {/* Scroll-to-Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`p-3.5 rounded-full shadow-2xl border transition hover:-translate-y-1 transform active:translate-y-0 cursor-pointer ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Live Active Whatsapp Bubble widget */}
        <button 
          onClick={() => openWhatsApp("Hello MM Computer Kotli! I have a general query regarding laptop repair/sales.")}
          className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/35 hover:-translate-y-1 transform active:translate-y-0 transition cursor-pointer relative group flex items-center justify-center"
          title="Direct WhatsApp Helpline"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          
          {/* Tooltip Badge */}
          <span className="absolute right-14 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap transition-transform duration-200 shadow-md">
            WhatsApp Online Support
          </span>

          {/* Active online dot */}
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border border-white animate-ping"></span>
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border border-white"></span>
        </button>

      </div>

    </div>
  );
}
