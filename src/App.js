import React, { useState } from 'react';
import './App.css';
import DateRangePicker from 'rsuite/DateRangePicker';
// Documentation https://rsuitejs.com/components/date-range-picker/
import 'rsuite/dist/rsuite.min.css';

function App() {
  const [fal, setFal] = useState([new Date(),new Date()]);
  return (
    <div className="App">
      <p>Date Time Range</p>
      <DateRangePicker
        size="lg"
        format="dd-MM-yyyy HH:mm:ss"
        defaultCalendarValue={fal}
        onChange={(value)=>{setFal(value)}}
      />
      <br/>
      {/* {typeof(fal[0].toString())} */}
      {fal[0].toString()}
      <br/>
      {fal[1].toString()}
    </div>
  );
}

export default App;
