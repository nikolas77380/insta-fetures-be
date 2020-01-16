import * as Express from 'express';

interface UserInterface{
    userName: string,
    password: string,
    confirmPassword?:string
}


export default class AuthController {

    registerUser(userObject: UserInterface) {
        // get user name, check 2 passwords, create user -> generate JWT token
    }


    loginUser(userObject: UserInterface){
        // check if user exist in DB -> generate JWT token
    }

    private generateJWTToken(userData: UserInterface) {

    }
}