import React from 'react';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Squad from "./Squad";

const divStyle = {
    width: '300px',
    border: '2px solid #000',
    borderRadius: '10px'
};
class Army extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squadId : ""
        }
    }

    chooseSquad(id){
        this.setState({
            squadId : id
        });
    }

    render() {
        return(
            <div style={divStyle}>
                {this.props.array.map((elem) => {
                    if (elem.id === this.props.id)
                        return (
                            <div>
                                <p>Генерал - {elem.general.name}</p>
                                <p>Занимаемая территория - {elem.country.name}</p>
                                <p>Сила - {elem.force}</p>
                                <BrowserRouter>
                                    {elem.squadList.map((e) => {
                                        return(<p><Link onClick={(el) => this.chooseSquad(e.id)} to='/squad'>{"Отряд " + e.id}</Link></p>);

                                    })}
                                <Switch>
                                    <Route path='/squad' render={(el) => <Squad array={elem.squadList} id={this.state.squadId}/>}/>
                                </Switch>
                                </BrowserRouter>
                            </div>);
                })}
            </div>
        );
    }
}

export default Army;