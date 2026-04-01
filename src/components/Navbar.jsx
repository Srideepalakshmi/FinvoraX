import React from 'react';
import { Search, Moon, Sun, Bell, ShieldCheck, Eye, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Navbar() {
  const { role, setRole, darkMode, setDarkMode, searchQuery, setSearchQuery, setActiveTab } = useApp();

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-fincarddark border-b border-finborder dark:border-findivider sticky top-0 z-30 transition-all duration-300">
      
      {/* Search Bar - Advanced Filtration Interface */}
      <div className="hidden sm:flex items-center flex-1 max-w-md relative group">
        <Search className="absolute left-4 text-finsecondary group-focus-within:text-finprimary transition-all duration-300" size={18} />
        <input 
          type="text" 
          placeholder="Search activity, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`
            w-full pl-12 pr-4 py-2 bg-finbglight dark:bg-slate-800 rounded-2xl
            border border-transparent focus:border-finprimary/30 focus:bg-white dark:focus:bg-fincarddark
            outline-none transition-all duration-300 text-xs font-black uppercase tracking-widest
            text-finmain dark:text-white placeholder:text-finsecondary/50 placeholder:italic
          `}
        />
      </div>

      {/* Right Multi-Action Toolbar */}
      <div className="flex items-center space-x-2 md:space-x-5">
        
        {/* Role Segment Selector */}
        <div className="relative group">
          <div className="flex items-center space-x-2.5 p-2 px-4 rounded-2xl bg-finbglight dark:bg-slate-800/80 border border-finborder dark:border-findivider cursor-pointer transition-all hover:border-finprimary/40 shadow-sm active:scale-95">
            {role === 'Admin' ? <ShieldCheck className="text-finprimary" size={16} /> : <Eye className="text-amber-500" size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">{role}</span>
            <ChevronDown size={14} className="text-finsecondary" />
          </div>
          
          {/* Actionable Dropdown Overlay */}
          <div className="absolute top-full right-0 mt-3 w-40 bg-white dark:bg-fincarddark border border-finborder dark:border-findivider rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
            <button 
              onClick={() => setRole('Admin')}
              className={`w-full text-left p-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 hover:bg-finbglight dark:hover:bg-slate-800 transition-colors ${role === 'Admin' ? 'text-finprimary' : 'text-finsecondary'}`}
            >
              <ShieldCheck size={14} />
              <span>Full Admin</span>
            </button>
            <button 
              onClick={() => setRole('Viewer')}
              className={`w-full text-left p-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 hover:bg-finbglight dark:hover:bg-slate-800 transition-colors ${role === 'Viewer' ? 'text-amber-500' : 'text-finsecondary'}`}
            >
              <Eye size={14} />
              <span>Read-only</span>
            </button>
          </div>
        </div>

        {/* Global Dark Mode Refresh */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-2xl bg-finbglight dark:bg-slate-800 text-finsecondary hover:text-finprimary border border-finborder dark:border-findivider transition-all active:scale-95 shadow-sm"
          title="Toggle UI Refresh"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Hub */}
        <button className="p-3 rounded-2xl bg-finbglight dark:bg-slate-800 text-finsecondary hover:text-finprimary border border-finborder dark:border-findivider relative transition-all active:scale-95 shadow-sm">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
        </button>

        {/* Dynamic Profile Navigation */}
        <div className="md:border-l border-finborder dark:border-findivider md:pl-5 pl-0">
          <button 
            onClick={() => setActiveTab('Settings')}
            className="w-10 h-10 rounded-2xl bg-finbglight dark:bg-slate-800 border-2 border-finborder hover:border-finprimary/50 overflow-hidden transition-all hover:shadow-lg active:scale-90 group"
          >
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="group-hover:scale-110 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
