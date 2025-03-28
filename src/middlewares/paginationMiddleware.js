export const paginationMiddleware = (req, res, next) => {
    req.paginate = (data) => {
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit) || 10;

        if (offset < 0) offset = 0;
        if (limit < 1) limit = 10;

        const paginatedData = data.slice(offset, offset + limit);
        return paginatedData
    };
    next();
};