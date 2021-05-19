using Api.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "this is a secret";
        }

        [HttpGet("not-found")]
        public ActionResult GetNotFoundRequest()
        {
            var thingToReturn = _context.Products.Find(-1);
            if (thingToReturn == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(-1);
            var thingToReturn = thing.ToString();
            return Ok();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("bad-request/{id}")]
        public ActionResult GetBadRequest(int id)
        {
            return Ok();
        }
    }
}