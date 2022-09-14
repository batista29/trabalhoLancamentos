const Express = require('express');

const router = Express.Router();

const LancamentosController = require("./controllers/LancamentosController");

router.get("/lancamentos/listarLancamentos", LancamentosController.listarLancamentos);
router.post("/lancamentos/cadastrarLancamentos", LancamentosController.cadastrarLancamentos);

module.exports = router;