const express = require('express');
const mysql = require('mysql');
var cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Kapcsolat-pool létrehozása
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'esemenyek',
  connectionLimit: 10,  // A maximális kapcsolatok száma a poolban
});

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
  pool.query('SELECT vnev from varos order by vnev', (err, rows) => {
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

//események információinak megjelenítése
app.get('/adatokLista', (req, res) => {
  pool.query('SELECT esemeny.id,nev,datum,leiras,vnev,helyszin_nev, reszletek from esemeny inner join helyszin on esemeny.id = esemenyid inner join varos on varos.id = esemeny.varosid order by datum_kezdet', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Hiba");
    } else {
      console.log(rows);
      res.status(200).send(rows);
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
    `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev 
     FROM esemeny 
     INNER JOIN helyszin ON esemeny.id = esemenyid 
     INNER JOIN varos ON varos.id = esemeny.varosid 
     WHERE nev LIKE ?`,
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
      `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev 
      FROM esemeny 
      INNER JOIN helyszin ON esemeny.id = esemenyid 
      INNER JOIN varos ON varos.id = esemeny.varosid 
      WHERE vnev = ?;`, 
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
      `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev, tipus_nev
      FROM esemeny 
      INNER JOIN helyszin ON esemeny.id = esemenyid 
      INNER JOIN varos ON varos.id = esemeny.varosid
      INNER JOIN tipus ON tipus_id = esemeny.tipusid
      WHERE tipus_nev = ?;`, 
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
      `SELECT esemeny.id, nev, datum, leiras, vnev, helyszin_nev, tipus_nev
      FROM esemeny 
      INNER JOIN helyszin ON esemeny.id = esemenyid 
      INNER JOIN varos ON varos.id = esemeny.varosid
      INNER JOIN tipus ON tipus_id = esemeny.tipusid
      WHERE tipus_nev = ? AND vnev = ?;`, 
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
    const sql = 'DELETE FROM varos';  // Ez törli az összes rekordot az esemeny táblából
    
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Hiba történt az SQL végrehajtásakor:", err);
        return res.status(500).send("Hiba történt a szerver oldalon");
      }
      res.send("A városok sikeresen törlésre kerültek");
    });
  });


// Szerver indítása
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
