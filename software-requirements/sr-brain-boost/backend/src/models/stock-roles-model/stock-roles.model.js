'use strict';

module.exports = function (StockRoles) {

  StockRoles.getStockRolesXSubroles = (callback) => {
    let ds = StockRoles.dataSource
    let sql = 'select * from get_stock_rolesXsubroles()'
    ds.connector.execute(sql, (err, data) => {
      callback(null, data)
    })
  }

  StockRoles.remoteMethod('getStockRolesXSubroles', {
    http: { path: '/getRS', verb: 'get' },
    returns: { arg: 'result', type: 'object' },
  }
  )
};
