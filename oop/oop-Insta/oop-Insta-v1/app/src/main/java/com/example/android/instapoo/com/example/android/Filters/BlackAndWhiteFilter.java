package com.example.android.instapoo.com.example.android.Filters;

import android.graphics.Bitmap;
import android.graphics.Color;

import com.example.android.instapoo.com.example.android.FilterUtils.IFilter;


public class BlackAndWhiteFilter implements IFilter {
    public BlackAndWhiteFilter(){

    }

    @Override
    public Bitmap applyFilter(Bitmap source) {


        final double GS_RED = 0.299;
        final double GS_GREEN = 0.587;
        final double GS_BLUE = 0.114;

        // Se crrea el bitmp de salida
        Bitmap bitmapOutput = Bitmap.createBitmap(source.getWidth(), source.getHeight(), source.getConfig());


        // Luego, se decara una variable para todas, R,G,B o A
        int A, R, G, B;
        int pixel;

        // get image size
        int width = source.getWidth();
        int height = source.getHeight();

        // recorre la imagen o bitmap pixel por pixel, para luego aplicar el filtro
        for (int x = 0; x < width; ++x) {
            for (int y = 0; y < height; ++y) {
                // get one pixel color
                pixel = source.getPixel(x, y);
                // retrieve color of all channels
                A = Color.alpha(pixel);
                R = Color.red(pixel);
                G = Color.green(pixel);
                B = Color.blue(pixel);

                // Se convierte el RGB a otro estado
                R = G = B = (int) (GS_RED * R + GS_GREEN * G + GS_BLUE * B);


                // se agrega un pixel a la salida del bitmap depenediendo del valor que sean
                bitmapOutput.setPixel(x, y, Color.argb(A, R, G, B));
            }
        }

        // return final image
        return bitmapOutput;
    }
}
