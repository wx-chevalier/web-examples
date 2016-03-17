import * as actions from "../actions/actions";

export default Reducer(state = "Initialization", action)
{
    switch (action.type) {
        case actions.SAY_CHEVALIER:
        {
            return "Chevalier";
        }
        case actions.SAY_WORLD:{
            return "World";
        }
        case actions.SAY_SOMETHING:{
            return action.someThing;
        }
        default:{
            return state;
        }
    }

}