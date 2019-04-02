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

      <iframe id="yvideo" class="video-content" :src="src" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
    this.src = `https://www.youtube-nocookie.com/embed/${this.videoName()}`
    this.step = this.$db('currentStep')
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  computed: {
    playing() { return !this.paused },
  },
  methods: {
    pause() {
      this.src = ''
    },
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
    videoName() {
      if (this.$db('currentStep') === 1) {
        return 'UkPHa6Srd90'
      } else if (this.$db('currentStep') === 2) {
        return 'VJumP_QOWtk'
      } else if (this.$db('currentStep') === 3) {
        return 'efxl5XVWX_I'
      } else if (this.$db('currentStep') === 4) {
        return 'UZtI5Nm8fR4'
      } else if (this.$db('currentStep') === 5) {
        return 'gzhBpZuOJxM'
      } else if (this.$db('currentStep') === 6) {
        return '3tMEvDJ-nqk'
      }
      return '3HgnmrWwLIQ'
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
