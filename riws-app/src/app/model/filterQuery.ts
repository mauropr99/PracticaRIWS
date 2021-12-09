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

    queryEmpezada: boolean = false;
    existeBusquedaRango: boolean = false;
    primerDirector: boolean = false;
    primerCast: boolean = false;

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

    }

    public crearQuery() {
        this.finalString = '';
        this.queryEmpezada = false;
        this.primerDirector = true;
        this.primerCast = true;

        if (this.title != undefined && this.title != '') {
            this.finalString += this.titleField + '*' + this.title + '*';
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

        if (this.directors.length != 0 && this.directors[0] != '') {
            console.log(this.directors)
            this.comprobarQuery()
            if (this.directors.length > 1) {
                this.finalString += '( '
            }

            this.directors.forEach(director => {
                if (!this.primerDirector) {
                    this.finalString += ' AND '
                } else {
                    this.primerDirector = false
                }
                this.finalString += this.directorsField + '*' + director.replace(' ', '\\ ') + '*';
            })

            if (this.directors.length > 1) {
                this.finalString += ' )'
            }
        }

        if (this.cast.length != 0) {
            this.comprobarQuery()
            if (this.cast.length > 1) {
                this.finalString += '( '
            }

            this.cast.forEach(cast => {
                if (!this.primerCast) {
                    this.finalString += ' AND '
                } else {
                    this.primerCast = false
                }
                this.finalString += this.castField + '*' + cast.replace(' ', '\\ ') + '*';
            })

            if (this.cast.length > 1) {
                this.finalString += ' )'
            }
        }

        if (!isNaN(this.minAvgRating)) {
            this.comprobarQuery()
            this.finalString += '{!frange l=' + this.minAvgRating + '}' + this.minAvgRatingField;
        } else {
            this.minAvgRating = 0;
            this.finalString += '{!frange l=' + this.minAvgRating + '}' + this.minAvgRatingField;
        }

        if (!isNaN(this.minRateCount)) {
            this.comprobarQuery()
            this.finalString += '{!frange l=' + this.minRateCount + '}' + this.minRateCountField;
        } else {
            this.minRateCount = 0;
            this.finalString += '{!frange l=' + this.minRateCount + '}' + this.minRateCountField;
        }

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