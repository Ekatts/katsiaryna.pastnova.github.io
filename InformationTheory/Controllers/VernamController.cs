using Microsoft.AspNetCore.Mvc;
using InformationalTheory.Services;

namespace InformationalTheory.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VernamController : ControllerBase
    {
        private readonly VernamService _vernamService = new VernamService();

        public class VernamRequest
        {
            public string Plaintext { get; set; }
            public int KeyLength { get; set; }
        }

        [HttpPost]
        public IActionResult Encrypt([FromBody] VernamRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Plaintext))
            {
                return BadRequest(new { error = "Text cannot be empty" });
            }

            var (ciphertext, key) = _vernamService.Encrypt(request.Plaintext, request.KeyLength);

            return Ok(new { 
                ciphertext = ciphertext, 
                usedKey = key 
            });
        }
    }
}