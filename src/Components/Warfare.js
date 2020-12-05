import React from 'react';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Army from "./Army";

class Warfare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            house : props.house,
            data : [],
            armyId : null
        }

    }

    componentDidMount() {
        fetch("http://localhost:8080/armies?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
               this.setState({data : response})
            });
        this.setState({
            house : this.props.house
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/armies?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.setState({data : response})
                });
            this.setState({
                house : this.props.house
            })
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
                    <Switch>
                        <Route path='/army' render={(e) => <Army array={this.state.data} id={this.state.armyId}/>}/>
                    </Switch>
                </BrowserRouter>

            </div>
        );
    }
}

export default Warfare;