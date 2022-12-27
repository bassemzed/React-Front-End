import React,{Fragment} from 'react'

const Header = ({header='',sub_header=''}) =>{
    return(
        <Fragment>
        <div className="header">
        <h1 className='header-font'>{header}</h1>
        </div>
        <div className="date_header">
            <h2 className="date_header-font">{sub_header}</h2>
        </div>
        </Fragment>
    )
}

export default Header