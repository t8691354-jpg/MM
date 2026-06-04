import React, { useState } from 'react';
import { HelpCircle, ShieldAlert, Cpu, CheckCircle, RefreshCw, MessageSquare, Flame, AlertCircle } from 'lucide-react';

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

export default function InteractiveTroubleshooter() {
  const symptoms: SymptomCategory[] = [
    {
      id: 'sym-power',
      title: 'Power & Charging Failures',
      desc: 'Laptop fails to switch on, shuts down suddenly, or battery drops fast.',
      iconBg: 'bg-amber-500/10 text-amber-500',
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

    // Check if there are further questions
    if (currentQuestionIdx < matchCategory.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Out of questions! Compute final diagnosis output
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

I want to book an diagnostics check/repair for my laptop. Please coordinate a convenient afternoon time slot for me to visit Al-Zamin Plaza store!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/923430407210?text=${encoded}`, '_blank');
  };

  const handleReset = () => {
    setActiveCategory(null);
    setCurrentQuestionIdx(0);
    setSelectedAnswers([]);
    setDiagnosedResult(null);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-950/80 relative shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between">
      
      {/* Dynamic Aura Ring */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Screen 1: Pick general symptom list */}
      {!activeCategory && !diagnosedResult && (
        <div className="space-y-6 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <HelpCircle className="w-5 h-5 animate-pulse" />
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
                  className="p-4 rounded-2xl border border-slate-850 bg-slate-900/40 text-left hover:border-sky-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex gap-3.5 group"
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
            ⚠️ <strong>Emergency Notice:</strong> If your system was recently exposed to liquid submersion, do not run diagnostic engines. Cut power immediately, remove battery if external and fetch directly to physical shop lab of MM Computer to save motherboard copper gates!
          </p>
        </div>
      )}

      {/* Screen 2: Sequence Question Nodes */}
      {activeCategory && !diagnosedResult && (
        <div className="space-y-5 flex-grow flex flex-col justify-between">
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

      {/* Screen 3: Output Diagnosed Assessments */}
      {diagnosedResult && (
        <div className="space-y-6 flex-grow flex flex-col justify-between animate-fade-in">
          <div>
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-900">
              <span className="text-xs font-black text-sky-400 uppercase tracking-widest">
                ⚡ Identified Assessment Outcome
              </span>
              
              {/* Dynamic Severity Badge */}
              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                diagnosedResult.severity === 'critical' 
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                  : diagnosedResult.severity === 'medium'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
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

            {/* In depth diagnostic tech notes */}
            <div className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 leading-relaxed font-semibold">
              <span className="font-extrabold text-[#FBBF24] uppercase block mb-1">Expert Diagnostic Footnote:</span>
              &ldquo;{diagnosedResult.diagnosticNotes}&rdquo;
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-2.5 mt-6 pt-4 border-t border-slate-900">
            <button
              onClick={handleWhatsappDiagnosticBook}
              className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 font-bold py-3 px-5 rounded-xl text-xs uppercase text-white hover:from-emerald-600 hover:to-emerald-700 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300 animate-bounce" />
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
  );
}
