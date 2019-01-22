-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: ridderredderapi
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `element`
--

DROP TABLE IF EXISTS `element`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `element` (
  `ElementId` int(11) NOT NULL,
  `ElementName` varchar(45) NOT NULL,
  `ElementCounterId` int(11) NOT NULL,
  PRIMARY KEY (`ElementId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `element`
--

LOCK TABLES `element` WRITE;
/*!40000 ALTER TABLE `element` DISABLE KEYS */;
/*!40000 ALTER TABLE `element` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventoryitem`
--

DROP TABLE IF EXISTS `inventoryitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inventoryitem` (
  `InventoryItemId` int(11) NOT NULL AUTO_INCREMENT,
  `AuthId` varchar(255) NOT NULL,
  `ItemImageId` int(11) NOT NULL,
  `ItemTypeId` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  PRIMARY KEY (`InventoryItemId`),
  KEY `fkIdx_44` (`AuthId`),
  KEY `FK_55_idx` (`ItemTypeId`),
  KEY `FK_66_idx` (`ItemImageId`),
  CONSTRAINT `FK_44` FOREIGN KEY (`AuthId`) REFERENCES `player` (`authid`),
  CONSTRAINT `FK_55` FOREIGN KEY (`ItemTypeId`) REFERENCES `itemtype` (`itemtypeid`),
  CONSTRAINT `FK_66` FOREIGN KEY (`ItemImageId`) REFERENCES `itemimage` (`itemimageid`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventoryitem`
--

LOCK TABLES `inventoryitem` WRITE;
/*!40000 ALTER TABLE `inventoryitem` DISABLE KEYS */;
INSERT INTO `inventoryitem` VALUES (164,'google-oauth2|111937337989648206389',5,1,4),(167,'google-oauth2|111937337989648206389',7,1,5),(169,'google-oauth2|111937337989648206389',3,1,3),(170,'google-oauth2|111937337989648206389',1,1,5),(172,'google-oauth2|111937337989648206389',2,1,4),(175,'google-oauth2|111937337989648206389',6,1,4);
/*!40000 ALTER TABLE `inventoryitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemimage`
--

DROP TABLE IF EXISTS `itemimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `itemimage` (
  `ItemImageId` int(11) NOT NULL AUTO_INCREMENT,
  `Path` varchar(255) NOT NULL,
  PRIMARY KEY (`ItemImageId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemimage`
--

LOCK TABLES `itemimage` WRITE;
/*!40000 ALTER TABLE `itemimage` DISABLE KEYS */;
INSERT INTO `itemimage` VALUES (1,'assets/knights/knight_cyan.png'),(2,'assets/knights/knight_darkblue.png'),(3,'assets/knights/knight_green.png'),(4,'assets/knights/knight_lightblue.png'),(5,'assets/knights/knight_pink.png'),(6,'assets/knights/knight_red.png'),(7,'assets/knights/knight_white.png'),(8,'assets/knights/knight_yellow.png');
/*!40000 ALTER TABLE `itemimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemtype`
--

DROP TABLE IF EXISTS `itemtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `itemtype` (
  `ItemTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `ItemTypeName` varchar(45) NOT NULL,
  PRIMARY KEY (`ItemTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemtype`
--

LOCK TABLES `itemtype` WRITE;
/*!40000 ALTER TABLE `itemtype` DISABLE KEYS */;
INSERT INTO `itemtype` VALUES (1,'Knight'),(2,'Potion');
/*!40000 ALTER TABLE `itemtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knight`
--

DROP TABLE IF EXISTS `knight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `knight` (
  `KnightId` int(11) NOT NULL AUTO_INCREMENT,
  `AuthId` varchar(255) NOT NULL,
  `LandmarkId` int(11) DEFAULT NULL,
  `Colour` int(11) NOT NULL,
  `Level` int(11) NOT NULL,
  PRIMARY KEY (`KnightId`),
  KEY `LandmarkId_idx` (`LandmarkId`),
  CONSTRAINT `LandmarkId` FOREIGN KEY (`LandmarkId`) REFERENCES `landmark` (`landmarkid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knight`
--

LOCK TABLES `knight` WRITE;
/*!40000 ALTER TABLE `knight` DISABLE KEYS */;
INSERT INTO `knight` VALUES (34,'google-oauth2|111937337989648206389',47,5,3),(42,'auth0|5bfe96d135b0da3846796a38',20,6,4),(43,'auth0|5bfe96d135b0da3846796a38',20,4,7),(44,'auth0|5bfe96d135b0da3846796a38',20,8,7);
/*!40000 ALTER TABLE `knight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `landmark`
--

DROP TABLE IF EXISTS `landmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `landmark` (
  `LandmarkId` int(11) NOT NULL AUTO_INCREMENT,
  `Lat` double DEFAULT NULL,
  `Lng` double DEFAULT NULL,
  `Name` text,
  `Owner` varchar(767) DEFAULT NULL,
  PRIMARY KEY (`LandmarkId`),
  KEY `IX_Landmark_Owner` (`Owner`),
  CONSTRAINT `FK_Landmark_Player_Owner` FOREIGN KEY (`Owner`) REFERENCES `player` (`authid`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landmark`
--

LOCK TABLES `landmark` WRITE;
/*!40000 ALTER TABLE `landmark` DISABLE KEYS */;
INSERT INTO `landmark` VALUES (20,51.45509,3.575453,'Melvin Huis','auth0|5bfe96d135b0da3846796a38'),(46,51.21401,4.44316435,'\'t Werkhuys',NULL),(47,51.22444,4.456818,'Bibliotheek Couwelaar','admin'),(48,51.1908035,4.37314034,'Cultureel Ontmoetingscentrum Nova',NULL),(49,51.24738,4.449413,'Bilbiotheek Park',NULL),(50,51.28107,4.42043,'Bibliotheek Driehoek',NULL),(51,51.2071037,4.45891857,'Bibliotheek Arena',NULL),(52,51.2156219,4.43215227,'Bibliotheek Vrede',NULL),(53,51.34744,4.331444,'Bibliotheek Viswater',NULL),(54,51.1955338,4.441295,'Kinderbib De Vertellerij',NULL),(55,51.19517,4.42151451,'Bibliotheek De Poort',NULL),(56,51.3594322,4.31174755,'Vrijetijdscentrum De Schelde',NULL),(57,51.2505379,4.43726063,'Cultuurcentrum Merksem',NULL),(58,51.2377663,4.44342,'Ontmoetingcentrum MerksemDok',NULL),(59,51.1897125,4.38621664,'Bibliotheek Kielpark',NULL),(60,51.21473,4.39643955,'Bibliotheek Sint-Andries',NULL),(61,51.2259254,4.380645,'Elsschot',NULL),(62,51.2763977,4.36246061,'AIR Antwerpen',NULL),(63,51.1771774,4.34849262,'Gravenhof',NULL),(64,51.2259254,4.380645,'Elsschot',NULL),(65,51.2138519,4.44022751,'De Roma',NULL),(66,51.2217636,4.42088127,'Bibliotheek Permeke',NULL),(67,51.2217636,4.42088127,'Bibliotheek Permeke',NULL),(68,51.2267952,4.46813965,'CC Deurne',NULL),(69,51.1969,4.42246962,'Cultuurcentrum Berchem',NULL),(70,51.21531,4.41060972,'HETPALEIS',NULL),(71,51.2192154,4.413993,'Koningin Fabiolazaal',NULL),(72,51.253006,4.423258,'Bibliotheek Luchtbal',NULL),(73,51.1941147,4.404928,'deSingel',NULL),(74,51.216114,4.401789,'AMUZ',NULL),(75,51.2816849,4.44221544,'252 cc',NULL),(76,51.1712532,4.393759,'Cultuurcentrum De Kern',NULL),(77,51.1701622,4.39316559,'Bibliotheek Bist',NULL),(78,51.2256126,4.382099,'Cultuurcentrum Link',NULL),(79,51.25513,4.4451375,'Bibliotheek Maantje',NULL),(80,51.17494,4.34736967,'Bibliotheek Hoboken',NULL),(81,51.2032738,4.393745,'Bibliotheek Brederode',NULL),(82,51.2269936,4.44961071,'Cultureel Centrum Rix',NULL),(83,51.24587,4.45201731,'Cultuurcentrum Bouckenborgh',NULL),(84,51.2499,4.42300558,'Cultureel centrum Luchtbal',NULL),(85,51.2149239,4.395965,'Cultureel ontmoetingscentrum coStA',NULL),(86,51.2253,4.402299,'Het Stadsmagazijn',NULL),(87,51.2270737,4.43197966,'Het Oude Badhuis',NULL);
/*!40000 ALTER TABLE `landmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monstermodel`
--

DROP TABLE IF EXISTS `monstermodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `monstermodel` (
  `MonsterModelId` int(11) NOT NULL AUTO_INCREMENT,
  `MonsterModelPath` varchar(255) NOT NULL,
  `Owner` varchar(255) NOT NULL,
  PRIMARY KEY (`MonsterModelId`),
  KEY `FK_Owner_idx` (`Owner`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monstermodel`
--

LOCK TABLES `monstermodel` WRITE;
/*!40000 ALTER TABLE `monstermodel` DISABLE KEYS */;
INSERT INTO `monstermodel` VALUES (1,'https://image.flaticon.com/icons/png/512/1293/1293810.png',''),(2,'https://image.flaticon.com/icons/png/512/1293/1293716.png',''),(3,'https://image.flaticon.com/icons/png/512/1293/1293718.png',''),(4,'https://image.flaticon.com/icons/png/512/1293/1293812.png',''),(5,'https://image.flaticon.com/icons/png/512/1293/1293813.png',''),(6,'https://image.flaticon.com/icons/png/512/1293/1293816.png',''),(7,'https://image.flaticon.com/icons/png/512/1293/1293827.png','');
/*!40000 ALTER TABLE `monstermodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monstername`
--

DROP TABLE IF EXISTS `monstername`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `monstername` (
  `MonsterNameId` int(11) NOT NULL AUTO_INCREMENT,
  `MonsterNameText` varchar(45) NOT NULL,
  PRIMARY KEY (`MonsterNameId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monstername`
--

LOCK TABLES `monstername` WRITE;
/*!40000 ALTER TABLE `monstername` DISABLE KEYS */;
INSERT INTO `monstername` VALUES (1,'Charles'),(2,'Pete'),(3,'Vlad'),(4,'Rick'),(5,'Jack'),(6,'Steve'),(7,'Steven'),(8,'Samuel'),(9,'Harry');
/*!40000 ALTER TABLE `monstername` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monsters`
--

DROP TABLE IF EXISTS `monsters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `monsters` (
  `MonsterId` int(11) NOT NULL AUTO_INCREMENT,
  `MonsterModelId` int(11) DEFAULT NULL,
  `MonsterTitleId` int(11) DEFAULT NULL,
  `MonsterNameId` int(11) DEFAULT NULL,
  PRIMARY KEY (`MonsterId`),
  KEY `IX_Monsters_MonsterModelId` (`MonsterModelId`),
  KEY `IX_Monsters_MonsterNameId` (`MonsterNameId`),
  KEY `IX_Monsters_MonsterTitleId` (`MonsterTitleId`),
  CONSTRAINT `FK_Monsters_MonsterModel_MonsterModelId` FOREIGN KEY (`MonsterModelId`) REFERENCES `monstermodel` (`monstermodelid`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Monsters_MonsterName_MonsterNameId` FOREIGN KEY (`MonsterNameId`) REFERENCES `monstername` (`monsternameid`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Monsters_MonsterTitle_MonsterTitleId` FOREIGN KEY (`MonsterTitleId`) REFERENCES `monstertitle` (`monstertitleid`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monsters`
--

LOCK TABLES `monsters` WRITE;
/*!40000 ALTER TABLE `monsters` DISABLE KEYS */;
/*!40000 ALTER TABLE `monsters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monstertitle`
--

DROP TABLE IF EXISTS `monstertitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `monstertitle` (
  `MonsterTitleId` int(11) NOT NULL AUTO_INCREMENT,
  `MonsterTitleText` varchar(45) NOT NULL,
  PRIMARY KEY (`MonsterTitleId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monstertitle`
--

LOCK TABLES `monstertitle` WRITE;
/*!40000 ALTER TABLE `monstertitle` DISABLE KEYS */;
INSERT INTO `monstertitle` VALUES (1,'Duke'),(2,'Baron'),(3,'Pirate'),(4,'Captain'),(5,'Gutripper'),(6,'Haunting'),(7,'Skeletal'),(8,'Undead'),(9,'Overlord'),(10,'Titan'),(11,'Punishing'),(12,'Barbaric'),(13,'Drunken'),(14,'Epic'),(15,'Heroic'),(16,'Glorious'),(17,'Enraged');
/*!40000 ALTER TABLE `monstertitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monument`
--

DROP TABLE IF EXISTS `monument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `monument` (
  `MonumentId` int(11) NOT NULL,
  `PosX` float NOT NULL,
  `PosY` float NOT NULL,
  `Owner` varchar(255) NOT NULL,
  PRIMARY KEY (`MonumentId`),
  KEY `FK_Owner_idx` (`Owner`),
  CONSTRAINT `FK_Owner` FOREIGN KEY (`Owner`) REFERENCES `player` (`authid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monument`
--

LOCK TABLES `monument` WRITE;
/*!40000 ALTER TABLE `monument` DISABLE KEYS */;
/*!40000 ALTER TABLE `monument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `player` (
  `AuthId` varchar(255) NOT NULL,
  `PlayerName` varchar(45) NOT NULL,
  `Experience` int(11) NOT NULL,
  PRIMARY KEY (`AuthId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('admin','Buzz',29381),('auth0|5bfe96d135b0da3846796a38','m.bootsgezel',3283),('google-oauth2|111937337989648206389','ratmorningstar',8753),('user1','Ratty',0),('user2','Tom',0),('user3','Sven',0);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-21 22:34:19
