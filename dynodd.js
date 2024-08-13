 // Calculate dynamic probabilities
 function calculateProbabilities() {
    const totalDraws = Object.values(terrainCounts).reduce((a, b) => a + b, 0);
    const probabilities = {};

    terrains.forEach(terrain => {
        const count = terrainCounts[terrain];
        probabilities[terrain] = (totalDraws - count + 1) / (totalDraws + terrains.length);
    });

    return probabilities;
}

// Draw a terrain tile based on probabilities
function drawTerrain() {
    const probabilities = calculateProbabilities();
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const terrain of terrains) {
        cumulativeProbability += probabilities[terrain];
        if (random < cumulativeProbability) {
            terrainCounts[terrain]++;
            console.log("Selected terrain: " + terrain);
            return terrain;
        }
    }

    console.log("Fallback terrain selected.");
    return terrains[terrains.length - 1]; // Fallback
}