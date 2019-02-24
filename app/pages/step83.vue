<template>
  <div data-page="step72" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/step8-video/"><i class="icon icon-back"></i></a></div>
        <div class="center">7. AŞAMA</div>
      </div>
    </div>
    <a href="/survey-spsi/" class="floating-button color-purple"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0; display: flex; align-items: center">
      <div class="card" style="border-radius: 20px; padding-top: 30px; padding-bottom: 30px">
        <div style="margin: 10px; text-align: center; font-size: 24px"> Şimdi sizden ilk aşamada çözdüğünüz testleri bir daha çözmenizi istiyoruz. </div>
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
  },
}
</script>
