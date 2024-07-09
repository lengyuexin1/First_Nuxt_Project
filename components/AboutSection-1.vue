<script setup lang="ts">
import image1 from "@/assets/images/about_banner.jpg";
import rightJ from "@/assets/images/rightJ.png";
import people1 from "@/assets/images/people1.png";
import people2 from "@/assets/images/people2.png";
import people3 from "@/assets/images/people3.png";
import image2 from "@/assets/images/about_banner_h5.png";
import image3 from "@/assets/images/boxone_h5.png";
import image4 from "@/assets/images/boxtwo_h5.png";
import image5 from "@/assets/images/boxthree_h5.png";
import boxone from "~/assets/images/boxone.png";
import boxtwo from "~/assets/images/boxtwo.png";
import boxthree from "~/assets/images/boxthree.png";
import Email from "~/assets/images/Email.png"
import address from "~/assets/images/address.png"
import phone from "~/assets/images/phone.png"
import imgtip from "~/assets/images/imgtip.png"
import imgtip_h5 from "~/assets/images/imgtip_h5.png"
import ask from "~/assets/images/ask.png"
import askno from "~/assets/images/askno.png"
import swiperleft from "~/assets/images/swiperleft.png"
import swiperright from "~/assets/images/swiperrihgt.png"
import user from '~/assets/images/user.png'
import userEmail from '~/assets/images/userEmail.png'
import phoneNumber from '~/assets/images/phoneNumber.png'
import h5aboutleft from '~/assets/images/h5aboutleft.png'
import h5aboutright from '~/assets/images/h5aboutright.png'

import {ElMessage} from "element-plus";
import Logo from "assets/images/logotwo.png";
import Index from "~/pages/index.vue";

const QuestionsList = ref<array>([
  {
    QuestionID: 1,
    QuestionsTitle: 'How do I create an account on AwazMingle?',
    asktions: 'To create an account on AwazMingle, navigate to our homepage, clickon \'Sign Up\', fill in the required information, and follow the prompts.'
  },
  {
    QuestionID: 2,
    QuestionsTitle: 'How do l join a voice room in AwazMingle?',
    asktions: 'To join a voice room in AwazMingle, select \'Rooms\' from the menu.\n' +
        'browse the list of active rooms, and click \'Join\' on your chosen room.'
  },
  {
    QuestionID: 3,
    QuestionsTitle: 'What kind of topics are discussed in AwazMingle voice rooms?',
    asktions: 'AwazMingle voice rooms focus on a variety of entertainment topics.including music, movies, gaming, and pop culture. You can select a roomthat matches your interests.'
  },
  {
    QuestionID: 4,
    QuestionsTitle: 'How does AwazMingle ensure the quality of discussions in the voicerooms?',
    asktions: ' AwazMingle ensures quality discussions in voice rooms by enforcingcommunity guidelines, providing moderation tools, and encouragingrespectful,constructive conversation.'
  },
  // {
  //   QuestionID: 5,
  //   QuestionsTitle: 'How does AwazMingle ensure the quality of discussions in the voice rooms?',
  //   asktions: 'No answer yet'
  // },
])
const open = ref<number>(-1)
const h5_open = ref<number>(-1)
const openFunc = (index: number) => {
  if (open.value === index) {
    open.value = -1
  } else {
    open.value = index
  }
}

const h5open = (index: number) => {
  console.log(index)
  if (h5_open.value === index) {
    h5_open.value = -1
  } else {
    h5_open.value = index
  }
}

const centerDialogVisible = ref<boolean>(false)

const loginClose = ref<boolean>(true)

const usertext = ref<string>('')
const userEmailtext = ref<string>('')
const userphoneNumber = ref<string>('')
const openContactUs = () => {
  centerDialogVisible.value = !centerDialogVisible.value
}
const closeCOntact = () => {
  ElMessage.success('Submission successful')
  centerDialogVisible.value = !centerDialogVisible.value
}

