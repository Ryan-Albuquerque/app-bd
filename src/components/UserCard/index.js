import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

import api, { getErrorMessage } from '../../services/api';
import Notification from '../../utils/Notification'
import Constants from '../../utils/constants'

import { Button, Card, Col, Row } from 'react-bootstrap';
import './style.css';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


function UserCard({data}) {
    let history = useHistory();
    const [user] = useState(data);

    const handleClick = () =>{
        history.push(`/edit/${data._id}`)
    }

    const handleDelete = async () =>{
        try {
            await api.delete(`/user/${user._id}`)

            Notification(Constants.Notification.types.success, 'Deletado com sucesso!');

            setTimeout(() => {
                history.go(0);
            }, 2000);

        } catch (error) {
            const message = getErrorMessage(error);

            Notification(Constants.Notification.types.error, message);
        }
    }

    
    return (
        <Card className="my-1">
            <Card.Body>
                <Row className="d-flex justify-content-between align-middle">
                    <Col>
                        <label className="form-check-label" >
                            {user.name  }
                        </label>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button className="p-0 border-0 bg-body text-dark" onClick={handleClick}>
                            <EditIcon/>
                        </Button>
                        <Button  className="py-0 border-0 bg-body text-dark" onClick={handleDelete}>
                            <DeleteIcon/>
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default UserCard;
