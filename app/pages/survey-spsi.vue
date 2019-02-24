<template>
  <div data-page="cards" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">SPSI TESTİ</div>
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
                <li style="margin: 0 10px 0 10px"><a round="true "class="button button-raised button-fill color-purple" style="border-radius: 50px" @click="select(c)">{{c}}</a></li>
              </span>
              <br />
            </ul>
          </div>
        </div>
      </div>

      <div v-if="current === 0" class="card" style="border-radius: 20px; padding-top: 30px; padding-bottom: 30px; width:90%; position: absolute; left: 2.5%">
        <div style="margin: 10px; text-align: center; font-size: 24px"> SPSI testine başlamak için ilerle</div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      q: {},
      current: 0,
      choices: [
        'Benim için hiç doğru değil',
        'Benim için birazcık doğru',
        'Benim için kısmen doğru',
        'Benim için çok doğru',
        'Benim için tamamen doğru',
      ],
      questions: [
        {
          id: 0,
          text: '',
        },
        {
          id: 1,
          text: 'Çözmem gereken önemli bir sorunum olduğunda, kendimi tehdit edilmiş ve korkmuş hissederim',
        },
        {
          id: 2,
          text: 'Karar verirken, bütün seçenekleri yeterince dikkatli bir şekilde değerlendirmem',
        },
        {
          id: 3,
          text: 'Önemli bir karar almam gerektiği zaman kendimi gergin hissederim ve kendimden emin olamam',
        },
        {
          id: 4,
          text: 'Bir sorunu çözmek için ilk baştaki çabalarım başarısız olduğunda, vazgeçmeyip kolayca pes etmezsem sonunda iyi bir çözüm bulacağımın farkındayımdır',
        },
        {
          id: 5,
          text: 'Bir sorunum olduğunda, çözülebileceğine inanırım',
        },
        {
          id: 6,
          text: 'Kendim çözmeye çalışmadan önce, bir sorunun kendiliğinden çözülüp çözülmeyeceğini görmek için beklerim',
        },
        {
          id: 7,
          text: 'Bir sorunu çözmede ilk çabalarım başarısız olduğu zaman çok fazla hayal kırıklığı yaşarım',
        },
        {
          id: 8,
          text: 'Zor bir sorunla karşılaştığımda, ne kadar çok çalışırsam çalışayım kendi başıma çözebileceğimden şüphe ederim.',
        },
        {
          id: 9,
          text: 'Hayatımda bir sorun ortaya çıktığında, çözmeye çalışmayı olabildiğince ertelerim.',
        },
        {
          id: 10,
          text: 'Sorunlarla uğraşmaktan kaçınmak için hayatımın akışını değiştiririm.',
        },
        {
          id: 11,
          text: 'Zor sorunlar beni üzer ve telaşlandırır',
        },
        {
          id: 12,
          text: 'Vermem gereken bir karar olduğunda, her seçeneğin olumlu ve olumsuz sonuçlarını tahmin etmeye çalışırım',
        },
        {
          id: 13,
          text: 'Hayatımda sorunlar ortaya çıktığında, mümkün olan en kısa süre içerisinde onları çözmek isterim',
        },
        {
          id: 14,
          text: 'Bir sorunu çözmeye çalıştığımda, aklıma gelen ilk iyi fikirle hareket ederim',
        },
        {
          id: 15,
          text: 'Zor bir sorunla karşılaştığımda, yeterince gayretli çalışırsam onu tek başıma çözebileceğime inanırım',
        },
        {
          id: 16,
          text: 'Çözmem gereken bir sorun olduğunda, ilk yaptığım işlerden birisi sorun hakkında olabildiğince fazla bilgi toplamaktır',
        },
        {
          id: 17,
          text: 'Hayatımdaki sorunları çözmeyi, bıçak kemiğe dayanıncaya kadar ertelerim',
        },
        {
          id: 18,
          text: 'Sorunlardan kaçmaya onları çözmekten daha fazla zaman harcıyorum',
        },
        {
          id: 19,
          text: 'Bir sorunu çözmeye çalışmadan önce, tam olarak neye ulaşmak istediğimi bilebilmek için kendime bir hedef belirlerim',
        },
        {
          id: 20,
          text: 'Bir karar vermem gerektiği zaman, her bir seçeneğin olumlu ve olumsuz yönlerini düşünmek için zaman harcamam',
        },
        {
          id: 21,
          text: 'Bir sorunu çözdüğümde, sorunla ilgili durumun olumlu yönde ne kadar değiştiğini olabildiğince dikkatli bir biçimde değerlendirmeye çalışırım',
        },
        {
          id: 22,
          text: 'Bir sorunum olduğunda, sorunu olumlu yönde faydalanılabilecek bir fırsat olarak görmeye çalışırım',
        },
        {
          id: 23,
          text: 'Bir sorunu çözmeye çalıştığımda, olabildiğince fazla çözüm seçeneği düşünmeye çalışırım; ta ki aklıma başka bir düşünce gelmeyinceye kadar',
        },
        {
          id: 24,
          text: 'Karar alırken, her seçeneğin sonuçlarını düşünmeden içimden gelen duygularla hareket ederim',
        },
        {
          id: 25,
          text: 'Karar vermem söz konusu olduğunda çok fazla düşünmeden hareket ederim',
        },
      ],
    }
  },
  created() {
    this.current = this.$db('survey')
    this.q = this.questions[this.current]
    console.log(this.current)
  },
  methods: {
    navigateURL() {
      if (this.current === 25) {
        this.$db('survey', 0)
        this.$f7.views.main.loadPage('/survey-selfesteem/')
      } else {
        this.$db('survey', this.current + 1)
        this.$f7.views.main.refreshPage()
        // this.$f7.views.main.loadPage(`/survey-spsi/`)
      }
    },
    select(c) {
      const score = this.choices.indexOf(c)
      let total = 0
      try {
        total = this.$db('spsi')
        if (total === null) {
          total = 0
        }
      } catch (e) {
        total = 0
      }
      switch (this.current) {
        case 4:
        case 5:
        case 13:
        case 15:
        case 22:
        case 12:
        case 16:
        case 19:
        case 21:
        case 23:
          total += score / 5
          break
        case 1:
        case 3:
        case 7:
        case 8:
        case 11:
        case 2:
        case 14:
        case 20:
        case 24:
        case 25:
        case 6:
        case 9:
        case 10:
        case 17:
        case 18:
          total += 4 - (score / 5)
          break
        default:
      }
      this.$db('spsi', total)
      this.navigateURL()
    },
  },

}
</script>
