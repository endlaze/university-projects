package com.searchIm.networking;

import android.preference.PreferenceActivity;
import android.util.Log;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLOutput;


import cz.msebera.android.httpclient.Header;

import static android.content.ContentValues.TAG;

/**
 * Created by andpi on 14/11/2017.
 */

public class Controller {
    String urlString = "http://192.168.100.3:54052/api/values";

    private static Controller controller=null;

    private Controller(){

    }

    public static Controller getControllerInstance(){
        if(controller==null){
            controller=new Controller();
        }
        return controller;
    }
    /////////////////// function for the GET request
    public String getRequest() throws IOException {

        String result="";

            URL url = new URL(urlString);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Content-Type","application/json");
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String output;
            StringBuffer response = new StringBuffer();

            while ((output = in.readLine()) != null) {
                response.append(output);
            }
            in.close();

            result = response.toString();


        return result;
    }
    /////////////// function for the POST request

    public void postRequest(final String data) throws IOException{
        AsyncHttpClient client = new AsyncHttpClient();





        AsyncHttpResponseHandler responseHandler = new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                System.out.println(data);
                System.out.println("Request done");

            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                System.out.println("Error");

            }
        };
        RequestParams params = new RequestParams();
        params.put("Img",data);
        client.post(urlString , params , responseHandler);
    }
}
