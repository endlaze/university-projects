using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;


namespace SearchIm_Server.Logic.Filters
{
    public class GrayScaleFilter
    {
        private const double GRAYSCALE_RED = 0.299;
        private const double GRAYSCALE_GREEN = 0.587;
        private const double GRAYSCALE_BLUE = 0.114;

        public static Bitmap ApplyGrayScaleFilter(Bitmap originalBitmap)
        {


            Bitmap grayScaledBitmap = new Bitmap(originalBitmap.Width, originalBitmap.Height);
            System.Diagnostics.Debug.WriteLine("Voy a filtrar una imagen");
            for (int i = 0; i < originalBitmap.Width; i++)
            {
                for (int j = 0; j < originalBitmap.Height; j++)
                {
                    
                    int alpha = originalBitmap.GetPixel(i, j).A;
                    int red = originalBitmap.GetPixel(i, j).R;
                    int green = originalBitmap.GetPixel(i, j).G;
                    int blue = originalBitmap.GetPixel(i, j).B;

                    int grayScale = (int)((red * GRAYSCALE_RED) + (green * GRAYSCALE_GREEN) + (blue * GRAYSCALE_BLUE));
                    red = green = blue = grayScale;

                    Color grayScaledPixel = Color.FromArgb(alpha, red, green, blue);
                    grayScaledBitmap.SetPixel(i, j, grayScaledPixel);
                }
            }
            System.Diagnostics.Debug.WriteLine("Filtre una imagen");
            return grayScaledBitmap;

        }

    }
}