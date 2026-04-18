import { EmbedBuilder, ButtonBuilder, SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { InteractionResponse, MessageFlags } from "discord.js";
import { functions } from "./keygen.js";
import { LicenseModel } from "./__gose.js";

const commandsStorage = {
    commands: [
        // CREATE LICENSE COMMAND //
        {
            name: 'createlicense',

            data: new SlashCommandBuilder()
            .setName('createlicense')
            .setDescription('create license for $models')
            .toJSON(),

            async execute(interaction) {
                try {
                    const licensekey = await(functions).generateKey();
                    await (interaction).reply({content: String(licensekey), flags: MessageFlags.Ephemeral});
                } catch (e) {
                    await(interaction).reply({content: e.message, flags: MessageFlags.Ephemeral});
                }
            },
        },
        // REGISTER LICENSE COMMAND //
        {
            name: 'register',

            data: new SlashCommandBuilder()
            .setName('register')
            .setDescription('register the license key')
            .addStringOption(option => 
                option.setName('license')
                .setDescription('put giv3n license')
                .setRequired(true)
            )
            .addNumberOption(option => 
                option.setName('days')
                .setDescription('add license key expiration day time')
                .setRequired(true)
            ).toJSON(),

            async execute(interaction) {
                const license = await(interaction).options.getStringOption('license');
                const days = await(interaction).options.getNumberOption('days');

                try {
                    const savedLicense = await(LicenseModel).findOne({key: license});

                    if(!savedLicense) {
                        await(LicenseModel).insertOne({
                            key: license,
                            date: new Date(Date.now + Number(days) * 24 * 60 * 60 * 1000),
                        });

                        return(await(interaction).reply({content: `license key saved ${String(days)} days!`}));
                    } else {
                        throw new Error('already registered key with this license!');
                    }
                } catch(e) {
                    await(interaction).reply({content: e.message, flags: MessageFlags.Ephemeral});
                }
            },
        },
    ],
};


export {commandsStorage};
