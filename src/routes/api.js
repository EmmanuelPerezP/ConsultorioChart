import express from 'express';
var router = express.Router();

import Database from '../lib/db';

/* GET home page. */
router.get('/dictamenes-por-mes', async function(req, res, next) {

  let db = new Database();
  await db.open();
  let data = await db.dictamenesPorMes();
  await db.close();
  data = { data };
  console.log(data);
  res.json(data);

});

export default router;