<template>
  <div data-page="cards" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">MEMNUNİYET TESTİ</div>
      </div>
    </div>
    <a v-if="current === 0" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0; display: flex; align-items: center">
      <div v-if="current !== 0" class="card" style="border-radius: 20px; width:90%; position: absolute; left: 2.5%">
        <div class="card-header"><center>{{q.text}}</center></div>
        <div class="card-content">
          <div class="list-block">
            <ul>
              <span v-for="c in choices">
                <br />
                <li style="margin: 0 10px 0 10px"><a href="#" round="true "class="button button-raised button-fill color-purple" style="border-radius: 50px" @click="select(c)">{{c}}</a></li>
              </span>
                <br />
            </ul>
          </div>
        </div>
      </div>

      <div v-if="current === 0" class="card" style="border-radius: 20px; padding-top: 30px; padding-bottom: 30px; width:90%; position: absolute; left: 2.5%">
        <div style="margin: 10px; text-align: center; font-size: 24px"> Memnuniyet testine başlamak için ilerle</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.current = this.$db('survey')
    this.q = this.questions[this.current]
    console.log(this.current)
  },
  methods: {
    navigateURL() {
      if (this.current === 6) {
        this.$db('survey', 0)
        this.$f7.views.main.loadPage('/survey-stress/')
      } else {
        this.$db('survey', this.current + 1)
        this.$f7.views.main.refreshPage()
      }
    },
    select(c) {
      const score = this.choices.indexOf(c) + 1
      try {
        const total = this.$db('satisfaction')
        this.$db('satisfaction', score + total)
      } catch (e) {
        this.$db('satisfaction', score)
      }
      this.navigateURL()
    },
  },
  data() {
    return {
      q: {},
      current: 0,
      choices: [
        'Kesinlikle katılmıyorum',
        'Katılmıyorum',
        'Biraz katılmıyorum',
        'Biraz katılıyorum',
        'Katılıyorum',
        'Kesinlikle katılıyorum',
      ],
      questions: [
        {
          id: 0,
          text: '',
        },
        {
          id: 1,
          text: 'Hayatım birçok yönlerden idealimdekine yakın',
        },
        {
          id: 2,
          text: 'Hayat şartlarım mükemmel',
        },
        {
          id: 3,
          text: 'Hayatımdan memnunum',
        },
        {
          id: 4,
          text: 'Hayatım, yakın çevremdekilerin çoğunun hayatından daha iyi',
        },
        {
          id: 5,
          text: 'Hayattan şimdiye kadar istediğim önemli şeyleri elde ettim',
        },
        {
          id: 6,
          text: 'Eğer hayata yeniden başlasaydım hemen hemen hiçbir şeyi değiştirmezdim',
        },
      ],
    }
  },
}
</script>
