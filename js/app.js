
document.addEventListener("DOMContentLoaded", () => {
  // === LOGIN FORM ===
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();

      if (typeof dataPengguna === "undefined" || !Array.isArray(dataPengguna)) {
        alert("Data pengguna tidak ditemukan! Pastikan file data.js sudah terhubung.");
        return;
      }

      const user = dataPengguna.find(
        (u) => u.email.toLowerCase() === email && u.password === password
      );

      if (user) {
        localStorage.setItem("userLogin", JSON.stringify(user));
        alert(`Selamat datang, ${user.nama}!`);
        window.location.href = "dashboard.html";
      } else {
        alert("Email atau password yang anda masukkan salah!");
      }
    });
  }

  // === GREETING di DASHBOARD ===

const greetingEl = document.getElementById("greeting");

if (greetingEl) {
  const userData = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const jam = new Date().getHours();
  let waktu = "Pagi";
  let emoji = "☀️";

  if (jam >= 11 && jam < 15) {
    waktu = "Siang";
    emoji = "🌤️";
  } else if (jam >= 15 && jam < 18) {
    waktu = "Sore";
    emoji = "🌇";
  } else if (jam >= 18 || jam < 5) {
    waktu = "Malam";
    emoji = "🌙";
  }

  // Nama pengguna atau fallback
  const nama = userData.nama ? userData.nama : "Pengguna";

  // Animasi halus saat teks muncul
  greetingEl.style.opacity = 0;
  greetingEl.style.transition = "opacity 1s ease-in-out";

  setTimeout(() => {
    greetingEl.textContent = `Selamat ${waktu}, ${nama}! ${emoji}`;
    greetingEl.style.opacity = 1;
  }, 300);
}


  // === INFORMASI BAHAN AJAR (Katalog) ===
  const bahanGrid = document.getElementById("bahanAjarGrid");
  if (bahanGrid && typeof dataBahanAjar !== "undefined") {
    bahanGrid.innerHTML = dataBahanAjar
      .map(
        (b) => `
        <div class="bahan-card">
          <img src="${b.cover}" alt="${b.namaBarang}">
          <h4>${b.namaBarang}</h4>
          <p><b>Kode:</b> ${b.kodeBarang}</p>
          <p><b>Jenis:</b> ${b.jenisBarang}</p>
          <p><b>Edisi:</b> ${b.edisi}</p>
          <p><b>Stok:</b> ${b.stok}</p>
        </div>`
      )
      .join("");
  }

  // === TRACKING PENGIRIMAN (Versi Baru dengan Progress Bar) ===
  const btnCari = document.getElementById("searchDo");
  if (btnCari && typeof dataTracking !== "undefined") {
    btnCari.addEventListener("click", () => {
      const doNumber = document.getElementById("doNumber").value.trim();
      const data = dataTracking[doNumber];
      const resultBox = document.getElementById("result");

      if (!data) {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = `<p class="error">❌ Nomor DO <b>${doNumber}</b> tidak ditemukan.</p>`;
        return;
      }

      const totalSteps = data.perjalanan.length;
      const selesai = data.status.toLowerCase().includes("selesai") ? totalSteps : totalSteps - 1;
      const progress = Math.round((selesai / totalSteps) * 100);

      const perjalananHTML = data.perjalanan
        .map(
          (item) => `
          <div class="timeline-item">
            <p><b>${item.waktu}</b></p>
            <p>${item.keterangan}</p>
          </div>`
        )
        .join("");

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = `
        <div class="track-card">
          <h3>${data.nama}</h3>
          <p><b>Nomor DO:</b> ${data.nomorDO}</p>
          <p><b>Status:</b> ${data.status}</p>
          <p><b>Ekspedisi:</b> ${data.ekspedisi}</p>
          <p><b>Tanggal Kirim:</b> ${data.tanggalKirim}</p>
          <p><b>Total:</b> ${data.total}</p>

          <div class="progress-container">
            <div class="progress-bar" style="width:${progress}%"></div>
          </div>

          <h4>Riwayat Perjalanan:</h4>
          <div class="timeline">${perjalananHTML}</div>
        </div>`;
    });
  }
});
