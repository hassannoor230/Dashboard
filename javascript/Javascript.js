const loginPage = document.getElementById('loginPage');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    document.getElementById('loginBtn').onclick = () => {
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      if (u && p) {
        loginPage.style.display = 'none';
        sidebar.style.display = 'block';
        mainContent.style.display = 'block';
        document.querySelectorAll('#mainContent > div:not(.topbar)').forEach(d => d.style.display = 'none');
        document.getElementById('dashboardPage').style.display = 'block';
      } else { alert('Enter username and password!'); }
    }

    const sidebarToggleIcon = document.getElementById('sidebarToggleIcon');
    sidebarToggleIcon.onclick = () => {
      sidebar.classList.toggle('collapsed');
      const icon = sidebarToggleIcon.querySelector('i');
      if (sidebar.classList.contains('collapsed')) {
        icon.classList.replace('fa-angle-left', 'fa-angle-right');
      } else {
        icon.classList.replace('fa-angle-right', 'fa-angle-left');
      }
    }




    document.querySelectorAll('.menu a').forEach(a => {
      a.onclick = () => {
        const page = a.dataset.page;
        if (page === 'logout') {
          loginPage.style.display = 'flex';
          sidebar.style.display = 'none';
          mainContent.style.display = 'none';
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
        } else {
          document.querySelectorAll('#mainContent > div:not(.topbar)').forEach(d => d.style.display = 'none');
          document.getElementById(page + 'Page').style.display = 'block';
          
          const pageTitles = {
            'dashboard': 'Dashboard',
            'customers': 'Customers',
            'orders': 'Orders',
            'analytics': 'Analytics',
            'payments': 'Payments',
            'messages': 'Messages',
            'notifications': 'Notifications',
            'settings': 'Settings',
            'profile': 'Profile'
          };
          document.getElementById('pageTitle').textContent = pageTitles[page] || 'Dashboard';
        }
      }
    });


    document.getElementById("notifyBtn").onclick = (e) => {
      e.stopPropagation();
      const box = document.getElementById("notificationBox");
      box.style.display = box.style.display === "block" ? "none" : "block";
    };
    notificationBox.onclick = (e) => {
      e.stopPropagation();
    };
    document.addEventListener("click", () => {
      document.getElementById("notificationBox").style.display = "none";
    });

    document.getElementById("menuBtn").onclick = (e) => {
      e.stopPropagation();
      const box = document.getElementById("menuDropdown");
      box.style.display = box.style.display === "block" ? "none" : "block";
    };

    document.addEventListener("click", () => {
      document.getElementById("menuDropdown").style.display = "none";
    });
    document.getElementById('darkToggle').onclick = () => document.body.classList.toggle('dark');

    new Chart(document.getElementById('salesChart'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ label: 'Sales', data: [1200, 1900, 3000, 2500, 4200, 3800], borderWidth: 3, borderColor: '#4f46e1', backgroundColor: 'rgba(10,20,129,0.1)', tension: 0.3 }]
      }
    });
    let customersData = [
      { id: 1, name: "Ali Khan", email: "ali@gmail.com", address: "Lahore", status: "Active" },
      { id: 2, name: "Ahmed Raza", email: "ahmed@gmail.com", address: "Karachi", status: "Inactive" },
      { id: 3, name: "Usman Shah", email: "usman@gmail.com", address: "Islamabad", status: "Active" },
      { id: 4, name: "Sara Malik", email: "sara@gmail.com", address: "Multan", status: "Active" }
    ];

    let editCustomerId = null;

    function loadCustomers() {
      const body = document.getElementById("customerBody");
      body.innerHTML = "";
      customersData.forEach(c => {
        body.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.address}</td>
        <td style="color:${c.status === "Active" ? "green" : "red"}">${c.status}</td>
        <td>
          <button class="edit" onclick="editCustomer(${c.id})">Edit</button>
          <button class="delete" onclick="deleteCustomer(${c.id})">Delete</button>
        </td>
      </tr>
    `;
      });
    }
    const searchCustomerInput = document.getElementById("searchCustomer");
    function searchCustomer() {
      const val = searchCustomerInput.value.toLowerCase();
      document.querySelectorAll("#customerBody tr").forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    }

    function openCustomerModal() {
      editCustomerId = null;
      document.getElementById("modalTitle").innerText = "Add Customer";
      document.getElementById("cName").value = "";
      document.getElementById("cEmail").value = "";
      document.getElementById("cAddress").value = "";
      document.getElementById("cStatus").value = "Active";
      document.getElementById("cPassword").value = "";
      document.getElementById("customerModal").style.display = "flex";
    }

    function editCustomer(id) {
      const c = customersData.find(c => c.id === id);
      if (!c) return;
      editCustomerId = id;
      document.getElementById("modalTitle").innerText = "Edit Customer";
      document.getElementById("cName").value = c.name;
      document.getElementById("cEmail").value = c.email;
      document.getElementById("cAddress").value = c.address;
      document.getElementById("cStatus").value = c.status;
      document.getElementById("cPassword").value = "";
      document.getElementById("customerModal").style.display = "flex";
    }

    document.getElementById("saveCustomerBtn").onclick = () => {
      const name = document.getElementById("cName").value;
      const email = document.getElementById("cEmail").value;
      const address = document.getElementById("cAddress").value;
      const status = document.getElementById("cStatus").value;
      if (!name || !email || !address) { alert("Fill all fields!"); return; }

      if (editCustomerId) {
        const c = customersData.find(c => c.id === editCustomerId);
        c.name = name; c.email = email; c.address = address; c.status = status;
      } else {
        const id = customersData.length ? customersData[customersData.length - 1].id + 1 : 1;
        customersData.push({ id, name, email, address, status });
      }
      loadCustomers();
      document.getElementById("customerModal").style.display = "none";
    }

    document.getElementById("closeModal").onclick = () => {
      document.getElementById("customerModal").style.display = "none";
    }

    function deleteCustomer(id) {
      if (confirm("Are you sure?")) {
        customersData = customersData.filter(c => c.id !== id);
        loadCustomers();
      }
    }
    let ordersData = [
      { id: 1, customer: "Ali Khan", product: "Laptop", quantity: 1, status: "Shipped", amount: 1200 },
      { id: 2, customer: "Sara Malik", product: "Smartphone", quantity: 2, status: "Pending", amount: 800 },
      { id: 3, customer: "Usman Shah", product: "Headphones", quantity: 3, status: "Delivered", amount: 300 },
      { id: 4, customer: "Ahmed Raza", product: "Camera", quantity: 1, status: "Cancelled", amount: 500 },
      { id: 5, customer: "Fatima Noor", product: "Smartwatch", quantity: 2, status: "Delivered", amount: 400 },
      { id: 6, customer: "Bilal Khan", product: "Tablet", quantity: 1, status: "Pending", amount: 600 },
      { id: 7, customer: "Ayesha Ali", product: "Printer", quantity: 1, status: "Shipped", amount: 250 },
      { id: 8, customer: "Haris Ahmed", product: "Keyboard", quantity: 5, status: "Delivered", amount: 150 },
      { id: 9, customer: "Zara Shah", product: "Monitor", quantity: 2, status: "Cancelled", amount: 450 },
      { id: 10, customer: "Imran Malik", product: "Mouse", quantity: 3, status: "Pending", amount: 90 }
    ];

    let editOrderId = null;

    function loadOrders() {
      const body = document.getElementById("orderBody");
      body.innerHTML = "";
      ordersData.forEach(o => {
        body.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.customer}</td>
        <td>${o.product}</td>
        <td>${o.quantity}</td>
        <td style="color:${o.status === "Delivered" ? "green" : o.status === "Cancelled" ? "red" : "orange"}">${o.status}</td>
        <td>$${o.amount}</td>
        <td>
          <button class="edit" onclick="editOrder(${o.id})">Edit</button>
          <button class="delete" onclick="deleteOrder(${o.id})">Delete</button>
        </td>
      </tr>
    `;
      });
    }

    function searchOrder() {
      const val = document.getElementById("searchOrder").value.toLowerCase();
      document.querySelectorAll("#orderBody tr").forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    }

    function openOrderModal() {
      editOrderId = null;
      document.getElementById("orderModalTitle").innerText = "Add Order";
      document.getElementById("oCustomer").value = "";
      document.getElementById("oProduct").value = "";
      document.getElementById("oQuantity").value = "";
      document.getElementById("oAmount").value = "";
      document.getElementById("oStatus").value = "Pending";
      document.getElementById("orderModal").style.display = "flex";
    }

    function editOrder(id) {
      const o = ordersData.find(o => o.id === id);
      if (!o) return;
      editOrderId = id;
      document.getElementById("orderModalTitle").innerText = "Edit Order";
      document.getElementById("oCustomer").value = o.customer;
      document.getElementById("oProduct").value = o.product;
      document.getElementById("oQuantity").value = o.quantity;
      document.getElementById("oAmount").value = o.amount;
      document.getElementById("oStatus").value = o.status;
      document.getElementById("orderModal").style.display = "flex";
    }

    document.getElementById("saveOrderBtn").onclick = () => {
      const customer = document.getElementById("oCustomer").value;
      const product = document.getElementById("oProduct").value;
      const quantity = document.getElementById("oQuantity").value;
      const amount = document.getElementById("oAmount").value;
      const status = document.getElementById("oStatus").value;

      if (!customer || !product || !quantity || !amount) { alert("Fill all fields!"); return; }

      if (editOrderId) {
        const o = ordersData.find(o => o.id === editOrderId);
        o.customer = customer; o.product = product; o.quantity = quantity; o.amount = amount; o.status = status;
      } else {
        const id = ordersData.length ? ordersData[ordersData.length - 1].id + 1 : 1;
        ordersData.push({ id, customer, product, quantity, amount, status });
      }

      loadOrders();
      document.getElementById("orderModal").style.display = "none";
    }

    document.getElementById("closeOrderModal").onclick = () => {
      document.getElementById("orderModal").style.display = "none";
    }

    function deleteOrder(id) {
      if (confirm("Are you sure?")) {
        ordersData = ordersData.filter(o => o.id !== id);
        loadOrders();
      }
    }

    loadOrders();
    new Chart(document.getElementById('monthlySalesChart'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales ($)',
          data: [1200, 1900, 3000, 2500, 4200, 3800],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

    const orderStatusData = { Pending: 3, Shipped: 2, Delivered: 4, Cancelled: 1 };
    new Chart(document.getElementById('orderStatusChart'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(orderStatusData),
        datasets: [{
          label: 'Orders',
          data: Object.values(orderStatusData),
          backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
    let paymentsData = [
      { id: 101, customer: "Ali Khan", method: "Credit Card", amount: 1200, status: "Completed", date: "2025-01-10" },
      { id: 102, customer: "Sara Malik", method: "PayPal", amount: 800, status: "Pending", date: "2025-01-12" },
      { id: 103, customer: "Usman Shah", method: "Bank Transfer", amount: 450, status: "Completed", date: "2025-01-13" },
      { id: 104, customer: "Ahmed Raza", method: "Credit Card", amount: 300, status: "Failed", date: "2025-01-14" },
      { id: 105, customer: "Fatima Noor", method: "PayPal", amount: 950, status: "Completed", date: "2025-01-15" }
    ];

    function loadPayments() {
      const body = document.getElementById("paymentBody");
      body.innerHTML = "";

      paymentsData.forEach(p => {
        let color =
          p.status === "Completed" ? "green" :
            p.status === "Pending" ? "orange" : "red";

        body.innerHTML += `
      <tr>
        <td>#${p.id}</td>
        <td>${p.customer}</td>
        <td>${p.method}</td>
        <td>$${p.amount}</td>
        <td style="color:${color};font-weight:bold">${p.status}</td>
        <td>${p.date}</td>
      </tr>
    `;
      });
    }

    loadPayments();

function openMessage(sender) {
  document.getElementById('messageHeader').innerText = sender;
  document.getElementById('messageBody').innerHTML = getConversation(sender);
  document.getElementById('messageInput').style.display = 'flex';
  scrollToBottom();
}

function sendMessage() {
  const input = document.getElementById('replyText');
  if (!input.value.trim()) return;
  const body = document.getElementById('messageBody');
  const message = document.createElement('div');
  message.style.alignSelf = 'flex-end';
  message.style.background = '#4f46e5';
  message.style.color = 'white';
  message.style.padding = '10px 15px';
  message.style.borderRadius = '15px 15px 0 15px';
  message.style.maxWidth = '70%';
  message.style.wordWrap = 'break-word';
  message.innerText = input.value;
  body.appendChild(message);
  input.value = '';
  scrollToBottom();
}

function scrollToBottom() {
  const body = document.getElementById('messageBody');
  body.scrollTop = body.scrollHeight;
}

function getConversation(sender) {
  const conversations = {
    "John Doe": [
      { text:"Hi! Can you review the latest project report?", from:"other" },
      { text:"Sure, I will check it and send feedback by today evening.", from:"self" },
      { text:"Thanks! Appreciate it.", from:"other" }
    ],
    "Sara Malik": [
      { text:"Can you approve my invoice?", from:"other" },
      { text:"Yes, I have approved it now.", from:"self" },
      { text:"Thank you!", from:"other" }
    ],
    "Ali Raza": [
      { text:"Project meeting at 4 PM today.", from:"other" },
      { text:"Got it, I ll be there.", from:"self" },
      { text:"Great, see you then.", from:"other" }
    ]
  };

  const conv = conversations[sender] || [];
  let html = '';
  conv.forEach(m => {
    const style = m.from === 'self' 
      ? 'align-self:flex-end;background:#4f46e5;color:white;padding:10px 15px;border-radius:15px 15px 0 15px;max-width:70%;margin-bottom:5px;word-wrap:break-word;'
      : 'align-self:flex-start;background:#e5e7eb;color:#111827;padding:10px 15px;border-radius:15px 15px 15px 0;max-width:70%;margin-bottom:5px;word-wrap:break-word;';
    html += `<div style="${style}">${m.text}</div>`;
  });
  return html;
}
function filterMessages() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const items = document.querySelectorAll('#messageList .message-item');
  items.forEach(item => {
    const name = item.querySelector('b').innerText.toLowerCase();
    const lastMsg = item.querySelector('p').innerText.toLowerCase();
    if (name.includes(input) || lastMsg.includes(input)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

let notifications = [
  { id: 1, text: "New order #1023 received", time: "2h ago", avatar: "/Image/guide-1.jpg", status: "unread" },
  { id: 2, text: "Payment completed for invoice #4567", time: "5h ago", avatar: "/Image/guide-2.jpg", status: "read" },
  { id: 3, text: "Customer Sara Malik registered", time: "1d ago", avatar: "/Image/guide-3.jpg", status: "unread" },
  { id: 4, text: "Order #1012 has been shipped", time: "2d ago", avatar: "/Image/guide-4.jpg", status: "read" },
  { id: 5, text: "Refund processed for Order #1009", time: "3d ago", avatar: "/Image/guide-1.jpg", status: "unread" },
  { id: 6, text: "New comment on product 'Laptop'", time: "4d ago", avatar: "/Image/guide-1.jpg", status: "read" },
  { id: 7, text: "Password changed successfully", time: "5d ago", avatar: "/Image/guide-3.jpg", status: "read" },
];

function loadNotifications() {
  const container = document.getElementById("notifList");
  container.innerHTML = "";
  notifications.forEach(n => {
    container.innerHTML += `
      <div class="notification-item ${n.status}" onclick="markRead(${n.id})">
        <img src="${n.avatar}" alt="avatar">
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    `;
  });
}

function markRead(id) {
  const notif = notifications.find(n => n.id === id);
  if (notif) notif.status = "read";
  loadNotifications();
}

function filterNotifications() {
  const search = document.getElementById("notifSearch").value.toLowerCase();
  const filter = document.getElementById("notifFilter").value;
  const container = document.getElementById("notifList");
  container.innerHTML = "";
  notifications
    .filter(n => (filter === "all" || n.status === filter))
    .filter(n => n.text.toLowerCase().includes(search))
    .forEach(n => {
      container.innerHTML += `
        <div class="notification-item ${n.status}" onclick="markRead(${n.id})">
          <img src="${n.avatar}" alt="avatar">
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
      `;
    });
}

loadNotifications();

const settingsPage = document.getElementById('settingsPage');

settingsPage.innerHTML = `
<h2 style="">Settings</h2>

<div style="display:flex; flex-direction:column; gap:20px; max-width:400px;">
  
  <!-- Account Settings -->
  <div>
    <h3>Account Settings</h3>
    <input type="text" id="setName" placeholder="First Name" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc;">
        <input type="text" id="setName" placeholder="Last Name" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc;">

    <input type="email" id="setEmail" placeholder="Email" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc;">
       <input type="email" id="setphonenumber" placeholder="PhoneNumber" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc;">

    <input type="password" id="setPassword" placeholder="Password" style="width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #ccc;">
    <button id="saveAccountBtn" style="background:#4f46e5;color:#fff;padding:10px 15px;border-radius:8px;margin-top:5px;">Save Account</button>
  </div>

  <!-- Privacy Settings -->
  <div>
    <h3>Privacy Settings</h3>
    <label><input type="checkbox" id="toggleEmail"> Show Email</label><br>
    <label><input type="checkbox" id="toggle2FA"> Enable Two-Factor Authentication</label>
  </div>

  <!-- Appearance -->
  <div>
    <h3>Appearance</h3>
    <label><input type="radio" name="theme" value="light"> Light Mode</label><br>
    <label><input type="radio" name="theme" value="dark"> Dark Mode</label>
  </div>

  <!-- Delete Account -->
  <div>
    <h3>Delete Account</h3>
    <button id="deleteAccountBtn" style="background:#ef4444;color:#fff;padding:10px 15px;border-radius:8px;">Delete Account</button>
  </div>

</div>
`;

document.getElementById('saveAccountBtn').onclick = () => {
  const name = document.getElementById('setName').value;
  const email = document.getElementById('setEmail').value;
  const password = document.getElementById('setPassword').value;
  if (!name || !email || !password) {
    alert('Please fill all account fields!');
    return;
  }
  alert('Account settings saved successfully!');
};

document.getElementById('toggleEmail').onchange = (e) => {
  if(e.target.checked) alert('Email will be visible.');
  else alert('Email will be hidden.');
};

document.getElementById('toggle2FA').onchange = (e) => {
  if(e.target.checked) alert('Two-Factor Authentication enabled.');
  else alert('Two-Factor Authentication disabled.');
};

document.querySelectorAll('input[name="theme"]').forEach(radio => {
  radio.onchange = (e) => {
    if(e.target.value === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  };
});

document.getElementById('deleteAccountBtn').onclick = () => {
  const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.');
  if(confirmDelete) {
    alert('Account deleted successfully!');
    loginPage.style.display = 'flex';
    sidebar.style.display = 'none';
    mainContent.style.display = 'none';
  }
};




const menuBtn = document.getElementById("mobileMenuBtn");
const side = document.getElementById("sidebar");

menuBtn.onclick = function (e) {
  e.stopPropagation();
  side.classList.toggle("active");
};

side.onclick = function (e) {
  e.stopPropagation();
};

document.onclick = function () {
  side.classList.remove("active");
};
document.addEventListener("DOMContentLoaded", function () {

  const editBtn = document.querySelector(".edit-btn");
  const modal = document.getElementById("customerModal");
  const closeBtn = document.getElementById("closeModal");
  const saveBtn = document.getElementById("saveCustomerBtn");

  const nameEl = document.querySelector(".profile-header h2");
  const infoEls = document.querySelectorAll(".profile-info p");

  const nameInput = document.getElementById("cName");
  const emailInput = document.getElementById("cEmail");
  const addressInput = document.getElementById("cAddress");

  editBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    nameInput.value = nameEl.textContent;
    emailInput.value = infoEls[0].textContent;
    addressInput.value = infoEls[2].textContent;
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  saveBtn.addEventListener("click", () => {
    nameEl.textContent = nameInput.value;
    infoEls[0].textContent = emailInput.value;
    infoEls[2].textContent = addressInput.value;
    modal.style.display = "none";
  });

});