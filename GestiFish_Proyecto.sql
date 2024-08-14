-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: gestifish_proyecto
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
  `Nom_Actividad` varchar(90) COLLATE utf8mb4_general_ci NOT NULL,
  `Des_Actividad` varchar(90) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Fec_Actividad` date NOT NULL,
  `Hor_Actividad` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Fas_Produccion` int NOT NULL,
  `Id_Estanque` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Actividad`),
  KEY `Id_Estaque` (`Id_Estanque`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Estanque` (`Id_Estanque`),
  CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `actividad_ibfk_2` FOREIGN KEY (`Id_Estanque`) REFERENCES `estanque` (`Id_Estanque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alimentacion`
--

DROP TABLE IF EXISTS `alimentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimentacion` (
  `Id_Alimentación` int NOT NULL AUTO_INCREMENT,
  `Fec_Alimentación` date NOT NULL,
  `Can_Racion Kg` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Tip_Alimento` enum('Concentrado','Sal') COLLATE utf8mb4_general_ci NOT NULL,
  `Hor_Alimentación` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Vlr_Alimentación` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Alimentación`),
  KEY `Id_Resposable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  KEY `Id_Responsable` (`Id_Responsable`),
  CONSTRAINT `alimentacion_ibfk_1` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`),
  CONSTRAINT `alimentacion_ibfk_2` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentacion`
--

LOCK TABLES `alimentacion` WRITE;
/*!40000 ALTER TABLE `alimentacion` DISABLE KEYS */;
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
  `Pes_Eviscerado` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Pes_Viscerado` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Por_Visceras` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Hor_Cosecha` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Vlr_Cosecha` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Obs_Cosecha` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Cosecha`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  CONSTRAINT `cosecha_ibfk_1` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`),
  CONSTRAINT `cosecha_ibfk_2` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosecha`
--

LOCK TABLES `cosecha` WRITE;
/*!40000 ALTER TABLE `cosecha` DISABLE KEYS */;
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
  `Nom_Especie` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `Car_Especie` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `Img_Especie` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `Tam_Promedio` int NOT NULL,
  `Den_Siembra` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Especie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
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
  `Num_Estanque` int NOT NULL,
  `Esp_Agua` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Tip_Etanque` enum('Estanque','Lago') COLLATE utf8mb4_general_ci NOT NULL,
  `Lar_Estanque` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Anc_Estanque` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Des_Estanque` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `Img_Estanque` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `Rec_Agua` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
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
  `Mot_Mortalidad` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Mortalidad`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  CONSTRAINT `mortalidad_ibfk_2` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `mortalidad_ibfk_3` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mortalidad`
--

LOCK TABLES `mortalidad` WRITE;
/*!40000 ALTER TABLE `mortalidad` DISABLE KEYS */;
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
  `Obs_Muestreo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Pes_Esperado` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Hor_Muestreo` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Pes_Promedio` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Muestreo`),
  UNIQUE KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Siembra` (`Id_Siembra`),
  CONSTRAINT `muestreo_ibfk_1` FOREIGN KEY (`Id_Siembra`) REFERENCES `siembra` (`Id_Siembra`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muestreo`
--

LOCK TABLES `muestreo` WRITE;
/*!40000 ALTER TABLE `muestreo` DISABLE KEYS */;
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
  `Nom_Responsable` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `Ape_Responsable` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `Doc_Responsable` varchar(14) COLLATE utf8mb4_general_ci NOT NULL,
  `Tip_Responsable` enum('Instructor','Pasante','Instructor a cargo de la Unidad') COLLATE utf8mb4_general_ci NOT NULL,
  `Cor_Responsable` varchar(90) COLLATE utf8mb4_general_ci NOT NULL,
  `Num_Responsable` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (2,'Juan','Pérez','1234567890','Instructor','juan.perez@example.com','3126798582','2024-07-25 19:56:18','2024-07-25 19:56:18'),(3,'Juan Francisco','García Flores','123456789','Instructor','paula@gmail.com','5553428400','2024-07-26 16:57:00','2024-07-26 17:20:59');
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
  `Obs_Siembra` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siembra`
--

LOCK TABLES `siembra` WRITE;
/*!40000 ALTER TABLE `siembra` DISABLE KEYS */;
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
  `Obs_Traslado` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Hor_Traslado` time NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Traslado`),
  KEY `Id_Responsable` (`Id_Responsable`),
  CONSTRAINT `traslados_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traslados`
--

LOCK TABLES `traslados` WRITE;
/*!40000 ALTER TABLE `traslados` DISABLE KEYS */;
/*!40000 ALTER TABLE `traslados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-27 12:44:09
