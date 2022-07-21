/* eslint-disable no-console */
const Sequelize = require('sequelize');
const { stock, stockVariation } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const variationStock = async () => {
  // Cria variavel para colocar situacao da funcao pois o forEach nao retorna nada
  // let functionSituation;

  // Encontra todas as ações
  const stocks = await stock.findAll();

  // Passa por todas as ações
  const resultUpdateStocks = stocks.every(async ({ dataValues: { value, stockId } }) => {
    let oneForUpTwoForDown = 2;
    let newPrice;

    // Número flutuante aleatório de 0 a 4 que determinará qual a porcentagem a ser calculada
    const percentage = parseFloat((Math.random() * 4).toFixed(2));

    // Número inteiro aleatório de 0 a 99 que determinará se soma ou subtrai
    const addOrSubtract = Math.floor(Math.random() * 100);

    // Valor total a ser somado ou subtraido a partir da porcentagem e do valor atual da ação
    const valueToBeCalculed = ((value * percentage) / 100);

    // Subtrai valor total do valor da ação

    // Se o numero aleatorio gerador for maior que 50 o valor é somado se nao é subtraido
    if (addOrSubtract > 49) {
      newPrice = value + valueToBeCalculed;
      oneForUpTwoForDown = 1;
    } else newPrice = value - valueToBeCalculed;

    const transaction = await sequelize.transaction(async (t) => {
      // Atualiza preço da ação na tabela
      const updateStock = await stock.update(
        { value: newPrice },
        { where: { stockId } },
        { transaction: t },
      );

      // Verifica se ação já possui registro na tabela
      const stockAlreadyHasVariation = await stockVariation.findOne({ where: { stockId } });
      if (stockAlreadyHasVariation) {
        // Se tiver, apenas altera os valores
        const updateStockVariation = await stockVariation.update(
          {
            typeId: oneForUpTwoForDown,
            percentage,
            oldPrice: value,
            newPrice: parseFloat(newPrice.toFixed(2)),
            high: parseFloat(newPrice.toFixed(2)) > stockAlreadyHasVariation.dataValues.high
              ? parseFloat(newPrice.toFixed(2)) : stockAlreadyHasVariation.dataValues.high,
            low: parseFloat(newPrice.toFixed(2)) < stockAlreadyHasVariation.dataValues.low
              ? parseFloat(newPrice.toFixed(2)) : stockAlreadyHasVariation.dataValues.low,
            date: new Date(),
          },
          {
            where: { stockId },
          },
          { transaction: t },
        );

        if (updateStock && updateStockVariation) return true;
        return false;
      }

      // Se não tiver registro, cria novo registro com os valores
      const createVariationRegister = await stockVariation.create(
        {
          stockId,
          typeId: oneForUpTwoForDown,
          percentage,
          oldPrice: value,
          newPrice: parseFloat(newPrice.toFixed(2)),
          high: parseFloat(newPrice.toFixed(2)),
          low: parseFloat(newPrice.toFixed(2)),
          date: new Date(),
        },
        { transaction: t },
      );

      if (updateStock && createVariationRegister) return true;
      return false;
    });

    if (transaction) return false;
    return false;
  });

  if (resultUpdateStocks) return 'Stocks price updated successfully';

  return 'There was an error updating stocks price';
};

module.exports = variationStock;
