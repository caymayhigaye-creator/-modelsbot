import {Client, Events, GatewayIntentBits, Partials, PresenceUpdateStatus, REST, Routes} from 'discord.js';
import 'dotenv/config.js';

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ],
});

const rest = new REST({
    version: '10',
}).setToken(process.env.DISCORD_TOKEN);

client.on(Events.ClientReady, async () => {
    try {
        await client.user.setActivity(PresenceUpdateStatus.Idle);
    } catch(e) {
        console.log(e.message);
    };
});

if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN);
};
