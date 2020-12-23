import React from "react";

import lannister from "../img/Lannister_symbol.png";
import greyjoy from "../img/Greyjoy_symbol.png";
import baratheon from "../img/Baratheon_symbol.png";
import martel from "../img/Martel_symbol.png";
import stark from "../img/Stark_symbol.png";
import tyrell from "../img/Tyrell_symbol.png";
import crow from "../img/crow.png";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import Information from "./Information";
import Warfare from "./Warfare";
import {connect} from 'react-redux';
import {changeGold, changeHouse, changeMessage} from "../Store/actions";
import {bindActionCreators} from "redux";
import Politics from "./Politics";
import History from "./History";


export const ACTION_CHANGE_HOUSE = "ACTION_CHANGE_HOUSE";
export const ACTION_CHANGE_GOLD = "ACTION_CHANGE_GOLD";
export const ACTION_CHANGE_DATA_ARMY = "ACTION_CHANGE_DATA_ARMY";
export const ACTION_CHANGE_CAPTIVE_DATA = "ACTION_CHANGE_CAPTIVE_DATA";
export const ACTION_CHANGE_ENEMY_COUNTRY = "ACTION_CHANGE_ENEMY_COUNTRY";
export const ACTION_HISTORY = "ACTION_HISTORY";
export const ACTION_CHANGE_RESERVES = "ACTION_CHANGE_RESERVES"
export const ACTION_CHANGE_FREECOUNTRY = "ACTION_CHANGE_FREECOUNTRY";
export const ACTION_CHANGE_MESSAGE = "ACTION_CHANGE_MESSAGE";


const styleDIV = {
    display : "flex",
    justifyContent : "center",

}

const styleImg = {
    position : "fixed",
    bottom : "0",
    right : "0"
}

const styleSpeech = {
    position: "fixed",
    bottom: "100px",
    right: "80px"
}

class Header extends React.Component{

    constructor(props) {
        super(props);
        this.choseHouse = this.choseHouse.bind(this);
    }



    componentDidMount() {
        this.props.changeMessage("Нет сообщений");
        fetch("http://localhost:20860/house?house=" + this.props.house)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.changeGold(result.countGold)
                });
    }


    choseHouse(house){
        this.props.changeHouse(house);
        fetch("http://localhost:20860/house?house=" + house)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.changeGold(result.countGold)
                }
            );
    }



    render(){
        return(
            <div>
                <div style={styleDIV}>
                    <p>
                        <img className="img" onClick={(elem) => this.choseHouse("Ланнистеры")} src={lannister} alt="Ланнистеры" width="100" height="100"/>
                    </p>
                    <p>
                        <img className="img" onClick={(elem) => this.choseHouse("Грейджои")}  src={greyjoy} alt="Грейджои" width="100" height="100"/>
                    </p>
                    <p>
                        <img className="img" onClick={(elem) => this.choseHouse("Баратеоны")} src={baratheon} alt="Баратеоны" width="100" height="100"/>
                    </p>
                    <p>
                        <img className="img" onClick={(elem) => this.choseHouse("Мартеллы")} src={martel} alt="Мартеллы" width="100" height="100"/>
                    </p>
                    <p>
                        <img className="img" onClick={(elem) => this.choseHouse("Старки")} src={stark} alt="Старки" width="100" height="100"/>
                    </p>
                    <p>
                        <img className="img" onClick={(elem) => this.choseHouse("Тиреллы")} src={tyrell} alt="Тиреллы" width="100" height="100"/>
                    </p>

                </div>
                <div>
                    <p>Дом - {this.props.house}</p>
                    <p>Количество золота - {this.props.gold} у. е.</p>

                </div>
                <div>
                    <BrowserRouter>
                        <div>
                            <p style={{display : "inline-block", marginRight : "10px"}}>
                                <Link to='/information'>Посмотреть информацию о Доме</Link>
                            </p>
                            <p style={{display : "inline-block", marginRight : "10px"}}>
                                <Link to='/warfare'>Военное дело Дома</Link>
                            </p>
                            <p style={{display : "inline-block", marginRight : "10px"}}>
                                <Link to='/politics'>Политика Дома</Link>
                            </p>
                            <p style={{display : "inline-block", marginRight : "10px"}}>
                                <Link to='/history'>История</Link>
                            </p>
                        </div>
                        <Switch>
                            <Route path='/information' render={(p) => (<Information house={this.props.house}/>)}/>
                            <Route path='/warfare' render={(p) => (<Warfare house={this.props.house}/>)}/>
                            <Route path='/politics' render={(p) => (<Politics house={this.props.house}/>)}/>
                            <Route path='/history' render={(p) => (<History/>)}/>
                        </Switch>
                    </BrowserRouter>
                        <div style={styleSpeech}>
                            <p className="speech">{this.props.message}</p>
                        </div>
                        <img style={styleImg} src={crow} alt="crow" width="150px" height="150px"/>
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        house: state.house,
        gold: state.gold,
        message : state.message
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeGold : bindActionCreators(changeGold, dispatch),
        changeHouse : bindActionCreators(changeHouse, dispatch),
        changeMessage : bindActionCreators(changeMessage, dispatch)
    };
}

export default connect(putStateToProps, putActionToProps)(Header);

