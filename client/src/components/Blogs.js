import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import GridList from "@material-ui/core/GridList";
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@mui/material/Button';
import { CardActionArea, IconButton } from '@mui/material';
import {Link} from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Tooltip } from "@mui/material";


const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const navigate= useNavigate();

    useEffect(() => {
    const fetchAllBlogs = async () =>{
        try{
            const res = await axios.get("http://localhost:8000/blogs")
            setBlogs(res.data);
        }catch(err){
            console.log(err)
        }
    }
    fetchAllBlogs()
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/blogs/${id}`);
          navigate('/')
        } catch (err) {
          console.log(err);
        }
      };

    return ( 
        <div className="blogs">
            <GridList  cellHeight={"auto"} spacing={0} cols={4}>
            {blogs.map(blog=>(
            <GridListTile key={blog.id} style={{padding:10}} >
                <Link to={`/blogs/${blog.id}`} style={{textDecoration:"none"}}>
                <Card style={{backgroundColor:'#9bcbc1', height:'40vw'}} >
                    <CardActionArea>
                        {blog.coverImg && <CardMedia
                            component="img"
                            height='250vw'
                            image={blog.coverImg}
                            alt={blog.title}
                        />}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog.title}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontSize:'1rem'}}>
                                {blog.author}
                            </Typography>
                        </CardContent>
                </CardActionArea>
                <CardActions>
                <Tooltip title="Delete Blog">
                    <IconButton size="small" color="error" onClick={() => handleDelete(blog.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Update Blog">
                    <Button startIcon={<UpdateIcon color='action'/>} size="small" variant="text" ><Link to={`/update/${blog.id}`} style={{textDecoration:"none"}}>UPDATE</Link></Button>
                </Tooltip>
                </CardActions>
                </Card>
                </Link>
            </GridListTile>
            ))}
           </GridList> 
        </div>
     );
}
 
export default Blogs;