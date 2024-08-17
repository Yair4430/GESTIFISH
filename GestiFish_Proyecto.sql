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
  `Nom_Actividad` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Des_Actividad` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Fec_Actividad` date NOT NULL,
  `Hor_Actividad` time NOT NULL,
  `Fas_Produccion` enum('Antes de la cosecha','Despues de la cosecha') COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Estanque` int NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Actividad`),
  KEY `Id_Estaque` (`Id_Estanque`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Estanque` (`Id_Estanque`),
  CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `actividad_ibfk_2` FOREIGN KEY (`Id_Estanque`) REFERENCES `estanque` (`Id_Estanque`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES (7,'BOOOOOooooooooo','FUNCIONEEEEERRRRRRRR',5,'2024-08-02','08:54:00','Despues de la cosecha',1,'2024-08-14 00:53:48','2024-08-14 00:53:48');
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
  `Can_Racion Kg` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Tip_Alimento` enum('Concentrado','Sal') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Hor_Alimentación` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Vlr_Alimentación` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `Pes_Eviscerado` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Pes_Viscerado` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Por_Visceras` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Hor_Cosecha` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Vlr_Cosecha` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Obs_Cosecha` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `Nom_Especie` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Car_Especie` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Img_Especie` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tam_Promedio` int NOT NULL,
  `Den_Especie` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Especie`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
INSERT INTO `especie` VALUES (1,'Carpa','Resistente, de agua dulce','1723003859221.jpeg',50,'Baja','2024-08-07 04:10:59','2024-08-07 04:10:59'),(2,'mmmmmmmmmm','Resistente, de agua dulce','1723007767293.jpeg',50,'Baja','2024-08-07 04:11:50','2024-08-07 05:16:07'),(4,'SHIPPPP SIUUUUU','LOOOO LOGREEE','1723008505328.jpeg',4444,'11111','2024-08-07 05:28:25','2024-08-07 05:28:34');
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
  `Nom_Estanque` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Esp_Agua` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tip_Estanque` enum('Estanque','Lago') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Lar_Estanque` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Anc_Estanque` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Des_Estanque` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Img_Estanque` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Rec_Agua` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
INSERT INTO `estanque` VALUES (1,'yair Alexander','2','Lago','3','2','Es grande','1722606262535.jpeg','22','2024-08-02 13:44:24','2024-08-02 23:34:27'),(2,'juanaaaaa','444','Lago','333','4444','ta pequeño','1722606322065.jpeg','555','2024-08-02 13:45:22','2024-08-10 20:35:20');
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
  `Mot_Mortalidad` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `Obs_Muestreo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Pes_Esperado` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Id_Siembra` int NOT NULL,
  `Id_Responsable` int NOT NULL,
  `Hor_Muestreo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Pes_Promedio` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `Nom_Responsable` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Ape_Responsable` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Doc_Responsable` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tip_Responsable` enum('Instructor','Pasante','Instructor a cargo de la Unidad') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Cor_Responsable` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Num_Responsable` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (5,'Yair Alexander','Cardenas Guzman','1108453116','Pasante','yairguz2523@gmail.com','3138409787','2024-07-27 20:17:55','2024-07-27 20:19:39'),(15,'FUNCIONA WIIIIIIII','POR DIOS','1111','Pasante','yairguz2523@gmail.com','11111','2024-08-05 01:07:23','2024-08-05 01:07:38'),(17,'Enbo','Ortiz','1233455','Instructor','1234@gmail.com','3138409787','2024-08-14 13:49:53','2024-08-14 13:49:53');
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
  `Obs_Traslado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Hor_Traslado` time NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Traslado`),
  KEY `Id_Responsable` (`Id_Responsable`),
  CONSTRAINT `traslados_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traslados`
--

LOCK TABLES `traslados` WRITE;
/*!40000 ALTER TABLE `traslados` DISABLE KEYS */;
INSERT INTO `traslados` VALUES (35,'2024-08-01',1222,5,'ww','00:00:00','2024-08-07 20:44:08','2024-08-10 17:22:57'),(38,'2024-08-07',111111,5,'ww','07:50:00','2024-08-10 21:48:42','2024-08-10 21:48:48');
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
  `Nom_Usuario` varchar(50) NOT NULL,
  `Ape_Usuario` varchar(50) NOT NULL,
  `Cor_Usuario` varchar(100) NOT NULL,
  `Con_Usuario` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,'YAIR','CARDENAS','yairguz2523@gmail.com','$2a$08$uV3M9FJHqlxJ1aylf4P9GOyW6aT2vQ60YfzcCClM4JV.hhLS4bGw6','2024-08-14 14:55:31','2024-08-14 14:55:31'),(4,'JORGE','LOPEZ','$2a$08$JXyBkcFG9hQU3H1py8NO9.pmSZuAKdMYFWOn8.Ik2u/Q7wQsSn.7y','$2a$08$Dx3XfipoxfM2J0F4MCcsF.Mo5a85mBb502BH3TDHXAapkEWLZ/dBe','2024-08-15 19:03:52','2024-08-15 19:03:52'),(7,'juandavid','rodriguez','$2a$08$8vNqoIQrExJj/NEnZBO.iO2FXCWZp7RQx.WSMjZf5ciFitTCOzBcO','$2a$08$/pS6pGN0/1gw1Vu/qO8z9eEdEONGs2hW1qYj5wYeph0bx9RiJr9k6','2024-08-15 19:58:46','2024-08-15 19:58:46'),(8,'juandavid','rodriguez','$2a$08$AuqVu7akQUGL86CLzh/3vudFX/SC6Y0jBmzRNxfmhrdQwQNJEU8dK','$2a$08$7r.NuMpCJU82nQYOlbN2.ug4Lj.cwPgtrNWgGo51rRukwB2uFtVHC','2024-08-15 19:58:55','2024-08-15 19:58:55'),(9,'juanito aniñana','kkokkok','$2a$08$jOsQFyBiRTg7dDMp9taM0.7rDWWZzO6Z6IVio1P9mJ2nrTdwe5u0y','$2a$08$iYsdROuyka43XZhfj0Q8leed/BJ5/v1vhPeXrfs0iw/hJIVdoEG9m','2024-08-15 20:23:02','2024-08-15 20:23:02'),(10,'weewna','ewewew','$2a$08$wDIMWVAKbynAFRX9eXFlV.3nVneVfqcPBhzZC6vJQGxzHiihPJLIm','$2a$08$HEA5iFdEiaodRcQYqP4SQuUhy4KENOmp415GWqJWz3dooXfRPuJgG','2024-08-15 20:25:53','2024-08-15 20:25:53');
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

-- Dump completed on 2024-08-16 20:14:06
