import React from "react";

const divStyle = {
    width: '300px',
    border: '2px solid #000',
    borderRadius: '10px'
};

class Hero extends React.Component {

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
                                <p>Имя персонажа - {elem.name}</p>
                                <p>Сила в атаке - {elem.forceAttack}</p>
                                <p>Сила в защите - {elem.forceDefend}</p>
                                <p>Умение кастеляна - {elem.skillCastle}</p>
                                <p>Боевое умение - {elem.skillWar}</p>
                                <p>Питомец - {elem.pet === null ? 'Нет' : elem.pet.name}</p>
                                <p>Резервист - {elem.reserve == true ? 'Да' : 'Нет'}</p>
                            </div>);
                })}
            </div>
        );
    }


}

export default Hero;