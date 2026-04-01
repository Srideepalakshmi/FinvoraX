export const initialTransactions = [
  { id: 1, date: '2026-04-02', amount: 80000, category: 'Salary', type: 'income', note: 'Monthly Portfolio Credited' },
  { id: 2, date: '2026-04-01', amount: 12000, category: 'Travel', type: 'expense', note: 'Flight Ticketing & Conveyance' },
  { id: 3, date: '2026-04-01', amount: 4500, category: 'Food', type: 'expense', note: 'Dinner at Olive Garden' },
  { id: 4, date: '2026-03-25', amount: 6500, category: 'Bills', type: 'expense', note: 'Utility & Electricity Bill' },
  { id: 5, date: '2026-03-22', amount: 3800, category: 'Travel', type: 'expense', note: 'Executive Uber Ride' },
  { id: 6, date: '2026-03-20', amount: 800, category: 'Entertainment', type: 'expense', note: 'Immersive Movie Experience' },
  // 12000 + 4500 + 6500 + 3800 + 800 = 27,600 (Total Expense)
  // 80,000 - 27,600 = 52,400 (Net Profit/Balance)
];

export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Salary', 'Other'];
