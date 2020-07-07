import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import GridRow from './components/GridRow';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/styles/Main.css';
import MoneyForm from './components/MoneyForm';
import { DateRangePicker, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; // or ''

class Main extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        persons: [
            {
                name: 'Cassady',
                daysGone: [],
                owes: 0,
            },
            {
                name: 'Cherry',
                daysGone: [],
                owes: 0,
            },
            {
                name: 'Sam',
                daysGone: [],
                owes: 0,
            },
        ],
        daysGone: 0,
    };

    constructor(props) {
        super(props);
        this.addDay = this.addDay.bind(this);
        this.rendergridBody = this.renderGridBody.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.setDates = this.setDates.bind(this);
        this.myCallback = this.myCallback.bind(this);
    }

    myCallback(personIndex, index, isActive) {
        let { persons } = this.state;

        console.log(personIndex);
        let shallowCopy = persons[personIndex];

        isActive && !shallowCopy.daysGone.includes(index)
            ? shallowCopy.daysGone.push(index)
            : shallowCopy.daysGone.splice(index, 1);

        persons[personIndex] = shallowCopy;
        this.setState({ persons: persons });
        console.log(persons);
    }

    componentDidMount() {
        let { endDate } = this.state;
        let set = new Date(endDate.setDate(endDate.getDate()));
        let daysGone =
            Math.round(
                (endDate - this.state.startDate.getTime()) / (1000 * 3600 * 24)
            ) + 1;
        this.setState({ endDate: set, daysGone: daysGone });
    }

    setDates(dates) {
        console.log(dates);
        let {persons} = this.state;

        this.setState({
            startDate: dates[0],
            endDate: dates[1],
            daysGone: Math.round((this.state.endDate - this.state.startDate.getTime()) / (1000 * 3600 * 24)) + 1
        }, () => {
            for(let i = 0; i < this.state.daysGone; i++) {
                for(let j = 0; j < persons.length; j++) {
                    persons[j].daysGone.push(i);
                }
            }
            console.log(persons);
            this.componentDidMount();
        })
    }

    renderDays() {
        let { daysGone } = this.state;

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
        let { persons, daysGone } = this.state;
        const toPrint = [];

        let i = 0;
        const gridRows = persons.map((person) => {
            toPrint.push(
                <GridRow
                    key={i++}
                    personIndex={i - 1}
                    callbackFromParent={this.myCallback}
                    daysGone={person.daysGone}
                    name={person.name}
                    totalDays={daysGone}
                ></GridRow>
            );
        });

        toPrint.push(
            <tr key={'AddRow'}>
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
        );

        return toPrint;
    }

    addDay() {
        let { endDate } = this.state;
        let set = new Date(endDate.setDate(endDate.getDate() + 1));
        this.setState({ endDate: set });
    }

    addPerson() {
        let { persons } = this.state;
        let person = {
            name: 'New person',
            daysGone: [],
            owes: 0,
        };
        const list = [...persons, person];

        this.setState({ persons: list });
        console.log(this.state.persons);
    }

    render() {
        let daysGone =
            Math.round(
                (this.state.endDate.getTime() -
                    this.state.startDate.getTime()) /
                    (1000 * 3600 * 24)
            ) + 1;

        let { persons } = this.state;

        return (
            <div>
                <div className="date-container">
                    <div>
                        <div>How long are you gone for?</div>
                        <div>
                            <DateRangePicker
                                onChange={this.setDates}
                                appearance="default"
                                placeholder="Set your date"
                                style={{ width: 280 }}
                            />
                        </div>
                        <Button>test</Button>
                    </div>
                </div>
                <h1>Days Gone: {daysGone}</h1>
                <div className="container">
                    <Table striped bordered hover variant="light">
                        <thead>{this.renderDays()}</thead>
                        <tbody>{this.renderGridBody()}</tbody>
                    </Table>
                </div>
                <div className="container money-form">
                    <MoneyForm persons={persons} daysGone={daysGone} />
                </div>
            </div>
        );
    }
}

export default Main;
