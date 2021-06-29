import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListUsers from '../../components/ListUsers';

function Home () {
    return(
        <>
            <Header/>
            <ListUsers/>
            <Footer/>
        </>
    )
}

export default Home;