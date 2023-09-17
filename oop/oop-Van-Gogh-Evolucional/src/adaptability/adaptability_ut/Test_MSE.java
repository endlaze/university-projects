package adaptability.adaptability_ut;

import adaptability.adaptability_algorithms.MSE;
import static org.junit.jupiter.api.Assertions.assertEquals;

import adaptability.adaptability_factory.AdaptabilityFactory;
import adaptability.adaptability_factory.IAdaptability;
import org.junit.jupiter.api.Test;

public class Test_MSE {

    @Test
    public static void testMSE(){
        MSE mse = new MSE();
        int array [][] = {{1, 2}, {3,4}};
        int array2 [][] = {{5, 6}, {7,8}};

        IAdaptability mseAlgorithm = AdaptabilityFactory.getAdaptabilityAlgorithm("MSE");
        assertEquals(16, mseAlgorithm.adaptabilityAlgorithm(array, array2), "MSE Test Failed");
    }
}
