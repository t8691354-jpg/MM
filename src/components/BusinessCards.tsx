import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Globe, CheckCircle2, Shield, Heart, HelpCircle, Wrench, FileText } from 'lucide-react';
import MMLogo from './MMLogo';

interface BusinessCardsProps {
  darkMode: boolean;
  openWhatsApp: (msg: string) => void;
}

export default function BusinessCards({ darkMode, openWhatsApp }: BusinessCardsProps) {
  const [activeCard, setActiveCard] = useState<'executive' | 'service'>('executive');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Raw contacts
  const saqibWhatsApp = "923430407210";
  const saqibCallPrimary = "+923456799101";
  const saqibCallAlternate = "+923493444500";

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Selector Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            setActiveCard('executive');
            setIsFlipped(false);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
            activeCard === 'executive'
              ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md'
              : darkMode
                ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border border-slate-150 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <span>Platinum Blue & Gold Card</span>
        </button>

        <button
          onClick={() => {
            setActiveCard('service');
            setIsFlipped(false);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
            activeCard === 'service'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
              : darkMode
                ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border border-slate-150 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
          <span>Classic Orange Store Card</span>
        </button>
      </div>

      {/* Interactive Card Stage with 3D Flip Anim */}
      <div className="flex justify-center items-center py-6 perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)} 
          className="relative w-full max-w-[480px] h-[280px] cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full h-full relative"
          >
            {/* FRONT OF CARD */}
            <div 
              style={{ backfaceVisibility: 'hidden' }}
              className={`absolute inset-0 w-full h-full rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col justify-between border ${
                activeCard === 'executive'
                  ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 border-sky-500/30'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              {/* Executive Front Design */}
              {activeCard === 'executive' ? (
                <>
                  {/* Technology Circuit Watermark style backgrounds */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Decorative circuit lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,40 L 100,40 L 130,10 L 300,10" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
                    <path d="M 400,240 L 320,240 L 290,200 L 100,200 L 70,170 Centered" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
                    <circle cx="130" cy="10" r="3" fill="#FBBF24" />
                    <circle cx="290" cy="200" r="3" fill="#38BDF8" />
                  </svg>

                  {/* Top Bar Logo */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <MMLogo size={52} glow={true} className="shrink-0" />
                      <div>
                        <h3 className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-sky-300 to-sky-400 bg-clip-text text-transparent uppercase">
                          MM Computer
                        </h3>
                        <p className="text-[9px] tracking-widest text-sky-400 font-extrabold uppercase -mt-0.5">
                          Mega Master Project Computer
                        </p>
                      </div>
                    </div>
                    <span className="text-[8px] tracking-widest px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 font-extrabold uppercase border border-yellow-500/20">
                      CORPORATE PROFILE
                    </span>
                  </div>

                  {/* Middle Title Details */}
                  <div className="my-auto pl-14 z-10">
                    <h2 className="text-2xl font-black tracking-widest text-[#F59E0B] drop-shadow-sm uppercase">
                      MOHAMMAD SAQIB
                    </h2>
                    <p className="text-xs font-bold text-sky-300 tracking-wider flex items-center gap-1.5 uppercase mt-1">
                      <Shield className="w-3.5 h-3.5 text-yellow-500" />
                      <span>FOUNDER & CEO</span>
                    </p>
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="flex justify-between items-end text-[10px] text-slate-400 border-t border-slate-800/80 pt-3 z-10">
                    <span className="font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                      Al-Zamin Plaza, Kotli, AJK
                    </span>
                    <span className="text-yellow-400 font-mono flex items-center gap-1">
                      <Globe className="w-3 h-3 text-sky-400 shrink-0" />
                      www.mmcomputer.pk
                    </span>
                  </div>
                </>
              ) : (
                /* Classic Orange Front Design */
                <>
                  <div className="absolute top-0 left-0 w-3 h-full bg-orange-500" />
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
                  
                  {/* Top orange header block */}
                  <div className="flex justify-between items-start z-10 pl-3">
                    <div className="flex items-center gap-2">
                      <MMLogo size={42} glow={false} className="shrink-0" />
                      <div>
                        <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                          MM Computer
                        </h3>
                        <p className="text-[8px] font-black text-rose-600 tracking-wider uppercase -mt-0.5">
                          Laptop & Computer Solutions
                        </p>
                      </div>
                    </div>
                    <div className="bg-orange-500 text-white font-extrabold text-[8px] px-2 py-1 rounded-bl-xl tracking-wider uppercase">
                      Local Support
                    </div>
                  </div>

                  {/* Main section: Orange banner + Name info */}
                  <div className="pl-3 py-2 border-l-4 border-orange-500 my-auto z-10 bg-orange-50/50 mr-4 rounded-r-lg">
                    <p className="text-xs text-orange-600 font-black tracking-widest uppercase">Certified Tech Expert</p>
                    <h2 className="text-xl font-bold tracking-normal text-slate-950 mt-0.5">
                      Muhammad Saqib
                    </h2>
                    <p className="text-[10px] text-slate-600 mt-1 font-semibold flex items-center gap-2">
                      <span>📞 0343-0407210</span>
                      <span className="text-slate-300">|</span>
                      <span>💬 0349-3444500</span>
                    </p>
                  </div>

                  {/* Footnote */}
                  <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-slate-100 pt-3 z-10 pl-3">
                    <span className="font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                      Al-Zamin Plaza, Pindi Road, Kotli
                    </span>
                    <span className="font-bold text-rose-600">
                      Laptop, PC & Printer Sale Repair
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* BACK OF CARD */}
            <div 
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              className={`absolute inset-0 w-full h-full rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col justify-between border ${
                activeCard === 'executive'
                  ? 'bg-gradient-to-br from-slate-950 to-slate-900 text-slate-300 border-sky-500/30'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              {activeCard === 'executive' ? (
                /* Executive Back Design */
                <>
                  <div className="flex justify-between items-start border-b border-slate-800/80 pb-3 z-10">
                    <div className="flex items-center gap-2">
                      <MMLogo size={32} glow={false} />
                      <span className="text-xs font-black tracking-widest text-[#FBBF24] uppercase">MM DIGITAL CARD</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">BACK</span>
                  </div>

                  {/* Contact listings */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 my-auto text-xs z-10 pl-2">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[8px] opacity-70 block -mb-0.5">Primary Call</span>
                        <a href={`tel:${saqibCallPrimary}`} className="font-bold font-mono text-white hover:text-sky-300">{saqibCallPrimary}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-[8px] opacity-70 block -mb-0.5">WhatsApp / Direct</span>
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            openWhatsApp("Hello Saqib Saheb! I reached you via the Royal Gold Card on your website.");
                          }}
                          className="font-bold font-mono text-emerald-400 hover:underline cursor-pointer"
                        >
                          +92 343 0407210
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <span className="text-[8px] opacity-70 block -mb-0.5">Corporate Email</span>
                        <span className="font-mono text-white select-all text-[10px]">contact@mmcomputer.pk</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                      <div>
                        <span className="text-[8px] opacity-70 block -mb-0.5">Alternative Contact</span>
                        <span className="font-mono text-white text-[10px]">saqibmm2@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification Label */}
                  <div className="text-[9px] text-center text-slate-500 border-t border-slate-800/80 pt-2 flex items-center justify-center gap-1.5 z-10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Click card to flip face | Official Identity Sourced from MM Computer Storefront</span>
                  </div>
                </>
              ) : (
                /* Classic Orange Back Design - Services Catalog */
                <>
                  <div className="absolute top-0 right-0 w-3 h-full bg-orange-500" />
                  
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2 z-10">
                    <h4 className="text-xs font-extrabold text-orange-600 uppercase flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Certified Storefront Services</span>
                    </h4>
                    <span className="text-[8px] text-[#FF4500] font-black bg-orange-50 px-2 py-0.5 rounded uppercase">CATALOGUE</span>
                  </div>

                  {/* Service list exactly from Orange Business Card */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 my-auto text-[10px] text-slate-700 font-bold z-10 pl-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">PC Windows Formatting</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Virus Solutions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Hardware / Software Upgrades</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Professional Data Recovery</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Networking Troubleshoot</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Diagnostic & PC Tune Up</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Printer Repairing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-orange-500">⮚</span>
                      <span className="truncate">Toner / Cartridge Refilling</span>
                    </div>
                  </div>

                  {/* Verification footer */}
                  <div className="text-[9px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between z-10 pr-4">
                    <span className="font-medium">📧 saqibbmm2@gmail.com</span>
                    <span className="font-bold text-orange-500 flex items-center gap-0.5">
                      Click to Flip Front ↺
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Action under the Cards */}
      <div className="text-center">
        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} italic-item mb-2`}>
          💡 {isFlipped ? "Click on the card to flip it back and see the front logo!" : "Click directly on the card to flip it over and inspect phone numbers & service list!"}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button 
            onClick={() => openWhatsApp("Hello MM Computer! I want to enquire about custom computer setups and laptop repair diagnostics.")}
            className="px-5 py-2.5 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg hover:bg-emerald-700 transition cursor-pointer flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Chat with Saqib (CEO WhatsApp)</span>
          </button>
          
          <a
            href={`tel:${saqibCallPrimary}`}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer flex items-center gap-2 ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-500" />
            <span>Call Store Directly: {saqibCallPrimary}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
