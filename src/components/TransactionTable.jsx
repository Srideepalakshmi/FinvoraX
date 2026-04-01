import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, MoreHorizontal, Edit, Trash2, IndianRupee, Utensils, Zap, ShoppingBag, Car, Music, Plus, Download, Inbox, Hash, RefreshCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';

const categoryIcons = {
  Food: <Utensils size={14} />,
  Bills: <Zap size={14} />,
  Shopping: <ShoppingBag size={14} />,
  Travel: <Car size={14} />,
  Entertainment: <Music size={14} />,
  Salary: <IndianRupee size={14} />,
};

function TransactionTable({ onAddClick, onEditClick }) {
  const { 
    transactions, deleteTransaction, role, 
    searchQuery, setSearchQuery, 
    filterType, setFilterType, 
    sortConfig, setSortConfig,
    exportCSV,
    initialTransactions,
    resetData 
  } = useApp();

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             t.amount.toString().includes(searchQuery) ||
                             (t.note && t.note.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filterType === 'all' ? true : t.type === filterType;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const mod = sortConfig.direction === 'asc' ? 1 : -1;
        if (sortConfig.key === 'amount') return (Number(a.amount) - Number(b.amount)) * mod;
        if (sortConfig.key === 'date') return (new Date(a.date) - new Date(b.date)) * mod;
        return 0;
      });
  }, [transactions, searchQuery, filterType, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="dashboard-card overflow-hidden border border-finborder/50 hover:shadow-2xl transition-all duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-6 md:space-y-0">
        <div className="space-y-2">
           <h4 className="text-3xl font-black text-finmain dark:text-white tracking-tighter leading-none">Journal Archives 📝</h4>
           <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[3px] text-finprimary opacity-70">
              <Hash size={12} />
              <span>{filteredTransactions.length} Verified Entries</span>
           </div>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
             <select 
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
               className="w-full bg-finbglight/60 dark:bg-slate-800/60 border border-finborder dark:border-findivider outline-none rounded-2xl p-3.5 text-[10px] font-black uppercase tracking-widest text-finsecondary cursor-pointer shadow-sm hover:border-finprimary/30 transition-all appearance-none"
             >
               <option value="all">📊 All Analytics</option>
               <option value="income">💰 Inflow Only</option>
               <option value="expense">🛒 Outflow Only</option>
             </select>
          </div>
          
          <button 
            onClick={exportCSV}
            className="btn btn-secondary !p-3.5 hidden md:flex ring-1 ring-black/5 shadow-sm active:scale-90" 
            title="Download CSV Archives"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 bg-white dark:bg-fincarddark rounded-3xl">
        <table className="w-full text-left">
          <thead className="bg-finbglight/40 dark:bg-slate-800/40 border-y border-finborder dark:border-findivider">
            <tr>
              <th className="px-6 py-6 text-[10px] font-black text-finsecondary uppercase tracking-[3px] cursor-pointer hover:text-finprimary" onClick={() => toggleSort('date')}>
                <div className="flex items-center space-x-2">
                  <span>Audit Date</span>
                  <ArrowUpDown size={12} className="opacity-30" />
                </div>
              </th>
              <th className="px-6 py-6 text-[10px] font-black text-finsecondary uppercase tracking-[3px]">Financial Segment</th>
              <th className="px-6 py-6 text-[10px] font-black text-finsecondary uppercase tracking-[3px] cursor-pointer hover:text-finprimary" onClick={() => toggleSort('amount')}>
                 <div className="flex items-center space-x-2">
                  <span>Exchange Volume</span>
                  <ArrowUpDown size={12} className="opacity-30" />
                </div>
              </th>
              <th className="px-6 py-6 text-[10px] font-black text-finsecondary uppercase tracking-[3px]">Indicator</th>
              <th className="px-6 py-6 text-[10px] font-black text-finsecondary uppercase tracking-[3px] text-right pr-10">Command</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-finborder/30 dark:divide-findivider/30">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-finbglight/30 dark:hover:bg-slate-800/40 transition-all group">
                  <td className="px-6 py-6 text-sm font-black text-finmain dark:text-white whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-2xl bg-finprimary/10 text-finprimary group-hover:scale-110 transition-transform shadow-sm">
                        {categoryIcons[t.category] || <MoreHorizontal size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-black text-finmain dark:text-white leading-tight group-hover:text-finprimary transition-colors">{t.category}</p>
                        <p className="text-[11px] text-finsecondary truncate max-w-[200px] font-medium italic mt-1.5 opacity-60">{t.note}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-6 text-sm font-black ${t.type === 'income' ? 'text-finsuccess scale-105 origin-left' : 'text-finmain dark:text-white opacity-90'}`}>
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-6 transition-transform group-hover:scale-105 origin-left">
                    <span className={`badge ${t.type === 'income' ? 'badge-success shadow-lg shadow-finsuccess/10' : 'badge-expense shadow-lg shadow-finexpense/10'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right pr-10">
                    {role === 'Admin' ? (
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0">
                        <button 
                          onClick={() => onEditClick(t)}
                          className="p-3 rounded-2xl hover:bg-finprimary/10 text-finprimary transition-all active:scale-90 border border-transparent hover:border-finprimary/20"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="p-3 rounded-2xl hover:bg-red-500/10 text-red-500 transition-all active:scale-90 border border-transparent hover:border-red-500/20"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-finsecondary/30 text-[9px] font-black uppercase tracking-[3px] italic">Secured</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-7 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-finbglight/50 dark:bg-slate-800/50 rounded-[40px] flex items-center justify-center border border-finborder dark:border-findivider shadow-inner">
                      <Inbox className="text-finsecondary/40" size={48} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-black text-finmain dark:text-white tracking-tighter">Telemetric conflict</p>
                      <p className="text-xs text-finsecondary font-bold uppercase tracking-widest opacity-60">Current filter contains zero matching results</p>
                    </div>
                    <button 
                      onClick={resetData}
                      className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[3px] text-white bg-finprimary px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-finprimary/20"
                    >
                      <RefreshCcw size={14} />
                      <span>Recover Calibrated Data</span>
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
