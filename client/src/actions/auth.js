
import * as api from "../api";
import { AUTH } from "../constants/actioinTypes";

export const signup = (formData,history) => async(dispatch)=> {

    try {
        const {data} = await api.signUp(formData);

       
            const action = {type : AUTH , data }


            dispatch(action);

            history.push('/');

            window.location.reload(false);
        


    } catch (error) {
        console.log(error);
    }
}


export const signin = (formData,history) => async(dispatch) => {

    try {
        const {data} = await api.signIn(formData);

        const action = {type : AUTH , data};

        dispatch(action);

        history.push('/');

        window.location.reload(false);


    } catch (error) {
        console.log(error);
    }
}