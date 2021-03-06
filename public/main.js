const messageTime = 3000;
const chartStream = new TimeSeries();

function createTimeline() {
  const chart = new SmoothieChart({
    grid: { fillStyle: "#adf4ad" },
    timestampFormatter: SmoothieChart.timeFormatter,
    maxValue: 5,
    minValue: -5,
    millisPerPixel: 50,
  });
  const canvas = document.getElementById("smoothie-chart");

  chart.addTimeSeries(chartStream, {
    lineWidth: 2,
    strokeStyle: "#000",
  });
  chart.streamTo(canvas, 500);
}
window.addEventListener("load", () => {
  createTimeline();
});

const app = new Vue({
  el: "#app",
  data: {
    connected: false,
    messagesStack: [],
    controller: {
      set: {
        W: 0,
        Kp: 1,
        Ti: 1000000,
        Td: 0,
      },
      view: {
        W: 0,
        Kp: 1,
        Ti: 1000000,
        Td: 0,
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

      this.socket.on("response", (data) => {
        chartStream.append(new Date().getTime(), data);
      });
    },
    submitU() {
      this.controller.set.W = parseFloat(this.controller.view.W);
      this.sendInputs();
    },
    submitPID() {
      this.controller.set.Kp = parseFloat(this.controller.view.Kp);
      this.controller.set.Ti = parseFloat(this.controller.view.Ti);
      this.controller.set.Td = parseFloat(this.controller.view.Td);
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
        this.controller.set.W,
        this.controller.set.Kp,
        this.controller.set.Ti,
        this.controller.set.Td,
      ];
      this.socket.emit("updateInputs", inputs);
    },
  },
});
