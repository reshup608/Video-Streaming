-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.33-community-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema vs
--

CREATE DATABASE IF NOT EXISTS vs;
USE vs;

--
-- Definition of table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator` (
  `adminid` int(10) unsigned NOT NULL auto_increment,
  `adminname` varchar(45) NOT NULL,
  `adminpicture` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY  (`adminid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrator`
--

/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`adminid`,`adminname`,`adminpicture`,`password`) VALUES 
 (100,'Gautam','DSC_0004.jpg','123'),
 (1000,'Gautam','DSC_0004.jpg','1234');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;


--
-- Definition of table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categoryid` int(10) unsigned NOT NULL auto_increment,
  `categoryname` varchar(45) NOT NULL,
  `categorydescription` varchar(45) NOT NULL,
  `categoryicon` varchar(405) NOT NULL,
  PRIMARY KEY  (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`categoryid`,`categoryname`,`categorydescription`,`categoryicon`) VALUES 
 (11,'MOVIE','All Movies','16526995-blue-movie-logo-on-a-black-background.jpg'),
 (12,'Tv serials','Hindi,English,...,etc.','69361962-tv-logo-design-set-eps-8-supported-.jpg'),
 (13,'Webseries','All Webseries','web-series.jpg'),
 (14,'Documentary','Documentry','29615135-detailed-illustration-of-a-clapper-board-with-documentary-term-symbol-for-film-and-video-genre.jpg'),
 (15,'Sports','Sports','500_F_143128212_RGrpdeXlEI9VD7ULgh582bMwlzZvafgr.jpg'),
 (16,'Comedy','Comedy','jTktyfQ-.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;


--
-- Definition of table `episodes`
--

DROP TABLE IF EXISTS `episodes`;
CREATE TABLE `episodes` (
  `episodeid` int(10) unsigned NOT NULL auto_increment,
  `videoId` varchar(45) NOT NULL,
  `episodeTitle` varchar(45) NOT NULL,
  `episodeDescription` varchar(45) NOT NULL,
  `episodeIcon` varchar(45) NOT NULL,
  `episodeUrl` varchar(405) NOT NULL,
  PRIMARY KEY  (`episodeid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `episodes`
--

/*!40000 ALTER TABLE `episodes` DISABLE KEYS */;
INSERT INTO `episodes` (`episodeid`,`videoId`,`episodeTitle`,`episodeDescription`,`episodeIcon`,`episodeUrl`) VALUES 
 (2,'123465','Episode 1','qwe','logo.png','Aarsh Benipal - Pakke Tikane _ Jassi Lohka _ New P.mp4'),
 (3,'123464','m2','m2','_0c75a6a4-3694-11e9-85ab-b5c6484f4b61.jpg','mirzapur.s01e02.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4'),
 (4,'123464','Ep -2','episode 2','_0c75a6a4-3694-11e9-85ab-b5c6484f4b61.jpg','mirzapur.s01e02.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4');
/*!40000 ALTER TABLE `episodes` ENABLE KEYS */;


--
-- Definition of table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories` (
  `subcategoryid` int(10) unsigned NOT NULL auto_increment,
  `subcategoryname` varchar(45) character set latin1 collate latin1_bin NOT NULL,
  `subcategorydescription` varchar(45) character set latin1 collate latin1_bin NOT NULL,
  `subcategoryicon` varchar(450) character set latin1 collate latin1_bin NOT NULL,
  `categoryid` varchar(45) NOT NULL,
  PRIMARY KEY  USING BTREE (`subcategoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategories`
--

/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` (`subcategoryid`,`subcategoryname`,`subcategorydescription`,`subcategoryicon`,`categoryid`) VALUES 
 (1,0x426F6C6C79576F6F64,0x526F6D616E7469632C416374696F6E2C436F6D656479,0x626F6C6C79776F6F642D696E6469616E2D63696E656D612D66696C6D2D62616E6E65722D696E6469616E2D63696E656D612D6C6F676F2D7369676E2D64657369676E2D676C6F77696E672D656C656D656E742D73746167652D6375727461696E732D626F6C6C79776F6F642D696E6469616E2D63696E656D612D3133383237343039362E6A7067,'11'),
 (2,0x48696E6469,0x636F6D6465792C416374696F6E2C4472616D61,0x36393336313936322D74762D6C6F676F2D64657369676E2D7365742D6570732D382D737570706F727465642D2E6A7067,'12'),
 (3,0x48696E646920576562536572696573,0x416374696F6E2C4472616D612C436F6D6564792C526F6D616E6365,0x7765622D7365726965732E6A7067,'13'),
 (4,0x486F6C6C79576F6F64,0x416374696F6E2C4472616D61,0x34363936325F333534313832355F3437323331395F7468756D626E61696C2E6A7067,'11'),
 (5,0x496E6469616E20446F63756D656E747279,0x446F63756D656E74727920696E20696E646961,0x756E6E616D65642E706E67,'14'),
 (6,0x496E6469616E20437269636B6574,0x496E6469616E20437269636B6574,0x696E6469616E2D637269636B65742E6A7067,'15');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;


--
-- Definition of table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `emailid` varchar(45) NOT NULL,
  `phonenumber` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY  (`emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` (`firstname`,`lastname`,`emailid`,`phonenumber`,`password`,`status`) VALUES 
 ('Vishal','Jain','gautamojha1998@gmail.com','9174537339','123','Verified'),
 ('gautam','ojha','gautamojha54@gmail.com','9479936792','123','Verified');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;


--
-- Definition of table `video`
--

DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `videoid` int(10) unsigned NOT NULL auto_increment,
  `subcategoryid` int(10) unsigned NOT NULL,
  `videotitle` varchar(45) NOT NULL,
  `videometadata` varchar(105) NOT NULL,
  `videodescription` varchar(5005) NOT NULL,
  `status` varchar(45) NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `poster` varchar(105) NOT NULL,
  `videourl` varchar(4050) NOT NULL,
  `statusepisode` varchar(45) NOT NULL,
  PRIMARY KEY  (`videoid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` (`videoid`,`subcategoryid`,`videotitle`,`videometadata`,`videodescription`,`status`,`amount`,`poster`,`videourl`,`statusepisode`) VALUES 
 (123463,4,'Spiderman','Spiderman','Spiderman','free',0,'spiderman-3-vector-logo.png','Spider-Man Far from Home 720p 1080p HD Movies Free Download Bluray HDpopco.mp4','No'),
 (123464,3,'Mirzapur','Mirzapur','Mirzapur','Paid',25,'_0c75a6a4-3694-11e9-85ab-b5c6484f4b61.jpg','Mirzapur S01E01 Jhandu 720p AMZN WEB-DL x264 DD 5.1-LOKiHD.mkv.mp4 ( HD ).mp4','Yes'),
 (123465,2,'Taarak Mehta Ka Ooltah Chashmah','Taarak Mehta Ka Ooltah Chashmah','Taarak Mehta Ka Ooltah Chashmah','free',0,'logo.png','Chhote Chhote Peg (Video) _ Yo Yo Honey Singh _ Ne.mp4','No'),
 (123466,1,'hindi','qwert','qwert','Paid',145,'DSC_0004.jpg','(HipSong.Com) Bullet Vs Chammak Challo- Ammy Virk   Official Video   Brand .mp4','Yes'),
 (123467,3,'Criminal Justice','qwe','hgc','Paid',100,'download (1).jpg','mirzapur.s01e02.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4','Yes'),
 (123468,2,'qwerty','qwert','qwe','Paid',145,'WhatsApp Image 2019-07-28 at 9.56.03 PM.jpeg','VID_20190103_083603992.mp4','Yes'),
 (123469,5,'Mahatama Gandhi Documentry','Mahatama Gandhi Documentry','This documentary shows how India was dogged by nationalism and religious conflict on its path to independence - and how these factors mark the country to this day. On 20 January 1948, Gopal Godse, a Hindu fanatic, attempted to assassinate Mahatma Gandhi. Ten days later, his brother Nathuram Godse managed to finish the job: he killed Gandhi. ','free',0,'71Sreyt0zXL._SY679_.jpg','mirzapur.s01e06.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4','No'),
 (123470,6,'Dhoni  Biography','Dhoni  Biography','This video is about indian cricketer mahendar singh dhoni biography in hindi. In this video you can watch about ms dhoni wife and family.','Paid',250,'thumbnail_220x220.jpg','Mahendar Singh Dhoni Biography In Hindi - About Ms Dhoni Wife And Family - Cricket.mp4','No'),
 (123471,3,'Kota Factory','Kota Factory','Kota Factory is an Indian Hindi-language web series directed by Raghav Subbu for The Viral Fever. The series simultaneously premiered on TVFPlay and YouTube on 16 April 2019. It is also the first black and white web series in India. The show follows the life of 17-year-old Vaibhav who moves to Kota from Itarsi.','Paid',150,'maxresdefault.jpg','2-2 Peg (Full Video) _ Goldy Desi Crew _ Parmish V.mp4','Yes'),
 (123472,3,'Chacha Vidhayak Hain Humare','Chacha Vidhayak Hain Humare','Chacha Vidhayak Hain Humare is an Indian comedy web television series created by Zakir Khan, produced by OML Production and starring Zakir Khan, Alka Amin and Zakir Hussain.','free',0,'Chacha-Vidhayak-Hain-Humare-Hindi-2018-20180511182523-500x500.jpg','mirzapur.s01e06.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4','Yes'),
 (123473,3,'Hostages','Hostages','Hostages is an Indian crime thriller web television series directed by Sudhir Mishra. An official adaptation of an Israeli series of the same name, it revolves around the life of a surgeon who is ordered to assassinate the chief minister in exchange for the survival of her family. It is streaming in 7 Indian languages on Hotstar.','Paid',150,'nyPhZvjXj0cjPxLYXjfPrIYeeAN.jpg','mirzapur.s01e06.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4','Yes'),
 (123474,3,'Sacred Games','Sacred Games','Sacred Games is an Indian web television thriller series based on Vikram Chandra\'s 2006 novel of the same name. The first Netflix original series in India, it is directed by Vikramaditya Motwane and Anurag Kashyap who produced it under their banner Phantom Films. The novel was adapted by Varun Grover, Singh, and Vasant Nath. Kelly Luegenbiehl, Erik Barmack, and Motwane served as the executive producers.\n\nSartaj Singh (Saif Ali Khan) is a troubled police officer in Mumbai who receives a phone call from gangster Ganesh Gaitonde (Nawazuddin Siddiqui), who tells him to save the city within 25 days. The series chronicles the events that follow. Other cast members include Radhika Apte, Girish Kulkarni, Neeraj Kabi, Geetanjali Thapa, Jeetendra Joshi, Rajshri Deshpande, Karan Wahi, Aamir Bashir, Jatin Sarna, Elnaaz Norouzi, Pankaj Tripathi, Amey Wagh, and Kubra Sait.','Paid',500,'Sacred_Games_Title.png','mirzapur.s01e03.1080p.amzn.web-dl.ddp5.1.h.264-ng.mp4 ( HD ).mp4','Yes');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
