import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Metaplex } from '@metaplex-foundation/js';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import './App.css';
import NftCard from './Card/NftCard';
import Header from './Header/Header';

const connection = new Connection(clusterApiUrl('devnet'));
const mx = Metaplex.make(connection);

function App() {
  const [address, setAddress] = useState(
    '0xd0ff87cc052b35241d11127b8687d727b7444d3e',
    {/* '3ijFZcJKmp1EnDbbuaumWYvEFbztx9NRupwTXTchK9bP', */}
  );
  const [nft, setNft] = useState(null);

  const fetchNft = async () => {
    const asset = await mx.nfts().findByMint({ mintAddress: new PublicKey(address) });
    setNft(asset);
  };

  

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Header />} />
      </Routes>
      <NftCard />
    </div>
  );
}

export default App;
