import axios from "axios";
import userApiConstants from "../apiConstants/userApiConstants";

export async function register(registerData){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.singUp, registerData);
        return response;
    }catch(err){
        throw err;
    }
}

export async function login(loginData){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.login, loginData);
        return response;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export async function dashboard(){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.dashboard)
        return response;
    } catch (err){
        console.log(err);
        return err;
    }
}

export async function forgotPassword(data){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.forgotPassword,data);
        return response;
    } catch (err){
        return err;
    }
}
