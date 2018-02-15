CREATE DATABASE  IF NOT EXISTS `kicktipp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kicktipp`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kicktipp
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `champion_tips`
--

DROP TABLE IF EXISTS `champion_tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `champion_tips` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `teamId` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `championtipsgroupedview`
--

DROP TABLE IF EXISTS `championtipsgroupedview`;
/*!50001 DROP VIEW IF EXISTS `championtipsgroupedview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `championtipsgroupedview` AS SELECT 
 1 AS `id`,
 1 AS `userId`,
 1 AS `teamId`,
 1 AS `name`,
 1 AS `countryCode`,
 1 AS `count`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `championtipsview`
--

DROP TABLE IF EXISTS `championtipsview`;
/*!50001 DROP VIEW IF EXISTS `championtipsview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `championtipsview` AS SELECT 
 1 AS `id`,
 1 AS `userId`,
 1 AS `teamId`,
 1 AS `name`,
 1 AS `countryCode`,
 1 AS `username`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `groupsview`
--

DROP TABLE IF EXISTS `groupsview`;
/*!50001 DROP VIEW IF EXISTS `groupsview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `groupsview` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `matchId`,
 1 AS `date`,
 1 AS `roundId`,
 1 AS `teamAId`,
 1 AS `teamBId`,
 1 AS `teamALabel`,
 1 AS `teamBLabel`,
 1 AS `goalsTeamA`,
 1 AS `goalsTeamB`,
 1 AS `roundName`,
 1 AS `groupName`,
 1 AS `teamAName`,
 1 AS `teamBName`,
 1 AS `teamACountryCode`,
 1 AS `teamBCountryCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `jokers`
--

DROP TABLE IF EXISTS `jokers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jokers` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `matchId` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `jokersview`
--

DROP TABLE IF EXISTS `jokersview`;
/*!50001 DROP VIEW IF EXISTS `jokersview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `jokersview` AS SELECT 
 1 AS `id`,
 1 AS `userId`,
 1 AS `matchId`,
 1 AS `matchDate`,
 1 AS `username`,
 1 AS `teamAName`,
 1 AS `teamBName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matches` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `roundId` tinyint(4) NOT NULL,
  `teamAId` tinyint(4) NOT NULL,
  `teamBId` tinyint(4) NOT NULL,
  `teamALabel` varchar(50) NOT NULL,
  `teamBLabel` varchar(50) NOT NULL,
  `goalsTeamA` tinyint(4) NOT NULL DEFAULT '-1',
  `goalsTeamB` tinyint(4) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `matchesview`
--

DROP TABLE IF EXISTS `matchesview`;
/*!50001 DROP VIEW IF EXISTS `matchesview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `matchesview` AS SELECT 
 1 AS `id`,
 1 AS `date`,
 1 AS `roundId`,
 1 AS `teamAId`,
 1 AS `teamBId`,
 1 AS `teamALabel`,
 1 AS `teamBLabel`,
 1 AS `goalsTeamA`,
 1 AS `goalsTeamB`,
 1 AS `roundName`,
 1 AS `groupName`,
 1 AS `teamAName`,
 1 AS `teamBName`,
 1 AS `teamACountryCode`,
 1 AS `teamBCountryCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `penalty_survey`
--

DROP TABLE IF EXISTS `penalty_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penalty_survey` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `choice` enum('1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rounds`
--

DROP TABLE IF EXISTS `rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rounds` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `roundNumber` int(2) NOT NULL,
  `name` varchar(40) NOT NULL,
  `firstMatchId` tinyint(2) NOT NULL,
  `lastMatchId` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roundNumber` (`roundNumber`),
  KEY `firstMatchId` (`firstMatchId`),
  KEY `lastMatchId` (`lastMatchId`),
  CONSTRAINT `rounds_ibfk_1` FOREIGN KEY (`firstMatchId`) REFERENCES `matches` (`id`),
  CONSTRAINT `rounds_ibfk_2` FOREIGN KEY (`lastMatchId`) REFERENCES `matches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `roundsview`
--

DROP TABLE IF EXISTS `roundsview`;
/*!50001 DROP VIEW IF EXISTS `roundsview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `roundsview` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `roundNumber`,
 1 AS `firstMatchId`,
 1 AS `lastMatchId`,
 1 AS `dateStart`,
 1 AS `dateEnd`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `groupId` tinyint(2) NOT NULL,
  `name` varchar(40) NOT NULL,
  `countryCode` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `country_code` (`countryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `teamsview`
--

DROP TABLE IF EXISTS `teamsview`;
/*!50001 DROP VIEW IF EXISTS `teamsview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `teamsview` AS SELECT 
 1 AS `id`,
 1 AS `groupId`,
 1 AS `name`,
 1 AS `countryCode`,
 1 AS `groupName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tips`
--

DROP TABLE IF EXISTS `tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tips` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `matchId` tinyint(2) NOT NULL,
  `tipTeamA` tinyint(2) NOT NULL DEFAULT '-1',
  `tipTeamB` tinyint(2) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `matchId` (`matchId`),
  KEY `matchId_2` (`matchId`)
) ENGINE=InnoDB AUTO_INCREMENT=4538 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `tipsview`
--

DROP TABLE IF EXISTS `tipsview`;
/*!50001 DROP VIEW IF EXISTS `tipsview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `tipsview` AS SELECT 
 1 AS `id`,
 1 AS `userId`,
 1 AS `matchId`,
 1 AS `matchDate`,
 1 AS `tipTeamA`,
 1 AS `tipTeamB`,
 1 AS `joker`,
 1 AS `username`,
 1 AS `goalsTeamA`,
 1 AS `roundId`,
 1 AS `goalsTeamB`,
 1 AS `teamAName`,
 1 AS `teamBName`,
 1 AS `countryCodeA`,
 1 AS `countryCodeB`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `country` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `tournamentview`
--

DROP TABLE IF EXISTS `tournamentview`;
/*!50001 DROP VIEW IF EXISTS `tournamentview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `tournamentview` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `country`,
 1 AS `startDate`,
 1 AS `endDate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_history`
--

DROP TABLE IF EXISTS `user_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `spielNr` tinyint(2) NOT NULL,
  `rank` tinyint(3) NOT NULL,
  `oldRank` tinyint(3) NOT NULL,
  `points` tinyint(3) NOT NULL,
  `tips4er` tinyint(2) NOT NULL,
  `tips2er` tinyint(2) NOT NULL,
  `tips1er` tinyint(2) NOT NULL,
  `trend` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8464 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `status` enum('registered','active') NOT NULL DEFAULT 'registered',
  `mastertip` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `invitation` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=262 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `userview`
--

DROP TABLE IF EXISTS `userview`;
/*!50001 DROP VIEW IF EXISTS `userview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `userview` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `mastertip`,
 1 AS `spielNr`,
 1 AS `rank`,
 1 AS `oldRank`,
 1 AS `points`,
 1 AS `tips4er`,
 1 AS `tips2er`,
 1 AS `tips1er`,
 1 AS `trend`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `championtipsgroupedview`
--

/*!50001 DROP VIEW IF EXISTS `championtipsgroupedview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `championtipsgroupedview` AS select `ct`.`id` AS `id`,`ct`.`userId` AS `userId`,`ct`.`teamId` AS `teamId`,`t`.`name` AS `name`,`t`.`countryCode` AS `countryCode`,count(0) AS `count` from (`champion_tips` `ct` join `teams` `t`) where (`ct`.`teamId` = `t`.`id`) group by `t`.`name` order by count(0) desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `championtipsview`
--

/*!50001 DROP VIEW IF EXISTS `championtipsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `championtipsview` AS select `ct`.`id` AS `id`,`ct`.`userId` AS `userId`,`ct`.`teamId` AS `teamId`,`t`.`name` AS `name`,`t`.`countryCode` AS `countryCode`,`u`.`username` AS `username` from ((`champion_tips` `ct` join `teams` `t`) join `users` `u`) where ((`ct`.`teamId` = `t`.`id`) and (`ct`.`userId` = `u`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `groupsview`
--

/*!50001 DROP VIEW IF EXISTS `groupsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `groupsview` AS select `g`.`id` AS `id`,`g`.`name` AS `name`,`m`.`id` AS `matchId`,`m`.`date` AS `date`,`m`.`roundId` AS `roundId`,`m`.`teamAId` AS `teamAId`,`m`.`teamBId` AS `teamBId`,`m`.`teamALabel` AS `teamALabel`,`m`.`teamBLabel` AS `teamBLabel`,`m`.`goalsTeamA` AS `goalsTeamA`,`m`.`goalsTeamB` AS `goalsTeamB`,`m`.`roundName` AS `roundName`,`m`.`groupName` AS `groupName`,`m`.`teamAName` AS `teamAName`,`m`.`teamBName` AS `teamBName`,`m`.`teamACountryCode` AS `teamACountryCode`,`m`.`teamBCountryCode` AS `teamBCountryCode` from (`groups` `g` join `matchesview` `m`) where ((`g`.`name` = `m`.`groupName`) and (`m`.`roundId` < 2)) order by `g`.`name`,`m`.`date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `jokersview`
--

/*!50001 DROP VIEW IF EXISTS `jokersview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `jokersview` AS select `j`.`id` AS `id`,`j`.`userId` AS `userId`,`j`.`matchId` AS `matchId`,`m`.`date` AS `matchDate`,`u`.`username` AS `username`,(select `t`.`name` from `teams` `t` where (`t`.`id` = `m`.`teamAId`)) AS `teamAName`,(select `t`.`name` from `teams` `t` where (`t`.`id` = `m`.`teamBId`)) AS `teamBName` from ((`jokers` `j` join `matches` `m`) join `users` `u`) where ((`j`.`matchId` = `m`.`id`) and (`u`.`id` = `j`.`userId`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `matchesview`
--

/*!50001 DROP VIEW IF EXISTS `matchesview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `matchesview` AS select `m`.`id` AS `id`,`m`.`date` AS `date`,`m`.`roundId` AS `roundId`,`m`.`teamAId` AS `teamAId`,`m`.`teamBId` AS `teamBId`,`m`.`teamALabel` AS `teamALabel`,`m`.`teamBLabel` AS `teamBLabel`,`m`.`goalsTeamA` AS `goalsTeamA`,`m`.`goalsTeamB` AS `goalsTeamB`,`r`.`name` AS `roundName`,(select `groups`.`name` from (`groups` join `teams`) where ((`groups`.`id` = `teams`.`groupId`) and (`teams`.`id` = `m`.`teamAId`))) AS `groupName`,(select `teams`.`name` from `teams` where (`teams`.`id` = `m`.`teamAId`)) AS `teamAName`,(select `teams`.`name` from `teams` where (`teams`.`id` = `m`.`teamBId`)) AS `teamBName`,(select `teams`.`countryCode` from `teams` where (`teams`.`id` = `m`.`teamAId`)) AS `teamACountryCode`,(select `teams`.`countryCode` from `teams` where (`teams`.`id` = `m`.`teamBId`)) AS `teamBCountryCode` from (`matches` `m` join `rounds` `r`) where (`r`.`id` = `m`.`roundId`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `roundsview`
--

/*!50001 DROP VIEW IF EXISTS `roundsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `roundsview` AS select `r`.`id` AS `id`,`r`.`name` AS `name`,`r`.`roundNumber` AS `roundNumber`,`r`.`firstMatchId` AS `firstMatchId`,`r`.`lastMatchId` AS `lastMatchId`,(select `matches`.`date` from `matches` where (`matches`.`id` = `r`.`firstMatchId`)) AS `dateStart`,(select `matches`.`date` from `matches` where (`matches`.`id` = `r`.`lastMatchId`)) AS `dateEnd` from `rounds` `r` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `teamsview`
--

/*!50001 DROP VIEW IF EXISTS `teamsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `teamsview` AS select `t`.`id` AS `id`,`t`.`groupId` AS `groupId`,`t`.`name` AS `name`,`t`.`countryCode` AS `countryCode`,`g`.`name` AS `groupName` from (`teams` `t` join `groups` `g`) where (`t`.`groupId` = `g`.`id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tipsview`
--

/*!50001 DROP VIEW IF EXISTS `tipsview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tipsview` AS select `t`.`id` AS `id`,`t`.`userId` AS `userId`,`t`.`matchId` AS `matchId`,`m`.`date` AS `matchDate`,`t`.`tipTeamA` AS `tipTeamA`,`t`.`tipTeamB` AS `tipTeamB`,(select `j`.`id` from `jokers` `j` where ((`j`.`userId` = `u`.`id`) and (`j`.`matchId` = `m`.`id`))) AS `joker`,`u`.`username` AS `username`,`m`.`goalsTeamA` AS `goalsTeamA`,`m`.`roundId` AS `roundId`,`m`.`goalsTeamB` AS `goalsTeamB`,(select `te`.`name` from `teams` `te` where (`te`.`id` = `m`.`teamAId`)) AS `teamAName`,(select `te`.`name` from `teams` `te` where (`te`.`id` = `m`.`teamBId`)) AS `teamBName`,(select `te`.`countryCode` from `teams` `te` where (`te`.`id` = `m`.`teamAId`)) AS `countryCodeA`,(select `te`.`countryCode` from `teams` `te` where (`te`.`id` = `m`.`teamBId`)) AS `countryCodeB` from ((`tips` `t` join `matches` `m`) join `users` `u`) where ((`t`.`matchId` = `m`.`id`) and (`t`.`userId` = `u`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tournamentview`
--

/*!50001 DROP VIEW IF EXISTS `tournamentview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tournamentview` AS select `t`.`id` AS `id`,`t`.`name` AS `name`,`t`.`country` AS `country`,(select `m`.`date` from (`rounds` `r` join `matches` `m`) where (`r`.`id` = `m`.`roundId`) order by `r`.`roundNumber` limit 1) AS `startDate`,(select `m`.`date` from (`rounds` `r` join `matches` `m`) where (`r`.`id` = `m`.`roundId`) order by `r`.`roundNumber` desc limit 1) AS `endDate` from `tournament` `t` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `userview`
--

/*!50001 DROP VIEW IF EXISTS `userview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kicktipp`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userview` AS select `u`.`id` AS `id`,`u`.`username` AS `username`,`u`.`mastertip` AS `mastertip`,`h`.`spielNr` AS `spielNr`,`h`.`rank` AS `rank`,`h`.`oldRank` AS `oldRank`,`h`.`points` AS `points`,`h`.`tips4er` AS `tips4er`,`h`.`tips2er` AS `tips2er`,`h`.`tips1er` AS `tips1er`,`h`.`trend` AS `trend` from (`users` `u` join `user_history` `h`) where ((`u`.`id` = `h`.`userId`) and (`h`.`spielNr` = (select max(`user_history`.`spielNr`) from `user_history`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-15 13:47:34
