const paginationDto = (page: number, limit: number, count: number) => {
    return {
        page: +page,
        limit: +limit,
        totalCount: count,
        pageCount: Math.ceil(count / limit),
    }
};

export {
    paginationDto,
}
