using System;
using System.Text;

namespace InformationalTheory.Services
{
    public class VernamService
    {
        public (string Ciphertext, string Key) Encrypt(string plaintext, int keyLength = 3)
        {
            string cleanText = plaintext.ToUpper();
            string key = GenerateRandomKey(keyLength);
            StringBuilder ciphertext = new StringBuilder();

            for (int i = 0; i < cleanText.Length; i++)
            {
                // A=1, B=2 ..., Z=26: positions 0 — 25
                int m = cleanText[i] - 'A';
                int k = key[i % key.Length] - 'A'; // % - in case default keyLength = 3 was used

                // mod 26
                int cipherVal = ((m + k) % 26);
                char cipherChar = (char)('A' + cipherVal);

                ciphertext.Append(cipherChar);
            }

            return (ciphertext.ToString(), key);
        }

        private string GenerateRandomKey(int length)
        {
            Random rnd = new Random();
            char[] keyChars = new char[length];
            for (int i = 0; i < length; i++)
            {
                keyChars[i] = (char)('A' + rnd.Next(0, 26));
            }
            return new string(keyChars);
        }
    }
}