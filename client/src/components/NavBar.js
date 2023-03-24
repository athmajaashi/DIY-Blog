import React,{useState} from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import DrawerComp from "./DrawerComp";
import {Link} from "react-router-dom"

const NavBar = () => {
    const [value, setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    return ( 
        <div className="nav-bar">
            <React.Fragment>
                <AppBar 
                sx={{backgroundImage:'linear-gradient(90deg, rgba(6,6,83,1) 2%, rgba(23,172,140,1) 50%, rgba(6,6,83,1) 100%)'}}
                >
                    <Toolbar>
                        {
                            isMatch?(
                                <>
                                <Typography 
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                  mr: 2,
                                  display: { xs: 'flex', md: 'none' },
                                  flexGrow: 1,
                                  fontFamily: 'monospace',
                                  fontWeight: 700,
                                  letterSpacing: '.3rem',
                                  color: 'inherit',
                                  textDecoration: 'none',
                                  paddingLeft:"10%"
                                }}>
                                     DIY Blog
                                </Typography>
                                <DrawerComp/>
                                </>
                            ): (
                                <>
                            <Tabs 
                            textColor="inherit" 
                            value={value}  
                            onChange={(e,value)=>setValue(value)} 
                            >
                                <Link to="/" style={{textDecoration:"none"}}><Tab label='Home' key={0} style={{color:'white'}} icon={<HomeIcon size='small'/>} iconPosition="start" /></Link>
                                <Link to="/new" style={{textDecoration:"none"}}><Tab label='Create New Blog' key={1} style={{color:'white'}} icon={<AddIcon size='small'/>} iconPosition="start" /></Link>
                            </Tabs>
                                </>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        </div>
     );
}
 
export default NavBar;