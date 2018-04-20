import React from 'react'

import './Input.css'

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isValid: true,
        }

        this.onBlur = this.onBlur.bind(this);
    }


    onBlur(event) {
        const {handleValidate, setChange} = this.props;
        const value = event.currentTarget.value;


        setChange( value);
        const isValid = handleValidate(value);

        console.log(isValid);

        this.setState({isValid});


    }

    render() {
        const {isValid} = this.state;
        return (
            <div className='input'>
                <input className="inputBox" type={this.props.type} placeholder={this.props.placeholder} onBlur={this.onBlur}/>
                {!isValid  && <div >{this.props.errorMsg}</div>}

            </div>
        )
    }
}

export default Input;
