import React, {Component} from 'react';
import { Form, Button, Input, Dropdown, Menu, Icon, Row, message, DatePicker } from 'antd';
import { handleChange,
        itemsFetchData,
        handleSubmit,
        clearInputData } from '../redux/reducers/user'
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class FormComponent extends Component {

    componentDidMount() {
        this.props.actions.itemsFetchData('https://restcountries.eu/rest/v2/all');
    }

    handleSubmitForm = () => {
        const user = {
            key: this.props.name+this.props.surname,
            name: this.props.name+' '+this.props.surname,
            surname: this.props.surname,
            country: this.props.country,
            birthday: this.props.birthdayAux,
        };
        this.checkData( user );
    };

    checkData = user => {
        if (this.props.name === '' || this.props.surname === '' || this.props.country === 'Countries' || this.props.birthday === null) {
            message.error('Please fill all the data');
        } else {
            this.props.actions.handleSubmit(user);
            this.props.actions.clearInputData();
            // Separar fecha
            const date = this.props.birthdayAux.split("/");
            message.success(`Hello ${this.props.name} ${this.props.surname} from ${this.props.country}. on ${date[0]} of ${date[1]}  you will have ${date[2]} `, 5);
        }
    };

    handleDatePicker = (date, dateString) => {
        /* eslint-disable */
        this.props.actions.handleChange( { name: 'birthday', value: date, } );
        this.props.actions.handleChange( { name: 'birthdayAux', value: dateString, } );
    };

    render(){
        const menu = (
            <Menu onClick={
                event => this.props.actions.handleChange( { name: 'country', value: event.key, } )
            }>
                {
                    this.props.countriesFetch.map( (country) =>
                        <Menu.Item key={country.name}>
                            {country.name}
                        </Menu.Item>
                    )
                }
            </Menu>
        );

        return(
            <Form>
                <Form.Item
                    {...formItemLayout}
                    label="Name"
                >
                    <Input
                        placeholder={'name here'}
                        value={ this.props.name }
                        onChange= { event => this.props.actions.handleChange( { name: 'name', value: event.target.value, } ) }
                    />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Surname"
                >
                    <Input
                        placeholder={'surname here'}
                        value={ this.props.surname }
                        onChange= { event => this.props.actions.handleChange( { name: 'surname', value: event.target.value, } ) }
                    />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Countries"
                >
                    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']} >
                        <Button style={{ marginLeft: 8 }}>
                            {this.props.country}  <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Birthday"
                >
                    <DatePicker
                        value={this.props.birthday}
                        placeholder={'mm/dd/yyyy'}
                        format={'MM/DD/YYYY'}
                        onChange={ this.handleDatePicker }
                    />
                </Form.Item>

                <Form.Item
                >
                    <Row type="flex" justify="end">
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmitForm}>Save</Button>
                    </Row>

                </Form.Item>
            </Form>
        );
    }
}

function mapStateToProps( state ) {
    return {
        name: state.user.name,
        surname: state.user.surname,
        country: state.user.country,
        birthday: state.user.birthday,
        birthdayAux: state.user.birthdayAux,
        countriesFetch: state.user.countriesFetch,
        items: state.user.items,
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        actions: bindActionCreators( {
            handleChange,
            itemsFetchData,
            handleSubmit,
            clearInputData,
        }, dispatch ),
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormComponent );



