import React from "react";

import lannister from "../img/Lannister_symbol.png";
import greyjoy from "../img/Greyjoy_symbol.png";
import baratheon from "../img/Baratheon_symbol.png";
import martel from "../img/Martel_symbol.png";
import stark from "../img/Stark_symbol.png";
import tyrell from "../img/Tyrell_symbol.png";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import Heroes from "./Heroes";
import Areas from "./Areas";
import Castles from "./Castles";


const styleP = {
    display : "block-inline"
};

const styleDIV = {
    display : "flex",
    justifyContent : "center"
}


class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            house: "Ланнистеры",
            gold: 0
        };
        this.choseHouse = this.choseHouse.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/house?house=" + this.state.house)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        gold : result.countGold
                    })
                }
            );
    }


    choseHouse(house){

        fetch("http://localhost:8080/house?house=" + house)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        house : house,
                        gold : result.countGold
                    })
                }
            );
    }



    render(){
        return(
            <div>
                <div style={styleDIV}>
                    <p>
                        <img onClick={(elem) =>this.choseHouse("Ланнистеры")} src={lannister} alt="Ланнистеры" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Грейджои")}  src={greyjoy} alt="Грейджои" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Баратеоны")} src={baratheon} alt="Баратеоны" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) =>this.choseHouse("Мартеллы")} src={martel} alt="Мартеллы" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Старки")} src={stark} alt="Старки" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse("Тиреллы")} src={tyrell} alt="Тиреллы" width="100" height="100"/>
                    </p>

                </div>
                <div>
                    <p>Дом - {this.state.house}</p>
                    <p>Количество золота - {this.state.gold} у. е.</p>

                </div>


                <div>
                    <BrowserRouter>
                        <div>
                            <p>
                                <Link to='/heroes'>Посмотреть лидеров Дома</Link>
                            </p>
                            <p>
                                <Link to='/areas'>Посмотреть владения Дома</Link>
                            </p>
                            <p>
                                <Link to='/castles'>Посмотреть замки Дома</Link>
                            </p>

                        </div>
                        <Switch>
                            <Route path='/heroes' render={(props) => (<Heroes house={this.state.house}/>)}/>
                            <Route path='/areas' render={(props) => (<Areas house={this.state.house}/>)}/>
                            <Route path='/castles' render={(props) => (<Castles house={this.state.house}/>)}></Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>


        );
    }
}

export default Header;

