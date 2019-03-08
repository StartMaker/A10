import {Events} from "../../action/event";

// const initState = {
//     character: null,
//     login: false
// };

export default function (state = {}, action) {
    console.log(action);
    switch (action.todo) {
        case Events.LOGIN:
            return {
                ...state
            };
        case Events.REGISTER:
            return;
        default:
            return state;
    }
}