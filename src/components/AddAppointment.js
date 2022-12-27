import React,{useState} from 'react'
import {host_link} from '../data/rest_connection'

export const AddAppointment = () =>{
    const [dateQuery,setDateQuery] = useState('')
    const [timeFromQuery,setTimeFromQuery] = useState('')
    const [timeToQuery, setTimeToQuery] = useState('')
    const [firstNameQuery,setFirstNameQuery] = useState('')
    const [lastNameQuery,setLastNameQuery] = useState('')
    const [commentQuery,setCommentQuery] = useState('')
    const [message,setMessage] = useState('')
    const [isAccepted,setIsAccepted] = useState(false)
    
    const updateQuery = setQuery => event =>{
        setQuery(event.target.value)
        setMessage('')
    }


    const addData = () =>{
        const url = host_link.concat('/add_appointments')
        const data = {date: dateQuery,first_name:firstNameQuery, last_name:lastNameQuery, comments:commentQuery, time_to:timeToQuery, time_from: timeFromQuery}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        console.log('data',data)
        fetch(url,requestOptions)
            .then(response => {
                if (response.ok){
                    setDateQuery('');setFirstNameQuery('');setLastNameQuery('');setCommentQuery('');setTimeFromQuery('');setTimeToQuery('')
                    setIsAccepted(true)
                }
                return response.json()
            })
            .then(json => {
                console.log('json_message', json)
                setMessage(json.message)
            })
            .catch(() => {
                console.log("Can’t access " + url + " response. Blocked by browser?")
                setMessage("Can’t access " + url + " response. Blocked by browser?")
            })
        
        console.log('fetch done!.')
        
    }
    

    return(
        <div className="add-appointment">
            <div className="side-design">
                <div className="side-design-block"></div>
            </div>
            <div className="book-appointment">
                <div className='book-appointment-content'>
                <div className="form-input">
                    <span className="form-input__label">NOM</span>
                <input className='form-input__text'type="text"  value={firstNameQuery} onChange={updateQuery(setFirstNameQuery)}/>
                </div>
                <div className="form-input">
                    <span className="form-input__label">PRENOM</span>
                    <input className='form-input__text' type="text"  value={lastNameQuery} onChange={updateQuery(setLastNameQuery)}/>
                </div>
                </div>
                <div className='book-appointment-content'>
                <div className="form-input">
                    <span className="form-input__label">DATE</span>
                    <input className = "form-input__text" type="date" value={dateQuery} onChange={updateQuery(setDateQuery)}/>
                </div>
                </div>
                <div className='book-appointment-content'>
                
                <div className="form-input">
                    <span className="form-input__label">DE</span>
                    <input className = "form-input__text" type="time" value={timeFromQuery} onChange={updateQuery(setTimeFromQuery)}/>
                </div>
                <div className="form-input">
                    <span className="form-input__label">A</span>
                    <input className = "form-input__text" type="time" value={timeToQuery} onChange={updateQuery(setTimeToQuery)}/>
                </div>
                </div>
                <div className="book-appointment-content">
                    <div className="form-input">
                        <span className="form-input__label">TITRE</span>
                        <textarea className= 'form-input__text' type="textarea" value={commentQuery} onChange={updateQuery(setCommentQuery)}/>
                    </div>
                </div>
                <div className="book-appointment-content">
                <button className= "form-input__button" onClick={addData}>Add</button>
                <h3 className='form-input__message' style={isAccepted?{color:"green"}:{color:"red"}}>{message}</h3>
                </div>
            </div>
        </div>
    )
}

export default AddAppointment