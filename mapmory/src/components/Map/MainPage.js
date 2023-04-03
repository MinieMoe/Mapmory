import React from 'react';
import SidePanel from './SidePanel';
import Map from './Map';
import { useAuth } from '../../AuthContext/AuthContext'


const MainPage = () => {
    const { authorized } = useAuth()

    return (
        <div>
            <SidePanel />
            <Map/>
        </div>
    );
}

export default MainPage;
