<script setup lang="ts">
import {ElMessage} from "element-plus";

const name  = ref('');
const phone  = ref('');
const email  = ref('');
const remark  = ref('');
const  submit = () => {
  if (!name.value) {
    ElMessage.error("Please input name");
    return
  }
  if (!phone.value) {
    ElMessage.error("Please input phone");
    return;
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.value)) {
    ElMessage.error("Please input correct phone");
    return;
  }
  if (!email.value) {
    ElMessage.error("Please input email");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    ElMessage.error("Please input correct email");
    return;
  }
  name.value = '';
  phone.value = '';
  email.value = '';
  remark.value = '';
  ElMessage.success("submit success");
}

</script>
<template>
  <section class="section">

    <section class="hidden lg:flex lg">
      <div class="mx-auto" style="width: 100%; height: 100%;margin-top: 70px; padding-top: 80px; padding-bottom: 60px;  background: #FFF1F2; justify-content: flex-start; align-items: flex-start; gap: 60px; display: inline-flex">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4">
          <div style="flex-direction: column;margin-right: 60px; justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex">
            <div style="color: black; font-size: 36px; font-family: Amiri; font-weight: 700; line-height: 36px; word-wrap: break-word">Contact Us </div>
            <div style="width: 380px; height: 0px; border: 1px rgba(58.11, 23.55, 74.37, 0.08) solid"></div>
            <div style="width: 318px; height: 76px; position: relative">
              <div style="left: 0px; top: 32px; position: absolute; text-align: center; color: #667085; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">Customer care number: +91 8276096832</div>
              <div style="left: 0px; top: 60px; position: absolute; text-align: center; color: #667085; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">Customer care email ID: contact@silveroot.app</div>
              <div style="left: 0px; top: 0px; position: absolute; color: black; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">VIRTUAL SILVER TECHNOLOGY PRIVATE LIMITED</div>
            </div>
          </div>
          <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 30px; display: inline-flex">
            <div style="width: 760px; height: 249px; position: relative">
              <div style="width: 340px; height: 36px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 12px; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                <div style="align-self: stretch; flex: 1 1 0; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                  <div style="justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                    <div style="width: 16px; height: 16px; position: relative; opacity: 0.60">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.6">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00297 2.48098C6.98084 2.48098 6.15129 3.31015 6.15129 4.33265C6.15129 5.35514 6.98084 6.18432 8.00297 6.18432C9.02509 6.18432 9.85464 5.35514 9.85464 4.33265C9.85464 3.31015 9.02509 2.48098 8.00297 2.48098ZM4.66706 4.33301C4.66706 2.49208 6.15951 1 8.00007 1C9.84063 1 11.3331 2.49208 11.3331 4.33301C11.3331 6.17394 9.84063 7.66602 8.00007 7.66602C6.15951 7.66602 4.66706 6.17394 4.66706 4.33301ZM6.02619 10.258C4.67817 10.258 3.55606 10.2569 3.55606 11.6653V12.8503H12.4441V11.6653C12.4441 10.2569 11.322 10.258 9.97395 10.258H6.02619ZM2.07617 11.6656C2.07617 9.45658 3.84637 8.77702 6.02764 8.77702H9.9754C12.1567 8.77702 13.9269 9.45658 13.9269 11.6656V13.6654C13.9269 14.0335 13.6306 14.332 13.2677 14.332H2.73537C2.37244 14.332 2.07617 14.0335 2.07617 13.6654V11.6656Z" fill="#28282F"/>
                        </g>
                      </svg>
                    </div>
                    <input type="text" placeholder="Please enter name" name="name" v-model="name" style="width: 280px; height: 34px;outline:none;color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
