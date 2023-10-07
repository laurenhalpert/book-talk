const myThisBookReducer = (state={}, action) => {
    switch(action.type){
        case "GET_MY_THIS_BOOK":
            
            return {
                ...state,
                id: action.payload.id,
                title: action.payload.title,
                author_first_name: action.payload.author_first_name,
                author_last_name: action.payload.author_last_name,
                genre: action.payload.genre,
                description: action.payload.description,
                book_image: action.payload.book_image
            }
        default:
            return state
    }
}
export default myThisBookReducer;