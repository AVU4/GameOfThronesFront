import React from "react";
import {useEffect} from "react";


class Hero extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            data : ""
        };
    }



    componentDidMount() {
        fetch("http://localhost:8080/heroes?house=" + this.props.house)
            .then(res => res.json())
            .then(response => {
               this.setState({data : response})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.house !== this.props.house){
            fetch("http://localhost:8080/heroes?house=" + this.props.house)
                .then(res => res.json())
                .then(response => {
                    this.setState({data : response})
                });
        }
    }


    render() {
        return(
            <div>
                <p>Hello from {this.props.house}</p>
            </div>
        );
    }


}

export default Hero;