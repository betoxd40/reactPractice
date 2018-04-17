import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Table, Row } from 'antd';

// Import actions here!!

class TableComponent extends Component {
    render() {
        const dataSource =
            this.props.people;

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        }, {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
        }];
        return (
            <Row className={'table'}>
                <Table columns={columns} dataSource={dataSource}/>
                <Row type="flex" justify="end">
                    <h5 className={'my-name'}>Alberto Yanes</h5>
                </Row>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        people: state.user.people,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators( dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
