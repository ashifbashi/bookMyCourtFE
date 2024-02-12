import { useEffect, useState } from 'react';
import { ModalView } from './Common/Modal';
import './css/CourtBooking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Config/AxiosInstance';
import { BASE_URL, TIMINGS } from '../Constants/constance';
import { toastSuccess, toastError } from '../Constants/plugins';
import { useSelector } from 'react-redux';

const CourtBooking = () => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false)
  const [singleCourtData, setSingleCourtData] = useState({});
  const [selectedTiming, setSelectedTiming] = useState([])
  const [filterTiming, setFilterTiming] = useState(TIMINGS)
  const [timeSlotData, setTimeSlotData] = useState({ startDate: '', endDate: '', cost: '' })
  const [slotData, setSlotData] = useState([])
  const [inputDate, setInputDate] = useState()
  const [bookingModal, setBookingModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const { userDetails } = useSelector((state => state.user))
  const [editCourtModal, setEditCourtModal] = useState(false)
  const [editCourtData, setEditCourtData]= useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShowSlot = () => setBookingModal(true);
  const handleCloseSlot = () => setBookingModal(false);




  useEffect(() => {
    getSingleCourtData();
    getTimeSlotData(new Date());
  }, [])

  useEffect(() => {
    getLatestFilterSlots()
  }, [selectedTiming])

  const getSingleCourtData = () => {
    AxiosInstance.get('/users/getSingleCourtData', { params: { courtid: id } }).then((res) => {

      setSingleCourtData(res.data)
      setEditCourtData(res.data)
      console.log(res.data, "dataaa");
    })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === 'unauthorized user') {
          localStorage.clear()
          navigate('/')
        }
      })
  }

  const handleChange = (e) => {
    setTimeSlotData({ ...timeSlotData, [e.target.name]: e.target.value })
    console.log(timeSlotData);
  }

  const getLatestFilterSlots = () => {
    if (selectedTiming.length === 0) {
      setFilterTiming(TIMINGS)
    } else {

      const tempArray = []
      for (let slot of TIMINGS) {

        let flag = false;
        for (let selectedSlot of selectedTiming) {

          if (slot.id === selectedSlot.id) {
            flag = true
          }
        }

        if (!flag) {
          tempArray.push(slot)
        }

      }

      setFilterTiming(tempArray)
    }

  };

  const handleCreatTimeSlot = () => {
    try {

      AxiosInstance.post('/admin/addTimeSlotData', { ...timeSlotData, selectedTiming, courtId: id }).then((res) => {
        toastSuccess("Court slots added successfully")
      })

    } catch (error) {
      console.log(error)
      toastError("Something went wrong")
    }
  }


  const getTimeSlotData = (date = new Date) => {
    AxiosInstance.get('/users/dayWiseTimeSlot', { params: { courtId: id, date: date } }).then((res) => {
      setSlotData(res.data)
    }).catch((err) => {
      if (err.response.data.message === 'unauthorized user') {
        localStorage.clear()
        navigate('/')
      }
    })
  }

  const initiateBooking = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await AxiosInstance.post("/payment/orders", { slotId: selectedSlot._id });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_cx9B8rETmWVZI6", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Bookyour court",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          slotId: selectedSlot._id
        };

        const result = await AxiosInstance.post("/payment/success", data);

        toastSuccess(result.data.msg);
        console.log("success msg", result);
        setBookingModal(false)
        getTimeSlotData(new Date(inputDate));
      },
      prefill: {
        name: "Bookyour court",
        email: "bookyourcourt@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "vallapuzha, pattambi, kerala",
      },
      theme: {
        color: "#29c911",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }



const updateCourtData =(e)=>{
  setEditCourtData({...editCourtData, [e.target.name]:e.target.value})
};

