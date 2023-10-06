import { combineReducers } from "redux";
import userReducer from "./user";
import booksReducer from "./books";
import myBooksReducer from "./myBooks";
import myBookObjReducer from "./myBookObj";

const allReducers= combineReducers({
    user: userReducer,
    books: booksReducer,
    myBooks: myBooksReducer,
    myBookObj: myBookObjReducer
})

export default allReducers