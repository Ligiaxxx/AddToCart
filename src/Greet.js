import React, { Component } from 'react'


const Greet=(props)=>{
    return(
        <h1>Hello {props.name}, you are {props.age } years old!</h1>
    )
}

export default Greet

