import React from 'react';
import { LayoutDashboard, Receipt, Lightbulb, Settings, CreditCard, ChevronRight, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Sidebar() {
  const { activeTab, setActiveTab } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', icon: <Receipt size={20} /> },
    { name: 'Insights', icon: <Lightbulb size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Dynamic Mobile Interface Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-finprimary text-white rounded-2xl shadow-2xl animate-bounce hover:animate-none group transition-all active:scale-90"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} className="group-hover:rotate-90 transition-transform" />}
      </button>

      {/* Surface Overlay Interface */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Structural Sidebar Engine */}
      <aside className={`
        fixed md:relative z-40 h-full w-72 bg-white dark:bg-fincarddark border-r border-finborder dark:border-findivider
        transition-all duration-500 transform ease-in-out shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Core Brand Identity */}
        <div className="p-10 flex items-center space-x-4 group cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
          <div className="bg-finprimary p-2.5 rounded-2xl shadow-xl shadow-finprimary/20 group-hover:rotate-12 transition-transform duration-500">
            <CreditCard className="text-white" size={26} />
          </div>
          <span className="text-2xl font-black tracking-tight text-finmain dark:text-white">Finvora<span className="text-finprimary">X</span></span>
        </div>

        {/* Dynamic Workspace Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between p-4 rounded-2xl group transition-all duration-300
                ${activeTab === item.name 
                  ? 'bg-finprimary text-white shadow-xl shadow-finprimary/20 scale-[1.02]' 
                  : 'text-finsecondary hover:bg-finbglight dark:hover:bg-slate-800/50 hover:text-finmain dark:hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`transition-transform duration-300 ${activeTab === item.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <span className={`text-[13px] font-black uppercase tracking-widest ${activeTab === item.name ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>{item.name}</span>
              </div>
              <ChevronRight size={14} className={`transition-all duration-300 ${activeTab === item.name ? 'rotate-90 scale-125' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
            </button>
          ))}
        </nav>

        {/* Primary Profile Access (Navigates to Settings Page) */}
        <div className="p-6 border-t border-finborder dark:border-findivider">
          <div 
             onClick={() => {
               setActiveTab('Settings');
               setIsOpen(false);
             }}
             className="flex items-center space-x-4 p-4 rounded-2xl bg-finbglight/50 dark:bg-slate-800/40 hover:bg-finprimary/5 dark:hover:bg-finprimary/10 border border-transparent hover:border-finprimary/20 transition-all cursor-pointer group active:scale-[0.98] shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border-2 border-transparent group-hover:border-finprimary/30 transition-all shadow-inner">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Srideepalakshmi S" className="group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black truncate text-finmain dark:text-white leading-tight group-hover:text-finprimary transition-colors">Srideepalakshmi S</p>
              <p className="text-[10px] text-finsecondary truncate font-black uppercase tracking-widest mt-1 opacity-70">Premium Member</p>
            </div>
            <div className="p-1 px-2 text-[8px] font-black uppercase tracking-widest text-finprimary bg-finprimary/10 rounded-full border border-finprimary/10 opacity-0 group-hover:opacity-100 transition-opacity">
               Settings
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
