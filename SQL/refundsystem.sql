-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2016 at 09:33 AM
-- Server version: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `refundsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `casehistory`
--

CREATE TABLE `casehistory` (
  `casehistory_Id` int(11) NOT NULL,
  `RefundCase_Id` int(11) NOT NULL,
  `Time` datetime NOT NULL,
  `HistoryLog` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `caseimages`
--

CREATE TABLE `caseimages` (
  `Image_Id` int(11) NOT NULL,
  `RefundCase_Id` int(11) NOT NULL,
  `Image_Path` text,
  `Image_Name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `caselinks`
--

CREATE TABLE `caselinks` (
  `RefundCase_Id` int(11) NOT NULL,
  `Seller_Id` int(11) DEFAULT NULL,
  `Generation_Time` text,
  `CaseLink` text,
  `IsActive` tinyint(4) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `casemessages`
--

CREATE TABLE `casemessages` (
  `CaseMessage_Id` int(11) NOT NULL,
  `RefundCase_Id` int(11) DEFAULT NULL,
  `From_name` text,
  `Seller_Id` int(11) NOT NULL,
  `Message` text,
  `DateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `itemcondition`
--

CREATE TABLE `itemcondition` (
  `ItemCondition_Id` int(11) NOT NULL,
  `ItemCondition` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemcondition`
--

INSERT INTO `itemcondition` (`ItemCondition_Id`, `ItemCondition`) VALUES
(1, 'New, Package Unopened'),
(2, 'New Unused, Package Opened or Damaged'),
(3, 'New, Missing Parts'),
(4, 'New, Others'),
(5, 'Used, As New'),
(6, 'Moderately Used But Functional'),
(7, 'Defect In Use'),
(8, 'Defect on Arrival'),
(9, 'Damaged On Arrival'),
(10, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `Id` int(11) NOT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `Controller` text,
  `Action` text NOT NULL,
  `Content` text,
  `DateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `child_id` int(11) DEFAULT NULL,
  `from_user_id` int(10) UNSIGNED NOT NULL,
  `to_user_id` int(10) UNSIGNED NOT NULL,
  `notificationMsg` text COLLATE utf8_unicode_ci,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `sent_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Admin', 'Admin', '2016-08-17 21:29:20', '2016-08-17 21:29:20'),
(4, 'Communication', 'Communication', 'Communication', NULL, NULL),
(2, 'Seller', 'Seller', 'Seller', NULL, NULL),
(3, 'Warehouse', 'Warehouse', 'Warehouse', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 3),
(4, 1),
(4, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `reason`
--

CREATE TABLE `reason` (
  `Reason_Id` int(11) NOT NULL,
  `Reason` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reason`
--

INSERT INTO `reason` (`Reason_Id`, `Reason`) VALUES
(1, 'Wrong Item'),
(2, 'Don\'t Like/ Doesn\'t Fit'),
(3, 'Doesn\'t match item description'),
(4, 'Wrong Order Placement'),
(5, 'Transport Damage on Arrival'),
(6, 'Guarantee/Warranty'),
(7, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `refundcase`
--

CREATE TABLE `refundcase` (
  `RefundCase_Id` int(11) NOT NULL,
  `Seller_Id` int(11) NOT NULL,
  `RefundCaseDetail` text,
  `RefundCaseStatus` text,
  `RefundCaseStatusKey` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Administrator', 'Admin from Warehouse', '2016-08-17 21:13:36', '2016-08-17 21:13:36'),
(2, 'Seller', 'Seller', 'Seller of the product', '2016-08-17 21:13:36', '2016-08-17 21:13:36'),
(3, 'Warehouse', 'Warehouse', 'Warehouse', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'SuperUser', 'super@admin.com', '$2y$10$zcRVbexuU3TjOFKHWbhpY.tWubto.akIMu2NSxdWrgmCi4VmfjWWW', NULL, NULL, '2016-09-07 18:44:12');

-- --------------------------------------------------------

--
-- Table structure for table `warehouseitem_status_action`
--

CREATE TABLE `warehouseitem_status_action` (
  `statusaction_Id` int(11) NOT NULL,
  `action` text NOT NULL,
  `status` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `warehouseitem_status_action`
--

INSERT INTO `warehouseitem_status_action` (`statusaction_Id`, `action`, `status`) VALUES
(1, 'Restock Rack', 'New - Restock as New'),
(2, 'B-Ware Rack', 'New - Package opened'),
(3, 'B-Ware Rack', 'New - Package damaged'),
(4, 'B-Ware Rack', 'New - Others'),
(5, 'B-Ware Rack', 'B-Ware - Restock as B'),
(6, 'B-Ware Storage', 'B-Ware - need treatment(Repair,Reapck..)'),
(7, 'B-Ware Storage', 'B-Ware - Others'),
(8, 'Discard', 'Defect - Discard'),
(9, 'Defect-Storage', 'Defect-Storage as Replacement Parts'),
(10, 'Defect-Factory', 'Defect-Return to Factory'),
(11, 'Hold Case', 'Not in Package'),
(12, 'Hold Case', 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `wish`
--

CREATE TABLE `wish` (
  `Wish_Id` int(11) NOT NULL,
  `Wish` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wish`
--

INSERT INTO `wish` (`Wish_Id`, `Wish`) VALUES
(3, 'Repair'),
(1, 'Refund'),
(2, 'Replace'),
(4, 'Others');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casehistory`
--
ALTER TABLE `casehistory`
  ADD PRIMARY KEY (`casehistory_Id`);

--
-- Indexes for table `caseimages`
--
ALTER TABLE `caseimages`
  ADD PRIMARY KEY (`Image_Id`),
  ADD KEY `RefundCase_Id` (`RefundCase_Id`);

--
-- Indexes for table `caselinks`
--
ALTER TABLE `caselinks`
  ADD PRIMARY KEY (`RefundCase_Id`),
  ADD KEY `Seller_Id` (`Seller_Id`);

--
-- Indexes for table `casemessages`
--
ALTER TABLE `casemessages`
  ADD PRIMARY KEY (`CaseMessage_Id`),
  ADD KEY `RefundCase_Id` (`RefundCase_Id`);

--
-- Indexes for table `itemcondition`
--
ALTER TABLE `itemcondition`
  ADD PRIMARY KEY (`ItemCondition_Id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `token` (`token`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `reason`
--
ALTER TABLE `reason`
  ADD PRIMARY KEY (`Reason_Id`);

--
-- Indexes for table `refundcase`
--
ALTER TABLE `refundcase`
  ADD PRIMARY KEY (`RefundCase_Id`),
  ADD KEY `Seller_Id` (`Seller_Id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `warehouseitem_status_action`
--
ALTER TABLE `warehouseitem_status_action`
  ADD PRIMARY KEY (`statusaction_Id`);

--
-- Indexes for table `wish`
--
ALTER TABLE `wish`
  ADD PRIMARY KEY (`Wish_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casehistory`
--
ALTER TABLE `casehistory`
  MODIFY `casehistory_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `caseimages`
--
ALTER TABLE `caseimages`
  MODIFY `Image_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `casemessages`
--
ALTER TABLE `casemessages`
  MODIFY `CaseMessage_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `itemcondition`
--
ALTER TABLE `itemcondition`
  MODIFY `ItemCondition_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `reason`
--
ALTER TABLE `reason`
  MODIFY `Reason_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `refundcase`
--
ALTER TABLE `refundcase`
  MODIFY `RefundCase_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `warehouseitem_status_action`
--
ALTER TABLE `warehouseitem_status_action`
  MODIFY `statusaction_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `wish`
--
ALTER TABLE `wish`
  MODIFY `Wish_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
