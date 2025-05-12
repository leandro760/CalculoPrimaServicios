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

//Declaramos la funcion para solicitar los datos del empleado 
// y validar si son correctos
function ingresarEmpleado() {
    const nombre = prompt("Ingrese el nombre del empleado:");
    if (!nombre) return null; // Se debe ingresar un nombre de lo contrario se cancela

    const salario = parseFloat(prompt("Ingrese el salario mensual del empleado:"));
    if (isNaN(salario) || salario <= 0) {
        alert("Por favor, ingrese un salario válido.");
        return null;
    }

    const mesesTrabajados = parseInt(prompt("Ingrese los meses trabajados:"));
    if (isNaN(mesesTrabajados) || mesesTrabajados < 0) {
        alert("Por favor, ingrese un número válido de meses trabajados.");
        return null;
    }

    const ausencias = parseInt(prompt("Ingrese el número de ausencias injustificadas:"));
    if (isNaN(ausencias) || ausencias < 0) {
        alert("Por favor, ingrese un número válido de ausencias.");
        return null;
    }

    return { nombre, salario, mesesTrabajados, ausencias };
}

// Función para mostrar las opciones de consulta
function mostrarOpciones() {
    let mensaje = "Opciones de consulta:\n";
    empleados.forEach((empleado, index) => {
        mensaje += `${index + 1}. ${empleado.nombre}\n`;
    });
    mensaje += `${empleados.length + 1}. Consultar todos los empleados\n`;
    mensaje += `${empleados.length + 2}. Terminar`;
    return prompt(mensaje);
}

// Función para consultar un empleado
function consultarEmpleado(empleado) {
    const primaCalculada = calcularPrima(
        empleado.salario,
        empleado.mesesTrabajados,
        empleado.ausencias
    );

// Almacenar el resultado en el arreglo
    resultados.push({
        nombre: empleado.nombre,
        prima: primaCalculada.toFixed(2)
    });

    console.log(`\nDetalles del empleado: ${empleado.nombre}`);
    console.log(`Salario mensual: $${empleado.salario.toLocaleString()}`);
    console.log(`Meses trabajados: ${empleado.mesesTrabajados}`);
    console.log(`Ausencias injustificadas: ${empleado.ausencias}`);
    console.log(`Prima calculada: $${primaCalculada.toFixed(2)}`);
}

// Consulltar todos los empleados
function consultarTodosLosEmpleados() {
    empleados.forEach(consultarEmpleado);
}

// Ingreso de empleados
let continuar = true;
while (continuar) {
    const empleado = ingresarEmpleado();
    if (empleado) {
        empleados.push(empleado);
    }
    continuar = confirm("¿Desea ingresar otro empleado?");
}

// Mostrar las opciones disponibles para el usuario
let opcion;
do {
    opcion = mostrarOpciones();

    if (opcion >= 1 && opcion <= empleados.length) {
        const indiceSeleccionado = parseInt(opcion) - 1;
        consultarEmpleado(empleados[indiceSeleccionado]);
    } else if (opcion == empleados.length + 1) {
        consultarTodosLosEmpleados();
    } else if (opcion == empleados.length + 2) {
        alert("Terminando la consulta.");
    } else if (opcion !== null) {
        alert("Opción inválida. Por favor, elige una opción de la lista.");
    }

} while (opcion != empleados.length + 2);

// Mostrar todos los resultados guardados al final
console.log("\nTodos los resultados guardados:");
console.log(resultados);