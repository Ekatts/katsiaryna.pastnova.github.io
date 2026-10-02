using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace InformationalTheory.Services
{
    public class CalculationResult
    {
        public string Entropy { get; set; }
    }

    public class InformationEntropyCalc
    {
        public static CalculationResult CalculateEntropy(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return new CalculationResult { Entropy = "0" };
            }

            try
            {
                List<double> probabilities = text
                    .Split(',')
                    .Select(s => double.Parse(s.Trim(), CultureInfo.InvariantCulture))
                    .ToList();

                if (Math.Abs(probabilities.Sum() - 1.0) > 0.001)
                {
                    return new CalculationResult { Entropy = "the sum of probabilities is not equal to 1" };
                }

                double entropy = 0.0;
                foreach (var p in probabilities)
                {
                    if (p > 0)
                    {
                        entropy -= p * Math.Log2(p);
                    }
                }

                return new CalculationResult
                {
                    Entropy = Math.Round(entropy, 4).ToString(CultureInfo.InvariantCulture)
                };
            }
            catch
            {
                return new CalculationResult { Entropy = "data input error" };
            }
        }
    }
}