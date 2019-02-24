<template>
  <div data-page="cards" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link icon-only" href="/home/"><i class="icon icon-back"></i></a>
        </div>
        <div class="center">6. AŞAMA</div>
      </div>
    </div>
    <div class="page-content" style="background-color: #f0d2f0; display: flex; align-items: center">
      <div class="card" style="border-radius: 20px; width:100%">
        <div class="card-header"><div style="text-align:center; width: 100%">Bu çözümü uygulamak kazançlı mı?</div></div>
        <div class="card-content">
          <div class="list-block" style="padding: 20px 10px">
            <ul>
              <li><a href="#" round="true "class="button button-raised button-fill color-purple" @click="select(true)" style="border-radius: 20px">Evet</a></li>
            </br>
            <li><a href="#" round="true "class="button button-raised button-fill color-purple" @click="select(false)" style="border-radius: 20px">Hayır</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  created() {
    document.addEventListener('backbutton', this.onBackKeyDown, false)
  },
  methods: {
    onBackKeyDown() {
      this.$f7.views.main.loadPage('/home/')
    },
    select(c) {
      if (c === true) {
        this.$f7.views.main.loadPage('/step71/')
      } else {
        const el = JSON.parse(localStorage.getItem('solutions'))
        el.splice(0, 1)
        localStorage.setItem('solutions', JSON.stringify(el))
        if (el.length > 0) {
          this.$f7.views.main.loadPage('/step66/')
        } else {
          this.$f7.views.main.loadPage('/step67/')
        }
      }
    },
  },
}
</script>
