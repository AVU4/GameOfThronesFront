import {ACTION_CHANGE_GOLD, ACTION_CHANGE_HOUSE} from "../Components/Header";

const initialState = {
    house: "Ланнистеры",
    gold: 0,
    armyData: []
};

export const HeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_HOUSE :
            return {...state, house : action.payload};
        case ACTION_CHANGE_GOLD :
            return {...state, gold: action.payload};
    }
    return state;
};