function generateSeatConfiguration(numRows: number, numCols: number) {
  if (
    typeof numRows !== 'number' ||
    typeof numCols !== 'number' ||
    numRows <= 0 ||
    numCols <= 0
  ) {
    return []; // Return an empty array for invalid input
  }

  const seatConfiguration = [];
  // Iterate through rows (A, B, C, ...)
  for (let i = 0; i < numRows; i++) {
    const rowLetter = String.fromCharCode(65 + i); // A = 65, B = 66, etc.
    // Iterate through columns (1, 2, 3, ...)
    for (let j = 1; j <= numCols; j++) {
      const seat = rowLetter + j;
      seatConfiguration.push(seat);
    }
  }
  return seatConfiguration;
}

function getAvailableSeats(
  numRows: number,
  numCols: number,
  takenSeats: string[],
) {
  const allSeats = generateSeatConfiguration(numRows, numCols);

  const availableSeats = [];
  for (const seat of allSeats) {
    if (!takenSeats.includes(seat)) {
      availableSeats.push(seat);
    }
  }
  return { allSeats, availableSeats };
}
