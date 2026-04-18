import { AutoModerationRuleTriggerType, linkedRoleMention } from "discord.js";
import mongose, { mongo } from "mongoose";

mongose.connect(process.env.MONGO_PUBLIC_URL).then(() => {
    console.log('mongoose connected!')
}).then((err) => {
    console.log(err);    
});

const LicenseSchema = new mongose.Schema({}, {
    strict: false,
});
const ButtonSchema = new mongose.Schema({}, {
    strict: true,
});

const LicenseModel = mongose.model('LicenseSchema', LicenseSchema);
const ButtonsModel = mongose.model('ButtonsSchema', ButtonSchema);


export {LicenseModel, ButtonsModel};