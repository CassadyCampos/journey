import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'rsuite';

export default class JourneyInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({ show: false });
    }
    open() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className="modal-container">
                <ButtonToolbar>
                    <Button onClick={this.open}>How to Use</Button>
                </ButtonToolbar>

                <Modal
                    className="w-75 p-3"
                    show={this.state.show}
                    onHide={this.close}
                >
                    <Modal.Header>
                        <Modal.Title
                            style={{
                                fontSize: '1.5rem',
                            }}
                        >
                            What is Journey?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{
                            fontSize: '1.2rem',
                        }}
                    >
                        Journey is a travel app designed to make splitting the
                        cost between friends/family easy!
                        <hr />
                        1. Add in the dates for your trip <br />
                        2. Add and adjust the people going <br />
                        3. Finally, enter the amount for your trip! <br />
                        <br />
                        ** Journey will split the amount of the trip by figuring
                        out the cost per day, taking into account how many
                        people are present.
                        <br /> Perfect for trips where you may have people
                        coming and going!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.close}
                            style={{
                                backgroundColor: '#7a5ad8',
                                color: 'white',
                            }}
                        >
                            Got It!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
