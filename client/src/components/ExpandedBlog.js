import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const ExpandedBlog = () => {
    const location=useLocation();
    const navigate= useNavigate();
    
    const [blogs, setBlogs] = useState([])
    const blogId = location.pathname.split("/")[2]

    //GET
    useEffect(() => {
    const fetchAllBlogs = async () =>{
        try{
            const res = await axios.get(`http://localhost:8000/blogs/${blogId}`)
            setBlogs(res.data);
        }catch(err){
            console.log(err)
        }
    }
    fetchAllBlogs()
    }, []);

    //DELETE
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/blogs/${id}`);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };
    return ( 
        <div className="expanded-blog" style={{padding:20, paddingLeft:40}}>
            {blogs.map(blog=>(
            <Box sx={{ width: '100%', maxWidth: '80%' }}>
                <img src={blog.bodyImg} style={{maxWidth:'100%', maxHeight:'50%', paddingBottom:20}} alt={blog.title}/>
                <Typography variant='h4' >{blog.title}</Typography>
                <Typography variant='h6' gutterBottom>Written by: {blog.author}</Typography>
                <Typography variant="body1" sx={{textAlign:'justify'}} gutterBottom>{blog.body}</Typography>
                <IconButton size="small" color="error" onClick={() => handleDelete(blog.id)}>
                        <DeleteIcon/>
                </IconButton>
                <Button startIcon={<UpdateIcon color='action'/>} size="small" variant="text" ><Link to={`/update/${blog.id}`} style={{textDecoration:"none"}}>UPDATE</Link></Button> 
            </Box>
        ))}
        
        </div>
     );
}
 
export default ExpandedBlog;