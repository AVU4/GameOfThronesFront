import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Area from "./Area";

class Areas extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            name : ""
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/countries?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.setState({data : response})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/countries?house=" + this.props.house)
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
                        <p><Link onClick={(e) => (this.setName(elem.name))} to='/country'>{elem.name}</Link></p>
                    ))}
                    <Switch>
                        <Route path='/country' render={(props) =>  <Area array={this.state.data} name={this.state.name}/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}



export default Areas;