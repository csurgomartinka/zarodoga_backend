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
  pool.query('SELECT vnev from varos', (err, rows) => {
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
    const { nev, datum, varosid, tipusid, leiras } = req.body;
  
    // Ellenőrzés, hogy minden mezőt megkaptunk-e
    if (!nev || !datum || !varosid || !tipusid || !leiras) {
      console.log('Hiányzó mező(k):', { nev, datum, varosid, tipusid, leiras });
      return res.status(400).send("Minden mezőt ki kell tölteni");
    }
  
    const sql = 'INSERT INTO esemeny (nev, datum, varosid, tipusid, leiras) VALUES (?, ?, ?, ?, ?)';
  
    pool.query(sql, [nev, datum, varosid, tipusid, leiras], (err, results) => {
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



// Szerver indítása
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
