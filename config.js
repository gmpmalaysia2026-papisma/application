/* ================================================================
 *  Tetapan Aplikasi GMP — nilai AWAM sahaja (selamat diletak di GitHub).
 *  Jangan letak kata laluan atau JSON akaun perkhidmatan di sini.
 *  Sunting terus di GitHub: buka fail → ikon pensel ✏️ → Commit changes.
 * ================================================================ */

// 1. URL aplikasi web Apps Script (berakhir /exec)
window.GMP_API_URL = "";

// 2. Konfigurasi Firebase: Firebase console → ⚙ Tetapan projek → Umum → Aplikasi web anda → SDK setup → Config
window.GMP_FIREBASE = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  messagingSenderId: "",
  appId: ""
};

// 3. Kunci VAPID notifikasi push: Firebase console → ⚙ Tetapan projek → Cloud Messaging →
//    Web Push certificates → Generate key pair → salin "Key pair". Kosong = notifikasi dimatikan.
window.GMP_VAPID = "";
