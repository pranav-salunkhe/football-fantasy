// CSVParser.js
import fs from 'fs';
import csv from 'csv-parser';

// Define the function to parse CSV file
export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];

    // Read the CSV file and parse its contents
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Process each row
        data.push(row);
      })
      .on('end', () => {
        // CSV parsing is complete
        resolve(data);
      })
      .on('error', (error) => {
        // Error handling
        reject(error);
      });
  });
}

// Define the file path
