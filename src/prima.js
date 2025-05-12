//Declarar un arreglo para almacenar los datos de todos los empleados 
// ingresados
const empleados = [];

// En este arreglo se guardaran los calculos de la prima de cada 
// empleado para ser visualizados
const resultados = [];

// Declaramos una funcion para calcular la prima 
function calcularPrima(salario, mesesTrabajados, ausencias) {
    const primaBase = salario / 2;
    let prima;

    if (mesesTrabajados < 6) {
        const diasTrabajados = mesesTrabajados * 30;
        prima = (primaBase / 180) * diasTrabajados;
    } else {
        prima = primaBase;
    }

    if (ausencias > 5) {
        prima *= 0.90; // Vamos a deducir el 10% de la prima por
        //  ausencias mayor a 5 dias
    }

    return prima;
}

