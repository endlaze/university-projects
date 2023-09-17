package com.example.diesv.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void yeee(View v){
        String AAA="Hola amiguitos";

        TextView textV= (TextView) findViewById(R.id.vista);
        textV.setText(String.valueOf(AAA));


    }
}
