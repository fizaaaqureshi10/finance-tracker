// Load transactions from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Update UI
function updateUI() {
  const list = document.getElementById('list');
  const balance = document.getElementById('balance');
  const totalIncome = document.getElementById('total-income');
  const totalExpense = document.getElementById('total-expense');

  // Clear list
  list.innerHTML = '';

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    // Calculate totals
    if (t.amount > 0) income += t.amount;
    else expense += Math.abs(t.amount);

    // Create list item
    const li = document.createElement('li');
    li.classList.add(t.amount > 0 ? 'income-item' : 'expense-item');
    li.innerHTML = `
      <span>${t.desc}</span>
      <span>${t.amount > 0 ? '+' : ''}₹${t.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">🗑️</button>
    `;
    list.appendChild(li);
  });

  // Update balance and summary
  balance.textContent = `₹${(income - expense).toFixed(2)}`;
  totalIncome.textContent = `₹${income.toFixed(2)}`;
  totalExpense.textContent = `₹${expense.toFixed(2)}`;
}

// Add transaction
function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);

  if (desc === '' || isNaN(amount)) {
    alert('Please enter description and amount!');
    return;
  }

  transactions.push({ desc, amount });
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Clear inputs
  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';

  updateUI();
}

// Delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateUI();
}

// Initial load
updateUI();