package com.example.android.instapoo.com.example.android.mainclasses;

import android.content.Intent;
import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;


import com.example.android.instapoo.R;




public class MainActivity extends AppCompatActivity {
    
    Bitmap bitmapNew; //prueba




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ImageButton openPhoto = (ImageButton) findViewById(R.id.photoButton);
        openPhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(MainActivity.this, EditStageActivity.class);
                startActivity(intent);

            }
        });

        try {

            ////Intent que recibe el bitmap

            Intent intentGetBitmap = getIntent();

            bitmapNew = (Bitmap) intentGetBitmap.getParcelableExtra("BitmapImage");

            addToLayout(bitmapNew);

        }catch (Exception e){
            e.printStackTrace();
    }

}



   public void addToLayout(Bitmap bitmapAdd){


        LinearLayout linlaLikes = (LinearLayout) findViewById(R.id.linearImages);

        ImageView imgUsers = new ImageView(getApplicationContext());
        imgUsers.setScaleType(ImageView.ScaleType.CENTER_CROP);
        imgUsers.setImageBitmap(bitmapAdd);
        imgUsers.setPadding(15,15,15,15);

       // Definir las dimensiones del ImageView
        int dimens = 355;
        float density = getResources().getDisplayMetrics().density;
        int finalDimens = (int)(dimens * density);


        LinearLayout.LayoutParams imgvwDimens = new LinearLayout.LayoutParams(finalDimens, finalDimens);
        imgUsers.setLayoutParams(imgvwDimens);

       // Definir ScaleType
        imgUsers.setScaleType(ImageView.ScaleType.FIT_CENTER);
       //Añadir ImageView al Linear Layout

        linlaLikes.addView(imgUsers);


    }










}
