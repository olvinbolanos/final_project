import * as React from 'react';
import Card from 'react-bootstrap/Card';
//import ListGroup from 'react-bootstrap/ListGroup';
import NFTMetadata from './NFTMetadata.json';
import Backdrop from '../Backdrop/Backdrop.js';


export default function NftCard() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {
        NFTMetadata.map((items, i) => {
          return (
            <Card style={{ width: '18rem', margin: '10px' }} key={i}>
              <Card.Img variant="top" src={`${items.image}`} />
              <Backdrop
                name={items.name}
                attributes={items.attributes} />  
                {/* 
              <Card.Body>
                <Card.Title>{`${items.name}`}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the c ard's content.
          </Card.Text>
          
              </Card.Body>
          */ }
              {/* 
              <ListGroup className="list-group-flush">
                {items.attributes.map((attr, index) => {
                  return (
                    <ListGroup.Item key={index}>{`${attr.traitType} : ${attr.value}`}</ListGroup.Item>
                  )
                })}
              </ListGroup>
            */ }
              {/* 
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            */ }
            </Card>
          )
        })
      }
    </div>
  );
}