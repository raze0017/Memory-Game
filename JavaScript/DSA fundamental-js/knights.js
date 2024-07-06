const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];
  
  function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
  
  function knightMoves(start, end) {
    const queue = [{ position: start, path: [start] }];
    const visited = new Set();
    visited.add(start.toString());
  
    while (queue.length > 0) {
      const { position, path } = queue.shift();
      const [currentX, currentY] = position;
  
      if (currentX === end[0] && currentY === end[1]) {
        return path;
      }
  
      for (let move of moves) {
        const [dx, dy] = move;
        const newX = currentX + dx;
        const newY = currentY + dy;
        const newPosition = [newX, newY];
  
        if (isValidPosition(newX, newY) && !visited.has(newPosition.toString())) {
          visited.add(newPosition.toString());
          queue.push({ position: newPosition, path: [...path, newPosition] });
        }
      }
    }
  }
  
  // Example usage:
  const start = [0, 0];
  const end = [3, 3];
  const path = knightMoves(start, end);
  
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach(step => console.log(step));
  