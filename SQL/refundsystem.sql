-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Sep 2016 um 09:03
-- Server-Version: 5.7.11
-- PHP-Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `refundsystem`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `caseimages`
--

CREATE TABLE `caseimages` (
  `Image_Id` int(11) NOT NULL,
  `RefundCase_Id` int(11) NOT NULL,
  `Image_Path` text,
  `Image_Name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `caselinks`
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
-- Tabellenstruktur für Tabelle `casemessages`
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
-- Tabellenstruktur für Tabelle `itemcondition`
--

CREATE TABLE `itemcondition` (
  `ItemCondition_Id` int(11) NOT NULL,
  `ItemCondition` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `itemcondition`
--

INSERT INTO `itemcondition` (`ItemCondition_Id`, `ItemCondition`) VALUES
(1, 'condition1'),
(2, 'condition2'),
(3, 'condition3');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `log`
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
-- Tabellenstruktur für Tabelle `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `notifications`
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
-- Tabellenstruktur für Tabelle `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `permissions`
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
-- Daten für Tabelle `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Admin', 'Admin', '2016-08-17 21:29:20', '2016-08-17 21:29:20'),
(4, 'Communication', 'Communication', 'Communication', NULL, NULL),
(2, 'Seller', 'Seller', 'Seller', NULL, NULL),
(3, 'Warehouse', 'Warehouse', 'Warehouse', NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `permission_role`
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
-- Tabellenstruktur für Tabelle `reason`
--

CREATE TABLE `reason` (
  `Reason_Id` int(11) NOT NULL,
  `Reason` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reason`
--

INSERT INTO `reason` (`Reason_Id`, `Reason`) VALUES
(1, 'reason1'),
(2, 'reason2'),
(3, 'reason3');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `refundcase`
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
-- Tabellenstruktur für Tabelle `roles`
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
-- Daten für Tabelle `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Administrator', 'Admin from Warehouse', '2016-08-17 21:13:36', '2016-08-17 21:13:36'),
(2, 'Seller', 'Seller', 'Seller of the product', '2016-08-17 21:13:36', '2016-08-17 21:13:36'),
(3, 'Warehouse', 'Warehouse', 'Warehouse', NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
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
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'SuperUser', 'super@admin.com', '$2y$10$zcRVbexuU3TjOFKHWbhpY.tWubto.akIMu2NSxdWrgmCi4VmfjWWW', NULL, NULL, '2016-09-07 18:44:12');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `wish`
--

CREATE TABLE `wish` (
  `Wish_Id` int(11) NOT NULL,
  `Wish` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `wish`
--

INSERT INTO `wish` (`Wish_Id`, `Wish`) VALUES
(3, 'wish3'),
(1, 'wish1'),
(2, 'wish2'),
(4, 'wish4');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `caseimages`
--
ALTER TABLE `caseimages`
  ADD PRIMARY KEY (`Image_Id`),
  ADD KEY `RefundCase_Id` (`RefundCase_Id`);

--
-- Indizes für die Tabelle `caselinks`
--
ALTER TABLE `caselinks`
  ADD PRIMARY KEY (`RefundCase_Id`),
  ADD KEY `Seller_Id` (`Seller_Id`);

--
-- Indizes für die Tabelle `casemessages`
--
ALTER TABLE `casemessages`
  ADD PRIMARY KEY (`CaseMessage_Id`),
  ADD KEY `RefundCase_Id` (`RefundCase_Id`);

--
-- Indizes für die Tabelle `itemcondition`
--
ALTER TABLE `itemcondition`
  ADD PRIMARY KEY (`ItemCondition_Id`);

--
-- Indizes für die Tabelle `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indizes für die Tabelle `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `token` (`token`);

--
-- Indizes für die Tabelle `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indizes für die Tabelle `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indizes für die Tabelle `reason`
--
ALTER TABLE `reason`
  ADD PRIMARY KEY (`Reason_Id`);

--
-- Indizes für die Tabelle `refundcase`
--
ALTER TABLE `refundcase`
  ADD PRIMARY KEY (`RefundCase_Id`),
  ADD KEY `Seller_Id` (`Seller_Id`);

--
-- Indizes für die Tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indizes für die Tabelle `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indizes für die Tabelle `wish`
--
ALTER TABLE `wish`
  ADD PRIMARY KEY (`Wish_Id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `caseimages`
--
ALTER TABLE `caseimages`
  MODIFY `Image_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT für Tabelle `casemessages`
--
ALTER TABLE `casemessages`
  MODIFY `CaseMessage_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `itemcondition`
--
ALTER TABLE `itemcondition`
  MODIFY `ItemCondition_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `log`
--
ALTER TABLE `log`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT für Tabelle `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT für Tabelle `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `reason`
--
ALTER TABLE `reason`
  MODIFY `Reason_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `refundcase`
--
ALTER TABLE `refundcase`
  MODIFY `RefundCase_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT für Tabelle `wish`
--
ALTER TABLE `wish`
  MODIFY `Wish_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
