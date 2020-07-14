import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/styles/Main.css';
import MoneyForm from './components/MoneyForm';
import { DateRangePicker, Button, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isActive: this.props.isActive,
        };
        
        this.onActiveChange = this.onActiveChange.bind(this);
    }

    onActiveChange() {
        let { isActive } = this.state;
        let { userIndex, day } = this.props;
        isActive = !isActive;
        day = day + 1;
        this.setState({ isActive: isActive }, () => {
            this.props.onActiveChange(userIndex, day);
        });
    }

    render() {
        let { isActive } = this.state;

        let toReturn = isActive ? (
            <td
                onClick={this.onActiveChange}
                className="cell-going"
            ></td>
        ) : (
            <td
                onClick={this.onActiveChange}
            ></td>
        );

        return toReturn;
    }
}

class Main extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        let endDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

        this.state = {
            date: [date, endDate],
            users: [
                {
                    name: 'Person 1',
                    index: 0,
                    daysGone: [1, 2, 3, 4, 5],
                    owes: 0,
                },
                {
                    name: 'Person 2',
                    index: 1,
                    daysGone: [1, 2, 3, 4, 5],
                    owes: 0,
                },
                {
                    name: 'Person 3',
                    index: 2,
                    daysGone: [1, 2, 3, 4, 5],
                    owes: 0,
                },
            ],
            daysGone: 0,
        };

        this.addDay = this.addDay.bind(this);
        this.renderGridBody = this.renderGridBody.bind(this);
        this.renderGridHead = this.renderGridHead.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.editName = this.editName.bind(this);
        this.setDates = this.setDates.bind(this);
        this.renderUserDays = this.renderUserDays.bind(this);
        this.receive = this.receive.bind(this);
    }

    componentDidMount() {
        let { date } = this.state;
        let daysGone = Math.ceil(
            Math.abs(date[0] - date[1]) / (1000 * 60 * 60 * 24)
        );

        this.setState({
            daysGone: daysGone,
        });
    }

    setDates(dates) {
        this.setState(
            {
                date: dates,
            },
            () => {
                this.componentDidMount();
            }
        );
    }

    editName(user) {
        console.log(user);
    }

    renderGridHead() {
        let { daysGone } = this.state;

        const tableEntries = [];
        for (let i = 0; i < daysGone; i++) {
            tableEntries.push(<th key={i}>{i + 1}</th>);
        }
        return (
            <tr>
                <th>#</th>
                {tableEntries}
                <th
                    style={{ maxWidth: '1rem', padding: '1px' }}
                    onClick={this.addDay}
                >
                    {' '}
                    <div
                        style={{
                            border: '1px solid #dee2e6',
                            boxShadow: '#7a5ad8 0 5px 0 0',
                        }}
                        className="btn "
                    >
                        +
                    </div>
                </th>
            </tr>
        );
    }

    receive(userIndex, day) {
        let { users } = this.state;

        var indexOfDay = users[userIndex].daysGone.indexOf(day);

        if (indexOfDay !== -1) {
            users[userIndex].daysGone.splice(indexOfDay, 1);
            this.setState({ users: users }, () => {
                this.componentDidMount();
            });
        } else {
            users[userIndex].daysGone.push(day);
            this.setState({ users: users }, () => {
                this.componentDidMount();
            });
        }
    }

    renderUserDays(user) {
        let toPrint = [];
        let { daysGone } = this.state;

        for (let i = 0; i < daysGone; i++) {
            if (user.daysGone.includes(i + 1)) {
                toPrint.push(
                    <Cell
                        userIndex={user.index}
                        day={i}
                        onActiveChange={this.receive}
                        isActive={true}
                    ></Cell>
                );
            } else {
                toPrint.push(
                    <Cell
                        userIndex={user.index}
                        day={i}
                        onActiveChange={this.receive}
                        isActive={false}
                    ></Cell>
                );
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
                    <td onClick={() => {this.editName(user)}}>{user.name}
                    </td>
                    {this.renderUserDays(user)}
                </tr>
            );
        });

        toPrint.push(
            <tr>
                <th>
                    <td
                        onClick={this.addPerson}
                        style={{
                            border: '1px solid #dee2e6',
                            boxShadow: '#7a5ad8 0 5px 0 0',
                        }}
                        className="btn "
                    >
                        Add Person
                    </td>
                </th>
            </tr>
        );

        return toPrint;
    }

    addDay() {
        let { date, users } = this.state;
        let startDate = date[0];
        let endDate = new Date(date[1].getTime() + 1 * 24 * 60 * 60 * 1000);
        let daysGone = Math.ceil(
            Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24)
        );

        // We can assume that by adding a day, each person will be present
        users.forEach((user) => {
            user.daysGone.push(daysGone);
        });

        this.setState({
            date: [startDate, endDate],
            daysGone: daysGone,
            users: users,
        });
    }

    addPerson() {
        let { users, daysGone } = this.state;
        let newId = users[users.length - 1].index + 1;
        let personDaysGone = [];
        for(let i = 0; i < daysGone + 1; i++ ) {
            personDaysGone.push(i);
        }

        let person = {
            name: 'New person ' + newId,
            index: newId,
            daysGone: personDaysGone,
            owes: 0,
        };

        const list = [...users, person];

        this.setState({ users: list });
    }

    render() {
        const { users, isLoading, daysGone } = this.state;

        return (
            <div>
                <div className="date-container">
                    <div>
                        <div
                            style={{
                                margin: '8px 0 8px 0',
                                fontSize: '1.3rem',
                            }}
                        >
                            How long are you gone for?
                        </div>
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

                {!isNaN(daysGone) ? (
                    <div
                        style={{
                            margin: '8px 0 8px 0',
                            fontSize: '1.3rem',
                        }}
                    >
                        Your trip lasts {daysGone} days
                    </div>
                ) : (
                    <div
                        style={{
                            margin: '8px 0 8px 0',
                            fontSize: '1.3rem',
                        }}
                    >
                        Enter your trip dates!
                    </div>
                )}
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
