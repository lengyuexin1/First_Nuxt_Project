<script setup lang="ts">
import icon1 from "@/assets/images/voice/chat_icon.png";
import liveicon from "@/assets/images//live_icon.png";
import icon2 from "@/assets/images/live/eye.png";
import icon3 from "@/assets/images/live/voice_loading.jpg";
import icon4 from "@/assets/images/live/loading_1.png";
import icon5 from "@/assets/images/live/gift_more.png";
import icon6 from "@/assets/images/live/right_j.png";
import icon7 from "@/assets/images/live/recharge.png";
import icon8 from "@/assets/images/live/right_j_white.png";
import icon9 from "@/assets/images/live/user_icon.png";
import user_image from "~/assets/images/user_image.png"
import back_up from "~/assets/images/live/back_up.png"

import icon10 from "@/assets/images/live/bbt.png";
import icon11 from "@/assets/images/live/voice_loading-h5.png";
import voice_desk from "@/assets/images/live/voice_desk.png";
import Unmute from "~/assets/images/Unmute.png"

import rechargeh5 from "@/assets/images/live/recharge-h5.png";
import { ElMessage } from "element-plus";

import * as CryptoJS from "crypto-js";
import axios from "axios";
import LoginRight from "assets/images/login/login_right.png";
import boxone from "assets/images/boxone.png";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import Logo from "assets/images/logotwo.png";
import MoreIconBlack from "assets/images/index/more-black.png";
import { useRouter } from "vue-router";

const drawer = ref(false)
const direction = "btt" as "btt";
const dark = ref("dark")
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const userInfo = ref<any>({})
const dataInfo = ref<any>({})
const giftInfo = ref<any>({})
const giftInfo1 = ref<any>({})
const giftInfo2 = ref<any>({})
const giftInfoH5 = ref<any>({})
const autoplay = ref<any>(false)
const videoRef = ref()
const videoRef1 = ref()
const isPlay = ref(false);
const gold = ref(0)
const userList = ref<any>({})
const userTotalCount = ref(0)
const chatMsgInfo = ref<any>([])
const passwordDialog = ref(false)
const showClose = ref(false)
const digits = ref(['', '', '', '', '', ''])
const needPassword = ref(false)
const confirmDisabled = ref(false)
const id = ref(route.params.id)
const dialogWidth = ref('30%')
const enterRoomInfo = ref<any>([])
const enterRoomInfo2 = ref<any>([])
const passwordClose = ref(false)
const voicePlay = ref(false)
const isLiveVoiceRoom = ref<boolean>(false)
const windwoInnerwidth = ref<number>(0)
onBeforeMount(() => {
  const router = useRouter()
  if (router.currentRoute.value.path.indexOf('voiceDetail') !== -1 && window.innerWidth < 1280) {
    isLiveVoiceRoom.value = !isLiveVoiceRoom.value
  }
  windwoInnerwidth.value = window.innerWidth
  console.log(isLiveVoiceRoom.value);

})

