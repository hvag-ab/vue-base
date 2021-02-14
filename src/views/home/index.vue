<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" :github="github" />
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'Dashboard',
  components: {
    GithubCorner
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    github(){
      return 'https://github.com/hvag-ab'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.github-corner {
    position: absolute;
    top: 80px;
    border: 0;
    right: 0;
  }
</style>
