require('dotenv').config();
const express = require('express');
const cors = require('cors');
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

const app = express();

app.use(express.json());
const corsOptions = {
  exposedHeaders: 'x-stripe-onboarding',
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  logger.info(`App is running in port ${port}`);

  await connect();

  routes(app);
});
