import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Wallet  from '../pages/Wallet';

export function TabsExample( ) {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/mint">Mint NFT</Nav.Link>
      </Nav.Item>
     
      <Nav.Item>
        <Nav.Link href="/s3-Bucket">Image Upload</Nav.Link>
      </Nav.Item>
     
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item >
      <div>
          <Wallet />
      </div>
      
    </Nav>
  );
}
