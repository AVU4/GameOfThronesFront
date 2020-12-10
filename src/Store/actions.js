import {
    ACTION_CHANGE_CAPTIVE_DATA,
    ACTION_CHANGE_DATA_ARMY, ACTION_CHANGE_ENEMY_COUNTRY, ACTION_CHANGE_FREECOUNTRY,
    ACTION_CHANGE_GOLD,
    ACTION_CHANGE_HOUSE, ACTION_CHANGE_MESSAGE, ACTION_CHANGE_RESERVES, ACTION_HISTORY
} from '../Components/Header';
export const changeHouse = (newHouse) => {
    return {
        type: ACTION_CHANGE_HOUSE,
        payload: newHouse
    };
}

export const changeMessage = (newMessage) => {
    return {
      type : ACTION_CHANGE_MESSAGE,
      payload : newMessage
    };
}

export const changeHistory = (newHistory) => {
    return {
        type : ACTION_HISTORY,
        payload: newHistory
    };
}

export const changeReserves = (newData) => {
    return {
        type : ACTION_CHANGE_RESERVES,
        payload : newData
    };
}

export const changeFreeCountry = (newData) => {
    return {
        type : ACTION_CHANGE_FREECOUNTRY,
        payload : newData
    };
}

export const changeEnemyCountry = (newData) => {
    return {
        type : ACTION_CHANGE_ENEMY_COUNTRY,
        payload: newData
    }
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