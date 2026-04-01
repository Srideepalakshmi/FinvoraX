import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import Settings from './pages/Settings';

function Layout() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="flex h-screen overflow-hidden bg-finbglight dark:bg-finbgdark">
      {/* Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Actions Bar */}
        <Navbar />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-transform duration-300">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
            {activeTab === 'Dashboard' && <Dashboard />}
            {activeTab === 'Transactions' && <Transactions />}
            {activeTab === 'Insights' && <Insights />}
            {activeTab === 'Settings' && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}

export default App;
