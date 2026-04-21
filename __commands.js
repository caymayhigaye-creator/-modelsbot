import { EmbedBuilder, SlashCommandBuilder, SlashCommandStringOption, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags, Colors } from 'discord.js';
import { functions } from "./keygen.js";
import { LicenseModel, ButtonsModel } from "./__gose.js";

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
            .addStringOption(option => 
                option.setName('model')
                .setDescription('x model license key')
                .setRequired(true)
            )
            .addNumberOption(option => 
                option.setName('days')
                .setDescription('add license key expiration day time')
                .setRequired(true)
            ).toJSON(),

            async execute(interaction) {
                const license = await(interaction).options.getString('license');
                const model = await(interaction).options.getString('model');
                const days = await(interaction).options.getNumber('days');

                try {
                    const savedLicense = await(LicenseModel).findOne({key: license, model: model});

                    if(!savedLicense) {
                        await(LicenseModel).insertOne({
                            key: license,
                            date: new Date(Date.now + Number(days) * 24 * 60 * 60 * 1000),
                            model: model,
                        });

                        return(await(interaction).reply({content: `license key saved ${String(days)} days!`, flags:MessageFlags.Ephemeral}));
                    } else {
                        throw new Error('already registered key with this license!');
                    }
                } catch(e) {
                    await(interaction).reply({content: e.message, flags: MessageFlags.Ephemeral});
                };
            },
        },
        // REMOVE LICENSE COMMAND //
        {
            name: 'removelicense',

            data: new SlashCommandBuilder()
            .setName('removelicense')
            .setDescription('removes saved license key!')
            .addStringOption(option =>
                option.setName('license')
                .setDescription('license key')
                .setRequired(true)
            )
            .toJSON(),

            async execute(interaction) {
                const license = interaction.options.getString('license');

                try {
                    const licensedata = await(LicenseModel).findOne({ key:license });

                    if(licensedata){
                        const result = await(LicenseModel).findOneAndDelete({key:license});
                        if(result){
                            return(await(interaction).reply({content: 'license key deleted succesfully', flags:MessageFlags.Ephemeral}));
                        } else {
                            return(await(interaction).reply({content: 'something went wrong with deleting the license key!', flags:MessageFlags.Ephemeral}));
                        };
                    } else {
                        throw new Error(`cant find ${license} given key.`);
                    };
                } catch(e) {
                    return(await(interaction).reply({content: e.message, flags: MessageFlags.Ephemeral}));
                };
            },
        },
        // STEPVERIFICATION COMMAND //
        
        {
            name: 'verifybuilder',

            data: new SlashCommandBuilder()
            .setName('verifybuilder')
            .setDescription('verify button builder')
            .toJSON(),

            async execute(interaction) {
                try {
                    const channel = await interaction.channel;
                    const buttondata = await(ButtonsModel).findOne({customid: 'verify_access'});
                    if(!buttondata) {
                        let role;
                        try { // ROLE BUILDER //
                            role = await interaction.guild.roles.create({
                                name: '$verified',
                                reason: 'verified role',
                                color: Colors.DarkBlue,
                            });
                        } catch (e) {
                            console.log(e.message); 
                        };


                        const verifyButton = new ButtonBuilder()
                        .setCustomId('verify_access')
                        .setLabel('Verify To Access')
                        .setEmoji('✅')
                        .setStyle(ButtonStyle.Success);

                        const row = new ActionRowBuilder()
                        .addComponents(verifyButton);

                        const message = await channel.send({
                            content: 'Verify To Access Server.',
                            components: [row],
                        });

                        try {
                            await ButtonsModel.create({
                                customid: 'verify_access',
                                channelid: String(channel.id),
                                messageid: String(message.id),
                                roleid: String(role.id) || undefined,
                            });
                        } catch(e) {
                            console.log(e.message);
                        };

                        return(await(interaction).reply({content: 'Successfully created verify button!', flags: MessageFlags.Ephemeral}));
                    } else {
                        throw new Error('already has a verify access button.');
                    };
                    
                } catch(e) {
                    await(interaction).reply({content: e.message, flags:MessageFlags.Ephemeral});
                }
            },
        },
    ],
};


export {commandsStorage};
