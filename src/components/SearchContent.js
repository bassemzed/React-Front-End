import React,{useState} from 'react'
import {RecordsContent} from './RecordsContent'


function SearchContent(){

    const [dateFrom,setDateFrom] = useState("")
    const [dateTo,setDateTo] = useState("")
    
    const[dateFromQuery,setDateFromQuery] = useState(
        ()=>{
            var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
    )
    
    const[dateToQuery,setDateToQuery] = useState("")
    const[isPressed,setIsPressed] = useState(false)

    const updateQuery = setQuery => event =>{
        setQuery(event.target.value)
        setIsPressed(false)
    }

    const searchData = () =>{
        setDateFrom(dateFromQuery)
        setDateTo(dateToQuery)
        setIsPressed(true)
    }
    
    const Pane = () =>{
        return(<RecordsContent date_from={dateFrom} date_to={dateTo}/>)
    }

    return(
        <div className="search-content">
            <div className="search-content__bar">
                <div className="form-input">
                    <span className="form-input__labelx">DATE DE</span>
                    <input className = "form-input__textx" type="date" value={dateFromQuery} onChange={updateQuery(setDateFromQuery)}/>
                </div>
                <div className="form-input">
                    <span className="form-input__labelx">DATE A</span>
                    <input className = "form-input__textx" type="date" value={dateToQuery} onChange={updateQuery(setDateToQuery)}/>
                </div>
                <div className="search-content__button">
                    <button onClick={searchData} className= "form-input__buttonx" >Recherche</button>
                </div>
            </div>{
                !isPressed?(<RecordsContent date_from={dateFrom} date_to={dateTo}/>):
                (<Pane/>)
            }
            
        </div>
        
    )

}


export default SearchContent