<script setup lang="ts">

</script>
<template>
    <MySwiper/>
  <section class="section" style="position: absolute;top: 160px;left: 45%">
    <section class=" hidden lg:flex lg">
      <!--      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag"-->
      <!--           style="width: 100%; height: 100%; padding-top: 16px; padding-bottom: 16px; margin: 100px auto auto auto;">-->
      <!--        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">-->
      <!--          <div style="justify-content: flex-start; align-items: center; display: flex">-->
      <!--            <div-->
      <!--                style="color: rgba(0, 0, 0, 0.40); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">-->
      <!--              <nuxt-link to="/">Home</nuxt-link>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--              <path-->
      <!--                  d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z"-->
      <!--                  fill="black" fill-opacity="0.4"/>-->
      <!--            </svg>-->
      <!--          </div>-->
      <!--          <div style="justify-content: flex-start; align-items: center; display: flex">-->
      <!--            <div-->
      <!--                style="color: rgba(0, 0, 0, 0.90); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">-->
      <!--              <nuxt-link to="/about.html">About Us</nuxt-link>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </section>
    <div class="top-title">GET TO KNOW US</div>
    <div class="top-content">About AwazMingle</div>
    <section class="p-3 lg:hidden md header-tag">
      <div
          style="width: 100%; height: 100%;margin-top: 30px;   justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; display: flex">
          <div
              style="color: rgba(0, 0, 0, 0.40); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">
            <nuxt-link to="/">Home</nuxt-link>
          </div>
        </div>
        <div>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z"
                fill="black" fill-opacity="0.4"/>
          </svg>
        </div>
        <div style="justify-content: flex-start; align-items: center; display: flex">
          <div
              style="color: rgba(0, 0, 0, 0.90); font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">
            <nuxt-link to="/about.html">About Us</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<style scoped lang="scss">
.section {

  .top-title {
    display: inline-flex;
    padding: 7px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 44px;
    border: 2px solid #050505;
    background: #F6CBE4;
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

  .top-content {
    color: #050505;
    font-family: Archivo;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.96px;
    margin: 10px 0 0 -220px;
  }

  section {
    &.lg {

    }

    &.md {

    }
  }
}
</style>
