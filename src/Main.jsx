import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import GridRow from './components/GridRow';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/styles/Main.css';
import MoneyForm from './components/MoneyForm';
import { DateRangePicker, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; // or ''
import api from "./api"

class Main extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        users: [],
        daysGone: 0,
        isLoading: false,
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

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllUsers().then(users => {
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
    }

    myCallback(personIndex, index, isActive) {
        let { users } = this.state;

        console.log(personIndex);
        let shallowCopy = users[personIndex];

        isActive && !shallowCopy.daysGone.includes(index)
            ? shallowCopy.daysGone.push(index)
            : shallowCopy.daysGone.splice(index, 1);

        users[personIndex] = shallowCopy;
        this.setState({ users: users });
        console.log(users);
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
        let {users} = this.state;

        this.setState({
            startDate: dates[0],
            endDate: dates[1],
            daysGone: Math.round((this.state.endDate - this.state.startDate.getTime()) / (1000 * 3600 * 24)) + 1
        }, () => {
            for(let i = 0; i < this.state.daysGone; i++) {
                for(let j = 0; j < users.length; j++) {
                    users[j].daysGone.push(i);
                }
            }
            console.log(users);
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
        let { users, daysGone } = this.state;
        const toPrint = [];

        let i = 0;
        const gridRows = users.map((person) => {
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
        let { users } = this.state;
        let person = {
            name: 'New person',
            daysGone: [],
            owes: 0,
        };
        const list = [...users, person];

        this.setState({ users: list });
        console.log(this.state.users);
    }

    render() {
        const {users, isLoading } = this.state
        let daysGone =
            Math.round(
                (this.state.endDate.getTime() -
                    this.state.startDate.getTime()) /
                    (1000 * 3600 * 24)
            ) + 1;

        console.log('TCL: UsersList -> render -> users', users);

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
                    <MoneyForm users={users} daysGone={daysGone} />
                </div>
            </div>
        );
    }
}

export default Main;
