<template>
  <div data-page="forms-checkboxes" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a class="back link icon-only" href="#"><i class="icon icon-back"></i></a></div>
        <div class="center">{{$route.params.id}}</div>
      </div>
    </div>

    <a href="/step52/" class="floating-button color-purple" @click="mergeChoices()"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center> {{card_header1}} </center></div>
        <div class="card-content">
          <div class="list-block" style="margin: 0">
            <div class="item-content">
              <div class="item-media"> {{score1}} </div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider">
                    <input v-model.number="score1" type="range" min="0" max="10" value="1" step="1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center> {{card_header2}} </center></div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media"> {{score2}} </div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider">
                    <input v-model.number="score2" type="range" min="0" max="10" step="1" value="1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center> {{card_header3}} </center></div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media"> {{score3}} </div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider">
                    <input v-model.number="score3" type="range" min="0" max="10" value="1" step="1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"> {{card_header4}} </div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media"><p>{{score4}}</p></div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider">
                    <input v-model.number="score4" type="range" min="0" max="10" value="1" step="1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card_header1: 'Sorunu Çözmeye Katkısı',
      card_header2: 'Hedefle Uyumluluğu',
      card_header3: 'Uygulanabilirliği',
      card_header4: 'Kabul Edilebilirliği',
      solutions: [],
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
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
    mergeChoices() {
      const scoresList = [this.score1, this.score2, this.score3, this.score4]
      this.solutions[this.getItemIndex(this.$route.params.id)].scores = scoresList
      const totalScore = this.score1 + this.score2 + this.score3 + this.score4
      this.solutions[this.getItemIndex(this.$route.params.id)].totalScore = totalScore
      localStorage.setItem('solutions', JSON.stringify(this.solutions))
      console.log('SOLUTION SCORES MERGED')
    },
    getItemIndex(text) {
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.solutions) {
        if (this.solutions[r].text === text) {
          return r
        }
      }
      return -1
    },
    saveSolutions() {
      localStorage.setItem('solutions', JSON.stringify(this.solutions))
    },
  },
}
</script>
