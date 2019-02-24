<template>
  <div data-page="step32" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="back link icon-only" href="#"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">{{title}}</div>
      </div>
    </div>

    <a href="/step33/" v-show="validation()" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <a href="#" v-show="!validation()" class="floating-button color-grey" @click="validationAlert()"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="content">
        <div class="card" style="border-radius: 20px;">
          <div class="card-header"> <div style="text-align:center; width: 100%"> {{card_header}} {{bestReason.text}} </div></div>
          <div class="card-content">
            <div class="list-block inputs-list" style= "padding-bottom: 15px">
              <ul>
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon material-icons">label_outline</i></div>
                    <div class="item-inner">
                      <div class="item-title floating-label">{{goal}}</div>
                      <div class="item-input">
                        <input v-model="goal1" type="text" placeholder="">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon material-icons">label_outline</i></div>
                    <div class="item-inner">
                      <div class="item-title floating-label">{{goal}}</div>
                      <div class="item-input">
                        <input v-model="goal2" type="text" placeholder="">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.content{
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%)
}
.text{
  text-align: center;
  font-size: 24px;
}
</style>

<script>
export default {
  data() {
    return {
      title: 'HEDEF BELİRLEME',
      card_header: 'En önemli sorun: ',
      goal: 'Hedef',
      reasons: [],
      goal1: '',
      goal2: '',
      bestReason: {},
    }
  },

  created() {
    if (localStorage.getItem('reasons')) {
      try {
        this.reasons = JSON.parse(localStorage.getItem('reasons'))
      } catch (e) {
        console.log('Local Storage Error')
      }
    }

    this.getBestReason()
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    getBestReason() {
      let totalScore = 0
      let bestReason = {}
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.reasons) {
        const reason = this.reasons[r]
        if (reason.totalScore > totalScore) {
          totalScore = reason.totalScore
          bestReason = reason
        }
      }
      this.bestReason = bestReason
    },
    saveGoals() {
      const goals = [this.goal1, this.goal2]
      localStorage.setItem('goals', JSON.stringify(goals))
    },
    validation() {
      const val1 = this.goal1.length !== 0 && this.goal1.trim()
      const val2 = this.goal2.length !== 0 && this.goal2.trim()
      return (val1 || val2)
    },
    validationAlert() {
      if (!this.validation()) {
        this.$f7.alert('Lütfen en az bir hedef giriniz.', '')
      }
    },
    navigateURL() {
      this.saveGoals()
      if (this.saveDB()) {
        this.$db('currentStep', 4)
        this.$f7.views.main.loadPage('/home/')
      }
    },
    saveDB() {
      if (!navigator.onLine) {
        window.f7.addNotification({
          title: 'Offline',
          message: 'This action is not possible in offline mode.',
          hold: 3000,
          closeIcon: false,
        })
        return false
      }

      // Show loading indicator with delay
      let saved = false
      setTimeout(() => {
        if (!saved) {
          this.$f7.showIndicator()
        }
      }, 1000)
      window.db(`users/${this.$user.uid}`)
        .child('goals').set({
          goal1: this.goal1,
          goal2: this.goal2,
        })
        .then(() => {
        })
        .catch(() => {
          this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Firebase')
          this.$f7.hideIndicator()
          return false
        })

      window.db(`users/${this.$user.uid}`)
        .child('currentStep').set({
          step: 4,
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
