import React, {Component} from 'react';
import {Button, Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import Rodal from 'rodal';
import {Accordion, AccordionItem} from 'react-sanfona';

import './TaskList.css';
import fire from "../../firebase/firebase";

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: {},
            visible: false,
            name: "",
            description: "",
            user: "",
            key: ""
        };
    }

    componentWillMount() {
        this.firebaseRef = fire.database().ref('todos');
        this.firebaseRef.on('value', function (dataSnapshot) {
            let todos = [];
            dataSnapshot.forEach(function (childSnapshot) {
                let todo = childSnapshot.val();
                todo['key'] = childSnapshot.key;
                todos.push(todo);
            });
            this.setState({
                todos: todos
            });
        }.bind(this));
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    removeTodo = (key) => {
        let firebaseRef = fire.database().ref('todos');
        firebaseRef.child(key).remove();
    };

    updateTodo = (key, dataToChange, value) => {
        let ref = fire.database().ref(`todos/${key}`);
        ref.update({[dataToChange] : value})
        .catch(function (err) {
            console.log('one of these updates failed', err);
        });
    };

    show = () => {
        this.setState({visible: true});
    };

    hide = () => {
        this.setState({visible: false});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.firebaseRef.push({
            description: this.state.description,
            task_name: this.state.name,
            isFinished: false,
            user: this.state.user,
            key: this.state.key
        });

        this.clearInput();
        this.setState({visible: false});
    };

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    handleUserChange = (e) => {
        this.setState({user: e.target.value});
    };

    clearInput = () => {
        this.setState({user: "", description: "", name: ""});
    };


    render() {
        return (
            <div id="container">
                <div id="task_list_wrapper">
                    <Accordion allowMultiple>
                        {Object.values(this.state.todos).map(todo => {
                            return (
                                <AccordionItem
                                    key={todo.key}
                                    title={`${todo.task_name}`}
                                >
                                    <div className="accordion_item_wrapper">
                                        <div className="mark_as_done_wrapper">
                                            <input type='checkbox'
                                                   className='check-label'
                                                   id='check'
                                                   defaultChecked={todo.isFinished}
                                                   onClick={() => this.updateTodo(todo.key, "isFinished", !todo.isFinished)}/>
                                            <label htmlFor='check'
                                                   className='label-for-check'> Mark as done </label>
                                        </div>
                                        <div className="description_wrapper">
                                            {`Description: ${todo.description}`}
                                        </div>
                                        <div className="vertical_line">

                                        </div>
                                        <div className="user_wrapper">
                                            {`User: ${todo.user}`}
                                        </div>
                                        <div onClick={() => this.removeTodo(todo.key)}>
                                            <i className="fa fa-times"></i>
                                        </div>

                                    </div>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>

                    <Rodal visible={this.state.visible}
                           onClose={this.hide.bind(this)}
                           animation="door"
                           height={350}
                           width={500}>
                        <div>
                            <Form>
                                <FormGroup>
                                    <ControlLabel>Task name</ControlLabel>{' '}
                                    <FormControl type="text" placeholder="Enter task title"
                                                 value={this.state.name}
                                                 onChange={this.handleNameChange}
                                    />
                                </FormGroup>{' '}
                                <FormGroup>
                                    <ControlLabel>Task description</ControlLabel>{' '}
                                    <FormControl type="text" placeholder="Enter task description"
                                                 value={this.state.description}
                                                 onChange={this.handleDescriptionChange}/>
                                </FormGroup>{' '}
                                <FormGroup>
                                    <ControlLabel>User</ControlLabel>{' '}
                                    <FormControl type="text" placeholder="Add task to user"
                                                 value={this.state.user}
                                                 onChange={this.handleUserChange}/>
                                </FormGroup>{' '}
                                <Button type="submit" onClick={this.handleSubmit}>Add task</Button>
                            </Form>
                        </div>
                    </Rodal>
                    <Button id="add_task_btn" bsStyle="primary" onClick={this.show}>Add task</Button>
                </div>
            </div>
        )
    }
}

export default TaskList;
