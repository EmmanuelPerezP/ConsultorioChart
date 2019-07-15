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