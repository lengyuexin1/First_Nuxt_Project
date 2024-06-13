<script setup lang="ts">
import image1 from "@/assets/images/about_banner.jpg";
import image2 from "@/assets/images/about_banner_h5.png";
</script>
<template>
  <section class="section">
    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4" style=" height: 100%;  padding-top: 30px; padding-bottom: 30px; gap: 32px;">
        <div style="align-self: stretch; height: 400px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 64px; display: flex">
          <img style="width: 1280px; height: 400px; position: relative" :src="image1" />
        </div>
      </div>
    </section>
    <section class="lg:hidden md">
      <img style="width: 100%; height: 100%; position: relative" :src="image2" />
    </section>
  </section>
</template>
<style scoped lang="scss">
.section {
  section {
    &.lg {
      & > div {
        background-size: 100% 100%;
        padding-top: 4vw;
        height: 14.583vw;
        width: 100vw;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
    }
    &.md {
      & > div {
        background-size: 100% 100%;
        padding-top: 12vw;
        height: 40.4vw;
        width: 100vw;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
