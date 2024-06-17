<script setup lang="ts">
import * as CryptoJS from "crypto-js";
import axios  from "axios";
import voice_listen from "assets/images/voice/voice_listen.webp"
import no_data from "assets/images/live/no_data.png";

const url = ref("");
const toDetail = (id: number) => {
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  let url = "/voiceDetail/"+id;
  if (!userInfo.value) {
    localStorage.removeItem('logindata');
    localStorage.setItem('isNeedLogin',"1")
    localStorage.setItem('isNeedLoginUrl',url)
    return
  }
  window.location.href = "/voiceDetail/"+id;

};
onMounted(() => {
  getList()
});
const runtimeConfig = useRuntimeConfig();

const dataInfo = ref<any>();
const  userInfo = ref({})
const dataCount = ref<number>(0);

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
      "tagStr":"chat",
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
    dataInfo.value = loginData.value.data.items;
    dataCount.value = dataInfo.value.length;
    if (dataInfo.value.length > 12) {
      dataInfo.value = dataInfo.value.slice(0, 6);
    }
    // ElMessage.success("提交成功");
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}
</script>
<template>
  <section class="section">

    <section class="hidden lg:flex lg">
      <div v-if="dataCount > 0" class="mx-auto flex max-w-7xl items-center justify-between " style="  flex-direction: column;  gap: 48px; display: grid; grid-template-columns: repeat(2, 1fr);">
        <div  v-for="(slide, idx) in dataInfo"  style="height: 200px;cursor: pointer; padding: 20px; background: #FAF6F3; border-radius: 12px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex" @click="toDetail(slide.roomId)">
          <img style="width: 160px; height: 160px; border-radius: 12px" :src="slide.cover" />
          <div style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">

            <div style="align-self: stretch; height: 87px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 11px; display: flex">
              <div style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
                <div style="width:80%;justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                  <div style="color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{slide.title}}</div>
                  <div style="width: 24px; height: 24px; position: relative" v-if="slide.nationalFlag">
<!--                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute">-->
<!--                      <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #C4C4C4; border-radius: 9999px"></div>-->
<!--                      <img style="width: 27px; height: 20px; left: 23.50px; top: 0px; position: absolute; transform: rotate(-180deg); transform-origin: 0 0" src="https://via.placeholder.com/27x20" />-->
<!--                    </div>-->
                    <img style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute;" :src="slide.nationalFlag" />
<!--                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; border-radius: 9999px; border: 1.50px #E8E8E8 solid"></div>-->
                  </div>
                </div>
                <div style="justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">
                  <div style="width: 20px; height: 20px; position: relative">
                    <img  style="width: 20px; height: 20px;" :src="voice_listen">
                  </div>
                  <div style="color: #435568; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">{{slide.heat}}</div>
                </div>
              </div>
              <div style="width:90%;align-self: stretch; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" @click="toDetail(slide.roomId)">{{slide.announcement}}</div>
            </div>
            <div style="justify-content: flex-start; align-items: flex-start; display: inline-flex">
              <div  v-for="(slide1, idx1) in slide.seatUsers">
                 <img style="width: 36px; height: 36px; border-radius: 9999px; border: 1.80px #F1F4F8 solid" :src="slide1" />
              </div>
            </div>

          </div>
        </div>

      </div>
      <div v-if="!dataCount" class="mx-auto flex max-w-7xl items-center justify-between " style="    gap: 48px; display: grid; ">

        <div  style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: flex">
          <div style="flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
            <img style="width: 300px; height: 300px" :src="no_data" />
            <div style="width: 408px; height: 48px; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">No voice streams yet. Stay tuned!</div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">
      <div style="">
      <div v-if="dataCount > 0"  v-for="(slide, idx) in dataInfo" style="width: 100%; height: 100%; padding: 8px;margin-top: 1rem; background: #FAF6F3; border-radius: 12px; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
          <img style="width: 80px; height: 80px; border-radius: 6px" :src="slide.cover" @click="toDetail(slide.roomId)"/>
          <div style="width:70%;flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex" @click="toDetail(slide.roomId)">
            <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
              <div style="flex: 1 1 0;width: 80%; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                <div style="height: 23px;width: 70%; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                  <div style="width:100%;color: #09090B; font-size: 14px; font-weight: normal; font-weight: 600; line-height: 20px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{slide.title}}</div>
                  <div style="width: 24px; height: 24px; position: relative" v-if="slide.nationalFlag">
                    <img style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; " :src="slide.nationalFlag" />
                  </div>
                </div>
                <div style="width:100%;align-self: stretch; height: 15px; color: #71717A; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 16px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{slide.announcement}}</div>
              </div>
              <div style="position: absolute;left:85%; justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">
                <div style="width: 14px; height: 14px; position: relative">
                  <img  style="width: 20px; height: 20px;" :src="voice_listen">
                </div>
                <div style="margin-top:4px;color: #435568; font-size: 12px; font-weight: normal; font-weight: 500; line-height: 16px; word-wrap: break-word">{{slide.heat}}</div>
              </div>
            </div>
            <div style="justify-content: flex-start; align-items: flex-start; display: inline-flex">

              <div style="justify-content: flex-start; align-items: flex-start; display: inline-flex" v-for="(slide1, idx1) in slide.seatUsers">
                <img style="width: 24px; height: 24px; border-radius: 9999px; border: 1.20px #F1F4F8 solid" :src="slide1" />
              </div>
            </div>
          </div>
      </div>
      </div>
      <div v-if="!dataCount" style="flex-direction: column; justify-content: center; align-items: center;  display: flex">
          <img style="width: 200px; height: 200px" :src="no_data" />
          <div style=" text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">No voice streams yet. Stay tuned!</div>
      </div>
      <NuxtLink to="/index.html">
        <div style="width: 100%; height: 100%;margin-top: 1rem; padding-top: 11px; padding-bottom: 12px; background: #FFF1F2; border-radius: 8px; justify-content: center; align-items: center; display: inline-flex">
          <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
            <div style="color: #F43F5E; font-size: 14px; font-family: Figtree; font-weight: 600; word-wrap: break-word">View more</div>

            <div style="width: 16px; height: 16px; position: relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#F43F5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
          </div>
        </div>
      </NuxtLink>
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
