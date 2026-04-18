import { MessageFlags } from "discord.js";
import { ButtonsModel } from "./__gose";

const ButtonActions = {
    verify_access: async (interaction) => {
        try {
            const button_data = await ButtonsModel.findOne({customid:interaction.customId});
            if (button_data) {
                await interaction.member.roles.add(button_data.roleid)
                await interaction.reply({content: 'Succesfully Verified', flags: MessageFlags.Ephemeral});
            } else {
                throw new Error('Role not found!');
            }
        } catch(e) {
            return(await interaction.reply({content: e.message, flags: MessageFlags.Ephemeral}));
        }
    }
}

export {ButtonActions};