import {ActivityType, Client, Events, GatewayIntentBits, Partials, Presence, PresenceUpdateStatus, REST, Routes} from 'discord.js';
import { commandsStorage } from './__commands.js';
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

const Activities = [
    {name: '$centuryism', type: ActivityType.Playing},
    {name: 'bbno$', type: ActivityType.Listening},
    {name: '$bremen', type: ActivityType.Streaming},
];

client.on(Events.ClientReady, async () => {
    try {
        await client.user.setStatus(PresenceUpdateStatus.Idle);
        await client.user.setBanner('https://media.discordapp.net/attachments/968219658450788372/977619258177630238/giphy_11.gif?ex=69ddcc22&is=69dc7aa2&hm=aad748d3735a9922c132205289ddde93ad92be866708b2280f0bc78959261cda&=&width=360&height=203')
        setInterval(async () => {
            const pickenActivity = Activities[Math.floor(Math.random()*Activities.length)];
            client.user.setActivity(pickenActivity.name, {type: pickenActivity.type});
        }, 3000);
    } catch(e) {
        console.log(e.message);
    };
});

if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN);
};
