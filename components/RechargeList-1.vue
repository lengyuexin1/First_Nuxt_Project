<script setup lang="ts">
import icon1 from "@/assets/images/login/recharge.png";
import icon2 from "@/assets/images/recharge/web_check.png";
import icon3 from "@/assets/images/recharge/shield_check.png";

import phonepe from "@/assets/images/recharge/phone_pe.png";
import google_pay from "@/assets/images/recharge/google_pay.png";
import paytm from "@/assets/images/recharge/paytm.png";
import pay from "@/assets/images/recharge/pay.png";
import recordCircle from "@/assets/images/recharge/record-circle.png";
import rightJ from "~/assets/images/rightJ.png"

import * as CryptoJS from "crypto-js";
import axios from "axios";
import {ElMessage} from "element-plus";
import Logo from "assets/images/logotwo.png";
import loading from "assets/images/recharge/loading.png";
import NoSelect from "assets/images/login/no_select.png";
import Select from "assets/images/login/select.png";
import {first} from "lodash-es";

const digits = ref<any>({});
const currentItem = ref(0);
const drawer = ref(false)
const drawer2 = ref(false)
const direction = "btt" as "btt";
const runtimeConfig = useRuntimeConfig();
const gold = ref(0)
const subtotal = ref(0)
const payTotal = ref(0)
const gtsPrice = ref(0)
const clickPriceInfo = ref<any>({});
const customePrice = ref({})
const drawer3 = ref(false)
const orderId = ref(0)
const orderChannelId = ref("")
const payStatus = ref(0) //0 为支付 1 已支付 -1 取消支付
const payStatusDialog = ref(false)
const payStatusDialog1 = ref(false)
const payWaitTime = ref(180);
const payWaitFomater = ref("");
const payClose = ref(false)
const activeCount = ref<number>(0)

const activeChange = (index: any) => {
  activeCount.value = index
}
const rechargeClick = (id: number, digit: any) => {
  currentItem.value = id;
  clickPriceInfo.value = digit;
  subtotal.value = clickPriceInfo.value.itemCount;
  gtsPrice.value = clickPriceInfo.value.price;
  payTotal.value = clickPriceInfo.value.price;
}

const rechargeClick1 = (id: number, digit: any) => {
  drawer.value = true;
  currentItem.value = id;
  clickPriceInfo.value = digit;
  subtotal.value = customePrice.value.itemCount * num.value
  payTotal.value = customePrice.value.price * num.value
  gtsPrice.value = customePrice.value.price;
}


const num = ref(1)
const handleChange = (value: number) => {
}
const rechargePay = (type: number) => {
  if (type == 1) {
    if (clickPriceInfo.value.id == customePrice.value.id) {
      drawer.value = true;
    } else {
      drawer.value = false;
      drawer2.value = true;
    }
  } else {
    drawer.value = false;
    drawer2.value = true;
  }

}
const userInfo = ref({})

const getRecharge = async () => {
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "type": 0,
      "appId": userInfo.value.userInfo.appId,
      "packageAppId": userInfo.value.userInfo.appId,
      "bizVersion": 1,
      "showType": 0,
      "channel": 0,
      "itemType": 1,
      "sign": "230D74FD9DD4381C838B6C4CE3B031E3"
    },
    "userAuth": {
      "appId": "28cb238c-1f81-44e8-b41d-3e3dcf27c0de",
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodmoneyConfigmoduleuserrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
          'module': 'vivalive-ms',
          'appId': 'v.ms.moneyConfig',
          'method': 'moneyConfig',
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
    digits.value = loginData.value.data.data;
    customePrice.value = digits.value.find(item => item.configId.endsWith('constom'));
    clickPriceInfo.value = digits.value[0]
    subtotal.value = clickPriceInfo.value.itemCount;
    gtsPrice.value = clickPriceInfo.value.price;
    payTotal.value = clickPriceInfo.value.price;
  } else {
  }
}

const getGold = async () => {
  // const loginData = ref("")
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "packageAppId": userInfo.value.userInfo.appId,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "productId": "301",
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodgetUserAccountDetailmodulevivalive-accountrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
          'module': 'vivalive-account',
          'appId': 'v.ac.getUserAccountDetail',
          'method': 'getUserAccountDetail',
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
    gold.value = loginData.value.data.data.gold

  } else {
  }
}

const channel = ref<any>({});
const getChannel = async () => {
  // const loginData = ref("")
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "flag": 0
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodqueryAppPayChannelmodulevivalive-orderrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
          'module': 'vivalive-order',
          'appId': 'v.o.queryAppPayChannel',
          'method': 'queryAppPayChannel',
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
    channel.value = loginData.value.data.data.filter(item => item.payType === 0);
    payType.value = channel.value[0]
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}
const config = ref<any>({});
const getConfig = async () => {
  // const loginData = ref("")
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "biz": 0,
      "key": "upi_app",
      "appId": userInfo.value.userInfo.appId,
      "packageAppId	": userInfo.value.userInfo.appId,
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodconfigmodulevivalive-msrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
          'module': 'vivalive-ms',
          'appId': 'v.ms.config',
          'method': 'config',
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
    let value = loginData.value.data.data.filter(item => item.key === 'upi_app')[0].value
    config.value = JSON.parse(value);
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}

