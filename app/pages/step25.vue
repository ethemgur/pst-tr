<template>
  <div data-page="forms-checkboxes" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="link icon-only" href="/step24/"><i class="icon icon-back"></i></a></div>
        <div class="center">{{el.text}}</div>
      </div>
    </div>
    <a href="/step24/" class="floating-button color-purple" @click="mergeChoices()"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div class="card-header" style="margin:10px; color:gray; text-align: center">{{card_header1}}</div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media"><p>{{score1}}</p></div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider">
                    <input v-model.number="score1" type="range" min="0" max="100" value="0" step="10">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="border-radius: 20px">
        <div class="card-header" style="margin:10px; color:gray; text-align: center">{{card_header2}}</div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media"><p>{{score2}}</p></div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider">
                    <input v-model.number="score2" type="range" min="0" max="100" step="10" value="0">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card_header1: 'Bu nedenin belirtiniz üzerinde ne kadar etkili?',
      card_header2: 'Eğer bu nedeni ortadan kaldırırsanız belirtiniz ne kadar azalır?',
      reasons: [],
      el: {},
      score1: 0,
      score2: 0,
      score3: 0,
    }
  },

  created() {
    if (localStorage.getItem('reasons')) {
      try {
        this.reasons = JSON.parse(localStorage.getItem('reasons'))
        console.log(`${this.reasons.length} reasons found in local storage!`)
        this.el = this.reasons[this.getItemIndex(this.$route.params.id)]
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
    mergeChoices() {
      const scoresList = [this.score1, this.score2, this.score3]
      this.reasons[this.getItemIndex(this.$route.params.id)].scores = scoresList
      const totalScore = this.score1 + this.score2 + this.score3
      this.reasons[this.getItemIndex(this.$route.params.id)].totalScore = totalScore
      localStorage.setItem('reasons', JSON.stringify(this.reasons))
    },
    getItemIndex(text) {
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.reasons) {
        if (this.reasons[r].text === text) {
          return r
        }
      }
      return -1
    },
  },

}
</script>