</script>
<template>
  <div>
    <section class="section">
      <section class="hidden lg:flex lg">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
             style=" height: 100%;  padding-top: 30px; padding-bottom: 30px; gap: 32px;">
          <div
              style="align-self: stretch;justify-content: flex-start; align-items: flex-start; gap: 64px; display: flex">
            <!--          <img style="width: 1280px; height: 400px; position: relative" :src="image1" />-->
            <div class="boxone-left">
              <div class="Dive">Dive into lively voice chat rooms and bond with buddies!</div>
              <div
                  style="margin-top: 20px;color: #454545;font-family: Archivo;font-size: 16px;font-style: normal;font-weight: 400;line-height: 150%; /* 24px */">
                Explore captivating conversations that spark your curiosity, and broaden your
              </div>
              <div
                  style="color: #454545;font-family: Archivo;font-size: 16px;font-style: normal;font-weight: 400;line-height: 150%; /* 24px */">
                social horizon with a diverse and vibrant community!"
              </div>
              <div class="boxone-btn lg:flex">
                <span>Join the Voice Room</span>
                <img :src="rightJ" alt="">
              </div>
              <div class="peoplelist lg:flex">
                <img :src="people1" alt="">
                <img :src="people2" alt="">
                <img :src="people3" alt="">
                <span>+3K Members</span>
              </div>
            </div>
            <div class="boxone-right">
              <img :src="boxone" alt="boxone">
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg" style="margin-top: 100px;">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
             style=" height: 100%;  padding-top: 30px; padding-bottom: 30px; gap: 32px;">
          <div
              style="align-self: stretch;justify-content: space-between; align-items: center; gap: 64px; display: flex">
            <!--          <img style="width: 1280px; height: 400px; position: relative" :src="image1" />-->
            <div class="boxtwo-left">
              <img :src="boxtwo" alt="boxotwo">
            </div>
            <div class="boxtwo-right">
              <div class="tips">
                Interesting gift
              </div>
              <div class="Dive"> AwazMingle - Where Voices Connect and Gifts Flow!</div>
              <div
                  style="color: #454545;font-family: Inter;font-size: 18px;font-style: normal;font-weight: 400;line-height: 34.2px; /* 190% */letter-spacing: -0.36px;">
                Join us and immerse yourself in a symphony of conversations, friendships, and heartwarming gift
                exchanges in our interactive rooms!
              </div>
              <div class="boxtwo-btn lg:flex">
                <span>Join the Voice Room</span>
                <img :src="rightJ" alt="">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg" style="margin-top: 100px">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
             style=" height: 100%;  padding-top: 30px; padding-bottom: 30px; gap: 32px;">
          <div
              style="align-self: stretch;justify-content: flex-start; align-items: flex-start; gap: 64px; display: flex">
            <!--          <img style="width: 1280px; height: 400px; position: relative" :src="image1" />-->
            <div class="boxthree-left">
              <div class="tips">
                Interesting gift
              </div>
              <div class="Dive">The principle that leads our AwazMingle.</div>
              <div
                  style="margin-top: 20px;color: #454545;font-family: Inter;font-size: 18px;font-style: normal;font-weight: 400;line-height: 34.2px; /* 190% */letter-spacing: -0.36px;width: 615px;/* 24px */">
                AwazMingle is a quality-assured hub for voice interactions. Hosts share knowledge for a fee, while we
                maintain standards. Users fund their wallets to access these experiences, and a fraction of the service
                fee supports our operations.
              </div>
              <div class="boxthree-btn">
                <span>Pratham Kumar</span>
              </div>
            </div>
            <div class="boxthree-right" style="position:relative;">
              <img :src="boxthree" alt="boxthree">
              <img style="position:absolute;top:200px;left: -40px;" :src="imgtip" alt="imgtip">
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
             style="padding-top: 30px; padding-bottom: 30px;  height: 400px">
          <div
              style="align-self: stretch;justify-content: space-between; align-items: center; gap: 64px; display: flex">
            <div class="fucnbox">
              <div class="fucnbox-img">
                <img width="64" height="64" :src="Email" alt="">
              </div>
              <div class="functitle">Email</div>
              <div class="funcinfo" style="margin-top: 25px;">info@teller.zone</div>
            </div>
            <div class="fucnbox">
              <div class="fucnbox-img">
                <img width="64" height="64" :src="address" alt="">
              </div>
              <div class="functitle">Company address</div>
              <div class="funcinfo">H.NO-816 C/O SUBHASH KUMAR BANSAL, HARIJAN BASTI BENGALSUITING SECTOR
                31,FARIDABAD,Faridabad,Haryana,India,121003
              </div>
            </div>
            <div class="fucnbox">
              <div class="fucnbox-img">
                <img width="64" height="64" :src="phone" alt="">
              </div>
              <div class="functitle">Contact Phone</div>
              <div class="funcinfo" style="margin-top: 25px;">+91 8867952846</div>
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg" style="">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
             style="padding-top: 30px; padding-bottom: 30px; height: 840px">
          <div
              style="align-self: stretch;justify-content: flex-start; flex-direction: column; align-items: center; display: flex">
            <div class="wahttips">
              WHAT DO YOU WANT YO KNOW?
            </div>
            <div class="whattitle">
              <div>Some of the most frequently</div>
              <div>asked questions</div>
            </div>
            <div class="tab-list">
              <div v-for="(item,index) in QuestionsList" :key="item.QuestionID">
                <div class="questionsbox" :class="open === item.QuestionID?'questionsboxopen':'questionsboxclose'">
                  <div class="askbox">
                    <div class="asktitle">
                      {{ item.QuestionsTitle }}
                    </div>
                    <div class="askicon" style="cursor: pointer" @click="openFunc(item.QuestionID)">
                      <img v-if="open === item.QuestionID" :src="askno" alt="">
                      <img v-else :src="ask" alt="">
                    </div>
                  </div>
                  <div class="questioninfo">
                    {{ item.asktions }}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg" style="">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
             style="padding-top: 30px; padding-bottom: 30px; height: 546px">
          <div class="swiper-bottom"
               style="align-self: stretch;justify-content: space-between; align-items: center; display: flex">
            <img :src="swiperleft" alt="">
            <div class="swiper-centent">
              <div class="swiper-tips">Is there any other question?</div>
              <div class="swiper-title">Feel free to contact <br/> AwazMingle.</div>
              <div class="swiper-btn" @click="openContactUs">
                Contact us
              </div>
            </div>
            <img :src="swiperright" alt="">
          </div>
        </div>
      </section>
      <section class="lg:hidden md">
        <div class="pt-16">
          <img style="height: 62vw;margin:0 auto;" :src="image3" alt="image2"/>
        </div>
        <div class="py-6"
             style="color: #050505;text-align: center;font-family: Archivo;font-size: 5.5vw;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
          Dive into lively voice chat rooms and bond with buddies!
        </div>
        <div class="py-6"
             style="padding:0 3vw 0 3vw;color: #454545;text-align: center;font-family: Archivo;font-size: 3.4vw;font-style: normal;font-weight: 400;">
          Explore captivating conversations that spark your curiosity, and broaden your social horizon with a diverse
          and vibrant community!"
        </div>
        <div
            style="display:flex;justify-content:center;align-items:center;margin:3vh auto 0 auto;width:43vw;height:5vh;border-radius: 4px;border: 1px solid #050505;background: #DACDF4;box-shadow: 0px 4px 0px 0px #050505;padding: 8px 8px;gap: 2vw;">
          <span
              style="color: #050505;text-align: center;font-family: Archivo;font-size: 2.5vw;font-style: normal;font-weight: 400;line-height: 24px; /* 171.429% */">Join the Voice Room</span>
          <img :src="rightJ" alt="">
        </div>
        <div class="pt-24">
          <img style="height: 62vw;margin:0 auto;" :src="image4" alt="image4">
        </div>
        <div class="px-8 py-6"
             style="color: #050505;text-align: center;font-family: Archivo;font-size: 5.5vw;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
          AwazMingle - Where Voices Connect and Gifts Flow!
        </div>
        <div class="py-6"
             style="padding:0 3vw 0 3vw;color: #454545;text-align: center;font-family: Archivo;font-size: 3.4vw;font-style: normal;font-weight: 400;">
          Join us and immerse yourself in a symphony of conversations, friendships, and heartwarming gift exchanges in
          our interactive rooms!
        </div>
        <div
            style="display:flex;justify-content:center;align-items:center;margin:3vh auto 0 auto;width:43vw;height:5vh;border-radius: 4px;border: 1px solid #050505;background: #DACDF4;box-shadow: 0px 4px 0px 0px #050505;padding: 8px 8px;gap: 2vw;">
          <span
              style="color: #050505;text-align: center;font-family: Archivo;font-size: 2.5vw;font-style: normal;font-weight: 400;line-height: 24px; /* 171.429% */">Join the Voice Room</span>
          <img :src="rightJ" alt="">
        </div>
        <div class="pt-24" style="position:relative;">
          <img style="height: 62vw;margin:0 auto;" :src="image5" alt="image5">
          <img style="width:17vw;height:17vw;position: absolute;left:10vw;bottom: 7vw;" :src="imgtip_h5"
               alt="imgtip_h5">
        </div>
        <div class="px-8 py-6"
             style="color: #050505;text-align: center;font-family: Archivo;font-size: 5.5vw;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
          The principle that leads our AwazMingle.
        </div>
        <div class="py-4"
             style="padding:0 3vw 0 3vw;color: #454545;text-align: center;font-family: Archivo;font-size: 3.4vw;font-style: normal;font-weight: 400;">
          AwazMingle is a quality-assured hub for voice interactions. Hosts share knowledge for a fee, while we maintain
          standards. Users fund their wallets to access these experiences, and a fraction of the service fee supports
          our operations.
        </div>
        <div class="px-8 py-8"
             style="color: #050505;text-align: center;font-family: Archivo;font-size: 3.5vw;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
          Pratham Kumar
        </div>
      </section>
      <section class="lg:hidden md">
        <div class="p-4"
             style="margin:3vw auto;width:90vw;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;gap: 10px;align-self: stretch;border-radius: var(--Color-card-2, 12px);border: 1px solid #050505;background: #FFF;box-shadow: 0px 4px 0px 0px #050505;">
          <div class="flex justify-center items-center my-2">
            <img width="40" height="40" :src="Email" alt="Email">
            <span
                style="margin-left:2vw;color: #050505;text-align: left;font-family: Archivo;font-size: 3.5vw;font-style: normal;font-weight: 500;line-height: normal;">Email</span>
          </div>
          <div
              style="color: var(--Gray-500, #667085);text-align: left;font-family: Inter;font-size: 2.8vw;font-style: normal;font-weight: 400;line-height: normal;">
            info@teller.zone
          </div>
        </div>
        <div class="p-4"
             style="margin:3vw auto;width:90vw;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;gap: 10px;align-self: stretch;border-radius: var(--Color-card-2, 12px);border: 1px solid #050505;background: #FFF;box-shadow: 0px 4px 0px 0px #050505;">
          <div class="flex justify-center items-center my-2">
            <img width="40" height="40" :src="address" alt="Email">
            <span
                style="margin-left:2vw;color: #050505;text-align: left;font-family: Archivo;font-size: 3.5vw;font-style: normal;font-weight: 500;line-height: normal;">Company address</span>
          </div>
          <div
              style="color: var(--Gray-500, #667085);text-align: left;font-family: Inter;font-size: 2.8vw;font-style: normal;font-weight: 400;line-height: normal;">
            H.NO-816 C/O SUBHASH KUMAR BANSAL, HARIJAN BASTI BENGALSUITING SECTOR
            31,FARIDABAD,Faridabad,Haryana,India,121003
          </div>
        </div>
        <div class="p-4"
             style="margin:3vw auto;width:90vw;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;gap: 10px;align-self: stretch;border-radius: var(--Color-card-2, 12px);border: 1px solid #050505;background: #FFF;box-shadow: 0px 4px 0px 0px #050505;">
          <div class="flex justify-center items-center my-2">
            <img width="40" height="40" :src="phone" alt="Email">
            <span
                style="margin-left:2vw;color: #050505;text-align: left;font-family: Archivo;font-size: 3.5vw;font-style: normal;font-weight: 500;line-height: normal;">Contact Phone </span>
          </div>
          <div
              style="color: var(--Gray-500, #667085);text-align: left;font-family: Inter;font-size: 2.8vw;font-style: normal;font-weight: 400;line-height: normal;">
            +91 8867952846
          </div>
        </div>
      </section>
      <section class="lg:hidden md">
        <div
             style="color: #050505; width:342px;margin:3rem auto 2rem auto;text-align:center;font-family: Archivo;font-size: 5.5vw;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
          Some of the most frequently
          asked questions
        </div>
        <div class="p-4" v-for="(item,index) in QuestionsList" :key="item.QuestionID"
             style="margin:3vw auto;width:90vw;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;gap: 10px;align-self: stretch;border-radius: var(--Color-card-2, 12px);border: 1px solid #050505;background: #FFF;box-shadow: 0px 4px 0px 0px #050505;">
          <div class="flex justify-between items-center my-2" style="width: 79vw">
            <div
                style="width:60vw;color: #050505;text-align: left;font-family: Archivo;font-size: 3.5vw;font-style: normal;font-weight: 600;line-height: normal;">
              {{ item.QuestionsTitle + item.QuestionID}}
            </div>
            <div style="width: 5vw;height: 3.5vh;" @click="h5open(item.QuestionID)">
              <div v-if="h5_open === item.QuestionID">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                      d="M12 19.5C7.85775 19.5 4.5 16.1423 4.5 12C4.5 7.85775 7.85775 4.5 12 4.5C16.1423 4.5 19.5 7.85775 19.5 12C19.5 16.1423 16.1423 19.5 12 19.5ZM11.25 11.25H8.25V12.75H11.25H12.75H15.75V11.25H12.75H11.25Z"
                      fill="#050505"/>
                </svg>
              </div>
              <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                      d="M12 19.5C7.85775 19.5 4.5 16.1423 4.5 12C4.5 7.85775 7.85775 4.5 12 4.5C16.1423 4.5 19.5 7.85775 19.5 12C19.5 16.1423 16.1423 19.5 12 19.5ZM11.25 11.25H8.25V12.75H11.25V15.75H12.75V12.75H15.75V11.25H12.75V8.25H11.25V11.25Z"
                      fill="#050505"/>
                </svg>
              </div>
            </div>
          </div>
          <div v-show="h5_open === item.QuestionID"
               style="color: var(--Gray-500, #667085);text-align: left;font-family: Inter;font-size: 2.8vw;font-style: normal;font-weight: 400;line-height: normal;">
            {{ item.asktions }}
          </div>
        </div>
        <div class="flex justify-between align-items-center overflow-hidden"
             style="position:relative;margin:8vh auto;width: 90vw;height: 35vh;flex-shrink: 0;border-radius: var(--Radius-8, 8px);border: 1px solid #050505;background: #050505;">
          <img style="height: 47vh;position: absolute;left:0;top:0;" :src="h5aboutleft" alt="">
          <div class="flex flex-col justify-center algin-items-center" style="margin: 0 auto;">
            <div
                style="padding:0.8vw;color: #FFF;text-align: center;font-family: Inter;font-size: 2.5vw;font-style: normal;font-weight: 600;line-height: 16px; /* 160% */letter-spacing: 0.6px;text-transform: uppercase;border-radius: 44px;border: 1px solid #050505;background: #292929;">
              Is there any other question?
            </div>
            <div
                style="margin:1.3vh auto 1.6vh 0;width:50vw;color: #FFF;text-align: center;font-family: Archivo;font-size: 22px;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
              Feel free to contact AwazMingle.
            </div>
            <div
                style="width:30vw;height:6vh;margin:0 auto;text-align:center;line-height: 6vh;border-radius: .8vw;border: 1px solid #050505;background: #DACDF4;box-shadow: 0px 4px 0px 0px #050505;">
              Contact us
            </div>
          </div>
          <img style="height: 47vh;position: absolute;right:0;top:0;" :src="h5aboutright" alt="">
        </div>
      </section>
    </section>
    <el-dialog
        v-model="centerDialogVisible"
        :close-on-press-escape="loginClose"
        :close-on-click-modal="loginClose"
        width="695"
        :show-close="false"
        destroy-on-close
        center
        class="login-dialog"
        append-to-body
    >
      <div class="contact-us">
        <div class="contact-us-title">
          Contact us
        </div>
        <div class="contact-us-input input-with-select">
          <img :src="user" alt="">
          <el-input v-model="usertext" placeholder="Enter your user"></el-input>
        </div>
        <div class="contact-us-input input-with-select">
          <img :src="userEmail" alt="">
          <el-input v-model="userEmailtext" placeholder="Enter your userEmail"></el-input>
        </div>
        <div class="contact-us-input input-with-select">
          <img :src="phoneNumber" alt="">
          <el-input v-model="userphoneNumber" placeholder="Enter your phoneNumber"></el-input>
        </div>
        <div class="contact-us-textarea">
          <textarea></textarea>
        </div>
        <div class="contact-us-btn" @click="closeCOntact">
          <div>Send</div>
          <img width="15" height="15" :src="rightJ" alt="">
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.login-dialog {
  --el-dialog-padding-primary: 0px;
  --el-dialog-box-shadow: 0px;
  background: none;
}

