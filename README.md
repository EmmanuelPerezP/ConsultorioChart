# SQLite config
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

 ### Query para sacar cantidad de dictamenes por mes
 ```
  SELECT strftime("%Y-%m",Fecha) AS MonthYear,
  SUM(Comprado) AS Total
  FROM compras
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