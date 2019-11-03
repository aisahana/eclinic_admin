<template>
<div class="sidebar" ref="sidebar" data-color="blue">
  <div class="sidebar-wrapper">
    <div class="logo">
      <a href="javascript:void(0)" class="simple-text">
        eClinic
      </a>
    </div>
    <ul class="nav">
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'DashboardMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-tachometer"></i>
          <p>Dashboard</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'PolyMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-hospital-o"></i>
          <p>Poli</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'MedicineMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-medkit"></i>
          <p>Obat</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'DoctorMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-user-md"></i>
          <p>Dokter</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'PatientMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-male"></i>
          <p>Pasien</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'CounterMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-bullhorn"></i>
          <p>Loket</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'RegisterMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-file-text"></i>
          <p>Pendaftaran</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'RecipeMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-sticky-note"></i>
          <p>Resep</p>
        </a>
      </router-link>
      <router-link
        active-class="active"
        class="nav-item"
        :to="{name: 'PaymentMainManager'}"
        tag="li"
      >
        <a class="nav-link" href="javascript:void(0)">
          <i class="fa fa-money"></i>
          <p>Pembayaran</p>
        </a>
      </router-link>
      <!-- <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="javascript:void(0)"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="no-icon">
            Laporan&nbsp;<i class="fa fa-book"></i>
          </span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <router-link
            class="dropdown-item"
            :to="{name: 'UserAddressMainManager'}"
          >
            <i class="fa fa-book"></i>&nbsp;Laporan Registrasi
          </router-link>
          <router-link
            class="dropdown-item"
            :to="{name: 'UserAddressMainManager'}"
          >
            <i class="fa fa-book"></i>&nbsp;Laporan Resep
          </router-link>
          <router-link
            class="dropdown-item"
            :to="{name: 'UserAddressMainManager'}"
          >
            <i class="fa fa-book"></i>&nbsp;Laporan Pembayaran
          </router-link>
          <router-link
            class="dropdown-item"
            :to="{name: 'UserAddressMainManager'}"
          >
            <i class="fa fa-book"></i>&nbsp;Laporan Rekam Medis
          </router-link>
        </div>
      </li> -->
    </ul>
  </div>
</div>
</template>

<script>

export default {
  name: 'CommonSidebar'
}
</script>

<style>

</style>
