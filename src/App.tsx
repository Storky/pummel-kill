import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import TourCard from 'components/TourCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchAppBar from 'components/AppBar';
import cities from 'data.json';
import Typography from '@mui/material/Typography';
import {CommentForm} from './components/forms/comment-form';
import MyLink from './components/my-link';


import getNumbersTo1Dmg from 'utils/pummel'


function App() {

    React.useEffect(()=>{
        getNumbersTo1Dmg();
    });

  return (
    <React.Fragment>
        <CssBaseline />

        <SearchAppBar/>
        <Container maxWidth="lg" sx={{marginY: 5}}>


            <br/>
            <MyLink/>
            <br/>
            <CommentForm/>

            {/*https://www.youtube.com/watch?v=o1chMISeTC0*/}

        </Container>
    </React.Fragment>
  );
}

export default App;
