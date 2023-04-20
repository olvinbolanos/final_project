import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvas({ name, attributes, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-7 mx-auto" style={{ marginTop: '-40px' }}>
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className="col-lg-6 col-xxl-4">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-grid  mx-auto">
          <ul>
            {attributes.map((desc, i) => {
              return (
                <li style={{ listStyle: 'none' }} key={i}>{desc.traitType} : {desc.value}</li> 
              )
          })}
          </ul>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <br></br>
          <Button variant="secondary" onClick={handleShow} className="me-2 " >$$$$</Button>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Backdrop({...props}) {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvas key={idx} placement={placement} name={props.name} attributes={props.attributes}/>
      ))}
    </>
  );
}

