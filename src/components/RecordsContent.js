import React,{Fragment,useState} from 'react'
import img_edit from '../assets/img/edit.png'
import img_delete from '../assets/img/delete.png'
import {month_arr,day_arr} from '../data/date_arrays'
import {useFetchPost} from './hooks'
import {host_link} from '../data/rest_connection'
import  EditModal  from './Editmodal'
import "../assets/style.css"

const clickedEditResult = (id,setShowEditModal,setEditID) => () =>{
    setShowEditModal(true)
    setEditID(id)
    console.log('id',id)
}

const clickedDeleteResult = id => () =>{
    console.log('id',id)
    if (confirm("Delete a Record id:" + id)){
        fetch(host_link+'/delete_appointments/'+id,{method:'DELETE'})
        .then(response=>response.json())
        .then(json=>{
            console.log(json.message)
            window.location.reload(false);
            alert(json.message)
            })
    }
    else{
        console.log('cancelled!')
    }
}


export const RecordsContent = ({date_from="",date_to=""}) =>{
    const datas = useFetchPost(host_link+'/show_appointments',[],{date_from:date_from,date_to:date_to})
    let tmp_date_arr = []

    const [showEditModal,setShowEditModal] = useState(false)
    const [editID,setEditID] = useState("")

    return(
        <Fragment> 
        {
            showEditModal?(<EditModal set_modal={setShowEditModal.bind(this)} id={editID}/>):null
        }
        
        <div className="main-content" id ="style-1">
            {
                datas.map(data =>{
                    console.log(data)
                    const {comments, date_time_from, date_time_to, first_name, id,last_name} = data;
                    const date_str = date_time_from.split("T")[0];
                    const [year, month, day] = date_str.split("-")
                    const date = new Date(year,month-1,day)
                    const time_from = date_time_from.split("T")[1];
                    const time_from_12h = new Date(date_str+'T' + time_from + 'Z')
                    .toLocaleTimeString({},
                        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                    );
                    const time_to = date_time_to.split("T")[1];
                    const time_to_12h = new Date(date_str+'T' + time_to + 'Z')
                    .toLocaleTimeString({},
                        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                    );

                    const is_data = tmp_date_arr.includes(date_str);
                    console.log('is_data',is_data)
                    console.log('date',date)
                    
                    if(!is_data){
                        tmp_date_arr.push(date_str)
                        console.log('tmp_date_arr',tmp_date_arr)
                        return (<div key={id}>
                            <DatePin month={month_arr[date.getMonth()]} date_day={String(date.getDate())} day={day_arr[date.getDay()-1]} />
                            <Appointment 
                            name = {first_name+' '+last_name}
                            time = {time_from_12h+' to '+time_to_12h}
                            comments = {comments}
                            id={id}
                            set_modal={setShowEditModal}
                            set_edit_id = {setEditID}/>
                        </div>)
                    }
                    else{
                        return (<div key={id}>
                            <Appointment 
                            name = {first_name+' '+last_name}
                            time = {time_from_12h+' to '+time_to_12h}
                            comments = {comments}
                            id={id}
                            set_modal={setShowEditModal}
                            set_edit_id = {setEditID}
                            />
                        </div>)
                    }
                })
            }
        </div>
        </Fragment>
    )
}

export const DatePin = ({month='',date_day='',day=''}) =>{
    return(
        <div className="main-content__date-container">

        <div className="main-content__date">
            <div className="date_pinx">
                <h3 className="date_pin__days">{date_day}</h3>
                <span className="date_pin__day">{day}</span>
            </div>
            <div className="main-content__month">
            <h3 className="main-content__month-fontx">{month}</h3>
            </div>
        </div>
        <div className="main-content__line-containerx">
            <div className="main-content__line"></div>
        </div>
        </div>
    )
}

export const Appointment = ({name='',time='',comments='',id='',set_modal,set_edit_id}) =>{
    return(
        <div className="appointment-container">
            <div className="appointment-container__leftx">
                <div className="appointee__name">
                    <span>{name}</span>
                </div>
                <div className="appointee__time">
                    <span>{time}</span>
                </div>
            </div>
           <div className="appointment-container__rightx">
            <div className="ed-button-container">
                <a className="ed-button" onClick={clickedEditResult(id,set_modal,set_edit_id)}>
                    <img src={img_edit} alt="EDIT" className="ed-button__img"/>
                </a>
                <a className="ed-button" onClick={clickedDeleteResult(id)} >
                    <img src={img_delete} alt="DELETE" className="ed-button__img"/>
                </a>
            </div>
            <div className="comment-section">
                <p className="comment-section__text">
                    {comments}
                </p>
            </div>
           </div>
        </div>
    )
}


