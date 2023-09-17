package com.example.android.instapoo.com.example.android.Filters;

import android.graphics.Bitmap;
import android.graphics.Color;

import com.example.android.instapoo.com.example.android.FilterUtils.IFilter;




public class OldFilter implements IFilter {

    //Funcion ligada a la intefraz que permite aplicar el filtro

    @Override
    public Bitmap applyFilter(Bitmap source) {
        int width = source.getWidth();
        int height = source.getHeight();
        int pixColor = 0;
        int pixelR = 0;
        int pixelG = 0;
        int pixelB = 0;
        int newR = 0;
        int newG = 0;
        int newB = 0;
        int[] pixels = new int[width * height];
        source.getPixels(pixels, 0, width, 0, 0, width, height);
        for (int i = 0; i < height; i++)
        {
            for (int k = 0; k < width; k++)
            {
                pixColor = pixels[width * i + k];
                pixelR = Color.red(pixColor);
                pixelG = Color.green(pixColor);
                pixelB = Color.blue(pixColor);
                newR = (int) (0.393 * pixelR + 0.769 * pixelG + 0.189 * pixelB); //Nuevos pixeles modificados para la creacion del nuevo bitmap.
                newG = (int) (0.349 * pixelR + 0.686 * pixelG + 0.168 * pixelB);
                newB = (int) (0.272 * pixelR + 0.534 * pixelG + 0.131 * pixelB);
                int newColor = Color.argb(255, newR > 255 ? 255 : newR, newG > 255 ? 255 : newG, newB > 255 ? 255 : newB);
                pixels[width * i + k] = newColor;
            }
        }
    //Se retorna el bitmap construido con su respectiva aplicacion de filtros.
        Bitmap returnBitmap = Bitmap.createBitmap(pixels, width, height, Bitmap.Config.ARGB_8888);
        return returnBitmap;
    }
}



