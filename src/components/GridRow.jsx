import React, { Component } from 'react';
import "../assets/styles/GridRow.css";
import Form from 'react-bootstrap/Form';

class Cell extends Component { 
    state = {
        isActive: this.props.isActive,
    }

    componentDidUpdate() {
        // this.props.callToGridRow(this.state.isActive, this.props.index);
    }

    render() {
        let {isActive} = this.state;

        let toReturn = isActive ? 
            <td onClick={() => this.setState({isActive: false})}
            className="cell-going"></td>
        : 
            <td onClick={() => this.setState({isActive: true})}></td>

        return toReturn;

    }

}


class GridRow extends Component {
    
    constructor(props) {
        super(props);

        this.state={
            name: this.props.name,
            editName: false,
        }

        this.editName  = this.editName.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.renderEditName = this.renderEditName.bind(this);   
        // this.sendToParent = this.sendToParent.bind(this);
        this.myCallback = this.myCallback.bind(this);
    }

    editName() {
        this.setState({editName: true})
    }

    handleNameChange(e) {
        console.log(e.target.value);
        this.setState({name: e.target.value})
    }

    myCallback(isActive, index) {
        console.log(isActive + " : " + index);
        let {personIndex} = this.props;

        // Tell parent whos affected, for which day, and how
        this.props.callbackFromParent(personIndex, index, isActive);
    }

    renderEditName() {
        return (
            <td>
                <form onSubmit={() => {
                    this.setState({editName: false, name: this.state.name})
                }}>
                <input 
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}></input> 
                <button onClick={() => {
                    this.setState({editName: false, name: this.state.name})
                }}
                type="button" className="btn btn-success">Y</button>
                </form>
            </td>
        )

    }


    render() {
        let {daysGone, totalDays} = this.props;
        let {name, editName} = this.state;

        const toPrint = [];
        let days = [];
        let indices =[];

        for (let i = 0; i < totalDays; i++) {
            if (daysGone.includes(i+1)) {
                days.push(<Cell callToGridRow={this.myCallback}
                    key={i} index={i} isActive={false} ></Cell>)
            } else {
                days.push(<Cell callToGridRow={this.myCallback}
                    key={i} index={i} isActive={true}></Cell>)
                indices.push(i);
            }
        }

        // this.sendToParent(indices, key);

        let i = 0;
        toPrint.push(
            <tr key={i++}>
                {editName ? 
                    this.renderEditName()
                : 
                <td onDoubleClick={this.editName}>{name}: {daysGone}</td>
                }
                {days}
            </tr>
        )
        return toPrint;
    }
}

export default GridRow;