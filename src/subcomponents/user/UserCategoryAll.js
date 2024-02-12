import React ,{useEffect}from 'react';
import {getData,BaseUrl} from '../FetchServices'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root:{
    display:'flex',
    flexWrap:'wrap',
    

  },
    card: {
    colorAdjust:"blue",  
    maxWidth: 445,
    margin:50
  },
  iconColor:{
    color:'rgb(250,250,250)'
 },
  media: {
    
    height:'300px',
    width:'275px'


  },
});

export default function UserCategoryAll(props) {
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
var list=await getData('category/displayall') 
setList(list)   
}

const handleClick=(categoryid)=>{
props.setViews('SUBCATEGORY',categoryid)
}


  const displayList=()=>{
    return getlist.map((item,index)=>{
   
     return(
       <Card className={classes.card} elevation={20}>
       <CardActionArea onClick={()=>handleClick(item.categoryid)}>
         <CardMedia
           className={classes.media}
           image={`${BaseUrl}/images/${item.categoryicon}`}
           title={item.categoryname}
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="h2">
           {item.categoryname}
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
           {item.categorydescription}
           </Typography>
         </CardContent>
       </CardActionArea>
       {/* <CardActions>
         <Button size="small" color="primary">
           Share
         </Button>
         <Button size="small" color="primary">
           Learn More
         </Button>
       </CardActions> */}
     </Card>
     
     )
   
    })
   
   }
   useEffect(()=>{
   readAllRecords() 
   
   },[])
   return(<div className={classes.root}>
    
   {displayList()}
    
   </div>)
   
   }
   
   export  {UserCategoryAll}
   