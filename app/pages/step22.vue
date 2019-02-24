<template>
  <div data-page="step22" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link icon-only" href="/step212/"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">{{title}}</div>
      </div>
    </div>
    <a v-show="!isCompleted()" href="#" class="floating-button" style="background:grey"><i class="material-icons">navigate_next</i></a>
    <a v-show="isCompleted()" href="/step24/" class="floating-button color-purple"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div class="card-header" style="padding:10px; color:gray; text-align:center">{{card_header}}</div>
        <div class="card-content">
          <div class="list-block" style="padding:10px">
            <ul>
              <li v-for="i in reasons">
                <a :href="'/step23/' + i.text" class="item-link item-content">
                  <div class="item-inner">
                    <div class="item-title">{{i.text}}</div>
                    <div class="item-after item-media"><i v-show="isReasonMatched(i)" class="icon material-icons color-purple">done</i></div>
                  </div>
                </a>
              </li>
            </ul>
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
      title: 'EŞLEŞTİRME',
      card_header: 'Lütfen nedenlere dokunarak uygun belirtiyi seçin',
      reasons: [],
    }
  },

  created() {
    if (localStorage.getItem('reasons')) {
      try {
        this.reasons = JSON.parse(localStorage.getItem('reasons'))
        console.log(`${this.reasons.length} reasons found in local storage!`)
      } catch (e) {
        console.log('Local Storage Error')
      }
    }
    console.log(this.reasons)
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    isCompleted() {
      // eslint-disable-next-line no-restricted-syntax
      for (const r in this.reasons) {
        if (this.reasons[r].match.length === 0) {
          return false
        }
      }
      return true
    },
    isReasonMatched(r) {
      return r.match.length !== 0
    },
  },

}
</script>
