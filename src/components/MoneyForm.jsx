import React, { Component } from 'react';
import '../assets/styles/MoneyForm.css';
import { Grid, Col, Dropdown, Input, InputGroup, Button } from 'rsuite';

const styles = {
    display: "inline-table"
};

export default class MoneyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pricesOwed: '',
            total: '',
            renderBreakdown: false,

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTotalChange = this.handleTotalChange.bind(this);
    }

    clearState() {
        this.setState({ total: 0 });
        this.props.users.forEach((user) => {
            user.owes = 0;
        });
    }

    handleSubmit() {
        this.clearState();
        this.calculateSplit();
        this.setState({ renderBreakdown: true });
    }

    handleTotalChange(e) {
        this.setState({ total: e.target.value });
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    calculateSplit() {
        let pricesOwed = [];
        let { users, daysGone } = this.props;
        let { total } = this.state;

        let pricePerNight = total / daysGone;
        console.log(pricePerNight);

        // process through each day
        for (let i = 0; i < daysGone; i++) {
            let pplIndexPresent = [];

            console.log(users);

            for (let j = 0; j < users.length; j++) {
                console.log('day: ' + i);
                // means this user was present that day
                let res = users[j].daysGone.includes(i + 1);
                if (res) {
                    pplIndexPresent.push(j);
                }
            }
            // calculate for day
            pplIndexPresent.forEach((index) => {
                // add this night calculation
                console.log(index);
                users[index].owes += pricePerNight / pplIndexPresent.length;
            });
        }
        console.log(users);
    }

    renderBreakdown() {
        let renderReturn = [];
        let { users } = this.props;

        for (let i = 0; i < users.length; i++) {
            renderReturn.push(
                <div key={i}>
                    {users[i].name}: {users[i].owes.toFixed(2)}
                </div>
            );
        }

        return renderReturn;
    }

    render() {
        let { renderBreakdown } = this.state;
        return (
            <div className="container-form">
                <div className="container">
                    <div className="inputsGroup">
                        <div                     style={{
                        margin: '8px 0 8px 0',
                        fontSize: '1.3rem'
                    }}>What is the total?</div>
                        <div className="input-and-button">
                            <InputGroup
                                style={styles}
                                value={this.state.total}
                                onChange={this.handleTotalChange}
                            >
                                <InputGroup.Addon>$</InputGroup.Addon>
                                <Input />
                                <InputGroup.Addon>.00</InputGroup.Addon>
                            </InputGroup>
                            <Button
                                onClick={this.handleSubmit}
                                style={{
                                    backgroundColor: '#7a5ad8',
                                    color: 'white',
                                    marginLeft: '8px'
                                }}
                            >
                                GO!
                            </Button>
                        </div>
                    </div>
                    {renderBreakdown ? 
                        <div className="card">
                            <h5 className="card-header">Split Breakdown</h5>
                            <div className="card-body">
                                {this.renderBreakdown()}
                            </div>
                        </div>
                    :
                        ''
                    }
                </div>
            </div>
        );
    }
}
