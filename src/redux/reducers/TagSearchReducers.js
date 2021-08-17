const initialState = {
    loading: true,
    tagSearchData: null,
    error: false,
    message: null,
}

const tagSearchReducers = (state = initialState, action) => {
    switch (action.type) {
        case "TAG_SEARCH_DATA_PENDING":
            return {
                loading: true,
                tagSearchData: null,
                error: false,
                message:null,
            }
        case "TAG_SEARCH_DATA_SUCESS":
            return {
                loading: false,
                tagSearchData: action.tagSearchData,
                error: false,
                message: null
            }
        case "TAG_SEARCH_DATA_FAILURE":
            return {
                loading: false,
                tagSearchData: null,
                error: true,
                message:action.message
                }
        default:
            return{...state}
    }
    
}

export default tagSearchReducers;