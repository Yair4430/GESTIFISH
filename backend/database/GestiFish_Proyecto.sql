-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: gestifish
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `Id_Actividad` int NOT NULL AUTO_INCREMENT,
  `Nom_Actividad` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Des_Actividad` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Fec_Actividad` date NOT NULL,
  `Hor_Actividad` time NOT NULL,
  `Fas_Produccion` enum('Antes de la cosecha','Despues de la cosecha') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Estanque` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Actividad`),
  KEY `Id_Estaque` (`Id_Estanque`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Estanque` (`Id_Estanque`),
  CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `actividad_ibfk_2` FOREIGN KEY (`Id_Estanque`) REFERENCES `estanque` (`Id_Estanque`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES (95,'Limpieza','Limpiar y secar',37,'2024-09-25','10:00:00','Antes de la cosecha',9,'2024-09-25 01:58:47','2024-09-25 01:58:47');
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alimentacion`
--

DROP TABLE IF EXISTS `alimentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimentacion` (
  `Id_Alimentacion` int NOT NULL AUTO_INCREMENT,
  `Fec_Alimentacion` date NOT NULL,
  `Can_RacionKg` int NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Tip_Alimento` enum('Concentrado','Sal') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Hor_Alimentacion` time NOT NULL,
  `Vlr_Alimentacion` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Alimentacion`),
  KEY `Id_Resposable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  KEY `Id_Responsable` (`Id_Responsable`),
  CONSTRAINT `alimentacion_ibfk_1` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`),
  CONSTRAINT `alimentacion_ibfk_2` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentacion`
--

LOCK TABLES `alimentacion` WRITE;
/*!40000 ALTER TABLE `alimentacion` DISABLE KEYS */;
INSERT INTO `alimentacion` VALUES (19,'2024-09-14',2,20,43,'Concentrado','21:59:00',21666,'2024-09-18 13:58:11','2024-09-19 16:47:21');
/*!40000 ALTER TABLE `alimentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cosecha`
--

DROP TABLE IF EXISTS `cosecha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosecha` (
  `Id_Cosecha` int NOT NULL AUTO_INCREMENT,
  `Fec_Cosecha` date NOT NULL,
  `Can_Peces` int NOT NULL,
  `Pes_Eviscerado` int NOT NULL,
  `Pes_Viscerado` int NOT NULL,
  `Por_Visceras` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Hor_Cosecha` time NOT NULL,
  `Vlr_Cosecha` int NOT NULL,
  `Obs_Cosecha` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Cosecha`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  CONSTRAINT `cosecha_ibfk_1` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`),
  CONSTRAINT `cosecha_ibfk_2` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosecha`
--

LOCK TABLES `cosecha` WRITE;
/*!40000 ALTER TABLE `cosecha` DISABLE KEYS */;
INSERT INTO `cosecha` VALUES (21,'2024-09-05',122,2112,2112,2121,39,20,'10:00:00',122,'sasas','2024-09-18 13:58:34','2024-09-19 16:49:10');
/*!40000 ALTER TABLE `cosecha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie`
--

DROP TABLE IF EXISTS `especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie` (
  `Id_Especie` int NOT NULL AUTO_INCREMENT,
  `Nom_Especie` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Car_Especie` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Img_Especie` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tam_Promedio` int NOT NULL,
  `Den_Especie` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Especie`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
INSERT INTO `especie` VALUES (11,'Mojarra','Resistente, de agua dulce','1726667745950.png',6,14,'2024-09-18 13:55:45','2024-09-19 18:46:06');
/*!40000 ALTER TABLE `especie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estanque`
--

DROP TABLE IF EXISTS `estanque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estanque` (
  `Id_Estanque` int NOT NULL,
  `Nom_Estanque` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Esp_Agua` int NOT NULL,
  `Tip_Estanque` enum('Estanque','Lago') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Lar_Estanque` int NOT NULL,
  `Anc_Estanque` int NOT NULL,
  `Des_Estanque` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Img_Estanque` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Rec_Agua` int NOT NULL,
  `createdat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Estanque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estanque`
--

LOCK TABLES `estanque` WRITE;
/*!40000 ALTER TABLE `estanque` DISABLE KEYS */;
INSERT INTO `estanque` VALUES (9,'La Gigante',9,'Estanque',7,8,'Es grande','1726679726847.png',4,'2024-09-18 17:15:26','2024-09-18 17:15:26'),(443,'La pequeña',2,'Estanque',6,5,'ta pequeño','1726665581106.jpeg',6,'2024-09-18 13:19:41','2024-09-19 18:48:27');
/*!40000 ALTER TABLE `estanque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mortalidad`
--

DROP TABLE IF EXISTS `mortalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mortalidad` (
  `Id_Mortalidad` int NOT NULL AUTO_INCREMENT,
  `Fec_Mortalidad` date NOT NULL,
  `Can_Peces` int NOT NULL,
  `Mot_Mortalidad` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Mortalidad`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  CONSTRAINT `mortalidad_ibfk_2` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `mortalidad_ibfk_3` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mortalidad`
--

LOCK TABLES `mortalidad` WRITE;
/*!40000 ALTER TABLE `mortalidad` DISABLE KEYS */;
INSERT INTO `mortalidad` VALUES (19,'2024-09-21',44344,'SE LOS COMIERON Y PAILAS',20,44,'2024-09-20 14:47:15','2024-09-20 14:47:15');
/*!40000 ALTER TABLE `mortalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muestreo`
--

DROP TABLE IF EXISTS `muestreo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muestreo` (
  `Id_Muestreo` int NOT NULL AUTO_INCREMENT,
  `Fec_Muestreo` date NOT NULL,
  `Num_Peces` int NOT NULL,
  `Obs_Muestreo` varchar(90) NOT NULL,
  `Pes_Esperado` float NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Hor_Muestreo` time NOT NULL,
  `Pes_Promedio` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Muestreo`),
  KEY `FK_Siembra` (`Id_Siembra`),
  KEY `FK_Responsable` (`Id_Responsable`),
  CONSTRAINT `FK_Responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `FK_Siembra` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muestreo`
--

LOCK TABLES `muestreo` WRITE;
/*!40000 ALTER TABLE `muestreo` DISABLE KEYS */;
INSERT INTO `muestreo` VALUES (4,'2024-09-07',21,'Estan gorditos',2,20,45,'11:03:00',14,'2024-09-18 13:59:19','2024-09-19 18:53:50'),(7,'2024-09-20',15,'se presento alta mortalidad',7,20,43,'23:43:00',7,'2024-09-20 16:42:16','2024-09-20 16:42:37');
/*!40000 ALTER TABLE `muestreo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsable` (
  `Id_Responsable` int NOT NULL AUTO_INCREMENT,
  `Nom_Responsable` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Ape_Responsable` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Doc_Responsable` int NOT NULL,
  `Tip_Responsable` enum('Instructor','Pasante','Instructor a cargo de la Unidad') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Cor_Responsable` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Num_Responsable` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (37,'Juan','Pérez',12345678,'Instructor','juanperez@email.com','3012345678','2024-09-18 13:14:01','2024-09-18 13:14:01'),(39,'Carlos','Rodríguez',13579135,'Instructor a cargo de la Unidad','carlosrodriguez@email.com','3212345678','2024-09-18 13:14:01','2024-09-18 13:14:01'),(41,'Luis','Martínez',35791357,'Pasante','luismartinez@email.com','3119876543','2024-09-18 13:14:01','2024-09-18 13:14:01'),(43,'Miguel','Ramírez',57913579,'Instructor','miguelramirez@email.com','3018765432','2024-09-18 13:14:01','2024-09-18 13:14:01'),(44,'Laura','Hernández',68024680,'Pasante','laurahernandez@email.com','3118765432','2024-09-18 13:14:01','2024-09-18 13:14:01'),(45,'Andrés','Fernández',79135791,'Instructor a cargo de la Unidad','andresfernandez@email.com','3218765432','2024-09-18 13:14:01','2024-09-18 13:14:01');
/*!40000 ALTER TABLE `responsable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siembra`
--

DROP TABLE IF EXISTS `siembra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siembra` (
  `Id_Siembra` int NOT NULL AUTO_INCREMENT,
  `Can_Peces` int NOT NULL,
  `Fec_Siembra` date NOT NULL,
  `Fec_PosibleCosecha` date NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Id_Especie` int NOT NULL,
  `Id_Estanque` int NOT NULL,
  `Pes_Actual` int NOT NULL,
  `Obs_Siembra` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Hor_Siembra` time NOT NULL,
  `Gan_Peso` float NOT NULL,
  `Vlr_Siembra` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Siembra`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Estanque` (`Id_Estanque`),
  KEY `Id_Especie` (`Id_Especie`),
  CONSTRAINT `siembra_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `siembra_ibfk_2` FOREIGN KEY (`Id_Estanque`) REFERENCES `estanque` (`Id_Estanque`),
  CONSTRAINT `siembra_ibfk_3` FOREIGN KEY (`Id_Especie`) REFERENCES `especie` (`Id_Especie`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siembra`
--

LOCK TABLES `siembra` WRITE;
/*!40000 ALTER TABLE `siembra` DISABLE KEYS */;
INSERT INTO `siembra` VALUES (20,12,'2024-09-12','2024-09-12',43,11,443,2,'111','00:00:00',22,333,'2024-09-18 13:56:40','2024-09-19 19:18:29');
/*!40000 ALTER TABLE `siembra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traslados`
--

DROP TABLE IF EXISTS `traslados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traslados` (
  `Id_Traslado` int NOT NULL AUTO_INCREMENT,
  `Fec_Traslado` date NOT NULL,
  `Can_Peces` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Obs_Traslado` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Hor_Traslado` time NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Traslado`),
  KEY `Id_Responsable` (`Id_Responsable`),
  CONSTRAINT `traslados_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traslados`
--

LOCK TABLES `traslados` WRITE;
/*!40000 ALTER TABLE `traslados` DISABLE KEYS */;
INSERT INTO `traslados` VALUES (54,'2024-09-12',44,44,'EEE','03:22:00','2024-09-19 19:20:40','2024-09-19 19:20:40');
/*!40000 ALTER TABLE `traslados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Id_Usuario` int NOT NULL AUTO_INCREMENT,
  `Nom_Usuario` varchar(25) NOT NULL,
  `Ape_Usuario` varchar(25) NOT NULL,
  `Cor_Usuario` varchar(80) NOT NULL,
  `Con_Usuario` varchar(255) NOT NULL,
  `Token` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (24,'Yair','Cardenas','yairguz2523@gmail.com','$2a$08$eqJhAYn4XccYzupHt775ZOrmcX8/9ZVulnLdeHyRMmVh5tVp6MLAq','1i8nnp0ba1s7oud9pvpg','2024-08-18 03:53:05','2024-09-26 17:59:01'),(56,'CSF','FSF','valentinamunoz033v@gmail.com','$2a$12$PM0JrYUPUenbmiBf70kAIuT4QWkE3cixgGFbMA3lc8x1rmg/FBtFq',NULL,'2024-09-16 17:03:06','2024-09-19 11:46:49'),(57,'Valentina','Munoz','valentinamunozduran@gmail.com','$2a$10$I.2eglJloVezJZZeHsaMyuKHaTTcBDca7deTYUGixzKFEvI8NJi9O',NULL,'2024-09-19 19:35:17','2024-09-25 17:21:57'),(58,'Juan David','Linares','juandavidlinares2005@gmail.com','$2a$12$8R.GoMHXBxraTx5xv83fvODtAsjGV6uX2JoF1c7t5PFpsOB3waM0m','1i87u5p9lb6flhl0i04g','2024-09-20 14:43:01','2024-09-20 14:43:01');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01  7:33:21