const paySubmit1 = async (id: number) => {
  if (id == 2) {
    drawer3.value = true
    drawer2.value = false
  } else {
    centerDialogVisible.value = true
  }

}
const paySubmit = async (slide: any) => {
  if (payTotal.value <= 0) {
    ElMessage.error("pelease select price");
    return
  }
  // if (!payType.value) {
  //   ElMessage.error("pelease select pay type");
  //   return
  // }
  payType.value = slide
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "packageAppId": userInfo.value.userInfo.appId,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "deviceId": "11asdas135yfggg1das",
      "ip": "192.168.1.1",
      "goodsUniqueCode": clickPriceInfo.value.configId,
      "bizVersion": 2,
      "payPrice": payTotal.value,
      "buyGoodsType": 0,
      "payWay": 1,
      "currency": "INR",
      "channel": "googleplay",
      "extra": JSON.stringify(
          {
            "msQuery":
                {
                  "channel": clickPriceInfo.value.channel,
                  "itemType": clickPriceInfo.value.itemType,
                  "type": clickPriceInfo.value.type
                }
          }),
      "payChannel": 'upi',
      "channelType": 0,
      "productId": 304,
      "pageName": slide.pageName
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodgetrechargemodulevivalive-orderrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
          'module': 'vivalive-order',
          'appId': 'v.o.recharge',
          'method': 'recharge',
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
  if (loginData.value.data.code === 30010205) {
    ElMessage.error("Please login");
    localStorage.removeItem('logindata');
    localStorage.setItem('liveDetailLogin', '1');
    window.location.reload()
    return;
  }
  if (loginData.value.data.code === 200) {
    payWaitTime.value = 180;
    payWaitFomater.value = '3:00';
    payStatus.value = 0;
    const data = JSON.parse(loginData.value.data.data.extra)
    if (window.innerWidth < 768) {
      payStatusDialog1.value = true
      drawer.value = false
      drawer2.value = false
      drawer3.value = false
    } else {
      payStatusDialog.value = true
    }
    if (data.thirdPayUrl) {
      orderId.value = loginData.value.data.data.orderId
      window.open(data.upi, '_blank')
      //window.location.href = data.thirdPayUrl;
    } else if (data.upi) {
      orderId.value = loginData.value.data.data.orderId
      window.open(data.upi, '_blank')
      //window.location.href = data.upi;
    } else {
      ElMessage.error("Pay error,get pay url error");
      return;
    }

  } else {

  }
}
const confirm = () => {
  drawer2.value = false;
  subtotal.value = customePrice.value.itemCount * num.value
  payTotal.value = customePrice.value.price * num.value
  gtsPrice.value = customePrice.value.price;
  currentItem.value = 0;
}
const rechargeInput = () => {
  subtotal.value = clickPriceInfo.value.itemCount * num.value
  payTotal.value = clickPriceInfo.value.price * num.value
}
let payType = ref(1)
const phonepeClick = (payTypeInfo: any) => {
  payType.value = payTypeInfo;
}
const drawer3Return = () => {
  drawer3.value = false;
  drawer2.value = true;
}
onMounted(() => {
  getRecharge()
  getGold()
  getChannel()
  getConfig()
});
const showClose = ref(false);
const centerDialogVisible = ref(false)
const firstVisible = ref<boolean>(false)

const firstClose = ref(false)
const handlefirstopen = () => firstVisible.value = !firstVisible.value
const handlefirstPay = () => {
  firstVisible.value = !firstVisible.value
  centerDialogVisible.value = !centerDialogVisible.value
}


//根据订单号获取订单状态
const getOrderByOrderStatus = async () => {
  // const loginData = ref("")
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "orderId": orderId.value,
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodqueryOrderStatusmodulevivalive-orderrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
          'module': 'vivalive-order',
          'appId': 'v.o.queryOrderStatus',
          'method': 'queryOrderStatus',
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
    payStatus.value = loginData.value.data.data.status
    orderChannelId.value = loginData.value.data.data.channelTransactionId
    if (payStatus.value === 1) {
      getGold()
      //ElMessage.success("pay success")
      //window.location.reload()
    }
  } else {
    ElMessage.error(loginData.value.data.message);
    return
  }
}


