<template>
  <div data-page="list-view" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/step51/"><i class="icon icon-back"></i></a></div>
        <div class="center"> {{title}} </div>
      </div>
    </div>

    <a v-show="!isCompleted()" href="#" class="floating-button" style="background:grey" @click="validationAlert()"><i class="material-icons">navigate_next</i></a>
    <a v-show="isCompleted() && isOrdered" href="/step54/" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <a v-show="isCompleted() && !isOrdered" href="/step52/" class="floating-button color-purple" @click="orderSolutions()"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div class="card-header"><div style="text-align:center; width: 100%"> {{card_header}} </div> </div>

        <div class="list-block" style="padding-bottom: 10px; padding-top: 10px">
          <ul>
            <li v-for="i in solutions">
              <a :href="'/step53/' + i.text" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title">{{i.text}}</div>
                  <div v-show="isSolutionMatched(i)" class="item-after item-media">
                    {{i.totalScore}}
                    <i class="icon material-icons color-purple">done</i>
                  </div>
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
      title: 'ÇÖZÜM TABLOSU',
      card_header: 'Çözüm Önerileri',
      solutions: [],
      isOrdered: false,
    }
  },
  created() {
    if (localStorage.getItem('solutions')) {
      try {
        this.solutions = JSON.parse(localStorage.getItem('solutions'))
        console.log(`${this.solutions.length} solutions found in local storage!`)
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
      for (const s in this.solutions) {
        if (this.solutions[s].scores.length === 0) {
          return false
        }
      }
      return true
    },
    validationAlert() {
      if (!this.isCompleted()) {
        this.$f7.alert('Lütfen tabloyu doldurun.', '')
      }
    },
    isSolutionMatched(s) {
      return s.scores.length === 4
    },
    orderSolutions() {
      const orderedSolutions = []
      const solutions = this.solutions.slice()

      while (solutions.length > 0) {
        let min = 99999
        let minIndex = 0
        // eslint-disable-next-line no-restricted-syntax
        for (const r in solutions) {
          if (solutions[r].totalScore <= min) {
            min = solutions[r].totalScore
            minIndex = r
          }
        }
        orderedSolutions.push(solutions[minIndex])
        solutions.splice(minIndex, 1)
      }
      this.solutions = orderedSolutions.reverse()
      this.isOrdered = true
      this.$db('bestSolutionID', 0)
      console.log(this.solutions)
      this.$f7.alert('Çözümler puanlarına göre sıralandı.', '')
    },
    navigateURL() {
      if (this.saveDB()) {
        this.$db('currentStep', 6)
        console.log('------')
        console.log(this.$db('currentStep'))
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
      let saved = false
      setTimeout(() => {
        if (!saved) {
          this.$f7.showIndicator()
        }
      }, 1000)
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.solutions) {
        // Show loading indicator with delay
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
          step: 6,
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
