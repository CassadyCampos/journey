import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import GridRow from './components/GridRow';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/styles/Main.css';
import MoneyForm from './components/MoneyForm';
import { DateRangePicker, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; // or ''
import { isCompositeComponent } from 'react-dom/test-utils';

class Cell extends Component { 
    state = {
        isActive: this.props.isActive,

    }

    render() {
        let {isActive} = this.state;

        let toReturn = isActive ? 
            <td onClick={() => {this.setState({isActive: false}, console.log("notgoing"))}}
            className="cell-going"></td>
        : 
            <td onClick={() => {this.setState({isActive: true}, console.log("going"))}}></td>

        return toReturn;

    }

}

class Main extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        let endDate = new Date(new Date().getTime()+(5*24*60*60*1000));

        this.state = {
            date: [date, endDate],
            users: [{
                name: "Cassady",
                id: 0,
                daysGone: [1, 2, 3, 4, 5],
                owes: 0
            },
            {
                name: "Cherry",
                id: 1,
                daysGone: [1, 2, 3, 4, 5],
                owes: 0
            },
            {
                name: "Sam",
                id: 2,
                daysGone: [1, 2, 3, 4],
                owes: 0
            }],
            daysGone: 0,
        };

        this.addDay = this.addDay.bind(this);
        this.rendergridBody = this.renderGridBody.bind(this);
        this.renderGridHead = this.renderGridHead.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.setDates = this.setDates.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.renderUserDays = this.renderUserDays.bind(this);
        this.toggleDay = this.toggleDay.bind(this);
    }

    componentDidMount() {
        let { date } = this.state;

        this.setState({
            isLoading: false,
            daysGone: Math.ceil(Math.abs(date[0] - date[1]) / (1000 * 60 * 60 * 24))
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

    setDates(dates) {
        console.log(dates);
        let { users } = this.state;

        this.setState({
            date: dates
        }, () => {
            this.componentDidMount();
        })
    }

    renderGridHead() {
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

    toggleDay(e) {
        console.log(e);
        console.log("infunc")
    }

    renderUserDays(user) {
        let toPrint = [];
        let {daysGone} = this.state;

        for (let i = 0; i < daysGone; i++) {
            if (user.daysGone.includes(i+1)) {
                toPrint.push(<Cell isActive={true}></Cell>)
            } else {
                toPrint.push(<Cell isActive={false}></Cell>)
            }
        }
        return toPrint;
    }

    renderGridBody() {  
        let { users } = this.state;
        const toPrint = [];

        let i = 0;
        const gridRows = users.map((user) => {
            toPrint.push(
                <tr>
                    <td>{user.name}: {user.daysGone}</td>
                    {this.renderUserDays(user)}
                </tr>
            )
        })

        return toPrint;
    }

    addDay() {
        // let { endDate } = this.state;
        // let set = new Date(endDate.setDate(endDate.getDate() + 1));
        // this.setState({ endDate: set });
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
        const {users, isLoading, daysGone } = this.state

        return (
            <div>
                <div className="date-container">
                    <div>
                        <div>How long are you gone for?</div>
                        <div>
                            <DateRangePicker
                                value={this.state.date}
                                onChange={this.setDates}
                                appearance="default"
                                placeholder="Set your date"
                                style={{ width: 280 }}
                            />
                        </div>
                    </div>
                </div>
                <h1>Days Gone: {daysGone}</h1>
                <div className="container">
                    <Table striped bordered hover variant="light">
                        <thead>{this.renderGridHead()}</thead>
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
