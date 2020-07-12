import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import GridRow from './components/GridRow';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/styles/Main.css';
import MoneyForm from './components/MoneyForm';
import { DateRangePicker, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import modal from './components/JourneyInfoModal';

class Cell extends Component {
    state = {
        isActive: this.props.isActive,
    };

    sendToParent() {
        let { isActive } = this.state;
        let { userId, day } = this.props;
        isActive = !isActive;
        this.setState({ isActive: isActive }, () => {
            this.props.sendToParent(isActive, userId, ++day);
        });
    }

    render() {
        let { isActive } = this.state;

        let toReturn = isActive ? (
            <td
                onClick={() => {
                    this.sendToParent();
                }}
                className="cell-going"
            ></td>
        ) : (
            <td
                onClick={() => {
                    this.sendToParent();
                }}
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
        // We need to add 1 more day
        // endDate.setDate(endDate.getDate() + 1);

        this.state = {
            date: [date, endDate],
            users: [
                {
                    name: 'Person 1',
                    id: 0,
                    daysGone: [1, 2, 3, 4, 5],
                    owes: 0,
                },
                {
                    name: 'Person 2',
                    id: 1,
                    daysGone: [1, 2, 3, 4, 5],
                    owes: 0,
                },
                {
                    name: 'Person 3',
                    id: 2,
                    daysGone: [1, 2, 3, 4, 5],
                    owes: 0,
                },
            ],
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
        this.receive = this.receive.bind(this);
    }


    componentDidMount() {
        let { date } = this.state;
        let daysGone = Math.ceil(
            Math.abs(date[0] - date[1]) / (1000 * 60 * 60 * 24)
        )
        console.log("Gone: " + daysGone + "days");
        this.setState({
            isLoading: false,
            daysGone: daysGone,
        });
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

        this.setState(
            {
                date: dates,
            },
            () => {
                this.componentDidMount();
            }
        );
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
                <th style={{maxWidth: '1rem', padding: '1px'}} onClick={this.addDay} >
                    {' '}
                    <div className="btn btn-light">+</div>
                </th>
            </tr>
        );
    }

    toggleDay(e) {
        console.log(e);
        console.log('infunc');
    }

    receive(isActive, userId, day) {
        console.log('receive');
        console.log('UserId: ' + userId + ' is: ' + isActive);
        let { users } = this.state;
        var index = users[userId].daysGone.indexOf(day);

        if (index !== -1) {
            users[userId].daysGone.splice(index, 1);
            this.setState({ users: users }, () => {
                console.log(users);
                this.componentDidMount();
            });
        } else {
            users[userId].daysGone.push(day);
            this.setState({ users: users }, () => {
                console.log(users);
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
                        userId={user.id}
                        day={i}
                        sendToParent={this.receive}
                        isActive={true}
                    ></Cell>
                );
            } else {
                toPrint.push(
                    <Cell
                        userId={user.id}
                        day={i}
                        sendToParent={this.receive}
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
                    <td>{user.name}</td>
                    {this.renderUserDays(user)}
                </tr>
            );
        });

        return toPrint;
    }

    addDay() {
        let { date, users } = this.state;
        let startDate = date[0];
        let endDate = new Date(date[1].getTime() + 1 * 24 * 60 * 60 * 1000);
        let daysGone = Math.ceil(
            Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24)
        )
        
        // We can assume that by adding a day, each person will be present
        users.forEach((user) => {
            user.daysGone.push(daysGone)
        })
        
        this.setState({
            date: [startDate, endDate],
            daysGone: daysGone,
            users: users
        });
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
