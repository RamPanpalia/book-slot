import React from 'react'
import './App.css'
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slot = (props) => {
    //Slot already exists/booked
    const [booking_status, setBookingStatus] = React.useState()
    const notify = () =>{ 
        toast(`${ booking_status }`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        };
    async function book_slot() {
        axios.post(`http://ec2-13-232-196-86.ap-south-1.compute.amazonaws.com/book_slot?phone_id=gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA==&slot_id=${props.slot_id}`,
            // {
            //     params:{
            //         phone_id:'gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA==',
            //         slot_id:props.slot_id,
            //     }
            // }
        )
            .then((res => {
                setBookingStatus(res.data.status);
                notify();
            }))
            .catch((err) => {
                setBookingStatus(err.response.data);
                notify();
            })
        // console.log(props.slot_id)
    }

    return (
        <div className='slot'>
            {/* <div className='name'>{props.name}</div> */}
            {/* <div className='Date'>{props.date.slice(0,24)}</div> */}
            <div className='time'>
                <span className='from'>{props.start_time}</span>
                -
                <span className='till'>{props.end_time}</span>
                <span className='Duration'>30 Min.</span>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Button className='book-btn btn' appearance="primary" onClick={book_slot} active>
                BOOK
            </Button>
        </div>
    )
}

export default Slot