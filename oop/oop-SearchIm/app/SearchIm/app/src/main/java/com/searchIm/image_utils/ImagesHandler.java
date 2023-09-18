package com.searchIm.image_utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;

/**
 * Created by andpi on 15/11/2017.
 */

public class ImagesHandler {

    private static ImagesHandler imagesHandler =null;


    private ImagesHandler(){

    }


    public static ImagesHandler getImagesHandlerInstance(){
        if(imagesHandler ==null){
            imagesHandler =new ImagesHandler();
        }
        return imagesHandler;
    }

    ////////////////////////////////////////////////////////////////




    /////////////////////////////////////////////////////////////

    public Bitmap base64Decoder(String jsonString) {


        byte[] decodedString = Base64.decode(jsonString, Base64.DEFAULT);
        Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
        return decodedByte;
    }
    public String base64Encoder(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream .toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }


    //////////////////////////////////////////////////////////////////

    private ArrayList<String> getImagesCode(String images){

        ArrayList<String> similarImages=new ArrayList<>();
        String aux=images.substring(2, images.length()-1);

        String [] splittedImageCodes=aux.split(",");

        for (String s:splittedImageCodes) {
            similarImages.add(s);
        }
        return similarImages;
    }


    ////////////////////////////////////////////

    public ArrayList<Bitmap> getImageBitmaps(String images){

        ArrayList<Bitmap> bitmapImgs=new ArrayList<>();
        ArrayList<String> imageCodes=getImagesCode(images);

        for (String img:imageCodes) {
            Bitmap newBitmap=base64Decoder(img);
            bitmapImgs.add(newBitmap);
        }

        return bitmapImgs;
    }











}


