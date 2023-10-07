const myBookObjReducer = (state=[], action) => {
    switch(action.type){
        case "GET_MY_BOOK_OBJ":
            
            return action.payload
        default:
            return state
    }
}
export default myBookObjReducer;