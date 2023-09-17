package adaptability.adaptability_ut;

import adaptability.adaptability_algorithms.Euclidean;
import static org.junit.jupiter.api.Assertions.assertEquals;


import adaptability.adaptability_factory.AdaptabilityFactory;
import adaptability.adaptability_factory.IAdaptability;
import org.junit.jupiter.api.Test;

public class Test_Euclidean {

    @Test
    public static void testMSE(){

        int array [][] = {{1, 2}, {3,4}};
        int array2 [][] = {{5, 6}, {7,8}};

        IAdaptability euclidean = AdaptabilityFactory.getAdaptabilityAlgorithm("EUCLIDEAN");

        assertEquals(8, euclidean.adaptabilityAlgorithm(array, array2), "Euclidean Test Failed");
    }
}
