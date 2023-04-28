const express = require('express');
const redis = require('redis')
const app = express()
const redisClient = redis.createClient({url: process.env.REDIS_URL});

app.use(express.json())

async function consultaCacheRedis(req, res) {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();

  let chave = req.params.chave;

  try {
    let cacheResults = await redisClient.get(chave);
    res.status(200).send({
      valor: cacheResults
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Problemas na leitura");
  }
  await redisClient.quit();
}

async function gravaCacheRedis(req, res) {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();

  let chave = req.body.chave;
  let valor = req.body.valor;
  let ttl = req.body.ttl;

  try {
    let cacheResults = await redisClient.set(chave, valor, {EX : ttl, NX : true});
    res.status(200).send(cacheResults);
  } catch (error) {
    console.error(error);
    res.status(404).send("Problemas para gravar");
  }
  await redisClient.quit();
}

app.get("/consulta/:chave", consultaCacheRedis);

// Endpoint para inserção no cache
app.post('/grava', (req, res)=>{gravaCacheRedis(req,res)});


app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
})
