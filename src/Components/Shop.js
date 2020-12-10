import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {changeArmyData, changeFreeCountry, changeGold, changeMessage, changeReserves} from "../Store/actions";
import "../index.css";

const putStateToProps = (state) => {
    return {
        gold: state.gold,
        house: state.house,
        armyData: state.armyData,
        reserves: state.reserves,
        freeCountry: state.freeCountry
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeGold : bindActionCreators(changeGold, dispatch),
        changeArmyData : bindActionCreators(changeArmyData, dispatch),
        changeReserves : bindActionCreators(changeReserves, dispatch),
        changeFreeCountry : bindActionCreators(changeFreeCountry, dispatch),
        changeMessage : bindActionCreators(changeMessage, dispatch)
    };
}


class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            armyId : "",
            types : [],
            type : "",
            number : "",
            nameCountry : "",
            name : ""
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeArmyId = this.handleChangeArmyId.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.setArmyDefault = this.setArmyDefault.bind(this);
        this.setTypeDefault = this.setTypeDefault.bind(this);
        this.handleChangeNameCountry = this.handleChangeNameCountry.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleOnSubmitCreating = this.handleOnSubmitCreating.bind(this);

    }

    componentWillMount() {
        fetch("http://localhost:8080/typesquads")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    types : response,
                })
            });

        fetch("http://localhost:8080/reserve?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.props.changeReserves(response);
            });
        fetch("http://localhost:8080/freecountry?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.props.changeFreeCountry(response);
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/reserve?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.props.changeReserves(response)
                });
        }
    }


    handleChangeArmyId(event) {
        this.setState({
            armyId : event.target.value
        })
    }

    handleChangeType(event) {
        this.setState({
            type : event.target.value
        })
    }

    handleChangeNameCountry(event){
        this.setState({
            nameCountry : event.target.value
        })
    }

    handleChangeName(event){
        this.setState({name : event.target.value})
    }

    handleChangeNumber(e){
        this.setState({number : e.target.value})
    }

    handleOnSubmitCreating(e) {
        if (this.state.name !== "" && this.state.nameCountry !== ""){
            const parameters = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    nameCountry: this.state.nameCountry,
                    nameHouse: this.props.house
                })
            }
            fetch('http://localhost:8080/army', parameters)
                .then(response => {
                    if (response.ok) return response.json();
                    else throw new Error();
                })
                .then(res => {
                    this.props.changeMessage("Удалось создать армию");
                    this.props.changeArmyData(res);
                    fetch("http://localhost:8080/reserve?house=" + this.props.house)
                        .then(res => res.json())
                        .then(response => {
                            this.props.changeReserves(response)
                        });
                    fetch("http://localhost:8080/freecountry?house=" + this.props.house)
                        .then(res => res.json())
                        .then(response => {
                            this.props.changeFreeCountry(response);
                        })
                })
                .catch((error) => this.props.changeMessage("Создать армию не удалось"))

        }else this.props.changeMessage("Не удалось отправить ворона");

        e.preventDefault();
    }

    handleOnSubmit(e){
        if (this.state.number !== "" && this.state.armyId !== "" && this.state.type !== "") {
            const parameters = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    number: this.state.number,
                    armyId: this.state.armyId,
                    type: this.state.type,
                    house: this.props.house
                })
            }
            fetch('http://localhost:8080/squad', parameters)
                .then(response => {
                    if (response.ok) return response.json();
                    else throw new Error();
                } )
                .then(res => {
                    this.props.changeMessage("Отряд добавлен в армию");
                    this.props.changeArmyData(res);
                    fetch('http://localhost:8080/house?house=' + this.props.house)
                        .then(response => response.json())
                        .then(res => {
                            this.props.changeGold(res.countGold);
                        })
                })
                .catch((error) => this.props.changeMessage("Не удалось собрать отряд"))

        }else this.props.changeMessage("Не удалось отправить ворона");


        e.preventDefault();
    }

    setArmyDefault(id){
        this.setState({
            armyId : id
        })
    }

    setTypeDefault(typeName){
        this.setState({
            type : typeName
        })
    }


    render(){
        return(
            <div>
                <p>Покупка отряда</p>
                <form onSubmit={this.handleOnSubmit}>
                    <select  onClick={this.handleChangeArmyId} onChange={this.handleChangeArmyId}>
                        <option value="" disabled selected>Выберите армию</option>
                        {this.props.armyData.map((elem) => {
                            return(<option value={elem.id}>{"Армия " + elem.id}</option>);
                        })}
                    </select>
                    <select onClick={this.handleChangeType} onChange={this.handleChangeType}>
                        <option value="" disabled selected>Выберите тип отряда</option>
                        {this.state.types.map((elem) => {
                            return (<option value={elem.typeName}>{elem.typeName + " Стоимость " + elem.costs + " Боевая мощь единицы " + elem.forcePerPerson}</option>);
                        })}
                    </select>
                    <input placeholder="Введите число солдат" type="number" onChange={this.handleChangeNumber}/>
                    <input className="button" type="submit" value="Купить"/>
                </form>
                    <p>Создание армии</p>
                    <form onSubmit={this.handleOnSubmitCreating}>
                        <select onClick={this.handleChangeName} onChange={this.handleChangeName}>
                            <option value="" disabled selected>Выберите армию</option>
                            {this.props.reserves.map((elem) => {
                                return (<option value={elem.name}>{elem.name}</option>);
                            })}
                        </select>
                        <select onClick={this.handleChangeNameCountry} onChange={this.handleChangeNameCountry}>
                            <option value="" disabled selected>Выберите территорию</option>
                            {this.props.freeCountry.map((elem) => {
                                return (<option value={elem.name}>{elem.name}</option> );
                            })}
                        </select>
                        <input className="button" type="submit" value="Создать"/>
                    </form>

            </div>
        );
    }
}
export default connect(putStateToProps, putActionToProps) (Shop);