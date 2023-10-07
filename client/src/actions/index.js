export const logIn= (usr) => {
    return{
        type: 'LOG_IN',
        payload: usr
    }
}

export const logOut=() => {
    return{
        type:'LOG_OUT'
    }
}

export const getBooks= (books)=>{
    return{
        type: "GET_BOOKS",
        payload: books
    }
}

export const getMyBooks=(books) => {
    return{
        type: "GET_MY_BOOKS",
        payload: books
    }
}

export const getMyBookObj=(obj) => {
    return{
        type: "GET_MY_BOOK_OBJ",
        payload: obj
    }
}

export const getThisBook=(obj) => {
    return {
        type: "GET_THIS_BOOK",
        payload: obj
    }
}

export const getMyThisBook=(obj) => {
    return {
        type: "GET_MY_THIS_BOOK",
        payload: obj
    }
}

export const getPosts = (posts) => {
    return {
        type: "GET_POSTS",
        payload: posts
    }
}