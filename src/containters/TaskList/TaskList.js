import React, {Component} from 'react';
import {Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import Rodal from 'rodal';

import { Accordion, AccordionItem } from 'react-sanfona';
import './TaskList.css';

class TaskList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                task:{
                    description : "N/A",
                    isFinished: false,
                    user: "N/A",
                    task_name: "N/A"
                }
            }],
            visible: false,
        };

    }

    componentDidMount(){
        fetch('https://todo-app-4545e.firebaseio.com/todos.json')
            .then(response => response.json())
            .then(json => {this.setState({todos: json})})
            .catch(error => {console.log(error)})
    }

    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
    }

    render(){
        return(
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
                                <FormControl type="text" placeholder="Enter task title" />
                            </FormGroup>{' '}
                            <FormGroup>
                                <ControlLabel>Task description</ControlLabel>{' '}
                                <FormControl type="text" placeholder="Enter task description" />
                            </FormGroup>{' '}
                            <FormGroup>
                                <ControlLabel>User</ControlLabel>{' '}
                                <FormControl type="text" placeholder="Add task to user" />
                            </FormGroup>{' '}
                            <Button type="submit">Add task</Button>
                        </Form>
                    </div>
                </Rodal>
                <Button id="add_task_btn" bsStyle="primary" onClick={this.show}>Add task</Button>

            </div>
        )
    }
}

export default TaskList;