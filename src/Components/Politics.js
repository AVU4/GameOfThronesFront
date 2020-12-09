import React from 'react';

import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import Redemptions from "./Redemptions";

class Politics extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                    <Link to='/redemption'>Выкуп Лидера</Link>
                    <Switch>
                        <Route path='/redemption' component={Redemptions}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Politics;