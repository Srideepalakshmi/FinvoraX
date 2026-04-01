import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

function SummaryCard({ title, amount, icon, trend, isPositive, colorClass }) {
  // Mapping standard text classes to our robust fin system (no hyphens)
  const mappedColorClass = colorClass
    .replace('text-finprimary', 'text-finprimary')
    .replace('text-finsuccess', 'text-finsuccess')
    .replace('text-finexpense', 'text-finexpense');

  return (
    <div className="dashboard-card relative overflow-hidden group">
      {/* Background Icon Decoration */}
      <div className={`absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 scale-90 ${mappedColorClass}`}>
        {icon}
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-opacity-10 dark:bg-opacity-20 ${mappedColorClass.replace('text-', 'bg-')} ${mappedColorClass}`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-finsuccess/10 text-finsuccess' : 'bg-finexpense/10 text-finexpense'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{trend}</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-finsecondary">{title}</p>
        <h3 className="text-2xl font-black tracking-tight text-finmain dark:text-white">
          {formatCurrency(amount)}
        </h3>
      </div>
      
      <p className="text-[10px] mt-3 font-medium text-finsecondary/70">Performance vs Last Month</p>
    </div>
  );
}

export default SummaryCard;
