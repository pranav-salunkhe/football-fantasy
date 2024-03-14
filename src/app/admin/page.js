"use client";
import React from 'react'
import playerData from '../assets/fifa23';
import transactions from '../assets/transactions.json';
// import { UserButton, useUser } from '@clerk/nextjs';

async function AdminPage() {
//   const {user, isLoaded} = useUser();
  const handleAccept = async (user, playerName, price) => {
        try {
        const response = await fetch('/api/updateteam', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user, player: playerName, action: 'accept', price: price}),
        });

        if (response.ok) {
            console.log('Transaction accepted');
            // Optionally, you can update the UI or state to reflect the accepted transaction
        } else {
            console.error('Failed to accept transaction:', response.statusText);
        }
        } catch (error) {
        console.error('Failed to accept transaction:', error);
        }
    }
  return (
    <div>
        <h1>AdminPage</h1>
        <div className='grid grid-cols-4 gap-4'>
            {transactions.map((transaction, index) => (
            <div key={index}>
                <p>User: {transaction.user}</p>
                <p>Player Name: {transaction.playerName}</p>
                <p>Player Position: {transaction.playerPosition}</p>
                <p>Player Club: {transaction.playerClub}</p>
                <p>Player Nationality: {transaction.playerNationality}</p>
                <p>Price: {transaction.price}</p>
                <p>Timestamp: {transaction.timestamp}</p>
                <button onClick={() => handleAccept(transaction.user, transaction.playerName, transaction.price)}>Accept</button>
            </div>
            ))}
        </div>
    </div>
  )
}

export default AdminPage