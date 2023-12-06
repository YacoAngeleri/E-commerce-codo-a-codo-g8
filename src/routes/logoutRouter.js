import express from 'express';
import bodyParser from 'body-parser';
import { findUserByEmail, findAdmin, loginUser } from '../functions/loginFunctions.js';
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
import ejs from 'ejs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let loggedIn = false;

const logoutRouter = express.Router();



logoutRouter.use(bodyParser.urlencoded({ extended: true }));
logoutRouter.use(bodyParser.json());



logoutRouter.get('/logout', (req, res) => {
    req.session.destroy()
    loggedIn = false;
    res.redirect('/');
  });

export default logoutRouter