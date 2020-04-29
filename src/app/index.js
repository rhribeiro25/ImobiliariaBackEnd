const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('../security/rateLimit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
/***************************************************** Security *****************************************************/
app.use(helmet()); //Configura vários cabeçalhos HTTP
app.use(rateLimit); //Limitando requisições em 100/h
app.use(express.json({ limit: '10kb' })); //Limitando tamanho de body em 10KB
app.use(mongoSanitize()); //limpa os dados fornecidos pelo usuário para impedir a injeção do operador do MongoDB.
/********************************************************************************************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/index.js')(app);

app.listen(3000);