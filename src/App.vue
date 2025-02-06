<template>
  <div class="font-inter">
    <div>
      <button
        @click="isShowModal = true"
        class="rounded-2xl bg-slate-300 px-4 py-2"
      >
        Wa Call (click here)
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="isShowModal"
      class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-slate-400/65"
    >
      <div class="flex w-[696px] overflow-hidden rounded-2xl bg-white">
        <div class="relative w-[440px] flex-none px-6 pt-6 pb-24">
          <form-section v-model="formData" @close="isShowModal = false" />

          <div
            class="absolute bottom-0 left-0 flex h-[68px] w-full items-center justify-center gap-x-4 bg-white shadow-[0px_-8px_12px_0px_#0A0A0A0A]"
          >
            <button
              @click="isShowModal = false"
              class="rounded-full px-6 py-2 text-[#27B199] ring ring-[#27B199]"
            >
              Back
            </button>
            <button
              :disabled="isFormEmpty"
              @click="handleSendData"
              class="rounded-full bg-[#27B199] px-6 py-2 text-white disabled:cursor-not-allowed disabled:bg-[#ECECEC] disabled:text-[#A0A0A0]"
            >
              Send
            </button>
          </div>
        </div>
        <preview-message-section
          :formValue="formData"
        ></preview-message-section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormSection from "./components/FormSection.vue";
import PreviewMessageSection from "./components/PreviewSection.vue";

export default {
  name: "App",
  components: {
    FormSection,
    PreviewMessageSection,
  },
  data() {
    return {
      isShowModal: false,
      formData: {
        callType: "incoming_call",
        message: "",
        buttonText: "",
      },
    };
  },
  computed: {
    isFormEmpty() {
      if (this.formData.callType === "incoming_call") {
        return !this.formData.message || !this.formData.buttonText;
      }
      return !this.formData.message;
    },
  },
  methods: {
    handleSendData() {
      // Mencegah form kosong terkirim
      if (this.isFormEmpty) return;

      const baseUrlV3 = "https://qismo-stag.qiscus.io/whatsapp/v1";
      const appId = "kovof-naquwyqeens0t0a";
      const channelId = 960;
      const userEmail = 6287777060010;

      const headers = {
        Authorization: "Wb298q4uJvsWpd23cu0h",
        APP_ID: "kovof-naquwyqeens0t0a",
        "Qiscus-App-Id": "kovof-naquwyqeens0t0a",
        "App-Version": "default",
      };

      const url = `${baseUrlV3}/${appId}/${channelId}/messages`;
      const params = {
        recipient_type: "individual",
        to: userEmail,
        type: "interactive",
        interactive: {
          type: "list",
          // header: {
          //   type: "text",
          //   text: "header, keknya ngga kepake",
          // },
          body: {
            text: this.formData.message,
          },
          // footer: {
          //   text: "footer, keknya ngga kepake",
          // },
          action: {
            button: this.formData.buttonText,
            sections: [
              {
                title: "section-title1",
                rows: [
                  {
                    id: "unique-row-identifier1",
                    title: "row-title-content1",
                    description: "row-description-content1",
                  },
                ],
              },
              // {
              //   title: "section-title2",
              //   rows: [
              //     {
              //       id: "unique-row-identifier2",
              //       title: "row-title-content2",
              //       description: "row-description-content2",
              //     },
              //   ],
              // },
            ],
          },
        },
      };

      console.log(headers);

      axios
        .post(url, params, {
          headers: headers,
        })
        .then((response) => {
          console.log("Response dari server:", response.data);
          this.resetInteractiveCallForm();
        })
        .catch((error) => {
          console.error("Error:", error);
          this.error = "Terjadi kesalahan saat mengirim data";
        });
    },

    resetInteractiveCallForm() {
      this.formData = {
        callType: "incoming_call",
        message: "",
        buttonText: "",
      };
      this.isShowModal = false;
    },
  },
};
</script>
