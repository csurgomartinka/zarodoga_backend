const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
const bcrypt = require('bcryptjs');
const sendgrid = require('@sendgrid/mail');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

sendgrid.setApiKey('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');

app.post('/send-email', async (req, res) => {
  const { email, resetCode } = req.body;

  const message = {
    to: email,
    from: 'magyaresemenyek@gmail.com',
    subject: 'Jelszó visszaállító kód',
    text: `A jelszó visszaállításához a kód: ${resetCode}`,
    html: `<p>A jelszó visszaállításához a kód: <strong>${resetCode}</strong></p>`,
  };

  try {
    await sendgrid.send(message);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email' });
  }
});

const Host = 'localhost'
const User = 'root'
const Password = ''
const Database = 'esemenyek'

// Kapcsolat-pool létrehozása
const pool = mysql.createPool({
  host: Host,
  user: User,
  password: Password,
  database: Database,
  connectionLimit: 10,  // A maximális kapcsolatok száma a poolban
});


var connection
function kapcsolat(){
    connection = mysql.createConnection({
      host: Host,
      user: User,
      password: Password,
      database: Database,
      })
      connection.connect()
}

// A pool-t használó kapcsolat helyett közvetlenül használhatjuk a pool-t
// Ez egy aszinkron query példát használva biztosítja, hogy több kapcsolat is párhuzamosan működhet.
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Események megjelenítése
app.get('/megjelenitEsemeny', (req, res) => {
  pool.query('SELECT esemeny.id, nev, datum, vnev from esemeny inner join varos on esemeny.varosid = varos.id', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});

// Városok listázása
app.get('/varosLista', (req, res) => {
  pool.query('SELECT * from varos order by vnev', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});

//Típusok listázása
app.get('/tipusLista', (req, res) => {
  pool.query('SELECT * from tipus', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});

//Város felvitel
app.post('/varosFelvitel', (req, res) => {
  const { vnev} = req.body;

  // Ellenőrzés, hogy minden mezőt megkaptunk-e
  if (!vnev) {
    console.log('Hiányzó mező:', { vnev });
    return res.status(400).send("Minden mezőt ki kell tölteni");
  }

  const sql = 'INSERT INTO varos (vnev) VALUES (?)';

  pool.query(sql, [vnev], (err, results) => {
    if (err) {
      console.error("Hiba történt az SQL végrehajtásakor:", err);
      return res.status(500).send("Hiba történt a szerver oldalon");
    }
    res.send("A város felvitele sikerült");
  });
});

// Események listázása
app.get('/esemenyLista', (req, res) => {
  pool.query('SELECT * from esemeny', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});


// Érdekelt események listázása
app.get('/erdekeltLista', (req, res) => {
  pool.query('SELECT * from erdekelt_esemeny', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});

//események információinak megjelenítése
app.get('/adatokListaM', (req, res) => {
  pool.query('SELECT esemeny.id,nev,datum,leiras,vnev,helyszin_nev,reszletek,datum_kezdet from esemeny inner join helyszin on esemeny.id = esemenyid inner join varos on varos.id = esemeny.varosid order by datum_kezdet', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});


app.get('/kapcsolatLista', (req, res) => {
  pool.query('SELECT * from kapcsolat', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});


app.get('/felhasznaloLista', (req, res) => {
  pool.query('SELECT * from felhasznalo', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});


app.get('/emailKereses', (req, res) => {
  const { userId } = req.query;

  pool.query('SELECT email from felhasznalo where id = ?', [userId], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      if (rows.length > 0) {
        res.status(200).send({ email: rows[0].email });
      } else {
        res.status(404).send("Felhasználó nem található");
      }
    }
  });
});

// Események keresése név szerint
app.get('/esemenyKereses', (req, res) => {
  const { query } = req.query; // A query paraméter kinyerése a URL-ből
  if (!query) {
    return res.status(400).send("Nincs keresési paraméter");
  }

  // A keresési paraméter biztonságos hozzáadása az SQL lekérdezéshez
  pool.query(
    `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev, reszletek, datum_kezdet, datum_veg
     FROM esemeny 
     INNER JOIN helyszin ON esemeny.id = esemenyid 
     INNER JOIN varos ON varos.id = esemeny.varosid 
     WHERE nev LIKE ? ORDER BY nev`,
    [`%${query}%`],  // A query paramétert biztonságosan adhatjuk át
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Hiba történt a lekérdezés végrehajtása közben.");
      } else {
        console.log(rows);
        res.status(200).json(rows);  // A találatokat JSON formátumban küldjük vissza
      }
    }
  );
});

// esemény keresése város szerint
app.get('/varosSzerintKereses', (req, res) => {
  const { value } = req.query; // A query paraméter kinyerése

  if (!value) {
      return res.status(400).send("Nincs kiválasztott érték");
  }

  pool.query(
      `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev, reszletek, datum_kezdet, datum_veg
      FROM esemeny 
      INNER JOIN helyszin ON esemeny.id = esemenyid 
      INNER JOIN varos ON varos.id = esemeny.varosid 
      WHERE vnev = ? ORDER BY datum_kezdet;`, 
      [value], // Biztonságosan átadjuk a 'value' paramétert
      (err, rows) => {
          if (err) {
              console.log(err);
              return res.status(500).send("Hiba történt a lekérdezés végrehajtása közben.");
          }
          res.status(200).json(rows);  // Az adatokat JSON formátumban küldjük vissza
      }
  );
});

//típus szerinti keresés
app.get('/tipusSzerintKereses', (req, res) => {
  const { value } = req.query; // A query paraméter kinyerése

  if (!value) {
      return res.status(400).send("Nincs kiválasztott érték");
  }

  pool.query(
      `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev, tipus_nev, reszletek, datum_kezdet, datum_veg
      FROM esemeny 
      INNER JOIN helyszin ON esemeny.id = esemenyid 
      INNER JOIN varos ON varos.id = esemeny.varosid
      INNER JOIN tipus ON tipus_id = esemeny.tipusid
      WHERE tipus_nev = ? ORDER BY datum_kezdet;`, 
      [value], // Biztonságosan átadjuk a 'value' paramétert
      (err, rows) => {
          if (err) {
              console.log(err);
              return res.status(500).send("Hiba történt a lekérdezés végrehajtása közben.");
          }
          res.status(200).json(rows);  // Az adatokat JSON formátumban küldjük vissza
      }
  );
});

//közös keresés
app.get('/kozosKereses', (req, res) => {
  const { tipus, varos } = req.query; // A query paraméter kinyerése

  if (!tipus || !varos) {
      return res.status(400).send("Nincs kiválasztott érték");
  }

  pool.query(
      `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev, tipus_nev, reszletek, datum_kezdet, datum_veg
      FROM esemeny 
      INNER JOIN helyszin ON esemeny.id = esemenyid 
      INNER JOIN varos ON varos.id = esemeny.varosid
      INNER JOIN tipus ON tipus_id = esemeny.tipusid
      WHERE tipus_nev = ? AND vnev = ? ORDER BY nev;`, 
      [tipus,varos], // Biztonságosan átadjuk a 'value' paramétert
      (err, rows) => {
          if (err) {
              console.log(err);
              return res.status(500).send("Hiba történt a lekérdezés végrehajtása közben.");
          }
          res.status(200).json(rows);  // Az adatokat JSON formátumban küldjük vissza
      }
  );
});

//esemeny utolsó idja
app.get('/esemenyUtolsoID', (req, res) => {
  pool.query('SELECT id FROM esemeny ORDER BY id DESC LIMIT 1;', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
    }
  });
});

// Esemény felvitele
app.post('/esemenyFelvitel', (req, res) => {
    const { nev, datum, varosid, tipusid, leiras, reszletek, datum_kezdet, datum_veg } = req.body;
    console.log('Kapott adatok:', {nev, datum,varosid, tipusid, leiras, reszletek, datum_kezdet, datum_veg})
    // Ellenőrzés, hogy minden mezőt megkaptunk-e
    if (!nev || !datum || !varosid || !tipusid || !leiras || !reszletek || !datum_kezdet || !datum_veg) {
      console.log('Hiányzó mező(k):', { nev, datum, varosid, tipusid, leiras, reszletek, datum_kezdet, datum_veg});
      return res.status(400).send("Minden mezőt ki kell tölteni");
    }
  
    const sql = 'INSERT INTO esemeny (nev, datum, varosid, tipusid, leiras, reszletek, datum_kezdet, datum_veg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    pool.query(sql, [nev, datum, varosid, tipusid, leiras, reszletek, datum_kezdet, datum_veg], (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("Az esemény felvitele sikerült");
    });
  });
  
  app.delete('/esemenyTorles', (req, res) => {
    const sql = 'DELETE FROM esemeny';  // Ez törli az összes rekordot az esemeny táblából
    
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("Az események sikeresen törlésre kerültek");
    });
  });

  app.post('/helyszinFelvitel', (req, res) => {
    const { helyszin_nev,varosid,esemenyid} = req.body;
  
    // Ellenőrzés, hogy minden mezőt megkaptunk-e
    if (!helyszin_nev || !varosid || !esemenyid) {
      console.log('Hiányzó mező(k):', { helyszin_nev,varosid,esemenyid });
      return res.status(400).send("Minden mezőt ki kell tölteni");
    }
  
    const sql = 'INSERT INTO helyszin (helyszin_nev,varosid,esemenyid) VALUES (?,?,?)';
  
    pool.query(sql, [helyszin_nev, varosid, esemenyid], (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("A helyszin felvitele sikerült");
    });
  });

  app.delete('/helyszinTorles', (req, res) => {
    const sql = 'DELETE FROM helyszin';  // Ez törli az összes rekordot a helyszin táblából
    
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("Az események sikeresen törlésre kerültek");
    });
  });

  //város törlés
  app.delete('/varosTorles', (req, res) => {
    const sql = 'DELETE FROM varos';  
    
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("A városok sikeresen törlésre kerültek");
    });
  });

  app.delete('/erdekeltEsemenyTorles', (req, res) => {
    const { felhasznaloid, esemeny_nev } = req.body;
    if (!felhasznaloid || !esemeny_nev) {
        return res.status(400).send('Hibás paraméterek!');
    }

    const sql = 'DELETE FROM erdekelt_esemeny WHERE felhasznaloid = ? AND esemeny_nev = ?';
    pool.query(sql, [felhasznaloid, esemeny_nev], (err, results) => {
        if (err) {
            console.error("Hiba történt az SQL végrehajtásakor:", err);
            return res.status(500).send("Hiba történt a szerver oldalon");
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).send('Nincs törölhető adat!');
        }

        res.send("Az érdekelt esemény sikeresen törlésre került");
    });
});




