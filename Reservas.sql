--Proyecto Requerimientos de Software
--Sistema de Reservas para el Hotel la Pradera
--"Reservas la Pradera"
--Estudiantes: Esteban Blanco, Leidy Chacón, Roberto Salazar y Carlos Villafuerte
--Fecha de inicio: 17/09/2016



CREATE DOMAIN t_Cedula    CHAR(11)     NOT NULL      CHECK(VALUE SIMILAR TO '[0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]');
CREATE DOMAIN t_Fecha     DATE         NOT NULL

--___________________________________________________________TABLAS___________________________________________________________________________________________________

CREATE TABLE Usuario(

      cedula         t_cedula,
      nombre         VARCHAR   NOT NULL,
      contraseña     VARCHAR   NOT NULL,
      tipo           VARCHAR   NOT NULL,
      foto           INT   NOT NULL,
      
      CONSTRAINT PK_cedula_usuario    PRIMARY KEY (cedula),
      CONSTRAINT CHK_tipo_usuario CHECK(tipo in('administrador','recepcionista'))
);


CREATE TABLE Cliente(

      nombre       VARCHAR    NOT NULL,
      cedula       t_cedula,
      direccion    VARCHAR(500) NULL,
      nacionalidad VARCHAR     NOT NULL,
   
      CONSTRAINT PK_cedula_cliente    PRIMARY KEY (cedula)
     
);


CREATE TABLE Reserva(

	idReserva         Serial,
	cedulaCliente     t_cedula,
	cedulaUser        t_cedula,            
        estado            VARCHAR      NOT NULL,
	CONSTRAINT    PK_idReserva              PRIMARY KEY(idReserva),
	CONSTRAINT    FK_cedulaCliente_reserva  FOREIGN KEY(cedulaCliente) REFERENCES Cliente(cedula),
	CONSTRAINT    FK_cedulaUser_reserva     FOREIGN KEY(cedulaUser)    REFERENCES Usuario(cedula)
	
);


CREATE TABLE Tipo(

	idTipo          INT       NOT NULL,
	nombre          VARCHAR   NULL,
	cedulaJuridica  VARCHAR   NULL,
	numeroTargeta   VARCHAR   NULL,
	numeroCuenta    VARCHAR   NULL,
	banco           VARCHAR   NULL,

        CONSTRAINT PK_idTipo   PRIMARY KEY (idTipo)	
);




