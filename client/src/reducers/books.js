const userReducer = (state="", action) => {
    switch(action.type){
        case 'LOG_IN':
            return state + action.payload
        case 'LOG_OUT':
            return state=""
    }
}
export default userReducer;