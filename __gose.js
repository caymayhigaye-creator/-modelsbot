import { AutoModerationRuleTriggerType, linkedRoleMention } from "discord.js";
import mongose from "mongoose";

mongose.connect(process.env.MONGO_PUBLIC_URL).then(() => {
    console.log('mongoose connected!')
}).then((err) => {
    console.log(err);    
});

const LicenseSchema = new mongose.Schema({}, {
    strict: false,
});

const LicenseModel = mongose.model('LicenseSchema', LicenseSchema);

export {LicenseModel};