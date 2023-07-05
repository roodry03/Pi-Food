const { Router } = require('express');
const { getDietsHandlers } = require('../handlers/dietsHandlers')
const dietsRouter = Router();

dietsRouter.get('/', getDietsHandlers)

module.exports = dietsRouter;