using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SearchIm_Server.Logic.Compare
{
    public class HistogramComp
    {

        public static int Comp(int[] ServerH, int[] ClientH)
        {
            int CompCont = 0;
            for(int i=0; i <= 255; i++)
            {
                if (ServerH[i] == ClientH[i])
                {
                    CompCont++;
                }
            }
            return CompCont;
        }

    }
}