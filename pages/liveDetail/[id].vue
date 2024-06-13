<script lang="ts" setup>
import LiveList from "~/components/LiveList.vue";
import LiveList1 from "~/components/LiveList1.vue";
import LiveDetail from "~/components/LiveDetail.vue";
import LiveDetailSection2 from "~/components/LiveDetailSection-2.vue";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout:'livedetail'
})
</script>
<template>
  <LiveDetail></LiveDetail>
  <live-detail-section2></live-detail-section2>
</template>
