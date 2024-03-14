"use client";
import React, {useState, useRef} from 'react'
import fifa23 from '../assets/fifa23'
import playerData from '../assets/fifa23'
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

function DashbboardPage() {
  const {user, isLoaded} = useUser();
  const [initialAmount, setInitialAmount] = useState(1000000);
      // Use useRef to create a ref that captures the current player and price values
  const playerRef = useRef(null);
  const priceRef = useRef('');
  const currentPlayer = playerRef.current;
  const currentPrice = priceRef.current;
  
  const handleNegotiate = async (player, price) =>{
    if(isLoaded && user && currentPlayer){
      console.log(user.fullName);
      console.log(currentPlayer.Name); // Log the current player
      console.log(currentPrice);
    }

    setOpen(false);
    setSelectedPlayerIndex(null);
    console.log(price);
    try {
      const response = await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, player: currentPlayer, price: currentPrice })
      });
      if (response.ok) {
        console.log('Transaction logged successfully.');
      } else {
        console.error('Failed to log transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to log transaction:', error);
    }
  }
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  
  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className=''>DashbboardPage</p>
        <p><Link href='/team'>Team</Link></p>
        <p>Amount: {initialAmount}</p>
      </div>
      <div>
      <p>Market Place</p>
      <div className='grid grid-cols-5 gap-8'>
      {playerData.slice(10).map((player, index) => (
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
            <button onClick={()=>{setOpen(true); setSelectedPlayerIndex(index); playerRef.current = player; priceRef.current = price; }}>Negotiate</button>
            {open && (
                    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
                        <div className="relative mx-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl dabg-gray-900 sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full dabg-blue-400 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-600 datext-gray-100 bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h2 className="text-lg font-medium leading-6 text-gray-900 datext-gray-300">
                                            Your proposed value:
                                        </h2>
                                        <input
                                            type="number"
                                            className='text-black'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="Enter price"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() => {setOpen(false); handleNegotiate(player, price);}}
                                    className="px-4 py-2 text-black border border-blue-500 rounded-md select-none dark:hover:text-gray-50  hover:text-gray-100 focus:outline-none focus:ring-2 dark:focus:ring-0 focus:ring-offset-2 dark:focus:ring-offset-0  focus:ring-blue-600 hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 text-black border border-blue-500 rounded-md select-none dark:hover:text-gray-50  hover:text-gray-100 focus:outline-none focus:ring-2 dark:focus:ring-0 focus:ring-offset-2 dark:focus:ring-offset-0  focus:ring-blue-600 hover:bg-blue-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
          </div>
        </div>
      ))}

      </div>
      </div>
    </div>
  )
}

export default DashbboardPage