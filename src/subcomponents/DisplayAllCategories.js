import React, { useEffect } from "react"
import {getData,BaseUrl} from './FetchServices'
 

function DisplayAllCategories(props){
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
var list=await getData('category/displayall') 
setList(list)   
}
const displayList=()=>{
 return getlist.map((item,index)=>{

  return(<tr><td>{item.categoryid}</td><td>{item.categoryname}</td><td><img src={`${BaseUrl}/images/${item.categoryicon}`} width='30' height='30'></img></td></tr>)

 })

}
useEffect(()=>{
readAllRecords() 

},[])
return(<div>
<table border='1'>
<caption>List of Categories</caption>    
<tr><th>Category Id</th><th>Category Name</th><th>Icon</th></tr>    
{displayList()}
</table>
</div>)

}

export default DisplayAllCategories;



