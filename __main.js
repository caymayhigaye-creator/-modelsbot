import {Client, Events, GatewayIntentBits, Partials, PresenceUpdateStatus} from 'discord.js';
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

client.on(Events.ClientReady, async () => {
    await client.user.setStatus(PresenceUpdateStatus.Idle);
});

if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN);
};