<!--                    <div style="color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Please enter name</div>-->
                  </div>
                </div>
              </div>
              <div style="width: 340px;height: 36px; left: 0px; top: 56px; position: absolute; background: white; border-radius: 12px; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                <div style="align-self: stretch; height: 36px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                  <div style="justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                    <div style="width: 16px; height: 16px; position: relative; opacity: 0.60">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.6" clip-path="url(#clip0_951_535)">
                          <path d="M16 0H0V16H16V0Z" fill="white" fill-opacity="0.01"/>
                          <path d="M16 0H0V16H16V0Z" fill="white" fill-opacity="0.01"/>
                          <path d="M3 10H13V13.4286C13 13.7442 12.7202 14 12.375 14H3.625C3.27982 14 3 13.7442 3 13.4286V10Z" stroke="#28282F" stroke-width="1.33333" stroke-linejoin="round"/>
                          <path d="M13 10V2.61538C13 2.27552 12.7202 2 12.375 2H3.625C3.27982 2 3 2.27552 3 2.61538V10" stroke="#28282F" stroke-width="1.33333" stroke-linejoin="round"/>
                          <path d="M7.5 12H8.83333" stroke="#28282F" stroke-width="1.33333" stroke-linecap="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_951_535">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>

                    </div>
                    <input type="text" name="phone" v-model="phone" placeholder="Please enter Phone" style="width: 280px; height: 34px;outline:none;color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">

<!--                    <div style="color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Please enter Phone</div>-->
                  </div>
                </div>
              </div>
              <div style="height: 137px;padding-left: 20px; padding-right: 20px; left: 0px; top: 112px; position: absolute; background: white; border-radius: 12px; justify-content: flex-start; align-items: center; display: inline-flex">
                <textarea v-model="remark" style="width: 720px; outline:none;align-self: stretch; padding: 11px 12px; color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word; border: none; resize: none;" placeholder="Please enter Message"></textarea>
              </div>
              <div style="width: 340px; height: 36px; left: 420px; top: 0px; position: absolute; background: white; border-radius: 12px; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                <div style="align-self: stretch; flex: 1 1 0; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                  <div style="justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                    <div style="width: 16px; height: 16px; position: relative; opacity: 0.60">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.6" clip-path="url(#clip0_951_3635)">
                          <path d="M16 0H0V16H16V0Z" fill="white" fill-opacity="0.01"/>
                          <path d="M1.33301 13H14.6663V8V3H7.99967H1.33301V8V13Z" stroke="#28282F" stroke-width="1.33333" stroke-linejoin="round"/>
                          <path d="M1.33301 3L7.99967 8L14.6663 3" stroke="#28282F" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_951_3635">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>

                    </div>
                    <input type="text" placeholder="Please enter E-mail" name="name" v-model="email" style="width: 280px; height: 34px;outline:none;color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">

