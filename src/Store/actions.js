import {ACTION_CHANGE_GOLD, ACTION_CHANGE_HOUSE} from '../Components/Header';
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