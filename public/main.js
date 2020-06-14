const app = new Vue({
  el: "#app",
  data: {
    connected: false,
    message: "hello",
  },
  computed: {
    status() {
      return this.connected ? "Connected" : "Disconnected";
    },
    btnConnectTitle() {
      return this.connected ? "Disconnect" : "Connect";
    },
  },
  methods: {
    connectCb() {
      this.connected = !this.connected;
    },
  },
});
