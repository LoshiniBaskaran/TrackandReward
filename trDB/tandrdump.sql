-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2022 at 07:35 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tandrdump`
--

-- --------------------------------------------------------

--
-- Table structure for table `contributions`
--

CREATE TABLE `contributions` (
  `contributionId` int(11) NOT NULL,
  `contributedBy` int(11) NOT NULL,
  `contributedFor` int(11) NOT NULL,
  `contributionDesc` varchar(500) NOT NULL,
  `contributedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contributions`
--

INSERT INTO `contributions` (`contributionId`, `contributedBy`, `contributedFor`, `contributionDesc`, `contributedDate`) VALUES
(2, 2, 3, 'Worked 1hr', '2022-01-06 21:17:57'),
(3, 1, 1, 'contributed for 2hrs', '2022-01-07 13:02:59'),
(4, 2, 3, 'Worked 2hrs on feature \"x\"', '2022-01-10 21:25:14'),
(5, 6, 3, 'Contributed 1hr', '2022-01-10 21:27:57');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `empId` int(11) NOT NULL,
  `empName` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `phNo` bigint(10) NOT NULL,
  `pwd` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`empId`, `empName`, `email`, `designation`, `phNo`, `pwd`) VALUES
(0, 'admin', 'admin@gmail.com', 'admin', 9999999999, '$2b$10$gIscy57zmKWrtJuBpeQIv.PaaMh2b73sGZv8n8ZvCrQyYt2pOuT/q'),
(1, 'Employee_1', 'employee1@gmail.com', 'emp_1_des', 8888888888, '$2b$10$tkCE1c0Rzd6zcJpH9tuh6OeDg6jxAhpObRhE.IKy2iJTR1YfOg4aS'),
(2, 'Employee_2', 'employee2@gmail.com', 'emp_2_des', 7777777777, '$2b$10$3y71/9TzYXO2HaCpg44PH.8xXLocqMXJAZSRSAn5rvdq/iyQfvzt.'),
(3, 'Employee_3', 'employee3@gmail.com', 'emp_3_des', 6666666666, '$2b$10$I3MmOB7iF7lZX/yJJxSzq.AiQS9J0Nu1AQfnCTXwvtRF5rKstbfyC'),
(4, 'Employee_4', 'employee4@gmail.com', 'emp_4_des', 9999999998, '$2b$10$Ky6jwhA5ForT1ADKVsG6suQ7c.onyi3vgzMRW6ytDmoa0Dvuhuld.'),
(5, 'Employee_5', 'employee5@gmail.com', 'emp_5_des', 9999999989, '$2b$10$Od82fKmWpCNuqKllpFUt9uL7sdgeuYmEoxpKofqrxAJQXTx04MK/K'),
(6, 'Employee_6', 'employee6@gmail.com', 'emp_6_des', 9999999899, '$2b$10$du8TCYngMm4an77TSmMUWu.alrdYqYbvFM62CtowZSj.GXO.V4zHm');

-- --------------------------------------------------------

--
-- Table structure for table `initiatives`
--

CREATE TABLE `initiatives` (
  `initId` int(11) NOT NULL,
  `initName` varchar(100) NOT NULL,
  `initDesc` varchar(500) NOT NULL,
  `initStatus` varchar(25) NOT NULL,
  `initDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `initiatives`
--

INSERT INTO `initiatives` (`initId`, `initName`, `initDesc`, `initStatus`, `initDate`) VALUES
(1, 'Initiative_1', 'Description of initiative 1', 'Initiated', '2021-12-02'),
(2, 'Initiative_2', 'Description of initiation 2', 'Yet to be Initiated', NULL),
(3, 'Initiative_3', 'Description of initiative 3', 'Completed', '2021-12-10'),
(4, 'Initiative_4', 'Description of initiative 4', 'Initiated', '2021-12-10'),
(5, 'Initiative_5', 'Description of initiative 5', 'Yet to be Initiated', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `reviewId` int(11) NOT NULL,
  `reviewedBy` int(11) NOT NULL,
  `reviewedFor` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `reviewedDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`reviewId`, `reviewedBy`, `reviewedFor`, `rating`, `comment`, `reviewedDate`) VALUES
(1, 2, 3, 4, 'Great work', '2022-01-10 21:29:19'),
(2, 5, 3, 5, 'Nice job', '2022-01-10 21:30:51');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subBy` int(11) NOT NULL,
  `subFor` int(11) NOT NULL,
  `subDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`subBy`, `subFor`, `subDate`) VALUES
(1, 1, '2021-12-28 12:08:54'),
(2, 3, '2022-01-01 11:09:36'),
(3, 2, '2021-12-28 21:39:35'),
(3, 3, '2022-01-01 11:08:31'),
(5, 1, '2022-01-01 11:05:45'),
(6, 3, '2022-01-01 11:07:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contributions`
--
ALTER TABLE `contributions`
  ADD PRIMARY KEY (`contributionId`),
  ADD KEY `contributedBy` (`contributedBy`),
  ADD KEY `contributedFor` (`contributedFor`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`empId`),
  ADD UNIQUE KEY `phNo` (`phNo`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `initiatives`
--
ALTER TABLE `initiatives`
  ADD PRIMARY KEY (`initId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewId`),
  ADD KEY `reviewedBy` (`reviewedBy`),
  ADD KEY `reviewedFor` (`reviewedFor`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subBy`,`subFor`),
  ADD KEY `subFor` (`subFor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contributions`
--
ALTER TABLE `contributions`
  MODIFY `contributionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `initiatives`
--
ALTER TABLE `initiatives`
  MODIFY `initId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contributions`
--
ALTER TABLE `contributions`
  ADD CONSTRAINT `contributions_ibfk_1` FOREIGN KEY (`contributedBy`) REFERENCES `employees` (`empId`),
  ADD CONSTRAINT `contributions_ibfk_2` FOREIGN KEY (`contributedFor`) REFERENCES `initiatives` (`initId`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`reviewedBy`) REFERENCES `employees` (`empId`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewedFor`) REFERENCES `contributions` (`contributionId`);

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`subBy`) REFERENCES `employees` (`empId`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`subFor`) REFERENCES `initiatives` (`initId`),
  ADD CONSTRAINT `subscriptions_ibfk_3` FOREIGN KEY (`subBy`) REFERENCES `employees` (`empId`),
  ADD CONSTRAINT `subscriptions_ibfk_4` FOREIGN KEY (`subBy`) REFERENCES `employees` (`empId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
