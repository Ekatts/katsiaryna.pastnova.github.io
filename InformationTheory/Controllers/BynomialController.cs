using Microsoft.AspNetCore.Mvc;
using InformationalTheory.Services;

namespace InformationalTheory.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BynomialController : ControllerBase
    {
        private readonly BynomialTheorem _bynomialTheorem = new BynomialTheorem();

        public class BynomialRequest
        {
            public int nOrder { get; set; }
        }

        [HttpPost]
        public IActionResult CreateStr([FromBody] BynomialRequest request)
        {
            if (request == null || request.nOrder < 0 || request.nOrder > 20)
            {
                return BadRequest(new { error = "Invalid input" });
            }

            var bynomialStr = _bynomialTheorem.CreateStr(request.nOrder);

            return Ok(new { 
                resultStr = bynomialStr
            });
        }
    }
}