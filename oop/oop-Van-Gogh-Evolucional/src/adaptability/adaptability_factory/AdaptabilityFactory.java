package adaptability.adaptability_factory;


import adaptability.adaptability_algorithms.Euclidean;
import adaptability.adaptability_algorithms.MSE;

public class AdaptabilityFactory {

    public static IAdaptability getAdaptabilityAlgorithm(String algorithm){

        switch (algorithm){
            case "EUCLIDEAN":
                return new Euclidean();
            case "MSE":
                return new MSE();
            case "OUR_ALGORITHM":
                return null;
            default:

        }
        return null;
    }


}
