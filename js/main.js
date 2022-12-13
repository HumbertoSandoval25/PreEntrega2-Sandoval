//Creamos un array vacio para el carrito de compras
const carrito = [];

const mostrarLista = () => {
    const lista = combos.map((combo) => {
        return '-' + combo.nombre+ ' $'+combo.precio
    });
    alert('Lista de combos'+'\n\n'+lista.join('\n')+'Tu combo ya incluye una bebida y un acompañante')

    const listaBebidas = bebidas.map((bebida) => {
        return '-' + bebida.nombre
    });

    const listaAcompañantes = acompañantes.map((acompañante) => {
        return '-' + acompañante.nombre
    });
    comprarProductos(lista,listaBebidas,listaAcompañantes);
}

const comprarProductos = (lista,listaBebidas,listaAcompañantes) => {
    let seguirComprando;
    let comboNombre = '';
    let comboCantidad = 0;
    let bebidaNombre = '';
    let acompañanteNombre = '';

    do {    
        comboNombre = prompt('Que combo deseas comprar'+ '\n\n'+ lista.join('\n'));
        comboCantidad = parseInt(prompt('Cuantos deseas comprar?'));
        bebidaNombre = prompt('Con que bebida deseas acompañar tu combo'+'\n\n'+listaBebidas.join('\n'));
        acompañanteNombre = prompt('Con que te gustaria acompañar tu combo: '+'\n\n'+listaAcompañantes.join('\n'));

        const combo = combos.find(c => c.nombre.toLowerCase() === comboNombre.toLowerCase());
        const bebida = bebidas.find(b => b.nombre.toLowerCase() === bebidaNombre.toLowerCase());
        const acompañante = acompañantes.find(a => a.nombre.toLowerCase() === acompañanteNombre.toLowerCase());

        if(combo && bebida && acompañante){
            agregarAlCarrito(combo,bebida,acompañante,comboCantidad,combo.id)
        }else{
            alert('El producto no se encuentra en el catalogo')
        }

        seguirComprando = confirm('Desea agregar otro producto')
    } while (seguirComprando);

    confirmarCompra()

}

const agregarAlCarrito = (combo,bebida,acompañante,comboCantidad,comboId) => {
    const comboRepetido = carrito.find(combo => combo.id === comboId);
    if(comboRepetido){
        comboRepetido.cantidad += comboCantidad
    }else{
        combo.cantidad += comboCantidad
        carrito.push(combo,bebida,acompañante);
    }
    console.log(carrito);
};

const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto,index) => {
        if(producto.nombre.toLowerCase() === productoNombre.toLowerCase()){
            producto.cantidad--
        }else{
            carrito.splice(index,1)
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+ producto.cantidad
    });
    const confirmar = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar precione "Aceptar" sino "Cancelar" para eliminar productos del carrito'
    );
    if(confirmar){
        finalizarCompra(listaProductos)
    }else{
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar');
        eliminarProductoCarrito(productoAEliminar)
    }
};

const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acumulador, elemento) => acumulador + elemento.cantidad,0);
    const precioTotal = carrito.reduce((acumulador,elemento) => acumulador + (elemento.precio * elemento.cantidad),0);
    alert('Detalle de tu compra:'
    +'\n\n'+listaProductos.join('\n')
    +'\n\nTotal de productos: '+cantidadTotal
    +'\n\nEl total de la compra es: '+precioTotal
    +'\n\nGracias por su compra!'
    )
};


mostrarLista();