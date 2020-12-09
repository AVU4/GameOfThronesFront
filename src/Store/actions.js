import {
    ACTION_CHANGE_CAPTIVE_DATA,
    ACTION_CHANGE_DATA_ARMY,
    ACTION_CHANGE_GOLD,
    ACTION_CHANGE_HOUSE
} from '../Components/Header';
export const changeHouse = (newHouse) => {
    return {
        type: ACTION_CHANGE_HOUSE,
        payload: newHouse
    };
}

export const changeGold = (newGold) => {
    return {
        type: ACTION_CHANGE_GOLD,
        payload: newGold
    };
}

export const changeArmyData = (newData) => {
    return {
        type: ACTION_CHANGE_DATA_ARMY,
        payload: newData
    }
}

export const changeCaptiveData = (newData) => {
    return {
        type: ACTION_CHANGE_CAPTIVE_DATA,
        payload: newData
    }
}