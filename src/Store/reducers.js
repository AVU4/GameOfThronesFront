import {
    ACTION_CHANGE_CAPTIVE_DATA,
    ACTION_CHANGE_DATA_ARMY,
    ACTION_CHANGE_GOLD,
    ACTION_CHANGE_HOUSE
} from "../Components/Header";

const initialState = {
    house: "Ланнистеры",
    gold: 0,
    armyData: [],
    captiveData: []
};

export const HeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_HOUSE :
            return {...state, house : action.payload};
        case ACTION_CHANGE_GOLD :
            return {...state, gold: action.payload};
        case ACTION_CHANGE_DATA_ARMY :
            return {...state, armyData: action.payload};
        case ACTION_CHANGE_CAPTIVE_DATA :
            return {...state, captiveData: action.payload };
    }
    return state;
};