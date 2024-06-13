"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static response(status, message, data, success = true) {
        return {
            status,
            message,
            data,
            success
        };
    }
    static errorResponse(status, message, error, success = false) {
        return {
            status,
            message,
            error,
            success
        };
    }
    static paginateResponse(status, message, data, total, currentPage, limit, success = true) {
        let pages = Math.ceil(total / limit);
        let current = parseInt(currentPage);
        return {
            status,
            message,
            totalDocs: total,
            docs: data,
            limit,
            page: current,
            nextPage: current < pages,
            prevPage: current > 1,
            totalPages: pages,
            pagingCounter: null,
            meta: 'paginator',
            success,
        };
    }
}
exports.ApiResponse = ApiResponse;
