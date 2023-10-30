import axios from "axios";
import { Navigate } from "react-router-dom";
import { FAILURE_DATA, GET_CHARTS_DATA, GET_COUNTS_DATA, GET_SUCCESS_DATA, POST_SUCCESS_DATA,GET_DROPDOWN_DATA } from "./ActionTypes";

export const createNewProject = (formData,navigate) => async (dispatch) => {//for insert page
    try {
        let response = await axios.post('http://localhost:3000/api/projects/createProject', {
            ...formData
        });
        let data = await response.data;
        console.log(data, "STATUS");
        if (data.success===true) {
            dispatch({ type: POST_SUCCESS_DATA})
            navigate("/project-listing")
        }
        else {
            dispatch({ type: FAILURE_DATA })
        }

    }
    catch (err) {
        console.log(err);
        dispatch({ type: FAILURE_DATA })
    }
}

export const getAllData = (page,limit,text,sort) => async (dispatch) => {//for project list page
    try {
        let response;
        let offsetValue=(page-1)*6;   // calculated here offset value from page, and passed it instead of page

     
        
        if(text!==""){
            response = await axios.get(`http://localhost:3000/api/projects/getSearchResults/${text}/${sort}`);
           
        }
        else{
           response = await axios.get(`http://localhost:3000/api/projects/${sort}/${offsetValue}`);

        }

        let data = await response.data;
        console.log(data,"projectListData");// pageCount is total pages and page is current page
        dispatch({type:GET_SUCCESS_DATA,payload:data})//const data = {result:[],pageCount:intValue }
    }
    catch(err){
        console.log(err);
    }
}
                         // added proname instead of obj and sort is added at last
export const updateProjectStatus = (id,proname,page,limit,sort) => async (dispatch) => {//for project list page
    let obj={
        id:id,
        proname:proname
    }
    console.log(obj);
    try{

    let response = await axios.patch('http://localhost:3000/api/projects/updateStatus',obj);
       let data = await response.data;
       console.log("response data from backend",data);
  
       dispatch(getAllData(page,limit,"",sort))// added sort parameter in updateData function
    }
    catch(err){
        console.log(err);
    }
}

export const getSliderCounts = () => async (dispatch) => {//for dashboard page
    try{
     let response = await axios.get('http://localhost:3000/api/projects/getCounts');
    
     let data = response.data;
     console.log(data);// this is array of all counts
  
     dispatch({type:GET_COUNTS_DATA,payload:{
        total:data[0],
        closed:data[1],
        cancelled:data[2],
        running:data[3],
        closure : data[4]
     }})
    }
    catch(err){
        console.log(err);
    }
}

export const getChartsData = () => async (dispatch) => {
    try{
        let response = await axios.get('http://localhost:3000/api/projects/getCharts');
        
        let data = await response.data;
        console.log("charts", data);
        dispatch({type:GET_CHARTS_DATA,payload:{
            chartsTotal:data.chartsTotal,
            chartsClosed:data.chartsClosed
        }})
    }
    catch(err){
        console.log(err);
    }
}

export const getDropdownData = () => async (dispatch) => {
    try{
        let response = await axios.get('http://localhost:3000/api/projects/getDropdownData');
        
        let data = await response.data;
        console.log("dropdown object :", data);
        dispatch({type:GET_DROPDOWN_DATA,payload:data})
    }
    catch(err){
        console.log(err);
    }
}