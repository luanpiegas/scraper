require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const url = 'https://luan.des.br'

axios(url)
    .then(res => {
        const html = res.data
        const $ = cheerio.load(html)
        let titles = [], urls = [], portfolioItems = []

        $('.info', html).each(function() {
            titles.push( { title: $(this).find('h2').text() } )
        })

        $('.card', html).each(function() {
            urls.push( { url: $(this).find('a').attr('href') } )
        })

        portfolioItems = titles.map((title, url) => Object.assign({}, title, urls[url]));

        console.log(portfolioItems)
    })

app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}`))