<script setup lang="ts">
const activeNames = ref([]); // 用来控制展开的项

interface Panel {
  title: string;
  content: string;
  active: boolean;
}
const panels = ref([
  { title: "Will my personal information be kept confidential?", content: "Absolutely. At ClickVoice, your privacy and security are paramount. We take every measure to ensure the safety of your personal data. Your information is safeguarded, and we never share it with unauthorized parties without your explicit consent. ", active: false },
  { title: "Why should I choose ClickVoice?", content: "ClickVoice offers a seamless and secure platform for voice communication. With robust privacy measures, user-friendly interfaces, and a dedicated team ensuring a smooth experience, we prioritize user satisfaction and confidentiality above all else.", active: false },
  { title: "How can I speak in a voice room?", content: "To participate in a voice room, simply navigate to the designated room within ClickVoice and join the conversation. Once there, you'll be able to communicate verbally with others in the room.", active: false },
  { title: "What should I do if my screen freezes or the audio breaks up?", content: "If you encounter screen freezing or audio disruptions while using ClickVoice, first check your internet connection. Refreshing the page or rejoining the room might also resolve the issue. If problems persist, contact our support team for immediate assistance.", active: false },
  // Add more panels as needed
]);
const togglePanel = (panel: Panel,type: Number)  => {
  panel.active = !panel.active;
}
</script>
<template>

  <section class="section">

    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4" >
        <div style=" padding-left: 32px; padding-right: 32px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 64px; display: flex">
          <div style=" flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 32px; display: flex">
            <div style="align-self: stretch;width: 768px;  padding-top: 24px; border-top: 1px #EAECF0 solid; flex-direction: column; justify-content: flex-start; align-items: center; display: flex" v-for="(panel, index) in panels" :key="index">
              <div style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex">
                <div style="flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                  <div style="align-self: stretch; color: #101828; font-size: 18px; font-weight: normal; font-weight: 500; line-height: 28px; word-wrap: break-word">{{panel.title}}</div>
                  <div style="align-self: stretch; color: #667085; font-size: 18px;  font-weight: 300; line-height: 28px; word-wrap: break-word" v-if="panel.active">{{panel.content}}</div>
                </div>
                <div style="padding-top: 2px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                  <div style="width: 24px; height: 24px; position: relative" v-if="!panel.active" @click="togglePanel(panel,index)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div style="width: 24px; height: 24px; position: relative" v-if="panel.active" @click="togglePanel(panel,index)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 lg:hidden md">
      <div style=" flex-direction: column; justify-content: flex-start; align-items: center; gap: 64px; display: flex">
        <div style=" flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 32px; display: flex">
          <div style="align-self: stretch;  padding-top: 24px; border-top: 1px #EAECF0 solid; flex-direction: column; justify-content: flex-start; align-items: center; display: flex" v-for="(panel, index) in panels" :key="index">
            <div style="align-self: stretch; justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex">
              <div style="flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
                <div style="align-self: stretch; color: #101828; font-size: 14px; font-weight: normal; font-weight: 300; line-height: 28px; word-wrap: break-word">{{panel.title}}</div>
                <div style="align-self: stretch; color: #667085; font-size: 14px; font-weight: normal; font-weight: 300; line-height: 28px; word-wrap: break-word" v-if="panel.active">{{panel.content}}</div>
              </div>
              <div style="padding-top: 2px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                <div style="width: 24px; height: 24px; position: relative" v-if="!panel.active" @click="togglePanel(panel,index)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div style="width: 24px; height: 24px; position: relative" v-if="panel.active" @click="togglePanel(panel,index)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
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
      .accordion {
        max-width: 600px;
      }

      .panel {
        border: 1px solid #EAECF0;
        margin-bottom: 10px;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #F0F0F0;
        cursor: pointer;
      }

      .panel-title {
        flex: 1;
        font-weight: 300;
      }

      .toggle-icon {
        width: 20px;
        height: 20px;
        border: 2px #98A2B3 solid;
        transform: rotate(0deg);
        transition: transform 0.3s;
      }

      .toggle-icon.active {
        transform: rotate(180deg);
      }

      .panel-content {
        display: none;
      }

      .panel.active .panel-content {
        display: block;
      }
      .custom-row-height .el-collapse-item__header{
        line-height: 72px;
      }
      .custom-row-height .el-collapse-item {
        border-top: none; /* 移除顶部边框 */
      }
      .question{
        width: 800px;
        align-self: stretch; color: #101828; font-size: 18px; font-weight: normal; font-weight: 300;  word-wrap: break-word;
      }
      .answer{
        align-self: stretch; color: #667085; font-size: 18px; font-weight: normal; font-weight: 300; line-height: 28px; word-wrap: break-word;
      }
    }
    &.md {
      .accordion {
        max-width: 600px;
      }

      .panel {
        border: 1px solid #EAECF0;
        margin-bottom: 10px;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #F0F0F0;
        cursor: pointer;
      }

      .panel-title {
        flex: 1;
        font-weight: 300;
      }

      .toggle-icon {
        width: 20px;
        height: 20px;
        border: 2px #98A2B3 solid;
        transform: rotate(0deg);
        transition: transform 0.3s;
      }

      .toggle-icon.active {
        transform: rotate(180deg);
      }

      .panel-content {
        display: none;
      }

      .panel.active .panel-content {
        display: block;
      }
      .custom-row-height .el-collapse-item__header{
        line-height: 72px;
      }
      .custom-row-height .el-collapse-item {
        border-top: none; /* 移除顶部边框 */
      }
      .question{
        width: 400px;
        align-self: stretch; color: #101828; font-size: 18px; font-weight: normal; font-weight: 300;  word-wrap: break-word;
      }
      .answer{
        align-self: stretch; color: #667085; font-size: 18px; font-weight: normal; font-weight: 300; line-height: 28px; word-wrap: break-word;
      }
    }
  }
}
</style>