<!--                    <div style="color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Please enter E-mail</div>-->
                  </div>
                </div>
              </div>
            </div>
            <button @click="submit">
              <div style="padding-left: 80px; padding-right: 80px; padding-top: 8px; padding-bottom: 8px; background: #F43F5E; border-radius: 12px; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                <div style="color: white; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Send</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class=" lg:hidden md" style="padding-top: 0.75rem;">
      <div style=" width: 100%; height: 100%; padding-left: 16px; padding-right: 16px; padding-top: 40px; padding-bottom: 40px; background: #FFF1F2; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex">
        <div style="align-self: stretch; color: black; font-size: 20px; font-family: Amiri; font-weight: 700; word-wrap: break-word">Contact Us </div>
        <div style="align-self: stretch; height: 0px; border: 1px rgba(58.11, 23.55, 74.37, 0.08) solid"></div>
        <div style="width: 343px; height: 76px; position: relative">
          <div style="left: 0px; top: 32px; position: absolute; text-align: center; color: #667085; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">Customer care number: +91 8276096832</div>
          <div style="left: 0px; top: 60px; position: absolute; text-align: center; color: #667085; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">Customer care email ID: contact@silveroot.app</div>
          <div style="left: 0px; top: 0px; position: absolute; color: black; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">VIRTUAL SILVER TECHNOLOGY PRIVATE LIMITED</div>
        </div>
        <div style="width:100%;align-self: stretch; height: 340px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
          <div style="align-self: stretch; height: 48px; background: white; border-radius: 18px; flex-direction: column; justify-content: center; align-items: flex-start; display: flex">
            <div style="align-self: stretch; height: 36px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
              <div style="justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.6">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00297 2.48098C6.98084 2.48098 6.15129 3.31015 6.15129 4.33265C6.15129 5.35514 6.98084 6.18432 8.00297 6.18432C9.02509 6.18432 9.85464 5.35514 9.85464 4.33265C9.85464 3.31015 9.02509 2.48098 8.00297 2.48098ZM4.66706 4.33301C4.66706 2.49208 6.15951 1 8.00007 1C9.84063 1 11.3331 2.49208 11.3331 4.33301C11.3331 6.17394 9.84063 7.66602 8.00007 7.66602C6.15951 7.66602 4.66706 6.17394 4.66706 4.33301ZM6.02619 10.258C4.67817 10.258 3.55606 10.2569 3.55606 11.6653V12.8503H12.4441V11.6653C12.4441 10.2569 11.322 10.258 9.97395 10.258H6.02619ZM2.07617 11.6656C2.07617 9.45658 3.84637 8.77702 6.02764 8.77702H9.9754C12.1567 8.77702 13.9269 9.45658 13.9269 11.6656V13.6654C13.9269 14.0335 13.6306 14.332 13.2677 14.332H2.73537C2.37244 14.332 2.07617 14.0335 2.07617 13.6654V11.6656Z" fill="#28282F"/>
                  </g>
                </svg>
                <input type="text" placeholder="Please enter name" name="name" v-model="name" style=" height: 34px;outline:none;color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
              </div>
            </div>
          </div>
          <div style="align-self: stretch; height: 48px; background: white; border-radius: 18px; flex-direction: column; justify-content: center; align-items: flex-start; display: flex">
            <div style="align-self: stretch; height: 36px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
              <div style="justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.6" clip-path="url(#clip0_951_535)">
                    <path d="M16 0H0V16H16V0Z" fill="white" fill-opacity="0.01"/>
                    <path d="M16 0H0V16H16V0Z" fill="white" fill-opacity="0.01"/>
                    <path d="M3 10H13V13.4286C13 13.7442 12.7202 14 12.375 14H3.625C3.27982 14 3 13.7442 3 13.4286V10Z" stroke="#28282F" stroke-width="1.33333" stroke-linejoin="round"/>
                    <path d="M13 10V2.61538C13 2.27552 12.7202 2 12.375 2H3.625C3.27982 2 3 2.27552 3 2.61538V10" stroke="#28282F" stroke-width="1.33333" stroke-linejoin="round"/>
                    <path d="M7.5 12H8.83333" stroke="#28282F" stroke-width="1.33333" stroke-linecap="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_951_535">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <input type="text" name="phone" v-model="phone" placeholder="Please enter Phone" style=" height: 34px;outline:none;color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
              </div>
            </div>
          </div>
          <div style="align-self: stretch; height: 48px; background: white; border-radius: 18px; flex-direction: column; justify-content: center; align-items: flex-start; display: flex">
            <div style="align-self: stretch; height: 36px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
              <div style="justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.6" clip-path="url(#clip0_951_3635)">
                    <path d="M16 0H0V16H16V0Z" fill="white" fill-opacity="0.01"/>
                    <path d="M1.33301 13H14.6663V8V3H7.99967H1.33301V8V13Z" stroke="#28282F" stroke-width="1.33333" stroke-linejoin="round"/>
                    <path d="M1.33301 3L7.99967 8L14.6663 3" stroke="#28282F" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_951_3635">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <input type="text" name="email" v-model="email" placeholder="Please enter E-mail" style=" height: 34px;outline:none;color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
              </div>
            </div>
          </div>
          <div style="padding-right: 8px;width: 100%; background: white; border-radius: 18px; justify-content: flex-start; align-items: center; display: inline-flex">
            <div style=" padding-top: 11px; min-height: 106px; padding-left: 12px; justify-content: flex-start; align-items: center; ">

              <textarea v-model="remark" style="width: 325px;min-height: 106px; outline:none; padding: 11px 12px; color: #101828; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word; border: none; resize: none;" placeholder="Please enter Message"></textarea>

              <!--              <div style="color: #101828; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px; word-wrap: break-word">Please enter Message</div>-->
            </div>
          </div>
            <div @click="submit" style="width: 100%; height: 48px; padding-left: 80px; padding-right: 80px; padding-top: 8px; padding-bottom: 8px; background: #F43F5E; border-radius: 12px; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="color: white; font-size: 16px; font-family: Ubuntu; font-weight: 500; line-height: 22px; word-wrap: break-word">Send</div>
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
      & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;
      }
    }
  }
}
</style>
