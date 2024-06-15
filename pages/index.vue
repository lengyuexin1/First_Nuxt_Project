<script lang="ts" setup>
import IndexSection8 from "~/components/IndexSection-8.vue";

definePageMeta({
  alias: [
    '/index.html',
  ],
})
</script>
<template>
  <MySwiper/>
  <div style="max-width: 1200px;margin: 0 auto">
    <IndexSection-1/>
    <IndexSection-2/>
    <IndexSection-6/>
    <IndexSection-3/>
    <IndexSection8/>
    <IndexSection-4/>
    <IndexSection-7/>
    <IndexSection-5/>
  </div>

</template>
