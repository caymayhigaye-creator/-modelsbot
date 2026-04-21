import express from "express";
import { LicenseModel } from "./__gose.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const PORT = 3000 || 3000;
app.listen(PORT, () => {
    console.log('3000 Port is working rn');
});

app.post('/$auth', async (request, response) => {
    const body = request.body;
    const {model, license} = body;
    if(!model || !license) return(response.status(403).send('Failed'));

    const ModelData = await LicenseModel.findOne({license: license, model: model});
    if(ModelData) {
        return(await response.status(202).json({
            model: model,
            license: license,
        }));
    } else {
        response.status(404).send('Not Found');
    };

    response.status(200).send('info claimed');
});

export {app};