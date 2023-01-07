import consumer from "channels/consumer"

let resetFunc;
let timer = 0;

consumer.subscriptions.create("AppearanceChannel", {
  initialized() {},
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to the Appearance Channel!");
    resetFunc = () => this.resetTimer(this.uninstall);
    this.install();
    window.addEventListener("turbo:load", this.resetTimer());
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Disconnected from the Appearance Channel!");
    this.uninstall();
  },

  rejected() {
    // Called when the subscription is rejected by the server
    console.log("Rejected from the Appearance Channel!");
    this.uninstall();
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },

  online() {
    console.log("You are online!");
    this.perform("online");
  },

  offline() {
    console.log("You are offline!");
    this.perform("offline");
  },

  away() {
    console.log("You are away!");
    this.perform("away");
  },

  uninstall() {
    const shouldRun = document.getElementById("appearance_channel");
    if (!shouldRun) {
      clearTimeout(timer);
      this.perform("offline");
    }
  },
  install() {
    console.log("Installing the Appearance Channel!");
    window.removeEventListener("load", resetFunc);
    window.removeEventListener("DOMContentLoaded", resetFunc);
    window.removeEventListener("click", resetFunc);
    window.removeEventListener("keydown", resetFunc);

    window.addEventListener("load", resetFunc);
    window.addEventListener("DOMContentLoaded", resetFunc);
    window.addEventListener("click", resetFunc);
    window.addEventListener("keydown", resetFunc);
    this.resetTimer();
  },
  resetTimer() {
    this.uninstall();
    const shouldRun = document.getElementById("appearance_channel");

    if (!!shouldRun) {
      this.online();
      clearTimeout(timer);

      timer = setTimeout(this.away.bind(this), 5000);
    }
  },
});
