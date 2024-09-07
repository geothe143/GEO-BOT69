module.exports = {
    name: 'kick',
    description: 'Remove the tagged user from the group',
    cooldown: 0,
    nashPrefix: true,
    execute: async (api, event, args) => {
        const mention = Object.keys(event.mentions);

        if (mention.length === 0) {
            return api.sendMessage("You need to tag someone to kick.", event.threadID, event.messageID);
        }

        try {
            const info = await api.getThreadInfo(event.threadID);

            if (!info.adminIDs.some(item => item.id === api.getCurrentUserID())) {
                return api.sendMessage("Bot needs admin privileges to perform this action. Please add the bot as an admin.", event.threadID, event.messageID);
            }

            if (!info.adminIDs.some(item => item.id === event.senderID)) {
                return api.sendMessage("You need to be an admin to kick someone.", event.threadID, event.messageID);
            }

            for (let userId of mention) {
                setTimeout(() => {
                    api.removeUserFromGroup(userId, event.threadID);
                }, 3000);
            }
        } catch (err) {
            api.sendMessage("An error occurred!", event.threadID, event.messageID);
        }
    },
};
