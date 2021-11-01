/* 

Las funciones callback nunca serán llamadas ANTES de la terminación de la ejecución actual del bucle de eventos en JavaScript.
Las funciones callback añadidas con .then serán llamadas después del EXITO (resolve) o FRACASO(reject) de la operación


*/


//Promesas con Finally
const tarea = new Promise((resolve, reject) => {
    //Tarea sincrónica
    //como ejemplo la tarea Sí se resuelve:
    console.log("Inicio Promise...");
    setTimeout(()=>{resolve(true)}, 2000);
    //resolve(true);

});

tarea.then(res => {
    console.log('Tarea Resuelta: ' + res);
}, err => {
    console.log('Tarea Rechazada: ' + err);
}).finally(() => {
    console.log('Tarea Finalizada');
});