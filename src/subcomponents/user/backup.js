// import React, { useEffect } from "react";
// import {postData,BaseUrl} from '../FetchServices'
// import { deepOrange} from '@material-ui/core/colors';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import { styled } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
// import { isTaggedTemplateExpression } from "@babel/types";
// const useStyles = makeStyles({
//   root:{
//     display:'flex',
//     flexWrap:'wrap',
//    justifyContent:'center'
//   },
//     card: {
      
//     maxWidth: 345,
//     margin:80
//   },
//   media: {
//     height:'200px',
//     width:'275px'
//   },
//   orangeAvatar: {
//     margin: 10,
//     color: '#ff8e53',
//     backgroundColor: deepOrange[500],
//   },
// });

// function UserVideo(props){
// const classes = useStyles();
// const [getlist,setList]=React.useState([])     
// const readAllRecords=async()=>{
//     let body={'subcategoryid':props.subcategoryid}
//     var list=await postData('video/displayBySubCategoryId',body) 
//     setList(list)   
// }
// const handleAddToCart=(item)=>{
//   if(!localStorage.getItem("US_USER"))
//   {
//    props.setViews("USERLOGIN_CART",'')
//   } 
//   else
//   {var video=JSON.stringify(item)
//     localStorage.setItem('CT_V_'+item.videoid,video)} 
//    props.countCartItems()
//    }
//    const MyButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     // height: 4800,
//     padding: '0 30px',
//   });
// const handleClick=(id)=>{
//   props.setViews("EPISODE",id)
  
//   }
// const handleClickPlay=(url)=>{
//     props.setViews("PLAY",url)
    
//     }
    
// const displayList=()=>{
//  return getlist.map((item,index)=>{
//   let status=''
//   if(item.statusepisode=='Yes')
//    status='Episodes'
   
//   let cart=''
//   if(item.amount>0)
//    cart='ADD TO CART'

//   return(
//     <Card className={classes.card}>
//     <CardActionArea>
//       <CardMedia
//       component='img'
//         className={classes.media}
//         image={`${BaseUrl}/images/${item.poster}`}
//         title={item.videotitle}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="h2">
//         {item.videotitle}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//         <div>{item.videometadata}</div>    
//         <div>{item.videodescription}</div>
//         </Typography>
//         <Avatar className={classes.orangeAvatar}>{item.amount}/-</Avatar>
//         <Button size="small" color="primary" onClick={()=>handleAddToCart(item)}>
//         {cart}
//         </Button>
//         {/* <MyButton size="small" onClick={()=>handleAddToCart(item)}>{cart}</MyButton> */}
//       </CardContent>
//     </CardActionArea>
//     <CardActions>
//       <MyButton size="small"  onClick={()=>handleClickPlay(item.videourl)}>
//         Play
//       </MyButton>
//       <Button size="small" color="blue" onClick={()=>handleClick(item.videoid)}>
//         {status}
//       </Button>
//     </CardActions>
//   </Card>
  
//   )

//  })

// }
// useEffect(()=>{
// readAllRecords() 

// },[])
// return(<div className={classes.root}>
 
// {displayList()}
 
// </div>)

// }

// export default UserVideo;



