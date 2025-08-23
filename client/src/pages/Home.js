import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../App.css';
import API_BASE_URL from '../config/api';

const Home = () => {
    const [data, setData] = useState('');


    const getData=async()=>{
        const response = await axios.get(`${API_BASE_URL}/getData`);
        setData(response.data);
    }

    useEffect(()=>{
        getData()
    },[]);

   
    return (
            
            <header className="cu">
              <Header/>
              {data}
            </header>
        
    );
}

export default Home;
