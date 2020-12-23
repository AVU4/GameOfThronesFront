import React from 'react';
import {connect} from "react-redux";
import {changeHistory, changeMessage} from "../Store/actions";
import {bindActionCreators} from "redux";

const putStateToProps = (state) => {
    return {
        histories : state.histories,
        message : state.message
    };
}

const putActionToProps = (dispatch) => {
    return {
        changeHistory : bindActionCreators(changeHistory, dispatch),
        changeMessage : bindActionCreators(changeMessage, dispatch)
    };
}


class History extends React.Component {


    componentDidMount() {
        this.props.changeMessage("Нет сообщений");
        fetch('http://localhost:20860/history')
            .then(response => response.json())
            .then(res =>{
                this.props.changeHistory(res)
            })
    }


    render() {
        return(
            <div>
                <table>
                    <tr>
                        <td>Название сражения</td>
                        <td>Место</td>
                        <td>Результат</td>
                    </tr>
                    {this.props.histories.map((elem) => {
                        return <tr>
                            <td>{elem.name}</td>
                            <td>{elem.country.name}</td>
                            <td>{elem.summary}</td>
                        </tr>
                    })}
                </table>

            </div>
        );
    }
}

export default connect(putStateToProps, putActionToProps) (History);