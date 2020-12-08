import React from "react";

import lannister from "../img/Lannister_symbol.png";
import greyjoy from "../img/Greyjoy_symbol.png";
import baratheon from "../img/Baratheon_symbol.png";
import martel from "../img/Martel_symbol.png";
import stark from "../img/Stark_symbol.png";
import tyrell from "../img/Tyrell_symbol.png";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import Information from "./Information";
import Warfare from "./Warfare";
import {connect} from 'react-redux';
import {changeGold, changeHouse} from "../Store/actions";
import {bindActionCreators} from "redux";


export const ACTION_CHANGE_HOUSE = "ACTION_CHANGE_HOUSE";
export const ACTION_CHANGE_GOLD = "ACTION_CHANGE_GOLD";


const styleDIV = {
    display : "flex",
    justifyContent : "center",

}




class Header extends React.Component{

    constructor(props) {
        super(props);
        this.choseHouse = this.choseHouse.bind(this);
    }



    componentDidMount() {
        fetch("http://localhost:8080/house?house=" + this.props.house)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.changeGold(result.countGold)
                }
            );
    }


    choseHouse(house){
        this.props.changeHouse(house);
        fetch("http://localhost:8080/house?house=" + house)
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
                        <img onClick={(elem) => this.choseHouse("Ланнистеры")} src={lannister} alt="Ланнистеры" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Грейджои")}  src={greyjoy} alt="Грейджои" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Баратеоны")} src={baratheon} alt="Баратеоны" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Мартеллы")} src={martel} alt="Мартеллы" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Старки")} src={stark} alt="Старки" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Тиреллы")} src={tyrell} alt="Тиреллы" width="100" height="100"/>
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
                        </div>
                        <Switch>
                            <Route path='/information' render={(p) => (<Information house={this.props.house}/>)}/>
                            <Route path='/warfare' render={(p) => (
                                    <Warfare house={this.props.house}/>
                                )}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        house: state.house,
        gold: state.gold
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeGold : bindActionCreators(changeGold, dispatch),
        changeHouse : bindActionCreators(changeHouse, dispatch)
    };
}

export default connect(putStateToProps, putActionToProps)(Header);

