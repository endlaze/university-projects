using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SearchIm_Server.Models;


namespace SearchIm_Server.Controllers
{
    public class ValuesController : ApiController
    {
        
         String json= "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEVNtqz///8+sqdFtKlHtKo3sKU/sqhJtarr9vX3/PtkvrW64NzD5ODI5uPp9fRyw7u03dnU6+lTuK+o2NOAyMHy+fng8e9rwLiRz8jb7+2a0syLzMZbu7Ks2dV7x7/Q6ucjrKA4RUN0AAAN4klEQVR4nO1d6bqjqhI1CJiYwR0zm+m+/1NeFVFEUMBCzfl6/ejeU9QlUKsoqCJY/dcRzP0A3vGP4e/jH8Pfxz+GoNhwTHnTCRgejrv3/RO/0iBEpAAKg/QVf+7v3fHg//Y+GW6uuyyJCEKUhhjjQET+fUgpQiRIst3VZ6P6YrjZZzeMaBhFQT+iKKQI37K9L5Y+GG6+WZx3RTzArdWkeQeOs68PluAML9sPtWMnsKSf7QX6gWAZXv5uBA31yz5EiNz+YElCMtwlbo3XacpkB/hUYAwPWTiq9UREKMzAdASI4TchIRA9hpAkX5hHA2G4TSlU8zWI6GsL8XAADLcBAqfHgAIAjqMZ+uNXckxHcxzJcJ/65Mc47mdkeIypZ34FaPyYieHlTMarnwkwOY9wAtwZvtE0/EqO6D05w+trig7agL6u0zLMJuqgDTDJJmR4mMTCyKCxkyfnwnA7eQMyYOIijg4Mz3M0IAM6T8DwEcC62HYIA2tttGX4R2bkFxS68eeX4X1mgjnI3SfDZL4h2IAm3hheXnMOwQbhy8aJs2B4xfOIRBcYWzg45gyPS+ihHPQIz3A/v40RQYxnjaYMd8simFM0jTgaMtwujWBO0dCFM2O4uBYsYNiKRgwXSdCUognD4zIJ5hRNLKoBw6vvcJo7kIEuDjNcL8ORUQOvARimS/FkVMDpeIbJkgnmPuqgGz7EMFuSr6YCHQpQDTCce8JrgCHl72e4YDPagPYb1H6GwbIHIQMe4ND3y/OShaJB2BuB62O4/YU+WoD2DcUehuvlWxkO0iP8PQzjXxiEDDh2YXhauhKKoCd7hoff6aMFiHbVRsvwh/poAX0/1TH8+xU7yqGN9msYXn6NYD4UNWFiDcPzb/XRAlij+2qGj98yMwxEvfCmZvhjZoYB38wZ7pckhZgiZPY8VBkHVzJMPT+0OTDCz7zzncymAMqQhorhUjxujNBnb/POkcoDVzFcRhNScvur9+7fzAyDqhEVDJfQhCFNT4IfZhprUDWigqHfZzdAPvjubctv2IQ5TBju5m1CTOlZtonmth11lzK6DOfUQkxJsu0mzpgbBoUD3mF4nK8JQ/R6qybrfxbyjDqLNR2Gn5maMB98mRgWbL7e2MTD8GeI4TzBmYiGTzG94noX3OjM6p13QjYyQ7vLgQCHJNkJg+/yjv8nhOovdu8cy1F+meHkBDGJxVSuzTYhtLW4azmRi2RG0vf7ae0MRi1hX33PlEYRflRki3+tJ3JI0hqJ4ZR2BqPwKVq+RxYUm+P5nq5LWvZca/GSbU2b4WayaRNG9CO+7PUppWGRPMX35V1JGXhxmMjRtqC2GW4nYojbeZSb7Y1Ud+Z7K3fkVf7vMAuQYvxthgl8CloXubC3Bt/+TOvUDVJFzE6ElOrxdnjlUXtZuMVw418M897Z8qofd9xkpmBSieKTRmVIwkrsa5BWN20x9N1JZa/6cArExBucsqbd3MJqH4mbOre7aYuhV0uae9U30au+/MXtvCIas9+uUxzgZ/mVW59qxxVbDP0RjELS9qp3HyJlRdPquY4Fb1LaIdeoLRa7qcjQ27QCo6DlVR+fuJMVTarVozLCEJbfPFyfpzXBEBn68UkjitpedRbQ7o341DUrOmaEy6+dZ6pYXGsTGXqY+8rJ9ev3iyrsIw4r+/opm42FW9yDDa15sMAQXisUXrWyJEH4YkP08ip/i53FnkPUC4HhF3YYYip71UiT0147apj9njqLPQf6KhmeADspRqgt7FmgTTnljhqf1zCxX43RZnEgCgzBXDbZqz6cUhRqL944avwHpdm9j3nfouMmMBxxRREUxdu2V017mgPzDvXkY4SJ/WHUkBGnwc2X465ZoetVk96EaBxUf32rLSwqX89I9wodFAzHL6nJseqWV62E6KhVqMR+pF0XFtoahiMNDabo3BL2fPANXZGnhB5FF6D8yVhpFkxNw3DM0n0h7JJXrfBbZNSOGmnMUCX2Y/uT4Hw3DN0FtutVG9Ua4ltfM6FHVvu2x6/vpQqGjj0/F3bJq9YJu/Q53HLUKqDRYl+BdBk6mdKIkla47JqlBr2zQJiyVt+0RhzTMYh4GFp3GNpPnfLB95G8auNSSqh21FovBEDs+Q0eHYa2gxsj2au2KPSFnuxTkkKFAGJfge46DK36fhGrFgdfGas2/zh31N7S2AcRewb67jDMjMNaHWHv8aqVn+dyfJdeKozYV9fKOgwN5TD3qqVwWT74rFx2HLDW3yRyb4zKn8PMwxtBrBmaZf/QVrhswKtWX6HrqFUAEnsGnHQYGr26ViRyf0b2ZYZQtW7y6KS+VzN72wtq0AQyaoYvk8+9msF3py5VlHgZHUVeMYt3n6ACDa8Ow9RgMNUv5oHcStTUjlqXRyX2UHGGZobIv9gYWYt6u8qhYyYMUDtqZ8WH2VZ0CLFniDYyQ7MBjp78g/vU1iRgpaNWoRJ7uHBf2GFo2CZhU1fsjaxWhlDC7nlVposBin11Qcc2zEFTPtG9PC1GI60dNWXEtBR7yKRx6tqGBUjCoyAP46JfpGp62VGrMDKMr0C3DW0sByYZ//zWrGwU0jhq/Ncjw/gKjGrDoDCLtfYbFKer68loahTBij1Dl6HtejJ68anv+jOg/bhy1C6p5iasNsIbdFUBdxhaB7yFipTH3iqmekeNXylxescDWEkMV4F9TB+TOmb3p6+whCpHTV8+hKUq330zNPJLZYQBn0lt7kT5iiLuqJ20BMHFvkTXL3W01OjG5/pXlSOHw2q0qhy1ChRa7Msbd+cWrtUhsOjIyTQaR02vm5XYA+8hUMwP3UPegiN3altVdGPkD715/WyQAK+wK+b45nGaLgRH7ixw5I7aty+G6kHsCyjiNKPizJh8GkeObyThlra3tsb4NXs1FLG2kfERoQjuNigvVTtqvc3Dtr6AzexrKOKlzttz6msGoiMXhf2OWgUMFsaXoIh5j9+kH6EXv+z68xpw1PiDsJk9fP0N0l23cF17EoGRVFr8EfWbyLDchgESxpegWHtyc2pk4FZxg8E6b2xnj48tkS8FwyfMfYRK/3pHjf+tF7EvgJ8KhmAbhrgj129ES5R/5yOVjKrW8eHSmyOmhIMJWSw26SUbULkXA3K8lxPsIQ3wMbOvH2CtYAh5K1akYmBk+xL7QLcnCjIVgc1d+p2ISuy97EvW7GuD3JvIXIreCQPxJfaBdm8i5P5SJuV/PY/vT+wD7f5S0D3CqLjipcfWsIitp6qMmj3CoMLE1lL102oEHsYXoNvnDbtJuNzo2+OugL9T8ea6vfqgNclZWo9uZsvE3lf1BqrLtwDNmWFhBE1JNJ9iH/BNHSqGoLWTaGlr1K1Uib2nsow9eU9AOz0YWEdUzoxYIqu3alt0p2UIqhfMZ/mqXhoT+6evyppIn38Im0PKIhQKW+NV7PtzSGFTLFnuv0KCWBjfWwnm3jxg2KBXuXTdjXB5FftA7qRyPj6oNWUR027PL+/krUiMXJlOYqg0DK6ISpMpl2nwK/Y8L0zLEFaEWdCyvfZa+Ywe0+JlRtL3kL5pFQ9qr/kQr2Iv+aQqhsD1aYpLtlZ3K7H3V2R6sD4NbHiWzUTFSl3Ur9gb1BiCjc8yuybECyux91e7waBOFKwZZ3n1wqIpm9l7szMmtb5gI7RhuVBZh5vYerjHcmJG9dpgBaPMsLrWvbK8AfSavQgFne6PQMWYTbernk89i71p3UTQRXW2CMQ8+mqQAF5dhmHtS9iXXAb22J41VujXn9ib1y8FbcSwXsKoxN5jDRzjGrSgdYRZ0KlIZkKexd6mjrBFvdBh8CUMJvZXf2JvUwsa9DmYrfmjvsW+Ss80ZAjal8ptERu2lR24uoiIUHPGrIYhZDiDWTi2dcCj2EuF6IYYQiqG4CtOLPa9DCEd8GaAgF2yA/vzLUBTkPgI8Sj2DmeUQJ4zQ9kVPZb0czlnBrKfVgsJQLuuFHA7KwiwnzIt9niIm+N5T4CWr7Q1N29i73pmF+i5a9vH2ZvL7X7uGuQJnQ5p36YYOKmzn+FPnH84cKBsP8OlnnUsYujc4wGG//1zSPPpzrJPeRx/lmw+HZiierIrotfg8w8zvOhTC2cHxpqjyKwY5gZ1qa0YwZzLveAzyjTnkNkzXH2XSZF8hx/dkOFqv0SKRBk8dGS4ROUfUnpLhsujaErQmOHCOmpk2EVtGM55TFIHuLuYDcBQrgA4I+o6G8AMV+vXMnxUfk4LPMOhlNeJQAed7REMW9VUZwIZmi6NY7ja+YtGGAErdlvAMlxdB3KX/SJMLWyMI8PVyl/QbBCoN6oGxrBVu3lK1JVgvDNcrW9zqD+69US2gRkWNZ2mbsaoqXQxCcPVYeJmpG4NOIJhsc9pOqMa9q5M+GKoLQ0FjojcNWv0nhnm2nibQjhoYq2BYAxVpaGgIVShmIVhPhyt65ha8QvcByAUw6KmkCdfFQPwA2GYu+OxB3mMUGzrZCsBwnC1OiZupZO1oORjHqjoBRBDdpAoFMniMCxXge8AjGGOo/ZULhtE0oE1YwHJMHcCdh86qiUxpZ/dCHlXAJbhqqi1f8bUKSqH88+dFWfHjwQ4wwLHU0yQVVtiikh8MllKsoYXhgWO709K0XBr5i2HaPp5A1nOLrwxLLD+vp8xyZuThliq3JZ/H9K84Uj8fH/B7KYKXhkyrI+7d/ZM4jRvL4QIQnm7pnHyzN67o1duDBMwFLBhmPSe0zKcA/8Y/j7+Mfx9/GP4+/g/ZRms4uveN4QAAAAASUVORK5CYII=";
        // GET api/values
        String hola = "HOALHGLASLSL";
        public IEnumerable<string> Get()
        {
<<<<<<< HEAD
            return new string[] { json };
=======
            return new string[] { "value1", "value2",hola };
>>>>>>> 104e3a9cea0c2dab05d34b2e908ed6540d603780
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public HttpResponseMessage post([FromBody]Image value)
        {

            json = value.Img;
            System.Diagnostics.Debug.WriteLine(value.Img);
            try
            {

                //String str = 

            
                System.Diagnostics.Debug.WriteLine(value);

                
       
                    var message = Request.CreateResponse(HttpStatusCode.Created, value.Img+"-------------------");
                    message.Headers.Location = new Uri(Request.RequestUri +json);
                    return message;
                
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }


        }

        // PUT api/values/5
        public string Put([FromUri]string value)
        {

            return "hola " + value + hola;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
