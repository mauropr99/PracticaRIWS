export class FilterQuery {
    title: string;
    position: number;
    yearStart: number
    yearEnd: number;
    directors: string[];
    cast: string[];
    minAvgRating: number;
    minRateCount: number;
    poster: string;
    varint: number;

    queryEmpezada: boolean = false;
    existeBusquedaRango: boolean = false;
    primerDirector: boolean = false;
    primerCast: boolean = false;
    primerWordTitle: boolean = false;

    titleField: string;
    positionField: string;
    yearField: string;
    directorsField: string;
    castField: string;
    minAvgRatingField: string;
    minRateCountField: string;

    finalString: string;

    constructor() {
        this.title = '';
        this.position = NaN;
        this.yearStart = 1916;
        this.yearEnd = 2021;
        this.directors = [];
        this.cast = [];
        this.minAvgRating = NaN;
        this.minRateCount = NaN;
        this.poster = '';

        this.titleField = 'title:';
        this.positionField = 'position:';
        this.yearField = 'year';
        this.directorsField = 'director:'
        this.castField = 'cast:';
        this.minAvgRatingField = 'avg_rating';
        this.minRateCountField = 'rate_count';

        this.finalString = '';
        this.varint = 0;

    }

    public crearQuery() {
        this.finalString = '';
        this.queryEmpezada = false;
        this.primerDirector = true;
        this.primerCast = true;
        this.primerWordTitle = true;

        if (this.title != '') {
            this.title.split(' ').forEach(word => {
                if (!this.primerWordTitle) {
                    this.finalString += ' AND '
                } else {
                    this.primerWordTitle = false
                }
                this.finalString += this.titleField + word.replace('.', '').replace(',', '').replace(':', '') + '*';
                console.log(this.finalString)
            })
            this.queryEmpezada = true;
        }

        if (!isNaN(this.position)) {
            this.comprobarQuery()
            this.finalString += this.positionField + this.position;
        }

        if (!isNaN(this.yearStart) && !isNaN(this.yearEnd)) {
            this.comprobarQuery()
            this.finalString += '{!frange l=' + this.yearStart + ' u=' + this.yearEnd + '}' + this.yearField;
        } else {
            if (isNaN(this.yearStart)) {
                this.yearStart = 1916;
            } else {
                this.yearEnd = 2021;
            }
            this.finalString += '{!frange l=' + this.yearStart + ' u=' + this.yearEnd + '}' + this.yearField;
        }

        if (this.directors.length != 0) {

            this.directors.forEach(director => {
                (director.split(' '))
                director.split(' ').forEach(director_word => {
                    if (director_word != '') {
                        if (!this.primerDirector) {
                            this.finalString += ' AND '
                        } else {
                            this.comprobarQuery()
                            this.primerDirector = false
                        }

                        this.finalString += this.directorsField + director_word + '*';
                    }
                })
            })
        }

        if (this.cast.length != 0) {

            this.cast.forEach(cast => {
                cast.split(' ').forEach(cast_word => {
                    if (cast_word != '') {
                        if (!this.primerCast) {
                            this.finalString += ' AND '
                        } else {
                            this.comprobarQuery()
                            this.primerCast = false
                        }

                        this.finalString += this.castField + cast_word + '*';
                    }
                })

            })
        }

        if (!isNaN(this.minAvgRating)) {
            this.comprobarQuery()
            this.finalString += '{!frange l=' + this.minAvgRating + '}' + this.minAvgRatingField;
        } /* else {
            this.minAvgRating = 0;
            this.finalString += '{!frange l=' + this.minAvgRating + '}' + this.minAvgRatingField;
        } */

        if (!isNaN(this.minRateCount)) {
            this.comprobarQuery()
            this.finalString += '{!frange l=' + this.minRateCount + '}' + this.minRateCountField;
        }/*  else {
            this.minRateCount = 0;
            this.finalString += '{!frange l=' + this.minRateCount + '}' + this.minRateCountField;
        } */

        this.finalString = 'ranking:* AND ' + this.finalString;

        return this.finalString.toString();

    }


    /* Comprueba si la query esta empezada, si lo está añade ' AND ' a la query.
        Sino, cambia el estado de la query a empezada.*/
    comprobarQuery() {
        if (this.queryEmpezada) {
            this.finalString += ' AND '
        } else {
            this.queryEmpezada = true;
        }
    }

}