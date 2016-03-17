export const SAY_WORLD = 'SAY_WORLD';

export function SayWorld(delay = 1000) {
    return dispatch => {
        setTimeout(() => {
            dispatch({type: SAY_WORLD})
        }, delay)
    }
}


export const SAY_CHEVALIER = 'SAY_CHEVALIER';

export function SayChevalier() {
    return {
        type: SAY_CHEVALIER
    }
}


export const SAY_SOMETHING = 'SAY_SOMETHING';

export function SaySomething(someThing) {

    return {
        type: SAY_SOMETHING,
        someThing
    }
}