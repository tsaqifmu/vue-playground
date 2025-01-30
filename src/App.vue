<template>
  <!-- Tombol untuk membuka modal -->
  <div>
    <button
      style="
        width: fit-content;
        padding: 2px 3px;
        background-color: green;
        color: white;
        cursor: pointer;
      "
      @click="showModal = true"
    >
      <h1>Call WA</h1>
    </button>

    <!-- Modal -->
    <div
      v-if="showModal"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div
        style="
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
        "
      >
        <h2>Send Interactive Call</h2>

        <!-- Call Type Selection -->
        <div style="margin: 20px 0">
          <div style="margin-bottom: 10px">Call type</div>
          <div style="display: flex; gap: 20px">
            <label style="display: flex; align-items: center; gap: 5px">
              <input type="radio" v-model="callType" value="incoming" />
              Incoming Call
            </label>
            <label style="display: flex; align-items: center; gap: 5px">
              <input type="radio" v-model="callType" value="outgoing" />
              Outgoing Call
            </label>
          </div>
        </div>

        <!-- Message Input -->
        <div style="margin: 20px 0">
          <div style="margin-bottom: 10px">Message</div>
          <textarea
            v-model="message"
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
            "
            rows="4"
          ></textarea>
          <div style="text-align: right; color: #666; font-size: 12px">
            {{ message.length }}/512
          </div>
        </div>

        <!-- Button Call Input -->
        <div style="margin: 20px 0">
          <div style="margin-bottom: 10px">Button Call</div>
          <input
            type="text"
            v-model="buttonText"
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
            "
          />
          <div style="text-align: right; color: #666; font-size: 12px">
            {{ buttonText.length }}/20
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          style="
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
          "
        >
          <button
            @click="showModal = false"
            style="
              padding: 8px 16px;
              border: 1px solid #ddd;
              border-radius: 4px;
              background: white;
            "
          >
            Back
          </button>
          <button
            @click="sendCall"
            style="
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              background: #26b99a;
              color: white;
            "
          >
            Send
          </button>
        </div>

        <!-- Preview -->
        <div
          style="
            margin-top: 20px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 4px;
          "
        >
          <h3>Preview</h3>
          <div
            style="
              background: white;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
            "
          >
            <p>{{ message }}</p>
            <button
              style="
                color: #007aff;
                background: none;
                border: none;
                padding: 8px 0;
              "
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showModal: false,
      callType: 'incoming',
      message: 'You can call us on WhatsApp now for faster services!',
      buttonText: 'Call Now',
    };
  },
  methods: {
    sendCall() {
      // Implementasi fungsi kirim
      console.log({
        type: this.callType,
        message: this.message,
        buttonText: this.buttonText,
      });
      this.showModal = false;
    },
  },
};
</script>
