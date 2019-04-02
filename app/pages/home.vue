<template>
  <div data-page="home" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">AŞAMALAR</div>
      </div>
    </div>
    <a href="/settings/" class="floating-button color-purple"><i class="material-icons">menu</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div class="list-block" style="padding:10px">
          <ul>
            <li>
              <a class="item-link item-content" @click="navigateURL(1)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(1)">1. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="navigateURL(2)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(2)">2. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="navigateURL(3)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(3)">3. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="navigateURL(4)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(4)">4. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="navigateURL(5)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(5)">5. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="navigateURL(6)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(6)">6. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="navigateURL(7)">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(7)">7. AŞAMA</div>
                </div>
              </a>
            </li>
            <li>
              <a class="item-link item-content" @click="finalAlert">
                <div class="item-inner">
                  <div class="item-title" :style="setColor(8)">BİTİRMEK İÇİN DOKUN</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

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
      if (this.isDone(i)) {
        if (i === 8 && this.$db('currentStep') === 8) {
          this.$f7.alert('Bu aşamayı tamamladın.', '')
        } else if (i === 7) {
          this.$f7.views.main.loadPage('/video/8/')
        } else if (i === this.$db('currentStep')) {
          this.$f7.views.main.loadPage(`/video/${i}/`)
        } else {
          this.$f7.alert('Bu aşamayı tamamladın.', '')
        }
      }
    },
    finalAlert() {
      if (this.$db('currentStep') === 8) {
        this.$f7.alert('Tüm aşamaları tamamladınız. Umarız daha iyi hissediyorsunuzdur.', '')
      } else {
        this.$f7.alert('Önce tüm aşamaları tamamlamalısın.', '')
      }
    },
    setColor(i) {
      if (i === this.$db('currentStep')) {
        return 'color:green'
      } else if (this.isDone(i)) {
        return 'color:#9c27b0'
      }
      return 'color:grey'
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
