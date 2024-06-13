<script setup lang="ts">

 defineComponent({
  props: {
    title: String as PropType<string>, // 传递的标题参数
  },
});
</script>
<template>
  <section class="section">

    <section class=" hidden lg:flex lg">
      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag" style="width: 100%; height: 100%; padding-top: 16px; padding-bottom: 16px; margin: 100px auto auto auto;">
        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
          <div style="justify-content: flex-start; align-items: center; display: flex">
            <div style="color: rgba(0, 0, 0, 0.40); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/">Home</nuxt-link></div>
          </div>
          <div>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z" fill="black" fill-opacity="0.4"/>
            </svg>
          </div>
          <div style="justify-content: flex-start; align-items: center; display: flex">
            <div style="color: rgba(0, 0, 0, 0.90); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/live.html">Live Room</nuxt-link></div>
          </div>
        </div>
      </div>

    </section>
    <section class="p-3 lg:hidden md header-tag">
      <div style="width: 100%; height: 100%;margin-top: 30px;   justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; display: flex">
          <div style="color: rgba(0, 0, 0, 0.40); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/">Home</nuxt-link></div>
        </div>
        <div>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z" fill="black" fill-opacity="0.4"/>
          </svg>
        </div>
        <div style="justify-content: flex-start; align-items: center; display: flex">
          <div style="color: rgba(0, 0, 0, 0.90); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/live.html">Live Room</nuxt-link></div>
        </div>
      </div>
    </section>
  </section>
</template>
<style scoped lang="scss">
.section {
  section {
    &.lg {

    }
    &.md {
      & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;
      }
    }
  }
}
</style>
