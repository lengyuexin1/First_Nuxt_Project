<script setup lang="ts">
import logo from "@/assets/images/logotwo.png";

const contact = () => {
  window.location.href = '/?type=1'
}
</script>
<template>
  <div class="footer">
    <div class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
           style="width: 100%; height: 100%; ">
        <div>
          <div class="flex items-center gap-2">
            <div>
              <img width="50" height="50" :src="logo"/>
            </div>
            <div
                style="color: #09090B; font-size: 19.57px; font-family: Figtree; font-weight: 700; line-height: 27.95px; word-wrap: break-word">
              AwazMingle
            </div>
          </div>
          <div style="margin-top: 20px;">
            <p style="color: #71717A; font-size: 14px; font-family: Ubuntu; font-weight: 500; word-wrap: break-word">
              Dive into lively voice chat rooms and bond with buddies!</p>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <div
                  style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">
                  <a href="/index.html">Voice Chat Room</a></div>
              </div>
              <div
                  style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">
                  <a href="/about.html">Contact us</a></div>
              </div>
              <div
                  style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">
                  <a href="/about.html">About Us</a></div>
              </div>
              <div
                  style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">
                  <a href="/compliance.html">Compliance</a></div>
              </div>
              <div
                  style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">
                <div
                    style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"
                    @click="contact">
                  <a href="/recharge.html">Recharge</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="line-height: 27px;text-align: right;">
          <div style="margin: -20px 0 15px 0;font-size: 20px;font-weight: 400;font-family: "><p>Get in touch</p></div>
          <div><p>VIRTUAL SILVER TECHNOLOGY PRIVATE LIMITED</p></div>
          <div><p>C-193 PH II MAYAPURI</p></div>
          <div><p>Janak Puri NEW DELHI West Delhi DL 110064 IN</p></div>
        </div>
      </div>

    </div>
    <div class="lg:flex items-center justify-center lg hidden"
         style="margin: 60px auto;text-align: center;color:#454545;font-size:16px">
      <p>©2024 ClickVoice All Rights Reserved.</p>
    </div>
    <!--    <div class="hidden lg:flex lg">-->
    <!--      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"-->
    <!--           style="width: 100%; height: 100%; position: relative; background: white">-->
    <!--        <div-->
    <!--            style=" top: 135px; position: absolute; justify-content: flex-end; align-items: flex-start; display: inline-flex">-->
    <!--          &lt;!&ndash;            <div style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">&ndash;&gt;-->
    <!--          &lt;!&ndash;              <div style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><a href="/live.html">Live</a></div>&ndash;&gt;-->
    <!--          &lt;!&ndash;            </div>&ndash;&gt;-->

    <!--          &lt;!&ndash;            Dive into lively voice chat rooms and bond with buddies!&ndash;&gt;-->
    <!--          <div-->
    <!--              style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--            <div-->
    <!--                style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">-->
    <!--              <a href="/voice.html">Voice Chat Room</a></div>-->
    <!--          </div>-->
    <!--          <div-->
    <!--              style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--            <div-->
    <!--                style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">-->
    <!--              <a href="/about.html">Contact us</a></div>-->
    <!--          </div>-->
    <!--          <div-->
    <!--              style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--            <div-->
    <!--                style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">-->
    <!--              <a href="/about.html">About Us</a></div>-->
    <!--          </div>-->
    <!--          <div-->
    <!--              style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--            <div-->
    <!--                style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">-->
    <!--              <a href="/compliance.html">Compliance</a></div>-->
    <!--          </div>-->
    <!--          <div-->
    <!--              style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--            <div-->
    <!--                style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"-->
    <!--                @click="contact">-->
    <!--              <button>Recharge</button>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div>-->

    <!--        </div>-->
    <!--        <div class="container" style="margin-top: 180px;">-->
    <!--          <div class="left">-->
    <!--            <p style="color: #71717A; font-size: 14px; font-family: Ubuntu; font-weight: 500; word-wrap: break-word">©-->
    <!--              2023 ClickVoice All Rights Reserved.</p>-->
    <!--          </div>-->
    <!--          <div class="right"-->
    <!--               style="color: #3F3F46; font-size: 14px; font-family: Ubuntu; font-weight: 400; word-wrap: break-word">-->
    <!--            <p>VIRTUAL SILVER TECHNOLOGY PRIVATE LIMITED</p>-->
    <!--            <p>C-193 PH II MAYAPURI,</p>-->
    <!--            <p class="third-row">Janak Puri NEW DELHI West Delhi DL 110064 IN</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div-->
    <!--            style="height: 80px;  top: 21px; position: absolute; justify-content: flex-start; align-items: center; gap: 11px; display: inline-flex">-->
    <!--          <div style="display: flex;justify-content: center;align-items: center;gap: 10px;">-->
    <!--            <div>-->
    <!--              <img width="50" height="50" :src="logo"/>-->

    <!--            </div>-->
    <!--            <div-->
    <!--                style="color: #09090B; font-size: 19.57px; font-family: Figtree; font-weight: 700; line-height: 27.95px; word-wrap: break-word">-->
    <!--              AwazMingle-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--    </div>-->
    <div class="lg:hidden md">
      <footer>
        <div class="md:items-center">
          <div
              style="width:90vw; height: 48px; padding-top: 6.56px; padding-bottom: 6.98px; padding-right: 16.71px; justify-content: flex-start; align-items: flex-start; gap: 5.59px; display: inline-flex">
            <div>
              <img width="40" height="40" alt="logo" :src="logo"/>
            </div>
            <div
                style="color: #09090B; font-size: 19.57px; font-family: Figtree; font-weight: 700; line-height: 27.95px; word-wrap: break-word">
              AwazMingle
            </div>
          </div>
          <div class="md:flex justify-items-start"
               style="color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 12px;font-style: normal;font-weight: 400;line-height: normal;">
            Dive into lively voice chat rooms and bond with buddies!
          </div>
          <div class="flex justify-between  align-items-center"
               style="width: 326px; height: 120px; margin-top:20px;gap:5px;flex-wrap: wrap;">
            <div
                style="width:153px;height:30px;background-color: #fff;text-align: left;color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;">
              <a href="/index.html">Voice Chat Room</a>
            </div>
            <div
                style="width:153px;height:30px;background-color: #fff;text-align: left;color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;">
              <a href="./about.html">Contact us</a>
            </div>
            <div
                style="width:153px;height:30px;background-color: #fff;text-align: left;color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;">
              <a href="/about.html">About Us</a>
            </div>
            <div
                style="width:153px;height:30px;background-color: #fff;text-align: left;color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;">
              <a href="/compliance.html">Compliance</a>
            </div>
            <div
                style="width:153px;height:30px;background-color: #fff;text-align: left;color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;">
              <a href="/recharge.html">Recharge</a>
            </div>
          </div>
          <div class="md:flex flex-col align-items-center mt-4">
            <p style="color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 12px;font-style: normal;font-weight: 400;line-height: normal;">
              VIRTUAL SILVER TECHNOLOGY PRIVATE LIMITED</p>
            <p class="mt-2"
               style="color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 12px;font-style: normal;font-weight: 300;line-height: normal;">
              C-193 PH II MAYAPURI,</p>
            <p style="color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 12px;font-style: normal;font-weight: 300;line-height: normal;">
              Janak Puri NEW DELHI West Delhi DL 110064 IN</p>
            <p class="mt-7 mb-16"
               style="color: var(--color-text-icon-color-2, #3F3F46);font-family: Archivo;font-size: 12px;font-style: normal;font-weight: 400;line-height: normal;">
              © 2022 ClickVoice All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>

  </div>
</template>
<style lang="scss" scoped>
.footer {
  margin: 0 auto;

  .lg {
    footer {
      height: 400px;
    }

    .container {
      display: flex;
    }

    .left {
      flex: 1;
    }

    .right {
      display: flex;
      flex-direction: column;
    }
  }

  .md {
    footer {
      display: flex;
      //height: 94vw;
      //flex-flow: column;
      margin-top: 30px;
      align-items: center;
      justify-content: space-between;
      padding: 4.26vw 4.26vw 2.93vw 4.26vw;

    }
  }
}
</style>


<!--<script>-->
<!--var _hmt = _hmt || [];-->
<!--(function() {-->
<!--  var hm = document.createElement("script");-->
<!--  hm.src = "https://hm.baidu.com/hm.js?fe295121d03c76e6d4c0f7b9418e0305";-->
<!--  var s = document.getElementsByTagName("script")[0];-->
<!--  s.parentNode.insertBefore(hm, s);-->
<!--})();-->
<!--</script>-->
