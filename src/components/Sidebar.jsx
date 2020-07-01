import React, { Component } from 'react';
// import "../../node_modules/bootstrap";
import Table from '../../node_modules/react-bootstrap/Table';
import PersonModel from './personModel';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/Sidebar.css"

class Sidebar extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    persons: [
      {
        name: 'Cassady',
        daysGone: 3,
      },
      {
        name: 'Cherry',
        daysGone: 3,
      },
      {
        name: 'Sam',
        daysGone: 2,
      }
    ]
  };

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  renderDays() {
    let daysGone = Math.round((this.state.endDate.getTime()
      - this.state.startDate.getTime()) / (1000 * 3600 * 24));

    const tableEntries = [];
    for (let i = 0; i < daysGone; i++) {
      tableEntries.push(<th>{i}</th>)
    }
    return (
      <tr>
        <th>#</th>
        {tableEntries}
      </tr>
    )
  }

  renderGridBody() {
    const { persons } = this.state;
    const tableRows = [];
    console.log(this.state.persons.entries())

    for (const [index, person] of this.state.persons.entries()) {
      tableRows.push(<tr>
        <td>{person.name}</td>
      </tr>)
    }
  }

  render() {
    let daysGone = Math.round((this.state.endDate.getTime()
      - this.state.startDate.getTime()) / (1000 * 3600 * 24));

    return (
      <div>
        <div className="date-container">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
        </div>
        <h1>Days Gone: {daysGone}</h1>
        <div className="container">

          <Table striped bordered hover variant="light">
            <thead>
              {/* <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>  */}
              {this.renderDays()}
            </thead>
            <tbody>
              {this.renderGridBody()}
              {/* <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Sidebar;
