const booksReducer = (state=[], action) => {
    switch(action.type){
        case "GET_BOOKS":
            // console.log(action.payload)
            // let bookArray = action.payload
            // let book;
            // for (let i=0; i<bookArray.length; i++){
            //     book = bookArray[i]
            //     state.append(book)
            // }
            

            return action.payload
        default:
            return state
    }
}
export default booksReducer;