using System;
using System.Collections.Generic;

namespace InformationalTheory.Services
{
    public class MarkovWordGenerator
    {
        private static readonly Random _random = new Random();

        // top-tier 100 words
        public static readonly string[] Vocabulary = new string[]
        {
            "THE", "BE", "TO", "OF", "AND", "A", "IN", "THAT", "HAVE", "I",
            "IT", "FOR", "NOT", "ON", "WITH", "HE", "AS", "YOU", "DO", "AT",
            "THIS", "BUT", "HIS", "BY", "FROM", "THEY", "WE", "SAY", "HER", "SHE",
            "OR", "AN", "WILL", "MY", "ONE", "ALL", "WOULD", "THERE", "THEIR", "WHAT",
            "SO", "UP", "OUT", "IF", "ABOUT", "WHO", "GET", "WHICH", "GO", "ME",
            "WHEN", "MAKE", "CAN", "LIKE", "TIME", "NO", "JUST", "HIM", "KNOW", "TAKE",
            "PEOPLE", "INTO", "YEAR", "YOUR", "GOOD", "SOME", "COULD", "THEM", "SEE", "OTHER",
            "THAN", "THEN", "NOW", "LOOK", "ONLY", "COME", "ITS", "OVER", "THINK", "ALSO",
            "BACK", "AFTER", "USE", "TWO", "HOW", "OUR", "WORK", "FIRST", "WELL", "WAY",
            "EVEN", "NEW", "WANT", "BECAUSE", "ANY", "THESE", "GIVE", "DAY", "MOST", "US"
        };

        private static readonly double[,] TransitionMatrix = InitializeMatrix(100);

        private static double[,] InitializeMatrix(int size)
        {
            double[,] matrix = new double[size, size];
            Random rnd = new Random(42);

            for (int i = 0; i < size; i++)
            {
                double rowSum = 0;
                for (int j = 0; j < size; j++)
                {
                    double weight = rnd.NextDouble();
                    if (j < 10) weight *= 2.5; // frequent article adjustments
                    
                    matrix[i, j] = weight;
                    rowSum += weight;
                }

                for (int j = 0; j < size; j++)
                {
                    matrix[i, j] /= rowSum;
                }
            }
            return matrix;
        }

        public string GenerateText(int length = 20)
        {
            // length restrictions
            if (length <= 0) length = 20;
            if (length > 1000) length = 1000;

            int totalWords = Vocabulary.Length;
            
            // absolutely random first word choice 
            int currentIndex = _random.Next(0, totalWords);

            List<string> result = new List<string> { Vocabulary[currentIndex] };

            for (int step = 1; step < length; step++)
            {
                double r = _random.NextDouble();
                double cumulativeSum = 0.0;
                int nextIndex = totalWords - 1;

                for (int j = 0; j < totalWords; j++)
                {
                    cumulativeSum += TransitionMatrix[currentIndex, j];
                    if (r <= cumulativeSum)
                    {
                        nextIndex = j;
                        break;
                    }
                }

                result.Add(Vocabulary[nextIndex]);
                currentIndex = nextIndex;
            }

            return string.Join(" ", result);
        }
    }
}