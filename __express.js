import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const PORT = 3000 || 3000;
app.listen(PORT, () => {
    console.log('3000 Port is working rn');
});

app.post('/$models', async (request, response) => {
    const parsedBody = JSON.parse(request.body);
    if (!parsedBody) return(console.log('failed to parse!'));

    console.log(parsedBody);

    response.status(200).send('info claimed');
}) 

export {app};