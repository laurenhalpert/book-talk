const myBookObjReducer = (state=[], action) => {
    switch(action.type){
        case "GET_MY_BOOK_OBJ":
            // return {
            //     ...state,
            //     id: action.payload.id,
            //     book_id: action.payload.book_id,
            //     user_id: action.payload.user_id
            // }
            return action.payload
        default:
            return state
    }
}
export default myBookObjReducer;