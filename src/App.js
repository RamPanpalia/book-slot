import React, { useState } from 'react';
import './App.css';
import icon from './FOOZIE.webp'
import Slot from './Slot'
// import DatePicker from 'rsuite/DatePicker';
// Documentation https://rsuitejs.com/components/date-range-picker/
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';


function App() {

  const [date, setDate] = React.useState(dayjs('2022-04-07'));
  const [phone_id, setPhone_id] = useState('gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA==')
  const [start_time, setStart_time] = useState('2022-10-10T17:48:55Z')
  const [end_time, setEnd_time] = useState('2022-10-11T17:48:55Z')
  const [freeSlots, setFreeSlots] = useState(
    [{
      id: 1000,
      name: 'Dr. Sunil Verma',
      date: new Date(),
      start: '3PM',
      end: '3:30PM',
    },
    {
      id: 1001,
      name: 'Dr. Prabhakar Mishra',
      date: new Date(),
      start: '3:30PM',
      end: '4PM',
    },
    {
      id: 1002,
      name: 'Dr. Ajay Raut',
      date: new Date(),
      start: '3PM',
      end: '3:30PM',
    },
    {
      id: 1003,
      name: 'Dr. John Doe',
      date: new Date(),
      start: '4:30PM',
      end: '5PM',
    },
    ]
  );

  function findSlots() {
    fetch(`http://ec2-13-232-196-86.ap-south-1.compute.amazonaws.com/get_free_dates?phone_id=${phone_id}&start_time=${start_time}&end_time=${end_time}`)
      .then((res) => { setFreeSlots(res) })
      .catch((err) => { console.log(err) })
  }
  return (
    <>
      <div className='head'>
        <img src={icon} alt="" />
      </div>
      <div className="App">
        <div className='col col-1'>
          <div>Find Free Slots</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker className='date-picker' date={date} onChange={(newDate) => { setDate(newDate) }} />
          </LocalizationProvider>

          <Button className='find-btn btn' appearance="primary" active onClick={findSlots}>
            FIND
          </Button>
        </div>
        <div className='col col-2'>
          {freeSlots.map((ele) => {
            return (
              <Slot
                key={ele.id}
                // name={ele.name}
                date={ele.date.toString()}
                from={ele.start}
                till={ele.end}
              />)
          })}
          {/* <Slot/>
        <Slot/> */}
        </div>
      </div>
    </>
  );
}

export default App;
