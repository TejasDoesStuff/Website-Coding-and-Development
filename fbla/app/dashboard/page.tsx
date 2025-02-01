"use client"

import React from 'react'
import Header from '../components/Header'
import Holder from './Holder'
import Head from 'next/head'

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Connext - Dashboard</title>
                <meta name="description" content="Manage your job listings and applications"/>
            </Head>
            <div className="overflow-x-hidden flex flex-col h-screen min-h-screen max-h-screen">
                <Header/>
                <Holder/>
            </div>
        </>
    )
}

export default Dashboard