import React, { Component } from 'react';
import "../assets/styles/GridRow.css";
import Form from 'react-bootstrap/Form';

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
                <input 
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}></input> 
                <button onClick={() => {
                    this.setState({editName: false, name: this.state.name})
                }}
                type="button" className="btn btn-success">Y</button>
            </td>
        )

    }

    render() {
        console.log("pass");
        let {daysGone, totalDays} = this.props;
        let {name, editName} = this.state;

        const toPrint = [];
        let days = [];

        for (let i = 0; i < totalDays; i++) {
            if (i+1 == daysGone[i]) {
                days.push(<td key={i} className="cell-going"></td>)
            } else {
                days.push(<td key={i}></td>)
            }
        }

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