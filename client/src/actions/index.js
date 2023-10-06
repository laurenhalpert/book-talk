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