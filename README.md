# CSV to JSON converter

#### simply and fast converter that can be used as module

## Description

CSV look like:

|name|age|sex|address|
|:----------:|:-------:|:---:|:----:|
|John|18|M|NY, Brooklyn|
|Alice|22|F|Britan, Newington|

Text with will look like: (delimiter: **","**)

```string
name,age ,sex,adderss
John,18,M,"NY, Brooklyn"
Alice,22,F,"Britan, Newington"
```

simply call function csvToJson() with at least one parametr

```TypeScript
const csvText = 'name,age,sex,adderss\nJohn,18,M,"NY, Brooklyn"\nAlice,22,F,"Britan, Newington"';
const delimiter = ',';

//wit delimiter
const json = csvToJson(csvText, delimiter);

//you can call it without dilimiter if it is: , ; | " "
const json =  csvToJson(csvText);
```

It will generate JSON like this:

```json
[
 {
  "name": "John",
  "age": 18,
  "sex": "M",
  "address": "NY, Brooklyn"
 },
 {
  "name": "Alice",
  "age": 22,
  "sex": "F",
  "address": "Britan, Newington"
 }
]
```

## Install npm

### link on **NPM**: [csvtojson-converter](https://www.npmjs.com/package/csvtojson-converter?activeTab=dependencies)

```cmd
npm install csvtojson-converter -D
```
