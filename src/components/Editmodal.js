import React,{useState,useEffect} from 'react'
import {host_link} from '../data/rest_connection'
import {useFetch} from './hooks'


export const EditModal = ({set_modal,id}) =>{
    const [editID,setEditID] = useState(id)
    const [dateQuery,setDateQuery] = useState('')
    const [timeFromQuery,setTimeFromQuery] = useState('')
    const [timeToQuery, setTimeToQuery] = useState('')
    const [firstNameQuery,setFirstNameQuery] = useState('')
    const [lastNameQuery,setLastNameQuery] = useState('')
    const [commentQuery,setCommentQuery] = useState('')
    const [message,setMessage] = useState('')
    const [isAccepted,setIsAccepted] = useState(false)
    

    useEffect(()=>{
        fetch(host_link+'/appointment_details/'+id)
        .then(response => response.json())
        .then(json =>{
            setFirstNameQuery(json.first_name)
            setLastNameQuery(json.last_name)
            setCommentQuery(json.comments)
            setDateQuery(String(json.date_time_from).split("T")[0])
            setTimeFromQuery(String(json.date_time_from).split("T")[1].slice(0,-3))
            setTimeToQuery(String(json.date_time_to).split("T")[1].slice(0,-3))
        })
    },[]);


    const updateQuery = setQuery => event =>{
        setQuery(event.target.value)
        setMessage('')
    }

    const updateData = (setModal) => () =>{
        const url = host_link.concat('/update_appointments/'+editID)
        const data = {date: dateQuery,first_name:firstNameQuery, last_name:lastNameQuery, comments:commentQuery, time_to:timeToQuery, time_from: timeFromQuery}
        const requestOptions = {
            method: 'PUT',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
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
                alert(json.message)
                window.location.reload(false);
            })
            .catch(() => {
                console.log("Can’t access " + url + " response. Blocked by browser?")
                setMessage("Can’t access " + url + " response. Blocked by browser?")
            })
        
        console.log('fetch done!.')
    }

    return(
        <div className="edit-modal">
            <span className="edit-modal__header main-content__month-fontx">Edit Record</span>
            <div className="edit-modal-content">
            <div className="form-input">
                <span className="form-input__labelx">NOM</span>
                <input className='form-input__text'type="text"  value={firstNameQuery} onChange={updateQuery(setFirstNameQuery)}/>
            </div>
            <div className="form-input">
                <span className="form-input__labelx">PRENOM</span>
                <input className='form-input__text' type="text"  value={lastNameQuery} onChange={updateQuery(setLastNameQuery)}/>
            </div>
            </div>

            <div className="form-input">
                <span className="form-input__labelx">DATE</span>
                <input className = "form-input__text" type="date" value={dateQuery} onChange={updateQuery(setDateQuery)}/>
            </div>
            <div className="edit-modal-content">
            <div className="form-input">
                <span className="form-input__labelx">FROM</span>
                <input className = "form-input__text" type="time" value={timeFromQuery} onChange={updateQuery(setTimeFromQuery)}/>
            </div>
            <div className="form-input">
                <span className="form-input__labelx">TO</span>
                <input className = "form-input__text" type="time" value={timeToQuery} onChange={updateQuery(setTimeToQuery)}/>
            </div>
            </div>

            <div className="form-input">
                <span className="form-input__labelx">COMMENTS</span>
                <textarea className= 'form-input__text' type="textarea" value={commentQuery} onChange={updateQuery(setCommentQuery)}/>
            </div>
            
            <div className="edit-modal-content edit-modal-content__bottom">
            <button className= "form-input__buttonx" onClick={updateData(set_modal)}>Save</button>
            <h3 className='form-input__message' style={isAccepted?{color:"green"}:{color:"red"}}>{message}</h3>
            </div>
            
        </div>
    )
}
