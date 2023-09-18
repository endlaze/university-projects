#include <iostream>
#include <chrono>
#include <random>
#include <vector>
#include <string>
#include <iomanip>
#include <limits>
#include <chrono>

class UniformDistribution  //Clase que permite generar un numero aleatorio entre -1 y 1
{
public:
    UniformDistribution()
        : generator(),
          distribution(-1.0, 1.0)
    {
        int seed = std::chrono::system_clock::now().time_since_epoch().count();
        generator.seed(seed);
    }

    double sample()
    {
        return distribution(generator);
    }

    UniformDistribution(const UniformDistribution& ) = delete;
    UniformDistribution& operator()(const UniformDistribution& ) = delete;
    UniformDistribution(UniformDistribution&& ) = delete;
    UniformDistribution& operator()(UniformDistribution&& ) = delete;

private:
    std::default_random_engine generator;
    std::uniform_real_distribution<double> distribution;
};


int samplesInsideCircle(const int numSamples)
{
   UniformDistribution distribution;

    int counter = 0;
    for (int s = 0; s != numSamples; s++)
    {
        auto x = distribution.sample();
        auto y = distribution.sample();;

        if (x * x + y * y < 1)
        {
            counter++;
        }
    }

    return counter;
}



void parallelPi(const int numTotalSamples)
{
    int numChunks = 8;
    int chunk = numTotalSamples / numChunks;
    int counter = 0;

#pragma omp parallel for shared(numChunks, chunk) reduction(+:counter) // Permite que la ejecucion del ciclo for sea paralela
    for (int i = 0; i < numChunks; i++)
    {
        counter += samplesInsideCircle(chunk);
    }

    const double approxPi = 4.0 * counter / numTotalSamples;

 std::cout<<" # Muestras     |  "<<std::left<<std::setw(20) << numTotalSamples << '\n';
 std::cout<<"  Aproximacion  |  "<<std::left<<std::setw(20) << approxPi << '\n';
}

void getPiValue(const int samples){
  using millis = std::chrono::milliseconds; // Duracion del programa en milisegundos
  using secs = std::chrono::seconds; //Duracion del programa en segundos
  using mins = std::chrono::minutes; // Duracion del programa en minutos
  using std::chrono::duration_cast;
  using std::chrono::steady_clock;
  auto t_par_1 = steady_clock::now(); //tiempo de inicio del algoritmo
  parallelPi(samples);
  auto t_par_2 = steady_clock::now(); //tiempo en el que el algoritmo finaliza

  auto miliTime = duration_cast<millis>( t_par_2 - t_par_1 ).count(); //obtiene el tiempo en milisegundos
  auto secTime = duration_cast<secs>( t_par_2 - t_par_1 ).count(); //obtiene el tiempo en segundos
  auto minTime = duration_cast<mins>( t_par_2 - t_par_1 ).count(); //obtiene el tiempo en minutos

// Se imprime la informacion mediante una tabla
  std::cout << "\n"<<std::endl;
  std::cout <<std::right<< std::setw(25)<<"--- Duracion ---"<< "\n" <<std::endl;
  std::cout << std::setw(2) << "| Minutos |" << std::setw(11) << "Segundos |" << std::setw(15) << "Milisegundos |"<< std::endl;
  std::cout <<"  "<<std::left<< std::setw(10) << minTime  <<std::left<< std::setw(11) << secTime  <<std::left<< std::setw(10) << miliTime<< std::endl;
  std::cout << "\n****************************************************\n\n"<<std::endl;

}



int main()
{
    std::cout << std::setw(20)<<std::right<< "Montecarlo Pi"<<std::endl;
    getPiValue(2147483647);

    return 0;
}
