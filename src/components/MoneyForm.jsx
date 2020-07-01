import React, { Component } from 'react';
import '../assets/styles/MoneyForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class MoneyForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log('submitted');
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
                                <option selected>Currency...</option>
                                <option value="1">CAD</option>
                                <option value="2">USD</option>
                            </Form.Control>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount.  "
                            />
                            <span>CAD</span>
                            <Form.Text className="text-muted">
                                We'll never share your info with anyone else.
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button onClick={this.handleSubmit} variant="primary">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
