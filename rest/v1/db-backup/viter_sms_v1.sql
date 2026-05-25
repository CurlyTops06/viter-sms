-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2026 at 07:10 AM
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
-- Table structure for table `sms_students`
--

CREATE TABLE `sms_students` (
  `students_aid` int(11) NOT NULL,
  `students_is_active` tinyint(1) NOT NULL,
  `students_first_name` varchar(128) NOT NULL,
  `students_middle_name` varchar(128) NOT NULL,
  `students_last_name` varchar(128) NOT NULL,
  `students_id` varchar(50) NOT NULL,
  `students_grade` varchar(50) NOT NULL,
  `students_section` varchar(50) NOT NULL,
  `students_created` datetime NOT NULL,
  `students_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sms_students`
--
ALTER TABLE `sms_students`
  ADD PRIMARY KEY (`students_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sms_students`
--
ALTER TABLE `sms_students`
  MODIFY `students_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
