import React from 'react'
import './App.css'
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';

const Slot = (props) => {
    return (
        <div className='slot'>
            {/* <div className='name'>{props.name}</div> */}
            {/* <div className='Date'>{props.date.slice(0,24)}</div> */}
            <div className='time'>
                <span className='from'>{props.from}</span>
                -
                <span className='till'>{props.till}</span>
                <span className='Duration'>30 Min.</span>
            </div>
            <Button className='book-btn btn' appearance="primary" active>
                BOOK
            </Button>
        </div>
    )
}

export default Slot