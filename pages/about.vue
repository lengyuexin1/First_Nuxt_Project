<script lang="ts" setup>
import LiveList from "~/components/LiveList.vue";
import AboutSection from "~/components/AboutSection.vue";
import Fenge from "~/assets/images/fengexian.png";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  alias: [
    '/about.html',
  ],
})
</script>
<template>

  <about-section></about-section>
  <about-section1></about-section1>
  <!--  <about-section2></about-section2>-->
</template>
