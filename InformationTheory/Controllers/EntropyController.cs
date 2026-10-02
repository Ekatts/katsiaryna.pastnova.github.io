using Microsoft.AspNetCore.Mvc;
using InformationalTheory.Services;

namespace InformationalTheory.Controllers
{
    public class EntropyRequest
    {
        public string Text { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class EntropyController : ControllerBase
    {
        [HttpPost]
        public IActionResult Calculate([FromBody] EntropyRequest request)
        {
            CalculationResult result = InformationEntropyCalc.CalculateEntropy(request.Text);
            
            return Ok(result); 
        }
    }
}