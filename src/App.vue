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

      console.log("Form Data:", this.formData);

      // Optional: Reset form dan tutup modal setelah mengirim
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        callType: "incoming_call",
        message: "",
        buttonText: "",
      };
      this.isShowModal = false;
    },
  },

  // watch: {
  //   "formData.message"(val) {
  //     console.log("message", val);
  //   },
  // },
};
</script>
