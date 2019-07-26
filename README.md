## Sist

## SQLite config
Crear tabla de compras

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

Importar el csv de Sedimec  
compras en este caso seria la tabla anterior

```
.mode csv
.import Reporte.csv compras
```

## Querys
strftime reference
https://www.sqlite.org/lang_datefunc.html

 ### Query para sacar cantidad de dictamenes por mes
 ```
  SELECT strftime("%Y-%m",Fecha) AS MonthYear,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%m-%Y", Fecha) 
  ORDER BY strftime("%Y-%m", Fecha);
 ```
 ### Query para sacar cantidad de dictamenes por mes con variable 2017
 ```
  SELECT strftime("%Y",Fecha) AS Year,
  CAST(strftime("%m",Fecha) as integer) AS Month,
  SUM(Comprado) AS Total
  FROM compras
  WHERE Year = "2017"
  GROUP BY strftime("%m-%Y", Fecha) 
  ORDER BY strftime("%Y-%m", Fecha);
 ```

 ### Query para sacar cantidad de dictamenes por dia
 ```
  SELECT strftime("%w",Fecha) AS DayOfWeek,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%w", Fecha) 
  ORDER BY strftime("%w", Fecha);
 ```

 ### Query para sacar cantidad de dictamenes por dia del mes
  ```
  SELECT strftime("%d",Fecha) AS DayOfMonth,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%d", Fecha) 
  ORDER BY strftime("%d", Fecha);
 ```

 ### Query para sacar cantidad de dictamenes por hora
  ```
  SELECT strftime("%H",Fecha) AS DayOfWeek,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%H", Fecha) 
  ORDER BY strftime("%H", Fecha);
 ```

 ### Query para sacar dictamense por semana del mes (en progreso todavia no funciona)

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

 cobija = nina
 la mama quemo la cobija porq la metio al  microondas

 Boo! discovery kids show
 color favorito: rosado
 bananas en pijamas serie favorita plushie


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