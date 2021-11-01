let MisTragosPreferidos = [
    { nombre: "Malbec", capacidad: 500 },
    { nombre: "Cabernet", capacidad: 700 },
    { nombre: "Syrah", capacidad: 1000 },
    { nombre: "Fernet", capacidad: 800 },
    { nombre: "Champagne", capacidad: 400 },
];
console.log(MisTragosPreferidos);
// QUIERO RECORRER EL ARRAY Y QUE ME DEVUELVA LOS ITEMS QUE CUMPLAN LA SIGUIENTE CONDICION 
let MisTragosGrandes = MisTragosPreferidos.filter((e) => e.capacidad > 500);
console.log(MisTragosGrandes);
// QUIERO RESTARLE 100 A CADA UNO DE LOS ITEMS EN SU ATRIBUTO CAPACIDAD
let MisTragosYaProbados = MisTragosPreferidos.map((e) => e.capacidad - 100);
// NOS DEVUELVE UN ARREGLO DE LOS VALORES NATIVOS MODIFICADOS
console.log(MisTragosYaProbados);
// SI QUIERO QUE ME DEVUELVA EL ARRAY CON LOS ML RESTADOS
let MisTragosYaProbados2 = MisTragosPreferidos.map((e) => {
    e.capacidad -= 100; // LE RESTAMOS 100 A CADA ELEMENTO
    return e;
});
// QUIERO SABER EL TOTAL DE MILILITROS QUE TENGO
let MisTragosEnMililitros = MisTragosPreferidos.reduce(
    (sumamililitros, proximotrago) => sumamililitros + proximotrago.capacidad,
    0
); // TRABAJA DE IZQUIERA A DERECHA , LE DAMOS VALOR INICIAL 0
console.log(MisTragosEnMililitros); // REDUCE DEVUELVE 1 SÓLO VALOR