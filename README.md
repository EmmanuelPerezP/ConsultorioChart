# Analitycs Trend Visualization System for SEDIMEC sales data
SEDIMEC AKA (Servicios digitales para medicos colegiados)

This system is to analyze trends, drivers and sales of the data given by SEDIMEC in CSV

Made in Express.js, sqlite, bootstrap and ejs

## Install
install npm modules
```
npm install
```
run dev
```
npm run start
```


## SQLite config
Create table for the data imported from a csv given by SEDIMEC

```
CREATE TABLE compras("Comp" INTEGER,
"Tipo" TEXT,
"Formulario" TEXT,
"Auto" TEXT,
"Operacion" TEXT,
"Medico" TEXT,
"Fecha" TEXT,
"Anterior" TEXT,
"Comprado" INTEGER,
"Actual" INTEGER,
"Precio/Uni" INTEGER,
"Total" INTEGER,
" VPOS" TEXT
);
```

Import CSV  
`compras` being the previous table

```
.mode csv
```
```
.import Reporte.csv compras
```

## Querys
strftime reference
https://www.sqlite.org/lang_datefunc.html

 ### Query to analyze dictamenes by month
 ```
  SELECT strftime("%Y-%m",Fecha) AS MonthYear,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%m-%Y", Fecha) 
  ORDER BY strftime("%Y-%m", Fecha);
 ```
 ### Query to analyze quantity of dictamenes by monoth with variable 2017
 ```
  SELECT strftime("%Y",Fecha) AS Year,
  CAST(strftime("%m",Fecha) as integer) AS Month,
  SUM(Comprado) AS Total
  FROM compras
  WHERE Year = "2017"
  GROUP BY strftime("%m-%Y", Fecha) 
  ORDER BY strftime("%Y-%m", Fecha);
 ```

 ### Query to analyze quantity of dictamenes by day
 ```
  SELECT strftime("%w",Fecha) AS DayOfWeek,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%w", Fecha) 
  ORDER BY strftime("%w", Fecha);
 ```

 ### Query to analyze quantity of dictamenes by day of the month
  ```
  SELECT strftime("%d",Fecha) AS DayOfMonth,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%d", Fecha) 
  ORDER BY strftime("%d", Fecha);
 ```

 ### Query to analyze quantity of dictamenes by hour
  ```
  SELECT strftime("%H",Fecha) AS DayOfWeek,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%H", Fecha) 
  ORDER BY strftime("%H", Fecha);
 ```

 ### Query to analyze dictamenes by week of the month (work in progress)

```
SELECT "Primer Semana" AS Week,
SUM(Comprado) AS Total
FROM compras
WHERE strftime("%d", Fecha) BETWEEN "0" AND "7"
UNION
SELECT "Segunda Semana" AS Week,
SUM(Comprado) AS Total
FROM compras
WHERE strftime("%d", Fecha) BETWEEN "8" AND "14"
UNION
SELECT "Tercer Semana" AS Week,
SUM(Comprado) AS Total
FROM compras
WHERE strftime("%d", Fecha) BETWEEN "15" AND "21"
UNION
SELECT "Cuarta Semana" AS Week,
SUM(Comprado) AS Total
FROM compras
WHERE strftime("%d", Fecha) BETWEEN "22" AND "31"
```
 ## Node
 To use the `import` syntax we still need to compile with babel for node js
 https://stackoverflow.com/questions/39436322/node-js-syntaxerror-unexpected-token-import#comment98536213_39436580
 https://nodejs.org/api/esm.html#esm_ecmascript_modules

 see this blog post
 
 https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/ 
 https://dev.to/dhruv/writing-es6-in-your-nodejs-applications-33jk 
 https://medium.com/@jmitchell1991/how-to-use-es6-and-es7-in-nodejs-and-deploy-it-7f2da7d9a81e


 problem with path '.../public'
 see this: https://stackoverflow.com/questions/7083045/fs-how-do-i-locate-a-parent-folder