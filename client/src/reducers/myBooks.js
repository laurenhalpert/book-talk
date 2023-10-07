const myBooksReducer = (state=[], action) => {
    switch(action.type){
        case "GET_MY_BOOKS":
            
            

            return action.payload
        default:
            return state
    }
}
export default myBooksReducer;