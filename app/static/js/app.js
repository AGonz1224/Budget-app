/* Author: Alberto Gonzalez */
/* Project: Budget App */
/* File Name: app.js */
/* Date Created: October 27, 2025 */
/* Date Last Edited: October 27, 2025 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('transaction-form');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
  
    const totalIncomeEl = document.getElementById('total-income');
    const totalBillsEl = document.getElementById('total-bills');
    const leftoverEl = document.getElementById('leftover');
  
    let totals = { income: 0, bills: 0 };
  
    const fmt = n => `$${n.toFixed(2)}`;
  
    function render() {
      totalIncomeEl.textContent = fmt(totals.income);
      totalBillsEl.textContent = fmt(totals.bills);
      leftoverEl.textContent = fmt(totals.income - totals.bills);
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = parseFloat(amountInput.value);
  
      if (Number.isNaN(raw) || raw <= 0) {
        alert('Please enter an amount greater than 0.');
        return;
      }
  
      if (typeSelect.value === 'income') {
        totals.income += raw;
      } else {
        totals.bills += raw;
      }
  
      render();
      amountInput.value = '';
      amountInput.focus();
    });
  
    render();
  });
  