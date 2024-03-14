// pages/api/logTransaction.js
import fs from 'fs';
import path from 'path';

const transactionsFilePath = process.cwd()+ '/src/app/assets/transactions.json';
const teamDataPath = process.cwd() + '/src/app/assets/teamdata.json';
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { user, player, price } = req.body;
      const transaction = {
        user: user.fullName,
        playerName: player.Name,
        playerPosition: player.Position,
        playerClub: player.Club,
        playerNationality: player.Nationality,
        price: price,
        timestamp: new Date().toISOString()
      };
      const team = {
        teamLead: user.fullName,
        footballPlayers: []
      }
    // Read existing transactions from the file, if any
      let transactions = [];
      let teamdata = [];
      try {
        transactions = JSON.parse(fs.readFileSync(transactionsFilePath, 'utf8'));
        teamdata = JSON.parse(fs.readFileSync(teamDataPath, 'utf-8'));
      } catch (error) {
          console.error('Error reading transactions file:', error);
      }
      transactions.push(transaction);
      for(let team = 0; team<teamdata.length; team++){
        // if(teamdata[team].)
      }
      try {
        fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2));
        console.log('Transaction logged successfully.');
        res.status(200).json({ message: 'Transaction logged successfully.' });
      } catch (error) {
          console.error('Error writing transactions file:', error);
          res.status(500).json({ error: 'Failed to log transaction.' });
      }
      // Log the transaction data to a file or database
      // Example: Console log the transaction data
      console.log('Transaction logged:');
      console.log('User:', user.fullName);
      console.log('Player:', player.Name);
      console.log('Price:', price);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  