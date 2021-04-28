namespace Api.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            this.StatusCode = statusCode;
            this.Message = message ?? GetDefaultMessage(statusCode);

        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, you have made.",
                401 => "Authorized, you are not.",
                404 => "Resources was not found.",
                500 => "Errors are the path to the dark side.",
                _ => null
            };
        }
    }
}