import React from 'react';

import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import Redemptions from "./Redemptions";
import Battle from "./Battle";
import {bindActionCreators} from "redux";
import {changeGold, changeHouse, changeMessage} from "../Store/actions";
import {connect} from "react-redux";

const putStateToProps = (state) => {
    return {
        message : state.message
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeMessage : bindActionCreators(changeMessage, dispatch)
    };
}


class Politics extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                    <p style={{display : "inline-block", marginRight : "10px"}}>
                        <Link to='/redemption'>Выкуп Лидера</Link>
                    </p>
                    <p style={{display : "inline-block", marginRight : "10px"}}>
                        <Link to='/battle'>Сражение</Link>
                    </p>
                    <Switch>
                        <Route path='/redemption' component={Redemptions}/>
                        <Route path='/battle' component={Battle}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(putStateToProps, putActionToProps)(Politics);