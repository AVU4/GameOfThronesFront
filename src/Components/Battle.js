import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {changeArmyData, changeEnemyCountry, changeMessage} from "../Store/actions";

const putStateToProps = (state) => {
    return {
        house: state.house,
        armyData: state.armyData,
        enemyCountries: state.enemyCountries,
        message: state.message
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeArmyData : bindActionCreators(changeArmyData, dispatch),
        changeEnemyCountry : bindActionCreators(changeEnemyCountry, dispatch),
        changeMessage : bindActionCreators(changeMessage, dispatch)
    };
}

class Battle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            armyId : "",
            country : "",
        }

        this.changeCountry = this.changeCountry.bind(this);
        this.changeArmyId = this.changeArmyId.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentWillMount() {
        fetch("http://localhost:8080/armies?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                    this.props.changeArmyData(response)
                }
            );
        fetch("http://localhost:8080/enemycountry?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.props.changeEnemyCountry(response)
            })
    }

    componentDidMount() {
        document.getElementById("message").innerHTML = "";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/armies?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.props.changeArmyData(response)
                });
            fetch("http://localhost:8080/enemycountry?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.props.changeEnemyCountry(response);
                })
        }
    }

    changeCountry(event){
        this.setState({
            country : event.target.value
        })
    }

    changeArmyId(event){
        this.setState({
            armyId : event.target.value
        })
    }

    handleOnSubmit(event) {

        if (this.state.country !== "" && this.state.armyId !== "") {
            const parameters = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    countryName: this.state.country,
                    armyId: this.state.armyId,
                    houseName: this.props.house
                })
            }
            fetch('http://localhost:8080/battle', parameters)
                .then(response => {
                    if (response.ok) return response.json();
                    else throw new Error()
                })
                .then(res => {
                    this.props.changeArmyData(res.army)
                    this.props.changeMessage(res.result)
                    fetch("http://localhost:8080/enemycountry?house=" + this.props.house)
                        .then(res => res.json())
                        .then(response => {
                            this.props.changeEnemyCountry(response);
                        })
                })
                .catch((error) => this.props.changeMessage("Нападение не удалось"))

        }else this.props.changeMessage("Не удалось отправить ворона");
        event.preventDefault();

    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <p>Выберите армию, которая отправится в нападение</p>
                    {this.props.armyData.map((elem) => {
                        return(
                            <div>
                                <label>{"Армия " + elem.id}</label>
                                <input onClick={this.changeArmyId} type="radio" value={elem.id} name="id"/>
                            </div>
                            );
                    })}
                    <p>Выберите территорию, которую будете атаковать</p>
                    {this.props.enemyCountries.map((elem) => {
                        return(
                            <div>
                                <label>{elem.name}</label>
                                <input onClick={this.changeCountry} type="radio" value={elem.name} name="country"/>
                            </div>
                        );
                    })}
                    <input className="button" type="submit" value="Напасть"/>
                </form>
                <p id="message"/>
            </div>
        );
    }
}

export default connect (putStateToProps, putActionToProps)(Battle);