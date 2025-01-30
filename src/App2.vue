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
        <!-- Form Section Component -->
        <form-section v-model="formData" @close="isShowModal = false" />

        <!-- Preview message text -->
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
      // PhoneIcon,
      formData: {
        callType: "incoming_call",
        message: "",
        buttonText: "",
      },
    };
  },
};
</script>
