let UserRouter  = require ('./UserRouter');
let AuthRouter  = require('./AuthRouter');
let BidRouter = require('./BidRouter');
let AuctionRouter = require('./AuctionRouter')


class Routes {
  static init(app) {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/bids', BidRouter);
    app.use('/auctions', AuctionRouter);
  }
}

module.exports = Routes;
