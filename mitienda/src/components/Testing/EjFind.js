const array1 = [
    {
        "id": 1,
        "clasificacion": "accesorio",
        "tipo": "casual",
        "title": "billetera",
        "marca": "tommy-hilfiger",
        "genero": "hombre",
        "color": "negro",
        "precio": 182,
        "stock": 18,
        "pictureUrl": "images/accesorio_casual_billetera_tommy-hilfiger_hombre_negro_cuero.jpg"
    },
    {
        "id": 2,
        "clasificacion": "accesorio",
        "tipo": "casual",
        "title": "gafas",
        "marca": "timberland",
        "genero": "hombre",
        "color": "negro",
        "precio": 262,
        "stock": 11,
        "pictureUrl": "images/accesorio_casual_gafas_timberland_hombre_negro.jpg"
    },
    {
        "id": 3,
        "clasificacion": "accesorio",
        "tipo": "casual",
        "title": "reloj",
        "marca": "tommy-hilfiger",
        "genero": "hombre",
        "color": "azul",
        "precio": 173,
        "stock": 9,
        "pictureUrl": "images/accesorio_casual_reloj_tommy-hilfiger_hombre_azul.jpg"
    },
    {
        "id": 4,
        "clasificacion": "accesorio",
        "tipo": "casual",
        "title": "reloj",
        "marca": "tommy-hilfiger",
        "genero": "hombre",
        "color": "negro",
        "precio": 155,
        "stock": 11,
        "pictureUrl": "images/accesorio_casual_reloj_tommy-hilfiger_hombre_negro.jpg"
    },
    {
        "id": 5,
        "clasificacion": "accesorio",
        "tipo": "casual",
        "title": "reloj-pro",
        "marca": "tommy-hilfiger",
        "genero": "hombre",
        "color": "negro",
        "precio": 430,
        "stock": 9,
        "pictureUrl": "images/accesorio_casual_reloj-pro_tommy-hilfiger_hombre_negro.jpg"
    },
    {
        "id": 6,
        "clasificacion": "accesorio",
        "tipo": "deporte",
        "title": "balon",
        "marca": "nike",
        "genero": "unisex",
        "color": "verde",
        "precio": 219,
        "stock": 17,
        "pictureUrl": "images/accesorio_deporte_balon_nike_unisex_verde.jpg"
    },
    {
        "id": 7,
        "clasificacion": "accesorio",
        "tipo": "deporte",
        "title": "gafas",
        "marca": "oakley",
        "genero": "hombre",
        "color": "negro",
        "precio": 96,
        "stock": 11,
        "pictureUrl": "images/accesorio_deporte_gafas_oakley_hombre_negro_azul.jpg"
    },
    {
        "id": 8,
        "clasificacion": "accesorio",
        "tipo": "deporte",
        "title": "gafas",
        "marca": "oakley",
        "genero": "hombre",
        "color": "negro",
        "precio": 326,
        "stock": 9,
        "pictureUrl": "images/accesorio_deporte_gafas_oakley_hombre_negro_naranja.jpg"
    },
    {
        "id": 9,
        "clasificacion": "accesorio",
        "tipo": "deporte",
        "title": "gorra",
        "marca": "nike",
        "genero": "hombre",
        "color": "blanco",
        "precio": 415,
        "stock": 14,
        "pictureUrl": "images/accesorio_deporte_gorra_nike_hombre_blanco.jpg"
    },
    {
        "id": 10,
        "clasificacion": "accesorio",
        "tipo": "deporte",
        "title": "gorra",
        "marca": "oakley",
        "genero": "hombre",
        "color": "gris",
        "precio": 306,
        "stock": 6,
        "pictureUrl": "images/accesorio_deporte_gorra_oakley_hombre_gris.jpg"
    },
    {
        "id": 11,
        "clasificacion": "accesorio",
        "tipo": "deporte",
        "title": "gorra",
        "marca": "oakley",
        "genero": "hombre",
        "color": "negro",
        "precio": 254,
        "stock": 17,
        "pictureUrl": "images/accesorio_deporte_gorra_oakley_hombre_negro.jpg"
    },
    {
        "id": 12,
        "clasificacion": "accesorio",
        "tipo": "trekking",
        "title": "bandana",
        "marca": "the-north-face",
        "genero": "hombre",
        "color": "rojo",
        "precio": 296,
        "stock": 6,
        "pictureUrl": "images/accesorio_trekking_bandana_the-north-face_hombre_rojo.jpg"
    }
];
const found = array1.find(e => e.id == 10);

console.log(found);
// expected output: 12
