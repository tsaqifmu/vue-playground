<template>
  <div class="flex-auto bg-[#E5DDD5]">
    <div class="w-full p-6">
      <h3 class="text-base font-semibold text-[#0A0A0A]">Preview</h3>
      <div
        class="mt-[14px] flex w-[208px] flex-col gap-y-4 rounded-lg bg-white p-4 text-sm font-medium break-words"
      >
        <p>{{ formValue.message || "-" }}</p>
        <hr class="h-px border-0 bg-[#ECECEC]" />
        <div class="flex items-center justify-center gap-x-2">
          <img
            v-if="formValue.callType === 'incoming_call'"
            :src="PhoneIcon"
            alt="phone"
            class="h-4 w-4"
          />
          <p class="text-center text-[#007BFF]">
            {{ formValue.buttonText || "-" }}
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
    };
  },
};
</script>
