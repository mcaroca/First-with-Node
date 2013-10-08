First-with-Node
===============

Node + Express + Jade

Uso de Socket.io con el framework Express y Jade.

A partir de una vista inicial (/index, se accede a ella como localhost:3000) se agregan productos a una lista que es almacenada en el servidor, 
y desde la vista "comprador" (comprador en /views, se accede a ella como localhost:3000/comprador) se pueden visualizar en tiempo real los agregados y los que van agregando por medio de Sockets.

Para ejecutar el servidor:
$node app (en la carpeta)

Previamente debe instalar los módulos respectivos utilizados
$npm express 
$npm socket.io
