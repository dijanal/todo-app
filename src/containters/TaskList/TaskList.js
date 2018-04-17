import React, {Component} from 'react';

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
                    user: "N/A"
                }
            }],
        };

    }

    componentDidMount(){
        fetch('https://todo-app-4545e.firebaseio.com/todos.json')
            .then(response => response.json())
            .then(json => {this.setState({todos: json})})
            .catch(error => {console.log(error)})
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
                                title={`Item ${todo.task_name}`}
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
            </div>
        )
    }
}

export default TaskList;