CREATE TABLE TelefonoCliente(

       cedula     t_cedula,
       telefono       VARCHAR NOT NULL,

       CONSTRAINT PK_cedula_telefono   PRIMARY KEY (cedula,telefono),
       CONSTRAINT FK_cedula            FOREIGN KEY (cedula) REFERENCES Cliente(cedula),
       CONSTRAINT CK_telefono  CHECK(telefono SIMILAR TO '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' OR telefono SIMILAR TO '[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
);

CREATE TABLE TelefonoUsuario(

       cedula     t_cedula,
       telefono       VARCHAR NOT NULL,

       CONSTRAINT PK_cedula_telefonoU   PRIMARY KEY (cedula,telefono),
       CONSTRAINT FK_cedula            FOREIGN KEY (cedula) REFERENCES Usuario(cedula),
       CONSTRAINT CK_telefono  CHECK(telefono SIMILAR TO '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' OR telefono SIMILAR TO '[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
);

CREATE TABLE EmailUsuario(

       cedula     t_cedula,
       email       VARCHAR NOT NULL,

       CONSTRAINT PK_cedula_emailU   PRIMARY KEY (cedula,email),
       CONSTRAINT FK_cedula            FOREIGN KEY (cedula) REFERENCES Usuario(cedula)
);

CREATE TABLE EmailCliente(

       cedula      t_cedula,
       email       VARCHAR NOT NULL,

       CONSTRAINT PK_cedula_emailC   PRIMARY KEY (cedula,email),
       CONSTRAINT FK_cedula            FOREIGN KEY (cedula) REFERENCES Cliente(cedula)
);


CREATE TABLE Habitacion(
      idHabitacion          INT          NOT NULL,
      tipo                  VARCHAR         NOT NULL,
      precio                INT             NOT NULL,
      capacidad             INT             NOT NULL,

      CONSTRAINT PK_idHabitacion_Habitacion    PRIMARY KEY (idHabitacion)
      
);

--alter table Habitacion drop column estado
insert into Habitacion(idHabitacion,tipo,precio,capacidad)
	     values('1','normal',50000,3),
	           ('2','normal',50000,3),
	           ('3','normal',40000,3),
	           ('4','normal',60000,5)

  drop table Habitacion                      

CREATE TABLE HabitacionReserva(

      idHabitacion          INT           NOT NULL,
      idReserva             INT           NOT NULL,
      cantidad              INT           NOT NULL,
      fechaEntrada          t_Fecha,
      fechaSalida           DATE          NOT NULL,
      horaEntrada           TIME          NOT NULL,
      horaSalida            TIME          NOT NULL,
      estado                VARCHAR(20)   NOT NULL,
      CONSTRAINT PK_idHabitacion_idReserva PRIMARY KEY (idHabitacion,idReserva),
      CONSTRAINT FK_idReserva     FOREIGN KEY (idReserva)     REFERENCES Reserva(idReserva),
      CONSTRAINT  FK_idHabitacion FOREIGN KEY (idHabitacion) REFERENCES Habitacion(idHabitacion),
      CONSTRAINT CHK_estado_Habitacion CHECK (estado in('greem','red','yellow'))
      
);

insert into HabitacionReserva values(4,1,2,'20/10/2016','25/10/2016','15:00','3:00','ocupada')

CREATE TABLE TipoReserva(

	idReserva      INT  NOT NULL,
	idTipo         INT  NOT NULL,

	CONSTRAINT PK_idReserva_idTip PRIMARY KEY (idReserva,idTipo),
	CONSTRAINT FK_idReserva FOREIGN KEY(idReserva) REFERENCES Reserva(idReserva),
	CONSTRAINT FK_idTipo   FOREIGN KEY(idTipo) REFERENCES Tipo(idTipo)

);




    
--______________________________________________________FUNCIONES_______________________________________________________________________

CREATE OR REPLACE FUNCTION InsertarReserva(pidReserva INT,pcedulaCliente VARCHAR, pcedulaUser VARCHAR, pestado VARCHAR, 
                                          pcantidad INT, pfechaInicio DATE, pfechaSalida DATE,phoraEntrada TIME, phoraSalida TIME,pidHabitacion INT
                                          ) RETURNS VOID
AS 
$FUNC$
BEGIN 
   INSERT INTO Reserva(idReserva,cedulaCliente,cedulaUser,estado) VALUES (pidReserva,pcedulaCliente,pcedulaUser,pestado);
   INSERT INTO HabitacionReserva(idHabitacion,idReserva,cantidad,fechaEntrada,fechaSalida,horaEntrada,horaSalida) VALUES(pidHabitacion,pidReserva,pcantidad,pfechaInicio,pfechaSalida,phoraEntrada,phoraSalida);
   UPDATE Habitacion SET estado='ocupada' where idHabitacion=pidHabitacion;
   
END;
$FUNC$ LANGUAGE  plpgsql;


select * from InsertarReserva('2','2-0760-0377','2-0760-0377','pendiente','4','06-01-2015','20-01-2015','12:00','01:00','1');
select * from InsertarReserva('37','2-0760-0377','2-0760-0377','pendiente','4','06-01-2015','20-01-2015','12:0','01:0','1')
select * from Reserva
select * from HabitacionReserva
----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION EliminarReserva(pid INT) RETURNS VOID
AS
$FUNC$
BEGIN 
  DELETE FROM Reserva WHERE idReserva = pid;

END;
$FUNC$ LANGUAGE plpgsql;
select * from EliminarReserva('1')
---------------------------------------------------------------------

create or replace function ModificarReserva(pidReserva INT,pcedulaCliente VARCHAR, pcedulaUser VARCHAR, pestado VARCHAR, 
                                          pcantidad INT, pfechaInicio DATE, pfechaSalida DATE, phoraInicio TIME, phoraSalida TIME, pidHabitacionOld INT,pidHabitacionNew INT)
    returns void
as
$func$
begin
    update Reserva set cedulaCliente=pcedulaCliente,cedulaUser=pcedulaUser,estado=pestado
    where idReserva=pidReserva;
    update HabitacionReserva set cantidad=pcantidad, fechaEntrada=pfechaInicio,fechaSalida=pfechaSalida,horaEntrada=phoraInicio,horaSalida=phoraSalida,idHabitacion=pidHabitacionNew
    where idReserva=pidReserva and idHabitacion=pidHabitacionOld;  
end;
$func$ language plpgsql;


select * from ModificarReserva('1','2-0114-5888','2-0760-0377','concreta','3','2016-10-20','2016-10-25','01:00','01:00','1','4')
select * from Usuario
select * from Reserva
select * from HabitacionReserva
select * from Habitacion
----------------------------------------------------------------------
CREATE  TYPE tReserva
AS
(idReserva          INT,
cedulaCliente       t_Cedula,        
cedulaUser          t_Cedula,     
fechaEntrada        t_Fecha,
fechaSalida         DATE,
horaEntrada         TIME,
horaSalida          TIME,
estado              VARCHAR
);           
  
CREATE OR REPLACE FUNCTION consultaReserva(pidReserva INT,pcedulaCliente VARCHAR,pcedulaUser VARCHAR,pFechaEntrada DATE, pFechaSalida DATE,pHoraEntrada TIME, pHoraSalida TIME, pestado VARCHAR)
    RETURNS SETOF tReserva
as
$FUNC$
DECLARE reg RECORD;
BEGIN
                       
    FOR reg IN (SELECT * FROM (select r.idReserva, r.cedulaCliente,r.cedulaUser,rh.fechaEntrada,rh.fechaSalida,rh.horaEntrada,rh.horaSalida,r.estado from ((Reserva as r inner join HabitacionReserva as rh on (r.idReserva=rh.idReserva))
inner join Cliente as c on(c.cedula=r.cedulaCliente))) as t1
            WHERE
            (($1 IS NULL) OR (idReserva=$1)) AND
            (($2 IS NULL) OR (cedulaCliente similar to '%'||$2||'%')) AND
            (($3 IS NULL) OR (cedulaUser similar to '%'||$3||'%')) AND
            (($4 IS NULL) OR (fechaEntrada = $4)) AND
            (($5 IS NULL) OR (fechaSalida = $5)) AND
            (($6 IS NULL) OR (horaEntrada = $6)) AND
            (($7 IS NULL) OR (horaSalida = $7)) AND
            (($8 IS NULL) OR (estado similar to '%'||$8||'%')))LOOP
            
            
    RETURN NEXT reg;
    END LOOP;
END;
$FUNC$ LANGUAGE plpgsql;


select * from consultaReserva(37,NULL,NULL,NULL,NULL,NULL,NULL,NULL)



--Client

select * from Cliente
CREATE OR REPLACE FUNCTION InsertarCliente(pnombre VARCHAR,pcedula VARCHAR,pdireccion VARCHAR, pnacionalidad VARCHAR,ptelefono VARCHAR, pemail VARCHAR) 
RETURNS VOID
AS 
$FUNC$
BEGIN 
   INSERT INTO Cliente(nombre,cedula,direccion,nacionalidad) VALUES (pnombre,pcedula,pdireccion,pnacionalidad);
   INSERT INTO TelefonoCliente(cedula,telefono) VALUES(pcedula,ptelefono);
   INSERT INTO EmailCliente(cedula,email) VALUES (pcedula,pemail);
END;
$FUNC$ LANGUAGE  plpgsql;


select * from InsertarCliente('Carlos Villaferte','2-0114-5889','Los Chiles','Costarirrence','8758-9877','car@gmail.com')
----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION ModificarCliente(pnombre VARCHAR,pcedula VARCHAR,pdireccion VARCHAR, pnacionalidad VARCHAR,ptelefono VARCHAR,ptelefonoNew VARCHAR, pemail VARCHAR, pemailNew VARCHAR)
    returns void
as
$func$
begin
    update Cliente set nombre=pnombre,cedula=pcedula,direccion=pdireccion,nacionalidad=pnacionalidad
    where cedula=pcedula;
    update TelefonoCliente set telefono=ptelefonoNew where cedula=pcedula and telefono=ptelefono; 
    update EmailCliente set email=pemailNew where cedula=pcedula and email=pemail;  
end;
$func$ language plpgsql;

select * from ModificarCliente('Leidy Chacon Salas','2-0760-0377','Cedral','Costarricense','8587-8798','8367-2489','lady@gmail.com','lady96@gmail.com')
select * from TelefonoCliente
select * from EmailCliente
select * from Cliente



----------------------------------------------------------------------
CREATE  TYPE tCliente
AS
(
      nombre       VARCHAR,
      cedula       t_cedula,
      direccion    VARCHAR,
      nacionalidad VARCHAR,
      telefono     VARCHAR,
      email        VARCHAR
);           
  
CREATE OR REPLACE FUNCTION consultaCliente(pnombre VARCHAR,pcedula VARCHAR,pdireccion VARCHAR, pnacionalidad VARCHAR,ptelefono VARCHAR, pemail VARCHAR)
    RETURNS SETOF tCliente
as
$FUNC$
DECLARE reg RECORD;
BEGIN

    FOR reg IN (SELECT * FROM ( select c.nombre, c.cedula,c.direccion,c.nacionalidad,tc.telefono,ec.email from ((Cliente as c inner join TelefonoCliente as tc on (c.cedula=tc.cedula))
    inner join EmailCliente as ec on(ec.cedula=c.cedula))) as t1

            WHERE
            (($1 IS NULL) OR (nombre similar to '%'||$1||'%')) AND
            (($2 IS NULL) OR (cedula similar to '%'||$2||'%')) AND
            (($3 IS NULL) OR (direccion similar to '%'||$3||'%')) AND
            (($4 IS NULL) OR (nacionalidad similar to '%'|| $4||'%')) AND
            (($5 IS NULL) OR (telefono similar to '%'|| $5 ||'%'))AND
            (($6 IS NULL) OR (email similar to '%'||$6||'%')))LOOP         
            
    RETURN NEXT reg;
    END LOOP;
END;
$FUNC$ LANGUAGE plpgsql;


select * from consultaCliente(NULL,NULL,NULL,NULL,NULL,'lady96@gmail.com')

--Habitacion

CREATE OR REPLACE FUNCTION InsertarHabitacion(pidHabitacion INT,pestado VARCHAR,ptipo VARCHAR,pprecio INT,pcapacidad INT) 
RETURNS VOID
AS 
$FUNC$
BEGIN 
   INSERT INTO Habitacion(idHabitacion,estado,tipo,precio,capacidad) VALUES (pidHabitacion,pestado,ptipo,pprecio,pcapacidad);
END;
$FUNC$ LANGUAGE  plpgsql;

select * from Habitacion
select * from InsertarHabitacion('6','disponible','cabaña','50000','5')
----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION ModificarHabitacion(pidHabitacion INT,pestado VARCHAR,ptipo VARCHAR,pprecio INT,pcapacidad INT)
    returns void
as
$func$
begin
    update Habitacion set estado=pestado,tipo=ptipo,precio=pprecio,capacidad=pcapacidad
    where idHabitacion=pidHabitacion; 
end;
$func$ language plpgsql;

select * from ModificarHabitacion('2','disponible','cabaña','50000','3')
select * from Habitacion


----------------------------------------------------------------------
CREATE  TYPE tHabitacion
AS
(
      idHabitacion          INT,
      estado                VARCHAR,
      tipo                  VARCHAR,
      precio                INT,
      capacidad             INT
);           
  
CREATE OR REPLACE FUNCTION consultaHabitacion(pidHabitacion INT,pestado VARCHAR,ptipo VARCHAR,pprecio INT,pcapacidad INT)
    RETURNS SETOF tHabitacion
as
$FUNC$
DECLARE reg RECORD;
BEGIN

    FOR reg IN (SELECT * FROM ( select h.idHabitacion,h.estado,h.tipo,h.precio,h.capacidad from Habitacion as h) as t1

            WHERE
            (($1 IS NULL) OR (idHabitacion=$1)) AND
            (($2 IS NULL) OR (estado similar to '%'||$2||'%')) AND
            (($3 IS NULL) OR (tipo similar to '%'||$3||'%')) AND
            (($4 IS NULL) OR (precio =$4)) AND
            (($5 IS NULL) OR (capacidad = $5)))LOOP         
            
    RETURN NEXT reg;
    END LOOP;
END;
$FUNC$ LANGUAGE plpgsql;

select * from consultaHabitacion(NULL,NULL,NULL,NULL)




