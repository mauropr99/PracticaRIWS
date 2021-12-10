from urllib.parse import urlencode
from scrapy import Request, Spider
from riws.items import FilmaffinityItem


class FilmAffinitySpider(Spider):
    name = "fa-top-spider"
    rankings = ['ranking_fa_movies', 'ranking_fa_series']

    def start_requests(self):
        for ranking in self.rankings:
            page_size = 100
            headers = {'User-Agent': 'Scrapy spider',
                       'X-Requested-With': 'XMLHttpRequest',
                       'Host': 'www.filmaffinity.com',
                       'Origin': 'http://www.filmaffinity.com',
                       'Accept': '*/*',
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}

            for offset in range(0, 1000, page_size):
                yield Request('https://www.filmaffinity.com/es/ranking.php',
                              method='POST',
                              headers=headers,
                              body=urlencode(
                                  {'from': offset,
                                   'count': page_size,
                                   'rankingId': ranking,
                                   'chv': '0'}),
                              callback=self.parse)

    def parse(self, response):

        faItem = FilmaffinityItem()

        for movie in response.css('li ul'):
            faItem['title'] = movie.css('div.mc-title a::text').get()

            faItem['ranking'] = 'serie' if 'TV' in faItem['title'] else 'movie'

            position = movie.css('li.position::text').get()
            faItem['position'] = int(position)

            year = movie.css('div.mc-title::text').get().strip()[1:-1]
            faItem['year'] = int(year)

            faItem['director'] = movie.css(
                'div.mc-director div.credits a::text').getall()

            faItem['cast'] = movie.css(
                'div.mc-cast div.credits a::text').getall()

            avg_rat = movie.css('div.avg-rating::text').get()
            faItem['avg_rating'] = float(avg_rat.replace(',', '.'))

            rate_count = movie.css('div.rat-count::text').get()
            faItem['rate_count'] = int(rate_count.replace('.', ''))

            faItem['poster'] = movie.css(
                'div.mc-poster a img::attr(src)').get()

            yield faItem
