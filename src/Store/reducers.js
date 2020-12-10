import {
    ACTION_CHANGE_CAPTIVE_DATA,
    ACTION_CHANGE_DATA_ARMY, ACTION_CHANGE_ENEMY_COUNTRY, ACTION_CHANGE_FREECOUNTRY,
    ACTION_CHANGE_GOLD,
    ACTION_CHANGE_HOUSE, ACTION_CHANGE_MESSAGE, ACTION_CHANGE_RESERVES, ACTION_HISTORY
} from "../Components/Header";

const initialState = {
    message: "Нет сообщений",
    house: "Ланнистеры",
    gold: 0,
    armyData: [],
    captiveData: [],
    enemyCountries: [],
    histories : [],
    reserves : [],
    freeCountry: []
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
        case ACTION_CHANGE_ENEMY_COUNTRY :
            return {...state, enemyCountries: action.payload}
        case ACTION_HISTORY :
            return {...state, histories: action.payload}
        case ACTION_CHANGE_RESERVES :
            return {...state, reserves: action.payload}
        case ACTION_CHANGE_FREECOUNTRY :
            return {...state, freeCountry: action.payload}
        case ACTION_CHANGE_MESSAGE :
            return {...state, message: action.payload}
    }
    return state;
};