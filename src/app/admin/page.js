import React from 'react'
import { promises as fs } from 'fs';
import playerData from './fifa23';
async function AdminPage() {
  return (
    <div>
        <h1>AdminPage</h1>
        <div className='grid grid-cols-4 gap-4'>
            {playerData.map(player => (
            <div key={player.Name} className="max-w-sm mx-auto overflow-hidden h-56 w-56 border rounded-md border-white shadow-lg">
                {/* <img class="w-full" src="${player.image}" alt="${player.Name}" /> */}
                <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{player.Name}</div>
                <p className="text-gray-700 text-base">
                    Position: {player.Position}
                </p>
                <p className="text-gray-700 text-base">
                    Club: {player.Club}
                </p>
                <p className="text-gray-700 text-base">
                    Nationality: {player.Nationality}
                </p>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default AdminPage