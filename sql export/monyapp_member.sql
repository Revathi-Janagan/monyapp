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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memb_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `acc_no` varchar(20) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `pancard_no` varchar(10) DEFAULT NULL,
  `aadhaar_no` varchar(20) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`memb_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `acc_no_UNIQUE` (`acc_no`),
  UNIQUE KEY `pancard_no_UNIQUE` (`pancard_no`),
  UNIQUE KEY `aadhaar_no_UNIQUE` (`aadhaar_no`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `member` (`memb_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (11,'Peter','Erode','peter@gmail.com','$2b$10$7wPg.c6Bz1OMPUgs8O64c.bsWGj2LXrGhsh6KDuui7/.bRPLU96aC','7894563210','Mony','789456123032145','Erode','IDIB1235',NULL,'98745632103214','636300',NULL),(14,'Mony','Erode','mony1@gmail.com','$2b$10$kiYbKpNGRXk9S8QKwb5emuSDuFxP8tHXCvKnRZ50lk1rjzDv6X59a','8523697410','Mony','789456123032146','Erode','IDIB1237',NULL,'987456321032144','636300',NULL),(15,'Hari','Salem','hari@gmail.com','$2b$10$8DAlqWa0PhsOKUajVAHm1OhoG1IXTxI4JFTFhlrd67spfAnFzi08K','7845120369','Mony','85236974102312','Salem','IDIB1237',NULL,'98745632103213','636501',NULL),(16,'Varun','Salem','varun@gmail.com','$2b$10$2IBhAJS6lscpPMFmWUY.6uFdO5SR7AwsAr.itynCNy04TRPpcx/we','7894561230','Mony','85236974102315','Salem','IDIB1237',NULL,'98745632103211','636502',NULL),(23,'Mani','Salem','mani@gmail.com','$2b$10$XuVjSeiqOtwNr6rU5uEDquneC58U.E128DFAJxJ73YdPPsvlwts5q','78963025410','Mony','85236974102318','Salem','IDIB1231',NULL,'98745632103216','636502',NULL),(24,'John Doe','123 Main Street','john.doe@example.com','securePassword123','9876543210','John Doe\'s Account','0123456789','City Branch','ABCD0123456','ABCDE1234F','1234-5678-9012','123456',14),(26,'John Doe','123 Main Street','john@example.com','securePassword123','9876542210','John Doe\'s Account','0123466789','City Branch','ABCD0133456','ABCDE3234F','1534-5678-9012','123456',14),(27,'John 1','123 Main Street','john1@example.com','securePassword123','9886642210','John Doe\'s Account','0122466789','City Branch','ABCD0133456','ABCD33234F','1554-5678-9012','123456',14),(28,'Vani','Salem','vani@gmail.com','$2b$10$1F5p1IIl0K6vdyXx/AmWFOpkm0OTyBaPprYT5fQjhmFExXQqXihVq','7456123980','Mony','85237974102314','Salem','IDIB1287','CTOPR4318T','98745732103214','636502',14),(29,'venu','Salem','venu@gmail.com','$2b$10$eIhMZMp/7MPJCxKovwz9Pu3.n0MJ6cr2cDAv9UTnHDmJx6i13ckBq','7893021452','Mony','85236954102314','Salem','IDIB5235','CTOPR3328T','98645632103214','636502',14),(31,'Karan','salem','karan@gmail.com','$2b$10$ITEC0weDNnSQDZ.Ia8mkWu3oAJCwoLV0P7iCuqoDwvGPo1phPYVM.','8712306541','Mony','3333222145698','Salem','IDIB1201','CTOPA4318T','945632103214','636502',29),(32,'Revathi','Salem','srevathisona@gmail.com','$2b$10$o7rFssJZDu6nZSw5vOyb7eL3QcRDLxQvu5Q8n1MV7oMrf8J2Kf8km','853674109','Mony','JD908765','Salem','IBDI9804F','BB45637','78963025419874','636502',31),(33,'sai','Salem','sai@gmail.com','$2b$10$6pQcP7TyQW6sl..8Y8SP2eIv1muNfoDSyqRIJ8ZaLNpRN4DJptXZG','34556666','Mony','85206974102314','Erode','IDIB235','CTOPR4318a','9874563210321344','636502',14);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
