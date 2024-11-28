const express = require('express')
const mysql = require('mysql')
var cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})