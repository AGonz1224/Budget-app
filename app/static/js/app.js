// Author: Alberto Gonzalez
// Project: Budget App
// File Name: app.js
// Date Created: October 27, 2025
// Date Last Edited: October 27, 2025

document.addEventListener("DOMContentLoaded", function () {
    const form         = document.getElementById("transaction-form");
    const tbody        = document.getElementById("tx-body");
    const totalIncome  = document.getElementById("total-income");
    const totalBills   = document.getElementById("total-bills");
    const leftover     = document.getElementById("leftover");
  
    const STORAGE_KEY = "budget.transactions.v1";
  
    // ---- helpers ----
    const fmt = n => `$${n.toFixed(2)}`;
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : [];
        return Array.isArray(data) ? data : [];
      } catch { return []; }
    };
    const save = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  
    // ---- state ----
    let transactions = load();
  
    function recalcAndPaint() {
      let income = 0, expenses = 0;
      tbody.innerHTML = "";
  
      transactions.forEach((t, i) => {
        if (t.type === "income") income += t.amount; else expenses += t.amount;
  
        const tr = document.createElement("tr");
        tr.classList.add(t.type === "income" ? "income-row" : "expense-row");
        tr.innerHTML = `
          <td>${t.desc}</td>
          <td>${t.type.charAt(0).toUpperCase() + t.type.slice(1)}</td>
          <td>${fmt(t.amount)}</td>
          <td><button class="delete-btn" data-index="${i}">✖</button></td>
        `;
        tbody.appendChild(tr);
      });
  
      totalIncome.textContent = fmt(income);
      totalBills.textContent  = fmt(expenses);
      leftover.textContent    = fmt(income - expenses);
    }
  
    // initial render from storage
    recalcAndPaint();
  
    // add
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const descEl = document.getElementById("description");
      const amtEl  = document.getElementById("amount");
      const typeEl = document.getElementById("type");
  
      const desc = (descEl.value || "").trim();
      const amount = parseFloat(amtEl.value);
      const type = typeEl.value;
  
      if (!desc || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and positive amount.");
        return;
      }
  
      transactions.push({ desc, amount, type });
      save(transactions);
      recalcAndPaint();
  
      form.reset();
      descEl.focus();
    });
  
    // delete
    tbody.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
        const idx = Number(e.target.getAttribute("data-index"));
        if (!Number.isNaN(idx)) {
          transactions.splice(idx, 1);
          save(transactions);
          recalcAndPaint();
        }
      }
    });
  });
  