import { Avatar, Button, Typography, Grid, Container, Paper} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import { useState } from "react";
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'  
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {signin,signup} from '../../actions/auth'

const initialState = {firstName : '',lastName : '' , email : '' ,password : '' ,confirmPassword : ''}

const Auth = () => {
    
    const [formData, setFormData] = useState(initialState);
    
    
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    
    
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

  const handleChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
  }
  

  const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(formData,history))
           
        }else{
            dispatch(signin(formData,history))
        }

  }

  const handleShowPassword = () => {
        setShowPassword((prevData) => !prevData);
  }

  const switchMode = () => {
        setIsSignup((prevD) => !prevD)
        setShowPassword(false); 
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push('/');
      window.location.reload(false);

    } catch (error) {
      console.log(error);
    }
  };


  const googleFailure = (error) => {
        console.log(error);
        console.log("google sign in fail")
        
  }

  return (
    <Container component = "main" maxWidth = "xs">  
        <Paper className = {classes.paper} elevation = {3}>
            <Avatar className = {classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant = "h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
            <form className = {classes.form} onSubmit = {handleSubmit}>
                <Grid container spacing = {2} >
                    {
                        isSignup && (
                            <>
                                <Input name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half/>
                                <Input name = "lastName" label = "Last Name" handleChange = {handleChange}  half/> 
                            </>
                        )
                    }
                    <Input name = "email" label = "Email Address" handleChange = {handleChange} type = "email"/>
                    <Input name = "password" label = "Password" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword}/>
                    {isSignup ? <Input name = "confirmPassword" label = "Confirm Password" handleChange = {handleChange} type ="password"/> : null}
                </Grid>
                

                <Button type = "submit" fullWidth variant = "contained"  className = {classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In" }
                </Button>
                
                <GoogleLogin 
                    clientId = "401772928628-qlrhratrehq2ktpu4qphiunkhs2vlu68.apps.googleusercontent.com"
                    render ={(renderProps) => (
                        <Button className = {classes.googleButton} variant = "contained"  fullWidth onClick={renderProps.onClick} disabled = {renderProps.disabled} startIcon = {<Icon/>} >
                                Sing In With
                        </Button>
                    )}
                    onSuccess = {googleSuccess}
                    onFailure = {googleFailure}
                    cookiePolicy = "single_host_origin"
                />
                <Grid container justifyContent = "flex-end">
                    <Grid item >
                        <Button onClick = {switchMode}> {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  );
};

export default Auth;
