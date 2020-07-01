import React, { Component } from 'react';
// import "../../node_modules/bootstrap";
import Table from '../../node_modules/react-bootstrap/Table';
import PersonModel from './personModel';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class Sidebar extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
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

    render() {
        var daysGone = Math.round((this.state.endDate.getTime()
         - this.state.startDate.getTime()) / (1000 * 3600 * 24));

        return (
            <div>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleStartDateChange}
      />
            <DatePicker
        selected={this.state.endDate}
        onChange={this.handleEndDateChange}
      />
      <h1>Days Gone: {daysGone}</h1>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Sidebar;
