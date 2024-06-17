<script setup lang="ts">

</script>
<template>
  <section class="section">

    <MySwiper/>
    <section class=" hidden lg:flex lg">
      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag"
           style="width: 100%; height: 100%; justify-content: center; position: relative; padding-top: 16px; padding-bottom: 16px; margin: 0 auto auto auto;">
        <!--        <div style="justify-content: center; align-items: center; gap: 4px; display: flex;position: relative">-->
        <div
            style="justify-content: center;flex-direction: column ;align-items: center; display: flex;position:absolute;top: -200px;">
          <div class="top-tips">
            We value your rights.
          </div>
          <div class="top-title">
            Compliance
          </div>
        </div>
        <!--        </div>-->
      </div>

    </section>
    <!--    <section class=" hidden lg:flex lg">-->
    <!--      <div class="lg:p-6 lg:px-4 py-2 px-4 items-center flex max-w-7xl header-tag" style="width: 100%; height: 100%; padding-top: 16px; padding-bottom: 16px; margin: 100px auto auto auto;">-->
    <!--        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">-->
    <!--          <div style="justify-content: flex-start; align-items: center; display: flex">-->
    <!--            <div style="color: rgba(0, 0, 0, 0.40); font-size: 14px;  font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/">Home</nuxt-link></div>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
    <!--              <path d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z" fill="black" fill-opacity="0.4"/>-->
    <!--            </svg>-->
    <!--          </div>-->
    <!--          <div style="justify-content: flex-start; align-items: center; display: flex">-->
    <!--            <div style="color: rgba(0, 0, 0, 0.90); font-size: 14px;  font-weight: 400; line-height: 20px; word-wrap: break-word"><nuxt-link to="/cancellation.html">Return Refund & Cancellation Policy</nuxt-link></div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--    </section>-->
    <section class="p-3 lg:hidden md header-tag">
      <div
          style="position:absolute;top:11vh;left:20vw;z-index:1;color: #050505;font-family: Archivo;font-size: 26px;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: -0.524px;">
        <div>Return Refund & Cancellation Policy</div>
      </div>
      <!--      <div-->
      <!--          style="width: 100%; height: 100%;margin-top: 30px;   justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">-->
      <!--        <div style="justify-content: flex-start; align-items: center; display: flex">-->
      <!--          <div-->
      <!--              style="color: rgba(0, 0, 0, 0.40); font-size: 14px;  font-weight: 400; line-height: 20px; word-wrap: break-word">-->
      <!--            <nuxt-link to="/">Home</nuxt-link>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path-->
      <!--                d="M1.4603 9.45923L0.541064 8.53999L4.08144 4.99961L0.541064 1.45923L1.4603 0.539989L5.91992 4.99961L1.4603 9.45923Z"-->
      <!--                fill="black" fill-opacity="0.4"/>-->
      <!--          </svg>-->
      <!--        </div>-->
      <!--        <div style="justify-content: flex-start; align-items: center; display: flex">-->
      <!--          <div-->
      <!--              style="color: rgba(0, 0, 0, 0.90); font-size: 14px;  font-weight: 400; line-height: 20px; word-wrap: break-word">-->
      <!--            <nuxt-link to="/cancellation.html">Return Refund & Cancellation Policy</nuxt-link>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </section>
  </section>
  <section class="section">
    <section class="hidden lg:flex lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 lg:p-6 lg:px-4"
           style="width: 100%; height: 100%;  padding-top: 30px; padding-bottom: 30px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 32px; display: inline-flex">
        <!--        <div style="align-self: stretch; height: 44px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 24px; display: flex">-->
        <!--          <div style="align-self: stretch; color: #101828; font-size: 36px;  font-weight: 600; line-height: 44px; word-wrap: break-word">Compliance</div>-->
        <!--        </div>-->
        <div style="justify-content: flex-start; align-items: flex-start; gap: 40px; display: inline-flex">
          <div
              style="border-radius: 8px; border: 1px #DBE2E7 solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
            <div
                style="height: 80px; padding-top: 20px;padding-left: 20px; padding-bottom: 20px; padding-right: 40px; justify-content: flex-start; align-items: center; gap: 17px; display: inline-flex">
              <nuxt-link :to="'/compliance.html'">
                <div
                    style="width: 260px; font-size: 18px; color: #09090B;/* text-lg/semibold */ font-family:  Archivo; font-weight: 600; line-height: 28px; word-wrap: break-word">
                  Privacy Policy
                </div>
              </nuxt-link>
            </div>
            <div
                style="height: 80px; padding-top: 26px; padding-bottom: 26px; padding-left: 20px; padding-right: 132px; justify-content: flex-start; align-items: center; display: inline-flex">
              <nuxt-link :to="'/terms.html'">
                <div
                    style="font-size: 18px; color: #09090B;/* text-lg/semibold */ font-family:  Archivo; font-weight: 600; line-height: 28px; word-wrap: break-word">
                  Terms & Conditions
                </div>
              </nuxt-link>
            </div>
            <div
                style="height: 80px; padding-top: 12px; padding-bottom: 12px;  padding-right: 47px; justify-content: flex-start; align-items: center;gap: 17px; display: inline-flex">
              <div style="width: 3px; height: 40px; background: #09090B"></div>
              <nuxt-link :to="'/cancellation.html'">
                <div
                    style="width: 253px; font-size: 18px; color: #09090B;/* text-lg/semibold */ font-family:  Archivo; font-weight: 600; line-height: 28px; word-wrap: break-word">
                  Return Refund & Cancellation Policy
                </div>
              </nuxt-link>
            </div>
            <div
                style="width: 320px; height: 80px; padding-top: 26px; padding-bottom: 26px; padding-left: 20px; padding-right: 210px; justify-content: flex-start; align-items: center; display: inline-flex">
              <nuxt-link :to="'/disclaimer.html'">
                <div
                    style="font-size: 18px; color: #09090B;/* text-lg/semibold */ font-family:  Archivo; font-weight: 600; line-height: 28px; word-wrap: break-word">
                  Disclaimer
                </div>
              </nuxt-link>
            </div>
            <div
                style="height: 80px; padding-top: 12px; padding-bottom: 12px; padding-left: 20px; padding-right: 56px; justify-content: flex-start; align-items: center; display: inline-flex">
              <nuxt-link :to="'/purchase.html'">
                <div
                    style="width: 244px; font-size: 18px; color: #09090B;/* text-lg/semibold */ font-family:  Archivo; font-weight: 600; line-height: 28px; word-wrap: break-word">
                  Process Flow to Purchase the Product & Service
                </div>
              </nuxt-link>
            </div>
          </div>
          <div
              style="padding-bottom: 40px; padding-left: 40px; padding-right: 40px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
            <div
                style="font-size: 18px; color: #09090B;/* text-lg/semibold */ font-family:  Archivo; font-weight: 600; line-height: 28px; word-wrap: break-word">
              Return Refund & Cancellation Policy
            </div>
            <div
                style="width: 780px; height: 909px; color: #828C9D; font-size: 14px;  font-weight: 300; line-height: 20px; word-wrap: break-word">
              PMmax Technology Limited (the “Company”)’s AML/CFT Policy is designed to ensure that the Company complies
              with the requirements and obligations set out in Hong Kong and international legislations, regulations,
              rules and Industry Guidance for the Money Service Operators (MSO) sector, including the need to have
              adequate systems and controls in place to mitigate the risk of the firm being used to facilitate financial
              crime. The AML Policy sets out the minimum standards which must be complied with by the Company and
              employees and includes:<br/><br/>• Establishing and maintaining a Risk Based Approach (RBA) towards
              assessing and managing the money laundering and terrorist financing risks to the Company;<br/>•
              Establishing and maintaining risk-based customer due diligence, identification, verification and know your
              customer (KYC) procedures, including enhanced due diligence for those customers presenting higher risk,
              such as Politically Exposed Persons (PEPs) and Correspondent Banking Relationships;<br/>• Establishing and
              maintaining risk-based systems and procedures to monitor ongoing customer activity;<br/>• Procedures for
              reporting suspicious activity internally and to the relevant law enforcement authorities as
              appropriate;<br/>• Procedures for reporting suspicious fraudulent use of identification documents to the
              relevant law enforcement authorities (e.g. JFIU) as appropriate;<br/>• The maintenance of appropriate
              records for the minimum prescribed periods;<br/>• The appointment of a Compliance Officer (CO) and Money
              Laundering Reporting Officer (MLRO) of sufficient seniority, who have responsibility for oversight of the
              Company and Business Unit;<br/>• Training and awareness for all relevant employees;<br/>• Provision of
              appropriate management information and reporting to senior management of the Company;<br/>• The Company
              may require its clients to provide additional information or documentation to fulfil our legal obligations
              and where it deems appropriate refuse any client or transaction that is suspected of being related to
              financial crime.<br/><br/>PMmax Technology Limited (the “Company”)’s AML/CFT Policy is designed to ensure
              that the Company complies with the requirements and obligations set out in Hong Kong and international
              legislations, regulations, rules and Industry Guidance for the Money Service Operators (MSO) sector,
              including the need to have adequate systems and controls in place to mitigate the risk of the firm being
              used to facilitate financial crime. The AML Policy sets out the minimum standards which must be complied
              with by the Company and employees and includes:<br/><br/>• Establishing and maintaining a Risk Based
              Approach (RBA) towards assessing and managing the money laundering and terrorist financing risks to the
              Company;<br/>• Establishing and maintaining risk-based customer due diligence, identification,
              verification and know your customer (KYC) procedures, including enhanced due diligence for those customers
              presenting higher risk, such as Politically Exposed Persons (PEPs) and Correspondent Banking
              Relationships;<br/>• Establishing and maintaining risk-based systems and procedures to monitor ongoing
              customer activity;<br/>• Procedures for reporting suspicious activity internally and to the relevant law
              enforcement authorities as appropriate;<br/>• Procedures for reporting suspicious fraudulent use of
              identification documents to the relevant law enforcement authorities (e.g. JFIU) as appropriate;<br/>• The
              maintenance of appropriate records for the minimum prescribed periods;<br/>• The appointment of a
              Compliance Officer (CO) and Money Laundering Reporting Officer (MLRO) of sufficient seniority, who have
              responsibility for oversight of the Company and Business Unit;<br/>• Training and awareness for all
              relevant employees;<br/>• Provision of appropriate management information and reporting to senior
              management of the Company;<br/>• The Company may require its clients to provide additional information or
              documentation to fulfil our legal obligations and where it deems appropriate refuse any client or
              transaction that is suspected of being related to financial crime.
            </div>
          </div>
        </div>
      </div>

    </section>
    <section class="p-3 lg:hidden md">
      <div>
        <div
            style="width: 100%; color: #101828; font-size: 18px;  font-weight: 300; line-height: 28px; word-wrap: break-word">
          Return Refund & Cancellation Policy
        </div>
        <div
            style="width: 100%; margin-top: 1rem; color: #667085; font-size: 14px;  font-weight: 300; line-height: 20px; word-wrap: break-word">
          Privacy PolicyThis privacy policy forms a part of the terms of use/terms and conditions of use agreed between
          you and SELEADMG DIGITAL SOLUTION PRIVATE LIMITED(the “Company”), and governs the Company’s policies regarding
          collection, use, disclosure and protection of your sensitive information in the course of provision of
          services (the “Services”) in relation to Teller website (the “Platform”).You may not avail the Services
          without accepting this policy. Your access and use of the Platform constitutes your acceptance of this policy.
          The Company may amend this policy from time to time without prior notice to you, and such updated policy shall
          be effective immediately upon becoming available on the Platforms. Your continued access or use of the
          Platform after such posting constitutes your consent to be bound by such amended policy.The words and phrases
          used herein and not otherwise defined shall have the meanings set forth in the applicable agreement governing
          the terms of use for access to the Platforms and Services.By accessing the Platforms, you agree and consent to
          the collection, transfer, use, storage, disclosure and sharing of your information in the manner described
          hereunder.I. DISCLAIMERThe Services may be made available or accessed in connection with third-party services
          and content (including advertisement) that the Company does not control. You acknowledge that such third-party
          services may also collect your information, which shall be governed by a separate privacy policy. This policy
          shall not apply to any information you may disclose to any third-party in connection with your availing of the
          Services. Any information freely available or accessible in public domain shall not form part of your
          sensitive personal data or information. The Company is not responsible for the authenticity and completeness
          of your information.II. How We Collect InformationDuring your use of Teller products and services, we will
          collect information voluntarily provided by you during, and generated from, your use of services in the
          following ways for the purpose of providing and improving our services and safeguarding your account
          security.1. We Collect Personal Data You Provide(i) Create or update your account on the Platform (“Account”),
          which may include your name, email address, mobile phone number, login name and password, payment or banking
          information, place of birth, date of birth, time of birth and profile picture. If your Account is created
          through third-party sign-in services such as Facebook, Google or any other similar site, you authorize the
          Company to obtain the available information of the foregoing nature;(ii) Avail the Services, including by way
          of joining live sessions and participating in public chats and discussions, by placing calls through the
          Platform, or by purchasing credits at which time payment related information may be collected and stored in
          order to automatically complete forms for future transactions;(iii) Provide content, including reviews,
          details of availed Services and history, app interactions, special requests, contact information of people
          referred to us, and any other information provided in this regard;(iv) Correspond with Company’s customer
          service associates;(v) Participate in interactive services, such as discussion boards, competitions,
          promotions or surveys, other social media events or make payment etc.;(vi) Enable features that require
          Company’s access to your address book or calendar;(vii) Report problems for troubleshooting.2. Personal Data
          We Receive From Your Device(i) When you communicate using the Platform (via messages or phone call), the
          Company may retain a copy of such communication in order to ensure quality of service and provide customer
          support;(ii) When you access the Platform or avail the Services, the Company may, depending on mobile
          permissions, collect your real time information, or approximate location information as determined through
          data such as GPS or IP address. The Company may also collect information about the devices you use to access
          the Services, including hardware models, operating systems and versions, software, file names and versions,
          preferred languages, unique device identifiers, advertising identifiers, serial numbers, device motion
          information and mobile network information. Analytics companies may use mobile device IDs to track your usage
          of the Platform / Services.(iii) When you make a transaction in relation to availing Services, the Company may
          collect transaction details and information about your activity on the Services, including the full Uniform
          Resource Locators (URL), the nature of Services availed, comments, search results, number of clicks,
          information and pages viewed, the order of those pages, length of your visit to an application, date and time
          of your usage of Services, amounts charged, details regarding promo codes, methods used to browse and any
          phone number used to call the Company’s customer service associates.(iv) When you access the Platform, the
          Company may access metadata and other information associated with other files stored on your mobile device.
          This may include, for example, photographs, audio and video clips, personal contacts and address book
          information.III. How Do We Use Your Information1. The Company may use the information collected for following
          purposes, including:(i) To provide, personalise, maintain and improve the Services, and enable features to
          personalise your Account;(ii) To administer and enhance the security of the Services and for internal
          operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes;(iii)
          To provide you with information about services the Company may consider similar to those that you are already
          using, or have enquired about, or may interest you. The Company may contact you by electronic means (e-mail or
          SMS or telephone) with information about these services;(iv) To generate and review reports and data about,
          and to conduct research on user base and usage patterns;(v) To allow you to participate in interactive
          features of the Services, if any;(vi) To measure or understand the effectiveness of advertising and others,
          and to deliver relevant advertising to you; and(vii) To carry out any other obligations arising under any
          agreement between the Company and you.2. The Company may combine the information received from third parties
          with the information you give and information collected about you for the purposes set out above. Further, the
          Company may anonymize and/or de-identify information collected from you through the Services or via other
          means, including via the use of third-party web analytic tools. Illustratively, your information regarding IP
          address, visit times and phone model are anonymized. Information about calls / messages placed in relation to
          the Services may be an
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
        display: inline-flex;
        padding: 7px 14px;
        justify-content: center;
        align-items: center;
        gap: 10px;
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
        margin: .5rem;
      }
    }
  }
}
</style>
