<template>
  <div data-page="sign-up" class="page kitchen-sink-material">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">Kayıt</div>
      </div>
    </div>
    <a class="floating-button color-purple" @click="apply"><i class="material-icons">navigate_next</i></a>
    <div class="page-content" style="background-color: #f0d2f0">
      <form class="list-block inputs-list">

        <div class="card" style="border-radius: 20px">
          <div class="card-content">
            <div class="list-block">
              <div class="item-content">
                <div class="item-media"><i class="icon material-icons"></i></div>
                <div class="item-inner">
                  <div class="item-title floating-label">İsim</div>
                  <div class="item-input">
                    <input v-model="name" type="text" placeholder="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div class="card" style="border-radius: 20px">
          <div class="card-content">
            <div class="list-block">
              <div class="item-content">
                <div class="item-media"><i class="icon material-icons"></i></div>
                <div class="item-inner">
                  <div class="item-title floating-label">Cinsiyet</div>
                  <div class="item-input">
                    <select v-model="gender">
                      <option value=""> </option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div class="card" style="border-radius: 20px">
          <div class="card-content">
            <div class="list-block">
              <div class="item-content">
                <div class="item-media"><i class="icon material-icons"></i></div>
                <div class="item-inner">
                  <div class="item-title label">Doğum Tarihi</div>
                  <div class="item-input">
                    <input v-model="birthDate" type="date" placeholder="Birth day" value="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />

      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      gender: '',
      birthDate: '',
    }
  },

  methods: {
    apply() {
      this.$db('userInfo', {
        name: this.name,
        gender: this.gender,
        birthDate: this.birthDate,
      })
      this.saveDB()
    },

    saveDB() {
      if (!navigator.onLine) {
        window.f7.addNotification({
          title: 'Offline',
          message: 'İnternet bağlantısı gerekli.',
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
      window.db(`users/${this.$user.uid}`)
        .child('info').set({
          name: this.name,
          gender: this.gender,
          birthDate: this.birthDate,
        })
        .then(() => {
          saved = true
          this.$f7.hideIndicator()
          this.$f7.views.main.loadPage('/home/')
        })
        .catch(() => {
          this.$f7.alert('Cannot save new task :-(<br />Please try again later', 'Trouble with Firebase')
          saved = true
          this.$f7.hideIndicator()
        })
    },
  },
}
</script>
