import React from 'react'

import Header from '../../components/Header';
import FormUser from '../../components/FormUser';
import Footer from '../../components/Footer';


function EditUser(props) {
    return (
        <>
            <Header />
            <FormUser props={props}/>
            <Footer />
        </>
    )
}

export default EditUser;
