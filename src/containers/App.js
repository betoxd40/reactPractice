import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../sass/app.scss'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import FormComponent from '../components/FormComponent'
import TableComponent from '../components/TableComponent'

class App extends Component {
    Home() {
        return (
            <div className={'app'}>
                <h1 className={'text-center h1-title'}>Intive - FDV Exercise</h1>
                <Row gutter={48} type="flex" justify="center">
                    <Col span={8}>
                        <FormComponent/>
                    </Col>
                    <Col span={8}>
                        <TableComponent/>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={this.Home.bind( this )}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
