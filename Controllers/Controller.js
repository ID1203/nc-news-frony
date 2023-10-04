
const { fetchTopics, getAllEndpoints, fetchArticlesById } = require("../Models/Models")

function getTopics(req, res, next){
    fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    }).catch((err) => {
        next(err)
    })
}


function getEndpoints(req, res, next) {
    const endpointsObject = getAllEndpoints()
    res.status(200).json(endpointsObject);
}

function getArticlesByID(req, res, next) {
    const { article_id } = req.params;
    fetchArticlesById(article_id)
    .then((article) => {
        if (article.length === 0) {
            const notFoundError = new Error("Article not found");
            notFoundError.name = "NotFoundError";
            throw notFoundError;
        }
        res.status(200).json(article)
    })
    .catch((err) => {
        next(err)
    })
    
}

module.exports = { getTopics, getEndpoints, getArticlesByID }
