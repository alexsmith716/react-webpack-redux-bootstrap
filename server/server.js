import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack/webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import routes from '../client/routes';

const app = new express();

console.log('>>>>>>> server.js 11111111 <<<<<<<<');

import * as db from "./utils/mongoDB";
import "./models/User";
const User = mongoose.model("User");

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}


db.setUpConnection();
app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(cors());


app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`Running on port ${process.env.PORT}`);
  }
});

export default app;

