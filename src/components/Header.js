import React,{Fragment} from 'react'
import "../assets/style.css"
const Header = ({header='',sub_header=''}) =>{
    return(
        <Fragment>
        <div className="header">
        <h1 className='header-fontx'>{header}</h1>
        </div>
        <div className="date_headerx">
            <h2 className="date_header-fontx">{sub_header}</h2>
        </div>
        </Fragment>
    )
}

export default Header