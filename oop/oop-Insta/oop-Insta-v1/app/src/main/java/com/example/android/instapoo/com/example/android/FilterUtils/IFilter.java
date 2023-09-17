package com.example.android.instapoo.com.example.android.FilterUtils;

import android.graphics.Bitmap;

/**
 * Created by andpi on 9/10/2017.
 */

public interface IFilter {
    //Esta funcion permite ser implementada por los filtros para ser aplicados al factory;
    public Bitmap applyFilter(Bitmap source);

}
