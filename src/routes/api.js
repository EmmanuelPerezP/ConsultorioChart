import express from 'express';
var router = express.Router();

import Database from '../lib/db';

/* GET home page. */
router.get('/dictamenes-por-mes/:year', async function(req, res, next) {

  let db = new Database();
  await db.open();
  let data = await db.dictamenesPorMes(req.params.year);
  await db.close();
  data = { data };
  res.json(data);

});

export default router;