export interface LaptopItem {
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
  category: 'New' | 'Used' | 'Gaming' | 'Desktop' | 'Accessories';
  isPopular?: boolean;
  inStock?: boolean;
  dateAdded?: string;
}

export interface ShopServiceItem {
  id: string;
  title: string;
  category: string;
  costRange: string;
  desc: string;
  duration: string;
  isPopular?: boolean;
}

export interface RepairTicketItem {
  id: string;
  clientName: string;
  clientPhone: string;
  device: string;
  issue: string;
  dateReceived: string;
  status: 'received' | 'diagnosed' | 'repairing' | 'testing' | 'ready' | 'delivered';
  estimatedPrice: number;
  technician: string;
  notes?: string;
}

export interface QuickSaleRecord {
  id: string;
  date: string;
  itemName: string;
  category: string;
  customerName: string;
  salePricePKR: number;
  paymentMethod: 'Cash' | 'EasyPaisa' | 'JazzCash' | 'Bank Transfer';
}

export const INITIAL_LAPTOPS: LaptopItem[] = [
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
    isPopular: true,
    inStock: true
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
    isPopular: true,
    inStock: true
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
    category: "Used",
    inStock: true
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
    isPopular: true,
    inStock: true
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
    category: "Gaming",
    inStock: true
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
    category: "Used",
    inStock: true
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
    category: "New",
    inStock: true
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
    isPopular: true,
    inStock: true
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
    category: "Gaming",
    inStock: true
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
    category: "New",
    inStock: true
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
    isPopular: true,
    inStock: true
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
    category: "Used",
    inStock: true
  }
];

export const INITIAL_SERVICES: ShopServiceItem[] = [
  {
    id: "srv-screen",
    title: "Display Panels Replacing",
    category: "Screen / Display",
    costRange: "Starting Rs 2,500",
    desc: "Full HD, IPS sRGB and anti-glare screen panels replaced professionally while you check.",
    duration: "45 Minutes",
    isPopular: true
  },
  {
    id: "srv-battery",
    title: "OEM Sourced Batteries",
    category: "Power / Battery",
    costRange: "Starting Rs 2,500",
    desc: "Original long-duration battery cells installed with health calibration testing.",
    duration: "30 Minutes",
    isPopular: true
  },
  {
    id: "srv-hinge",
    title: "Chassis & Hinges Repair",
    category: "Hardware / Body",
    costRange: "Starting Rs 1,500",
    desc: "Cracked plastic casing, brass inserts re-threaded, and tight hinges softened.",
    duration: "2 - 3 Hours"
  },
  {
    id: "srv-board",
    title: "Motherboard IC Micro-Soldering",
    category: "Chip-Level Soldering",
    costRange: "Starting Rs 3,000",
    desc: "Stereo-microscope inspection, shorted capacitor elimination, MOSFET & BIOS flashing.",
    duration: "Same Day / 24 Hours",
    isPopular: true
  },
  {
    id: "srv-thermal",
    title: "Deep Fan Cleaning & Thermal Paste",
    category: "Maintenance",
    costRange: "Starting Rs 1,000",
    desc: "High-grade Arctic MX-4 / MX-6 thermal compound with fan bearing lubrication.",
    duration: "40 Minutes"
  },
  {
    id: "srv-windows",
    title: "PC Windows Formatting & Drivers",
    category: "Software / OS",
    costRange: "Starting Rs 1,000",
    desc: "Clean Windows 10/11 64-bit installation, full driver setup, and MS Office activation.",
    duration: "1 Hour"
  },
  {
    id: "srv-data",
    title: "Data Recovery & Forensic Backups",
    category: "Data Services",
    costRange: "Starting Rs 2,500",
    desc: "Recovery from dead drives, RAW file systems, formatted partitions, and damaged USBs.",
    duration: "24 - 48 Hours"
  },
  {
    id: "srv-printer",
    title: "Printer Repair & Toner Refilling",
    category: "Printers / Toner",
    costRange: "Starting Rs 800",
    desc: "LaserJet toner cartridge refilling, roller replacement, and paper feed fixes.",
    duration: "Same Day"
  }
];

