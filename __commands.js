import { EmbedBuilder, ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags } from "discord.js";
import { functions } from "./keygen.js";

const commandsStorage = {
    commands: [
        {
            name: 'createlicense',

            data: new SlashCommandBuilder()
            .setName('createlicense')
            .setDescription('create license for $models')
            .addNumberOption(option => 
                option.setName('days')
                .setDescription('license expire date day time')
                .setRequired(true)
            )
            .toJSON(),

            async execute(interaction) {
                const licensekey = functions.generateKey();
                
                await (interaction).reply({content: licensekey, flags: MessageFlags.Ephemeral});
            },
        }
    ],
};


export {commandsStorage};
