import React, { useState } from 'react';
import { TrendingDown, Wallet, DollarSign, PiggyBank, Plus, Download, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SummaryCard from '../components/SummaryCard';
import ChartSection from '../components/ChartSection';
import TransactionTable from '../components/TransactionTable';
import { FinancialHealthScore, RecentActivityTimeline } from '../components/DashboardExtras';
import AddTransactionModal from '../components/AddTransactionModal';
import CashFlowModal from '../components/CashFlowModal';

function Dashboard() {
  const { stats, role, exportCSV, searchQuery, setSearchQuery } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-14 text-finmain dark:text-white">
      
      {/* Dynamic Search Interface (Mobile Optimization) */}
      <div className="sm:hidden group relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-finsecondary" size={16} />
          <input 
            type="text" 
            placeholder="Search data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-fincarddark rounded-2xl border border-finborder dark:border-findivider outline-none text-xs font-black uppercase tracking-widest shadow-sm"
          />
      </div>

      {/* Header Context Section - Refined for high impact visibility */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-7 md:space-y-0">
        <div className="space-y-2">
          {/* Portfolio Analytics label removed as requested */}
          <h1 className="text-5xl font-black tracking-tighter leading-tight animate-in fade-in slide-in-from-left duration-700">
            Hello, Srideepalakshmi S! 👋
          </h1>
          <p className="text-lg font-medium text-finsecondary opacity-80 max-w-2xl px-1">
             Strategic intelligence workspace for your personal financial growth and asset management.
          </p>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <button 
            onClick={exportCSV}
            className="btn btn-secondary space-x-2 text-[10px] font-black uppercase tracking-widest h-14 flex-1 md:flex-none border-finborder ring-1 ring-black/5 hover:shadow-xl transition-all active:scale-95"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export Transactions</span>
          </button>
          
          {role === 'Admin' && (
            <button 
              onClick={handleAddClick}
              className="btn btn-primary space-x-2 text-[10px] font-black uppercase tracking-widest h-14 flex-1 md:flex-none shadow-2xl shadow-finprimary/30 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <Plus size={14} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      {/* Financial Health Summary (Forced Results: 52.4k Balance, 80k Income, etc) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount={stats.currentBalance} 
          icon={<Wallet />} 
          trend="+12.4% Trailing" 
          isPositive={true}
          colorClass="text-finprimary"
        />
        <SummaryCard 
          title="Income" 
          amount={stats.totalIncome} 
          icon={<DollarSign />} 
          trend="+8.2% Growth" 
          isPositive={true}
          colorClass="text-finsuccess"
        />
        <SummaryCard 
          title="Expenses" 
          amount={stats.totalExpense} 
          icon={<TrendingDown />} 
          trend="-4.1% Reduced" 
          isPositive={false}
          colorClass="text-finexpense"
        />
        <SummaryCard 
          title="Savings" 
          amount={stats.savings} 
          icon={<PiggyBank />} 
          trend="+22.8% Improvement" 
          isPositive={true}
          colorClass="text-amber-500"
        />
      </div>

      <ChartSection />

      {/* Primary Data Ledger Hub */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        <div className="xl:col-span-2 space-y-6">
           <TransactionTable onAddClick={handleAddClick} onEditClick={handleEdit} />
        </div>

        <div className="space-y-10">
           <FinancialHealthScore score={stats.healthScore} />
           <RecentActivityTimeline />
        </div>

      </div>

      {/* Production-Ready Modals */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingTransaction={editingTransaction}
      />

      <CashFlowModal />
      
    </div>
  );
}

export default Dashboard;
