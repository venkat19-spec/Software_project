const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
const bcrypt = require('bcrypt');
const saltRounds = 10;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData_fac() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM faculty_enroll;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData_attend(Semester) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM attend Where Semester = ? ;";

                connection.query(query,[Semester], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData_check(Semester) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT Rollno,Name,no_attended,total_no FROM attendence_database Where Semester = ? ;";

                connection.query(query,[Semester], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData_pass(username,password) {
       const  pass = bcrypt.hashSync(password, saltRounds);
       console.log(pass)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT password FROM admin_password Where username = ? ;";

                connection.query(query,[username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            var orpass='';
            response.forEach(function ({password}){
                orpass=password
            });
            console.log(password)
            var success=bcrypt.compareSync(password, orpass);
            return {success:success}
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData_pass_student(username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT password FROM admin_password Where username = ? ;";

                connection.query(query,[username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData_change(username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT password FROM admin_password Where username = ? ;";

                connection.query(query,[username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewName(name,rollno,subject) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, rollno,subject) VALUES (?,?,?);";

                connection.query(query, [name,rollno,subject] , (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                rollno: rollno,
                subject:subject
            };
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewName_fac(name, subject, department, semester, clas) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO faculty_enroll (name, subject, department, semester, clas) VALUES (?,?,?,?,?);";

                connection.query(query, [name, subject, department, semester, clas] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                subject:subject,
                department:department,
                semester:semester,
                clas:clas
            };
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewName_newuser(name, rollno, department, clas, email, password) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (name, rollno, department, clas, email, password) VALUES (?,?,?,?,?,?);";

                connection.query(query, [name, rollno, department, clas, email, password] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewName_newfac_id(facName, fac_id, facdept, facemail, password,facsub) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO faculty (fac_id, facName,facdept, facemail, password,facsub) VALUES (?,?,?,?,?,?);";

                connection.query(query, [facName, fac_id, facdept, facemail, password,facsub] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    async insert(username) {
        username=5;
        return {
            true:true
        }
    }
    async enrolluser(username,password){
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO password (username, password) VALUES (?,?);";

                connection.query(query, [username, password] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteRowById_fac(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM faculty_enroll WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateNameById_fac(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE faculty_enroll SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateNameById_attend() {
        try { 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE attendence_database SET total_no = total_no + 1";
    
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateNameById_take(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE attendence_database SET no_attended = no_attended+1 WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateNameById_password(pass,username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE admin_password SET password = ? WHERE username = ?";
    
                connection.query(query, [pass,username] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async searchByName_fac(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM faculty_enroll WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = DbService;