# Master Dokumen Revisi Copywriting & UX Writing

## Menungsa Writing Guideline (Website v2)

> **Tentang Dokumen Ini:**
> Dokumen ini memuat seluruh naskah copywriting, UX writing, label antarmuka, prinsip, contoh kasus, dan panduan komunikasi pada website **Menungsa Writing Guideline (v2)**.
>
> **Setiap elemen telah dilengkapi dengan `Kotak Revisi` khusus.** Anda dapat langsung menuliskan draf perbaikan, alternatif kalimat, atau catatan editorial Anda pada kotak yang disediakan (`[Tulis versi revisi Anda di sini...]`).
>
> *Catatan Cakupan:* Sesuai instruksi, **daftar 10.946 lema kata individual (Language Lab dictionary) tidak dimasukkan**, namun seluruh teks antarmuka, pengantar, pesan diagnosis, kategori, dan 20 rumpun penjelasan fungsinya disertakan lengkap.

---

## Daftar Isi

1. [Panduan Penggunaan & Batas Revisi](#1-panduan-penggunaan--batas-revisi)
2. [Navigasi Global & Microcopy Antarmuka](#2-navigasi-global--microcopy-antarmuka)
3. [Halaman 1: Prinsip Menulis (Voice Foundations)](#3-halaman-1-prinsip-menulis-voice-foundations)
4. [Halaman 2: Contoh Naskah (Writing Studio)](#4-halaman-2-contoh-naskah-writing-studio)
5. [Halaman 3: Pilihan Kata & Sapaan (Word Guide)](#5-halaman-3-pilihan-kata--sapaan-word-guide)
6. [Halaman 4: Periksa Draf (Copy Sandbox)](#6-halaman-4-periksa-draf-copy-sandbox)
7. [Halaman 5: Konteks Indonesia (Indonesian Nuances)](#7-halaman-5-konteks-indonesia-indonesian-nuances)
8. [Panduan Kanal Komunikasi (Channels Guidance)](#8-panduan-kanal-komunikasi-channels-guidance)
9. [Alur Kebutuhan Pembaca (Audience Pathways)](#9-alur-kebutuhan-pembaca-audience-pathways)
10. [Glosarium & Batas Bukti Ilmiah](#10-glosarium--batas-bukti-ilmiah)

---

## 1. Panduan Penggunaan & Batas Revisi

Saat meninjau dan merevisi teks di bawah ini, perhatikan prinsip dasar komunikasi Menungsa:

* **Posisi Pembaca:** Menungsa memosisikan pembaca secara setara, bukan sebagai pihak yang bersalah, rusak, atau wajib diperbaiki. Hindari penghakiman moral, tuntutan ("kamu harus", "kamu wajib"), atau mempermalukan pembaca.
* **Harga Diri Tanpa Syarat:** Jangan jadikan ketangguhan, keberanian bercerita, atau pencapaian finansial/fisik sebagai syarat untuk diakui sebagai laki-laki bernilai.
* **Bahasa Konkret & Membumi:** Mulai dari situasi yang tampak sehari-hari. Biarkan emosi hadir secara wajar tanpa memaksa pembaca langsung mengakui kerentanan atau trauma di ruang publik.
* **Rendah Hambatan:** Jadikan langkah pertama kecil, jelas, dan tanpa beban. Jelaskan logistik (waktu, lokasi, biaya, privasi, hak untuk diam) sebelum mengajak orang bergabung.
* **Jujur tentang Batasan (Batas Bukti):** Contoh naskah adalah **usulan penerapan editorial**, bukan formula ajaib yang terbukti 100% secara klinis pada pria Indonesia. Jangan menciptakan klaim palsu atau menjanjikan kesembuhan instan.
* **Protokol Krisis Darurat:** Untuk situasi krisis atau risiko menyakiti diri, gunakan instruksi yang lugas, tegas, dan langsung merujuk pada bantuan darurat resmi (Healing119 / IGD / pendamping terpercaya).

---

## 2. Navigasi Global & Microcopy Antarmuka

Bagian ini mencakup teks yang muncul pada header, navigasi, pencarian global (`Cmd+K`), drawer seluler, footer, dan tombol utilitas.

### 2.1. Header & Navigasi Utama

*Lokasi: `src/components/layout/Header.tsx` & `src/App.tsx`*


| ID / Elemen       | Teks Saat Ini                     | Konteks / Catatan Tampilan           | ✏️ Kotak Revisi / Versi Baru Anda    |
| ------------------- | ----------------------------------- | -------------------------------------- | ---------------------------------------- |
| `NAV-TITLE`       | `Panduan menulis Menungsa`        | Judul aplikasi di browser & banner   | Menungsa Writing Guideline             |
| `NAV-LOGO-ALT`    | `Menungsa`                        | Teks alternatif logo Menungsa        | `[Tulis versi revisi Anda di sini...]` |
| `NAV-LOGO-ARIA`   | `Beranda Menungsa`                | Label aksesibilitas tautan logo      | Home                                   |
| `NAV-TAB-1`       | `Prinsip menulis`                 | Tab 1 (Voice Foundations)            | Voice & Tone Menungsa                  |
| `NAV-TAB-2`       | `Contoh naskah`                   | Tab 2 (Writing Studio)               | Contoh Penulisan                       |
| `NAV-TAB-3`       | `Pilihan Kata`                    | Tab 3 (Word Guide)                   | Pemilihan Kata                         |
| `NAV-TAB-4`       | `Periksa draf`                    | Tab 4 (Copy Sandbox)                 | Cek Tulisan                            |
| `NAV-TAB-5`       | `Konteks Indonesia`               | Tab 5 (Indonesian Nuances)           | Konteks Lokal                          |
| `NAV-SEARCH-BTN`  | `Cari panduan...`                 | Tombol picu modal pencarian          | Cari                                   |
| `NAV-SEARCH-ARIA` | `Cari kata kunci panduan (Cmd+K)` | Tooltip & label tombol pencarian     | Cari                                   |
| `NAV-MENU-OPEN`   | `Buka menu`                       | Label aksesibilitas tombol drawer HP | `[Tulis versi revisi Anda di sini...]` |
| `NAV-MENU-CLOSE`  | `Tutup menu`                      | Label aksesibilitas tutup drawer HP  | `[Tulis versi revisi Anda di sini...]` |

---

### 2.2. Modal Pencarian Global (Search Modal)

*Lokasi: `src/components/layout/GlobalSearch.tsx`*


| ID / Elemen          | Teks Saat Ini                                                                                                                                                                                       | Konteks / Catatan Tampilan         | ✏️ Kotak Revisi / Versi Baru Anda    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------- |
| `SEARCH-INPUT-PH`    | `Search concepts (e.g., agency, reactance, gue, bapak, humor, M01, X02, C06)...`                                                                                                                    | Placeholder kolom pencarian        | Cari                                   |
| `SEARCH-INPUT-ARIA`  | `Cari konsep atau kata kunci panduan`                                                                                                                                                               | Label aksesibilitas kolom input    | Cari                                   |
| `SEARCH-QUICK-LABEL` | `Quick Concept Searches:`                                                                                                                                                                           | Label daftar pencarian kilat       | Cari                                   |
| `SEARCH-QUICK-TAGS`  | `Agency (M02)`, `Response Cost (M01)`, `Reactance (M06)`, `Bapak Trap`, `Status & Dignity (M08)`, `Gue vs Lo`, `Kita vs Kami`, `Directness (X01)`, `Moral Saturation (M18)`, `Suicide Crisis (C07)` | Tag pencarian kilat rekomendasi    | - (kosongkan)                          |
| `SEARCH-EMPTY`       | `No results found for "{query}"`                                                                                                                                                                    | Tampilan jika kata tidak ditemukan | `[Tulis versi revisi Anda di sini...]` |
| `SEARCH-FOOTER-NAV`  | `↑↓ Navigate`                                                                                                                                                                                     | Petunjuk navigasi panah keyboard   | `[Tulis versi revisi Anda di sini...]` |
| `SEARCH-FOOTER-SEL`  | `↵ Select`                                                                                                                                                                                         | Petunjuk tombol Enter              | `[Tulis versi revisi Anda di sini...]` |
| `SEARCH-FOOTER-SYS`  | `Menungsa Evidence Knowledge Base`                                                                                                                                                                  | Sub-teks kaki modal pencarian      | - (Kosongkan)                          |

---

### 2.3. Footer & Tampilan Status

*Lokasi: `src/App.tsx`*


| ID / Elemen        | Teks Saat Ini              | Konteks / Catatan Tampilan           | ✏️ Kotak Revisi / Versi Baru Anda |
| -------------------- | ---------------------------- | -------------------------------------- | ------------------------------------- |
| `FOOTER-BRAND`     | `Panduan menulis Menungsa` | Teks brand di footer                 | Menungsa Writing Guideline          |
| `FOOTER-LINK-V1`   | `Baca dasar riset`         | Tautan keluar ke situs riset v1      | Lihat dasar di balik guide ini      |
| `LOADING-FALLBACK` | `Memuat panduan…`         | Status saat memuat modul (lazy load) | Mohon tunggu...                     |

---

## 3. Halaman 1: Prinsip Menulis (Voice Foundations)

*Lokasi: `src/components/views-v2/VoiceFoundationsView.tsx` (rute `#foundations`)*

### 3.1. Banner Utama (Hero Section)

#### 1. Kicker / Badge

* **Teks Saat Ini:**
  > `Panduan Praktis Penulis & Kreator`
  >

> ✏️ **Kotak Revisi Kicker:**
>
> Panduan Menulis di Menungsa

#### 2. Judul Utama (Headline)

* **Teks Saat Ini:**
  > `Cara Menungsa berbicara kepada pembaca`
  >

> ✏️ **Kotak Revisi Headline:**
>
> Cara Menungsa Berbicara dan Bertutur Kata

#### 3. Paragraf Pengantar (Sub-headline)

* **Teks Saat Ini:**
  > `Menungsa berbicara dengan nada tenang, jujur, membumi, dan tidak menggurui. Hadir sebagai pendamping yang menghormati kedaulatan dan martabat pembaca.`
  >

> ✏️ **Kotak Revisi Sub-headline:**
>
> Menungsa berbicara dengan mengandalkan apa yang telah menjadi kekuatan pembaca, tidak menggurui, serta hadir sebagai sosok yang merangkul dan mendukung.
>
> Tambahkan di bawahnya (kayak unlimited scrolling: akrab, empatik, mendukung, reflektif, tidak menghakimi, berorientasi pada kekuatan, hangat, male-friendly)

#### 4. Tombol Aksi (Call-to-Action)

* **Tombol 1 Saat Ini:** `Lihat contoh naskah`
  > ✏️ **Kotak Revisi Tombol 1:** `Contoh penulisan`
  >
* **Tombol 2 Saat Ini:** `Periksa draf`
  > ✏️ **Kotak Revisi Tombol 2:** `Cek tulisanmu`
  >
* **Tombol 3 Saat Ini:** `Pilihan Kata`
  > ✏️ **Kotak Revisi Tombol 3:** Pemilihan kata
  >

---

### 3.2. Enam Prinsip Menulis Menungsa (Value Pillars V1–V6)

#### Prinsip V1: Kesetaraan, Bukan Penghakiman (*Equal Footing, Not Judgement*)

* **Judul & Tagline Saat Ini:** `Kesetaraan, Bukan Penghakiman` / `Equal Footing, Not Judgement`
  > ✏️ **Kotak Revisi Judul & Tagline:**
  > Teman Pembaca yang Baik
  >
* **Gaya Karakter Suara Saat Ini:**
  > *Sapa pembaca tanpa menilai apakah ia cukup kuat, berani, atau pantas dihargai.*
  > ✏️ **Kotak Revisi Karakter Suara:**
  > Sapa dan temui pembaca di titik mereka berada (meet them where they are). Jangan menilai mereka dari kekuatan, keberanian, atau kepantasan untuk dihargai.
  >
* **Mengapa Ini Penting (Position Note) Saat Ini:**
  > *Satu-satunya nilai mutlak tanpa kompromi. Menukarnya demi mengejar interaksi atau viralitas sesaat justru merusak rasa aman pembaca.*
  > ✏️ **Kotak Revisi Alasan Nilai:**
  > Memberikan rasa aman dan mengurangi kemungkinan pembaca bereaksi secara defensif. Membuat audiens merasa menjadi bagian dari Menungsa, alih-alih merasa sebagai orang luar yang perlu 'diperbaiki' atau 'diubah'.
  >
* **Kapan Perlu Disesuaikan (Boundary Condition) Saat Ini:**
  > *Penilaian risiko medis darurat tetap membutuhkan terminologi yang presisi. Menggambarkan situasi sebagai hal yang berbahaya tidak sama dengan menghakimi pribadi pembaca.*
  > ✏️ **Kotak Revisi Batas Kondisi:**
  > Prinsip ini tidak berarti menghindari penilaian terhadap risiko, perilaku, atau situasi. Dalam konteks keselamatan, kesehatan, atau kondisi darurat, gunakan bahasa yang akurat dan tegas untuk menjelaskan risiko. Yang dihindari adalah menghakimi pembaca, bukan menyamarkan atau mereduksi realita dan risiko.
  >

##### Contoh DO & DON'T untuk V1:

* **DO 1 Saat Ini:** `"Ini ruang untuk berbicara. Kamu tidak harus menceritakan apa pun jika belum siap."`

  * *Alasan:* Menyapa pembaca dan menjelaskan suasana ruang tanpa membebaninya dengan syarat atau tuntutan.

  > ✏️ **Kotak Revisi DO 1:**
  >
  > - Contoh: Ini ruang buat cerita dan ngobrol bareng. Kamu tidak harus cerita apa-apa jika memang belum siap.
  > - Alasan: Menyapa pembaca dan menjelaskan suasana program tanpa membebaninya dengan syarat atau tuntutan yang mungkin sebelumnya sudah berat (i.e. bercerita)
  >
* **DO 2 Saat Ini:** `"Minggu lalu ada tujuh orang yang hadir. Empat di antaranya hanya duduk mendengarkan."`

  * *Alasan:* Menggambarkan fakta yang wajar dan bersahaja alih-alih melabeli jenis pria yang datang.

  > ✏️ **Kotak Revisi DO 2:**
  >
  > - Contoh: Minggu lalu, program kami dihadiri oleh tujuh orang. Empat di antaranya lebih banyak mendengarkan.
  > - Alasan: Menggambarkan fakta atau perilaku yang terlihat tanpa memberi label maupun penilaian terhadap orang yang melakukannya.
  >
* **DON'T 1 Saat Ini:** `"Laki-laki kuat adalah laki-laki yang berani bercerita."`

  * *Alasan:* Menjadikan martabat dan harga diri bersyarat pada tindakan yang sedang diminta.

  > ✏️ **Kotak Revisi DON'T 1:**
  >
  > - Contoh: Laki-laki kuat adalah laki-laki yang berani bercerita.
  > - Alasan: Mengganti tuntutan “laki-laki harus kuat” dengan tuntutan baru untuk berani bercerita. Bercerita akhirnya menjadi ukuran apakah seseorang cukup “kuat”.
  >
* **DON'T 2 Saat Ini:** `"Kamu hebat banget karena sudah mau terbuka dan meruntuhkan egomu."`

  * *Alasan:* Pujian ini disertai penilaian bahwa pembaca sebelumnya dikuasai ego. Akui keterbukaannya tanpa menilai dirinya.

  > ✏️ **Kotak Revisi DON'T 2:**
  >
  > - Contoh: Kamu hebat karena sudah mau terbuka dan meruntuhkan ego
  > - Alasan: Memuji keterbukaan sambil mengasumsikan bahwa sebelumnya pembaca dikuasai oleh ego; secara tidak langsung pembaca dapat merasa dihakimi.
  >
* **DON'T 3 Saat Ini:** `"Pria sejati tidak takut mengakui luka batinnya."`

  * *Alasan:* Kalimat ini menjadikan keberanian bercerita sebagai syarat untuk disebut laki-laki sejati.

  > ✏️ **Kotak Revisi DON'T 3:**
  >
  > - Contoh: Pria sejati tidak takut mengakui traumanya
  > - Alasan: Menjadikan keberanian mengakui trauma sebagai ukuran apakah seseorang cukup “sejati” sebagai laki-laki.
  >

---

#### Prinsip V2: Rendah Hambatan untuk Memulai (*Easy to Begin / Low Response Cost*)

* **Judul & Tagline Saat Ini:** `Rendah Hambatan untuk Memulai` / `Easy to Begin / Low Response Cost`
  > ✏️ **Kotak Revisi Judul & Tagline:**
  > Mudah untuk Dimulai
  >
* **Gaya Karakter Suara Saat Ini:**
  > *Jelaskan apa yang akan terjadi secara transparan sebelum mengajak siapa pun bergabung.*
  > ✏️ **Kotak Revisi Karakter Suara:**
  > Jelaskan secara konkret dan ringkas. Jangan bertele-tele; menambah langkah, istilah, atau tuntutan yang tidak diperlukan.. 
  >
* **Mengapa Ini Penting (Position Note) Saat Ini:**
  > *Rasa malu, kekhawatiran diketahui orang lain, dan ketidakjelasan proses dapat membuat langkah pertama terasa berat. Jelaskan pilihan yang tersedia.*
  > ✏️ **Kotak Revisi Alasan Nilai:**
  > Kejelasan mengurangi beban untuk memahami, memutuskan, dan mengambil langkah pertama. Audiens lebih mudah merespons ketika proses, pilihan, dan apa yang akan mereka dapatkan terasa jelas dan sederhana.
  >
* **Kapan Perlu Disesuaikan (Boundary Condition) Saat Ini:**
  > *Pada kondisi krisis darurat (risiko menyakiti diri), gunakan instruksi yang tegas, lugas, dan terarah tanpa keraguan.*
  > ✏️ **Kotak Revisi Batas Kondisi:**
  > Pada kondisi krisis atau darurat, gunakan instruksi yang singkat, tegas, dan terarah.
  >

##### Contoh DO & DON'T untuk V2:

* **DO 1 Saat Ini:** `"Selasa pukul 19.00 di ruang belakang. Gratis. Boleh datang tanpa bicara apa-apa, dan boleh pulang kapan saja."`

  * *Alasan:* Contoh ini menyebut waktu, tempat, biaya, dan kebebasan untuk pulang. Tambahkan durasi jika sudah diketahui.

  > ✏️ **Kotak Revisi DO 1:**
  >
  > - Contoh: Ruang MENdukung pada Selasa ini pukul 19.00 WIB via Google Meet. Gratis, dan kamu bebas memilih mau bercerita, menguatkan, atau sekadar mendengarkan.
  > - Alasan: Menjelaskan hal penting–waktu, biaya (cost), tempat–sejak awal dan memberi pilihan yang jelas kepada audiens.
  >
* **DO 2 Saat Ini:** `"Tidak ada presensi, tidak ada sesi perkenalan wajib keliling lingkaran."`

  * *Alasan:* Menghilangkan kekhawatiran disorot publik sejak kalimat pertama.

  > ✏️ **Kotak Revisi DO 2:**
  >
  > - Contoh: Belum siap cerita? Nggak apa-apa. Kamu bisa ikut dulu sebagai pendengar.
  > - Alasan: Membuat langkah pertama terasa lebih ringan tanpa menuntut keterlibatan tertentu.
  >
* **DON'T 1 Saat Ini:** `"Yuk tumpahkan semua beban hidup yang kamu pendam selama ini!"`

  * *Alasan:* Ajakan ini menuntut pembaca langsung menceritakan pengalaman yang pribadi.

  > ✏️ **Kotak Revisi DON'T 1:**
  >
  > - Contoh: Ceritakan semua yang selama ini kamu pendam
  > - Alasan: Langsung meminta pembaca membuka pengalaman pribadi tanpa memberi ruang untuk menentukan batasnya sendiri.
  >
* **DON'T 2 Saat Ini:** `"Ceritakan masalah terberatmu di sini sekarang juga."`

  * *Alasan:* Kalimat ini mendesak pembaca menceritakan hal pribadi sebelum ia siap.

  > ✏️ **Kotak Revisi DON'T 2:**
  >
  > - Contoh: Sebelum ikut, isi formulir lengkap dan ceritakan masalah yang sedang kamu alami.
  > - Alasan: Menambah tuntutan sebelum audiens sempat merasa aman atau memahami apa yang akan mereka ikuti.
  >

---

#### Prinsip V3: Satu Langkah Nyata yang Masuk Akal (*One Actionable Step*)

* **Judul & Tagline Saat Ini:** `Satu Langkah Nyata yang Masuk Akal` / `One Actionable Step`
  > ✏️ **Kotak Revisi Judul & Tagline:**
  > Satu Langkah Nyata
  >
* **Gaya Karakter Suara Saat Ini:**
  > *Tawarkan satu langkah yang jelas dan realistis. Jelaskan biaya, waktu, serta pilihan untuk berhenti jika memang tersedia.*
  > ✏️ **Kotak Revisi Karakter Suara:**
  > Tawarkan satu tindakan yang konkret dan realistis. Jika ada banyak pilihan, bantu pembaca menentukan langkah yang paling masuk akal untuk dilakukan terlebih dahulu.
  >
* **Mengapa Ini Penting (Position Note) Saat Ini:**
  > *Bantu pembaca melihat satu hal yang bisa ia lakukan. Hindari daftar perubahan besar yang sulit dijalankan sekaligus.*
  > ✏️ **Kotak Revisi Alasan Nilai:**
  > Terlalu banyak saran sekaligus dapat membuat pembaca bingung atau tidak melakukan apa pun. Satu langkah yang jelas membantu mengubah pemahaman menjadi tindakan.
  >
* **Kapan Perlu Disesuaikan (Boundary Condition) Saat Ini:**
  > *Langkah awal yang ringan adalah jembatan pembuka, bukan pengganti penanganan klinis jika masalah berlanjut.*
  > ✏️ **Kotak Revisi Batas Kondisi:**
  > Tidak semua situasi cukup ditangani dengan satu langkah. Untuk masalah yang kompleks atau berkelanjutan, satu langkah berfungsi sebagai titik awal menuju dukungan atau penanganan berikutnya.
  >

##### Contoh DO & DON'T untuk V3:

* **DO 1 Saat Ini:** `"Langkah pertama biasanya ke puskesmas terdekat, bukan langsung ke psikiater. Katakan di loket: 'Saya mau periksa ke dokter umum.' Antrean bisa agak ramai, bawalah sesuatu untuk dibaca."`

  * *Alasan:* Satu tindakan nyata, kalimat persis yang harus diucapkan di loket, dan hambatan antrean disebutkan jujur di awal.

  > ✏️ **Kotak Revisi DO 1:**
  >
  > - Contoh: Kalau belakangan kamu merasa kewalahan, coba pilih satu orang yang cukup kamu percaya dan bilang, ‘Gue pusing nih, ayok nongkrong?
  > - Alasan: Memberikan satu tindakan konkret yang bisa langsung dicoba, termasuk cara sederhana untuk memulainya.
  >
* **DO 2 Saat Ini:** `"Malam ini, coba rapikan satu sudut meja kerjamu."`

  * *Alasan:* Ada satu tindakan dengan awal dan akhir yang jelas.

  > ✏️ **Kotak Revisi DO 2:**
  >
  > - Contoh: Sebelum tidur malam ini, coba catat satu hal yang paling menguras energimu hari ini.
  > - Alasan: Mengubah ajakan untuk lebih memahami diri menjadi satu tindakan kecil dengan awal dan akhir yang jelas.
  >
* **DON'T 1 Saat Ini:** `"Jangan ragu mencari bantuan profesional dan segera ubah pola hidupmu!"`

  * *Alasan:* Ajakan ini belum menjelaskan bantuan apa yang tersedia dan cara mengaksesnya.

  > ✏️ **Kotak Revisi DON'T 1:**
  >
  > - Contoh: Mulai olahraga rutin, tidur cukup, makan lebih sehat, kurangi media sosial, coba journaling, dan jangan ragu mencari bantuan profesional.
  > - Alasan: Memberikan terlalu banyak tindakan sekaligus tanpa membantu pembaca menentukan mana yang perlu dilakukan terlebih dahulu.
  >
* **DON'T 2 Saat Ini:** `"Ubah pola pikirmu sekarang dan tata ulang seluruh hidupmu dari nol!"`

  * *Alasan:* Tuntutan abstrak yang memicu rasa putus asa bagi orang yang energinya sudah terkuras.

  > ✏️ **Kotak Revisi DON'T 2:**
  >
  > - Contoh: Mulai sekarang, kamu perlu menata ulang hidup dan mengubah pola pikirmu.
  > - Alasan: Meminta perubahan besar tanpa memberi satu tindakan konkret yang dapat dilakukan.
  >

---

#### Prinsip V4: Mulai dari yang Tampak Nyata (*Start from What is Visible*)

* **Judul & Tagline Saat Ini:** `Mulai dari yang Tampak Nyata` / `Start from What is Visible`
  > ✏️ **Kotak Revisi Judul & Tagline:**
  > Mulai dari yang Terlihat
  >
* **Gaya Karakter Suara Saat Ini:**
  > *Gunakan detail situasi konkret yang menghadirkan emosi secara alami; jangan jadikan pengakuan emosi sebagai tiket masuk.*
  > ✏️ **Kotak Revisi Karakter Suara:**
  > Mulailah dari situasi, kebiasaan, atau perubahan yang bisa dikenali pembaca. Tunjukkan apa yang terjadi terlebih dahulu. Jangan langsung menyimpulkan apa yang mereka rasakan, pikirkan, atau alami.
  >
* **Mengapa Ini Penting (Position Note) Saat Ini:**
  > *Detail sehari-hari dapat membantu pembaca mengenali situasinya. Beri ruang baginya untuk menamai perasaannya sendiri.*
  > ✏️ **Kotak Revisi Alasan Nilai:**
  > Seseorang sering lebih mudah mengenali apa yang berubah dalam kesehariannya sebelum bisa menjelaskan apa yang sedang ia rasakan. Mulai dari hal yang bisa ia lihat atau alami langsung, lalu beri ruang baginya untuk menghubungkan pola tersebut dan menamai perasaannya sendiri.
  >
* **Kapan Perlu Disesuaikan (Boundary Condition) Saat Ini:**
  > *Situasi yang digambarkan tidak boleh terlalu sempit hingga mengecualikan pembaca. Pilih situasi yang jamak dialami pria sehari-hari.*
  > ✏️ **Kotak Revisi Batas Kondisi:**
  > Situasi konkret tetap perlu beragam dan sesuai konteks. Jangan menganggap satu kebiasaan atau pengalaman mewakili semua laki-laki.
  >

##### Contoh DO & DON'T untuk V4:

* **DO 1 Saat Ini:** `"Jam tiga pagi, lampu kamar sudah mati, tapi kamu masih membuka aplikasi bank untuk mengecek saldo."`

  * *Alasan:* Situasi nyata yang langsung ia kenali tanpa perlu mengakui kepada orang lain bahwa ia sedang cemas.

  > ✏️ **Kotak Revisi DO 1:**
  >
  > - Contoh: Sudah lewat jam tiga pagi. Lampu kamar mati, tapi kamu masih buka aplikasi bank dan mengecek saldo lagi.
  > - Alasan: Memulai dari situasi yang bisa dikenali tanpa langsung menyimpulkan apa yang sedang dirasakan atau dipikirkan pembaca.
  >
* **DO 2 Saat Ini:** `"Perubahan kecil dalam keseharian yang mungkin baru kamu sadari."`

  * *Alasan:* Urutan bertahap: ia bisa membaca keseluruhan tulisan sebelum memutuskan apakah tulisan ini tentang dirinya.

  > ✏️ **Kotak Revisi DO 2:**
  >
  > - Contoh: Belakangan, chat makin sering menumpuk, jam makan sering kali terlewat, dan alarm pagi lebih sering kalah dengan "ah mending tidur lagi".
  > - Alasan: Menunjukkan perubahan dalam keseharian terlebih dahulu agar pembaca bisa mengenali polanya sebelum memberi nama pada pengalamannya sendiri.
  >
* **DON'T 1 Saat Ini:** `"5 Tanda Kamu Sedang Mengalami Depresi Berat dan Putus Asa."`

  * *Alasan:* Langsung mendiagnosis pembaca di posisi paling rentan, tepat pada slide pertama atau judul tulisan.

  > ✏️ **Kotak Revisi DON'T 1:**
  >
  > - Contoh: Kalau belakangan kamu jadi lebih sering menghindar dari orang lain dan rasanya nggak punya tenaga buat ngapa-ngapain, berarti kamu depresi.
  > - Alasan: Terlalu cepat menyimpulkan apa yang sedang dialami pembaca hanya dari beberapa perubahan yang kelihatan.
  >
* **DON'T 2 Saat Ini:** `"Kamu pasti merasa hampa, kesepian, dan gagal sebagai pria, kan?"`

  * *Alasan:* Kalimat ini menebak perasaan pembaca dan mendesaknya untuk membenarkan tebakan itu.

  > ✏️ **Kotak Revisi DON'T 2:**
  >
  > - Contoh: Kalau gini, kamu pasti merasa hampa, kesepian, dan gagal sebagai laki-laki, kan?
  > - Alasan: Menentukan perasaan dan pikiran pembaca sebelum memberi mereka ruang untuk mengenali dan menamainya sendiri.
  >

---

#### Prinsip V5: Jujur & Terbuka tentang Batasan (*Clear About Limits / Calibrated Uncertainty*)

* **Judul & Tagline Saat Ini:** `Jujur & Terbuka tentang Batasan` / `Clear About Limits / Calibrated Uncertainty`
  > ✏️ **Kotak Revisi Judul & Tagline:**
  > Jelas Soal Keterbatasan
  >
* **Gaya Karakter Suara Saat Ini:**
  > *Sesuaikan klaim dengan bukti yang tersedia. Sampaikan informasi layanan yang sudah diverifikasi secara jelas.*
  > ✏️ **Kotak Revisi Karakter Suara:**
  > Sampaikan informasi sesuai tingkat kepastian yang tersedia. Bedakan apa yang sudah diketahui, apa yang masih berupa kemungkinan, dan apa yang belum diketahui. Jangan mengklaim lebih dari bukti atau kapasitas yang Menungsa miliki.
  >
* **Mengapa Ini Penting (Position Note) Saat Ini:**
  > *Dalam 14 dokumen yang ditelaah, tidak ditemukan eksperimen acak yang menguji pilihan kata pada laki-laki dewasa Indonesia. Contoh di sini merupakan usulan penerapan, bukan kalimat yang terbukti efektif.*
  > ✏️ **Kotak Revisi Alasan Nilai:**
  > Dengan jujur dan terbuka menjelaskan apa yang sudah diketahui, apa yang belum diketahui, dan apa yang belum bisa dilakukan, audiens dapat memahami informasi yang diterima dengan lebih jelas dan akurat.
  >
* **Kapan Perlu Disesuaikan (Boundary Condition) Saat Ini:**
  > *Jelaskan ketidakpastian riset dengan singkat. Untuk bantuan darurat, berikan langkah yang jelas dan informasi layanan yang sudah diverifikasi.*
  > ✏️ **Kotak Revisi Batas Kondisi:**
  > Tidak semua ketidakpastian perlu dijelaskan panjang lebar. Sesuaikan dengan pentingnya informasi dan risiko jika terjadi kesalahpahaman. Dalam situasi darurat, prioritaskan langkah yang jelas dan informasi layanan yang sudah diverifikasi.
  >

##### Contoh DO & DON'T untuk V5:

* **DO 1 Saat Ini:** `"Sebagian laki-laki merasa lebih enteng setelah bercerita. Sebagian lagi tidak. Dalam korpus yang ditelaah, pilihan kalimatnya belum diuji pada laki-laki dewasa Indonesia."`

  * *Alasan:* Menyebutkan keterbatasan pengetahuan tanpa membuat janji hasil yang pasti.

  > ✏️ **Kotak Revisi DO 1:**
  >
  > - Contoh: Bercerita bisa membantu sebagian orang, tetapi pengalaman dan dampaknya bisa berbeda-beda.
  > - Alasan: Menyampaikan kemungkinan manfaat tanpa menjanjikan hasil yang pasti atau berlaku untuk semua orang.
  >
* **DO 2 Saat Ini:** `"Untuk dukungan psikologis, periksa akses layanan di Healing119.id. Jika ada bahaya segera, cari bantuan darurat atau minta orang yang kamu percaya menemanimu ke IGD terdekat."`

  * *Alasan:* Memberikan langkah rujukan dan jalur darurat tanpa menjanjikan jam operasional yang belum diverifikasi.

  > ✏️ **Kotak Revisi DO 2:**
  >
  > - Contoh:  Menungsa belum menyediakan layanan krisis 24 jam. Kalau kamu butuh bantuan segera, cari layanan darurat atau pergi ke fasilitas kesehatan terdekat bersama orang yang kamu percaya.
  > - Alasan: Menjelaskan dengan terbuka apa yang belum bisa Menungsa lakukan, sambil tetap memberi langkah yang jelas saat keselamatan menjadi prioritas.
  >
* **DON'T 1 Saat Ini:** `"Metode ini terbukti 100% ampuh mengatasi krisis mental seluruh pria Indonesia."`

  * *Alasan:* Belum ada riset kalimat komparatif di Indonesia, sehingga klaim mutlak seperti ini tidak etis dan merusak integritas.

  > ✏️ **Kotak Revisi DON'T 1:**
  >
  > - Contoh: Bercerita terbukti membuat laki-laki merasa lebih baik.
  > - Alasan: Terdengar terlalu pasti, seolah hasilnya akan sama untuk semua orang.
  >
* **DON'T 2 Saat Ini:** `"Mungkin kamu bisa coba menghubungi layanan darurat, siapa tahu bisa sedikit membantu."`

  * *Alasan:* Ragu-ragu pada momen krisis paling berbahaya; instruksi darurat harus disampaikan secara lugas dan pasti.

  > ✏️ **Kotak Revisi DON'T 2:**
  >
  > - Contoh: Kalau situasinya dirasa darurat, mungkin kamu bisa coba mencari bantuan profesional kalau merasa perlu.
  > - Alasan: Terlalu ragu untuk situasi yang justru membutuhkan arahan yang jelas.
  >

---

#### Prinsip V6: Tindakan Nyata, Bukan Tuntutan Moral (*Action, Not Demands / Lead by Practice*)

* **Judul & Tagline Saat Ini:** `Tindakan Nyata, Bukan Tuntutan Moral` / `Action, Not Demands / Lead by Practice`
  > ✏️ **Kotak Revisi Judul & Tagline:**
  > Tunjukkan Tindakan, Bukan Tuntutan
  >
* **Gaya Karakter Suara Saat Ini:**
  > *Jelaskan tindakan dan komitmen Menungsa secara konkret. Jika menyatakan sikap, sebutkan langkah yang menyertainya.*
  > ✏️ **Kotak Revisi Karakter Suara:**
  > Jelaskan secara konkret apa yang Menungsa lakukan, pilih, atau ubah. Saat menyatakan nilai atau sikap, tunjukkan bagaimana hal itu diterapkan dalam tindakan.
  >
* **Mengapa Ini Penting (Position Note) Saat Ini:**
  > *Menceramahi publik dengan tuntutan moral ("laki-laki harus...") memicu penolakan batin (reactance). Tunjukkan apa yang organisasi lakukan secara nyata, bukan apa yang pembaca harus ubah.*
  > ✏️ **Kotak Revisi Alasan Nilai:**
  > Mengatakan apa yang “seharusnya” dilakukan orang lain (misalnya, “laki-laki harus...”) dapat terasa seperti tekanan terhadap kebebasan mereka untuk memilih, sehingga memicu sikap defensif atau penolakan. Menunjukkan apa yang Menungsa lakukan sendiri memberi contoh tanpa memaksa dan membuat sikap lebih nyata lewat praktiknya.
  >
* **Kapan Perlu Disesuaikan (Boundary Condition) Saat Ini:**
  > *Sikap organisasi tetap perlu jelas. Hubungkan sikap itu dengan tindakan yang dapat diperiksa.*
  > ✏️ **Kotak Revisi Batas Kondisi:**
  > Ada situasi ketika Menungsa perlu menyampaikan batas atau sikap dengan tegas, terutama terkait keselamatan, kekerasan, diskriminasi, atau tindakan yang merugikan orang lain. Dalam situasi seperti ini, ketegasan tetap perlu diikuti dengan penjelasan tentang apa yang akan Menungsa lakukan atau batas apa yang akan Menungsa pegang.
  >

##### Contoh DO & DON'T untuk V6:

* **DO 1 Saat Ini:** `"Kami sedang menyusun informasi layanan kesehatan mental di beberapa wilayah. Daftar ini akan memuat fasilitas yang telah diverifikasi dan tanggal pemeriksaan terakhir."`

  * *Alasan:* Pesan berfokus pada hambatan layanan dan tindakan organisasi untuk menanganinya.

  > ✏️ **Kotak Revisi DO 1:**
  >
  > - Contoh: Kami ingin Ruang MENdukung menjadi tempat yang aman untuk bercerita. Karena itu, sebelum sesi dimulai, setiap peserta menyepakati aturan mengobrol dan kerahasiaan bersama.
  > - Alasan: Menunjukkan bagaimana nilai “ruang aman” diterapkan lewat aturan dan kebiasaan yang jelas.
  >
* **DO 2 Saat Ini:** `"Kami menolak kerja sama iklan produk suplemen di kanal ini, meskipun itu berarti kami kehilangan pemasukan sponsor."`

  * *Alasan:* Sikap organisasi disertai konsekuensi yang bersedia ditanggung. Gunakan hanya jika keputusan ini benar-benar dibuat.

  > ✏️ **Kotak Revisi DO 2:**
  >
  > - Contoh: Kami tidak akan membagikan cerita peserta ke publik tanpa izin. Kalau ada bagian yang ingin digunakan, kami akan meminta persetujuan terlebih dahulu.
  > - Alasan: Menunjukkan komitmen lewat tindakan yang jelas, bukan hanya lewat pernyataan.
  >
* **DON'T 1 Saat Ini:** `"Laki-laki Indonesia harus berhenti gengsi dan sadar kesehatan mental!"`

  * *Alasan:* Mengkambinghitamkan pembaca secara kolektif dengan kalimat perintah yang memicu resistensi batin.

  > ✏️ **Kotak Revisi DON'T 1:**
  >
  > - Contoh: Kalau kesehatan mental laki-laki mau membaik, laki-laki harus mulai terbuka dan berhenti gengsi.
  > - Alasan: Menuntut audiens untuk berubah tanpa menunjukkan apa yang Menungsa lakukan untuk membantu menciptakan perubahan tersebut.
  >
* **DON'T 2 Saat Ini:** `"Sudah saatnya kita semua peduli pada kesehatan jiwa!"`

  * *Alasan:* Ajakan ini belum menyebut siapa yang akan bertindak dan apa yang akan dilakukan.

  > ✏️ **Kotak Revisi DON'T 2:**
  >
  > - Contoh: Menungsa berkomitmen menciptakan ruang aman untuk semua laki-laki.
  > - Alasan: Menyatakan nilai yang baik, tetapi belum menunjukkan tindakan atau praktik yang membuat ruang tersebut lebih aman.
  >

---

### 3.3. Matriks Pembingkaian Gender 2x2 (Framing Matrix)

Hapus bagian ini (Framing Matrix) seluruhnya. dan ganti dengan melaksanakan prompt ini:
Saya ingin menambahkan sebuah interactive editorial explainer ke website Menungsa.

Konteks:
Menungsa adalah organisasi advokasi kesehatan mental laki-laki di Indonesia. Website menggunakan sistem visual Menungsa yang sudah ada. Komponen ini bukan dashboard analitik dan bukan chart statistik. Tujuannya adalah membantu pembaca memahami bagaimana konteks sosial memengaruhi cara sebuah pesan sebaiknya dibingkai.

Nama konsep internal:
“Public Gaze & Gender Framing Context Check”

Nama yang tampil untuk pembaca:
“Pertimbangkan Siapa yang Bisa Melihat”

Tujuan utama:
Menjelaskan bahwa cara seseorang merespons suatu pesan bisa berubah ketika tindakan, pengalaman, atau pengakuannya terlihat oleh orang lain. Untuk topik yang masih membawa stigma atau norma gender tertentu, ruang publik dapat meningkatkan risiko penilaian sosial. Karena itu, semakin publik dan semakin personal tindakan yang kita minta, semakin rendah tekanan yang sebaiknya diberikan kepada audiens untuk membuka diri.

Ini menggantikan konsep lama “Matriks Pembingkaian Gender 2x2”. Jangan tampilkan sebagai matriks 2x2. Jangan membuat sistem klasifikasi besar berdasarkan terapi, skincare, parenting, gym, dan sebagainya. Komponen ini harus terasa sebagai contextual check yang ringan, praktis, dan bisa dipakai lintas topik.

==================================================
1. STRUKTUR KOMPONEN
==================================================

Susun komponen menjadi lima bagian.

A. INTRO

Kicker:
CONTEXT CHECK

Headline:
Pertimbangkan siapa yang bisa melihat

Body:
Cara orang merespons sebuah pesan dapat berubah ketika tindakan atau pengalaman mereka terlihat oleh orang lain. Untuk topik yang masih membawa stigma atau norma gender tertentu, ruang publik dapat meningkatkan kekhawatiran akan penilaian sosial.

Gunakan headline serif dan body sans.

Jangan membuat intro terlalu lebar.
Batasi line length agar nyaman dibaca.

==================================================
B. PRINSIP UTAMA
==================================================

Buat satu visual sederhana yang memperlihatkan spektrum:

Privat
→
Terlihat oleh orang lain
→
Publik + personal

Tidak perlu angka.
Tidak perlu skala matematis.
Ini adalah conceptual continuum.

Di bawah atau di samping spektrum, tampilkan kalimat utama:

“Semakin publik dan semakin personal tindakannya, semakin rendah tuntutan untuk membuka diri.”

Berikan penekanan visual pada kalimat ini.

Jangan membuatnya seperti scientific graph.
Gunakan titik atau node sederhana dengan garis horizontal.

Pada desktop:
teks prinsip dan visual continuum dapat tampil berdampingan.

Pada mobile:
susun vertikal.

==================================================
C. TIGA CONTEXT CHECK
==================================================

Buat tiga blok yang menjelaskan cara menggunakan prinsip ini.

1. Cek ruangnya

Copy:
“Apakah respons pembaca akan terlihat oleh teman, keluarga, rekan kerja, pasangan, atau publik?”

2. Cek biaya sosialnya

Copy:
“Apakah tindakan yang kita ajak masih berpotensi dinilai memalukan, lemah, atau ‘tidak laki-laki’ dalam konteks audiens ini?”

3. Sesuaikan ajakannya

Copy:
“Semakin tinggi risiko penilaian sosial, semakin kecil tuntutan untuk mengungkapkan pengalaman pribadi di depan orang lain.”

Pada desktop:
tiga kolom horizontal.

Pada tablet/mobile:
stack vertikal.

Jangan membuat ketiganya seperti pricing cards atau dashboard cards.
Gunakan border ringan, spacing yang cukup, dan hierarchy sederhana.

==================================================
D. INTERACTIVE CONTEXT EXAMPLES
==================================================

Tambahkan selector/tab dengan tiga keadaan:

Ruang publik
Ruang privat
Cek norma gender

Hanya satu yang aktif pada satu waktu.

Default:
Ruang publik.

Gunakan button atau tab yang accessible.
Harus bisa digunakan dengan keyboard.
Gunakan aria-selected atau aria-pressed.
Active state menggunakan accent orange Menungsa.
Inactive state tetap sederhana dan netral.

Jangan gunakan animasi berlebihan.
Transition maksimal berupa perubahan opacity/position ringan.
Respect prefers-reduced-motion.

----------------------
TAB 1 — RUANG PUBLIK
----------------------

Judul:
Ruang publik

Penjelasan:
“Berikan informasi dan pilihan tanpa meminta pengakuan pribadi. Jika percakapan membutuhkan keterbukaan lebih jauh, arahkan ke jalur yang lebih privat.”

DO:
“Kalau belakangan ada yang terasa berbeda, kamu bisa cek beberapa tandanya di slide berikut.”

DON’T:
“Ceritakan masalah mentalmu di kolom komentar.”

Penjelasan tambahan opsional:
“Di ruang publik, tindakan sederhana seperti memberi komentar dapat terasa lebih berisiko karena identitas dan respons seseorang dapat dilihat orang lain.”

----------------------
TAB 2 — RUANG PRIVAT
----------------------

Judul:
Ruang privat

Penjelasan:
“Privat tidak otomatis berarti aman. Jelaskan batas privasi dan beri orang kendali atas seberapa jauh mereka ingin bercerita.”

DO:
“Kalau kamu ingin cerita lebih jauh, kamu bisa mulai dari bagian yang terasa nyaman.”

DON’T:
“Kalau serius ingin pulih, ceritakan semuanya sekarang.”

Penjelasan tambahan opsional:
“Ruang privat dapat mengurangi sorotan sosial, tetapi tetap tidak boleh dianggap sebagai izin untuk meminta keterbukaan penuh.”

----------------------
TAB 3 — CEK NORMA GENDER
----------------------

Judul:
Cek norma gender

Penjelasan:
“Jika suatu tindakan masih berpotensi dianggap ‘tidak laki-laki’, jangan menjadikan maskulinitas sebagai medan pembuktian. Fokuskan pesan pada kegunaan, pilihan, dan situasinya.”

DO:
“Konsultasi bisa membantu kamu memahami apa yang belakangan berubah dan menentukan langkah berikutnya.”

DON’T:
“Cowok juga boleh kok ke psikolog—nggak usah malu jadi laki-laki yang sensitif.”

Penjelasan tambahan opsional:
“Kalimat seperti ‘cowok juga boleh’ terlihat suportif, tetapi tetap dapat memperkuat anggapan bahwa tindakan tersebut pada dasarnya berada di luar norma laki-laki.”

==================================================
E. RANGKUMAN / TAKEAWAY
==================================================

Buat satu bagian akhir yang lebih tenang dan ringkas.

Headline kecil:
Prinsip sederhananya

Copy utama:
“Di ruang publik, beri informasi dan pilihan tanpa meminta pengakuan pribadi. Jika percakapan membutuhkan keterbukaan lebih jauh, sediakan jalur yang lebih privat dan jelaskan batas privasinya.”

Copy kedua:
“Jika tindakan yang kita ajak masih berpotensi dinilai sebagai ‘tidak laki-laki’, jangan memperkuat stereotip dengan mengatakan ‘cowok juga boleh…’. Fokuskan pesan pada kegunaan, pilihan, dan situasinya.”

Catatan kecil:
“Ini adalah contextual check, bukan aturan terpisah untuk setiap topik.”

==================================================
2. DESAIN VISUAL
==================================================

Gunakan design system Menungsa yang sudah ada.

Warna:
- Background utama: bone #F1ECDF
- Primary text: blue #17243D
- Accent / active control: orange #AF4D28
- Green #2E4034 hanya jika memang diperlukan sebagai secondary semantic accent
- Border: bone-shade #DDD6C4
- Jangan invent warna baru
- Jangan menggunakan gradient
- Jangan menggunakan opacity pada teks jika membuat contrast turun
- Jangan menggunakan glassmorphism
- Jangan menggunakan glow
- Jangan menggunakan text shadow
- Jangan menggunakan decorative edge stripes

Typography:
- Headline: EB Garamond 600
- Body/UI: Satoshi
- Jika Satoshi tidak tersedia dalam environment tertentu, gunakan Plus Jakarta Sans
- Kicker uppercase saja
- Body tetap sentence case
- Jangan menggunakan all caps untuk heading

Spacing:
- Gunakan whitespace yang lega
- Jangan terlalu banyak card
- Jangan membuat semua bagian terlihat seperti boxed UI
- Beberapa section boleh hanya menggunakan whitespace dan divider

Border radius:
subtle, sekitar 6–9px.

Shadow:
sebisa mungkin tidak digunakan.
Jika separation dibutuhkan, prioritaskan border atau perubahan surface.

==================================================
3. VISUAL LANGUAGE
==================================================

Visual harus terasa:
editorial
calm
adult
human
evidence-led
clear
not clinical
not corporate
not wellness-brand
not gamified

Jangan tampilkan ilustrasi otak, hati, gender icon, siluet laki-laki, simbol Mars, atau visual maskulinitas klise.

Jangan menggunakan warna pink-vs-blue untuk merepresentasikan gender.

Jangan menjadikan public/private sebagai binary moral:
public bukan “buruk”
private bukan “baik”

Fokusnya adalah contextual fit.

==================================================
4. INTERACTION
==================================================

Tab/selector menjadi satu-satunya interaction utama.

Saat user memilih:
Ruang publik
Ruang privat
Cek norma gender

ubah:
- judul
- penjelasan
- DO
- DON'T
- penjelasan opsional

Jangan reload page.
Jangan membuka modal.
Jangan membuat accordion bertingkat.

Transition harus ringan.

Pada mobile:
selector boleh wrap menjadi beberapa baris jika perlu.

Touch target minimum 44px.

==================================================
5. ACCESSIBILITY
==================================================

Pastikan:
- contrast memenuhi WCAG AA
- tab bisa digunakan keyboard
- focus state jelas menggunakan orange
- heading structure semantik
- tidak mengandalkan warna saja untuk membedakan DO dan DON'T
- gunakan label teks “DO” dan “DON’T”
- respect prefers-reduced-motion
- lang="id"
- seluruh content tetap bisa dipahami walaupun JavaScript gagal

Progressive enhancement:
default render “Ruang publik” secara lengkap di HTML.
JavaScript hanya mengubah konten saat tab dipilih.

==================================================
6. RESPONSIVE BEHAVIOUR
==================================================

Desktop:
- intro dengan max-width editorial
- principle visualization boleh dua kolom
- tiga context check tampil 3 kolom
- interactive example tampil dua kolom:
  kiri = explanation
  kanan = DO / DON'T

Tablet:
- principle visualization tetap dapat dua kolom bila cukup
- context check boleh 3 atau 2+1

Mobile:
- semua stack
- tabs wrap
- visual continuum tetap terbaca
- tidak boleh ada horizontal page scrolling

==================================================
7. COPY TONE
==================================================

Gunakan bahasa Indonesia yang:
- tenang
- konkret
- tidak menghakimi
- tidak terdengar seperti jurnal akademik
- tidak terlalu santai
- tidak menggunakan “bro”, “king”, “cuy”, atau greeting formula
- tidak mengatakan “cowok juga boleh” kecuali sebagai contoh DON'T
- tidak membuat klaim universal

Pertahankan kata:
“bisa”
“dapat”
“sebagian”
“dalam konteks ini”

ketika memang ada ketidakpastian.

Jangan over-explain teori psychological reactance atau masculinity theory di component ini.

Jika dibutuhkan, teori dapat dijelaskan di halaman research notes atau footnote terpisah.

==================================================
8. COMPONENT ARCHITECTURE
==================================================

Buat component reusable.

Jika menggunakan React/Next.js:
ContextFramingCheck

Subcomponent opsional:
ContextTabs
ContextExample
ContextContinuum
ContextCheckCard

State:
activeContext = "public" | "private" | "gender"

Data untuk masing-masing state simpan dalam satu object/array terpisah dari markup.

Jangan hard-code tiga versi layout yang berbeda.

==================================================
9. OUTPUT YANG SAYA INGINKAN
==================================================

Berikan:
1. component final yang siap dipakai
2. CSS/Tailwind yang mengikuti design system Menungsa
3. responsive behaviour
4. accessible interaction
5. copy persis seperti yang ditentukan di atas
6. tidak menambahkan section atau copy baru tanpa alasan kuat
7. tidak menggunakan library chart karena ini bukan chart
8. tidak mengubah konsep menjadi matrix 2x2
9. jangan invent warna, icon, ilustrasi, atau terminology baru

Sebelum selesai, cek kembali apakah hasil akhirnya masih terasa seperti satu editorial explainer yang ringan, bukan mini-dashboard.

---

### 3.4. Panduan Singkat Menulis (Playbook Rules R01–R06)

#### R01 (Keterbukaan dan Privasi)

* **Tindakan Saat Ini:** Jadikan langkah pertama kecil, privat, dan tanpa beban komitmen.
* **Alasan Saat Ini:** Jelaskan langkah pertama, siapa yang dapat melihat respons pembaca, dan apakah ia bisa berhenti.
* **DO Saat Ini:** `"Sesi berikutnya Selasa pukul 19.00. Boleh datang, boleh sekadar duduk mengamati dulu."`
* **DON'T Saat Ini:** `"Yuk tumpahkan semua unek-unekmu di kolom komentar postingan ini!"`



#### R02 (Maskulinitas & Martabat)

* **Tindakan Saat Ini:** Gunakan latar situasi nyata agar emosi hadir secara alami.
* **Alasan Saat Ini:** Gunakan situasi yang relevan sebagai pembuka. Istilah klinis tetap dapat dijelaskan saat dibutuhkan, tanpa mendiagnosis pembaca.
* **DO Saat Ini:** `"Jam tiga pagi, lampu kamar sudah mati, tapi jari masih terus menggulir layar ponsel."`
* **DON'T Saat Ini:** `"Kenali 5 tanda kamu sedang mengalami depresi berat dan gangguan mental!"`


#### R03 (Ajakan Tanpa Paksaan)

* **Tindakan Saat Ini:** Tawarkan kendali mandiri dengan pilihan sukarela yang nyata.
* **Alasan Saat Ini:** Bahasa yang menekan kebebasan memilih dapat memicu penolakan. Temuan ini tidak khusus pada laki-laki.
* **DO Saat Ini:** `"Ada dua hal kecil yang bisa dicoba malam ini: jalan santai 15 menit atau mandi air hangat sebelum tidur."`
* **DON'T Saat Ini:** `"Kamu harus berhenti memendam emosi dan wajib konsultasi sekarang juga!"`



#### R04 (Ragam Bahasa)

* **Tindakan Saat Ini:** Gunakan “kamu” sebagai sapaan utama dalam panduan Menungsa.
* **Alasan Saat Ini:** “Kamu” dipilih sebagai sapaan utama Menungsa. Sesuaikan dengan hubungan penulis dan pembaca serta konteks layanan.
* **DO Saat Ini:** `"Ketika tubuhmu memberi sinyal lelah yang berkepanjangan, dengarkan."`
* **DON'T Saat Ini:** `"Halo bro/cuy, gimana kabar mental lo hari ini? Curhat yuk sama mimin!"`



#### R05 (Maskulinitas & Martabat)

* **Tindakan Saat Ini:** Jaga pilihan pembaca saat membahas pengalaman pribadi.
* **Alasan Saat Ini:** Di ruang publik, hindari meminta pembaca mengungkap pengalaman pribadi. Topik emosi tetap dapat dibahas; sediakan pilihan untuk merespons secara privat.
* **DO Saat Ini:** `"Di linimasa publik: bahas pengalaman sehari-hari dan emosi tanpa meminta pembaca menceritakan masalahnya di komentar."`
* **DON'T Saat Ini:** `"Share di kolom komentar, cerita paling sedih atau aib rumah tangga yang selama ini kamu pendam dari pasanganmu!"`


#### R06 (Ajakan Tanpa Paksaan)

* **Tindakan Saat Ini:** Hindari label "Pria Sejati", "Cowok Alfa", atau kasta maskulinitas.
* **Alasan Saat Ini:** Menungsa menghindari label yang menjadikan harga diri laki-laki bergantung pada standar ketangguhan atau pencapaian.
* **DO Saat Ini:** `"Menyelesaikan pekerjaan dengan tuntas dan menjaga keluarga tetap aman."`
* **DON'T Saat Ini:** `"Cowok yang bernilai tinggi itu nggak kenal kata menyerah. Buktikan kamu punya mental baja untuk sukses!"`

> ✏️ **Kotak Revisi 3.4. Panduan Singkat Menulis (Playbook Rules R01–R06):**

Bagian ini merangkum enam prinsip suara Menungsa menjadi aturan praktis untuk menulis caption, carousel, formulir, halaman website, atau materi program. Setiap rule berisi satu tindakan utama, alasan singkat, serta contoh DO dan DON'T.

#### R01 — Setara, Bukan Menghakimi

- **Tindakan:** Gambarkan orang, situasi, atau perilaku tanpa mengubahnya menjadi label tentang siapa mereka atau seperti apa mereka seharusnya.
- **Alasan:** Bahasa yang tidak menghakimi membantu pembaca merasa tidak sedang dinilai atau diposisikan sebagai orang yang perlu “diperbaiki”.
- **DO:** “Minggu lalu, program kami dihadiri oleh tujuh orang. Empat di antaranya lebih banyak mendengarkan.”
- **DON'T:** “Laki-laki kuat adalah laki-laki yang berani bercerita.”

#### R02 — Mudah untuk Dimulai

- **Tindakan:** Jelaskan apa yang perlu diketahui pembaca dengan konkret dan ringkas. Jangan menambah langkah, istilah, atau tuntutan yang tidak diperlukan.
- **Alasan:** Kejelasan mengurangi beban untuk memahami, memutuskan, dan mengambil langkah pertama.
- **DO:** “Ruang MENdukung berlangsung Selasa pukul 19.00 WIB via Google Meet. Gratis, dan kamu bebas memilih mau bercerita atau cukup mendengarkan.”
- **DON'T:** “Sebelum ikut, isi formulir lengkap dan ceritakan masalah yang sedang kamu alami.”

#### R03 — Satu Langkah Nyata

- **Tindakan:** Tawarkan satu tindakan yang konkret dan realistis. Jika ada banyak pilihan, bantu pembaca menentukan langkah yang paling masuk akal untuk dilakukan terlebih dahulu.
- **Alasan:** Terlalu banyak saran sekaligus dapat membuat pembaca bingung atau tidak melakukan apa pun. Satu langkah yang jelas membantu mengubah pemahaman menjadi tindakan.
- **DO:** “Kalau belakangan kamu merasa kewalahan, coba pilih satu orang yang cukup kamu percaya dan bilang, ‘Gue pusing nih, ayok nongkrong?’”
- **DON'T:** “Mulai olahraga rutin, tidur cukup, makan lebih sehat, kurangi media sosial, coba journaling, dan jangan ragu mencari bantuan profesional.”

#### R04 — Mulai dari yang Terlihat

- **Tindakan:** Mulailah dari situasi, kebiasaan, atau perubahan yang bisa dikenali pembaca. Tunjukkan apa yang terjadi terlebih dahulu. Jangan langsung menyimpulkan apa yang mereka rasakan, pikirkan, atau alami.
- **Alasan:** Seseorang sering lebih mudah mengenali perubahan dalam kesehariannya sebelum bisa menjelaskan apa yang sedang ia rasakan. Mulai dari perubahan itu memberi ruang bagi pembaca untuk mengenali pengalamannya sendiri.
- **DO:** “Sudah lewat jam tiga pagi. Lampu kamar mati, tapi kamu masih buka aplikasi bank dan mengecek saldo lagi.”
- **DON'T:** “Kalau belakangan kamu jadi lebih sering menghindar dari orang lain dan rasanya nggak punya tenaga buat ngapa-ngapain, berarti kamu depresi.”

#### R05 — Jelas soal Batasan

- **Tindakan:** Sampaikan informasi sesuai tingkat kepastian yang tersedia. Bedakan apa yang sudah diketahui, apa yang belum diketahui, dan apa yang belum bisa Menungsa lakukan.
- **Alasan:** Kejelasan soal batas pengetahuan dan kapasitas membantu audiens memahami informasi tanpa menerima kepastian yang sebenarnya belum ada.
- **DO:** “Bercerita bisa membantu sebagian orang, tapi dampaknya bisa berbeda-beda.”
- **DON'T:** “Bercerita terbukti membuat laki-laki merasa lebih baik.”

#### R06 — Tindakan, Bukan Tuntutan

- **Tindakan:** Jelaskan secara konkret apa yang Menungsa lakukan, pilih, atau ubah. Saat menyatakan nilai atau sikap, tunjukkan bagaimana hal itu diterapkan dalam tindakan.
- **Alasan:** Mengatakan apa yang “seharusnya” dilakukan orang lain mudah terasa seperti nasihat atau tuntutan. Menunjukkan apa yang Menungsa lakukan sendiri memberi contoh yang lebih konkret tanpa memaksa pembaca untuk mengikuti.
- **DO:** “Kami ingin Ruang MENdukung menjadi tempat yang aman untuk bercerita. Karena itu, setiap peserta menyepakati kerahasiaan dan aturan percakapan sebelum sesi dimulai.”
- **DON'T:** “Kalau kesehatan mental laki-laki mau membaik, laki-laki harus mulai terbuka dan berhenti gengsi.”

#### Cara Memakai Playbook Ini

Gunakan R01–R06 sebagai pemeriksaan cepat sebelum tulisan dipublikasikan. Tidak semua rule harus terlihat secara eksplisit dalam setiap tulisan, tetapi copy sebaiknya tidak bertentangan dengan salah satunya.

Saat ragu, periksa enam pertanyaan berikut:

1. Apakah tulisan ini menggambarkan orang tanpa menghakimi atau menetapkan seperti apa mereka seharusnya?
2. Apakah pembaca bisa memahami apa yang perlu diketahui dan bagaimana memulainya tanpa beban yang tidak perlu?
3. Jika tulisan mengajak pembaca bertindak, apakah ada satu langkah yang cukup konkret untuk dilakukan?
4. Apakah tulisan mulai dari situasi atau perubahan yang bisa dikenali sebelum menyimpulkan apa yang dirasakan atau dialami pembaca?
5. Apakah tingkat kepastian klaim sesuai dengan bukti dan kapasitas Menungsa?
6. Jika Menungsa menyatakan nilai atau sikap, apakah tindakan yang menyertainya juga terlihat?


---

## 4. Halaman 2: Contoh Naskah (Writing Studio)

*Lokasi: `src/components/views-v2/WritingStudioView.tsx` (rute `#studio`)*

### 4.1. Header & Kontrol Studio

* **Kicker Saat Ini:** `PUSTAKA CONTOH TULISAN NYATA (56 CONTOH)`
  > ✏️ **Kotak Revisi Kicker:** `CONTOH PENERAPAN`
  >
* **Judul Utama Saat Ini:** `Contoh naskah Menungsa`
  > ✏️ **Kotak Revisi Judul:** `Voice Menungsa dalam Praktik`
  >
* **Paragraf Pengantar Saat Ini:** `Bandingkan contoh naskah untuk berbagai situasi, lalu baca alasan pilihan katanya. Semua contoh bersifat ilustratif dan perlu disesuaikan sebelum digunakan, termasuk fakta, informasi layanan, dan kebijakan privasi.`
  > ✏️ **Kotak Revisi Pengantar:**
  > Lihat bagaimana Voice Menungsa diterapkan dalam berbagai situasi, lengkap dengan alasan di balik pilihan katanya. Gunakan contoh-contoh ini sebagai acuan. Sesuaikan kembali fakta, konteks, informasi layanan, dan ketentuan privasi sebelum digunakan.
  >

---

### 4.2. 14 Konteks Penulisan & 56 Contoh Naskah (C01–C14)

#### C01: Psikoedukasi & Ritme Tubuh

* **Tugas Psikologis:** Bantu pembaca memahami situasi melalui penjelasan yang akurat dan mudah digunakan, tanpa mendorong mereka mendiagnosis diri sendiri.
* **Properti Bahasa:** Gunakan kamu / kita untuk menyertakan pembaca; kalimat pernyataan yang pendek; satu mekanisme yang dijelaskan per konten; istilah klinis diperkenalkan SETELAH penjelasan sehari-hari, bukan sebelumnya.
* **Hal yang Dihindari:** Mendiagnosis pembaca; menumpuk istilah medis; membuka naskah dengan kalimat 'kamu mungkin depresi'.

> ✏️ **Kotak Revisi Definisi Konteks C01:**
>
> * **Tugas Psikologis:** Membantu pembaca memahami perubahan pada tubuh, perhatian, energi, atau kebiasaan melalui penjelasan yang sederhana dan akurat, tanpa menyimpulkan diagnosis dari satu atau dua tanda.
> * **Properti Bahasa:** Mulai dari situasi atau perubahan yang bisa dikenali. Jelaskan satu mekanisme pada satu waktu dengan bahasa sehari-hari; kenalkan istilah klinis hanya jika membantu pemahaman. Jika memberi saran, arahkan pada satu langkah yang realistis.
> * **Hal yang Dihindari:** Mendiagnosis pembaca, menebak penyebab tunggal dari suatu gejala, menumpuk istilah medis, atau membuat klaim biologis yang lebih pasti daripada bukti yang tersedia.

##### Contoh Naskah C01:

* **EX-C01-1 (Slide Pembuka Carousel Medsos):**

  * *Naskah Saat Ini:* `"Kerjaan belum selesai, tapi rasanya sudah sulit fokus. Dalam tulisan ini, kita membahas beban kerja dan pilihan untuk mengambil jeda."`
  * *Alasan Saat Ini:* Mulai dari situasi yang dapat dikenali tanpa menyimpulkan diagnosis pembaca.

  > ✏️ **Kotak Revisi EX-C01-1:**
  >
  > - Naskah Baru: Kerjaan masih banyak, tapi belakangan satu halaman saja rasanya susah selesai. Apa yang terjadi ketika fokus mulai cepat terkuras?
  > - Alasan Baru: Mulai dari perubahan yang bisa dikenali pembaca, lalu membuka ruang untuk penjelasan tanpa langsung memberi label pada kondisinya.
  >
* **EX-C01-2 (Catatan Penutup Panduan Praktis):**

  * *Naskah Saat Ini:* `"Kalau memungkinkan, ambil jeda sebentar dari pekerjaan. Kamu tidak perlu menyelesaikan semuanya sekaligus."`
  * *Alasan Saat Ini:* Tawarkan jeda sebagai pilihan. Jangan menambahkan klaim hormon atau durasi manfaat tanpa sumber.

  > ✏️ **Kotak Revisi EX-C01-2:**
  >
  > - Naskah Baru: Kalau perhatianmu sudah mulai buyar, coba berhenti beberapa menit sebelum lanjut ke tugas berikutnya.
  > - Alasan Baru: Memberikan satu langkah yang konkret tanpa menjanjikan bahwa jeda singkat akan selalu memulihkan fokus.
  >
* **EX-C01-3 (Slide Panduan Singkat Medsos):**

  * *Naskah Saat Ini:* `"Sudah lama duduk di depan layar? Kalau memungkinkan, berhenti sebentar dan beralih dari pekerjaanmu."`
  * *Alasan Saat Ini:* Berikan langkah sederhana tanpa menjanjikan perubahan pada sistem saraf.

  > ✏️ **Kotak Revisi EX-C01-3:**
  >
  > - Naskah Baru: Sudah lama menatap layar dan baca kalimat yang sama berulang kali? Coba alihkan pandangan sebentar sebelum lanjut.
  > - Alasan Baru: Menghubungkan saran dengan tanda yang bisa dikenali pembaca, bukan dengan klaim tentang kondisi tubuh atau sistem saraf yang belum perlu disimpulkan.
  >
* **EX-C01-4 (Lembar Info Meja Kerja):**

  * *Naskah Saat Ini:* `"Email baru masuk saat tugas sebelumnya belum selesai. Kalau memungkinkan, catat dulu mana yang perlu dikerjakan lebih awal."`
  * *Alasan Saat Ini:* Hindari menyimpulkan penyebab gejala fisik dari satu situasi.

  > ✏️ **Kotak Revisi EX-C01-4:**
  >
  > - Naskah Baru: Email baru masuk sebelum tugas sebelumnya selesai. Sebelum pindah, catat satu hal yang perlu kamu selesaikan dari tugas yang sedang dikerjakan.
  > - Alasan Baru: Mengubah situasi yang mudah membuat perhatian terpecah menjadi satu tindakan praktis, tanpa menganggap satu penyebab menjelaskan semua kesulitan fokus.
  >

---

#### C02: Pengakuan Beban (Merasa Dipahami / *Seen*)

* **Tugas Psikologis:** Akui beban nyata secara presisi tanpa menciptakan musuh dan tanpa menuntut respons apa pun dari pembaca.
* **Properti Bahasa:** Detail situasi konkret lebih diutamakan daripada kata-kata emosi; gunakan sudut pandang orang kedua atau ketiga tanpa atribusi; akhiri pada deskripsi situasi, bukan solusi instan.
* **Hal yang Dihindari:** Menyebut kambing hitam; memakai slogan klise 'kamu tidak sendirian' tanpa konteks nyata; langsung menjual produk/layanan.

> ✏️ **Kotak Revisi Definisi Konteks C02:**
>
> * **Tugas Psikologis:** Membantu pembaca merasa pengalamannya dikenali dengan menggambarkan beban atau perubahan yang dekat dengan keseharian, tanpa menebak perasaan, penyebab, atau diagnosisnya.
> * **Properti Bahasa:** Gunakan detail situasi yang konkret dan mudah dikenali. Biarkan tindakan, kebiasaan, atau perubahan kecil membawa makna. Akhiri pada pengamatan atau pengakuan atas situasi, bukan langsung pada solusi.
> * **Hal yang Dihindari:** Menentukan apa yang pasti dirasakan pembaca, mencari pihak yang disalahkan, memakai slogan seperti “kamu tidak sendirian” tanpa konteks, atau langsung mengubah pengakuan atas beban menjadi ajakan membeli, mendaftar, atau melakukan sesuatu.

##### Contoh Naskah C02:

* **EX-C02-1 (Unggahan Refleksi Linimasa):**

  * *Naskah Saat Ini:* `"Masih datang kerja tepat waktu. Masih membalas pesan kantor. Sampai di rumah, kamu duduk di tepi kasur. Lampu kamar belum dinyalakan, padahal hari sudah gelap."`
  * *Alasan Saat Ini:* Gambarkan pengalaman tanpa menyimpulkan bahwa keluhan pasti normal atau tidak perlu diperhatikan.

  > ✏️ **Kotak Revisi EX-C02-1:**
  >
  > - Naskah Baru: Masih datang kerja tepat waktu. Masih membalas pesan kantor. Sampai di rumah, tas belum dilepas dan kamu sudah duduk di tepi kasur. Lampu kamar belum dinyalakan meski hari sudah gelap.
  > - Alasan Baru: Menggambarkan jarak antara fungsi yang masih berjalan dan apa yang terjadi setelahnya, tanpa menyimpulkan apa yang dirasakan atau dialami pembaca.
  >
* **EX-C02-2 (Fragmen Renungan Singkat):**

  * *Naskah Saat Ini:* `"Jam sebelas malam, layar ponsel sudah dimatikan. Tapi sampai jam tiga pagi, matamu masih menatap langit-langit kamar."`
  * *Alasan Saat Ini:* Biarkan pengamatan berdiri sendiri. Jangan menyimpulkan penyebab sulit tidur.

  > ✏️ **Kotak Revisi EX-C02-2:**
  >
  > - Naskah Baru: Jam sebelas malam, ponsel sudah diletakkan. Jam tiga pagi, kamu masih melihat langit-langit kamar.
  > - Alasan Baru: Membiarkan perubahan yang terlihat berbicara sendiri tanpa menebak penyebab sulit tidur atau memberi label pada kondisinya.
  >
* **EX-C02-3 (Refleksi Linimasa Medsos):**

  * *Naskah Saat Ini:* `"Masih sempat pulang naik motor, mencuci piring, dan memberi makan kucing. Tapi saat teman mengajak ngopi, kamu belum tahu harus membalas apa. Pesannya baru terjawab tiga hari kemudian."`
  * *Alasan Saat Ini:* Akui bahwa membalas pesan bisa terasa berat, tanpa memberi diagnosis atau membenarkan semua bentuk pengabaian.

  > ✏️ **Kotak Revisi EX-C02-3:**
  >
  > - Naskah Baru: Kamu masih sempat pulang naik motor, mencuci piring, dan memberi makan kucing. Tapi pesan teman yang ngajak ngopi baru kamu balas tiga hari kemudian.
  > - Alasan Baru: Menunjukkan bahwa beberapa hal masih bisa dilakukan sementara hal lain mulai terasa lebih sulit, tanpa menentukan alasan atau memberi penilaian pada perilaku tersebut.
  >
* **EX-C02-4 (Observasi Fisik Lelah Mental):**

  * *Naskah Saat Ini:* `"Badan sudah di tempat tidur, tapi kepala masih memutar ulang obrolan rapat tadi siang."`
  * *Alasan Saat Ini:* Gunakan detail keseharian tanpa menyimpulkan kondisi kesehatan pembaca.

  > ✏️ **Kotak Revisi EX-C02-4:**
  >
  > - Naskah Baru: Badan sudah di tempat tidur. Rapat tadi siang sudah selesai berjam-jam lalu, tapi potongan percakapannya masih terus muncul di kepala.
  > - Alasan Baru: Menggambarkan pengalaman yang bisa dikenali tanpa langsung menyebutnya sebagai overthinking, kecemasan, atau kondisi tertentu.
  >

---

#### C03: Kisah Personal & Narasi Kejujuran

* **Tugas Psikologis:** Biarkan emosi mengalir melalui kronologi peristiwa nyata; tunjukkan keterbukaan tanpa menjadikannya standar yang menekan pembaca.
* **Properti Bahasa:** Sudut pandang orang pertama (aku/saya/gue bergantung penutur); detail benda dan ruang konkret; penutur tetap mempertahankan martabatnya.
* **Hal yang Dihindari:** Format pengakuan dosa yang mendramatisir penderitaan; menjadikan tangisan sebagai tontonan; framing 'berani terbuka' yang intimidatif.

> ✏️ **Kotak Revisi Definisi Konteks C03:**
>
> * **Tugas Psikologis:** Membawa pembaca masuk ke pengalaman seseorang melalui kejadian, pilihan, dan detail yang benar-benar dialami penutur. Keterbukaan boleh hadir, tetapi tidak dijadikan ukuran keberanian, kekuatan, atau kedewasaan bagi orang lain.
> * **Properti Bahasa:** Gunakan sudut pandang orang pertama sesuai suara penutur (`aku`, `saya`, atau `gue`). Biarkan kronologi, benda, ruang, dan tindakan membawa emosi. Perasaan boleh disebut langsung jika memang bagian dari pengalaman penutur, tanpa perlu dibuat lebih dramatis.
> * **Hal yang Dihindari:** Mengubah cerita menjadi pengakuan yang dipertontonkan, memperbesar penderitaan demi efek emosional, memaksa klimaks berupa tangisan atau “akhirnya berani terbuka”, serta menarik pengalaman satu orang menjadi standar bagi laki-laki lain.

##### Contoh Naskah C03:

* **EX-C03-1 (Esai Narasi Orang Pertama):**

  * *Naskah Saat Ini:* `"Bulan ketiga setelah toko tutup, saya masih bangun jam lima pagi. Saya duduk di teras, menyeduh kopi, dan melihat orang-orang berangkat kerja. Saya masih khawatir soal apa yang akan saya lakukan setelah ini."`
  * *Alasan Saat Ini:* Pertahankan sudut pandang penutur dan detail pengalamannya. Cerita orang pertama harus diberi label fiksi jika bukan kesaksian nyata.

  > ✏️ **Kotak Revisi EX-C03-1:**
  >
  > - Naskah Baru: Bulan ketiga setelah toko tutup, saya masih bangun jam lima pagi seperti biasa. Saya bikin kopi, duduk di teras, lalu melihat orang-orang berangkat kerja. Sampai sekarang saya masih belum tahu pasti apa yang akan saya lakukan setelah ini.
  > - Alasan Baru: Menggunakan rutinitas dan detail keseharian untuk membawa pembaca masuk ke pengalaman penutur, tanpa mengubah ketidakpastian tersebut menjadi pelajaran atau tuntutan bagi orang lain.
  >
* **EX-C03-2 (Naskah Suara Video Pendek):**

  * *Naskah Saat Ini:* `"Menemani seorang kawan melewati masa sulit tidak selalu membutuhkan nasihat panjang. Duduk berdampingan di warung kopi tanpa banyak bicara terkadang sudah cukup."`
  * *Alasan Saat Ini:* Tunjukkan kebersamaan tanpa menuntut pengungkapan pribadi. Cerita yang menyebut perasaan secara langsung tetap sah.

  > ✏️ **Kotak Revisi EX-C03-2:**
  >
  > - Naskah Baru: Waktu itu gue nggak tahu harus ngomong apa ke dia. Jadi kami duduk saja di warung, pesan kopi, dan ngobrol soal hal-hal lain. Beberapa saat kemudian, dia mulai cerita sendiri.
  > - Alasan Baru: Menunjukkan pengalaman menemani orang lain melalui kejadian konkret, tanpa menjadikan nasihat atau keterbukaan sebagai sesuatu yang harus terjadi.
  >
* **EX-C03-3 (Esai Kejujuran Kerja):**

  * *Naskah Saat Ini:* `"Enam bulan setelah usaha sablon tutup, saya masih sering merapikan rak cat di garasi. Menyeka debu di kaleng-kaleng yang sudah kering, lalu mencocokkan kode warna yang tak lagi dipakai. Saya masih belum terbiasa kehilangan rutinitas itu."`
  * *Alasan Saat Ini:* Detail benda dan rutinitas adalah pilihan gaya, bukan bukti bahwa ungkapan sedih yang langsung itu buruk.

  > ✏️ **Kotak Revisi EX-C03-3:**
  >
  > - Naskah Baru: Enam bulan setelah usaha sablon tutup, saya masih sesekali masuk ke garasi dan merapikan rak cat. Ada beberapa kaleng yang sudah kering, tapi saya masih hafal kode warnanya. Rasanya aneh punya kebiasaan yang masih tertinggal ketika pekerjaannya sudah tidak ada.
  > - Alasan Baru: Membiarkan benda dan rutinitas membawa makna kehilangan, lalu memberi ruang bagi penutur untuk menyebut perasaannya tanpa mendramatisasi pengalaman tersebut.
  >
* **EX-C03-4 (Narasi Pertemanan Tanpa Tuntutan):**

  * *Naskah Saat Ini:* `"Kami duduk di trotoar depan minimarket sampai larut malam. Tidak ada yang bertanya apa masalahnya, dan tidak ada yang buru-buru memberi solusi."`
  * *Alasan Saat Ini:* Gambarkan kebersamaan tanpa menjanjikan pemulihan atau menuntut jawaban.

  > ✏️ **Kotak Revisi EX-C03-4:**
  >
  > - Naskah Baru: Kami duduk di depan minimarket sampai hampir tengah malam. Gue belum cerita banyak, dan dia juga nggak maksa nanya. Kami cuma duduk, sesekali ngobrol hal lain, sampai akhirnya pulang.
  > - Alasan Baru: Menunjukkan kedekatan tanpa menganggap percakapan mendalam harus selalu terjadi atau bahwa kebersamaan tersebut otomatis menyelesaikan masalah.
  >

---

#### C04: Undangan Komunitas & Teman Sebaya

* **Tugas Psikologis:** Buat keikutsertaan mudah dipahami dan jelaskan bahwa biaya sosial untuk bergabung sangat rendah.
* **Properti Bahasa:** Jelaskan logistik fisik di baris awal; nyatakan izin untuk sekadar diam mendengarkan; berikan jalur keluar yang bebas rasa bersalah.
* **Hal yang Dihindari:** Memaksa perkenalan keliling lingkaran; mewajibkan pembaca menceritakan masalah pribadi; janji rasa aman palsu.

> ✏️ **Kotak Revisi Definisi Konteks C04:**
>
> * **Tugas Psikologis:** Membuat orang tahu apa yang akan mereka hadapi sebelum memutuskan untuk ikut. Kurangi tekanan untuk langsung aktif, memperkenalkan diri, atau membagikan pengalaman pribadi.
> * **Properti Bahasa:** Jelaskan sejak awal kegiatan, waktu, tempat atau platform, durasi, biaya jika ada, dan cara bergabung. Sebutkan dengan jelas jika peserta boleh sekadar hadir atau mendengarkan. Jika ada aturan, komitmen, atau kondisi untuk meninggalkan kegiatan, jelaskan apa adanya.
> * **Hal yang Dihindari:** Membuat keikutsertaan terdengar seperti komitmen besar, mewajibkan perkenalan atau cerita pribadi tanpa alasan yang jelas, menyembunyikan biaya atau aturan penting, serta menjanjikan bahwa semua orang pasti akan merasa aman atau nyaman.

##### Contoh Naskah C04:

* **EX-C04-1 (Undangan Pertemuan Komunitas):**

  * *Naskah Saat Ini:* `"Kami akan jalan santai di [lokasi] pada [hari, tanggal, dan jam]. Kegiatannya [rincian dan durasi]. Kamu boleh ikut tanpa harus bercerita. [Biaya dan cara bergabung yang sudah diverifikasi]."`
  * *Alasan Saat Ini:* Jelaskan kegiatan dan pilihan untuk ikut tanpa bercerita. Verifikasi jadwal, lokasi, serta biaya sebelum digunakan.

  > ✏️ **Kotak Revisi EX-C04-1:**
  >
  > - Naskah Baru: Ruang MENdukung berlangsung [hari, tanggal] pukul [jam] via [platform] selama sekitar [durasi]. Kamu boleh ikut untuk bercerita atau cukup mendengarkan. [Biaya dan cara bergabung yang sudah diverifikasi].
  > - Alasan Baru: Menjelaskan bentuk kegiatan dan tingkat keterlibatan yang diharapkan sejak awal, sehingga orang bisa memutuskan apakah ingin ikut tanpa harus lebih dulu membuka pengalaman pribadi.
  >
* **EX-C04-2 (Pengantar Diskusi Daring):**

  * *Naskah Saat Ini:* `"Sesi obrolan daring malam ini dimulai pukul 20.00 WIB. Kamera boleh dimatikan, mik boleh dimatikan. Kamu boleh sekadar mendengarkan sambil rebahan."`
  * *Alasan Saat Ini:* Berikan pilihan untuk mengikuti percakapan tanpa memperkenalkan diri atau membagikan masalah pribadi.

  > ✏️ **Kotak Revisi EX-C04-2:**
  >
  > - Naskah Baru: Kita mulai pukul 20.00 WIB malam ini. Kamera nggak wajib dinyalakan, dan kamu boleh ikut sambil mendengarkan dulu. Kalau ingin bicara, tinggal angkat tangan atau masuk saat ada ruang.
  > - Alasan Baru: Memberi pilihan yang jelas tentang cara berpartisipasi tanpa membuat diam atau tidak menyalakan kamera terasa seperti bentuk partisipasi yang kurang sah.
  >
* **EX-C04-3 (Jalan Santai Akhir Pekan):**

  * *Naskah Saat Ini:* `"Jalan pagi santai di [lokasi], [hari, tanggal, dan jam]. Rutenya [kondisi rute] dengan perkiraan durasi [durasi]. [Biaya dan aturan bergabung]. Kamu boleh ikut tanpa harus bercerita."`
  * *Alasan Saat Ini:* Jelaskan rute, durasi, dan aturan keikutsertaan yang benar-benar berlaku. Jangan menjanjikan hilangnya kecemasan.

  > ✏️ **Kotak Revisi EX-C04-3:**
  >
  > - Naskah Baru: Minggu pagi kita jalan santai di [lokasi] mulai pukul [jam]. Rutenya sekitar [durasi/jarak] dengan tempo santai. Nggak ada sesi sharing khusus—datang, jalan bareng, dan ngobrol kalau memang pengin. [Biaya atau ketentuan yang berlaku].
  > - Alasan Baru: Membuat format kegiatan mudah dibayangkan dan menjelaskan bahwa keikutsertaan tidak bergantung pada kesediaan untuk membicarakan hal pribadi.
  >
* **EX-C04-4 (Kegiatan Bengkel / Karya Bersama):**

  * *Naskah Saat Ini:* `"Sabtu ini kami berkumpul di bengkel kerja untuk membongkar dan merapikan perkakas lama. Kalau kamu ingin menyibukkan tangan dengan pekerjaan fisik, silakan mampir."`
  * *Alasan Saat Ini:* Sebutkan kegiatan dan aturan partisipasi dengan jelas. Hanya janjikan sesi yang tersedia.

  > ✏️ **Kotak Revisi EX-C04-4:**
  >
  > - Naskah Baru: Sabtu ini kita kumpul di [lokasi] buat merapikan dan memperbaiki perkakas lama bareng-bareng. Mulai pukul [jam] dan selesai sekitar [jam]. Nggak perlu punya pengalaman khusus—kalau belum tahu caranya, kita kerjakan bareng.
  > - Alasan Baru: Menjelaskan kegiatan, waktu, dan kemampuan yang dibutuhkan supaya orang tidak harus menebak apakah mereka “cukup bisa” untuk ikut.
  >

---

#### C05: Promosi Sesi Dukungan Kelompok

* **Tugas Psikologis:** Buat kehadiran menjadi keputusan yang bebas risiko sosial, transparan, dan tidak mengikat.
* **Properti Bahasa:** Sampaikan rincian logistik (ruang, waktu, biaya, jumlah peserta, aturan kerahasiaan) sebagai konten utama, bukan catatan kaki.
* **Hal yang Dihindari:** Menjanjikan kesembuhan ajaib; menuntut konfirmasi publik; menciptakan urgensi palsu.

> ✏️ **Kotak Revisi Definisi Konteks C05:**
>
> * **Tugas Psikologis:** Membantu calon peserta memahami seperti apa sesi akan berlangsung sebelum memutuskan untuk hadir. Buat keputusan bergabung terasa terinformasi, rendah tekanan, dan tetap berada dalam kendali peserta.
> * **Properti Bahasa:** Jelaskan waktu, durasi, jumlah peserta, siapa yang memfasilitasi, apa yang dilakukan selama sesi, biaya jika ada, serta aturan dan batas kerahasiaan. Sebutkan dengan jelas apa yang tidak diwajibkan, termasuk bercerita, menjawab pertanyaan tertentu, atau bertahan sampai sesi selesai jika aturan program memang memperbolehkannya.
> * **Hal yang Dihindari:** Menyebut sesi sebagai terapi atau konseling jika bukan itu layanannya, menjanjikan kerahasiaan atau rasa aman secara mutlak, menyembunyikan aturan penting di catatan kecil, menciptakan urgensi palsu, atau membuat pembatalan kehadiran terasa seperti kegagalan peserta.

##### Contoh Naskah C05:

* **EX-C05-1 (Panduan Teknis Sesi Dukungan):**

  * *Naskah Saat Ini:* `"Sesi berlangsung pada [hari, tanggal, jam] di [lokasi], dengan [jumlah peserta] dan [kualifikasi pendamping yang terverifikasi]. [Kebijakan dokumentasi dan penggunaan nama]. Peserta [aturan berbicara yang berlaku]."`
  * *Alasan Saat Ini:* Sebutkan durasi, jumlah peserta, pendamping, dan kebijakan privasi yang telah dipastikan.

  > ✏️ **Kotak Revisi EX-C05-1:**
  >
  > - Naskah Baru: Ruang MENdukung berlangsung [hari, tanggal] pukul [jam] selama sekitar [durasi], bersama maksimal [jumlah] peserta. Sesi difasilitasi oleh [peran/kualifikasi yang sudah diverifikasi]. Kamu boleh bercerita atau cukup mendengarkan. Semua peserta menyepakati aturan kerahasiaan sebelum sesi dimulai, dan batas kerahasiaannya akan dijelaskan di awal.
  > - Alasan Baru: Memberi gambaran tentang bentuk sesi, siapa yang terlibat, dan bagaimana privasi dikelola sebelum peserta memutuskan untuk hadir, tanpa menjanjikan kerahasiaan secara mutlak.
  >
* **EX-C05-2 (Pemberitahuan Fleksibilitas Hadir):**

  * *Naskah Saat Ini:* `"Kalau kamu berhalangan hadir, cukup balas pesan ini dengan kata 'batal'. Tidak ada biaya denda dan kamu tidak perlu menjelaskan alasannya."`
  * *Alasan Saat Ini:* Jelaskan cara membatalkan kehadiran sesuai kebijakan.

  > ✏️ **Kotak Revisi EX-C05-2:**
  >
  > - Naskah Baru: Kalau ternyata kamu nggak bisa hadir, cukup balas pesan ini dengan “batal”. Kamu nggak perlu menjelaskan alasannya, dan [tidak ada biaya pembatalan / kebijakan pembatalan yang benar-benar berlaku].
  > - Alasan Baru: Menjelaskan cara membatalkan dengan sederhana dan tanpa meminta peserta membuka alasan pribadi yang tidak diperlukan.
  >
* **EX-C05-3 (Catatan Logistik Ruangan):**

  * *Naskah Saat Ini:* `"Sesi berlangsung di [ruang dan lantai]. Masuk melalui [akses yang tersedia]. [Penjelasan kondisi ruang dan batas privasi]. Sesi didampingi [pendamping dan kualifikasi yang sudah diverifikasi]."`
  * *Alasan Saat Ini:* Jelaskan akses ruangan dan batas privasi secara konkret. Ruangan tertutup tidak menjamin kerahasiaan sepenuhnya.

  > ✏️ **Kotak Revisi EX-C05-3:**
  >
  > - Naskah Baru: Sesi berlangsung di [nama ruang/lantai] dan dapat diakses melalui [akses yang tersedia]. Ruangan digunakan khusus untuk sesi selama [waktu], tetapi [batas privasi yang memang berlaku]. Tidak ada foto atau rekaman selama sesi [jika benar demikian].
  > - Alasan Baru: Menjelaskan kondisi ruang dan dokumentasi secara konkret agar peserta tidak perlu menebak seberapa privat sesi tersebut sebenarnya.
  >
* **EX-C05-4 (Hak untuk Menjeda atau Keluar):**

  * *Naskah Saat Ini:* `"Jika di tengah sesi kamu merasa lelah atau ingin keluar ruangan sejenak untuk mencari udara segar, silakan melangkah keluar tanpa perlu meminta izin."`
  * *Alasan Saat Ini:* Jelaskan pilihan untuk keluar atau beristirahat sesuai aturan sesi.

  > ✏️ **Kotak Revisi EX-C05-4:**
  >
  > - Naskah Baru: Kalau di tengah sesi kamu ingin berhenti bicara, melewati pertanyaan, atau keluar sebentar, bilang saja atau lakukan sesuai yang terasa nyaman. Kamu nggak perlu menjelaskan alasannya.
  > - Alasan Baru: Menunjukkan bahwa peserta tetap punya kendali atas keterlibatannya selama sesi, bukan hanya saat memutuskan untuk datang.
  >

---

#### C06: Ajakan Akses Layanan & Bantuan Nyata

* **Tugas Psikologis:** Tawarkan satu jalur bantuan nyata yang dapat diakses malam ini tanpa menuntut pembaca membuka diri terlebih dahulu.
* **Properti Bahasa:** Satu langkah konkret; kalimat persis yang diucapkan di loket fasilitas kesehatan; cantumkan kendala antrean dan biaya secara jujur.

> ✏️ **Kotak Revisi Definisi Konteks C06:**
>
> * **Tugas Psikologis:** Membantu pembaca mengubah kebutuhan akan bantuan menjadi langkah pertama yang konkret. Jelaskan siapa atau layanan apa yang bisa dihubungi, bagaimana memulainya, dan informasi penting yang perlu diketahui sebelum mengambil langkah tersebut.
> * **Properti Bahasa:** Berikan satu jalur yang jelas pada satu waktu. Jika relevan, sertakan contoh kalimat yang bisa digunakan untuk membuka percakapan, cara mengakses layanan, dokumen yang perlu dibawa, biaya, jadwal, atau kendala yang sudah diverifikasi.
> * **Hal yang Dihindari:** Ajakan samar seperti “segera cari bantuan”, daftar terlalu banyak pilihan tanpa arah, informasi layanan yang belum diperiksa, menjanjikan akses atau biaya tertentu tanpa dasar, serta menganggap bantuan dari teman dapat menggantikan layanan profesional ketika kebutuhannya berada di luar kapasitas teman.

##### Contoh Naskah C06:

* **EX-C06-1 (Panduan Menghubungi Layanan):**

  * *Naskah Saat Ini:* `"Untuk mencari layanan di wilayahmu, periksa [tautan resmi fasilitas]. Di sana tercantum [informasi yang memang tersedia]. Hubungi [kontak terverifikasi] untuk memastikan jadwal, biaya, dan cara mendaftar."`
  * *Alasan Saat Ini:* Jelaskan langkah mencari layanan tanpa menganggap tarif, jadwal, dan tenaga kesehatan sama di setiap fasilitas.

  > ✏️ **Kotak Revisi EX-C06-1:**
  >
  > - Naskah Baru: Kalau ingin mulai mencari bantuan profesional, kamu bisa menghubungi [nama fasilitas/kontak resmi] dan bertanya, “Saya ingin konsultasi soal kesehatan mental. Untuk pertama kali, saya perlu daftar ke mana dan menyiapkan apa?”
  > - Alasan Baru: Memberikan satu titik masuk dan contoh kalimat yang bisa langsung digunakan, tanpa menganggap pembaca sudah memahami sistem layanan.
  >
* **EX-C06-2 (Meminta Bantuan Praktis):**

  * *Naskah Saat Ini:* `"Kalau beban kerja minggu ini terasa berat, kamu bisa mengajak rekan yang kamu percaya membicarakan pembagian tugas. Pilih hal yang memang bisa dibantu bersama."`
  * *Alasan Saat Ini:* Berikan contoh meminta bantuan praktis tanpa menyatakan bahwa obrolan pasti cukup untuk mengatasi keluhan.

  > ✏️ **Kotak Revisi EX-C06-2:**
  >
  > - Naskah Baru: Kalau pekerjaan sudah mulai sulit kamu urutkan sendiri, coba hubungi satu rekan yang kamu percaya: “Gue lagi kewalahan lihat semuanya sekaligus. Bisa bantu gue tentuin mana yang perlu dikerjain dulu?”
  > - Alasan Baru: Mengubah kebutuhan bantuan menjadi permintaan yang spesifik dan realistis, tanpa mengharuskan pembaca menjelaskan seluruh kondisi pribadinya.
  >
* **EX-C06-3 (Alur Konsultasi di Fasilitas Kesehatan):**

  * *Naskah Saat Ini:* `"Untuk berkonsultasi di [nama fasilitas], ikuti [alur pendaftaran terverifikasi]. Siapkan [dokumen yang dipersyaratkan]. Pastikan jadwal dan biaya melalui [kontak resmi]."`
  * *Alasan Saat Ini:* Gunakan alur pendaftaran yang telah diperiksa untuk fasilitas tertentu. Jangan menggeneralisasi cakupan biaya.

  > ✏️ **Kotak Revisi EX-C06-3:**
  >
  > - Naskah Baru: Di [nama fasilitas], langkah pertama yang sudah kami verifikasi adalah [alur pertama]. Siapkan [dokumen yang memang dibutuhkan]. Untuk jadwal dan biaya terbaru, konfirmasi melalui [kontak resmi] sebelum datang.
  > - Alasan Baru: Menjelaskan langkah yang benar-benar berlaku di fasilitas tertentu dan memisahkan informasi yang sudah diketahui dari hal yang masih perlu dikonfirmasi.
  >
* **EX-C06-4 (Meminta Ditemani Mencari Bantuan):**

  * *Naskah Saat Ini:* `"Kamu bisa mulai dengan pesan singkat kepada teman yang kamu percaya: “Lagi ada waktu? Ada soal kerjaan yang ingin kutanyakan.”"`
  * *Alasan Saat Ini:* Beri contoh cara membuka percakapan. Pilih kata yang sesuai hubungan penutur dengan orang yang dihubungi.

  > ✏️ **Kotak Revisi EX-C06-4:**
  >
  > - Naskah Baru: Kalau pergi sendiri terasa berat, kamu bisa minta bantuan yang spesifik: “Besok gue mau ke puskesmas buat konsultasi. Bisa temenin gue ke sana?”
  > - Alasan Baru: Memberi cara sederhana untuk meminta dukungan tanpa mengharuskan orang menceritakan seluruh masalahnya terlebih dahulu.
  >

---

#### C07: Krisis & Keselamatan Segera

* **Tugas Psikologis:** Selamatkan nyawa segera; kurangi keraguan; berikan tindakan fisik malam ini yang terikat batasan tegas.
* **Properti Bahasa:** Kepastian maksimal; kalimat perintah lugas tanpa kiasan puitis; nomor darurat resmi; pengakuan batasan kompetensi akun.

> ✏️ **Kotak Revisi Definisi Konteks C07:**
>
> * **Tugas Psikologis:** Mengutamakan keselamatan ketika ada risiko seseorang menyakiti diri atau mengakhiri hidup. Kurangi keputusan yang harus dibuat sendiri dan arahkan pada pendampingan serta bantuan langsung secepat mungkin.
> * **Properti Bahasa:** Gunakan kalimat singkat, langsung, dan tegas. Sebut risiko secara eksplisit tanpa kiasan. Berikan satu urutan tindakan yang jelas: jangan sendirian, kurangi akses ke benda atau situasi yang dapat digunakan untuk menyakiti diri, lalu hubungi atau datangi bantuan yang sudah diverifikasi. Jelaskan dengan terbuka bahwa Menungsa bukan layanan krisis.
> * **Hal yang Dihindari:** Bahasa puitis atau ambigu, daftar panjang teknik menenangkan diri sebelum mencari bantuan, meminta orang menjelaskan seluruh ceritanya terlebih dahulu, menjanjikan bahwa keadaan pasti segera membaik, serta mencantumkan nomor atau layanan krisis yang belum diverifikasi.
>
> **Pemisahan data layanan:** Simpan nama layanan, nomor atau kontak, dan jam operasional pada sumber yang dapat diperbarui. Masukkan ke naskah hanya setelah statusnya diverifikasi.

##### Contoh Naskah C07:

* **EX-C07-1 (Respons Krisis kepada Orang yang Sedang Berisiko):**

  * *Naskah Saat Ini:* `"Jika kamu merasa akan menyakiti diri sekarang, minta orang yang kamu percaya untuk menemanimu dan cari bantuan darurat atau datang ke IGD terdekat. Untuk dukungan psikologis, informasi akses Healing119.id tersedia di situs resminya."`
  * *Alasan Saat Ini:* Sebutkan situasi secara langsung dan arahkan pada bantuan. Periksa nomor serta ketersediaan layanan sebelum digunakan.

  > ✏️ **Kotak Revisi EX-C07-1:**
  >
  > - Naskah Baru: Kalau kamu merasa akan menyakiti diri atau mengakhiri hidup sekarang, jangan hadapi ini sendirian. Hubungi satu orang yang kamu percaya dan minta ia tetap bersamamu. Setelah itu, cari bantuan darurat atau pergi ke IGD terdekat dengan didampingi. Menungsa bukan layanan krisis dan tidak dapat memberikan respons darurat.
  > - Alasan Baru: Menyebut risiko secara langsung, memberi urutan tindakan yang jelas, dan menjelaskan batas Menungsa tanpa membuat orang harus menceritakan situasinya terlebih dahulu.
  >
* **EX-C07-2 (Respons Singkat Saat Dorongan Menyakiti Diri Mendesak):**

  * *Naskah Saat Ini:* `"Jika dorongan untuk menyakiti diri terasa mendesak, minta orang yang kamu percaya untuk tetap bersamamu. Cari bantuan darurat atau minta ia menemanimu ke IGD terdekat."`
  * *Alasan Saat Ini:* Utamakan pendampingan dan akses bantuan segera, tanpa menyalahkan orang yang sedang kesulitan.

  > ✏️ **Kotak Revisi EX-C07-2:**
  >
  > - Naskah Baru: Kalau dorongan untuk menyakiti diri terasa sulit kamu kendalikan sekarang, minta seseorang datang atau tetap bersamamu. Jangan tinggal sendirian. Minta ia membantu kamu mencari bantuan darurat atau menemanimu ke IGD terdekat.
  > - Alasan Baru: Mengurangi keputusan yang perlu dibuat sendiri dan memprioritaskan kehadiran orang lain serta akses bantuan segera.
  >
* **EX-C07-3 (Langkah Keselamatan Segera):**

  * *Naskah Saat Ini:* `"Jika kamu berisiko menyakiti diri sekarang, minta orang yang kamu percaya untuk menemanimu dan membantu menjauhkan benda berbahaya. Cari bantuan darurat atau minta didampingi ke IGD terdekat."`
  * *Alasan Saat Ini:* Berikan langkah keselamatan yang jelas. Jangan menjadikan teknik menenangkan diri sebagai prasyarat menghubungi bantuan.

  > ✏️ **Kotak Revisi EX-C07-3:**
  >
  > - Naskah Baru: Kalau kamu berisiko menyakiti diri sekarang, pindah ke tempat bersama orang lain dan minta seseorang tetap bersamamu. Jika ada benda atau sesuatu di sekitar yang bisa kamu gunakan untuk menyakiti diri, minta orang tersebut membantu menjauhkannya. Setelah itu, cari bantuan darurat atau pergi ke IGD terdekat.
  > - Alasan Baru: Memusatkan respons pada keselamatan lingkungan dan akses bantuan, tanpa menjadikan latihan napas, distraksi, atau teknik menenangkan diri sebagai syarat sebelum mendapatkan pertolongan.
  >
* **EX-C07-4 (Panduan untuk Teman atau Pendamping):**

  * *Naskah Saat Ini:* `"Jika temanmu mengatakan ingin mengakhiri hidup, dengarkan tanpa menghakimi. Jika ada bahaya segera, tetaplah bersamanya dan hubungi bantuan darurat atau tenaga kesehatan."`
  * *Alasan Saat Ini:* Arahkan pendamping untuk tetap bersama orang yang berisiko dan mencari bantuan segera. Jangan menjanjikan hasil tertentu.

  > ✏️ **Kotak Revisi EX-C07-4:**
  >
  > - Naskah Baru: Kalau temanmu bilang ia ingin menyakiti diri atau mengakhiri hidup, tanggapi dengan serius. Jika ada risiko segera, tetap bersamanya jika aman bagi kamu, bantu menjauhkan benda yang dapat digunakan untuk menyakiti diri, lalu hubungi bantuan darurat atau dampingi ia ke IGD terdekat.
  > - Alasan Baru: Memberi pendamping langkah yang dapat dilakukan tanpa menempatkannya sebagai orang yang harus menyelesaikan krisis sendirian.
  >

---

#### C08: Keyakinan Umum & Reframing Budaya

* **Tugas Psikologis:** Pisahkan fakta dan mitos tanpa merendahkan tradisi atau mencemooh keyakinan yang dipegang pembaca.

> ✏️ **Kotak Revisi Definisi Konteks C08:**
>
> * **Tugas Psikologis:** Membantu pembaca memeriksa kembali keyakinan atau kebiasaan yang sudah terasa wajar tanpa merendahkan nilai, keluarga, komunitas, atau budaya tempat keyakinan itu tumbuh.
> * **Properti Bahasa:** Akui terlebih dahulu alasan sebuah keyakinan bisa terasa masuk akal atau penting. Setelah itu, tambahkan sudut pandang lain yang memperluas pilihan pembaca. Jika yang dibahas adalah klaim faktual, bedakan dengan jelas apa yang didukung bukti dan apa yang tidak.
> * **Hal yang Dihindari:** Menyebut suatu nilai atau tradisi “salah”, “toxic”, atau “ketinggalan zaman” tanpa konteks; membuat budaya menjadi kambing hitam; memperlakukan semua laki-laki atau keluarga Indonesia sebagai satu kelompok yang sama; serta mengganti satu tuntutan lama dengan tuntutan baru.
>
> **Rumus editorial:** Akui → perluas → beri pilihan. Bukan: bantah → koreksi → suruh berubah.

##### Contoh Naskah C08:

* **EX-C08-1 (Kartu Penjelasan Keyakinan Kerja):**

  * *Naskah Saat Ini:* `"Menahan keluhan sering dianggap bagian dari pekerjaan. Padahal, beban kerja juga perlu dibicarakan agar pembagian tugas dan waktu istirahat bisa ditinjau."`
  * *Alasan Saat Ini:* Akui tekanan di tempat kerja tanpa menambahkan penjelasan biologis yang belum diverifikasi.

  > ✏️ **Kotak Revisi EX-C08-1:**
  >
  > - Naskah Baru: Di beberapa lingkungan kerja, tetap diam dan menyelesaikan beban sendiri bisa dianggap bagian dari profesionalitas. Tapi membicarakan beban kerja juga bisa menjadi cara untuk memperjelas prioritas, pembagian tugas, atau kapasitas yang tersedia.
  > - Alasan Baru: Mengakui mengapa sikap tersebut bisa dianggap bernilai sebelum menawarkan cara lain untuk merespons beban kerja, tanpa menyalahkan pekerja maupun lingkungan kerjanya secara menyeluruh.
  >
* **EX-C08-2 (Meninjau Kembali Makna Kemandirian):**

  * *Naskah Saat Ini:* `"Menyelesaikan masalah sendiri bisa terasa penting. Membicarakan rencana dengan orang yang kamu percaya juga bisa menjadi cara untuk melihat pilihan yang belum terpikirkan."`
  * *Alasan Saat Ini:* Tawarkan percakapan sebagai salah satu cara memeriksa pilihan, tanpa menilai kemandirian pembaca.

  > ✏️ **Kotak Revisi EX-C08-2:**
  >
  > - Naskah Baru: Menyelesaikan masalah sendiri bisa menjadi bagian dari kemandirian. Di situasi lain, meminta pandangan orang yang kamu percaya juga bisa membantu melihat pilihan yang sebelumnya belum terpikirkan.
  > - Alasan Baru: Tidak mempertentangkan kemandirian dengan meminta bantuan. Keduanya ditempatkan sebagai pilihan yang bisa berguna dalam situasi yang berbeda.
  >
* **EX-C08-3 (Tidak Ingin Merepotkan Keluarga):**

  * *Naskah Saat Ini:* `"Kamu mungkin tidak ingin merepotkan keluarga. Jika ada yang bisa dibantu, kamu boleh menyampaikan kebutuhanmu dan membicarakan pilihan bersama."`
  * *Alasan Saat Ini:* Akui niat tidak merepotkan keluarga, lalu berikan pilihan meminta bantuan. Tidak perlu menyamakan manusia dengan mesin.

  > ✏️ **Kotak Revisi EX-C08-3:**
  >
  > - Naskah Baru: Nggak ingin menambah beban keluarga bisa jadi salah satu alasan seseorang memilih mengurus masalahnya sendiri. Tapi kalau ada bagian yang memang bisa dibantu, meminta bantuan yang spesifik juga bisa menjadi pilihan.
  > - Alasan Baru: Mengakui pertimbangan di balik keinginan untuk tidak merepotkan orang lain, lalu memperluas pilihan tanpa mengatakan bahwa pembaca seharusnya lebih terbuka atau lebih bergantung pada keluarga.
  >
* **EX-C08-4 (Ketidakpastian & Nilai Diri):**

  * *Naskah Saat Ini:* `"Tidak semua masalah punya jawaban yang langsung jelas. Menghadapi ketidakpastian tidak membuatmu kurang berharga."`
  * *Alasan Saat Ini:* Pisahkan kesulitan menghadapi situasi dari penilaian harga diri. Hindari klaim yang mencakup semua orang.

  > ✏️ **Kotak Revisi EX-C08-4:**
  >
  > - Naskah Baru: Kita sering menghargai orang yang terlihat tahu harus berbuat apa. Tapi ada situasi yang memang belum punya jawaban yang jelas. Belum tahu langkah berikutnya tidak otomatis berarti kamu gagal menghadapinya.
  > - Alasan Baru: Mengakui nilai yang diberikan pada ketegasan dan kemampuan menyelesaikan masalah, lalu memisahkannya dari penilaian terhadap harga diri seseorang ketika jawaban belum tersedia.
  >

---

#### C09: Beban Kerja & Kondisi Sistemik

* **Tugas Psikologis:** Arahkan perhatian pada realitas ekonomi, biaya hidup, dan kebijakan kerja; hindari menuduh individu malas.

> ✏️ **Kotak Revisi Definisi Konteks C09:**
>
> * **Tugas Psikologis:** Membantu pembaca melihat bahwa kesulitan tidak selalu berasal dari kemampuan, disiplin, atau pilihan pribadi. Perhatikan juga kondisi kerja, ekonomi, tanggung jawab keluarga, akses layanan, dan aturan yang membentuk pilihan seseorang.
> * **Properti Bahasa:** Hubungkan pengalaman individu dengan kondisi yang lebih luas secara konkret. Sebut faktor yang memang relevan tanpa menganggapnya sebagai satu-satunya penyebab. Jika ada data atau kebijakan yang dibahas, bedakan fakta yang diketahui dari interpretasinya.
> * **Hal yang Dihindari:** Menjelaskan masalah sebagai kegagalan pribadi semata, menyalahkan pekerja karena tidak “pandai mengatur batas”, menggunakan istilah sistemik yang abstrak tanpa menunjukkan mekanismenya, atau menganggap satu struktur menjelaskan semua pengalaman.
>
> **Rumus editorial:** Lihat orangnya → lihat kondisinya → hubungkan keduanya.

##### Contoh Naskah C09:

* **EX-C09-1 (Artikel Analisis Realitas Hidup):**

  * *Naskah Saat Ini:* `"Saat biaya hidup naik, memenuhi kebutuhan keluarga bisa terasa semakin berat. Membicarakan pengeluaran bersama pun belum tentu mudah."`
  * *Alasan Saat Ini:* Jelaskan hubungan antara biaya hidup dan tanggung jawab keluarga tanpa menetapkan satu penyebab semua kesulitan.

  > ✏️ **Kotak Revisi EX-C09-1:**
  >
  > - Naskah Baru: Ketika harga kebutuhan naik sementara penghasilan tidak bergerak secepat itu, ruang untuk menabung, beristirahat, atau menghadapi pengeluaran mendadak bisa ikut menyempit. Bagi sebagian keluarga, keputusan soal uang akhirnya bukan sekadar soal “lebih hemat”, tapi soal kebutuhan mana yang harus didahulukan.
  > - Alasan Baru: Menghubungkan tekanan ekonomi dengan pilihan sehari-hari tanpa menyimpulkan bahwa biaya hidup menjelaskan seluruh kesulitan yang dialami seseorang.
  >
* **EX-C09-2 (Ulasan Budaya Kerja & Tekanan):**

  * *Naskah Saat Ini:* `"Ketika lembur tanpa kompensasi dianggap biasa, kelelahan pekerja mudah dianggap sebagai bukti dedikasi. Kebijakan kerjanya juga perlu ditinjau."`
  * *Alasan Saat Ini:* Arahkan pembahasan pada kebijakan kerja; jangan menyalahkan pekerja karena kesulitan menetapkan batas.

  > ✏️ **Kotak Revisi EX-C09-2:**
  >
  > - Naskah Baru: Kalau lembur tanpa kompensasi terus dianggap bagian biasa dari pekerjaan, pekerja tidak hanya perlu “belajar bilang tidak”. Aturan tentang jam kerja, beban tugas, dan ekspektasi respons dari tempat kerja juga ikut menentukan seberapa realistis batas itu bisa dibuat.
  > - Alasan Baru: Memperlihatkan bahwa kemampuan menetapkan batas tidak berdiri sendiri, tetapi dipengaruhi oleh aturan dan konsekuensi di tempat kerja.
  >
* **EX-C09-3 (Tanggung Jawab Antar-Generasi):**

  * *Naskah Saat Ini:* `"Membiayai orang tua sekaligus anak bisa terasa berat, terutama saat penghasilan terbatas dan dukungan sosial sulit diakses. Persoalan ini tidak cukup dijelaskan sebagai kurang disiplin mengatur uang."`
  * *Alasan Saat Ini:* Bahas beban membiayai dua generasi tanpa mereduksinya menjadi kegagalan pribadi atau satu penyebab tunggal.

  > ✏️ **Kotak Revisi EX-C09-3:**
  >
  > - Naskah Baru: Seseorang bisa membayar kebutuhan orang tua, biaya anak, cicilan, dan kebutuhan rumah tangga dari penghasilan yang sama. Dalam situasi seperti ini, membuat anggaran tetap penting, tetapi tidak semua tekanan finansial bisa diselesaikan hanya dengan menjadi lebih disiplin mengatur uang.
  > - Alasan Baru: Mengakui peran keputusan pribadi tanpa mengabaikan besarnya tanggung jawab dan keterbatasan sumber daya yang dihadapi.
  >
* **EX-C09-4 (Batas Waktu Pesan Kantor):**

  * *Naskah Saat Ini:* `"Pesan kantor yang terus datang hingga malam dapat menyita waktu istirahat. Tempat kerja perlu menjelaskan kapan pekerja diharapkan merespons dan kapan mereka dapat beristirahat."`
  * *Alasan Saat Ini:* Jelaskan kebutuhan batas komunikasi kerja tanpa menjadikan produktivitas satu-satunya alasan beristirahat.

  > ✏️ **Kotak Revisi EX-C09-4:**
  >
  > - Naskah Baru: Pesan kerja yang terus masuk sampai malam membuat batas antara waktu kerja dan waktu pribadi semakin sulit dibaca. Karena itu, aturan tentang kapan pekerja perlu merespons sebaiknya tidak hanya bergantung pada keberanian masing-masing orang untuk mengabaikan pesan.
  > - Alasan Baru: Memindahkan sebagian tanggung jawab dari kemampuan individu menetapkan batas ke aturan komunikasi yang juga dibentuk oleh tempat kerja.
  >

---

#### C10: Advokasi Kebijakan Berbasis Bukti

* **Tugas Psikologis:** Ajukan usulan kebijakan yang logis dan didukung angka rujukan resmi; jangan membuat angka perkiraan tanpa sumber.

> ✏️ **Kotak Revisi Definisi Konteks C10:**
>
> * **Tujuan Komunikasi:** Membantu pembaca memahami mengapa suatu perubahan kebijakan diperlukan dan apa yang secara konkret diusulkan, tanpa menggunakan angka sebagai hiasan atau membuat kepastian yang tidak didukung bukti.
> * **Properti Bahasa:** Sebutkan sumber, tahun, wilayah, populasi, dan satuan yang diperlukan untuk memahami data. Bedakan temuan dari interpretasi Menungsa, lalu hubungkan keduanya dengan usulan yang spesifik dan realistis. Jika data memiliki keterbatasan, jelaskan bagian yang relevan bagi kesimpulan.
> * **Hal yang Dihindari:** Angka tanpa sumber atau konteks, membandingkan data yang tidak setara, mengubah hubungan menjadi sebab-akibat tanpa dasar, menggeneralisasi temuan di luar cakupannya, memilih statistik hanya karena mendukung posisi yang diinginkan, atau mengajukan tuntutan yang tidak jelas hubungannya dengan bukti.
>
> **Rumus editorial:** Tunjukkan bukti → jelaskan artinya → nyatakan batasnya → ajukan perubahan. Angka bukan argumen dengan sendirinya.

##### Contoh Naskah C10:

* **EX-C10-1 (Pernyataan Advokasi Bersama):**

  * *Naskah Saat Ini:* `"Kami ingin memperluas akses dukungan kesehatan mental. Pada [periode], Menungsa [tindakan yang sudah dilakukan], dengan [cakupan yang sudah diverifikasi]."`
  * *Alasan Saat Ini:* Hubungkan sikap dengan tindakan organisasi yang dapat diverifikasi. Angka contoh tidak boleh menjadi klaim tentang Menungsa.

  > ✏️ **Kotak Revisi EX-C10-1:**
  >
  > - Naskah Baru: Menurut [sumber, tahun], [temuan utama yang relevan] di [wilayah/populasi]. Karena itu, kami mendorong [institusi yang dituju] untuk [perubahan konkret]. Menungsa akan mendukung langkah ini melalui [tindakan organisasi yang memang sudah diputuskan atau dilakukan].
  > - Alasan Baru: Menghubungkan masalah yang didukung bukti dengan perubahan yang diminta, lalu menjelaskan peran Menungsa sendiri tanpa mengklaim dampak yang belum terbukti.
  >
* **EX-C10-2 (Pernyataan Sikap Berbasis Anggaran):**

  * *Naskah Saat Ini:* `"Menurut [sumber resmi, tahun], anggaran kesehatan jiwa di [wilayah] sebesar [angka dan satuan]. Berdasarkan data tersebut, kami mengusulkan [tindakan konkret]."`
  * *Alasan Saat Ini:* Dasarkan usulan pada data dengan wilayah, tahun, dan sumber yang jelas. Gunakan placeholder sampai data tersedia.

  > ✏️ **Kotak Revisi EX-C10-2:**
  >
  > - Naskah Baru: Pada [tahun], [sumber resmi] mencatat anggaran [program/layanan] di [wilayah] sebesar [angka dan satuan], untuk [cakupan yang dapat dipastikan dari sumber]. Data ini menunjukkan [interpretasi terbatas yang memang didukung]. Kami mengusulkan [perubahan konkret] agar [tujuan yang relevan].
  > - Alasan Baru: Memberikan tahun, wilayah, satuan, dan cakupan sebelum menafsirkan angka, sehingga pembaca dapat membedakan datanya dari posisi kebijakan yang diambil Menungsa.
  >
* **EX-C10-3 (Ketersediaan Tenaga Profesional):**

  * *Naskah Saat Ini:* `"Menurut [sumber resmi, tahun], tersedia [angka dan satuan] psikolog klinis di [wilayah]. Kami mengusulkan [langkah konkret yang relevan dengan data]."`
  * *Alasan Saat Ini:* Periksa angka, profesi, wilayah, dan periode sebelum mengatasnamakan data Kemenkes.

  > ✏️ **Kotak Revisi EX-C10-3:**
  >
  > - Naskah Baru: Menurut [sumber, tahun], terdapat [angka] [jenis tenaga profesional] yang tercatat untuk melayani [populasi/wilayah yang sesuai dengan sumber]. Angka ini setara dengan sekitar [rasio, hanya jika dapat dihitung dengan data yang kompatibel]. Berdasarkan temuan tersebut, kami mengusulkan [langkah konkret yang relevan].
  > - Alasan Baru: Menjelaskan siapa yang dihitung dan wilayah yang dicakup sebelum menggunakan jumlah tenaga sebagai dasar advokasi. Jika memakai rasio, pembilang dan penyebut harus berasal dari periode dan populasi yang dapat dibandingkan.
  >
* **EX-C10-4 (Hasil Pemantauan atau Data Menungsa):**

  * *Naskah Saat Ini:* `"Dalam [pemantauan dan periode yang terdokumentasi], [hasil dengan satuan dan cakupan]. Berdasarkan temuan itu, kami mengusulkan [perbaikan yang spesifik]."`
  * *Alasan Saat Ini:* Jelaskan metode, cakupan, dan sumber pemantauan sebelum menyatakan angka sebagai hasil temuan.

  > ✏️ **Kotak Revisi EX-C10-4:**
  >
  > - Naskah Baru: Dalam [jenis pemantauan] yang dilakukan pada [periode], kami mencatat [temuan] dari [jumlah/cakupan observasi]. Temuan ini menggambarkan [batas cakupan yang tepat] dan tidak dimaksudkan mewakili seluruh [populasi yang lebih luas, jika memang tidak representatif]. Berdasarkan temuan tersebut, kami mengusulkan [perbaikan spesifik].
  > - Alasan Baru: Menjelaskan bagaimana data diperoleh dan seberapa jauh kesimpulan dapat ditarik sebelum menggunakannya sebagai dasar usulan.
  >

---

#### C11: Humor Situasional & Di Balik Layar

* **Tugas Psikologis:** Gunakan humor ringan untuk mencairkan ketegangan; arahkan candaan pada tim sendiri, bukan penderitaan orang lain.

> ✏️ **Kotak Revisi Definisi Konteks C11:**
>
> * **Tugas Psikologis:** Membuat komunikasi terasa lebih ringan dan manusiawi melalui situasi yang dekat dengan keseharian, tanpa menjadikan kesulitan, kerentanan, atau identitas seseorang sebagai bahan candaan.
> * **Properti Bahasa:** Bangun humor dari kejadian kecil, kontras antara rencana dan kenyataan, kebiasaan tim, atau absurditas sehari-hari. Jika menggunakan diri sendiri atau tim sebagai bahan humor, tetap hindari merendahkan kemampuan atau martabat orang yang terlibat.
> * **Hal yang Dihindari:** Menertawakan gejala, trauma, kondisi kesehatan mental, kesulitan ekonomi, atau pengalaman personal audiens; menggunakan stereotip laki-laki sebagai punchline; membuat humor dari situasi krisis; serta memakai candaan untuk menutupi informasi penting.
>
> **Prinsip editorial:** Humor boleh membuat situasi terasa lebih ringan, tetapi jangan membuat pengalaman seseorang terasa lebih kecil.

##### Contoh Naskah C11:

* **EX-C11-1 (Catatan Santai Tim Redaksi):**

  * *Naskah Saat Ini:* `"Tadi pagi kami membahas rencana konten tentang istirahat. Obrolannya malah berlanjut ke video ulasan sepeda motor yang kami tonton semalam."`
  * *Alasan Saat Ini:* Humor diarahkan pada pengalaman tim, bukan kesulitan audiens.

  > ✏️ **Kotak Revisi EX-C11-1:**
  >
  > - Naskah Baru: Rapat pagi tadi agendanya menyusun konten tentang istirahat. Lima belas menit kemudian, kami malah debat soal siapa yang paling sering bilang “habis ini istirahat” lalu buka satu tab lagi.
  > - Alasan Baru: Humor muncul dari kebiasaan tim sendiri dan kontradiksi kecil yang mudah dikenali, tanpa menjadikan kelelahan audiens sebagai bahan candaan.
  >
* **EX-C11-2 (Anekdot Kejadian Sehari-hari):**

  * *Naskah Saat Ini:* `"Rencana bangun pagi buat lari santai sering kali kalah sama hangatnya tarikan selimut di jam enam kurang seperempat."`
  * *Alasan Saat Ini:* Gunakan pengamatan ringan tanpa memberi penilaian bahwa orang sakit tetap harus bekerja.

  > ✏️ **Kotak Revisi EX-C11-2:**
  >
  > - Naskah Baru: Alarm sudah dipasang jam 05.45 buat lari pagi. Jam 05.46 dimatikan dengan keyakinan penuh bahwa “lima menit lagi” adalah keputusan yang sangat rasional.
  > - Alasan Baru: Mengambil humor dari jarak antara rencana dan perilaku sehari-hari tanpa mengubahnya menjadi penilaian tentang disiplin atau kemauan seseorang.
  >
* **EX-C11-3 (Obrolan di Balik Layar Tim):**

  * *Naskah Saat Ini:* `"Tadi siang kami berniat menyusun satu panduan singkat. Empat puluh menit kemudian, kami masih membahas kopi sachet favorit masing-masing."`
  * *Alasan Saat Ini:* Gunakan detail keseharian tanpa menyiratkan ada produk kopi yang terbukti aman untuk kondisi tertentu.

  > ✏️ **Kotak Revisi EX-C11-3:**
  >
  > - Naskah Baru: Kami mulai rapat dengan target menyelesaikan satu panduan dalam setengah jam. Dua puluh menit pertama habis untuk menentukan apakah kopi sachet tertentu masih bisa disebut kopi.
  > - Alasan Baru: Memperlihatkan sisi informal tim melalui kejadian kecil yang tidak mengorbankan topik sensitif atau pengalaman audiens sebagai punchline.
  >
* **EX-C11-4 (Target yang Meleset):**

  * *Naskah Saat Ini:* `"Sudah beli sepatu olahraga baru, tapi selama dua minggu cuma dipakai buat jalan ke warung madura beli telur."`
  * *Alasan Saat Ini:* Humor muncul dari selisih rencana dan kejadian. Hindari menyalahkan orang karena belum konsisten.

  > ✏️ **Kotak Revisi EX-C11-4:**
  >
  > - Naskah Baru: Sepatu olahraga sudah dibeli. Playlist gym sudah dibuat. Dua minggu kemudian, pencapaian terbesarnya masih perjalanan ke warung beli telur.
  > - Alasan Baru: Humor datang dari selisih antara persiapan dan kenyataan, tanpa menjadikan konsistensi sebagai ukuran nilai diri atau mempermalukan orang yang belum menjalankan rencananya.
  >

---

#### C12: Proses Bertahap & Progres yang Tidak Linear

* **Tugas Psikologis:** Tampilkan proses pemulihan apa adanya; jangan menjanjikan kesembuhan instan atau akhir cerita yang muluk-muluk.

> ✏️ **Kotak Revisi Definisi Konteks C12:**
>
> * **Tugas Psikologis:** Menggambarkan perubahan sebagai proses yang bisa berjalan pelan, mundur, berhenti, atau berubah arah. Akui perkembangan yang terjadi tanpa menjadikannya bukti bahwa semua masalah sudah selesai.
> * **Properti Bahasa:** Tunjukkan perubahan melalui hal yang konkret dan dapat diamati dari waktu ke waktu. Beri ruang untuk kemajuan dan kesulitan muncul bersamaan. Jika menyebut terapi, kebiasaan, atau bentuk dukungan tertentu, jangan menganggap hasilnya akan sama bagi semua orang.
> * **Hal yang Dihindari:** Narasi “sebelum vs sesudah” yang terlalu rapi, klaim bahwa satu kebiasaan mengubah hidup, menjadikan produktivitas sebagai ukuran pemulihan, menggambarkan kemunduran sebagai kegagalan, atau menjanjikan titik akhir seperti “akhirnya sembuh sepenuhnya” tanpa dasar.
>
> **Rumus editorial:** Perubahan → masih ada kesulitan → proses berlanjut. Tunjukkan apa yang berubah tanpa berpura-pura semuanya sudah selesai.

##### Contoh Naskah C12:

* **EX-C12-1 (Cerita Proses Konseling):**

  * *Naskah Saat Ini:* `"Setelah enam bulan konseling, masalah Dimas belum semuanya selesai. Ia mulai mengenali kapan perlu meminta bantuan, meski masih ada hari-hari yang berat."`
  * *Alasan Saat Ini:* Tampilkan proses yang belum selesai.

  > ✏️ **Kotak Revisi EX-C12-1:**
  >
  > - Naskah Baru: Enam bulan setelah mulai konseling, masalah Dimas belum semuanya selesai. Sekarang ia lebih cepat mengenali saat beban mulai menumpuk dan beberapa kali bisa meminta bantuan sebelum semuanya terasa terlalu berat. Masih ada minggu ketika itu sulit dilakukan.
  > - Alasan Baru: Menunjukkan perubahan yang spesifik tanpa menjadikan konseling sebagai jalan menuju hasil yang cepat, linear, atau sama bagi semua orang.
  >
* **EX-C12-2 (Kebiasaan Kecil dalam Proses yang Lebih Panjang):**

  * *Naskah Saat Ini:* `"Merapikan tempat tidur sebelum mandi pagi. Bukan untuk mengubah nasib hidup seketika, tapi memastikan ada satu hal beres sebelum memulai hari."`
  * *Alasan Saat Ini:* Tampilkan satu kegiatan dalam cerita, tanpa mengklaimnya sebagai intervensi yang terbukti untuk semua orang.

  > ✏️ **Kotak Revisi EX-C12-2:**
  >
  > - Naskah Baru: Belakangan, Raka mulai merapikan tempat tidur sebelum mandi pagi. Nggak selalu dilakukan, dan itu tentu nggak menyelesaikan semua yang sedang ia hadapi. Buat sekarang, itu salah satu cara kecil untuk memulai pagi dengan sesuatu yang terasa selesai.
  > - Alasan Baru: Menempatkan kebiasaan kecil sebagai bagian dari proses, bukan sebagai intervensi ajaib atau ukuran apakah seseorang sedang “membaik”.
  >
* **EX-C12-3 (Kemajuan yang Tidak Linear):**

  * *Naskah Saat Ini:* `"Minggu ini Reza sempat merapikan kasur dan mandi pagi tiga hari berturut-turut. Masih ada hari yang terasa berat. Dalam cerita ini, kemajuannya tidak berarti semua masalah sudah selesai."`
  * *Alasan Saat Ini:* Akui kemajuan kecil tanpa menjadikannya standar pemulihan atau ukuran harga diri.

  > ✏️ **Kotak Revisi EX-C12-3:**
  >
  > - Naskah Baru: Minggu lalu, Reza bisa bangun dan mandi pagi hampir setiap hari. Minggu ini, dua hari ia kembali lebih banyak berada di tempat tidur. Perubahan yang sempat terjadi tidak otomatis hilang hanya karena minggu berikutnya terasa lebih berat.
  > - Alasan Baru: Menunjukkan kemajuan dan kemunduran dalam cerita yang sama tanpa memperlakukan hari yang lebih sulit sebagai bukti bahwa seluruh proses gagal.
  >
* **EX-C12-4 (Perubahan Rutinitas Malam):**

  * *Naskah Saat Ini:* `"Bayu mulai mengisi daya ponsel di ruang tengah. Dengan begitu, ponselnya tidak selalu ada di samping bantal saat ia hendak tidur."`
  * *Alasan Saat Ini:* Gambarkan perubahan kebiasaan tanpa mengarang pengukuran atau hasil klinis.

  > ✏️ **Kotak Revisi EX-C12-4:**
  >
  > - Naskah Baru: Bayu mulai mengisi daya ponselnya di ruang tengah sebelum tidur. Beberapa malam ia masih mengambilnya lagi dan membawa ponsel ke kamar. Tapi kebiasaan baru itu sekarang lebih sering berhasil ia pertahankan dibanding beberapa minggu sebelumnya.
  > - Alasan Baru: Menunjukkan perubahan melalui pola yang berlangsung dari waktu ke waktu, termasuk saat kebiasaan lama masih muncul, tanpa mengarang manfaat klinis dari perubahan tersebut.
  >

---

#### C13: Duka, Kegagalan & Kehilangan

* **Tugas Psikologis:** Sediakan ruang aman untuk berduka tanpa memaksakan hikmah atau buru-buru menyuruh pembaca bangkit.

> ✏️ **Kotak Revisi Definisi Konteks C13:**
>
> * **Tugas Psikologis:** Memberi ruang bagi kehilangan, kecewa, marah, rindu, atau ketidakpastian untuk hadir tanpa buru-buru mengubahnya menjadi pelajaran, optimisme, atau tuntutan untuk bangkit.
> * **Properti Bahasa:** Akui apa yang hilang atau berubah secara konkret. Biarkan respons emosional berbeda antarorang dan dari waktu ke waktu. Jika menawarkan dukungan, tawarkan kehadiran atau bantuan yang benar-benar bisa diberikan tanpa menentukan bagaimana seseorang seharusnya berduka.
> * **Hal yang Dihindari:** Memaksakan hikmah, mengatakan semuanya terjadi karena suatu alasan, menetapkan tenggat untuk “move on”, membandingkan siapa yang penderitaannya lebih berat, menuntut seseorang segera kembali produktif, atau menganggap satu jenis respons sebagai cara berduka yang paling sehat.
>
> **Rumus editorial:** Akui kehilangan → jangan buru-buru menutupnya → beri ruang untuk respons yang berbeda.

##### Contoh Naskah C13:

* **EX-C13-1 (Refleksi Kehilangan Usaha & Kegagalan):**

  * *Naskah Saat Ini:* `"Kehilangan tempat usaha yang dirintis lima tahun bukan hal yang bisa diselesaikan dengan kata 'pasti ada hikmahnya'. Kecewa dan marah adalah reaksi yang wajar."`
  * *Alasan Saat Ini:* Beri ruang untuk kecewa tanpa mewajibkan optimisme atau hikmah.

  > ✏️ **Kotak Revisi EX-C13-1:**
  >
  > - Naskah Baru: Lima tahun membangun usaha tidak hilang begitu saja ketika tokonya tutup. Ada penghasilan, rutinitas, rencana, dan bagian dari hidup yang ikut berubah. Nggak semua itu perlu segera diberi hikmah supaya terasa sah untuk disesali.
  > - Alasan Baru: Mengakui beberapa hal yang benar-benar ikut hilang tanpa memaksa pengalaman tersebut menjadi pelajaran atau tanda bahwa seseorang harus segera melihat sisi positifnya.
  >
* **EX-C13-2 (Pesan Belasungkawa & Penemanan):**

  * *Naskah Saat Ini:* `"Aku ikut berduka. Kalau kamu ingin ditemani, aku bisa duduk di sini. Kita tidak harus banyak bicara."`
  * *Alasan Saat Ini:* Tawarkan kehadiran yang benar-benar dapat diberikan. Jangan menentukan bahwa orang berduka tidak membutuhkan kata-kata.

  > ✏️ **Kotak Revisi EX-C13-2:**
  >
  > - Naskah Baru: Aku ikut berduka. Kalau kamu ingin ditemani, aku bisa datang dan duduk bareng. Nggak harus cerita apa-apa kalau memang belum ingin.
  > - Alasan Baru: Menawarkan bentuk kehadiran yang konkret sambil tetap memberi orang yang berduka kendali atas apakah ia ingin bicara atau cukup ditemani.
  >
* **EX-C13-3 (Kehilangan Pekerjaan):**

  * *Naskah Saat Ini:* `"Kehilangan pekerjaan bisa berarti kehilangan penghasilan sekaligus rutinitas. Kalau rasanya masih limbung, kamu tidak harus langsung memaksakan diri optimistis."`
  * *Alasan Saat Ini:* Akui dampak kehilangan pekerjaan tanpa menganggap pengalaman dan waktunya seragam.

  > ✏️ **Kotak Revisi EX-C13-3:**
  >
  > - Naskah Baru: Kehilangan pekerjaan bukan cuma soal penghasilan yang berhenti masuk. Rutinitas harian, hubungan dengan rekan kerja, rencana ke depan, bahkan cara seseorang melihat perannya di rumah bisa ikut berubah. Nggak semuanya harus langsung dibereskan dalam minggu pertama.
  > - Alasan Baru: Memperlihatkan bahwa kehilangan pekerjaan dapat memengaruhi beberapa bagian kehidupan sekaligus tanpa menganggap dampaknya akan sama bagi semua orang atau menentukan kapan seseorang seharusnya sudah “pulih”.
  >
* **EX-C13-4 (Waktu Berduka):**

  * *Naskah Saat Ini:* `"Setahun setelah seseorang pergi, lagu lama atau aroma masakan masih bisa mengingatkanmu kepadanya. Kamu tidak harus buru-buru menghapus rasa rindu itu."`
  * *Alasan Saat Ini:* Hormati lamanya duka tanpa menetapkan tenggat untuk pulih.

  > ✏️ **Kotak Revisi EX-C13-4:**
  >
  > - Naskah Baru: Setahun setelah seseorang pergi, satu lagu, aroma masakan, atau tempat tertentu masih bisa membawa ingatan kembali kepadanya. Munculnya rindu lagi tidak berarti kamu gagal melanjutkan hidup.
  > - Alasan Baru: Mengakui bahwa ingatan dan rasa kehilangan bisa muncul kembali tanpa menjadikannya tanda bahwa proses berduka berjalan salah atau terlalu lama.
  >

---

#### C14: Aktivitas Fisik & Kebersamaan

* **Tugas Psikologis:** Hubungkan aktivitas fisik dengan kesehatan dan kebersamaan santai; hindari toxic masculinity dan intimidasi fisik.

> ✏️ **Kotak Revisi Definisi Konteks C14:**
>
> * **Tugas Psikologis:** Menampilkan aktivitas fisik sebagai salah satu cara bergerak dan terhubung dengan orang lain, tanpa menjadikannya ukuran kekuatan, disiplin, kebugaran, atau nilai diri.
> * **Properti Bahasa:** Jelaskan bentuk kegiatan, intensitas, durasi, dan cara kelompok berpartisipasi secara konkret. Utamakan pengalaman bergerak dan kebersamaan dibanding performa. Jika menyebut manfaat kesehatan, gunakan klaim yang proporsional dan tidak menjadikan aktivitas fisik sebagai pengganti bantuan yang lebih sesuai.
> * **Hal yang Dihindari:** Membandingkan kemampuan fisik, menggunakan rasa malu atau tantangan maskulinitas sebagai motivasi, menyamakan tubuh atletis dengan kesehatan atau ketangguhan, menjanjikan olahraga akan menyelesaikan masalah mental, atau membuat peserta merasa harus mengikuti tempo kelompok.
>
> **Prinsip editorial:** Bergerak bersama → sesuai kemampuan → tanpa perlu membuktikan apa pun.

##### Contoh Naskah C14:

* **EX-C14-1 (Refleksi Lari Bersama):**

  * *Naskah Saat Ini:* `"Pagi ini kami lari bersama. Tidak sedang mengejar waktu tercepat, hanya menikmati langkah dan udara pagi setelah seminggu bekerja di depan layar."`
  * *Alasan Saat Ini:* Gambarkan pengalaman berkegiatan tanpa membandingkan kemampuan atau memaksakan target.

  > ✏️ **Kotak Revisi EX-C14-1:**
  >
  > - Naskah Baru: Pagi ini kami lari bareng tanpa target waktu. Ada yang berlari terus, ada yang beberapa kali jalan, lalu kami ketemu lagi di titik akhir.
  > - Alasan Baru: Menunjukkan bahwa orang bisa mengikuti kegiatan dengan kemampuan dan tempo yang berbeda tanpa menjadikan kecepatan sebagai ukuran keberhasilan.
  >
* **EX-C14-2 (Catatan Komunitas Main Bola):**

  * *Naskah Saat Ini:* `"Main bola mingguan ini tujuannya sederhana: berkegiatan, tertawa saat salah umpan, lalu makan bersama."`
  * *Alasan Saat Ini:* Jelaskan tujuan kegiatan tanpa menyebutnya cara paling sehat untuk semua orang.

  > ✏️ **Kotak Revisi EX-C14-2:**
  >
  > - Naskah Baru: Main bola minggu ini nggak pakai seleksi siapa yang paling jago. Salah umpan, oper lagi. Capek, gantian keluar sebentar. Setelah selesai, lanjut makan bareng.
  > - Alasan Baru: Menempatkan permainan sebagai kegiatan bersama, bukan arena untuk membuktikan kemampuan atau ketangguhan fisik.
  >
* **EX-C14-3 (Jalan Sore Bersama):**

  * *Naskah Saat Ini:* `"Sore ini, kami berjalan mengitari taman. Ada waktu untuk melihat langit dan mengobrol setelah seharian bekerja."`
  * *Alasan Saat Ini:* Gambarkan jeda dan kegiatan, tanpa menambahkan klaim pemulihan sensorik atau terapi.

  > ✏️ **Kotak Revisi EX-C14-3:**
  >
  > - Naskah Baru: Setelah seharian duduk di depan layar, sore ini kami jalan satu putaran taman. Nggak jauh dan nggak cepat. Cukup bergerak sebentar sambil ngobrol kalau ada yang ingin dibicarakan.
  > - Alasan Baru: Menawarkan aktivitas ringan tanpa membesar-besarkan manfaatnya atau menjadikan percakapan pribadi sebagai syarat untuk ikut.
  >
* **EX-C14-4 (Gowes Santai):**

  * *Naskah Saat Ini:* `"Gowes keliling kota akhir pekan ini kecepatannya santai. Siapa pun yang tertinggal akan ditunggu di lampu merah berikutnya."`
  * *Alasan Saat Ini:* Jelaskan rute dan cara kelompok menjaga kebersamaan. Pastikan aturan ini berlaku sebelum undangan dipakai.

  > ✏️ **Kotak Revisi EX-C14-4:**
  >
  > - Naskah Baru: Gowes akhir pekan ini sekitar [jarak/durasi] dengan tempo santai. Kita akan berhenti di [titik istirahat], dan kalau ada yang tertinggal, kelompok menunggu di titik yang sudah disepakati.
  > - Alasan Baru: Menjelaskan intensitas dan cara kelompok menjaga kebersamaan sehingga peserta bisa menilai apakah kegiatan sesuai dengan kemampuan dan kebutuhannya.
  >

---

### 4.3. Lima Skenario Penerapan Voice (SC1–SC5)

*Lokasi data: `src/data/scenarios.json`*

Bagian ini menunjukkan bagaimana prinsip Voice Menungsa diterapkan ketika konteks, kanal, dan tingkat risikonya berubah. Contoh di bawah bersifat ilustratif: fakta program, jadwal, biaya, kebijakan privasi, alur layanan, dan informasi darurat harus diperiksa kembali sebelum digunakan.

Semakin tinggi risikonya, semakin sedikit ruang untuk bahasa yang ambigu. Pada konten reflektif, Menungsa dapat memberi ruang bagi pembaca untuk menafsirkan pengalamannya sendiri. Pada situasi krisis, keselamatan dan kejelasan tindakan menjadi prioritas.

#### Skenario SC1: Carousel Pengenalan Diri (*Recognition Carousel*)

* **Brief:** Naskah tentang jarak antara masih tetap bekerja/berfungsi dan sebenarnya sedang tidak baik-baik saja. Misinya adalah pembaca mengenali dirinya tanpa merasa terpojok atau diminta melakukan apa pun.
* **Naskah Lemah Saat Ini:**
  > *"5 Tanda Kamu Sebenarnya Nggak Baik-Baik Aja 😔\nSwipe buat cari tahu! Kalau kamu ngalamin salah satunya, jangan ragu buat cari bantuan profesional ya. Kamu nggak sendirian! 💪"*
  >
* **Naskah Alternatif Menungsa (Worked Copy) Saat Ini:**
  > *"Slide 1 — Hal-hal yang biasanya berubah duluan\n\nSlide 2 — Tidur masih jam yang sama. Cuma sekarang matanya melek sampai jam tiga.\n\nSlide 3 — Kerjaan masih beres. Cuma butuh dua kali lebih lama buat mulai.\n\nSlide 4 — Masih ikut nongkrong. Cuma lebih banyak dengerin.\n\nSlide 5 — Nggak ada yang salah sama semua itu. Cuma biasanya itu yang berubah duluan.\n\nCaption — Gue nulis ini karena tiga dari empat hal di atas kejadian ke gue tahun lalu, dan gue baru nyadar pas ada yang nyeletuk. — Rio, tim konten Menungsa"*
  >

> ✏️ **Kotak Revisi SC1:**
>
> * **Brief Baru:** Menggambarkan perubahan kecil yang bisa muncul di tengah rutinitas yang masih berjalan. Tujuannya membantu pembaca mengenali perubahan dalam kesehariannya tanpa langsung memberi label, diagnosis, atau tuntutan untuk melakukan sesuatu.
> * **Fokus Utama:** R01 Setara, Bukan Menghakimi · R04 Mulai dari yang Terlihat · R05 Jelas soal Batasan.
> * **Risiko Utama:** Mengubah beberapa perubahan keseharian menjadi checklist diagnosis atau menyimpulkan bahwa pembaca “sebenarnya tidak baik-baik saja”.
>
> **Contoh yang Perlu Dihindari**
>
> **Slide 1 — 5 tanda kamu sebenarnya nggak baik-baik saja**
>
> Masih bisa kerja bukan berarti mentalmu baik-baik saja. Kalau beberapa tanda ini terjadi ke kamu, bisa jadi kamu sedang burnout.
>
> Swipe untuk cek tandanya.
>
> **Mengapa perlu dihindari:** Terlihat seperti konten pengenalan, tetapi sudah menyimpulkan keadaan psikologis pembaca. Format “tanda-tanda” juga mudah dibaca sebagai checklist diagnosis.
>
> **Contoh Penerapan Menungsa**
>
> **Slide 1 —** Ada hal-hal kecil yang kadang berubah di tengah rutinitas yang masih jalan.
>
> **Slide 2 —** Jam tidur masih sama. Tapi belakangan, pukul tiga pagi kamu masih melihat langit-langit kamar.
>
> **Slide 3 —** Tugasnya tetap selesai. Tapi membuka file pertama saja sekarang butuh waktu lebih lama.
>
> **Slide 4 —** Masih datang waktu diajak nongkrong. Cuma lebih sering duduk sambil dengar yang lain ngobrol.
>
> **Slide 5 —** Satu perubahan belum tentu berarti sesuatu. Tapi kalau beberapa hal mulai berbeda dari biasanya, mungkin itu layak diperhatikan.
>
> **Caption —** Kadang perubahan lebih mudah terlihat dari rutinitas sehari-hari sebelum kita tahu harus menamainya apa. Contoh di atas bukan checklist diagnosis; pengalaman tiap orang bisa berbeda.
>
> **Mengapa ini lebih sesuai:** Dimulai dari perubahan yang dapat dikenali, bukan label psikologis. Slide terakhir tidak mengatakan bahwa perubahan tersebut pasti merupakan gejala kondisi tertentu.
>
> **Catatan editorial:** Jika memakai pengalaman pribadi anggota tim, gunakan pengalaman yang benar-benar diberikan dan disetujui untuk dipublikasikan. Jangan menampilkan kutipan personal fiktif seolah kesaksian nyata.

---

#### Skenario SC2: Undangan Email Sesi Teman Sebaya

* **Brief:** Mengundang seseorang yang pernah mendaftarkan emailnya. Misinya membuat kehadiran seringan mungkin tanpa biaya sosial.
* **Naskah Lemah Saat Ini:**
  > *"Halo Sobat Menungsa! 🎉 Yuk gabung di support group kami! Tempat aman untuk berbagi cerita, melepas beban, dan menemukan dukungan dari sesama laki-laki hebat. Jangan ragu, kamu tidak sendirian! Daftar sekarang sebelum kuota habis!"*
  >
* **Naskah Alternatif Menungsa (Worked Copy) Saat Ini:**
  > *"Subjek: Selasa, 19.00 — apa yang terjadi di ruangan itu\n\nKami membuka sesi kelompok setiap Selasa, pukul 19.00 sampai 21.00, di [alamat]. Gratis.\n\nIsinya begini. Delapan sampai dua belas orang, duduk melingkar, satu fasilitator. Lima menit pertama dipakai membacakan aturan. Setelah itu siapa pun boleh bicara, dan boleh juga tidak. Minggu lalu ada dua orang yang tidak bicara sama sekali sampai sesi selesai.\n\nYang perlu kamu tahu sebelum datang:\n— Tidak ada daftar hadir dan tidak ada perkenalan wajib.\n— Tidak ada foto dan tidak ada dokumentasi.\n— Boleh pulang kapan saja tanpa pamit.\n— Kalau kamu datang sekali lalu tidak datang lagi, tidak ada yang menghubungi untuk menanyakan alasannya.\n\nKalau mau datang, balas email ini dengan satu kata: datang. Kalau tidak, email ini tidak perlu dibalas."*
  >

> ✏️ **Kotak Revisi SC2:**
>
> * **Brief Baru:** Mengundang orang yang sebelumnya memberikan alamat email untuk menerima informasi program. Tujuannya membuat calon peserta tahu apa yang akan terjadi sebelum memutuskan hadir, tanpa menuntut keterbukaan pribadi.
> * **Fokus Utama:** R02 Mudah untuk Dimulai · C04 Undangan Komunitas · C05 Dukungan Kelompok.
> * **Risiko Utama:** Menjual “ruang aman” sebagai janji, menyembunyikan aturan penting, atau membuat keikutsertaan terasa seperti komitmen besar.
>
> **Contoh yang Perlu Dihindari**
>
> **Subjek: Ruang aman buat kamu minggu ini**
>
> Selasa ini Ruang MENdukung kembali hadir. Di sini kamu bisa berbagi apa pun tanpa takut dihakimi bersama teman-teman yang memahami apa yang kamu rasakan.
>
> Kuota terbatas, jadi segera konfirmasi kehadiranmu.
>
> **Mengapa perlu dihindari:** “Tanpa takut dihakimi” menjanjikan pengalaman yang tidak dapat dijamin. Format, durasi, cara berpartisipasi, dan aturan privasi justru belum dijelaskan.
>
> **Contoh Penerapan Menungsa**
>
> **Subjek: Ruang MENdukung — Selasa, 19.00 WIB**
>
> Selasa ini Ruang MENdukung berlangsung pukul 19.00–21.00 WIB di [lokasi/platform]. Gratis, dengan maksimal [jumlah peserta yang sudah dipastikan].
>
> Sesi difasilitasi oleh [peran/kualifikasi yang sudah diverifikasi]. Di awal, fasilitator akan menjelaskan alur sesi dan aturan kerahasiaan. Setelah itu, kamu boleh bercerita, menjawab seperlunya, atau cukup mendengarkan.
>
> **Sebelum memutuskan ikut, ini yang perlu kamu tahu:**
>
> * [Cara pendaftaran yang berlaku.]
> * [Kebijakan nama, dokumentasi, dan penggunaan data.]
> * [Aturan membatalkan kehadiran.]
> * [Batas kerahasiaan yang memang berlaku.]
>
> Kalau ingin ikut, daftar melalui [jalur privat]. Kalau belum ingin, email ini tidak perlu dibalas.
>
> **Mengapa ini lebih sesuai:** Keputusan hadir dibuat setelah calon peserta mendapat gambaran yang cukup. Menungsa tidak meminta cerita pribadi sebagai syarat untuk bergabung dan tidak menjanjikan pengalaman yang tidak bisa dikendalikan sepenuhnya.
>
> **Catatan editorial:** Jangan menulis aturan seperti “boleh pulang kapan saja”, “tidak ada daftar hadir”, atau “tidak akan dihubungi kembali” kecuali itu kebijakan program yang benar-benar berlaku.

---

#### Skenario SC3: Pengumuman Sesi di Grup WhatsApp

* **Brief:** Mengumumkan sesi yang sama di kanal publik/grup WA di mana setiap respons terbaca oleh anggota lain.
* **Naskah Lemah Saat Ini:**
  > *"📢 REMINDER! Support group Menungsa Selasa 19.00. Yang mau ikut langsung komen HADIR di grup ini ya biar kami data! 🙌 Ayo yang belum pernah ikut, jangan malu-malu! 💪"*
  >
* **Naskah Alternatif Menungsa (Worked Copy) Saat Ini:**
  > *"Info sesi kelompok: Selasa, 19.00–21.00, di [alamat]. Gratis. Tidak ada daftar hadir.\n\nPesan ini tidak perlu dibalas dan tidak perlu ditanggapi di grup.\n\nKalau ada yang mau tanya atau mau datang, japri saya langsung di [nomor]. Yang japri tidak akan disebut di grup ini."*
  >

> ✏️ **Kotak Revisi SC3:**
>
> * **Brief Baru:** Mengumumkan sesi di ruang yang respons anggotanya dapat terlihat oleh orang lain. Informasi boleh disampaikan secara publik, tetapi keputusan untuk bertanya atau bergabung tidak perlu diumumkan kepada grup.
> * **Fokus Utama:** R02 Mudah untuk Dimulai · Context Check “Pertimbangkan siapa yang bisa melihat”.
> * **Risiko Utama:** Membuat ketertarikan pada dukungan kesehatan mental menjadi informasi publik hanya karena mekanisme RSVP yang dipilih tim.
>
> **Contoh yang Perlu Dihindari**
>
> Ruang MENdukung Selasa ini jam 19.00 WIB.
>
> Yang tertarik ikut boleh react 👍 atau tulis HADIR di grup supaya kami tahu jumlah pesertanya.
>
> **Mengapa perlu dihindari:** Permintaan yang tampak sederhana itu membuat keputusan mencari dukungan terlihat oleh seluruh anggota grup.
>
> **Contoh Penerapan Menungsa**
>
> **Info Ruang MENdukung**
>
> Selasa, [tanggal]  
> 19.00–21.00 WIB  
> [Lokasi/platform]  
> [Biaya jika ada]
>
> Pesan ini tidak perlu dibalas di grup.
>
> Kalau ingin melihat detail sesi, bertanya, atau mendaftar, gunakan [tautan privat / DM admin di kontak berikut].
>
> Tim Menungsa tidak akan membagikan nama orang yang menghubungi atau mendaftar ke grup ini tanpa izin.
>
> **Mengapa ini lebih sesuai:** Informasi kegiatan tetap tersedia untuk semua orang, tetapi minat seseorang terhadap sesi tidak perlu menjadi informasi publik. Komitmen privasi dibatasi pada tindakan yang berada dalam kendali tim Menungsa.
>
> **Catatan editorial:** Jangan meminta komentar, emoji, polling publik, atau bentuk RSVP lain yang secara tidak perlu mengungkap siapa yang tertarik pada layanan atau dukungan tertentu.

---

#### Skenario SC4: DM Menanyakan Cara Mencari Bantuan

* **Brief:** Pembaca mengirimkan pesan samar di DM menanyakan cara mencari bantuan.
* **Naskah Lemah Saat Ini:**
  > *"Halo Kak! Terima kasih sudah menghubungi Menungsa 🙏 Jangan ragu untuk bercerita ya, kami siap mendengarkan. Kamu tidak sendirian! Ceritakan saja apa yang sedang kamu rasakan, biar kami bisa bantu 💪"*
  >
* **Naskah Alternatif Menungsa (Worked Copy) Saat Ini:**
  > *"Halo, aku Dimas, yang pegang akun ini hari ini.\n\nNggak harus cerita detail kalau belum mau. Kalau kamu mau tahu langkah praktisnya duluan, ini yang biasanya paling cepat.\n\nDatang ke puskesmas terdekat, bilang: saya mau konsultasi kesehatan jiwa. Nggak perlu jelasin alasannya kalau belum siap. Ditanggung JKN. Antreannya bisa lama, jadi bawa sesuatu buat dibaca.\n\nKalau nggak dirujuk padahal kamu ngerasa perlu, kamu boleh minta lagi. Itu hak kamu, bukan ngerepotin.\n\nMau aku bantu cariin puskesmas yang paling dekat dari kamu?"*
  >

> ✏️ **Kotak Revisi SC4:**
>
> * **Brief Baru:** Seseorang menghubungi akun Menungsa dengan pertanyaan umum seperti “gue harus mulai dari mana?” atau “kalau mau cari bantuan gimana?”. Tujuannya membantu menemukan pintu masuk tanpa menjadikan cerita pribadi sebagai harga untuk mendapat informasi.
> * **Fokus Utama:** R02 Mudah untuk Dimulai · R03 Satu Langkah Nyata · R05 Jelas soal Batasan · C06 Akses Bantuan.
> * **Risiko Utama:** Meminta keterbukaan yang tidak diperlukan, bertindak seperti layanan klinis, atau memberikan informasi akses layanan yang belum diverifikasi.
>
> **Contoh yang Perlu Dihindari**
>
> Halo, terima kasih sudah menghubungi Menungsa. Boleh ceritakan dulu apa yang sedang kamu alami dan sudah berlangsung berapa lama? Nanti kami coba bantu menentukan kamu sebaiknya ke mana.
>
> **Mengapa perlu dihindari:** Pembaca diminta membuka informasi pribadi sebelum mendapat bantuan dasar. Kalimat itu juga memberi kesan Menungsa dapat melakukan penilaian klinis dan menentukan layanan yang tepat.
>
> **Contoh Penerapan Menungsa**
>
> Halo, aku [nama], yang pegang akun Menungsa hari ini.
>
> Kamu nggak harus cerita detail kalau belum mau.
>
> Kalau yang kamu cari sekarang adalah bantuan profesional, kita bisa mulai dari informasi praktisnya dulu. Kalau kamu nyaman, kirim kota atau kabupaten tempat kamu berada—nggak perlu alamat lengkap. Aku bisa bantu cek sumber resmi tentang layanan yang tersedia, cara daftar, jadwal, dan biaya yang tercantum.
>
> Kalau kamu lebih nyaman mencari sendiri, aku juga bisa kasih langkah untuk mengeceknya.
>
> Menungsa bukan layanan klinis, jadi kami nggak bisa mendiagnosis atau menentukan terapi. Kalau situasinya sedang mendesak atau kamu merasa berisiko menyakiti diri, bilang sekarang supaya percakapannya bisa diarahkan ke langkah keselamatan yang lebih sesuai.
>
> **Mengapa ini lebih sesuai:** Menungsa menawarkan bantuan navigasi tanpa meminta cerita lengkap dan tanpa mengambil peran klinis. Informasi yang mudah berubah dicari dari sumber yang sesuai, bukan diasumsikan berlaku sama di semua fasilitas.
>
> **Catatan editorial:** Jangan membuat klaim umum seperti “pasti ditanggung JKN”, “antreannya biasanya lama”, atau “kamu berhak mendapat rujukan” tanpa memastikan aturan fasilitas, skema pembiayaan, dan situasinya. Jika ada risiko keselamatan, hentikan navigasi biasa dan beralih ke SC5.

---

#### Skenario SC5: DM Krisis Bunuh Diri — Protokol Keselamatan

* **Brief:** Situasi berisiko paling tinggi. Kepastian harus maksimal, tidak boleh menggunakan kiasan atau keragu-raguan.
* **Naskah Lemah Saat Ini:**
  > *"Kamu berharga banget! 🙏 Badai pasti berlalu, percaya deh. Coba deh cerita pelan-pelan, siapa tahu lega. Kami selalu ada untukmu ❤️ Stay strong ya!"*
  >
* **Naskah Alternatif Menungsa (Worked Copy) Saat Ini:**
  > *"Kalau kamu lagi mikir buat mengakhiri hidup, ini yang bisa dilakukan sekarang.\n\nHubungi 119 lalu tekan 8. Gratis, 24 jam.\n\nKalau kamu nggak sanggup nelpon, minta orang terdekat yang nelpon. Boleh tunjukkan pesan ini ke dia.\n\nKalau ada alat yang bisa melukai di dekat kamu, pindahkan atau titipkan ke orang lain malam ini.\n\nAku Dimas. Aku masih di sini. Tapi aku bukan tenaga profesional, dan chat ini nggak bisa gantiin layanan darurat."*
  >

> ✏️ **Kotak Revisi SC5:**
>
> * **Brief Baru:** Seseorang menyatakan sedang ingin menyakiti diri atau mengakhiri hidup, atau ada alasan kuat untuk menduga keselamatannya sedang terancam. Tujuannya bukan melakukan konseling lewat DM, tetapi memperpendek jalan menuju keselamatan dan bantuan langsung.
> * **Fokus Utama:** R03 Satu Langkah Nyata · R05 Jelas soal Batasan · C07 Krisis & Keselamatan Segera.
> * **Risiko Utama:** Menenangkan dengan slogan, meminta cerita panjang, menawarkan teknik coping sebagai pengganti bantuan, mencantumkan layanan yang sudah tidak berlaku, atau memberi kesan akun Menungsa memantau orang tersebut terus-menerus.
>
> **Contoh yang Perlu Dihindari**
>
> Aku ikut khawatir dengarnya. Coba tarik napas dulu dan ceritakan pelan-pelan apa yang terjadi. Kamu sudah sejauh ini, jadi jangan menyerah sekarang. Kami ada di sini buat kamu.
>
> **Mengapa perlu dihindari:** Respons terdengar suportif, tetapi tidak menjawab risiko keselamatan. “Kami ada di sini” juga dapat dibaca sebagai janji ketersediaan yang belum tentu dipenuhi.
>
> **Contoh Penerapan Menungsa**
>
> Kalau kamu merasa mungkin menyakiti diri atau mengakhiri hidup sekarang, jangan hadapi ini sendirian.
>
> Hubungi satu orang yang bisa datang atau tetap bersama kamu sekarang. Kalau sulit menjelaskan, kamu bisa kirim:
>
> **“Aku lagi nggak aman sendirian. Tolong temani aku sekarang.”**
>
> Pindah ke tempat bersama orang lain. Kalau ada benda atau situasi di sekitar yang bisa digunakan untuk menyakiti diri, minta orang yang menemanimu membantu menjauhkannya.
>
> Setelah itu, hubungi **[layanan darurat yang sudah diverifikasi]** atau pergi ke **IGD terdekat** dengan didampingi.
>
> Menungsa bukan layanan krisis dan DM ini tidak dipantau 24 jam. Kami tidak dapat menggantikan bantuan darurat.
>
> **Mengapa ini lebih sesuai:** Risiko disebut secara langsung dan respons berfokus pada tiga hal: tidak sendirian, membuat situasi lebih aman, dan menuju bantuan langsung. Menungsa juga menjelaskan batas kapasitasnya tanpa meninggalkan orang tanpa arah.
>
> **Catatan editorial:** Nomor telepon, jam operasional, kanal layanan, dan klaim seperti “gratis” atau “24 jam” tidak ditanam permanen di contoh. Simpan informasi layanan pada sumber terpisah yang dapat diperbarui. Jangan menulis “aku masih di sini” atau meminta orang terus membalas jika tim tidak dapat menjamin respons langsung. SOP percakapan terpisah diperlukan jika kelak tersedia *live crisis response* dengan staf terlatih dan jadwal pemantauan yang jelas.

---

> **Prinsip lintas skenario:** Semakin besar konsekuensi jika pembaca salah memahami pesan, semakin konkret bahasa yang digunakan dan semakin sedikit asumsi yang boleh dibuat oleh penulis.

## 5. Halaman 3: Pilihan Kata & Sapaan (Word Guide)

*Lokasi: `src/components/views-v2/WordGuideView.tsx` (rute `#lexicon`)*

### 5.1. Header & Tab

* **Kicker Saat Ini:** `KAMUS & PILIHAN KATA`
  > ✏️ **Kotak Revisi Kicker:** `PILIHAN KATA`
  >
* **Judul Utama Saat Ini:** `Panduan Pilihan Kata, Sapaan & Kata Ganti`
  > ✏️ **Kotak Revisi Judul:** `Pilihan Kata dan Sapaan`
  >
* **Paragraf Pengantar Saat Ini:** `Pilih sapaan sesuai hubungan dengan pembaca dan situasi pesan. Panduan ini membantu menimbang pilihan, bukan menentukan satu sapaan yang selalu tepat.`
  > ✏️ **Kotak Revisi Pengantar:**
  > Gunakan panduan ini untuk memilih sapaan, kata ganti, dan istilah yang sesuai dengan hubungan, kanal, dan situasi pesan. Tidak ada satu pilihan yang selalu tepat sehingga pertimbangkan konteks dan bagaimana kata tersebut dapat diterima oleh pembaca.`
  >

---

### 5.2. Tab 1: Sapaan, Kata Ganti & Sebutan

> **Aturan global:** Sapaan bukan kostum brand. Pilih kata berdasarkan siapa yang berbicara, kepada siapa, dan dalam situasi apa—bukan berdasarkan asumsi tentang “cara laki-laki bicara”. Menungsa tidak perlu memaksakan `bro`, `cuy`, `cowok`, atau `gue–lo` agar terdengar dekat, maupun bahasa formal agar terdengar kredibel.

**Peta keputusan:**

* **Berbicara kepada atau bersama pembaca:** `kamu` · `Anda` · `kita`
* **Menyebut diri sendiri:** `kami` · `saya` · `aku` · `gue/gua`
* **Menyebut atau menyapa orang lain:** `lo/lu` · `laki-laki` · `pria` · `cowok` · `bro/bang/mas/pak`

#### 1. Sapaan: `kamu`

* **Kesan & Hubungan:** Langsung dan cukup akrab. Sapaan utama yang dipilih Menungsa untuk panduan ini.
* **Risiko:** Dapat terasa mendikte jika dipadukan dengan kata kerja imperatif ("kamu harus", "kamu wajib").
* **Konteks:** Panduan dan konten umum Menungsa; sesuaikan untuk layanan formal atau audiens tertentu.
* **Contoh Kalimat:** `"Ketika tubuhmu memberi sinyal lelah yang tak kunjung reda, dengarkan."`

> ✏️ **Kotak Revisi untuk `kamu`:**
>
> - Kesan & Hubungan: Langsung, personal, dan cukup netral untuk banyak konteks. Menjadi sapaan utama Menungsa ketika berbicara langsung kepada pembaca.
> - Risiko: Bisa terasa menggurui jika terlalu sering dipasangkan dengan tuntutan seperti `kamu harus`, `kamu wajib`, atau kesimpulan tentang pengalaman pembaca.
> - Konteks: Konten edukasi, panduan praktis, caption, halaman website, email umum, dan komunikasi langsung yang tidak membutuhkan formalitas tinggi.
> - Contoh Kalimat Baru: “Kalau belakangan ada yang terasa berbeda dari rutinitasmu, coba perhatikan perubahan yang paling mudah kamu kenali dulu.”

#### 2. Sapaan: `Anda`

* **Kesan & Hubungan:** Formal dan menjaga jarak yang sopan.
* **Risiko:** Terasa kaku, birokratis, dan dingin jika digunakan dalam narasi empati atau obrolan santai.
* **Konteks:** Formulir pendaftaran konseling resmi, syarat & ketentuan, pemberitahuan privasi, rujukan medis.
* **Contoh Kalimat:** `"Jadwal konsultasi Anda telah terkonfirmasi untuk hari Selasa pukul 14.00 WIB."`

> ✏️ **Kotak Revisi untuk `Anda`:**
>
> - Kesan & Hubungan: Formal, sopan, dan menjaga jarak profesional.
> - Risiko: Bisa terasa kaku atau terlalu institusional dalam percakapan yang seharusnya personal dan setara.
> - Konteks: Dokumen formal, kebijakan privasi, persetujuan, korespondensi resmi, atau komunikasi dengan institusi dan profesional.
> - Contoh Kalimat Baru: “Data yang Anda berikan hanya akan digunakan sesuai tujuan yang dijelaskan pada formulir ini.”

#### 3. Sapaan: `kita`

* **Kesan & Hubungan:** Melibatkan penulis dan pembaca dalam hal yang memang dialami atau dilakukan bersama.
* **Risiko:** Terdengar sok tahu atau memaksakan asumsi jika pembaca sedang tidak mengalami beban tersebut.
* **Konteks:** Kegiatan bersama atau refleksi yang benar-benar melibatkan penulis dan pembaca.
* **Contoh Kalimat:** `"Tubuh kita memang butuh jeda berkala setelah bekerja berhari-hari tanpa henti."`

> ✏️ **Kotak Revisi untuk `kita`:**
>
> - Kesan & Hubungan: Menempatkan penulis dan pembaca dalam tindakan, ruang, atau pengalaman yang memang dibagi bersama.
> - Risiko: Mudah berubah menjadi asumsi palsu ketika penulis berbicara seolah semua orang mengalami hal yang sama.
> - Konteks: Kegiatan bersama, refleksi kolektif yang benar-benar relevan, atau penjelasan tentang sesuatu yang dilakukan Menungsa bersama peserta.
> - Contoh Kalimat Baru: “Sebelum sesi dimulai, kita akan membaca aturan percakapan dan kerahasiaan bersama.”
>
> Gunakan `kita` untuk sesuatu yang benar-benar dibagi, bukan hanya agar kalimat terasa hangat.

#### 4. Sapaan: `kami`

* **Kesan & Hubungan:** Mewakili tim atau organisasi, tanpa memasukkan pembaca.
* **Risiko:** Dapat terasa berjarak jika dipakai terus-menerus tanpa menyapa pembaca secara personal.
* **Konteks:** Pernyataan kebijakan organisasi, transparansi program, metodologi riset, dan laporan kegiatan.
* **Contoh Kalimat:** `"Kami di Menungsa menyiapkan ruang ini agar kamu bisa beristirahat sejenak tanpa tuntutan."`

> ✏️ **Kotak Revisi untuk `kami`:**
>
> - Kesan & Hubungan: Mewakili Menungsa sebagai tim atau organisasi dan membedakan tindakan organisasi dari tindakan pembaca.
> - Risiko: Bisa terasa berjarak jika dipakai untuk seluruh tulisan, tetapi penting ketika Menungsa perlu mengambil tanggung jawab atas keputusan, batas, atau tindakannya sendiri.
> - Konteks: Kebijakan, transparansi program, laporan, pernyataan sikap, metode kerja, dan penjelasan tentang apa yang Menungsa lakukan.
> - Contoh Kalimat Baru: “Kami tidak akan membagikan cerita peserta ke publik tanpa izin.”

#### 5. Sapaan: `gue / gua`

* **Kesan & Hubungan:** Bahasa percakapan yang lazim dalam sebagian lingkungan, terutama yang akrab dengan ragam Jakarta.
* **Risiko:** Dapat terasa dipaksakan ketika tidak sesuai dengan kebiasaan penutur atau pembaca. Bukan pilihan utama akun organisasi Menungsa.
* **Konteks:** Cerita pribadi atau percakapan oleh penutur yang memang terbiasa menggunakannya, termasuk konten publik.
* **Contoh Kalimat:** `"Waktu usaha bengkel gue tutup dua tahun lalu, rasanya bangun tidur aja berat banget."`

> ✏️ **Kotak Revisi untuk `gue / gua`:**
>
> - Kesan & Hubungan: Ragam orang pertama yang santai dan sangat bergantung pada kebiasaan penutur. Umum dalam sebagian lingkungan urban, terutama ragam Jakarta dan sekitarnya.
> - Risiko: Terasa dibuat-buat jika digunakan hanya untuk membuat Menungsa terdengar lebih muda, maskulin, atau “tongkrongan”. Jangan jadikan `gue` sebagai brand voice default.
> - Konteks: Kesaksian personal, dialog, video, atau percakapan ketika penutur memang menggunakan `gue/gua` secara alami.
> - Contoh Kalimat Baru: “Waktu usaha gue tutup, beberapa minggu pertama gue masih bangun pagi seperti mau berangkat kerja.”

#### 6. Sapaan: `lo / lu`

* **Kesan & Hubungan:** Sapaan orang kedua akrab antarteman tongkrongan sebaya.
* **Risiko:** Dapat terasa terlalu akrab bagi pembaca yang tidak biasa disapa demikian.
* **Konteks:** Konten video kreator personal bernama jelas, dialog naskah teater/cerita fiksi.
* **Contoh Kalimat:** `"Kalau hari ini lo belum sanggup cerita, nggak apa-apa, duduk aja dulu."`

> ✏️ **Kotak Revisi untuk `lo / lu`:**
>
> - Kesan & Hubungan: Sapaan orang kedua yang akrab dalam ragam percakapan tertentu.
> - Risiko: Bisa terdengar invasif, sok dekat, atau terlalu regional jika hubungan dengan pembaca belum mendukung.
> - Konteks: Dialog autentik, percakapan antarteman, atau konten personal ketika penutur memang biasa menggunakan pasangan `gue–lo` atau `gua–lu`.
> - Contoh Kalimat Baru: “Kalau lo belum mau cerita sekarang, nggak apa-apa. Kita bisa duduk dulu.”

#### 7. Sapaan: `aku`

* **Kesan & Hubungan:** Kata ganti orang pertama untuk cerita pribadi atau percakapan sehari-hari.
* **Risiko:** Bisa terdengar terlalu melankolis atau romantis jika dipakai dalam instruksi navigasi layanan.
* **Konteks:** Esai refleksi diri orang pertama, monolog video dokumenter, kisah pemulihan personal.
* **Contoh Kalimat:** `"Bulan ketiga setelah toko tutup, aku masih sering bangun jam lima pagi menyeduh kopi di teras."`

> ✏️ **Kotak Revisi untuk `aku`:**
>
> - Kesan & Hubungan: Orang pertama yang personal dan cukup intim, tetapi tetap lazim di banyak ragam bahasa Indonesia.
> - Risiko: Bisa tidak sesuai jika penutur sebenarnya tidak menggunakan `aku` atau situasinya sangat formal; masalahnya bukan karena kata ini dianggap terlalu melankolis.
> - Konteks: Kisah personal, esai, video orang pertama, percakapan pribadi, atau narasi reflektif.
> - Contoh Kalimat Baru: “Bulan ketiga setelah toko tutup, aku masih bangun jam lima pagi seperti biasanya.”

#### 8. Sapaan: `saya`

* **Kesan & Hubungan:** Kata ganti orang pertama yang sopan dan lazim digunakan dalam beragam situasi.
* **Risiko:** Kurang intim jika digunakan dalam obrolan lingkaran kecil antarteman sebaya.
* **Konteks:** Wawancara, penjelasan profesional, cerita pribadi, atau percakapan yang memerlukan sapaan sopan.
* **Contoh Kalimat:** `"Dalam sesi ini, saya akan menjelaskan pilihan yang tersedia. Kamu bisa bertanya jika ada yang belum jelas."`

> ✏️ **Kotak Revisi untuk `saya`:**
>
> - Kesan & Hubungan: Orang pertama yang sopan, fleksibel, dan dapat digunakan dalam konteks personal maupun profesional.
> - Risiko: Bisa terasa lebih formal daripada hubungan yang sedang dibangun, tetapi tidak otomatis dingin.
> - Konteks: Wawancara, komunikasi profesional, kesaksian personal, fasilitasi, atau percakapan dengan orang yang belum akrab.
> - Contoh Kalimat Baru: “Saya akan menjelaskan alur sesi terlebih dahulu. Setelah itu, kamu bebas memilih mau bicara atau cukup mendengarkan.”

#### 9. Sapaan: `laki-laki`

* **Kesan & Hubungan:** Sebutan umum untuk laki-laki, termasuk dalam pembahasan sosial dan demografi.
* **Risiko:** Menimbulkan kejenuhan identitas (*gender fatigue*) bila diulang di setiap kalimat.
* **Konteks:** Analisis sosiokultural, statistik beban peran keluarga, dan dialog kesehatan umum.
* **Contoh Kalimat:** `"Sebagian laki-laki menghadapi tekanan untuk terus memenuhi kebutuhan keluarga, meski mereka sendiri sedang kesulitan."`

> ✏️ **Kotak Revisi untuk `laki-laki`:**
>
> - Kesan & Hubungan: Sebutan yang relatif netral untuk membahas laki-laki sebagai kelompok, terutama dalam tulisan sosial, kesehatan, riset, atau demografi.
> - Risiko: Jika diulang terlalu sering, gender menjadi pusat identitas bahkan ketika tidak relevan dan semua perilaku seolah dijelaskan melalui gender.
> - Konteks: Analisis sosial, data, riset, kebijakan, atau pembahasan ketika gender memang penting bagi argumen.
> - Contoh Kalimat Baru: “Sebagian laki-laki menghadapi tekanan untuk menjadi sumber penghasilan utama dalam keluarga, tetapi pengalaman ini tidak sama bagi semua orang.”
>
> Sebut gender ketika gender memang membantu menjelaskan konteks.

#### 10. Sapaan: `pria`

* **Kesan & Hubungan:** Sebutan untuk laki-laki yang lazim dalam tulisan formal.
* **Risiko:** Rentan disalahgunakan jika digabung dengan klise manosphere ("Pria Sejati", "Pria Bernilai Tinggi").
* **Konteks:** Artikel, informasi layanan, atau pembahasan demografi saat gender relevan.
* **Contoh Kalimat:** `"Panduan ini ditujukan untuk pria dewasa yang ingin mengetahui pilihan dukungan."`

> ✏️ **Kotak Revisi untuk `pria`:**
>
> - Kesan & Hubungan: Sebutan yang lebih formal dan sering muncul dalam tulisan institusional, media, atau informasi layanan.
> - Risiko: Mudah terdengar normatif jika digabungkan dengan label seperti `pria sejati`, `pria berkualitas`, atau `pria bernilai tinggi`.
> - Konteks: Tulisan formal, demografi, judul program tertentu, atau materi layanan ketika ragam bahasanya memang menggunakan `pria`.
> - Contoh Kalimat Baru: “Layanan ini tersedia untuk pria dewasa berusia [rentang usia] yang memenuhi kriteria program.”

#### 11. Sapaan: `cowok`

* **Kesan & Hubungan:** Sebutan kasual santai bernuansa muda dan tongkrongan.
* **Risiko:** Dapat terdengar meremehkan (*infantilizing*) pria dewasa usia 40-an jika dipakai di layanan formal.
* **Konteks:** Humor situasional di balik layar, konten visual olahraga santai, ruang pemuda.
* **Contoh Kalimat:** `"Beberapa cowok di komunitas ini rutin bertemu untuk mengerjakan hobi bersama."`

> ✏️ **Kotak Revisi untuk `cowok`:**
>
> - Kesan & Hubungan: Sebutan kasual yang lebih ringan dan dekat dengan percakapan sehari-hari, terutama di kalangan usia muda.
> - Risiko: Bisa terasa terlalu santai, kekanak-kanakan, atau tidak cocok untuk konteks formal maupun pembaca yang lebih tua. Jangan menjadikannya cara default agar konten laki-laki terdengar relatable.
> - Konteks: Humor ringan, percakapan personal, dialog, atau konten kasual ketika istilah tersebut memang terdengar alami.
> - Contoh Kalimat Baru: “Kadang obrolan antar-cowok justru mulai dari hal yang kelihatannya nggak penting: kerjaan, motor, game, atau siapa yang telat datang.”

#### 12. Sapaan: `bro / bang / mas / pak`

* **Kesan & Hubungan:** Sapaan dengan penggunaan yang berbeda-beda menurut daerah, usia, dan hubungan.
* **Risiko:** Sapaan yang tidak sesuai konteks dapat terasa dipaksakan. Jangan menganggap “pak” memiliki keakraban yang sama dengan “bro”.
* **Konteks:** Fasilitator individu dalam sesi komunitas tatap muka, balasan komentar personal, dan percakapan langsung antarsebaya.
* **Contoh Kalimat:** `"Bang, kalau ada waktu luang besok sore, kita ngobrol santai di warung belakang kantor ya."`

> ✏️ **Kotak Revisi untuk `bro / bang / mas / pak`:**
>
> - Kesan & Hubungan: Sapaan relasional yang maknanya bergantung pada usia, daerah, tingkat keakraban, dan posisi sosial. `bro`, `bang`, `mas`, dan `pak` tidak dapat dipertukarkan begitu saja.
> - Risiko: Bisa terasa dibuat-buat, terlalu akrab, atau salah membaca usia dan relasi jika dipilih berdasarkan stereotip tentang cara laki-laki berbicara.
> - Konteks: Percakapan langsung, fasilitasi, komentar, atau interaksi personal ketika sapaan tersebut sudah digunakan oleh lawan bicara atau sesuai konteks setempat.
> - Contoh Kalimat Baru: “Mas, kalau ada bagian yang belum jelas soal alur pendaftarannya, saya bisa jelaskan lagi.”
>
> **Mirror, jangan manufacture:** sesuaikan sapaan yang sudah digunakan lawan bicara jika terasa wajar. Jangan menambahkan sapaan hanya agar komunikasi terdengar “lebih laki-laki”.

---

### 5.3. Tab 3: Enam Kebutuhan yang Sering Dicari & Respons Etis Menungsa

Enam kategori di bawah digunakan sebagai lensa editorial, bukan sebagai daftar kebutuhan psikologis universal atau kebutuhan yang hanya dimiliki laki-laki.

Daya tarik suatu pesan sering muncul karena ia menjawab kebutuhan yang nyata: memahami apa yang terjadi, merasa didengar, merasa mampu, memiliki pilihan, menjadi bagian dari kelompok, atau menemukan hal yang dianggap berarti.

Masalahnya bukan pada kebutuhan tersebut, melainkan pada cara kebutuhan itu dijawab. Sebagian ruang manosphere menawarkan jawaban melalui kepastian palsu, kambing hitam, hierarki sosial, atau tuntutan maskulinitas. Menungsa berusaha menjawab kebutuhan yang sama tanpa mengorbankan martabat, kebebasan memilih, bukti, atau keselamatan orang lain.

> **Jangan memusuhi kebutuhan yang membuat suatu pesan menarik.** Orang yang mencari kepastian, pengakuan, kemampuan, kendali, kebersamaan, atau makna tidak sedang melakukan sesuatu yang salah. Tugas Menungsa adalah menjawabnya tanpa menawarkan kepastian palsu, musuh bersama, hierarki nilai manusia, atau tuntutan baru tentang bagaimana laki-laki seharusnya hidup.

#### 1. Orientasi & Kejelasan (`certainty` · M03)

* **Kebutuhan Psikologis:** Kebutuhan memahami persoalan dan melihat pilihan langkah yang tersedia.
* **Mengapa Menarik:** Meredakan disorientasi dan kebingungan akut; mengubah situasi sosial yang rumit menjadi aturan main yang tampak teratur dan sistematis.
* **Versi Berbahaya (Manosphere):** Penjelasan mutlak yang menyalahkan perempuan atau menganggap nasib laki-laki sudah ditentukan secara biologis.
* **Alternatif Etis Menungsa:** Jelaskan persoalan dengan bukti yang tersedia. Sebutkan apa yang belum diketahui tanpa menciptakan kambing hitam.
* **Prinsip Utama:** *Beri penjelasan yang jelas dan akui keterbatasannya.*

> ✏️ **Kotak Revisi Kebutuhan 1 (Kepastian):**
>
> * **Kebutuhan yang Dicari:** Kebutuhan untuk memahami apa yang sedang terjadi, mengurangi kebingungan, dan melihat pilihan atau langkah yang masih tersedia.
> * **Mengapa Ini Menarik:** Penjelasan yang sederhana dan terstruktur dapat membuat situasi yang rumit terasa lebih mudah dipahami dan memberi titik awal untuk bertindak.
> * **Jalan Pintas yang Berbahaya:** Memberikan satu penjelasan mutlak untuk masalah yang kompleks, mengklaim bahwa nasib laki-laki sudah ditentukan oleh biologi atau gender, atau menunjuk kelompok tertentu sebagai penyebab utama semua masalah.
> * **Respons Etis Menungsa:** Berikan penjelasan yang cukup jelas untuk membantu pembaca berorientasi, tetapi tetap bedakan apa yang diketahui, apa yang masih mungkin, dan apa yang belum diketahui. Jika persoalannya kompleks, jangan berpura-pura ada satu penyebab atau satu jawaban.
> * **Prinsip Utama:** **Beri arah tanpa menjual kepastian palsu.**

#### 2. Pengakuan Beban & Rasa Didengar (`validation` · M05)

* **Kebutuhan Psikologis:** Kebutuhan untuk merasa dipahami, didengar, dan terbebas dari rasa malu saat belum mampu memenuhi ekspektasi sosial atau standar maskulinitas.
* **Mengapa Menarik:** Meringankan beban rasa gagal pribadi dengan menegaskan bahwa "bukan cuma kamu yang kesulitan; sistem dan realitas hidup saat ini memang berat."
* **Versi Berbahaya (Manosphere):** Memanfaatkan luka batin menjadi kebencian kolektif (*grievance amplification*), menyalahkan wanita, keluarga, atau gerakan kesetaraan.
* **Alternatif Etis Menungsa:** Akui tekanan yang dihadapi pembaca tanpa membenarkan kebencian terhadap orang lain.
* **Prinsip Utama:** *Validasi rasa lelah dan kesulitan hidupnya, jangan pernah memvalidasi kebenciannya.*

> ✏️ **Kotak Revisi Kebutuhan 2 (Pengakuan Beban):**
>
> * **Kebutuhan yang Dicari:** Kebutuhan untuk merasa bahwa kesulitan yang dialami benar-benar dilihat dan tidak langsung dianggap sebagai kelemahan, kegagalan, atau kekurangan pribadi.
> * **Mengapa Ini Menarik:** Ketika pengalaman seseorang diakui dengan konkret, ia tidak perlu terus membuktikan bahwa bebannya nyata sebelum percakapan bisa dimulai.
> * **Jalan Pintas yang Berbahaya:** Mengubah pengalaman kecewa atau terluka menjadi narasi bahwa kelompok lain adalah penyebab bersama, lalu memperkuat kemarahan melalui permusuhan kolektif.
> * **Respons Etis Menungsa:** Akui beban, emosi, dan kondisi yang memang sedang dihadapi tanpa otomatis membenarkan kesimpulan tentang siapa yang harus disalahkan. Jika faktor sosial atau struktural relevan, jelaskan secara spesifik dan berdasarkan bukti.
> * **Prinsip Utama:** **Akui pengalamannya tanpa mengubah luka menjadi musuh bersama.**

#### 3. Kompetensi, Penghargaan & Martabat (`status` · M08)

* **Kebutuhan Psikologis:** Kebutuhan akan rasa berharga (*self-worth*), rasa hormat sosial antarteman sebaya, kecakapan (*competence*), dan memiliki dampak nyata yang dirasakan.
* **Mengapa Menarik:** Menggantikan rasa rendah diri dengan hierarki pencapaian fisik, finansial yang terukur, dan rasa bangga sebagai pria dewasa.
* **Versi Berbahaya (Manosphere):** Konsep dominasi agresif "Pria Nilai Tinggi (*High-Value Man*)", merendahkan pria berpenghasilan rendah, serta obsesi fisik semu (*looksmaxxing*).
* **Alternatif Etis Menungsa:** Bantu pembaca mengembangkan keterampilan tanpa menjadikan kemampuan, penghasilan, atau pencapaian sebagai syarat untuk dihargai.
* **Prinsip Utama:** *Membangun keahlian dan rasa bernilai tanpa perlu membanding-bandingkan kasta sosial.*

> ✏️ **Kotak Revisi Kebutuhan 3 (Keahlian & Martabat):**
>
> * **Kebutuhan yang Dicari:** Kebutuhan untuk merasa mampu melakukan sesuatu dengan baik, melihat perkembangan diri, mendapatkan penghargaan yang wajar, dan tetap diperlakukan sebagai manusia yang bernilai.
> * **Mengapa Ini Menarik:** Kemampuan yang berkembang dan hasil yang dapat dilihat memberi rasa kemajuan. Pengakuan dari orang lain juga dapat memperkuat rasa bahwa usaha seseorang memiliki arti.
> * **Jalan Pintas yang Berbahaya:** Mengubah harga diri menjadi hierarki—siapa yang paling kaya, kuat, menarik, dominan, atau “bernilai tinggi”—lalu memperlakukan orang yang berada di bawah standar tersebut sebagai kurang layak dihormati.
> * **Respons Etis Menungsa:** Dorong keterampilan, disiplin, kesehatan, atau pencapaian ketika itu memang penting bagi pembaca. Bedakan dengan jelas antara sesuatu yang dapat dikembangkan dan martabat dasar yang tidak perlu diperoleh melalui pencapaian.
> * **Prinsip Utama:** **Kemampuan bisa dibangun; martabat tidak perlu dibuktikan.**

#### 4. Pilihan & Kemampuan Bertindak (`agency` · M02)

* **Kebutuhan Psikologis:** Kebutuhan untuk keluar dari rasa tak berdaya (*helplessness*) dan memegang kendali atas jalan hidup melalui tindakan nyata yang berbatas tegas.
* **Mengapa Menarik:** Langkah yang jelas dapat membantu seseorang melihat pilihan yang masih tersedia.
* **Versi Berbahaya (Manosphere):** Disiplin brutal (*toxic grindset*), individualisme ekstrem, mengabaikan kemiskinan struktural, dan menuduh pria lelah/depresi sebagai orang yang "kurang disiplin".
* **Alternatif Etis Menungsa:** Tawarkan langkah yang realistis sambil mengakui keterbatasan waktu, uang, dan tenaga.
* **Prinsip Utama:** *Bantu pembaca bertindak sesuai pilihan dan kemampuannya.*

> ✏️ **Kotak Revisi Kebutuhan 4 (Kedaulatan Diri):**
>
> * **Kebutuhan yang Dicari:** Kebutuhan untuk melihat bahwa masih ada sesuatu yang bisa dipilih, dicoba, dihentikan, atau diubah meskipun tidak semua keadaan berada dalam kendali.
> * **Mengapa Ini Menarik:** Satu langkah yang konkret dapat membuat masalah yang besar terasa lebih mungkin untuk dihadapi dan membantu seseorang melihat pilihan yang masih tersedia.
> * **Jalan Pintas yang Berbahaya:** Menganggap semua hasil bergantung pada kemauan dan disiplin individu, mengabaikan keterbatasan ekonomi atau sosial, atau menjadikan kelelahan dan kesulitan sebagai bukti bahwa seseorang kurang berusaha.
> * **Respons Etis Menungsa:** Tawarkan langkah yang cukup kecil dan realistis berdasarkan waktu, tenaga, uang, akses, dan kondisi pembaca. Akui dengan jelas bagian yang memang tidak dapat dikendalikan oleh individu.
> * **Prinsip Utama:** **Perluas pilihan yang nyata, bukan tuntutan untuk mengendalikan semuanya.**

#### 5. Rasa Memiliki & Kebersamaan (`belonging` · M04)

* **Kebutuhan Psikologis:** Kebutuhan memiliki tempat untuk berinteraksi dan diterima tanpa harus membuktikan diri.
* **Mengapa Menarik:** Menyediakan tempat berlindung dari kesepian sosial akut melalui humor, bahasa santai, dan solidaritas senasib.
* **Versi Berbahaya (Manosphere):** Kelompok berbasis permusuhan bersama (*us vs them*), ruang gema yang menolak kelembutan, dan radikalisasi anggota rentan.
* **Alternatif Etis Menungsa:** Membangun wadah pria yang berakar pada aktivitas bersama (olahraga rekreasional, hobi karya, saling bantu berdampingan).
* **Prinsip Utama:** *Persaudaraan yang tumbuh melalui aktivitas nyata bersama, bukan melalui kebencian bersama.*

> ✏️ **Kotak Revisi Kebutuhan 5 (Rasa Memiliki):**
>
> * **Kebutuhan yang Dicari:** Kebutuhan untuk memiliki hubungan dan tempat di mana seseorang dapat hadir tanpa terus-menerus membuktikan kemampuan, status, atau kesesuaian dirinya.
> * **Mengapa Ini Menarik:** Kebersamaan memberi pengalaman bahwa seseorang dikenali, dibutuhkan, dan memiliki orang lain untuk berbagi waktu, kegiatan, atau percakapan.
> * **Jalan Pintas yang Berbahaya:** Membangun solidaritas melalui musuh bersama, memperkuat identitas “kita melawan mereka”, atau menjadikan kesetiaan pada kelompok sebagai syarat untuk diterima.
> * **Respons Etis Menungsa:** Bangun kebersamaan melalui percakapan, aktivitas, humor, saling membantu, dan pengalaman bersama tanpa mensyaratkan semua anggota memiliki pandangan, gaya hidup, atau bentuk maskulinitas yang sama.
> * **Prinsip Utama:** **Bangun rasa memiliki dari apa yang dilakukan bersama, bukan dari siapa yang dibenci bersama.**

#### 6. Makna, Arah & Kontribusi (`purpose` · M09)

* **Kebutuhan Psikologis:** Kebutuhan eksistensial untuk memiliki tujuan hidup yang lebih besar dari diri sendiri, melindungi orang terkasih, dan berguna bagi sesama.
* **Mengapa Menarik:** Menawarkan tujuan dan peran yang dirasa berarti dalam kehidupan nyata.
* **Versi Berbahaya (Manosphere):** Glorifikasi kekerasan, retorika perang suci, fantasi dominasi agresif, dan sindrom pahlawan yang manipulatif.
* **Alternatif Etis Menungsa:** Dukung tujuan yang berarti bagi pembaca, termasuk merawat diri, hubungan, dan lingkungan.
* **Prinsip Utama:** *Beri ruang untuk berkontribusi tanpa menjadikannya syarat harga diri.*

> ✏️ **Kotak Revisi Kebutuhan 6 (Makna Hidup):**
>
> * **Kebutuhan yang Dicari:** Kebutuhan untuk merasa bahwa waktu, hubungan, pekerjaan, minat, atau tindakan seseorang memiliki arti yang dianggap penting olehnya.
> * **Mengapa Ini Menarik:** Memiliki sesuatu yang dianggap berarti dapat memberi arah pada keputusan sehari-hari dan membantu seseorang menentukan apa yang ingin ia jaga, bangun, atau kejar.
> * **Jalan Pintas yang Berbahaya:** Menentukan satu misi hidup yang dianggap wajib bagi semua laki-laki—menjadi penyedia, pelindung, pemenang, pemimpin, atau pejuang—dan menjadikannya ukuran nilai seseorang.
> * **Respons Etis Menungsa:** Beri ruang bagi pembaca untuk menentukan sendiri apa yang dianggap berarti: hubungan, keluarga, pekerjaan, belajar, kesehatan, karya, komunitas, kesenangan, atau bentuk kontribusi lain. Tujuan hidup tidak harus heroik atau sama bagi semua orang.
> * **Prinsip Utama:** **Bantu orang menemukan apa yang berarti tanpa menentukan untuk apa hidup mereka seharusnya digunakan.**

#### Ringkasan Enam Ketegangan Editorial

| Kebutuhan | Menungsa memberi | Menungsa menghindari |
| --- | --- | --- |
| Orientasi | Kejelasan | Kepastian palsu |
| Pengakuan | Pengakuan pengalaman | Kambing hitam |
| Kompetensi | Perkembangan kemampuan | Hierarki nilai manusia |
| Agency | Pilihan nyata | Ilusi kontrol total |
| Belonging | Kebersamaan | Musuh bersama |
| Purpose | Makna yang dipilih sendiri | Misi hidup yang dipaksakan |

> **Inti penerapan:** Menungsa tidak perlu menolak kebutuhan yang membuat narasi sederhana terasa menarik; Menungsa perlu menawarkan cara yang lebih jujur, manusiawi, dan tidak merugikan untuk menjawabnya.

---

## 6. Halaman 4: Periksa Draf (Copy Sandbox)

*Lokasi: `src/components/views-v2/CopySandboxView.tsx` (rute `#sandbox`)*

*(Catatan: Daftar 10.946 kata individual sengaja ditiadakan sesuai instruksi, namun seluruh teks antarmuka, preset uji, evaluasi diagnosis, dan daftar periksa naskah disertakan lengkap).*

### 6.1. Header & Pengantar Fitur

* **Kicker Saat Ini:** `Pemeriksaan kata dan frasa`
  > ✏️ **Kotak Revisi Kicker:** `Cek Draf Tulisan`
  >
* **Judul Utama Saat Ini:** `Lab Uji Draf Naskah & Cheatsheet Kosakata`
  > ✏️ **Kotak Revisi Judul:** `Periksa Draf sebelum Dipublikasikan`
  >
* **Deskripsi Saat Ini:** `Uji draf naskah Anda secara langsung dengan sistem pencocokan kata & frasa terkalibrasi. Temukan apakah tulisan Anda berpotensi memicu rasa bersalah (bumerang moral), klise maskulin canggung (cringe), intimidasi klinis, atau sudah selaras dengan gaya membumi Menungsa.`
  > ✏️ **Kotak Revisi Deskripsi:**
  > Tempel draf tulisan untuk melihat kata atau frasa yang mungkin perlu ditinjau kembali. Pemeriksaan akan menandai bahasa yang berpotensi menghakimi, terlalu memaksa, terlalu klinis, atau kurang sesuai dengan Voice Menungsa; lalu menunjukkan alternatif yang bisa dipertimbangkan.
  >

---

### 6.2. Naskah Contoh Preset Pengujian (Presets 1–4)

#### Preset 1: Ajakan yang Menekan dengan Rasa Bersalah

* **Label Saat Ini:** `1. Contoh ajakan yang menghakimi`
* **Teks Naskah Saat Ini:**
  > *"Sebagai pria sejati, kamu wajib sadar bahwa memendam rasa sakit adalah dosa moral dan aib besar. Jangan jadi pengecut yang lari dari tanggung jawab, bertobatlah dan hadapi beban hidupmu sekarang juga!"*
  >

> ✏️ **Kotak Revisi Preset 1:**
>
> - Label: `Menghakimi`
> - Naskah: “Kalau kamu benar-benar ingin membaik, kamu harus mulai berani cerita. Terus memilih diam hanya membuatmu semakin jauh dari perubahan, jadi jangan terus lari dari masalah.”

#### Preset 2: Maskulinitas sebagai Standar

* **Label Saat Ini:** `2. Contoh tuntutan maskulinitas`
* **Teks Naskah Saat Ini:**
  > *"Bangkitlah wahai para pria alfa! Jangan biarkan dirimu menjadi cowok cemen yang mudah mengeluh. Taklukkan harimu dengan disiplin besi dan buktikan siapa pejantan tangguh sebenarnya di sini."*
  >

> ✏️ **Kotak Revisi Preset 2:**
>
> - Label: `Tuntutan Maskulinitas`
> - Naskah: “Laki-laki kuat bukan yang terus mengeluh, tapi yang tetap jalan meski keadaan berat. Ambil kendali, disiplinkan diri, dan buktikan bahwa masalah tidak lebih kuat dari kamu.”

#### Preset 3: Diagnosis Tanpa Dasar & Tuntutan Membuka Diri

* **Label Saat Ini:** `3. Contoh diagnosis dan desakan bercerita`
* **Teks Naskah Saat Ini:**
  > *"Kamu sedang mengalami burnout akut dan trauma masa kecil yang belum sembuh. Jangan pura-pura kuat, segera tumpahkan semuanya, buka lukamu di sini dan konsultasi sekarang sebelum terlambat!"*
  >

> ✏️ **Kotak Revisi Preset 3:**
>
> - Label: `Diagnosis Berlebihan`
> - Naskah: “Kalau belakangan kamu susah tidur, sulit fokus, dan mulai menjauh dari orang lain, berarti kamu sedang mengalami burnout atau depresi. Ceritakan semuanya di sini supaya kami bisa tahu apa yang sebenarnya terjadi dan menentukan bantuan yang kamu butuhkan.”

#### Preset 4: Ajakan yang Memberi Ruang Memilih

* **Label Saat Ini:** `4. Contoh ajakan yang memberi pilihan`
* **Teks Naskah Saat Ini:**
  > *"Langkah pertama tidak harus langsung besar. Duduk sejenak di meja kerja, rapikan catatan tugas, dan nikmati secangkir kopi hangat. Tubuh kita memang butuh jeda sejenak untuk memulihkan tenaga."*
  >

> ✏️ **Kotak Revisi Preset 4:**
>
> - Label: `Memberi Pilihan`
> - Naskah: “Kalau mau mulai dari hal kecil, coba catat satu perubahan yang paling mudah kamu kenali dari beberapa hari terakhir. Kamu nggak harus langsung tahu penyebabnya.”

---

### 6.3. Pesan Status Diagnosis Mesin Evaluasi

#### 1. Status `EMPTY`

* **Judul Saat Ini:** `Belum ada draf`
* **Deskripsi Saat Ini:** Tulis atau tempel draf di kotak naskah, atau pilih contoh untuk mencoba pemeriksaan.
* **Saran Penulis Saat Ini:** Pilih contoh atau masukkan draf yang ingin diperiksa.

> ✏️ **Kotak Revisi Status EMPTY:**
>
> - Judul: Coba tulis drafmu di sini dan cek hasilnya
> - Deskripsi: Tulis atau tempel draf di kotak naskah. Kamu juga bisa memilih salah satu contoh untuk mencoba fitur ini.
> - Saran: Belum punya draf? Mulai dari salah satu contoh yang telah disediakan.

#### 2. Status `HIGH_MORAL`

* **Judul Saat Ini:** `Ada istilah yang perlu diperiksa konteksnya`
* **Deskripsi Saat Ini:** Terdeteksi kata bernada sanksi moral/keharusan mutlak. Gaya ini memicu resistensi batin (reactance) seketika pada pembaca pria dewasa.
* **Saran Penulis Saat Ini:** Periksa apakah kata yang ditandai benar-benar menghakimi atau memaksa. Kata “harus” dan “wajib” juga dapat muncul dalam penjelasan yang tepat.

> ✏️ **Kotak Revisi Status HIGH_MORAL:**
>
> - Judul: `Periksa nada menghakimi`
> - Deskripsi: `Ada kata atau frasa yang dapat terdengar seperti kewajiban moral, penilaian, atau tuntutan terhadap pembaca. Maknanya tetap bergantung pada konteks.`
> - Saran: `Baca ulang bagian yang ditandai. Jika tidak benar-benar diperlukan, ubah tuntutan menjadi pilihan atau jelaskan alasan di balik arahan tersebut.`

#### 3. Status `CRINGE_ALERT`

* **Judul Saat Ini:** `Ada istilah tentang standar maskulinitas`
* **Deskripsi Saat Ini:** Terdeteksi istilah klise seperti kasta maskulinitas ("alfa", "pejantan", "pria sejati"). Pembaca merasa canggung dan menganggap naskah tidak tulus.
* **Saran Penulis Saat Ini:** Periksa apakah kalimat menjadikan ketangguhan, penghasilan, atau pencapaian sebagai ukuran harga diri.

> ✏️ **Kotak Revisi Status CRINGE_ALERT:**
>
> - Judul: `Periksa standar maskulinitas`
> - Deskripsi: `Ada istilah yang dapat menjadikan kekuatan, status, penampilan, atau pencapaian sebagai ukuran seperti apa laki-laki seharusnya.`
> - Saran: `Pastikan nilai seseorang tidak ditentukan oleh ketangguhan, penghasilan, penampilan, dominasi, atau label seperti “pria sejati”.`

#### 4. Status `CLINICAL_ALERT`

* **Judul Saat Ini:** `Ada istilah kesehatan mental`
* **Deskripsi Saat Ini:** Terdeteksi diagnosis medis atau label psikologis ("depresi", "trauma", "burnout"). Ini berisiko memicu rasa malu sosial dicap abnormal.
* **Saran Penulis Saat Ini:** Pastikan istilah klinis digunakan dengan tepat dan dijelaskan bila perlu. Jangan menghapus istilah diagnosis dari materi edukasi hanya karena ditandai.

> ✏️ **Kotak Revisi Status CLINICAL_ALERT:**
>
> - Judul: `Periksa penggunaan istilah klinis`
> - Deskripsi: `Ada istilah kesehatan mental atau diagnosis yang membutuhkan konteks dan tingkat kepastian yang tepat.`
> - Saran: `Pastikan istilah tidak digunakan untuk mendiagnosis pembaca. Jelaskan artinya jika membantu, dan bedakan tanda yang mungkin muncul dari diagnosis yang membutuhkan penilaian profesional.`

#### 5. Status `IMPERATIVE_ALERT`

* **Judul Saat Ini:** `Ada ajakan yang perlu diperiksa`
* **Deskripsi Saat Ini:** Terdeteksi pemaksaan pengakuan ("buka hatimu", "tumpahkan semuanya"). Pria cenderung menutup diri jika dipaksa terbuka di ruang umum.
* **Saran Penulis Saat Ini:** Periksa apakah ajakan memberi pilihan atau justru mendesak pembaca membagikan hal pribadi.

> ✏️ **Kotak Revisi Status IMPERATIVE_ALERT:**
>
> - Judul: `Periksa desakan untuk membuka diri`
> - Deskripsi: `Ada ajakan yang dapat terdengar menekan pembaca untuk bercerita, mengakui sesuatu, atau membagikan pengalaman pribadi.`
> - Saran: `Beri pembaca pilihan tentang apakah, kapan, dan seberapa jauh mereka ingin berbagi. Hindari menjadikan keterbukaan sebagai syarat untuk mendapat dukungan.`

#### 6. Status `CALIBRATED`

* **Judul Saat Ini:** `Ada kata yang tercatat sebagai contoh bahasa konkret`
* **Deskripsi Saat Ini:** Kecocokan kata belum menunjukkan apakah seluruh naskah sesuai panduan. Baca ulang konteks, klaim, dan ajakannya.
* **Saran Penulis Saat Ini:** Lanjutkan dengan tinjauan manual sebelum menerbitkan.

> ✏️ **Kotak Revisi Status CALIBRATED:**
>
> - Judul: `Ada pola bahasa yang sesuai panduan`
> - Deskripsi: `Beberapa kata atau frasa cocok dengan contoh bahasa yang lebih konkret, proporsional, atau memberi pilihan. Ini belum berarti seluruh naskah sudah sesuai.`
> - Saran: `Tetap periksa konteks, fakta, tingkat kepastian klaim, dan ajakan yang diberikan kepada pembaca.`

#### 7. Status `NEUTRAL`

* **Judul Saat Ini:** `Tinjau naskah secara utuh`
* **Deskripsi Saat Ini:** Tidak banyak istilah yang ditandai. Hasil ini tidak memastikan ketepatan isi atau kesesuaian nada.
* **Saran Penulis Saat Ini:** Periksa konteks, fakta, dan pilihan yang diberikan kepada pembaca.

> ✏️ **Kotak Revisi Status NEUTRAL:**
>
> - Judul: `Tidak ada pola utama yang terdeteksi`
> - Deskripsi: `Tidak banyak kata atau frasa dalam draf ini yang cocok dengan pola pemeriksaan. Hasil ini belum menilai ketepatan isi atau keseluruhan nada tulisan.`
> - Saran: `Baca ulang naskah secara utuh dan periksa konteks, fakta, asumsi tentang pembaca, serta pilihan yang diberikan.`

> **Model tampilan status:**
>
> * **Perlu diperiksa:** `HIGH_MORAL`, `CRINGE_ALERT`, `CLINICAL_ALERT`, `IMPERATIVE_ALERT`
> * **Sinyal positif:** `CALIBRATED`
> * **Belum cukup sinyal:** `NEUTRAL`
>
> Hasil pemeriksaan memberi petunjuk untuk tinjauan manual, bukan vonis “salah”, “benar”, atau “aman”. Semua imperatif juga tidak otomatis buruk; arahan darurat seperti pergi ke IGD dapat tepat. Jika matcher menandai imperatif umum, pisahkan logika itu dari desakan untuk membuka diri.

---

### 6.4. Daftar Periksa Naskah Sebelum Terbit (Checklist)

* **Poin 1 Saat Ini:** `Kalimat tidak mempermalukan atau memaksa pembaca. Nilai kata seperti “harus” sesuai konteksnya.`
  > ✏️ **Kotak Revisi Poin 1:** `[Tulis versi revisi Anda di sini...]`
  >
* **Poin 2 Saat Ini:** `Harga diri pembaca tidak dibuat bergantung pada standar maskulinitas tertentu.`
  > ✏️ **Kotak Revisi Poin 2:** `[Tulis versi revisi Anda di sini...]`
  >
* **Poin 3 Saat Ini:** `Istilah kesehatan mental digunakan dengan tepat; pembaca tidak didiagnosis atau dipaksa bercerita.`
  > ✏️ **Kotak Revisi Poin 3:** `[Tulis versi revisi Anda di sini...]`
  >
* **Poin 4 Saat Ini:** `Ajakan memberi pilihan yang nyata; instruksi darurat tetap jelas dan langsung.`
  > ✏️ **Kotak Revisi Poin 4:** `[Tulis versi revisi Anda di sini...]`
  >
* **Pesan Selesai Saat Ini:** `Empat poin sudah kamu tandai. Tetap periksa fakta dan konteks naskah.`
  > ✏️ **Kotak Revisi Pesan Selesai:** `[Tulis versi revisi Anda di sini...]`
  >

---

### 6.5. 20 Rumpun Penjelasan Dampak & Saran Penulisan (Family Rationale K01–K20)

Berikut adalah 20 rumpun penjelasan dampak (*impact*) dan saran penulisan (*replacement*) yang muncul ketika kosakata terdeteksi:

#### K-01 (Istilah Pop & Diagnosis Medis)

* **Hal yang diperhatikan Saat Ini:** Istilah ini perlu diperiksa: apakah digunakan untuk edukasi, kutipan, atau menyimpulkan kondisi pembaca?
* **Saran penulisan Saat Ini:** Jelaskan istilah bila perlu. Hindari menjanjikan kesembuhan atau mendiagnosis pembaca dari jauh.

> ✏️ **Kotak Revisi K-01:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-02 (Slogan Hiper-Maskulin / Jargon Manosphere)

* **Hal yang diperhatikan Saat Ini:** Frasa ini dapat memuat tuntutan tentang laki-laki yang dianggap ideal.
* **Saran penulisan Saat Ini:** Periksa apakah harga diri dikaitkan dengan ketangguhan atau pencapaian. Jelaskan tindakan tanpa membuat syarat harga diri.

> ✏️ **Kotak Revisi K-02:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-03 (Label Abnormalitas Mental)

* **Hal yang diperhatikan Saat Ini:** Istilah kesehatan mental perlu digunakan dengan konteks dan penjelasan yang tepat.
* **Saran penulisan Saat Ini:** Pertahankan istilah jika relevan untuk edukasi. Ubah kalimat yang menyimpulkan diagnosis pembaca tanpa penilaian profesional.

> ✏️ **Kotak Revisi K-03:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-04 (Penghakiman Moral & Spiritual)

* **Hal yang diperhatikan Saat Ini:** Periksa apakah istilah ini menilai atau mempermalukan pembaca, atau hanya muncul dalam kutipan dan pembahasan.
* **Saran penulisan Saat Ini:** Jelaskan perilaku atau situasinya tanpa menyerang harga diri atau keimanan seseorang.

> ✏️ **Kotak Revisi K-04:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-05 (Perintah Agresif & Motivasi Toksik)

* **Hal yang diperhatikan Saat Ini:** Kalimat perintah ini dapat terasa menekan atau mendikte pembaca.
* **Saran penulisan Saat Ini:** Tawarkan pilihan atau tindakan nyata yang dapat diambil, tanpa nada memaksa.

> ✏️ **Kotak Revisi K-05:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-06 (Desakan Mengungkap Kerentanan)

* **Hal yang diperhatikan Saat Ini:** Ajakan ini menuntut pembaca membagikan hal pribadi di ruang terbuka.
* **Saran penulisan Saat Ini:** Berikan pilihan untuk mendengarkan dulu atau sediakan kanal respons yang privat.

> ✏️ **Kotak Revisi K-06:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-07 (Label Status & Kasta Pria)

* **Hal yang diperhatikan Saat Ini:** Label ini mengotak-ngotakkan nilai manusia berdasarkan performa atau materi.
* **Saran penulisan Saat Ini:** Fokus pada tanggung jawab dan keahlian nyata tanpa membandingkan kasta maskulinitas.

> ✏️ **Kotak Revisi K-07:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-08 (Jargon Klinis Tanpa Penjelasan)

* **Hal yang diperhatikan Saat Ini:** Istilah klinis yang datang tiba-tiba dapat membingungkan dan menimbulkan kecemasan.
* **Saran penulisan Saat Ini:** Awali dengan penggambaran situasi sehari-hari sebelum memperkenalkan nama istilah medisnya.

> ✏️ **Kotak Revisi K-08:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-09 (Klaim Khasiat / Hasil Tanpa Bukti)

* **Hal yang diperhatikan Saat Ini:** Klaim ini menjanjikan hasil pasti yang belum tentu berlaku bagi setiap orang.
* **Saran penulisan Saat Ini:** Sampaikan sebagai kemungkinan atau salah satu opsi yang dapat dicoba.

> ✏️ **Kotak Revisi K-09:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-10 (Menyalahkan Korban / Masalah Pribadi)

* **Hal yang diperhatikan Saat Ini:** Kalimat ini menyederhanakan masalah struktural atau ekonomi menjadi kesalahan pribadi.
* **Saran penulisan Saat Ini:** Akui keterbatasan situasi dan faktor luar yang memengaruhi beban hidup pembaca.

> ✏️ **Kotak Revisi K-10:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-11 (Generalisasi Seluruh Laki-laki)

* **Hal yang diperhatikan Saat Ini:** Kalimat ini menggeneralisasi sifat atau perilaku semua pria tanpa dasar.
* **Saran penulisan Saat Ini:** Gunakan kata pembatas seperti 'sebagian pria' atau sebutkan konteks kelompok yang spesifik.

> ✏️ **Kotak Revisi K-11:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-12 (Tuntutan 'Pria Harus Menjadi Tulang Punggung')

* **Hal yang diperhatikan Saat Ini:** Kalimat ini menekan pembaca dengan peran ekonomi tunggal tanpa mengakui batas kemampuan.
* **Saran penulisan Saat Ini:** Akui beratnya beban nafkah tanpa menjadikannya tolak ukur tunggal kelayakan diri.

> ✏️ **Kotak Revisi K-12:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-13 (Kiasan Puitis di Saat Krisis)

* **Hal yang diperhatikan Saat Ini:** Kiasan abstrak di situasi darurat memperlambat tindakan penyelamatan.
* **Saran penulisan Saat Ini:** Gunakan petunjuk langsung: hubungi nomor bantuan, datangi IGD, atau dampingi orang terdekat.

> ✏️ **Kotak Revisi K-13:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-14 (Ejekan Terhadap Fisik / Kemampuan)

* **Hal yang diperhatikan Saat Ini:** Sindiran ini merendahkan fisik atau stamina orang lain.
* **Saran penulisan Saat Ini:** Arahkan pada kesehatan fungsional dan kebugaran jangka panjang tanpa mempermalukan tubuh.

> ✏️ **Kotak Revisi K-14:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-15 (Memaksa Kerapuhan / Menangis)

* **Hal yang diperhatikan Saat Ini:** Desakan untuk menangis atau meratapi nasib dapat memicu rasa risih sosial.
* **Saran penulisan Saat Ini:** Beri ruang bagi pembaca untuk mengekspresikan perasaannya dengan caranya sendiri.

> ✏️ **Kotak Revisi K-15:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-16 (Asumsi Pengalaman Bersama / 'Kita Semua Pasti')

* **Hal yang diperhatikan Saat Ini:** Penggunaan kata 'kita' yang memaksakan anggapan bahwa semua orang merasakan hal serupa.
* **Saran penulisan Saat Ini:** Pisahkan antara apa yang diamati tim dan apa yang mungkin dialami sebagian pembaca.

> ✏️ **Kotak Revisi K-16:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-17 (Janji Layanan yang Belum Diverifikasi)

* **Hal yang diperhatikan Saat Ini:** Menyebutkan jam buka atau tarif layanan yang belum dipastikan kebenarannya.
* **Saran penulisan Saat Ini:** Arahkan pembaca untuk mengonfirmasi langsung ke kontak resmi faskes terkait.

> ✏️ **Kotak Revisi K-17:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-18 (Mengecilkan Keluhan Orang Lain)

* **Hal yang diperhatikan Saat Ini:** Membandingkan penderitaan seseorang dengan orang lain yang dianggap lebih susah.
* **Saran penulisan Saat Ini:** Validasi keluhan yang sedang dialami tanpa membuat hierarki penderitaan.

> ✏️ **Kotak Revisi K-18:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-19 (Sapaan Gaul yang Dipaksakan)

* **Hal yang diperhatikan Saat Ini:** Bahasa gaul tongkrongan dari akun organisasi resmi terdengar tidak tulus (*cringe*).
* **Saran penulisan Saat Ini:** Gunakan sapaan 'kamu' yang tenang, ramah, dan bersahaja.

> ✏️ **Kotak Revisi K-19:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

#### K-20 (Bahasa Membumi & Deskriptif)

* **Hal yang diperhatikan Saat Ini:** Kosakata ini selaras dengan pendekatan Menungsa (deskripsi konkret, situasi terlihat).
* **Saran penulisan Saat Ini:** Pertahankan gaya bahasa ini dan pastikan alur kalimat tetap mengalir wajar.

> ✏️ **Kotak Revisi K-20:**
>
> - Perhatian: [Tulis versi revisi Anda di sini...]
> - Saran: [Tulis versi revisi Anda di sini...]

---

## 7. Halaman 5: Konteks Indonesia (Indonesian Nuances)

*Lokasi: `src/components/views-v2/IndonesianNuancesView.tsx` (rute `#indonesia`)*

### 7.1. Header & Tiga Pertimbangan Konteks Utama

* **Judul Utama Saat Ini:** `Menulis untuk pembaca Indonesia`
  > ✏️ **Kotak Revisi Judul:** `Menulis dalam Konteks Indonesia`
  >
* **Paragraf Pengantar Saat Ini:** `Pertimbangkan hubungan sosial, akses layanan, dan keragaman pembaca saat menulis. Panduan ini merangkum temuan yang tersedia beserta batas penerapannya di Indonesia.`
  > ✏️ **Kotak Revisi Pengantar:**
  > Indonesia bukan satu konteks yang seragam. Hubungan keluarga, agama, kondisi ekonomi, bahasa, akses layanan, dan norma sosial dapat berbeda menurut daerah, usia, kelas sosial, dan lingkungan tempat seseorang hidup. Gunakan panduan ini untuk mempertimbangkan konteks tersebut tanpa menganggap satu pola berlaku bagi semua pembaca.
  >

#### Tiga Pertimbangan Konteks Utama

1. **Ruang Publik vs Ruang Privat Saat Ini:**

   > *Di ruang publik, bahas emosi tanpa meminta pembaca membagikan pengalaman pribadi. Jika ada ajakan bercerita, jelaskan siapa yang bisa melihat responsnya dan tawarkan pilihan privat. Ruang tertutup pun tetap memerlukan persetujuan dan batas kerahasiaan yang jelas.*
   > ✏️ **Kotak Revisi Pertimbangan 1 — Siapa yang Bisa Melihat?:**
   > Sebelum meminta respons atau cerita pribadi, pertimbangkan siapa yang dapat melihatnya. Di ruang publik atau grup, beri informasi tanpa menuntut pengakuan pribadi. Jika percakapan membutuhkan keterbukaan lebih jauh, sediakan jalur yang lebih privat dan jelaskan batas privasinya.
   >
2. **Privasi dan Kekhawatiran Dinilai Saat Ini:**

   > *Jangan menyimpulkan kondisi kesehatan mental pembaca dari jauh. Istilah seperti depresi dapat dibahas sebagai informasi, tanpa menjadikannya penilaian terhadap harga diri seseorang.*
   > ✏️ **Kotak Revisi Pertimbangan 2 — Siapa yang Ikut Memengaruhi Keputusan?:**
   > Keluarga, teman, komunitas, dan keyakinan dapat menjadi sumber dukungan, tekanan, atau keduanya sekaligus. Jangan menganggap keterlibatan mereka selalu membantu atau selalu menghambat. Beri pembaca pilihan tentang siapa yang ingin mereka libatkan.
   >
3. **Aktivitas Fisik Bersama Saat Ini:**

   > *Kegiatan bersama dapat menjadi salah satu cara membuka percakapan. Beri peserta pilihan untuk bercerita atau tidak; jangan menganggap kegiatan fisik selalu membuat semua orang nyaman.*
   > ✏️ **Kotak Revisi Pertimbangan 3 — Apa yang Benar-Benar Bisa Diakses?:**
   > Jangan menganggap seseorang belum mencari bantuan hanya karena malu atau enggan terbuka. Biaya, jarak, jadwal kerja, transportasi, ketersediaan tenaga, prosedur layanan, dan kekhawatiran soal privasi juga dapat membatasi pilihan. Jika menyarankan layanan, berikan informasi akses yang sudah diverifikasi.
   >

---

### 7.2. 11 Pertimbangan Konteks Indonesia (KT01–KT11)

#### KT01: Komunitas & Kebersamaan Sebaya

* **Saran untuk Penulis Saat Ini:** Gunakan bingkai kebersamaan dan wadah saling dukung, bukan menyuruh pria berjuang sendirian secara terisolasi.
* **DO Saat Ini:** `"Minggu pagi kita sepedaan santai keliling kanal, mampir sarapan bubur ayam di tikungan. Boleh gabung, boleh cuma ikut ngopi."`
* **DON'T Saat Ini:** `"Kamu yang merasa kesepian dan terisolasi, datanglah ke sesi konseling kelompok terbuka ini untuk mencurahkan isi hatimu."`

> ✏️ **Kotak Revisi KT01:**
>
> - Saran Penulis: Gunakan kebersamaan sebagai salah satu cara membangun hubungan, tanpa menganggap kedekatan harus dimulai dari cerita pribadi. Buat orang bisa hadir dan ikut kegiatan tanpa harus membuktikan keterbukaan atau keakraban.
> - DO: “Minggu pagi kita jalan santai di [lokasi]. Datang buat jalan bareng aja juga boleh—nggak ada sesi cerita wajib.”
> - DON'T: “Kalau kamu merasa kesepian, datang dan ceritakan apa yang selama ini kamu pendam ke kelompok.”

#### KT02: Realitas Finansial & Biaya Hidup

* **Saran untuk Penulis Saat Ini:** Akui persoalan biaya hidup dan akses layanan jika relevan. Jangan menjadikan kemampuan bekerja atau menafkahi sebagai alasan seseorang pantas mendapat bantuan.
* **DO Saat Ini:** `"Mencukupi belanja dapur dan cicilan setiap akhir bulan memang menguras banyak tenaga dan pikiran. Wajar kalau badanmu butuh istirahat sejenak malam ini."`
* **DON'T Saat Ini:** `"Singkirkan dulu urusan uangmu, fokuslah pada self-love dan ketenangan batinmu terlebih dahulu."`

> ✏️ **Kotak Revisi KT02:**
>
> - Saran Penulis: Pertimbangkan biaya hidup, pendapatan, waktu kerja, dan tanggungan ketika menyarankan bantuan atau perubahan perilaku. Jangan menganggap keterbatasan uang sebagai kurangnya komitmen terhadap kesehatan mental.
> - DO: “Dengan penghasilan yang sama, kebutuhan makan, transportasi, cicilan, dan kiriman ke keluarga bisa saling berebut porsi. Sulit menyisihkan biaya untuk bantuan bukan otomatis soal kurang disiplin mengatur uang.”
> - DON'T: “Kesehatan mental harus jadi prioritas. Kalau memang serius, pasti ada cara menyisihkan uang untuk terapi.”

#### KT03: Tuntutan Tangguh & Pantang Lemah

* **Saran untuk Penulis Saat Ini:** Akui kebutuhan beristirahat tanpa mengaitkan harga diri dengan ketangguhan atau produktivitas.
* **DO Saat Ini:** `"Kamu boleh beristirahat meski pekerjaan belum semuanya selesai."`
* **DON'T Saat Ini:** `"Laki-laki kok takut mengeluh? Jangan sok kuat deh, ayo buang gengsimu dan menangislah sekarang!"`

> ✏️ **Kotak Revisi KT03:**
>
> - Saran Penulis: Jangan melawan tuntutan “laki-laki harus kuat” dengan standar baru tentang seperti apa laki-laki yang benar-benar kuat. Pisahkan kebutuhan akan bantuan, istirahat, atau keterbukaan dari ukuran maskulinitas.
> - DO: “Belum siap cerita bukan berarti kamu gagal menghadapi masalah. Kamu bisa mulai dari bagian yang terasa cukup aman untuk dibicarakan—atau cukup mendengarkan dulu.”
> - DON'T: “Laki-laki yang benar-benar kuat justru berani terbuka dan menangis.”

#### KT04: Agama, Spiritualitas & Ikhtiar

* **Saran untuk Penulis Saat Ini:** Gunakan kerangka keagamaan hanya jika sesuai dengan audiens. Jangan menghubungkan keluhan dengan kadar keimanan.
* **DO Saat Ini:** `"Jika doa penting bagimu, mencari bantuan profesional dapat berjalan bersama kebiasaan itu."`
* **DON'T Saat Ini:** `"Masalah jiwamu itu bukan urusan medis, itu bukti kamu kurang beribadah dan jauh dari Tuhan."`

> ✏️ **Kotak Revisi KT04:**
>
> - Saran Penulis: Gunakan kerangka agama atau spiritualitas ketika memang relevan bagi penutur atau audiens. Jangan menjelaskan masalah kesehatan mental sebagai ukuran kualitas iman, dan jangan memosisikan dukungan spiritual serta layanan profesional sebagai dua pilihan yang harus saling menggantikan.
> - DO: “Kalau doa atau ibadah penting bagimu, itu bisa tetap menjadi bagian dari caramu menghadapi masa sulit. Mencari bantuan profesional juga bisa berjalan bersamaan.”
> - DON'T: “Kalau kamu masih cemas, mungkin kamu perlu memperbaiki ibadah dulu sebelum mencari bantuan lain.”

#### KT05: Keluarga & Pengambilan Keputusan

* **Saran untuk Penulis Saat Ini:** Sediakan informasi yang juga dapat digunakan orang terdekat untuk membantu, dengan tetap menghormati pilihan pembaca.
* **DO Saat Ini:** `"Kalau orang terdekatmu tampak kesulitan, kamu bisa bertanya, “Ada yang bisa kubantu hari ini?” Beri ruang jika ia belum ingin bercerita."`
* **DON'T Saat Ini:** `"Laki-laki dewasa kok apa-apa harus diatur istrinya? Urus sendiri kesehatan mentalmu secara mandiri!"`

> ✏️ **Kotak Revisi KT05:**
>
> - Saran Penulis: Keluarga dapat menjadi sumber dukungan sekaligus tekanan. Jangan otomatis melibatkan keluarga dalam keputusan kesehatan seseorang; beri pembaca pilihan tentang siapa yang ingin mereka libatkan.
> - DO: “Kalau kamu ingin ditemani saat mencari bantuan, pilih orang yang kamu percaya. Kamu juga boleh memilih mengurusnya sendiri.”
> - DON'T: “Sebaiknya ceritakan dulu ke keluarga sebelum mencari bantuan profesional.”

#### KT06: Nafkah, Peran Keluarga & Harga Diri

* **Saran untuk Penulis Saat Ini:** Akui tekanan ekonomi tanpa mengukur harga diri dari penghasilan atau kemampuan menafkahi.
* **DO Saat Ini:** `"Memikirkan kebutuhan keluarga bisa menguras tenaga. Kebutuhanmu sendiri juga layak diperhatikan."`
* **DON'T Saat Ini:** `"Tinggalkan konsep usang kepala keluarga pencari nafkah, itu cuma jebakan patriarki yang merusakmu!"`

> ✏️ **Kotak Revisi KT06:**
>
> - Saran Penulis: Akui bahwa tanggung jawab finansial dan peran sebagai pencari nafkah dapat terasa penting bagi sebagian laki-laki. Jangan menjadikan kemampuan memenuhi peran tersebut sebagai ukuran martabat atau nilai diri.
> - DO: “Tanggung jawab pada keluarga bisa terasa penting sekaligus berat. Besarnya penghasilan tidak menentukan seberapa layak seseorang dihargai.”
> - DON'T: “Sebagai kepala keluarga, kamu harus tetap kuat karena semua orang bergantung padamu.”
>
> **Batas dengan KT02:** KT02 membahas kondisi material; KT06 membahas makna sosial dan harga diri yang melekat pada peran pencari nafkah.

#### KT07: Privasi, Reputasi & Pengawasan Sosial

* **Saran untuk Penulis Saat Ini:** Jelaskan siapa yang dapat mengakses informasi peserta, bagaimana data digunakan, dan batas kerahasiaannya sesuai kebijakan layanan.
* **DO Saat Ini:** `"Sebelum sesi dimulai, kami akan menjelaskan siapa yang dapat mengakses informasi yang kamu bagikan dan batas kerahasiaannya."`
* **DON'T Saat Ini:** `"Ayo berani bersuara di depan warga komplek! Jangan takut dicap aneh oleh tetangga sebelah!"`

> ✏️ **Kotak Revisi KT07:**
>
> - Saran Penulis: Pertimbangkan bukan hanya apakah suatu ruang disebut “privat”, tetapi siapa yang dapat melihat, merekam, meneruskan, atau mengetahui partisipasi seseorang. Jangan membuat pencarian bantuan menjadi informasi publik tanpa alasan.
> - DO: “Kalau ingin ikut, daftar lewat [jalur privat]. Nama orang yang mendaftar tidak akan dibagikan ke grup tanpa izin.”
> - DON'T: “Yang mau ikut sesi minggu ini, tulis HADIR di grup supaya kami bisa mendata.”

#### KT08: Jalur Pertama Mencari Pertolongan

* **Saran untuk Penulis Saat Ini:** Hormati kebiasaan pembaca sambil menjelaskan pilihan layanan dan cara mengaksesnya.
* **DO Saat Ini:** `"Jika keluhan mengganggu keseharianmu, cari informasi layanan kesehatan yang tersedia di wilayahmu. Periksa jadwal, biaya, dan cara mendaftar."`
* **DON'T Saat Ini:** `"Jamu dan obat tradisional itu tidak ilmiah dan tak berguna. Langsung pergi ke psikiater spesialis sekarang!"`

> ✏️ **Kotak Revisi KT08:**
>
> - Saran Penulis: Jangan menganggap layanan profesional selalu menjadi tempat pertama seseorang mencari dukungan. Keluarga, teman, tokoh agama, layanan kesehatan primer, atau sumber lain bisa menjadi pintu awal. Tambahkan pilihan profesional ketika dibutuhkan tanpa merendahkan jalur yang sebelumnya digunakan.
> - DO: “Kalau kamu lebih nyaman mulai dari orang yang sudah kamu percaya, itu bisa menjadi langkah awal. Kalau keluhan terus mengganggu keseharian, kamu juga bisa mencari informasi layanan kesehatan yang tersedia di wilayahmu.”
> - DON'T: “Kalau memang serius ingin membaik, langsung cari psikiater. Ngobrol dengan keluarga atau tokoh agama cuma menunda bantuan.”
>
> Menghormati jalur awal bukan berarti semua praktik dianggap sama efektif atau aman. Risiko keselamatan atau intervensi berbahaya tetap membutuhkan batas tegas.

#### KT09: Kebersamaan Tidak Harus Menjadi Curhat

* **Saran untuk Penulis Saat Ini:** Tawarkan kegiatan bersama sebagai salah satu pilihan. Jangan mewajibkan peserta menceritakan pengalaman pribadi.
* **DO Saat Ini:** `"Malam ini kita nobar bola bareng di pos ronda sambil ngopi. Kalau lagi penat kerjaan, cukup duduk santai bareng kawan-kawan tanpa harus ada sesi curhat formal."`
* **DON'T Saat Ini:** `"Mumpung lagi kumpul nongkrong, yuk saling buka luka masa lalu dan ceritakan trauma terbesarmu satu per satu!"`

> ✏️ **Kotak Revisi KT09:**
>
> - Saran Penulis: Aktivitas bersama dapat menjadi bentuk hubungan yang bermakna tanpa harus berubah menjadi sesi keterbukaan emosional. Jangan menganggap kedekatan hanya sah ketika orang saling menceritakan masalah pribadi.
> - DO: “Datang buat main, makan, atau duduk bareng juga cukup. Nggak ada sesi cerita wajib.”
> - DON'T: “Supaya lebih dekat, nanti setiap orang akan cerita masalah pribadi secara bergiliran.”
>
> Jangan membuat “male-friendly” identik dengan bola, motor, kopi, bengkel, atau aktivitas maskulin stereotip. Gunakan kegiatan yang memang relevan dengan komunitasnya.

#### KT10: Hambatan Akses Bukan Cuma Stigma

* **Saran untuk Penulis Saat Ini:** Jelaskan lokasi, jadwal, biaya, dan cara mendaftar yang sudah diverifikasi. Akui hambatan layanan tanpa menyalahkan pembaca.
* **DO Saat Ini:** `"Untuk berkonsultasi di [nama fasilitas], periksa jadwal, biaya, persyaratan, dan cara mendaftar melalui [tautan resmi]."`
* **DON'T Saat Ini:** `"Satu-satunya yang menghalangimu berobat adalah egomu sendiri. Buang gengsimu sekarang juga!"`

> ✏️ **Kotak Revisi KT10:**
>
> - Saran Penulis: Sebelum menjelaskan pencarian bantuan sebagai persoalan malu, gengsi, atau maskulinitas, pertimbangkan juga biaya, jarak, jam layanan, transportasi, ketersediaan tenaga, prosedur rujukan, antrean, dan privasi.
> - DO: “Untuk layanan di [fasilitas], pendaftaran tersedia [waktu], biaya atau skema pembiayaannya [informasi terverifikasi], dan cara mendaftarnya [alur]. Kalau informasi ini berubah, cek kembali melalui [kontak resmi].”
> - DON'T: “Kalau belum mencari bantuan, mungkin yang menghalangi kamu cuma gengsi.”

#### KT11: Keragaman Indonesia & Batas Generalisasi

* **Saran untuk Penulis Saat Ini:** Periksa pemahaman pembaca dan catat umpan balik. Jangan mengklaim contoh ini telah terbukti efektif.
* **DO Saat Ini:** `"Sebagian orang merasa lebih lega setelah bertukar pikiran dengan kawan terpercaya, sebagian lainnya butuh waktu sendiri. Temukan tempo yang paling cocok untuk dirimu."`
* **DON'T Saat Ini:** `"Tips ampuh ini dijamin 100% melipatgandakan kepercayaan diri dan menghapus depresi seluruh pria Indonesia!"`

> ✏️ **Kotak Revisi KT11:**
>
> - Saran Penulis: Jangan menggunakan “laki-laki Indonesia” seolah pengalaman mereka seragam. Sebutkan wilayah, kelompok usia, kondisi sosial, atau populasi penelitian ketika relevan, dan jelaskan jika bukti hanya berasal dari kelompok tertentu.
> - DO: “Temuan ini berasal dari laki-laki usia 18–30 tahun di [wilayah/populasi] dan belum tentu menggambarkan pengalaman laki-laki di daerah atau kelompok lain.”
> - DON'T: “Laki-laki Indonesia biasanya sulit bicara soal perasaan.”

#### Ringkasan Fungsi 11 Pertimbangan

| Dimensi | Pertanyaan yang Dibantu |
| --- | --- |
| KT01 Kebersamaan | Bagaimana orang bisa merasa menjadi bagian tanpa harus membuka diri? |
| KT02 Ekonomi | Apakah saran kita realistis secara finansial? |
| KT03 Ketangguhan | Apakah kita diam-diam membuat standar “laki-laki ideal” baru? |
| KT04 Agama | Bagaimana menghormati spiritualitas tanpa menjadikannya diagnosis atau pengganti wajib? |
| KT05 Keluarga | Siapa yang boleh dilibatkan dalam keputusan? |
| KT06 Nafkah | Apakah penghasilan sedang dijadikan ukuran nilai diri? |
| KT07 Privasi | Siapa yang bisa melihat partisipasi atau respons seseorang? |
| KT08 Jalur bantuan | Dari mana orang mungkin realistis mulai mencari dukungan? |
| KT09 Aktivitas bersama | Apakah kedekatan harus selalu berbentuk curhat? |
| KT10 Akses layanan | Apakah hambatannya benar-benar “gengsi”, atau ada hambatan struktural? |
| KT11 Keragaman | Apakah kita sedang menggeneralisasi “laki-laki Indonesia”? |

> **Tesis halaman:** Konteks Indonesia bukan daftar sifat orang Indonesia. Ia adalah kumpulan pertanyaan untuk memeriksa siapa pembacanya, kondisi apa yang membatasi pilihannya, dan asumsi apa yang jangan dibuat terlalu cepat.

---

## 8. Panduan Kanal Komunikasi (Channels Guidance)

*Lokasi data: `src/data/channels.json`*

Cara Menungsa menulis perlu menyesuaikan cara sebuah kanal digunakan. Pertimbangkan siapa yang dapat melihat pesan, seberapa privat respons pembaca, berapa banyak konteks yang bisa diberikan, apakah balasan diharapkan, dan seberapa cepat informasi perlu ditindaklanjuti.

Prinsip Voice Menungsa tetap sama di semua kanal. Yang berubah adalah cara prinsip tersebut diterapkan.

### Sebelum Menulis untuk Sebuah Kanal

1. **Siapa yang bisa melihat respons pembaca?** Publik, anggota grup, admin, atau hanya penerima?
2. **Apakah pembaca diharapkan merespons?** Jika iya, apakah respons tersebut memang perlu?
3. **Seberapa banyak konteks yang bisa diberikan?** Jangan memadatkan klaim kompleks sampai kehilangan batas pentingnya.
4. **Berapa lama informasi ini akan tetap ditemukan atau digunakan?** Informasi layanan, jadwal, biaya, dan nomor bantuan dapat berubah.
5. **Apa yang terjadi jika pesan ini terlambat dibaca?** Semakin mendesak kebutuhannya, semakin tidak tepat mengandalkan kanal pasif seperti feed atau newsletter sebagai satu-satunya jalur.

#### CH1: Linimasa Media Sosial (Feed & Carousel)

* **Aturan Utama Saat Ini:** Slide pertama harus berupa situasi nyata, bukan klaim moral atau pertanyaan reflektif. Nama penutur ditulis jelas di caption.
* **Yang Harus Dihindari Saat Ini:** Hindari instruksi krisis di carousel (algoritma tidak dapat diandalkan); jangan paksa curhat di komentar.

> ✏️ **Kotak Revisi CH1 (Medsos):**
>
> - Aturan Kanal Baru: Buat pesan utama dapat dipahami tanpa meminta pembaca membuka pengalaman pribadi. Gunakan slide awal untuk memberi alasan yang jelas untuk terus membaca—misalnya situasi yang mudah dikenali, pertanyaan yang relevan, temuan, atau pernyataan utama. Jika membahas pengalaman personal, jelaskan siapa penuturnya dan jangan menampilkan cerita fiktif sebagai kesaksian nyata.
> - Hal yang Dihindari: Jangan mengubah komentar, reaksi, atau share menjadi cara untuk mengungkap kondisi pribadi pembaca. Hindari judul yang menyerupai diagnosis (“5 tanda kamu sebenarnya depresi”) dan jangan mengandalkan feed sebagai satu-satunya jalur informasi keselamatan atau bantuan darurat.

#### CH2: Email Newsletter / Komunitas

* **Aturan Utama Saat Ini:** Tempat ideal memaparkan prosedur lengkap: biaya, faskes, JKN/BPJS, kalimat di loket, dan langkah lanjutan.
* **Yang Harus Dihindari Saat Ini:** Hindari konten validasi tanpa solusi; email dibaca sebagai pesan yang memerlukan tindak lanjut.

> ✏️ **Kotak Revisi CH2 (Email):**
>
> - Aturan Kanal Baru: Gunakan ruang yang lebih panjang untuk memberi konteks, rincian, dan langkah yang diperlukan pembaca. Untuk email program atau layanan, letakkan informasi penting—tujuan pesan, waktu, biaya, cara bergabung, perubahan jadwal, atau tindakan yang diminta—secara jelas dan mudah dipindai.
> - Hal yang Dihindari: Jangan menyembunyikan informasi penting di bagian akhir email, membuat subjek lebih mendesak daripada isi sebenarnya, atau menganggap setiap email harus meminta tindakan. Jika tidak ada respons yang diperlukan, katakan dengan jelas.

#### CH3: Siaran / Grup WhatsApp

* **Aturan Utama Saat Ini:** Sampaikan info logistik ringkas. Tegaskan bahwa pesan tidak perlu dibalas di grup dan sediakan jalur kontak privat (japri).
* **Yang Harus Dihindari Saat Ini:** Jangan pernah meminta konfirmasi kehadiran publik di grup ("Ketik HADIR"); jangan tanyakan kondisi mental di grup.

> ✏️ **Kotak Revisi CH3 (WhatsApp):**
>
> - Aturan Kanal Baru: Tulis singkat dan letakkan informasi yang paling dibutuhkan di awal. Bedakan pesan siaran yang diterima secara privat dari grup yang responsnya terlihat oleh anggota lain. Untuk topik personal, pendaftaran, atau pertanyaan kesehatan mental, arahkan respons ke jalur privat. Jika UI memungkinkan, gunakan sublabel `WhatsApp Broadcast` dan `WhatsApp Group`.
> - Hal yang Dihindari: Di grup, jangan meminta anggota mengungkap kondisi pribadi atau menunjukkan minat pada layanan kesehatan mental secara publik jika tidak diperlukan. Hindari “ketik HADIR”, polling, atau reaction jika responsnya dapat membuka informasi pribadi.

#### CH4: Pesan Langsung / DM Akun

* **Aturan Utama Saat Ini:** Sebutkan nama relawan/admin. Sampaikan opsi tindakan pertama tanpa menuntut ia menceritakan seluruh masalahnya lebih dulu.
* **Yang Harus Dihindari Saat Ini:** Jangan gunakan balasan otomatis robotik ("Halo Kak, terima kasih sudah menghubungi kami..."); jangan beri janji klinis palsu.

> ✏️ **Kotak Revisi CH4 (DM Akun):**
>
> - Aturan Kanal Baru: Tanggapi pertanyaan yang diajukan terlebih dahulu tanpa meminta cerita pribadi yang tidak diperlukan. Jelaskan siapa atau apa yang membalas jika itu membantu memahami batas percakapan, lalu berikan satu langkah paling relevan. Gunakan informasi layanan yang sudah diverifikasi; jika muncul risiko keselamatan, beralih ke protokol krisis.
> - Hal yang Dihindari: Jangan memperlakukan DM sebagai diagnosis, konseling, atau layanan krisis jika Menungsa tidak menyediakan fungsi tersebut. Jangan meminta seluruh cerita sebagai syarat mendapat informasi atau berjanji “kami selalu ada” jika respons tidak dipantau terus-menerus. Auto-reply boleh digunakan untuk menjelaskan jam pemantauan dan batas respons secara jujur.

#### CH5: Artikel Panjang / Esai Reflektif

* **Aturan Utama Saat Ini:** Sediakan peta konsep yang jelas, cantumkan sumber data dengan jujur, dan akui batas temuan riset.
* **Yang Harus Dihindari Saat Ini:** Jangan ubah artikel edukasi menjadi khotbah moral atau penghakiman gaya hidup pembaca.

> ✏️ **Kotak Revisi CH5 (Artikel Panjang):**
>
> - Aturan Kanal Baru: Gunakan ruang yang lebih panjang untuk menjelaskan konteks, hubungan antaride, bukti, dan ketidakpastian yang tidak cukup ditampung dalam format singkat. Bedakan dengan jelas antara data, interpretasi Menungsa, pengalaman personal, dan usulan atau refleksi penulis.
> - Hal yang Dihindari: Jangan menggunakan panjang tulisan untuk membuat argumen terdengar lebih pasti daripada bukti yang tersedia. Hindari generalisasi luas dari satu pengalaman, satu penelitian, atau satu kelompok pembaca, serta penutup yang memaksakan satu pelajaran moral dari persoalan kompleks.

### Ringkasan Fungsi Kanal

| Kanal | Kekuatan utama | Risiko utama |
| --- | --- | --- |
| Feed / Carousel | Pengenalan & edukasi yang mudah ditemukan | Keterbukaan publik, penyederhanaan berlebihan |
| Email | Konteks & informasi lengkap | Informasi penting tenggelam |
| WhatsApp | Informasi cepat & dekat dengan komunitas | Respons anggota terlihat orang lain |
| DM | Navigasi personal dengan privasi lebih tinggi | Menyerupai layanan klinis atau krisis |
| Artikel | Kedalaman & konteks | Klaim berlebihan dan generalisasi |

> **Prinsip lintas kanal:** Jangan hanya menyesuaikan panjang tulisan dengan kanal. Sesuaikan juga tingkat keterbukaan yang diminta, kepastian yang diberikan, dan risiko jika pembaca salah memahami pesan.

---

## 9. Alur Kebutuhan Pembaca (Audience Pathways)

*Lokasi data: `src/data/pathways.json`*

Jalur ini bukan tahapan yang harus dilalui secara berurutan dan bukan kategori tetap tentang seseorang. Satu pembaca dapat memiliki beberapa kebutuhan sekaligus. Gunakan jalur yang paling membantu menentukan apa yang perlu dilakukan tulisan saat itu.

#### Jalur P1 — Belum Mengerti Apa yang Sedang Berubah

* **Sasaran Menungsa Saat Ini:** Kurangi ketidakpastian dan beri penjelasan yang masuk akal.
* **Ciri Bahasa Saat Ini:** Deskripsi situasi sehari-hari di awal, istilah klinis dijelaskan kemudian; kalimat pendek dan lugas.
* **Risiko Kesalahan Saat Ini:** Mendiagnosis pembaca dari jauh; menumpuk istilah medis tanpa penjelasan.

> ✏️ **Kotak Revisi P1:**
>
> - Sasaran: Membantu pembaca mengenali apa yang berubah dan mendapat orientasi awal tanpa terburu-buru memberi nama atau diagnosis pada pengalamannya.
> - Ciri Bahasa: Mulai dari situasi, kebiasaan, atau perubahan yang bisa dikenali. Jelaskan satu hal pada satu waktu dengan bahasa sehari-hari. Gunakan istilah klinis hanya ketika membantu pemahaman dan jelaskan batas maknanya.
> - Risiko: Menjadikan beberapa perubahan sebagai checklist diagnosis, menyimpulkan apa yang sedang dialami pembaca, atau memberikan penjelasan yang lebih pasti daripada bukti yang tersedia.

#### Jalur P2 — Ingin Mencari Dukungan tapi Khawatir Dinilai

* **Sasaran Menungsa Saat Ini:** Turunkan biaya sosial dan kekhawatiran dipermalukan.
* **Ciri Bahasa Saat Ini:** Penegasan privasi yang eksplisit; izin untuk tidak berbicara; langkah awal yang mudah dibatalkan.
* **Risiko Kesalahan Saat Ini:** Ketidakjelasan yang disamarkan sebagai keramahan; janji privasi yang tidak bisa ditepati sistem.

> ✏️ **Kotak Revisi P2:**
>
> - Sasaran: Mengurangi hal-hal yang harus dipertaruhkan pembaca sebelum ia tahu apakah ingin melanjutkan—terutama privasi, keterbukaan pribadi, dan komitmen untuk ikut.
> - Ciri Bahasa: Jelaskan siapa yang dapat melihat respons, apa yang akan terjadi, apa yang tidak diwajibkan, dan bagaimana pembaca bisa bertanya atau bergabung secara privat. Berikan pilihan yang mudah dimulai dan, jika berlaku, mudah dibatalkan.
> - Risiko: Menjanjikan privasi atau rasa aman secara mutlak, meminta keterbukaan sebelum memberikan informasi dasar, atau membuat ketertarikan pada bantuan terlihat publik tanpa alasan yang diperlukan.

#### Jalur P3 — Merasa Gagal dan Menyalahkan Diri Sendiri

* **Sasaran Menungsa Saat Ini:** Gambarkan situasi secara akurat tanpa mencari kambing hitam.
* **Ciri Bahasa Saat Ini:** Detail situasi nyata lebih banyak daripada kata emosi; sudut pandang orang kedua; tanpa paksaan bertindak.
* **Risiko Kesalahan Saat Ini:** Memperkuat kebencian (*grievance amplification*); menyalahkan perempuan atau masyarakat secara sembarangan.

> ✏️ **Kotak Revisi P3:**
>
> - Sasaran: Membantu pembaca melihat bahwa kesulitan tidak selalu dapat dijelaskan sebagai kekurangan pribadi, tanpa mengganti self-blame dengan kambing hitam baru.
> - Ciri Bahasa: Gambarkan kondisi yang relevan—misalnya beban kerja, ekonomi, tanggung jawab keluarga, hubungan, atau akses dukungan—dan hubungkan dengan pengalaman individu secara proporsional. Pisahkan apa yang terjadi dari penilaian tentang nilai dirinya.
> - Risiko: Mengatakan semua masalah adalah kesalahan individu, tetapi juga jatuh ke ekstrem sebaliknya: menyalahkan perempuan, keluarga, masyarakat, atau “sistem” sebagai satu penyebab untuk semua pengalaman.

#### Jalur P4 — Ingin Bertindak tapi Belum Tahu Mulai dari Mana

* **Sasaran Menungsa Saat Ini:** Sediakan satu langkah nyata yang benar-benar bisa dilakukan.
* **Ciri Bahasa Saat Ini:** Tawarkan satu langkah saja; sebutkan perkiraan waktu, biaya, dan kendala antrean secara jujur.
* **Risiko Kesalahan Saat Ini:** Merekomendasikan langkah yang mustahil dilakukan orang biasa.

> ✏️ **Kotak Revisi P4:**
>
> - Sasaran: Membantu pembaca menemukan satu langkah pertama yang cukup konkret dan realistis untuk dilakukan.
> - Ciri Bahasa: Utamakan satu tindakan pada satu waktu. Jelaskan cara memulainya dan, jika relevan, informasi praktis seperti waktu, biaya, lokasi, dokumen, atau hambatan akses yang sudah diverifikasi.
> - Risiko: Memberikan terlalu banyak pilihan sekaligus, menyarankan langkah yang tidak realistis bagi kondisi pembaca, atau membuat tindakan kecil terdengar seolah pasti menyelesaikan masalah kompleks.

#### Jalur P5 — Punya Orang di Sekitar, tapi Belum Siap Bercerita

* **Sasaran Menungsa Saat Ini:** Buat suasana kelompok terbaca jelas sebelum ia memutuskan datang.
* **Ciri Bahasa Saat Ini:** Deskripsikan denah fisik ruang dan susunan acara; tegaskan bahwa boleh duduk tanpa berbicara.
* **Risiko Kesalahan Saat Ini:** Mengumbar jargon persaudaraan palsu (*fake brotherhood*); memakai kata 'kita' sebelum ada rasa percaya.

> ✏️ **Kotak Revisi P5:**
>
> - Sasaran: Menunjukkan bahwa hubungan dan kebersamaan tidak harus dimulai dari keterbukaan pribadi. Buat pembaca tahu bahwa ia dapat hadir atau terhubung tanpa langsung menceritakan masalahnya.
> - Ciri Bahasa: Jelaskan bentuk interaksi secara konkret: apa yang dilakukan bersama, seberapa aktif peserta diharapkan terlibat, dan apakah berbicara bersifat pilihan. Gunakan kebersamaan tanpa menjadikannya tuntutan untuk merasa dekat.
> - Risiko: Menganggap kedekatan selalu berarti curhat, menjanjikan “persaudaraan” sebelum rasa percaya terbentuk, atau membuat peserta merasa bahwa diam dan mendengarkan adalah bentuk partisipasi yang lebih rendah.

#### Jalur P6 — Lelah dengan Pesan yang Menggurui

* **Sasaran Menungsa Saat Ini:** Bicarakan tindakan nyata organisasi tanpa menceramahi pembaca.
* **Ciri Bahasa Saat Ini:** Kalimat deklaratif faktual; jelaskan komitmen dan langkah yang sudah dikerjakan organisasi.
* **Risiko Kesalahan Saat Ini:** Menceramahi dengan gaya "laki-laki harus sadar"; kata-kata bijak hampa tanpa aksi nyata.

> ✏️ **Kotak Revisi P6:**
>
> - Sasaran: Menunjukkan sikap Menungsa melalui tindakan, pilihan, dan praktik yang konkret daripada memberi standar baru tentang bagaimana laki-laki seharusnya hidup.
> - Ciri Bahasa: Jelaskan apa yang Menungsa lakukan, ubah, sediakan, atau batasi. Jika menyatakan nilai, hubungkan dengan praktik yang bisa dilihat atau diperiksa.
> - Risiko: Mengganti tuntutan lama dengan tuntutan baru seperti “laki-laki harus lebih terbuka”, menggunakan slogan tanpa tindakan yang mendukungnya, atau menjadikan pembaca sebagai pihak yang selalu perlu diperbaiki.

#### Jalur P7 — Butuh Jeda tanpa Merasa Gagal

* **Sasaran Menungsa Saat Ini:** Berikan ruang untuk jeda tanpa menjadikannya tolak ukur kegagalan.
* **Ciri Bahasa Saat Ini:** Menghargai batas energi fisik; mengakui bahwa istirahat adalah bagian dari menjaga keberlangsungan hidup.
* **Risiko Kesalahan Saat Ini:** Membingkai istirahat sebagai kemalasan atau menghubungkan hak istirahat dengan target kerja.

> ✏️ **Kotak Revisi P7:**
>
> - Sasaran: Memisahkan kebutuhan untuk berhenti atau mengurangi beban sementara dari penilaian tentang kemalasan, kekuatan, atau nilai diri seseorang.
> - Ciri Bahasa: Akui keterbatasan energi, waktu, dan kapasitas secara konkret. Jika menawarkan jeda, jadikan sebagai pilihan yang realistis tanpa membesar-besarkan manfaatnya atau mengaitkannya dengan kewajiban untuk kembali produktif secepat mungkin.
> - Risiko: Membingkai istirahat sebagai hadiah setelah cukup produktif, mengubah jeda menjadi teknik optimasi performa semata, atau menganggap semua orang memiliki kondisi yang memungkinkan mereka untuk berhenti dengan mudah.

### Apa yang Dibutuhkan Tulisan?

| Jalur | Tulisan perlu memberi… |
| --- | --- |
| P1 | Orientasi |
| P2 | Kejelasan & privasi |
| P3 | Perspektif yang lebih utuh |
| P4 | Satu langkah |
| P5 | Kebersamaan tanpa tuntutan |
| P6 | Praktik, bukan khotbah |
| P7 | Ruang untuk berhenti |

---

## 10. Glosarium & Batas Bukti Ilmiah

Dalam penulisan konten Menungsa, seluruh klaim faktual dan budaya dipagari oleh tingkat kepastian bukti epistemik (*Epistemic Tiers*):

1. **`[EMPIRICALLY SUPPORTED IN INDONESIA]`**

   * Digunakan untuk temuan yang didukung oleh studi empiris lokal pada populasi pria di Indonesia.

   > ✏️ **Kotak Revisi Definisi Tier 1:** `[Tulis versi revisi Anda di sini...]`
   >
2. **`[PLAUSIBLE LOCAL MECHANISM]`**

   * Digunakan untuk mekanisme psikologis yang masuk akal secara budaya lokal namun belum diuji dalam eksperimen kata acak.

   > ✏️ **Kotak Revisi Definisi Tier 2:** `[Tulis versi revisi Anda di sini...]`
   >
3. **`[WESTERN EXTRAPOLATION]`**

   * Digunakan untuk teori psikologi pria dari literatur Global North yang belum tentu bekerja persis sama di Indonesia.

   > ✏️ **Kotak Revisi Definisi Tier 3:** `[Tulis versi revisi Anda di sini...]`
   >
4. **`[SPECULATIVE / OBSERVATIONAL]`**

   * Digunakan untuk pengamatan tren media sosial atau praktik industri kreatif yang belum memiliki rujukan ilmiah terpublikasi.

   > ✏️ **Kotak Revisi Definisi Tier 4:** `[Tulis versi revisi Anda di sini...]`
   >

---

> 💡 **Tips Pengisian:**
> Anda dapat mencari teks tertentu dengan menekan `Cmd+F` (Mac) atau `Ctrl+F` (Windows). Cukup ganti tulisan `[Tulis versi revisi Anda di sini...]` dengan kalimat atau draf pilihan Anda. Setelah selesai meninjau seluruhnya, Anda dapat meminta saya untuk mengimplementasikan versi revisi tersebut ke dalam kode komponen dan data website!
