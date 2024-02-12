import React, { useEffect } from "react"
import VideoPlayer from "react-happy-video";
import {BaseUrl} from '../FetchServices'
export default function PlayVideo(props){
return(
   
   
  
   <VideoPlayer
        width="1000px"
        color="#3b3346"
        source={`${BaseUrl}/images/${props.url}`}
    />
    
)

}