const payRefresh = () => {
  payStatusDialog.value = false
  payStatusDialog1.value = false
  window.location.reload()
}
setInterval(() => {
  if (payStatus.value == 1) {
    payClose.value = true
    return
  }
  payWaitTime.value = payWaitTime.value - 1
  if (payWaitTime.value <= 0) {
    payWaitTime.value = 0
    payWaitFomater.value = '0:00'
    payStatus.value = -1
    payClose.value = true
    return
  }
  if (!orderId.value) {
    return;
  }
  let minutes = Math.floor(payWaitTime.value / 60);
  let remainingSeconds = payWaitTime.value % 60;
  payWaitFomater.value = minutes + ':' + remainingSeconds
  if (orderId.value) {
    getOrderByOrderStatus()
  }
}, 1000)
</script>
<template>
  <section class="section">
    <MySwiper/>
    <section class=" hidden lg:flex lg">
      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag"
           style="width: 100%; height: 100%; padding-top: 16px;position:relative; padding-bottom: 16px; margin: 0 auto ;">
        <div
            style="justify-content: center;flex-direction: column; align-items: center; gap: 4px; display: flex;position:absolute;top: -210px;left:30%;">
          <div class="top-tips">Want to buy a gift? Give it to him?</div>
          <div class="top-title">Recharge Coins</div>
        </div>
      </div>
      <!--      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag" style="width: 100%; height: 100%; padding-top: 16px; padding-bottom: 16px;  margin: 100px auto auto auto;">-->
      <!--        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">-->
      <!--          <div style="justify-content: flex-start; align-items: center; display: flex">-->
      <!--            <div style="color: rgba(0, 0, 0, 0.40); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/">Home</nuxt-link></div>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--              <path d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z" fill="black" fill-opacity="0.4"/>-->
      <!--            </svg>-->
      <!--          </div>-->
      <!--          <div style="justify-content: flex-start; align-items: center; display: flex">-->
      <!--            <div style="color: rgba(0, 0, 0, 0.90); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/recharge.html">Recharge</nuxt-link></div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

    </section>
    <section class="lg:hidden md header-tag">
      <div
          style="position: absolute;top:26vw;left:22vw;justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
        <div style="z-index:2;justify-content: center;flex-direction: column ;align-items: center; display: flex;">
          <div class="top-tips">
            Want to buy a gift? Give it to him?
          </div>
          <div class="top-title">
            Recharge Coins
          </div>
        </div>
      </div>
    </section>
  </section>
  <section class="section">
    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl  justify-between py-2 px-4 lg:p-6 lg:px-4"
           style="position:relative;top:-60px;z-index:1;border-radius: var(--Color-card-2, 12px);border: 2px solid #000;background: #FFF;box-shadow: 0px 4px 0px 0px #000;width:1280px;height:96px;display: flex;padding: 24px;flex-direction: column;align-items: flex-start;gap: var(--Color-card-2, 12px);align-self: stretch;">
        <div>
          <p
              style="color: #000;font-family: Archivo;font-size: 18px;font-style: normal;font-weight: 600;line-height: 24px; /* 133.333% */">
            Fully Protected Payments</p>
          <p
              style="color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 14px;font-style: normal;font-weight: 400;line-height: 20px; /* 142.857% */">
            Your Details Are Secure with Our Trusted Payment Partners.</p>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">
      <div>
        <div
            style="width: 100%; height: 100%; justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
          <div style="color: black; font-size: 16px;font-weight: 500; word-wrap: break-word">
            Balance:
          </div>
          <div
              style="width: 24px; height: 24px; padding: 1px; justify-content: center; align-items: center; display: flex">
            <img style="width: 22px; height: 22px" alt="icon1" :src="icon1"/>
          </div>
          <div style="color: black; font-size: 16px;font-weight: 500; word-wrap: break-word">
            {{ gold }}
          </div>
        </div>
      </div>
    </section>
  </section>
  <section class="section">
    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl  justify-between py-2 px-4 lg:p-6 lg:px-4"
           style="background-color: #fff;position:relative; top: -35px; box-shadow: 0 8px 0 0;border-radius: var(--Color-card-2,12px);border: 2px solid #050505; width: 1280px;margin-bottom: 143px;flex-direction: column;  gap: 12px; display: inline-flex;">
        <div
            style="justify-content: flex-start;flex-direction: column; align-items: flex-start; gap: 2px; display: inline-flex">
          <p
              style="color: #000;font-family: Archivo;font-size: 18px;font-style: normal;font-weight: 600;line-height: 24px; /* 133.333% */">
            Fully Protected Payments</p>
          <div style="display: flex;justify-content: flex-start;align-items: center;margin-top: 10px;">
            <div style="color: black; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word">
              Balance:
            </div>
            <div
                style="width: 24px; height: 24px; padding: 1px; justify-content: center; align-items: center; display: flex">
              <img style="width: 22px; height: 22px" :src="icon1"/>
            </div>
            <div style="color: black; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word">
              {{ gold }}
            </div>
          </div>
        </div>
        <div>
          <div
              style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
            <div
                style="color: #000;font-family: Inter;font-size: 14px;font-style: normal;font-weight: 500;line-height: normal;">
              Custom price:
            </div>
            <el-input-number v-model="num" class="mx-4 input-number" :min="1" controls-position="right"
                             @change="handleChange"/>

            <div
                style="width: 70px; height: 32px; padding-left: 8px; padding-right: 8px; background: #050505; border-radius: 8px; justify-content: flex-start; align-items: center; gap: 10px; display: flex">
              <button @click="confirm">
                <div
                    style="color: #FFFFFF; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word">
                  Confirm
                </div>
              </button>
            </div>
          </div>

        </div>
        <div class="Balanceshop">
          <div class="Balanceshop-item" v-for="(digit, index) in digits" :key="index"
               :class="activeCount == index ? 'active' : ''"
               @click="activeChange(index)">
            <div style="display: flex;justify-content: flex-start;align-items: center;box-sizing: border-box;">
              <img width="36" height="36" :src="icon1" alt="icon1">
              <p
                  style="margin-left:10px;color: #000;/* text-2xl/semibold */font-family: var(--font, Archivo);font-size: 24px;font-style: normal;font-weight: 600;line-height: 32px; /* 133.333% */">
                {{ digit.itemCount }}</p>
            </div>
            <p
                style="color: var(--color-text-icon-color-2, #3F3F46);/* text-base/semibold */font-family: var(--font, Archivo);font-size: 16px;font-style: normal;font-weight: 600;line-height: 24px; /* 150% */">
              ₹ {{ digit.price }}</p>
          </div>
        </div>
        <div class="paybtn flex" @click="handlefirstopen">
          Pay now
          <img width="15" height="15" :src="rightJ" alt="rightJ">
        </div>
      </div>
      <el-dialog
          v-model="firstVisible"
          width="765" destroy-on-close :show-close="showClose" center append-to-body
          :close-on-press-escape="firstClose"
          class="login-dialog"
      >
        <div class="first-box">
          <div class="first-title">Payment</div>
          <div class="first-content flex justify-start items-start flex-col">
            <div class="first-tips">Payment Details</div>
            <div class="first-item flex justify-between items-center">
              <div>Coins</div>
              <div>{{ subtotal }}</div>
            </div>
            <div class="first-item  flex justify-between items-center">
              <div>GTS</div>
              <div><span>₹ </span>{{ gtsPrice }}</div>
            </div>
            <div class="first-item  flex justify-between items-center">
              <div
                  style="color: var(--color-text-icon-color-2, #3F3F46);/* text-xl/semibold */font-family: var(--font, Archivo);font-size: 20px;font-style: normal;font-weight: 600;line-height: 28px; /* 140% */">
                Total Payable Amount
              </div>
              <div
                  style="color: var(--color-text-icon-color-2, #3F3F46);/* text-xl/semibold */font-family: var(--font, Archivo);font-size: 20px;font-style: normal;font-weight: 600;line-height: 28px; /* 140% */">
                <span>₹ </span>{{ payTotal }}
              </div>
            </div>
            <div class="first-tips mt-8">Payment Method</div>
            <div class="flex justify-between items-center w-full">
              <img width="149" :src="pay" alt="">
              <img width="24" :src="recordCircle" alt="">
            </div>
            <div class="first-btn mt-8" @click="handlefirstPay">
              Pay now
              <img width="15" height="15" :src="rightJ" alt="rightJ">
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog v-model="centerDialogVisible" width="765" destroy-on-close :show-close="showClose" center
                 class="login-dialog" append-to-body>
        <div
            style=" box-shadow:0 8px 0 0 #050505;border: 1px solid #050505;width: 100%; height: 100%; padding-left: 90px; padding-right: 90px; padding-top: 32px; padding-bottom: 32px; background: white; border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
          <div
              style="color: #09090B; font-size: 20px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">
            Pay Using
          </div>
          <div
              style="align-self: stretch; height: 246px; padding-left: 8px; padding-right: 8px; padding-top: 12px; padding-bottom: 12px; background: white; border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
            <div
                style="align-self: stretch; height: 222px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 10px; display: flex">
              <div @click="paySubmit(slide)" v-for="(slide, id) in config"
                   style="cursor: pointer; align-self: stretch; height: 48px; border-bottom: 1px #050505 solid; flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
                <div
                    style="align-self: stretch; padding-top: 12px; padding-bottom: 12px; justify-content: space-between; align-items: center; display: inline-flex">
                  <div
                      style="height: 22.75px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                    <img style="width: 21px; height: 21px; border-radius: 9999px;" :src="slide.url"/>
                    <div
                        style="color: #09090B; font-size: 14px; font-family: Inter; font-weight: 400; line-height: 20px; word-wrap: break-word">
                      {{ slide.appName }}
                    </div>
                  </div>
                  <div style="width: 24px; height: 24px; position: relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#09090B" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog v-model="payStatusDialog" :close-on-press-escape="payClose" :close-on-click-modal="payClose"
                 width="610" destroy-on-close :show-close="showClose" center class="login-dialog" append-to-body>
        <div
            style=" box-shadow: 0 8px 0 0 #050505;border: 1px solid #050505; width: 100%; height: 100%; padding-left: 90px; padding-right: 90px; padding-top: 32px; padding-bottom: 32px; background: white; border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
          <!--          <div-->
          <!--              style="height: 50px; padding-top: 6.83px; padding-bottom: 7.27px; padding-right: 0.83px; justify-content: center; align-items: flex-end; gap: 5.82px; display: inline-flex">-->
          <!--            <div style="width: 34.94px; height: 35.90px; position: relative">-->
          <!--              <img style="width: 34.94px; height: 35.90px; left: 0px; top: 0px; position: absolute" :src="Logo"/>-->
          <!--            </div>-->
          <!--            <div-->
          <!--                style="color: #09090B; font-size: 20.38px; font-family: Figtree; font-weight: 700; line-height: 29.12px; word-wrap: break-word">-->
          <!--              AwazMingle-->
          <!--            </div>-->
          <!--          </div>-->
          <div v-if="payStatus == 0"
               style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
            <div style="width: 64px; height: 64px; position: relative">
              <img :src="loading" alt="loading" class="rotating-image" style="width: 64px; height: 64px;">

            </div>
            <div
                style="width: 405px; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">
              {{ payWaitFomater }}
            </div>
          </div>
          <div v-if="payStatus == 0"
               style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
            <div
                style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 24px; display: flex">
              <div
                  style="width: 405px; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">
                Your recharge is processing now
              </div>
            </div>
            <div
                style="width: 405px; text-align: center; color: #09090B; font-size: 14px; font-family: Inter; font-weight: 400; line-height: 20px; word-wrap: break-word">
              Please wait, the page is redirecting to the payment page
            </div>
          </div>
          <div v-if="payStatus == -1"
               style="width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center; gap: 12px; display: inline-flex">
            <div
                style="height: 50px; padding-top: 6.83px; padding-bottom: 7.27px; padding-right: 0.83px; justify-content: center; align-items: flex-end; gap: 5.82px; display: inline-flex">
              <div style="width: 34.94px; height: 35.90px; position: relative">
                <img style="width: 34.94px; height: 35.90px; left: 0px; top: 0px; position: absolute" :src="Logo"/>
              </div>
              <div
                  style="color: #09090B; font-size: 20.38px; font-family: Figtree; font-weight: 700; line-height: 29.12px; word-wrap: break-word">
                AwazMingle
              </div>
            </div>
            <div
                style="width: 64px; height: 64px; padding: 5.33px; justify-content: center; align-items: center; display: inline-flex">
              <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M32.5007 58.6673C47.1673 58.6673 59.1673 46.6673 59.1673 32.0007C59.1673 17.334 47.1673 5.33398 32.5007 5.33398C17.834 5.33398 5.83398 17.334 5.83398 32.0007C5.83398 46.6673 17.834 58.6673 32.5007 58.6673Z"
                    stroke="#F59E0B" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.9541 39.5474L40.0474 24.4541" stroke="#F59E0B" stroke-width="5.33333"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M40.0474 39.5474L24.9541 24.4541" stroke="#F59E0B" stroke-width="5.33333"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div
                style="align-self: stretch; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
              We apologize for the issue. Your transaction failed, and no payment was required. For questions, please
              contact customer service.
            </div>
          </div>
          <div v-if="payStatus == -1"
               style="width: 100%; height: 100%; padding-top: 8px; padding-bottom: 8px; border-bottom: 1px #F4F4F5 solid; justify-content: space-between; align-items: center; display: inline-flex">
            <div
                style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
              Order ID
            </div>
            <div
                style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
              {{ orderChannelId }}
            </div>
          </div>
          <div v-if="payStatus == -1" @click="payRefresh"
               style="box-shadow:0 5px 0 0 #050505;border:1px solid #050505;cursor: pointer; width: 100%; height: 100%; padding-top: 15px; padding-bottom: 15px; background: #DACDF4; border-radius: 7px; justify-content: center; align-items: center; display: inline-flex">
            <div @click="payRefresh"
                 style="text-align: center; color: #050505; font-size: 16px; font-family: Inter; font-weight: 700; line-height: 24px; word-wrap: break-word">
              Got it
            </div>
          </div>
          <div v-if="payStatus == 1"
               style="width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center; gap: 12px; display: inline-flex">
            <div
                style="height: 50px; padding-top: 6.83px; padding-bottom: 7.27px; padding-right: 0.83px; justify-content: center; align-items: flex-end; gap: 5.82px; display: inline-flex">
              <div style="width: 34.94px; height: 35.90px; position: relative">
                <img style="width: 34.94px; height: 35.90px; left: 0px; top: 0px; position: absolute" :src="Logo"/>
              </div>
              <div
                  style="color: #09090B; font-size: 20.38px; font-family: Figtree; font-weight: 700; line-height: 29.12px; word-wrap: break-word">
                AwazMingle
              </div>
            </div>
            <div style="width: 64px; height: 64px; position: relative">
              <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M32.5002 58.6663C47.1668 58.6663 59.1668 46.6663 59.1668 31.9997C59.1668 17.333 47.1668 5.33301 32.5002 5.33301C17.8335 5.33301 5.8335 17.333 5.8335 31.9997C5.8335 46.6663 17.8335 58.6663 32.5002 58.6663Z"
                    stroke="#31D084" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.1665 31.9998L28.7132 39.5465L43.8332 24.4531" stroke="#31D084" stroke-width="5.33333"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div
                style="align-self: stretch; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
              "Your transaction was successful. Thank you for your payment. If you have any questions, feel free to
              contact customer service."
            </div>
            <div
                style="align-self: stretch; height: 160px; padding-left: 24px; padding-right: 24px; padding-top: 4px; padding-bottom: 4px; background: #FAFAFA; border-radius: 8px; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: flex">
              <div
                  style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; border-bottom: 1px #F4F4F5 solid; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                    style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  Order ID
                </div>
                <div
                    style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  {{ orderChannelId }}
                </div>
              </div>
              <div
                  style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; border-bottom: 1px #F4F4F5 solid; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                    style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  Amount
                </div>
                <div
                    style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  ${{ payTotal }}
                </div>
              </div>
              <div
                  style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                    style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  Coins
                </div>
                <div
                    style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  {{ subtotal }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="payStatus == 1" @click="payRefresh"
               style="box-shadow:0 8px 0 0 #050505;border:1px solid #050505;width: 100%; height: 100%; padding-top: 15px; padding-bottom: 15px; background: #DACDF4; border-radius: 7px; justify-content: center; align-items: center; display: inline-flex">
            <div @click="payRefresh"
                 style="text-align: center; color: white; font-size: 16px; font-family: Inter; font-weight: 700; line-height: 24px; word-wrap: break-word">
              Got it
            </div>
          </div>
        </div>
      </el-dialog>
    </section>
    <section class="p-3 lg:hidden md">
      <div>
        <!--        <div-->
        <!--            style="width: 100%; height: 100%; padding-left: 16px; padding-right: 16px; padding-top: 8px; padding-bottom: 8px; justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">-->
        <!--          <div style="color: black; font-size: 16px; font-weight: normal; font-weight: 500; word-wrap: break-word">-->
        <!--            Balance:-->
        <!--          </div>-->
        <!--          <div-->
        <!--              style="width: 24px; height: 24px; padding: 1px; justify-content: center; align-items: center; display: flex">-->
        <!--            <img style="width: 22px; height: 22px" :src="icon1"/>-->
        <!--          </div>-->
        <!--          <div style="color: black; font-size: 16px; font-weight: normal; font-weight: 500; word-wrap: break-word">-->
        <!--            {{ gold }}-->
        <!--          </div>-->
        <!--        </div>-->
        <div
            style="align-self: stretch; flex-wrap: wrap;justify-content: space-between; align-items: flex-start; gap: 12px; display: grid; grid-template-columns: repeat(2, 1fr);">
          <div v-for="(digit, index) in digits" :key="index">
            <div v-if="!digit.configId.endsWith('constom')"
                 :class="{ 'active': currentItem === index, 'no_active': currentItem != index }"
                 @click="rechargeClick(index, digit)"
                 style="background-color: #F4F4F5; height: 80px;   border-radius: 12px; flex-direction: column; justify-content: center; align-items: center; display: flex">
              <div style="justify-content: flex-start; align-items: center; gap: 3.02px; display: inline-flex">
                <div
                    style="width: 36.23px; height: 36.23px; padding: 1.51px; justify-content: center; align-items: center; display: flex">
                  <img style="width: 33.21px; height: 33.21px" :src="icon1"/>
                </div>
                <div
                    style="color: black; font-size: 14px; font-weight: normal; font-weight: 600; line-height: 32px; word-wrap: break-word">
                  {{ digit.itemCount }}
                </div>
              </div>
              <div
                  style="color: #3F3F46; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                ₹ {{ digit.price }}
              </div>
            </div>
            <div v-else :class="{ 'active': currentItem === index, 'no_active': currentItem != index }"
                 @click="rechargeClick1(index, digit)"
                 style="background-color: #F4F4F5; height: 80px;border-radius: 12px; flex-direction: column; justify-content: center; align-items: center; display: flex">
              <div
                  style="height: 28px; color: #050505; font-size: 14px;font-weight: 600; line-height: 20px; word-wrap: break-word">
                Custom price
              </div>
              <div
                  style="justify-content: flex-start; align-items: center; gap: 2px; display: flex;flex-direction: row;">
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                  ₹ {{ customePrice.price }}=
                </div>
                <div
                    style="width: 16px; height: 16px; padding: 0.67px; justify-content: center; align-items: center; display: flex">
                  <img style="width: 14.67px; height: 14.67px" :src="icon1"/>
                </div>
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                  {{ customePrice.itemCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div @click="rechargePay(1)"
             style="width: 100%; height: 100%;margin-top: 50%; padding-top: 15px; padding-bottom: 15px; background: #DACDF4;border:1px solid #050505;box-shadow: 0 5px 0 0; border-radius: 4px; justify-content: center; align-items: center; display: inline-flex">
          <div class="flex gap-3"
               style="text-align: center; color: #050505; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">
            <div>Recharge</div>
            <img :src="rightJ" alt="rightJ">
          </div>
        </div>
        <el-drawer v-model="payStatusDialog1" :close-on-press-escape="payClose" :close-on-click-modal="payClose"
                   :direction="direction" :append-to-body=true :visible="drawer" size="60%" title="I am the title"
                   :with-header="false" :z-index=999
                   style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem">
          <div
              style="width: 100%; height: 100%; background: white; border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
            <div
                style=" height: 50px; padding-top: 6.83px; padding-bottom: 7.27px; padding-right: 0.83px; justify-content: center; align-items: flex-end; gap: 5.82px; display: inline-flex">
              <div style="width: 8vw; height: 8vw; position: relative">
                <img style="width: 8vw; height: 8vw; left: 0px; top: 0px; position: absolute" :src="Logo"/>
              </div>
              <div
                  style="color: #09090B; font-size: 20.38px; font-family: Figtree; font-weight: 700; line-height: 29.12px; word-wrap: break-word">
                AwazMingle
              </div>
            </div>
            <div v-if="payStatus == 0"
                 style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
              <div style="width: 64px; height: 64px; position: relative">
                <img :src="loading" alt="loading" class="rotating-image" style="width: 64px; height: 64px;">
              </div>
              <div
                  style="width: 405px; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                {{ payWaitFomater }}
              </div>
            </div>
            <div v-if="payStatus == 0"
                 style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
              <div
                  style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 24px; display: flex">
                <div
                    style="width: 405px; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  Your recharge is processing now
                </div>
              </div>
              <div
                  style="width: 405px; text-align: center; color: #09090B; font-size: 14px; font-family: Inter; font-weight: 400; line-height: 20px; word-wrap: break-word">
                Please wait, the page is redirecting to the payment page
              </div>
            </div>
            <div v-if="payStatus == -1"
                 style="width: 100%;  flex-direction: column; justify-content: center; align-items: center; gap: 12px; display: inline-flex">
              <div
                  style="width: 64px; height: 64px; padding: 5.33px; justify-content: center; align-items: center; display: inline-flex">
                <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M32.5007 58.6673C47.1673 58.6673 59.1673 46.6673 59.1673 32.0007C59.1673 17.334 47.1673 5.33398 32.5007 5.33398C17.834 5.33398 5.83398 17.334 5.83398 32.0007C5.83398 46.6673 17.834 58.6673 32.5007 58.6673Z"
                      stroke="#F59E0B" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M24.9541 39.5474L40.0474 24.4541" stroke="#F59E0B" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M40.0474 39.5474L24.9541 24.4541" stroke="#F59E0B" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div v-if="payStatus == -1"
                   style="width: 100%; text-align: center; color: #09090B; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word">
                We apologize for the issue. Your transaction failed, and no payment was required. For questions, please
                contact customer service.
              </div>
            </div>
            <div v-if="payStatus == -1"
                 style="width: 100%;  padding-left: 24px; padding-right: 24px; padding-top: 4px; padding-bottom: 4px; background: #F4F4F5; border-radius: 8px; flex-direction: column; justify-content: center; align-items: center; gap: 4px; display: inline-flex">
              <div
                  style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; border-bottom: 1px #F4F4F5 solid; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                    style="text-align: center; color: #09090B; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  Order ID
                </div>
                <div
                    style="text-align: center; color: #09090B; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ orderChannelId }}
                </div>
              </div>
            </div>

            <div v-if="payStatus == -1" @click="payRefresh" class="mt-24"
                 style="box-shadow:0 5px 0 0;border:1px solid #050505;width: 100%;  padding-top: 15px; padding-bottom: 15px; background: #DACDF4; border-radius: 4px; justify-content: center; align-items: center; display: inline-flex">
              <div @click="payRefresh"
                   style="text-align: center; color: #050505; font-size: 16px; font-family: Inter; font-weight: 700; line-height: 24px; word-wrap: break-word">
                Got it
              </div>
            </div>
            <div v-if="payStatus == 1"
                 style="width: 100%; flex-direction: column; justify-content: center; align-items: center; gap: 12px; display: inline-flex">
              <div style="width: 64px; height: 64px; position: relative">
                <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M32.5002 58.6663C47.1668 58.6663 59.1668 46.6663 59.1668 31.9997C59.1668 17.333 47.1668 5.33301 32.5002 5.33301C17.8335 5.33301 5.8335 17.333 5.8335 31.9997C5.8335 46.6663 17.8335 58.6663 32.5002 58.6663Z"
                      stroke="#31D084" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21.1665 31.9998L28.7132 39.5465L43.8332 24.4531" stroke="#31D084" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div
                  style="align-self: stretch; text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                "Your transaction was successful. Thank you for your payment. If you have any questions, feel free to
                contact customer service."
              </div>
              <div
                  style="align-self: stretch; height: 160px; padding-left: 24px; padding-right: 24px; padding-top: 4px; padding-bottom: 4px; background: #FAFAFA; border-radius: 8px; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div
                    style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; border-bottom: 1px #F4F4F5 solid; justify-content: space-between; align-items: center; display: inline-flex">
                  <div
                      style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                    Order ID
                  </div>
                  <div
                      style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                    {{ orderChannelId }}
                  </div>
                </div>
                <div
                    style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; border-bottom: 1px #F4F4F5 solid; justify-content: space-between; align-items: center; display: inline-flex">
                  <div
                      style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                    Amount
                  </div>
                  <div
                      style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                    ${{ payTotal }}
                  </div>
                </div>
                <div
                    style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; justify-content: space-between; align-items: center; display: inline-flex">
                  <div
                      style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                    Coins
                  </div>
                  <div
                      style="text-align: center; color: #09090B; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 28px; word-wrap: break-word">
                    {{ subtotal }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="payStatus == 1" @click="payRefresh" class="mt-14"
                 style="box-shadow:0 5px 0 0;border:1px solid #050505;width: 100%;  padding-top: 15px; padding-bottom: 15px; background: #DACDF4; border-radius: 4px; justify-content: center; align-items: center; display: inline-flex">
              <div @click="payRefresh"
                   style="text-align: center; color: white; font-size: 16px; font-family: Inter; font-weight: 700; line-height: 24px; word-wrap: break-word">
                Got it
              </div>
            </div>
          </div>
        </el-drawer>

        <el-drawer v-model="drawer" :direction="direction" :append-to-body=true :visible="drawer" size="50%"
                   title="I am the title" :with-header="false" :z-index=999
                   style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem">
          <div style=" justify-content: center; align-items: center;">
            <div
                style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; padding-bottom: 10px;">
              <div @click="drawer = false">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.3335 3.33301L16.6668 16.6663" stroke="#3F3F46" stroke-width="1.66667"/>
                  <path d="M3.3335 16.667L16.6668 3.33366" stroke="#3F3F46" stroke-width="1.66667"/>
                </svg>
              </div>
              <div
                  style="text-align: center; color: #050505; font-size: 17px;  font-weight: 600; line-height: 28px; word-wrap: break-word; flex: 1;">
                Custom price
              </div>
              <div>
                <div
                    style="color: #050505; font-size: 14px;  font-weight: 600; word-wrap: break-word"
                    @click="rechargePay(2)">Confirm
                </div>
              </div>
            </div>
            <div style="width: 100%; height: 100%; position: relative; background: #FAFAFA; border-radius: 12px">
              <div
                  style="left: 12px; top: 10px; position: absolute; text-align: center; color: #09090B; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word">
                ₹
              </div>
              <div
                  style="left: 33px; top: 10px; position: absolute; text-align: center; color: #D4D4D8; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word">
                <input @input="rechargeInput" v-model="num" inputmode="numeric" pattern="[0-9]*"
                       style="left: 33px; outline: 0; position: absolute; text-align: center; color: #D4D4D8; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word"
                       placeholder=" Input recharge amount">
              </div>

              <div
                  style="left: 70%; top: 10px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                <div
                    style="width: 28px; height: 28px; padding: 1.17px; justify-content: center; align-items: center; display: flex">
                  <img style="width: 25.67px; height: 25.67px" :src="icon1"/>
                </div>
                <div
                    style="text-align: center; color: #D4D4D8; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word">
                  {{ subtotal }}
                </div>
              </div>
            </div>
          </div>
        </el-drawer>
        <el-drawer v-model="drawer2" :direction="direction" :append-to-body=true :visible="drawer2" size="60%"
                   title="I am the title" :with-header="false" :z-index=999
                   style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem">
          <div style=" justify-content: center; align-items: center;">
            <div
                style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; padding-bottom: 10px;">
              <div>

              </div>
              <div
                  style="text-align: center; color: black; font-size: 17px; font-weight: normal; font-weight: 600; line-height: 28px; word-wrap: break-word; flex: 1;">
                Payment Method
              </div>
              <div style="padding-right: 13px;" @click="drawer2 = false">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.3335 3.33301L16.6668 16.6663" stroke="#3F3F46" stroke-width="1.66667"/>
                  <path d="M3.3335 16.667L16.6668 3.33366" stroke="#3F3F46" stroke-width="1.66667"/>
                </svg>
                <!--                <div style="color: #F43F5E; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word" @click="paySubmit1(2)">Confirm</div>-->
              </div>
            </div>
            <div
                style="width: 100%; height: 100%; padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; background: rgba(49.94, 203.14, 83.64, 0.10); border-radius: 12px; justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
              <div style="width: 18px; height: 18px; justify-content: center; align-items: center; display: flex">
                <div style="width: 18px; height: 18px; position: relative">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M9.00199 0.748047C9.47274 0.748047 9.97978 0.812889 10.4046 0.967819L10.4108 0.97009L14.1528 2.37242C14.1528 2.37242 14.1528 2.37243 14.1528 2.37242C14.756 2.598 15.2621 3.04687 15.6141 3.55573C15.9662 4.0647 16.2076 4.69634 16.2076 5.33992V10.9124C16.2076 11.5039 16.0175 12.1321 15.7461 12.6716C15.4745 13.2115 15.0833 13.7387 14.6091 14.0932L11.3858 16.4994C11.3854 16.4997 11.3849 16.5001 11.3845 16.5004C10.7031 17.0121 9.83778 17.2462 9.00762 17.2462C8.17746 17.2462 7.31218 17.0121 6.63074 16.5004C6.6303 16.5001 6.62987 16.4997 6.62944 16.4994L3.40646 14.0934C2.93222 13.739 2.5407 13.2115 2.26917 12.6716C1.99776 12.1321 1.80762 11.5039 1.80762 10.9124V5.33992C1.80762 4.69898 2.04981 4.06899 2.40159 3.56164C2.75328 3.05441 3.25876 2.60593 3.86148 2.38028C3.8618 2.38016 3.86212 2.38004 3.86244 2.37992L7.6052 0.969825C8.02606 0.812635 8.53215 0.748047 9.00199 0.748047ZM8.13088 2.3747C8.1306 2.3748 8.13031 2.37491 8.13003 2.37502L4.38779 3.78492C4.12844 3.8819 3.85052 4.10445 3.63427 4.41633C3.41792 4.72836 3.30762 5.06587 3.30762 5.33992V10.9124C3.30762 11.206 3.40997 11.6015 3.60919 11.9976C3.80828 12.3934 4.06585 12.7136 4.3041 12.8917L7.5308 15.3004C7.90666 15.583 8.43955 15.7462 9.00762 15.7462C9.57568 15.7462 10.1086 15.583 10.4844 15.3004L10.4865 15.2989L13.7111 12.8917C13.9494 12.7136 14.207 12.3934 14.406 11.9976C14.6053 11.6015 14.7076 11.206 14.7076 10.9124V5.33992C14.7076 5.061 14.5965 4.72139 14.3805 4.40911C14.1644 4.09674 13.8867 3.87435 13.6274 3.77742L9.88789 2.37602C9.67518 2.29901 9.35472 2.24805 9.00199 2.24805C8.64734 2.24805 8.33255 2.29956 8.13088 2.3747Z"
                          fill="#32CB54"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M11.7502 6.35444C12.0431 6.64733 12.0431 7.1222 11.7502 7.4151L8.52518 10.6401C8.23229 10.933 7.75742 10.933 7.46452 10.6401L6.25702 9.4326C5.96413 9.1397 5.96413 8.66483 6.25702 8.37194C6.54992 8.07904 7.02479 8.07904 7.31768 8.37194L7.99485 9.0491L10.6895 6.35444C10.9824 6.06154 11.4573 6.06154 11.7502 6.35444Z"
                          fill="#32CB54"/>
                  </svg>

                </div>
              </div>
              <div
                  style="color: #32CB54; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word">
                100% SECURE & SAFE PAYMENT
              </div>
            </div>
            <div class="mt-2"
                 style="box-shadow:0 3px 0 0 #050505;border:1px solid #050505;width: 100%; height: 100%; padding: .8vw 2vw; background: white; border-radius: 12px; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
              <div
                  style="color: #09090B; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 16px; word-wrap: break-word">
                Payment Details
              </div>
              <div
                  style="align-self: stretch; height: 96px; flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
                <div
                    style="align-self: stretch; height: 64px; border-bottom: 1px #F4F4F5 solid; flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
                  <div
                      style="align-self: stretch; padding-top: 6px; padding-bottom: 6px; justify-content: space-between; align-items: flex-start; display: inline-flex">
                    <div
                        style="color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                      Subtotal
                    </div>
                    <div
                        style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                      {{ subtotal }}
                    </div>
                  </div>
                  <div
                      style="align-self: stretch; padding-top: 6px; padding-bottom: 6px; justify-content: space-between; align-items: flex-start; display: inline-flex">
                    <div
                        style="color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                      GTS
                    </div>
                    <div
                        style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                      ₹ {{ gtsPrice }}
                    </div>
                  </div>
                </div>
                <div
                    style="align-self: stretch; padding-top: 6px; padding-bottom: 6px; justify-content: space-between; align-items: flex-start; display: inline-flex">
                  <div
                      style="color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                    Total Payable Amount
                  </div>
                  <div
                      style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                    ₹ {{ payTotal }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4"
                 style="box-shadow:0 3px 0 0 #050505;border:1px solid #050505;width: 100%; height: 100%; padding: .6vw 2vw; background: white; border-radius: 12px; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
              <div
                  style="color: #09090B; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 16px; word-wrap: break-word">
                Payment Method
              </div>
              <div
                  style="align-self: stretch;  flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
                <div
                    style="align-self: stretch; padding-top: 8px; padding-bottom: 8px; justify-content: space-between; align-items: center; display: inline-flex"
                    @click="phonepeClick(slide)">
                  <div
                      style="width: 170px; height: 36.51px; padding-top: 5.83px; padding-bottom: 6.38px;  justify-content: flex-start; align-items: center; display: flex">
                    <img style="width: 149px; height: 32px" :src="pay"/>
                  </div>
                  <div style="width: 24px; height: 24px; justify-content: center; align-items: center; display: flex">
                    <div style="width: 24px; height: 24px; position: relative">
                      <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M2.71997 12.2549C2.71997 7.1491 6.86418 3.00488 11.97 3.00488C17.0853 3.00488 21.22 7.14861 21.22 12.2549C21.22 17.3607 17.0758 21.5049 11.97 21.5049C6.86418 21.5049 2.71997 17.3607 2.71997 12.2549Z"
                              stroke="#F43F5E" stroke-width="1.5"/>
                          <path
                              d="M12 6.25488C8.688 6.25488 6 8.94288 6 12.2549C6 15.5669 8.688 18.2549 12 18.2549C15.312 18.2549 18 15.5669 18 12.2549C18 8.94288 15.318 6.25488 12 6.25488Z"
                              fill="#F43F5E"/>
                        </svg>
                      </span>
                      <!--                      <span v-else>-->
                      <!--                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                          <path opacity="0.15" d="M2.71973 12.7646C2.71973 7.65886 6.86394 3.51465 11.9697 3.51465C17.085 3.51465 21.2197 7.65837 21.2197 12.7646C21.2197 17.8704 17.0755 22.0146 11.9697 22.0146C6.86394 22.0146 2.71973 17.8704 2.71973 12.7646Z" stroke="#292D32" stroke-width="1.5"/>-->
                      <!--                        </svg>-->
                      <!--                      </span>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-24"
                 style="box-shadow:0 4px 0 0;border: 1px solid #050505;width: 100%; padding-top: 15px; padding-bottom: 15px; background: #DACDF4; border-radius: 4px; justify-content: center; align-items: center; display: inline-flex"
                 @click="paySubmit1(2)">
              <div class="flex"
                   style="text-align: center; color: #050505; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">
                <div>Pay now</div>
                <img width="15" height="15" :src="rightJ" alt="rightJ">
              </div>
            </div>
          </div>
        </el-drawer>

        <el-drawer v-model="drawer3" :direction="direction" :append-to-body=true :visible="drawer" size="50%"
                   title="I am the title" :with-header="false" :z-index=999
                   style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem">
          <div style=" justify-content: center; align-items: center;">
            <div
                style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; padding-bottom: 10px;">
              <div @click="drawer3Return">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3333 16.667L6.66659 10.0003L13.3333 3.33366" stroke="#3F3F46" stroke-width="1.66667"/>
                </svg>
              </div>
              <div
                  style="text-align: center; color: black; font-size: 17px; font-weight: normal; font-weight: 600; line-height: 28px; word-wrap: break-word; flex: 1;">
                Pay Using
              </div>
              <div>
                <div
                    style="color: #F43F5E; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word;padding-right: 13px;"
                    @click="drawer3 = false">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.3335 3.33301L16.6668 16.6663" stroke="#3F3F46" stroke-width="1.66667"/>
                    <path d="M3.3335 16.667L16.6668 3.33366" stroke="#3F3F46" stroke-width="1.66667"/>
                  </svg>
                </div>
              </div>
            </div>
            <div
                style="width: 100%; height: 100%; padding-left: 8px; padding-right: 8px; padding-top: 12px; padding-bottom: 12px; background: white; border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
              <div
                  style="align-self: stretch; height: 222px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                <div @click="paySubmit(slide)" v-for="(slide, idx) in config"
                     style="align-self: stretch; height: 48px; border-bottom: 1px #F4F4F5 solid; flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
                  <div
                      style="align-self: stretch; padding-top: 12px; padding-bottom: 12px; justify-content: space-between; align-items: center; display: inline-flex">
                    <div
                        style="height: 22.75px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                      <img style="width: 21px; height: 21px" :src="slide.url"/>
                      <div
                          style="color: #09090B; font-size: 14px; font-family: Inter; font-weight: 400; line-height: 20px; word-wrap: break-word">
                        {{ slide.appName }}
                      </div>
                    </div>
                    <div
                        style="width: 24px; height: 24px; padding-top: 6px; padding-bottom: 6px; justify-content: center; align-items: center; display: flex">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="#09090B" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                      </svg>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-drawer>
      </div>
    </section>
  </section>
</template>
<style scoped>
.login-dialog {
  --el-dialog-padding-primary: 0px;
  --el-dialog-box-shadow: 0px;
  background: none;
}

.input-number {
  --el-color-primary: #050505;
  --el-border-color: #050505;
}

.el-drawer__body {
  padding-top: 0;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 0;
}
</style>
<style scoped lang="scss">
@keyframes rotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.rotating-image {
  animation: rotate 2s linear infinite;
  /* 5s表示动画时长，linear表示线性动画，infinite表示无限循环 */
}

.first-box {
  border-radius: 20px;
  border: 1px solid #050505;
  background: #FFF;
  box-shadow: 0px 8px 0px 0px #050505;
  display: inline-flex;
  padding: 40px 150px;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 765px;
  height: 555px;

  .first-title {
    color: #050505;
    text-align: center;
    font-family: Archivo;
    font-size: 2vw;
    font-style: normal;
    font-weight: 500;
    line-height: 5vh; /* 144% */
    letter-spacing: -0.96px;
  }

  .first-content {
    width: 765px;
    padding: 24px 150px;

    .first-tips {
      text-align: left;
      color: var(--color-text-icon-color-2, #3F3F46);
      font-family: Archivo;
      font-size: 0.8vw;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .first-item {
      color: var(--color-text-icon-color-2, #3F3F46);
      /* text-base/semibold */
      font-family: var(--font, Archivo);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
      border-bottom: 1px solid #050505;
      height: 56px;
      width: 100%;
    }

    .first-btn {
      cursor: pointer;
      display: flex;
      width: 420px;
      margin: 20px auto;
      padding: 13px 20px;
      justify-content: center;
      align-items: center;
      gap: 3px;
      border-radius: 4px;
      border: 1px solid #050505;
      background: #DACDF4;
      box-shadow: 0px 4px 0px 0px #050505;
      color: #050505;
      text-align: center;
      /* text-base/normal */
      font-family: var(--font, Archivo);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

.section {
  section {
    &.lg {
      //background-color: #FAFAFA;


      .Balanceshop {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        /* 可选: 添加间距 */
      }

      .paybtn {
        cursor: pointer;
        display: flex;
        width: 420px;
        margin: 20px auto;
        padding: 13px 20px;
        justify-content: center;
        align-items: center;
        gap: 3px;
        border-radius: 4px;
        border: 1px solid #050505;
        background: #DACDF4;
        box-shadow: 0px 4px 0px 0px #050505;
        color: #050505;
        text-align: center;
        /* text-base/normal */
        font-family: var(--font, Archivo);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        /* 150% */
      }

      .active {
        border: 2px solid #050505;
        box-shadow: 0 8px 0 0;
      }

      .Balanceshop-item {
        cursor: pointer;
        border-radius: var(--Color-card-2, 12px);
        background: var(--Color-surface-, #FAFAFA);
        flex: 1 0 21%;
        /* 21% 是为了考虑间距的百分比，可以根据实际情况调整 */
        max-width: 300px;
        /* 最大宽度 300 像素 */
        height: 100px;
        box-sizing: border-box;
        padding: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .top-tips {
        display: flex;
        padding: 7px var(--Spacing-3-5, 14px);
        justify-content: center;
        align-items: center;
        gap: var(--Spacing-2-5, 10px);
        border-radius: 44px;
        border: 1px solid #050505;
        background: #F6CBE4;
        color: #050505;
        text-align: center;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        /* 133.333% */
        letter-spacing: 0.6px;
        text-transform: uppercase;
      }

      .top-title {
        color: #050505;
        font-family: Archivo;
        font-size: 64px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.96px;
      }

      //.active {
      //  background: #FFF1F2;
      //  border-radius: 12px;
      //  border: 2px #050505 solid;
      //}

      .no_active {
        background: #FAFAFA;;
        border-radius: 12px;
        border: 2px solid transparent;
      }

      /* Checked state style for the radio buttons */
      input[type="radio"]:checked + .radio-label .radio-button {
        border: 2px solid #F00;
        /* Red border */
        background-color: #F00;
        /* Red background */
      }
    }

    &.md {

      .top-tips {
        display: inline-flex;
        padding: .5vw 2vw;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 44px;
        border: 1px solid #050505;
        background: #F6CBE4;
        color: #050505;
        text-align: center;
        font-family: Inter;
        font-size: 2.5vw;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        /* 133.333% */
        letter-spacing: 0.6px;
        text-transform: uppercase;
      }

      .top-title {
        color: #050505;
        font-family: Archivo;
        font-size: 7vw;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.96px;
      }

      //background-color: #FAFAFA;

      .active {
        background: #FFF1F2;
        border-radius: 12px;
        border: 2px #050505 solid;
        box-shadow: 0 4px 0 0;
      }

      .no_active {
        background: #FFF;
        border: 2px solid transparent;
        border-radius: 12px;
      }
    }
  }
}
</style>
