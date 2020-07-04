import React, { Component } from 'react';
import '../assets/styles/MoneyForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { isThisSecond } from 'date-fns';

export default class MoneyForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pricesOwed: '',
            total: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTotalChange = this.handleTotalChange.bind(this);
    }
    
    handleSubmit() {
        this.calculateSplit();
    }

    handleTotalChange(e) {
        this.setState({total: e.target.value})
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
        let { persons, daysGone } = this.props; 
        let { total } = this.state;
        persons.sort((p1, p2) => {
            return ((p1.daysGone / daysGone) * total) - (p2.daysGone / daysGone) * total;
        });
        console.log(persons);

        // while(persons.length > 0) {
        //     let popFront = persons.slice(0, 1).shift();
        //     console.log(popFront);
        // }
        while (count > 0){
            var d = persons[0]
            var similarPpl = persons.filter((person) => {
                return person.daysGone == d.daysGone;
            })

             let owed = total / (similarPpl.length + 1) * (persons[0].daysGone / daysGone) 
            persons[0] = {... persons[0], ...{owed: owed}};
            console.log(persons[0]);
            var front = persons.slice(1);
            count--;
        }

        this.setState({ pricesOwed: pricesOwed });
    }

    renderRes() {
        return <div>test</div>;
    }

    renderBreakdown() {
        let renderReturn = [];
        let {persons} = this.props;
        let {pricesOwed} = this.state;

        for (let i = 0; i < persons.length; i++) {
            renderReturn.push(
                <div key={i}>
                    {persons[i].name}: {pricesOwed[i]}
                </div>
            )
        }

        return renderReturn;
    }

    render() {
        return (
            <div className="container-form">
                <div className="container">
                    <Form>
                        <Form.Group>
                            <Form.Label>How much did you spend?</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option defaultChecked>Currency...</option>
                                <option value="1">CAD</option>
                                <option value="2">USD</option>
                            </Form.Control>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount." 
                                value={this.state.total}
                                onChange={this.handleTotalChange}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your info with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button onClick={this.handleSubmit} variant="primary">
                            Submit
                        </Button>
                    </Form>
                    <div className="card">
                        <h5 className="card-header">Split Breakdown</h5>
                        <div className="card-body">
                            {/* <h5 class="card-title">Special title treatment</h5> */}
                            {this.renderBreakdown()}
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
