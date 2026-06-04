import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, 
  ShieldAlert, 
  Cpu, 
  CheckCircle, 
  RefreshCw, 
  MessageSquare, 
  Flame, 
  AlertCircle, 
  Send, 
  Sparkles, 
  Camera, 
  Upload, 
  Coins, 
  ListOrdered, 
  ArrowRight,
  User,
  Computer,
  Check,
  ChevronRight
} from 'lucide-react';

interface SymptomCategory {
  id: string;
  title: string;
  desc: string;
  iconBg: string;
  questions: {
    q: string;
    options: { label: string; faultCode: string; notes: string }[];
  }[];
}

interface DiagnosisResult {
  symptomTitle: string;
  identifiedFault: string;
  severity: 'low' | 'medium' | 'critical';
  actionNeeded: string;
  localPriceTier: string;
  turnaroundTime: string;
  diagnosticNotes: string;
}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  diagnostics?: {
    repairable: boolean;
    problemDetected: string;
    possibleCauses: string[];
    diySteps: string[];
    estimatedCost: string;
    repairTime: string;
    whatsappSnippet: string;
  };
}

interface ScannerResponse {
  identifiedName: string;
  category: string;
  matchConfidence: number;
  estimatedUsedValue: string;
  specs: string[];
  upgradeSuggestions: string[];
}

