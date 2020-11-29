import React from "react";

import lannister from "../img/Lannister_symbol.png";
import greyjoy from "../img/Greyjoy_symbol.png";
import baratheon from "../img/Baratheon_symbol.png";
import martel from "../img/Martel_symbol.png";
import stark from "../img/Stark_symbol.png";
import tyrell from "../img/Tyrell_symbol.png";
import "../Styles/headerStyle.module.css";
import background from "../img/background.png";






class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = { house: ""};
        this.choseHouse = this.choseHouse.bind(this);
    }

    choseHouse(id){

        switch (id) {
            case 1: this.setState({house: "Ланнистеры"}); break;
            case 2: this.setState({house: "Грейджои"}); break;
            case 3: this.setState({house: "Баратеоны"});  break;
            case 4: this.setState({house: "Мартеллы"}); break;
            case 5: this.setState({house: "Старки"}); break;
            case 6: this.setState({house: "Тиреллы"}); break;
        }
    }



    render(){
        return(
            <div>
                <div>
                    <p>
                        <img onClick={(elem) =>this.choseHouse(1)} src={lannister} alt="Ланнистеры" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse(2)}  src={greyjoy} alt="Грейджои" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse(3)} src={baratheon} alt="Баратеоны" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) =>this.choseHouse(4)} src={martel} alt="Мартеллы" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse(5)} src={stark} alt="Старки" width="100" height="100"/>
                    </p>
                    <p>
                        <img onClick={(elem) => this.choseHouse(6)} src={tyrell} alt="Тиреллы" width="100" height="100"/>
                    </p>

                </div>
                

            </div>


        );
    }
}

export default Header;

