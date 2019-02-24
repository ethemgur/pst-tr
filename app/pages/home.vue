<template>
  <div data-page="home" class="page kitchen-sink-material">
    <a href="/settings/" class="floating-button color-purple"><i class="material-icons">menu</i></a>

    <div class="page-content" :style="{'background-image': 'url(' + require('../images/bg-home.jpg') + ')'}" style="background-size: cover">
      <a v-if="isDone(1)" @click="navigateURL(1)">
        <img id="y1" src="../images/circle1.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(1)" href="#">
        <img id="y1" src="../images/circle1-grey.png" width="50px" height="50px"/>
      </a>

      <a v-if="isDone(2)" @click="navigateURL(2)">
        <img id="y2" src="../images/circle2.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(2)" href="#">
        <img id="y2" src="../images/circle2-grey.png" width="50px" height="50px"/>
      </a>

      <a v-if="isDone(3)" @click="navigateURL(3)">
        <img id="y3" src="../images/circle3.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(3)" href="#">
        <img id="y3" src="../images/circle3-grey.png" width="50px" height="50px"/>
      </a>

      <a v-if="isDone(4)" @click="navigateURL(4)">
        <img id="y4" src="../images/circle4.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(4)" href="#">
        <img id="y4" src="../images/circle4-grey.png" width="50px" height="50px"/>
      </a>

      <a v-if="isDone(5)" @click="navigateURL(5)">
        <img id="y5" src="../images/circle5.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(5)" href="#">
        <img id="y5" src="../images/circle5-grey.png" width="50px" height="50px"/>
      </a>

      <a v-if="isDone(6)" @click="navigateURL(6)">
        <img id="y6" src="../images/circle6.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(6)" href="#">
        <img id="y6" src="../images/circle6-grey.png" width="50px" height="50px"/>
      </a>

      <a v-if="isDone(7)" @click="navigateURL(8)">
        <img id="y7" src="../images/circle7.png" width="50px" height="50px"/>
      </a>
      <a v-if="!isDone(7)" href="#">
        <img id="y7" src="../images/circle7-grey.png" width="50px" height="50px"/>
      </a>

      <a href="#" @click="finalAlert">
        <img id="y8" src="../images/reward-purple.png" width="50px" height="50px"/>
      </a>
    </div>

  </div>
</template>
<!--this.$f7.views.main.loadPage('/signup/')-->
<script>
export default {
  created() {
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    isDone(i) {
      if (i <= this.$db('currentStep')) {
        return true
      }
      return false
    },
    navigateURL(i) {
      if (i === 8 && this.$db('currentStep') === 8) {
        this.$f7.alert('Bu aşamayı tamamladın.', '')
      } else if (i === 8) {
        this.$f7.views.main.loadPage('/video/8/')
      } else if (i === this.$db('currentStep')) {
        this.$f7.views.main.loadPage(`/video/${i}/`)
      } else {
        this.$f7.alert('Bu aşamayı tamamladın.', '')
      }
    },
    finalAlert() {
      if (this.$db('currentStep') === 8) {
        this.$f7.alert('Tüm aşamaları tamamladınız. Umarız daha iyi hissediyorsunuzdur.', '')
      } else {
        this.$f7.alert('Önce tüm aşamaları tamamlamalısın.', '')
      }
    },
  },
}
</script>
<style>
#y1 {
  position: absolute;
  bottom: 8%;
  left: 8%;
}
#y2 {
  position: absolute;
  bottom: 19%;
  left: 75%;
}
#y3 {
  position: absolute;
  bottom: 29%;
  left: 8%;
}
#y4 {
  position: absolute;
  bottom: 41%;
  left: 76%;
}
#y5 {
  position: absolute;
  bottom: 50%;
  left: 8%;
}
#y6 {
  position: absolute;
  bottom: 64%;
  left: 76%;
}
#y7 {
  position: absolute;
  bottom: 73%;
  left: 8%;
}
#y8 {
  position: absolute;
  bottom: 85%;
  left: 76%;
}
</style>
