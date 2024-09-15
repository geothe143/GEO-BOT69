const axios = require('axios');
const fs = require('fs');
const devs = require(__dirname.replace("/script", "") + '/system/api');

module.exports["config"] = {
    name: "ai5",
    version: "1.0.0",
    role: 0,
    credits: "GeoDevz69",
    info: "Talk to GPT4 CONTINUES AI",
    usage: " [prompt]",
    cd: 0
};

module.exports["run"] = async function ({ event, args, chat, fonts}) {
    const question = args.join(' '), id = event.senderID
   
    if (!question)
      return chat.reply("Please provide a question first.", event.threadID, event.messageID);

    try {
       chat.react("💬", event.messageID, () => {}, true);
        const info1 = await new Promise(resolve => {
        chat.reply("💬 Responding...", event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });

        const uid = event.senderID;
        const info = await chat.getUserInfo(event.senderID);
        const name = fonts.thin(info[event.senderID].name);

      const userInput = encodeURIComponent(question);

        const apiUrl = (devs.markdevs69 + "/api/v3/gpt4?ask=" + userInput);
        
        const respons = await axios.get(apiUrl);
        const answer = respons.data.answer;
        chat.react("✅", event.messageID, () => {}, true);
    const mark = `🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`;
      chat.edit(mark, info1.messageID, () => {});
    } catch (error) {
        console.error(error);
        chat.reply("An error occurred while processing your request.", event.threadID);
    }
};
