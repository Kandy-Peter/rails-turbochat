import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // On start
  connect() {
    const messages = document.getElementById("messages");
    messages.addEventListener("DOMNodeInserted", this.resetScroll);
    this.resetScroll(messages);
  }
  // On stop
  disconnect() {
    console.log("Scroll controller disconnected");
    this.data.set("scroll", this.element.scrollTop)
  }
  // Custom function
  resetScroll() {
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }
}