<template>
  <div data-page="step24" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/step22/"><i class="icon icon-back"></i></a></div>
        <div class="center">{{title}}</div>
      </div>
    </div>

    <a v-show="!isCompleted()" href="#" class="floating-button" style="background:grey"><i class="material-icons">navigate_next</i></a>
    <a v-show="isCompleted() && isOrdered" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <a v-show="isCompleted() && !isOrdered" href="/step24/" class="floating-button color-purple" @click="orderReasons()"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div class="card-header" style="padding: 10px; color:gray; text-align: center">
          <div style="text-align: center; width: 100%">{{card_header}}</div>
        </div>
        <div class="list-block" style="padding:10px">
          <ul>
            <li v-for="i in reasons">
              <a :href="'/step25/' + i.text" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">{{i.text}}</div>
                  <div v-show="isReasonMatched(i)" class="item-after item-media"> {{i.totalScore}} <i class="icon material-icons color-purple">done</i></div>
                </div>
              </a>
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
      title: 'PUANLAMA',
      card_header: 'Lütfen nedenlere dokunarak puanlayın',
      reasons: [],
      symptoms: [],
      isOrdered: false,
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
    if (localStorage.getItem('symptoms')) {
      try {
        this.symptoms = JSON.parse(localStorage.getItem('symptoms'))
      } catch (e) {
        console.log('Local Storage Error')
      }
    }
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    isCompleted() {
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.reasons) {
        if (this.reasons[r].scores.length === 0) {
          return false
        }
      }
      return true
    },
    isReasonMatched(r) {
      return r.scores.length === 3
    },
    orderReasons() {
      const orderedReasons = []
      const reasons = this.reasons.slice()

      while (reasons.length > 0) {
        let min = 99999
        let minIndex = 0
        // eslint-disable-next-line no-restricted-syntax
        for (const r in reasons) {
          if (reasons[r].totalScore <= min) {
            min = reasons[r].totalScore
            minIndex = r
          }
        }
        orderedReasons.push(reasons[minIndex])
        reasons.splice(minIndex, 1)
      }
      this.reasons = orderedReasons.reverse()
      this.isOrdered = true
      this.$f7.alert('Nedenler puanlarına göre sıralandı. İlerlemek için tekrar dokunun.', '')
    },
    navigateURL() {
      console.log(this.saveDB())
      if (this.saveDB()) {
        console.log('saveDB')
        this.$db('currentStep', 3)
        this.$f7.views.main.loadPage('/step26/')
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

      let saved = false
      setTimeout(() => {
        if (!saved) {
          this.$f7.showIndicator()
        }
      }, 1000)
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.reasons) {
        // Show loading indicator with delay
        const el = this.reasons[r]

        window.db(`users/${this.$user.uid}/reasons`)
          .child(el.text).set({
            text: el.text,
            match: el.match,
            scores: el.scores,
            totalScore: el.totalScore,
          })
          .then(() => {
          })
          .catch(() => {
            this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Reason')
            this.$f7.hideIndicator()
            return false
          })
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.symptoms) {
        // Show loading indicator with delay
        const el = this.symptoms[r]

        window.db(`users/${this.$user.uid}/symptoms`)
          .child(el.text).set({
            text: el.text,
          })
          .then(() => {
          })
          .catch(() => {
            this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Symptom')
            this.$f7.hideIndicator()
            return false
          })
      }

      window.db(`users/${this.$user.uid}`)
        .child('currentStep').set({
          step: 3,
        })
        .then(() => {
          saved = true
          this.$f7.hideIndicator()
        })
        .catch(() => {
          this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Step')
          saved = true
          this.$f7.hideIndicator()
          return false
        })

      return true
    },
  },

}
</script>
