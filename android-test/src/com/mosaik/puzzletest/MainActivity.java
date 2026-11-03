package com.mosaik.puzzletest;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.graphics.Color;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.view.WindowInsets;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;

public final class MainActivity extends Activity {
  private WebView web;
  private android.webkit.ValueCallback<android.net.Uri[]> fileResult;
  @Override public void onCreate(Bundle state) {
    super.onCreate(state);
    web = new WebView(this);
    web.setBackgroundColor(Color.rgb(26,42,61));
    web.getSettings().setJavaScriptEnabled(true);
    web.getSettings().setDomStorageEnabled(true);
    web.getSettings().setAllowFileAccess(false);
    // Only content URIs explicitly selected in Android's document picker.
    web.getSettings().setAllowContentAccess(true);
    web.getSettings().setTextZoom(100);
    web.setWebChromeClient(new WebChromeClient() {
      @Override public boolean onShowFileChooser(WebView view, android.webkit.ValueCallback<android.net.Uri[]> callback, FileChooserParams params) {
        if (fileResult != null) fileResult.onReceiveValue(null);
        fileResult = callback;
        android.content.Intent pick = new android.content.Intent(android.content.Intent.ACTION_OPEN_DOCUMENT);
        pick.addCategory(android.content.Intent.CATEGORY_OPENABLE);
        pick.setType("*/*");
        try { startActivityForResult(pick, 41); }
        catch (android.content.ActivityNotFoundException e) { fileResult.onReceiveValue(null); fileResult=null; }
        return true;
      }
    });
    web.setWebViewClient(new WebViewClient() {
      @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return true; }
    });
    WebView.setWebContentsDebuggingEnabled(true);
    android.widget.FrameLayout root = new android.widget.FrameLayout(this);
    root.setBackgroundColor(Color.rgb(26,42,61));
    root.addView(web,new android.widget.FrameLayout.LayoutParams(-1,-1));
    root.setOnApplyWindowInsetsListener(new android.view.View.OnApplyWindowInsetsListener() { @Override public WindowInsets onApplyWindowInsets(android.view.View view, WindowInsets insets) {
      if (Build.VERSION.SDK_INT >= 30) {
        android.graphics.Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
        view.setPadding(bars.left,bars.top,bars.right,bars.bottom);
      } else {
        view.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());
      }
      return insets;
    }});
    setContentView(root);
    try {
      InputStream input = getAssets().open("mosaik.html");
      ByteArrayOutputStream bytes = new ByteArrayOutputStream();
      byte[] buffer = new byte[16384]; int count;
      while ((count=input.read(buffer))!=-1) bytes.write(buffer,0,count);
      input.close();
      web.loadDataWithBaseURL("https://appassets.androidplatform.net/",bytes.toString("UTF-8"),"text/html","UTF-8",null);
    } catch (Exception e) { throw new RuntimeException("Mosaik konnte nicht geladen werden",e); }
  }
  @Override protected void onActivityResult(int request, int result, android.content.Intent data) {
    super.onActivityResult(request,result,data);
    if (request == 41 && fileResult != null) {
      fileResult.onReceiveValue(result == RESULT_OK && data != null && data.getData() != null ? new android.net.Uri[]{data.getData()} : null);
      fileResult=null;
    }
  }
  @Override public void onBackPressed() {
    web.evaluateJavascript("window.mosaikAndroidBack ? window.mosaikAndroidBack() : false", new android.webkit.ValueCallback<String>() { @Override public void onReceiveValue(String handled) {
      if (!"true".equals(handled)) MainActivity.this.finish();
    }});
  }
  @Override protected void onPause() {
    web.evaluateJavascript("window.mosaikSuspend && window.mosaikSuspend()",null);
    web.onPause();
    super.onPause();
  }
  @Override protected void onResume() { super.onResume(); if(web!=null)web.onResume(); }
}
