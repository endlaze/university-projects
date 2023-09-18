package com.example.android.searchim;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.android.searchim.CameraUtils.CameraUtils;

import org.json.JSONArray;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

public class MainActivity extends CameraUtils {
    ImageView previewImage;
    Bitmap bitmapPrev;
    ArrayList<Bitmap> bitmapArray=new ArrayList<Bitmap>();
    private static final int REQUEST_CODE_PICTURE= 1;
    RequestQueue requestQueue;



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        previewImage=(ImageView)findViewById(R.id.imageViewer);
        requestQueue= Volley.newRequestQueue(this);
        isConnected();


    }

    public boolean isConnected(){
        ConnectivityManager connMgr = (ConnectivityManager) getSystemService(Activity.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected())
            return true;
        else
            return false;
    }














    public void takePictureAction(View view) {
        takePictureCamera();




    }


    public void selectFromGalleryAction(View view) {
        selectPictureFromGallery();

    }



    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_PICTURE && resultCode == Activity.RESULT_OK) {
            if (data == null) {
                return;
            }
            try {
                InputStream inputStream = getContentResolver().openInputStream(data.getData());
                Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                this.bitmapPrev=bitmap;
                previewImage.setImageBitmap(bitmapPrev);




            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
        else{
            Bitmap bitmap = (Bitmap)data.getExtras().get("data");

            this.bitmapPrev=bitmap;
            previewImage.setImageBitmap(bitmapPrev);
        }
    }
    
}

