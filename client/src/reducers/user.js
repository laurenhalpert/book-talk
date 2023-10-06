const userReducer = (state={}, action) => {
    switch(action.type){
        case 'LOG_IN':
            
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                image_url: action.payload.image_url,
                bio: action.payload.bio
            }
            
        case 'LOG_OUT':
            return {}
        default:
            return state
    }
}
export default userReducer;