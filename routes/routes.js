import Express from 'express';
const routes = Express.Router();
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

routes.get('/deportes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/data/deportes.json'));
});

routes.get('/agregar', (req, res) => {
    const { nombre, precio } = req.query;
    const deportesData = fs.readFileSync("./public/data/deportes.json");
    const { deportes } = JSON.parse(deportesData);
    const ultimoId = deportes.length > 0 ? deportes[deportes.length - 1].id : 0;
    const nuevoId = ultimoId + 1;
    deportes.push({ id: nuevoId, nombre, precio });
    fs.writeFileSync('./public/data/deportes.json', JSON.stringify({ deportes }));
    res.send(`Deporte agregado con ID ${nuevoId}`);
});

routes.get('/eliminar', (req, res) => {
    const id = parseInt(req.query.id);
    const deportesData = fs.readFileSync("./public/data/deportes.json");
    const { deportes } = JSON.parse(deportesData);
    const nuevosDeportes = deportes.filter((deporte) => deporte.id !== id);
    fs.writeFileSync('./public/data/deportes.json', JSON.stringify({ deportes: nuevosDeportes }));
    res.send(`Deporte eliminado con ID ${id}`);
});
 
routes.put('/editar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio } = req.body;
    const deportesData = fs.readFileSync("./public/data/deportes.json");
    let { deportes } = JSON.parse(deportesData);
    deportes = deportes.map(deporte => {
        if (deporte.id === id) {
            deporte.nombre = nombre;
            deporte.precio = precio;
        }
        return deporte;
    });
    fs.writeFileSync('./public/data/deportes.json', JSON.stringify({ deportes }));
    res.send(`Deporte editado con ID ${id}`);
});

export default routes;