import expressRateLimit from "express-rate-limit";

export default expressRateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'O sistema recebeu muitas requisições, favor verificar vulnerabilidades em seu equipamento!' // message to send
});