# Práctica RI

### Mauro Paredes Romero (mauro.paredes) | Iván Janeiro Tato (ivan.janeiro.tato)

## Tecnologías

- Web crawling:

  - [Scrapy](https://docs.scrapy.org/) (_versión 2.5_)
  - [Python](https://www.python.org/) (_versión 3.6+_)

- Motor de búsqueda:

  - [Apache Solr](https://solr.apache.org/) (_versión 8.4.1_)

- Aplicación web:
  - [Angular](https://angular.io/) (_versión 13.1.0_)
  - [Node.js](https://nodejs.org/) (_versión 14.16.0_)

## Ejecución
 
1. Lanzar el ervicio de Solr

```bash
$ cd solr-8.4.1/bin
$ ./solr start
```

2. Lanzar la aplicación web

```
$ cd riws-app
$ npm install
$ npm start
```

## Otros aspectos

- Para crawlear los datos de los tops de películas y series de Filmaffinity. Para ello haremos uso del _spider_ llamado fa-top-spider. Pero antes de ello se necesitan los siguientes requisitos: 

1. Tener instaladas las librerías scrapy, urllib3 y pymongo de Python.
2. Tener una base de datos de [MongoDB](https://docs.mongodb.com/manual/installation/) corriendo en el puerto 27017 (por defecto).

```bash
$ cd scrapy/riws
$ scrapy crawl fa-top-spider -o filmaffinity-data.json
```

- Necesitaremos tener la configuración de Solr en un core que de debe llamar "riws-filmaffinity".

   > De no llamarse del modo indicado o no haber arrancado Solr en el puerto 8983 por defecto, ninguna de las peticiones que hagamos desde la aplicación web funcionarán.
   
- Para migrar los datos crawleados a Solr debemos ejecutar lo siguiente:

```bash
$ cd solr-8.4.1 
$ bin/post -c riws-filmaffinity example/filmaffinity-data/filmaffinity-data.json
```
Si lo que queremos es borrar los datos que ya existían en Solr antes de ejecutar la petición debemos ejecutar lanzar en el navegador la siguiente petición: 

  > http://localhost:8983/solr/riws-filmaffinity/update?stream.body=%3Cdelete%3E%3Cquery%3E*:*%3C/query%3E%3C/delete%3E&commit=true

- En caso de tener otra versión de Node instalada, podemos gestionar las versiones haciendo uso de [nvm](https://github.com/nvm-sh/nvm).
