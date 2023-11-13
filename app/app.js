import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

import config from '../config/config.js';

const dbhost = config()['database']['host'];
const dbport = config()['database']['port'];
const dbname = config()['database']['dbName'];
const user = config()['database']['user'];
const pass = config()['database']['pass'];

// routes
import uiCreateRoute from '../routes/ui/create.js';
import uiListRoute from '../routes/ui/list.js';
import uiLoginRoute from '../routes/ui/login.js';
import uiEditRoute from '../routes/ui/edit.js';

//api
import apiLoginRoute from '../routes/api/login.js';
import apiManualRoute from '../routes/api/manual.js';

mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`, {
  user: user,
  pass: pass
})
.then(() => console.log('Connected!'))
.catch(err => console.log(err));

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// ui routes
app.use('/login', uiLoginRoute);
app.use('/create', uiCreateRoute);
app.use('/', uiListRoute);
app.use('/edit', uiEditRoute)

app.use('/api', apiLoginRoute);
app.use('/api', apiManualRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
