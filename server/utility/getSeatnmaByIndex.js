function getSeatByIndex(id) {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    const seatCounts = [18, 24, 24, 24, 24, 24, 24, 20, 20, 20, 20, 20, 20, 20, 20, 16];

    let currentId = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const count = seatCounts[i];

        if (id < currentId + count) {
            const seatNumber = id - currentId + 1;
            return `${row}${seatNumber}`;
        }

        currentId += count;
    }

    return null;
}

export default getSeatByIndex