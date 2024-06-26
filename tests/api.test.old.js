const app = require('../server.js')
const request = require('supertest')
const sinon = require('sinon');
const Product = require( '../models/Product.js');
const ProductController = require ('../controllers/productController.js')

let server;

beforeAll((done) => {
    server = app.listen(5000, () => {
        console.log('Test server running on port 5000');
        done();
    });
});



describe('API Tests', () => {

  let productId

  it('should create a new product', async () => {
    const response = await request(app)
        .post('/product')
        .send({
            createdAt: new Date(),
            name: 'Test Product',
            details: {
                price: '100',
                description: 'A test product',
                color: 'Red'
            },
            stock: 10
        });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Product');
    productId = response.body._id;
});

it('should get a product by ID', async () => {
    const response = await request(app).get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Product');
});

it('should get all products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});

it('should update a product', async () => {
    const response = await request(app)
        .put(`/products/${productId}`)
        .send({
            name: 'Updated Test Product',
            details: {
                price: '200',
                description: 'An updated test product',
                color: 'Blue'
            },
            stock: 5
        });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Test Product');
});

it('should delete a product', async () => {
    const response = await request(app).delete(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Produit supprimé avec succès.');
});



    // it('GET /product - should return all products', async () => {
    //     const response = await request(server).get('/products');
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);
    // });

    // it('POST /products - should create a new customers', async () => {
    //     const req = {
    //         body:{
    //             createdAt: "2023-03-15T13:45:00.000Z",
    //             name: "Example Product",
    //             details: {
    //               price: 19.99,
    //               description: "This is an example product.",
    //               color: "Red"
    //             },
    //             stock: 100
    //           }
           
    //     };


    // const saveStub = sinon.stub(Product.prototype, 'save').resolves(req.body);

    //   // Mock de l'objet de réponse
    //   const res = { 
    //     status: jest.fn(() => res), 
    //     json: jest.fn(data => data)
    //   };

    //   // Appel de la méthode createCustomer
    //   await ProductController.createProduct(req, res);

    //   console.log(res.json)
    //   console.log("------------fi json--------------")
    //   console.log(req.body)

    //   // Assertions
    //   expect(res.status).toHaveBeenCalledWith(201);
    //   expect(res.json).toHaveBeenCalledWith(expect.objectContaining(
    //     {
    //         _id: "Azert",
    //         name: "azerty",
    //         details:{
    //           price: "12",
    //           description: "passer",
    //           color: "passer",
    //         },
    //         stock: 12,
    //       }
    //   ));

    //   // Restauration du stub
    //   saveStub.restore();





        
        // const response = await request(server).post('/customers').send(newCustomer);
        // expect(response.statusCode).toBe(201);
        // expect(response.body).toMatchObject(newCustomer);
    });

    afterAll((done) => {
      server.close(() => {
          console.log('Test server closed');
          done();
      });
    });
