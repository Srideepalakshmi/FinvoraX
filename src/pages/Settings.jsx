import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Moon, Bell, Sun, ExternalLink, Mail, BellOff } from 'lucide-react';

function Settings() {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-finmain dark:text-white">Profile Settings ⚙️</h1>
        <p className="text-sm font-medium text-finsecondary">Customize your environment and account configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Account Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="dashboard-card space-y-8">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-3">
                  <div className="p-3 bg-finprimary/10 text-finprimary rounded-xl">
                    <User size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Member Profile</h2>
               </div>
               <a 
                  href="https://tinyurl.com/Srideepalakshmi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] font-black uppercase tracking-widest text-finprimary flex items-center space-x-2 px-3 py-1.5 bg-finprimary/10 rounded-full hover:bg-finprimary hover:text-white transition-all shadow-sm"
               >
                  <span>Connect Portfolio</span>
                  <ExternalLink size={12} />
               </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-finsecondary uppercase tracking-widest">Full Name</label>
                  <div className="flex items-center p-4 bg-finbglight dark:bg-slate-800 rounded-2xl group border border-transparent focus-within:border-finprimary/20 transition-all">
                     <User size={16} className="text-finsecondary mr-3" />
                     <input type="text" readOnly value="Srideepalakshmi S" className="bg-transparent border-none outline-none font-bold text-finmain dark:text-white flex-1 cursor-default" />
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-finsecondary uppercase tracking-widest">Personal Email</label>
                  <div className="flex items-center p-4 bg-finbglight dark:bg-slate-800 rounded-2xl group border border-transparent focus-within:border-finprimary/20 transition-all">
                     <Mail size={16} className="text-finsecondary mr-3" />
                     <input type="text" readOnly value="srideepa@finvorax.com" className="bg-transparent border-none outline-none font-bold text-finmain dark:text-white flex-1 cursor-default" />
                  </div>
               </div>
            </div>
          </div>

          <div className="dashboard-card space-y-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-finprimary/10 text-finprimary rounded-xl">
                 <Shield size={20} />
              </div>
              <h2 className="text-xl font-bold">Permissions & Governance</h2>
            </div>

            <div className="p-6 rounded-2xl bg-finbglight dark:bg-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div className="space-y-1">
                  <p className="font-black text-finmain dark:text-white text-lg">Platform Access: {role}</p>
                  <p className="text-xs text-finsecondary font-medium italic">Switcher for evaluation purposes.</p>
               </div>
               <div className="flex bg-white dark:bg-fincarddark p-1.5 rounded-2xl border border-finborder dark:border-findivider shadow-sm ring-1 ring-black/5">
                  <button 
                    onClick={() => setRole('Admin')}
                    className={`px-5 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${role === 'Admin' ? 'bg-finprimary text-white shadow-xl shadow-finprimary/20' : 'text-finsecondary hover:bg-slate-50'}`}
                  >
                    Admin
                  </button>
                  <button 
                    onClick={() => setRole('Viewer')}
                    className={`px-5 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${role === 'Viewer' ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'text-finsecondary hover:bg-slate-50'}`}
                  >
                    Viewer
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Right Col: Preferences */}
        <div className="space-y-8">
           <div className="dashboard-card space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-finprimary/10 text-finprimary rounded-xl">
                   <Moon size={20} />
                </div>
                <h2 className="text-xl font-bold">Appearance</h2>
              </div>
              <div className="flex justify-between items-center p-4 bg-finbglight dark:bg-slate-800 rounded-2xl">
                 <p className="text-xs font-black text-finsecondary uppercase tracking-widest">Active Dark Theme</p>
                 <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-14 h-8 rounded-full p-1.5 transition-all ${darkMode ? 'bg-finprimary shadow-inner shadow-black/20' : 'bg-slate-200'} relative`}
                 >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'} flex items-center justify-center`}>
                       {darkMode ? <Moon size={10} className="text-finprimary" /> : <Sun size={10} className="text-amber-500" />}
                    </div>
                 </button>
              </div>
           </div>

           <div className="dashboard-card space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-finprimary/10 text-finprimary rounded-xl">
                   <Bell size={20} />
                </div>
                <h2 className="text-xl font-bold">Communication</h2>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center p-3 opacity-60">
                    <div className="flex items-center space-x-3">
                       <Mail size={16} className="text-finsecondary" />
                       <p className="text-xs font-bold text-finsecondary">Email Updates</p>
                    </div>
                    <span className="text-[10px] font-black uppercase text-finsecondary bg-slate-100 px-2 py-0.5 rounded">Disabled</span>
                 </div>
                 <div className="flex justify-between items-center p-3 opacity-60">
                    <div className="flex items-center space-x-3">
                       <BellOff size={16} className="text-finsecondary" />
                       <p className="text-xs font-bold text-finsecondary">System Alerts</p>
                    </div>
                    <span className="text-[10px] font-black uppercase text-finsecondary bg-slate-100 px-2 py-0.5 rounded">Disabled</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;
