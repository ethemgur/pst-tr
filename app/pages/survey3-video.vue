<template>
  <div data-page="survey3-video" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/home/" @click="pause" ><i class="icon icon-back"></i></a></div>
        <div class="center">1. ADIM</div>
      </div>
    </div>
    <a class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0">
          <video class="video-content" width="300" controls id="videoElement" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused" style="border-radius: 20px">
            <source :src="'file:///android_asset/www/output' + video + '.mp4'" type="video/mp4">
          </video>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      q: 0,
      video: 0,
      videoElement: null,
      paused: null,
    }
  },
  created() {
    this.getVideo()
    console.log(this.video)
    console.log(this.q)
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.pause()
      this.$f7.views.main.loadPage('/home/')
    },
    navigateURL() {
      this.pause()
      this.$db(`s3q${this.q}`, null)
      switch ('Evet') {
        case this.$db('s3q1'):
        case this.$db('s3q2'):
        case this.$db('s3q3'):
        case this.$db('s3q4'):
          this.$f7.views.main.refreshPage()
          break
        default:
          this.$f7.views.main.loadPage('/home/')
      }
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
    getVideo() {
      if (this.$db('s3q1') === 'Evet') {
        this.q = 1
        this.video = 3
      } else if (this.$db('s3q2') === 'Evet') {
        this.q = 2
        this.video = 4
      } else if (this.$db('s3q3') === 'Evet') {
        this.q = 3
        this.video = 5
      } else if (this.$db('s3q4') === 'Evet') {
        this.q = 4
        this.video = 6
      }
    },
  },
  computed: {
    playing() { return !this.paused },
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
    border-radius: 3px;
  }
</style>
