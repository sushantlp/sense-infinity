-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: sense8
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180630072613-create-user.js'),('20180630075544-create-user-roles.js'),('20180630080238-create-error-logs.js'),('20180630081718-create-category.js'),('20180630082241-create-input-type.js'),('20180630083525-create-gender.js'),('20180701072635-create-sms.js'),('20180701081550-create-city.js'),('20180701083708-create-locality.js'),('20180701085749-create-feedback-question.js'),('20180701175853-create-feedback-option.js'),('20180701180906-create-sense-constant.js'),('20180701184136-create-survey-question.js'),('20180701185935-create-survey-option.js'),('20180701190447-create-partner.js'),('20180701191054-create-partner-store.js'),('20180701191538-create-store-complain.js'),('20180701192152-create-device-detail.js'),('20190121084746-create-customer-information-data.js'),('20190121102127-create-partner-link-customer.js'),('20190121113750-create-customer-information-track.js'),('20190202083232-create-customer-reward-question.js'),('20190202090541-create-customer-reward-option.js'),('20190202093515-create-reward-question-response.js'),('20190213131515-create-customer-membership-card.js'),('20190313045152-create-api-key.js'),('20190313051909-create-scope-list.js'),('20190313053724-create-api-scope.js'),('20190313060232-create-membership-list.js'),('20190313064626-create-coupon-list.js'),('20190313065628-create-offer-static-data.js'),('20190313080139-create-coupon-offer.js'),('20190313082321-create-coupon-offer-value.js'),('20190313082347-create-coupon-offer-free.js'),('20190313093209-create-warehouse-role-list.js'),('20190313095957-create-warehouse-payment-type.js'),('20190313100416-create-warehouse-employee-list.js'),('20190313103056-create-warehouse-information-list.js'),('20190313105440-create-global-category.js'),('20190313105454-create-global-sub-category.js'),('20190313105501-create-global-sub-sub-category.js'),('20190313110724-create-product-unit.js'),('20190313110736-create-product-sub-unit.js'),('20190313122614-create-store-counter.js'),('20190314065048-create-warehouse-user-list.js'),('20190314065427-create-store-order.js'),('20190314065641-create-store-order-detail.js'),('20190314065904-create-login-history.js'),('20190314070055-create-invoice.js'),('20190314110455-create-invoice-coupon.js'),('20190314111542-create-invoice-payment.js'),('20190314123150-create-invoice-product.js'),('20190314124116-create-manual-discount.js'),('20190314133513-create-discount-type.js'),('20190314133657-create-discount-base.js'),('20190315053115-create-product-discount.js'),('20190315061540-create-free-product-offer.js'),('20190315062205-create-value-product-offer.js'),('20190315062636-create-bill-discount.js'),('20190316070755-create-warehouse-static-version.js'),('20190316084811-create-coupon-sync.js'),('20190316084829-create-membership-sync.js'),('20190319082222-create-coupon-type.js'),('20190319082230-create-coupon-sub-type.js'),('20190319082302-create-item-condition.js'),('20190319082321-create-order-status.js'),('20190322070847-drop-column-partner-store.js'),('20190322082741-change-datatype-column-partner-store.js'),('20190326120758-create-system-administrator-password.js'),('20190327073213-create-warehouse-user-employee-connect.js'),('20190329055101-create-staple-product.js'),('20190329055113-create-staple-product-size.js'),('20190329102830-create-tax-table.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_keys`
--

DROP TABLE IF EXISTS `api_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_keys` (
  `api_key_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `api_name` varchar(255) NOT NULL,
  `key_prefix` varchar(255) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `rate_limit` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`api_key_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `api_keys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_keys`
--

LOCK TABLES `api_keys` WRITE;
/*!40000 ALTER TABLE `api_keys` DISABLE KEYS */;
INSERT INTO `api_keys` VALUES (1,1,'Warehouse Api Key','zaCELgL','0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',20,1,'2019-03-29 12:04:27','2019-03-29 12:04:27');
/*!40000 ALTER TABLE `api_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_scopes`
--

DROP TABLE IF EXISTS `api_scopes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_scopes` (
  `api_scope_id` int(11) NOT NULL AUTO_INCREMENT,
  `api_key_id` int(11) NOT NULL,
  `scope_list_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`api_scope_id`),
  KEY `api_key_id` (`api_key_id`),
  KEY `scope_list_id` (`scope_list_id`),
  CONSTRAINT `api_scopes_ibfk_1` FOREIGN KEY (`api_key_id`) REFERENCES `api_keys` (`api_key_id`),
  CONSTRAINT `api_scopes_ibfk_2` FOREIGN KEY (`scope_list_id`) REFERENCES `scope_lists` (`scope_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_scopes`
--

LOCK TABLES `api_scopes` WRITE;
/*!40000 ALTER TABLE `api_scopes` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_scopes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_discounts`
--

DROP TABLE IF EXISTS `bill_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_discounts` (
  `bill_discount_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `discount_base_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `min_discount_amount` float DEFAULT '0',
  `max_discount_amount` float DEFAULT '0',
  `bill_offer_value` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`bill_discount_id`),
  KEY `store_id` (`store_id`),
  KEY `discount_base_id` (`discount_base_id`),
  CONSTRAINT `bill_discounts_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`),
  CONSTRAINT `bill_discounts_ibfk_2` FOREIGN KEY (`discount_base_id`) REFERENCES `discount_bases` (`discount_base_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_discounts`
--

LOCK TABLES `bill_discounts` WRITE;
/*!40000 ALTER TABLE `bill_discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1000,'SUPERMARKET',1,'2019-03-29 11:59:53','2019-03-29 11:59:53');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `currency_hex_code` varchar(255) NOT NULL,
  `currency_text` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Bengaluru','91',77.5946,12.9716,'&#8377;','INR',1,'2019-03-29 12:00:04','2019-03-29 12:00:04'),(2,'New Delhi','91',77.209,28.6139,'&#8377;','INR',1,'2019-03-29 12:00:04','2019-03-29 12:00:04'),(3,'Noida','91',77.391,28.5355,'&#8377;','INR',1,'2019-03-29 12:00:04','2019-03-29 12:00:04'),(4,'Goa','91',74.124,15.2993,'&#8377;','INR',1,'2019-03-29 12:00:04','2019-03-29 12:00:04'),(5,'Chandigarh','91',76.7794,30.7333,'&#8377;','INR',1,'2019-03-29 12:00:04','2019-03-29 12:00:04'),(6,'Chennai','91',80.2707,13.0827,'&#8377;','INR',1,'2019-03-29 12:00:04','2019-03-29 12:00:04');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_lists`
--

DROP TABLE IF EXISTS `coupon_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_lists` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_code` bigint(20) NOT NULL,
  `expiry` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_lists`
--

LOCK TABLES `coupon_lists` WRITE;
/*!40000 ALTER TABLE `coupon_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_offer_frees`
--

DROP TABLE IF EXISTS `coupon_offer_frees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_offer_frees` (
  `coupon_offer_free_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_offer_id` int(11) NOT NULL,
  `barcode` bigint(20) NOT NULL,
  `quantity` int(11) DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_offer_free_id`),
  KEY `coupon_offer_id` (`coupon_offer_id`),
  CONSTRAINT `coupon_offer_frees_ibfk_1` FOREIGN KEY (`coupon_offer_id`) REFERENCES `coupon_offers` (`coupon_offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_offer_frees`
--

LOCK TABLES `coupon_offer_frees` WRITE;
/*!40000 ALTER TABLE `coupon_offer_frees` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_offer_frees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_offer_values`
--

DROP TABLE IF EXISTS `coupon_offer_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_offer_values` (
  `coupon_offer_value_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_offer_id` int(11) NOT NULL,
  `value` float DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_offer_value_id`),
  KEY `coupon_offer_id` (`coupon_offer_id`),
  CONSTRAINT `coupon_offer_values_ibfk_1` FOREIGN KEY (`coupon_offer_id`) REFERENCES `coupon_offers` (`coupon_offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_offer_values`
--

LOCK TABLES `coupon_offer_values` WRITE;
/*!40000 ALTER TABLE `coupon_offer_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_offer_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_offers`
--

DROP TABLE IF EXISTS `coupon_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_offers` (
  `coupon_offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `offer_static_id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL,
  `customer_information_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_offer_id`),
  KEY `offer_static_id` (`offer_static_id`),
  KEY `coupon_id` (`coupon_id`),
  KEY `customer_information_id` (`customer_information_id`),
  CONSTRAINT `coupon_offers_ibfk_1` FOREIGN KEY (`offer_static_id`) REFERENCES `offer_static_data` (`offer_static_id`),
  CONSTRAINT `coupon_offers_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupon_lists` (`coupon_id`),
  CONSTRAINT `coupon_offers_ibfk_3` FOREIGN KEY (`customer_information_id`) REFERENCES `customer_information_data` (`customer_information_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_offers`
--

LOCK TABLES `coupon_offers` WRITE;
/*!40000 ALTER TABLE `coupon_offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_sub_types`
--

DROP TABLE IF EXISTS `coupon_sub_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_sub_types` (
  `coupon_sub_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_type_id` int(11) NOT NULL,
  `coupon_sub_type_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_sub_type_id`),
  KEY `coupon_type_id` (`coupon_type_id`),
  CONSTRAINT `coupon_sub_types_ibfk_1` FOREIGN KEY (`coupon_type_id`) REFERENCES `coupon_types` (`coupon_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_sub_types`
--

LOCK TABLES `coupon_sub_types` WRITE;
/*!40000 ALTER TABLE `coupon_sub_types` DISABLE KEYS */;
INSERT INTO `coupon_sub_types` VALUES (1,1,'Cash',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(2,1,'Cashback',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(3,1,'Complementary Product',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(4,2,'Cash Discount On Product',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(5,2,'Cashback On Product',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(6,2,'Complementary On Product',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(7,2,'Cash Discount On Category',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(8,2,'Cashback On Category',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(9,2,'Complementary On Category',1,'2019-03-29 12:03:47','2019-03-29 12:03:47'),(10,2,'Product Combo',1,'2019-03-29 12:03:47','2019-03-29 12:03:47');
/*!40000 ALTER TABLE `coupon_sub_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_syncs`
--

DROP TABLE IF EXISTS `coupon_syncs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_syncs` (
  `coupon_sync_id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `coupon_start_id` int(11) DEFAULT '0',
  `coupon_end_id` int(11) DEFAULT '0',
  `sync_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_sync_id`),
  KEY `partner_id` (`partner_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `coupon_syncs_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`),
  CONSTRAINT `coupon_syncs_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_syncs`
--

LOCK TABLES `coupon_syncs` WRITE;
/*!40000 ALTER TABLE `coupon_syncs` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_syncs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_types`
--

DROP TABLE IF EXISTS `coupon_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_types` (
  `coupon_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_type_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`coupon_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_types`
--

LOCK TABLES `coupon_types` WRITE;
/*!40000 ALTER TABLE `coupon_types` DISABLE KEYS */;
INSERT INTO `coupon_types` VALUES (1,'Bill Level Discount',1,'2019-03-29 12:03:38','2019-03-29 12:03:38'),(2,'Product Level Discount',1,'2019-03-29 12:03:38','2019-03-29 12:03:38');
/*!40000 ALTER TABLE `coupon_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_information_data`
--

DROP TABLE IF EXISTS `customer_information_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_information_data` (
  `customer_information_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `locality_id` int(11) DEFAULT NULL,
  `address_one` varchar(255) DEFAULT NULL,
  `address_two` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `married` tinyint(1) DEFAULT '0',
  `spouse_name` varchar(255) DEFAULT NULL,
  `anniversary_date` varchar(255) DEFAULT NULL,
  `reward_point` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`customer_information_id`),
  UNIQUE KEY `unique_index` (`mobile`,`country_code`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_information_data`
--

LOCK TABLES `customer_information_data` WRITE;
/*!40000 ALTER TABLE `customer_information_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_information_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_information_tracks`
--

DROP TABLE IF EXISTS `customer_information_tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_information_tracks` (
  `customer_information_track_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `locality_id` int(11) DEFAULT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `address_one` varchar(255) DEFAULT NULL,
  `address_two` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `gateway` varchar(255) DEFAULT NULL,
  `married` tinyint(1) DEFAULT '0',
  `spouse_name` varchar(255) DEFAULT NULL,
  `anniversary_date` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`customer_information_track_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_information_tracks`
--

LOCK TABLES `customer_information_tracks` WRITE;
/*!40000 ALTER TABLE `customer_information_tracks` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_information_tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_membership_cards`
--

DROP TABLE IF EXISTS `customer_membership_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_membership_cards` (
  `membership_card_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_information_id` int(11) NOT NULL,
  `membership_card_number` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`membership_card_id`),
  KEY `customer_information_id` (`customer_information_id`),
  CONSTRAINT `customer_membership_cards_ibfk_1` FOREIGN KEY (`customer_information_id`) REFERENCES `customer_information_data` (`customer_information_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_membership_cards`
--

LOCK TABLES `customer_membership_cards` WRITE;
/*!40000 ALTER TABLE `customer_membership_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_membership_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_reward_options`
--

DROP TABLE IF EXISTS `customer_reward_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_reward_options` (
  `reward_option_id` int(11) NOT NULL AUTO_INCREMENT,
  `option_value` varchar(255) NOT NULL,
  `reward_question_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`reward_option_id`),
  KEY `reward_question_id` (`reward_question_id`),
  CONSTRAINT `customer_reward_options_ibfk_1` FOREIGN KEY (`reward_question_id`) REFERENCES `customer_reward_questions` (`reward_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_reward_options`
--

LOCK TABLES `customer_reward_options` WRITE;
/*!40000 ALTER TABLE `customer_reward_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_reward_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_reward_questions`
--

DROP TABLE IF EXISTS `customer_reward_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_reward_questions` (
  `reward_question_id` int(11) NOT NULL AUTO_INCREMENT,
  `reward_question` varchar(255) NOT NULL,
  `input_id` int(11) NOT NULL,
  `reward_point` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`reward_question_id`),
  KEY `input_id` (`input_id`),
  CONSTRAINT `customer_reward_questions_ibfk_1` FOREIGN KEY (`input_id`) REFERENCES `input_types` (`input_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_reward_questions`
--

LOCK TABLES `customer_reward_questions` WRITE;
/*!40000 ALTER TABLE `customer_reward_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_reward_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_details`
--

DROP TABLE IF EXISTS `device_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_details` (
  `device_id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(10) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `app_id` varchar(255) DEFAULT NULL,
  `version_sdk` varchar(255) DEFAULT NULL,
  `version_release` varchar(255) DEFAULT NULL,
  `sense_version_number` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`device_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `device_details_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_details`
--

LOCK TABLES `device_details` WRITE;
/*!40000 ALTER TABLE `device_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_bases`
--

DROP TABLE IF EXISTS `discount_bases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discount_bases` (
  `discount_base_id` int(11) NOT NULL AUTO_INCREMENT,
  `discount_base_type` varchar(255) NOT NULL,
  `discount_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`discount_base_id`),
  KEY `discount_id` (`discount_id`),
  CONSTRAINT `discount_bases_ibfk_1` FOREIGN KEY (`discount_id`) REFERENCES `discount_types` (`discount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_bases`
--

LOCK TABLES `discount_bases` WRITE;
/*!40000 ALTER TABLE `discount_bases` DISABLE KEYS */;
INSERT INTO `discount_bases` VALUES (1,'Cash',1,1,'2019-03-29 12:03:08','2019-03-29 12:03:08'),(2,'Percent',1,1,'2019-03-29 12:03:08','2019-03-29 12:03:08'),(3,'Cash',2,1,'2019-03-29 12:03:08','2019-03-29 12:03:08'),(4,'Percent',2,1,'2019-03-29 12:03:08','2019-03-29 12:03:08'),(5,'Quantity',2,1,'2019-03-29 12:03:08','2019-03-29 12:03:08');
/*!40000 ALTER TABLE `discount_bases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_types`
--

DROP TABLE IF EXISTS `discount_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discount_types` (
  `discount_id` int(11) NOT NULL AUTO_INCREMENT,
  `discount_type` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_types`
--

LOCK TABLES `discount_types` WRITE;
/*!40000 ALTER TABLE `discount_types` DISABLE KEYS */;
INSERT INTO `discount_types` VALUES (1,'Bill Level Discount',1,'2019-03-29 12:02:59','2019-03-29 12:02:59'),(2,'Product Level Discount',1,'2019-03-29 12:02:59','2019-03-29 12:02:59');
/*!40000 ALTER TABLE `discount_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `error_logs`
--

DROP TABLE IF EXISTS `error_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `error_logs` (
  `error_id` int(11) NOT NULL AUTO_INCREMENT,
  `error` text,
  `value` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`error_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error_logs`
--

LOCK TABLES `error_logs` WRITE;
/*!40000 ALTER TABLE `error_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `error_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_options`
--

DROP TABLE IF EXISTS `feedback_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_options` (
  `feed_option_id` int(11) NOT NULL AUTO_INCREMENT,
  `option_value` varchar(255) NOT NULL,
  `feed_ques_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`feed_option_id`),
  KEY `feed_ques_id` (`feed_ques_id`),
  CONSTRAINT `feedback_options_ibfk_1` FOREIGN KEY (`feed_ques_id`) REFERENCES `feedback_questions` (`feed_ques_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_options`
--

LOCK TABLES `feedback_options` WRITE;
/*!40000 ALTER TABLE `feedback_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_questions`
--

DROP TABLE IF EXISTS `feedback_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_questions` (
  `feed_ques_id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_question` varchar(255) NOT NULL,
  `input_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`feed_ques_id`),
  KEY `input_id` (`input_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `feedback_questions_ibfk_1` FOREIGN KEY (`input_id`) REFERENCES `input_types` (`input_id`),
  CONSTRAINT `feedback_questions_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_questions`
--

LOCK TABLES `feedback_questions` WRITE;
/*!40000 ALTER TABLE `feedback_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `free_product_offers`
--

DROP TABLE IF EXISTS `free_product_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `free_product_offers` (
  `free_product_offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_discount_id` int(11) NOT NULL,
  `buy_product_barcode` bigint(20) NOT NULL,
  `buy_product_quantity` int(11) DEFAULT '0',
  `free_product_barcode` bigint(20) NOT NULL,
  `free_product_quantity` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`free_product_offer_id`),
  KEY `product_discount_id` (`product_discount_id`),
  CONSTRAINT `free_product_offers_ibfk_1` FOREIGN KEY (`product_discount_id`) REFERENCES `product_discounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `free_product_offers`
--

LOCK TABLES `free_product_offers` WRITE;
/*!40000 ALTER TABLE `free_product_offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `free_product_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genders` (
  `gender_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'Male',1,'2019-03-29 12:00:33','2019-03-29 12:00:33'),(2,'Female',1,'2019-03-29 12:00:33','2019-03-29 12:00:33');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `global_categories`
--

DROP TABLE IF EXISTS `global_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `global_categories` (
  `global_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `global_category_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`global_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global_categories`
--

LOCK TABLES `global_categories` WRITE;
/*!40000 ALTER TABLE `global_categories` DISABLE KEYS */;
INSERT INTO `global_categories` VALUES (1,'FOOD',1,'2019-03-29 12:01:58','2019-03-29 12:01:58'),(2,'CLEANING',1,'2019-03-29 12:01:58','2019-03-29 12:01:58'),(3,'PERSONAL CARE',1,'2019-03-29 12:01:58','2019-03-29 12:01:58'),(4,'STATIONARY',1,'2019-03-29 12:01:58','2019-03-29 12:01:58'),(5,'PET',1,'2019-03-29 12:01:58','2019-03-29 12:01:58'),(6,'POOJA',1,'2019-03-29 12:01:58','2019-03-29 12:01:58'),(7,'MISCELLANEOUS',1,'2019-03-29 12:01:58','2019-03-29 12:01:58');
/*!40000 ALTER TABLE `global_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `global_sub_categories`
--

DROP TABLE IF EXISTS `global_sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `global_sub_categories` (
  `global_sub_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `global_sub_category_name` varchar(255) NOT NULL,
  `global_category_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`global_sub_category_id`),
  KEY `global_category_id` (`global_category_id`),
  CONSTRAINT `global_sub_categories_ibfk_1` FOREIGN KEY (`global_category_id`) REFERENCES `global_categories` (`global_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global_sub_categories`
--

LOCK TABLES `global_sub_categories` WRITE;
/*!40000 ALTER TABLE `global_sub_categories` DISABLE KEYS */;
INSERT INTO `global_sub_categories` VALUES (1,'GROCERY AND PULSES',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(2,'BREAKFAST FOODS',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(3,'DAIRY PRODUCT',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(4,'INSTANT FOODS',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(5,'PICKLES SAUCES AND SPREAD',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(6,'SNACK AND BISCUITS',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(7,'MASALA AND SPICES',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(8,'SWEET AND CHOCOLATES',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(9,'DRY FRUITS',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(10,'FROZEN FOOD CANNED FOOD',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(11,'FRUITS AND VEGETABLES',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(12,'BEVERAGES',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(13,'TEA AND COFFEE',1,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(14,'KITCHEN CARE',2,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(15,'BATHROOM CARE',2,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(16,'HOUSEHOLD',2,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(17,'HOME CARE',2,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(18,'SKIN CARE',3,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(19,'WOMAN NEEDS',3,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(20,'MEN NEEDS',3,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(21,'CHILD NEEDS',3,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(22,'DAILY NEEDS',3,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(23,'HAIR CARE',3,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(24,'NOTEBOOK AND DAYBOOK',4,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(25,'WRITING INSTRUMENT',4,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(26,'OFFICE SUPPLIES',4,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(27,'SCHOOL STATIONARY',4,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(28,'PET FOOD',5,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(29,'PET ACCESSIORIES',5,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(30,'POOJA NEEDS',6,1,'2019-03-29 12:02:11','2019-03-29 12:02:11'),(31,'MISCELLANEOUS',7,1,'2019-03-29 12:02:11','2019-03-29 12:02:11');
/*!40000 ALTER TABLE `global_sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `global_sub_sub_categories`
--

DROP TABLE IF EXISTS `global_sub_sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `global_sub_sub_categories` (
  `global_sub_sub_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `global_sub_sub_category_name` varchar(255) NOT NULL,
  `global_sub_category_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`global_sub_sub_category_id`),
  KEY `global_sub_category_id` (`global_sub_category_id`),
  CONSTRAINT `global_sub_sub_categories_ibfk_1` FOREIGN KEY (`global_sub_category_id`) REFERENCES `global_sub_categories` (`global_sub_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global_sub_sub_categories`
--

LOCK TABLES `global_sub_sub_categories` WRITE;
/*!40000 ALTER TABLE `global_sub_sub_categories` DISABLE KEYS */;
INSERT INTO `global_sub_sub_categories` VALUES (1,'DALS AND PULSES',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(2,'EDIBLE OILS',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(3,'GHEE',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(4,'FLOURS',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(5,'SOOJI',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(6,'RICE',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(7,'SALT',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(8,'SUGAR',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(9,'JAGGERY',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(10,'SOYA CHUNKS',1,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(11,'CEREAL',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(12,'EGG',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(13,'BREAD',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(14,'HONEY',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(15,'JAM',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(16,'SYRUP',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(17,'OATS AND MUSALI',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(18,'SPREADS',2,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(19,'MILK',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(20,'CURD',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(21,'BUTTER',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(22,'CHEESE',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(23,'PANEER',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(24,'FRESH CREAM',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(25,'CONDENSED MILK',3,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(26,'NOODLES',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(27,'PASTA',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(28,'SOUP',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(29,'VERMICELLI',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(30,'MAGGIE',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(31,'READY TO COOK MEAL',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(32,'INSTANT MIXES',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(33,'PANCAKE MIX',4,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(34,'SAUCE',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(35,'PICKLE',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(36,'MOUTH FRESHENER',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(37,'MAYONNAISE',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(38,'PEANUT BUTTER',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(39,'VINEGAR',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(40,'SALAD DRESSING',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(41,'INTERNATIONAL CONDIMENTS',5,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(42,'NAMKEEN AND MIXTURE',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(43,'BISCUIT',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(44,'WAFER',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(45,'CHIPS',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(46,'PAPAD',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(47,'COOKIE',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(48,'RUSK',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(49,'CRACKERS',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(50,'POPCORN',6,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(51,'ITALIAN SPICES',7,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(52,'WHOLE SPICES',7,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(53,'GROUND SPICES',7,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(54,'MASALA',7,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(55,'CHOCOLATES',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(56,'SWEET MIXES',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(57,'CAKES',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(58,'CANDY',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(59,'INDIAN SWEETS',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(60,'BAKING INGREDIENTS',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(61,'ICE CREAM',8,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(62,'DRY FRUITS AND RAISIN DATES',9,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(63,'FROZEN NON VEG',10,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(64,'FROZEN GREEN PEAS',10,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(65,'FROZEN MIXED VEGETABLES',10,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(66,'FROZEN SNACKS',10,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(67,'FRESH FRUITS',11,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(68,'PACKED FRUITS',11,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(69,'FRESH VEGETABLES',11,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(70,'PACKED VEGETABLES',11,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(71,'JUICES',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(72,'ENERGY DRINK',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(73,'SOFT DRINK',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(74,'WATER',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(75,'INSTANT DRINK MIX',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(76,'SODA',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(77,'MINERAL WATER',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(78,'SPARKELING WATER',12,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(79,'TEA',13,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(80,'COFFEE',13,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(81,'TEA BAG',13,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(82,'DAIRY WHITENER',13,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(83,'GREEN TEA',13,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(84,'ICE TEA',13,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(85,'DISHWASH BAR',14,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(86,'LIQUID DISHWASH',14,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(87,'SCRUP PAD',14,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(88,'TOILET CLEANER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(89,'TISSUE PAPER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(90,'DETERGENT POWDER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(91,'DETERGENT BAR',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(92,'LIQUID DETERGENT',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(93,'STIFFENER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(94,'WHITENER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(95,'STAIN REMOVER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(96,'FABRIC CONDITIONER',15,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(97,'BRUSH',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(98,'HANGER',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(99,'CLIPS',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(100,'BUCKET',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(101,'MUG',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(102,'WASHROOM ACCESSORIES',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(103,'CLEANING ACCESSORIES',16,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(104,'SURFACE CLEANER',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(105,'AIR FRESHENER',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(106,'INSECT REPELLENT',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(107,'BATTERY',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(108,'CFL AND BULB',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(109,'BROOM',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(110,'MOPING ITEM',17,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(111,'WIPES',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(112,'FACE WASH',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(113,'MOSTURIZER',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(114,'LOTION',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(115,'FAIRNESS CREAME',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(116,'LIP BALM',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(117,'FACE SCRUB',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(118,'FACE PACK',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(119,'SUN BLOCK',18,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(120,'BLEACH',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(121,'HAIR REMOVAL',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(122,'NAIL CARE',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(123,'EYE CARE',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(124,'WOMAN FACE WASH',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(125,'SANITARY PROTECTION',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(126,'BEAUTY AND MAKEUP PRODUCTS',19,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(127,'SHAVING ACCESSORIES',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(128,'MEN FACE WASH',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(129,'RAZOR AND BLADE',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(130,'SHAVING FOAM',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(131,'SHAVING CREAME',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(132,'AFTER SHAVE',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(133,'SHAVING GELS',20,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(134,'INFANT CEREAL',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(135,'DIAPERS',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(136,'BABY OIL',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(137,'BABY LOTION',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(138,'BABY SOAPS',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(139,'BABY POWDER',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(140,'BABY CREAM',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(141,'FEEDING EQUIPMENT',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(142,'BABY ESSENTIALS',21,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(143,'SOAP',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(144,'DEODRANT',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(145,'HANDWASH',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(146,'MEHANDI',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(147,'TOOTHPASTE',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(148,'TOOTHBRUSH',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(149,'MOUTH WASH',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(150,'TALCUM POWDER',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(151,'GULAB JAL',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(152,'SHOE POLISH',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(153,'ANTISEPTIC LIQUID',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(154,'BANDAID AND DRESSING',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(155,'EAR BUDS',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(156,'STOMACH CARE',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(157,'SHOWER GELS',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(158,'PAIN RELIEF',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(159,'CONDOMS',22,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(160,'SHAMPOO',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(161,'HAIR OIL',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(162,'HAIR COLOR',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(163,'HAIR CONDITIONER',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(164,'HAIR GEL',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(165,'HAIR ACCESSORIES',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(166,'HAIR SYRUM',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(167,'HAIR MASK',23,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(168,'NOTEBOOK',24,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(169,'DAIRY',24,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(170,'A4 SIZE PAPER',24,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(171,'NOTEBOOK',24,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(172,'PENCIL',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(173,'PEN',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(174,'ERASER',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(175,'SHARPENER',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(176,'DRAWING BOOK',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(177,'WATER COLOR',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(178,'CRAYONS',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(179,'COLOR PEN',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(180,'SCETCH PENS',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(181,'MARKER',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(182,'PERMANENT MARKERS',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(183,'HIGHLIGHTER',25,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(184,'OFFICE ITEM',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(185,'FILES AND FOLDERS',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(186,'ADHESIVE',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(187,'ENVELOP',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(188,'SCALES',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(189,'PEN BOX',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(190,'PAPER WEIGHT',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(191,'PAPER TRAY',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(192,'GLUE STICK',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(193,'CALCULATER',26,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(194,'SCHOOL BAG',27,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(195,'LUNCH BOX',27,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(196,'BOOKS',27,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(197,'MATHS BOX',27,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(198,'WHITE BOARD MARKER',27,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(199,'DOG FOOD',28,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(200,'CAT FOOD',28,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(201,'DOG ACCESSIORIES',29,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(202,'CAT ACCESSIORIES',29,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(203,'AGARBATTI',30,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(204,'OIL',30,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(205,'DHOOP',30,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(206,'COTTON BATTI',30,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(207,'CAMPHOR',30,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(208,'POOJA ACCESSIORIES',30,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(209,'CAR ACCESSIORIES',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(210,'CAR CLEANING',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(211,'ELECTRONIC ITEM',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(212,'PLASTIC ITEM',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(213,'LOCK AND KEY',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(214,'TORCHES',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(215,'BATTERY',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(216,'LIFE HACK KIT',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(217,'ESSENTIAL KIT',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(218,'TRAVELLING ESSENTIALS',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22'),(219,'SEWING KIT',31,1,'2019-03-29 12:02:22','2019-03-29 12:02:22');
/*!40000 ALTER TABLE `global_sub_sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `input_types`
--

DROP TABLE IF EXISTS `input_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `input_types` (
  `input_id` int(11) NOT NULL AUTO_INCREMENT,
  `input_name` varchar(255) NOT NULL,
  `min` varchar(255) DEFAULT NULL,
  `max` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`input_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `input_types`
--

LOCK TABLES `input_types` WRITE;
/*!40000 ALTER TABLE `input_types` DISABLE KEYS */;
INSERT INTO `input_types` VALUES (1,'Radio Button','2','6','Single Choice',1,'2019-03-29 12:01:21','2019-03-29 12:01:21'),(2,'Check Box','2','6','Multiple Choice',1,'2019-03-29 12:01:21','2019-03-29 12:01:21'),(3,'Rating (5 Star)','1','5','',1,'2019-03-29 12:01:21','2019-03-29 12:01:21'),(4,'Rating (10 Star)','1','10','',1,'2019-03-29 12:01:21','2019-03-29 12:01:21'),(5,'Text','0','140','Write anything',1,'2019-03-29 12:01:21','2019-03-29 12:01:21');
/*!40000 ALTER TABLE `input_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_coupons`
--

DROP TABLE IF EXISTS `invoice_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_coupons` (
  `invoice_coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` int(11) NOT NULL,
  `coupon_code` bigint(20) DEFAULT '0',
  `applicable_on` varchar(255) DEFAULT NULL,
  `discount` float DEFAULT '0',
  `cashback` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`invoice_coupon_id`),
  KEY `invoice_no` (`invoice_no`),
  CONSTRAINT `invoice_coupons_ibfk_1` FOREIGN KEY (`invoice_no`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_coupons`
--

LOCK TABLES `invoice_coupons` WRITE;
/*!40000 ALTER TABLE `invoice_coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_payments`
--

DROP TABLE IF EXISTS `invoice_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_payments` (
  `invoice_payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` int(11) NOT NULL,
  `payment_amount` float DEFAULT '0',
  `transaction_id` varchar(255) DEFAULT NULL,
  `card_no` bigint(20) DEFAULT NULL,
  `store_counter_id` int(11) NOT NULL,
  `warehouse_payment_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`invoice_payment_id`),
  KEY `invoice_no` (`invoice_no`),
  KEY `store_counter_id` (`store_counter_id`),
  KEY `warehouse_payment_id` (`warehouse_payment_id`),
  CONSTRAINT `invoice_payments_ibfk_1` FOREIGN KEY (`invoice_no`) REFERENCES `invoices` (`id`),
  CONSTRAINT `invoice_payments_ibfk_2` FOREIGN KEY (`store_counter_id`) REFERENCES `store_counters` (`id`),
  CONSTRAINT `invoice_payments_ibfk_3` FOREIGN KEY (`warehouse_payment_id`) REFERENCES `warehouse_payment_types` (`warehouse_payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_payments`
--

LOCK TABLES `invoice_payments` WRITE;
/*!40000 ALTER TABLE `invoice_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_products`
--

DROP TABLE IF EXISTS `invoice_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_products` (
  `invoice_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_barcode` bigint(20) NOT NULL,
  `product_unit` varchar(255) NOT NULL,
  `product_quantity` float DEFAULT '0',
  `product_sgst` float DEFAULT '0',
  `product_cgst` float DEFAULT '0',
  `product_igst` float DEFAULT '0',
  `product_price` float DEFAULT '0',
  `product_discount` float DEFAULT '0',
  `product_discount_price` float DEFAULT '0',
  `product_sub_total` float NOT NULL,
  `return_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`invoice_product_id`),
  KEY `invoice_no` (`invoice_no`),
  CONSTRAINT `invoice_products_ibfk_1` FOREIGN KEY (`invoice_no`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_products`
--

LOCK TABLES `invoice_products` WRITE;
/*!40000 ALTER TABLE `invoice_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` int(11) NOT NULL,
  `store_counter_id` int(11) NOT NULL,
  `warehouse_user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_mobile` varchar(255) NOT NULL,
  `membership_code` bigint(20) DEFAULT NULL,
  `total_amount` float DEFAULT '0',
  `invoice_cashback` float DEFAULT '0',
  `invoice_total_saving` float DEFAULT '0',
  `invoice_loyalty_used` float DEFAULT '0',
  `invoice_total_amount` float DEFAULT '0',
  `gstin_name` varchar(255) DEFAULT NULL,
  `gstin_number` varchar(255) DEFAULT NULL,
  `return_status` tinyint(1) DEFAULT '0',
  `round_off_amount` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_counter_id` (`store_counter_id`),
  KEY `warehouse_user_id` (`warehouse_user_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`store_counter_id`) REFERENCES `store_counters` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`warehouse_user_id`) REFERENCES `warehouse_user_lists` (`id`),
  CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_conditions`
--

DROP TABLE IF EXISTS `item_conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_conditions` (
  `item_condition_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_condition_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`item_condition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_conditions`
--

LOCK TABLES `item_conditions` WRITE;
/*!40000 ALTER TABLE `item_conditions` DISABLE KEYS */;
INSERT INTO `item_conditions` VALUES (1,'Normal',1,'2019-03-29 12:03:56','2019-03-29 12:03:56'),(2,'Defective',1,'2019-03-29 12:03:56','2019-03-29 12:03:56');
/*!40000 ALTER TABLE `item_conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localities`
--

DROP TABLE IF EXISTS `localities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `localities` (
  `locality_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `locality_name` varchar(255) NOT NULL,
  `pincode` int(11) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`locality_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `localities_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localities`
--

LOCK TABLES `localities` WRITE;
/*!40000 ALTER TABLE `localities` DISABLE KEYS */;
INSERT INTO `localities` VALUES (1,1,'Whitefield',560066,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(2,1,'Indiranagar',560038,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(3,1,'Jayanagar',560041,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(4,1,'JP Nagar',560078,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(5,1,'BTM Layout',560076,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(6,2,'Hauz Khas',110016,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(7,2,'Dwarka',110075,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(8,3,'Yamuna Exp',203201,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(9,3,'Noida Extension',201305,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(10,4,'Vasco da Gama',403802,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(11,4,'Colva',403708,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(12,5,'Sector 1',160001,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(13,5,'Sector 10',160011,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(14,6,'Ashok Nagar',600033,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13'),(15,6,'Anna Nagar',600101,NULL,NULL,1,'2019-03-29 12:00:13','2019-03-29 12:00:13');
/*!40000 ALTER TABLE `localities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_histories`
--

DROP TABLE IF EXISTS `login_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_histories` (
  `login_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `store_counter_id` int(11) NOT NULL,
  `warehouse_user_id` int(11) NOT NULL,
  `login_time` time DEFAULT NULL,
  `logout_time` time DEFAULT NULL,
  `opening_amount` float DEFAULT '0',
  `closing_amount` float DEFAULT '0',
  `total_invoice` float DEFAULT '0',
  `cash_amount` float DEFAULT '0',
  `card_amount` float DEFAULT '0',
  `sodexo_amount` float DEFAULT '0',
  `total_amount` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`login_history_id`),
  KEY `store_id` (`store_id`),
  KEY `store_counter_id` (`store_counter_id`),
  KEY `warehouse_user_id` (`warehouse_user_id`),
  CONSTRAINT `login_histories_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`),
  CONSTRAINT `login_histories_ibfk_2` FOREIGN KEY (`store_counter_id`) REFERENCES `store_counters` (`id`),
  CONSTRAINT `login_histories_ibfk_3` FOREIGN KEY (`warehouse_user_id`) REFERENCES `warehouse_user_lists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_histories`
--

LOCK TABLES `login_histories` WRITE;
/*!40000 ALTER TABLE `login_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_discounts`
--

DROP TABLE IF EXISTS `manual_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_discounts` (
  `manual_discount_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `warehouse_user_id` int(11) NOT NULL,
  `invoice_no` int(11) NOT NULL,
  `discount_amount` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`manual_discount_id`),
  KEY `store_id` (`store_id`),
  KEY `warehouse_user_id` (`warehouse_user_id`),
  KEY `invoice_no` (`invoice_no`),
  CONSTRAINT `manual_discounts_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`),
  CONSTRAINT `manual_discounts_ibfk_2` FOREIGN KEY (`warehouse_user_id`) REFERENCES `warehouse_user_lists` (`id`),
  CONSTRAINT `manual_discounts_ibfk_3` FOREIGN KEY (`invoice_no`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_discounts`
--

LOCK TABLES `manual_discounts` WRITE;
/*!40000 ALTER TABLE `manual_discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `manual_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_lists`
--

DROP TABLE IF EXISTS `membership_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_lists` (
  `membership_id` int(11) NOT NULL AUTO_INCREMENT,
  `membership_code` bigint(20) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`membership_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_lists`
--

LOCK TABLES `membership_lists` WRITE;
/*!40000 ALTER TABLE `membership_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `membership_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_syncs`
--

DROP TABLE IF EXISTS `membership_syncs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_syncs` (
  `membership_sync_id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `membership_start_id` int(11) DEFAULT '0',
  `membership_end_id` int(11) DEFAULT '0',
  `sync_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`membership_sync_id`),
  KEY `partner_id` (`partner_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `membership_syncs_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`),
  CONSTRAINT `membership_syncs_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_syncs`
--

LOCK TABLES `membership_syncs` WRITE;
/*!40000 ALTER TABLE `membership_syncs` DISABLE KEYS */;
/*!40000 ALTER TABLE `membership_syncs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer_static_data`
--

DROP TABLE IF EXISTS `offer_static_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offer_static_data` (
  `offer_static_id` int(11) NOT NULL AUTO_INCREMENT,
  `offer_static_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`offer_static_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer_static_data`
--

LOCK TABLES `offer_static_data` WRITE;
/*!40000 ALTER TABLE `offer_static_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `offer_static_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_statuses`
--

DROP TABLE IF EXISTS `order_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_statuses` (
  `order_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_status_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`order_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_statuses`
--

LOCK TABLES `order_statuses` WRITE;
/*!40000 ALTER TABLE `order_statuses` DISABLE KEYS */;
INSERT INTO `order_statuses` VALUES (1,'Pending',1,'2019-03-29 12:04:05','2019-03-29 12:04:05'),(2,'Delivered',1,'2019-03-29 12:04:05','2019-03-29 12:04:05'),(3,'Cancelled',1,'2019-03-29 12:04:05','2019-03-29 12:04:05');
/*!40000 ALTER TABLE `order_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_link_customers`
--

DROP TABLE IF EXISTS `partner_link_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_link_customers` (
  `partner_link_customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `customer_information_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`partner_link_customer_id`),
  KEY `partner_id` (`partner_id`),
  KEY `store_id` (`store_id`),
  KEY `customer_information_id` (`customer_information_id`),
  CONSTRAINT `partner_link_customers_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`),
  CONSTRAINT `partner_link_customers_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`),
  CONSTRAINT `partner_link_customers_ibfk_3` FOREIGN KEY (`customer_information_id`) REFERENCES `customer_information_data` (`customer_information_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_link_customers`
--

LOCK TABLES `partner_link_customers` WRITE;
/*!40000 ALTER TABLE `partner_link_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `partner_link_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_stores`
--

DROP TABLE IF EXISTS `partner_stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_stores` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_code` varchar(255) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `address_one` text,
  `address_two` text,
  `landmark` text,
  `city_id` int(11) NOT NULL DEFAULT '0',
  `locality_id` int(11) NOT NULL DEFAULT '0',
  `store_mobile` varchar(255) DEFAULT NULL,
  `store_email` varchar(255) DEFAULT NULL,
  `refund_on_discount` tinyint(1) DEFAULT '1',
  `refund_policy` longtext,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`store_id`),
  KEY `partner_id` (`partner_id`),
  KEY `city_id` (`city_id`),
  KEY `locality_id` (`locality_id`),
  CONSTRAINT `partner_stores_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`),
  CONSTRAINT `partner_stores_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `partner_stores_ibfk_3` FOREIGN KEY (`locality_id`) REFERENCES `localities` (`locality_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_stores`
--

LOCK TABLES `partner_stores` WRITE;
/*!40000 ALTER TABLE `partner_stores` DISABLE KEYS */;
/*!40000 ALTER TABLE `partner_stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners` (
  `partner_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `description` text,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`partner_id`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `partners_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (1,'Sushant','Singh Chauhan','AM Retail','sushantsingh.1081@gmail.com','7898130226',NULL,1000,1,'2019-03-29 12:00:42','2019-03-29 12:00:42');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_discounts`
--

DROP TABLE IF EXISTS `product_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_discounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_discount_id` int(11) NOT NULL,
  `discount_base_id` int(11) NOT NULL,
  `product_discount_name` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `discount_base_id` (`discount_base_id`),
  CONSTRAINT `product_discounts_ibfk_1` FOREIGN KEY (`discount_base_id`) REFERENCES `discount_bases` (`discount_base_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_discounts`
--

LOCK TABLES `product_discounts` WRITE;
/*!40000 ALTER TABLE `product_discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sub_units`
--

DROP TABLE IF EXISTS `product_sub_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_sub_units` (
  `product_sub_unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_unit_id` int(11) NOT NULL,
  `product_sub_unit_name` varchar(255) NOT NULL,
  `product_sub_unit_value` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`product_sub_unit_id`),
  KEY `product_unit_id` (`product_unit_id`),
  CONSTRAINT `product_sub_units_ibfk_1` FOREIGN KEY (`product_unit_id`) REFERENCES `product_units` (`product_unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sub_units`
--

LOCK TABLES `product_sub_units` WRITE;
/*!40000 ALTER TABLE `product_sub_units` DISABLE KEYS */;
INSERT INTO `product_sub_units` VALUES (1,1,'Kg','Kilograms',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(2,1,'Gm','Grams',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(3,1,'Mg','Milligrams',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(4,2,'Ltr','Litres',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(5,2,'Ml','Millilitres',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(6,3,'M','Meters',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(7,3,'In','Inches',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(8,3,'Cm','Centimeters',1,'2019-03-29 12:01:40','2019-03-29 12:01:40'),(9,4,'Pc','Pieces',1,'2019-03-29 12:01:40','2019-03-29 12:01:40');
/*!40000 ALTER TABLE `product_sub_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_units`
--

DROP TABLE IF EXISTS `product_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_units` (
  `product_unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_unit_name` varchar(255) NOT NULL,
  `product_unit_value` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`product_unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_units`
--

LOCK TABLES `product_units` WRITE;
/*!40000 ALTER TABLE `product_units` DISABLE KEYS */;
INSERT INTO `product_units` VALUES (1,'Kg','Kilograms',1,'2019-03-29 12:01:32','2019-03-29 12:01:32'),(2,'Ltr','Litres',1,'2019-03-29 12:01:32','2019-03-29 12:01:32'),(3,'M','Meters',1,'2019-03-29 12:01:32','2019-03-29 12:01:32'),(4,'Pc','Pieces',1,'2019-03-29 12:01:32','2019-03-29 12:01:32');
/*!40000 ALTER TABLE `product_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward_question_responses`
--

DROP TABLE IF EXISTS `reward_question_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reward_question_responses` (
  `question_response_id` int(11) NOT NULL AUTO_INCREMENT,
  `reward_question_id` int(11) NOT NULL,
  `reward_option_id` int(11) DEFAULT NULL,
  `customer_information_id` int(11) NOT NULL,
  `question_response` longtext,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`question_response_id`),
  KEY `reward_question_id` (`reward_question_id`),
  KEY `customer_information_id` (`customer_information_id`),
  CONSTRAINT `reward_question_responses_ibfk_1` FOREIGN KEY (`reward_question_id`) REFERENCES `customer_reward_questions` (`reward_question_id`),
  CONSTRAINT `reward_question_responses_ibfk_2` FOREIGN KEY (`customer_information_id`) REFERENCES `customer_information_data` (`customer_information_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_question_responses`
--

LOCK TABLES `reward_question_responses` WRITE;
/*!40000 ALTER TABLE `reward_question_responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `reward_question_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scope_lists`
--

DROP TABLE IF EXISTS `scope_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scope_lists` (
  `scope_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `scope_name` varchar(255) NOT NULL,
  `scope_description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`scope_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scope_lists`
--

LOCK TABLES `scope_lists` WRITE;
/*!40000 ALTER TABLE `scope_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `scope_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sense_constants`
--

DROP TABLE IF EXISTS `sense_constants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sense_constants` (
  `constant_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`constant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sense_constants`
--

LOCK TABLES `sense_constants` WRITE;
/*!40000 ALTER TABLE `sense_constants` DISABLE KEYS */;
INSERT INTO `sense_constants` VALUES (1,'CUSTOMER_FEEDBACK_APP_VERSION','1.0','',1,'2019-03-29 12:00:52','2019-03-29 12:00:52'),(2,'CUSTOMER_SURVEY_APP_VERSION','1.0','',1,'2019-03-29 12:00:52','2019-03-29 12:00:52'),(3,'STATIC_APP_VERSION','1.0','',1,'2019-03-29 12:00:52','2019-03-29 12:00:52');
/*!40000 ALTER TABLE `sense_constants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms` (
  `sms_id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `gateway_status` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`sms_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staple_product_sizes`
--

DROP TABLE IF EXISTS `staple_product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staple_product_sizes` (
  `staple_product_size_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_barcode` bigint(20) NOT NULL,
  `staple_product_id` int(11) NOT NULL,
  `product_unit_id` int(11) NOT NULL,
  `product_sub_unit_id` int(11) NOT NULL,
  `product_unit_size` float DEFAULT '0',
  `product_selling_mrp` float DEFAULT '0',
  `product_margin` float DEFAULT '0',
  `product_mrp` float DEFAULT '0',
  `change_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`staple_product_size_id`),
  KEY `staple_product_id` (`staple_product_id`),
  KEY `product_unit_id` (`product_unit_id`),
  KEY `product_sub_unit_id` (`product_sub_unit_id`),
  CONSTRAINT `staple_product_sizes_ibfk_1` FOREIGN KEY (`staple_product_id`) REFERENCES `staple_products` (`staple_product_id`),
  CONSTRAINT `staple_product_sizes_ibfk_2` FOREIGN KEY (`product_unit_id`) REFERENCES `product_units` (`product_unit_id`),
  CONSTRAINT `staple_product_sizes_ibfk_3` FOREIGN KEY (`product_sub_unit_id`) REFERENCES `product_sub_units` (`product_sub_unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staple_product_sizes`
--

LOCK TABLES `staple_product_sizes` WRITE;
/*!40000 ALTER TABLE `staple_product_sizes` DISABLE KEYS */;
/*!40000 ALTER TABLE `staple_product_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staple_products`
--

DROP TABLE IF EXISTS `staple_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staple_products` (
  `staple_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `product_brand_name` varchar(255) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `global_category_id` int(11) NOT NULL,
  `global_sub_category_id` int(11) NOT NULL,
  `global_sub_sub_category_id` int(11) NOT NULL,
  `sgst` float DEFAULT '0',
  `cgst` float DEFAULT '0',
  `igst` float DEFAULT '0',
  `change_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`staple_product_id`),
  KEY `global_category_id` (`global_category_id`),
  KEY `global_sub_category_id` (`global_sub_category_id`),
  KEY `global_sub_sub_category_id` (`global_sub_sub_category_id`),
  CONSTRAINT `staple_products_ibfk_1` FOREIGN KEY (`global_category_id`) REFERENCES `global_categories` (`global_category_id`),
  CONSTRAINT `staple_products_ibfk_2` FOREIGN KEY (`global_sub_category_id`) REFERENCES `global_sub_categories` (`global_sub_category_id`),
  CONSTRAINT `staple_products_ibfk_3` FOREIGN KEY (`global_sub_sub_category_id`) REFERENCES `global_sub_sub_categories` (`global_sub_sub_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staple_products`
--

LOCK TABLES `staple_products` WRITE;
/*!40000 ALTER TABLE `staple_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `staple_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_complains`
--

DROP TABLE IF EXISTS `store_complains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_complains` (
  `complain_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_information_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `complain` longtext NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`complain_id`),
  KEY `store_id` (`store_id`),
  KEY `partner_id` (`partner_id`),
  CONSTRAINT `store_complains_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`),
  CONSTRAINT `store_complains_ibfk_2` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_complains`
--

LOCK TABLES `store_complains` WRITE;
/*!40000 ALTER TABLE `store_complains` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_complains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_counters`
--

DROP TABLE IF EXISTS `store_counters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_counters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_counter_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `store_counters_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_counters`
--

LOCK TABLES `store_counters` WRITE;
/*!40000 ALTER TABLE `store_counters` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_counters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_order_details`
--

DROP TABLE IF EXISTS `store_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_order_details` (
  `store_order_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_order_id` int(11) NOT NULL,
  `barcode` bigint(20) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `request_quantity` varchar(255) DEFAULT NULL,
  `received_quantity` varchar(255) DEFAULT NULL,
  `order_status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`store_order_detail_id`),
  KEY `store_order_id` (`store_order_id`),
  CONSTRAINT `store_order_details_ibfk_1` FOREIGN KEY (`store_order_id`) REFERENCES `store_orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_order_details`
--

LOCK TABLES `store_order_details` WRITE;
/*!40000 ALTER TABLE `store_order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_orders`
--

DROP TABLE IF EXISTS `store_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_order_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `warehouse_user_id` int(11) NOT NULL,
  `order_status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  KEY `warehouse_user_id` (`warehouse_user_id`),
  CONSTRAINT `store_orders_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`),
  CONSTRAINT `store_orders_ibfk_2` FOREIGN KEY (`warehouse_user_id`) REFERENCES `warehouse_user_lists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_orders`
--

LOCK TABLES `store_orders` WRITE;
/*!40000 ALTER TABLE `store_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_options`
--

DROP TABLE IF EXISTS `survey_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_options` (
  `survey_option_id` int(11) NOT NULL AUTO_INCREMENT,
  `option_value` varchar(255) DEFAULT NULL,
  `survey_ques_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`survey_option_id`),
  KEY `survey_ques_id` (`survey_ques_id`),
  CONSTRAINT `survey_options_ibfk_1` FOREIGN KEY (`survey_ques_id`) REFERENCES `survey_questions` (`survey_ques_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_options`
--

LOCK TABLES `survey_options` WRITE;
/*!40000 ALTER TABLE `survey_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_questions`
--

DROP TABLE IF EXISTS `survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_questions` (
  `survey_ques_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_question` varchar(255) NOT NULL,
  `input_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`survey_ques_id`),
  KEY `input_id` (`input_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `survey_questions_ibfk_1` FOREIGN KEY (`input_id`) REFERENCES `input_types` (`input_id`),
  CONSTRAINT `survey_questions_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions`
--

LOCK TABLES `survey_questions` WRITE;
/*!40000 ALTER TABLE `survey_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_administrator_passwords`
--

DROP TABLE IF EXISTS `system_administrator_passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_administrator_passwords` (
  `system_password_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_role_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`system_password_id`),
  KEY `warehouse_role_id` (`warehouse_role_id`),
  CONSTRAINT `system_administrator_passwords_ibfk_1` FOREIGN KEY (`warehouse_role_id`) REFERENCES `warehouse_role_lists` (`warehouse_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_administrator_passwords`
--

LOCK TABLES `system_administrator_passwords` WRITE;
/*!40000 ALTER TABLE `system_administrator_passwords` DISABLE KEYS */;
INSERT INTO `system_administrator_passwords` VALUES (1,1,'EuQpqtks6oqlts5yXEulTEJV1Mt1jX7E72iKHOlvek6dGN5C7mfrgq5VYUoUl7DAkQaLHpJ5rSTMBhtFrinjuw==',1,'2019-03-29 12:04:35','2019-03-29 12:04:35');
/*!40000 ALTER TABLE `system_administrator_passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax_tables`
--

DROP TABLE IF EXISTS `tax_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tax_tables` (
  `tax_id` int(11) NOT NULL AUTO_INCREMENT,
  `hsn` int(11) DEFAULT '0',
  `sgst` float DEFAULT '0',
  `cgst` float DEFAULT '0',
  `igst` float DEFAULT '0',
  `change_status` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`tax_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax_tables`
--

LOCK TABLES `tax_tables` WRITE;
/*!40000 ALTER TABLE `tax_tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `tax_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'Partner',1,'2019-03-29 11:59:10','2019-03-29 11:59:10'),(2,'Administrator',1,'2019-03-29 11:59:10','2019-03-29 11:59:10'),(3,'Customer',1,'2019-03-29 11:59:10','2019-03-29 11:59:10');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `email_active` tinyint(1) DEFAULT '0',
  `mobile_active` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sushant Singh Chauhan','7898130226','sushantsingh.1081@gmail.com','$2b$10$.XkN6vjwpKrC/VLbNzCorueOAvzARDSR9q9m3hzALqUm07S7YPB6i',1,1,1,1,'2019-03-29 12:01:03','2019-03-29 12:01:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `value_product_offers`
--

DROP TABLE IF EXISTS `value_product_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `value_product_offers` (
  `value_product_offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_discount_id` int(11) NOT NULL,
  `product_barcode` bigint(20) NOT NULL,
  `buy_product_quantity` int(11) DEFAULT '0',
  `offer_value` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`value_product_offer_id`),
  KEY `product_discount_id` (`product_discount_id`),
  CONSTRAINT `value_product_offers_ibfk_1` FOREIGN KEY (`product_discount_id`) REFERENCES `product_discounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `value_product_offers`
--

LOCK TABLES `value_product_offers` WRITE;
/*!40000 ALTER TABLE `value_product_offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `value_product_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_employee_lists`
--

DROP TABLE IF EXISTS `warehouse_employee_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_employee_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_employe_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `warehouse_employee_lists_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `partner_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_employee_lists`
--

LOCK TABLES `warehouse_employee_lists` WRITE;
/*!40000 ALTER TABLE `warehouse_employee_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_employee_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_information_lists`
--

DROP TABLE IF EXISTS `warehouse_information_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_information_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_information_id` int(11) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `address_one` varchar(255) DEFAULT NULL,
  `address_two` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `locality_id` int(11) DEFAULT NULL,
  `gstin` varchar(255) DEFAULT NULL,
  `cin` varchar(255) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `partner_id` (`partner_id`),
  CONSTRAINT `warehouse_information_lists_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_information_lists`
--

LOCK TABLES `warehouse_information_lists` WRITE;
/*!40000 ALTER TABLE `warehouse_information_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_information_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_payment_types`
--

DROP TABLE IF EXISTS `warehouse_payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_payment_types` (
  `warehouse_payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`warehouse_payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_payment_types`
--

LOCK TABLES `warehouse_payment_types` WRITE;
/*!40000 ALTER TABLE `warehouse_payment_types` DISABLE KEYS */;
INSERT INTO `warehouse_payment_types` VALUES (1,'Card',1,'2019-03-29 12:02:40','2019-03-29 12:02:40'),(2,'Sodexo',1,'2019-03-29 12:02:40','2019-03-29 12:02:40'),(3,'Cash',1,'2019-03-29 12:02:40','2019-03-29 12:02:40');
/*!40000 ALTER TABLE `warehouse_payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_role_lists`
--

DROP TABLE IF EXISTS `warehouse_role_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_role_lists` (
  `warehouse_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`warehouse_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_role_lists`
--

LOCK TABLES `warehouse_role_lists` WRITE;
/*!40000 ALTER TABLE `warehouse_role_lists` DISABLE KEYS */;
INSERT INTO `warehouse_role_lists` VALUES (1,'System Administrator',1,'2019-03-29 12:02:49','2019-03-29 12:02:49'),(2,'Administrator',1,'2019-03-29 12:02:49','2019-03-29 12:02:49'),(3,'Manager',1,'2019-03-29 12:02:49','2019-03-29 12:02:49'),(4,'Biller',1,'2019-03-29 12:02:49','2019-03-29 12:02:49');
/*!40000 ALTER TABLE `warehouse_role_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_static_versions`
--

DROP TABLE IF EXISTS `warehouse_static_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_static_versions` (
  `warehouse_static_version_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_static_name` varchar(255) NOT NULL,
  `warehouse_static_version` float DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`warehouse_static_version_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_static_versions`
--

LOCK TABLES `warehouse_static_versions` WRITE;
/*!40000 ALTER TABLE `warehouse_static_versions` DISABLE KEYS */;
INSERT INTO `warehouse_static_versions` VALUES (1,'City Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(2,'Locality Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(3,'Discount Type Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(4,'Discount Base Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(5,'Gender Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(6,'Warehouse Payment Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(7,'Global Category Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(8,'Global Sub Category Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(9,'Global Sub Sub Category Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(10,'Warehouse Role Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(11,'Coupon Type Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(12,'Coupon Sub Type Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(13,'Item Condition Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(14,'Order Status Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(15,'Product Unit Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(16,'Product Sub Unit Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(17,'System Administrator Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27'),(18,'Tax Version',1,1,'2019-03-29 12:03:27','2019-03-29 12:03:27');
/*!40000 ALTER TABLE `warehouse_static_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_user_employee_connects`
--

DROP TABLE IF EXISTS `warehouse_user_employee_connects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_user_employee_connects` (
  `user_employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_user_id` int(11) NOT NULL,
  `warehouse_employe_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_employee_id`),
  KEY `warehouse_user_id` (`warehouse_user_id`),
  KEY `warehouse_employe_id` (`warehouse_employe_id`),
  CONSTRAINT `warehouse_user_employee_connects_ibfk_1` FOREIGN KEY (`warehouse_user_id`) REFERENCES `warehouse_user_lists` (`id`),
  CONSTRAINT `warehouse_user_employee_connects_ibfk_2` FOREIGN KEY (`warehouse_employe_id`) REFERENCES `warehouse_employee_lists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_user_employee_connects`
--

LOCK TABLES `warehouse_user_employee_connects` WRITE;
/*!40000 ALTER TABLE `warehouse_user_employee_connects` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_user_employee_connects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_user_lists`
--

DROP TABLE IF EXISTS `warehouse_user_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_user_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_user_id` int(11) NOT NULL,
  `warehouse_role_id` int(11) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `warehouse_role_id` (`warehouse_role_id`),
  KEY `partner_id` (`partner_id`),
  CONSTRAINT `warehouse_user_lists_ibfk_1` FOREIGN KEY (`warehouse_role_id`) REFERENCES `warehouse_role_lists` (`warehouse_role_id`),
  CONSTRAINT `warehouse_user_lists_ibfk_2` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_user_lists`
--

LOCK TABLES `warehouse_user_lists` WRITE;
/*!40000 ALTER TABLE `warehouse_user_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_user_lists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-29 17:55:23
