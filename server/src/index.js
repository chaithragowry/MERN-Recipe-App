import express from 'express'; //Node.js framework to create our API
import cors from 'cors'; //allows to make reqs to server deployed at diff domain
import mongoose from 'mongoose'; //obj data modeling library for MongoDB & Node.
import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'




const app = express();

app.use(express.json()); //convert data into json from frontend
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);

mongoose.connect(
    "mongodb+srv://malu13cos9:MyPassword@recipes.tc9swhe.mongodb.net/recipes?retryWrites=true&w=majority");

app.listen(3001, () => console.log("SERVER STARTED")); //tells the API to start