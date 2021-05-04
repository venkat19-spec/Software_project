const  x = require("../app");

const request = require("supertest");



describe("GET / ", () =>{
    test("It should respond with facultydashboard", async() => {
        const response = await request(x.app).get("/facultydashboard");
        expect(response.statusCode).toBe(200);
    });

});



describe("GET / ", () =>{
    test("It should respond with changepassword", async() => {
        const response = await request(x.app).get("/changepassword");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with checkattendence", async() => {
        const response = await request(x.app).get("/checkattendence");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with takeattendence", async() => {
        const response = await request(x.app).get("/takeattendence");
        expect(response.statusCode).toBe(200);
    });

});


describe("GET / ", () =>{
    test("It should respond with admindash", async() => {
        const response = await request(x.app).get("/admindash");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with factosubject", async() => {
        const response = await request(x.app).get("/factosubject");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with forgot", async() => {
        const response = await request(x.app).get("/forgot");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with logout", async() => {
        const response = await request(x.app).get("/logout");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with reset", async() => {
        const response = await request(x.app).get("/reset");
        expect(response.statusCode).toBe(200);
    });

});

describe("GET / ", () =>{
    test("It should respond with newfac", async() => {
        const response = await request(x.app).get("/newfac");
        expect(response.statusCode).toBe(200);
    });

});