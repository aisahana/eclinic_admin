![eClinic]( ./eClinic.png "eClinic")

## eClinic Admin

Ini adalah Admin untuk eClinic. eClinic adalah aplikasi sistem informasi
rawat jalan sumber terbuka untuk klinik.

### API
Karena aplikasi ini membutuhkan API, API eClinic bisa Anda dapatkan [disini](https://github.com/aisahana/eclinic_api).

### Sistem Antrian Realtime
Aplikasi ini dilengkapi dengan sistem antrian realtime
yang membutuhkan socket server yang bisa Anda dapatkan
[disini](https://github.com/aisahana/eclinicSocket).

### Quick Setup
Clone repo ini lalu jalankan perintah:

```
# install dependencies
npm install
```
Setelah selesai, jalankan development server:
```
# serve with hot reload at localhost:8080
npm run dev
```

Panel Admin telah siap digunakan dengan mengakses:

```
http://localhost:8080
```
## Config
Berkas konfigurasi dapat ditemukan di subfolder `config/`.
Silakan diatur sesuai dengan kebutuhan.

## Deployment
Untuk membuat berkas statis, Anda dapat menjalankan:
```
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
Setelah itu, Anda perlu menggunakan peladen web untuk menge-__serve__ berkas pada subfolder `www`.
Gunakan Apache, NGINX, atau lainnya. Pindahkan berkas-berkas di subfolder `www` ke peladen pilihan Anda.

## Demo
Anda bisa melihat demonya
[disini](https://www.youtube.com/playlist?list=PLq10xSDEwzczYJ3luDICP2JbM9I7A0rmK).




