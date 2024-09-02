module.exports = {
    name: "help",
    description: "Beginner's Guide To All Bot Commands and Events",
    nashPrefix: false,
    version: "1.0.2",
    role: 0,
    cooldowns: 7,
    aliases: ["help"],
    execute(api, event, args, prefix) {
        const commands = global.NashBoT.commands;
        const events = global.NashBoT.events;
        const { threadID, messageID } = event;

        const itemsPerPage = 20;
        let pageNumber = args[0] ? parseInt(args[0], 10) : 1;
        pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

        let commandList = "╔════ஜ۩۞۩ஜ═══╗\n\n";
        commandList += `𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 » 𝗣𝗔𝗚𝗘 ${pageNumber}:\n\n`;

        const commandEntries = Array.from(commands.keys());
        const eventEntries = Array.from(events.keys());

        const allEntries = [...commandEntries, ...eventEntries];
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedEntries = allEntries.slice(startIndex, endIndex);

        let isCommandSection = true;

        paginatedEntries.forEach(name => {
            if (commandEntries.includes(name)) {
                commandList += `♲︎︎︎ ${name}\n`;
            } else if (eventEntries.includes(name)) {
                if (isCommandSection) {
                    commandList += "\nEvent List:\n";
                    isCommandSection = false;
                }
                commandList += `♲︎︎︎ ${name}\n`;
            }
        });

        if (paginatedEntries.length < itemsPerPage && pageNumber > 1) {
            commandList += "\nNo more commands/events.";
        }

        commandList += `\n\n|Help 1|Help 2|Help 3|\n`;
        commandList += `╚════ஜ۩۞۩ஜ═══╝`;
        api.sendMessage(commandList, threadID, messageID);
    }
};
