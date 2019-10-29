<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <a v-b-modal.modal-about href="javascript:void(0)"><i class="fa fa-coffee"></i>&nbsp;Tentang</a>
          </li>
          <li>
            <a href="javascript:void(0)"><i class="fa fa-bolt"></i>&nbsp;Donasi</a>
          </li>
        </ul>
        <p class="copyright text-center">
          © 2019
          <a href="javascript:void(0)">eClinic</a>,
          by <a href="javascript:void(0)">Aisahana</a>
        </p>
      </nav>
    </div>
    <b-modal id="modal-about" hide-footer size="lg" title="Tentang">
      <p>
        eClinic adalah aplikasi sistem informasi
        rawat jalan sumber terbuka untuk klinik berbasis
        web. eClinic dibangun oleh sebuah sebuah organisasi bernama
        Aisahana. Saat ini eClinic memiliki versi 1.0.
      </p>
      <p>
        Fitur Didalamnya meliputi:
        <ul>
          <li>Dashboard</li>
          <li>Multi Poli</li>
          <li>Obat</li>
          <li>Dokter</li>
          <li>Pasien</li>
          <li>Pendaftaran</li>
          <li>Resep</li>
          <li>Pembayaran</li>
          <li>Rekam Medis</li>
          <li>Laporan</li>
        </ul>
      </p>
      <h5>Lisensi MIT</h5>
      <p>eClinic dirilis dengan lisensi MIT yang artinya,</p>
      <p>
        Jika Anda menggunakan aplikasi
        atau kode pemrograman yang dirilis
        dengan MIT License, maka Anda berhak untuk:
      </p>
      <ul>
        <li>Mendistribusikan</li>
        <li>Memodifikasi</li>
        <li>Menggunakan</li>
        <li>Menjual</li>
      </ul>
      <p>
        Anda bisa melakukan apa saja sesukanya dengan aplikasi atau kode pemrograman berlisensi ini.
        Anda bisa membuat aplikasi komersial dan menutup semua kodenya dari publik.
      </p>
      <p>
        Lisensi ini hanya mewajibkan pengguna untuk menyertakan lisensi dan copyright si pembuat pada kode yang didistribusikan ulang dan tidak ada larangan untuk menggunakan trademark dari si pembuat asli.
        Selain itu pengguna juga tidak berhak untuk menuntut si pembuat ketika terjadi kerusakan pada perangkat lunak tersebut.
      </p>
      <p>
        <pre>
Copyright © 2019 Aisahana

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </pre>
      </p>
    </b-modal>
  </footer>
</template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style>

</style>
