<template>
  <div data-page="settings" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/home/"><i class="icon icon-back"></i></a></div>
        <div class="center">Menu</div>
      </div>
    </div>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div class="list-block" style="padding:10px">
          <ul>
            <li>
              <a class="item-link item-content" href="/about/">
                <div class="item-media">
                  <i class="icon material-icons">info</i>
                </div>
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">Hakkımızda</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/login/" class="item-link item-content" @click="$root.$signOut()">
                <div class="item-media">
                  <i class="icon material-icons">power_settings_new</i>
                </div>
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">Oturumu Kapat</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="exit">
                <div class="item-media">
                  <i class="icon material-icons">input</i>
                </div>
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">Uygulamadan Çık</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    exit() {
      window.navigator.app.exitApp()
    },
  },
}
</script>
