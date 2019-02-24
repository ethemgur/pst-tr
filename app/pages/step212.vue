<template>
  <div data-page="step21" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link icon-only" href="/step211/"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">NEDENLER</div>
        <div class="right">
          <a class="link icon-only" href="#" @click="reasonPrompt"><i class="icon icon-plus"></i></a>
        </div>
      </div>
    </div>

    <a href="#" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px; padding: 10px">
        <div class="list-block">
          <ul>
            <li style="color:gray; text-align:center" v-show="reasons.length===0">
              Henüz herhangi bir neden girmediniz.<br />
              Lütfen sağ üstteki "<b>+</b>" işaretine basarak neden ekleyin.
            </li>
            <li class="swipeout" v-for="i in reasons" style="margin: 5px 0 5px 0">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">{{i.text}}</div>
                  <div class="item-after"><i class="material-icons" style="color:#9c27b0" @click="removeReason(i)">clear</i></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      reasons: [],
    }
  },
  created() {
    if (localStorage.getItem('reasons')) {
      this.reasons = JSON.parse(localStorage.getItem('reasons'))
    } else {
      this.reasons = []
    }
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    reasonPrompt() {
      this.$f7.prompt('Yeni neden ekle', '', (data) => {
        if (data !== '') {
          this.reasons.push({
            text: data,
            match: [],
            scores: [],
            totalScore: 0,
          })
          this.saveReasons()
          console.log(`${data} is added!`)
        } else {
          this.reasonPrompt()
        }
      })
    },
    removeReason(value) {
      const index = this.reasons.indexOf(value)
      this.reasons.splice(index, 1)
      this.saveReasons()
    },
    saveReasons() {
      localStorage.setItem('reasons', JSON.stringify(this.reasons))
    },
    validation() {
      if (this.reasons.length === 0) {
        return false
      }
      return true
    },
    navigateURL() {
      if (this.validation()) {
        this.$f7.views.main.loadPage('/step22/')
        return
      }
      this.$f7.alert('Lütfen tabloyu doldurun.')
    },
  },

}
</script>
