package adaptability.adaptability_algorithms;

import adaptability.adaptability_factory.IAdaptability;

/**
 *
 * @author diesv
 */

public class Euclidean implements IAdaptability {

    @Override
    public float adaptabilityAlgorithm(int[][] p, int[][] q) {
        float sum = 0;
        int m = p.length;
        int n = p[0].length;


        for (int i=0; i< m; i++){
            for(int j = 0; j < n;j++ ){
                sum =sum + (float) Math.pow(p[i][j] - q[i][j], 2);
            }
        }
        return (float) Math.sqrt(sum);
    }
}