const handleResize = () => {
  // 在这里可以根据需要调整宽度
  if (window.innerWidth <= 768) {
    dialogWidth.value = '97%'; // 在小屏幕上使用更小的宽度
  } else {
    dialogWidth.value = '30%'; // 在大屏幕上使用较大的宽度
  }
}
const onDigitInput = (type: number) => {
  digits.value[type] = digits.value[type].replace(/[^0-9]/g, '');
  if (digits.value[type].length === 1) {
    if (type < digits.value.length - 1) {
      const nextInput = document.querySelector(`.digit-input:nth-child(${type + 2})`);
      if (nextInput) {
        nextInput.focus();
      }
    } else {
      confirmDisabled.value = true;
      joinRoom()
      //发送验证码，登录成功
    }
  }
}
if (process.client) {
  const LavieSDK = window.LavieSDK;
  LavieSDK.lavieSdkInit();
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  console.log(userInfo,'userInfo')
  await LavieSDK.accountLoginHandle(userInfo.value, 'sdfasdfsdf232rfsdfsd20022');
  // LavieSDK.enterLiveRoom(route.params.id);
  LavieSDK.addMsgListener(LavieSDK.MESSAGE_TYPE.ROOM_MESSAGE,
    (e: MessageData) => {
      //1. 送礼消息 - 2400
      if (e.msgId == 2400 && e.data.roomId == route.params.id) {
        e.msgType = 2400;
        let receiverName = ''
        if (e.data.receiverNickName) {
          receiverName = "Send to " + e.data.receiverNickName
        } else {
          receiverName = "Send to All Users"
        }
        //goodsImgUrl  senderHeadImg  senderNickName senderHeadImg
        enterRoomInfo.value.push({
          headImg: e.data.senderHeadImg,
          nickName: e.data.senderNickName,
          giftImg: e.data.goodsImgUrl,
          num: e.data.goodsNum,
          type: receiverName,
          timestamp: new Date().getTime()
        })
        //送礼动效
      }
      // 2. 进房消息 - 2201
      if (e.msgId == 2201 && e.data.roomId == route.params.id) {
        //进房动效果
        // enterRoomInfo.value.push({
        //   headImg: e.data.avatarUrl,
        //   nickName: e.data.userName,
        //   giftImg: e.data.staticUrl,
        //   type: "enter the room",
        //   timestamp: new Date().getTime()
        // })
        chatMsgInfo.value.push({ userName: e.data.userName, content: "Enter the room" })
      }
      // 3. 公屏聊天 - 2304
      if (e.msgId == 2304 && e.data.roomId == route.params.id) {
        if (e.data.content && (e.data.content.includes('http://') || e.data.content.includes('https://'))) {
          return
        }
        addMsg(e.data)
      }
      // 4. 房间类型切换消息 - 103041008
      if (e.msgId == 103041008 && e.data.roomId == route.params.id) {
        //退出房间
        leaveRoom()
        ElMessage.error('Room type is update');
        if (e.data.type == 0) {
          window.location.href = '/voiceDetail/' + route.params.id;
        } else if (e.data.type == 3) {
          window.location.href = '/liveDetail/' + route.params.id;
        } else {
          window.location.href = '/index.html';
        }
      }
      // 5. 麦位更新 - 2302
      if (e.msgId == 2302 && e.data.roomId == route.params.id) {
        getUser()
      }
      if (e.msgId == 2203 && e.data.roomId == route.params.id && e.data.userId == userInfo.value.userInfo.userId) {
        leaveRoom()
        ElMessage.error('You were kicked out of the room by the owner');
        window.location.href = '/index.html';
      }
      // 6. 在房用户更新 - 2301
      if (e.msgId == 2301 && e.data.roomId == route.params.id) {
        getRoomUser()
      }
      //console.log('DEMO -> ChatRoom::MSG_TYPE_ROOM_MESSAGE--->', e);
    });


  setInterval(() => {
    // userList.value.push({"userName":"12321"})
    if (enterRoomInfo2.value.length > 0) {
      const currentTimestamp = new Date().getTime();
      const timeThreshold = 3000; // 5 seconds
      const filteredRoomInfo2 = enterRoomInfo2.value.filter(item => item.timestamp < currentTimestamp - timeThreshold);
      filteredRoomInfo2.forEach(item => {
        const index = enterRoomInfo2.value.findIndex(element => element === item);
        if (index !== -1) {
          enterRoomInfo2.value.splice(index, 1);
        }
      });
    }
    if (enterRoomInfo2.value.length < 3) {
      const numberOfElementsToAdd = 3 - enterRoomInfo2.value.length;
      const elementsToAdd = enterRoomInfo.value.slice(0, numberOfElementsToAdd);
      const updatedElements = elementsToAdd.map(element => {
        // Assuming timestamp is a property in each element
        return {
          ...element,
          timestamp: new Date().getTime(),
        };
      });
      enterRoomInfo2.value = [...enterRoomInfo2.value, ...updatedElements];
      enterRoomInfo.value = enterRoomInfo.value.slice(numberOfElementsToAdd);
    }
  }, 1000);
}
const play = async () => {
  voicePlay.value = true;
  audioTrack.value.play();
}
const noPlay = async () => {
  voicePlay.value = false;
  audioTrack.value.stop();
}
const onKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && index > 0) {
    // 如果按下 Backspace 键且当前输入框不是第一个，将焦点退回到前一个输入框
    const nextInput = document.querySelector(`.digit-input:nth-child(${index})`);
    if (nextInput) {
      nextInput.focus();
    }
  }
}
const sendGift = async (svgaVal: any) => {
  //调用接口
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
      "productId": 304,
      "roomId": route.params.id,
      "senderNickName": userInfo.value.userInfo.userName,
      "receiverAppId": dataInfo.value.appId,
      "receiverUserId": dataInfo.value.userId,
      "receiverNickName": dataInfo.value.userName,
      "goodsId": svgaVal.id,
      "goodsNum": 1,
      "sendType": 2
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
  const sign = "content" + requestData + 'methodsendGiftVcmodulevivalive-orderrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
  // 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref();
  try {
    loginData.value = await axios.post(
      runtimeConfig.public.VITE_BASE_URL,
      requestData,
      {
        headers: {
          'module': 'vivalive-order',
          'appId': 'v.o.sendGiftVc',
          'method': 'sendGiftVc',
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
    if (loginData.value.data.code === 3002003) {
      ElMessage.error(loginData.value.data.message);
      window.location.href = '/recharge.html';
      return
    }
    if (loginData.value.data.code === 200) {
      drawer.value = false;
      gold.value = loginData.value.data.data.senderGold;
      //dataInfo.value = loginData.value.data.data;
      // ElMessage.success("提交成功");
    } else {
      ElMessage.error(loginData.value.data.message);
      return
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
  // if (process.client) {
  //   // const SVGA = window.SVGA
  //   const parser = new SVGA.Parser('#svga')
  //   const player = new SVGA.Player('#svga')
  //   parser.load(svgaVal.effect, function (videoItem) {
  //     // player.setImage('./samples/avatar.png', '99')
  //     player.setVideoItem(videoItem);
  //     player.startAnimation();
  //     setTimeout(() => {
  //       player.stopAnimation()
  //     }, 3000)
  //     // player.startAnimationWithRange({location: 20, length: 1}, false);
  //   }, function (error) {
  //     //alert(error.message);
  //   })
  //   const parser1 = new SVGA.Parser('#svgaPc')
  //   const player1 = new SVGA.Player('#svgaPc')
  //   parser1.load(svgaVal.effect, function (videoItem) {
  //     // player.setImage('./samples/avatar.png', '99')
  //     player1.setVideoItem(videoItem);
  //     player1.startAnimation();
  //     setTimeout(() => {
  //       player1.stopAnimation()
  //     }, 3000)
  //     // player.startAnimationWithRange({location: 20, length: 1}, false);
  //   }, function (error) {
  //     //alert(error.message);
  //   })
  // }
}
const getDetail = async () => {
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
      "productId": 304,
      "roomId": route.params.id,
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
  const sign = "content" + requestData + 'methodqueryRoomInfomodulevivalive-voice-roomrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
  // 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref();
  try {
    loginData.value = await axios.post(
      runtimeConfig.public.VITE_BASE_URL,
      requestData,
      {
        headers: {
          'module': 'vivalive-voice-room',
          'appId': 'v.v.r.queryRoomInfo',
          'method': 'queryRoomInfo',
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
      passwordDialog.value = false;
      localStorage.setItem('liveDetailLogin', '1');
      window.location.reload()
      return;
    }
    if (loginData.value.data.code === 200) {
      dataInfo.value = loginData.value.data.data;
      needPassword.value = loginData.value.data.data.needPassword;
      if (needPassword.value) {
        passwordDialog.value = true;
        confirmDisabled.value = false;
        setTimeout(() => {
          digits.value = ['', '', '', '', '', ''];
          const nextInput = document.querySelector(`.digit-input:first-child`);
          if (nextInput) {
            nextInput.focus();
          }
        }, 500);
      } else {
        joinRoom();
      }
      // ElMessage.success("提交成功");
    } else {
      //ElMessage.error(loginData.value.data.message);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }

}
//获取用户信息
const getGift = async () => {
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
      "packageAppId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "productId": 304,
      "goodsSecondCategory": 0
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
  const sign = "content" + requestData + 'methodqqueryGoodsmodulegoodsrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
        'module': 'goods',
        'appId': 'v.g.queryGoods',
        'method': 'queryGoods',
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
    giftInfo.value = chunkArray(loginData.value.data.data, 8);
    giftInfoH5.value = chunkArray(loginData.value.data.data, 100000);
    giftInfo1.value = loginData.value.data.data.slice(0, 6);
    giftInfo2.value = loginData.value.data.data.slice(0, 4);
  } else {
  }
}
const audioTrack = ref(null)
const videoTrack = ref(null)
const initTracks = async () => {
  if (audioTrack.value && videoTrack.value) {
    return
  }
  if (process.client) {
    const tracks = await Promise.all([
      window.AgoraRTC.createMicrophoneAudioTrack(),
      // window.AgoraRTC.createCameraVideoTrack()
    ])
    audioTrack.value = tracks[0]
    // videoTrack.value = tracks[1]
  }
}

const joinRoom = async () => {
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  let password = '';
  if (needPassword.value) {
    password = Object.values(digits.value).join('');
    if (password.length < 6) {
      ElMessage.error("Please input right password");
      return
    }
  }
  if (needPassword.value && !password) {
    passwordDialog.value = true;
    setTimeout(() => {
      digits.value = ['', '', '', '', '', ''];
      const nextInput = document.querySelector(`.digit-input:first-child`);
      if (nextInput) {
        nextInput.focus();
      }
    }, 500);
    return;
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "lang": "en"
    },
    "business": {
      "appId": userInfo.value.userInfo.appId,
      "packageAppId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "cname": route.params.id + '_1',
      "productId": 304,
      "streamType": 1,
      "password": password,
      "roomType": 1,
      "uid": userInfo.value.userInfo.id,
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "lng": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodenterRoommodulevivalive-voice-roomrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
        'module': 'vivalive-voice-room',
        'appId': 'v.v.r.enterRoom',
        'method': 'enterRoom',
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
    passwordDialog.value = false;
    window.location.reload()
    return;
  }
  if (loginData.value.data.code === 103041016) {
    ElMessage.error(loginData.value.data.message);
    passwordDialog.value = true
    confirmDisabled.value = false
    digits.value = ['', '', '', '', '', '']
    const nextInput = document.querySelector(`.digit-input:first-child`);
    if (nextInput) {
      nextInput.focus();
    }
  }

  if (loginData.value.data.code === 200) {
    passwordDialog.value = false
    if (process.client) {
      const client = window.AgoraRTC.createClient({
        mode: "live",
        codec: "vp8"
      });
      const remoteUsers = ref({})
      const handleUserPublished = async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        console.log("user-published", user, mediaType);
        if (mediaType === "audio") {
          audioTrack.value = user.audioTrack;
          // 自动播放音频
          //audioTrack.play();
        } else {
          const videoTrack = user.videoTrack;
          // 自动播放视频
          isPlay.value = true
          videoTrack.play(videoRef.value);
          // videoTrack.play(videoRef1.value);
        }
        // delete remoteUsers.value[user.uid]
        // remoteUsers.value[user.uid] = user
      }
      const handleUserUnpublished = (user, mediaType) => {
        if (mediaType == 'video') {
          //delete remoteUsers.value[user.uid]
        }
      }
      window.AgoraRTC.onAutoplayFailed = () => {
        const btn = document.createElement("button");
        btn.innerText = "Click me to resume the audio/video playback";
        btn.onClick = () => {
          btn.remove();
        };
        document.body.append(btn);
      }
      client.setClientRole('audience', {
        level: Number(1)
      });
      client.on("user-published", handleUserPublished)

      const join = await client.join('6e4cc652877749eb8d20477c3cc96538', route.params.id + '_1', loginData.value.data.data.token || null, userInfo.value.userInfo.id || null)
      passwordDialog.value = false
      //await initTracks()
      //const tracks = [audioTrack.value, videoTrack.value]
      //client.play(videoRef.value)
      //console.log(tracks)
    }
  } else {
    ElMessage.error(loginData.value.data.message);
    window.location.href = '/';
  }
}

const leaveRoom = async () => {

  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (!userInfo.value.userInfo) {
    return
  }
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "lang": "en"
    },
    "business": {
      "appId": userInfo.value.userInfo.appId,
      "packageAppId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "cname": route.params.id + '_1',
      "productId": 304,
      "streamType": 1,
      "roomType": 1,
      "uid": userInfo.value.userInfo.id,
    },
    "userAuth": {
      "appId": userInfo.value.userInfo.appId,
      "userId": userInfo.value.userInfo.userId,
      "token": userInfo.value.token,
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "lng": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodleaveRoommodulevivalive-voice-roomrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
        'module': 'vivalive-voice-room',
        'appId': 'v.v.r.leaveRoom',
        'method': 'leaveRoom',
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

  } else {
    //ElMessage.error(loginData.value.data.message);
  }

  if (audioTrack.value && audioTrack.value.stop()) {
    //audioTrack.value.stop()
  }
  audioTrack.value.stop()
  if (audioTrack.value && audioTrack.value.leave()) {
  }

}
const chatMsgRef = ref<any>(false)

//获取金钱
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
    // ElMessage.success("提交成功");
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}
//查询麦位
const getRoomUser = async () => {
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
      "roomId": route.params.id
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
  const sign = "content" + requestData + 'methodqueryOnlineRoomUserListmodulevivalive-voice-roomrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
        'module': 'vivalive-voice-room',
        'appId': 'v.v.r.queryOnlineRoomUserList',
        'method': 'queryOnlineRoomUserList',
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
    userTotalCount.value = loginData.value.data.totalCount;
    //gold.value = loginData.value.data.data.gold
    // ElMessage.success("提交成功");
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}

const getUser = async () => {
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
      "roomId": route.params.id
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
  const sign = "content" + requestData + 'methodqueryRoomSeatInfoListmodulevivalive-voice-roomrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
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
        'module': 'vivalive-voice-room',
        'appId': 'v.v.r.queryRoomSeatInfoList',
        'method': 'queryRoomSeatInfoList',
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
    userList.value = loginData.value.data.data;
    userList.value = userList.value.filter(user => user.userId);
  } else {
    //ElMessage.error(loginData.value.data.message);
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const addMsg = (data: any) => {
  //data = {'userName':"user","content":"3333"}
  chatMsgInfo.value.push(data)
  if (process.client) {
    setTimeout(() => {
      const chatContainer = document.getElementById('chatMsg');
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const chatContainer1 = document.getElementById('chatMsg1');
      chatContainer1.scrollTop = chatContainer1.scrollHeight;
    }, 100)

  }
}
onMounted(() => {
  getDetail();
  getGift();
  getGold();
  getUser();
  getRoomUser();
  handleResize()
  // getChatmsg();
});

const closeDetail = async () => {
  leaveRoom()
  window.location.href = '/';
}

onUnmounted(() => {
  leaveRoom()
})
const currentItem = ref(null)
const activeGift = (idx: number) => {
  currentItem.value = idx;
}
const currentItem1 = ref(null)
const currentItem1Info = ref({})
const activeGift1 = (idx: number, slide: any) => {
  currentItem1.value = idx;
  currentItem1Info.value = slide;
}

const popperStyle = ref("border-radius: 20px; background-color: #fff;")
</script>
<template>
  <section class="section">
    <MySwiper v-if="!isLiveVoiceRoom" />
    <section class=" hidden lg:flex lg">
      <!--      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag" style="width: 100%; height: 100%; padding-top: 16px; padding-bottom: 16px; margin: 100px auto auto auto;">-->
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
      <!--            <div style="color: rgba(0, 0, 0, 0.90); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link :to="'/voiceDetail/' + id">Voice detail</nuxt-link></div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

    </section>
    <!--    <section class="lg:hidden md">-->

    <!--    </section>-->
  </section>
  <section class="section" style="height: 100%">
    <section class="hidden lg:flex lg">
      <!--      <button @click="play">123333</button>-->
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
        style="width: 100%; height: 100%;  justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex">
        <!--        <button @click="addMsg">addMsg</button>-->
        <div
          style="border-radius: var(--Color-card-2, 12px);border: 2px solid #050505;box-shadow: 0px 4px 0px 0px #000; position: relative; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">

          <div
            style="width: 926px; height: 60px; position: relative; background: white;border-bottom: 2px solid #050505">
            <div
              style="left: 64px; top: 35px; position: absolute; color: #71717A; font-size: 10px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
              {{ dataInfo.announcement }}
            </div>
            <div
              style="left: 64px; top: 14px; position: absolute; justify-content: flex-start; align-items: center; gap: 9px; display: inline-flex">
              <div
                style="color: #09090B; font-size: 16px; font-family: Figtree; font-weight: 600; word-wrap: break-word">
                {{ dataInfo.title }}
              </div>
              <div
                style="padding-left: 5.33px; padding-right: 5.33px; padding-top: 1px; padding-bottom: 1.33px; border-radius: 6666px; justify-content: flex-start; align-items: center; gap: 1.33px; display: flex">
                <div style="width: 100%; position: relative">
                  <img style="width: 41.6px;height: 16.6px;" :src="icon1" />
                </div>
              </div>
            </div>
            <div
              style="width: 40px; height: 40px; left: 15px; top: 10px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
              <img style="width: 40px; height: 40px; border-radius: 8px" :src="dataInfo.avatarUrl" />
            </div>
            <!--            <div style="left: 842px; text-align: right; top: 22px; position: absolute; justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">-->
            <!--              <div style="width: 16px; height: 16px; position: relative">-->
            <!--                <img :src="icon2" style="width: 16px;height: 16px;">-->
            <!--              </div>-->
            <!--              <div style="text-align: right; color: #D4D4D8; font-size: 12px; font-weight: normal; font-weight: 500; line-height: 16px; word-wrap: break-word">5524</div>-->
            <!--            </div>-->
          </div>
          <!--      :style="{ backgroundImage: 'url(' + icon3 + ')' }"     -->
          <div v-cloak class="chat-content"
            style="background: linear-gradient(180deg, #F5F1FB 0%, #FAF5FB 67.29%, rgba(253, 247, 251, 0.40) 100%); #000000 Linear Gradient #F5F1FB 100% #FAF5FB 100% #FDF7FB 40%">
            <div class="avatar-row" style="display: flex;justify-content: center;align-items: center;width:646px;">
              <!--              <div>-->
              <!--                  style="width: 100%; height: 100%; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex;margin: 0 20px">-->
              <!--                <div-->
              <!--                    style="width: 73.53px; height: 73.53px;  position: relative;border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">-->
              <!--                  <img-->
              <!--                      style="width: 73.53px; height: 73.53px;"-->
              <!--                      alt="user_image"-->
              <!--                      :src="user_image"/>-->
              <!--                  <div-->
              <!--                      style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">-->
              <!--                    <div-->
              <!--                        style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex"></div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--                <div-->
              <!--                    style="color: var(&#45;&#45;color-text-icon-color-1, #09090B);/* text-base/medium */font-family: var(&#45;&#45;font, Archivo);font-size: 16px;font-style: normal;font-weight: 400;line-height: 24px; /* 150% */">-->
              <!--                  深度理解-->
              <!--                </div>-->
              <!--              </div>-->
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex"
                v-if="userList[0]">
                <div
                  style="width: 73.53px; height: 73.53px;  position: relative;border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <div style="width: 73.53px; height: 73.53px;">
                    <img style="width: 73.53px; height: 73.53px;" :src="userList[0].avatarUrl" />
                  </div>
                </div>
                <div
                  style="color: #050505; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[0].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: #050505; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.1
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[1]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[1].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[1].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px;flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.2
                </div>
              </div>
            </div>
            <div class="avatar-row">
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[2]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[2].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[2].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.3
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[3]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[3].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[3].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.4
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[4]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[4].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[4].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.5
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[5]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[5].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[5].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.6
                </div>
              </div>
            </div>
            <div class="avatar-row">
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[6]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[6].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[6].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.7
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[7]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[7].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[7].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.8
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[8]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[8].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[8].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.9
                </div>
              </div>
              <div
                style="width: 200px; height: 115px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex"
                v-if="userList[9]">
                <div style="width: 100px; height: 100px; position: relative">
                  <div
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; background: #C4C4C4; border-radius: 9999px">
                  </div>
                  <img
                    style="width: 73.53px; height: 73.53px; left: 13.24px; top: 13.24px; position: absolute; border-radius: 9999px; border: 2px rgba(255, 255, 255, 0.50) solid"
                    :src="userList[9].avatarUrl" />
                  <div
                    style="width: 73.53px; height: 73.53px; padding: 25px; left: 13.24px; top: 13.24px; position: absolute; justify-content: center; align-items: center; display: inline-flex">
                    <div
                      style="flex: 1 1 0; align-self: stretch; justify-content: center; align-items: center; display: inline-flex">
                    </div>
                  </div>
                </div>
                <div
                  style="color: white; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  {{ userList[9].userName }}
                </div>
              </div>
              <div v-else
                style="width: 200px; height: 115px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
                <div
                  style="display:flex;justify-content:center;align-items:center;width: 81.4px; height: 81.4px; border-radius: 12px;border: 2px #050505 solid;overflow: hidden;box-shadow: 0 2.2px 0 0 #050505">
                  <img style="width: 35.29px; height: 35.29px; margin: 0 auto;" alt="voice_desk" :src="voice_desk" />
                </div>
                <div
                  style="color: var(--color-text-icon-color-1, #09090B);; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">
                  &nbsp;No.10
                </div>
              </div>
            </div>
          </div>
          <div id="svgaPc" style="position: absolute;top:40%;left:30%;z-index: 999;width: 400px;height: 300px"></div>
          <div style="top:50%;left:15%;z-index: 999;position: fixed">
            <div class="enter-the-room" :style="{ left: -(idx * 20) + 'px' }" v-for="(slide, idx) in enterRoomInfo2">
              <div class="enter-content">
                <div class="enter-left-content">
                  <img style="width: 33px; height: 33px; border-radius: 9999px" :src="slide.headImg" />
                  <div class="enter-text-content">
                    <div
                      style="color: #09090B; font-size: 9.89px; font-family: Figtree; font-weight: 600; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      {{ slide.nickName }}
                    </div>
                    <div
                      style="color: #09090B; font-size: 13.19px; font-family: Figtree; font-weight: 700; word-wrap: break-word">
                      {{ slide.type }}
                    </div>
                  </div>
                </div>
                <img v-if="slide.giftImg" style="width: 39px; height: 39px;" :src="slide.giftImg" />
                <div
                  style="color: #09090B; font-size: 18.66px; font-family: Mulish; font-style: italic; font-weight: 700; margin-right: 5px;word-wrap: break-word">
                  ×{{ slide.num }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="!voicePlay" @click="play" style="cursor:pointer; position: absolute;top:76%;left:5%;z-index: 999">
            <img :src="Unmute" alt="Unmute">
            <!--            <svg width="98" height="32" viewBox="0 0 98 32" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--              <rect x="0.333008" width="97" height="32" rx="16" fill="white" fill-opacity="0.1"/>-->
            <!--              <path fill-rule="evenodd" clip-rule="evenodd"-->
            <!--                    d="M28.486 10.4629C28.8372 10.3044 29.2504 10.4607 29.4089 10.8119C29.8433 11.7748 30.333 13.3868 30.333 15.7499C30.333 17.7886 29.9686 19.2689 29.5888 20.2562C29.3993 20.749 29.2069 21.1166 29.0563 21.3676C28.981 21.4931 28.9163 21.5892 28.8677 21.6573C28.8434 21.6913 28.8231 21.7183 28.8076 21.7383C28.7998 21.7484 28.7933 21.7567 28.788 21.7633L28.781 21.7719L28.7782 21.7753L28.777 21.7767C28.777 21.7767 28.776 21.778 28.24 21.3313L28.776 21.778C28.5293 22.074 28.0894 22.114 27.7933 21.8673C27.4988 21.6218 27.4577 21.1849 27.7005 20.889C27.7005 20.889 27.7021 20.8869 27.7037 20.8848C27.7086 20.8785 27.7184 20.8656 27.7322 20.8462C27.7599 20.8074 27.8042 20.7423 27.8598 20.6497C27.9708 20.4647 28.1272 20.1695 28.2865 19.7553C28.6044 18.9287 28.9377 17.6183 28.9377 15.7499C28.9377 13.5859 28.4906 12.1695 28.137 11.3857C27.9785 11.0345 28.1348 10.6213 28.486 10.4629Z"-->
            <!--                    fill="white"/>-->
            <!--              <path fill-rule="evenodd" clip-rule="evenodd"-->
            <!--                    d="M26.5321 13.2064C26.9094 13.128 27.2787 13.3704 27.357 13.7477C27.4595 14.2411 27.5423 14.9024 27.5423 15.7499C27.5423 16.7826 27.4193 17.5386 27.2879 18.0511C27.2222 18.3072 27.1547 18.5015 27.1 18.6384C27.0726 18.7068 27.0485 18.7608 27.0294 18.8008C27.0199 18.8208 27.0116 18.8373 27.0049 18.8504L26.9959 18.8675L26.9923 18.8741L26.9908 18.8769L26.9901 18.8782C26.9901 18.8782 26.9894 18.8795 26.3795 18.5406L26.9894 18.8795C26.8023 19.2163 26.3775 19.3376 26.0407 19.1505C25.7067 18.965 25.5846 18.5458 25.7649 18.2104L25.7696 18.2009C25.776 18.1875 25.7882 18.1608 25.8044 18.1202C25.8369 18.0391 25.8856 17.902 25.9363 17.7046C26.0374 17.3101 26.147 16.6708 26.147 15.7499C26.147 14.9939 26.0731 14.4278 25.9908 14.0313C25.9125 13.654 26.1548 13.2847 26.5321 13.2064Z"-->
            <!--                    fill="white"/>-->
            <!--              <path-->
            <!--                  d="M29.6635 7.87118C29.936 7.59872 29.936 7.15698 29.6635 6.88452C29.3911 6.61206 28.9493 6.61206 28.6769 6.88452L24.5381 11.0233C24.4954 10.5363 24.4396 10.1053 24.3581 9.73113C24.1983 8.99771 23.9147 8.36 23.3199 7.94199C23.1013 7.78834 22.8578 7.66444 22.6049 7.57814C21.8438 7.31841 21.0873 7.52602 20.3189 7.89929C19.5621 8.26693 18.6438 8.87239 17.4988 9.62736L17.2507 9.79098C16.834 10.0657 16.6907 10.1575 16.5424 10.2229C16.3837 10.293 16.2169 10.343 16.0459 10.3719C15.8861 10.3989 15.7159 10.4011 15.2168 10.4011L15.067 10.4011C13.935 10.4005 13.1484 10.4001 12.4492 10.7236C11.8029 11.0226 11.1808 11.6079 10.843 12.2349C10.4778 12.9127 10.435 13.6216 10.374 14.6295L10.3667 14.7509C10.3458 15.0934 10.333 15.4322 10.333 15.75C10.333 16.0677 10.3458 16.4065 10.3667 16.7491L10.374 16.8704C10.435 17.8784 10.4778 18.5872 10.843 19.2651C11.1808 19.892 11.8029 20.4774 12.4492 20.7764C13.0172 21.0392 13.6428 21.0882 14.4644 21.097L11.9327 23.6287C11.6602 23.9012 11.6602 24.3429 11.9327 24.6154C12.2052 24.8878 12.6469 24.8878 12.9194 24.6154L29.6635 7.87118Z"-->
            <!--                  fill="white"/>-->
            <!--              <path-->
            <!--                  d="M24.7516 15.7499C24.7516 15.3646 24.4393 15.0523 24.0539 15.0523C23.8729 15.0523 23.7079 15.1212 23.5839 15.2343L23.5176 15.3037L17.9376 21.1398C17.6162 21.4759 17.6907 22.0235 18.0901 22.2616C19.0565 22.8948 19.8562 23.4009 20.5381 23.7025C21.2286 24.0079 21.9147 24.1573 22.6049 23.9218C22.8578 23.8355 23.1013 23.7116 23.3199 23.5579C23.9767 23.0963 24.2547 22.367 24.4054 21.5303C24.5535 20.7077 24.6041 19.6175 24.6672 18.2594L24.6697 18.2059C24.7179 17.1688 24.7516 16.2634 24.7516 15.7499Z"-->
            <!--                  fill="white"/>-->
            <!--              <path-->
            <!--                  d="M44.2668 10.8182H45.808V17.5149C45.808 18.2275 45.6406 18.8589 45.3058 19.4091C44.9711 19.956 44.5004 20.3868 43.8939 20.7017C43.2874 21.0133 42.5764 21.169 41.7611 21.169C40.9491 21.169 40.2398 21.0133 39.6333 20.7017C39.0267 20.3868 38.5561 19.956 38.2213 19.4091C37.8866 18.8589 37.7192 18.2275 37.7192 17.5149V10.8182H39.2554V17.3906C39.2554 17.8513 39.3565 18.2607 39.5587 18.6186C39.7642 18.9766 40.0542 19.2583 40.4287 19.4638C40.8032 19.666 41.2474 19.767 41.7611 19.767C42.2781 19.767 42.7239 19.666 43.0985 19.4638C43.4763 19.2583 43.7646 18.9766 43.9635 18.6186C44.1657 18.2607 44.2668 17.8513 44.2668 17.3906V10.8182ZM49.4086 16.4659V21H47.9221V13.3636H49.349V14.6065H49.4434C49.6191 14.2022 49.8942 13.8774 50.2687 13.6321C50.6466 13.3868 51.1222 13.2642 51.6956 13.2642C52.2159 13.2642 52.6717 13.3736 53.0628 13.5923C53.4539 13.8078 53.7571 14.1293 53.9726 14.5568C54.188 14.9844 54.2957 15.513 54.2957 16.1428V21H52.8092V16.3217C52.8092 15.7682 52.665 15.3357 52.3767 15.0241C52.0883 14.7093 51.6923 14.5518 51.1885 14.5518C50.8438 14.5518 50.5372 14.6264 50.2687 14.7756C50.0036 14.9247 49.7931 15.1435 49.6373 15.4318C49.4849 15.7169 49.4086 16.0616 49.4086 16.4659ZM56.2893 21V13.3636H57.7162V14.6065H57.8106C57.9697 14.1856 58.2299 13.8575 58.5912 13.6222C58.9524 13.3835 59.385 13.2642 59.8888 13.2642C60.3992 13.2642 60.8267 13.3835 61.1714 13.6222C61.5194 13.8608 61.7763 14.1889 61.942 14.6065H62.0216C62.2039 14.1989 62.4939 13.8741 62.8916 13.6321C63.2893 13.3868 63.7633 13.2642 64.3135 13.2642C65.0062 13.2642 65.5713 13.4813 66.0088 13.9155C66.4496 14.3497 66.67 15.0043 66.67 15.8793V21H65.1835V16.0185C65.1835 15.5014 65.0426 15.1269 64.7609 14.8949C64.4792 14.6629 64.1428 14.5469 63.7517 14.5469C63.2678 14.5469 62.8916 14.696 62.6231 14.9943C62.3547 15.2893 62.2204 15.6688 62.2204 16.1328V21H60.7389V15.924C60.7389 15.5097 60.6096 15.1766 60.3511 14.9247C60.0926 14.6728 59.7562 14.5469 59.3419 14.5469C59.0602 14.5469 58.8 14.6214 58.5613 14.7706C58.326 14.9164 58.1354 15.1203 57.9896 15.3821C57.8471 15.6439 57.7758 15.9472 57.7758 16.2919V21H56.2893ZM73.4997 17.8331V13.3636H74.9912V21H73.5296V19.6776H73.45C73.2744 20.0852 72.9926 20.425 72.6048 20.6967C72.2204 20.9652 71.7414 21.0994 71.1681 21.0994C70.6775 21.0994 70.2433 20.9917 69.8655 20.7763C69.491 20.5575 69.196 20.2344 68.9806 19.8068C68.7684 19.3793 68.6624 18.8506 68.6624 18.2209V13.3636H70.1489V18.0419C70.1489 18.5623 70.2931 18.9766 70.5814 19.2848C70.8698 19.593 71.2443 19.7472 71.705 19.7472C71.9834 19.7472 72.2602 19.6776 72.5352 19.5384C72.8137 19.3991 73.044 19.1887 73.2263 18.907C73.4119 18.6252 73.503 18.2673 73.4997 17.8331ZM80.5532 13.3636V14.5568H76.382V13.3636H80.5532ZM77.5006 11.5341H78.9871V18.7578C78.9871 19.0462 79.0302 19.2633 79.1164 19.4091C79.2026 19.5516 79.3136 19.6494 79.4495 19.7024C79.5887 19.7521 79.7395 19.777 79.9019 19.777C80.0212 19.777 80.1256 19.7687 80.2151 19.7521C80.3046 19.7356 80.3742 19.7223 80.4239 19.7124L80.6924 20.9403C80.6062 20.9735 80.4836 21.0066 80.3245 21.0398C80.1654 21.0762 79.9665 21.0961 79.7279 21.0994C79.3368 21.1061 78.9722 21.0365 78.6341 20.8906C78.2961 20.7448 78.0226 20.5194 77.8138 20.2145C77.605 19.9096 77.5006 19.5268 77.5006 19.0661V11.5341ZM85.4067 21.1541C84.6543 21.1541 84.0064 20.9934 83.4628 20.6719C82.9226 20.3471 82.5049 19.8913 82.21 19.3047C81.9183 18.7147 81.7725 18.0237 81.7725 17.2315C81.7725 16.4493 81.9183 15.7599 82.21 15.1634C82.5049 14.5668 82.9159 14.1011 83.4429 13.7663C83.9732 13.4316 84.593 13.2642 85.3023 13.2642C85.7332 13.2642 86.1508 13.3355 86.5551 13.478C86.9595 13.6205 87.3224 13.8442 87.6439 14.1491C87.9654 14.4541 88.219 14.8501 88.4046 15.3374C88.5902 15.8213 88.683 16.4096 88.683 17.1023V17.6293H82.6127V16.5156H87.2263C87.2263 16.1245 87.1468 15.7782 86.9877 15.4766C86.8286 15.1716 86.6048 14.9313 86.3165 14.7557C86.0315 14.58 85.6967 14.4922 85.3122 14.4922C84.8946 14.4922 84.53 14.5949 84.2185 14.8004C83.9102 15.0026 83.6716 15.2678 83.5026 15.5959C83.3369 15.9207 83.254 16.2737 83.254 16.6548V17.5249C83.254 18.0353 83.3435 18.4695 83.5225 18.8274C83.7048 19.1854 83.9583 19.4588 84.2831 19.6477C84.6079 19.8333 84.9874 19.9261 85.4216 19.9261C85.7033 19.9261 85.9602 19.8864 86.1922 19.8068C86.4242 19.724 86.6247 19.6013 86.7938 19.4389C86.9628 19.2765 87.0921 19.076 87.1816 18.8374L88.5885 19.0909C88.4758 19.5052 88.2736 19.8681 87.982 20.1797C87.6936 20.4879 87.3307 20.7282 86.8932 20.9006C86.459 21.0696 85.9635 21.1541 85.4067 21.1541Z"-->
            <!--                  fill="white"/>-->
            <!--            </svg>-->
          </div>
          <div v-if="voicePlay" @click="noPlay" style="cursor:pointer; position: absolute;top:76%;left:5%;z-index: 999">
            <img :src="Unmute" alt="Unmute">
            <!--            <svg width="79" height="32" viewBox="0 0 79 32" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--              <rect width="79" height="32" rx="16" fill="white" fill-opacity="0.1"/>-->
            <!--              <path-->
            <!--                  d="M10.003 15.7155C10.0403 13.8733 10.059 12.9522 10.6709 12.1636C10.7826 12.0197 10.9465 11.8487 11.0839 11.7327C11.8364 11.0974 12.8299 11.0974 14.8171 11.0974C15.527 11.0974 15.882 11.0974 16.2204 11.0045C16.2907 10.9852 16.3602 10.963 16.4289 10.9378C16.7594 10.8167 17.0557 10.6084 17.6485 10.1916C19.9872 8.54738 21.1565 7.72527 22.138 8.08241C22.3261 8.15088 22.5083 8.24972 22.671 8.37162C23.5194 9.00744 23.5839 10.4868 23.7128 13.4454C23.7606 14.5409 23.7931 15.4785 23.7931 16C23.7931 16.5215 23.7606 17.4591 23.7128 18.5546C23.5839 21.5132 23.5194 22.9926 22.671 23.6284C22.5083 23.7503 22.3261 23.8491 22.138 23.9176C21.1565 24.2747 19.9872 23.4526 17.6485 21.8084C17.0557 21.3916 16.7594 21.1833 16.4289 21.0622C16.3602 21.037 16.2907 21.0148 16.2204 20.9955C15.882 20.9026 15.527 20.9026 14.8171 20.9026C12.8299 20.9026 11.8364 20.9026 11.0839 20.2673C10.9465 20.1513 10.7826 19.9803 10.6709 19.8364C10.059 19.0478 10.0403 18.1267 10.003 16.2845C10.001 16.1878 10 16.0928 10 16C10 15.9072 10.001 15.8122 10.003 15.7155Z"-->
            <!--                  fill="white"/>-->
            <!--              <path fill-rule="evenodd" clip-rule="evenodd"-->
            <!--                    d="M27.4895 9.55219C27.7821 9.29218 28.217 9.33434 28.4608 9.64635L27.931 10.1171C28.4608 9.64635 28.4606 9.64602 28.4608 9.64635L28.4619 9.6477L28.4631 9.64921L28.4658 9.65275L28.4727 9.66184C28.4779 9.6688 28.4844 9.67756 28.4921 9.68814C28.5075 9.70929 28.5275 9.73772 28.5515 9.77358C28.5995 9.84529 28.6635 9.94667 28.7379 10.0789C28.8868 10.3435 29.077 10.7309 29.2644 11.2504C29.6397 12.2911 30 13.8514 30 16.0002C30 18.1491 29.6397 19.7094 29.2644 20.7501C29.077 21.2695 28.8868 21.657 28.7379 21.9216C28.6635 22.0538 28.5995 22.1552 28.5515 22.2269C28.5275 22.2627 28.5075 22.2912 28.4921 22.3123C28.4844 22.3229 28.4779 22.3317 28.4727 22.3386L28.4658 22.3477L28.4631 22.3513L28.4619 22.3528C28.4616 22.3531 28.4608 22.3541 27.931 21.8833L28.4608 22.3541C28.217 22.6661 27.7821 22.7083 27.4895 22.4483C27.1983 22.1895 27.1578 21.729 27.3977 21.417C27.3983 21.4163 27.3994 21.4148 27.4009 21.4127C27.4058 21.406 27.4154 21.3925 27.4291 21.372C27.4565 21.3311 27.5003 21.2625 27.5552 21.1649C27.6649 20.9698 27.8195 20.6587 27.977 20.2221C28.2913 19.3508 28.6207 17.9695 28.6207 16.0002C28.6207 14.0309 28.2913 12.6497 27.977 11.7784C27.8195 11.3418 27.6649 11.0307 27.5552 10.8356C27.5003 10.738 27.4565 10.6693 27.4291 10.6284C27.4154 10.608 27.4058 10.5945 27.4009 10.5878C27.3994 10.5856 27.3983 10.5842 27.3977 10.5834C27.3977 10.5834 27.3977 10.5834 27.3977 10.5834"-->
            <!--                    fill="white"/>-->
            <!--              <path fill-rule="evenodd" clip-rule="evenodd"-->
            <!--                    d="M25.7571 12.416C26.0901 12.2187 26.51 12.3466 26.6949 12.7017L26.0921 13.0588C26.6949 12.7017 26.6948 12.7013 26.6949 12.7017L26.6956 12.7029L26.6963 12.7043L26.6978 12.7073L26.7014 12.7143L26.7102 12.7323C26.7169 12.7461 26.7251 12.7635 26.7345 12.7846C26.7533 12.8268 26.7772 12.8836 26.8042 12.9557C26.8584 13.1 26.9251 13.3049 26.99 13.5748C27.1199 14.115 27.2415 14.9119 27.2415 16.0003C27.2415 17.0888 27.1199 17.8857 26.99 18.4259C26.9251 18.6958 26.8584 18.9007 26.8042 19.045C26.7772 19.1171 26.7533 19.1739 26.7345 19.2161C26.7251 19.2372 26.7169 19.2546 26.7102 19.2684L26.7014 19.2864L26.6978 19.2934L26.6963 19.2964L26.6956 19.2978C26.6954 19.2981 26.6949 19.299 26.0921 18.9419L26.6949 19.299C26.51 19.6541 26.0901 19.782 25.7571 19.5847C25.427 19.3892 25.3063 18.9474 25.4846 18.5938L25.4892 18.5838C25.4955 18.5697 25.5075 18.5415 25.5236 18.4987C25.5557 18.4132 25.6039 18.2688 25.6539 18.0606C25.7539 17.6448 25.8622 16.9709 25.8622 16.0003C25.8622 15.0298 25.7539 14.3559 25.6539 13.9401C25.6039 13.7319 25.5557 13.5875 25.5236 13.502C25.5075 13.4592 25.4955 13.431 25.4892 13.4169L25.4846 13.4069C25.3063 13.0533 25.427 12.6115 25.7571 12.416Z"-->
            <!--                    fill="white"/>-->
            <!--              <path-->
            <!--                  d="M37.8842 10.8182H39.7486L42.9901 18.733H43.1094L46.3509 10.8182H48.2152V21H46.7536V13.6321H46.6591L43.6562 20.9851H42.4432L39.4403 13.6271H39.3459V21H37.8842V10.8182ZM55.1667 17.8331V13.3636H56.6582V21H55.1966V19.6776H55.117C54.9413 20.0852 54.6596 20.425 54.2718 20.6967C53.8874 20.9652 53.4084 21.0994 52.835 21.0994C52.3445 21.0994 51.9103 20.9917 51.5325 20.7763C51.158 20.5575 50.863 20.2344 50.6475 19.8068C50.4354 19.3793 50.3294 18.8506 50.3294 18.2209V13.3636H51.8159V18.0419C51.8159 18.5623 51.96 18.9766 52.2484 19.2848C52.5368 19.593 52.9113 19.7472 53.372 19.7472C53.6504 19.7472 53.9271 19.6776 54.2022 19.5384C54.4806 19.3991 54.711 19.1887 54.8933 18.907C55.0789 18.6252 55.17 18.2673 55.1667 17.8331ZM62.2202 13.3636V14.5568H58.049V13.3636H62.2202ZM59.1676 11.5341H60.6541V18.7578C60.6541 19.0462 60.6972 19.2633 60.7834 19.4091C60.8696 19.5516 60.9806 19.6494 61.1165 19.7024C61.2557 19.7521 61.4065 19.777 61.5689 19.777C61.6882 19.777 61.7926 19.7687 61.8821 19.7521C61.9716 19.7356 62.0412 19.7223 62.0909 19.7124L62.3594 20.9403C62.2732 20.9735 62.1506 21.0066 61.9915 21.0398C61.8324 21.0762 61.6335 21.0961 61.3949 21.0994C61.0038 21.1061 60.6392 21.0365 60.3011 20.8906C59.9631 20.7448 59.6896 20.5194 59.4808 20.2145C59.272 19.9096 59.1676 19.5268 59.1676 19.0661V11.5341ZM67.0737 21.1541C66.3213 21.1541 65.6734 20.9934 65.1298 20.6719C64.5895 20.3471 64.1719 19.8913 63.877 19.3047C63.5853 18.7147 63.4395 18.0237 63.4395 17.2315C63.4395 16.4493 63.5853 15.7599 63.877 15.1634C64.1719 14.5668 64.5829 14.1011 65.1099 13.7663C65.6402 13.4316 66.26 13.2642 66.9693 13.2642C67.4002 13.2642 67.8178 13.3355 68.2221 13.478C68.6265 13.6205 68.9894 13.8442 69.3109 14.1491C69.6324 14.4541 69.8859 14.8501 70.0716 15.3374C70.2572 15.8213 70.35 16.4096 70.35 17.1023V17.6293H64.2797V16.5156H68.8933C68.8933 16.1245 68.8137 15.7782 68.6547 15.4766C68.4956 15.1716 68.2718 14.9313 67.9835 14.7557C67.6984 14.58 67.3637 14.4922 66.9792 14.4922C66.5616 14.4922 66.197 14.5949 65.8855 14.8004C65.5772 15.0026 65.3386 15.2678 65.1696 15.5959C65.0038 15.9207 64.921 16.2737 64.921 16.6548V17.5249C64.921 18.0353 65.0105 18.4695 65.1895 18.8274C65.3717 19.1854 65.6253 19.4588 65.9501 19.6477C66.2749 19.8333 66.6544 19.9261 67.0886 19.9261C67.3703 19.9261 67.6272 19.8864 67.8592 19.8068C68.0912 19.724 68.2917 19.6013 68.4608 19.4389C68.6298 19.2765 68.7591 19.076 68.8485 18.8374L70.2555 19.0909C70.1428 19.5052 69.9406 19.8681 69.649 20.1797C69.3606 20.4879 68.9977 20.7282 68.5602 20.9006C68.126 21.0696 67.6305 21.1541 67.0737 21.1541Z"-->
            <!--                  fill="white"/>-->
            <!--            </svg>-->
          </div>
          <div
            style="border-top:2px solid #050505;width: 926px; height: 110px;margin-right: 70px; padding-top: 30px; padding-bottom: 8px; padding-left: 290px; padding-right: 8px; background: white; justify-content: flex-end; align-items: center; display: inline-flex">
            <div
              style="justify-content: flex-start; align-items: flex-start;  display: inline-flex;margin-right: 8px;margin-left: 8px">
              <div style="justify-content: flex-start; align-items: flex-start; gap: 4px; display: flex">
                <div @click="sendGift(slide.goodsDto)" @mouseover="activeGift(idx)" @mouseleave="currentItem = null"
                  v-for="(slide, idx) in giftInfo1"
                  style="cursor: pointer; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                  <div
                    style="width: 70px;height: 62px; background: #FAFAFA; border-radius: 6px;gap: 4px;align-items: center; display: flex;flex-direction: column;">
                    <div
                      style="width: 40px; height: 40px; justify-content: center; align-items: center; display: inline-flex">
                      <img style="width: 40px; height: 40px" :src="slide.goodsDto.url" />
                    </div>
                    <div
                      style="text-align: center; color: #71717A; font-size: 12px; font-family: Figtree; font-weight: 400; word-wrap: break-word">
                      {{ slide.goodsDto.title }}
                    </div>
                  </div>
                  <div :class="{ 'active': currentItem === idx, 'no_active': currentItem != idx }"
                    style="align-self: stretch; padding-top: 4px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px; padding-bottom: 4px; background: #F43F5E; justify-content: center; align-items: center; gap: 8px; ">
                    <svg width="70" height="22" viewBox="0 0 70 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="70" height="22" fill="#F43F5E" />
                      <path
                        d="M24.9205 15.144C24.4965 15.144 24.1165 15.08 23.7805 14.952C23.4525 14.824 23.1725 14.652 22.9405 14.436C22.7165 14.22 22.5485 13.976 22.4365 13.704L23.4205 13.272C23.5485 13.52 23.7405 13.724 23.9965 13.884C24.2525 14.036 24.5365 14.112 24.8485 14.112C25.1925 14.112 25.4765 14.052 25.7005 13.932C25.9245 13.804 26.0365 13.624 26.0365 13.392C26.0365 13.168 25.9525 12.992 25.7845 12.864C25.6165 12.736 25.3725 12.632 25.0525 12.552L24.4885 12.408C23.9285 12.256 23.4925 12.028 23.1805 11.724C22.8685 11.42 22.7125 11.076 22.7125 10.692C22.7125 10.108 22.9005 9.656 23.2765 9.336C23.6605 9.016 24.2205 8.856 24.9565 8.856C25.3165 8.856 25.6445 8.908 25.9405 9.012C26.2445 9.116 26.5005 9.264 26.7085 9.456C26.9245 9.648 27.0765 9.876 27.1645 10.14L26.2045 10.572C26.1085 10.332 25.9445 10.156 25.7125 10.044C25.4805 9.932 25.2085 9.876 24.8965 9.876C24.5765 9.876 24.3245 9.944 24.1405 10.08C23.9565 10.216 23.8645 10.408 23.8645 10.656C23.8645 10.792 23.9405 10.924 24.0925 11.052C24.2525 11.172 24.4845 11.272 24.7885 11.352L25.4365 11.508C25.8285 11.604 26.1525 11.752 26.4085 11.952C26.6645 12.144 26.8565 12.364 26.9845 12.612C27.1125 12.852 27.1765 13.104 27.1765 13.368C27.1765 13.728 27.0765 14.044 26.8765 14.316C26.6845 14.58 26.4165 14.784 26.0725 14.928C25.7365 15.072 25.3525 15.144 24.9205 15.144ZM31.0623 15.144C30.4783 15.144 29.9623 15.012 29.5143 14.748C29.0663 14.476 28.7143 14.104 28.4583 13.632C28.2023 13.16 28.0743 12.616 28.0743 12C28.0743 11.384 28.2023 10.84 28.4583 10.368C28.7143 9.896 29.0663 9.528 29.5143 9.264C29.9703 8.992 30.4903 8.856 31.0743 8.856C31.6183 8.856 32.0983 8.996 32.5143 9.276C32.9383 9.548 33.2663 9.94 33.4983 10.452C33.7383 10.956 33.8583 11.552 33.8583 12.24H32.7183C32.7183 11.728 32.6543 11.296 32.5263 10.944C32.3983 10.592 32.2063 10.328 31.9503 10.152C31.7023 9.968 31.3983 9.876 31.0383 9.876C30.6783 9.876 30.3623 9.964 30.0903 10.14C29.8263 10.308 29.6183 10.552 29.4663 10.872C29.3223 11.184 29.2503 11.568 29.2503 12.024C29.2503 12.448 29.3343 12.816 29.5023 13.128C29.6703 13.432 29.8943 13.672 30.1743 13.848C30.4623 14.016 30.7863 14.1 31.1463 14.1C31.5383 14.1 31.8623 14.008 32.1183 13.824C32.3823 13.64 32.5903 13.404 32.7423 13.116L33.7623 13.584C33.5943 13.896 33.3823 14.172 33.1263 14.412C32.8783 14.644 32.5783 14.824 32.2263 14.952C31.8823 15.08 31.4943 15.144 31.0623 15.144ZM28.8183 12.24L28.8303 11.304H33.2223V12.24H28.8183ZM35.0303 15V9H36.0983L36.1703 10.104V15H35.0303ZM39.1823 15V11.928L40.3223 11.568V15H39.1823ZM39.1823 11.928C39.1823 11.384 39.1183 10.972 38.9903 10.692C38.8703 10.404 38.6983 10.204 38.4743 10.092C38.2583 9.98 38.0063 9.92 37.7183 9.912C37.2303 9.912 36.8503 10.084 36.5783 10.428C36.3063 10.772 36.1703 11.256 36.1703 11.88H35.6783C35.6783 11.248 35.7703 10.708 35.9543 10.26C36.1383 9.804 36.4023 9.456 36.7463 9.216C37.0983 8.976 37.5183 8.856 38.0063 8.856C38.7263 8.856 39.2903 9.08 39.6983 9.528C40.1143 9.968 40.3223 10.648 40.3223 11.568L39.1823 11.928ZM46.1488 15L46.1008 13.884V6.6H47.2288V15H46.1488ZM44.1328 15.144C43.5888 15.144 43.1128 15.012 42.7048 14.748C42.3048 14.484 41.9888 14.116 41.7568 13.644C41.5328 13.172 41.4208 12.624 41.4208 12C41.4208 11.368 41.5328 10.82 41.7568 10.356C41.9888 9.884 42.3048 9.516 42.7048 9.252C43.1128 8.988 43.5888 8.856 44.1328 8.856C44.6368 8.856 45.0728 8.988 45.4408 9.252C45.8168 9.516 46.1048 9.884 46.3048 10.356C46.5048 10.82 46.6048 11.368 46.6048 12C46.6048 12.624 46.5048 13.172 46.3048 13.644C46.1048 14.116 45.8168 14.484 45.4408 14.748C45.0728 15.012 44.6368 15.144 44.1328 15.144ZM44.3968 14.112C44.7328 14.112 45.0288 14.024 45.2848 13.848C45.5408 13.664 45.7408 13.416 45.8848 13.104C46.0288 12.784 46.1008 12.416 46.1008 12C46.1008 11.584 46.0288 11.22 45.8848 10.908C45.7408 10.588 45.5408 10.34 45.2848 10.164C45.0288 9.98 44.7288 9.888 44.3848 9.888C44.0328 9.888 43.7208 9.98 43.4488 10.164C43.1768 10.34 42.9648 10.588 42.8128 10.908C42.6608 11.22 42.5848 11.584 42.5848 12C42.5848 12.416 42.6608 12.784 42.8128 13.104C42.9728 13.416 43.1888 13.664 43.4608 13.848C43.7328 14.024 44.0448 14.112 44.3968 14.112Z"
                        fill="white" />
                    </svg>
                  </div>
                  <div v-if="currentItem != idx"
                    style="align-self: stretch; padding-top: 4px; padding-bottom: 4px;  justify-content: center; align-items: center; gap: 8px; ">
                    &nbsp;
                  </div>
                </div>

                <div
                  style="width: 70px;height: 62px; padding-left: 2px; padding-right: 2px;   background: #FAFAFA;  flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                  <ClientOnly>
                    <el-popover placement="bottom-end" title="" v-if="giftInfo" :width="475" :effect="dark"
                      :show-arrow="false" trigger="click" :persistent=true :teleported=true offset="30"
                      :popper-style="popperStyle"
                      style="border-radius: 4px;border: 2px solid #000;background: #FFF;box-shadow: 0px 4px 0px 0px #000;">
                      <p>
                      <div
                        style="color: #050505; font-size: 18px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word">
                        Gift
                      </div>
                      </p>
                      <el-carousel height="auto" :autoplay="autoplay">
                        <el-carousel-item v-for="(slide, idx) in giftInfo" style="height: 250px;margin-left: 30px;">
                          <div style="overflow: hidden;align-items: center;justify-content: center;">
                            <span v-for="(slide1, idx1) in slide" @click="activeGift1(idx1, slide1.goodsDto)"
                              style="cursor: pointer; width: 81px; margin: 10px; height: 96px; float: left; ">
                              <div :class="{ 'active1': currentItem1 === idx1, 'no_active1': currentItem1 != idx1 }"
                                style="display: flex;flex-direction: column;align-items: center;">
                                <img style="width: 60px; height: 60px; " :src="slide1.goodsDto.url" />
                                <p
                                  style="width: 81px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; color: var(--color-text-icon-color-1, #09090B);text-align: center;/* text-xs/semibold */font-family: var(--font, Archivo);font-size: 12px;font-style: normal;font-weight: 600;line-height: 16px; /* 133.333% */">
                                  {{
                                    slide1.goodsDto.title
                                  }}</p>
                                <p style="display: flex;align-items: center;">
                                  <span>
                                    <img style="width: 9px; height: 9px;" :src="icon7" />
                                  </span>
                                  <span
                                    style="color: var(--color-text-icon-color-1, #09090B);/* text-xs/font-thin */font-family: var(--font, Archivo);font-size: 12px;font-style: normal;font-weight: 400;line-height: 16px; /* 133.333% */">{{
                                      slide1.goodsDto.price
                                    }}</span>
                                </p>
                              </div>
                            </span>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                      <div
                        style="width: 100%; height: 100%; padding: 12px; justify-content: space-between; align-items: center; display: inline-flex">
                        <div
                          style="padding-top: 7px; padding-bottom: 7px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                          <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                              <div style="width: 16px; height: 16px; position: relative">
                                <img style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"
                                  :src="icon7" />
                              </div>
                              <div
                                style="color: var(--color-text-icon-color-1, #09090B);font-family: Mulish;font-size: 14px;font-style: normal;font-weight: 600;line-height: normal;">
                                {{ gold }}
                              </div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; display: flex">
                              <nuxt-link to="/recharge.html">
                                <div
                                  style="color: #F59E0B; font-size: 14px; font-family: Mulish; font-weight: 600; word-wrap: break-word">
                                  Recharge
                                </div>
                              </nuxt-link>
                              <div style="width: 16px; height: 16px; position: relative;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.33366 13.3335L10.667 8.00016L5.33366 2.66683" stroke="#F59E0B"
                                    stroke-width="1.33333" stroke-linecap="square" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div @click="sendGift(currentItem1Info)">
                            <svg width="65" height="32" viewBox="0 0 65 32" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <rect width="65" height="32" rx="16" fill="#F43F5E" />
                              <path
                                d="M19.354 21.168C18.8593 21.168 18.3973 21.1073 17.968 20.986C17.5387 20.8647 17.156 20.6967 16.82 20.482C16.484 20.258 16.204 20.0107 15.98 19.74C15.7653 19.4693 15.6253 19.1847 15.56 18.886L17.436 18.326C17.5573 18.6433 17.772 18.9187 18.08 19.152C18.388 19.376 18.7753 19.4927 19.242 19.502C19.7367 19.5113 20.138 19.404 20.446 19.18C20.7633 18.956 20.922 18.6667 20.922 18.312C20.922 18.004 20.796 17.7473 20.544 17.542C20.3013 17.3273 19.9653 17.164 19.536 17.052L18.262 16.716C17.786 16.5947 17.366 16.4127 17.002 16.17C16.638 15.918 16.3533 15.61 16.148 15.246C15.9427 14.882 15.84 14.4573 15.84 13.972C15.84 13.048 16.1433 12.3293 16.75 11.816C17.366 11.2933 18.234 11.032 19.354 11.032C19.9793 11.032 20.5253 11.1253 20.992 11.312C21.468 11.4893 21.8647 11.746 22.182 12.082C22.4993 12.418 22.742 12.8147 22.91 13.272L21.048 13.846C20.936 13.5287 20.7307 13.258 20.432 13.034C20.1333 12.81 19.7553 12.698 19.298 12.698C18.8313 12.698 18.4627 12.8053 18.192 13.02C17.9307 13.2347 17.8 13.538 17.8 13.93C17.8 14.238 17.9027 14.4807 18.108 14.658C18.3227 14.8353 18.612 14.9707 18.976 15.064L20.264 15.386C21.104 15.5913 21.7573 15.96 22.224 16.492C22.6907 17.024 22.924 17.6167 22.924 18.27C22.924 18.8487 22.784 19.3573 22.504 19.796C22.224 20.2253 21.818 20.5613 21.286 20.804C20.754 21.0467 20.11 21.168 19.354 21.168ZM27.5779 21.168C26.8872 21.168 26.2759 21.014 25.7439 20.706C25.2119 20.3887 24.7919 19.9547 24.4839 19.404C24.1852 18.8533 24.0359 18.2187 24.0359 17.5C24.0359 16.7813 24.1899 16.1467 24.4979 15.596C24.8152 15.0453 25.2446 14.616 25.7859 14.308C26.3366 13.9907 26.9666 13.832 27.6759 13.832C28.2826 13.832 28.8426 13.9953 29.3559 14.322C29.8786 14.6393 30.2986 15.1107 30.6159 15.736C30.9332 16.352 31.0919 17.1033 31.0919 17.99H29.2159C29.2252 17.374 29.1599 16.884 29.0199 16.52C28.8892 16.1467 28.7026 15.8807 28.4599 15.722C28.2172 15.554 27.9326 15.47 27.6059 15.47C27.2606 15.47 26.9666 15.5447 26.7239 15.694C26.4906 15.8433 26.3132 16.072 26.1919 16.38C26.0706 16.6787 26.0099 17.0707 26.0099 17.556C26.0099 17.976 26.0892 18.326 26.2479 18.606C26.4066 18.886 26.6212 19.1007 26.8919 19.25C27.1626 19.39 27.4566 19.46 27.7739 19.46C28.1379 19.46 28.4319 19.3807 28.6559 19.222C28.8892 19.0633 29.0666 18.858 29.1879 18.606L30.9239 19.278C30.7186 19.67 30.4619 20.0107 30.1539 20.3C29.8459 20.58 29.4772 20.7947 29.0479 20.944C28.6186 21.0933 28.1286 21.168 27.5779 21.168ZM25.2399 17.99L25.2539 16.548H30.1819V17.99H25.2399ZM32.2863 21V14H34.0223L34.1343 15.288V21H32.2863ZM36.9203 21V17.416L38.7683 16.996V21H36.9203ZM36.9203 17.416C36.9203 16.94 36.8643 16.5713 36.7523 16.31C36.6496 16.0487 36.5003 15.862 36.3043 15.75C36.1083 15.6287 35.8796 15.568 35.6183 15.568C35.1423 15.5587 34.7736 15.7033 34.5123 16.002C34.2603 16.3007 34.1343 16.744 34.1343 17.332H33.5183C33.5183 16.5853 33.6256 15.9553 33.8403 15.442C34.0643 14.9193 34.3723 14.5227 34.7643 14.252C35.1563 13.972 35.6183 13.832 36.1503 13.832C36.9996 13.832 37.6483 14.0933 38.0963 14.616C38.5536 15.1293 38.7776 15.9227 38.7683 16.996L36.9203 17.416ZM45.2273 21L45.1293 19.698V11.2H46.9773V21H45.2273ZM43.0293 21.168C42.3853 21.168 41.8253 21.0187 41.3493 20.72C40.8826 20.4213 40.5186 19.9967 40.2573 19.446C39.996 18.8953 39.8653 18.2467 39.8653 17.5C39.8653 16.744 39.996 16.0953 40.2573 15.554C40.5186 15.0033 40.8826 14.5787 41.3493 14.28C41.8253 13.9813 42.3853 13.832 43.0293 13.832C43.6173 13.832 44.112 13.9813 44.5133 14.28C44.924 14.5787 45.2366 15.0033 45.4513 15.554C45.666 16.0953 45.7733 16.744 45.7733 17.5C45.7733 18.2467 45.666 18.8953 45.4513 19.446C45.2366 19.9967 44.924 20.4213 44.5133 20.72C44.112 21.0187 43.6173 21.168 43.0293 21.168ZM43.5053 19.474C43.8226 19.474 44.1026 19.39 44.3453 19.222C44.5973 19.054 44.7933 18.8207 44.9333 18.522C45.0733 18.2233 45.1433 17.8827 45.1433 17.5C45.1433 17.1173 45.0733 16.7767 44.9333 16.478C44.7933 16.1793 44.5973 15.9507 44.3453 15.792C44.1026 15.624 43.818 15.54 43.4913 15.54C43.1553 15.54 42.8613 15.624 42.6093 15.792C42.3573 15.9507 42.1566 16.1793 42.0073 16.478C41.858 16.7767 41.7833 17.1173 41.7833 17.5C41.7833 17.8827 41.858 18.2233 42.0073 18.522C42.1566 18.8207 42.3573 19.054 42.6093 19.222C42.8706 19.39 43.1693 19.474 43.5053 19.474Z"
                                fill="white" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <template #reference>
                        <button>
                          <div style="width: 40px; height: 40px; position: relative">
                            <div style="width: 38px; height: 38px; left: 1px; top: 1px; position: absolute"></div>
                            <img style="width: 46.67px; height: 44px; left: -3.33px; top: -5px; position: absolute"
                              :src="icon5" />
                          </div>
                          <div style="justify-content: flex-start; align-items: center; display: inline-flex">
                            <div
                              style="text-align: center; color: #71717A; font-size: 12px; font-family: Figtree; font-weight: 400; word-wrap: break-word">
                              More
                            </div>
                            <div style="width: 14px; height: 14px; position: relative">
                              <img style="width: 14px; height: 14px;" :src="icon6">
                            </div>
                          </div>
                        </button>
                      </template>
                    </el-popover>
                  </ClientOnly>
                </div>
                <div style="top:50%;left:15%;z-index: 999;position: fixed">
                  <div class="enter-the-room" :style="{ left: -(idx * 20) + 'px' }"
                    v-for="(slide, idx) in enterRoomInfo2">
                    <div class="enter-content">
                      <div class="enter-left-content">
                        <img style="width: 33px; height: 33px; border-radius: 9999px" :src="slide.headImg" />
                        <div class="enter-text-content">
                          <div
                            style="color: #09090B; font-size: 9.89px; font-family: Figtree; font-weight: 600; word-wrap: break-word">
                            {{ slide.nickName}}
                          </div>
                          <div
                            style="color: #09090B; font-size: 13.19px; font-family: Figtree; font-weight: 700; word-wrap: break-word">
                            {{ slide.type }}
                          </div>
                        </div>
                      </div>
                      <img v-if="slide.giftImg" style="width: 39px; height: 39px; " :src="slide.giftImg" />
                      <div
                        style="color: #09090B; font-size: 18.66px; font-family: Mulish; font-style: italic; font-weight: 700; word-wrap: break-word;margin-right: 5px;">
                        ×{{ slide.num }}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <nuxt-link to="/recharge.html">
                <div
                  style="box-shadow: 0 2px 0 0; border:2px solid #050505;width: 90px; padding-left: 2px; padding-right: 2px; padding-top: 4px; padding-bottom: 4px; background: #F59E0B; border-radius: 6px; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">

                  <div
                    style="width: 40px; height: 40px; padding: 1.67px; justify-content: center; align-items: center; display: inline-flex">
                    <nuxt-link to="/recharge.html"><img style="width: 36.67px; height: 36.67px" :src="icon7" />
                    </nuxt-link>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; display: inline-flex">
                    <div
                      style="color: var(--color-text-icon-color-1, #09090B);text-align: center;font-family: Figtree;font-size: 12px;font-style: normal;font-weight: 400;line-height: normal;">
                      Recharge
                    </div>
                    <div style="width: 14px; height: 14px; position: relative">
                      <img style="width: 14px; height: 14px;" :src="icon6">
                    </div>
                  </div>

                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          style="border-radius: var(--Color-card-2, 12px);border: 2px solid #050505;box-shadow: 0px 4px 0px 0px #000;width: 330px; align-self: stretch; background: white; overflow: hidden; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
          <div
            style="align-self: stretch; padding: 12px; border-bottom: 1px #F4F4F5 solid; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
            <div style="justify-content: flex-start; align-items: center; gap: 2px; display: flex">
              <div style="width: 16px; height: 16px; position: relative; background: white">
                <img :src="icon9" style="width: 16px; height: 16px;" />
              </div>
              <div
                style="color: #09090B; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                Online User:
              </div>
              <div
                style="color: #09090B; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                {{ userTotalCount }}
              </div>
            </div>
          </div>
          <div
            style="align-self: stretch; flex: 1 1 0; padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
            <div
              style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
              <div
                style="flex: 1 1 0; color: #F59E0B; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                {{ dataInfo.announcement }}
              </div>
            </div>
            <div ref="chatMsgRef" id="chatMsg"
              style=" height: 400px;overflow-y: auto;border: 0px solid #ccc;padding: 10px;">
              <div v-for="(slide, id) in chatMsgInfo"
                style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                <div style="justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">
                  <div
                    style="color: #3B82F6; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word;word-wrap: break-word; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    {{ slide.userName }}
                  </div>
                  <div
                    style="color: #3B82F6; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                    :
                  </div>
                </div>
                <div v-if="slide.content == 'Enter the room'"
                  style="width: 224px; color: #F59E0B; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                  {{ slide.content }}
                </div>
                <div v-else
                  style="width: 224px; color: #3F3F46; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                  {{ slide.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="lg:hidden md" style="height: 100%">
      <div :style="{ backgroundImage: 'url(' + icon11 + ')' }"
        style="width:100%;height:100%;background-repeat: no-repeat;background-size: 100% 100%;background-attachment: fixed;">
        <div class="px-1" style="width: 100%; height: 100%;position:relative;z-index:99;">
          <div class="flex justify-center" style="height: 5vh;width:100%;position: relative;top:1.5vh;left:1.8vw;">
            <img style="position:absolute;left:0;top:0;width: 24px;height: 24px;" :src="MoreIconBlack"
              alt="MoreIconBlack" />
            <div class="flex justify-start">
              <img style="width: 26px; height: 26px; border-radius: 9999px" :src="Logo" alt="">
              <div style="color:#050505;font-weight: 600;">AwazMingle</div>
            </div>
          </div>
          <div
            style="padding: 1vh 1vw;border-top-left-radius: 30px; border-top-right-radius: 30px; justify-content: flex-start; align-items: center; gap: 11px; display: inline-flex">
            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: flex">
              <div
                style="justify-content: center; align-items: center; display: flex;box-shadow: 0 1.5px 0 0 #050505;border-radius: 48%;border:1px solid #000;overflow: hidden">
                <img style="width: 9vw;height: 9vw;object-fit: cover;" alt="avatarUrl" :src="dataInfo.avatarUrl" />
              </div>
              <div
                style="flex-direction: column; width:60vw;justify-content: flex-start; align-items: flex-start; display: inline-flex">
                <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                  <div
                    style="color: rgba(0, 0, 0, 0.83); font-size: 3vw; font-family: Figtree; font-weight: 600; max-width: 55%; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    {{ dataInfo.title }}
                  </div>
                  <div
                    style="padding-left: 4.26px; padding-right: 4.26px; padding-top: 1.07px; padding-bottom: 1.07px;  border-radius: 5328.82px; justify-content: flex-start; align-items: center; gap: 1.07px; display: flex">
                    <img style="width: 8vw; height:4vw;" :src="liveicon">
                  </div>
                </div>
                <div
                  style="color: rgba(0, 0, 0, 0.83); font-size: 2vw;white-space: nowrap;  font-family: Figtree; font-weight: 500; max-width: 55%; word-wrap: break-word;overflow: hidden;text-overflow: ellipsis;">
                  {{ dataInfo.announcement }}
                </div>
              </div>
              <div class="flex justify-center items-center gap-3.5">
                <div
                  style="display: flex;align-items: center;gap: var(--Spacing-2-5, 5px);border-radius: 23px;background: rgba(9, 9, 11, 0.10);padding: 0.7vh 2vw;">
                  <img style="width:3vw;height:3vw;" :src="icon2" alt="eye">
                  <div
                    style="color: var(--color-text-icon-color-2, #3F3F46);text-align: right;/* text-xs/normal */font-family: var(--font, Archivo);font-size: 12px;font-style: normal;font-weight: 400;line-height: 16px; /* 133.333% */">
                    5436
                  </div>
                </div>
                <div>
                  <a href="/index.html" >
                    <img style="width:5vw;height:5vw;" :src="back_up" alt="back_up">
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            style="padding: 1vh 2vw;color: var(--color-text-icon-color-1, #09090B);font-family: Figtree;font-size: 14px;font-style: normal;font-weight: 500;line-height: normal;">
            Online user:584
          </div>
          <div v-cloak class="chat-content">
            <div class="avatar-row">
              <div
                style="width: 100%; height: 100%; justify-content: center; align-items: flex-start; gap: 21px; display: inline-flex">
                <div v-if="userList[0]"
                  style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                  <div
                    style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                    <div
                      style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                      <img
                        style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                        :src="userList[0].avatarUrl" />
                    </div>
                    <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                      <div
                        style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                        {{ userList[0].userName }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else
                  style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                  <div
                    style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                    <div
                      style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                      <div
                        style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                        <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                          <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                            :src="voice_desk" />
                        </div>
                      </div>
                    </div>
                    <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                      <div
                        style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                        &nbsp;No.1
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="userList[1]"
                  style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                  <div
                    style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                    <div
                      style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                      <img
                        style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                        :src="userList[0].avatarUrl" />
                    </div>
                    <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                      <div
                        style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                        {{ userList[0].userName }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else
                  style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                  <div
                    style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                    <div
                      style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                      <div
                        style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                        <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                          <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                            :src="voice_desk" />
                        </div>
                      </div>
                    </div>
                    <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                      <div
                        style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                        &nbsp;No.2
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="avatar-row">
              <div v-if="userList[2]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.3
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="userList[3]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.4
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="userList[4]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.5
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="userList[5]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.6
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="avatar-row">
              <div v-if="userList[6]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.7
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="userList[7]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.8
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="userList[8]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.9
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="userList[9]"
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="overflow:hidden;width: 68px; height: 68px; position: relative;border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <img
                      style="width: 100%; height: 100%;position: absolute; background: linear-gradient(0deg, white 0%, white 100%); "
                      :src="userList[0].avatarUrl" />
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      {{ userList[0].userName }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else
                style="flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
                <div
                  style="height:11vh;flex-direction: column; justify-content: space-between; align-items: center; display: flex">
                  <div
                    style="width: 68px; height: 68px; position: relative; border-radius: 12.32px;border: 1.232px solid var(--color-text-icon-color-1, #09090B);background: #F9F4FC;box-shadow: 0px 2.464px 0px 0px #000;">
                    <div
                      style="padding: 13px; left: 9px; top: 9px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                      <div style="width: 24px; height: 24px; position: relative; opacity: 0.50">
                        <img style="width: 20px; height: 20px; left: 2px; top: 3px; position: absolute"
                          :src="voice_desk" />
                      </div>
                    </div>
                  </div>
                  <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
                    <div
                      style="text-align: center; color: #050505; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                      &nbsp;No.10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          <div id="svga" style="width: 100%;height:30%;top:50%;position: absolute"></div>-->
          <div style="top:50%;left:3%;z-index: 999;position: absolute">
            <div class="enter-the-room" :style="{ left: -(idx * 20) + 'px' }" v-for="(slide, idx) in enterRoomInfo2">
              <div class="enter-content">
                <div class="enter-left-content">
                  <img style="width: 33px; height: 33px; border-radius: 9999px" :src="slide.headImg" />
                  <div class="enter-text-content">
                    <div
                      style="color: white; font-size: 9.89px; font-family: Figtree; font-weight: 600; word-wrap: break-word">
                      {{ slide.nickName }}
                    </div>
                    <div
                      style="color: white; font-size: 13.19px; font-family: Figtree; font-weight: 700; word-wrap: break-word">
                      {{ slide.type }}
                    </div>
                  </div>
                </div>
                <img v-if="slide.giftImg" style="width: 39px; height: 39px; margin-right: 15px;" :src="slide.giftImg" />
                <div
                  style="color: #FFD41A; font-size: 18.66px; font-family: Mulish; font-style: italic; font-weight: 700; word-wrap: break-word;margin-right: 5px;">
                  ×{{ slide.num }}
                </div>
              </div>
            </div>
          </div>

          <nuxt-link to="/">
            <div
              style="left: 90%; top: 0;width: 40px;height: 40px;z-index: 999; position: absolute; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_719_12719)">
                  <path d="M6 6L18 18" stroke="white" stroke-width="1.62857" />
                  <path d="M18 6L6 18" stroke="white" stroke-width="1.62857" />
                </g>
                <defs>
                  <clipPath id="clip0_719_12719">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </nuxt-link>
          <div
            style="padding-left: 8px; padding-right: 8px; padding-top: 4px; padding-bottom: 4px; left: 75%; top: 9px; position: absolute; background: rgba(255, 255, 255, 0.10); border-radius: 23px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
            <div style="justify-content: flex-start; align-items: center; gap: 2px; display: inline-flex">
              <div style="width: 16px; height: 16px; position: relative">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.61342 8.47562C1.52262 8.33186 1.47723 8.25998 1.45182 8.14911C1.43273 8.06583 1.43273 7.9345 1.45182 7.85122C1.47723 7.74035 1.52262 7.66847 1.61341 7.52471C2.36369 6.33672 4.59693 3.3335 8.00027 3.3335C11.4036 3.3335 13.6369 6.33672 14.3871 7.52471C14.4779 7.66847 14.5233 7.74035 14.5487 7.85122C14.5678 7.9345 14.5678 8.06583 14.5487 8.14911C14.5233 8.25998 14.4779 8.33186 14.3871 8.47562C13.6369 9.6636 11.4036 12.6668 8.00027 12.6668C4.59693 12.6668 2.36369 9.6636 1.61342 8.47562Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M8.00027 10.0002C9.10484 10.0002 10.0003 9.10473 10.0003 8.00016C10.0003 6.89559 9.10484 6.00016 8.00027 6.00016C6.8957 6.00016 6.00027 6.89559 6.00027 8.00016C6.00027 9.10473 6.8957 10.0002 8.00027 10.0002Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div
                style="text-align: right; color: white; font-size: 12px; font-weight: normal; font-weight: 500; line-height: 16px; word-wrap: break-word">
                {{ userTotalCount }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-28"
          style="width: 100%; height: 100%; bottom:0%;flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
          <div style="justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
            <div
              style="width: 224px; color: #FBBF24; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
              {{ dataInfo.announcement }}
            </div>
          </div>
          <div ref="chatMsgRef" id="chatMsg1"
            style=" height: 200px;overflow-y: auto;border: 0px solid #ccc;padding: 10px;">
            <div v-for="(slide, id) in chatMsgInfo" :key="id"
              style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
              <div style="justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">
                <div
                  style="color: rgba(255, 255, 255, 0.70); font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  {{ slide.userName }}
                </div>
                <div
                  style="color: rgba(255, 255, 255, 0.70); font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                  :
                </div>
              </div>
              <div v-if="slide.content == 'Enter the room'"
                style="width: 200px; color: #F59E0B; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                {{ slide.content }}
              </div>
              <div v-else
                style="width: 200px; color: white; font-size: 14px; font-family: Figtree; font-weight: 500; word-wrap: break-word">
                {{ slide.content }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="!voicePlay" @click="play" style="cursor: pointer; position: fixed;right: 4%;top:85%;">
          <img :src="Unmute" alt="Unmute">
          <!-- <svg width="97" height="32" viewBox="0 0 97 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="97" height="32" rx="16" fill="white" fill-opacity="0.1" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M28.153 10.4624C28.5042 10.3039 28.9174 10.4602 29.0759 10.8114C29.5103 11.7743 30 13.3863 30 15.7495C30 17.7881 29.6356 19.2684 29.2558 20.2557C29.0663 20.7485 28.8738 21.1161 28.7233 21.3671C28.648 21.4926 28.5833 21.5888 28.5347 21.6568C28.5104 21.6908 28.4901 21.7178 28.4746 21.7378C28.4668 21.7479 28.4602 21.7562 28.4549 21.7628L28.448 21.7714L28.4452 21.7748L28.444 21.7762C28.444 21.7762 28.4429 21.7775 27.907 21.3308L28.4429 21.7775C28.1963 22.0735 27.7563 22.1135 27.4603 21.8668C27.1658 21.6213 27.1247 21.1845 27.3675 20.8885C27.3675 20.8885 27.3691 20.8864 27.3707 20.8843C27.3756 20.878 27.3854 20.8652 27.3992 20.8458C27.4269 20.807 27.4712 20.7418 27.5267 20.6492C27.6378 20.4642 27.7942 20.169 27.9535 19.7548C28.2714 18.9282 28.6047 17.6178 28.6047 15.7495C28.6047 13.5854 28.1576 12.169 27.804 11.3853C27.6455 11.034 27.8018 10.6209 28.153 10.4624Z"
              fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M26.1991 13.2059C26.5763 13.1276 26.9457 13.3699 27.024 13.7472C27.1265 14.2406 27.2093 14.902 27.2093 15.7495C27.2093 16.7821 27.0863 17.5381 26.9549 18.0506C26.8892 18.3067 26.8217 18.501 26.767 18.6379C26.7396 18.7063 26.7155 18.7603 26.6964 18.8003C26.6869 18.8203 26.6786 18.8368 26.6719 18.8499L26.6629 18.867L26.6593 18.8736L26.6578 18.8765L26.6571 18.8778C26.6571 18.8778 26.6564 18.879 26.0465 18.5402L26.6564 18.879C26.4693 19.2158 26.0445 19.3372 25.7077 19.15C25.3737 18.9645 25.2516 18.5454 25.4319 18.2099L25.4366 18.2004C25.443 18.187 25.4552 18.1603 25.4714 18.1197C25.5039 18.0386 25.5526 17.9015 25.6033 17.7041C25.7044 17.3096 25.814 16.6703 25.814 15.7495C25.814 14.9934 25.7401 14.4273 25.6578 14.0308C25.5795 13.6535 25.8218 13.2842 26.1991 13.2059Z"
              fill="white" />
            <path
              d="M29.3305 7.87069C29.603 7.59823 29.603 7.15649 29.3305 6.88403C29.0581 6.61157 28.6163 6.61157 28.3439 6.88403L24.2051 11.0228C24.1624 10.5358 24.1066 10.1048 24.0251 9.73064C23.8653 8.99722 23.5817 8.35951 22.9869 7.94151C22.7683 7.78785 22.5248 7.66396 22.2719 7.57765C21.5108 7.31792 20.7543 7.52553 19.9859 7.89881C19.2291 8.26644 18.3108 8.8719 17.1658 9.62687L16.9177 9.79049C16.501 10.0652 16.3577 10.157 16.2094 10.2225C16.0507 10.2925 15.8839 10.3425 15.7129 10.3714C15.5531 10.3984 15.3829 10.4006 14.8838 10.4006L14.734 10.4006C13.602 10.4 12.8154 10.3996 12.1162 10.7231C11.4699 11.0221 10.8478 11.6074 10.51 12.2344C10.1448 12.9122 10.1019 13.6211 10.041 14.629L10.0337 14.7504C10.0128 15.093 10 15.4317 10 15.7495C10 16.0672 10.0128 16.406 10.0337 16.7486L10.041 16.8699C10.1019 17.8779 10.1448 18.5868 10.51 19.2646C10.8478 19.8915 11.4699 20.4769 12.1162 20.7759C12.6842 21.0387 13.3098 21.0877 14.1314 21.0965L11.5997 23.6282C11.3272 23.9007 11.3272 24.3424 11.5997 24.6149C11.8722 24.8873 12.3139 24.8873 12.5864 24.6149L29.3305 7.87069Z"
              fill="white" />
            <path
              d="M24.4186 15.7495C24.4186 15.3641 24.1062 15.0518 23.7209 15.0518C23.5399 15.0518 23.3749 15.1207 23.2509 15.2338L23.1846 15.3032L17.6046 21.1393C17.2832 21.4754 17.3577 22.023 17.7571 22.2611C18.7235 22.8944 19.5232 23.4004 20.2051 23.702C20.8956 24.0074 21.5816 24.1568 22.2719 23.9213C22.5248 23.835 22.7683 23.7111 22.9869 23.5574C23.6437 23.0958 23.9217 22.3665 24.0724 21.5298C24.2204 20.7072 24.2711 19.617 24.3342 18.259L24.3367 18.2055C24.3849 17.1683 24.4186 16.2629 24.4186 15.7495Z"
              fill="white" />
            <path
              d="M43.9338 10.8182H45.475V17.5149C45.475 18.2275 45.3076 18.8589 44.9728 19.4091C44.6381 19.956 44.1674 20.3868 43.5609 20.7017C42.9544 21.0133 42.2434 21.169 41.4281 21.169C40.6161 21.169 39.9068 21.0133 39.3002 20.7017C38.6937 20.3868 38.2231 19.956 37.8883 19.4091C37.5536 18.8589 37.3862 18.2275 37.3862 17.5149V10.8182H38.9224V17.3906C38.9224 17.8513 39.0235 18.2607 39.2257 18.6186C39.4312 18.9766 39.7212 19.2583 40.0957 19.4638C40.4702 19.666 40.9144 19.767 41.4281 19.767C41.9451 19.767 42.3909 19.666 42.7654 19.4638C43.1433 19.2583 43.4316 18.9766 43.6305 18.6186C43.8327 18.2607 43.9338 17.8513 43.9338 17.3906V10.8182ZM49.0756 16.4659V21H47.5891V13.3636H49.016V14.6065H49.1104C49.2861 14.2022 49.5612 13.8774 49.9357 13.6321C50.3136 13.3868 50.7892 13.2642 51.3626 13.2642C51.8829 13.2642 52.3387 13.3736 52.7298 13.5923C53.1209 13.8078 53.4241 14.1293 53.6396 14.5568C53.855 14.9844 53.9627 15.513 53.9627 16.1428V21H52.4762V16.3217C52.4762 15.7682 52.332 15.3357 52.0437 15.0241C51.7553 14.7093 51.3593 14.5518 50.8555 14.5518C50.5108 14.5518 50.2042 14.6264 49.9357 14.7756C49.6706 14.9247 49.4601 15.1435 49.3043 15.4318C49.1519 15.7169 49.0756 16.0616 49.0756 16.4659ZM55.9563 21V13.3636H57.3832V14.6065H57.4776C57.6367 14.1856 57.8969 13.8575 58.2582 13.6222C58.6194 13.3835 59.052 13.2642 59.5558 13.2642C60.0662 13.2642 60.4937 13.3835 60.8384 13.6222C61.1864 13.8608 61.4433 14.1889 61.609 14.6065H61.6886C61.8709 14.1989 62.1609 13.8741 62.5586 13.6321C62.9563 13.3868 63.4303 13.2642 63.9805 13.2642C64.6732 13.2642 65.2383 13.4813 65.6758 13.9155C66.1166 14.3497 66.337 15.0043 66.337 15.8793V21H64.8505V16.0185C64.8505 15.5014 64.7096 15.1269 64.4279 14.8949C64.1462 14.6629 63.8098 14.5469 63.4187 14.5469C62.9348 14.5469 62.5586 14.696 62.2901 14.9943C62.0217 15.2893 61.8874 15.6688 61.8874 16.1328V21H60.4059V15.924C60.4059 15.5097 60.2766 15.1766 60.0181 14.9247C59.7596 14.6728 59.4232 14.5469 59.0089 14.5469C58.7272 14.5469 58.467 14.6214 58.2283 14.7706C57.993 14.9164 57.8024 15.1203 57.6566 15.3821C57.5141 15.6439 57.4428 15.9472 57.4428 16.2919V21H55.9563ZM73.1667 17.8331V13.3636H74.6582V21H73.1966V19.6776H73.117C72.9413 20.0852 72.6596 20.425 72.2718 20.6967C71.8874 20.9652 71.4084 21.0994 70.835 21.0994C70.3445 21.0994 69.9103 20.9917 69.5325 20.7763C69.158 20.5575 68.863 20.2344 68.6475 19.8068C68.4354 19.3793 68.3294 18.8506 68.3294 18.2209V13.3636H69.8159V18.0419C69.8159 18.5623 69.96 18.9766 70.2484 19.2848C70.5368 19.593 70.9113 19.7472 71.372 19.7472C71.6504 19.7472 71.9271 19.6776 72.2022 19.5384C72.4806 19.3991 72.711 19.1887 72.8933 18.907C73.0789 18.6252 73.17 18.2673 73.1667 17.8331ZM80.2202 13.3636V14.5568H76.049V13.3636H80.2202ZM77.1676 11.5341H78.6541V18.7578C78.6541 19.0462 78.6972 19.2633 78.7834 19.4091C78.8696 19.5516 78.9806 19.6494 79.1165 19.7024C79.2557 19.7521 79.4065 19.777 79.5689 19.777C79.6882 19.777 79.7926 19.7687 79.8821 19.7521C79.9716 19.7356 80.0412 19.7223 80.0909 19.7124L80.3594 20.9403C80.2732 20.9735 80.1506 21.0066 79.9915 21.0398C79.8324 21.0762 79.6335 21.0961 79.3949 21.0994C79.0038 21.1061 78.6392 21.0365 78.3011 20.8906C77.9631 20.7448 77.6896 20.5194 77.4808 20.2145C77.272 19.9096 77.1676 19.5268 77.1676 19.0661V11.5341ZM85.0737 21.1541C84.3213 21.1541 83.6734 20.9934 83.1298 20.6719C82.5895 20.3471 82.1719 19.8913 81.877 19.3047C81.5853 18.7147 81.4395 18.0237 81.4395 17.2315C81.4395 16.4493 81.5853 15.7599 81.877 15.1634C82.1719 14.5668 82.5829 14.1011 83.1099 13.7663C83.6402 13.4316 84.26 13.2642 84.9693 13.2642C85.4002 13.2642 85.8178 13.3355 86.2221 13.478C86.6265 13.6205 86.9894 13.8442 87.3109 14.1491C87.6324 14.4541 87.8859 14.8501 88.0716 15.3374C88.2572 15.8213 88.35 16.4096 88.35 17.1023V17.6293H82.2797V16.5156H86.8933C86.8933 16.1245 86.8137 15.7782 86.6547 15.4766C86.4956 15.1716 86.2718 14.9313 85.9835 14.7557C85.6984 14.58 85.3637 14.4922 84.9792 14.4922C84.5616 14.4922 84.197 14.5949 83.8855 14.8004C83.5772 15.0026 83.3386 15.2678 83.1696 15.5959C83.0038 15.9207 82.921 16.2737 82.921 16.6548V17.5249C82.921 18.0353 83.0105 18.4695 83.1895 18.8274C83.3717 19.1854 83.6253 19.4588 83.9501 19.6477C84.2749 19.8333 84.6544 19.9261 85.0886 19.9261C85.3703 19.9261 85.6272 19.8864 85.8592 19.8068C86.0912 19.724 86.2917 19.6013 86.4608 19.4389C86.6298 19.2765 86.7591 19.076 86.8485 18.8374L88.2555 19.0909C88.1428 19.5052 87.9406 19.8681 87.649 20.1797C87.3606 20.4879 86.9977 20.7282 86.5602 20.9006C86.126 21.0696 85.6305 21.1541 85.0737 21.1541Z"
              fill="white" />
          </svg> -->
        </div>
        <div v-if="voicePlay" @click="noPlay" style="cursor: pointer; position: fixed;right: 4%;top:85%;">
          <img :src="Unmute" alt="Unmute">
          <!-- <svg width="79" height="32" viewBox="0 0 79 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="79" height="32" rx="16" fill="white" fill-opacity="0.1" />
            <path
              d="M10.003 15.7155C10.0403 13.8733 10.059 12.9522 10.6709 12.1636C10.7826 12.0197 10.9465 11.8487 11.0839 11.7327C11.8364 11.0974 12.8299 11.0974 14.8171 11.0974C15.527 11.0974 15.882 11.0974 16.2204 11.0045C16.2907 10.9852 16.3602 10.963 16.4289 10.9378C16.7594 10.8167 17.0557 10.6084 17.6485 10.1916C19.9872 8.54738 21.1565 7.72527 22.138 8.08241C22.3261 8.15088 22.5083 8.24972 22.671 8.37162C23.5194 9.00744 23.5839 10.4868 23.7128 13.4454C23.7606 14.5409 23.7931 15.4785 23.7931 16C23.7931 16.5215 23.7606 17.4591 23.7128 18.5546C23.5839 21.5132 23.5194 22.9926 22.671 23.6284C22.5083 23.7503 22.3261 23.8491 22.138 23.9176C21.1565 24.2747 19.9872 23.4526 17.6485 21.8084C17.0557 21.3916 16.7594 21.1833 16.4289 21.0622C16.3602 21.037 16.2907 21.0148 16.2204 20.9955C15.882 20.9026 15.527 20.9026 14.8171 20.9026C12.8299 20.9026 11.8364 20.9026 11.0839 20.2673C10.9465 20.1513 10.7826 19.9803 10.6709 19.8364C10.059 19.0478 10.0403 18.1267 10.003 16.2845C10.001 16.1878 10 16.0928 10 16C10 15.9072 10.001 15.8122 10.003 15.7155Z"
              fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M27.4895 9.55219C27.7821 9.29218 28.217 9.33434 28.4608 9.64635L27.931 10.1171C28.4608 9.64635 28.4606 9.64602 28.4608 9.64635L28.4619 9.6477L28.4631 9.64921L28.4658 9.65275L28.4727 9.66184C28.4779 9.6688 28.4844 9.67756 28.4921 9.68814C28.5075 9.70929 28.5275 9.73772 28.5515 9.77358C28.5995 9.84529 28.6635 9.94667 28.7379 10.0789C28.8868 10.3435 29.077 10.7309 29.2644 11.2504C29.6397 12.2911 30 13.8514 30 16.0002C30 18.1491 29.6397 19.7094 29.2644 20.7501C29.077 21.2695 28.8868 21.657 28.7379 21.9216C28.6635 22.0538 28.5995 22.1552 28.5515 22.2269C28.5275 22.2627 28.5075 22.2912 28.4921 22.3123C28.4844 22.3229 28.4779 22.3317 28.4727 22.3386L28.4658 22.3477L28.4631 22.3513L28.4619 22.3528C28.4616 22.3531 28.4608 22.3541 27.931 21.8833L28.4608 22.3541C28.217 22.6661 27.7821 22.7083 27.4895 22.4483C27.1983 22.1895 27.1578 21.729 27.3977 21.417C27.3983 21.4163 27.3994 21.4148 27.4009 21.4127C27.4058 21.406 27.4154 21.3925 27.4291 21.372C27.4565 21.3311 27.5003 21.2625 27.5552 21.1649C27.6649 20.9698 27.8195 20.6587 27.977 20.2221C28.2913 19.3508 28.6207 17.9695 28.6207 16.0002C28.6207 14.0309 28.2913 12.6497 27.977 11.7784C27.8195 11.3418 27.6649 11.0307 27.5552 10.8356C27.5003 10.738 27.4565 10.6693 27.4291 10.6284C27.4154 10.608 27.4058 10.5945 27.4009 10.5878C27.3994 10.5856 27.3983 10.5842 27.3977 10.5834C27.3977 10.5834 27.3977 10.5834 27.3977 10.5834"
              fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M25.7571 12.416C26.0901 12.2187 26.51 12.3466 26.6949 12.7017L26.0921 13.0588C26.6949 12.7017 26.6948 12.7013 26.6949 12.7017L26.6956 12.7029L26.6963 12.7043L26.6978 12.7073L26.7014 12.7143L26.7102 12.7323C26.7169 12.7461 26.7251 12.7635 26.7345 12.7846C26.7533 12.8268 26.7772 12.8836 26.8042 12.9557C26.8584 13.1 26.9251 13.3049 26.99 13.5748C27.1199 14.115 27.2415 14.9119 27.2415 16.0003C27.2415 17.0888 27.1199 17.8857 26.99 18.4259C26.9251 18.6958 26.8584 18.9007 26.8042 19.045C26.7772 19.1171 26.7533 19.1739 26.7345 19.2161C26.7251 19.2372 26.7169 19.2546 26.7102 19.2684L26.7014 19.2864L26.6978 19.2934L26.6963 19.2964L26.6956 19.2978C26.6954 19.2981 26.6949 19.299 26.0921 18.9419L26.6949 19.299C26.51 19.6541 26.0901 19.782 25.7571 19.5847C25.427 19.3892 25.3063 18.9474 25.4846 18.5938L25.4892 18.5838C25.4955 18.5697 25.5075 18.5415 25.5236 18.4987C25.5557 18.4132 25.6039 18.2688 25.6539 18.0606C25.7539 17.6448 25.8622 16.9709 25.8622 16.0003C25.8622 15.0298 25.7539 14.3559 25.6539 13.9401C25.6039 13.7319 25.5557 13.5875 25.5236 13.502C25.5075 13.4592 25.4955 13.431 25.4892 13.4169L25.4846 13.4069C25.3063 13.0533 25.427 12.6115 25.7571 12.416Z"
              fill="white" />
            <path
              d="M37.8842 10.8182H39.7486L42.9901 18.733H43.1094L46.3509 10.8182H48.2152V21H46.7536V13.6321H46.6591L43.6562 20.9851H42.4432L39.4403 13.6271H39.3459V21H37.8842V10.8182ZM55.1667 17.8331V13.3636H56.6582V21H55.1966V19.6776H55.117C54.9413 20.0852 54.6596 20.425 54.2718 20.6967C53.8874 20.9652 53.4084 21.0994 52.835 21.0994C52.3445 21.0994 51.9103 20.9917 51.5325 20.7763C51.158 20.5575 50.863 20.2344 50.6475 19.8068C50.4354 19.3793 50.3294 18.8506 50.3294 18.2209V13.3636H51.8159V18.0419C51.8159 18.5623 51.96 18.9766 52.2484 19.2848C52.5368 19.593 52.9113 19.7472 53.372 19.7472C53.6504 19.7472 53.9271 19.6776 54.2022 19.5384C54.4806 19.3991 54.711 19.1887 54.8933 18.907C55.0789 18.6252 55.17 18.2673 55.1667 17.8331ZM62.2202 13.3636V14.5568H58.049V13.3636H62.2202ZM59.1676 11.5341H60.6541V18.7578C60.6541 19.0462 60.6972 19.2633 60.7834 19.4091C60.8696 19.5516 60.9806 19.6494 61.1165 19.7024C61.2557 19.7521 61.4065 19.777 61.5689 19.777C61.6882 19.777 61.7926 19.7687 61.8821 19.7521C61.9716 19.7356 62.0412 19.7223 62.0909 19.7124L62.3594 20.9403C62.2732 20.9735 62.1506 21.0066 61.9915 21.0398C61.8324 21.0762 61.6335 21.0961 61.3949 21.0994C61.0038 21.1061 60.6392 21.0365 60.3011 20.8906C59.9631 20.7448 59.6896 20.5194 59.4808 20.2145C59.272 19.9096 59.1676 19.5268 59.1676 19.0661V11.5341ZM67.0737 21.1541C66.3213 21.1541 65.6734 20.9934 65.1298 20.6719C64.5895 20.3471 64.1719 19.8913 63.877 19.3047C63.5853 18.7147 63.4395 18.0237 63.4395 17.2315C63.4395 16.4493 63.5853 15.7599 63.877 15.1634C64.1719 14.5668 64.5829 14.1011 65.1099 13.7663C65.6402 13.4316 66.26 13.2642 66.9693 13.2642C67.4002 13.2642 67.8178 13.3355 68.2221 13.478C68.6265 13.6205 68.9894 13.8442 69.3109 14.1491C69.6324 14.4541 69.8859 14.8501 70.0716 15.3374C70.2572 15.8213 70.35 16.4096 70.35 17.1023V17.6293H64.2797V16.5156H68.8933C68.8933 16.1245 68.8137 15.7782 68.6547 15.4766C68.4956 15.1716 68.2718 14.9313 67.9835 14.7557C67.6984 14.58 67.3637 14.4922 66.9792 14.4922C66.5616 14.4922 66.197 14.5949 65.8855 14.8004C65.5772 15.0026 65.3386 15.2678 65.1696 15.5959C65.0038 15.9207 64.921 16.2737 64.921 16.6548V17.5249C64.921 18.0353 65.0105 18.4695 65.1895 18.8274C65.3717 19.1854 65.6253 19.4588 65.9501 19.6477C66.2749 19.8333 66.6544 19.9261 67.0886 19.9261C67.3703 19.9261 67.6272 19.8864 67.8592 19.8068C68.0912 19.724 68.2917 19.6013 68.4608 19.4389C68.6298 19.2765 68.7591 19.076 68.8485 18.8374L70.2555 19.0909C70.1428 19.5052 69.9406 19.8681 69.649 20.1797C69.3606 20.4879 68.9977 20.7282 68.5602 20.9006C68.126 21.0696 67.6305 21.1541 67.0737 21.1541Z"
              fill="white" />
          </svg> -->
        </div>
        <div class="gift-info2">
          <div class="box" v-for="(slide, idx) in giftInfo2" @click="sendGift(slide.goodsDto)">
            <img :src="slide.goodsDto.url">
            <p>{{ slide.goodsDto.title }}</p>
          </div>
          <div @click="drawer = true" class="box">
            <img :src="icon5">
            <p>More ></p>
          </div>
          <div class="box" style="background-color: #FBEE9D;box-shadow: 0 2px 0 0;border: 1px solid #050505">
            <nuxt-link to="/recharge.html"><img :src="rechargeh5"></nuxt-link>
            <p>
              <nuxt-link to="/recharge.html">Recharge ></nuxt-link>
            </p>
          </div>
        </div>
      </div>
      <el-drawer v-model="drawer" :direction="direction" :append-to-body=true :visible="drawer" size="50%"
        title="I am the title" :with-header="false" :z-index=999
        style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem;background-color: #FFFFFF;">
        <div style="position: sticky;top:0;z-index: 999;background: #FFFFFF;width: 100%">
          <div
            style="color: #050505;padding:12px;margin-left:15px; font-size: 18px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word">
            Gift
          </div>
        </div>

        <Swiper :pagination="{
          clickable: true  // 如果需要点击小点切换到对应的滑块，可以设置 clickable: true
        }"
          :modules="[SwiperController, SwiperEffectCube, SwiperEffectFlip, SwiperGrid, SwiperNavigation, SwiperEffectCards]"
          :loop="false" :navigation="{
            nextEl: 'null',
            prevEl: 'null',
          }">
          <!-- Left arrow -->
          <SwiperSlide v-for="(slide, idx) in giftInfoH5" :key="idx" class="h-full">
            <div
              style=" overflow-y: auto;align-items: center;justify-content: center;display: grid; grid-template-columns: repeat(4, 1fr);">
              <span v-for="(slide1, idx1) in slide" @click="activeGift1(idx1, slide1.goodsDto)" :key="idx1"
                :class="{ 'active1': currentItem1 === idx1, 'no_active1': currentItem1 != idx1 }"
                style="cursor: pointer;  height: 90px; float: left; ">
                <div style="display: flex;align-items: center;flex-direction: column;">
                  <img style="width: 40px; height: 40px; " :src="slide1.goodsDto.url" />
                  <p
                    style="width: 50px; text-align: center; color: #050505;  overflow: hidden; font-size: 12px; font-family: Figtree; font-weight: 500; word-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                    {{
                      slide1.goodsDto.title
                    }}</p>
                  <p style="display: flex;align-items: center;">
                    <span>
                      <img style="width: 9px; height: 9px;" :src="icon7" />
                    </span>
                    <span style="color: #050505;font-size:10px;font-weight: 300;">{{ slide1.goodsDto.price }}</span>
                  </p>
                </div>
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          style="width: 100%;position:sticky; bottom: 0;z-index:999;background:#FFFFFF;height: 56px; justify-content: space-between; align-items: center; display: inline-flex">
          <div
            style="padding-top: 7px; margin-left: 8px;padding-bottom: 7px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
              <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                <div style="width: 16px; height: 16px; position: relative">
                  <img style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute" :src="icon7" />
                </div>
                <div
                  style="color: #050505; font-size: 14px; font-family: Mulish; font-weight: 600; word-wrap: break-word">
                  {{ gold }}
                </div>
              </div>
              <div style="justify-content: flex-start; align-items: center; display: flex">
                <nuxt-link to="/recharge.html">
                  <div
                    style="color: #F59E0B; font-size: 14px; font-family: Mulish; font-weight: 600; word-wrap: break-word">
                    Recharge
                  </div>
                </nuxt-link>
                <div style="width: 16px; height: 16px; position: relative;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.33366 13.3335L10.667 8.00016L5.33366 2.66683" stroke="#F59E0B" stroke-width="1.33333"
                      stroke-linecap="square" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div @click="sendGift(currentItem1Info)"
            style="padding: 6px 20px;margin-right: 8px;border-radius: 4px;border: 1px solid #050505;background: #DACDF4;box-shadow: 0px 2px 0px 0px #050505;">
            Send
          </div>
        </div>
        <template #reference>
          <button>
            <div style="width: 40px; height: 40px; position: relative">
              <div style="width: 38px; height: 38px; left: 1px; top: 1px; position: absolute"></div>
              <img style="width: 46.67px; height: 44px; left: -3.33px; top: -2px; position: absolute" :src="icon5" />
            </div>
            <div style="justify-content: flex-start; align-items: center; display: inline-flex">
              <div
                style="text-align: center; color: #71717A; font-size: 12px; font-family: Figtree; font-weight: 400; word-wrap: break-word">
                More
              </div>
              <div style="width: 14px; height: 14px; position: relative">
                <img style="width: 14px; height: 14px;" :src="icon6">
              </div>
            </div>
          </button>
        </template>
      </el-drawer>

    </section>
  </section>
  <ClientOnly>
    <el-dialog v-model="passwordDialog" :width="dialogWidth" destroy-on-close :close-on-press-escape="passwordClose"
      :close-on-click-modal="passwordClose" :show-close="showClose" center class="login-dialog" append-to-body>
      <div class="container">
        <div class="header">
          <!-- 头部内容 -->
        </div>
        <div class="content">
          <div class="icon"></div>
          <div class="text">
            <div class="title">Room password</div>
          </div>
        </div>
        <div class="input-container">
          <div class="input-wrapper">
            <input v-for="(digit, index) in digits" @keydown="onKeyDown(index, $event)" inputmode="numeric"
              pattern="[0-9]*" :key="index" v-model="digits[index]" @input="onDigitInput(index)" maxlength="1"
              class="digit-input" />
          </div>
        </div>
        <div @click="joinRoom" class="button" :disabled="confirmDisabled">
          <div class="button-text">Confirm</div>
        </div>
      </div>
    </el-dialog>
  </ClientOnly>
</template>
<style>
.el-carousel {
  --el-carousel-indicator-padding-horizontal: 0px;
  --el-carousel-indicator-width: 12px;
}

.el-popper {
  z-index: 2 !important;
  /* //inset: auto auto -184px 660px !important; */
  border-radius: 4px !important;
  border: 2px solid #000 !important;
  background: #FFF !important;
  box-shadow: 0px 4px 0px 0px #000 !important;
}

.el-carousel__indicator.is-active button {
  background-color: #2BC55D;
}
</style>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 32px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    .digit-input {
      flex: 0 0 calc(16.66% - 10px);
      /* 16.66% 代表平均分配宽度，减去右边距 10px */
    }
  }

  .header {
    width: 100%;
    align-self: stretch;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .content {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    display: flex;
  }

  .icon {
    width: 32px;
    height: 32px;
    position: relative;
  }

  .text {
    width: 100%;
    text-align: center;
    color: #09090B;
    font-size: 20px;
    font-weight: normal;
    font-weight: 600;
    line-height: 28px;
    word-wrap: break-word;
    margin-bottom: 20px;
  }

  .input-container {
    width: 100%;
    max-width: 444.55px;
    /* 设置一个最大宽度 */
    border-radius: 21.82px;
    justify-content: center;
    align-items: center;
    gap: 8.18px;
    display: flex;
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .input-wrapper>input:focus {
    border: 2px solid #F43F5E;
    ;
    outline: none;
    /* 移除默认的轮廓效果 */
  }

  .digit-input {
    flex: 1;
    /* 使用 flex 属性，使每个小方块平均占据可用空间 */
    width: 0;
    /* 必须设置为 0，以便 flex 属性生效 */
    margin-right: 0.16rem;
    text-align: center;
  }

  .button {
    width: 100%;
    cursor: pointer;
    padding: 15px;
    margin-top: 30px;
    background: #F43F5E;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .button-text {
    color: white;
    font-size: 16px;
    font-weight: normal;
    font-weight: 700;
    line-height: 24px;
    word-wrap: break-word;
  }
}

.active1 {
  background: rgba(194, 190, 190, 0.38);
  border-radius: 10px;
}

.no_active1 {
  background: none;
}

.section {
  section {
    &.lg {
      //background-color: #FAFAFA;
      position: relative;
      top: -210px;
      z-index: 1;

      .active {
        display: inline-flex;
      }

      .no_active {
        display: none;
      }

      .enter-the-room {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10%;
        position: relative;
        padding:5px 10px;
      }

      .enter-content {
        //width: 224.008px;
        flex-shrink: 0;
        height: 40px;
        display: flex;
        align-items: center;
        overflow: hidden;
        border-radius: 100px;
        border: 1px solid #000;
        box-shadow: 0px 2px 0px 0px #000;
        background: linear-gradient(90deg, #FBEE9D 64%, rgba(95, 56, 254, 0) 100%);
        margin-left: 20px;
      }

      .enter-left-content {
        display: flex;
        align-items: center;
        padding: 5px;

      }

      .enter-text-content {
        color: #fff;
        display: flex;
        flex-direction: column;
        min-width: 100px;
        margin-left: 10px;
      }

      .chat-content {
        margin: 0;
        padding: 0;
        width: 926px;
        height: 521px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .avatar-row {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0;
      }
    }

    &.md {
      .gift-info2 {
        display: flex;
        //justify-content: space-between;
        height: 8.5vh;
        /* 调整这个值来改变大div的高度 */
        position: fixed;
        bottom: 0%;
        left: 0;
        right: 0;
        padding: 2vw 2vw;
        // margin-top: 2%;
        // margin-left: 1%;
        // margin-right: 1%;
        border-radius: 10px 10px 0 0;
        border: 1.5px solid #050505;
        background: #FDF9FC;

        .box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          width: 17%;
          /* 调整这个值来改变小div的宽度 */
          padding: 0.2rem;
          margin: 0 2px;
          text-align: center;
          background: rgba(225, 225, 225, 0.12);
          border-radius: 4.63px;
        }


        .box p {
          overflow: hidden;
          text-align: center;
          color: #050505;
          font-size: 9.26px;
          font-family: Figtree;
          font-weight: 400;
          word-wrap: break-word;
        }

        .box img {
          object-fit: contain;
          width: 30px;
          height: 30px;
        }
      }

      .enter-the-room {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10%;
        position: relative;
      }

      .enter-content {
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 31.26px;
        overflow: hidden;
        background: linear-gradient(90deg, #FBEE9D 64%, rgba(95, 56, 254, 0) 100%);
        margin-left: 20px;
      }

      .enter-left-content {
        display: flex;
        align-items: center;
        padding: 5px;

      }

      .enter-text-content {
        color: #fff;
        display: flex;
        flex-direction: column;
        min-width: 100px;
        margin-left: 10px;
      }

      &>div {
        //position: fixed;
        //top: 0;
        //left: 0;
        overflow: hidden;
        //width: 100%;
        //height: 100%;
        //background-size: cover;
        //background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .chat-content {
          // margin: 0;
          // padding: 0;
          width: 100%;
          height: 100%;
          //display: flex;
          //flex-direction: column;
          //justify-content: center;
          //align-items: center;
          //padding-bottom: 70%;
        }

        .avatar-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2.5vh 20px;
        }
      }
    }
  }
}
</style>
