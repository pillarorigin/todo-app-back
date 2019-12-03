module.exports = asyncFn => {
    //return async () => {} : 리턴값으로 async 함수를 내보내
    return async (req, res, next) => {
        try {
            console.log('wrapper 접근!')
            //전달받은 asyncFn(router.get에있는 async)에 3가지 인자를 받아. 
            return await asyncFn(req, res, next);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'unknown' });
            return next();
        }
    }
};