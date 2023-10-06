import { combineReducers } from "redux";
import userReducer from "./user";
import booksReducer from "./books";
import myBooksReducer from "./myBooks";

const allReducers= combineReducers({
    user: userReducer,
    books: booksReducer,
    myBooks: myBooksReducer
})

export default allReducers