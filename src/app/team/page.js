"use client";
import React from 'react'
import teamdata from '../assets/teamdata.json';
import { UserButton, useUser } from '@clerk/nextjs';

function Team() {
   const {user, isLoaded} = useUser();
   let footballTeam = [];
   let name = "";
   if(isLoaded && user){
        const data = teamdata.users.find((userData) => userData.teamLead === user.fullName);
        footballTeam = data.footballTeam;
        name = data.teamLead;
    }
    
  return (
    <div>
        <p>Team</p>
        <p>{name}</p>
        <div>
        <p>{footballTeam}</p>
        {/* {footballTeam.map(player =>{
            <p>{player}</p>
        })} */}
        {/* {teamdata.users.map((team, index) => (
            <div key={index}>
                <p>User: {team.teamLead}</p>
                {team.footballTeam.map(player =>{
                    <div>
                        {player}
                    </div>
                })}
            </div>
            ))} */}
        </div>
    </div>
  )
}

export default Team