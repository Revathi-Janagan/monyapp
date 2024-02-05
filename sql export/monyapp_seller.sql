-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: monyapp
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `seller_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `acc_no` varchar(20) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `gst_no` varchar(20) DEFAULT NULL,
  `pancard_no` varchar(10) DEFAULT NULL,
  `aadhaar_no` varchar(20) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`seller_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `acc_no_UNIQUE` (`acc_no`),
  UNIQUE KEY `gst_no_UNIQUE` (`gst_no`),
  UNIQUE KEY `pancard_no_UNIQUE` (`pancard_no`),
  UNIQUE KEY `aadhaar_no_UNIQUE` (`aadhaar_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (1,'Peter','salem','hello@gmail.com','$2b$10$a23u5ope6irOzbYyeOhtOe/CgYItvzlVxPYXrj67gk9nVCB/KumRi','77412589630','Mony','8521479630','Salem','INDI234','company_logo-1703161832474-547587988.png','Hcl Solutions','852369874',NULL,'23569874102358','698745'),(3,'Varun','Erode','varun@gmail.com','$2b$10$7U1X7vR7v0F6x9t2IhxE6uhpWxSkyFJPaNkHhFD5pMowC.R61Kg..','7894561230','Mony','3692581470123','Salem','INDU1123','company_logo-1703162447971-859984108.jpg','Tech Solutions','9632587410258',NULL,'321456987412563','636502'),(4,'Mani','South car street','mani@gmail.com','$2b$10$SRp80OkdJF/l2o7COVm26u7B2mj.NVuEmmOlH14fU/kW9kv3As3OC','8527419630','Mony','989451112223365','Salem','IDIB1254','company_logo-1703162793179-516302401.jpg','BPR Company','9988774411225563',NULL,'98741225663300122','636502'),(5,'Subash','Salem','subash@gmail.com','$2b$10$tKslDLAX3ijU2t65HBPMXOG1xLXuLvW5NQzCYSt.c74PVomFzYvie','0638105537','Mony','8523697102314','Salem','IDIB135','company_logo-1706939204138-988334106.png','Subash&Co','7845126902365',NULL,'9874632103216','636502'),(6,'Taj','Salem','taj@gmail.com','$2b$10$9WsbflmfmMx28.4ii488r.Zlp8Am8JKKurGmm9qej7Xm.uBLR.t/e','987120360540','taj','74125','dafff','fff455','company_logo-1707112637389-577442795.png','taj','fff45rr',NULL,'555555566666666','636502');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-05 11:56:00
