<template>
  <div data-page="cards" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">ÖZGÜVEN TESTİ</div>
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
        <div style="margin: 10px; text-align: center; font-size: 24px"> Özgüven testine başlamak için ilerle</div>
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
      if (this.current === 10) {
        this.$db('survey', 0)
        this.$f7.views.main.loadPage('/survey-bdi/')
      } else {
        this.$db('survey', this.current + 1)
        this.$f7.views.main.refreshPage()
      }
    },
    select(c) {
      const score = this.choices.indexOf(c) + 1
      try {
        const total = this.$db('selfesteem')
        this.$db('selfesteem', score + total)
      } catch (e) {
        this.$db('selfesteem', score)
      }
      this.navigateURL()
    },
  },
  data() {
    return {
      q: {},
      current: 0,
      choices: [
        'Çok doğru',
        'Doğru',
        'Yanlış',
        'Çok yanlış',
      ],
      questions: [
        {
          id: 0,
          text: '',
        },
        {
          id: 1,
          text: 'Kendimi en az diğer insanlar kadar değerli buluyorum..',
        },
        {
          id: 2,
          text: 'Bazı olumlu özelliklerim olduğunu düşünüyorum.',
        },
        {
          id: 3,
          text: 'Genelde kendimi başarısız biri olarak görme eğilimindeyim.',
        },
        {
          id: 4,
          text: 'Ben de diğer insanların bir çoğunun yapabildiği kadar bir şeyler yapabilirim.',
        },
        {
          id: 5,
          text: 'Kendimde gurur duyacak fazla bir şey bulamıyorum.',
        },
        {
          id: 6,
          text: 'Kendime karşı olumlu bir tutum içerisindeyim.',
        },
        {
          id: 7,
          text: 'Genel olarak kendimden memnunum.',
        },
        {
          id: 8,
          text: 'Kendime karşı daha fazla saygı duyabilmeyi isterdim.',
        },
        {
          id: 9,
          text: 'Bazen kesinlikle kendimin bir işe yaramadığını düşünüyorum.',
        },
        {
          id: 10,
          text: 'Bazen kendimin hiç de yeterli olmadığımı düşünüyorum.',
        },
      ],
    }
  },
}
</script>
