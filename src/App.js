import React, { useState, useEffect } from 'react';
import './App.css';
import icon from './FOOZIE.webp'
import Slot from './Slot'
import axios from 'axios';
import 'rsuite/dist/rsuite.min.css';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { format, add, startOfDay, endOfDay,isToday } from 'date-fns'

function App() {
  const urlSearch=window.location.search;
  const urlParams = new URLSearchParams(urlSearch);
  
  const apiURL='http://ec2-13-232-196-86.ap-south-1.compute.amazonaws.com'
  const [date, setDate] = React.useState(dayjs(new Date()));
  // const [phone_id, setPhone_id] = useState('gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA==')
  const [start_time, setStart_time] = useState(new Date().toISOString())
  const [end_time, setEnd_time] = useState(endOfDay(new Date()).toISOString())
  const [freeSlots, setFreeSlots] = useState();
  var phone_id=urlParams.getAll('phone_id') && 'gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA=='
  
  // console.log(new Date(start_time).getDate())
  // console.log(.toString(),'it somes here');
  async function findSlots() {
    axios.get(`${apiURL}/get_free_dates`, {
      params: {
        phone_id: phone_id,
        start_time: start_time,
        end_time: end_time,
      }
    })
      .then((res) => { setFreeSlots(res.data) })
      .catch((err) => { console.log(err) })
  }
  function disableWeekends(date) {
    return new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
  }

  useEffect(() => {
    setFreeSlots()
    findSlots();
  }, [start_time]);
  return (
    <>
      <div className='head'>
        <img src={icon} alt="" />
      </div>
      <div className="App">
        <div className='col col-1'>
          <div>Find Free Slots</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              className='date-picker'
              date={date}
              disablePast={true}
              shouldDisableDate={disableWeekends} 
              maxDate={add(new Date(),{days:7})}
              onChange={(newDate) => {
                setDate(newDate);
                if(isToday(new Date(newDate))){
                  setStart_time(new Date().toISOString());                  
                }
                else{              
                  setStart_time(startOfDay(new Date(newDate)).toISOString());                  
                }
                setEnd_time(endOfDay(new Date(newDate)).toISOString());
                findSlots();
              }} />
          </LocalizationProvider>
        </div>
        <div className='col col-2'>
          {/* <div>
            Available Slots from
            {new Date(start_time).toLocaleString() +'to'+new Date(end_time).toLocaleString() }
          </div> */}
          {freeSlots != null ? freeSlots.map((ele) => {
            return (
              <Slot
                key={ele.slot_id}
                slot_id={ele.slot_id}
                // date={new Date().toString()}
                start_time={ele.start}
                end_time={ele.end}
                phone_id={phone_id}
              />)
          }) : <div className='loading'>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>}

        </div>
      </div>
    </>
  );
}

export default App;
