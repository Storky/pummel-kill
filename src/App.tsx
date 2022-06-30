import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SearchAppBar from 'components/AppBar';

import getNumbersTo1Dmg from 'engine/pummel'
import {userSlice} from 'store/reducers/UserSlice';
import {useAppDispatch, useAppSelector} from 'utils/hooks/redux';
import {fetchUsers, fetchWeapons} from 'store/reducers/ActionCreators';
import {postAPI} from 'services/PostService';

function App() {
    const {count, users, isLoading, error} = useAppSelector(state => state.userReducer)
    const {increment} = userSlice.actions;
    const dispatch  = useAppDispatch();

    const {data: posts} = postAPI.useFetchAllPostsQuery(5);

    React.useEffect(()=>{
        dispatch(fetchUsers());
    }, []);

    React.useEffect(()=>{
        dispatch(fetchWeapons());
    }, []);

    React.useEffect(()=>{
        getNumbersTo1Dmg();
    });

    console.log(JSON.stringify(users, null, 2));

    return (
        <React.Fragment>
            <CssBaseline />

            <SearchAppBar/>
            <Container maxWidth="lg" sx={{marginY: 5}}>
                {/*https://www.youtube.com/watch?v=o1chMISeTC0*/}

                {/*https://youtu.be/Od5H_CiU2vM?t=685*/}
                <h1><button onClick={() => dispatch(increment(5))}>current count = {count}</button></h1>

                {isLoading && <h1>Loading... 111 {isLoading}</h1>}
                {error && <h1>{error}</h1>}

                <h1>POSTS</h1>

                <ul>
                    {posts[0]}
                </ul>


            </Container>
        </React.Fragment>
  );
}

export default App;
