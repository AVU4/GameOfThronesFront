import  React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Captive from "./Captive";


class Captives extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            name : ""
        };
    }

    componentDidMount() {
        fetch("http://localhost:20860/captives?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
                this.setState({data : response})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:20860/captives?house=" + this.props.house)
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
                        <p><Link onClick={(e) => (this.setName(elem.hero.name))} to='/captive'>{elem.hero.name}</Link></p>
                    ))}
                    <Switch>
                        <Route path='/captive' render={(props) => <Captive array={this.state.data} name={this.state.name} /> }/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

export default Captives;