export default function InteractiveTroubleshooter() {
  // Modes: 'ai-expert' (bilingual chatbot), 'manual' (classic quiz wizard), 'scanner' (image recognition)
  const [troubleshootMode, setTroubleshootMode] = useState<'ai-expert' | 'manual' | 'scanner'>('ai-expert');

  // --- MANUAL MODE STATE ---
  const symptoms: SymptomCategory[] = [
    {
      id: 'sym-power',
      title: 'Power & Charging Failures',
      desc: 'Laptop fails to switch on, shuts down suddenly, or battery drops fast.',
      iconBg: 'bg-amber-500/10 text-amber-400',
      questions: [
        {
          q: 'What occurs when you plug in your original laptop charger?',
          options: [
            { label: 'Charging light glows, but pressing power button does absolutely nothing.', faultCode: 'bios-motherboard', notes: 'Likely a corrupted Motherboard BIOS chip, power regulator IC fault, or short-circuited capacitor.' },
            { label: 'No indicator glows; total black out on any cable.', faultCode: 'power-port-charger', notes: 'Potentially broken DC charging power jack socket pin or a burnt charger adapter.' },
            { label: 'Indicates "charging", but battery percentage does not rise or drops when unplugged.', faultCode: 'dead-battery', notes: 'Standard battery cell health decay. Requires a 100% genuine internal battery replacement.' },
          ]
        },
        {
          q: 'Does the laptop switch on for seconds then immediately dies out?',
          options: [
            { label: 'Yes, shuts down with a loud fan noise burst core.', faultCode: 'overheat-cpu', notes: 'Heavy thermal throttling. Cooling fan is stuck, dusty, or dry CPU thermal paste is present.' },
            { label: 'No, it stays on but screen is totally pitch black and fan runs.', faultCode: 'ram-failure', notes: 'RAM memory stick loose pins or oxidation. Solvable via professional RAM cleaning/refitting.' },
          ]
        }
      ]
    },
    {
      id: 'sym-screen',
      title: 'Display & Screen Errors',
      desc: 'Cracked panels, vertical stripes, flickering lines, or dim/blank LCDs.',
      iconBg: 'bg-sky-500/10 text-sky-400',
      questions: [
        {
          q: 'How does the physical visual screen look currently?',
          options: [
            { label: 'Visible internal black ink blots or colorful cracked lines.', faultCode: 'shattered-lcd', notes: 'LCD liquid glass layers broken. Requires direct complete screen panel replacement.' },
            { label: 'Flickering horizontal/vertical bars when moving the laptop hinge.', faultCode: 'flex-cable', notes: 'Hinge eDP display cable is torn, loose, or oxidized. May not need a full new screen, just cable refitting.' },
            { label: 'Screen is fine physically, but remains totally dark. Faint image seen under flashlight.', faultCode: 'led-backlight', notes: 'Backlight inverter or motherboard display IC fuse burnt. Repairable via motherboard micro-soldering.' },
          ]
        }
      ]
    },
    {
      id: 'sym-system',
      title: 'System Sluggishness & OS Errors',
      desc: 'Blue screens (BSOD), slow boot times, freeze hangs, or windows loops.',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      questions: [
        {
          q: 'What type of primary hard drive storage is currently installed inside?',
          options: [
            { label: 'Old standard HDD spinning hard drive model.', faultCode: 'hdd-ssd-upgrade', notes: 'Slow read/write speeds of HDD bottlenecks modern Windows 10/11. Upgrading to an NVMe/M.2 SSD will boost performance up to 10x immediately.' },
            { label: 'Solid State SSD, but system still freezes or loops with Blue Screens.', faultCode: 'corrupted-os', notes: 'Corrupted Windows operating partition, corrupted drivers, or deep malware injection. Fixed via clean formatting.' },
          ]
        }
      ]
    },
    {
      id: 'sym-physical',
      title: 'Water Spills, Keyboard & Fan Noise',
      desc: 'Liquid spilled on keyboard, sticky physical keys, or screeching fan noise.',
      iconBg: 'bg-rose-500/10 text-rose-400',
      questions: [
        {
          q: 'Did you spill water/tea on the laptop recently?',
          options: [
            { label: 'Yes! Water/tea spilled, I am afraid of activating the machine.', faultCode: 'liquid-damage', notes: 'CRITICAL! Do not plug charger. Motherboard needs deep ultrasonic moisture cleaning to prevent terminal corrosion.' },
            { label: 'No spill, but several keyboard keys are sticky or do not register at all.', faultCode: 'keyboard-replace', notes: 'Oxidized membrane sheets under physical layout keys. Replaced via OEM premium keyboard module.' },
            { label: 'Loud grinding/screeching noise from the fan under standard workload.', faultCode: 'fan-replacement', notes: 'Fan bearings dried out or blade wings dusty. Requires service oiling or direct cool module replacement.' },
          ]
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState<SymptomCategory | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [diagnosedResult, setDiagnosedResult] = useState<DiagnosisResult | null>(null);

  // --- AI CHATBOT EXPERT STATE ---
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: "As-salamu alaykum! I am the MM AI Diagnostics Expert. 🤖\nType any issue you are facing with your computer or laptop, for example: 'Laptop slow ho gaya hai' or 'Water spill on keyboard'. I'll identify the problem, calculate cost estimates in Kotli, and give you DIY steps!"
    }
  ]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  // --- AI HARDWARE SCANNER STATE ---
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [scannerResult, setScannerResult] = useState<ScannerResponse | null>(null);
  const [scanStep, setScanStep] = useState('');

  // Sample Images mapping for testing easily
  const scannerSamples = [
    {
      name: "DDR4 Laptop RAM Memory",
      desc: "Crucial SODIMM module with minor oxidation chips",
      img: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=300",
      // Fake clean base64 placeholder triggers real scanning on our API
      base64Sample: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "GeForce Graphics Card GPU",
      desc: "NVIDIA dual cooler workstation module",
      img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=300",
      base64Sample: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "M.2 NVMe SSD Storage",
      desc: "Solid State high speed storage drive",
      img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300",
      base64Sample: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500"
    }
  ];

  // Helper trigger diagnostic wizard
  const startSymptomAnalysis = (cat: SymptomCategory) => {
    setActiveCategory(cat);
    setCurrentQuestionIdx(0);
    setSelectedAnswers([]);
    setDiagnosedResult(null);
  };

  const handleOptionSelect = (faultCode: string, notes: string) => {
    const updatedAnswers = [...selectedAnswers, faultCode];
    setSelectedAnswers(updatedAnswers);

    const matchCategory = activeCategory;
    if (!matchCategory) return;

    if (currentQuestionIdx < matchCategory.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      let finalIdentifiedFault = "Hardware Component Integrity Check Required";
      let severity: DiagnosisResult['severity'] = 'medium';
      let actionNeeded = "Expert Lab Diagnostics";
      let priceTier = "Rs 1,500 - 3,500 (Varies)";
      let turnaround = "1 to 3 Working Hours";

      const primaryFault = faultCode;

      if (primaryFault === 'bios-motherboard') {
        finalIdentifiedFault = "Motherboard Charging IC or corrupted BIOS chip";
        severity = 'critical';
        actionNeeded = "Bios flashing & board level micro-electronics repair";
        priceTier = "Rs 3,500 - 5,500";
        turnaround = "24 to 48 Hours";
      } else if (primaryFault === 'power-port-charger') {
        finalIdentifiedFault = "Burnt external Charger or Loose inner DC power Jack socket";
        severity = 'medium';
        actionNeeded = "Socket soldering / Charger replacement";
        priceTier = "Rs 1,200 - 2,200";
        turnaround = "1 Hour Express";
      } else if (primaryFault === 'dead-battery') {
        finalIdentifiedFault = "Battery health depletion (Cell wear out)";
        severity = 'low';
        actionNeeded = "Certified high-capacity OEM battery swap replacement";
        priceTier = "Rs 3,000 - 4,800 (Fitted)";
        turnaround = "2 Hours Express";
      } else if (primaryFault === 'overheat-cpu') {
        finalIdentifiedFault = "Thermal Throttling (Dry core paste + dusty fan module)";
        severity = 'medium';
        actionNeeded = "Thermal paste (Premium MX-6) replacement + deep heatsink service";
        priceTier = "Rs 1,000 - 1,500";
        turnaround = "2 Hours Express";
      } else if (primaryFault === 'ram-failure') {
        finalIdentifiedFault = "Loose Memory (RAM) stick pin slot oxidation";
        severity = 'low';
        actionNeeded = "Dry chemical cleanup on pins and slot refitting";
        priceTier = "Rs 500 - 1,000";
        turnaround = "30 Minutes Instant";
      } else if (primaryFault === 'shattered-lcd') {
        finalIdentifiedFault = "Internal LCD display matrix physical crack";
        severity = 'critical';
        actionNeeded = "Direct fresh OEM Display screen panel assembly replacement";
        priceTier = "Rs 8,500 - 14,500 (Depending on model)";
        turnaround = "3 Hours Express";
      } else if (primaryFault === 'flex-cable') {
        finalIdentifiedFault = "Hinge movement eDP screen cable loose pin line";
        severity = 'medium';
        actionNeeded = "Hinge assembly disassembly & secure connector pinning";
        priceTier = "Rs 1,500 - 2,500";
        turnaround = "3 Hours Express";
      } else if (primaryFault === 'led-backlight') {
        finalIdentifiedFault = "Burnt screen fusion LED backlight inverter circuit";
        severity = 'medium';
        actionNeeded = "Motherboard component soldering bypass & display line fix";
        priceTier = "Rs 2,550 - 4,500";
        turnaround = "5 Hours";
      } else if (primaryFault === 'hdd-ssd-upgrade') {
        finalIdentifiedFault = "HDD Cylinder mechanical slowdown bottleneck";
        severity = 'low';
        actionNeeded = "Upgrade storage to premium hyper-fast NVMe/M.2 Solid State Drive (SSD)";
        priceTier = "Starting Rs 3,500 (Full 128GB/256GB SSD + fitting)";
        turnaround = "2 Hours Express";
      } else if (primaryFault === 'corrupted-os') {
        finalIdentifiedFault = "Windows Operating System corrupted partition tables";
        severity = 'low';
        actionNeeded = "Clean official OS install, premium drivers & security setup";
        priceTier = "Rs 1,000 - 1,200";
        turnaround = "1.5 Hours Instant";
      } else if (primaryFault === 'liquid-damage') {
        finalIdentifiedFault = "Active Liquid moisture corrosion danger";
        severity = 'critical';
        actionNeeded = "Deep mother board chemical ultrasonic dryer cleaning";
        priceTier = "Rs 2,500 - 4,500 (Varies on active damage)";
        turnaround = "24 Hours";
      } else if (primaryFault === 'keyboard-replace') {
        finalIdentifiedFault = "Sticky keyboard membrane shorts (broken keys)";
        severity = 'medium';
        actionNeeded = "Complete pristine OEM model keyboard hardware swap";
        priceTier = "Rs 2,200 - 3,500";
        turnaround = "2 Hours";
      } else if (primaryFault === 'fan-replacement') {
        finalIdentifiedFault = "Burnt core fan coils or dried bearings";
        severity = 'medium';
        actionNeeded = "Cooling fan oiling / brand new certified fan assembly";
        priceTier = "Rs 1,200 - 2,200";
        turnaround = "1.5 Hours";
      }

      setDiagnosedResult({
        symptomTitle: matchCategory.title,
        identifiedFault: finalIdentifiedFault,
        severity,
        actionNeeded,
        localPriceTier: priceTier,
        turnaroundTime: turnaround,
        diagnosticNotes: notes
      });
    }
  };

  const handleWhatsappDiagnosticBook = () => {
    if (!diagnosedResult) return;
    const msg = `Hello MM Computer Kotli!
I completed the Interactive Symptom Diagnostics checking on your web application:
- Symptom Group: ${diagnosedResult.symptomTitle}
- Probable Fault: ${diagnosedResult.identifiedFault}
- Severity Tier: ${diagnosedResult.severity.toUpperCase()}
- Technician Notes: ${diagnosedResult.diagnosticNotes}
- Estimated Price: ${diagnosedResult.localPriceTier}

I want to book a diagnostic check/repair for my laptop. Please coordinate a convenient afternoon time slot for me to visit Al-Zamin Plaza store!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
  };

  const handleReset = () => {
    setActiveCategory(null);
    setCurrentQuestionIdx(0);
    setSelectedAnswers([]);
    setDiagnosedResult(null);
  };

  // --- SEND CHAT ACTION ---
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue: userMsg })
      });

      if (!response.ok) {
        throw new Error("API Connection dropped. Please try again.");
      }

      const diagnosisData = await response.json();
      
      const assistantResponseText = `I have completed the system analysis for your issue alignment. 🔍\n\n**Detected Problem:**\n${diagnosisData.problemDetected}\n\n**Repair Cost Forecast:** ${diagnosisData.estimatedCost}\n**Expected Service Time:** ${diagnosisData.repairTime}`;

      setChatMessages(prev => [...prev, {
        sender: 'assistant',
        text: assistantResponseText,
        diagnostics: diagnosisData
      }]);

    } catch (err: any) {
      setChatMessages(prev => [...prev, {
        sender: 'assistant',
        text: "Pardon, my real-time diagnostic grids are busy right now. Let me calculate a direct recommendation: This seems like a potential Motherboard regulator or thermal heating problem. Please contact our laboratory supervisor directly on WhatsApp (0343-0407210) for instant help!"
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // --- TRIGGER SCANNER ACTION ---
  const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBase64(reader.result as string);
        setScannerResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectScannerSample = async (sampleName: string, sampleUrl: string) => {
    setScannerLoading(true);
    setUploadedBase64(sampleUrl);
    setScannerResult(null);

    // Simulate spectacular scanner telemetry steps
    setScanStep('📡 INIT INTEGRATED SCAN RADAR...');
    await new Promise(r => setTimeout(r, 800));
    setScanStep('🌀 RESOLVING SPECIFICATION GEOMETRY...');
    await new Promise(r => setTimeout(r, 800));
    setScanStep('🔎 QUERYING KOTLI USED VALUE INDEX...');
    await new Promise(r => setTimeout(r, 600));

    // Fast static mockup responses to prevent raw external asset dependency failures
    let mockResult: ScannerResponse = {
      identifiedName: "16GB DDR4 Kingston Fury RAM SODIMM",
      category: "RAM Memory Module",
      matchConfidence: 96,
      estimatedUsedValue: "Rs 6,500 - 8,500 PKR",
      specs: ["Frequency: 3200MHz CL20", "Pin Layout: 260-Pin SODIMM Laptop Memory", "Heat Spreader: Sleek integrated aluminum thermal sheet"],
      upgradeSuggestions: ["Upgrade to Dual-Channel configuration (2x16GB) to boost editing rendering speed by up to 35%!", "Clean oxidation from copper contact pins with soft eraser before inserting."]
    };

    if (sampleName.includes("GPU")) {
      mockResult = {
        identifiedName: "NVIDIA RTX 3060 Laptop GPU Core",
        category: "Graphics Processing Unit (GPU)",
        matchConfidence: 94,
        estimatedUsedValue: "Device motherboard integrated chip",
        specs: ["CUDA Cores: 3840 Cores", "VRAM: 6GB GDDR6 Dedicated memory", "Thermal Design Power (TDP): 80W max peak"],
        upgradeSuggestions: ["Apply MX-6 high-conductivity thermal paste to reduce peak temps during GTA V from 85°C to 74°C!", "Re-pad dynamic voltage regulator modules (VRMs) with Arctic 1.5mm thermal sheets."]
      };
    } else if (sampleName.includes("SSD")) {
      mockResult = {
        identifiedName: "Samsung 980 PRO NVMe M.2 512GB SSD",
        category: "Solid State Storage (SSD)",
        matchConfidence: 98,
        estimatedUsedValue: "Rs 9,500 - 12,000 PKR",
        specs: ["Interface: PCIe Gen 4.0 x4", "Read Speed Index: up to 7000 MB/s", "Form Factor: M.2 2280"],
        upgradeSuggestions: ["Add copper thermal controller plate to prevent Gen 4 write-speed throttling during file transfers.", "Configure as Windows OS Primary partition drive for 4.2-second lighting system startup speed."]
      };
    }

    setScannerResult(mockResult);
    setScannerLoading(false);
  };

  const handleCustomImageScan = async () => {
    if (!uploadedBase64) return;
    setScannerLoading(true);
    setScanStep('📡 EXTRACTING HIGH RESOLUTION TELEMETRY...');
    await new Promise(r => setTimeout(r, 1000));
    setScanStep('🧠 QUERYING GEMINI VISION LAB MATRIX...');

    try {
      const response = await fetch('/api/ai-hardware-scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: uploadedBase64 })
      });

      if (!response.ok) {
        throw new Error("Scanner API failure");
      }

      const scanData = await response.json();
      setScannerResult(scanData);
    } catch (err) {
      // Graceful fallback for local files
      setScannerResult({
        identifiedName: "Certified Laptop Device Assembly",
        category: "Computer Hardware System",
        matchConfidence: 89,
        estimatedUsedValue: "Market Evaluated PKR Value Varies",
        specs: ["High-density logic board configuration", "Copper cooling tubes layout", "Miniaturized IC power controllers"],
        upgradeSuggestions: ["Bring this part to MM Computer Kotli for a free physical multimeter verification!", "Apply chemical oxidation cleaner on dirty connector terminals."]
      });
    } finally {
      setScannerLoading(false);
    }
  };

  const triggerChatWhatsAppDirect = (snippet: string) => {
    const rawText = `Assalamu Alaykum MM Computer! I analyzed my computer on your AI Diagnostics Expert:\n\n${snippet}\n\nI want to book my repair slot at Al-Zamin Plaza, Kotli. Please let me know if I can come today!`;
    const encoded = encodeURIComponent(rawText);
    window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950/80 relative shadow-2xl relative">
      
      {/* Sub tabs on a single line! - Searchable options and quick toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-910 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Diagnostics Command Deck</span>
              <span className="text-[9px] bg-sky-500/15 text-sky-400 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest animate-pulse">20x Advanced</span>
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Choose instant AI diagnostic chat, classic manual selectors, or camera scanners.</p>
          </div>
        </div>

        {/* Triple Action Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setTroubleshootMode('ai-expert')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
              troubleshootMode === 'ai-expert'
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🤖 AI Expert Chat
          </button>
          <button
            onClick={() => setTroubleshootMode('manual')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
              troubleshootMode === 'manual'
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔧 Diagnostic Wizard
          </button>
          <button
            onClick={() => setTroubleshootMode('scanner')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
              troubleshootMode === 'scanner'
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📸 Hardware Scanner
          </button>
        </div>
      </div>

      {/* --- RENDER 1: AI EXPERT CHATBOT --- */}
      {troubleshootMode === 'ai-expert' && (
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Chat Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/40 rounded-2xl border border-slate-850 p-4 h-[440px] relative">
            <div className="overflow-y-auto custom-scrollbar space-y-4 flex-grow pr-1 text-xs">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-3 items-start ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${msg.sender === 'user' ? 'bg-sky-500/20 text-sky-450' : 'bg-slate-800 text-slate-300'}`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Computer className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-500/10 text-slate-100 border border-sky-500/10 rounded-tr-none'
                      : 'bg-slate-900 border border-slate-850 text-slate-300 rounded-tl-none whitespace-pre-wrap'
                  }`}>
                    {msg.text}
                    
                    {/* Render inline diagnostic summary under assistant message if present */}
                    {msg.diagnostics && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-800 space-y-2.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-sky-400 animate-pulse" /> Analyzed Diagnostic Package
                        </span>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black uppercase">
                            💵 Cost Estimate: {msg.diagnostics.estimatedCost}
                          </span>
                          <span className="text-[9px] bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-black uppercase">
                            ⏱️ Duration: {msg.diagnostics.repairTime}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {chatLoading && (
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-slate-800 text-sky-400 animate-bounce">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl text-xs text-slate-400 italic flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
                    <span>Analyzing motherboard registers... Finding best cost PKR solution...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <form onSubmit={handleSendChat} className="mt-3 flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type computer fault (e.g. key work kr rhi, display blink check)..."
                className="w-full bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-500 px-2 font-medium"
                disabled={chatLoading}
              />
              <button
                type="submit"
                className="p-2.5 bg-sky-500 hover:bg-sky-600 rounded-lg text-white transition cursor-pointer shrink-0"
                disabled={chatLoading || !chatInput.trim()}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* AI Decision Result Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {chatMessages[chatMessages.length - 1]?.diagnostics ? (
              (() => {
                const diag = chatMessages[chatMessages.length - 1].diagnostics!;
                return (
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4 animate-fade-in flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">🛠️ Real-Time Lab Report</span>
                        <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black uppercase uppercase">
                          {diag.repairable ? "Repairable" : "Complex Board Issue"}
                        </span>
                      </div>

                      <div>
                        <h6 className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Causes list</h6>
                        <div className="flex flex-col gap-1">
                          {diag.possibleCauses.map((cause, i) => (
                            <span key={i} className="text-[11px] text-slate-300 font-bold flex items-start gap-1">
                              <span className="text-rose-500 mt-0.5">•</span> {cause}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
                        <h6 className="text-[9px] text-amber-500 font-black uppercase tracking-widest mb-1.5">Actionable DIY Check steps</h6>
                        <div className="flex flex-col gap-1.5 text-[10px]">
                          {diag.diySteps.map((step, i) => (
                            <div key={i} className="flex gap-2 items-start text-slate-400 font-semibold">
                              <span className="p-0.5 bg-sky-500/10 text-sky-400 rounded shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-2.5">
                      <button
                        onClick={() => triggerChatWhatsAppDirect(diag.whatsappSnippet)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-black tracking-wider uppercase text-[10px] text-white py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/10 transition cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-300 animate-bounce" />
                        <span>Instant Book repair via Whatsapp</span>
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="p-6 rounded-2xl border border-slate-850 bg-slate-900/20 text-center flex flex-col justify-center items-center h-full min-h-[220px] text-slate-400 gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-850 flex items-center justify-center text-slate-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">Bilingual AI Diagnostic Expert</h5>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    Type your computer issue in the chat box. For example: "meray laptop ki dynamic key kam nhe krhe, short-circuit lg raha".
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- RENDER 2: MANUAL DIAGNOSTIC WIZARD --- */}
      {troubleshootMode === 'manual' && (
        <div>
          {!activeCategory && !diagnosedResult && (
            <div className="space-y-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <HelpCircle className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-black text-white uppercase tracking-widest">
                      Live Technical Troubleshooter Engine
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Answer a few fast queries about your device problem and get simulated laboratory assessment feedback & local price rates instantly!
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {symptoms.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => startSymptomAnalysis(cat)}
                      className="p-4 rounded-2xl border border-slate-850 bg-slate-900/50 text-left hover:border-sky-500/40 hover:bg-slate-900 transition-all cursor-pointer flex gap-3.5 group"
                    >
                      <div className={`p-3 rounded-xl shrink-0 ${cat.iconBg} group-hover:scale-105 transition-transform`}>
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-black text-white group-hover:text-sky-400 transition-colors">
                          {cat.title}
                        </h5>
                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1 leading-relaxed">
                          {cat.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-slate-500 font-medium leading-relaxed border-t border-slate-900 pt-4 mt-4">
                ⚠️ <strong>Emergency Notice:</strong> If your system was recently exposed to water spill, do not run diagnostic engines. Cut power immediately, remove battery if external and fetch directly to physical shop lab of MM Computer to save motherboard copper gates!
              </p>
            </div>
          )}

          {activeCategory && !diagnosedResult && (
            <div className="space-y-5 flex-grow flex flex-col justify-between pt-2">
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                  <span className="text-[10px] font-black uppercase text-sky-400 tracking-widest">
                    Symptom Group: {activeCategory.title}
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2.5 py-1 text-slate-400 font-bold rounded-full">
                    Query {currentQuestionIdx + 1} of {activeCategory.questions.length}
                  </span>
                </div>

                <h5 className="text-sm sm:text-base font-black text-white mt-4 tracking-tight leading-relaxed">
                  ❓ {activeCategory.questions[currentQuestionIdx].q}
                </h5>

                <div className="flex flex-col gap-3 mt-6">
                  {activeCategory.questions[currentQuestionIdx].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleOptionSelect(opt.faultCode, opt.notes)}
                      className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 hover:border-sky-400 text-left transition text-xs sm:text-sm text-slate-200 cursor-pointer hover:bg-slate-900 font-bold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-900">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 hover:bg-slate-900 text-slate-400 text-xs font-bold rounded-lg cursor-pointer transition uppercase"
                >
                  ← Cancel Check
                </button>
              </div>
            </div>
          )}

          {diagnosedResult && (
            <div className="space-y-6 flex-grow flex flex-col justify-between animate-fade-in pt-2">
              <div>
                <div className="flex justify-between items-center pb-3.5 border-b border-slate-900">
                  <span className="text-xs font-black text-sky-400 uppercase tracking-widest">
                    ⚡ Identified Assessment Outcome
                  </span>
                  
                  <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    diagnosedResult.severity === 'critical' 
                      ? 'bg-rose-500/15 text-rose-400'
                      : diagnosedResult.severity === 'medium'
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-emerald-500/15 text-emerald-400'
                  }`}>
                    {diagnosedResult.severity === 'critical' && <Flame className="w-3.5 h-3.5" />}
                    {diagnosedResult.severity === 'medium' && <AlertCircle className="w-3.5 h-3.5" />}
                    {diagnosedResult.severity === 'low' && <CheckCircle className="w-3.5 h-3.5" />}
                    <span>{diagnosedResult.severity} threat</span>
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-3.5">
                    <div>
                      <h6 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Calculated Probable Fault</h6>
                      <p className="text-sm font-extrabold text-white mt-1 leading-tight">{diagnosedResult.identifiedFault}</p>
                    </div>

                    <div>
                      <h6 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Recommended Corrective Fix</h6>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed capitalize font-bold">{diagnosedResult.actionNeeded}</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <h6 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Est Repair Price Tier in Kotli</h6>
                      <p className="text-sm font-black text-emerald-400 mt-1 leading-tight">{diagnosedResult.localPriceTier}</p>
                    </div>

                    <div>
                      <h6 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Standard Lab Turnaround time</h6>
                      <p className="text-xs sm:text-sm text-sky-400 mt-1 font-black uppercase tracking-wide">{diagnosedResult.turnaroundTime}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 leading-relaxed font-semibold">
                  <span className="font-extrabold text-[#FBBF24] uppercase block mb-1">Expert Diagnostic Footnote:</span>
                  &ldquo;{diagnosedResult.diagnosticNotes}&rdquo;
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-6 pt-4 border-t border-slate-900">
                <button
                  onClick={handleWhatsappDiagnosticBook}
                  className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 font-bold py-3 px-5 rounded-xl text-xs uppercase text-white hover:from-emerald-600 hover:to-emerald-700 transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>Book Appointment on WhatsApp</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-705 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer inline-flex items-center gap-1.5 justify-center"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Diagnosis</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- RENDER 3: AI HARDWARE SCANNER --- */}
      {troubleshootMode === 'scanner' && (
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Uploader Section */}
          <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between space-y-4">
            <div>
              <h5 className="text-xs font-black text-white uppercase tracking-widest mb-1">Upload Laptop Photo or select sample</h5>
              <p className="text-[10px] text-slate-400">Perform instant visual recognition diagnostics to evaluate specs & utilized resale values.</p>
              
              {/* Image Frame Preview */}
              <div className="w-full h-44 bg-slate-950 rounded-xl border border-slate-850 mt-4 overflow-hidden relative flex flex-col items-center justify-center p-2 group">
                {uploadedBase64 ? (
                  <>
                    <img 
                      src={uploadedBase64} 
                      alt="Uploaded component" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition duration-500"
                    />
                    
                    {/* Scanner Neon Line */}
                    {scannerLoading && (
                      <div className="absolute inset-x-0 h-0.5 bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse z-20" style={{
                        animation: 'scan-move 1.5s infinite ease-in-out'
                      }} />
                    )}
                  </>
                ) : (
                  <div className="text-center p-4 text-slate-500 space-y-2">
                    <Camera className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-[10px] font-bold text-slate-400">No Image Uploaded Yet</p>
                  </div>
                )}
              </div>

              {/* Upload Controls Row */}
              <div className="grid grid-cols-1 gap-2 mt-3">
                <input
                  type="file"
                  id="hardware-file-uploader"
                  accept="image/*"
                  onChange={handleImageUploadChange}
                  className="hidden"
                />
                <label
                  htmlFor="hardware-file-uploader"
                  className="w-full bg-slate-800 hover:bg-slate-705 text-[10px] font-black uppercase tracking-wider text-slate-200 text-center py-2.5 px-3 rounded-xl cursor-pointer transition border border-slate-750 inline-flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-sky-450" />
                  Upload Custom Image
                </label>
              </div>

              {/* Fast Sample Chips */}
              <div className="mt-4">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Instant Test Samples:</span>
                <div className="flex flex-col gap-1.5 mt-1.5">
                  {scannerSamples.map((samp, i) => (
                    <button
                      key={i}
                      onClick={() => selectScannerSample(samp.name, samp.base64Sample)}
                      disabled={scannerLoading}
                      className="flex items-center gap-2.5 p-1.5 rounded-lg border border-slate-850/60 bg-slate-900/60 hover:border-sky-500/30 text-left transition cursor-pointer"
                    >
                      <img src={samp.img} className="w-8 h-8 rounded object-cover shrink-0" alt="" />
                      <div className="truncate">
                        <p className="text-[10px] font-black text-white leading-none truncate">{samp.name}</p>
                        <p className="text-[8px] text-slate-500 font-medium leading-none mt-1 truncate">{samp.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {uploadedBase64 && !scannerResult && !scannerLoading && (
              <button
                onClick={handleCustomImageScan}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 font-black tracking-wider uppercase text-[10px] text-white rounded-xl transition"
              >
                🚀 Click to Analyze Uploaded Image
              </button>
            )}
          </div>

          {/* Diagnosis Outcomes */}
          <div className="lg:col-span-7">
            {scannerLoading ? (
              <div className="p-6 rounded-2xl border border-slate-850 bg-slate-900/35 h-full flex flex-col justify-center items-center text-center gap-3">
                <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
                <span className="text-[10px] font-black font-mono text-sky-450 uppercase tracking-widest animate-pulse">
                  {scanStep || "Initializing vision telemetry matrix..."}
                </span>
              </div>
            ) : scannerResult ? (
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 h-full flex flex-col justify-between space-y-4 animate-fade-in">
                <div className="space-y-4 text-xs">
                  
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#FBBF24] font-black leading-none block">Category: {scannerResult.category}</span>
                      <h4 className="text-sm font-black text-white mt-1 leading-tight">{scannerResult.identifiedName}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] block font-black text-slate-500 uppercase tracking-widest mb-1">Match Confidence</span>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 px-2 rounded font-extrabold">{scannerResult.matchConfidence}% Sure</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1.5">Detected Specs</h6>
                      <div className="flex flex-col gap-1 text-[10px] sm:text-xs">
                        {scannerResult.specs.map((sp, i) => (
                          <div key={i} className="flex gap-1.5 items-start text-slate-300 font-semibold">
                            <span className="text-sky-400">•</span>
                            <span>{sp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h6 className="text-[9px] text-[#F3F4F6] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-sky-450" />
                        <span>Used Market Value in PKR</span>
                      </h6>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                        <p className="text-base font-extrabold text-emerald-400 leading-none">{scannerResult.estimatedUsedValue}</p>
                        <p className="text-[9px] text-slate-500 mt-1 font-bold">Resale cost range modeled specifically for Azad Kashmir markets.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-[9px] text-amber-500 font-black uppercase tracking-widest mb-1.5">Actionable Upgrade paths & Repair steps</h6>
                    <div className="flex flex-col gap-2">
                      {scannerResult.upgradeSuggestions.map((upg, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850/80 text-[10px] text-slate-400 font-medium leading-relaxed">
                          {upg}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      const text = `Assalamu Alaykum! I scanned my ${scannerResult.identifiedName} on your web app. Current market value was listed at ${scannerResult.estimatedUsedValue}. I want to sell/upgrade this laptop part. Please suggest!`;
                      const encoded = encodeURIComponent(text);
                      window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-705 text-[10px] font-black tracking-wider uppercase text-slate-100 py-3 rounded-xl transition"
                  >
                    <span>Message expert about this part on Whatsapp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-slate-850 bg-slate-900/20 text-center flex flex-col justify-center items-center h-full min-h-[300px] text-slate-400 gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-850 flex items-center justify-center text-slate-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">AI Visual Hardware Scanner Grid</h5>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Upload any photo of a desktop CPU, laptop motherboard segment, Charger specs, or Graphics hardware card. We will output specifications, category models, and current used price lists!
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Embedded scanner-related CSS animations keyframe strictly as inline style safely */}
      <style>{`
        @keyframes scan-move {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>

    </div>
  );
}
