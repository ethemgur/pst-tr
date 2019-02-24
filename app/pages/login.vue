<template>
  <f7-page no-navbar no-toolbar no-swipeback layout="white">

    <!-- Title -->
    <f7-block style="text-align: center; font-size: 25px;">{{!$root.user ? text.titleSignIn : text.titleSignOut}}</f7-block>

    <!-- Sign in disabled alert -->
    <f7-block inner inset v-if="!firebaseConfig.allowEmailLogin && mode === 'signIn'">{{text.currentlyDisabled}}</f7-block>

    <!-- Form for email sign in / registration / password reset -->
    <f7-list form id="app-framework-login-screen" inset v-if="!$root.user && (firebaseConfig.allowEmailLogin || (firebaseConfig.allowEmailRegistration && mode === 'registration'))">
      <f7-list-item v-if="firebaseConfig.allowEmailLogin || (firebaseConfig.allowEmailRegistration && mode === 'registration')">
        <f7-label>{{text.email}}</f7-label>
        <f7-input type="email" :placeholder="text.email" v-model="email" />
      </f7-list-item>
      <f7-list-item v-if="(firebaseConfig.allowEmailLogin && mode === 'signIn') || (firebaseConfig.allowEmailRegistration && mode === 'registration')">
        <f7-label>{{text.password}}</f7-label>
        <f7-input type="password" :placeholder="text.password" v-model="password" />
      </f7-list-item>
      <f7-list-item v-if="firebaseConfig.allowEmailRegistration && mode === 'registration'">
        <f7-label>{{text.password}}</f7-label>
        <f7-input type="password" :placeholder="text.passwordConfirmation" v-model="passwordConfirmation" />
      </f7-list-item>
    </f7-list>

    <!-- Email sign in buttons -->
    <f7-block v-if="mode === 'signIn' && firebaseConfig.allowEmailLogin">
      <f7-button style="border-radius:20px" big round color="green" fill @click="handleSignIn">{{text.signIn}}</f7-button>
    </f7-block>

    <!-- Email registration buttons -->
    <f7-block v-if="mode === 'signIn' && firebaseConfig.allowEmailRegistration">
      <f7-button big style="border-radius:20px" raised color="green" @click="mode='registration'">{{text.createAccount}}</f7-button>
    </f7-block>
    <f7-block v-if="mode === 'registration' && firebaseConfig.allowEmailRegistration">
      <f7-button big style="border-radius:20px" raised color="green" fill @click="handleRegistration">{{text.handleRegistration}}</f7-button>
    </f7-block>

    <!-- Email reset buttons -->
    <f7-block v-if="mode === 'signIn' && firebaseConfig.allowEmailLogin">
      <f7-button big style="border-radius:20px" raised color="orange" @click="mode='reset'">{{text.resetPassword}}</f7-button>
    </f7-block>
    <f7-block v-if="mode === 'reset' && firebaseConfig.allowEmailLogin">
      <f7-button big style="border-radius:20px" raised color="orange" fill @click="handleReset">{{text.handleReset}}</f7-button>
    </f7-block>

    <!-- Logout button -->

    <f7-block v-if="mode === 'signOut'">
      <f7-button big style="border-radius:20px" raised color="red" fill @click="handleSignOut">{{text.signOut}}</f7-button>
    </f7-block>

    <!-- Cancel button -->
    <f7-block v-if="mode !== 'signIn'">
      <f7-button big style="border-radius:20px" raised color="red" @click="cancel">{{text.cancel}}</f7-button>
    </f7-block>

  </f7-page>
