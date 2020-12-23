import React from 'react';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Army from "./Army";
import Shop from "./Shop";

import {connect} from 'react-redux';
import {changeArmyData, changeMessage} from "../Store/actions";
import {bindActionCreators} from "redux";

const putStateToProps = (state) => {
    return {
        house: state.house,
        armyData: state.armyData,
        message : state.message
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeArmyData : bindActionCreators(changeArmyData, dispatch),
        changeMessage : bindActionCreators(changeMessage, dispatch)
    };
}

class Warfare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            armyId : null,
        }

    }

    componentWillMount() {
        this.props.changeMessage("Нет сообщений");
        fetch("http://localhost:20860/armies?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                    this.props.changeArmyData(response)
                }
            );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:20860/armies?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.props.changeArmyData(response)
                });
        }
    }

    setArmyId(id){
        this.setState({
            armyId : id
        })
    }

    render() {
        console.log(this.props)
        return(
            <div>
                <BrowserRouter>
                    {this.props.armyData.map(elem =>(
                        <p><Link onClick={(e) => (this.setArmyId(elem.id))} to='/army'>{"Армия " + elem.id}</Link> </p>
                    ))}
                    <p><Link to='/shop'>Покупка армии</Link></p>
                    <Switch>
                        <Route path='/army' render={(e) => <Army array={this.props.armyData} id={this.state.armyId}/>}/>
                        <Route path='/shop' render={(e) => <Shop/>}/>
                    </Switch>
                </BrowserRouter>

            </div>
        );
    }
}

export default connect(putStateToProps, putActionToProps)(Warfare);