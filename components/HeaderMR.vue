<template>
  <div>
    <header
        :class="{ 'header-container': headImg1,'header-container1':headImg }"
        class="fixed top-0 inset-x-0 z-20"
        :style="{ '--delay': '-' + scrollTop + 's','display':isLiveDetail ? 'none' : '' }"
    >
      <nav
          class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
          aria-label="Global"
      >
        <div class="flex justify-start mr-14">
          <nuxt-link
              to="/"
              class="-m-1.5 p-1.5 logo h-12"
              style="width: 27px;height: 28px"
              @click="activeNav = null"
          >
            <div class="hidden lg:flex h-full">
              <img
                  class="h-12 w-32"
                  :src="Logo"
                  alt="logo"
                  :style="{ '--delay': '-' + (299 - scrollTop) + 's' }"
              />
              <img
                  class="h-12 w-32"
                  :src="LogoBlack"
                  alt="crm-logo"
                  :style="{ '--delay': '-' + scrollTop + 's' }"
              />
              <div
                  style="color: #09090B; font-size: 15.90px; font-family: Figtree; font-weight: 700; line-height: 16px; word-wrap: break-word;margin-left: 25px;">
                AwazMingle
              </div>
            </div>
            <div class="lg:hidden h-full flex" v-if="!isLiveDetail">
              <img
                  class="h-12 w-32"
                  :src="Logo"
                  alt="crm-logo"
                  :style="{ '--delay': '-' + (299 - scrollTop) + 's' }"
              />
              <img
                  class="h-12 w-32"
                  :src="LogoBlack"
                  alt="crm-logo"
                  :style="{ '--delay': '-' + scrollTop + 's' }"
              />
              <div class="lg:hidden md"
                   style="margin-left:30px;color: #09090B; font-size: 14.67px; font-family: Figtree; font-weight: 700; line-height: 20.96px; word-wrap: break-word">
                AwazMingle
              </div>
              <!--              <div style="color: #09090B; font-size: 15.90px; font-family: Figtree; font-weight: 700; line-height: 22.71px; word-wrap: break-word;margin-left: 25px;">ClickVoice</div>-->
            </div>
          </nuxt-link>
        </div>
        <div class="flex lg:hidden items-center" v-if="!isLiveDetail">
          <div @click="mobileMenuOpen = true" class="more-icon">
            <img
                :style="{ '--delay': '-' + (299 - scrollTop) + 's' }"
                :src="MoreIconBlack"
                alt="更多"
            />
            <img
                :style="{ '--delay': '-' + scrollTop + 's' }"
                :src="MoreIconBlack"
                alt="更多"
            />
          </div>
        </div>
        <PopoverGroup class="hidden lg:flex lg:flex-2 lg:gap-x-10" style="margin-left:20% ;">
          <template v-for="(item, index) in navList" :key="index">
            <Popover class="relative" v-if="item.type === 'disclosure'">
              <PopoverButton
                  class="text-md leading-10 AlibabaPuHuiTi_2_75_SemiBold"
                  as="div"
                  :class="{ active: activeNav === index }"
              >
                <span
                    class="popoverText"
                    :style="{ '--delay': '-' + scrollTop + 's' }"
                    style="cursor: pointer"
                >
                  {{ item.label }}
                </span>
              </PopoverButton>
              <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                    class="absolute -left-8 top-full z-10 mt-3 w-52 overflow-hidden rounded-xl bg-white shadow-lg ring-1"
                >
                  <div
                      v-for="(item, index) in chengxuList"
                      @click="panelId = index"
                      :key="item.label"
                      class="py-4 px-5"
                      :style="{ backgroundColor: panelId === index ? '#EAF3FFFF' : 'none' }"
                      style="cursor: pointer"
                  >
                    <nuxt-link :to="item.href" target="_blank">
                      <div
                          class="pl-3 border-solid border-l-2 "
                          :class="{
                          'border-primary': panelId === index,
                          'border-my-gray-10': panelId !== index,
                        }"
                      >
                        <div
                            class="text-md"
                            :class="{
                            'text-primary': panelId === index,
                            'text-my-gray-85': panelId !== index,
                          }"
                        >
                          {{ item.label }}
                        </div>
                        <div
                            class="text-md"
                            :class="{
                            'text-primary-45': panelId === index,
                            'text-my-gray-45': panelId !== index,
                          }"
                        >
                          {{ item.desc }}
                        </div>
                      </div>
                    </nuxt-link>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
            <div
                v-else
                :class="{ active: activeNav === index }"
                :style="{ '--delay': '-' + scrollTop + 's' }"
            >
              <nuxt-link
                  :to="item.to"
                  class="text-md leading-10 AlibabaPuHuiTi_2_75_SemiBold popoverText"
                  :style="{ '--delay': '-' + scrollTop + 's' }"
                  @click="activeNav = index"
              >{{ item.label }}
              </nuxt-link
              >
            </div>
          </template>
        </PopoverGroup>
        <div class="hidden lg:flex lg:flex-auto lg:justify-end lg:items-center">
          <div v-if="!isLogin"
               style="width: 141px; height: 39px;  background: #000; border-radius: 12px; justify-content: center; align-items: center; gap: 8px; display: inline-flex">
            <div
                style="color: white; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
              <button @click="login">Sign up/Login</button>
            </div>
          </div>

          <span v-if="isLogin">
            <nuxt-link to="/recharge.html">
              <div
                  style=" padding-top: 2px; padding-bottom: 2px; padding-right: 24px; border-radius: 42px; justify-content: flex-start; align-items: center; gap: 6px; display: inline-flex">
                <div style="justify-content: flex-start; align-items: center; gap: 2px; display: flex">

                    <div
                        style="width: 26px; height: 26px; padding: 1.08px; justify-content: center; align-items: center; display: flex">
                      <img style="width: 23.83px; height: 23.83px" :src="Recharge"/>
                    </div>

                  <div
                      style="color: black; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word">{{
                      gold
                    }}</div>
                </div>
                <div style="justify-content: flex-start; align-items: center; display: flex">
                  <div
                      style="color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; word-wrap: break-word">Recharge</div>
                  <div style="width: 14px; height: 14px; position: relative">
                    <img style="width: 14px; height: 14px" :src="LoginLeft"/>
                  </div>
                </div>
              </div>
            </nuxt-link>
            <ElDropdown trigger="click">
              <div
                  style="width: 100%; height: 100%; padding-left: 24px; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                <img v-if="!isLogin" style="width: 26px; height: 26px; border-radius: 9999px" :src="Logo"/>
                <img v-if="isLogin" style="width: 26px; height: 26px; border-radius: 9999px"
                     :src="userInfo.userInfo.headImg"/>
                <div style="width: 16px; height: 16px; position: relative; ">
                  <img style="width: 16px; height: 16px;" :src="DropdownImg"/>
                  <!--                <div style="width: 8px; height: 4px; left: 6px; top: 12px; position: absolute; transform: rotate(-90deg); transform-origin: 0 0; border: 1px #09090B solid"></div>-->
                </div>
              </div>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem>
                    <div
                        style="width: 100%; height: 100%; padding: 16px; border-bottom: 1px #F4F4F5 solid; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
                      <img style="width: 32px; height: 32px; border-radius: 9999px" :src="userInfo.userInfo.headImg"/>
                      <div
                          style="color: black; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">{{
                          userInfo.userInfo.nickname
                        }}</div>
                    </div>
                  </ElDropdownItem>
                  <ElDropdownItem @click="loginOut">
                    <div style="color: black;font-size: 14px;font-weight: normal;font-weight: 500;line-height: 20px;"
                         @click="loginOut">Log out</div>
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </span>
        </div>
      </nav>
      <Dialog
          as="div"
          class="lg:hidden"
          @close="mobileMenuOpen = false"
          :open="mobileMenuOpen"
          v-if="!isLiveDetail"
      >
        <div class="fixed inset-0 z-10 z-20 w-full h-full" style="background: rgba(0, 0, 0, 0.5);"/>
        <DialogPanel
            class="fixed inset-y-0 right-0 z-10 w-9/12 overflow-y-auto bg-white sm:ring-gray-900/10 z-20"
        >
          <div style="position: relative;height: 100%;display: flex; flex-direction: column;">
            <div class="flex items-center justify-between px-4 py-4">
              <div to="/" class="-m-1.5 p-1.5" @click="activeNav = null">
                <img v-if="!isLogin"
                     class="h-10 w-auto"
                     :src="Logo"
                     alt="logo"
                     :style="{ '--delay': '-' + scrollTop + 's' }"
                />
                <img v-if="isLogin"
                     class=""
                     :src="userInfo.userInfo.headImg"
                     alt="logo"
                     :style="{ '--delay': '-' + scrollTop + 's', 'border-radius': '6.875rem','width': '2.75rem','height': '2.75rem' }"
                />
              </div>
              <button
                  type="button"
                  class="rounded-md text-gray-700"
                  @click="mobileMenuOpen = false"
              >
                <!-- <span class="sr-only">Close menu</span> -->
                <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
              </button>
            </div>
            <div class="flow-root" style="flex: 1; overflow-y: auto;" v-if="!isLiveDetail">
              <div class="divide-y divide-gray-500/10">
                <div>
                  <nuxt-link
                      to="/"
                      class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray AlibabaPuHuiTi_2_55_Regular"
                      @click="activeNav = null"
                  >Home
                  </nuxt-link
                  >
                  <template v-for="(item, index) in navList" :key="index">
                    <nuxt-link
                        v-if="item.label != 'Compliance'"
                        :to="item.to"
                        class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                        style="cursor: pointer"
                    >{{ item.label }}
                    </nuxt-link>
                  </template>
                  <NuxtLink to="/recharge.html"
                            class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                            style="cursor: pointer">
                    Recharge
                  </NuxtLink>
                  <div>
                    <div @click="openMoreMenu"
                         to=""
                         class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                         style="cursor: pointer"
                    >
                      <span>Compliance</span>
                      <span v-if="!openMoreMenuActive" style="float: right;padding-top: 10px;">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.96875 4.16699L14.5313 10.0003L7.96875 15.8337" stroke="#28282F"
                                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </span>
                      <span v-if="openMoreMenuActive" style="float: right;padding-top: 10px;">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8333 12.0312L9.99992 5.46875L4.16659 12.0313" stroke="#28282F"
                                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </span>
                    </div>
                    <div style="margin-left: 1rem;" v-if="openMoreMenuActive">
                      <nuxt-link
                          to="/compliance.html"
                          class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                          style="cursor: pointer"
                      ><span>Privacy Policy</span></nuxt-link>
                      <nuxt-link
                          to="/terms.html"
                          class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                          style="cursor: pointer"
                      ><span>Terms & Conditions</span></nuxt-link>
                      <nuxt-link
                          to="/cancellation.html"
                          class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                          style="cursor: pointer"
                      ><span>Return Refund & Cancellation Policy</span></nuxt-link>
                      <nuxt-link
                          to="/disclaimer.html"
                          class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                          style="cursor: pointer"
                      ><span>Disclaimer</span></nuxt-link>
                      <nuxt-link
                          to="/purchase.html"
                          class="block rounded-lg px-3 py-1.5 text-base leading-10 text-my-gray"
                          style="cursor: pointer"
                      ><span>Process Flow to Purchase the Product & Service</span></nuxt-link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div style="display: flex; justify-content: center;">
              <div v-if="!isLogin"
                   style="width: 70%;bottom: 0;position: sticky; display: grid;justify-content: center; padding-left: 15px; padding-right: 15px; padding-top: 15px; padding-bottom: 15px; border-radius: 12px; border: 1px #F43F5E solid; justify-content: center; align-items: center; display: inline-flex">
                <button @click="login2">
                  <div
                      style="color: #F43F5E; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">
                    Sign up/Login
                  </div>
                </button>
              </div>
              <div v-if="isLogin"
                   style=" bottom: 0; position: sticky; width: 90%;height: 5rem; background: #FAFAFA; border-radius: 0.75rem; flex-direction: column; justify-content: center; align-items: flex-start; gap: 0.625rem; display: inline-flex">
                <!-- 最左边的 div -->
                <div
                    style="justify-content: flex-start;margin-left: 4%; align-items: center; gap: 0.625rem; display: inline-flex">
                  <div style="border-radius: 0.5rem; justify-content: center; align-items: center; display: flex">
                    <img style="width: 2.75rem; height: 2.75rem; position: relative; border-radius: 6.875rem"
                         :src="userInfo.userInfo.headImg"/>
                  </div>
                  <div
                      style="flex-direction: column; justify-content: center; align-items: flex-start; gap: 0.25rem; display: inline-flex">
                    <div
                        style="color: #09090B; font-size: 0.875rem; font-weight: normal; font-weight: 500; line-height: 1.25rem; word-wrap: break-word">
                      {{ userInfo.userInfo.nickname }}
                    </div>
                    <div
                        style="color: #09090B; font-size: 0.75rem; font-weight: normal; font-weight: 400; line-height: 1rem; word-wrap: break-word">
                      {{ userInfo.userInfo.mobile }}
                    </div>
                  </div>
                </div>

                <!-- 最右边的 div -->
                <div @click="loginOut"
                     style="position: absolute; right: 1rem; top: 1.25rem; justify-content: center; align-items: center; display: inline-flex">
                  <div
                      style="width: 1.5rem; height: 1.5rem; padding-top: 0.17375rem; padding-bottom: 0.170625rem; padding-left: 0.235625rem; padding-right: 0.203125rem; justify-content: center; align-items: center; display: inline-flex">
                    <div style="width: 1.06125rem; height: 1.15625rem; position: relative">
                      <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8125 10.0225H0.771484" stroke="#09090B" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M9.88477 7.10645L12.8128 10.0224L9.88477 12.9384" stroke="#09090B" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path
                            d="M5.50439 5.38946V4.45646C5.50439 2.42146 7.15339 0.772461 9.18939 0.772461H14.0734C16.1034 0.772461 17.7484 2.41746 17.7484 4.44746V15.5875C17.7484 17.6225 16.0984 19.2725 14.0634 19.2725H9.17839C7.14939 19.2725 5.50439 17.6265 5.50439 15.5975V14.6555"
                            stroke="#09090B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <el-dialog
          v-model="centerDialogVisible"
          :close-on-press-escape="loginClose"
          :close-on-click-modal="loginClose"
          width="510"
          destroy-on-close
          :show-close="showClose"
          center
          class="login-dialog"
          append-to-body
      >
        <div
            style="width: 100%; height: 100%; padding-left: 90px; padding-right: 90px; padding-top: 32px; padding-bottom: 32px; background: white; border-radius: 12px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 48px; display: inline-flex">
          <div style="display: flex;justify-content: flex-start;align-items: center;gap: 16px;">
            <div>
              <img  width="50" height="50" alt="logo" :src="Logo"/>
            </div>
            <div
                style="color: #09090B; font-size: 20.38px; font-family: Figtree; font-weight: 700; line-height: 35.9px; word-wrap: break-word">
              AwazMingle
            </div>
          </div>
          <div
              style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 24px; display: flex">
            <div style="width: 420px;height: 62px;">
              <el-input
                  v-model="phoneNume"
                  @input="handleInput"
                  placeholder="Enter your mobile number"
                  class="input-with-select"
                  style="height: 62px;border: 0;font-size: 16px;"
              >
                <template #prepend>
                  <div style="display: flex;text-align: center;align-items: center;">
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                           xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="24" height="24" fill="url(#pattern0)"/>
                        <defs>
                          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_1413_3628" transform="scale(0.0138889)"/>
                          </pattern>
                          <image id="image0_1413_3628" width="72" height="72"
                                 xlink:href="data:image/png;base64,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"/>
                        </defs>
                      </svg>
                    </div>
                    <div
                        style="color: black; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word">
                      +91
                    </div>
                  </div>

                </template>
              </el-input>
            </div>
            <button @click="sendSms2(2)">
              <div
                  style="width: 420px; padding-top: 15px; padding-bottom: 15px; background: #F43F5E; border-radius: 7px; justify-content: center; align-items: center; display: inline-flex">
                <div
                    style="color: white; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">
                  Send OTP
                </div>
              </div>
            </button>
            <div
                style="width: 420px; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
              <div style="width: 24px; height: 24px; position: relative" v-if="!isArgee">
                <button @click="isArgee=true"><img :src="NoSelect" style="width: 24px; height: 24px;"></button>
              </div>
              <div style="width: 24px; height: 24px; position: relative" v-if="isArgee">
                <button @click="isArgee=false"><img :src="Select" style="width: 24px; height: 24px;"></button>
              </div>
              <div
                  style="width: 386px; color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">
                <span></span>I authorize Teller.zone & associated astrologers to contactme via email or phone or
                SMS.<br/>Any doubts, you can Check Terms & Conditions.
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
          v-model="sendSmsDialog"
          width="560"
          destroy-on-close
          :show-close="showClose"
          center
          class="login-dialog"
          append-to-body
      >
        <div
            style="width: 100%; height: 100%; padding-top: 32px; padding-bottom: 32px; background: white; border-radius: 12px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
          <div
              style="align-self: stretch; padding-left: 16px; padding-right: 78px; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <button @click="loginBack">
              <div style="width: 32px; height: 32px; position: relative; ">
                <img :src="LoginRight" style="width: 32px; height: 32px;">
                <!--              <div style="width: 16px; height: 8px; left: 12px; top: 24px; position: absolute; transform: rotate(-90deg); transform-origin: 0 0; border: 2.50px #475467 solid"></div>-->
              </div>
            </button>
            <div
                style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
              <div
                  style="width: 405px; text-align: center; color: #09090B; font-size: 20px; font-weight: normal; font-weight: 600; line-height: 28px; word-wrap: break-word">
                Enter the verification code
              </div>
              <div
                  style="width: 405px; text-align: center; color: #71717A; font-size: 16px; font-weight: normal; font-weight: 400; line-height: 24px; word-wrap: break-word">
                Please enter the OTP sent to +91{{ phoneNume }}
              </div>
            </div>
            <!--            <div style="width: 32px; height: 32px; position: relative; transform: rotate(-180deg); transform-origin: 0 0">-->
            <!--              <div style="width: 16px; height: 8px; left: 12px; top: 24px; position: absolute; transform: rotate(-90deg); transform-origin: 0 0; border: 2px solid"></div>-->
            <!--            </div>-->
          </div>
          <div
              style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex;margin-top: 52px;">
            <div class="digit-input-div"
                 style="width: 444.55px; border-radius: 21.82px; justify-content: center; align-items: center; gap: 8.18px; display: inline-flex">
              <input v-for="(digit, index) in digits" :key="index" @keydown="onKeyDown(index, $event)"
                     inputmode="numeric" pattern="[0-9]*" v-model="digits[index]" @input="onDigitInput(index)"
                     maxlength="1" class="digit-input"/>
            </div>
            <div style="width: 405px; text-align: center"><span
                style="color: #71717A; font-size: 16px; font-weight: normal; font-weight: 400; line-height: 24px; word-wrap: break-word">Haven't received your code? </span><span
                @click="reSendMsg"
                style="cursor: pointer; color: #F43F5E; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">Resend OTP</span>
            </div>
          </div>
          <div
              style="cursor: pointer; width: 420px; padding-top: 15px; padding-bottom: 15px; background: #F43F5E; border-radius: 7px; justify-content: center; align-items: center; display: inline-flex;margin-top: 52px;">
            <div
                style="color: white; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word"
                @click="sendSmsLogin">Verify
            </div>
          </div>
        </div>
      </el-dialog>
      <el-drawer
          v-model="drawer"
          :close-on-press-escape="loginClose"
          :close-on-click-modal="loginClose"
          :direction="direction"
          :append-to-body=true
          :visible="drawer"
          size="60%"
          title=""
          :with-header="false"
          :z-index=999 style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem">

        <div>
          <div
              style="width: 100%; height: 100%; padding-top: 6.83px; padding-bottom: 7.27px; padding-right: 0.83px; justify-content: center; align-items: flex-end; gap: 5.82px; display: inline-flex">
            <div style="width: 34.94px; height: 35.90px; position: relative">
              <img style="width: 2.18rem; height: 2.243rem; left: 0; top: 0; position: absolute" :src="Logo"/>
              <div
                  style="width: 2.35px; height: 9.36px; left: 5.48px; top: 10.59px; position: absolute; background: white; border-radius: 20.43px"></div>
              <div
                  style="width: 2.35px; height: 5.96px; left: 9.74px; top: 12.29px; position: absolute; background: white; border-radius: 20.43px"></div>
              <div
                  style="width: 2.35px; height: 20.10px; left: 14.10px; top: 5.22px; position: absolute; background: white; border-radius: 20.43px"></div>
              <div
                  style="width: 2.35px; height: 10.18px; left: 18.27px; top: 10.18px; position: absolute; background: white; border-radius: 20.43px"></div>
              <div
                  style="width: 2.35px; height: 5.96px; left: 22.51px; top: 12.29px; position: absolute; background: white; border-radius: 20.43px"></div>
            </div>
            <div
                style="color: #09090B; font-size: 20.38px; font-family: Figtree; font-weight: 700; line-height: 29.12px; word-wrap: break-word">
              ClickVoice
            </div>
          </div>
          <div
              style="width: 100%;  margin-top: 20px;  background: #F4F4F5; border-radius: 7px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
            <el-input
                v-model="phoneNume"
                placeholder="Enter your mobile number"
                class="input-with-select"
                inputmode="numeric"
                @input="handleInput"
                style="height: 3.8rem;border: 0"
            >
              <template #prepend>
                <div style="display: flex;text-align: center;align-items: center;">
                  <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect width="24" height="24" fill="url(#pattern0)"/>
                      <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_1413_3628" transform="scale(0.0138889)"/>
                        </pattern>
                        <image id="image0_1413_3628" width="72" height="72"
                               xlink:href="data:image/png;base64,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"/>
                      </defs>
                    </svg>
                  </div>
                  <div
                      style="color: black; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word">
                    +91
                  </div>
                </div>

              </template>
              <!--              <template #prepend>-->
              <!--                -->
              <!--                <el-select v-model="select1" placeholder="Select" style="width: 5rem; ">-->
              <!--                  <el-option label="+91" value="1" selected/>-->
              <!--                </el-select>-->
              <!--              </template>-->

            </el-input>
          </div>
          <div
              style="width: 100%;margin-top: 20px;  text-align: center; color: #71717A; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 16px; word-wrap: break-word">
            We will send you a one-time verification code through SMS.
          </div>

          <div @click="sendSms2(1)"
               style="cursor: pointer; width: 100%;margin-top: 20px;  height: 100%; padding-top: 15px; padding-bottom: 15px; background: #F43F5E; border-radius: 12px; justify-content: center; align-items: center; display: inline-flex">
            <div
                style="text-align: center; color: white; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">
              Send OTP
            </div>
          </div>
          <div
              style="display: inline-flex; margin-top: 50px; width: 100%; color: #71717A; font-size: 12px; font-weight: normal; font-weight: 400; line-height: 16px; word-wrap: break-word; align-items: center;">
            <div style="width: 2rem; height: 2rem; position: relative" v-if="!isArgee">
              <button @click="isArgee=true">
                <img :src="NoSelect" style="width: 100%; height: 100%; object-fit: cover; vertical-align: middle;">
              </button>
            </div>
            <div style="width: 2rem; height: 2rem; position: relative" v-if="isArgee">
              <button @click="isArgee=false">
                <img :src="Select" style="width: 100%; height: 100%; object-fit: cover; vertical-align: middle;">
              </button>
            </div>
            <span style="margin-left: 8px;">
              I authorize Teller.zone & associated astrologers to contact me via email or phone or SMS.<br/>
              Any doubts, you can check Terms & Conditions.
            </span>
          </div>


        </div>

      </el-drawer>

      <el-drawer v-model="drawer2" :direction="direction" :append-to-body=true :visible="drawer" size="50%"
                 title="I am the title" :with-header="false" :z-index=999
                 style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem">
        <div style=" justify-content: center; align-items: center;">
          <div
              style="width: 100%; text-align: center; color: #09090B; font-size: 18px; font-weight: normal; font-weight: 600; line-height: 28px;margin-top: 20px; word-wrap: break-word">
            Enter the verification code
          </div>
          <div
              style="width: 100%; text-align: center; color: #71717A; font-size: 14px; font-weight: normal; font-weight: 400; line-height: 20px;margin-top: 20px; word-wrap: break-word">
            Enter the secret code we sent to +91{{ phoneNume }}
          </div>
          <div
              style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 12px; display: flex;margin-top: 20px;">
            <div class="digit-input-div"
                 style=" border-radius: 21.82px; justify-content: center; align-items: center; gap: 8.18px; display: inline-flex">
              <input v-for="(digit, index) in digits" @keydown="onKeyDown(index, $event)" pattern="[0-9]*"
                     inputmode="numeric" :key="index" v-model="digits[index]" @input="onDigitInput(index)" maxlength="1"
                     class="digit-input"/>
            </div>
          </div>
          <div style="width: 100%; text-align: center;margin-top: 20px;"><span
              style="color: #71717A; font-size: 14px; font-weight: normal; font-weight: 500; line-height: 20px; word-wrap: break-word">Haven't received your code? </span><span
              @click="reSendMsg"
              style="cursor: pointer; color: #F43F5E; font-size: 14px; font-weight: normal; font-weight: 600; line-height: 20px; word-wrap: break-word">Resend OTP</span>
          </div>
          <div
              style="width: 100%; padding-top: 15px;margin-top: 20px; padding-bottom: 15px; background: #F43F5E; border-radius: 12px; justify-content: center; align-items: center; display: inline-flex">
            <div
                style="text-align: center; color: white; font-size: 16px; font-weight: normal; font-weight: 700; line-height: 24px; word-wrap: break-word">
              Verify
            </div>
          </div>
        </div>
      </el-drawer>

    </header>
  </div>


