<template>
  <div id="app">
    <div class="route-container">
      <Home/>
    </div>
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Home
  },

  computed: {
    authorize () {
      return this.$store.state.experience.authority
    },
    notify () {
      return this.$store.state.experience.notify
    },
    isFull () {
      return this.$store.state.common.isFull
    }
  },

  watch: {
    authorize (val, oldVal) {
      if (val === 0) {
        // this.$store.dispatch('returnBooking')
      }
    },
    notify (val, oldVal) {
      if (!val) {
        return
      }
      this.$notify({
        title: 'Warning',
        message: 'Experience within 5 minutes',
        type: 'warning',
        duration: 3000,
        offset: window.innerHeight - 125
      })
    }
  },

  mounted () {
  },

  methods: {
    languageChange (lang_) {
      this.$i18n.locale = lang_
    },
    doInit () {

    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  overflow: hidden;
}
.route-container {
  width: 100%;
  height: 100%;
}
</style>
