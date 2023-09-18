package com.example.android.searchim.CameraUtils;

import android.content.Intent;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

/**
 * Created by andpi on 9/11/2017.
 */

public  abstract class CameraUtils extends AppCompatActivity {
    private static final int SELECT_FILE = 1;


    public CameraUtils(){

    }



    // This method is to open the camera
    public void takePictureCamera(){

        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, 0);
        }
    }

    //This method is to select a picture from the gallery

    public void selectPictureFromGallery(){

        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Seleccione una imagen"), SELECT_FILE);

    }



}
