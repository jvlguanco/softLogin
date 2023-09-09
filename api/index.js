import express from 'express';
import authRoute from "./routes/auth.js";
import {connect} from './config/db.js';

const port = 3000;
const app = express();
// const bodyParser = express.json;
// app.use(bodyParser());

// Middlewares
app.use(express.json());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.send("This is the Index");
});


app.listen(port, ()=>{
    connect();
    console.log(`The app is running on port ${port}`)
})