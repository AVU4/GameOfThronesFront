import React from 'react';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Army from "./Army";
import Shop from "./Shop";

import {connect} from 'react-redux';

const putStateToProps = (state) => {
    return {
        house: state.house,
        gold: state.gold
    };
};

class Warfare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            armyId : null,
            flag : ""
        }

    }

    componentDidMount() {
        fetch("http://localhost:8080/armies?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
               this.setState({data : response})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/armies?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.setState({data : response})
                });
        }
    }

    setArmyId(id){
        this.setState({
            armyId : id
        })
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                    {this.state.data.map(elem =>(
                        <p><Link onClick={(e) => (this.setArmyId(elem.id))} to='/army'>{"Армия " + elem.id}</Link> </p>
                    ))}
                    <p><Link to='/shop'>Покупка армии</Link></p>
                    <Switch>
                        <Route path='/army' render={(e) => <Army array={this.state.data} id={this.state.armyId}/>}/>
                        <Route path='/shop' render={(e) =>
                                    <Shop array={this.state.data} house={this.props.house}/>
                        }/>
                    </Switch>
                </BrowserRouter>

            </div>
        );
    }
}

export default connect(putStateToProps)(Warfare);