//Egy esemény törlése
app.delete('/egyEsemenyTorles', (req, res) => {
  const { id } = req.body; // Esemény ID lekérése

  if (!id) {
    return res.status(400).send("Hiányzó esemény ID.");
  }

  const deleteHelyszinSQL = 'DELETE FROM helyszin WHERE esemenyid = ?';
  const deleteEsemenySQL = 'DELETE FROM esemeny WHERE id = ?';

  // Először töröljük a helyszínt, majd az eseményt
  pool.query(deleteHelyszinSQL, [id], (err, results) => {
    if (err) {
      console.error("Hiba történt a helyszín törlésekor:", err);
      return res.status(500).send("Hiba történt a helyszín törlésekor.");
    }

    pool.query(deleteEsemenySQL, [id], (err, results) => {
      if (err) {
        console.error("Hiba történt az esemény törlésekor:", err);
        return res.status(500).send("Hiba történt az esemény törlésekor.");
      }

      if (results.affectedRows === 0) {
        return res.status(404).send("Nem található ilyen esemény.");
      }

      res.send("Az esemény és a hozzátartozó helyszín sikeresen törlésre került.");
    });
  });
});



  //A táblák idjának lenullázása
  app.post('/resetAutoIncrement', (req, res) => {
    const sqlVaros = 'ALTER TABLE varos AUTO_INCREMENT = 1';
    const sqlEsemény = 'ALTER TABLE esemeny AUTO_INCREMENT = 1';
    const sqlHelyszin = 'ALTER TABLE helyszin AUTO_INCREMENT = 1';

    pool.query(sqlVaros, (err, results) => {
        if (err) {
            console.error("Hiba történt az auto_increment visszaállításakor (varos):", err);
            return res.status(500).send("Hiba történt az auto_increment visszaállításakor (varos)");
        }
    });
    pool.query(sqlEsemény, (err, results) => {
        if (err) {
            console.error("Hiba történt az auto_increment visszaállításakor (esemeny):", err);
            return res.status(500).send("Hiba történt az auto_increment visszaállításakor (esemeny)");
        }
    });
    pool.query(sqlHelyszin, (err, results) => {
        if (err) {
            console.error("Hiba történt az auto_increment visszaállításakor (helyszin):", err);
            return res.status(500).send("Hiba történt az auto_increment visszaállításakor (helyszin)");
        }
    });

    res.send("Auto-increment sikeresen visszaállítva");
});



