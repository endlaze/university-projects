package com.example.android.instapoo.com.example.android.mainclasses;

import android.Manifest;
import android.app.Activity;
import android.graphics.BitmapFactory;

import android.os.Bundle;
import android.graphics.Bitmap;
import android.content.Intent;
import android.support.v4.app.ActivityCompat;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;


import com.example.android.instapoo.R;
import com.example.android.instapoo.com.example.android.FilterUtils.FilterFactory;
import com.example.android.instapoo.com.example.android.FilterUtils.IFilter;
import com.example.android.instapoo.com.example.android.PhotoUtils.Photo;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;


import static com.example.android.instapoo.R.id.preview;


public class EditStageActivity extends Photo {
    ArrayList<Bitmap> bitmapArray=new ArrayList<Bitmap>();
    private static final int REQUEST_CODE_PICTURE= 1;


    ImageView previewImage;



    Bitmap bitmapOriginal;
    Bitmap bitmapToChange;

    FilterFactory filterFactory=new FilterFactory();
    IFilter filter;


    ImageButton originalImageButton;
    ImageButton blackAndWhiteImageButton;
    ImageButton gaussianImageButton;
    ImageButton invertImageButton;
    ImageButton oldImageButton;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intentGetBitmap = getIntent();
        bitmapArray= intentGetBitmap.getParcelableArrayListExtra("BitmapImage");

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_stage);
        ActivityCompat.requestPermissions(EditStageActivity.this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},1);

        previewImage = (ImageView) findViewById(preview);
        originalImageButton=(ImageButton) findViewById(R.id.Original);
        blackAndWhiteImageButton=(ImageButton) findViewById(R.id.BlackAndWhiteImageButton);
        gaussianImageButton=(ImageButton) findViewById(R.id.GaussianImageButton);
        invertImageButton=(ImageButton) findViewById(R.id.InvertButton);
        oldImageButton=(ImageButton) findViewById(R.id.OldButton);


        Button openPhoto=(Button) findViewById(R.id.button);
        openPhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent openPhoto= new Intent(EditStageActivity.this,MainActivity.class);
                startActivity(openPhoto);
            }
        });
    }

    //Funcion que sirve para agregar imagen actual a la miniatura de los filtros

    private void putMiniatureFilters(){

        originalImageButton.setImageBitmap(bitmapToChange);

        filter=filterFactory.getFilterBitmap("GAUSSIAN");
        blackAndWhiteImageButton.setImageBitmap(filter.applyFilter(bitmapToChange));


        filter=filterFactory.getFilterBitmap("BLACKANDWHITE");
        blackAndWhiteImageButton.setImageBitmap(filter.applyFilter(bitmapToChange));

        filter=filterFactory.getFilterBitmap("GAUSSIAN");
        gaussianImageButton.setImageBitmap(filter.applyFilter(bitmapToChange));

        filter=filterFactory.getFilterBitmap("INVERT");
        invertImageButton.setImageBitmap(filter.applyFilter(bitmapToChange));

        filter=filterFactory.getFilterBitmap("OLD");
        oldImageButton.setImageBitmap(filter.applyFilter(bitmapToChange));


    }

    //Evento que permite abrir la camara cuando se toca el boton
    public void takePicture(View view){

        takePhoto();
    }
    //Evento que permite abrir la galeria cuando se toca el boton
    public void openGallery(View view) {

        selectPhotoFromGallery();
    }


    //Hacer que el Bitmap del ImageView vuelva a tener el bitmap original
    public void applyOriginal(View view){
        try {


            bitmapToChange = bitmapOriginal;
            previewImage.setImageBitmap(bitmapOriginal);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    //Esta funcion permite aplicar el filtro Blando y Negro
    public void applyBlackAndWhite(View view) {
        try {

            bitmapToChange = bitmapOriginal;
            filter = filterFactory.getFilterBitmap("BLACKANDWHITE");
            bitmapToChange = filter.applyFilter(bitmapToChange);
            previewImage.setImageBitmap(bitmapToChange);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    //Esta funcion permite aplicar un filtro Gaussiano en la imagen
    public void applyGaussian(View view) {
        try {


            bitmapToChange = bitmapOriginal;
            filter = filterFactory.getFilterBitmap("GAUSSIAN");
            bitmapToChange = filter.applyFilter(bitmapToChange);
            previewImage.setImageBitmap(bitmapToChange);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //Funcion que permite agregar el filtro invertido
    public void applyInvert(View view){
        try {


            bitmapToChange = bitmapOriginal;
            filter = filterFactory.getFilterBitmap("INVERT");
            bitmapToChange = filter.applyFilter(bitmapToChange);
            previewImage.setImageBitmap(bitmapToChange);

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Funcion que permite aplicar el filtro Old al bitmap

    public void applyOld(View view){

        try {


            bitmapToChange = bitmapOriginal;
            filter = filterFactory.getFilterBitmap("OLD");
            bitmapToChange = filter.applyFilter(bitmapToChange);
            previewImage.setImageBitmap(bitmapToChange);

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    //Esta funcion permite guardar la imagen en la galeria y pone la imagn en el linear layout del MainActivity

    public void storeImageItem(View view){
        storeImage(bitmapToChange);
        try {

            //Intent que envia el bitmap
            Intent intent = new Intent(EditStageActivity.this, MainActivity.class);
            intent.putExtra("BitmapImage",bitmapToChange);


            startActivity(intent);
        }
        catch(Exception e){
            e.printStackTrace();
        }

    }

    //Funcion utilizada para recibir datos de la camara o se la galeria y modificar el bitmap

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_PICTURE && resultCode == Activity.RESULT_OK) {
            if (data == null) {
                return;
            }
            try {
                InputStream inputStream = getContentResolver().openInputStream(data.getData());
                Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                this.bitmapOriginal=bitmap;
                this.bitmapToChange=bitmap;


                previewImage.setImageBitmap(bitmapToChange);

                putMiniatureFilters();


            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
        else{
            Bitmap bitmap = (Bitmap)data.getExtras().get("data");

            this.bitmapOriginal=bitmap;
            this.bitmapToChange=bitmap;

            putMiniatureFilters();
            previewImage.setImageBitmap(bitmapToChange);


        }
    }











}











