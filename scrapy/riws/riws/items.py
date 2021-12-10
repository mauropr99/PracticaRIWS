# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from scrapy import Item, Field


class FilmaffinityItem(Item):
    ranking = Field()
    position = Field()
    title = Field()
    year = Field()
    director = Field()
    cast = Field()
    avg_rating = Field()
    rate_count = Field()
    poster = Field()
