import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const PORT = 3000 || 3000;
app.listen(PORT, () => {
    console.log('3000 Port is working rn');
});

app.post('/$models', async (request, response) => {
    console.log(request.body);

    response.status(200).send('info claimed');
}) 

export {app};