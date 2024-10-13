import 'dotenv/config';

import express from 'express';
import { connectToDatabase } from './connection.js';
import { userRoute } from './routes/userRoute.js';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3001;

//Middleware
app.use(express.json());
app.use(express.static(path.resolve('./public')));
app.use(cors());

// Routes
app.use('/user', userRoute);

connectToDatabase(process.env.MONGOOSE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT} & DB is connected`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
