const fs = require('fs');
const path = require('path');

module.exports = {
  name: "antiout",
  version: "1.0.0",
  description: "Turn off antiout",
  author: "Dev Diablo",
  async onEvent({ api, event, Threads }) {
    try {
      let data = (await Threads.getData(event.threadID)).data || {};
      if (typeof data["antiout"] === "undefined" || data["antiout"] === false) {
        data["antiout"] = true;
      } else {
        data["antiout"] = false;
      }

      await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);

      const status = data["antiout"] === true ? "turn on" : "turn off";
      api.sendMessage(`✅ Done ${status} Successful Antiout!`, event.threadID);
    } catch (error) {
      console.error('Error in antiout event:', error);
      api.sendMessage('An error occurred while processing the antiout command.', event.threadID);
    }
  },
};
