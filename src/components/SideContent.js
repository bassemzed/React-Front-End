import React,{Fragment} from 'react'

export const SideContent = ({children}) =>{
    return(
        <div className="side-content">
            {children}
        </div>
    )
}

export const SideContentButton = ({img_src = '',title='',on_click}) =>{
    return(
        <Fragment>
            <a onClick ={on_click} className="side-content__button">
            <img className="side-content__button__image" src={img_src} alt={title}/>
            <span className="side-content__labelx">
            {title}
            </span>
            </a>
        </Fragment>
    )
}