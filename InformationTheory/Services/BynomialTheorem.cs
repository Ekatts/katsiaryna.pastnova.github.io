using System;
using System.Text;

namespace InformationalTheory.Services
{
    public class BynomialTheorem
    {
        public string CreateStr(int Power = 2)
        {
            if (Power == 0)
                return "(a + b)<sup>0</sup> = 1";

            if (Power == 1)
                return "(a + b)<sup>1</sup> = a + b";

            StringBuilder bynomialString = new StringBuilder();
            bynomialString.Append($"(a + b)<sup>{Power}</sup> = ");
            bynomialString.Append($"a<sup>{Power}</sup> + ");

            long pwrFactorial = Factorial(Power); 

            for (int i = 1; i < Power; i++)
            {
                long coef = Combinations(pwrFactorial, i, Power); 
                bynomialString.Append(coef);

                int powerA = Power - i;
                if (powerA > 1)
                    bynomialString.Append($"a<sup>{powerA}</sup>");
                else if (powerA == 1)
                    bynomialString.Append("a");

                if (i > 1)
                    bynomialString.Append($"b<sup>{i}</sup>");
                else if (i == 1)
                    bynomialString.Append("b");

                bynomialString.Append(" + ");
            }

            bynomialString.Append($"b<sup>{Power}</sup>");

            return bynomialString.ToString();
        }

        public long Combinations(long pwrFact, int index, int pwr)
        {
            return pwrFact / (Factorial(index) * Factorial(pwr - index));
        }

        public long Factorial(int num)
        {
            long result = 1;
            for (int i = 2; i <= num; i++)
                result *= i;
            return result;
        }
    }
}