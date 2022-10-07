import React, { useState } from 'react';
import './App.css';
import icon from './FOOZIE.webp'
import Slot from './Slot'
import DatePicker from 'rsuite/DatePicker';
// Documentation https://rsuitejs.com/components/date-range-picker/
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';


function App() {
  const [fal, setFal] = useState(new Date());
  const [freeSlots, setFreeSlots] = useState(
    [{
      id: 1000,
      name: 'Dr. Sunil Verma',
      date: new Date(),
      from: '3PM',
      till: '3:30PM',
    },
    {
      id: 1001,
      name: 'Dr. Prabhakar Mishra',
      date: new Date(),
      from: '3:30PM',
      till: '4PM',
    },
    {
      id: 1002,
      name: 'Dr. Ajay Raut',
      date: new Date(),
      from: '3PM',
      till: '3:30PM',
    },
    {
      id: 1003,
      name: 'Dr. John Doe',
      date: new Date(),
      from: '4:30PM',
      till: '5PM',
    },
    {
      id: 1004,
      name: 'Dr. John Doe',
      date: new Date(),
      from: '1PM',
      till: '1:30PM',
    },
    ]
  );

  const [date, setDate] = React.useState(dayjs('2022-04-07'));
  return (
    <>
      <img src={icon} alt="" />
      <div className="App">
        <div className='col col-1'>
          <div>Find Free Slots</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker date={date} onChange={(newDate) =>{ setDate(newDate)}} />
          </LocalizationProvider>
          
          <Button className='find-btn' appearance="primary" active>
            Find
          </Button>
        </div>
        <div className='col col-2'>
          {freeSlots.map((ele) => {
            return (
              <Slot
              key={ele.id}
                // name={ele.name}
                date={ele.date.toString()}
                from={ele.from}
                till={ele.till}
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
