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
                  <a href="./recharge.html">Recharge</a>
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
    <div style="margin: 60px 0;text-align: center;color:#454545;font-size:16px">
      <p>©2024 ClickVoice All Rights Reserved.</p>
    </div>
    <!--    <div class="hidden lg:flex lg">-->
    <!--        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4" style="width: 100%; height: 100%; position: relative; background: white">-->
    <!--          <div style=" top: 97px; position: absolute; justify-content: flex-end; align-items: flex-start; display: inline-flex">-->
    <!--&lt;!&ndash;            <div style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">&ndash;&gt;-->
    <!--&lt;!&ndash;              <div style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><a href="/live.html">Live</a></div>&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--            <div style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--              <div style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><a href="/voice.html">Voice Chat Room</a></div>-->
    <!--            </div>-->
    <!--            <div style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--              <div style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><a href="/about.html">About Us</a></div>-->
    <!--            </div>-->
    <!--            <div style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--              <div style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word"><a href="/compliance.html">Compliance</a></div>-->
    <!--            </div>-->
    <!--            <div style="padding-top: 32px; padding-bottom: 32px; padding-right: 48px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">-->
    <!--              <div style="color: #09090B; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word" @click="contact"><button>Recharge</button></div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="container" style="margin-top: 180px;">-->
    <!--            <div class="left">-->
    <!--              <p style="color: #71717A; font-size: 14px; font-family: Ubuntu; font-weight: 500; word-wrap: break-word">&nbsp;  </p>-->
    <!--              <p style="color: #71717A; font-size: 14px; font-family: Ubuntu; font-weight: 500; word-wrap: break-word">&nbsp;</p>-->
    <!--              <p style="color: #71717A; font-size: 14px; font-family: Ubuntu; font-weight: 500; word-wrap: break-word">© 2023  ClickVoice All Rights Reserved.</p>-->
    <!--            </div>-->
    <!--            <div class="right" style="color: #3F3F46; font-size: 14px; font-family: Ubuntu; font-weight: 400; word-wrap: break-word">-->
    <!--              <p>VIRTUAL SILVER TECHNOLOGY PRIVATE LIMITED</p>-->
    <!--              <p>C-193 PH II MAYAPURI,</p>-->
    <!--              <p class="third-row">Janak Puri NEW DELHI West Delhi DL 110064 IN</p>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div style="height: 80px;  top: 21px; position: absolute; justify-content: flex-start; align-items: center; gap: 11px; display: inline-flex">-->
    <!--            <div style="width: 153.85px; height: 48px; padding-top: 6.56px; padding-bottom: 6.98px; padding-right: 16.71px; justify-content: flex-start; align-items: center; gap: 5.59px; display: flex">-->
    <!--              <div style="width: 33.54px; height: 34.46px; position: relative">-->
    <!--                <img style="width: 33.54px; height: 34.46px; left: 0px; top: 0px; position: absolute" :src="logo" />-->
    <!--                <div style="width: 2.26px; height: 8.99px; left: 5.26px; top: 10.17px; position: absolute; background: white; border-radius: 19.61px"></div>-->
    <!--                <div style="width: 2.26px; height: 5.72px; left: 9.35px; top: 11.80px; position: absolute; background: white; border-radius: 19.61px"></div>-->
    <!--                <div style="width: 2.26px; height: 19.30px; left: 13.53px; top: 5.01px; position: absolute; background: white; border-radius: 19.61px"></div>-->
    <!--                <div style="width: 2.26px; height: 9.77px; left: 17.54px; top: 9.78px; position: absolute; background: white; border-radius: 19.61px"></div>-->
    <!--                <div style="width: 2.26px; height: 5.72px; left: 21.61px; top: 11.80px; position: absolute; background: white; border-radius: 19.61px"></div>-->
    <!--              </div>-->
    <!--              <div style="color: #09090B; font-size: 19.57px; font-family: Figtree; font-weight: 700; line-height: 27.95px; word-wrap: break-word">ClickVoice</div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--    </div>-->
    <div class="lg:hidden md">
      <footer>
      </footer>
    </div>

  </div>
</template>
<style lang="scss" scoped>
.footer {
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
      height: 94vw;
      flex-flow: column;
      align-items: center;
      justify-content: space-between;
      padding: 4.26vw 4.26vw 2.93vw;

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
