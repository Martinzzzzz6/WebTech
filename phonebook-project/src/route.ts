import { Router } from 'express';
import * as convict from "convict";
import { CreateUserSchema, UserService } from './createUser';

export const userRouter = Router();
const userService = new UserService();

userRouter.post("/", async(req,res) => {
    try{
        const userInput = CreateUserSchema.parse(req.body);
        const user = await userService.createUser(userInput);

        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send({message:"Something went wrong!"});
    }
})
