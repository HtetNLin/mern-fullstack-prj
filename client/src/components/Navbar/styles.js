
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';



export default makeStyles((theme) => ({
  appBar: {
    marginBottom: '40px',
    backgroundColor : 'white'
  },
  heading: {
    color: 'black',
    textDecoration: 'none',
    fontFamily:""
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '270px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#4599a1",
  },  

  user_name : {
    color:"gray",
    my : 3,
    display: 'flex',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  logo_1 : {
    marginRight : 2,
    display: 'flex',
    [theme.breakpoints.only('xs')]:{
      display: 'none'
    }
  },
  logo_2 : {
    flexGrow : 1,
    display: 'none',
    [theme.breakpoints.only('xs')]:{
      display: 'flex'
    }
  },
  color_blue :{
    color : '#4599a1',
    textDecoration: 'none'
  },
  menu_btn :{
    marginLeft : '40px',
    display:'block',
    color : 'gray'
  }

}));