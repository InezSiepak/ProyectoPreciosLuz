'use strict';





function obtenerDatos(hora) {
    
    fetch(`https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`)

        .then(function(response){
            return response.json();
        })

        .then(function(data){
            console.log(data.data);
            let datos = data.data
            localStorage.setItem("datosDeHoy", JSON.stringify(datos));
            let datosRecuperados = JSON.parse(localStorage.getItem("datosDeHoy"))
            
            switch (hora) {

                case 0o0:
                    console.log(datosRecuperados["00-01"].price);
                    break;
                
                case 0o1:
                    console.log(datosRecuperados["01-02"].price);
                    break;

                case 0o2:
                    console.log(datosRecuperados["02-03"].price);
                    break;

                case 0o3:
                    console.log(datosRecuperados["03-04"].price);
                    break;
                    
                
                case 0o4:
                    console.log(datosRecuperados["04-05"].price);
                    break;

                case 0o5:
                    console.log(datosRecuperados["05-06"].price);
                    break;
                
                case 0o6:
                    console.log(datosRecuperados["06-07"].price);
                    break;
                
                case 0o7:
                    console.log(datosRecuperados["07-08"].price);
                    break;
                
                case 8:
                    console.log(datosRecuperados["08-09"].price);
                    break;

                case 9:
                    console.log(datosRecuperados["09-10"].price);
                    break;

                case 10:
                    console.log(datosRecuperados["10-11"].price);
                    break;
                    
                
                case 11:
                    console.log(datosRecuperados["11-12"].price);
                    break;

                case 12:
                    console.log(datosRecuperados["12-13"].price);
                    break;

                case 13:
                    console.log(datosRecuperados["13-14"].price);
                    break;
                
                case 14:
                    console.log(datosRecuperados["14-15"].price);
                    break;

                case 15:
                    console.log(datosRecuperados["15-16"].price);
                    break;

                case 16:
                    console.log(datosRecuperados["16-17"].price);
                    /* console.log((1000*Number(datosRecuperados["16-17"].price))/10**6); */
                    break;
                    
                
                case 17:
                    console.log(datosRecuperados["17-18"].price);
                   /*  console.log((1000*Number(datosRecuperados["17-18"].price))/10**6); */
                    break;

                case 18:
                    console.log(datosRecuperados["18-19"].price);
                    break;
                
                case 19:
                    console.log(datosRecuperados["19-20"].price);
                    /* console.log((2000*Number(datosRecuperados["19-20"].price))/10**6) */
                    break;
                
                case 20:
                    console.log(datosRecuperados["20-21"].price);
                    
                    break;
                
                case 21:
                    console.log(datosRecuperados["21-22"].price);
                    break;

                case 22:
                    console.log(datosRecuperados["22-23"].price);
                    break;

                case 23:
                    console.log(datosRecuperados["23-24"].price);
                    break;
                    
            } 
            
        })

}

const now = new Date();
let horaActual = now.getHours()



obtenerDatos(horaActual)
