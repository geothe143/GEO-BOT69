module.exports = {
  name: 'motivate',
  description: 'Sends a random motivational quote.',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "The best way to predict the future is to invent it. Alan Kay",
      "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
      "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
      "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
      "The best revenge is massive success. - Frank Sinatra",
      "Don’t count the days, make the days count. - Muhammad Ali",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "You are never too old to set another goal or to dream a new dream. - C.S. Lewis"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const message = `•──⋅☾ 🎀 𝗚𝗘𝗢 𝗔𝗜69 🎀 ☽⋅──•\n${randomQuote}\n•──⋅☾ Have a great day! ☽⋅──•`;

    try {
      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};
