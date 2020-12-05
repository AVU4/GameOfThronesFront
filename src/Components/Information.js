import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Heroes from "./Heroes";
import Areas from "./Areas";
import Castles from "./Castles";
import Captives from "./Captives";


class Information extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            house : props.house
        }
    }

    componentDidMount() {
        this.setState({
            house : this.props.house
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            this.setState({
                house : this.props.house
            })
        }
    }


    render() {
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <p style={{display : "inline-block", marginRight : "10px"}}>
                            <Link to='/heroes'>Посмотреть лидеров Дома</Link>
                        </p>
                        <p style={{display : "inline-block", marginRight : "10px"}}>
                            <Link to='/areas'>Посмотреть владения Дома</Link>
                        </p>
                        <p style={{display : "inline-block", marginRight : "10px"}}>
                            <Link to='/castles'>Посмотреть замки Дома</Link>
                        </p>
                        <p style={{display : "inline-block", marginRight : "10px"}}>
                            <Link to='/captives'>Посмотреть заложников</Link>
                        </p>

                    </div>
                    <Switch>
                        <Route  path='/heroes' render={(props) => (<Heroes house={this.state.house}/>)}/>
                        <Route path='/areas' render={(props) => (<Areas house={this.state.house}/>)}/>
                        <Route path='/castles' render={(props) => (<Castles house={this.state.house}/>)}></Route>
                        <Route path='/captives' render={(props) => (<Captives house={this.state.house}/>)}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
export default Information;