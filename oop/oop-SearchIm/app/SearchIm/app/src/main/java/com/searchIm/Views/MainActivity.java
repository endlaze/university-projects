package com.searchIm.Views;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.searchIm.R;
import com.searchIm.camera_utils.CameraUtils;
import com.searchIm.networking.Controller;
import com.searchIm.image_utils.ImagesHandler;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class MainActivity extends CameraUtils {

    ImageView previewImage;
    ImagesHandler imagesHandler;
    ImageButton imgbutton;
    LinearLayout imgList;
    Bitmap bitmapPrev;
    ArrayList<Bitmap> bitmapArray = new ArrayList<Bitmap>();
    private static final int REQUEST_CODE_PICTURE = 1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        previewImage = (ImageView) findViewById(R.id.imageViewer);
        imgbutton=(ImageButton)findViewById(R.id.imageButton);
        imgList=(LinearLayout) findViewById(R.id.imgList) ;
        imagesHandler=ImagesHandler.getImagesHandlerInstance();

        if (!isConnected()) {
            Toast noInternet = Toast.makeText(getApplicationContext(), "Check your internet connection", Toast.LENGTH_SHORT);
            noInternet.show();
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    private boolean isConnected() {
        ConnectivityManager connMgr = (ConnectivityManager) getSystemService(Activity.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected())
            return true;
        else
            return false;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   public void takePictureAction(View view) {
        takePictureCamera();

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void selectFromGalleryAction(View view) {
        selectPictureFromGallery();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public void sendRequestToServer(View view) throws IOException {
        previewImage.buildDrawingCache();

        String encoded=ImagesHandler.getImagesHandlerInstance().base64Encoder(previewImage.getDrawingCache());
        Controller.getControllerInstance().postRequest(encoded);
        //new PostRequest().execute();
        new GetRequest().execute();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_PICTURE && resultCode == Activity.RESULT_OK) {
            if (data == null) {
                return;
            }
            try {
                InputStream inputStream = getContentResolver().openInputStream(data.getData());
                Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                this.bitmapPrev = bitmap;
                previewImage.setImageBitmap(bitmapPrev);


            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        } else {
            Bitmap bitmap = (Bitmap) data.getExtras().get("data");

            this.bitmapPrev = bitmap;
            previewImage.setImageBitmap(bitmapPrev);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    private void addImagesToLayout(Bitmap bitmap){
        LinearLayout.LayoutParams layoutParams=new LinearLayout.LayoutParams(600,600);
        ImageView imgV=new ImageView(MainActivity.this);
        imgV.setScaleType(ImageView.ScaleType.FIT_CENTER);
        imgV.setPadding(10,10,10,10);
        imgV.setLayoutParams(layoutParams);
        imgV.setImageBitmap(bitmap);
        imgList.addView(imgV);

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private class GetRequest extends AsyncTask<Void, Void, String> {
        @Override
        protected String doInBackground(Void... params) {
            String res="";
            try {
                res= Controller.getControllerInstance().getRequest();

            } catch (IOException e) {
                e.printStackTrace();
            }
            return res;

        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        @Override
        protected void onPostExecute(String str) {
            ArrayList<Bitmap> allBitmaps=imagesHandler.getImageBitmaps(str);
            for (Bitmap bitmap:allBitmaps) {
                addImagesToLayout(bitmap);
            }
        }

    }

}






