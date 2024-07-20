import pool from "../db/dbConfig.js";
class User{
    constructor(id,username,email,password){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    create(){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql = "insert into users(username,email,password) values(?,?,?)";
              con.query(sql,[this.username,this.email,this.password],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              })
            }
            else
              reject(err);
        })
      });
    }

    static findOne(email,password){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select * from users where email = ? and password = ?";
              con.query(sql,[email,password],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else reject(err);

          });
      });
    }
    //==============my implimentaion============
    static Update(id,username,email,password){
       return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          // console.log("Conencted ");
          if(!err){
            let sql= "UPDATE users SET username=?,email=?,password=? WHERE user_id=?";
            con.query(sql,[username,email,password,id],(err,result)=>{
              err ? reject(err) : resolve(result);
                con.release();
            });
          }
          else{
            console.log("me yha atak gya ");
           return reject(err);
          }
        });         
       });   
    }

    static Delete(id){
      return new  Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
      // console.log("kya error h");
      if(err){
        console.log("kya error h");
           reject(err);
      }
      else
      {
        let sql= "DELETE from users WHERE user_id=?"
        con.query(sql,[id],(err,result)=>{
          err ? reject(err):resolve(result);
        con.release();
        })
      };
      });
      // else{
      //   console.log("data not deleted");
      //   return reject(err);
      // }
      // });
      });

    }

}

export default User;