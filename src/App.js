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
import { add } from 'date-fns'

function App() {

  const [date, setDate] = React.useState(dayjs(new Date()));
  const [phone_id, setPhone_id] = useState('gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA==')
  const [start_time, setStart_time] = useState(new Date().toISOString())
  const [end_time, setEnd_time] = useState(add(new Date(), { days: 1 }).toISOString())
  const [freeSlots, setFreeSlots] = useState();

  async function findSlots() {
    axios.get('http://ec2-13-232-196-86.ap-south-1.compute.amazonaws.com/get_free_dates', {
      params: {
        phone_id: phone_id,
        start_time: start_time,
        end_time: end_time,
      }
    })
      .then((res) => { setFreeSlots(res.data) })
      .catch((err) => { console.log(err) })
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
              onChange={(newDate) => {
                setDate(newDate);
                setStart_time(newDate.toISOString());
                setEnd_time(add(new Date(newDate), { days: 1 }).toISOString());
                findSlots();
              }} />
          </LocalizationProvider>
        </div>
        <div className='col col-2'>
          <div>
            Available Slots from
            {' '+ start_time.slice(0, 10)} {start_time.slice(11, 16) +' '}
            to {end_time.slice(0, 10)} {end_time.slice(11, 16)}
          </div>
          {freeSlots != null ? freeSlots.map((ele) => {
            return (
              <Slot
                key={ele.slot_id}
                slot_id={ele.slot_id}
                // date={new Date().toString()}
                start_time={ele.start}
                end_time={ele.end}
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