// Regisztráció végpont
app.post('/register', async (req, res) => {
  const { email, password, jogosultsag } = req.body;

  // Ellenőrizd, hogy mindkét mező meg van adva
  if (!email || !password || !jogosultsag) {
    return res.status(400).json("Minden mezőt ki kell tölteni.");
  }

  try {
    // Ellenőrizzük, hogy a felhasználó már létezik-e
    pool.query('SELECT * FROM felhasznalo WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json("Hiba történt a felhasználó keresése közben.");
      }
      if (results.length > 0) {
        return res.status(400).json("Ez az e-mail cím már regisztrálva van.");
      }

      // Generálunk egy salt-ot a jelszó hasheléséhez
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // A felhasználó adatainak mentése az adatbázisba
      const sql = 'INSERT INTO felhasznalo (email, password, jogosultsag) VALUES (?, ?, ?)';
      pool.query(sql, [email, hashedPassword, jogosultsag], (err, results) => {
        if (err) {
          return res.status(500).json("Hiba történt a felhasználó regisztrálása közben.");
        }
        res.status(201).json("Felhasználó sikeresen regisztrálva.");
      });
    });
  } catch (error) {
    console.error("Hiba a regisztráció során:", error);
    res.status(500).json("Belső hiba történt.");
  }
});



