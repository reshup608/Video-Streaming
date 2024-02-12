import React, { useEffect } from "react";
import {postData,BaseUrl} from '../FetchServices'
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { deepOrange} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import  { MuiCard } from '@material-ui/core/Card';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { isTaggedTemplateExpression } from "@babel/types";
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root:{
    display:'flex',
    flexWrap:'wrap',
   justifyContent:'center'
  },
  
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
    card: {
      
    maxWidth: 345,
    margin:50
  },
  media: {
    height:'200px',
    width:'275px'
  },
  orangeAvatar: {
    margin: 10,
    color: '#ff8e53',
    backgroundColor: deepOrange[500],
  },
});
Card.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};

function UserVideo(props){
  
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
    let body={'subcategoryid':props.subcategoryid}
    var list=await postData('video/displayBySubCategoryId',body) 
    setList(list)   
}
const handleAddToCart=(item)=>{
  if(!localStorage.getItem("US_USER"))
  {
   props.setViews("USERLOGIN_CART",'')
  } 
  else
  {var video=JSON.stringify(item)
    localStorage.setItem('CT_V_'+item.videoid,video)} 
   props.countCartItems()
   }
   const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    // height: 4800,
    padding: '0 30px',
  });
const handleClick=(id)=>{
  props.setViews("EPISODE",id)
  
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
const handleClickPlay=(url)=>{
    props.setViews("PLAY",url)
    
    }
    
const displayList=()=>{
 return getlist.map((item,index)=>{
  let status=''
  if(item.statusepisode=='Yes'){
   status=<Button size="small" color="blue" onClick={()=>handleClick(item.videoid)}>
  Episodes 
 </Button>
}
   
  let cart=''
  if(item.amount>0)
   cart=<Button size="small" color="primary" onClick={()=>handleAddToCart(item)}>
   Add to Cart
    </Button>

  return(
    <Card className={classes.card} elevation={20} raised= "PropTypes.bool">
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
            
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={item.videotitle}
        
      />
      <CardMedia
        className={classes.media}
        image={`${BaseUrl}/images/${item.poster}`}
       title={item.videotitle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        <div>{item.videometadata}</div>    
       
        </Typography>
        <Avatar className={classes.orangeAvatar}>{item.amount}/-</Avatar>
        {/* <Button size="small" color="primary" onClick={()=>handleAddToCart(item)}>
        {cart}
         </Button> */}
         {cart}
      </CardContent>
        <CardActions>
     <MyButton size="small"  onClick={()=>handleClickPlay(item.videourl)}>
         Play
       </MyButton>
       {/* <Button size="small" color="blue" onClick={()=>handleClick(item.videoid)}>
         {status}
       </Button> */}
       {status}
     </CardActions>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="10" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
         
          <Typography paragraph>
          <div>{item.videodescription}</div>
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  
  //   <Card className={classes.card}>
  //   <CardActionArea>
  //     <CardMedia
  //     component='img'
  //       className={classes.media}
  //       image={`${BaseUrl}/images/${item.poster}`}
  //       title={item.videotitle}
  //     />
  //     <CardContent>
  //       <Typography gutterBottom variant="h5" component="h2">
  //       {item.videotitle}
  //       </Typography>
  //       <Typography variant="body2" color="textSecondary" component="p">
  //       <div>{item.videometadata}</div>    
  //       <div>{item.videodescription}</div>
  //       </Typography>
  //       <Avatar className={classes.orangeAvatar}>{item.amount}/-</Avatar>
  //       <Button size="small" color="primary" onClick={()=>handleAddToCart(item)}>
  //       {cart}
  //       </Button>
  //       {/* <MyButton size="small" onClick={()=>handleAddToCart(item)}>{cart}</MyButton> */}
  //     </CardContent>
  //   </CardActionArea>
  //   <CardActions>
  //     <MyButton size="small"  onClick={()=>handleClickPlay(item.videourl)}>
  //       Play
  //     </MyButton>
  //     <Button size="small" color="blue" onClick={()=>handleClick(item.videoid)}>
  //       {status}
  //     </Button>
  //   </CardActions>
  // </Card>
  
  )

 })

}
useEffect(()=>{
readAllRecords() 

},[props.subcategoryid])
return(<div className={classes.root}>
 
{displayList()}
 
</div>)

}

export default UserVideo;



