import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeCaptiveData, changeGold, changeHouse} from "../Store/actions";
import {styleSelect} from "./Header";

const putStateToProps = (state) => {
    return {
        house: state.house,
        gold: state.gold,
        captiveData : state.captiveData
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeGold : bindActionCreators(changeGold, dispatch),
        changeCaptiveData: bindActionCreators(changeCaptiveData, dispatch)
    };
}

class Redemptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            captive : ""
        }

        this.changeCaptive = this.changeCaptive.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }


    componentWillMount() {
        fetch("http://localhost:8080/othercaptives?house=" + this.props.house)
            .then(response => response.json())
            .then(res => {
                this.props.changeCaptiveData(res);

            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house != this.props.house) {
            fetch("http://localhost:8080/othercaptives?house=" + this.props.house)
                .then(response => response.json())
                .then(res => {
                    this.props.changeCaptiveData(res);

                })
        }
    }

    changeCaptive(event) {
        this.setState({
            captive : event.target.value
        })

    }

    handleOnSubmit(e){
        if (this.state.captive !== ""){
            const parameters = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name : this.state.captive
                })
            }
            fetch('http://localhost:8080/captive', parameters)
                .then(response => response.json())
                .then(res => {
                    this.props.changeGold(res);
                    fetch("http://localhost:8080/othercaptives?house=" + this.props.house)
                        .then(response => response.json())
                        .then(res => {
                            this.props.changeCaptiveData(res);

                        })
                });
        }
        e.preventDefault();
    }


    render() {
        return(
            <div>
                <p>Цена любого заложника 30 000 у. е.</p>
                <form onSubmit={this.handleOnSubmit}>

                    <select onClick={this.changeCaptive} onChange={this.changeCaptive}>
                        {this.props.captiveData.map((elem) => {
                            return(<option value={elem.hero.name}>{elem.hero.name}</option> );
                        })}
                    </select>
                    <input className="button" type="submit" value="Совершить сделку"/>
                </form>
            </div>
        );
    }

}

export default connect(putStateToProps, putActionToProps)(Redemptions);
