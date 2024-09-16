const fs = require('fs');
const path = require('path');

module.exports = {
  name: "antiout",
  version: "1.0.0",
  description: "Prevents users from leaving the group",
  author: "GeoDevz69",
  async onEvent({ api, event }) {
    try {
      if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
      
      if (event.logMessageData?.leftParticipantFbId) {
        const userInfo = await api.getUserInfo(event.logMessageData.leftParticipantFbId);
        const { name } = userInfo[event.logMessageData.leftParticipantFbId];

        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error) => {
          if (error) {
            api.sendMessage(`❌ Unable to re-add member ${name} to the group!`, event.threadID);
          } else {
            api.sendMessage(`✅ Active antiout mode, ${name} has been re-added to the group successfully!`, event.threadID);
          }
        });
      }
    } catch (error) {
      console.error('Error in antiout event:', error);
      api.sendMessage('An error occurred while processing the antiout event.', event.threadID);
    }
  },
};
