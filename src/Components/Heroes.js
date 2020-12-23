import React from "react";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import Hero from "./Hero";

class Heroes extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            name : ""
        };
    }

    componentDidMount() {
        fetch("http://localhost:20860/heroes?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.setState({data : response})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:20860/heroes?house=" + this.props.house)
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
                        <p><Link onClick={(e) => (this.setName(elem.name))} to='/hero'>{elem.name}</Link></p>
                    ))}
                    <Switch>
                        <Route path='/hero' render={(props) => <Hero array={this.state.data} name={this.state.name} /> }/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Heroes;