<template>
  <div data-page="step61" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="back link icon-only" href="#"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">6. AŞAMA</div>
        <div class="right">
          <a class="link icon-only" href="#" @click="solutionPrompt"><i class="icon icon-plus"></i></a>
        </div>
      </div>
    </div>

    <a class="floating-button color-purple" @click="navigateURL"><i class="material-icons">navigate_next</i></a>

    <div class="page-content" style="background-color: #f0d2f0">
      <div class="card" style="border-radius: 20px">
        <div style="text-align:center; font-size:16px; padding: 10px">
          En iyi çözüm: <br />{{solution.text}}
        </div>
      </div>
      <div class="card" style="border-radius: 20px; margin-top: 20px; padding-bottom: 10px">
        <div class="card-header" style="padding: 10px; text-align:center"> Çözümünü <b>uygulamamanın olumlu</b> sonuçları </div>
        <div class="card-content">
          <div class="list-block" style="margin-top: 10px">
            <ul>
              <li style="color:gray; text-align:center" v-show="items.length===0">
                  Henüz herhangi bir sonuç girmediniz.<br />
                  Lütfen sağ üstteki "<b>+</b>" işaretine basarak sonuç ekleyin.
              </li>
              <li class="item" v-for="i in items">
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">{{i}}</div>
                    <div class="item-after"><i class="material-icons" style="color:#9c27b0" @click="removeSolution(i)">clear</i></div>
                  </div>
                </div>
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
      solution: {},
      items: [],
    }
  },

  created() {
    this.solution = this.$db('bestSolution')
    this.items = this.solution.np
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    solutionPrompt() {
      this.$f7.prompt('Yeni sonuç ekle', '', (data) => {
        if (data !== '') {
          this.items.push(data)
          console.log(`${data} is added!`)
          this.saveSolution()
        } else {
          this.solutionsPrompt()
        }
      })
    },
    removeSolution(value) {
      const index = this.items.indexOf(value)
      this.items.splice(index, 1)
      this.saveSolutions()
    },
    saveSolution() {
      this.solution.np = this.items
      this.$db('bestSolution', this.solution)
    },
    validation() {
      if (this.items.length === 0) {
        return false
      }
      return true
    },
    navigateURL() {
      if (this.validation()) {
        this.$f7.views.main.loadPage('/step64/')
        return
      }
      this.$f7.alert('Lütfen tabloyu doldurun.')
    },
  },
}
</script>
