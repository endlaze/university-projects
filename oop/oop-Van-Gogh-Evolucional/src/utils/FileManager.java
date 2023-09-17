package utils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class FileManager {

    public static BufferedImage ReadImage(String path) throws IOException{

        BufferedImage img = null;
        img = ImageIO.read(new File(path));
        return img;
    }

    public static void WriteImage(BufferedImage image, String path) throws IOException {
        File file = new File(path);
        ImageIO.write(image, "jpg", file);
    }
}
