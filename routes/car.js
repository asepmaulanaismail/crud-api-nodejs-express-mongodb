/**
 * Car
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author		:: Asep Maulana Ismail
 */

var Car = require('../models/car.js');

module.exports = function(app) {


  /**
   * Find and retrieves all cars
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllCars = function(req, res) {
    console.log("GET - /cars");
    return Car.find(function(err, cars) {
      if(!err) {
        return res.send(cars);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single car by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /car/:id");
    return Car.findById(req.params.id, function(err, car) {

      if(!car) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', car:car });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new car from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addCar = function(req, res) {

    console.log('POST - /car');

    var car = new Car({
      model:    req.body.model,
      style:    req.body.style,
      size :    req.body.size,
      color:    req.body.color,
      price:    req.body.price
    });

    car.save(function(err) {

      if(err) {

        console.log('Error while saving car: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Car created");
        return res.send({ status: 'OK', car:car });

      }

    });

  };



  /**
   * Update a car by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateCar = function(req, res) {

    console.log("PUT - /car/:id");
    return Car.findById(req.params.id, function(err, car) {

      if(!car) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.model != null) car.model = req.body.model;
      if (req.body.price != null) car.price = req.body.price;
      if (req.body.style != null) car.style = req.body.style;
      if (req.body.size != null) car.size  = req.body.size;
      if (req.body.colour != null) car.color = req.body.color;

      return car.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', car:car });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(car);

      });
    });
  };



  /**
   * Delete a car by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteCar = function(req, res) {

    console.log("DELETE - /car/:id");
    return Car.findById(req.params.id, function(err, car) {
      if(!car) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return car.remove(function(err) {
        if(!err) {
          console.log('Removed car');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/car', findAllCars);
  app.get('/car/:id', findById);
  app.post('/car', addCar);
  app.put('/car/:id', updateCar);
  app.delete('/car/:id', deleteCar);

}