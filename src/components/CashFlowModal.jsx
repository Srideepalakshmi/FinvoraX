import React from 'react';
import { X, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

function CashFlowModal() {
  const { isCashFlowOpen, setIsCashFlowOpen, stats } = useApp();

  if (!isCashFlowOpen) return null;

  const monthlyData = [
    { month: 'Jan', inflow: 65000, outflow: 22000 },
    { month: 'Feb', inflow: 72000, outflow: 25000 },
    { month: 'Mar', inflow: 80000, outflow: 27600 },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-fincarddark w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border border-finborder dark:border-findivider animate-in zoom-in-95 duration-300 transform">
        
        {/* Advanced Header Context */}
        <div className="p-8 border-b border-finborder dark:border-findivider flex justify-between items-center bg-finbglight/40 dark:bg-slate-800/40 relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-finprimary"></div>
          <div>
            <div className="flex items-center space-x-2 text-finprimary mb-1">
               <Activity size={14} />
               <span className="text-[10px] uppercase font-black tracking-[4px]">Cash Flow Intelligence</span>
            </div>
            <h4 className="text-3xl font-black text-finmain dark:text-white tracking-tighter">Strategic Liquidity Review</h4>
          </div>
          <button 
            onClick={() => setIsCashFlowOpen(false)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-finsecondary hover:text-finmain dark:hover:text-white active:scale-95 shadow-sm border border-finborder dark:border-findivider"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-10 space-y-10">
          {/* Summary Intelligence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-finsuccess/5 border border-finsuccess/10 space-y-4 hover:shadow-xl hover:shadow-finsuccess/5 transition-all group">
              <div className="flex justify-between items-center">
                 <div className="p-3 rounded-2xl bg-finsuccess/10 text-finsuccess group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={24} />
                 </div>
                 <span className="text-xs font-black text-finsuccess px-3 py-1 bg-finsuccess/10 rounded-full">+8.2% Growth</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-finsecondary">Monthly Inflow Profile</p>
                <h3 className="text-3xl font-black text-finmain dark:text-white mt-1">{formatCurrency(stats.totalIncome)}</h3>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-finexpense/5 border border-finexpense/10 space-y-4 hover:shadow-xl hover:shadow-finexpense/5 transition-all group">
              <div className="flex justify-between items-center">
                 <div className="p-3 rounded-2xl bg-finexpense/10 text-finexpense group-hover:scale-110 transition-transform">
                    <ArrowDownRight size={24} />
                 </div>
                 <span className="text-xs font-black text-finexpense px-3 py-1 bg-finexpense/10 rounded-full">-4.1% Reduced</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-finsecondary">Monthly Outflow Profile</p>
                <h3 className="text-3xl font-black text-finmain dark:text-white mt-1">{formatCurrency(stats.totalExpense)}</h3>
              </div>
            </div>
          </div>

          {/* Monthly Trend Visualizer - Mini SVG Chart Interface */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h5 className="text-sm font-black uppercase tracking-[2px] text-finmain dark:text-white flex items-center space-x-2">
                  <Calendar size={16} className="text-finprimary" />
                  <span>Trailing 3-Month Trajectory</span>
               </h5>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5">
                     <div className="w-2 h-2 rounded-full bg-finprimary"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-finsecondary">Inflow</span>
                  </div>
                   <div className="flex items-center space-x-1.5">
                     <div className="w-2 h-2 rounded-full bg-finexpense"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-finsecondary">Outflow</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-6 h-32 items-end px-4">
               {monthlyData.map((d, idx) => (
                 <div key={idx} className="space-y-3 group cursor-help">
                    <div className="flex items-end space-x-2 h-full">
                       <div className="w-full bg-finprimary rounded-t-xl group-hover:opacity-80 transition-opacity" style={{ height: `${(d.inflow / 80000) * 100}%` }}></div>
                       <div className="w-full bg-finexpense rounded-t-xl group-hover:opacity-80 transition-opacity" style={{ height: `${(d.outflow / 80000) * 100}%` }}></div>
                    </div>
                    <p className="text-[10px] text-center font-black uppercase tracking-widest text-finsecondary">{d.month}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Action Context Call */}
          <div className="pt-8 border-t border-finborder dark:border-findivider flex justify-between items-center">
             <div className="space-y-1">
                <p className="text-xs font-black text-finmain dark:text-white">Overall Asset Retention</p>
                <p className="text-[10px] text-finsecondary font-medium uppercase tracking-widest">Calculated across all historical archives</p>
             </div>
             <div className="text-right">
                <h4 className="text-2xl font-black text-finprimary">{formatCurrency(stats.savings)}</h4>
                <div className="flex items-center justify-end space-x-1 text-finsuccess text-[10px] font-black uppercase tracking-widest">
                   <TrendingUp size={12} />
                   <span>+22.8% Improvement</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CashFlowModal;
