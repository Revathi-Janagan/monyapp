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
-- Table structure for table `earnings`
--

DROP TABLE IF EXISTS `earnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `earnings` (
  `earning_id` int NOT NULL AUTO_INCREMENT,
  `memb_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `todays_earnings` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_earnings` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`earning_id`),
  KEY `memb_id` (`memb_id`),
  CONSTRAINT `earnings_ibfk_1` FOREIGN KEY (`memb_id`) REFERENCES `member` (`memb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `earnings`
--

LOCK TABLES `earnings` WRITE;
/*!40000 ALTER TABLE `earnings` DISABLE KEYS */;
/*!40000 ALTER TABLE `earnings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genealogy_tree`
--

DROP TABLE IF EXISTS `genealogy_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genealogy_tree` (
  `relationship_id` int NOT NULL AUTO_INCREMENT,
  `ancestor_id` int DEFAULT NULL,
  `descendant_id` int DEFAULT NULL,
  PRIMARY KEY (`relationship_id`),
  KEY `ancestor_id` (`ancestor_id`),
  KEY `descendant_id` (`descendant_id`),
  CONSTRAINT `genealogy_tree_ibfk_1` FOREIGN KEY (`ancestor_id`) REFERENCES `member` (`memb_id`),
  CONSTRAINT `genealogy_tree_ibfk_2` FOREIGN KEY (`descendant_id`) REFERENCES `member` (`memb_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genealogy_tree`
--

LOCK TABLES `genealogy_tree` WRITE;
/*!40000 ALTER TABLE `genealogy_tree` DISABLE KEYS */;
INSERT INTO `genealogy_tree` VALUES (1,14,24),(2,14,26),(3,14,27),(4,14,28),(5,14,29),(6,29,31);
/*!40000 ALTER TABLE `genealogy_tree` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (11,'Peter','Erode','peter@gmail.com','$2b$10$7wPg.c6Bz1OMPUgs8O64c.bsWGj2LXrGhsh6KDuui7/.bRPLU96aC','7894563210','Mony','789456123032145','Erode','IDIB1235',NULL,'98745632103214','636300',NULL),(14,'Mony','Erode','mony1@gmail.com','$2b$10$kiYbKpNGRXk9S8QKwb5emuSDuFxP8tHXCvKnRZ50lk1rjzDv6X59a','8523697410','Mony','789456123032146','Erode','IDIB1237',NULL,'987456321032144','636300',NULL),(15,'Hari','Salem','hari@gmail.com','$2b$10$8DAlqWa0PhsOKUajVAHm1OhoG1IXTxI4JFTFhlrd67spfAnFzi08K','7845120369','Mony','85236974102312','Salem','IDIB1237',NULL,'98745632103213','636501',NULL),(16,'Varun','Salem','varun@gmail.com','$2b$10$2IBhAJS6lscpPMFmWUY.6uFdO5SR7AwsAr.itynCNy04TRPpcx/we','7894561230','Mony','85236974102315','Salem','IDIB1237',NULL,'98745632103211','636502',NULL),(23,'Mani','Salem','mani@gmail.com','$2b$10$XuVjSeiqOtwNr6rU5uEDquneC58U.E128DFAJxJ73YdPPsvlwts5q','78963025410','Mony','85236974102318','Salem','IDIB1231',NULL,'98745632103216','636502',NULL),(24,'John Doe','123 Main Street','john.doe@example.com','securePassword123','9876543210','John Doe\'s Account','0123456789','City Branch','ABCD0123456','ABCDE1234F','1234-5678-9012','123456',14),(26,'John Doe','123 Main Street','john@example.com','securePassword123','9876542210','John Doe\'s Account','0123466789','City Branch','ABCD0133456','ABCDE3234F','1534-5678-9012','123456',14),(27,'John 1','123 Main Street','john1@example.com','securePassword123','9886642210','John Doe\'s Account','0122466789','City Branch','ABCD0133456','ABCD33234F','1554-5678-9012','123456',14),(28,'Vani','Salem','vani@gmail.com','$2b$10$1F5p1IIl0K6vdyXx/AmWFOpkm0OTyBaPprYT5fQjhmFExXQqXihVq','7456123980','Mony','85237974102314','Salem','IDIB1287','CTOPR4318T','98745732103214','636502',14),(29,'venu','Salem','venu@gmail.com','$2b$10$eIhMZMp/7MPJCxKovwz9Pu3.n0MJ6cr2cDAv9UTnHDmJx6i13ckBq','7893021452','Mony','85236954102314','Salem','IDIB5235','CTOPR3328T','98645632103214','636502',14),(31,'Karan','salem','karan@gmail.com','$2b$10$ITEC0weDNnSQDZ.Ia8mkWu3oAJCwoLV0P7iCuqoDwvGPo1phPYVM.','8712306541','Mony','3333222145698','Salem','IDIB1201','CTOPA4318T','945632103214','636502',29);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `memb_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `order_receipt` varchar(255) DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity` int NOT NULL DEFAULT '1',
  `order_commission` decimal(5,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`order_id`),
  KEY `memb_id` (`memb_id`),
  KEY `seller_id` (`seller_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`memb_id`) REFERENCES `member` (`memb_id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`),
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_images` json DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `total_stocks_added` varchar(255) DEFAULT NULL,
  `no_of_stocks_available` varchar(255) DEFAULT NULL,
  `commission_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `mrp_price` decimal(10,2) NOT NULL,
  `offer` decimal(5,2) DEFAULT NULL,
  `final_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (1,'Peter','salem','hello@gmail.com','$2b$10$a23u5ope6irOzbYyeOhtOe/CgYItvzlVxPYXrj67gk9nVCB/KumRi','77412589630','Mony','8521479630','Salem','INDI234','company_logo-1703161832474-547587988.png','Hcl Solutions','852369874',NULL,'23569874102358','698745'),(3,'Varun','Erode','varun@gmail.com','$2b$10$7U1X7vR7v0F6x9t2IhxE6uhpWxSkyFJPaNkHhFD5pMowC.R61Kg..','7894561230','Mony','3692581470123','Salem','INDU1123','company_logo-1703162447971-859984108.jpg','Tech Solutions','9632587410258',NULL,'321456987412563','636502'),(4,'Mani','South car street','mani@gmail.com','$2b$10$SRp80OkdJF/l2o7COVm26u7B2mj.NVuEmmOlH14fU/kW9kv3As3OC','8527419630','Mony','989451112223365','Salem','IDIB1254','company_logo-1703162793179-516302401.jpg','BPR Company','9988774411225563',NULL,'98741225663300122','636502');
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

-- Dump completed on 2024-01-05 14:37:17
