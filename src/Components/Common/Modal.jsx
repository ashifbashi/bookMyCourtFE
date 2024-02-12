import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { children } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function ModalView({children,setShow,show}) {
  
  // const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
       {children}
      </Modal>
    </div>
  );
}

