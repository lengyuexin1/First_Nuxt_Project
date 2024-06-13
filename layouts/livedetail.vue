<template>
  <div>
    <slot />
    <Footer2/>
  </div>
</template>
<script setup>
import Footer2 from "~/components/Footer-2.vue";
</script>
<style scoped>
@media screen and (max-width:1000px) {
  .footer {
    display: none;
  }
}
</style>
