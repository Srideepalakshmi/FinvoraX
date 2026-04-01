import React from 'react';
import { Target, TrendingUp, Sparkles, AlertCircle, PieChart, TrendingDown, ArrowUpRight, Zap, Lightbulb } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

function Insights() {
  const { stats, transactions } = useApp();

  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const sortedCategories = Object.entries(spendingByCategory)
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedCategories[0] ? sortedCategories[0][0] : 'None';
  const topAmount = sortedCategories[0] ? sortedCategories[0][1] : 0;
  
  // Predictive Forecast: If current savings rate continues
  const savingsRate = (stats.savings / (stats.totalIncome || 1)) * 100;
  const healthLabel = stats.healthScore > 80 ? 'Optimal' : stats.healthScore > 60 ? 'Stable' : 'Warning';

  return (
    <div className="space-y-12 pb-16 text-finmain dark:text-white max-w-7xl mx-auto">
      
      {/* Header Context Section - Streamlined for professional review */}
      <div className="space-y-3">
        {/* 'AI Portfolio Prediction' label removed as requested */}
        <h1 className="text-5xl font-black tracking-tighter leading-tight animate-in fade-in slide-in-from-left duration-700">
           Financial Intelligence 🧠
        </h1>
        <p className="text-lg font-medium text-finsecondary opacity-80 max-w-2xl px-1">
           Data-driven projections and pattern recognition based on your recent 80k Income & 27.6k Expenses audit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Core Prediction Card */}
        <div className="lg:col-span-2 space-y-10">
          <div className="dashboard-card relative overflow-hidden group hover:shadow-2xl transition-all duration-700 bg-finprimary/5 dark:bg-finprimary/[0.03] border-finprimary/20">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-all group-hover:scale-110">
                <Target size={120} className="text-finprimary" />
             </div>

             <div className="relative z-10 space-y-8">
                <div className="flex items-center space-x-4">
                   <div className="p-4 rounded-[24px] bg-finprimary text-white shadow-xl shadow-finprimary/20">
                      <TrendingUp size={28} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black tracking-tight">Liquidity Forecast 📈</h3>
                      <p className="text-xs font-black uppercase tracking-widest text-finsecondary opacity-70">Next 30 Days Projection</p>
                   </div>
                </div>

                <div className="p-8 rounded-[32px] bg-white dark:bg-fincarddark border border-finborder dark:border-findivider shadow-sm">
                   <p className="text-[13px] leading-relaxed opacity-80 italic">
                      "Based on your current burn rate of **{formatCurrency(stats.totalExpense)}** and consistent income of **{formatCurrency(stats.totalIncome)}**, you are on track to increase your net liquidity by **{formatCurrency(stats.currentBalance)}** per cycle. Your savings retention is currently **{savingsRate.toFixed(1)}%**, which is **{savingsRate > 30 ? 'above' : 'below'}** the typical 30/30/40 benchmark."
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 rounded-3xl bg-white dark:bg-fincarddark border border-finborder dark:border-findivider shadow-sm space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-finsecondary">Projected 12m Savings</p>
                       <p className="text-3xl font-black text-finprimary tracking-tighter">{formatCurrency(stats.savings * 12)}</p>
                   </div>
                   <div className="p-6 rounded-3xl bg-white dark:bg-fincarddark border border-finborder dark:border-findivider shadow-sm space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-finsecondary">Retention Health</p>
                       <div className="flex items-center space-x-2">
                          <p className="text-3xl font-black text-finsuccess tracking-tighter">{healthLabel}</p>
                          <div className="p-1.5 bg-finsuccess/10 text-finsuccess rounded-full">
                             <TrendingUp size={14} />
                          </div>
                       </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Category Breakdown Intelligence */}
          <div className="dashboard-card group">
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center space-x-3">
                  <PieChart className="text-finprimary rotate-12" size={24} />
                  <h4 className="text-2xl font-black tracking-tighter">Segment Distribution</h4>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-finsecondary bg-finbglight dark:bg-slate-800 px-4 py-1.5 rounded-full border border-finborder dark:border-findivider shadow-sm">{sortedCategories.length} Categories Audited</span>
            </div>

            <div className="space-y-8">
              {sortedCategories.map(([category, amount]) => (
                <div key={category} className="space-y-3 group/item cursor-default">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-sm font-black text-finmain dark:text-white group-hover/item:text-finprimary transition-colors">{category}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-finsecondary opacity-60">
                        {((amount / stats.totalIncome) * 100).toFixed(1)}% of Revenue
                      </p>
                    </div>
                    <p className="text-sm font-black text-finmain dark:text-white">{formatCurrency(amount)}</p>
                  </div>
                  <div className="w-full h-3.5 bg-finbglight dark:bg-slate-800 rounded-full overflow-hidden border border-finborder dark:border-findivider shadow-inner">
                    <div 
                      className="h-full bg-finprimary rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${(amount / stats.totalExpense) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable Recommendations Sidebar */}
         <div className="space-y-10">
            <div className="dashboard-card bg-amber-500/5 border-amber-500/20 group hover:shadow-xl transition-all">
               <div className="flex items-center space-x-3 mb-8 text-amber-500">
                  <AlertCircle size={22} />
                  <h4 className="text-xl font-black tracking-tighter">Strategic Alerts</h4>
               </div>
               <div className="space-y-6">
                  <div className="p-5 bg-white dark:bg-slate-800/60 rounded-3xl border border-amber-500/10 hover:border-amber-500/40 transition-colors group/alert">
                     <p className="text-sm font-black text-finmain dark:text-white group-hover/alert:text-amber-500 transition-colors">High Sector Concentration</p>
                     <p className="text-[11px] text-finsecondary font-medium mt-1 leading-relaxed opacity-80">
                        Your **{topCategory}** spending accounts for **{((topAmount / stats.totalExpense) * 100).toFixed(0)}%** of total outflow.
                     </p>
                  </div>
                  <div className="p-5 bg-white dark:bg-slate-800/60 rounded-3xl border border-finsuccess/10 hover:border-finsuccess/40 transition-colors group/alert">
                     <p className="text-sm font-black text-finmain dark:text-white group-hover/alert:text-finsuccess transition-colors">Asset Retention Active</p>
                     <p className="text-[11px] text-finsecondary font-medium mt-1 leading-relaxed opacity-80">
                        Savings retention is currently optimized at **{formatCurrency(stats.savings)}**.
                     </p>
                  </div>
               </div>
            </div>

            <div className="dashboard-card bg-indigo-600/5 border-indigo-600/20 group hover:shadow-xl transition-all">
               <div className="flex items-center space-x-3 mb-8 text-indigo-500">
                  <Lightbulb size={22} />
                  <h4 className="text-xl font-black tracking-tighter">AI Suggestions</h4>
               </div>
               <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/60 border border-indigo-600/10 space-y-4">
                     <div className="p-3 bg-indigo-600/10 rounded-2xl w-fit text-indigo-500">
                        <TrendingDown size={20} />
                     </div>
                     <p className="text-[13px] font-black text-finmain dark:text-white leading-tight italic">
                        "Consider reducing {topCategory} by 10% next month to increase your annual savings by **{formatCurrency(topAmount * 0.1 * 12)}**."
                     </p>
                  </div>
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[3px] shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                     View Annual Roadmap
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default Insights;
