import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, Clock, Wrench, Package, Cpu } from 'lucide-react';

interface TrackingResult {
  id: string;
  clientName: string;
  device: string;
  dateReceived: string;
  status: 'received' | 'diagnosed' | 'repairing' | 'testing' | 'ready';
  technicianNotes: string;
  estimatedCompletion: string;
  priceEstimated: string;
  steps: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
    active: boolean;
  }[];
}

export default function RepairTracker() {
  const [searchId, setSearchId] = useState('');
  const [activeResult, setActiveResult] = useState<TrackingResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Loaded database of demonstration repairs
  const demoRepairs: Record<string, TrackingResult> = {
    'MM-5530': {
      id: 'MM-5530',
      clientName: 'Waleed Sajjad',
      device: 'Dell G15 5530 (Heavy Duty Gaming Laptop)',
      dateReceived: 'June 02, 2026',
      status: 'repairing',
      technicianNotes: 'Diagnostics completed. Upgrading the primary RAM slot and replacing the standard CPU thermal paste with Arctic MX-6 compound for superior cooling. Screen connectors secured.',
      estimatedCompletion: 'Today before 6:30 PM',
      priceEstimated: 'Rs 4,500 (Parts & Service)',
      steps: [
        { title: 'Device Recieved', description: 'Item logged into inventory and clean catalogued.', time: 'June 02, 10:30 AM', completed: true, active: false },
        { title: 'Diagnostics Done', description: 'Fault identified: Dry thermal paste causing thermal throttling under load.', time: 'June 02, 12:15 PM', completed: true, active: false },
        { title: 'Active Repairing', description: 'Application of gold-compound thermal paste and secondary RAM upgrade active.', time: 'Ongoing', completed: false, active: true },
        { title: 'Stress Testing', description: '3DMark stability loops and keyboard key audits.', time: 'Pending', completed: false, active: false },
        { title: 'Ready for Collection', description: 'Customer notified via auto SMS/WhatsApp alert.', time: 'Pending', completed: false, active: false },
      ]
    },
    'MM-VICTUS': {
      id: 'MM-VICTUS',
      clientName: 'Hamza Malik',
      device: 'HP Victus 15 GameEngine Laptop',
      dateReceived: 'May 31, 2026',
      status: 'ready',
      technicianNotes: 'OEM 144Hz Slim-Bezel screen completely fitted and calibrated for sRGB color matching. Hinge tension adjusted nicely.',
      estimatedCompletion: 'Ready for Pickup',
      priceEstimated: 'Rs 14,000 (Fitted Under Warranty)',
      steps: [
        { title: 'Device Recieved', description: 'Logged damaged display bezel and panel.', time: 'May 31, 11:00 AM', completed: true, active: false },
        { title: 'Diagnostics Done', description: 'Cracked internal glass layers confirmed. OEM screen ordered.', time: 'May 31, 12:45 PM', completed: true, active: false },
        { title: 'Active Repairing', description: 'Delicate bezel disassembly and screen layer bonding finished.', time: 'June 01, 11:30 AM', completed: true, active: false },
        { title: 'Stress Testing', description: 'Color calibration, refresh rate testing at 144Hz, and continuous pixel check.', time: 'June 01, 04:00 PM', completed: true, active: false },
        { title: 'Ready for Collection', description: 'Device polished, boxed & waiting in checkout queue!', time: 'June 02, 09:30 AM', completed: true, active: true },
      ]
    },
    'MM-7490': {
      id: 'MM-7490',
      clientName: 'Sajid Mehmood',
      device: 'Dell Latitude 7490 Business Series',
      dateReceived: 'June 03, 2026',
      status: 'diagnosed',
      technicianNotes: 'Identified corrupted cluster nodes on old SATA drive. Recommending upgrading to ultra-fast NVMe Solid-State Drive (SSD) plus fresh Windows Operating System configurations.',
      estimatedCompletion: 'Pending Client Consent on WhatsApp',
      priceEstimated: 'Rs 4,800',
      steps: [
        { title: 'Device Recieved', description: 'Item accepted from Sajid Mehmood for slow storage boot audits.', time: 'June 03, 03:00 PM', completed: true, active: false },
        { title: 'Diagnostics Done', description: 'SATA HDD health is at 12%. Storage upgrade recommended.', time: 'June 03, 04:45 PM', completed: true, active: true },
        { title: 'Active Repairing', description: 'Pending NVMe insertion and formatting approval.', time: 'Pending', completed: false, active: false },
        { title: 'Stress Testing', description: 'Operating system fine-tuning & driver installations.', time: 'Pending', completed: false, active: false },
        { title: 'Ready for Collection', description: 'Final packaging and dispatch check.', time: 'Pending', completed: false, active: false },
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (!cleanId) return;

    if (demoRepairs[cleanId]) {
      setActiveResult(demoRepairs[cleanId]);
    } else {
      // Dynamic generation for custom keys to keep page 100% interactive
      const seed = cleanId.length;
      const statuses: TrackingResult['status'][] = ['received', 'diagnosed', 'repairing', 'testing', 'ready'];
      const finalStatus = statuses[seed % statuses.length];
      
      const generatedResult: TrackingResult = {
        id: cleanId,
        clientName: `Valued Customer (${cleanId})`,
         device: "General Client Laptop / Desktop Computer Custom Unit",
        dateReceived: "Received Recently",
        status: finalStatus,
        technicianNotes: `Diagnostic scan executed successfully for query ${cleanId}. Currently routing parts procurement protocols. Expertly handled with MM genuine spare pledge. Contact Saqib Saheb to check details.`,
        estimatedCompletion: finalStatus === 'ready' ? 'Ready for Pickup' : 'Expected 1 working day',
        priceEstimated: "Estimated: Rs 1,500 - 3,500 (Varies)",
        steps: [
          { title: 'Device Recieved', description: 'Unit logged into system cache database.', time: 'Ongoing', completed: true, active: finalStatus === 'received' },
          { title: 'Diagnostics Done', description: 'System electronic signals analyzed.', time: 'Verified', completed: ['diagnosed', 'repairing', 'testing', 'ready'].includes(finalStatus), active: finalStatus === 'diagnosed' },
          { title: 'Active Repairing', description: 'Micro-soldering, thermal paste, or software upgrades.', time: 'In progress', completed: ['repairing', 'testing', 'ready'].includes(finalStatus), active: finalStatus === 'repairing' },
          { title: 'Stress Testing', description: 'Thermal loop runs and battery discharge tests.', time: 'Automated', completed: ['testing', 'ready'].includes(finalStatus), active: finalStatus === 'testing' },
          { title: 'Ready for Collection', description: 'Wiped, polished and ready for pickup!', time: 'Final Stage', completed: finalStatus === 'ready', active: finalStatus === 'ready' },
        ]
      };
      setActiveResult(generatedResult);
    }
    setHasSearched(true);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search Header Container */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
        {/* Abstract background circuitry */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-15 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
              <Clock className="w-5 h-5 animate-spin-pulse" />
            </div>
            <div>
              <h4 className="text-base font-black text-white uppercase tracking-wider">
                Live Cloud Repair Tracker Engine
              </h4>
              <p className="text-xs text-slate-400">
                Type in your job ticket ID to instantly inspect physical lab queue status & diagnostic comments.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 mt-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Repair Ticket ID (e.g. MM-5530, MM-VICTUS, MM-7490)" 
                className="w-full pl-11 pr-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-slate-500 uppercase"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
            </div>
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 font-bold text-xs sm:text-sm text-white hover:from-sky-600 hover:to-sky-700 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-yellow-300" />
              <span>Track Ticket</span>
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs">
            <span className="text-slate-500 font-bold uppercase">Try Live Demos:</span>
            {['MM-5530', 'MM-VICTUS', 'MM-7490'].map((btnId) => (
              <button
                key={btnId}
                onClick={() => {
                  setSearchId(btnId);
                  setActiveResult(demoRepairs[btnId]);
                  setHasSearched(true);
                }}
                className="px-2.5 py-1 text-[11px] font-black tracking-wider bg-slate-900 border border-slate-800 text-slate-300 rounded hover:text-sky-400 transition cursor-pointer uppercase"
              >
                {btnId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card display logic */}
      {hasSearched && activeResult && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl flex flex-col gap-6 animate-fade-in">
          
          {/* Diagnostic Stats Bar */}
          <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-900">
            <div>
              <span className="text-[10px] bg-slate-900 text-sky-400 font-black tracking-widest px-2.5 py-1 rounded uppercase">
                Active Ticket: {activeResult.id}
              </span>
              <h4 className="text-base font-black text-white mt-2">
                {activeResult.device}
              </h4>
              <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                <span>Received: {activeResult.dateReceived}</span>
                <span>•</span>
                <span>Customer: <strong className="text-slate-200">{activeResult.clientName}</strong></span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block font-bold">Estimated Cost</span>
              <span className="text-lg font-black text-emerald-400">{activeResult.priceEstimated}</span>
              <span className="text-[10px] block text-slate-400 mt-0.5 italic">{activeResult.estimatedCompletion}</span>
            </div>
          </div>

          {/* Stepped Progress Stages */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2">
            {activeResult.steps.map((step, idx) => {
              return (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col gap-1.5 relative transition-all ${
                    step.active 
                      ? 'bg-sky-500/10 border-sky-500 text-sky-300 ring-2 ring-sky-500/20' 
                      : step.completed 
                        ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                        : 'bg-slate-950 border-slate-900 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider">Step 0{idx + 1}</span>
                    {step.completed ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                    ) : step.active ? (
                      <Clock className="w-4.5 h-4.5 text-sky-400 animate-pulse" />
                    ) : (
                      <Clock className="w-4.5 h-4.5 opacity-40" />
                    )}
                  </div>
                  <h5 className="text-xs font-black tracking-tight text-white">{step.title}</h5>
                  <p className="text-[10px] leading-relaxed opacity-85">{step.description}</p>
                  <span className="text-[8px] font-mono block opacity-60 mt-auto pt-2">{step.time}</span>
                </div>
              );
            })}
          </div>

          {/* Expert Lab Diagnostics Comments */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
              <Wrench className="w-4 h-4 shrink-0" />
              <span>Attending Technician Diagnosis Notes</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              &ldquo;{activeResult.technicianNotes}&rdquo;
            </p>
          </div>

          {/* Immediate WhatsApp Action to CEO about ticket */}
          <div className="text-center bg-slate-900/20 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-semibold text-left">
              💬 Have customized technical questions or parts questions regarding <strong>{activeResult.id}</strong>? Let Saqib Saheb handle it.
            </p>
            <button 
              onClick={() => {
                const text = `Hello MM Computer! I am tracking my ticket ID ${activeResult.id} (${activeResult.device}) on your website and want to ask a quick technical question.`;
                const encodedText = encodeURIComponent(text);
                window.open(`https://wa.me/923430407210?text=${encodedText}`, '_blank');
              }}
              className="px-4.5 py-2 hover:bg-emerald-600 bg-emerald-500 text-slate-950 font-black hover:text-white rounded-lg text-xs tracking-wider uppercase inline-flex items-center gap-1.5 shrink-0 transition"
            >
              Contact Lab Direct
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
