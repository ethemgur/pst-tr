<template>
  <div data-page="swiper-horizontal" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/home/" @click="pause"><i class="icon icon-back"></i></a></div>
        <div class="center">{{step}}. AŞAMA</div>
      </div>
    </div>
    <a :href="'/survey/' + step" class="floating-button color-purple" @click="pause"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0">
      <video class="video-content" width="300" controls id="videoElement" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused" style="border-radius: 20px">
        <source :src="'file:///android_asset/www/output' +videoName()+ '.mp4'" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: '',
      step: 0,
      videoElement: null,
      paused: null,
    }
  },
  created() {
    this.step = this.$db('currentStep')
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
    updatePaused(event) {
      this.videoElement = event.target
      this.paused = event.target.paused
    },
    play() {
      this.videoElement.play()
    },
    pause() {
      try {
        this.videoElement.pause()
      } catch (e) {
        console.log(e)
      }
    },
    videoName() {
      if (this.$db('currentStep') === 1) {
        return '1'
      } else if (this.$db('currentStep') === 2) {
        return '8'
      } else if (this.$db('currentStep') === 3) {
        return '11'
      } else if (this.$db('currentStep') === 4) {
        return '14'
      } else if (this.$db('currentStep') === 5) {
        return '15'
      } else if (this.$db('currentStep') === 6) {
        return '18'
      }
      return '24'
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
  width: 90%;
  height: auto;
  border-radius: 20px;
}
</style>
