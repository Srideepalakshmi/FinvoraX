/**
 * Professional Formatting Utilities for FinvoraX
 */

/**
 * Formats a number into Indian Rupee (INR) currency format.
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a date string into 'DD MMM YYYY' format.
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Calculates a percentage string.
 * @param {number} value
 * @param {number} total
 * @returns {string}
 */
export const formatPercent = (value, total) => {
  if (!total) return '0%';
  return Math.round((value / total) * 100) + '%';
};
