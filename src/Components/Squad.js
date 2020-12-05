import React from 'react';

const divStyle = {
    width: '300px',
};


class Squad extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={divStyle}>
                {this.props.array.map((elem) => {
                    if (elem.id === this.props.id)
                        return (
                            <div>
                                <p>Родной Дом - {elem.house.name}</p>
                                <p>Тип - {elem.type}</p>
                                <p>Сила солдата - {elem.forcePerSoldier}</p>
                                <p>Численность - {elem.numberSoldiers}</p>
                                <p>Сила - {elem.force}</p>
                            </div>);
                })}
            </div>
        );
    }
}

export default Squad;