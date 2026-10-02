using Microsoft.AspNetCore.Mvc;
using InformationalTheory.Services;

namespace InformationalTheory.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TextGeneratorController : ControllerBase
    {
        private readonly MarkovWordGenerator _generator = new MarkovWordGenerator();

        public class GenerateRequest
        {
            public int Length { get; set; }
        }

        [HttpPost]
        public IActionResult Generate([FromBody] GenerateRequest request)
        {
            if (request == null || request.Length <= 0)
            {
                return BadRequest(new { error = "Please input correct length (> 0)" });
            }

            string resultText = _generator.GenerateText(request.Length);

            return Ok(new { generatedText = resultText });
        }
    }
}