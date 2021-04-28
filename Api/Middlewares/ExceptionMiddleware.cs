using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next,
        IHostEnvironment env, ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
            _next = next;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex , ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var respnse = _env.IsDevelopment() 
                    ? new ApiException((int) HttpStatusCode.InternalServerError, ex.Message , ex.StackTrace.ToString()) 
                    : new ApiException((int) HttpStatusCode.InternalServerError);
                var options =  new JsonSerializerOptions
                {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};   
                var json = JsonSerializer.Serialize(respnse , options);
                await context.Response.WriteAsync(json);     
            }
        }
}
}