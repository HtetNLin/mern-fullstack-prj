import { AppBar,Avatar,Button,Toolbar,Typography,Box,Tooltip,IconButton,Container,MenuItem,Menu } from "@material-ui/core"
import useStyles from './styles';
import {Link,useHistory,useLocation} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import MenuIcon from '@material-ui/icons/Menu'  
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
// import memories from "../../images/memories.png";


const pages = ['Create'];
const settings = ['Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    
    useEffect(() => {
        const token = user?.token;
        if(token && token.length < 500){
            const decodedToken = decode(token);
            console.log(new Date().getTime());
            console.log("haha");
            console.log(decodedToken.exp * 1000);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')))

    },[location]);

    const logout = () => {
        dispatch({type : "LOGOUT" })
        
        history.push('/')
        window.location.reload(false);
        setUser(null);
        
    }

    return ( 
    //     <AppBar className={classes.appBar} position="static" color="inherit" >
    //     <div className ={classes.brandContainer}>
    //     <Typography component={Link} to ="/" className={classes.heading} variant="h2" align="center">
    //       Dash
    //     </Typography>
    //     </div>
    //     <Toolbar className = {classes.toolbar}>
    //         {user ? (
    //             <div className = {classes.profile}>
    //                 <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
    //                 <Typography className = {classes.userName} variant = "h6">{user.result.name}</Typography>
    //                 <Button variant = "outlined" className = {classes.logout} color = {"secondary"} onClick = {logout}>Logout</Button>
    //             </div>
    //         ) : (
    //             <Button component = {Link} to="/auth" variant = "contained" color = "primary" > Sign In</Button>
    //         )}
    //     </Toolbar>
    //   </AppBar>
    <AppBar className = {classes.appBar} position="sticky">

    <Container maxWidth="xl">

      <Toolbar disableGutters>
       
        <Typography className = {classes.logo_1} variant="h6" noWrap component="div" component={Link} to ="/" >
              <AllInclusiveIcon  className ={classes.color_blue} fontSize = 'large'/>
          </Typography >
        
        {user && (
        
        <Box sx={{ flexGrow: 1 ,display: { xs: 'flex', md: 'none' } }}>
        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon className={classes.color_blue} />
        </IconButton>
        
        <Menu
         id="menu-appbar"
         anchorEl={anchorElNav}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page) => (
            <MenuItem  key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center" component={Link} className = {classes.color_blue} to ="/create" >{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
        )}

        
        <Typography className = {classes.logo_2} alignItems = 'center' variant="h6" noWrap component="div" component={Link} to ="/" >
        <AllInclusiveIcon className ={classes.color_blue} fontSize = 'large'/>
            </Typography>
        

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {user && (
            pages.map((page) => (
              <Button
                className={classes.menu_btn}
                key={page}
                component={Link} to ="/create"
                onClick={handleCloseNavMenu}
                // sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))
          )}
        </Box>
        
       {user && (
         
             <Typography
             className = {classes.user_name}
              variant="h6"
              noWrap
              component="div"
            //   sx={{ my: 3, display: { xs: 'none', md: 'flex' } }}
            >
                {user.result.name}
            </Typography>
         
       )}
      {user ? (
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,ml:2 }}>
            <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={logout}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : ( <Button
        className ={classes.color_blue}
        size="large"
        component = {Link} to="/auth"
        color="primary"
        endIcon = {<PersonOutlineIcon className={classes.color_blue} fontSize = "small" color = "primary"/>}
      >
        Login
      </Button>)}
      </Toolbar>
    </Container>
  </AppBar>
     );
}
 
export default Navbar;