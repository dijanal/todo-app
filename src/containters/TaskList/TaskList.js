import React, {Component} from 'react';
import {Button, Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import Rodal from 'rodal';


import {Accordion, AccordionItem} from 'react-sanfona';
import './TaskList.css';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                task: {
                    description: null,
                    isFinished: false,
                    user: "N/A",
                    task_name: "N/A"
                }
            }],
            visible: false,
            name: "",
            description: "",
            user: "",
        };

    }

    componentDidMount() {
        fetch('https://todo-app-4545e.firebaseio.com/todos.json')
            .then(response => response.json())
            .then(json => {
                json ? this.setState({todos: json}) : ""
            })
            .catch(error => {
                console.log(error)
            })
    }

    show = () => {
        this.setState({visible: true});


    };

    hide = () => {
        this.setState({visible: false});
    };

    handleSubmit = (e) => {
        const url = 'https://todo-app-4545e.firebaseio.com/todos.json'
        const task = JSON.stringify({
            description: this.state.description,
            task_name: this.state.name,
            user: this.state.user
        });

        let fetchData = {
            method: 'POST',
            body: task
        };

        fetch(url, fetchData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });


        this.setState({
            description: '',
            name: '',
            user: '',
        });

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


    render() {
        return (
            <div id="task_list_wrapper">
                <Accordion allowMultiple>
                    {Object.values(this.state.todos).map(todo => {
                        console.log(todo);
                        return (

                            <AccordionItem
                                key={todo}
                                title={`${todo.task_name}`}
                            >
                                <div>
                                    {`Description: ${todo.description}`}
                                </div>
                                <div>
                                    {`User: ${todo.user}`}
                                </div>
                                <div>
                                    {`Is finished: ${todo.isFinished}`}
                                </div>
                            </AccordionItem>


                        );
                    })}
                </Accordion>

                <Rodal visible={this.state.visible}
                       onClose={this.hide.bind(this)}
                       animation="door"
                       height="350"
                       width="500">
                    <div>
                        <Form>
                            <FormGroup>
                                <ControlLabel>Task name</ControlLabel>{' '}
                                <FormControl type="text" placeholder="Enter task title"
                                             onChange={this.handleNameChange}/>
                            </FormGroup>{' '}
                            <FormGroup>
                                <ControlLabel>Task description</ControlLabel>{' '}
                                <FormControl type="text" placeholder="Enter task description"
                                             onChange={this.handleDescriptionChange}/>
                            </FormGroup>{' '}
                            <FormGroup>
                                <ControlLabel>User</ControlLabel>{' '}
                                <FormControl type="text" placeholder="Add task to user"
                                             onChange={this.handleUserChange}/>
                            </FormGroup>{' '}
                            <Button type="submit" onClick={this.handleSubmit}>Add task</Button>
                        </Form>
                    </div>
                </Rodal>
                <Button id="add_task_btn" bsStyle="primary" onClick={this.show}>Add task</Button>

            </div>
        )
    }
}

export default TaskList;
