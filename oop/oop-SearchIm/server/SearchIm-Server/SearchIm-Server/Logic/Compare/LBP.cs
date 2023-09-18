using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace SearchIm_Server.Logic.Compare
{
    public class LBP
    {
<<<<<<< HEAD
        /*public List<int> LBPCalculator(Bitmap bitmap)
=======
        public static int BinarytoDecimal(String binary)
>>>>>>> 104e3a9cea0c2dab05d34b2e908ed6540d603780
        {
            int suma=0;
            int cont = 0;
            for(int i=binary.Length-1; i>=0; i--)
            {
                int number = Convert.ToInt32(binary[i])-48;
                suma = suma + (number *((int) Math.Pow(2, cont)));
                cont++;
            }

            return suma;
        }
        public static int GetMaxValue(String binary)
        {
            int[] numeros = new int[8];
            for (int i= 0; i<8; i++)
            {
                numeros[i] = BinarytoDecimal(binary);
                
                String bit = binary[binary.Length-1].ToString();

                String aux = binary.Substring(0, 6);
                System.Diagnostics.Debug.WriteLine("El bit quitado es "+bit+ "  El resto es"+aux);
                binary = bit + aux;


            }

            return numeros.Max();
            
        }
        public static String ComparePixel(List<int> list)
        {
            String binary="";
            int centerPixel = list.IndexOf(0);
            int compPixel;
            for(int i = 1; i<=list.Count-1;i++)
            {
                compPixel = list.IndexOf(i);
                String printeable = centerPixel.ToString();
                String printeable2 = compPixel.ToString();
                System.Diagnostics.Debug.WriteLine("Center pixel "+printeable+ " Comppixel"+printeable2);
                if (centerPixel >= compPixel)
                {
                    binary += "1";
                }
                else
                {
                    binary += "0";
                }
            }

            return binary;
        }


        public static float[] LBPCalculator(Bitmap bitmap)
        {
            float[] histograma = new float[256];
            List<int> pixeles = new List<int>();
            var imageHeight = bitmap.Height;
            var imageWidth = bitmap.Width;
            for (int i = 1; i < imageWidth-1; i++)
            {
                for (int j = 1; j < imageHeight-1; j++)
                {

                    pixeles = new List<int>();
                    int CenterPixel = bitmap.GetPixel(i, j).R;
                    int N = bitmap.GetPixel(i - 1, j).R;
                    int NE = bitmap.GetPixel(i -1, j +1).R;
                    int E = bitmap.GetPixel(i, j + 1).R;
                    int SE = bitmap.GetPixel(i + 1, j + 1).R;
                    int S = bitmap.GetPixel(i + 1, j).R;
                    int SO = bitmap.GetPixel(i + 1, j - 1).R;
                    int O = bitmap.GetPixel(i, j - 1).R;
                    int NO = bitmap.GetPixel(i - 1, j - 1).R;
                    pixeles.Add(CenterPixel);
                    pixeles.Add(N);
                    pixeles.Add(NE);
                    pixeles.Add(E);
                    pixeles.Add(SE);
                    pixeles.Add(S);
                    pixeles.Add(SO);
                    pixeles.Add(O);
                    pixeles.Add(NO);
                    String binary=ComparePixel(pixeles);
                    int ValueforH = GetMaxValue(binary);
                    histograma[ValueforH] += 1;


                }
            }
<<<<<<< HEAD
        }*/
=======
            int imageSize = imageHeight * imageWidth;
            for(int i=0; i < histograma.Length; i++)
            {
                histograma[i] = histograma[i] / imageSize;
            }
            System.Diagnostics.Debug.WriteLine("Histograma listo");
            System.Diagnostics.Debug.WriteLine(histograma[254]);
            return histograma;
            
        }
        
>>>>>>> 104e3a9cea0c2dab05d34b2e908ed6540d603780
    }
   
}