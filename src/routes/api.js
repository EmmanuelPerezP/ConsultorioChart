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

/* GET Dias de la semana */
router.get('/dictamenes-por-dia-semana/', async function(req, res, next) {

  let db = new Database();
  await db.open();
  let data = await db.dictamenesPorDiaSemana();
  await db.close();
  data = { data };
  res.json(data);

});

/* GET Dias del Mes */
router.get('/dictamenes-por-dia-mes/', async function(req, res, next) {

  let db = new Database();
  await db.open();
  let data = await db.dictamenesPorDiaMes();
  await db.close();
  data = { data };
  res.json(data);

});




export default router;