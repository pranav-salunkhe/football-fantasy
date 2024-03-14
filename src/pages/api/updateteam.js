import fs from 'fs';
import path from 'path';

const teamDataFilePath = process.cwd() + '/src/app/assets/teamdata.json';

function isPlayerInTeam(team, player) {
    for(var i = 0; i<team.length; i++){
        if(team[i] == player)
            return true;
    }
    return false;
}
const BALANCE = 100000;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { user, player, action, price } = req.body;

    try {
      // Read the existing team data from the file
      let teamData = JSON.parse(fs.readFileSync(teamDataFilePath, 'utf8'));

      // Find the user's team data
      var userTeam = teamData.users.find((userData) => userData.teamLead === user);

      if (!userTeam) {
        userTeam = { teamLead: user, footballTeam: [], balance: BALANCE };
        teamData.users.push(userTeam);
      }

      // Update the user's football team based on the action (accept or reject)
      if (action === 'accept') {
        if(!isPlayerInTeam(userTeam.footballTeam, player)){
            userTeam.footballTeam.push(player);
            userTeam.balance -= price;
        }
      }
      // Optionally handle rejection logic here if needed

      // Write the updated team data back to the file
      fs.writeFileSync(teamDataFilePath, JSON.stringify(teamData, null, 2));

      return res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
      console.error('Error updating team:', error);
      return res.status(500).json({ error: 'Failed to update team' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
