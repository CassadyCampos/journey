import React, { Component } from 'react';
import "../assets/styles/GridRow.css";
import PersonModel from './personModel';

class GridRow extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let {daysGone, name, totalDays} = this.props;

        const toPrint = [];
        let days = [];

        for (let i = 0; i < totalDays; i++) {
            if (i < daysGone) {
                days.push(<td className="cell-going"></td>)
            } else {
                days.push(<td></td>)
            }
        }

        toPrint.push(
            <tr>
                <td>{name}: {daysGone}</td>
                {days}
            </tr>
        )
        return toPrint;
    }
}

export default GridRow;