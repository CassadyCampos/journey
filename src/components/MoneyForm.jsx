import React, { Component } from 'react';
import '../assets/styles/MoneyForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class MoneyForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pricesOwed: '',
            total: '',
            renderBreakdown: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTotalChange = this.handleTotalChange.bind(this);
    }
    
    clearState() {
        this.setState({total: 0})
        this.props.persons.forEach(person => {
            person.owes = 0;
        })
    }

    handleSubmit() {
        this.clearState();
        this.calculateSplit();
        this.setState({renderBreakdown: true})
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
        
        let pricePerNight = total / daysGone;
        console.log(pricePerNight);

        // process through each day
        for(let i = 0; i < daysGone; i++) {
            let pplIndexPresent = [];

            console.log(persons);

            for(let j = 0; j < persons.length; j++) {
                
                console.log("day: " + (i));
                // means this person was present that day
                let res = persons[j].daysGone.includes(i+1);
                if (res) {
                    pplIndexPresent.push(j);
                }
            }

            // calculate for day
            pplIndexPresent.forEach(index => {
                // add this night calculation
                // persons[index] =  {...persons[index],...{"owes": owes += pricePerNight / pplIndexPresent.length}};
                // console.log(pricePerNight / pplIndexPresent.length)
                console.log(index);
                persons[index].owes += (pricePerNight / pplIndexPresent.length);
            })
        }

        console.log(persons);
        // this.setState({ pricesOwed: pricesOwed });
    }

    renderBreakdown() {
        let renderReturn = [];
        let {persons} = this.props;
        let {pricesOwed} = this.state;

        for (let i = 0; i < persons.length; i++) {
            renderReturn.push(
                <div key={i}>
                    {persons[i].name}: {persons[i].owes.toFixed(2)}
                </div>
            )
        }

        return renderReturn;
    }

    render() {
        let {renderBreakdown} = this.state;
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
                            {renderBreakdown? this.renderBreakdown() : '' }
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
