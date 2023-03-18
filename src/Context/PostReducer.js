import {
    EDIT_POST,
    DELETE_POST,
    FETCH_POSTS,
    CREATE_POST,
    UPDATE_PAGE,
    IS_LOADING,
} from './PostAction';



export const postInitialState = {
    posts:[],
    totalCount:0,
    page:1,
    isLoading:true,
};


export const postReducer = (state=postInitialState, action) =>{    //type, paylaod

    switch(action.type){
        case FETCH_POSTS:{
            return {
                ...state,
                posts: action.payload.posts,
                totalCount:action.payload.totalCount
            }
        
        };

        case UPDATE_PAGE:{
            return {
                ...state,
                page: action.payload
   
            }
        };

        case IS_LOADING:{
            return {
                ...state,
                isLoading: action.payload
   
            }
        };

        default: return;
    }

}