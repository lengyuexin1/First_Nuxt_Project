<script setup lang="ts">
import * as CryptoJS from "crypto-js";
import voice_listen from "assets/images/voice/voice_listen.webp"

import axios from "axios";
import viocepeople1 from "assets/images/viocepeople1.png";
import viocepeople2 from "assets/images/viocepeople2.png";
import viocepeople3 from "assets/images/viocepeople3.png";
import viocepeople4 from "assets/images/viocepeople4.png";
import Group from "assets/images/voice/voice_listen.webp";

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
const runtimeConfig = useRuntimeConfig();

const dataInfo = ref<any>();
const userInfo = ref({})

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
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
           style="width: 100%; height: 100%;padding-top:50px;  flex-direction: column;  gap: 32px; display: inline-flex">
        <div
            style="align-self: stretch; justify-content: flex-start;flex-direction: column; align-items: center; display: inline-flex">
          <div class="top-tips">
            Discover more rooms
          </div>
          <div class="top-title">
            Recommended For You
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">
    </section>
  </section>
  <section class="section">
    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between flex-wrap"
           style="justify-content: space-between; gap: 40px; display: flex;width: 1280px;">
<!--        <div v-for="(slide, idx) in dataInfo"-->
<!--             style="height: 200px;cursor: pointer; padding: 20px; background: #FAF6F3; border-radius: 12px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex"-->
<!--             @click="toDetail(slide.roomId)">-->
<!--          <img style="width: 160px; height: 160px; border-radius: 12px" :src="slide.cover"/>-->
<!--          <div-->
<!--              style="flex: 1 1 0; align-self: stretch; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">-->

<!--            <div-->
<!--                style="align-self: stretch; height: 87px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 11px; display: flex">-->
<!--              <div-->
<!--                  style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">-->
<!--                <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">-->
<!--                  <div-->
<!--                      style="color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word">-->
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
<!--                  style="align-self: stretch; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word"-->
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
        <div v-for="(slide,idx) in dataInfo" class="voice-item"
             @click="toDetail(slide.roomId)">
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
            <div class="item-info">
              {{ slide.announcement}}
            </div>
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
      </div>

    </section>
    <section class="p-3 lg:hidden md">

    </section>
  </section>
</template>
<style scoped lang="scss">
.section {
  section {
    &.lg {
      //background-color: #FAFAFA;
      position: relative;
      top: -112px;

      .voice-item {
        position: relative;
        width: 400px;
        height: 590px;
        cursor: pointer;
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
            display: flex;
            height: 57.6px;
            flex-direction: column;
            justify-content: center;
            align-self: stretch;
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
      }

      .top-tips {
        display: inline-flex;
        padding: 7px 14px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 44px;
        border: 1px solid #050505;
        background: #F6CBE4;
        color: #050505;
        text-align: center;
        font-family: Archivo;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px; /* 133.333% */
        letter-spacing: 0.6px;
        text-transform: uppercase;
      }

      .top-title {
        margin: 20px 0 36px 0;
        color: #050505;
        font-family: Archivo;
        font-size: 48px;
        font-style: normal;
        font-weight: 500;
        line-height: 57.6px; /* 120% */
        letter-spacing: -0.96px;
      }
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
