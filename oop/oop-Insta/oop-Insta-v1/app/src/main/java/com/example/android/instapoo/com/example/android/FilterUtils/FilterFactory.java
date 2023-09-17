package com.example.android.instapoo.com.example.android.FilterUtils;

import com.example.android.instapoo.com.example.android.Filters.BlackAndWhiteFilter;
import com.example.android.instapoo.com.example.android.Filters.GaussianFilter;
import com.example.android.instapoo.com.example.android.Filters.InvertFilter;
import com.example.android.instapoo.com.example.android.Filters.OldFilter;

/**
 * Created by andpi on 9/11/2017.
 */

public class FilterFactory {
    public FilterFactory() {
    }

    //Funcion que usa el metodo factory para declarar instancias
    public static IFilter getFilterBitmap(String typeObject) {

        //Crea un filtro Blanco y Negro

        if (typeObject.equals("BLACKANDWHITE")) {
            return new BlackAndWhiteFilter();

        }

        //Crea un filtro Gaussiano
        if (typeObject.equals("GAUSSIAN")){
            return new GaussianFilter();
        }

        //Crea un filtro invertido
        if (typeObject.equals("INVERT")){
            return new InvertFilter();
        }

        //Crea un filtro de aspecto viejo
        if(typeObject.equals("OLD")){
            return new OldFilter();
        }


        return null;


    }
}