// Bejelentkezés végpont
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Minden mezőt ki kell tölteni.");
  }

  pool.query('SELECT * FROM felhasznalo WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json("Hiba történt a felhasználó keresése közben.");
    }

    if (results.length === 0) {
      return res.status(400).json("Felhasználó nem található.");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Hibás jelszó.");
    }

    // Küldjük vissza az ID-t és a jogosultságot
    res.status(200).json({
      id: user.id,
      jogosultsag: user.jogosultsag,
      email: user.email
    });
  });
});




app.post('/ErdekeltFelvitel', (req, res) => {
  const { felhasznaloid, esemeny_nev, esemeny_datum} = req.body;

  // Ellenőrzés, hogy minden mezőt megkaptunk-e
  if (!felhasznaloid || !esemeny_nev || !esemeny_datum) {
    console.log('Hiányzó mező(k):', { felhasznaloid, esemeny_nev, esemeny_datum});
    return res.status(400).send("Minden mezőt ki kell tölteni");
  }

  const sql = 'INSERT INTO erdekelt_esemeny (felhasznaloid, esemeny_nev, esemeny_datum, torolt) VALUES (?,?,?,0)';

  pool.query(sql, [felhasznaloid, esemeny_nev, esemeny_datum], (err, results) => {
    if (err) {
      console.error("Hiba történt az SQL végrehajtásakor:", err);
      return res.status(500).send("Hiba történt a szerver oldalon");
    }
    res.send("Az érdekelt esemény felvitele sikerült");
  });
});



app.post('/kapcsolatFelvitel', (req, res) => {
  const { nev, email, uzenet, datum } = req.body;
  console.log('Kapott adatok:', {nev, email, uzenet, datum })
  // Ellenőrzés, hogy minden mezőt megkaptunk-e
  if (!nev || !email || !uzenet || !datum ) {
    console.log('Hiányzó mező(k):', { nev, email, uzenet, datum });
    return res.status(400).send("Minden mezőt ki kell tölteni");
  }

  const sql = 'INSERT INTO kapcsolat (nev, email, uzenet, datum, uzenet_elfogadva ) VALUES (?, ?, ?, ?, 0)';

  pool.query(sql, [nev, email, uzenet, datum ], (err, results) => {
    if (err) {
      console.error("Hiba történt az SQL végrehajtásakor:", err);
      return res.status(500).send("Hiba történt a szerver oldalon");
    }
    res.send("A kapcsolat felvitele sikerült");
  });
});


