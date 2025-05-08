let cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2018 },
    { id: 2, brand: 'Hyundai', model: 'Tucson', year: 2008 }
];

exports.getAllCars = (req, res) => {
    res.json(cars);
};

exports.getCarById = (req, res) => {
    const { id } = req.params;
    const car = cars.find(c => c.id == id);
    if (car) {
        res.json(car);
    } else {
        res.status(404).send('Carro não encontrado');
    }
};

exports.createCar = (req, res) => {
    const { brand, model, year } = req.body;
    const newCar = { id: cars.length + 1, brand, model, year };
    cars.push(newCar);
    res.status(201).json(newCar);
};

exports.updateCar = (req, res) => {
    const { id } = req.params;
    const { brand, model, year } = req.body;
    let car = cars.find(c => c.id == id);
    if (car) {
        car.brand = brand;
        car.model = model;
        car.year = year;
        res.status(200).json(car);
    } else {
        res.status(404).send('Carro não encontrado');
    }
};

exports.deleteCar = (req, res) => {
    const { id } = req.params;
    const carIndex = cars.findIndex(c => c.id == id);
    if (carIndex >= 0) {
        cars.splice(carIndex, 1);
        res.status(200).send();
    } else {
        res.status(404).send('Carro não encontrado');
    }
};