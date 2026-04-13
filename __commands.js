import { EmbedBuilder, ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags } from "discord.js";

const commandsStorage = {
    commands: [
        {
            name: 'createlicense',

            data: new SlashCommandBuilder()
            .setName('createlicense')
            .setDescription('create license for $models')
            .addStringOption(input =>
                input.setName('time')
                .setDescription('set license ending time')
                .setRequired(true)
            )
            .toJSON(),

            async execute(interaction) {
                await (interaction).reply({content: 'yes', flags: MessageFlags.Ephemeral});
            },
        }
    ],
};


export {commandsStorage};
