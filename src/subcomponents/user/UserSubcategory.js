import React, { useEffect } from "react"
import {postData,BaseUrl} from '../FetchServices'

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
   justifyContent:'center'
  },
    card: {
      
    maxWidth: 345,
    margin:10
  },
  media: {
    width:'100%',
    height:'50%'
  },
});

function UserSubcategory(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
    let body={'categoryid':props.categoryid}
    var list=await postData('subcategory/displayByCategoryId',body) 
    setList(list)   
}
const handleClick=(subcategoryid)=>{
props.setViews('VIDEOS',subcategoryid)  
}
const displayList=()=>{
 return getlist.map((item,index)=>{

  return(
    <Card className={classes.card}  elevation={20}>
    <CardActionArea onClick={()=>handleClick(item.subcategoryid)}>
      <CardMedia
      component='img'
        className={classes.media}
        image={`${BaseUrl}/images/${item.subcategoryicon}`}
        title={item.subcategoryname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.subcategoryname}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {item.subcategorydescription}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
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

export default UserSubcategory;



