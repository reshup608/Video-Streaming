import React, {useEffect} from "react"
import {getdata,BaseUrl} from "./FetchServices"
// import MaterialTable from 'material-table';

function Displayall(props)
{
    const [getlist,setlist]=React.useState([])
    const readAllRecords=async()=>{
        var list=await getdata('subcategory/displayall')
        setlist(list)
    }
    const displaylist=()=>{
        return getlist.map((item,index)=>{
       
            return(<tr><td>{item.subcategoryid}</td><td>{item.subcategoryname}</td><td><img src={`${BaseUrl}/images/${item.subcategoryicon}`} width='30' height='30'></img></td></tr>)
        })
    }
    useEffect(()=>{
        readAllRecords()
    },[])
    return (<div>
        <table border='1'>
            <caption>List Of Subcategories</caption>
            <tr><th>Subcategory ID</th><th>Subcategory Name</th><th>Icon</th></tr>
            {displaylist()}
        </table>

    </div>)
}

export default Displayall;