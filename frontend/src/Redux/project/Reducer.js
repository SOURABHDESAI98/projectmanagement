import { FAILURE_DATA, REQUEST_DATA, POST_SUCCESS_DATA, GET_SUCCESS_DATA, GET_COUNTS_DATA, GET_CHARTS_DATA,GET_DROPDOWN_DATA } from "./ActionTypes";

const initState = {
    isLoading:false,
    isError:false,
    data : [],
    pageCount:"",
    total:"",
    closed:"",
    running:"",
    closure:"",
    cancelled:"",
    chartsTotal:[],
    chartsClosed:[],
    dropdownObject:null // for insert project page
}

export const ProjectReducer = (state=initState,action) =>{
  switch(action.type){
    case REQUEST_DATA:{
        return {
            ...state,
            isLoading:true,
            isError:false,
        } 
    }
    case POST_SUCCESS_DATA: {
		return {
			...state,
            isLoading : false,
            isError : false,
            // pageCount : action.payload.pageCount
		};
	}
    case GET_SUCCESS_DATA: {
		return {
			...state,
            isLoading : false,
            isError : false,
            data:action.payload.result,//const data = {result:[],pageCount:intValue }
            pageCount : action.payload.pageCount
		};
	}
    case GET_COUNTS_DATA: {
		return {
			...state,
            isLoading : false,
            isError : false,
            running:action.payload.running,
            total:action.payload.total,
            closure:action.payload.closure,
            closed:action.payload.closed,
            cancelled:action.payload.cancelled
		};
	}
    case GET_CHARTS_DATA: {
		return {
			...state,
            isLoading : false,
            isError : false,
            chartsClosed:action.payload.chartsClosed,
            chartsTotal:action.payload.chartsTotal
		};
	}
    case FAILURE_DATA:{
        return {
            ...state,
            isLoading:false,
            isError:true,
        } 
    }
    case GET_DROPDOWN_DATA:{
        return {
            ...state,
            dropdownObject:action.payload
        } 
    }
    default: {
        return state;
    }
  }
}