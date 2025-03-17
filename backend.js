const express = require('express')
const mysql = require('mysql')
var cors = require('cors')
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
const nodemailer = require('nodemailer')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
require('dotenv').config();



const SECRET_KEY = process.env.SECRET_KEY;

var connection
function kapcsolat(){
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'esemenyek'
      })
      connection.connect()
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})





// Nodemailer beállítások az email küldéshez
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Email szolgáltató
  auth: {
    user: 'magyarorszagesemenyei@gmail.com', // Küldő email cím
    pass: 'magyarorszagesemenyei123'   // Küldő email jelszó
  }
});

// Endpont, amely az emailt küldi
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Ellenőrizzük, hogy az email cím helyes-e
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email cím megadása kötelező.' });
  }

  // Email küldése
  const mailOptions = {
    from: 'magyarorszagesemenyei@gmail.com',
    to: email,
    subject: 'Magyarország eseményei',
    text: 'Köszönjük hogy feliratkoztál a hírlevelünkre!'
  };

  // Email küldése a Nodemailer segítségével
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Nem sikerült elküldeni az emailt.' });
    }

  });
});









//regisztrált felhasználók
app.get('/megjelenitEsemeny', (req, res) => {
    kapcsolat()
    connection.query('SELECT esemeny.id,nev,datum,vnev from esemeny inner join varos on esemeny.helyszin = varos.id', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
  })

// admin bejelentkezes
app.post('/adminBejelentkezes', (req, res) => {
  kapcsolat();

  // Ellenőrizd, hogy a bemeneti mezők nem üresek
  const admin_felhasznalonev = req.body.admin_felhasznalonev;
  const admin_jelszo = req.body.admin_jelszo;

  if (!admin_felhasznalonev || !admin_jelszo) {
    return res.status(400).send("Kérlek, add meg mindkét mezőt!");
  }

  let parameterek = [admin_felhasznalonev, admin_jelszo];

  connection.query('SELECT * from admin where admin_felhasznalonev like binary ? and admin_jelszo like binary ?', parameterek, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba történt a bejelentkezés során.");
    } else {
      if (rows.length > 0) {
        const admin = rows[0];
        console.log("Sikeres bejelentkezés");

        // jwt token csinálás
        const token = jwt.sign(
          { admin_felhasznalonev: admin.admin_felhasznalonev },
          SECRET_KEY,
          { expiresIn: '1h' }
        );

        // token visszaadása
        res.status(200).json({ message: "Sikeres bejelentkezés!", token });
      } else {
        res.status(401).send("Hibás felhasználónév vagy jelszó");
      }
    }
  });

  connection.end();
});






  app.get('/varosnevek', (req, res) => {
    kapcsolat()
    connection.query('SELECT vnev from varos order by vnev', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })


  app.get('/kepek', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from kepek', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })



  app.get('/esemenytipusok', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from tipus', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })

  app.post('/kapcsolatfelvitel', (req, res) => {
    kapcsolat()
    connection.query(`
      INSERT INTO kapcsolat VALUES (NULL, ?,?,?,?,0 );
      
      `, [req.body.bevitel1, req.body.bevitel2 , req.body.bevitel3, req.body.datum], (err, rows, fields) => {
      if (err) {
        console.log("Hiba")
        console.log(err)
        res.status(500).send("Hiba")
      }
      else {
        console.log("Sikeres felvitel!")
        res.status(200).send("Sikeres felvitel!")
      }
    })
    connection.end()
  })

  //---------------------------------------------------------
  app.get('/admin', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from admin', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })

  //-----------------------------

  app.get('/visszajelzesek', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from kapcsolat', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })

//-------------------------------------
  app.delete('/visszajelzestorles', (req, res) => {
    kapcsolat()
    connection.query('DELETE FROM kapcsolat WHERE kapcsolat_id=?',[req.body.bevitel1],(err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send("Sikeres")
        }
      })
      connection.end()
      
  })

  //----------------------------------------------
  app.post('/elfogadvauzenetek', (req, res) => {
    kapcsolat()
    connection.query(`
      update kapcsolat set uzenet_elfogadva=1 where kapcsolat_id =?
      
      `, [req.body.bevitel1], (err, rows, fields) => {
      if (err) {
        console.log("Hiba")
        console.log(err)
        res.status(500).send("Hiba")
      }
      else {
        console.log("Sikeres")
        res.status(200).send("Sikeres")
      }
    })
    connection.end()
  })
  //-----------------------------------------------------
  //elfogadva uzenetek megjelenitese
  app.get('/elfogadvamegjelenitve', (req, res) => {
    kapcsolat()
    connection.query('SELECT nev,email,uzenet,datum from kapcsolat where uzenet_elfogadva=1 ', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })

    //elfogadva uzenetek megjelenitese fooldalon
    app.get('/elfogadvamegjelenitvefooldalon', (req, res) => {
      kapcsolat()
      connection.query('SELECT nev,email,uzenet,datum from kapcsolat where kapcsolat_id<4 ', (err, rows, fields) => {
          if (err) {
              console.log(err)
              res.status(500).send("Hiba")
          }
          else{
              console.log(rows)
              res.status(200).send(rows)
          }
        })
        connection.end()
        
    })

  //összes adat
  app.get('/adatokLista', (req, res) => {
    kapcsolat()
    connection.query('SELECT esemeny.id,nev,datum,leiras,vnev,helyszin_nev,tipus_nev from esemeny inner join helyszin on esemeny.id = esemenyid inner join varos on varos.id = esemeny.varosid inner join tipus on tipus_id=esemeny.tipusid order by vnev,datum_kezdet ', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })


  app.get('/szures/:kereses', (req, res) => {
    kapcsolat()
    connection.query(`SELECT esemeny.id,nev,datum,leiras,vnev,helyszin_nev,tipus_nev from esemeny inner join helyszin on esemeny.id = esemenyid inner join varos on varos.id = esemeny.varosid inner join tipus on tipus_id=esemeny.tipusid where vnev="${req.params.kereses}" order by datum_kezdet`, (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
        res.send(rows)
  })
  connection.end()
  })


  
  app.get('/szurestipus/:kereses', (req, res) => {
    kapcsolat()
    connection.query(`SELECT esemeny.id,nev,datum,leiras,vnev,helyszin_nev,tipus_nev from esemeny inner join helyszin on esemeny.id = esemenyid inner join varos on varos.id = esemeny.varosid inner join tipus on tipus_id=esemeny.tipusid where tipus_nev="${req.params.kereses}" order by vnev,datum_kezdet `, (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
        res.send(rows)
  })
  connection.end()
  })


  //input a varosok keresesehez
  app.get('/keresek/:kereses', (req, res) => {
    kapcsolat()
    connection.query(`SELECT esemeny.id,nev,datum,leiras,vnev,helyszin_nev,tipus_nev from esemeny inner join helyszin on esemeny.id = esemenyid inner join varos on varos.id = esemeny.varosid inner join tipus on tipus_id=esemeny.tipusid where vnev like"%${req.params.kereses}%" or tipus_nev like "%${req.params.kereses}%" or nev like "%${req.params.kereses}%"`, (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
        res.send(rows)
  })
connection.end()
})




//elfogadva uzenetek
  app.get('/megjelenituzenetek', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from elfogadva', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })

  //----------------------------------
  app.get('/varosokkulon', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from esemeny inner join varos on varos.id=esemeny.varosid where vnev=?',[req.body.bevitel1], (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
      
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})