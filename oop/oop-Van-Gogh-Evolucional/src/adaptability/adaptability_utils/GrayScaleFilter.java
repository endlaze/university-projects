package adaptability.adaptability_utils;

import java.awt.*;
import java.awt.image.BufferedImage;

public class GrayScaleFilter {

    private final float RED = (float) 0.299;
    private final float GREEN = (float) 0.587;
    private final float BLUE = (float) 0.114;

    public void applyGrayScaleFilter(BufferedImage image) {
        for(int y=0; y<image.getHeight(); y++){
            for(int x=0; x<image.getWidth(); x++){
                Color pixelColor = new Color(image.getRGB(x, y));
                int grayPixel = (int) (pixelColor.getRed()*RED + pixelColor.getGreen()*GREEN + pixelColor.getBlue() * BLUE);
                Color newColor = new Color(grayPixel, grayPixel, grayPixel);
                image.setRGB(x,y,newColor.getRGB());
            }
        }
    }

}
