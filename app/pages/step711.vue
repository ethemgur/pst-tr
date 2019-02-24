<template>
  <div data-page="step71" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link icon-only" href="/home/"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">Planlama</div>
        <div class="right">
          <a class="link icon-only" href="#" @click="planPrompt"><i class="icon icon-plus"></i></a>
        </div>
      </div>
    </div>

    <a class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px; padding: 10px; color:gray; text-align:center" v-show="plans.length===0">
        Henüz herhangi bir aşama girmediniz.<br />
        Lütfen sağ üstteki "<b>+</b>" işaretine basarak aşama ekleyin.
      </div>
      <span v-for="i in plans">
        <div class="card" style="border-radius: 20px; margin-bottom: 20px">
          <div class="card-header" style="padding: 10px">
            <div style="text-align:center; margin-left: auto; margin-right: auto">Aşama {{plans.indexOf(i) + 1}}</div>
            <i class="material-icons" style="color:#9c27b0" @click="removePlan(i)">clear</i>
          </div>
          <div class="card-content">
            <div class="card-content-inner">{{i.text}}</div>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      plans: [],
    }
  },
  created() {
    if (localStorage.getItem('plans')) {
      this.plans = JSON.parse(localStorage.getItem('plans'))
    } else {
      this.plans = []
    }
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    planPrompt() {
      this.$f7.prompt('Yeni aşama ekle', '', (data) => {
        if (data !== '') {
          this.plans.push({
            text: data,
          })
          this.savePlans()
          console.log(`${data} is added!`)
        } else {
          this.planPrompt()
        }
      })
    },
    removePlan(value) {
      const index = this.plans.indexOf(value)
      this.plans.splice(index, 1)
      this.savePlans()
    },
    savePlans() {
      localStorage.setItem('plans', JSON.stringify(this.plans))
    },
    validation() {
      if (this.plans.length === 0) {
        return false
      }
      return true
    },
    navigateURL() {
      if (this.validation()) {
        this.$f7.views.main.loadPage('/step72/')
      }
    },
    validationAlert() {
      if (!this.validation()) {
        this.$f7.alert('Lütfen tabloyu doldurun.', '')
      }
    },
  },

}
</script>
