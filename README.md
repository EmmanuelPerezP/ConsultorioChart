# SQLite config

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
  " VPOS" TEXT );
```

```
 .mode csv
 .import Reporte.csv
```

 ## get dates
 ```
  SELECT strftime("%Y-%m",Fecha) AS MonthYear,
  SUM(Comprado) AS Total
  FROM compras
  GROUP BY strftime("%m-%Y", Fecha) 
  ORDER BY strftime("%Y-%m", Fecha);
 ```