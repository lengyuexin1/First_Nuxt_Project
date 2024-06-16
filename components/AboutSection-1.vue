<script setup lang="ts">
import image1 from "@/assets/images/about_banner.jpg";
import rightJ from "@/assets/images/rightJ.png";
import people1 from "@/assets/images/people1.png";
import people2 from "@/assets/images/people2.png";
import people3 from "@/assets/images/people3.png";
import image2 from "@/assets/images/about_banner_h5.png";
import boxone from "~/assets/images/boxone.png";
import boxtwo from "~/assets/images/boxtwo.png";
import boxthree from "~/assets/images/boxthree.png";
import Email from "~/assets/images/Email.png"
import address from "~/assets/images/address.png"
import phone from "~/assets/images/phone.png"
import imgtip from "~/assets/images/imgtip.png"
import ask from "~/assets/images/ask.png"
import askno from "~/assets/images/askno.png"
import swiperleft from "~/assets/images/swiperleft.png"
import swiperright from "~/assets/images/swiperrihgt.png"
import user from '~/assets/images/user.png'
import userEmail from '~/assets/images/userEmail.png'
import phoneNumber from '~/assets/images/phoneNumber.png'

import {ElMessage} from "element-plus";
import Logo from "assets/images/logotwo.png";

const QuestionsList = ref<array>([
  {QuestionsTitle: 'How do I create an account on AwazMingle?', asktions: 'No answer yet'},
  {
    QuestionsTitle: 'How do I join a voice room in AwazMingle?',
    asktions: 'Yes, AwazMingle prioritizes your privacy and security. We safeguard and never share your personal data with unauthorized parties without your explicit consent.'
  },
  {QuestionsTitle: 'What kind of topics are discussed in AwazMingle voice rooms?', asktions: 'No answer yet'},
  {QuestionsTitle: 'Can I create my own voice room in AwazMingle?', asktions: 'No answer yet'},
  {
    QuestionsTitle: 'How does AwazMingle ensure the quality of discussions in the voice rooms?',
    asktions: 'No answer yet'
  },
])
const open = ref<Number>(0)
const openFunc = (index: number) => open.value = (index + 1)


const centerDialogVisible = ref<boolean>(false)

const loginClose = ref<boolean>(true)

const usertext = ref<string>('')
const userEmailtext = ref<string>('')
const userphoneNumber = ref<string>('')
const openContactUs = () => {
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
              <img :src="Email" alt="">
              <div class="functitle">Email</div>
              <div class="funcinfo">info@teller.zone</div>
            </div>
            <div class="fucnbox">
              <img :src="address" alt="">
              <div class="functitle" style="margin: unset;">Company address</div>
              <div class="funcinfo">H.NO-816 C/O SUBHASH KUMAR BANSAL, HARIJAN BASTI BENGALSUITING SECTOR
                31,FARIDABAD,Faridabad,Haryana,India,121003
              </div>
            </div>
            <div class="fucnbox">
              <img :src="phone" alt="">
              <div class="functitle">Contact Phone</div>
              <div class="funcinfo">+91 8867952846</div>
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
              <div v-for="(item,index) in QuestionsList" :key="index">
                <div class="questionsbox" :class="open === index+1?'questionsboxopen':'questionsboxclose'">
                  <div class="askbox">
                    <div class="asktitle">
                      {{ item.QuestionsTitle }}
                    </div>
                    <div class="askicon" style="cursor: pointer" @click="openFunc(index)">
                      <img v-if="open === index+1" :src="askno" alt="">
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
        <img style="width: 100%; height: 100%; position: relative" :src="image2"/>
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
        <div class="contact-us-btn">
          <div>Send</div>
          <img :src="rightJ" alt="">
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
        padding: 41px 99.364px 40.401px 99.05px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        display: flex;
        border-radius: var(--Color-card-2, 12px);
        border: 1px solid #050505;
        background: #FFF;
        box-shadow: 0px 8px 0px 0px #050505;

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
        padding-top: 12vw;
        height: 40.4vw;
        width: 100vw;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
