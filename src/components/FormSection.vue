<template>
  <div class="relative w-[440px] flex-none px-6 pt-6 pb-24">
    <h3 class="text-xl font-semibold text-[#0A0A0A]">Send Interactive Call</h3>

    <!-- Call Type Input Radio -->
    <div class="mt-6">
      <p class="text-sm font-normal text-gray-400">Call Type</p>
      <div class="mt-4 flex gap-x-8">
        <div
          v-for="(item, index) in callType"
          :key="index"
          class="relative flex items-center gap-x-3"
        >
          <input
            type="radio"
            name="callType"
            v-model="formValue.callType"
            :value="item.value"
            :id="`callType` + item.value"
            @change="handleCallTypeChange(item.value)"
            class="h-5 w-5 rounded-full border-2 border-emerald-500 checked:border-emerald-500 checked:bg-white"
          />
          <label
            v-text="item.label"
            :for="`callType` + item.value"
            :class="{ 'font-medium': formValue.callType === item.value }"
            class="text-sm"
          ></label>
        </div>
      </div>
    </div>

    <!-- Message Text Input Text -->
    <div class="relative">
      <p class="mt-6 text-sm text-[#565656]">Message</p>
      <textarea
        type="text"
        placeholder="Type your message "
        v-model="formValue.message"
        :maxlength="MESSAGE_MAX_LENGTH"
        :disabled="formValue.callType === 'outgoing_call'"
        class="mt-2 h-[116px] w-full rounded-lg bg-white p-4 text-sm font-medium drop-shadow-xl placeholder:text-sm placeholder:text-[#A0A0A0] disabled:cursor-not-allowed disabled:bg-[#ECECEC] disabled:text-[#A0A0A0]"
      ></textarea>
      <p
        v-if="formValue.callType !== 'outgoing_call'"
        class="absolute right-5 bottom-3 text-xs font-semibold"
      >
        {{ formValue.message.length }}/{{ MESSAGE_MAX_LENGTH }}
      </p>
    </div>

    <!-- Button Call Input Text  -->
    <div v-if="formValue.callType === 'incoming_call'" class="relative">
      <p class="mt-6 text-sm text-[#565656]">Button Call</p>
      <textarea
        placeholder="Type your button Call "
        type="text"
        v-model="formValue.buttonText"
        :maxlength="BUTTON_MAX_LENGTH"
        class="mt-2 h-[72px] w-full rounded-lg bg-white p-4 text-sm font-medium drop-shadow-xl placeholder:text-sm placeholder:text-[#A0A0A0]"
      ></textarea>
      <p class="absolute right-5 bottom-3 text-xs font-semibold">
        {{ formValue.buttonText.length }}/{{ BUTTON_MAX_LENGTH }}
      </p>
    </div>

    <!-- Button Close & Send -->
    <div
      class="absolute bottom-0 left-0 flex h-[68px] w-full items-center justify-center gap-x-4 bg-white shadow-[0px_-8px_12px_0px_#0A0A0A0A]"
    >
      <button
        @click="handleBack"
        class="rounded-full px-6 py-2 text-[#27B199] ring ring-[#27B199]"
      >
        Back
      </button>
      <button
        :disabled="isFormEmpty"
        class="rounded-full bg-[#27B199] px-6 py-2 text-white disabled:cursor-not-allowed disabled:bg-[#ECECEC] disabled:text-[#A0A0A0]"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormSection",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      MESSAGE_MAX_LENGTH: 512,
      BUTTON_MAX_LENGTH: 20,

      callType: [
        { label: "Incoming Call", value: "incoming_call" },
        { label: "Outgoing Call", value: "outgoing_call" },
      ],
      defaultOutgoingMessage:
        "Can {{Company name}} call you? Choosing Yes allows a call in the next 3 days",
    };
  },

  computed: {
    formValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },

    isFormEmpty() {
      if (this.formValue.callType === "incoming_call") {
        return !this.formValue.message || !this.formValue.buttonText;
      }
      return !this.formValue.message;
    },
  },

  methods: {
    handleBack() {
      this.$emit("close");
    },

    handleCallTypeChange(newVal) {
      // Reset form fields first
      this.formValue.message = "";
      this.formValue.buttonText = "";

      // Then set new values based on condition
      if (newVal === "outgoing_call") {
        this.formValue.message = this.defaultOutgoingMessage;
        this.formValue.buttonText = "Customer response Yes or No";
      }
      console.log("value input radio", newVal);
    },
  },
};
</script>
