const messageTime = 3000;

const app = new Vue({
  el: "#app",
  data: {
    connected: false,
    connecting: false,
    messagesStack: [],
    controller: {
      set: {
        u: 0,
        Kp: 1,
        Ts: 0,
        Ti: 0,
      },
      view: {
        u: 0,
        Kp: 1,
        Ts: 0,
        Ti: 0,
      },
    },
  },
  computed: {
    status() {
      return this.connected ? "Connected" : "Disconnected";
    },
    btnConnectTitle() {
      return this.connected ? "Disconnect" : "Connect";
    },
    message() {
      if (this.messagesStack.length == 0) return "";

      return this.messagesStack[0];
    },
  },
  methods: {
    connect() {
      if (!this.connected) {
        //TODO ws connection
        this.connecting = true;

        setTimeout(() => {
          this.connecting = false;
          this.connected = true;
          this.pushMessage("Connected");
        }, 1000);
      } else {
        this.connected = !this.connected;
        this.pushMessage("Disconnected");
      }
    },
    submitU() {
      this.controller.set.u = parseFloat(this.controller.view.u);
      this.sendInputs();
    },
    submitPID() {
      this.controller.set.Kp = parseFloat(this.controller.view.Kp);
      this.controller.set.Ti = parseFloat(this.controller.view.Ti);
      this.controller.set.Ts = parseFloat(this.controller.view.Ts);
      this.sendInputs();
    },
    pushMessage(text) {
      this.messagesStack.push(text);
      setTimeout(() => {
        this.messagesStack = this.messagesStack.slice(1);
        console.log("hehe");
      }, messageTime);
    },
    sendInputs() {
      //send packet via ws
    },
  },
});