</template>
<script>
// Define text patterns
const text = {
  en: {
    titleSignIn: 'Giriş',
    titleSignOut: 'Çıkış',
    currentlyDisabled: 'The sign in is currently disabled.',
    email: 'Email',
    password: 'Şifre',
    passwordConfirmation: 'Onay',
    handleRegistration: 'Yeni hesap oluştur',
    handleReset: 'Şifreyi sıfırla',
    signIn: 'Giriş',
    signOut: 'Çıkış',
    createAccount: 'Yeni hesap oluştur',
    resetPassword: 'Şifreyi sıfırla',
    cancel: 'İptal',
    emailSent: 'Email gönderildi',
    checkYourInbox: 'Lütfen mail kutunuzu kontrol edin.',
    signOutDone: 'Çıkış yapıldı',
    accountCreated: 'Hesap oluşturuldu',
    error: 'Hata',
    errorOffline: 'İnternet bağlantısı gerekli.',
    errorNoEmail: 'Lütfen email adresinizi girin',
    errorNoPassword: 'Lütfen bir şifre girin.',
    errorPasswordsDifferent: 'İki farklı şifre girdiniz.',
    firebaseErrors: {
      'auth/email-already-in-use': 'Bu email adresi kullanımda.',
      'auth/invalid-email': 'Geçersiz email.',
      'auth/operation-not-allowed': 'Giriş geçersiz.',
      'auth/weak-password': 'Şifre güvenli değil.',
      'auth/user-not-found': 'Geçersiz email.',
      'auth/user-disabled': 'Hesap dondurulmuş.',
      'auth/wrong-password': 'Hatalı şifre.',
    },
  },
}
// Export module
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      mode: '',
    }
  },
  computed: {
    firebaseConfig() {
      return process.env.NODE_ENV === 'production' ? this.$root.config.firebase : this.$root.config.devFirebase
    },
    text() {
      return text[this.$root.language] || text.en
    },
  },
  created() {
    this.mode = 'signIn' // this.$root.user ? 'signOut' : 'signIn'
    this.$root.$signOut = this.handleSignOut
  },
  mounted() {
    // Workaround to close login popup on initial load and shift it back to the left -->
    // Close only if there are no login requiring pages on start or the user is logged in
    if ((!this.$root.loginRequiringPagesOnStart && !this.$root.config.loginRequiredForPages) || this.$root.user) {
      this.$f7.closeModal('#app-framework-login-popup', false)
    }
    this.$$('#app-framework-login-popup').css('left', '0')
  },
  methods: {
    cancel() {
      if (this.mode === 'reset' || this.mode === 'registration') {
        this.mode = this.$root.user ? 'signOut' : 'signIn'
      } else {
        // Reset form
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''
        this.mode = this.$root.user ? 'signOut' : 'signIn'
        // Reset required URLs
        this.$root.loginRequiringPages = []
        // Close popup
        // this.$f7.views.main.back()
        // this.$f7.closeModal('#app-framework-login-popup')
      }
    },
    handleSignIn() {
      if (navigator.onLine === false) {
        window.f7.alert(this.text.errorOffline, this.text.error)
      } else if (this.email === '') {
        window.f7.alert(this.text.errorNoEmail, this.text.error)
      } else if (this.password === '') {
        window.f7.alert(this.text.errorNoPassword, this.text.error)
      } else {
        // Show loading indicator
        window.f7.showIndicator()
        // Sign in user
        window.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        // On success
          .then((user) => {
            this.handleSignInDone()

            // GET USER INFO
            try {
              window.db(`users/${user.uid}/info`).on('value', (snapshot) => {
                this.$db('userInfo', snapshot.val())
              })
            } catch (e) {
              console.log(e)
            }

            // GET REASONS
            try {
              window.db(`users/${user.uid}/reasons`).on('value', (items) => {
              // eslint-disable-next-line no-restricted-syntax
                const data = items.val()
                const reasons = []
                const dataWithKeys = Object.keys(data).map((key) => {
                  const obj = data[key]
                  obj._key = key
                  return obj
                })
                for (const i in dataWithKeys) {
                  if (dataWithKeys.hasOwnProperty(i)) {
                    reasons.push(JSON.stringify({
                      text: i.text,
                      scores: i.scores,
                      match: i.match,
                      totalScore: i.totalScore,
                    }))
                  }
                }
                localStorage.setItem('reasons', reasons)
              })
            } catch (e) {
              console.log(e)
            }

            // GET SYMPTOMS
            try {
              window.db(`users/${user.uid}/symptoms`).on('value', (items) => {
              // eslint-disable-next-line no-restricted-syntax
                const data = items.val()
                const symptoms = []
                const dataWithKeys = Object.keys(data).map((key) => {
                  const obj = data[key]
                  obj._key = key
                  return obj
                })
                for (const i in dataWithKeys) {
                  if (dataWithKeys.hasOwnProperty(i)) {
                    symptoms.push(JSON.stringify({
                      text: i.text,
                    }))
                  }
                }
                localStorage.setItem('symptoms', symptoms)
              })
            } catch (e) {
              console.log(e)
            }

            // GET SOLUTIONS
            try {
              window.db(`users/${user.uid}/solutions`).on('value', (items) => {
              // eslint-disable-next-line no-restricted-syntax
                const data = items.val()
                const solutions = []
                const dataWithKeys = Object.keys(data).map((key) => {
                  const obj = data[key]
                  obj._key = key
                  return obj
                })
                for (const i in dataWithKeys) {
                  if (dataWithKeys.hasOwnProperty(i)) {
                    solutions.push({
                      text: i.text,
                      scores: i.scores,
                      totalScore: i.totalScore,
                    })
                  }
                }
                localStorage.setItem('solutions', JSON.stringify(solutions))
              })
            } catch (e) {
              console.log(e)
            }

            // GET GOALS
            try {
              window.db(`users/${user.uid}/goals`).on('value', (items) => {
              // eslint-disable-next-line no-restricted-syntax
                const data = items.val()
                const goals = []
                const dataWithKeys = Object.keys(data).map((key) => {
                  const obj = data[key]
                  obj._key = key
                  return obj
                })
                for (const i in dataWithKeys) {
                  if (dataWithKeys.hasOwnProperty(i)) {
                    goals.push([i.goal1, i.goal2])
                  }
                }
                localStorage.setItem('goals', JSON.stringify(goals))
              })
            } catch (e) {
              console.log(e)
            }

            // GET PLANS
            try {
              window.db(`users/${user.uid}/plans`).on('value', (items) => {
              // eslint-disable-next-line no-restricted-syntax
                const data = items.val()
                const plans = []
                const dataWithKeys = Object.keys(data).map((key) => {
                  const obj = data[key]
                  obj._key = key
                  return obj
                })
                for (const i in dataWithKeys) {
                  if (dataWithKeys.hasOwnProperty(i)) {
                    plans.push({
                      text: i.text,
                    })
                  }
                }
                localStorage.setItem('plans', JSON.stringify(plans))
              })
            } catch (e) {
              console.log(e)
            }

            // GET CURRENT STEP
            try {
              window.db(`users/${user.uid}/currentStep`).on('value', (snapshot) => {
                this.$db('currentStep', snapshot.val().step)
              })
            } catch (e) {
              console.log(e)
            }

            this.$f7.views.main.loadPage('/home/')
          })
        // On error, show alert
          .catch((err) => {
          // Hide loading indicator
            window.f7.hideIndicator()
            // Show error alert
            window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
            console.log(err)
          })
      }
    },
    handleSignInDone() {
      // Hide loading indicator
      window.f7.hideIndicator()
      // Reset form
      this.email = ''
      this.password = ''
      this.passwordConfirmation = ''
      this.mode = 'signOut'
      // Load required URL per view

      const loginRequiringPages = this.$root.loginRequiringPages
      this.$f7.views.forEach((view) => {
        if (loginRequiringPages[view.selector]) {
          this.$nextTick(() => {
            view.router.load({ url: loginRequiringPages[view.selector], animatePages: false })
          })
        }
      })

      // Reset required URLs
      this.$root.loginRequiringPages = []
      // Close popup
      this.$f7.closeModal('#app-framework-login-popup')
    },
    handleSignOut() {
      this.$f7.popup('#app-framework-login-popup')
      window.firebase.auth().signOut()
        .then(() => {
        // Reset form
          this.mode = 'signIn'
          window.localStorage.removeItem('data')
          window.localStorage.removeItem('reasons')
          window.localStorage.removeItem('solutions')
          window.localStorage.removeItem('symptoms')
          window.localStorage.removeItem('plans')
          window.localStorage.removeItem('goals')
          // Navigate pages back
          const navBack = (view, times) => {
            if (times > 0) {
              view.router.back()
              this.$nextTick(() => {
                times--
                navBack(view, times)
              })
            }
          }
          this.$f7.views.forEach((view) => {
            const history = view.history
            let historyRequiresLoginAtPosition = 0
            history.forEach((url) => {
              if (this.$root.urlRequiresLogin(url) === false) {
                historyRequiresLoginAtPosition++
              }
            })
            navBack(view, history.length - historyRequiresLoginAtPosition)
          })
          // Do only if there are pages which do not require login
          if (!this.$root.config.loginRequiredForPages && !this.$root.loginRequiringPagesOnStart) {
          // Close popup
            this.$f7.closeModal('#app-framework-login-popup')
            // Show notification
            window.f7.addNotification({
              title: this.text.signOut,
              message: this.text.signOutDone,
              hold: 3000,
              closeIcon: false,
            })
          }
        })
    },
    handleRegistration() {
      if (navigator.onLine === false) {
        window.f7.alert(this.text.errorOffline, this.text.error)
      } else if (this.email === '') {
        window.f7.alert(this.text.errorNoEmail, this.text.error)
      } else if (this.password === '') {
        window.f7.alert(this.text.errorNoPassword, this.text.error)
      } else if (this.passwordConfirmation !== this.password) {
        window.f7.alert(this.text.errorPasswordsDifferent, this.text.error)
      } else {
        // Show loading indicator
        window.f7.showIndicator()
        // Create new user
        window.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        // On success, sign in user
          .then((user) => {
          // Hide loading indicator
            window.f7.hideIndicator()
            // Show notification
            window.f7.addNotification({
              title: this.text.accountCreated,
              message: this.text.checkYourInbox,
              hold: 3000,
              closeIcon: false,
            })
            // Handle sign in
            this.handleSignInDone()

            window.db(`users/${user.uid}`)
              .child('currentStep').set({
                step: 1,
              })

            this.$db('currentStep', 1)
            this.$db('bestSolution', '')
            this.$f7.views.main.loadPage('/signup/')
          })
        // On error, show alert
          .catch((err) => {
          // Hide loading indicator
            window.f7.hideIndicator()
            // Show error alert
            window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
          })
      }
    },
    handleReset() {
      if (navigator.onLine === false) {
        window.f7.alert(this.text.errorOffline, this.text.error)
      } else if (this.email === '') {
        window.f7.alert(this.text.errorNoEmail, this.text.error)
      } else {
        // Show loading indicator
        window.f7.showIndicator()
        // Send reset link
        window.firebase.auth().sendPasswordResetEmail(this.email)
          .then((user) => {
          // Hide loading indicator
            window.f7.hideIndicator()
            // Update mode
            this.mode = 'signIn'
            // On success, show notfication and login screen again
            window.f7.addNotification({
              title: this.text.emailSent,
              message: this.text.checkYourInbox,
              hold: 3000,
              closeIcon: false,
            })
            this.mode = 'signIn'
          })
          .catch((err) => {
          // Hide loading indicator
            window.f7.hideIndicator()
            // Show error alert
            window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
          })
      }
    },
  },
}
</script>
