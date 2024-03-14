import React from 'react'
import { promises as fs } from 'fs';
import playerData from '../assets/fifa23';
import transactions from '../assets/transactions.json';
async function AdminPage() {
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
            </div>
            ))}
        </div>
    </div>
  )
}

export default AdminPage