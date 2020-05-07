<template>
  <div class="about-container">
    <span>{{ siteInfo.aboutUs }}</span>
    <span>地址：{{ siteInfo.address }}</span>
    <span>联系方式：{{ siteInfo.phone }} {{ siteInfo.email }}</span>
  </div>
</template>

<script>
import { About } from '@/api/about'

export default {
  name: 'Footer',
  data() {
    return {
      siteInfo: {
        aboutUs: '',
        address: '',
        phone: '',
        email: ''
      }
    }
  },
  created() {
    this.getSiteInfo()
  },
  methods: {
    async getSiteInfo() {
      this.siteInfo = await About.getAbout()
    }
  }
}
</script>

<style lang="scss" scoped>
  .about-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-weight: bold;
    }
  }
</style>