app.put('/jelszoModositas',async (req, res) => {
  try{
      const {jelszo, email} = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(jelszo, salt);

      pool.query(`UPDATE felhasznalo SET password = ? WHERE email = ?`,[hashedPassword, email], (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("Hiba");
        } else {
          console.log(rows);
          res.status(200).send({ message: "Jelszó sikeresen módosítva!" });
        }
      });
    }catch (error) {
      console.error('Hiba:', error);
      res.status(500).send('Hiba történt a jelszó módosítása során.');
    }
  });



  app.post('/felhasznaloEsemenyFelvitel', (req, res) => {
    const { nev, datum_mettol, datum_meddig, varos, tipus, leiras, reszletek, helyszin, felhasznalo, elfogadott } = req.body;
    console.log('Kapott adatok:', {nev, datum_mettol, datum_meddig, varos, tipus, leiras, reszletek, helyszin, felhasznalo, elfogadott})
    // Ellenőrzés, hogy minden mezőt megkaptunk-e
    if (!nev || !datum_mettol || !datum_meddig || !varos || !tipus || !leiras || !reszletek || !helyszin || !felhasznalo || elfogadott == undefined) {
      console.log('Hiányzó mező(k):', { nev, datum_mettol, datum_meddig, varos, tipus, leiras, reszletek, helyszin, felhasznalo, elfogadott});
      return res.status(400).send("Minden mezőt ki kell tölteni");
    }
  
    const sql = 'INSERT INTO felhasznalo_esemeny (id, nev, datum_mettol, datum_meddig, varos, tipus, leiras, reszletek, helyszin, felhasznalo, elfogadott) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
    pool.query(sql, [nev, datum_mettol, datum_meddig, varos, tipus, leiras, reszletek, helyszin, felhasznalo, elfogadott], (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("A felhasználó esemény felvitele sikerült");
    });
  });


    // Felhasználói események listázása
  app.get('/felhasznaloEsemenyLista', (req, res) => {
    pool.query('SELECT * from felhasznalo_esemeny', (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Hiba");
      } else {
        console.log(rows);
        res.status(200).send(rows);
      }
    });
  });


  app.delete('/felhasznaloEsemenyTorles', (req, res) => {
    const { id} = req.body;
    if (id == null) {
        return res.status(400).send('Hibás paraméterek!');
    }

    const sql = 'DELETE FROM felhasznalo_esemeny WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Hiba történt az SQL végrehajtásakor:", err);
            return res.status(500).send("Hiba történt a szerver oldalon");
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).send('Nincs törölhető adat!');
        }

        res.send("Az érdekelt esemény sikeresen törlésre került");
    });
});


// Esemény elfogadásának végpontja
app.post('/felhasznaloEsemenyElfogadas', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Hiányzó esemény azonosító' });
  }

  const sql = 'UPDATE felhasznalo_esemeny SET elfogadott = 1 WHERE id = ?';

  pool.query(sql, [id], (err) => {
    if (err) {
      console.error('Hiba az elfogadás során:', err);
      return res.status(500).json({ error: 'Adatbázis hiba' });
    }

    res.json({ message: 'Esemény sikeresen elfogadva' });
  });
});


// Esemény elutasításának végpontja
app.post('/felhasznaloEsemenyElutasitas', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Hiányzó esemény azonosító' });
  }

  const sql = 'UPDATE felhasznalo_esemeny SET elfogadott = 2 WHERE id = ?';

  pool.query(sql, [id], (err) => {
    if (err) {
      console.error('Hiba az elutasítás során:', err);
      return res.status(500).json({ error: 'Adatbázis hiba' });
    }

    res.json({ message: 'Esemény sikeresen elutasítva' });
  });
});






























  

//Szabi backend végpontjai



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

app.post('/kapcsolatfelvitel_web', (req, res) => {
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





//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Sulis oldalra feltöltött utáni végpontok

app.put('/erdekeltEsemenyModositas/:esemeny_nev', (req, res) => {
  const { esemeny_nev } = req.params; // Esemény neve az URL-ből

  // Az SQL kérés
  const query = 'UPDATE erdekelt_esemeny SET torolt = 1 WHERE esemeny_nev = ?';

  // A kapcsolat-pool használata a kérés végrehajtásához
  pool.query(query, [esemeny_nev], (err, results) => {
    if (err) {
      console.error('Hiba történt:', err);
      return res.status(500).json({ error: 'Valami hiba történt a frissítés során.' });
    }

    // Ellenőrizzük, hogy volt-e változás
    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'Az esemény sikeresen törlésre került.' });
    } else {
      return res.status(404).json({ message: 'Esemény nem található.' });
    }
  });
});









// Szerver indítása
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
