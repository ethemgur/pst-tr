<template>
  <div data-page="video" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="back link icon-only" href="#" @click="pause"><i class="icon icon-back"></i></a></div>
        <div class="center">6. AŞAMA</div>
      </div>
    </div>
    <a class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0">
      <div class="content">
        <div class="card" style="border-radius: 20px">
          <video class="video-content" width="300" controls id="videoElement" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused" style="border-radius: 20px">
            <source src="file:///android_asset/www/output22.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
<style media="screen">
.content{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
.text{
  text-align: center;

}
</style>

<script>
export default {
  data() {
    return {
      videoElement: null,
      paused: null,
    }
  },
  created() {
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    navigateURL() {
      this.pause()
      this.$db('currentStep', 4)
      this.$f7.views.main.loadPage('/step41/')
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
  },
}
</script>
