<script setup lang="ts">

import * as CryptoJS from "crypto-js";
import icon3 from "assets/images/live_icon.png";
import no_data from "assets/images/live/no_data.png";
import axios  from "axios";
const runtimeConfig = useRuntimeConfig();

onMounted(() => {
  getList()
});
const dataInfo = ref<any>();
const dataCount = ref<number>(0);
const  userInfo = ref({})
const toDetail = (id:Number) => {
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  let url = "/liveDetail/"+id;
  if (!userInfo.value) {
    localStorage.removeItem('logindata');
    localStorage.setItem('isNeedLogin',"1")
    localStorage.setItem('isNeedLoginUrl',url)
    return
  }
  window.location.href = "liveDetail/"+id;
};
const getList = async() => {
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "packageAppId":runtimeConfig.public.VITE_PACKAGE_APP_ID,
      "appKey":runtimeConfig.public.VITE_APP_KEY,
      "queryFlag":6,
      "filter":{"countryCode":"IN"}
    },
    "userAuth": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content"+requestData+'methodqueryRoomListH5moduleweb-roomrpcTypedubbotimestamp'+timestamp+runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
// 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref({});
  loginData.value  = await axios.post(
      runtimeConfig.public.VITE_BASE_URL,
      requestData,
      {
        headers:  {
          'module': 'web-room',
          'appId': 'v.v.r.queryRoomListH5',
          'method': 'queryRoomListH5',
          'appKey': runtimeConfig.public.VITE_APP_ENV_KEY,
          'sign': uppercaseHash,
          'timestamp': timestamp,
          'publicKey': runtimeConfig.public.VITE_PUBLIC_KEY,
          'rpcType': 'dubbo',
          //'secret': 'V3op8vdC3K47KR8R21k24B65D7LA93nuvfJGe26u3hW3KTXAEp602cUOXi4O2nJj',
          'appVersion': '1',
          'Content-Type': 'application/json'
        },
      }
  );
  if (loginData.value.data.code === 200) {
    dataCount.value = loginData.value.data.items.length;
    dataInfo.value = loginData.value.data.items;
    if (dataInfo.value.length > 12) {
      dataInfo.value = dataInfo.value.slice(0, 12);
    }
    // ElMessage.success("提交成功");
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}
</script>
<template>
  <section class="section">

    <section class="p-12 hidden lg:flex lg">


      <div class="mx-auto flex items-center justify-between " style="flex-direction: column; justify-content: flex-start; align-items: flex-start;  display: inline-flex">
        <div style="align-self: stretch; justify-content: center; align-items: center; gap: 1px; display: inline-flex">
          <div style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Live Room</div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md header-tag">

    </section>
  </section>
  <section class="section">

    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-left justify-between py-2 px-4 lg:p-6 lg:px-4" style="  flex-direction: column;  gap: 48px; display: inline-flex;">

        <div style="display: flex;flex-wrap: wrap;gap:12px;align-content: flex-start; align-items: flex-start;align-self: stretch; ">
          <div v-if="dataCount" style="width: 302px;  height: 302px; position: relative; background: white; border-radius: 12px; overflow: hidden" v-for="(slide, idx) in dataInfo" @click="toDetail(slide.roomId)">
            <button @click="toDetail(slide.roomId)">
            <img style="width: 302px; height: 302px; left: 0px; top: 0px; position: absolute" :src="slide.cover" />
            <div style="padding-left: 8px; padding-right: 8px; padding-top: 2px; padding-bottom: 2px; left: 16px; top: 16px; position: absolute; background: #FF1953; border-radius: 9999px; justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
              <img :src="icon3" style="width: 62px;height: 24px;">
            </div>
            <div style="width: 302px; height: 107px; left: 0px; top: 195px; position: absolute">
              <div style="width: 302px; height: 107px; left: 0px; top: 0px; position: absolute; opacity: 0.30; background: linear-gradient(0deg, #222222 0%, rgba(34, 34, 34, 0.30) 72%, rgba(34, 34, 34, 0.06) 93%, rgba(34, 34, 34, 0) 100%)"></div>
              <div style="left: 16px; top: 63px; position: absolute; color: white; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word;width: 60%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: left">{{slide.title}}</div>
              <div style="padding-left: 8px; padding-right: 8px; padding-top: 2px; padding-bottom: 2px; left: 217px; top: 67px; position: absolute; background: rgba(4.54, 4.54, 4.54, 0.50); border-radius: 9999px; justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                <div style="width: 16px; height: 16px; position: relative">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.19922 1.1999C4.19922 0.758074 4.55739 0.399902 4.99922 0.399902C5.44105 0.399902 5.79922 0.758074 5.79922 1.1999V10.7999C5.79922 11.2417 5.44105 11.5999 4.99922 11.5999C4.55739 11.5999 4.19922 11.2417 4.19922 10.7999V1.1999Z" fill="white"/>
                    <path d="M8.19922 5.99971C8.19922 5.55788 8.55739 5.19971 8.99922 5.19971C9.44105 5.19971 9.79922 5.55788 9.79922 5.99971V10.7997C9.79922 11.2415 9.44105 11.5997 8.99922 11.5997C8.55739 11.5997 8.19922 11.2415 8.19922 10.7997L8.19922 5.99971Z" fill="white"/>
                    <path d="M0.199219 5.1999C0.199219 4.75807 0.557391 4.3999 0.999219 4.3999C1.44105 4.3999 1.79922 4.75807 1.79922 5.1999V10.7999C1.79922 11.2417 1.44105 11.5999 0.999219 11.5999C0.557391 11.5999 0.199219 11.2417 0.199219 10.7999L0.199219 5.1999Z" fill="white"/>
                  </svg>
                </div>
                <div style="text-align: right; color: white; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">{{slide.heat}}</div>
              </div>
            </div>
            </button>
          </div>
          <div v-if="!dataCount" style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: flex">
            <div style="flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
              <img style="width: 300px; height: 300px" :src="no_data" />
              <div style="width: 408px; height: 48px; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">No live streams yet. Stay tuned!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">
      <div class="container">
        <div style="width: 100%; color: #101828; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word">Live Streaming</div>
        <div v-if="dataCount" style="width: 10.46875rem; margin: 0.5rem; height: 10.46875rem; position: relative; background: white; border-radius: 0.5rem; overflow: hidden" v-for="(slide, idx) in dataInfo" @click="toDetail(slide.roomId)">
          <img style="width: 10.46875rem; height: 10.46875rem; left: 0; top: 0; position: absolute" :src="slide.cover" />
          <div style="height: 0.875rem; padding-left: 0.273125rem; padding-right: 0.273125rem; padding-top: 0.068125rem; padding-bottom: 0.068125rem; left: 0.5rem; top: 0.5rem; position: absolute; background: #FF1953; border-radius: 340.5125rem; justify-content: flex-start; align-items: center; gap: 0.068125rem; display: inline-flex">
            <div style="width: 0.54625rem; height: 0.54625rem; position: relative">
              <div style="width: 0.075625rem; height: 0.08375rem; left: 0.22375rem; top: 0.068125rem; position: absolute; transform: rotate(180deg); transform-origin: 0 0; background: black; border: 0.0425rem white solid"></div>
              <div style="width: 0.075625rem; height: 0.08375rem; left: 0.31875rem; top: 0.068125rem; position: absolute; background: black; border: 0.0425rem white solid"></div>
              <img style="width: 0.45625rem; height: 0.365625rem; left: 0.045625rem; top: 0.136875rem; position: absolute; border-radius: 0.068125rem" src="https://via.placeholder.com/7x6" />
              <div style="width: 0.157625rem; height: 0.159375rem; left: 0.24875rem; top: 0.431875rem; position: absolute; transform: rotate(-135deg); transform-origin: 0 0; background: linear-gradient(180deg, #FAE5DF 0%, white 100%), linear-gradient(0deg, #FF1953 0%, #FF1953 100%); border-radius: 0.010625rem"></div>
            </div>
            <div style="text-align: right; color: white; font-size: 0.625rem; font-weight: normal; font-weight: 500; line-height: 0.6825rem; word-wrap: break-word">Live</div>
          </div>
          <div style="width: 10.5rem; height: 6.6875rem; left: 0; top: 3.80625rem; position: absolute">
            <div style="width: 10.5rem; height: 1.875rem; left: 0; top: 4.875rem; position: absolute; opacity: 0.1875; background: linear-gradient(0deg, #222222 0%, rgba(34, 34, 34, 0.30) 72%, rgba(34, 34, 34, 0.06) 93%, rgba(34, 34, 34, 0) 100%)"></div>
            <div style="left: 0.5rem; top: 40%; position: absolute; color: white; font-size: 0.875rem; font-weight: normal; font-weight: 500; line-height: 1.25rem; word-wrap: break-word;width: 60%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: left">{{slide.title}}</div>
          </div>
          <div style="height: 0.875rem; padding-left: 0.1875rem; padding-right: 0.1875rem; padding-top: 0.125rem; padding-bottom: 0.125rem; left: 7.0625rem; top: 0.5rem; position: absolute; background: rgba(4.54, 4.54, 4.54, 0.50); border-radius: 3405.125rem; justify-content: flex-start; align-items: center; gap: 0.125rem; display: inline-flex">
            <div style="width: 0.875rem; height: 0.875rem; position: relative">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.19922 1.1999C4.19922 0.758074 4.55739 0.399902 4.99922 0.399902C5.44105 0.399902 5.79922 0.758074 5.79922 1.1999V10.7999C5.79922 11.2417 5.44105 11.5999 4.99922 11.5999C4.55739 11.5999 4.19922 11.2417 4.19922 10.7999V1.1999Z" fill="white"/>
                <path d="M8.19922 5.99971C8.19922 5.55788 8.55739 5.19971 8.99922 5.19971C9.44105 5.19971 9.79922 5.55788 9.79922 5.99971V10.7997C9.79922 11.2415 9.44105 11.5997 8.99922 11.5997C8.55739 11.5997 8.19922 11.2415 8.19922 10.7997L8.19922 5.99971Z" fill="white"/>
                <path d="M0.199219 5.1999C0.199219 4.75807 0.557391 4.3999 0.999219 4.3999C1.44105 4.3999 1.79922 4.75807 1.79922 5.1999V10.7999C1.79922 11.2417 1.44105 11.5999 0.999219 11.5999C0.557391 11.5999 0.199219 11.2417 0.199219 10.7999L0.199219 5.1999Z" fill="white"/>
              </svg>
            </div>
            <div style="text-align: right; color: white; font-size: 0.625rem; font-weight: normal; font-weight: 400; line-height: 1rem; word-wrap: break-word">{{slide.heat}}</div>
          </div>
        </div>
        <!-- 添加更多的列表项... -->
        <div v-if="!dataCount" style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: flex">
          <div style="flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
            <img style="width: 200px; height: 200px" :src="no_data" />
            <div style="width: 408px; height: 48px; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">No live streams yet. Stay tuned!</div>
          </div>
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
        align-items: center;
      }
    }
  }
}
</style>
