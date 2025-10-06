"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBodyData = void 0;
const parseBodyData = (req, res, next) => {
    if (req.body.bodyData) {
        try {
            req.body = JSON.parse(req.body.bodyData);
            console.log("jkhdsfj: ", req.body);
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON format in bodyData',
            });
        }
    }
    if (req.body.price)
        req.body.price = Number(req.body.price);
    if (req.body.stock)
        req.body.stock = Number(req.body.stock);
    next();
};
exports.parseBodyData = parseBodyData;
