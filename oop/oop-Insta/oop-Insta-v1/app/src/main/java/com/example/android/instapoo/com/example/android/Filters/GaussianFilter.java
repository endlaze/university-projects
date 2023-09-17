package com.example.android.instapoo.com.example.android.Filters;

import android.graphics.Bitmap;

import com.example.android.instapoo.com.example.android.FilterUtils.Convolution;
import com.example.android.instapoo.com.example.android.FilterUtils.IFilter;


public class GaussianFilter implements IFilter {
    public GaussianFilter() {
    }


    //Es una funcion que permite aplicar el filtro a un bitmap de Gaussiano
    public Bitmap applyFilter(Bitmap source) {

        //Se define la configuracion del filtro
        double[][] GaussianBlurConfig = new double[][] {
                { 2, 3, 2 },
                { 2, 4, 2 },
                { 2, 3, 2 }
        };
        Convolution convMatrix = new Convolution(3);
        convMatrix.applyConfiguration(GaussianBlurConfig);
        convMatrix.factor = 16;
        convMatrix.offset = 0;
        return Convolution.convolution(source, convMatrix);
    }




}