</template>
<script setup lang="ts">
import * as CryptoJS from 'crypto-js';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {ElMessage} from "element-plus";

import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {ChevronDownIcon, PhoneIcon, PlayCircleIcon} from "@heroicons/vue/20/solid";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
import Logo from "@/assets/images/logotwo.png";
import LogoBlack from "@/assets/images/logotwo-black.png";
import Select from "@/assets/images/login/select.png";
import NoSelect from "@/assets/images/login/no_select.png";
import LoginRight from "@/assets/images/login/login_right.png";
import LoginLeft from "@/assets/images/login/login_left.png";
import Recharge from "@/assets/images/login/recharge.png";
import DropdownImg from "@/assets/images/login/dropdown.png";
import axios from "axios";

import MoreIcon from "@/assets/images/index/more.png";
import MoreIconBlack from "@/assets/images/index/more-black.png";

const drawer = ref(false)
const drawer2 = ref(false)
const direction = "btt" as "btt";
const openMoreMenuActive = ref(false)
const gold = ref(0)
const scrollTop = ref(0);
const activeNav = ref(null);
const panelId = ref(0);
const isArgee = ref(false);
const showClose = ref(false);
const sendSmsDialog = ref(false);
const handleInput = () => {
  phoneNume.value = phoneNume.value.replace(/[^0-9]/g, '');
}