:deep(.el-dialog__header) {
  display: none;
}

:deep(.el-input__wrapper) {
  background-color: #fff !important;
}

.input-with-select .el-input--suffix {
  height: 62px;
}

.input-with-select .el-input__suffix-inner {
  display: none;
}

.input-with-select {
  --el-border-color: none;
  --el-border-color-hover: none;
  --el-color-primary: none;
}
</style>
<style scoped lang="scss">

.contact-us {
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
  height: 595px;

  .contact-us-title {
    color: #050505;
    text-align: center;
    font-family: Archivo;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 57.6px; /* 144% */
    letter-spacing: -0.96px;
  }

  .contact-us-input {
    display: flex;
    padding: 0 10px;
    height: 44px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 11.565px;
    border: 2px solid #050505;
    background: #FFF;
    box-shadow: 0px 2px 0px 0px #050505;

    img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }


  }

  .contact-us-textarea textarea {
    width: 465px;
    min-height: 137px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 11.565px;
    border: 2px solid #050505;
    background: #FFF;
    box-shadow: 0px 2px 0px 0px #050505;
    padding: 10px;
  }

  .contact-us-btn {
    display: flex;
    width: 200px;
    padding: 13px 20px;
    justify-content: center;
    align-items: center;
    gap: 3px;
    border-radius: 4px;
    border: 1px solid #050505;
    background: #DACDF4;
    box-shadow: 0px 4px 0px 0px #050505;
    cursor: pointer;
  }

  .contact-us-btn:hover {
    background-color: #C9B2F7;
  }
}

