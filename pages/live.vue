<script lang="ts" setup>
import LiveList from "~/components/LiveList.vue";
import LiveList1 from "~/components/LiveList1.vue";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  alias:[
    '/live.html',
  ],
})
</script>
<template>
  <LiveList ></LiveList>
  <LiveList1></LiveList1>
  <IndexSection-4 />
  <IndexSection-7 />
</template>
