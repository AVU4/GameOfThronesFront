import React from "react";


class Hero extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return(
            <div>
                {this.props.array.map((elem) => {
                    if (elem.name === this.props.name)
                        return (
                            <div>
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