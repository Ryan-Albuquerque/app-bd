import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import moment from 'moment';

import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import api, { getErrorMessage } from '../../services/api';
import Constants from '../../utils/constants';
import Notification from '../../utils/Notification';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function FormUser({props}) {
    
    let history = useHistory();
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);

    const handleCreateUser = async (e) =>{
        e.preventDefault();

        try {
            user.phoneContacts = [user.phoneContacts0, user.phoneContacts1]

            const response = await api.post('/user', user);

            Notification(Constants.Notification.types.success, response.data.message);

            setTimeout(() => {
                history.push('/');
            }, 2000);

        } catch (error) {
            const message = getErrorMessage(error)

            Notification(Constants.Notification.types.error, message);
        }
    }

    const handleBack = ()=>{
        history.push('/')
    }

    const handleSaveEditUser = async (e) =>{
        e.preventDefault();

        try {
            user.phoneContacts = [user.phoneContacts0, user.phoneContacts1]
            const response = await api.patch(`/user/${user._id}`, user);

            Notification(Constants.Notification.types.success, response.data.message);

            setTimeout(() => {
                history.push('/');
            }, 2000);

        } catch (error) {
            const message = getErrorMessage(error)

            Notification(Constants.Notification.types.error, message);
        }
    }

    useEffect(() => {
        const fecthData = async () =>{
            try {
                const response = await api.get(`/user/${props.match.params.id}`);

                response.data.user.bornDate = moment(response.data.user.bornDate);

                let year = response.data.user.bornDate.year();
                let month = response.data.user.bornDate.month() + 1;
                let day = response.data.user.bornDate.date();

                if(day<10) {
                    day = '0'+day;
                } 
              
                if(month<10) {
                    month = '0'+month;
                } 

                response.data.user.bornDate = `${year}-${month}-${day}`

                response.data.user.phoneContacts0 = response.data.user.phoneContacts[0];
                response.data.user.phoneContacts1 = response.data.user.phoneContacts[1];

                setUser(response.data.user)
            } catch (error) {
                const message = getErrorMessage(error)
    
                Notification(Constants.Notification.types.error, message);
            }
        }

        if(!props.isNew){
            fecthData()
        }

    }, [props])

    return (
        <Container className="my-3 vh-100">
            <Row className="mb-4">
                <Col>
                    <Button variant="light" className="d-flex py-2" onClick={handleBack}>
                        <ArrowBackIcon/>
                        {'Voltar'}
                    </Button>
                </Col>
            </Row>
            <Form>  
                <Form.Group className="py-2">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="João Eduardo da Costa" disabled={!edit && !props.isNew} onChange={(e)=>setUser({...user, name: e.target.value})} defaultValue={user.name}/>
                </Form.Group>
                <Form.Group className="py-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="joao@gmail.com" onChange={(e)=>setUser({...user, email: e.target.value})} disabled={!edit && !props.isNew} defaultValue={user.email}/>
                </Form.Group>
                <Row>
                    <Form.Group className="py-2 w-25">
                        <Form.Label>Telefone de Contato</Form.Label>
                        <Form.Control type="text" placeholder="9233333333" onChange={(e)=>setUser({...user, phoneContacts0: e.target.value})} disabled={!edit && !props.isNew} defaultValue={user.phoneContacts0}/>
                    </Form.Group>
                    <Form.Group className="py-2 w-25">
                        <Form.Label>Celular para Contato</Form.Label>
                        <Form.Control type="text" placeholder="92999999999" onChange={(e)=>setUser({...user, phoneContacts1: e.target.value})} disabled={!edit && !props.isNew} defaultValue={user.phoneContacts1}/>
                    </Form.Group>

                </Row>
                <Form.Group className="py-2 w-25">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="number" placeholder="69073630" onChange={(e)=>setUser({...user, cep: e.target.value})} disabled={!edit && !props.isNew} defaultValue={user.cep}/>
                </Form.Group>
                <Form.Group className="py-2 w-25">
                    <Form.Label>Data de nascimento</Form.Label>
                    <input className="d-flex" type="date" name="bornDate" disabled={!edit && !props.isNew} onChange={(e)=>{
                        setUser({...user, bornDate: e.target.value})}} 
                        defaultValue={user.bornDate} />
                </Form.Group>
            </Form>
            <Row className="my-4">
                <Col className="d-flex justify-content-end">
                    {props.isNew || edit?
                        (<Button variant="success" onClick={edit ? handleSaveEditUser :handleCreateUser} type="submit">
                            Salvar
                        </Button>)
                        :(<Button variant="success" onClick={(e)=>setEdit(true)} type="submit">
                            Editar
                        </Button>)
                    }
                    
                </Col>
            </Row>
        </Container>
        
    )
}

export default FormUser
