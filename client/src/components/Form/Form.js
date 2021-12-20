import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState,useEffect } from "react";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import { useHistory } from "react-router";


const Form = ({currentId,setCurrentId}) => {
  const [postData, setpostData] = useState({title: "",message: "",tags: "",selectedFile: ""});
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => currentId ? state.posts.find( p => p._id === currentId) : null)

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post){
      console.log(post);
      setpostData(post);
    }
  }, [post])

  const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
          dispatch(updatePost(currentId,{...postData,name : user?.result?.name}));
          clear();
          history.push('/');

        }else{
          dispatch(createPost({...postData,name : user?.result?.name}));
          history.push('/');
        }
         
          

  };

  const clear = () => {
        setCurrentId(null);
        setpostData({title: "",message: "",tags: "",selectedFile: ""})
  }
  
  if(!user?.result?.name){
    return(
      <Paper className ={classes.paper}>
          <Typography variant = "h6" align = "center">
             Please sign in to create your own post and like other's post.   
          </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? "Editing" : "Creating a memory"}</Typography>
        <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(e) => setpostData({ ...postData, title: e.target.value })}/>
        <TextField  name="message" variant="outlined" label="Message" multiline rows ={12} fullWidth value={postData.message} onChange={(e) => setpostData({ ...postData, message: e.target.value })}/>
        <TextField name="tags" variant="outlined" label="Tags with comma ( a,b,c )" fullWidth value={postData.tags} onChange={(e) => setpostData({ ...postData, tags: e.target.value.split(',') })}/>
        <div className={classes.fileInput}> <FileBase type = "file" multiple = {false} onDone = {({base64}) => setpostData({...postData,selectedFile : base64})} />choose photo</div>
        <Button className = {classes.buttonSubmit} variant = "contained"  size="large" type="submit" fullWidth>Submit</Button>
        <Button className = {classes.color_red} variant = "contained"  size="small" onClick ={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
