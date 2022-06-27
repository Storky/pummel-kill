import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SearchAppBar from 'components/AppBar';

import getNumbersTo1Dmg from 'engine/pummel'
import {userSlice} from 'store/reducers/UserSlice';
import {useAppDispatch, useAppSelector} from 'utils/hooks/redux';

function App() {
    const {count} = useAppSelector(state => state.userReducer)
    const {increment} = userSlice.actions;
    const dispatch  = useAppDispatch();

    React.useEffect(()=>{
        getNumbersTo1Dmg();
    });

  return (
    <React.Fragment>
        <CssBaseline />

        <SearchAppBar/>
        <Container maxWidth="lg" sx={{marginY: 5}}>
            {/*https://www.youtube.com/watch?v=o1chMISeTC0*/}


            {/*https://youtu.be/Od5H_CiU2vM?t=685*/}
            <h1>{count}</h1>
            <br/>
            <button onClick={() => dispatch(increment(5))}>button</button>
            <br/>

        </Container>
    </React.Fragment>
  );
}

export default App;
