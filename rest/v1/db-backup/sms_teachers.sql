-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2026 at 07:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter_sms_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `sms_teachers`
--

CREATE TABLE `sms_teachers` (
  `teachers_aid` int(11) NOT NULL,
  `teachers_is_active` tinyint(1) NOT NULL,
  `teachers_first_name` varchar(128) NOT NULL,
  `teachers_middle_name` varchar(128) NOT NULL,
  `teachers_last_name` varchar(128) NOT NULL,
  `teachers_subject` varchar(128) NOT NULL,
  `teachers_email` varchar(128) NOT NULL,
  `teachers_created` datetime NOT NULL,
  `teachers_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sms_teachers`
--
ALTER TABLE `sms_teachers`
  ADD PRIMARY KEY (`teachers_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sms_teachers`
--
ALTER TABLE `sms_teachers`
  MODIFY `teachers_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
