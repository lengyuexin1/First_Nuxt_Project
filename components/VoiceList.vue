<script setup lang="ts">

</script>
<template>

  <MySwiper/>
  <section class="section">
    <section class=" hidden lg:flex lg">
      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag"
           style="width: 100%; height: 100%; padding-top: 16px;position:relative; padding-bottom: 16px; margin: 0 auto ;">
        <div
            style="justify-content: center;flex-direction: column; align-items: center; gap: 4px; display: flex;position:absolute;top: -230px;left:25%;">
          <div class="top-tips">Super popular and interesting room</div>
          <div class="top-title">Voice Chat Room</div>
        </div>
      </div>
    </section>
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
            <nuxt-link to="/voice.html">Voice Chat Room</nuxt-link>
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
        line-height: 16px; /* 133.333% */
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
    }

    &.md {
      & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;

        .info-box {
          padding: 16px 11px;
          width: calc(50% - 8px);
          height: 92vw;
          min-width: 35%;
          min-height: 218px;
          max-height: 350px;
          background: linear-gradient(102deg, #f7faff 0%, #f5f9ff 100%);
          box-shadow: 0px 0px 8px 0px rgba(189, 214, 255, 0.23);
          border: 1px solid #c2d6ff;
          border-radius: 10px;
          margin: 4px;
          display: flex;
          flex-flow: column;

          & > div {
            &.div-1 {
              h3 {
                font-size: 14px;
                color: #a3c1f5;
                line-height: 21px;
              }
            }

            &.div-2 {
              min-width: 150px;
              display: flex;
              flex-flow: column;
              justify-content: space-between;
              align-items: flex-start;

              h2 {
                font-size: 15px;
                color: #0656e1;
                line-height: 15px;
              }
            }
          }

          .icon {
            width: 60px;
            height: 60px;
            margin: 0 auto;
          }

          ul {
            list-style-type: disc;

            li {
              &::marker {
                color: rgba(93, 97, 106, 0.8);
              }

              &.pl-5 {
                &::marker {
                  padding-left: 10px;
                }
              }

              font-size: 12px;
              color: rgba(3, 7, 17, 0.65);
              line-height: 14px;
              margin-bottom: 7px;
            }
          }
        }

        .center-div {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          width: 25vw;
          height: 25vw;
          min-width: 110px;
          min-height: 110px;
          padding: 5px;
          border: 1px solid #c2d6ff;
          background: #ffffff;
          box-sizing: border-box;

          & > div {
            background: #ffffff;
            border-radius: 4px;
            border: 1px dashed #a7c4ff;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 5px;

            & > div {
              border-radius: 4px;
              border: 1px dashed #a7c4ff;
              width: 100%;
              height: 100%;
              box-shadow: 0px 0px 12px 9px rgba(189, 214, 255, 0.23);
              border-radius: 4px;
              border: 3px solid #c6d9ff;
              box-sizing: border-box;

              .title {
                transform: rotateZ(-45deg);
                text-align: center;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;

                h2 {
                  font-size: 4vw;
                  color: #0656e1;
                  line-height: 15px;
                }

                h3 {
                  font-size: 2.5vw;
                  color: #bad1fa;
                  line-height: 20px;
                }
              }

              .zz {
                position: absolute;
                background: #ffffff;
                width: 8px;
                height: 8px;

                &:nth-child(1) {
                  top: -4px;
                  left: -4px;
                }

                &:nth-child(2) {
                  top: -4px;
                  right: -4px;
                }

                &:nth-child(3) {
                  bottom: -4px;
                  left: -4px;
                }

                &:nth-child(4) {
                  bottom: -4px;
                  right: -4px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
