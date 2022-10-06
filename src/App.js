import React, { useState } from 'react';
import './App.css';
import Slot from './Slot'
import DateRangePicker from 'rsuite/DateRangePicker';
// Documentation https://rsuitejs.com/components/date-range-picker/
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';


function App() {
  const [fal, setFal] = useState([new Date(), new Date()]);
  const [freeSlots, setFreeSlots] = useState(
    [{
      name: 'Dr. Sunil Verma',
      date: new Date(),
      from: '3 PM',
      till: '5PM',
    },
    {
      name: 'Dr. Prabhakar Mishra',
      date: new Date(),
      from: '3 PM',
      till: '5PM',
    },
    {
      name: 'Dr. Ajay Raut',
      date: new Date(),
      from: '3 PM',
      till: '5PM',
    },
    {
      name: 'Dr. John Doe',
      date: new Date(),
      from: '3 PM',
      till: '5PM',
    },
    {
      name: 'Dr. John Doe',
      date: new Date(),
      from: '3 PM',
      till: '5PM',
    },
    ]
  );
  return (
    <div className="App">
      <div className='col col-1'>
        <div>Find Free Slots</div>
        <DateRangePicker
          size="lg"
          format="dd-MMM-yyyy"
          // aria-expanded={true}
          open={true}
          defaultCalendarValue={fal}
          onChange={(value) => { setFal(value) }}
        />
        <div>
          <b> From : </b>{fal[0].toString().slice(0, 24)} ~~ <b> Till : </b> {fal[1].toString().slice(0, 24)}
        </div>
        <Button appearance="primary" active>
          Find
        </Button>
      </div>
      <div className='col col-2'>
        {freeSlots.map((ele) => {
          return (
            <Slot
              name={ele.name}
              date={ele.date.toString()}
              from={ele.from}
              till={ele.till}
            />)
        })}
        {/* <Slot/>
        <Slot/> */}
      </div>
    </div>
  );
}

export default App;
