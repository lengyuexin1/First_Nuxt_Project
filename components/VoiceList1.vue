<script setup lang="ts">

import * as CryptoJS from "crypto-js";
import axios from "axios";
import no_data from "assets/images/live/no_data.png";
import nodata from "assets/images/nodata.png";
import voiceleft from "~/assets/images/voiceleft.png"
import voiceright from "~/assets/images/voiceright.png"
import voicerleft_h5 from "~/assets/images/vioceleft_h5.png"
import voiceright_h5 from "~/assets/images/vioceright_h5.png"
import Group from "~/assets/images/voice/voice_listen.webp"
import viocepeople1 from "~/assets/images/viocepeople1.png"
import viocepeople2 from "~/assets/images/viocepeople2.png"
import viocepeople3 from "~/assets/images/viocepeople3.png"
import viocepeople4 from "~/assets/images/viocepeople4.png"
import voice_listen from "assets/images/voice/voice_listen.webp"

const runtimeConfig = useRuntimeConfig();

const dataInfo = ref<any>();
const dataCount = ref<number>(0);
const userInfo = ref({})

const url = ref("");
const toDetail = (id: number) => {
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  let url = "/voiceDetail/" + id;
  if (!userInfo.value) {
    localStorage.removeItem('logindata');
    localStorage.setItem('isNeedLogin', "1")
    localStorage.setItem('isNeedLoginUrl', url)
    return
  }
  window.location.href = "/voiceDetail/" + id;

};
onMounted(() => {
  getList()
});
const getList = async () => {
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
      "packageAppId": runtimeConfig.public.VITE_PACKAGE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "tagStr": "chat",
      "filter": {"countryCode": "IN"}
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
  const sign = "content" + requestData + 'methodqueryRoomListH5moduleweb-roomrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
// 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref({});
  loginData.value = await axios.post(
      runtimeConfig.public.VITE_BASE_URL,
      requestData,
      {
        headers: {
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
    dataCount.value = loginData.value.data.items.length;
    if (dataInfo.value.length > 12) {
      dataInfo.value = dataInfo.value.slice(0, 12);
    }
  } else {
  }
}
</script>
<template>
  <section class="section">

    <section class="p-12 hidden lg:flex lg">
      <div class="mx-auto flex items-center justify-between "
           style="flex-direction: column; justify-content: flex-start; align-items: flex-start;  display: inline-flex;position:relative;">
        <div style="align-self: stretch; justify-content: center; align-items: center; gap: 1px; display: inline-flex">
          <!--          <div style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Voice Chat Room</div>-->
          <div class="center-swiper lg:felx"
               style="position: absolute;top: -120px;z-index:1;">
            <img :src="voiceleft" alt="">
            <div class="center-item">
              <div class="item">
                <p class="p-1">
                  members
                </p>
                <p class="p-2">
                  +30K
                </p>
              </div>
              <div class="item">
                <p class="p-1">Number of rooms</p>
                <p class="p-2">+224</p>
              </div>
              <div class="item">
                <p class="p-1">total views</p>
                <p class="p-2">+54m</p>
              </div>
            </div>
            <img :src="voiceright" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md header-tag">

    </section>
  </section>
  <section class="section">

    <section class="hidden lg:flex lg">
      <div v-if="dataCount" class="mx-auto flex max-w-7xl items-center justify-between "
           style="justify-content: flex-start; gap: 40px;flex-wrap: wrap; display: flex;width: 1280px;">
        <div v-for="(slide,idx) in dataInfo" class="voice-item">
          <img style="object-fit: cover;width: 352px; height: 352px; border-radius: 12px;"
               :src="slide.cover"/>
          <div
              style="width:320px;display: flex;justify-content: space-between;align-items: center; position: absolute;top: 310px;left: 25px">
            <div style="display: flex;justify-content: flex-start;align-items: center;margin: 0 10px">
              <img :src="viocepeople1" alt="">
              <img style="margin-left: -15px;" :src="viocepeople2" alt="">
              <img style="margin-left: -15px;" :src="viocepeople3" alt="">
              <img style="margin-left: -15px;" :src="viocepeople4" alt="">
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <img width="15" height="15" :src="Group" alt="">
              <!--              <img :src="voice_listen" alt="">-->
              <p style="margin-left:10px;color: var(--Color-surface-, #FFF);font-family: Archivo;font-size: 16px;font-style: normal;font-weight: 500;line-height: 20px; /* 125% */ ">
                {{ slide.heat }}</p>
            </div>
          </div>
          <div class="voice-item-info">
            <div
                style="display:flex;justify-content:space-between;align-items:center;color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
              <!--              {{ slide.title }}-->
              <div class="vioce-item-title"> {{ slide.title }}</div>
              <div style="width: 24px; height: 24px; margin-left: 10px;position: relative" v-if="slide.nationalFlag">
                <!--                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute">-->
                <!--                      <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #C4C4C4; border-radius: 9999px"></div>-->
                <!--                      <img style="width: 27px; height: 20px; left: 23.50px; top: 0px; position: absolute; transform: rotate(-180deg); transform-origin: 0 0" src="https://via.placeholder.com/27x20" />-->
                <!--                    </div>-->
                <img style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute;"
                     :src="slide.nationalFlag"/>
                <!--                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; border-radius: 9999px; border: 1.50px #E8E8E8 solid"></div>-->
              </div>
            </div>
            <p class="item-info">
              {{ slide.announcement }}
            </p>
          </div>
          <div class="join" @click="toDetail(slide.roomId)">
            Join Room
          </div>
        </div>
        <!--        <div v-for="(slide,idx) in dataInfo" class="voice-item"-->
        <!--             @click="toDetail(slide.roomId)">-->
        <!--          <img style="object-fit: cover;width: 352px; height: 352px; border-radius: 12px;"-->
        <!--               :src="slide.cover"/>-->
        <!--          <div-->
        <!--              style="width:320px;display: flex;justify-content: space-between;align-items: center; position: absolute;top: 310px;left: 25px">-->
        <!--            <div style="display: flex;justify-content: flex-start;align-items: center;margin: 0 10px">-->
        <!--              <img :src="viocepeople1" alt="">-->
        <!--              <img style="margin-left: -15px;" :src="viocepeople2" alt="">-->
        <!--              <img style="margin-left: -15px;" :src="viocepeople3" alt="">-->
        <!--              <img style="margin-left: -15px;" :src="viocepeople4" alt="">-->
        <!--            </div>-->
        <!--            <div style="display: flex;justify-content: space-between;align-items: center;">-->
        <!--              <img :src="Group" alt="">-->
        <!--              &lt;!&ndash;              <img :src="voice_listen" alt="">&ndash;&gt;-->
        <!--              <p style="margin-left:10px;color: var(&#45;&#45;Color-surface-, #FFF);font-family: Archivo;font-size: 16px;font-style: normal;font-weight: 500;line-height: 20px; /* 125% */ ">-->
        <!--                {{ slide.heat }}</p>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="voice-item-info">-->
        <!--            <div-->
        <!--                style="display:flex;justify-content:space-between;align-items:center;color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">-->
        <!--              &lt;!&ndash;              {{ slide.title }}&ndash;&gt;-->
        <!--              <div class="vioce-item-title"> {{ slide.title }}</div>-->
        <!--              <div style="width: 24px; height: 24px; margin-left: 10px;position: relative" v-if="slide.nationalFlag">-->
        <!--                &lt;!&ndash;                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute">&ndash;&gt;-->
        <!--                &lt;!&ndash;                      <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #C4C4C4; border-radius: 9999px"></div>&ndash;&gt;-->
        <!--                &lt;!&ndash;                      <img style="width: 27px; height: 20px; left: 23.50px; top: 0px; position: absolute; transform: rotate(-180deg); transform-origin: 0 0" src="https://via.placeholder.com/27x20" />&ndash;&gt;-->
        <!--                &lt;!&ndash;                    </div>&ndash;&gt;-->
        <!--                <img style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute;"-->
        <!--                     :src="slide.nationalFlag"/>-->
        <!--                &lt;!&ndash;                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; border-radius: 9999px; border: 1.50px #E8E8E8 solid"></div>&ndash;&gt;-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="item-info">-->
        <!--              {{ slide.announcement }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="join" @click="toDetail(slide.roomId)">-->
        <!--            Join Room-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div v-for="(slide, idx) in dataInfo"-->
        <!--             style="width:400px;height: 590px;cursor: pointer; padding: 20px; background: #FAF6F3; border-radius: 12px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex"-->
        <!--             @click="toDetail(slide.roomId)">-->
        <!--          <img style="width: 160px; height: 160px; border-radius: 12px" :src="slide.cover"/>-->
        <!--          <div-->
        <!--              style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">-->

        <!--            <div-->
        <!--                style="align-self: stretch; height: 87px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 11px; display: flex">-->
        <!--              <div-->
        <!--                  style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">-->
        <!--                <div style="width:80%;justify-content: flex-start; align-items: center; gap: 10px; display: flex">-->
        <!--                  <div-->
        <!--                      style="color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">-->
        <!--                    {{ slide.title }}-->
        <!--                  </div>-->
        <!--                  <div style="width: 24px; height: 24px; position: relative" v-if="slide.nationalFlag">-->
        <!--                    &lt;!&ndash;                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute">&ndash;&gt;-->
        <!--                    &lt;!&ndash;                      <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #C4C4C4; border-radius: 9999px"></div>&ndash;&gt;-->
        <!--                    &lt;!&ndash;                      <img style="width: 27px; height: 20px; left: 23.50px; top: 0px; position: absolute; transform: rotate(-180deg); transform-origin: 0 0" src="https://via.placeholder.com/27x20" />&ndash;&gt;-->
        <!--                    &lt;!&ndash;                    </div>&ndash;&gt;-->
        <!--                    <img style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute;"-->
        <!--                         :src="slide.nationalFlag"/>-->
        <!--                    &lt;!&ndash;                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; border-radius: 9999px; border: 1.50px #E8E8E8 solid"></div>&ndash;&gt;-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div style="justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">-->
        <!--                  <div style="width: 20px; height: 20px; position: relative">-->
        <!--                    <img style="width: 20px; height: 20px;" :src="voice_listen">-->
        <!--                  </div>-->
        <!--                  <div-->
        <!--                      style="color: #435568; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">-->
        <!--                    {{ slide.heat }}-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div-->
        <!--                  style="width:90%;align-self: stretch; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"-->
        <!--                  @click="toDetail(slide.roomId)">{{ slide.announcement }}-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div style="justify-content: flex-start; align-items: flex-start; display: inline-flex">-->
        <!--              <div v-for="(slide1, idx1) in slide.seatUsers">-->
        <!--                <img style="width: 36px; height: 36px; border-radius: 9999px; border: 1.80px #F1F4F8 solid"-->
        <!--                     :src="slide1"/>-->
        <!--              </div>-->
        <!--            </div>-->

        <!--          </div>-->
        <!--        </div>-->
      </div>

      <div v-if="!dataCount" class="mx-auto flex max-w-7xl items-center justify-between "
           style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: flex">
        <div style="flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
          <img style="margin: 50px 0;width: 142px; height: 142px" :src="nodata"/>
          <div
              style="width: 408px; height: 48px; color: #050505;text-align: center;/* text-base/medium */font-family: var(--font, Archivo);font-size: 16px;font-style: normal;font-weight: 400;line-height: 24px; /* 150% */">
            There is no content here yet, come and explore!
          </div>
        </div>
      </div>
    </section>

    <section class="p-3 lg:hidden md">

      <div class="container" style="position:relative;">
        <!--      <section class="p-12 hidden lg:flex md">-->
        <div class="mx-auto flex items-center justify-between "
             style="flex-direction: column; justify-content: flex-start; align-items: flex-start;  display: inline-flex;position:relative;">
          <div
              style="align-self: stretch; justify-content: center; align-items: center; gap: 1px; display: inline-flex">
            <!--          <div style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Voice Chat Room</div>-->
            <div class="center-swiper lg:felx"
                 style="position: absolute;top: -75px;z-index:1;">
              <img style="width: 54px;height: 100%;position:absolute;top: 0;left: 0;z-index:-1;" :src="voicerleft_h5"
                   alt="voiceleft">
              <div class="center-item">
                <div class="item">
                  <p class="p-1">
                    members
                  </p>
                  <p class="p-2">
                    +30K
                  </p>
                </div>
                <div class="item">
                  <p class="p-1">Number of rooms</p>
                  <p class="p-2">+224</p>
                </div>
                <div class="item">
                  <p class="p-1">total views</p>
                  <p class="p-2">+54m</p>
                </div>
              </div>
              <img style="width: 54px;height: 100%;position:absolute;top: 0;right: 0;z-index:-1;" :src="voiceright_h5"
                   alt="voiceright">
            </div>
          </div>
        </div>
        <!--              </section>-->
        <div v-if="dataCount" class="mx-auto flex max-w-7xl items-center justify-between "
             style="justify-content: space-between; gap: 10px;margin-top: 60px; display: flex;flex-wrap: wrap">
          <div v-for="(slide,idx) in dataInfo" class="voice-item w-44"
               @click="toDetail(slide.roomId)">
            <img style="object-fit: cover;width: 42vw; height: 151px; border-radius: 12px;"
                 :src="slide.cover"/>
            <div
                style="display: flex;justify-content: space-between;align-items: center; position: absolute;top: 130px;left: 5px;width:38vw;">
              <div style="display: flex;justify-content: flex-start;align-items: center;margin: 0 10px">
                <img style="width:20px;height:20px;" :src="viocepeople1" alt="">
                <img style="width:20px;height:20px;margin-left: -5px;" :src="viocepeople2" alt="">
                <img style="width:20px;height:20px;margin-left: -5px;" :src="viocepeople3" alt="">
                <img style="width:20px;height:20px;margin-left: -5px;" :src="viocepeople4" alt="">
              </div>
              <div style="display: flex;justify-content: space-between;align-items: center;">
                <img width="15" height="15" :src="Group" alt="">
                <!--              <img :src="voice_listen" alt="">-->
                <p style="margin-left:10px;color: var(--Color-surface-, #FFF);font-family: Archivo;font-size: 16px;font-style: normal;font-weight: 500;line-height: 20px; /* 125% */ ">
                  {{ slide.heat }}</p>
              </div>
            </div>
            <div class="voice-item-info">
              <div
                  style="display:flex;justify-content:space-between;align-items:center;color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                <!--              {{ slide.title }}-->
                <!--                <div class="vioce-item-title"> {{ slide.title }}</div>-->
                <div class="vioce-item-title">priya Sinha</div>
                <div style="width: 14px; height: 14px; margin-left: 10px;position: relative" v-if="slide.nationalFlag">
                  <!--                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute">-->
                  <!--                      <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #C4C4C4; border-radius: 9999px"></div>-->
                  <!--                      <img style="width: 27px; height: 20px; left: 23.50px; top: 0px; position: absolute; transform: rotate(-180deg); transform-origin: 0 0" src="https://via.placeholder.com/27x20" />-->
                  <!--                    </div>-->
                  <img style="width: 14px; height: 14px; left: 2px; top: 2px; position: absolute;"
                       :src="slide.nationalFlag"/>
                  <!--                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; border-radius: 9999px; border: 1.50px #E8E8E8 solid"></div>-->
                </div>
              </div>
              <div class="item-info">
                {{ slide.announcement }}
              </div>
            </div>
            <div class="join" @click="toDetail(slide.roomId)">
              Join Room
            </div>
          </div>
        </div>
        <!--        <div v-if="dataCount > 0" v-for="(slide, idx) in dataInfo"-->
        <!--             style="width: 100%; height: 100%; padding: 8px;margin-top: 1rem; background: #FAF6F3; border-radius: 12px; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">-->
        <!--          <img style="width: 80px; height: 80px; border-radius: 6px" :src="slide.cover"-->
        <!--               @click="toDetail(slide.roomId)"/>-->
        <!--          <div-->
        <!--              style="width:70%;flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex"-->
        <!--              @click="toDetail(slide.roomId)">-->
        <!--            <div-->
        <!--                style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">-->
        <!--              <div-->
        <!--                  style="flex: 1 1 0;width: 80%; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">-->
        <!--                <div-->
        <!--                    style="height: 23px;width: 70%; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">-->
        <!--                  <div-->
        <!--                      style="width:100%;color: #09090B; font-size: 14px; font-weight: normal; font-weight: 600; line-height: 20px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">-->
        <!--                    {{ slide.title }}-->
        <!--                  </div>-->
        <!--                  <div style="width: 24px; height: 24px; position: relative" v-if="slide.nationalFlag">-->
        <!--                    <img style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; "-->
        <!--                         :src="slide.nationalFlag"/>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div-->
        <!--                    style="width:100%;align-self: stretch; height: 15px; color: #71717A; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 16px; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">-->
        <!--                  {{ slide.announcement }}-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div-->
        <!--                  style="position: absolute;left:85%; justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">-->
        <!--                <div style="width: 14px; height: 14px; position: relative">-->
        <!--                  <img style="width: 20px; height: 20px;" :src="voice_listen">-->
        <!--                </div>-->
        <!--                <div-->
        <!--                    style="margin-top:4px;color: #435568; font-size: 12px; font-weight: normal; font-weight: 500; line-height: 16px; word-wrap: break-word">-->
        <!--                  {{ slide.heat }}-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div style="justify-content: flex-start; align-items: flex-start; display: inline-flex">-->

        <!--              <div style="justify-content: flex-start; align-items: flex-start; display: inline-flex"-->
        <!--                   v-for="(slide1, idx1) in slide.seatUsers">-->
        <!--                <img style="width: 24px; height: 24px; border-radius: 9999px; border: 1.20px #F1F4F8 solid"-->
        <!--                     :src="slide1"/>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--       -->
        <div v-if="!dataCount"
             style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: flex;margin-top: 60px">
          <div style="flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
            <img style="width: 70px; height: 70px" :src="no_data"/>
            <div
                style="margin-top: 20px;width: 252px; height: 48px; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
              There is no content here yet, come and explore!
            </div>
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
      .center-swiper {
        width: 1280px;
        display: flex;
        overflow: hidden;
        justify-content: space-between;
        align-items: center;
        //padding: 24px 152px;
        gap: var(--Spacing-2-5, 10px);
        border-radius: var(--Color-card-2, 12px);
        border: 1px solid #050505;
        background: #050505;

        .center-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 3px;
          flex: 1 0 0;
          text-align: center;

          .item {
            width: 320px;
            height: 87px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .p-1 {
              color: #8F8F8F;
              font-family: Inter;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: 25.2px; /* 180% */
              letter-spacing: 1.12px;
              text-transform: uppercase;
            }

            .p-2 {
              color: #FFF;
              text-align: center;
              font-family: Archivo;
              font-size: 48px;
              font-style: normal;
              font-weight: 500;
              line-height: 57.6px; /* 120% */
              letter-spacing: -0.96px;
            }
          }
        }
      }

      .voice-item {
        position: relative;
        width: 400px;
        height: 590px;
        padding: 20px;
        background: #FAF6F3;
        border-radius: 12px;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        display: flex;
        border-radius: 13.959px;
        border: 1.163px solid #050505;
        background: #FFF;
        box-shadow: 0px 9.306px 0px 0px #050505;

        .voice-item-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          align-self: stretch;

          .vioce-item-title {
            color: #09090B;
            font-size: 20px;
            font-weight: normal;
            font-weight: 700;
            line-height: 28px;
            word-wrap: break-word;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-info {
            color: #454545;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 28.8px; /* 180% */
            letter-spacing: -0.32px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .join {
          display: flex;
          width: 128.3px;
          height: 42px;
          padding: var(--Spacing-0, 9px) var(--Spacing-0, 24.84px);
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          border: 1px solid #050505;
          background: #DACDF4;
          box-shadow: 0px 4px 0px 0px #050505;
          color: #050505;
          text-align: center;
          font-family: Inter;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px; /* 160% */
          letter-spacing: -0.3px;
        }

        .join:hover {
          cursor: pointer;
          background-color: #C9B2F7;
        }
      }

      .voice-item:hover {
        transform: translate(0, -16px);
      }
    }

    &.md {

      .container {
        display: flex;
        flex-direction: column;
      }

      .center-swiper {
        width: 90vw;
        height: 95px;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: var(--Spacing-2-5, 10px);
        border-radius: var(--Color-card-2, 12px);
        border: 1px solid #050505;
        background: #050505;

        .center-item {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3px;
          flex: 1 0 0;
          text-align: center;

          .item {
            width: 28vw;
            height: 84px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .p-1 {
              color: #8F8F8F;
              font-family: Archivo;
              font-size: 9px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              text-transform: uppercase;
            }

            .p-2 {
              color: #FFF;
              text-align: center;
              font-family: Archivo;
              font-size: 24px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              letter-spacing: -0.96px;
            }
          }
        }
      }

      .voice-item {
        position: relative;
        width: 45vw;
        margin-top: 10px;
        height: 285px;
        cursor: pointer;
        padding: 10px;
        border-radius: 12px;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        display: flex;
        border: 1.163px solid #050505;
        background: #FFF;
        box-shadow: 0 4.5px 0 0 #050505;

        .voice-item-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          align-self: stretch;

          .vioce-item-title {
            color: #050505;
            font-family: Archivo;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: -0.48px;
          }

          .item-info {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            align-self: stretch;
            overflow: hidden;
            color: #454545;
            text-overflow: ellipsis;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }

        .join {
          display: flex;
          width: 40vw;
          height: 42px;
          //padding: var(--Spacing-0, 9px) var(--Spacing-0, 24.84px);
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          border: 1px solid #050505;
          background: #DACDF4;
          box-shadow: 0px 4px 0px 0px #050505;
          color: #050505;
          text-align: center;
          font-family: Inter;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px; /* 160% */
          letter-spacing: -0.3px;
        }
      }

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
