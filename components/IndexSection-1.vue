<script setup lang="ts">
import Logo from "assets/images/logo.png";
const drawer = ref(false)
const direction = "btt" as "btt";
</script>
<template>
  <section class="section">

    <section class="p-11 hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4" style="width: 100%; height: 100%;  flex-direction: column;  gap: 32px; display: inline-flex">
        <div style="align-self: stretch; height: 72px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
          <div><span style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Explore the Fun with </span><span style="color: #F43F5E; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">ClickVoice!</span></div>
          <div style="color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">Unleashing Your Potential: Discover the Magic You Can Make on ClickVoice!</div>
        </div>
        <div style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex">
          <div style="flex: 1 1 0; align-self: stretch; padding-left: 24px; padding-right: 24px; padding-top: 32px; padding-bottom: 32px; background: rgba(255, 228, 230, 0.20); border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 29px; display: inline-flex">
            <div style="width: 90px; height: 90px; position: relative">
              <div style="width: 90px; height: 90px; left: 0px; top: 0px; position: absolute; background: #FFE4E6; border-radius: 9999px"></div>
              <div style="width: 56px; height: 56px; left: 17px; top: 17px; position: absolute">
                <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2068 43.4212C12.0418 42.9343 13.1133 43.2164 13.6001 44.0513C15.5295 47.3599 18.479 49.8619 22.1164 51.4853C22.999 51.8792 23.3951 52.914 23.0012 53.7966C22.6073 54.6792 21.5725 55.0753 20.6899 54.6814C16.4631 52.7949 12.9169 49.8276 10.5767 45.8145C10.0898 44.9795 10.3719 43.908 11.2068 43.4212Z" fill="#F43F5E"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M45.0215 10.9013C42.6557 8.48516 39.2818 7.59396 35.9788 8.53377C35.0492 8.79828 34.0812 8.25912 33.8167 7.32952C33.5522 6.39992 34.0914 5.4319 35.021 5.16739C39.5434 3.88058 44.2485 5.10913 47.5223 8.45258C48.1984 9.14315 48.1868 10.2511 47.4962 10.9273C46.8056 11.6035 45.6977 11.5918 45.0215 10.9013Z" fill="#F43F5E"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0183 9.46965C26.5189 8.61314 25.0633 8.0937 23.5847 8.93873C22.1116 9.78066 21.8525 11.2648 22.3432 12.1064L28.2364 22.2123C28.7233 23.0472 28.4412 24.1187 27.6063 24.6056C26.7713 25.0925 25.6998 24.8103 25.213 23.9754L17.3554 10.5008C16.8559 9.64431 15.4003 9.12488 13.9218 9.9699C12.4486 10.8118 12.1895 12.2959 12.6803 13.1375L21.5201 28.2964C22.0069 29.1313 21.7248 30.2029 20.8899 30.6897C20.055 31.1766 18.9835 30.8945 18.4966 30.0596L14.5678 23.3223C14.0683 22.4658 12.6128 21.9463 11.1342 22.7913C9.66104 23.6333 9.40194 25.1174 9.89272 25.959L18.7325 41.1179C22.4867 47.5557 31.7509 49.645 39.6072 45.155C47.458 40.6682 50.2488 31.7047 46.5033 25.2817L40.6101 15.1758C40.1106 14.3193 38.6551 13.7998 37.1765 14.6449C35.7033 15.4868 35.4442 16.9709 35.935 17.8125L39.8638 24.5498C40.0989 24.953 40.1632 25.4335 40.0424 25.8843C39.9216 26.3352 39.6257 26.7191 39.2204 26.9507C35.6213 29.0076 34.5184 32.9848 36.094 35.6869C36.5809 36.5218 36.2988 37.5933 35.4639 38.0802C34.6289 38.5671 33.5574 38.2849 33.0706 37.45C30.9409 33.7979 31.8014 29.4004 34.5521 26.2922C35.3211 25.4233 35.5845 24.1593 35 23.157L27.0183 9.46965Z" fill="#F43F5E"/>
                </svg>
              </div>
            </div>
            <div style="align-self: stretch; height: 88px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
              <div style="align-self: stretch; text-align: center; color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word">Have Fun in Party Room.</div>
              <div style="align-self: stretch; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">Don’t want to show your face? We support voice  room!</div>
            </div>
          </div>
          <div style="flex: 1 1 0; align-self: stretch; padding-left: 24px; padding-right: 24px; padding-top: 32px; padding-bottom: 32px; background: rgba(255, 228, 230, 0.20); border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 29px; display: inline-flex">
            <div style="width: 90px; height: 90px; position: relative">
              <div style="width: 90px; height: 90px; left: 0px; top: 0px; position: absolute; background: #FFE4E6; border-radius: 9999px"></div>
              <div style="width: 56px; height: 56px; left: 17px; top: 17px; position: absolute">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2286 11.6666C12.9688 10.923 12.833 10.1345 12.833 9.33325C12.833 7.49017 13.5517 5.71429 14.8441 4.39844C16.1378 3.08116 17.9016 2.33325 19.7497 2.33325C23.9373 2.33325 26.5356 5.17633 27.9997 7.63514C29.4638 5.17633 32.062 2.33325 36.2497 2.33325C38.0978 2.33325 39.8616 3.08116 41.1553 4.39844C42.4477 5.71429 43.1664 7.49017 43.1664 9.33325C43.1664 10.1345 43.0305 10.923 42.7708 11.6666L47.8948 11.6666C48.3849 11.6665 48.8624 11.6665 49.2686 11.6942C49.7128 11.7245 50.2395 11.7956 50.7856 12.0218C51.929 12.4955 52.8375 13.4039 53.3111 14.5474C53.5373 15.0935 53.6084 15.6202 53.6388 16.0644C53.6665 16.4704 53.6664 16.9479 53.6664 17.4377V17.5622C53.6664 18.0519 53.6665 18.5295 53.6388 18.9355C53.6084 19.3797 53.5373 19.9064 53.3111 20.4525C52.8375 21.5959 51.929 22.5044 50.7856 22.978C50.2395 23.2042 49.7128 23.2753 49.2686 23.3057C48.8624 23.3334 48.385 23.3333 47.8949 23.3333H8.10457C7.61447 23.3333 7.13702 23.3334 6.73083 23.3057C6.28663 23.2753 5.75994 23.2042 5.21384 22.978C4.07037 22.5044 3.16189 21.5959 2.68825 20.4525C2.46205 19.9064 2.39095 19.3797 2.36064 18.9355C2.33294 18.5294 2.33297 18.052 2.33301 17.5621V17.4379C2.33297 16.948 2.33294 16.4704 2.36064 16.0644C2.39095 15.6202 2.46205 15.0935 2.68825 14.5474C3.16189 13.4039 4.07037 12.4955 5.21384 12.0218C5.75994 11.7956 6.28663 11.7245 6.73083 11.6942C7.13692 11.6665 7.61462 11.6665 8.10459 11.6666L13.2286 11.6666ZM19.7497 6.99992C19.1666 6.99992 18.5988 7.23534 18.1735 7.66841C17.7468 8.10289 17.4997 8.70098 17.4997 9.33325C17.4997 9.96552 17.7468 10.5636 18.1735 10.9981C18.5988 11.4312 19.1666 11.6666 19.7497 11.6666H24.8129C24.644 11.2668 24.4497 10.8526 24.228 10.4422C23.0943 8.34347 21.6389 6.99992 19.7497 6.99992ZM31.1864 11.6666C31.3554 11.2668 31.5497 10.8526 31.7714 10.4422C32.9051 8.34347 34.3604 6.99992 36.2497 6.99992C36.8327 6.99992 37.4006 7.23534 37.8259 7.66841C38.2526 8.10289 38.4997 8.70098 38.4997 9.33325C38.4997 9.96552 38.2526 10.5636 37.8259 10.9981C37.4006 11.4312 36.8327 11.6666 36.2497 11.6666H31.1864Z" fill="#F43F5E"/>
                  <path d="M6.99969 30.3333C6.99969 29.0446 8.04436 27.9999 9.33302 27.9999H23.7997C24.4531 27.9999 24.7798 27.9999 25.0293 28.1271C25.2489 28.2389 25.4273 28.4174 25.5392 28.6369C25.6663 28.8865 25.6663 29.2132 25.6663 29.8666V51.7999C25.6663 52.4533 25.6663 52.78 25.5392 53.0296C25.4273 53.2491 25.2489 53.4276 25.0293 53.5394C24.7798 53.6666 24.4531 53.6666 23.7997 53.6666H16.7095C15.4798 53.6666 14.4185 53.6667 13.5446 53.5953C12.6222 53.5199 11.7046 53.3535 10.8218 52.9036C9.50462 52.2325 8.43376 51.1617 7.76264 49.8445C7.31279 48.9616 7.14639 48.0441 7.07102 47.1217C6.99961 46.2477 6.99964 45.1865 6.99969 43.9565L6.99969 30.3333Z" fill="#F43F5E"/>
                  <path d="M42.4548 53.5953C41.5807 53.6667 40.5196 53.6666 39.2896 53.6666H32.1997C31.5463 53.6666 31.2196 53.6666 30.97 53.5394C30.7505 53.4276 30.572 53.2491 30.4602 53.0296C30.333 52.78 30.333 52.4533 30.333 51.7999V29.8666C30.333 29.2132 30.333 28.8865 30.4602 28.6369C30.572 28.4174 30.7505 28.2389 30.97 28.1271C31.2196 27.9999 31.5463 27.9999 32.1997 27.9999H46.6664C47.955 27.9999 48.9997 29.0446 48.9997 30.3333V43.9566C48.9997 45.1866 48.9998 46.2477 48.9284 47.1217C48.853 48.0441 48.6866 48.9616 48.2367 49.8445C47.5656 51.1617 46.4948 52.2325 45.1776 52.9036C44.2947 53.3535 43.3772 53.5199 42.4548 53.5953Z" fill="#F43F5E"/>
                </svg>

              </div>
            </div>
            <div style="align-self: stretch; height: 88px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
              <div style="align-self: stretch; text-align: center; color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word">Explore to receive various gifts</div>
              <div style="align-self: stretch; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">We have animated gifts, festival gifts and gifts for specific events to show your adoration!</div>
            </div>
          </div>
          <div style="flex: 1 1 0; padding-left: 24px; padding-right: 24px; padding-top: 32px; padding-bottom: 32px; background: rgba(255, 228, 230, 0.20); border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 29px; display: inline-flex">
            <div style="width: 90px; height: 90px; position: relative">
              <div style="width: 90px; height: 90px; left: 0px; top: 0px; position: absolute; background: #FFE4E6; border-radius: 9999px"></div>
              <div style="width: 56px; height: 56px; left: 17px; top: 17px; position: absolute">
                <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.8324 17.4999C36.8324 22.0102 33.176 25.6666 28.6657 25.6666C24.1554 25.6666 20.499 22.0102 20.499 17.4999C20.499 12.9896 24.1554 9.33325 28.6657 9.33325C33.176 9.33325 36.8324 12.9896 36.8324 17.4999Z" fill="#F43F5E"/>
                  <path d="M42.666 38.4999C42.666 43.0102 36.398 46.6666 28.666 46.6666C20.934 46.6666 14.666 43.0102 14.666 38.4999C14.666 33.9896 20.934 30.3333 28.666 30.3333C36.398 30.3333 42.666 33.9896 42.666 38.4999Z" fill="#F43F5E"/>
                  <path d="M17.2845 11.6667C17.6985 11.6667 18.1028 11.7074 18.4931 11.7847C17.5422 13.4738 16.9997 15.4236 16.9997 17.5001C16.9997 19.526 17.5161 21.4313 18.4244 23.0916C18.0554 23.1603 17.6743 23.1964 17.2845 23.1964C13.9842 23.1964 11.3087 20.6154 11.3087 17.4316C11.3087 14.2477 13.9842 11.6667 17.2845 11.6667Z" fill="#F43F5E"/>
                  <path d="M13.3768 44.3007C12.0517 42.7166 11.1663 40.7728 11.1663 38.5001C11.1663 36.2969 11.9983 34.4027 13.2565 32.8458C8.81224 33.1905 5.33301 35.6212 5.33301 38.5686C5.33301 41.5437 8.87338 43.9924 13.3768 44.3007Z" fill="#F43F5E"/>
                  <path d="M40.3313 17.5001C40.3313 19.526 39.815 21.4313 38.9066 23.0916C39.2756 23.1604 39.6567 23.1964 40.0466 23.1964C43.3469 23.1964 46.0223 20.6154 46.0223 17.4316C46.0223 14.2477 43.3469 11.6667 40.0466 11.6667C39.6325 11.6667 39.2282 11.7074 38.8379 11.7847C39.7889 13.4738 40.3313 15.4236 40.3313 17.5001Z" fill="#F43F5E"/>
                  <path d="M43.9542 44.3007C48.4576 43.9924 51.998 41.5437 51.998 38.5686C51.998 35.6212 48.5188 33.1905 44.0745 32.8458C45.3327 34.4027 46.1647 36.2969 46.1647 38.5001C46.1647 40.7728 45.2794 42.7166 43.9542 44.3007Z" fill="#F43F5E"/>
                </svg>
              </div>
            </div>
            <div style="align-self: stretch; height: 88px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
              <div style="align-self: stretch; text-align: center; color: #09090B; font-size: 20px; font-weight: normal; font-weight: 700; line-height: 28px; word-wrap: break-word">Looking for interesting friends.</div>
              <div style="align-self: stretch; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 500; line-height: 24px; word-wrap: break-word">Sparking Connections: Uncover Intriguing Friendships Awaited on ClickVoice!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">

      <div style="width: 100%;">
        <span style="color: black; font-size: 20px; font-family: Amiri; font-weight: 700; word-wrap: break-word">Explore the Fun with </span>
        <span style="color: #F43F5E; font-size: 20px; font-family: Amiri; font-weight: 700; word-wrap: break-word">ClickVoice!</span>
      </div>
      <div style="width: 100%; color: #71717A; font-size: 14px; font-weight: normal; font-weight: 300; line-height: 20px; word-wrap: break-word">Unleashing Your Potential: Discover the Magic You Can Make on ClickVoice!</div>
      <div style="width: 100%; height: 100%; padding-left: 24px; padding-right: 24px; margin-top: 8px; margin-bottom: 8px; background: rgba(255, 228, 230, 0.20); border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
        <div style="width: 60px; height: 60px; position: relative">
          <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2068 43.4212C12.0418 42.9343 13.1133 43.2164 13.6001 44.0513C15.5295 47.3599 18.479 49.8619 22.1164 51.4853C22.999 51.8792 23.3951 52.914 23.0012 53.7966C22.6073 54.6792 21.5725 55.0753 20.6899 54.6814C16.4631 52.7949 12.9169 49.8276 10.5767 45.8145C10.0898 44.9795 10.3719 43.908 11.2068 43.4212Z" fill="#F43F5E"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M45.0215 10.9013C42.6557 8.48516 39.2818 7.59396 35.9788 8.53377C35.0492 8.79828 34.0812 8.25912 33.8167 7.32952C33.5522 6.39992 34.0914 5.4319 35.021 5.16739C39.5434 3.88058 44.2485 5.10913 47.5223 8.45258C48.1984 9.14315 48.1868 10.2511 47.4962 10.9273C46.8056 11.6035 45.6977 11.5918 45.0215 10.9013Z" fill="#F43F5E"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0183 9.46965C26.5189 8.61314 25.0633 8.0937 23.5847 8.93873C22.1116 9.78066 21.8525 11.2648 22.3432 12.1064L28.2364 22.2123C28.7233 23.0472 28.4412 24.1187 27.6063 24.6056C26.7713 25.0925 25.6998 24.8103 25.213 23.9754L17.3554 10.5008C16.8559 9.64431 15.4003 9.12488 13.9218 9.9699C12.4486 10.8118 12.1895 12.2959 12.6803 13.1375L21.5201 28.2964C22.0069 29.1313 21.7248 30.2029 20.8899 30.6897C20.055 31.1766 18.9835 30.8945 18.4966 30.0596L14.5678 23.3223C14.0683 22.4658 12.6128 21.9463 11.1342 22.7913C9.66104 23.6333 9.40194 25.1174 9.89272 25.959L18.7325 41.1179C22.4867 47.5557 31.7509 49.645 39.6072 45.155C47.458 40.6682 50.2488 31.7047 46.5033 25.2817L40.6101 15.1758C40.1106 14.3193 38.6551 13.7998 37.1765 14.6449C35.7033 15.4868 35.4442 16.9709 35.935 17.8125L39.8638 24.5498C40.0989 24.953 40.1632 25.4335 40.0424 25.8843C39.9216 26.3352 39.6257 26.7191 39.2204 26.9507C35.6213 29.0076 34.5184 32.9848 36.094 35.6869C36.5809 36.5218 36.2988 37.5933 35.4639 38.0802C34.6289 38.5671 33.5574 38.2849 33.0706 37.45C30.9409 33.7979 31.8014 29.4004 34.5521 26.2922C35.3211 25.4233 35.5845 24.1593 35 23.157L27.0183 9.46965Z" fill="#F43F5E"/>
          </svg>
        </div>
        <div style="align-self: stretch; height: 76px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
          <div style="align-self: stretch; text-align: center; color: #09090B; font-size: 18px; font-weight: normal; font-weight: 600; line-height: 28px; word-wrap: break-word">Have Fun in Party Room.</div>
          <div style="align-self: stretch; text-align: center; color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Don’t want to show your face? We support voice  room!</div>
        </div>
      </div>
      <div style="width: 100%; height: 100%; padding-left: 24px; padding-right: 24px; margin-top: 8px; margin-bottom: 8px; background: rgba(255, 228, 230, 0.20); border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
        <div style="width: 60px; height: 60px; position: relative">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2286 11.6666C12.9688 10.923 12.833 10.1345 12.833 9.33325C12.833 7.49017 13.5517 5.71429 14.8441 4.39844C16.1378 3.08116 17.9016 2.33325 19.7497 2.33325C23.9373 2.33325 26.5356 5.17633 27.9997 7.63514C29.4638 5.17633 32.062 2.33325 36.2497 2.33325C38.0978 2.33325 39.8616 3.08116 41.1553 4.39844C42.4477 5.71429 43.1664 7.49017 43.1664 9.33325C43.1664 10.1345 43.0305 10.923 42.7708 11.6666L47.8948 11.6666C48.3849 11.6665 48.8624 11.6665 49.2686 11.6942C49.7128 11.7245 50.2395 11.7956 50.7856 12.0218C51.929 12.4955 52.8375 13.4039 53.3111 14.5474C53.5373 15.0935 53.6084 15.6202 53.6388 16.0644C53.6665 16.4704 53.6664 16.9479 53.6664 17.4377V17.5622C53.6664 18.0519 53.6665 18.5295 53.6388 18.9355C53.6084 19.3797 53.5373 19.9064 53.3111 20.4525C52.8375 21.5959 51.929 22.5044 50.7856 22.978C50.2395 23.2042 49.7128 23.2753 49.2686 23.3057C48.8624 23.3334 48.385 23.3333 47.8949 23.3333H8.10457C7.61447 23.3333 7.13702 23.3334 6.73083 23.3057C6.28663 23.2753 5.75994 23.2042 5.21384 22.978C4.07037 22.5044 3.16189 21.5959 2.68825 20.4525C2.46205 19.9064 2.39095 19.3797 2.36064 18.9355C2.33294 18.5294 2.33297 18.052 2.33301 17.5621V17.4379C2.33297 16.948 2.33294 16.4704 2.36064 16.0644C2.39095 15.6202 2.46205 15.0935 2.68825 14.5474C3.16189 13.4039 4.07037 12.4955 5.21384 12.0218C5.75994 11.7956 6.28663 11.7245 6.73083 11.6942C7.13692 11.6665 7.61462 11.6665 8.10459 11.6666L13.2286 11.6666ZM19.7497 6.99992C19.1666 6.99992 18.5988 7.23534 18.1735 7.66841C17.7468 8.10289 17.4997 8.70098 17.4997 9.33325C17.4997 9.96552 17.7468 10.5636 18.1735 10.9981C18.5988 11.4312 19.1666 11.6666 19.7497 11.6666H24.8129C24.644 11.2668 24.4497 10.8526 24.228 10.4422C23.0943 8.34347 21.6389 6.99992 19.7497 6.99992ZM31.1864 11.6666C31.3554 11.2668 31.5497 10.8526 31.7714 10.4422C32.9051 8.34347 34.3604 6.99992 36.2497 6.99992C36.8327 6.99992 37.4006 7.23534 37.8259 7.66841C38.2526 8.10289 38.4997 8.70098 38.4997 9.33325C38.4997 9.96552 38.2526 10.5636 37.8259 10.9981C37.4006 11.4312 36.8327 11.6666 36.2497 11.6666H31.1864Z" fill="#F43F5E"/>
            <path d="M6.99969 30.3333C6.99969 29.0446 8.04436 27.9999 9.33302 27.9999H23.7997C24.4531 27.9999 24.7798 27.9999 25.0293 28.1271C25.2489 28.2389 25.4273 28.4174 25.5392 28.6369C25.6663 28.8865 25.6663 29.2132 25.6663 29.8666V51.7999C25.6663 52.4533 25.6663 52.78 25.5392 53.0296C25.4273 53.2491 25.2489 53.4276 25.0293 53.5394C24.7798 53.6666 24.4531 53.6666 23.7997 53.6666H16.7095C15.4798 53.6666 14.4185 53.6667 13.5446 53.5953C12.6222 53.5199 11.7046 53.3535 10.8218 52.9036C9.50462 52.2325 8.43376 51.1617 7.76264 49.8445C7.31279 48.9616 7.14639 48.0441 7.07102 47.1217C6.99961 46.2477 6.99964 45.1865 6.99969 43.9565L6.99969 30.3333Z" fill="#F43F5E"/>
            <path d="M42.4548 53.5953C41.5807 53.6667 40.5196 53.6666 39.2896 53.6666H32.1997C31.5463 53.6666 31.2196 53.6666 30.97 53.5394C30.7505 53.4276 30.572 53.2491 30.4602 53.0296C30.333 52.78 30.333 52.4533 30.333 51.7999V29.8666C30.333 29.2132 30.333 28.8865 30.4602 28.6369C30.572 28.4174 30.7505 28.2389 30.97 28.1271C31.2196 27.9999 31.5463 27.9999 32.1997 27.9999H46.6664C47.955 27.9999 48.9997 29.0446 48.9997 30.3333V43.9566C48.9997 45.1866 48.9998 46.2477 48.9284 47.1217C48.853 48.0441 48.6866 48.9616 48.2367 49.8445C47.5656 51.1617 46.4948 52.2325 45.1776 52.9036C44.2947 53.3535 43.3772 53.5199 42.4548 53.5953Z" fill="#F43F5E"/>
          </svg>
        </div>
        <div style="align-self: stretch; height: 96px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
          <div style="align-self: stretch; text-align: center; color: #09090B; font-size: 18px; font-weight: normal; font-weight: 600; line-height: 28px; word-wrap: break-word">Explore to receive various gifts</div>
          <div style="align-self: stretch; text-align: center; color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">We have animated gifts, festival gifts and gifts for specific events to show your adoration!</div>
        </div>
      </div>
      <div style="width: 100%; height: 100%; padding-left: 24px; padding-right: 24px;  margin-top: 8px; margin-bottom: 8px; background: rgba(255, 228, 230, 0.20); border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
        <div style="width: 60px; height: 60px; position: relative">
          <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8324 17.4999C36.8324 22.0102 33.176 25.6666 28.6657 25.6666C24.1554 25.6666 20.499 22.0102 20.499 17.4999C20.499 12.9896 24.1554 9.33325 28.6657 9.33325C33.176 9.33325 36.8324 12.9896 36.8324 17.4999Z" fill="#F43F5E"/>
            <path d="M42.666 38.4999C42.666 43.0102 36.398 46.6666 28.666 46.6666C20.934 46.6666 14.666 43.0102 14.666 38.4999C14.666 33.9896 20.934 30.3333 28.666 30.3333C36.398 30.3333 42.666 33.9896 42.666 38.4999Z" fill="#F43F5E"/>
            <path d="M17.2845 11.6667C17.6985 11.6667 18.1028 11.7074 18.4931 11.7847C17.5422 13.4738 16.9997 15.4236 16.9997 17.5001C16.9997 19.526 17.5161 21.4313 18.4244 23.0916C18.0554 23.1603 17.6743 23.1964 17.2845 23.1964C13.9842 23.1964 11.3087 20.6154 11.3087 17.4316C11.3087 14.2477 13.9842 11.6667 17.2845 11.6667Z" fill="#F43F5E"/>
            <path d="M13.3768 44.3007C12.0517 42.7166 11.1663 40.7728 11.1663 38.5001C11.1663 36.2969 11.9983 34.4027 13.2565 32.8458C8.81224 33.1905 5.33301 35.6212 5.33301 38.5686C5.33301 41.5437 8.87338 43.9924 13.3768 44.3007Z" fill="#F43F5E"/>
            <path d="M40.3313 17.5001C40.3313 19.526 39.815 21.4313 38.9066 23.0916C39.2756 23.1604 39.6567 23.1964 40.0466 23.1964C43.3469 23.1964 46.0223 20.6154 46.0223 17.4316C46.0223 14.2477 43.3469 11.6667 40.0466 11.6667C39.6325 11.6667 39.2282 11.7074 38.8379 11.7847C39.7889 13.4738 40.3313 15.4236 40.3313 17.5001Z" fill="#F43F5E"/>
            <path d="M43.9542 44.3007C48.4576 43.9924 51.998 41.5437 51.998 38.5686C51.998 35.6212 48.5188 33.1905 44.0745 32.8458C45.3327 34.4027 46.1647 36.2969 46.1647 38.5001C46.1647 40.7728 45.2794 42.7166 43.9542 44.3007Z" fill="#F43F5E"/>
          </svg>
        </div>
        <div style="align-self: stretch; height: 76px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
          <div style="align-self: stretch; text-align: center; color: #09090B; font-size: 18px; font-weight: normal; font-weight: 600; line-height: 28px; word-wrap: break-word">Looking for interesting friends.</div>
          <div style="align-self: stretch; text-align: center; color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Sparking Connections: Uncover Intriguing Friendships Awaited on ClickVoice!</div>
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
      & > div {
        display: flex;
        flex-wrap: wrap;
        position: relative;
      }
    }
  }
}
</style>