.section {
  section {
    &.lg {
      .boxone-left {
        display: flex;
        justify-content: flex-start;
        flex-flow: column;

        .peoplelist {
          align-items: center;
          margin-top: 127px;

          span {
            margin-left: 15px;
            color: #050505;
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 34.2px; /* 190% */
            letter-spacing: -0.36px;
          }

          img {
            background-color: lightgray;
            margin-left: -10px;
            border-radius: 50px;
            border: 2px solid #FFFFFF;
          }
        }

        .boxone-btn {
          padding: 13px 20px;
          align-items: flex-start;
          gap: 3px;
          width: 245px;
          height: 50px;
          margin-top: 50px;
          border-radius: 4px;
          border: 1px solid #050505;
          background: #DACDF4;
          box-shadow: 0px 4px 0px 0px #050505;
          cursor: pointer;
        }

        .boxone-btn:hover {
          background-color: #C9B2F7;
        }

        .Dive {
          width: 640px;
          color: #050505;
          font-family: Archivo;
          font-size: 43px;
          font-style: normal;
          font-weight: 500;
          line-height: 57.6px; /* 120% */
          letter-spacing: -0.96px;
        }
      }

      .tips {
        margin-bottom: 15px;
        width: 155px;
        padding: 7px 14px;
        border-radius: 44px;
        border: 1px solid #050505;
        background: #FBEE9D;
        color: #050505;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px; /* 133.333% */
        letter-spacing: 0.6px;
        text-transform: uppercase;
      }

      .boxone-right {
        img {
          width: 480px;
          height: 450px;
          margin: -35px 20px 0 0;
        }
      }

      .boxtwo-left {
        min-width: 500px;

        img {
          width: 500px;
          height: 500px;
          flex-shrink: 0;
        }
      }

      .boxtwo-right {
        margin-left: 70px;


        .boxtwo-btn {
          padding: 13px 20px;
          align-items: flex-start;
          gap: 3px;
          width: 245px;
          height: 50px;
          margin-top: 50px;
          border-radius: 4px;
          border: 1px solid #050505;
          background: #DACDF4;
          box-shadow: 0px 4px 0px 0px #050505;
          cursor: pointer;
        }

        .boxtwo-btn:hover {
          background-color: #C9B2F7;
        }

        .Dive {
          //width: 510px;
          color: #050505;
          font-family: Archivo;
          font-size: 47px;
          font-style: normal;
          font-weight: 500;
          line-height: 57.6px; /* 120% */
          letter-spacing: -0.96px;
        }
      }

      .boxthree-left {
        .Dive {
          color: #050505;
          font-family: Archivo;
          font-size: 48px;
          font-style: normal;
          font-weight: 500;
          line-height: 57.6px; /* 120% */
          letter-spacing: -0.96px;
          align-self: stretch;
        }

        .boxthree-btn {
          margin-top: 15px;
          color: var(--color-text-icon-color-1, #09090B);
          font-family: Inter;
          font-size: 24px;
          font-style: normal;
          font-weight: 500;
          line-height: 30px; /* 125% */
        }
      }

      .fucnbox {
        width: 400px;
        height: 270px;
        padding: 0 99.364px 0 99.05px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: var(--Color-card-2, 12px);
        border: 1px solid #050505;
        background: #FFF;
        box-shadow: 0px 8px 0px 0px #050505;

        .fucnbox-img {
          margin: 25px 0 15px 0;
        }

        .functitle {
          width: 200px;
          margin: 10px 0;
          text-align: center;
          color: #050505;
          text-align: center;
          font-family: Archivo;
          font-size: 24px;
          font-style: normal;
          font-weight: 500;
          line-height: 33.6px; /* 140% */
          letter-spacing: -0.48px;
        }

        .funcinfo {
          color: var(--Gray-500, #667085);
          text-align: center;
          font-family: Inter;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px; /* 187.5% */
          img {
            position: relative;
          }
        }
      }

      .wahttips {
        display: flex;
        padding: 7px 14px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 44px;
        border: 1px solid #050505;
        background: #F6CBE4;
        margin: 0 auto;
        color: #050505;
        text-align: center;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px; /* 133.333% */
        letter-spacing: 0.6px;
        text-transform: uppercase;
      }

      .whattitle {
        margin: 30px 0;
        color: #050505;
        text-align: center;
        font-family: Archivo;
        font-size: 48px;
        font-style: normal;
        font-weight: 500;
        line-height: 57.6px; /* 120% */
        letter-spacing: -0.96px;
      }

      .tab-list {
        margin-top: 35px;

        .questionsboxopen {
          max-height: 140px;
          overflow: hidden;
          transition: max-height 0.5s;
        }

        .questionsboxclose {
          max-height: 70px;
          overflow: hidden;
          transition: max-height 0.5s;
        }

        .questionsboxopen_h5 {
          max-height: 60vh;
          overflow: hidden;
          transition: max-height 0.5s;
        }

        .questionsboxclose_h5 {
          max-height: 20vh;
          overflow: hidden;
          transition: max-height 0.5s;
        }

        .questionsbox {

          .questioninfo {
            margin: 15px auto;
            color: var(--Gray-500, #667085);
            /* text-lg/medium */
            font-family: var(--font, Archivo);
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px; /* 155.556% */
          }

          width: 850px;
          margin: 25px auto;
          padding: 18px 25px;
          border: 2px solid #050505;
          border-radius: 12px;
          background: #FFF;
          box-shadow: 0px 8px 0px 0px #050505;

          .askbox {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .asktitle {
              color: #222;
              /* text-xl/semibold */
              font-family: var(--font, Archivo);
              font-size: 20px;
              font-style: normal;
              font-weight: 600;
              line-height: 28px; /* 140% */
            }
          }
        }

        .tab-item {
          margin: 25px;
        }
      }


      .swiper-bottom {
        border-radius: var(--Color-card-2, 12px);
        border: 1px solid #050505;
        background: #050505;
        width: 1280px;
        overflow: hidden;

        .swiper-centent {
          display: flex;
          width: 600px;
          flex-direction: column;
          align-items: center;
          gap: 15.195px;

          .swiper-tips {
            display: flex;
            padding: 7px var(--Color-card-2, 12px);
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 44px;
            border: 1px solid #050505;
            background: #292929;
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 16px; /* 133.333% */
            letter-spacing: 0.6px;
            text-transform: uppercase;
          }

          .swiper-title {
            margin: 15px 0;
            display: flex;
            width: 489.532px;
            height: 115.2px;
            flex-direction: column;
            justify-content: center;
            flex-shrink: 0;
            color: #FFF;
            text-align: center;
            font-family: Archivo;
            font-size: 48px;
            font-style: normal;
            font-weight: 500;
            line-height: 57.6px; /* 120% */
            letter-spacing: -0.96px;
          }

          .swiper-btn {
            cursor: pointer;
            display: flex;
            width: 160px;
            height: 50px;
            padding: 12.5px 36.677px 13.5px 37px;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-radius: 4px;
            border: 1px solid #050505;
            background: #DACDF4;
            box-shadow: 0px 4px 0px 0px #050505;
          }

          .swiper-btn:hover {
            background-color: #C9B2F7;
          }
        }
      }

      & > div {
        background-size: 100% 100%;
        padding-top: 4vw;
        height: 14.583vw;
        width: 100vw;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
    }

    &.md {
      & > div {
        background-size: 100% 100%;
        //padding-top: 8vw;
        //height: 40.4vw;
        width: 100vw;
        //display: flex;
        //flex-flow: column;
        //justify-content: center;
        //align-items: center;
      }
    }
  }
}
</style>
