using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace SearchIm_Server.Logic.Load
{
    public class ImageLoad
    {

        public static void Load(String index)
        {
            Bitmap newbitmap;
            string filePath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)+ @"\GitHub\SearchIM-Server\SearchIm-Server\imagenesServer\"+index+".jpg";
            newbitmap = new Bitmap(filePath, true);
            WebApiConfig.OriginalImage.Add(newbitmap);
            newbitmap=Logic.Filters.GrayScaleFilter.ApplyGrayScaleFilter(newbitmap);
            WebApiConfig.Gray.Add(newbitmap);
            float[] histogram = Logic.Compare.LBP.LBPCalculator(newbitmap);
            WebApiConfig.Histogram.Add(histogram);
            
        }
        
    }
}