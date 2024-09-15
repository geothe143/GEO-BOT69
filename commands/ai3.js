const axios = require('axios');

module.exports = {
    name: 'ai3',
    description: 'Interact with Blackbox Conversational AI',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const chatMessage = args.join(' ');
        const apiUrl = `${global.NashBot.ENDPOINT}blackbox?chat=${encodeURIComponent(chatMessage)}`;

        if (!chatMessage) {
            return api.sendMessage('Please provide a message to send to the AI.', event.threadID, event.messageID);
        }

        const initialMessage = await api.sendMessage('Processing your request...', event.threadID);

        try {
            const response = await axios.get(apiUrl);
            const { response: aiResponse } = response.data;

            if (!aiResponse) {
                throw new Error('Failed to retrieve a response from the AI.');
            }

            api.sendMessage({
                body: `🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━\n${aiResponse}\n━━━━━━━━━━━━━━━━━━\n𝗔𝘀𝗸 𝗠𝗲 𝗔𝗻𝘆𝘁𝗵𝗶𝗻𝗴!`,
            }, event.threadID);
        } catch (error) {
            api.sendMessage(`An error occurred: ${error.message}`, event.threadID);
        }
    },
};
