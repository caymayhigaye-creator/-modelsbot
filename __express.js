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
    const {Model, License} = body;
    if(!Model || !License) return(response.status(404).send('Failed'));

    response.status(200).send('info claimed');
});

export {app};