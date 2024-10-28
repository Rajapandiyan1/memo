"use client"

import React, { useEffect, useReducer, useState } from 'react'
const initialState = {
    title: '',
    description: ''
  };
  
  // 2. Define the reducer function
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_TITLE':
        return { ...state, title: action.payload };
      case 'SET_DESCRIPTION':
        return { ...state, description: action.payload };
        case 'RESET':
        return { title:action.payload, description:action.payload};
      default:
        return state;
    }
  }


  
function Inputs() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [edit,setedit]=useState(false);
    const [data,setdata]=useState([]);
    const [editId,seteditId]=useState('');
    const [submitload,setsubmitload]=useState(false);
    const [deleteload,setdeleteload]=useState(false);
    const [loading,setloading]=useState(true);

    const [editIndex,seteditIndex]=useState('');

    // 4. Handle changes for each input
    const handleTitleChange = (e) => {
      dispatch({ type: 'SET_TITLE', payload: e.target.value });
    };
 async   function updates(e) {
  if(state.title!="" && state.description!="") return

  setsubmitload(true)
      e.preventDefault();
     await fetch("http://localhost:3001/api/replaceMyMemo/"+editId,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(state)
      }).then((data)=>{
        return data.json();
    }).then((datas)=>{
      let copy=[...data];
      console.log(datas.data)
      copy.splice(editIndex,1,{_id:datas.data._id,...state});
      setdata(copy);
      dispatch({type:"RESET",payload:""});
      setedit(false)

    }).finally(()=>{
      setsubmitload(false)
    })
    
    }
  function edits(id,data,index) {
    dispatch({type:'SET_TITLE',payload:data.title});
    dispatch({type:'SET_DESCRIPTION',payload:data.description}); 
    setedit(true);
    seteditId(id);
    seteditIndex(index);
  }
  function Cancel(e) {
    e.preventDefault();
    dispatch({type:"RESET",payload:""});
    setedit(false)
  }
    const handleDescriptionChange = (e) => {
      dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value });
    };
 async function deletes(index,id) {
  setdeleteload(true)
  fetch("http://localhost:3001/api/deleteMyMemo/"+id,{
    method:"DELETE",
    headers:{
      
    }
  }).then((data)=>{
    return data.json();
}).then((data1)=>{
  let copy=[...data];
  copy.splice(index,1);
    setdata(copy);

}).finally(()=>{
  setdeleteload(false)
})
  }
    // 5. Form submission (or other usage of state)
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(state)
      console.log(state.title!="" && state.description!="")
      if(state.title=="" && state.description=="") return
      console.log(state)
      setsubmitload(true)
      fetch("http://localhost:3001/api/addMyMemo",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(state)
      }).then((data)=>{
        return data.json();
    }).then((data)=>{
        setdata((prev)=>{return[...prev,data.data]});
      dispatch({type:"RESET",payload:""})
return data;
    }).finally(()=>{
      setsubmitload(false)
    })
    };
    useEffect(()=>{
      setloading(true);
      fetch("http://localhost:3001/api/getMymemo").then((data)=>{
          return data.json();
      }).then((data)=>{
          setdata(data.data);
      }).finally(()=>{
        setloading(false)
      })
  },[])
  return (
    <>
    <form method='POST' encType='multipart/form-data'>
        <div className="row">
        <div className="col-12 mt-3 col-md-6 col-lg-4 order-1 order-lg-1">
            <label className='form-label' htmlFor="">Enter your Memo Tittle</label>
        </div>

        <div className="col-12 mt-3 col-md-6 col-lg-4 order-3 order-lg-2">Enter your Memo describtion</div>
        <div className="col-12 mt-3 col-md-6 col-lg-4 order-6 order-lg-3">

        </div>
            <div className="col-12 mt-3 col-md-6 col-lg-4  order-2 order-lg-4"><input disabled={submitload} placeholder='Enter your Memo Title' value={state.title} type="text" onInput={(e)=>{handleTitleChange(e)}} className='form-control '/></div>


            <div className="col-12 mt-3 col-md-6 col-lg-4 order-4 order-lg-5"><input disabled={submitload} placeholder='Enter Your Describtion Memo' value={state.description} onInput={(e)=>{handleDescriptionChange(e)}} type="text" className='form-control'/></div>


            {!edit ? <div className="col-12 order-5 mt-3 d-flex justify-content-end justify-content-lg-center  col-lg-4 order-lg-6"><button disabled={submitload} onClick={(e)=>{handleSubmit(e)}} className="btn btn-success">Submit</button></div> : <div className="col-12 order-5 mt-3 d-flex justify-content-end justify-content-lg-center  col-lg-4 order-lg-6"><button disabled={submitload} onClick={(e)=>{Cancel(e)}} className="btn btn-warning me-2">Cancel</button><button disabled={submitload} onClick={(e)=>{updates(e)}} className="btn btn-success" >Update</button></div> }
        </div>
    </form>
    {data.length!=0 && !loading &&
    <div className='row mt-5 justify-content-around'>
{data.map((datas,index)=>{
  return <>
  <div key={index} className="col-12  col-lg-5 mt-1 border-memo">
    <div className="row">
  <div className='col-6 col-sm-4 p-2'>
    <label htmlFor="" className='text-primary'>Memo Title</label><br />
    {datas.title}</div>
  <div className='col-6 col-sm-4 p-2'>
    <label htmlFor="" className='text-primary'>Memo Description</label><br />
    {datas.description}</div>
  <div className='col-6 col-sm-2 d-flex align-items-start  justify-content-center '><button className="btn btn-sm btn-warning" onClick={()=>{edits(datas._id,datas,index)}}>Edit</button></div>
  <div className='col-6 col-sm-2 d-flex align-items-start flex-direction-row  justify-content-center '><button disabled={deleteload} className="btn btn-sm btn-danger" onClick={()=>{deletes(index,datas._id);}}>Delete</button></div>
    </div>
  </div>

  </>
})}
    </div>}
    {data.length==0 && !loading && <div className="d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
    Invalid Memo</div>}
    {loading && <div className="d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>}
    </>
  )
}

export default Inputs