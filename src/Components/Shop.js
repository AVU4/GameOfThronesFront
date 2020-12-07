import React from 'react';

class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            armyId : "",
            data : [],
            types : [],
            type : "",
            number : ""
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeArmyId = this.handleChangeArmyId.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.setArmyDefault = this.setArmyDefault.bind(this);
        this.setTypeDefault = this.setTypeDefault.bind(this);
    }

    // getReserve() {
    //     fetch("http://localhost:8080/reserve?house=" + this.props.house)
    //         .then(res => res.json())
    //         .then(response => {
    //             this.setState({data: response})
    //         });
    // }


    componentDidMount() {
        fetch("http://localhost:8080/typesquads")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    types : response,
                })
            });
    }


    handleChangeArmyId(event) {
        this.setState({
            armyId : event.target.value
        })
    }

    handleChangeType(event) {
        this.setState({
            type : event.target.value.typeName
        })
    }

    handleChangeNumber(e){
        this.setState({number : e.target.value})
    }

    handleOnSubmit(e){
        alert(this.state.number + " " + this.state.armyId + " " + this.state.type);
        if (this.state.number !== "" && this.state.armyId !== "" && this.state.type !== ""){
            const parameters = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                        number : this.state.number,
                        armyId : this.state.armyId,
                        type : this.state.type,
                        house : this.props.house
                })
            }
            fetch('http://localhost:8080/squad', parameters)
                .then(response => response.json())
                .then(res => {
                    alert(res);
                })
        }
        e.preventDefault();
    }

    setArmyDefault(id){
        this.setState({
            armyId : id
        })
    }

    setTypeDefault(typeName){
        this.setState({
            type : typeName
        })
    }



    render(){
        return(
            <div onLoad={this.getTypes}>
                <p>Выберите армию из списка</p>
                <form onSubmit={this.handleOnSubmit}>
                    <select onClick={this.handleChangeArmyId} onChange={this.handleChangeArmyId}>
                        {this.props.array.map((elem, index) => {
                            if (elem.id !== this.state.armyId && index === 0) this.setArmyDefault(elem.id)
                            return(<option value={elem.id}>{"Армия " + elem.id}</option>);
                        })}
                    </select>
                    <select onClick={this.handleChangeType} onChange={this.handleChangeType} on>
                        {this.state.types.map((elem, index) => {
                            if (elem.typeName !== this.state.type && index === 0) this.setTypeDefault(elem.typeName);
                            return (<option>{elem.typeName + " Стоимость " + elem.costs + " Боевая мощь единицы " + elem.forcePerPerson}</option>);
                        })}
                    </select>
                    <input placeholder="Введите число солдат" type="number" onChange={this.handleChangeNumber}/>
                    <input type="submit" value="Купить"/>
                </form>
            </div>
        );
    }
}
export default Shop;