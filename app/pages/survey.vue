<template>
  <div data-page="progressbar" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left"><a :href="'/video/' + stepp" class="link icon-only"><i class="icon icon-back"></i></a></div>
        <div class="center">DUYGULARINIZ</div>
      </div>
    </div>

    <a :href="'/step' + stepp + '1/'" class="floating-button color-purple""><i class="material-icons">navigate_next</i></a>

    <!-- SAYI INPUT 0-100 -->
    <div class="page-content" style="background-color: #f0d2f0">
      <br />
      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center>Bugün ne kadar mutlu hissediyorsun?</center></div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media">{{score1}}</div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider color-purple">
                    <input v-model.number="score1" type="range" min="0" max="100" value="0" step="10">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center>Bugün kendinizi ne kadar seviyorsun?</center></div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media">{{score2}}</div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider color-purple">
                    <input v-model.number="score2" type="range" min="0" max="100" value="0" step="10">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center>Bugün kendinize ne kadar güveniyorsunuz?</center></div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media">{{score3}}</div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider color-purple">
                    <input v-model.number="score3" type="range" min="0" max="100" value="0" step="10">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="card" style="border-radius: 20px">
        <div class="card-header"><center>Bugün kendinizi ne kadar tanıdığınızı hissediyorsunuz?</center></div>
        <div class="card-content">
          <div class="list-block">
            <div class="item-content">
              <div class="item-media">{{score4}}</div>
              <div class="item-inner">
                <div class="item-input">
                  <div class="range-slider color-purple">
                    <input v-model.number="score4" type="range" min="0" max="100" value="0" step="10">
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
      stepp: 0,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,

    }
  },
  created() {
    if (this.$db('currentStep') === 7) {
      this.stepp = 8
    } else {
      this.stepp = this.$db('currentStep')
    }
    console.log(this.stepp)
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
  },
}
</script>
