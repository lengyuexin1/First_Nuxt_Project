<script setup lang="ts">
import icon1 from "@/assets/images/index_bg2.png";
import icon2 from "@/assets/images/live/voice_h5.png";
</script>
<template>
  <section class="section">

    <section class="p-11 hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4" style=" flex-direction: column;">
        <div style="width: 100%; height: 100%; justify-content: space-between; align-items: center; display: inline-flex">
          <div style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Voice Room</div>
          <NuxtLink to="/index.html">
            <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">
              <div style="color: #475467; font-size: 16px; font-family: Figtree; font-weight: 600; word-wrap: break-word">View more</div>


                <div style="width: 24px; height: 24px; position: relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

            </div>
          </NuxtLink>
        </div>
        <div style="width: 100%; height: 100%; background: #FAF6F3; border-radius: 12px"></div>
        <div style="width: 1280px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
          <div style="width: 1280px; height: 211px; position: relative; border-radius: 12px; overflow: hidden">
            <div style="width: 1280px; height: 211px; left: 0px; top: 36px; position: absolute">
              <div style="width: 1280px; height: 211px; left: 0px; top: 0px; position: absolute; background: #FAF6F3; border-radius: 12px"></div>
              <div style="left: 60px; top: 55px; position: absolute; color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Find the voice room you like.</div>
              <div style="width: 600px; left: 60px; top: 107px; position: absolute; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">Discover Your Sonic Sanctuary: Uncover Voice Rooms Tailored to Your Taste on ClickVoice!</div>
<!--              <div style="width: 382.29px; height: 313px; left: 819px; top: -28px; position: absolute; opacity: 0.50">-->
<!--                <img style="width: 382.29px; height: 313px; left: 0px; top: 0px; position: absolute" src="https://via.placeholder.com/382x313" />-->
<!--                <div style="width: 382.29px; height: 313px; left: 0px; top: 0px; position: absolute; background: #FFDC83"></div>-->
<!--              </div>-->
            </div>
            <img style="width: 370.50px; height: 247px; left: 834.75px; top: 0px; position: absolute" :src="icon1" />
          </div>
        </div>

      </div>
    </section>
    <section class="p-3 lg:hidden md">
      <div class="container">
        <div style="width: 100%; color: black; font-size: 20px; float: left;justify-content:left; font-family: Amiri; font-weight: 700; word-wrap: break-word">Voice Room</div>
        <div style="width: 100%; height: 100%; background: #FAF6F3;flex-direction: column; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
          <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
            <div style="width: 343px; height: 134px; position: relative; background: #FAF6F3; border-radius: 8px">
              <div style="height: 110px; left: 12px; top: 12px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                <div style="align-self: stretch; color: black; font-size: 16px; font-family: Amiri; font-weight: 700; text-transform: capitalize; line-height: 20.80px; word-wrap: break-word">Find the voice room you like.</div>
                <div style="align-self: stretch; width:55%;color: #71717A; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">Discover Your Sonic Sanctuary: Uncover Voice Rooms Tailored to Your Taste on ClickVoice!</div>
              </div>
<!--              <div style="width: 160px; height: 130px; left: 183px; top: 4px; position: absolute; opacity: 0.50">-->
<!--                <img style="width: 160px; height: 130px; left: 0px; top: 0px; position: absolute" src="https://via.placeholder.com/160x130" />-->
<!--                <div style="width: 181.53px; height: 148.62px; left: 0px; top: -0.20px; position: absolute; background: #FFDC83"></div>-->
<!--              </div>-->
              <img style="width: 173px; height: 145px; left: 170px; top: -11px; position: absolute" :src="icon2" />
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

    }
    &.md {
      .container {
        display: flex;
        flex-wrap: wrap;

      }
    }
  }
}
</style>
