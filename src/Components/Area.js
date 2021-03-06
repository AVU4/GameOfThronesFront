import React from 'react';

const divStyle = {
    width: '300px',
    border: '2px solid #000',
    borderRadius: '10px'
};

class Area extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={divStyle}>
                {this.props.array.map((elem) => {
                    if (elem.name === this.props.name)
                        return (
                            <div>
                                <p>Название - {elem.name}</p>
                                <p>Владелец территории - {elem.houseOwner.name}</p>
                                <p>Количество крестьян - {elem.countPeasants}</p>
                            </div>);
                })}
            </div>
        );
    }
}


export default Area;