<template>
  <div class="mobile">
    移动端
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    const that = this
    const isPc = that.$utils.IsPC()
    if (isPc) {
      that.$router.replace('/home/musicLibrary')
    } else {
      that.$router.replace('/mobile/home')
    }
  }
}
</script>

<style scoped>

</style>
