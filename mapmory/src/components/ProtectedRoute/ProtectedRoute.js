import React, {useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        fetch('http://localhost:4000/api/verified', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success'){
                console.log(data.message)
                setAuthorized(true)
            }else{
                console.log(data.message)
                setAuthorized(false)
            }
        })
    },[])

    return (
        <Route
            {...rest}
            render ={(props) => {
                authorized ? (<Component {...props}/>
                ) : (
                    <Redirect 
                        to = {{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
                )
            }}
        />
    )
}

export default ProtectedRoute;