setInterval(() => {
  if (process.client) {
    let isLogin = window.localStorage.getItem('isNeedLogin')
    if (isLogin) {
      if (window.innerWidth <= 768) {
        drawer.value = true
      } else {
        centerDialogVisible.value = true
      }
      window.localStorage.removeItem('isNeedLogin')
    }
    if (window.innerWidth <= 768) {
      if (route.path.includes('liveDetail') || route.path.includes('voiceDetail')) {
        isLiveDetail.value = true
      } else {
        isLiveDetail.value = false
      }
    } else {
      isLiveDetail.value = false
    }
  }


}, 100);
const onKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && index > 0) {
    // 如果按下 Backspace 键且当前输入框不是第一个，将焦点退回到前一个输入框
    const nextInput = document.querySelector(`.digit-input:nth-child(${index})`);
    if (nextInput) {
      nextInput.focus();
    }
  }
}
const sendSms2 = async (type: number) => {
  if (!phoneNume.value) {
    ElMessage.error("Please input phone number");
    return
  }
  if (!isArgee.value) {
    ElMessage.error("Authorize agree Teller.zone & associated ");
    return
  }
  //发送验证码
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "packageAppId": runtimeConfig.public.VITE_PACKAGE_APP_ID,
      "productId": "301",
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "phone": phoneNume.value,
      "zone": "+1",
      "countryCode": "US",
      "device": "4c97a712e41ee1e9",
      "ip": "192.168.1.1",
      "sign": "230D74FD9DD4381C838B6C4CE3B031E3"
    },
    "userAuth": {
      "appId": "28cb238c-1f81-44e8-b41d-3e3dcf27c0de",
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodsendMessagemoduleuserrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
// 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref({});
  loginData.value = await useFetch(
      runtimeConfig.public.VITE_BASE_URL,
      {
        headers: {
          'module': 'user',
          'appId': 'v.u.sendMessage',
          'method': 'sendMessage',
          'appKey': runtimeConfig.public.VITE_APP_ENV_KEY,
          'sign': uppercaseHash,
          'timestamp': timestamp,
          'publicKey': runtimeConfig.public.VITE_PUBLIC_KEY,
          'rpcType': 'dubbo',
          //'secret': 'V3op8vdC3K47KR8R21k24B65D7LA93nuvfJGe26u3hW3KTXAEp602cUOXi4O2nJj',
          'appVersion': '1',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: requestData,
      }
  );
  if (loginData.value.data.code === 200) {

    if (type === 1) {
      drawer.value = false
      drawer2.value = true
    } else {
      sendSmsDialog.value = true;
      centerDialogVisible.value = false
    }
    setTimeout(() => {
      digits.value = ['', '', '', '', '', ''];
      const nextInput = document.querySelector(`.digit-input:first-child`);
      if (nextInput) {
        nextInput.focus();
      }
    }, 500);

  } else {
    ElMessage.error(loginData.value.data.message);
    return
  }

}

const reSendMsg = async () => {
  if (!phoneNume.value) {
    ElMessage.error("Please input phone number");
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
      "packageAppId": runtimeConfig.public.VITE_PACKAGE_APP_ID,
      "productId": "301",
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "phone": phoneNume.value,
      "zone": "+1",
      "countryCode": "US",
      "device": "4c97a712e41ee1e9",
      "ip": "192.168.1.1",
      "sign": "230D74FD9DD4381C838B6C4CE3B031E3"
    },
    "userAuth": {
      "appId": "28cb238c-1f81-44e8-b41d-3e3dcf27c0de",
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodsendMessagemoduleuserrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
// 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref({});
  loginData.value = await useFetch(
      runtimeConfig.public.VITE_BASE_URL,
      {
        headers: {
          'module': 'user',
          'appId': 'v.u.sendMessage',
          'method': 'sendMessage',
          'appKey': runtimeConfig.public.VITE_APP_ENV_KEY,
          'sign': uppercaseHash,
          'timestamp': timestamp,
          'publicKey': runtimeConfig.public.VITE_PUBLIC_KEY,
          'rpcType': 'dubbo',
          //'secret': 'V3op8vdC3K47KR8R21k24B65D7LA93nuvfJGe26u3hW3KTXAEp602cUOXi4O2nJj',
          'appVersion': '1',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: requestData,
      }
  );
  if (loginData.value.data.code === 200) {
    ElMessage.success(loginData.value.data.message);
  } else {
    ElMessage.error(loginData.value.data.message);
    return
  }
}
const loginBack = async () => {
  sendSmsDialog.value = false;
  centerDialogVisible.value = true;
}

const openMoreMenu = async () => {
  openMoreMenuActive.value = !openMoreMenuActive.value;
}

const chengxuList = [
  {
    label: "ClickVoice",
    desc: "",
    href: runtimeConfig.public.VITE_WEB_URL,
  },
];
const scrollToBottom = () => {
  if (process.client) {
    const element = document.documentElement; // 或者你想要滚动的特定元素
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const scrollTo = scrollHeight - clientHeight;

    // 使用滚动动画，如果需要
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }
}
const isLiveDetail = ref(false)
const isLogin = ref(false)
const digits = ref(['', '', '', '', '', '']);
const userInfo = ref({
  userInfo: {
    headImg: "",
    nickName: "",
  }
})
const onDigitInput = (type: number) => {
  digits.value[type] = digits.value[type].replace(/[^0-9]/g, '');
  if (digits.value[type].length === 1) {
    if (type < digits.value.length - 1) {
      const nextInput = document.querySelector(`.digit-input:nth-child(${type + 2})`);
      if (nextInput) {
        nextInput.focus();
      }
    } else {
      sendSmsLogin()
      //发送验证码，登录成功
    }
  }
}

const sendSmsLogin = async () => {
  //phoneNume.value = "2222211111";
  let password = '';//666666
  password = Object.values(digits.value).join('');
  if (String(password).length < 6 || String(password).length > 6) {
    ElMessage.error("Please input right phone verify code");
    return
  }
  // const loginData = ref("")
  const timestamp = new Date().getTime();
  const requestData = JSON.stringify({
    "baseParams": {
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "device": "4c97a712e41ee1e9",
      "lang": "en"
    },
    "business": {
      "accessToken": password,
      "accountType": 5,
      "countryCode": "US",
      "device": "4c97a712e41ee1e9",
      "phone": phoneNume.value,
      "zone": "+1",
      "appId": runtimeConfig.public.VITE_APP_ID,
      "appKey": runtimeConfig.public.VITE_APP_KEY,
      "productId": "301",
      "sign": "230D74FD9DD4381C838B6C4CE3B031E3"
    },
    "userAuth": {
      "appId": "28cb238c-1f81-44e8-b41d-3e3dcf27c0de",
      "device": "4c97a712e41ee1e9",
      "language": "en",
      "lat": "",
      "Ing": "",
      "region": ""
    }
  });
  const sign = "content" + requestData + 'methodthirdAuthmoduleuserrpcTypedubbotimestamp' + timestamp + runtimeConfig.public.VITE_APP_ENV_KEY;
  // 进行MD5哈希加密
  const hash = CryptoJS.MD5(sign).toString();
// 将MD5哈希值转为大写
  const uppercaseHash = hash.toUpperCase();
  const loginData = ref({});
  loginData.value = await useFetch(
      runtimeConfig.public.VITE_BASE_URL,
      {
        headers: {
          'module': 'user',
          'appId': 'v.u.thirdAuth',
          'method': 'thirdAuth',
          'appKey': runtimeConfig.public.VITE_APP_ENV_KEY,
          'sign': uppercaseHash,
          'timestamp': timestamp,
          'publicKey': runtimeConfig.public.VITE_PUBLIC_KEY,
          'rpcType': 'dubbo',
          //'secret': 'V3op8vdC3K47KR8R21k24B65D7LA93nuvfJGe26u3hW3KTXAEp602cUOXi4O2nJj',
          'appVersion': '1',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: requestData,
      }
  );
  if (loginData.value.data.code === 200) {
    localStorage.setItem('logindata', JSON.stringify(loginData.value.data.data));
    userInfo.value = loginData.value.data.data
    sendSmsDialog.value = false;
    window.location.reload()
    let redirectUrl = localStorage.getItem('isNeedLoginUrl')
    localStorage.removeItem('isNeedLoginUrl')
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
    // getGold()
    // isLogin.value = true;
    // ElMessage.success("提交成功");
  } else {
    digits.value = ['', '', '', '', '', ''];
    const nextInput = document.querySelector(`.digit-input:first-child`);
    if (nextInput) {
      nextInput.focus();
    }
    ElMessage.error(loginData.value.data.message);
  }
}
const loginOut = async () => {
  localStorage.removeItem('logindata');
  window.location.href = "/";
  isLogin.value = false;
  userInfo.value = {}
}
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
    // ElMessage.error(loginData.value.data.message);
  }
}

const navList = [
  // {label: "Live", to: "/live.html", toList: ["/live.html"]},
  {label: "Voice Chat Room", to: "/voice.html", toList: ["/voice.html"]},
  {label: "About Us", to: "/about.html", toList: ["/about.html"]},
  {label: 'Contact us', to: '', toList: []},
  {
    label: "Compliance",
    to: "/compliance.html",
    toList: ["/compliance.html", "/terms.html", "/cancellation.html", "/disclaimer.html", "/purchase.html"]
  },
  {label: 'Recharge', to: '', toList: []},
];
const headImg = ref(false)
const phoneNume = ref('')
const select = ref("1")
const select1 = ref("1")

const headImg1 = ref(true)
const centerDialogVisible = ref(false)
const sendSms = ref(false)
const login = async () => {
  centerDialogVisible.value = true
}
const loginClose = ref(true)
const login2 = async () => {
  mobileMenuOpen.value = false
  drawer.value = true
}


watch(
    route,
    () => {
      headImg.value = false
      headImg1.value = true
      activeNav.value = null
      if (route.query.type && route.query.type == '1') {
        scrollToBottom()
      }
      if (route.path.includes('liveDetail') || route.path.includes('voiceDetail') || route.path.includes('recharge')) {
        isLiveDetail.value = true
        if (process.client) {
          userInfo.value = JSON.parse(localStorage.getItem('logindata'))
          if (!userInfo.value) {
            loginClose.value = false
            isLogin.value = false
            if (window.innerWidth <= 768) {
              drawer.value = true
            } else {
              centerDialogVisible.value = true
            }

          }
        }
      }
      if (navList.find((item) => item.toList.includes(route.path)) || route.path.includes('news')) {
        let routePath = route.path;
        if (route.path.includes('compliance') || route.path.includes('terms') || route.path.includes('cancellation') || route.path.includes('disclaimer') || route.path.includes('purchase')) {
          routePath = '/compliance.html'
        }
        activeNav.value = navList.findIndex((item) => item.to === routePath);
      } else {
        activeNav.value = null;
      }
    },
    {immediate: true, deep: true},
);
const mobileMenuOpen = ref(false);
const handleScroll = () => {
  scrollTop.value =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  scrollTop.value = scrollTop.value > 299 ? 299 : scrollTop.value;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  userInfo.value = JSON.parse(localStorage.getItem('logindata'))
  if (userInfo.value) {
    isLogin.value = true
    getGold()
  }

});


onDeactivated(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>
<style>
.login-dialog {
  --el-dialog-padding-primary: 0px;
  --el-dialog-box-shadow: 0px;
  background: none;

}

.input-with-select .el-input-group__prepend {
  background: #F4F4F5;
}

.input-with-select .el-input__wrapper {
  background: #F4F4F5;
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
<style lang="scss">

@keyframes tofffbg {
  0% {
    background-color: rgba($color: #ffffff, $alpha: 0);
    box-shadow: none;
  }
  2% {
    background-color: rgba($color: #ffffff, $alpha: 1);
    box-shadow: 0px 6px 15px 0px rgba(178, 206, 228, 0.12);
  }
  100% {
    background-color: rgba($color: #ffffff, $alpha: 1);
    box-shadow: 0px 6px 15px 0px rgba(178, 206, 228, 0.12);
  }
}

@keyframes toblacktxt {
  from {
    color: #ffffff;
  }
  to {
    color: #263152a6;
  }
}

@keyframes toblacktxt {
  from {
    color: black;
  }
  to {
    color: black;
  }
}

@keyframes toBulebg {
  from {
    border-color: black;
  }
  to {
    border-color: black;
  }
}

@keyframes toBulebtn {
  from {
    background: #ffffff;
    color: #2680fb;
  }
  to {
    background: #2680fb;
    color: #ffffff;
  }
}

@keyframes toOpacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.digit-input {
  width: 54.55px;
  height: 60px;
  padding: 13.64px;
  background: #F5F6F8;
  border-radius: 10.91px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 13.64px;
  display: inline-flex;
  color: #131B23;
  font-size: 38.18px;
  font-family: Figtree;
  font-weight: 800;
  line-height: 32.73px;
  text-align: center;
}

.digit-input-div > input:focus {
  border: 2px solid #F43F5E;;
  outline: none; /* 移除默认的轮廓效果 */
}

.header-container {
  animation-name: tofffbg;
  animation-duration: 300s;
  animation-play-state: paused;
  animation-delay: var(--delay);

  .popoverText {
    animation-name: toblacktxt;
    animation-duration: 300s;
    animation-play-state: paused;
    animation-delay: var(--delay);
    color: black;
  }

  .mfsy {
    animation-name: toBulebtn;
    animation-duration: 300s;
    animation-play-state: paused;
    animation-delay: var(--delay);
  }

  .active {
    border-bottom: 2px solid black;
    animation-name: toBulebg;
    animation-duration: 300s;
    animation-play-state: paused;
    animation-delay: var(--delay);
  }

  .more-icon {
    position: relative;
    width: 24px;
    height: 24px;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      animation-name: toOpacity;
      animation-duration: 300s;
      animation-play-state: paused;
      animation-delay: var(--delay);
    }
  }

  .logo {
    position: relative;

    img {
      position: absolute;
      left: 0;
      top: 4px;
      width: 27.3px;
      height: 22px;
      animation-name: toOpacity;
      animation-duration: 300s;
      animation-play-state: paused;
      animation-delay: var(--delay);
    }
  }
}


@keyframes tofffbg1 {
  0% {
    background-color: rgba($color: #ffffff, $alpha: 0);
    box-shadow: none;
  }
  1% {
    background-color: rgba($color: #ffffff, $alpha: 1);
    box-shadow: 0px 6px 15px 0px rgba(178, 206, 228, 0.12);
  }
  100% {
    background-color: rgba($color: #ffffff, $alpha: 1);
    box-shadow: 0px 6px 15px 0px rgba(178, 206, 228, 0.12);
  }
}

@keyframes toblacktxt1 {
  from {
    color: #263152a6;
  }
  to {
    color: #263152a6;
  }
}

@keyframes toblacktxt1 {
  from {
    color: #263152a6;
  }
  to {
    color: #263152a6;
  }
}

@keyframes toBulebg1 {
  from {
    border-color: #016aea;
  }
  to {
    border-color: #016aea;
  }
}

@keyframes toBulebtn1 {
  from {
    background: #2680fb;
    color: #ffffff;
  }
  to {
    background: #2680fb;
    color: #ffffff;
  }
}

@keyframes toOpacity1 {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}

.header-container1 {
  animation-name: tofffbg1;
  animation-duration: 300s;
  animation-play-state: paused;
  animation-delay: var(--delay);

  .popoverText {
    animation-name: toblacktxt1;
    animation-duration: 300s;
    animation-play-state: paused;
    animation-delay: var(--delay);
    color: black;
  }

  .mfsy {
    animation-name: toBulebtn1;
    animation-duration: 300s;
    animation-play-state: paused;
    animation-delay: var(--delay);
  }

  .active {
    border-bottom: 2px solid #ffffff;
    animation-name: toBulebg1;
    animation-duration: 300s;
    animation-play-state: paused;
    animation-delay: var(--delay);
  }

  .more-icon {
    position: relative;
    width: 24px;
    height: 24px;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      animation-name: toOpacity1;
      animation-duration: 300s;
      animation-play-state: paused;
      animation-delay: var(--delay);
    }
  }

  .logo {
    position: relative;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 131px;
      animation-name: toOpacity1;
      animation-duration: 300s;
      animation-play-state: paused;
      animation-delay: var(--delay);
    }
  }
}

</style>
