import React from 'react';

const divStyle = {
    width: '300px',
    border: '2px solid #000',
    borderRadius: '10px'
};

class Captive extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={divStyle}>
                {this.props.array.map((elem) => {
                    if (elem.hero.name === this.props.name)
                        return (
                            <div>
                                <p>Имя - {elem.hero.name}</p>
                                <p>Родной Дом - {elem.hero.house.name}</p>
                            </div>);
                })}
            </div>
        );
    }
}


export default Captive;