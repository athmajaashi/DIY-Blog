import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { TextField, Tooltip, Typography } from "@mui/material";

const UpdateBlog = () => {
    const [blogs, setBlogs] = useState([]) 
    const [updatedBlogs, setUpdatedBlogs] = useState({
        title:"",
        author:"",
        body:"",
        coverImg:"",
        bodyImg:""
      }) 
  
      const navigate= useNavigate();
      const location=useLocation();
  
      const blogId = location.pathname.split("/")[2]
  
        //GET
        useEffect(() => {
        const fetchAllBlogs = async () =>{
            try{
                const res = await axios.get(`http://localhost:8000/blogs/${blogId}`)
                setBlogs(res.data);
                console.log(blogs)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBlogs()
        }, []);

        //UPDATE
        const handleChange = (e) => {
          setUpdatedBlogs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };
      
        const handleClick = async (e) => {
          e.preventDefault();
          try {
            await axios.put(`http://localhost:8000/blogs/${blogId}`, updatedBlogs);
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        };
    return ( 
        <div className="update-blog">
            <Typography variant="h2" style={{textAlign:'center'}}>Edit</Typography>
            {blogs.map(blog=>(
                <FormLabel style={{display: "flex",
                    flexDirection: "column", 
                    gap: 20}}
                    sx={{
                        '& > :not(style)': { m: 1, width: '55ch' },
                        alignItems:'center'
                    }}>
                        <Typography variant="body1">Blog Title: </Typography>
                        <Input variant="standard" type='text' placeholder='Title' onChange={handleChange} name="title"  defaultValue={blog.title} />
                        <Typography variant="body1">Body Text: </Typography>
                        <TextField variant="standard" type='text' placeholder='Body Text' onChange={handleChange} name="body" defaultValue={blog.body}  />
                        <Typography variant="body1">Author: </Typography>
                        <Input variant="standard" type='text' placeholder='Author' onChange={handleChange} name="author" defaultValue={blog.author} />
                        <Typography variant="body1">Cover image link: </Typography>
                        <Tooltip title="This Image will be displayed as the cover picture of the blog in the home page" arrow>
                        <Input variant="standard" type='text' placeholder='Cover Image URL' onChange={handleChange} name="coverImg" defaultValue={blog.coverImg} />
                        </Tooltip>
                        <Typography variant="body1">Body image link: </Typography>
                        <Tooltip title="This Image will be displayed once the blog is opened" arrow>
                        <Input variant="standard" type='text' placeholder='Body Image URL' onChange={handleChange} name="bodyImg" defaultValue={blog.bodyImg} />
                        </Tooltip>
                        <Button onClick={handleClick}>Submit</Button>
                </FormLabel>
            ))}
    </div>
     );
}
 
export default UpdateBlog;