export const INITIAL_TICKETS: RepairTicketItem[] = [
  {
    id: "MM-5530",
    clientName: "Waleed Sajjad",
    clientPhone: "0345-9854123",
    device: "Dell G15 5530 Gaming Laptop",
    issue: "Severe thermal throttling and RAM slot error",
    dateReceived: "14 Oct 2026",
    status: "repairing",
    estimatedPrice: 4500,
    technician: "Muhammad Saqib",
    notes: "Applied Arctic MX-6 paste, secondary RAM upgrade active."
  },
  {
    id: "MM-VICTUS",
    clientName: "Hamza Malik",
    clientPhone: "0312-5544778",
    device: "HP Victus 15 GameEngine",
    issue: "Broken 144Hz screen panel and loose hinge",
    dateReceived: "13 Oct 2026",
    status: "ready",
    estimatedPrice: 14000,
    technician: "Muhammad Saqib",
    notes: "OEM 144Hz panel fitted and calibrated. Customer notified."
  },
  {
    id: "MM-7490",
    clientName: "Sajid Mehmood",
    clientPhone: "0300-8877665",
    device: "Dell Latitude 7490",
    issue: "Corrupted slow HDD, needs SSD & Windows",
    dateReceived: "15 Oct 2026",
    status: "diagnosed",
    estimatedPrice: 4800,
    technician: "Muhammad Saqib",
    notes: "SATA HDD at 12% health. Recommended 256GB NVMe SSD."
  }
];

export const INITIAL_SALES: QuickSaleRecord[] = [
  {
    id: "S-101",
    date: "14 Oct 2026",
    itemName: "Crucial 8GB DDR4 3200MHz RAM",
    category: "RAM",
    customerName: "Taimur Butt",
    salePricePKR: 4200,
    paymentMethod: "Cash"
  },
  {
    id: "S-102",
    date: "13 Oct 2026",
    itemName: "Dell Latitude 7490 Core i5 (Used)",
    category: "Laptop",
    customerName: "Prof. Zahid (Kotli College)",
    salePricePKR: 42000,
    paymentMethod: "EasyPaisa"
  },
  {
    id: "S-103",
    date: "12 Oct 2026",
    itemName: "Samsung 980 500GB NVMe SSD",
    category: "SSD",
    customerName: "Nabeel Akhtar",
    salePricePKR: 9500,
    paymentMethod: "Cash"
  }
];

// Local Storage Helper utilities
export const getStoredLaptops = (): LaptopItem[] => {
  try {
    const raw = localStorage.getItem('mm_shop_laptops');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading laptops from localStorage', e);
  }
  return INITIAL_LAPTOPS;
};

export const saveStoredLaptops = (list: LaptopItem[]): void => {
  try {
    localStorage.setItem('mm_shop_laptops', JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving laptops to localStorage', e);
  }
};

export const getStoredServices = (): ShopServiceItem[] => {
  try {
    const raw = localStorage.getItem('mm_shop_services');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading services from localStorage', e);
  }
  return INITIAL_SERVICES;
};

export const saveStoredServices = (list: ShopServiceItem[]): void => {
  try {
    localStorage.setItem('mm_shop_services', JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving services to localStorage', e);
  }
};

export const getStoredTickets = (): RepairTicketItem[] => {
  try {
    const raw = localStorage.getItem('mm_shop_tickets');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading tickets from localStorage', e);
  }
  return INITIAL_TICKETS;
};

export const saveStoredTickets = (list: RepairTicketItem[]): void => {
  try {
    localStorage.setItem('mm_shop_tickets', JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving tickets to localStorage', e);
  }
};

export const getStoredSales = (): QuickSaleRecord[] => {
  try {
    const raw = localStorage.getItem('mm_shop_sales');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading sales from localStorage', e);
  }
  return INITIAL_SALES;
};

export const saveStoredSales = (list: QuickSaleRecord[]): void => {
  try {
    localStorage.setItem('mm_shop_sales', JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving sales to localStorage', e);
  }
};
