import React from 'react';

function Plinko() {
  return (

      <div>
        <canvas id="plinkoCanvas" width="800" height="800"></canvas>
        <script type="module" src="./main.js"></script>
      </div>

  );
}

export default Plinko;