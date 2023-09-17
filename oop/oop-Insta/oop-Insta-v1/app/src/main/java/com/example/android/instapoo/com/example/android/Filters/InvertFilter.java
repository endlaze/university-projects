package com.example.android.instapoo.com.example.android.Filters;

import android.graphics.Bitmap;
import android.graphics.Color;

import com.example.android.instapoo.com.example.android.FilterUtils.IFilter;



public class InvertFilter implements IFilter {
    @Override

    // Es una funcion que permite aplicar el filtro invertido .
    public Bitmap applyFilter(Bitmap source) {
        int width = source.getWidth();
        int height = source.getHeight();

        Bitmap returnBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565);

        int colorArray[] = new int[width * height];
        int r, g, b;
        source.getPixels(colorArray, 0, width, 0, 0, width, height);

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                r = 255 - Color.red(colorArray[y * width + x]);
                g = 255 - Color.green(colorArray[y * width + x]);
                b = 255 - Color.blue(colorArray[y * width + x]);

                colorArray[y * width + x] = Color.rgb(r, g, b);
                returnBitmap.setPixel(x, y, colorArray[y * width + x]);
            }
        }

        return returnBitmap;

    }

}

