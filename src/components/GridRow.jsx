import React, { Component } from 'react';
import "../assets/styles/GridRow.css";

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
                days.push(<td key={i} className="cell-going"></td>)
            } else {
                days.push(<td key={i}></td>)
            }
        }

        toPrint.push(
            <tr key={name}>
                <td>{name}: {daysGone}</td>
                {days}
            </tr>
        )
        return toPrint;
    }
}

export default GridRow;