import React from 'react'
import './App.css'
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {format} from 'date-fns'

const Slot = (props) => {
    //Slot already exists/booked
    const apiURL='http://ec2-13-232-196-86.ap-south-1.compute.amazonaws.com'
    const [booking_status, setBookingStatus] = React.useState()
    async function book_slot() {
        axios.post(`${apiURL}/book_slot?phone_id=${props.phone_id}&slot_id=${props.slot_id}`,
            // {
            //     params:{
            //         phone_id:'gAAAAABjPGG-aYwzpbW7FWrlHlKhWL76ZYqp5OjLd9h7mCa-BOrALaiZsv5359YZ0gVJ1gwpA4eflxPCc9sDYxvnEx4wnzGXgA==',
            //         slot_id:props.slot_id,
            //     }
            // }
        )
        .then((res => {
            setBookingStatus(res.data.status, notify_success(res.data.status));
        }))
        .catch((err) => {
            console.log(err)
            setBookingStatus(err.response.data, notify_error(err.response.data));
        })
        // console.log(props.slot_id)
    }
    async function notify_success(x) {
        return toast.success(`${x}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    async function notify_error(x) {
        return toast.error(`${x}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div className='slot'>
            <div className='date' style={{paddingBottom:0}}>{format(new Date(props.start_time),'dd-MMM-yy').toLocaleString()}</div>
            <div className='time'>
                <span className='from'>{format(new Date(props.start_time),'hh-mm a').toLocaleString()}</span>
                -
                <span className='till'>{format(new Date(props.end_time),'hh-mm a').toLocaleString()}</span>
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