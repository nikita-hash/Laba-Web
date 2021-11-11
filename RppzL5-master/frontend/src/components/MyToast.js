import React, {Component} from 'react';
import {Toast} from 'react-bootstrap';

export default class MyToast extends Component {
    render() {
        const toastCss = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            marginTop: '70px'
        }

        return (
            <div style={this.props.show ? toastCss : null}>
                <Toast className={"border border-success bg-success text-white"} show={this.props.show}>
                    <Toast.Header className={"bg-success text-white"} closeButton={false}>
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.message}
                    </Toast.Body>
                </Toast>
            </div>
        );
    }
}