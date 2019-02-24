<template>

  <!-- Will replace app container -->
  <div id="app">
    <login-popup />

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left panel -->
    <f7-panel left reveal layout="light">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true" url="panel-left"></f7-view>
    </f7-panel>

    <!-- Right panel -->
    <f7-panel right cover layout="dark">
      <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true" url="panel-right"></f7-view>
    </f7-panel>

    <!-- Main view -->
    <f7-views navbar-through>
      <f7-view main url="/home/" :dynamic-navbar="true" v-if="$root.user"></f7-view>
      <f7-view main url="/login/" :dynamic-navbar="true" v-if="!$root.user"></f7-view>
    </f7-views>

  </div>

</template>
<script>
  require('./kitchen-sink-material.css')
  const materialKitchenSinkCode = require('./kitchen-sink-material.js')
  const materialKitchenSinkHtml = require('./kitchen-sink-material-html.js')

  module.exports = {
    data() {
      return {
        popupOpened: false,
        loginScreenOpened: false,
        pickerOpened: false,
        actionsOpened: false,
      }
    },
    created() {
      // Update status bar text color after theme color change
      this.$watch(() => this.$root.color, (newColor) => {
        this.$root.statusbarTextColor = newColor === 'white' ? 'black' : 'white'
        this.$root.statusbarBackgroundColor = newColor === 'white' && window.cordova === undefined ? '000000' : this.$root.colors[this.$root.theme][newColor]
      })
    },
    methods: {
      onF7Init() {
        materialKitchenSinkCode(this.$root)
        this.$$(document).on('page:beforeinit', this.$$('#app').append(materialKitchenSinkHtml))
      },
    },
  }
</script>

<style>
  .popover {
    max-width: 95%;
  }
</style>
