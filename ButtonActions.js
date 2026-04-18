import { MessageFlags } from "discord.js";

const ButtonActions = {
    verify_access: async (interaction) => {
        try {
            await interaction.reply({content: 'Succesfully Verified', flags: MessageFlags.Ephemeral});
        } catch(e) {
            return(await interaction.reply({content: e.message, flags: MessageFlags.Ephemeral}));
        }
    }
}

export {ButtonActions};