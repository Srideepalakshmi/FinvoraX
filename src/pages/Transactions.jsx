import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import AddTransactionModal from '../components/AddTransactionModal';
import { useApp } from '../context/AppContext';
import { Download, Plus } from 'lucide-react';

export function Transactions() {
  const { exportCSV, role } = useApp();
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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-finmain dark:text-white">Transactions History 📂</h1>
          <p className="text-sm font-medium text-finsecondary">Advanced exploration and audit of your financial records.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button 
            onClick={exportCSV} 
            className="btn btn-secondary space-x-2 text-sm flex-1 md:flex-none border-finborder shadow-sm"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          
          {role === 'Admin' && (
            <button 
              onClick={handleAddClick} 
              className="btn btn-primary space-x-2 text-sm flex-1 md:flex-none shadow-lg shadow-finprimary/20"
            >
              <Plus size={18} />
              <span>Add Record</span>
            </button>
          )}
        </div>
      </div>

      <div className="w-full">
         <TransactionTable onAddClick={handleAddClick} onEditClick={handleEdit} />
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingTransaction={editingTransaction}
      />
    </div>
  );
}

export default Transactions;
