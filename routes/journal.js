const express = require('express');
const router = express.Router();

// Mock database for trades
let trades = [];

// POST /add-trade - Log completed trades
router.post('/add-trade', (req, res) => {
    const { entryPrice, exitPrice, profitLoss, strategy } = req.body;
    const trade = { id: trades.length + 1, entryPrice, exitPrice, profitLoss, strategy, date: new Date() };
    trades.push(trade);
    res.status(201).json(trade);
});

// GET /trades - Get trades with pagination and filtering
router.get('/trades', (req, res) => {
    const { page = 1, limit = 10, date, symbol, status } = req.query;
    let filteredTrades = trades;
    if (date) {
        filteredTrades = filteredTrades.filter(trade => trade.date.toISOString().split('T')[0] === date);
    }
    if (symbol) {
        filteredTrades = filteredTrades.filter(trade => trade.symbol === symbol);
    }
    if (status) {
        filteredTrades = filteredTrades.filter(trade => trade.status === status);
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    res.json({ total: filteredTrades.length, trades: filteredTrades.slice(startIndex, endIndex) });
});

// PUT /trade/:tradeId - Edit trade entries
router.put('/trade/:tradeId', (req, res) => {
    const { tradeId } = req.params;
    const index = trades.findIndex(trade => trade.id === parseInt(tradeId));
    if (index !== -1) {
        const updatedTrade = { ...trades[index], ...req.body };
        trades[index] = updatedTrade;
        res.json(updatedTrade);
    } else {
        res.status(404).send('Trade not found');
    }
});

// DELETE /trade/:tradeId - Delete trades
router.delete('/trade/:tradeId', (req, res) => {
    const { tradeId } = req.params;
    trades = trades.filter(trade => trade.id !== parseInt(tradeId));
    res.status(204).send();
});

// GET /stats - Calculate trading statistics
router.get('/stats', (req, res) => {
    const totalTrades = trades.length;
    const totalProfitLoss = trades.reduce((acc, trade) => acc + trade.profitLoss, 0);
    res.json({ totalTrades, totalProfitLoss });
});

// GET /analysis - Performance analysis by strategy/symbol
router.get('/analysis', (req, res) => {
    const { strategy, symbol } = req.query;
    const filteredTrades = trades.filter(trade =>
        (!strategy || trade.strategy === strategy) &&
        (!symbol || trade.symbol === symbol)
    );
    res.json(filteredTrades);
});

module.exports = router;