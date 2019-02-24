<template>
  <div data-page="step42" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link icon-only" href="/home/"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">{{title}}</div>
        <div class="right">
          <a class="link icon-only" href="#" @click="solutionPrompt"><i class="icon icon-plus"></i></a>
        </div>
      </div>
    </div>

    <a class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px; padding: 10px">
        <div class="list-block">
          <ul>
            <li style="color:gray; text-align:center" v-show="solutions.length===0"> {{noEntry1}} <br /> Çözüm girmek için sağ üstteki <b>"+"</b> butonuna basın. </li>
            <li class="item" v-for="i in solutions" style="margin: 5px 0 5px 0">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">{{i.text}}</div>
                  <div class="item-after"><i class="material-icons" style="color:#9c27b0" @click="removeSolution(i)">clear</i></div>
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
      title: '4. AŞAMA',
      noEntry1: 'Henüz herhangi bir çözüm girmediniz',
      solutions: [],
    }
  },
  created() {
    if (localStorage.getItem('solutions')) {
      this.solutions = JSON.parse(localStorage.getItem('solutions'))
    } else {
      this.solutions = []
    }
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    solutionPrompt() {
      this.$f7.prompt('Yeni çözüm ekle', '', (data) => {
        if (data !== '') {
          this.solutions.push({
            text: data,
            scores: [],
            totalScore: 0,
            pp: [],
            pn: [],
            np: [],
            nn: [],
          })
          this.saveSolutions()
          console.log(`${data} is added!`)
        } else {
          this.solutionPrompt()
        }
      })
    },
    removeSolution(value) {
      const index = this.solutions.indexOf(value)
      this.solutions.splice(index, 1)
      this.saveSolutions()
    },
    saveSolutions() {
      localStorage.setItem('solutions', JSON.stringify(this.solutions))
    },
    validation() {
      if (this.solutions.length === 0) {
        return false
      }
      return true
    },
    navigateURL() {
      if (this.validation() && this.saveDB()) {
        this.$db('currentStep', 5)
        this.$f7.views.main.loadPage('/home/')
        return
      }
      this.$f7.alert('Lütfen tabloyu doldurun.', '')
    },
    saveDB() {
      if (!navigator.onLine) {
        window.f7.addNotification({
          title: 'Offline',
          message: 'İnternet bağlantısı gerekli.',
          hold: 3000,
          closeIcon: false,
        })
        return false
      }
      let saved = false
      setTimeout(() => {
        if (!saved) {
          this.$f7.showIndicator()
        }
      }, 1000)
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.solutions) {
        const el = this.solutions[r]

        window.db(`users/${this.$user.uid}/solutions`)
          .child(el.text).set({
            text: el.text,
            scores: el.scores,
            totalScore: el.totalScore,
            pp: el.pp,
            pn: el.pn,
            np: el.np,
            nn: el.nn,
          })
          .then(() => {
          })
          .catch(() => {
            this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Firebase')
            this.$f7.hideIndicator()
            return false
          })
      }

      window.db(`users/${this.$user.uid}`)
        .child('currentStep').set({
          step: 5,
        })
        .then(() => {
          saved = true
          this.$f7.hideIndicator()
        })
        .catch(() => {
          this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Firebase')
          saved = true
          this.$f7.hideIndicator()
          return false
        })
      return true
    },
  },

}
</script>
