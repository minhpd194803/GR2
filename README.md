# gr2

This was a small project for the course graduation research 2, inspired by the explorer atomscan.

## how to run the code

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

## frontend

the project was made using vuejs accompanied with a nuxtjs framework. Here, nuxtjs works as a navigator to guide the user through pages. 

This project presents a basic explorer for the chain cosmos, minor changes to this project could make it explore more chains if necessary. The work currently shows the latest blocks, latest transactions and top validators. upon clicking any block or transaction, the page transitions to their respective details. to navigate back home, there is a navbar above to indicate where the user is at.

## backend

The backend of this explorer was provided by coingecko and atomscans.

## future improvements

The navbar currently exist only to navigate back home, it cannot navigate anywhere else, this could be solved with a simple search engine to look for other transactions or blocks. 

The validators at the moment has no details and upon clicking does nothing at all. The validators detail page could be the next functional improvement.

Currently, the only chain that is incoperated is cosmos. To get more chains, the project only needs to have a few minor changes but time consuming effort to reach.

coinGecko provides alot of api and functional graphs which could be exploited to make the explorer more appealing to the eye, expecially the graphs.

Lastly, the website is a little bit clunky, it would be much better if more animations would slide things in.