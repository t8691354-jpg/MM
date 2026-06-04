import React, { useState } from 'react';
import { 
  User, 
  Wrench, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  RefreshCw, 
  ArrowRight, 
  Smartphone, 
  ShieldCheck,
  FileText
} from 'lucide-react';

interface SavedQuote {
  id: string;
  name: string;
  partsSummary: string;
  totalCostPKR: number;
  date: string;
}

interface RepairTicket {
  id: string;
  deviceName: string;
  issue: string;
  regDate: string;
  currentStep: number; // 1 to 5
  costEstimatePKR: number;
  assignedTechnician: string;
}

export default function CustomerDashboard() {
  // Mock customer info
  const customerProfile = {
    name: "Kamran Khan (Resident, Kotli Hub)",
    phone: "0345-9854XXX",
    rank: "Elite Explorer Club",
    avatarBg: "bg-gradient-to-r from-sky-505 to-sky-600/80"
  };

  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([
    {
      id: 'q-902',
      name: "High Dynamic Editing Setup Ryzen 7",
      partsSummary: "Ryzen 5700X | B550 Gaming Pro | 16GB Dual | GTX 1650 4GB | 512GB SSD",
      totalCostPKR: 161000,
      date: "04 June 2026"
    },
    {
      id: 'q-903',
      name: "Budget Home Office Workhorse Core i3",
      partsSummary: "Intel i3 10th Gen | H610 DDR4 | 8GB DDR4 | 256GB SATA SSD SSD",
      totalCostPKR: 50800,
      date: "Yesterday"
    }
  ]);

  const [tickets, setTickets] = useState<RepairTicket[]>([
    {
      id: "MM-784",
      deviceName: "Lenovo ThinkPad X1 Carbon Ultrabook",
      issue: "Loose BIOS power pins - Charging light blinking",
      regDate: "03 June 2026",
      currentStep: 3, // Board Soldering step
      costEstimatePKR: 4500,
      assignedTechnician: "Saqib Abbasi (Senior Micro-Soldering Chief)"
    },
    {
      id: "MM-761",
      deviceName: "HP Victus Gaming laptop 16",
      issue: "Emergency Spill - Coffee liquid chemical ultrasound drying cleanup",
      regDate: "30 May 2026",
      currentStep: 5, // Completed
      costEstimatePKR: 3500,
      assignedTechnician: "M. Ali (Motherboard Diagnostic Tech)"
    }
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState<string>("MM-784");

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const stepsList = [
    { num: 1, label: "Handed over to lab counter" },
    { num: 2, label: "Under validation & checking" },
    { num: 3, label: "IC Soldering & structural fix" },
    { num: 4, label: "High-load QA Stress testing" },
    { num: 5, label: "Ready for Collection!" }
  ];

  const triggerQuoteWhatsApp = (quote: SavedQuote) => {
    const text = `Assalamu Alaykum Saqib Saheb! I saved my custom configuration "${quote.name}" on your app dashboard. Total cost estimate: Rs ${quote.totalCostPKR.toLocaleString()}.\n\nSpecifications list: ${quote.partsSummary}.\n\nPlease coordinate parts availability at Al-Zamin Plaza, Kotli!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
  };

  const triggerTicketWhatsApp = (ticket: RepairTicket) => {
    const activeStepTxt = stepsList[ticket.currentStep - 1].label;
    const text = `Assalamu Alaykum MM Computer! I am checking on my active Repair Ticket ID [${ticket.id}].\n\nDevice name: ${ticket.deviceName}\nIssue registered: ${ticket.issue}\nLast monitored status: Step ${ticket.currentStep}/5 - ${activeStepTxt}.\n\nPlease let me know if I can visit your Kotli store to collect today!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      
      {/* Profiler dashboard header in left column */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Profile Card summary */}
        <div className="p-5 sm:p-6 rounded-3xl border border-slate-850 bg-slate-950/70 flex flex-col sm:flex-row items-center gap-5 relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 shrink-0 text-white flex items-center justify-center font-black uppercase text-xl shadow-md">
            KK
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-grow font-semibold">
            <span className="text-[8px] bg-sky-505/10 text-sky-400 border border-sky-500/25 px-2 py-0.5 rounded uppercase font-black tracking-widest pl-2">
              Registered customer profile
            </span>
            <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">{customerProfile.name}</h4>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-450 font-semibold pt-1">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                {customerProfile.phone}
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                {customerProfile.rank}
              </span>
            </div>
          </div>
        </div>

        {/* SAVED SPECS AND RIGS QUOTATION */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            <FileText className="w-4.5 h-4.5 text-[#FBBF24]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Saved Custom Specifications Quotations</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {savedQuotes.map(quote => (
              <div 
                key={quote.id}
                className="p-5 rounded-2xl border border-slate-850 bg-slate-900/45 space-y-3 hover:border-slate-700 transition"
              >
                <div>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-black leading-none mb-1">Quote ID: {quote.id}</span>
                  <h5 className="text-xs sm:text-sm font-black text-white block truncate leading-tight">{quote.name}</h5>
                </div>

                <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 min-h-[30px] font-semibold">{quote.partsSummary}</p>

                <div className="pt-3 border-t border-slate-850/60 flex items-center justify-between text-xs font-semibold">
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block leading-none">Total Cost PKR</span>
                    <span className="text-sm font-black text-emerald-400 font-mono mt-1 block">Rs {quote.totalCostPKR.toLocaleString()}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerQuoteWhatsApp(quote)}
                    className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black uppercase text-[8.5px] rounded-lg cursor-pointer transition flex items-center gap-1 shrink-0 px-3"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-300" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR: MASTER ADVANCED REPAIR WORK TRACKER */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
        
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-850 shadow-2xl space-y-5">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-4.5 h-4.5 text-sky-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Live Lab Repair Tracking</span>
          </div>

          {/* Quick Ticket Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-950 rounded-lg text-[9px] font-black text-center text-slate-400 select-none uppercase">
            {tickets.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTicketId(t.id)}
                className={`py-1.5 rounded cursor-pointer transition ${selectedTicketId === t.id ? 'bg-sky-500 text-white font-black' : 'hover:bg-slate-900'}`}
              >
                {t.id}
              </button>
            ))}
          </div>

          {/* Core active tracking detail list */}
          {activeTicket && (
            <div className="space-y-4 font-semibold text-xs text-slate-350">
              
              <div className="pb-3 border-b border-slate-850">
                <span className="text-[8px] uppercase tracking-widest text-[#FBBF24] font-black block leading-none mb-1">Registered device</span>
                <h5 className="text-sm font-black text-white leading-tight">{activeTicket.deviceName}</h5>
                <p className="text-[10px] text-slate-400 leading-normal mt-1 leading-snug font-semibold bg-slate-955 p-2 rounded border border-slate-850/60 mt-2">
                  <strong>Registered fault:</strong> &ldquo;{activeTicket.issue}&rdquo;
                </p>
              </div>

              {/* Steps Progress Matrix */}
              <div className="space-y-3.5">
                <span className="text-[9px] text-slate-500 block uppercase font-black tracking-widest">Active Diagnostic Progress Stage:</span>
                
                <div className="flex flex-col gap-3 font-semibold">
                  {stepsList.map(step => {
                    const isPassed = step.num < activeTicket.currentStep;
                    const isActive = step.num === activeTicket.currentStep;
                    return (
                      <div 
                        key={step.num}
                        className={`flex items-center gap-3 text-[10.5px] transition-all ${
                          isPassed 
                            ? 'text-emerald-400' 
                            : isActive 
                              ? 'text-sky-400 font-extrabold scale-102 pl-1' 
                              : 'text-slate-500'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-black shrink-0 ${
                          isPassed 
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                            : isActive
                              ? 'bg-sky-500 text-white shadow-md animate-pulse font-extrabold'
                              : 'bg-slate-950 border border-slate-850 text-slate-600'
                        }`}>
                          {isPassed ? "✓" : step.num}
                        </span>
                        
                        <div className="truncate">
                          <span>{step.label}</span>
                          {isActive && (
                            <span className="block text-[8px] font-medium text-slate-500 uppercase tracking-wider font-mono">Current Station</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cost & technician parameters */}
              <div className="pt-4 border-t border-slate-850 space-y-2 text-[10px]">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 uppercase tracking-widest">Technician handling</span>
                  <span className="text-slate-205 text-right font-black">{activeTicket.assignedTechnician}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 uppercase tracking-widest">Cost Estimate</span>
                  <span className="text-emerald-450 font-black font-mono text-xs">Rs {activeTicket.costEstimatePKR.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => triggerTicketWhatsApp(activeTicket)}
                className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 font-bold py-3 px-4 rounded-xl text-white text-[9.5px] uppercase hover:from-emerald-600 hover:to-emerald-700 transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-350" />
                <span>Urgent WhatsApp Inquiry</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
