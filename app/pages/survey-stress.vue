<template>
  <div data-page="cards" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">STRES TESTİ</div>
      </div>
    </div>
    <a v-if="current === 0" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0; display: flex; align-items: center">
      <div v-if="current !== 0" class="card" style="border-radius: 20px; width:90%; position: absolute; left: 2.5%">
        <div class="card-header" ><center>{{q.text}}</center></div>
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
        <div style="margin: 10px; text-align: center; font-size: 24px"> Stres testine başlamak için ilerle</div>
      </div>

    </div>
  </div>
</template>
<script>
/* İLK PARAM 0 GİRİŞ -> PARAM:1 1. SORU INDEX -1 */
export default {
  created() {
    this.current = this.$db('survey')
    this.q = this.questions[this.current]
    console.log(this.current)
  },
  methods: {
    navigateURL() {
      if (this.current === 14) {
        this.$db('survey', 0)
        this.saveDB()

        this.$db('survey-satisfaction', 0)
        this.$db('survey-selfesteem', 0)
        this.$db('survey-spsi', 0)
        this.$db('survey-stress', 0)
        this.$db('survey-bdi', 0)

        if (this.$db('currentStep') === 1) {
          this.$f7.views.main.loadPage('/step12/')
        } else {
          this.$db('currentStep', 8)
          this.$f7.views.main.loadPage('/home/')
        }
      } else {
        this.$db('survey', this.current + 1)
        this.$f7.views.main.refreshPage()
      }
    },
    select(c) {
      const score = this.choices.indexOf(c) + 1
      try {
        const total = this.$db('stress')
        this.$db('stress', score + total)
      } catch (e) {
        this.$db('stress', score)
      }
      this.navigateURL()
    },
    saveDB() {
      if (!navigator.onLine) {
        window.f7.addNotification({
          title: 'Offline',
          message: 'This action is not possible in offline mode.',
          hold: 3000,
          closeIcon: false,
        })
        return
      }

      // Show loading indicator with delay
      let saved = false
      setTimeout(() => {
        if (!saved) {
          this.$f7.showIndicator()
        }
      }, 1000)
      console.log(this.$db('survey-bdi'))
      console.log(this.$db('currentStep'))
      window.db(`users/${this.$user.uid}/detailed-surveys`)
        .child(this.$db('currentStep')).set({
          bdi: this.$db('bdi'),
          satisfaction: this.$db('satisfaction'),
          selfesteem: this.$db('selfesteem'),
          spsi: this.$db('spsi'),
          stress: this.$db('stress'),
        })
        .then(() => {
          saved = true
          this.$f7.hideIndicator()
          if (this.$db('currentStep') === 1) {
            this.$f7.views.main.loadPage('/step12/')
          } else {
            this.$f7.views.main.loadPage('/home/')
          }
        })
        .catch(() => {
          this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Firebase')
          saved = true
          this.$f7.hideIndicator()
        })
    },
  },
  data() {
    return {
      current: 0,
      choices: [
        'Hiçbir Zaman',
        'Neredeyse Hiçbir Zaman',
        'Bazen',
        'Oldukça Sık',
        'Çok Sık',
      ],
      questions: [
        {
          id: 0,
          text: '',
        },
        {
          id: 1,
          text: 'Geçen ay, beklenmedik bir şeylerin olması nedeniyle ne sıklıkta rahatsızlık duydunuz?',
        },
        {
          id: 2,
          text: 'Geçen ay, yaşamınızdaki önemli şeyleri kontrol edemediğinizi ne sıklıkta hissettiniz?',
        },
        {
          id: 3,
          text: 'Geçen ay, kendinizi ne sıklıkta sinirli ve stresli hissettiniz?',
        },
        {
          id: 4,
          text: 'Geçen ay, ne sıklıkta gündelik zorlukların üstesinden başarıyla geldiniz?',
        },
        {
          id: 5,
          text: 'Geçen ay, yaşamınızda ortaya çıkan önemli değişikliklerle etkili bir şekilde başa çıktığınızı ne sıklıkta hissettiniz?',
        },
        {
          id: 6,
          text: 'Geçen ay, kişisel sorunlarınızı ele alma yeteneğinize ne sıklıkta güven duydunuz?',
        },
        {
          id: 7,
          text: 'Geçen ay, her şeyin yolunda gittiğini ne sıklıkta hissettiniz?',
        },
        {
          id: 8,
          text: 'Geçen ay, ne sıklıkta yapmanız gereken şeylerle başa çıkamadığınızı fark ettiniz?',
        },
        {
          id: 9,
          text: 'Geçen ay, yaşamınızdaki zorlukları ne sıklıkta kontrol edebildiniz?',
        },
        {
          id: 10,
          text: 'Geçen ay, ne sıklıkta her şeyin üstesinden geldiğinizi hissettiniz?',
        },
        {
          id: 11,
          text: 'Geçen ay, ne sıklıkta kontrolünüz dışında gelişen olaylar yüzünden öfkelendiniz?',
        },
        {
          id: 12,
          text: 'Geçen ay, kendinizi ne sıklıkta başarmak zorunda olduğunuz şeyleri düşünürken buldunuz?',
        },
        {
          id: 13,
          text: 'Geçen ay, ne sıklıkta zamanınızı nasıl kullanacağınızı kontrol edebildiniz?',
        },
        {
          id: 14,
          text: 'Geçen ay, ne sıklıkta problemlerin üstesinden gelemeyeceğiniz kadar biriktiğini hissettiniz?',
        },
      ],
    }
  },
}
</script>
