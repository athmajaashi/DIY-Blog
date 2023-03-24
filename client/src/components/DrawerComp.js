import React, {useState} from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom"

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
    <React.Fragment>
        <Drawer open={openDrawer}
        onClose={()=>setOpenDrawer(false)}
        >
            <List>
                <ListItemButton key={0} onClick={()=> setOpenDrawer(false)}>
                    <ListItemIcon>
                        <Link to="/" style={{textDecoration:"none"}}><ListItemText style={{color:'black'}} icon={<HomeIcon size='small'/>} iconPosition="start">Home</ListItemText></Link>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton key={1} onClick={()=> setOpenDrawer(false)}>
                    <ListItemIcon>
                        <Link to="/new" style={{textDecoration:"none"}}><ListItemText style={{color:'black'}} icon={<AddIcon size='small'/>} iconPosition="start">Create New Blog</ListItemText></Link>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </Drawer>
        <IconButton sx={{color:'white', marginLeft:'auto'}} onClick={()=>setOpenDrawer(!openDrawer)}>
            <MenuIcon/>
        </IconButton>
    </React.Fragment>
    );
}


export default DrawerComp;