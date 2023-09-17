package com.example.android.instapoo.com.example.android.FilterUtils;

import android.graphics.Bitmap;
import android.graphics.Color;



public class Convolution {
    public static final int SIZE = 3;

    public double[][] matrix;
    public double factor = 1;
    public double offset = 1;

    public Convolution(int size) {
        matrix = new double[size][size];
    }

    public void applyConfiguration(double[][] config) {
        for(int x = 0; x < SIZE; ++x) {
            for(int y = 0; y < SIZE; ++y) {
                matrix[x][y] = config[x][y];
            }
        }
    }
    public static Bitmap convolution(Bitmap src, Convolution matrix) {
        int width = src.getWidth();
        int height = src.getHeight();
        Bitmap result = Bitmap.createBitmap(width, height, src.getConfig());

        int A, R, G, B;
        int sumR, sumG, sumB;
        int[][] pixels = new int[SIZE][SIZE];

        for(int y = 0; y < height - 2; ++y) {
            for(int x = 0; x < width - 2; ++x) {

                // se obtiene la matriz de pixeles
                for(int i = 0; i < SIZE; ++i) {
                    for(int j = 0; j < SIZE; ++j) {
                        pixels[i][j] = src.getPixel(x + i, y + j);
                    }
                }

                // se obtiene el alpha del pixel del centro
                A = Color.alpha(pixels[1][1]);

                // se inicializa la suma de colores
                sumR = sumG = sumB = 0;

                // se obtiene la suma RGB de la matriz
                for(int i = 0; i < SIZE; ++i) {
                    for(int j = 0; j < SIZE; ++j) {
                        sumR += (Color.red(pixels[i][j]) * matrix.matrix[i][j]);
                        sumG += (Color.green(pixels[i][j]) * matrix.matrix[i][j]);
                        sumB += (Color.blue(pixels[i][j]) * matrix.matrix[i][j]);
                    }
                }

                // se obtiene el Rojo final
                R = (int)(sumR / matrix.factor + matrix.offset);
                if(R < 0) { R = 0; }
                else if(R > 255) { R = 255; }

                // se obtiene el Verde final
                G = (int)(sumG / matrix.factor + matrix.offset);
                if(G < 0) { G = 0; }
                else if(G > 255) { G = 255; }

                // se obtiene el Azul final
                B = (int)(sumB / matrix.factor + matrix.offset);
                if(B < 0) { B = 0; }
                else if(B > 255) { B = 255; }

                // Se aplica el nuevo pixel con el nuevo color
                result.setPixel(x + 1, y + 1, Color.argb(A, R, G, B));
            }
        }

        // se retorna la imagen total
        return result;
    }
}
