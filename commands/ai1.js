const axios = require("axios");

async function fetchAIResponse(prompt) {
    try {
        const response = await axios.get(`${global.NashBot.KEN}freegpt4o8k/?question=${encodeURIComponent(prompt)}`);
        if (response.data.status) {
            return response.data.response;
        } else {
            return "Failed to get a valid response from the AI.";
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "ai1",
    description: "Talk to GPT-4 without maintaining a conversation",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 1,
    aliases: ["ai-non"],
    execute(api, event, args, prefix) {
        const { threadID, messageID, senderID } = event;
        let prompt = args.join(" ");
        if (!prompt) return api.sendMessage("Please enter a prompt.", threadID, messageID);

        api.sendMessage(
            "🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n\n" +
            "💬 Responding...",
            threadID,
            async (err, info) => {
                if (err) return;
                try {
                    const response = await fetchAIResponse(prompt);
                    api.editMessage(
                        "🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━\n" +
                        response,
                        info.messageID
                    );
                } catch (g) {
                    api.sendMessage("Error processing your request: " + g.message, threadID);
                }
            },
            messageID
        );
    },
};
