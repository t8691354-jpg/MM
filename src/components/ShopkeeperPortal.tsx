import React, { useState } from 'react';
import { 
  Package, 
  Wrench, 
  Laptop,
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Search, 
  Phone, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Send, 
  Smartphone, 
  RefreshCw, 
  Download, 
  ShieldCheck, 
  Layers, 
  Eye, 
  EyeOff,
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Sparkles,
  Share2
} from 'lucide-react';
import { 
  LaptopItem, 
  ShopServiceItem, 
  RepairTicketItem, 
  QuickSaleRecord,
  INITIAL_LAPTOPS,
  INITIAL_SERVICES
} from '../data/shopData';

interface ShopkeeperPortalProps {
  laptops: LaptopItem[];
  onUpdateLaptops: (updated: LaptopItem[]) => void;
  services: ShopServiceItem[];
  onUpdateServices: (updated: ShopServiceItem[]) => void;
  tickets: RepairTicketItem[];
  onUpdateTickets: (updated: RepairTicketItem[]) => void;
  sales: QuickSaleRecord[];
  onUpdateSales: (updated: QuickSaleRecord[]) => void;
}

export default function ShopkeeperPortal({
  laptops,
  onUpdateLaptops,
  services,
  onUpdateServices,
  tickets,
  onUpdateTickets,
  sales,
  onUpdateSales
}: ShopkeeperPortalProps) {
  // Security password lock state (Strictly requires: 1234asdF@@@)
  const REQUIRED_ADMIN_PASSWORD = '1234asdF@@@';
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('mm_admin_unlocked') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Active Admin Sub-Tab
  const [adminSection, setAdminSection] = useState<'overview' | 'products' | 'services' | 'repairs' | 'sales' | 'settings'>('overview');

  // Search & Filter within Admin
  const [productSearch, setProductSearch] = useState('');
  const [productFilterCat, setProductFilterCat] = useState<string>('all');
  const [ticketSearch, setTicketSearch] = useState('');

  // Modals & Form States
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<LaptopItem | null>(null);

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ShopServiceItem | null>(null);

  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Preset quick photos for computer products
  const PRESET_IMAGES = [
    { label: "Gaming Laptop (RGB)", url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80" },
    { label: "Business ThinkPad", url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80" },
    { label: "Dell Latitude / Inspiron", url: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=600&q=80" },
    { label: "Apple MacBook", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
    { label: "HP EliteBook / ProBook", url: "https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=600&q=80" },
    { label: "Gaming Tower PC", url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80" }
  ];

  // New Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Used' as LaptopItem['category'],
    price: '',
    condition: 'Used (9.5/10 Condition)',
    cpu: '',
    ram: '16GB DDR4',
    storage: '512GB NVMe SSD',
    gpu: '',
    screen: '14.0" FHD IPS Display',
    image: PRESET_IMAGES[2].url,
    isPopular: false,
    inStock: true
  });

  // New Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Hardware / Body',
    costRange: 'Starting Rs 1,500',
    duration: '1 Hour',
    desc: '',
    isPopular: false
  });

  // New Repair Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    clientName: '',
    clientPhone: '',
    device: '',
    issue: '',
    estimatedPrice: '',
    technician: 'Muhammad Saqib',
    notes: ''
  });

  // New Quick Sale Form State
  const [saleForm, setSaleForm] = useState({
    itemName: '',
    category: 'Laptop',
    customerName: '',
    salePricePKR: '',
    paymentMethod: 'Cash' as QuickSaleRecord['paymentMethod']
  });

  // Handle Password Unlock - strictly 1234asdF@@@
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === REQUIRED_ADMIN_PASSWORD) {
      setIsUnlocked(true);
      localStorage.setItem('mm_admin_unlocked', 'true');
      setPinError(false);
      showToast('خوش آمدید محمد ثاقب! پورٹل کامیابی سے کھل گیا ہے۔ (Welcome Muhammad Saqib!)');
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    localStorage.removeItem('mm_admin_unlocked');
    setPinInput('');
    showToast('Shopkeeper Portal locked.');
  };

  // PRODUCT ACTIONS
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Please enter product title and price!');
      return;
    }

    const priceNum = parseInt(productForm.price.toString().replace(/[^0-9]/g, '')) || 0;

    if (editingProduct) {
      // Update existing
      const updated = laptops.map(item => {
        if (item.id === editingProduct.id) {
          return {
            ...item,
            name: productForm.name,
            category: productForm.category,
            price: priceNum,
            condition: productForm.condition,
            specs: {
              cpu: productForm.cpu,
              ram: productForm.ram,
              storage: productForm.storage,
              gpu: productForm.gpu || undefined,
              screen: productForm.screen
            },
            image: productForm.image,
            isPopular: productForm.isPopular,
            inStock: productForm.inStock
          };
        }
        return item;
      });
      onUpdateLaptops(updated);
      showToast(`Updated "${productForm.name}" successfully!`);
    } else {
      // Create new
      const newProduct: LaptopItem = {
        id: `prod-${Date.now()}`,
        name: productForm.name,
        category: productForm.category,
        price: priceNum,
        condition: productForm.condition,
        specs: {
          cpu: productForm.cpu || 'Intel Core i5 / AMD Ryzen',
          ram: productForm.ram || '8GB DDR4',
          storage: productForm.storage || '256GB SSD',
          gpu: productForm.gpu || undefined,
          screen: productForm.screen || '14.0" FHD Display'
        },
        image: productForm.image || PRESET_IMAGES[0].url,
        isPopular: productForm.isPopular,
        inStock: productForm.inStock,
        dateAdded: new Date().toLocaleDateString('en-GB')
      };
      onUpdateLaptops([newProduct, ...laptops]);
      showToast(`"${newProduct.name}" added to live showroom!`);
    }

    // Reset Form
    setShowAddProductModal(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Used',
      price: '',
      condition: 'Used (9.5/10 Condition)',
      cpu: '',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
      gpu: '',
      screen: '14.0" FHD IPS Display',
      image: PRESET_IMAGES[2].url,
      isPopular: false,
      inStock: true
    });
  };

  const handleEditProductClick = (item: LaptopItem) => {
    setEditingProduct(item);
    setProductForm({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      condition: item.condition,
      cpu: item.specs.cpu,
      ram: item.specs.ram,
      storage: item.specs.storage,
      gpu: item.specs.gpu || '',
      screen: item.specs.screen,
      image: item.image,
      isPopular: !!item.isPopular,
      inStock: item.inStock !== false
    });
    setShowAddProductModal(true);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from your shop catalog?`)) {
      const updated = laptops.filter(l => l.id !== id);
      onUpdateLaptops(updated);
      showToast(`Removed "${name}" from inventory.`);
    }
  };

  const handleToggleStock = (id: string) => {
    const updated = laptops.map(l => {
      if (l.id === id) {
        const nextVal = l.inStock === false ? true : false;
        showToast(`${l.name} is now marked ${nextVal ? 'IN STOCK' : 'SOLD OUT'}`);
        return { ...l, inStock: nextVal };
      }
      return l;
    });
    onUpdateLaptops(updated);
  };

  // SERVICE ACTIONS
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.costRange) {
      alert('Please fill out service title and cost!');
      return;
    }

    if (editingService) {
      const updated = services.map(s => {
        if (s.id === editingService.id) {
          return {
            ...s,
            title: serviceForm.title,
            category: serviceForm.category,
            costRange: serviceForm.costRange,
            duration: serviceForm.duration,
            desc: serviceForm.desc,
            isPopular: serviceForm.isPopular
          };
        }
        return s;
      });
      onUpdateServices(updated);
      showToast(`Updated service "${serviceForm.title}"!`);
    } else {
      const newSrv: ShopServiceItem = {
        id: `srv-${Date.now()}`,
        title: serviceForm.title,
        category: serviceForm.category,
        costRange: serviceForm.costRange,
        duration: serviceForm.duration,
        desc: serviceForm.desc || 'Professional technical repair with original parts warranty.',
        isPopular: serviceForm.isPopular
      };
      onUpdateServices([...services, newSrv]);
      showToast(`Service "${newSrv.title}" added to service menu!`);
    }

    setShowAddServiceModal(false);
    setEditingService(null);
    setServiceForm({
      title: '',
      category: 'Hardware / Body',
      costRange: 'Starting Rs 1,500',
      duration: '1 Hour',
      desc: '',
      isPopular: false
    });
  };

  const handleEditServiceClick = (s: ShopServiceItem) => {
    setEditingService(s);
    setServiceForm({
      title: s.title,
      category: s.category,
      costRange: s.costRange,
      duration: s.duration,
      desc: s.desc,
      isPopular: !!s.isPopular
    });
    setShowAddServiceModal(true);
  };

  const handleDeleteService = (id: string, title: string) => {
    if (confirm(`Remove service "${title}"?`)) {
      onUpdateServices(services.filter(s => s.id !== id));
      showToast(`Deleted service "${title}".`);
    }
  };

  // REPAIR TICKET ACTIONS
  const handleSaveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.clientName || !ticketForm.device || !ticketForm.issue) {
      alert('Client Name, Device Model, and Fault description are required!');
      return;
    }

    const priceNum = parseInt(ticketForm.estimatedPrice.replace(/[^0-9]/g, '')) || 0;
    const ticketId = `MM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: RepairTicketItem = {
      id: ticketId,
      clientName: ticketForm.clientName,
      clientPhone: ticketForm.clientPhone || '0343-0407210',
      device: ticketForm.device,
      issue: ticketForm.issue,
      dateReceived: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'received',
      estimatedPrice: priceNum,
      technician: ticketForm.technician || 'Muhammad Saqib',
      notes: ticketForm.notes || 'Received at Al-Zamin Plaza counter.'
    };

    onUpdateTickets([newTicket, ...tickets]);
    setShowAddTicketModal(false);
    setTicketForm({
      clientName: '',
      clientPhone: '',
      device: '',
      issue: '',
      estimatedPrice: '',
      technician: 'Muhammad Saqib',
      notes: ''
    });

    showToast(`New Ticket #${ticketId} created!`);
  };

  const handleUpdateTicketStatus = (id: string, newStatus: RepairTicketItem['status']) => {
    const updated = tickets.map(t => {
      if (t.id === id) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    onUpdateTickets(updated);
    showToast(`Ticket #${id} updated to ${newStatus.toUpperCase()}`);
  };

  const handleSendTicketWhatsApp = (ticket: RepairTicketItem) => {
    const statusUrduMap: Record<RepairTicketItem['status'], string> = {
      received: 'آپ کا لیپ ٹاپ / کمپیوٹر موصول ہو چکا ہے۔ جلدی ڈائیگنوسس مکمل ہو گا۔',
      diagnosed: 'فالٹ معلوم ہو گیا ہے۔ کام جلد شروع کیا جا رہا ہے۔',
      repairing: 'اس وقت بورڈ / ہارڈویئر ریپیئر اور سولڈرنگ جاری ہے۔',
      testing: 'ریپیئر مکمل ہو گئی ہے۔ اب سٹریس ٹیسٹنگ اور چیکنگ ہو رہی ہے۔',
      ready: 'ماشاءاللہ! آپ کا کمپیوٹر بالکل تیار ہے، آپ الزامن پلازہ کوٹلی شاپ سے وصول کر سکتے ہیں۔',
      delivered: 'آپ کا ڈیوائس کامیابی سے ہینڈ اوور ہو گیا ہے۔ جزاک اللہ!'
    };

    const text = `السلام علیکم ${ticket.clientName} صاحب!
ایم ایم کمپیوٹر الزامن پلازہ کوٹلی سے ریپیئر سٹیٹس اپڈیٹ:

🎫 ٹکٹ نمبر: [${ticket.id}]
💻 ڈیوائس: ${ticket.device}
🛠️ مسئلہ: ${ticket.issue}
📊 موجودہ سٹیٹس: ${ticket.status.toUpperCase()} (${statusUrduMap[ticket.status]})
💰 تخمینہ چارجز: Rs ${ticket.estimatedPrice.toLocaleString()}
👨‍🔧 ٹیکنیشن: ${ticket.technician}

کسی بھی سوال کے لیے رابطہ کریں:
محمد ثاقب - 0343-0407210 / 0345-6799101
ایم ایم کمپیوٹر شاپ، الزامن پلازہ کوٹلی AJK`;

    const cleanPhone = ticket.clientPhone.replace(/[^0-9]/g, '');
    const targetNumber = cleanPhone.startsWith('92') 
      ? cleanPhone 
      : cleanPhone.startsWith('0') 
        ? `92${cleanPhone.slice(1)}` 
        : cleanPhone ? `92${cleanPhone}` : '923430407210';

    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // QUICK SALE ACTIONS
  const handleSaveSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleForm.itemName || !saleForm.salePricePKR) {
      alert('Please specify item name and sale price');
      return;
    }

    const priceNum = parseInt(saleForm.salePricePKR.replace(/[^0-9]/g, '')) || 0;
    const newSale: QuickSaleRecord = {
      id: `S-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      itemName: saleForm.itemName,
      category: saleForm.category,
      customerName: saleForm.customerName || 'Walk-in Customer (Kotli)',
      salePricePKR: priceNum,
      paymentMethod: saleForm.paymentMethod
    };

    onUpdateSales([newSale, ...sales]);
    setShowAddSaleModal(false);
    setSaleForm({
      itemName: '',
      category: 'Laptop',
      customerName: '',
      salePricePKR: '',
      paymentMethod: 'Cash'
    });
    showToast(`Sale recorded: Rs ${priceNum.toLocaleString()}!`);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      shop: "MM Computer Kotli (Muhammad Saqib)",
      exportedAt: new Date().toISOString(),
      contacts: ["0343-0407210", "0345-6799101"],
      laptops,
      services,
      tickets,
      sales
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mm_computer_shop_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Catalog & Shop data downloaded!');
  };

  // Reset to default sample catalog
  const handleResetDefaults = () => {
    if (confirm("Reset laptops and services to original MM Computer catalog defaults? Custom items will be reset.")) {
      onUpdateLaptops(INITIAL_LAPTOPS);
      onUpdateServices(INITIAL_SERVICES);
      showToast("Reset to default showroom inventory.");
    }
  };

  // Filtered views
  const filteredProductList = laptops.filter(item => {
    const matchCat = productFilterCat === 'all' || item.category === productFilterCat;
    const matchQ = productSearch === '' || 
      item.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.specs.cpu.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchQ;
  });

  const filteredTicketsList = tickets.filter(t => 
    ticketSearch === '' ||
    t.clientName.toLowerCase().includes(ticketSearch.toLowerCase()) ||
    t.id.toLowerCase().includes(ticketSearch.toLowerCase()) ||
    t.device.toLowerCase().includes(ticketSearch.toLowerCase())
  );

  const totalInventoryValue = laptops.reduce((acc, l) => acc + (l.inStock !== false ? l.price : 0), 0);
  const totalSalesRevenue = sales.reduce((acc, s) => acc + s.salePricePKR, 0);
  const pendingRepairsCount = tickets.filter(t => t.status !== 'delivered' && t.status !== 'ready').length;
  const readyRepairsCount = tickets.filter(t => t.status === 'ready').length;

  // IF LOCKED: Show Security Password Verification Screen (Requires 1234asdF@@@)
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 animate-fade-in-up">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <span>🔒</span> Protected Owner Portal
            </span>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Shopkeeper Admin Portal</h3>
            <p className="text-xs text-slate-400">
              مخصوص برائے دکان دار محمد ثاقب (ایم ایم کمپیوٹر، الزامن پلازہ کوٹلی)
            </p>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-[11px] text-slate-300">
              صرف مخصوص پاس ورڈ داخل کرنے سے یہ پورٹل انلاک ہو گا۔
            </div>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block flex justify-between items-center">
                <span>Enter Password / پاس ورڈ درج کریں:</span>
                <span className="text-slate-500 font-mono text-[9px]">case-sensitive</span>
              </label>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="پاس ورڈ درج کریں..."
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full bg-slate-950 border ${pinError ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-800 focus:border-amber-400'} rounded-xl py-3 pl-4 pr-11 text-center font-mono text-base text-white tracking-widest placeholder-slate-600 focus:outline-none transition`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition p-1 cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-rose-450 font-semibold pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>غلط پاس ورڈ! صرف درست پاس ورڈ ڈالنے سے لاک کھلے گا۔</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-slate-950" />
              <span>Unlock Shopkeeper Dashboard (اوپن کریں)</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Muhammad Saqib • Al-Zamin Plaza, Kotli Shop</span>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED SHOPKEEPER DASHBOARD
  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[300] bg-emerald-500 text-slate-950 font-black text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Shopkeeper Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Shopkeeper Control Center
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
              Live Connected to Showroom
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <span>Muhammad Saqib (Shop Owner Portal)</span>
          </h3>

          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            یہاں سے آپ اپنی دکان کا سارا سامان (Laptops, Computers, Accessories)، ریپیئر سروسز اور ریٹس، کسٹمرز کے ریپیئر ٹوکنز، اور روزانہ کا کھاتہ براہِ راست کنٹرول کر سکتے ہیں۔
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Phone className="w-3.5 h-3.5" />
              0343-0407210 / 0345-6799101
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Al-Zamin Plaza, Kotli AJK
            </span>
          </div>
        </div>

        {/* Quick Action Buttons & Lock */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddProductModal(true);
            }}
            className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Laptop</span>
          </button>

          <button
            onClick={() => {
              setEditingService(null);
              setShowAddServiceModal(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>

          <button
            onClick={handleExportBackup}
            title="Download JSON Backup"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleLock}
            className="bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs px-3 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Catalog Laptops</span>
            <Laptop className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">{laptops.length} Units</p>
          <span className="text-[10px] text-emerald-400 font-semibold block">
            {laptops.filter(l => l.inStock !== false).length} in active stock
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Stock Value</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400 font-mono">
            Rs {(totalInventoryValue / 1000).toFixed(0)}k
          </p>
          <span className="text-[10px] text-slate-400 font-semibold block">
            Total showroom inventory
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Repairs</span>
            <Wrench className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-amber-400 font-mono">{pendingRepairsCount} Jobs</p>
          <span className="text-[10px] text-emerald-400 font-semibold block">
            {readyRepairsCount} ready for pickup
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Services Listed</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">{services.length} Rates</p>
          <span className="text-[10px] text-sky-400 font-semibold block">
            Customizable pricing
          </span>
        </div>
      </div>

      {/* Admin Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: '📊 Shop Overview & Actions' },
          { id: 'products', label: `💻 Laptops & Products (${laptops.length})` },
          { id: 'services', label: `🔧 Repair Services & Rates (${services.length})` },
          { id: 'repairs', label: `📋 Repair Counter / Jobs (${tickets.length})` },
          { id: 'sales', label: `💰 Daily Sales Ledger (${sales.length})` },
          { id: 'settings', label: '⚙️ Shop Profile & Backup' }
        ].map((tab) => {
          const isActive = adminSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminSection(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                isActive 
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: OVERVIEW & QUICK ACTIONS */}
      {adminSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Quick Action Card 1: Add Laptop */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-sky-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-white uppercase">نیا لیپ ٹاپ یا کمپیوٹر شامل کریں</h4>
              <p className="text-xs text-slate-400">
                شاپ پر نیا لیپ ٹاپ، گیمنگ پی سی یا یوزڈ مشین آئی ہو تو 1 منٹ میں نام، قیمت، ریم اور ایس ایس ڈی شامل کریں، وہ ویب سائٹ شو روم پر لائیو ہو جائے گی۔
              </p>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowAddProductModal(true);
                }}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product Now</span>
              </button>
            </div>

            {/* Quick Action Card 2: Book Repair Job */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-white uppercase">کسٹمر کا ریپیئر ٹوکن بک کریں</h4>
              <p className="text-xs text-slate-400">
                جب کوئی کسٹمر لیپ ٹاپ ریپیئر کے لیے جمع کرائے، اس کا فون نمبر اور مسئلہ درج کریں۔ کسٹمر خود آن لائن سٹیٹس چیک کر سکے گا اور آپ ایک کلک سے واٹس ایپ میسج بھیج سکیں گے۔
              </p>
              <button
                onClick={() => setShowAddTicketModal(true)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Book Repair Job</span>
              </button>
            </div>

            {/* Quick Action Card 3: Update Service Rates */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-white uppercase">ریپیئر ریٹس اور فیس تبدیل کریں</h4>
              <p className="text-xs text-slate-400">
                ونڈوز انسٹالیشن، اسکرین بدلنے، مدر بورڈ ریپیئر، یا پرنٹر ٹونر کے ریٹس کسی بھی وقت مارکیٹ کے مطابق اپڈیٹ یا نئے سروسز شامل کریں۔
              </p>
              <button
                onClick={() => setAdminSection('services')}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Manage Price List</span>
              </button>
            </div>

          </div>

          {/* Recent Pending Repairs At Glance */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  Active Lab Repairs in Kotli (شاپ میں جاری کام)
                </h4>
              </div>
              <button
                onClick={() => setAdminSection('repairs')}
                className="text-xs text-sky-400 hover:underline font-bold"
              >
                View All ({tickets.length}) →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {tickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      #{ticket.id}
                    </span>
                    <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-xs font-black text-white truncate">{ticket.clientName} - {ticket.device}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{ticket.issue}</p>
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-bold">Rs {ticket.estimatedPrice.toLocaleString()}</span>
                    <button
                      onClick={() => handleSendTicketWhatsApp(ticket)}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Send className="w-3 h-3" /> WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PRODUCTS & LAPTOPS MANAGEMENT */}
      {adminSection === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-1 items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products by model, processor, RAM..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={productFilterCat}
                onChange={(e) => setProductFilterCat(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Gaming">Gaming Laptops</option>
                <option value="Used">Used / Business Grade</option>
                <option value="New">Brand New Box</option>
                <option value="Desktop">Desktop / Towers</option>
                <option value="Accessories">Accessories</option>
              </select>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowAddProductModal(true);
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-black tracking-wider">
                    <th className="p-3.5">Device Image & Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Key Specs</th>
                    <th className="p-3.5">Price (PKR)</th>
                    <th className="p-3.5">Stock Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProductList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-850/40 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-10 object-cover rounded-lg border border-slate-800 shrink-0 bg-slate-950" 
                          />
                          <div>
                            <span className="text-white font-black block">{item.name}</span>
                            <span className="text-[10px] text-slate-400 block font-normal">{item.condition}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded ${
                          item.category === 'Gaming' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          item.category === 'New' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-[11px] text-slate-300 font-mono">
                        <div>{item.specs.cpu} | {item.specs.ram}</div>
                        <div className="text-slate-400 text-[10px]">{item.specs.storage} {item.specs.gpu ? `| ${item.specs.gpu}` : ''}</div>
                      </td>
                      <td className="p-3.5 font-mono text-emerald-400 font-black text-sm">
                        Rs {item.price.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleStock(item.id)}
                          className={`text-[9.5px] uppercase font-black px-2.5 py-1 rounded-full cursor-pointer transition flex items-center gap-1 ${
                            item.inStock !== false 
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.inStock !== false ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>{item.inStock !== false ? 'In Stock' : 'Sold Out'}</span>
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditProductClick(item)}
                            title="Edit Product"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item.id, item.name)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SERVICES & REPAIR PRICING */}
      {adminSection === 'services' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-sm font-black text-white uppercase">Repair Services & Rate List</h4>
              <p className="text-xs text-slate-400">تمام ریپیئر کاموں کے ریٹس اور دورانیہ یہاں سے اپڈیٹ کریں</p>
            </div>
            <button
              onClick={() => {
                setEditingService(null);
                setShowAddServiceModal(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider block">{s.category}</span>
                    <h5 className="text-sm font-black text-white">{s.title}</h5>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {s.costRange}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Time: {s.duration || 'Same Day'}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditServiceClick(s)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Price</span>
                    </button>
                    <button
                      onClick={() => handleDeleteService(s.id, s.title)}
                      className="p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: REPAIR COUNTER / JOBS DISPATCHER */}
      {adminSection === 'repairs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-1 items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search ticket by ID (e.g. MM-5530), client name, or device..."
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowAddTicketModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Repair Ticket</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredTicketsList.map((ticket) => (
              <div 
                key={ticket.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      Ticket #{ticket.id}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Received: {ticket.dateReceived}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      📞 {ticket.clientPhone}
                    </span>
                  </div>

                  <h5 className="text-base font-black text-white">
                    {ticket.clientName} — <span className="text-sky-400 font-bold">{ticket.device}</span>
                  </h5>

                  <p className="text-xs text-slate-300 font-medium">
                    <strong className="text-slate-400">Fault:</strong> {ticket.issue}
                  </p>
                  {ticket.notes && (
                    <p className="text-[11px] text-slate-500 font-mono">
                      Note: {ticket.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Estimated Bill</span>
                    <span className="text-sm font-mono font-black text-emerald-400">
                      Rs {ticket.estimatedPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={ticket.status}
                    onChange={(e) => handleUpdateTicketStatus(ticket.id, e.target.value as any)}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 font-bold uppercase tracking-wider focus:outline-none focus:border-amber-400"
                  >
                    <option value="received">📥 1. Received</option>
                    <option value="diagnosed">🔍 2. Diagnosed</option>
                    <option value="repairing">🛠️ 3. Repairing</option>
                    <option value="testing">⚡ 4. Testing</option>
                    <option value="ready">📦 5. Ready for Pickup</option>
                    <option value="delivered">✅ 6. Delivered</option>
                  </select>

                  {/* WhatsApp Notification to Customer */}
                  <button
                    onClick={() => handleSendTicketWhatsApp(ticket)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-3 py-2 rounded-xl uppercase flex items-center gap-1.5 transition cursor-pointer"
                    title="Send WhatsApp update directly to customer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp Alert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: DAILY SALES LEDGER */}
      {adminSection === 'sales' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-sm font-black text-white uppercase">Daily Sales & POS Quick Ledger</h4>
              <p className="text-xs text-slate-400">
                روزانہ بکنے والا سامان اور نقد / ایزی پیسہ کیش ریکارڈ کریں (Total: Rs {totalSalesRevenue.toLocaleString()})
              </p>
            </div>
            <button
              onClick={() => setShowAddSaleModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record Sale (بکری درج کریں)</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs font-semibold border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-black tracking-wider">
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Item Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Payment Method</th>
                  <th className="p-3.5 text-right">Sale Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-850/40 transition">
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{sale.date}</td>
                    <td className="p-3.5 text-white font-bold">{sale.itemName}</td>
                    <td className="p-3.5 text-slate-300 uppercase text-[10px]">{sale.category}</td>
                    <td className="p-3.5 text-slate-300">{sale.customerName}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-sky-400 border border-slate-800">
                        {sale.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-emerald-400 font-black text-right text-sm">
                      Rs {sale.salePricePKR.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 6: SHOP SETTINGS & PROFILE */}
      {adminSection === 'settings' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Official Shop Profile Info</span>
            </h4>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Shop Owner</span>
                <span className="text-white font-black text-sm">Muhammad Saqib</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Contact Numbers</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">0343-0407210 / 0345-6799101</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Physical Store Address</span>
                <span className="text-white font-semibold">Shop #14, First Floor, Al-Zamin Plaza, Near Shaheed Chowk, Kotli AJK</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Services Specialization</span>
                <span className="text-slate-300">
                  PC Windows Formatting, Virus Solutions, Hardware & Software Upgradation, Data Recovery, Networking Troubleshoot, Printer Repairing, Toner & Cartridge Refilling.
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white uppercase flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-sky-400" />
              <span>Backup, Restore & Reset</span>
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed">
              تمام پروڈکٹس اور سروسز آپ کے براؤزر کے لوکل سٹوریج میں محفوظ رہتی ہیں۔ آپ کسی بھی وقت مکمل ڈیٹا ڈاؤن لوڈ کر کے اپنے پاس بیک اپ رکھ سکتے ہیں۔
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleExportBackup}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Catalog & Sales Backup (JSON)</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span>Reset to Factory Sample Catalog</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-sky-400" />
                <h4 className="text-base font-black text-white uppercase">
                  {editingProduct ? 'Edit Product Details' : 'Add New Computer / Laptop to Showroom'}
                </h4>
              </div>
              <button
                onClick={() => {
                  setShowAddProductModal(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Device Name / Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HP Victus 15, Dell Latitude 7490, Core i5 Gaming"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Used">Used / Refurbished</option>
                    <option value="Gaming">Gaming Laptop / Rig</option>
                    <option value="New">Brand New Box Packed</option>
                    <option value="Desktop">Desktop PC Tower</option>
                    <option value="Accessories">Accessories / Parts</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 85000"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Condition Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Used (9.5/10 Like New), Sealed Box"
                    value={productForm.condition}
                    onChange={(e) => setProductForm({ ...productForm, condition: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Hardware Specifications */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                  Hardware Specifications (ہارڈویئر تفصیلات)
                </span>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Processor (CPU)</label>
                    <input
                      type="text"
                      placeholder="e.g. Core i7 10th Gen / Ryzen 5"
                      value={productForm.cpu}
                      onChange={(e) => setProductForm({ ...productForm, cpu: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">RAM Memory</label>
                    <input
                      type="text"
                      placeholder="e.g. 16GB DDR4 3200MHz"
                      value={productForm.ram}
                      onChange={(e) => setProductForm({ ...productForm, ram: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Storage (SSD/HDD)</label>
                    <input
                      type="text"
                      placeholder="e.g. 512GB NVMe M.2 SSD"
                      value={productForm.storage}
                      onChange={(e) => setProductForm({ ...productForm, storage: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">GPU / Graphics Card (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. NVIDIA RTX 3050 4GB / Intel Iris Xe"
                      value={productForm.gpu}
                      onChange={(e) => setProductForm({ ...productForm, gpu: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Screen / Display</label>
                    <input
                      type="text"
                      placeholder='e.g. 15.6" FHD IPS 144Hz'
                      value={productForm.screen}
                      onChange={(e) => setProductForm({ ...productForm, screen: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Photo selector */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Product Photo (Quick Pick or Enter URL)</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: preset.url })}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        productForm.image === preset.url 
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or paste custom image URL..."
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-300 text-xs"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-500 focus:ring-0"
                  />
                  <span className="font-bold text-white">In Stock (دکان میں موجود)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isPopular}
                    onChange={(e) => setProductForm({ ...productForm, isPopular: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-0"
                  />
                  <span className="font-bold text-amber-400">Featured / Best Seller Badge</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-wider"
                >
                  {editingProduct ? 'Save Changes' : 'Publish to Showroom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SERVICE */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white uppercase">
                {editingService ? 'Edit Service & Rate' : 'Add New Repair Service'}
              </h4>
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BIOS Chip Flashing & Board Repair"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Rate / Cost Range *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Starting Rs 2,500"
                    value={serviceForm.costRange}
                    onChange={(e) => setServiceForm({ ...serviceForm, costRange: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 45 Minutes / Same Day"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Category</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                >
                  <option value="Hardware / Body">Hardware / Body / Hinges</option>
                  <option value="Chip-Level Soldering">Motherboard & Chip Soldering</option>
                  <option value="Screen / Display">Screen & Display Replacement</option>
                  <option value="Power / Battery">Battery & Charging Ports</option>
                  <option value="Software / OS">Windows OS, Formatting & Office</option>
                  <option value="Printers / Toner">Printer Repair & Cartridges</option>
                  <option value="Data Services">Data Recovery & Backup</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Service Description</label>
                <textarea
                  rows={2}
                  placeholder="Detail about the repair equipment and guarantee..."
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BOOK REPAIR TICKET */}
      {showAddTicketModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white uppercase">
                Book Customer Repair Job (ریپیئر ٹوکن بنائیں)
              </h4>
              <button
                onClick={() => setShowAddTicketModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTicket} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Waleed Sajjad"
                    value={ticketForm.clientName}
                    onChange={(e) => setTicketForm({ ...ticketForm, clientName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Customer Phone (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0345-9854123"
                    value={ticketForm.clientPhone}
                    onChange={(e) => setTicketForm({ ...ticketForm, clientPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Device Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dell G15 5530 or HP ProBook 450 G5"
                  value={ticketForm.device}
                  onChange={(e) => setTicketForm({ ...ticketForm, device: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Issue / Fault Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Screen blinking, charging port short, Windows crashed"
                  value={ticketForm.issue}
                  onChange={(e) => setTicketForm({ ...ticketForm, issue: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Estimated Cost (PKR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3500"
                    value={ticketForm.estimatedPrice}
                    onChange={(e) => setTicketForm({ ...ticketForm, estimatedPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Assigned Technician</label>
                  <input
                    type="text"
                    value={ticketForm.technician}
                    onChange={(e) => setTicketForm({ ...ticketForm, technician: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTicketModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase"
                >
                  Create Ticket & Generate ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD QUICK SALE */}
      {showAddSaleModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white uppercase">
                Record Quick Sale (بکری درج کریں)
              </h4>
              <button
                onClick={() => setShowAddSaleModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSale} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Item Sold *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dell Latitude 7490, 8GB DDR4 RAM, Charger"
                  value={saleForm.itemName}
                  onChange={(e) => setSaleForm({ ...saleForm, itemName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Sale Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4500"
                    value={saleForm.salePricePKR}
                    onChange={(e) => setSaleForm({ ...saleForm, salePricePKR: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Payment Method</label>
                  <select
                    value={saleForm.paymentMethod}
                    onChange={(e) => setSaleForm({ ...saleForm, paymentMethod: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  >
                    <option value="Cash">Cash (نقد)</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Customer Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Taimur (Kotli Bazar)"
                  value={saleForm.customerName}
                  onChange={(e) => setSaleForm({ ...saleForm, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddSaleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase"
                >
                  Save to Daily Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
