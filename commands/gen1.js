const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.run = async (client, message, args) => {
  if (args.length === 0) {
    return message.reply("Usage: /gen1 <prompt>");
  }

  const prompt = args.join(" ");
  const loadingMsg = `💬 Generating "${prompt}" ...`;
  message.reply(loadingMsg);
  
  try {
    const response = await axios.get(`https://hiroshi-rest-api.replit.app/image/anime?prompt=${encodeURIComponent(prompt)}`);
    const imageUrl = response.data.image_url;

    const imageResponse = await axios({
      url: imageUrl,
      responseType: 'arraybuffer'
    });

    const imagePath = path.resolve(__dirname, 'temp', 'generated_image.png');
    fs.writeFileSync(imagePath, imageResponse.data);

    message.replyWithAttachment(fs.createReadStream(imagePath), () => {
      fs.unlinkSync(imagePath);
    });
  } catch (error) {
    console.error('Error:', error);
    message.reply("Error generating image.");
  }
};

exports.config = {
  name: "gen1",
  aliases: [],
  description: "Generate Anime Image",
  usage: "/gen1 <prompt>",
  category: "AI",
  cooldown: 5
};
