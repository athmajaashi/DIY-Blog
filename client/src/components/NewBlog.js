import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { Tooltip, Typography } from "@mui/material";

const NewBlog = () => {
    const [blogs, setBlogs] = useState({
        title:"",
        author:"",
        body:"",
        coverImg:"",
        bodyImg:""
      });

      const navigate= useNavigate();
    
      const handleChange = (e) => {
        console.log(e)
        setBlogs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8000/new", blogs);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };
    return ( 
        <div className="new-blog" style={{padding:10}}>
          <Typography variant="h2" style={{textAlign:'center'}}>Create New Blog</Typography>
          <FormLabel style={{display: "flex",
          flexDirection: "column", 
          gap: 20}}
          sx={{
            '& > :not(style)': { m: 1, width: '55ch' },
            alignItems:'center'
          }}>
            <Typography variant="body1">Blog Title: </Typography>
            <Input variant="standard" type='text' placeholder='Title' onChange={handleChange} name="title" inputProps={{maxlength:225}} />
            <Typography variant="body1">Body Text: </Typography>
            <Input variant="standard" type='text' placeholder='Body Text' onChange={handleChange} name="body" inputProps={{maxlength:10000}}  />
            <Typography variant="body1">Author: </Typography>
            <Input variant="standard" type='text' placeholder='Author' onChange={handleChange} name="author" inputProps={{maxlength:45}}  />
            <Typography variant="body1">Cover image link: </Typography>
            <Tooltip title="This Image will be displayed as the cover picture of the blog in the home page" arrow>
            <Input variant="standard" type='text' placeholder='Cover Image URL' onChange={handleChange} name="coverImg" inputProps={{maxlength:1000}} />
            </Tooltip>
            <Typography variant="body1">Body image link: </Typography>
            <Tooltip title="This Image will be displayed once the blog is opened" arrow>
              <Input variant="standard" type='text' placeholder='Body Image URL' onChange={handleChange} name="bodyImg" inputProps={{maxlength:1000}} />
            </Tooltip>
            <Button onClick={handleClick}>Submit</Button>
      </FormLabel>
        </div>
     );
}
 
export default NewBlog;