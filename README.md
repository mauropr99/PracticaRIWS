# Práctica RI

### Mauro Paredes Romero (mauro.paredes) | Iván Janeiro Tato (ivan.janeiro.tato)

## Instalación

- Web crawling:

  - [Scrapy](https://docs.scrapy.org/) (_versión 2.5_)
  - [Python](https://www.python.org/) (_versión 3.6+_)

- Motor de búsqueda:

  - [Apache Solr](https://solr.apache.org/) (_versión 8.4.1_)

- Aplicación web:
  - [Angular](https://angular.io/) (_versión 13.1.0_)
  - [Node.js](https://nodejs.org/) (_versión 14.16.0_)

## Ejecución

1. Crawleamos los datos de los tops de películas y series de Filmaffinity. Para ello haremos uso del _spider_ llamado fa-top-spider:

```bash
$ cd scrapy
$ scrapy crawl fa-top-spider -o filmaffinity-data.json
```

2. Necesitaremos copiar la configuración de Solr en nuevo core que llamaremos "riws-filmaffinity".

   > De no llamarse del modo indicado o no haber arrancado Solr en el puerto 8983 por defecto, ninguna de las peticiones que hagamos desde la aplicación web funcionarán.

3. Arrancamos la aplicación web

```
$ cd riws-app
$ npm install
$ npm start
```
