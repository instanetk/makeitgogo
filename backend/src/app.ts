const express = require('express');
const cors = require('cors');
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  logger.info(`App is running in port ${port}`);

  await connect();

  routes(app);
});
