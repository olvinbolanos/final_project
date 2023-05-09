import React, { useState } from 'react';
import { Metaplex } from '@metaplex-foundation/js';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import '../App.css'

const connection = new Connection(clusterApiUrl('devnet'));
const mx = Metaplex.make(connection);

export default function Mint() {
	const [address, setAddress] = useState(
		'0xd0ff87cc052b35241d11127b8687d727b7444d3e',
		{/*'3ijFZcJKmp1EnDbbuaumWYvEFbztx9NRupwTXTchK9bP'*/ }
	);
	const [nft, setNft] = useState(null);

	const fetchNft = async () => {
		const asset = await mx.nfts().findByMint({ mintAddress: new PublicKey(address) });

		setNft(asset);
	};

	return (
		<div>
		<div className="nftForm">
			<input
				type="text"
				value={address}
				onChange={(event) => setAddress(event.target.value)}
			/>
			<button onClick={fetchNft}>Fetch</button>
		</div>
		{nft && (
			<div className="nftPreview">
				<h1>{nft.name}</h1>
				<img
					src={nft.json.image}
					alt="The downloaded illustration of the provided NFT address."
				/>
			</div>
		)}
		</div>
	);
}
