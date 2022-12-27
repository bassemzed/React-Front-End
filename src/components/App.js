import React,{Fragment,useState} from 'react'
import {img_home,img_add,img_search} from '../data/images'
import Background from './Background'
import AddAppointment from './AddAppointment'
import SearchContent from './SearchContent'
import {SideContent,SideContentButton} from './SideContent'
import {RecordsContent} from './RecordsContent'
import Header from './Header'
import {EditModal} from './Editmodal'

function App(){
    
    const [isAddPane,setIsAddPane] = useState(false)
    const [isRecordsPane,setIsRecordsPane] = useState(true)
    const [isSearchPane,setIsSearchPane] = useState(false)
    const [header,setHeader] = useState('')
    const [subHeader,setSubHeader] = useState('')

    const updatePane = setPane => () =>{
        setIsAddPane(false)
        setIsRecordsPane(false)
        setIsSearchPane(false)
        setPane(true)
    }

    const Pane = () =>{
        if (isRecordsPane){
            setHeader('Rendez-vous')
            setSubHeader('')
            return(<RecordsContent/>)
        }
        else if (isAddPane){
            setHeader('Réserver un rendez-vous')
            setSubHeader('Fixer Rendez-vous')
            return(<AddAppointment/>)
        }
        else if (isSearchPane){
            setHeader('Recherche Rendez-vous')
            setSubHeader('Date Selection')
            return(<SearchContent/>)
        }
    }

    console.log('isAddPane - isRecordsPane - isSearchPane',isAddPane,isRecordsPane,isSearchPane)

    return(
        <Fragment>
            <Background/>
            <div className="app-body">
                <div className="main">
                    <Header header={header} sub_header={subHeader}/>
                    <div className="content">
                        <SideContent>
                            <SideContentButton on_click={updatePane(setIsRecordsPane).bind(this)} img_src={img_home} title='ACCEUIL'/>
                            <SideContentButton on_click={updatePane(setIsAddPane).bind(this)} img_src={img_add} title='AJOUT'/>
                            <SideContentButton on_click={updatePane(setIsSearchPane).bind(this)} img_src={img_search} title='CHERCHER'/>
                        </SideContent>
                        <Pane/>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default App