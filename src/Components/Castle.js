import React from 'react';

const divStyle = {
    width: '300px',
    border: '2px solid #000',
    borderRadius: '10px'
};

class Castle extends React.Component {

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
                                <p>Месторасположение - {elem.country.name}</p>
                                <p>Уровень обороны - {elem.forceDefense}</p>
                                <p>Особенность - {elem.uniqueCondition}</p>
                            </div>);
                })}
            </div>
        );
    }

}

export default Castle;