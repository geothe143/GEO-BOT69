const axios = require('axios');

module.exports = {
    name: "ai2",
    credits: "GeoDevz69",
    description: "Interact with Gemini",
    nashPrefix: true,
    version: "1.0.0",
    aliases: ["gemini"],
    usage: "gemini [reply to photo]",
    execute: async function ({ api, event, args }) {
        const prompt = args.join(" ");

        if (!prompt) {
            return api.sendMessage('This command only works with a photo reply.', event.threadID, event.messageID);
        }

        const url = encodeURIComponent(event.messageReply.attachments[0].url);
        api.sendTypingIndicator(event.threadID);

        try {
            await api.sendMessage('💬 Responding...', event.threadID);

            const response = await axios.get(`${global.NashBot.END}gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
            const description = response.data.gemini;

            return api.sendMessage(
                `🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━\n${description}\n━━━━━━━━━━━━━━━━━\n💕 ғʀᴏᴍ: ᴀᴅᴍɪɴ ɢᴇᴏʀᴀʏ 💕\n\nUse 'ai' to answer only on text questions.`,
                event.threadID,
                event.messageID
            );
        } catch (error) {
            console.error(error);
            return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
        }
    }
};
