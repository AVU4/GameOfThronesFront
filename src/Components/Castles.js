import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Castle from "./Castle";

class Castles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            name : ""
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/castles?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.setState({data : response})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/castles?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.setState({data : response})
                });
        }
    }


    setName(name){
        this.setState({
            name : name
        });
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                    {this.state.data.map(elem => (
                        <p><Link onClick={(e) => (this.setName(elem.name))} to='/castle'>{elem.name}</Link></p>
                    ))}
                    <Switch>
                        <Route path='/castle' render={(props) => <Castle array={this.state.data} name={this.state.name} /> }/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

export default Castles;