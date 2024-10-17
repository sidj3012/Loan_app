import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

//to get logged in useer data
export const getAuthenticatedUser: RequestHandler = async (req, res) => {
    const authenticatedUserId = req.session.userId;
    try{
        if(!authenticatedUserId){
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(authenticatedUserId).exec();
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
    }
};

interface SignUpBody{
    username?: string,
    email?: string,
    password?: string,
    role?:string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown>= async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try{
        if(!username || !email || !passwordRaw){
            //throw Error("Parameters Missing");
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({username: username}).exec();

        if(existingUsername){
            //throw Error("Username already taken");
            throw createHttpError(409, "Username already exists");
        }
        const existingEmail = await UserModel.findOne({email:email}).exec();
        if(existingUsername){
            //throw Error("Email already exists");
            //return res.status(403).json({error: 'Email is already in use'});
            throw createHttpError(409, "Email already exists");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

       req.session.userId = newUser._id;

        res.status(201).json(newUser);
    }
    catch(error){
        console.log(error);
    }
}

interface LoginBody{
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, SignUpBody, unknown>= async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(!username || !password){
            //throw Error("Parameters Missing");
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({username: username}).exec();

        if(!user){
            throw createHttpError(401, "User does not exist");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw createHttpError(401, "Password does not match");
        }

       req.session.userId = user._id;

        res.status(201).json(user);
    }
    catch(error){
        console.log(error);
    }
}

export const logout: RequestHandler = (req, res) => {
    req.session.destroy(error =>{
        if(error){
            console.log(error);
        }
        else{
            res.sendStatus(200);
        }
    })
};