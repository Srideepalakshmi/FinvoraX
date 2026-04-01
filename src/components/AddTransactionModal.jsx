import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, IndianRupee, Tag, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

function AddTransactionModal({ isOpen, onClose, editingTransaction }) {
  const { addTransaction, editTransaction } = useApp();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Food',
    type: 'expense',
    note: ''
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'Food',
        type: 'expense',
        note: ''
      });
    }
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      editTransaction(formData);
    } else {
      addTransaction(formData);
    }
    onClose();
  };

  const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Salary', 'Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300">
      <div className="bg-white dark:bg-fincarddark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-finborder dark:border-findivider ring-1 ring-black/5 animate-in zoom-in-95 fade-in duration-300">
        
        {/* Modal Entry Transition Header */}
        <div className="p-8 border-b border-finborder dark:border-findivider flex justify-between items-center bg-finbglight/40 dark:bg-slate-800/40">
          <div>
            <h4 className="text-2xl font-black text-finmain dark:text-white leading-none">
              {editingTransaction ? 'Amend Record' : 'Record Entry'}
            </h4>
            <p className="text-[10px] uppercase font-black tracking-widest text-finsecondary mt-2">Financial Documentation</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-finsecondary hover:text-finmain dark:hover:text-white active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Organization */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-finsecondary flex items-center space-x-2 uppercase tracking-widest">
                 <Calendar size={12} className="text-finprimary" /> 
                 <span>Processing Date</span>
              </label>
              <input 
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-4 bg-finbglight dark:bg-slate-800 border-none outline-none rounded-2xl text-sm font-black text-finmain dark:text-white focus:ring-4 ring-finprimary/10 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-finsecondary flex items-center space-x-2 uppercase tracking-widest">
                 <IndianRupee size={12} className="text-finprimary" /> 
                 <span>Asset Volume</span>
              </label>
              <input 
                type="number"
                required
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full p-4 bg-finbglight dark:bg-slate-800 border-none outline-none rounded-2xl text-sm font-black text-finmain dark:text-white focus:ring-4 ring-finprimary/10 transition-all font-mono shadow-inner"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-finsecondary flex items-center space-x-2 uppercase tracking-widest">
                 <Tag size={12} className="text-finprimary" /> 
                 <span>Asset Segment</span>
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-4 bg-finbglight dark:bg-slate-800 border-none outline-none rounded-2xl text-sm font-black text-finmain dark:text-white focus:ring-4 ring-finprimary/10 transition-all appearance-none shadow-inner cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-finsecondary flex items-center space-x-2 uppercase tracking-widest">
                 <Info size={12} className="text-finprimary" /> 
                 <span>Flow Type</span>
              </label>
              <div className="flex p-1.5 bg-finbglight dark:bg-slate-800 rounded-2xl space-x-1.5 shadow-inner">
                 <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'income'})}
                  className={`flex-1 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${formData.type === 'income' ? 'bg-finsuccess text-white shadow-lg shadow-finsuccess/20' : 'text-finsecondary hover:bg-black/5'}`}
                 >
                   Income
                 </button>
                 <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  className={`flex-1 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${formData.type === 'expense' ? 'bg-finexpense text-white shadow-lg shadow-finexpense/20' : 'text-finsecondary hover:bg-black/5'}`}
                 >
                   Expense
                 </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black text-finsecondary flex items-center space-x-2 uppercase tracking-widest">
                <Info size={12} className="text-finprimary" />
                <span>Contextual Note</span>
             </label>
             <textarea 
               value={formData.note}
               onChange={(e) => setFormData({...formData, note: e.target.value})}
               placeholder="Additional contextual details..."
               className="w-full p-5 bg-finbglight dark:bg-slate-800 border-none outline-none rounded-2xl text-sm font-black text-finmain dark:text-white focus:ring-4 ring-finprimary/10 transition-all h-28 shadow-inner italic"
             />
          </div>

          <div className="flex space-x-5 pt-6 border-t border-finborder dark:border-findivider">
             <button 
                type="button" 
                onClick={onClose}
                className="btn btn-secondary flex-1 font-black uppercase text-xs tracking-widest h-14"
             >
               Cancel
             </button>
             <button 
                type="submit" 
                className="btn btn-primary flex-1 space-x-3 shadow-2xl shadow-finprimary/30 h-14"
             >
               <Save size={20} />
               <span className="font-black uppercase text-xs tracking-widest">{editingTransaction ? 'Amend Data' : 'Execute Record'}</span>
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
