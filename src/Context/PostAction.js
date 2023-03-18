export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST  = 'EDIT_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const IS_LOADING = 'IS_LOADING';



//
export  const setFetchPost = (payload) =>{
    console.log("payload data", payload)
    return{
        type:FETCH_POSTS,
        payload:payload,
    }
}

export  const setUpdatePage = (payload) =>{
    console.log("payload data", payload)
    return{
        type:UPDATE_PAGE,
        payload:payload,
    }
}

export  const setIsLoading = (payload) =>{
    console.log("payload data", payload)
    return{
        type:IS_LOADING,
        payload:payload,
    }
}
