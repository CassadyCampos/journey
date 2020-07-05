import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import GridRow from './components/GridRow';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/styles/Main.css';
import MoneyForm from "./components/MoneyForm"

class Main extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        persons: [
            {
                name: 'Cassady',
                daysGone: [1,2,3,4,5],
                owes: 0
            },
            {
                name: 'Cherry',
                daysGone: [1,2,3,4,5],
                owes: 0
            },
            {
                name: 'Sam',
                daysGone: [1,2,3,4],
                owes: 0
            },
        ],
    };

    constructor(props) {
        super(props);
        this.addDay = this.addDay.bind(this);
        this.rendergridBody = this.renderGridBody.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.addPerson = this.addPerson.bind(this);
        // this.handleEndDateChange =
    }

    componentDidMount() {
        let { endDate } = this.state;
        let set = new Date(endDate.setDate(endDate.getDate() + 5));
        this.setState({ endDate: set });
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDate: date,
        });
    };

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date,
        });
    };

    renderDays() {
        let endDate = this.state.endDate.getTime();
        let daysGone = Math.round(
            (endDate - this.state.startDate.getTime()) / (1000 * 3600 * 24)
        );

        const tableEntries = [];
        for (let i = 0; i < daysGone; i++) {
            tableEntries.push(<th key={i}>{i}</th>);
        }
        return (
            <tr>
                <th>#</th>
                {tableEntries}
                <th>
                    {' '}
                    <button
                        onClick={this.addDay}
                        type="button"
                        className="btn btn-light"
                    >
                        Add Day
                    </button>
                </th>
            </tr>
        );
    }

    renderGridBody() {
        let { persons } = this.state;
        const toPrint = [];

        let daysGone = Math.round(
            (this.state.endDate.getTime() - this.state.startDate.getTime()) /
                (1000 * 3600 * 24)
        );

        let i = 0;
        const gridRows = persons.map((person) => {
            toPrint.push(
                <GridRow
                    key={i++}
                    daysGone={person.daysGone}
                    name={person.name}
                    totalDays={daysGone}
                ></GridRow>
            );
        });

        toPrint.push(
            <tr key={"AddRow"}>
                <td>
                <button
                        onClick={this.addPerson}
                        type="button"
                        className="btn btn-light"
                    >
                        Add Person
                    </button>
                </td>
            </tr>
        )

        return toPrint;
    }

    addDay() {
        let { endDate } = this.state;
        let set = new Date(endDate.setDate(endDate.getDate() + 1));
        this.setState({ endDate: set });
    }

    addPerson() {
        let {persons} = this.state; 
        let person = {
            name: "New person",
            daysGone: [],
            owes: 0
        };
        const list = [...persons, person]

        this.setState({persons: list}
            );
        console.log(this.state.persons);
    }

    render() {
        let daysGone = Math.round(
            (this.state.endDate.getTime() - this.state.startDate.getTime()) /
                (1000 * 3600 * 24)
        );

        let {persons} = this.state;

        return (
            <div >
                <h1>Jurney</h1>

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
                        <thead>{this.renderDays()}</thead>
                        <tbody>{this.renderGridBody()}</tbody>
                    </Table>
                </div>
                <div className="container money-form">
                    <MoneyForm persons={persons} daysGone={daysGone}/>
                </div>
            </div>
        );
    }
}

export default Main;
