import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {getdata,BaseUrl, postDataAndImage,postData} from './FetchServices'

export default function MaterialTableDemFormatteddisplay() {
    const [statecol, setStatecol] = React.useState({
        columns: [
            { title: 'SubCategory Id', field: 'subcategoryid', editable:'never' },
            { title: 'Categoryid', field: 'categoryid' , editable:'never' },
            { title: 'SubCategory Name', field: 'subcategoryname' },
            { title: 'SubCategory Description', field: 'subcategorydescription' }, 
           {
              
              field: 'subcategoryicon',
              title:'Icon',
              render : rowData => <img src={`${BaseUrl}/images/${rowData.subcategoryicon}`} style={{width:30 , borderRadius:'50%'}}/>,
              editComponent:props=>(<input type='file' onChange={(event)=>setFile(event.target.files[0])}/>)

            }]
          
    })
  const [state, setState] = React.useState({
    data: []});
    const [getFile,setFile]=React.useState('');
  const readAllRecords=async()=>{
    var list= await getdata('subcategory/displayall')
    setState({data:list})
  }
  useEffect(()=>{
    readAllRecords()
  },[])
  const handleEdit=async(newData)=>{
    if (getFile =='')
    {
      let body={'subcategoryId' :newData.subcategoryid,
                'subcategoryName' :newData.subcategoryname,
                'subcategoryDescription' :newData.subcategorydescription}

      let result=await postData('subcategory/editData',body)
      if(!result)
      alert('Record Updated')
      else
      alert('fail to update record')
      }
      else{
      let formData=new FormData()
      formData.append('subcategoryId',newData.subcategoryid)
      formData.append('subcategoryIcon',getFile)
      const config={headers:{'content-type':'multipart/form-data'}}
      const result=await postDataAndImage('subcategory/editIcon',formData,config)
      if(result)
      {alert('Icon Update')}
      else
      {alert('fail to updateIcon')}
      }
      
    }
    const handleDelete=async(oldData)=>{
      let body={'subcategoryId':oldData.subcategoryid}
      
    let result=await postData('subcategory/deleteRecord',body) 
    if(!result)
    alert('Record Deleted')
    else
    alert('Fail to Delete Record')
    readAllRecords()
    
    }

    // const addNewRecord=async(newData)=>{
    //   let formData=new FormData()
    //   formData.append('subcategoryName',newData.subcategoryname)
    //   formData.append('subcategoryDescription',newData.subcategorydescription)
    //   formData.append('subcategoryIcon',getFile)
    //   const config={headers:{'content-type':'multipart/form-data'}}
    //   const result=await postDataAndImage('subcategory/addnewrecord',formData,config)
    //   readAllRecords()
    // }
  
  const View=()=>{

    return(
        <MaterialTable
      title="List of Subcategory"
      columns={statecol.columns}
      data={state.data}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       const data = [...state.data];
        //       data.push(newData);
        //       setState({ ...state, data });addNewRecord(newData)
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data }); handleEdit(newData)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });handleDelete(oldData)
            }, 600);
          }),
      }}
    />
  

    )
  }

  return (
    <div style={{ justifyContent: "center", paddingLeft: "15%" }}>{View()}</div>
  );
}
