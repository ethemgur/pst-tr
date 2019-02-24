<template>
  <div data-page="step21" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link icon-only" href="/home/"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">BELİRTİLER</div>
        <div class="right">
          <a class="link icon-only" href="#" @click="symptomPrompt"><i class="icon icon-plus"></i></a>
        </div>
      </div>
    </div>

    <a href="#" class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px; padding: 10px">
        <div class="list-block">
          <ul>
            <li style="color:gray; text-align: center" v-show="symptoms.length===0">
              Henüz herhangi bir belirti girmediniz.<br />
              Lütfen sağ üstteki "<b>+</b>" işaretine basarak belirti ekleyin.
            </li>
            <li class="item" v-for="i in symptoms" style="margin: 5px 0 5px 0">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title" style="color:#9c27b0">{{i.text}}</div>
                  <div class="item-after"><i class="material-icons" style="color:#9c27b0" @click="removeSymptom(i)">clear</i></div>
                </div>
              </div>
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
      symptoms: [],
    }
  },
  created() {
    if (localStorage.getItem('symptoms') !== null) {
      this.symptoms = JSON.parse(localStorage.getItem('symptoms'))
    } else {
      this.symptoms = []
    }
    console.log(localStorage.getItem('symptoms') === null)
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    symptomPrompt() {
      this.$f7.prompt('Yeni belirti ekle', '', (data) => {
        if (data !== '') {
          this.symptoms.push({
            text: data,
          })
          this.saveSymptoms()
          console.log(`${data} is added!`)
        } else {
          this.symptomPrompt()
        }
      })
    },
    removeSymptom(value) {
      const index = this.symptoms.indexOf(value)
      this.symptoms.splice(index, 1)
      this.saveSymptoms()
    },
    saveSymptoms() {
      localStorage.setItem('symptoms', JSON.stringify(this.symptoms))
    },
    validation() {
      if (this.symptoms.length === 0) {
        return false
      }
      return true
    },
    navigateURL() {
      console.log('nextnav')
      if (this.validation()) {
        this.$f7.views.main.loadPage('/step212/')
        return
      }
      this.$f7.alert('Lütfen tabloyu doldurun.', '')
    },
  },

}
</script>
