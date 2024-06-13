<template>
  <div>
    <HeaderMR v-show="showPage1"></HeaderMR>
  </div>
</template>
<script setup>

const route = useRoute();
const path = computed(() => route.path);
const showPage = computed(() => {
  if (path.value.includes('qianqi')) {
    return true;
  }
  return  false
});
const showPage1 = computed(() => {
  if (!path.value.includes('qianqi') ) {
    return true;
  }
  return  false
});
</script>
