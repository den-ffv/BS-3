import {Router} from "express";
import AuthController from "../controller/auth.controller";

const routes = new Router();


routes.use('/auth', AuthController )