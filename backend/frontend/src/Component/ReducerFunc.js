export const initialState = false;
export const  reducer = (state, action) => {
    console.log("Value of action is::", action, state)
    switch(action.type){
        case 'Login':
            return action.payload;
        case 'Logout':
            return action.payload;
            
        default:
            return false;
    }
}