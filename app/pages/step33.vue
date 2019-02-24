<template>
  <div data-page="swiper-horizontal" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner" >
        <div class="left"><a class="back link icon-only" href="" @click="pause2"><i class="icon icon-back"></i></a></div>
        <div class="center"> {{title}} </div>
      </div>
    </div>
    <a href="/step34/" class="floating-button color-purple" @click="pause2"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0; display: flex; align-items: center">
      <div class="card" style="border-radius: 20px; padding-top: 30px; padding-bottom: 30px">
        <div style="margin: 10px; text-align: center; font-size: 24px"> {{content}} </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '3. AŞAMA',
      content: 'Bu hedefi gerçekleştirmek için ne yapılabileceğini düşünün.',
    }
  },
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
