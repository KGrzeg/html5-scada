const messageTime = 3000;

const app = new Vue({
  el: "#app",
  data: {
    connected: false,
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
    socket: null,
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
        this.openConnection();
      } else {
        this.connected = !this.connected;
        this.socket.disconnect();
        this.socket = null;
        this.pushMessage("Disconnected");
      }
    },
    openConnection() {
      this.socket = io();

      this.socket.on("connect", () => {
        this.connected = true;
        this.pushMessage("Connected");
      });

      this.socket.on("disconnect", () => {
        this.connected = false;
        this.pushMessage("Disconnected");
      });

      this.socket.on("error", (err) => {
        this.pushMessage(`Error occured: ${err}`);
      });
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
      }, messageTime);
    },
    sendInputs() {
      const inputs = [
        this.controller.set.u,
        this.controller.set.Kp,
        this.controller.set.Ti,
        this.controller.set.Ts,
      ];
      this.socket.emit("updateInputs", inputs);
    },
  },
});
