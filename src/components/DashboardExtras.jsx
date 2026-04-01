import React from 'react';
import { Target, Zap, ShieldCheck, DollarSign, Wallet, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function FinancialHealthScore({ score }) {
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-finsuccess bg-finsuccess/10';
    if (s >= 60) return 'text-amber-500 bg-amber-500/10';
    return 'text-finexpense bg-finexpense/10';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    return 'Action Needed';
  };

  return (
    <div className="dashboard-card overflow-hidden hover:shadow-2xl transition-all duration-500 group">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-xl font-black text-finmain dark:text-white">Health Score 🛡️</h4>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getScoreColor(score)} shadow-sm group-hover:scale-105 transition-transform`}>
           {getScoreLabel(score)}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-10 group-hover:-translate-y-1 transition-transform">
        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="104"
              cy="104"
              r="90"
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              className="text-finborder dark:text-findivider opacity-20"
            />
            <circle
              cx="104"
              cy="104"
              r="90"
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - score/100)}
              strokeLinecap="round"
              className={`transition-all duration-1000 ${score >= 80 ? 'text-finsuccess' : 'text-finprimary'}`}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-finmain dark:text-white tracking-tighter">{score}</span>
            <span className="text-[10px] font-black text-finsecondary uppercase tracking-[4px] mt-2 opacity-60">Percent</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-5 w-full">
            <div className="p-5 bg-finbglight/60 dark:bg-slate-800/60 rounded-3xl space-y-1.5 border border-finborder dark:border-findivider hover:bg-finprimary/5 transition-colors group/item shadow-sm">
                 <p className="text-[9px] uppercase font-black text-finsecondary tracking-widest leading-tight group-hover/item:text-finprimary transition-colors">Savings Path</p>
                 <p className="text-sm font-black text-finmain dark:text-white leading-none">90.5% Goal</p>
            </div>
             <div className="p-5 bg-finbglight/60 dark:bg-slate-800/60 rounded-3xl space-y-1.5 border border-finborder dark:border-findivider hover:bg-finprimary/5 transition-colors group/item shadow-sm">
                 <p className="text-[9px] uppercase font-black text-finsecondary tracking-widest leading-tight group-hover/item:text-finprimary transition-colors">Risk Index</p>
                 <p className="text-sm font-black text-finmain dark:text-white leading-none">Low Volatility</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export function RecentActivityTimeline() {
  const { setIsCashFlowOpen } = useApp();

  const activities = [
    { id: 1, title: 'Salary Credited', time: '2 hours ago', icon: <DollarSign size={16} />, color: 'bg-indigo-600' },
    { id: 2, title: 'Utility Disbursement', time: '1 day ago', icon: <Zap size={16} />, color: 'bg-amber-600' },
    { id: 3, title: 'Travel Booking', time: '3 days ago', icon: <ShieldCheck size={16} />, color: 'bg-emerald-600' },
    { id: 4, title: 'Asset Procurement', time: '1 week ago', icon: <Wallet size={16} />, color: 'bg-purple-600' },
  ];

  return (
    <div className="dashboard-card overflow-hidden hover:shadow-2xl transition-all duration-500">
      <h4 className="text-xl font-black text-finmain dark:text-white mb-10">Activity Flow ⚡</h4>
      <div className="space-y-7">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex space-x-6 relative group cursor-pointer" onClick={() => setIsCashFlowOpen(true)}>
             {index !== activities.length - 1 && (
               <div className="absolute top-10 left-[16px] bottom-0 w-[1.5px] bg-finborder dark:bg-findivider group-hover:bg-finprimary/40 transition-colors"></div>
             )}
             <div className={`w-9 h-9 rounded-2xl ${activity.color} flex items-center justify-center text-white shrink-0 z-10 shadow-lg shadow-black/10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                {activity.icon}
             </div>
             <div className="flex-1 space-y-1.5 pb-8 group-hover:translate-x-1 transition-transform">
                <p className="text-sm font-black text-finmain dark:text-white leading-tight group-hover:text-finprimary transition-colors">{activity.title}</p>
                <div className="flex items-center space-x-2 text-[11px] text-finsecondary font-black uppercase tracking-wider opacity-60">
                   <span>{activity.time}</span>
                </div>
             </div>
             <button 
                onClick={(e) => {
                   e.stopPropagation();
                   setIsCashFlowOpen(true);
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-finprimary bg-finprimary/10 hover:bg-finprimary hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm border border-finprimary/10"
             >
                <ArrowRight size={16} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}
