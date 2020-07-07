import React, { Component } from 'react';
import '../assets/styles/MoneyForm.css';
import Form from 'react-bootstrap/Form';
import { Dropdown, Input, InputGroup, Button } from 'rsuite';

const styles = {
    width: 300,
    marginBottom: 10
  };
  

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

            <div>

   <Dropdown title="Curr.">
   <Dropdown.Item>CAD</Dropdown.Item>
   <Dropdown.Item>USD</Dropdown.Item>
   <Dropdown.Item>EUR</Dropdown.Item>
    </Dropdown>
                           
    <InputGroup style={styles} value={this.state.total} onChange={this.handleTotalChange}>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>
    <Button onClick={this.handleSubmit}
    style={{backgroundColor: '#7a5ad8', color: 'white'}}>Calculate!</Button>
            </div>
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
