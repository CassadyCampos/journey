import React, { Component } from 'react';
import "../assets/styles/GridRow.css";
import Form from 'react-bootstrap/Form';

class Cell extends Component { 
    state = {
        isActive: this.props.isActive
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
            editName: false
        }

        this.editName  = this.editName.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.renderEditName = this.renderEditName.bind(this);   
        this.changeCell = this.changeCell.bind(this)
        this.sendToParent = this.changeCell.bind(this);
    }

    editName() {
        this.setState({editName: true})
    }

    handleNameChange(e) {
        console.log(e.target.value);
        this.setState({name: e.target.value})
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

    changeCell(index) {
        console.log(index)
    }

    sendToParent(indices) {
        this.props.callbackFromParent(indices);
    }

    render() {
        let {daysGone, totalDays} = this.props;
        let {name, editName} = this.state;

        const toPrint = [];
        let days = [];
        let indices =[];

        for (let i = 0; i < totalDays; i++) {
            if (daysGone.includes(i+1)) {
                days.push(<Cell key={i} isActive={true}></Cell>)
                indices.push(i);
            } else {
                days.push(<Cell key={i} isActive={false} ></Cell>)
            }
        }

        console.log(indices);
        this.sendToParent(indices);

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