const updateEditedCD =()=>{
  AxiosInstance.post('/admin/updateEditedCD', editCourtData).then((res)=>{

    setEditCourtModal(false)
    toastSuccess(res.data.message)

    // getSingleCourtData(editCourtData) update only text 
    getSingleCourtData()

  }).catch((err)=>{
    console.log(err)
  })
  }


  return (
    <>
      <div className="banner-main">
        <div className="banner-bg">
          <img src={`${BASE_URL}/courts/${singleCourtData.courtPic}`} />
          <div className="ban-2">
            <h2>{singleCourtData.courtName} <br /><span>{singleCourtData.location}</span></h2>
            <div>
              {userDetails.role === 1 && <button onClick={handleShow}>Add time slot</button>}
              {' '}
              {userDetails.role === 1 && <button onClick={() => setEditCourtModal(true)}>Edit Court</button>}
            </div>

          </div>

        </div>
      </div>


      <marquee
        direction="right"
        behavior="scroll"
        className="rolling-booking"
      >
        <h3>Confirm your slot at the last earliest</h3>
      </marquee>


      <div class="app-time">

        <div></div>

        <div className='d-flex'>
   
          <input style={{maxWidth:'200px'}} type="date" className="form-control" placeholder="select specific Date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
          <button onClick={() => inputDate && getTimeSlotData(new Date(inputDate))} class="btn btn-success">Search</button>
        </div>
        <div className="row jusify-content-center">
          {slotData.map((slot) =>
            <div className="col-md-2 col-sm-6">
              <div className="slotname-container d-flex flex-wrap gx-2 gap-3 mt-5 pointer">
                <span className={` ${slot.bookedBy ? 'booked-slot' : 'slot-span'}`} key={slot.id} onClick={() => { !slot.bookedBy && setBookingModal(true); !slot.bookedBy && setSelectedSlot(slot) }}>{slot.slot.name}</span>
              </div>

            </div>
          )}


        </div>

      </div>

   {/* add time slot modal start */}

      <ModalView setShow={setShow} show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{singleCourtData.courtName}</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <h4 style={{ fontSize: "14px" }}>{singleCourtData.location}</h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Starting date</Form.Label>
              <Form.Control
                type="date"
                value={timeSlotData.startDate}
                name="startDate"
                onChange={handleChange}
                placeholder="Starting date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ending date</Form.Label>
              <Form.Control
                type="date"
                min={timeSlotData.startDate}
                value={timeSlotData.endData}
                onChange={handleChange}
                name="endDate"
                placeholder="Ending date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                value={timeSlotData.cost}
                name="cost"
                onChange={handleChange}
                placeholder="Cost"
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group
    className="mb-3"
    controlId="exampleForm.ControlTextarea1"
  >
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group> */}
            {/* <Form.Select aria-label="Default select example">
    <option>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </Form.Select> */}
            <div className="cus-dropdown mt-4 " onClick={() => setShowDropdown(true)}>
              Select Timing
     {showDropdown && (
                <div className="cus-option" onMouseLeave={() => setShowDropdown(false)}>

                  <ul>
                    {filterTiming.map((element, index) => (
                      <li onClick={() => setSelectedTiming([...selectedTiming, element])}>{element.name}</li>

                    ))}

                  </ul>

                </div>
              )}
            </div>
            <div className="m-2 main-sp">
              {selectedTiming?.length > 0 ? selectedTiming.map((element) => (
                <span className="select-slot-sp p-1">
                  {element.name}
                </span>
              )) :
                <i>No slot available</i>
              }

            </div>
          </Form>


          {/* admin */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
         </Button>
          <Button style={{ backgroundColor: "#29c911", border: "#29c911" }} variant="primary" onClick={handleCreatTimeSlot}>
            Submit
          </Button>
        </Modal.Footer>

      </ModalView>

      {/* add time slot modal end */}


{/* slot booking modal start */}

      <ModalView setShow={setBookingModal} show={bookingModal}>

        <Modal.Header closeButton>
          <Modal.Title>{selectedSlot?.court.courtName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="slot-mod-det">
            <h4 style={{ fontSize: "14px" }}>Slot: {selectedSlot?.slot.name}</h4>
            <p style={{ fontSize: "14px" }}>Date: {new Date(selectedSlot?.date).toString().slice(0, 15)}</p>
            <p style={{ fontSize: "14px" }}>Address: {selectedSlot?.court.address}</p>
            <p style={{ fontSize: "14px" }}>Cost: {selectedSlot?.cost}</p>
          </div>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSlot}>
            Close
</Button>
          <Button style={{ backgroundColor: "#29c911", border: "#29c911", width: "150px" }} variant="primary" onClick={initiateBooking}>
            {" "}Book now{" "}
          </Button>
        </Modal.Footer>

      </ModalView>

      {/* slot booking modal end */}


      {/* Court edit modal start */}

      <ModalView setShow={setEditCourtModal} show={editCourtModal}>
    
        <Modal.Header closeButton>
          <Modal.Title>{selectedSlot?.court.courtName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Court name</Form.Label>
              <Form.Control
                type="text"
                onChange={updateCourtData}
                name="courtName"
                value={editCourtData.courtName}
                placeholder="Court name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                onChange={updateCourtData}
                name="location"
                value={editCourtData.location}
                placeholder="Location"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                onChange={updateCourtData}
                name="type"
                value={editCourtData.type}
                placeholder="type"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                onChange={updateCourtData}
                name="address"
                value={editCourtData.address}
                placeholder="Address"
                autoFocus
              />
            </Form.Group>


        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setEditCourtModal(false)}>
            Close
</Button>
          <Button style={{ backgroundColor: "#29c911", border: "#29c911", width: "150px" }} variant="primary" onClick={updateEditedCD}>
            {" "}Update now{" "}
          </Button>
        </Modal.Footer>

      </ModalView>

      {/* Court edit modal end */}

    </>
  )
}

export default CourtBooking
