import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

// Data model for balance trends
const dummyLineData = [
  { name: 'Jan', balance: 35000 },
  { name: 'Feb', balance: 42000 },
  { name: 'Mar', balance: 38000 },
  { name: 'Apr', balance: 52400 },
  { name: 'May', balance: 48000 },
  { name: 'Jun', balance: 55000 },
];

const dummyPieData = [
  { name: 'Food', value: 400, color: '#2563EB' },
  { name: 'Travel', value: 300, color: '#F59E0B' },
  { name: 'Bills', value: 300, color: '#DC2626' },
  { name: 'Shopping', value: 200, color: '#16A34A' },
  { name: 'Entertainment', value: 150, color: '#8B5CF6' },
];

function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Primary Trend Analysis */}
      <div className="lg:col-span-2 dashboard-card min-h-[400px]">
        <h4 className="text-lg font-black text-finmain dark:text-white mb-6">Growth Analysis (Last 6 Months)</h4>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyLineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#2563EB" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#2563EB', strokeWidth: 2, stroke: '#FFFFFF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categorized Spending Breakdown */}
      <div className="dashboard-card min-h-[400px]">
        <h4 className="text-lg font-black text-finmain dark:text-white mb-6">Asset Allocation</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dummyPieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                stroke="transparent"
              >
                {dummyPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2 border-t border-slate-50 dark:border-slate-800 pt-4">
          {dummyPieData.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-finsecondary font-bold uppercase tracking-tight">{item.name}</span>
              </div>
              <span className="font-black text-finmain dark:text-white">
                {Math.round((item.value / 1350) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
