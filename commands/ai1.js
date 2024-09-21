const axios = require('axios');

module.exports = {
    name: "ai1",
    credits: "GeoDevz",
    description: "GPT architecture",
    nashPrefix: false,
    version: "1.0.0",
    aliases: [ai1],
    usage: "ai [text query]",
    execute: async function ({ api, event, args }) {
        try {
            const { messageID, messageReply, threadID } = event;
            let prompt = args.join(' ');

            if (messageReply) {
                const repliedMessage = messageReply.body;
                prompt = `${repliedMessage} ${prompt}`;
            }

            if (!prompt) {
                return api.sendMessage(
                    '🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━\nHello po, I am autobot created by George Nakila way uyab 😂\nDinga kung gusto mo gumamit ng AI nato kindly type 👉ai👈 for text questions and 👉ai2👈 for image\n𝙴𝚇𝙰𝙼𝙿𝙻𝙴:\nai mapagmahal ba si George Nakila?\nai2 answer this image correctly',
                    threadID,
                    messageID
                );
            }

            api.sendTypingIndicator(threadID);
            await new Promise(resolve => setTimeout(resolve, 2000)); 

            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`;
            const response = await axios.get(gpt4_api);

            if (response.data && response.data.response) {
                const generatedText = response.data.response;

                return api.sendMessage(
                    `🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━\n${generatedText}\n━━━━━━━━━━━━━━━━━━\nғʀᴏᴍ: 💕 ᴀᴅᴍɪɴ ɢᴇᴏʀᴀʏ 💕\n\nUse 👉ai2👈 only for answering image.`,
                    threadID,
                    messageID
                );
            } else {
                console.error('API response did not contain expected data:', response.data);
                return api.sendMessage(
                    `❌ 𝙰𝙽 𝙴𝚁𝚁𝙾𝚁 𝙾𝙲𝙲𝚄𝚁𝙴𝙳 𝚆𝙷𝙸𝙻𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝚃𝙷𝙴 𝚃𝙴𝚇𝚃 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴. 𝙿𝙻𝙴𝙰𝚂𝙴 𝚃𝚁𝚈 𝙰𝙶𝙰𝙸𝙽 𝙻𝙰𝚃𝙴𝚁.`,
                    threadID,
                    messageID
                );
            }
        } catch (error) {
            console.error('Error:', error);
            return api.sendMessage(
                `❌  error occurred while generating the text response. Please try again later. Error details: ${error.message}`,
                event.threadID,
                event.messageID
            );
        }
    }
};
