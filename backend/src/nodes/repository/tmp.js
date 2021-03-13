const f = (a, b, c, d)  => `http://localhost:3000/routes?startNodeLat=${a}&startNodeLong=${b}&endNodeLat=${c}&endNodeLong=${d}`

console.log(f(43.73429996534598, 7.418578619024726,  43.73207893116464, 7.421432489288755))