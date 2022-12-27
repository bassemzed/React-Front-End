import React from 'react'

const Background = () =>{
    return(
        <div className="background">
        <div className="background__blue">
        <div className="background__circle--outer blue-circle blue-circle--1">
            <div className="background__circle--inner blue-circle--inner"></div>
        </div>
        <div className="background__circle--outer blue-circle blue-circle--2">
            <div className="background__circle--inner blue-circle--inner"></div>
        </div>
        </div>
        <div className="background__circle--outer green-circle green-circle--1">
        <div className="background__circle--inner green-circle--inner"></div>
        </div>
        <div className="background__circle--outer green-circle green-circle--2">
        <div className="background__circle--inner green-circle--inner"></div>
        </div>
    </div>
    )
}

export default Background