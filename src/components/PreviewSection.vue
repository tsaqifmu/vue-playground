<template>
  <div class="flex-auto bg-[#E5DDD5]">
    <div class="w-full p-6">
      <h3 class="text-base font-semibold text-[#0A0A0A]">Preview</h3>
      <div
        class="mt-[14px] flex w-[208px] flex-col gap-y-4 rounded-lg bg-white p-4 text-sm font-medium break-words"
      >
        <p
          v-if="formValue.callType === 'outgoing_call'"
          v-html="messageContent"
        ></p>
        <p v-else>{{ messageContent }}</p>
        <hr class="h-px border-0 bg-[#ECECEC]" />
        <div class="flex items-center justify-center gap-x-2">
          <img
            v-if="showIncomingCallIcon"
            :src="PhoneIcon"
            alt="phone"
            class="h-4 w-4"
          />
          <p
            v-if="formValue.callType === 'outgoing_call'"
            v-html="buttonContent"
            class="text-center text-[#007BFF]"
          ></p>
          <p v-else class="text-center text-[#007BFF]">
            {{ buttonContent }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneIcon from "../assets/phone.svg";

export default {
  name: "PreviewMessageSection",
  props: {
    formValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      PhoneIcon,
      outgoingMessage:
        "<strong>Can {{Company name}} call you?</strong> <br/> <span> Choosing Yes Allows a call in the next 3 days </span>",
      outgoingButtonText:
        " <span> Customer response </span> <br/> <span> Yes or No</span>",
    };
  },
  computed: {
    messageContent() {
      return this.formValue.callType === "outgoing_call"
        ? this.outgoingMessage
        : this.formValue.message || "-";
    },
    buttonContent() {
      return this.formValue.callType === "outgoing_call"
        ? this.outgoingButtonText
        : this.formValue.buttonText || "-";
    },
    showIncomingCallIcon() {
      return this.formValue.callType === "incoming_call";
    },
  },
};
</script>
