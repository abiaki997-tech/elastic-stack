const express = require("express");
const router = express.Router();
const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const elasticClient = new Client({ node: 'http://localhost:9200' });

router.get("/", (req, res) => {
    res.redirect("http://localhost:/home");
});

router.post("/create-post", async (req, res) => {
    const result = await elasticClient.index({
      index: "posts",
      document: {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        body:req.body.body
      },
    });
    res.send(result);
});
router.get('/search-logs', async (req, res) => {
  const { q } = req.query;
console.log(q)
  try {
    const result = await elasticClient.search({
      index: 'posts',
      body: {
        query: {
          match: { message: q }
        }
      }
    });
    res.json(result.body.hits.hits);
  } catch (error) {
    console.error('Error searching queries in Elasticsearch:', error);
    res.status(500).send('Error searching queries');
  }
});

router.delete("/remove-post", async (req, res) => {
  const result = await elasticClient.delete({
    index: "posts",
    id: req.query.id,
  });

  res.json(result);
});
router.get("/search", async (req, res) => {
  const result = await elasticClient.search({
    index: "posts",
    query: { fuzzy: { title: req.query.query } },
  });

  res.json(result);
});
router.get("/posts", async (req, res) => {
  const result = await elasticClient.search({
    index: "posts",
    query: { match_all: {} },
  });

  res.send(result);
});
// ...
module.exports = router;
