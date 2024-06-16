<template>
  <div id="app">
    <main>
      <NuxtLayout>
        <img :src="Fenge" alt="">
        <Header></Header>
        <NuxtPage/>
      </NuxtLayout>
    </main>
  </div>
</template>
<script setup lang="ts">
import Fenge from "~/assets/images/fengexian.png"
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 1240px;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container without overflow */
    transform: translate(-50%, -50%);
    z-index: -1;
  }
}
</style>
