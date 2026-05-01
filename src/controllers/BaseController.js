export default class BaseController {

    // 200 OK
    success(res, data, message = "Success") {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    // 201 Created
    created(res, data, message = "Created successfully") {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    // 400 Bad Request
    badRequest(res, message = "Bad request") {
        return res.status(400).json({
            success: false,
            message
        });
    }

    // 404 Not Found
    notFound(res, message = "Not found") {
        return res.status(404).json({
            success: false,
            message
        });
    }

    // 500 Internal Server Error
    handleError(res, error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}