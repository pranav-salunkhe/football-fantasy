import React from 'react'
import { promises as fs } from 'fs';

async function AdminPage() {
    const file = await fs.readFile(process.cwd() + '/src/app/admin/fifa23.json', 'utf8');
    const data = JSON.parse(file);
  return (
    <div>
        <h1>AdminPage</h1>
        <div className='grid grid-cols-4 gap-4'>
            {data.map(player => (
            <div key={player.Name} class="max-w-sm mx-auto overflow-hidden h-56 w-56 border rounded-md border-white shadow-lg">
                {/* <img class="w-full" src="${player.image}" alt="${player.Name}" /> */}
                <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{player.Name}</div>
                <p class="text-gray-700 text-base">
                    Position: {player.Position}
                </p>
                <p class="text-gray-700 text-base">
                    Club: {player.Club}
                </p>
                <p class="text-gray-700 text-base">
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