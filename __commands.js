import { EmbedBuilder, ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders";

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
                
            },
        }
    ],
};


export {commandsStorage};
