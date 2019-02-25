<template>
  <div data-page="swiper-horizontal" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="back link icon-only" href="#" @click="pause"><i class="icon icon-back"></i></a></div>
        <div class="center">{{title}}</div>
      </div>
    </div>
    <a class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0">
      <iframe id="yvideo" class="video-content" :src="src" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: "",
      title: '1. AŞAMA',
      videoElement: null,
      paused: null,
    }
  },
  created() {
    this.src = `https://www.youtube-nocookie.com/embed/${this.videoName()}`
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  computed: {
    playing() { return !this.paused },
  },
  methods: {
    onBackKeyDown() {
      this.pause()
      this.$f7.views.main.loadPage('/home/')
    },
    navigateURL() {
      console.log('navigate')
      try {
        this.pause()
      } catch (e) {
        console.log(e)
      }
      this.$db('currentStep', 2)
      this.$f7.views.main.loadPage('/survey3/')
    },
    updatePaused(event) {
      this.videoElement = event.target
      this.paused = event.target.paused
    },
    play() {
      this.videoElement.play()
    },
    pause() {
      this.src = ''
    },
  },
}
</script>

<style media="screen">
.video-content
{
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 95%;
  border-radius: 3px;
}
</style>
