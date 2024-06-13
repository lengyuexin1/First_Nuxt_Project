<script setup lang="ts">


</script>
<template>
  <section class="section">

    <section class="p-11 hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4" style="width: 100%; height: 100%;  flex-direction: column;  gap: 32px; display: inline-flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
          <div style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Live Streaming</div>
          <NuxtLink to="/live.html">
            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
            <div style="color: #475467; font-size: 16px; font-family: Figtree; font-weight: 600; word-wrap: break-word">View more</div>
            <div style="width: 24px; height: 24px; position: relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">
      <div style="width: 100%; color: black; font-size: 20px; float: left;justify-content:left; font-family: Amiri; font-weight: 700; word-wrap: break-word">Live Streaming</div>
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
