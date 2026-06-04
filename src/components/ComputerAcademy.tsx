import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Award, 
  CheckCircle, 
  RefreshCw, 
  HelpCircle, 
  Trophy, 
  ArrowRight,
  Gauge,
  Sparkles
} from 'lucide-react';

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  progress: number; // e.g. 70 means 70% complete
  level: 'Beginner' | 'Intermediate' | 'MasterClass';
  lessonsCount: number;
  tags: string[];
}

interface AcademyQuiz {
  id: string;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}

export default function ComputerAcademy() {
  const [courses, setCourses] = useState<CourseModule[]>([
    {
      id: 'a1',
      title: 'Motherboard Micro-Electronics & Soldering Diagnostics',
      duration: '4 Hours 15 Mins',
      instructor: 'Saqib Abbasi (Senior Lab Chief)',
      progress: 60,
      level: 'MasterClass',
      lessonsCount: 14,
      tags: ['Solder', 'IC Chips', 'Logic Board']
    },
    {
      id: 'a2',
      title: 'Operating System Restructuring & Registry Recovery',
      duration: '2 Hours 40 Mins',
      instructor: 'M. Ali (OS Setup Specialist)',
      progress: 100,
      level: 'Beginner',
      lessonsCount: 8,
      tags: ['Windows 11', 'Boot sector', 'Drivers']
    },
    {
      id: 'a3',
      title: 'Advanced Gaming PC Rig Cable Layout & Cooling Physics',
      duration: '3 Hours 10 Mins',
      instructor: 'Saqib Abbasi (Rig Builder)',
      progress: 25,
      level: 'Intermediate',
      lessonsCount: 10,
      tags: ['Thermal MX6', 'Bottlenecks', 'Fan flow']
    }
  ]);

  // Mini quiz state machine
  const quizzes: AcademyQuiz[] = [
    {
      id: 'q1',
      question: "You install speaker drivers cleanly in Windows 11 and audio is totally muted on the laptop internal speakers, but headphone port outputs perfect sound. What is the suspected hardware fault?",
      options: [
        { text: "Completely burnt audio controller amplifier IC.", isCorrect: false },
        { text: "Headphone port physical bypass switch is oxidized or stuck closed.", isCorrect: true },
        { text: "Windows OS registry tables are corrupt.", isCorrect: false }
      ],
      explanation: "Excellent! When a headphone is inserted, a physical copper leaf pin inside the port breaks speaker contact. If dust or oxidation builds up inside, the switch stays stuck, tricking the motherboard into thinking headphones are plugged in constantly."
    },
    {
      id: 'q2',
      question: "A high-performance laptop shuts down immediately with clean lines as soon as you run a heavy gaming benchmark (Furmark or GTA V), but works fine during browser usage. What should be done first?",
      options: [
        { text: "Format the hard drive storage partition instantly.", isCorrect: false },
        { text: "Test RAM blocks for memory overflow indexes.", isCorrect: false },
        { text: "Open cooling heatsink, scrub dry default paste and apply MX-6 high-conductivity paste.", isCorrect: true }
      ],
      explanation: "Exactly! Heavy benchmarks stress the core CPU/GPU pipelines immediately. Without clean thermal paste, the silicon temperature spikes to 105°C in seconds, triggering automated safety shutdown registers to protect against terminal copper gate fusing."
    }
  ];

  const [activeQuizIdx, setActiveQuizIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelectQuizOption = (optIdx: number) => {
    if (selectedOptIdx !== null) return; // Answer locked
    setSelectedOptIdx(optIdx);
    setShowExplanation(true);
  };

  const handleNextQuiz = () => {
    setSelectedOptIdx(null);
    setShowExplanation(false);
    setActiveQuizIdx((activeQuizIdx + 1) % quizzes.length);
  };

  const currentQuiz = quizzes[activeQuizIdx];

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      
      {/* Course progression cards */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-widest flex items-center gap-1">
              <span>Interactive Refurbishing Academy</span>
              <span className="text-[8px] bg-sky-500/10 text-sky-400 font-bold px-1.5 py-0.5 rounded ml-2 uppercase">Pakistani Talent Level-Up</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Learn professional computer repair, diagnostics testing, and microcircuit soldering from MM Computer's senior staff in Al-Zamin Plaza.</p>
          </div>
        </div>

        {/* Modules Stack */}
        <div className="space-y-4">
          {courses.map(course => (
            <div 
              key={course.id}
              className="p-5 rounded-2xl border border-slate-850 bg-slate-950/70 space-y-4 relative overflow-hidden group hover:border-slate-700 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    course.level === 'MasterClass'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                      : course.level === 'Intermediate'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                  }`}>
                    {course.level}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{course.duration}</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-slate-400 text-xs">
                  <span>Instructor:</span>
                  <span className="text-white font-black">{course.instructor}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h5 className="text-sm sm:text-base font-black text-white leading-tight group-hover:text-sky-400 transition">{course.title}</h5>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.tags.map((tg, i) => (
                    <span key={i} className="text-[9px] bg-slate-900 text-slate-400 font-bold px-2 py-0.5 rounded-md">#{tg}</span>
                  ))}
                </div>
              </div>

              {/* Progress Slider */}
              <div className="pt-2.5 flex items-center justify-between gap-5 font-bold">
                <div className="flex-grow space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>Course Course Progress</span>
                    <span className="text-slate-350">{course.progress}% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 transition-all rounded" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition inline-flex items-center gap-1 shrink-0 cursor-pointer ${
                    course.progress === 100
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20'
                      : 'bg-sky-500 text-white hover:bg-sky-600'
                  }`}
                >
                  {course.progress === 100 ? (
                    <>
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Certified</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span>Resume</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Micro quiz workspace */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
        
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-850 shadow-2xl space-y-5">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4.5 h-4.5 text-[#FBBF24]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Interactive Diagnostic Quiz</span>
          </div>

          <div className="space-y-4">
            <h5 className="text-[12px] font-black text-white leading-relaxed tracking-tight">
              Q{activeQuizIdx + 1}: {currentQuiz.question}
            </h5>

            {/* MCQ selections column */}
            <div className="flex flex-col gap-2.5 font-bold text-xs">
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedOptIdx === idx;
                const isCorrect = opt.isCorrect;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuizOption(idx)}
                    className={`p-3.5 rounded-xl border text-left transition text-[11px] leading-relaxed cursor-pointer font-bold ${
                      selectedOptIdx === null
                        ? 'bg-slate-950/60 border-slate-850 hover:border-slate-700 hover:bg-slate-950 text-slate-300'
                        : isSelected
                          ? isCorrect
                            ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-400 text-rose-400'
                          : isCorrect
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                            : 'bg-slate-950/20 border-slate-910 text-slate-500'
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {/* Answer Feed explanation section */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs font-semibold animate-fade-in">
                <span className="text-[9px] uppercase font-black text-amber-500 tracking-wider block">Diagnostics Explanation:</span>
                <p className="text-slate-400 leading-relaxed text-[11px] font-medium">{currentQuiz.explanation}</p>
                
                <button
                  onClick={handleNextQuiz}
                  className="mt-3 w-full py-2 bg-slate-800 hover:bg-slate-705 text-white text-[10px] uppercase font-black tracking-wider rounded-lg transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Next Riddler Question</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Global Student dashboard statistics mockup */}
        <div className="p-5 rounded-2xl border border-slate-850 bg-slate-950/40 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 tracking-widest">
            <span>Student Matric Status</span>
            <span>Online Core IP</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="block text-[8px] uppercase text-slate-500">Finished Lectures</span>
              <span className="text-lg font-black text-sky-400 mt-1 block">8 / 32 Lessons</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase text-slate-500">Correct Quizzes</span>
              <span className="text-lg font-black text-emerald-400 mt-1 block">94% Core Match</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
