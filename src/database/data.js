const fs = require('fs')
const csv = require('csvtojson')
const { Parser } = require('json2csv')
let colleges = []
async function importcsv() {
  colleges = await csv().fromFile('colleges.csv')
  console.log('HIX')
}

importcsv()

console.log(colleges)
