-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 28. 10:24
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `esemenyek`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `esemeny`
--

CREATE TABLE `esemeny` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `datum` varchar(255) NOT NULL,
  `helyszinid` int(11) NOT NULL,
  `tipusid` int(11) NOT NULL,
  `leiras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helyszin`
--

CREATE TABLE `helyszin` (
  `helyszin_id` int(11) NOT NULL,
  `helyszin_nev` varchar(255) NOT NULL,
  `varosid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tipus`
--

CREATE TABLE `tipus` (
  `tipus_id` int(11) NOT NULL,
  `tipus_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `varos`
--

CREATE TABLE `varos` (
  `id` int(11) NOT NULL,
  `vnev` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `varos`
--

INSERT INTO `varos` (`id`, `vnev`) VALUES
(1, 'Aba'),
(2, 'Abádszalók'),
(3, 'Abaújszántó'),
(4, 'Abony'),
(5, 'Ács'),
(6, 'Adony'),
(7, 'Ajak'),
(8, 'Ajka'),
(9, 'Albertirsa'),
(10, 'Alsózsolca'),
(11, 'Aszód'),
(12, 'Bábolna'),
(13, 'Bácsalmás'),
(14, 'Badacsonytomaj'),
(15, 'Baja'),
(16, 'Baktalórántháza'),
(17, 'Balassagyarmat'),
(18, 'Balatonalmádi'),
(19, 'Balatonboglár'),
(20, 'Balatonföldvár'),
(21, 'Balatonfüred'),
(22, 'Balatonfűzfő'),
(23, 'Balatonkenese'),
(24, 'Balatonlelle'),
(25, 'Balkány'),
(26, 'Balmazújváros'),
(27, 'Barcs'),
(28, 'Bátaszék'),
(29, 'Bátonyterenye'),
(30, 'Battonya'),
(31, 'Békés'),
(32, 'Békéscsaba'),
(33, 'Bélapátfalva'),
(34, 'Beled'),
(35, 'Berettyóújfalu'),
(36, 'Berhida'),
(37, 'Besenyszög'),
(38, 'Biatorbágy'),
(39, 'Bicske'),
(40, 'Biharkeresztes'),
(41, 'Bodajk'),
(42, 'Bóly'),
(43, 'Bonyhád'),
(44, 'Borsodnádasd'),
(45, 'Budakalász'),
(46, 'Budakeszi'),
(47, 'Budaörs'),
(48, 'Budapest'),
(49, 'Bük'),
(50, 'Cegléd'),
(51, 'Celldömölk'),
(52, 'Cigánd'),
(53, 'Csákvár'),
(54, 'Csanádpalota'),
(55, 'Csenger'),
(56, 'Csepreg'),
(57, 'Csongrád'),
(58, 'Csorna'),
(59, 'Csorvás'),
(60, 'Csurgó'),
(61, 'Dabas'),
(62, 'Debrecen'),
(63, 'Demecser'),
(64, 'Derecske'),
(65, 'Dévaványa'),
(66, 'Devecser'),
(67, 'Diósd'),
(68, 'Dombóvár'),
(69, 'Dombrád'),
(70, 'Dorog'),
(71, 'Dunaföldvár'),
(72, 'Dunaharaszti'),
(73, 'Dunakeszi'),
(74, 'Dunaújváros'),
(75, 'Dunavarsány'),
(76, 'Dunavecse'),
(77, 'Edelény'),
(78, 'Eger'),
(79, 'Elek'),
(80, 'Emőd'),
(81, 'Encs'),
(82, 'Enying'),
(83, 'Ercsi'),
(84, 'Érd'),
(85, 'Esztergom'),
(86, 'Fegyvernek'),
(87, 'Fehérgyarmat'),
(88, 'Felsőzsolca'),
(89, 'Fertőd'),
(90, 'Fertőszentmiklós'),
(91, 'Fonyód'),
(92, 'Fót'),
(93, 'Füzesabony'),
(94, 'Füzesgyarmat'),
(95, 'Gárdony'),
(96, 'Göd'),
(97, 'Gödöllő'),
(98, 'Gönc'),
(99, 'Gyál'),
(100, 'Gyomaendrőd'),
(101, 'Gyömrő'),
(102, 'Gyöngyös'),
(103, 'Gyöngyöspata'),
(104, 'Gyönk'),
(105, 'Győr'),
(106, 'Gyula'),
(107, 'Hajdúböszörmény'),
(108, 'Hajdúdorog'),
(109, 'Hajdúhadház'),
(110, 'Hajdúnánás'),
(111, 'Hajdúsámson'),
(112, 'Hajdúszoboszló'),
(113, 'Hajós'),
(114, 'Halásztelek'),
(115, 'Harkány'),
(116, 'Hatvan'),
(117, 'Herend'),
(118, 'Heves'),
(119, 'Hévíz'),
(120, 'Hódmezővásárhely'),
(121, 'Ibrány'),
(122, 'Igal'),
(123, 'Isaszeg'),
(124, 'Izsák'),
(125, 'Jánoshalma'),
(126, 'Jánosháza'),
(127, 'Jánossomorja'),
(128, 'Jászapáti'),
(129, 'Jászárokszállás'),
(130, 'Jászberény'),
(131, 'Jászfényszaru'),
(132, 'Jászkisér'),
(133, 'Kaba'),
(134, 'Kadarkút'),
(135, 'Kalocsa'),
(136, 'Kaposvár'),
(137, 'Kapuvár'),
(138, 'Karcag'),
(139, 'Kazincbarcika'),
(140, 'Kecel'),
(141, 'Kecskemét'),
(142, 'Kemecse'),
(143, 'Kenderes'),
(144, 'Kerekegyháza'),
(145, 'Kerepes'),
(146, 'Keszthely'),
(147, 'Kisbér'),
(148, 'Kisköre'),
(149, 'Kiskőrös'),
(150, 'Kiskunfélegyháza'),
(151, 'Kiskunhalas'),
(152, 'Kiskunmajsa'),
(153, 'Kistarcsa'),
(154, 'Kistelek'),
(155, 'Kisújszállás'),
(156, 'Kisvárda'),
(157, 'Komádi'),
(158, 'Komárom'),
(159, 'Komló'),
(160, 'Kondoros'),
(161, 'Kozármisleny'),
(162, 'Körmend'),
(163, 'Körösladány'),
(164, 'Kőszeg'),
(165, 'Kunhegyes'),
(166, 'Kunszentmárton'),
(167, 'Kunszentmiklós'),
(168, 'Lábatlan'),
(169, 'Lajosmizse'),
(170, 'Lébény'),
(171, 'Lengyeltóti'),
(172, 'Lenti'),
(173, 'Létavértes'),
(174, 'Letenye'),
(175, 'Lőrinci'),
(176, 'Maglód'),
(177, 'Mágocs'),
(178, 'Makó'),
(179, 'Mándok'),
(180, 'Marcali'),
(181, 'Máriapócs'),
(182, 'Martfű'),
(183, 'Martonvásár'),
(184, 'Mátészalka'),
(185, 'Medgyesegyháza'),
(186, 'Mélykút'),
(187, 'Mezőberény'),
(188, 'Mezőcsát'),
(189, 'Mezőhegyes'),
(190, 'Mezőkeresztes'),
(191, 'Mezőkovácsháza'),
(192, 'Mezőkövesd'),
(193, 'Mezőtúr'),
(194, 'Mindszent'),
(195, 'Miskolc'),
(196, 'Mohács'),
(197, 'Monor'),
(198, 'Mór'),
(199, 'Mórahalom'),
(200, 'Mosonmagyaróvár'),
(201, 'Nádudvar'),
(202, 'Nagyatád'),
(203, 'Nagybajom'),
(204, 'Nagyecsed'),
(205, 'Nagyhalász'),
(206, 'Nagykálló'),
(207, 'Nagykanizsa'),
(208, 'Nagykáta'),
(209, 'Nagykőrös'),
(210, 'Nagymányok'),
(211, 'Nagymaros'),
(212, 'Nyékládháza'),
(213, 'Nyergesújfalu'),
(214, 'Nyíradony'),
(215, 'Nyírbátor'),
(216, 'Nyíregyháza'),
(217, 'Nyírlugos'),
(218, 'Nyírmada'),
(219, 'Nyírtelek'),
(220, 'Ócsa'),
(221, 'Onga'),
(222, 'Orosháza'),
(223, 'Oroszlány'),
(224, 'Ózd'),
(225, 'Őrbottyán'),
(226, 'Őriszentpéter'),
(227, 'Örkény'),
(228, 'Pacsa'),
(229, 'Paks'),
(230, 'Pálháza'),
(231, 'Pannonhalma'),
(232, 'Pápa'),
(233, 'Pásztó'),
(234, 'Pécel'),
(235, 'Pécs'),
(236, 'Pécsvárad'),
(237, 'Pétervására'),
(238, 'Pilis'),
(239, 'Piliscsaba'),
(240, 'Pilisvörösvár'),
(241, 'Polgár'),
(242, 'Polgárdi'),
(243, 'Pomáz'),
(244, 'Pusztaszabolcs'),
(245, 'Putnok'),
(246, 'Püspökladány'),
(247, 'Rácalmás'),
(248, 'Ráckeve'),
(249, 'Rakamaz'),
(250, 'Rákóczifalva'),
(251, 'Répcelak'),
(252, 'Rétság'),
(253, 'Rudabánya'),
(254, 'Sajóbábony'),
(255, 'Sajószentpéter'),
(256, 'Salgótarján'),
(257, 'Sándorfalva'),
(258, 'Sárbogárd'),
(259, 'Sarkad'),
(260, 'Sárospatak'),
(261, 'Sárvár'),
(262, 'Sásd'),
(263, 'Sátoraljaújhely'),
(264, 'Sellye'),
(265, 'Siklós'),
(266, 'Simontornya'),
(267, 'Siófok'),
(268, 'Solt'),
(269, 'Soltvadkert'),
(270, 'Sopron'),
(271, 'Sülysáp'),
(272, 'Sümeg'),
(273, 'Szabadszállás'),
(274, 'Szarvas'),
(275, 'Százhalombatta'),
(276, 'Szécsény'),
(277, 'Szeged'),
(278, 'Szeghalom'),
(279, 'Székesfehérvár'),
(280, 'Szekszárd'),
(281, 'Szendrő'),
(282, 'Szentendre'),
(283, 'Szentes'),
(284, 'Szentgotthárd'),
(285, 'Szentlőrinc'),
(286, 'Szerencs'),
(287, 'Szigethalom'),
(288, 'Szigetszentmiklós'),
(289, 'Szigetvár'),
(290, 'Szikszó'),
(291, 'Szob'),
(292, 'Szolnok'),
(293, 'Szombathely'),
(294, 'Tab'),
(295, 'Tamási'),
(296, 'Tápiószele'),
(297, 'Tapolca'),
(298, 'Tát'),
(299, 'Tata'),
(300, 'Tatabánya'),
(301, 'Téglás'),
(302, 'Tét'),
(303, 'Tiszacsege'),
(304, 'Tiszaföldvár'),
(305, 'Tiszafüred'),
(306, 'Tiszakécske'),
(307, 'Tiszalök'),
(308, 'Tiszaújváros'),
(309, 'Tiszavasvári'),
(310, 'Tokaj'),
(311, 'Tolna'),
(312, 'Tompa'),
(313, 'Tótkomlós'),
(314, 'Tököl'),
(315, 'Törökbálint'),
(316, 'Törökszentmiklós'),
(317, 'Tura'),
(318, 'Túrkeve'),
(319, 'Újfehértó'),
(320, 'Újhartyán'),
(321, 'Újkígyós'),
(322, 'Újszász'),
(323, 'Üllő'),
(324, 'Vác'),
(325, 'Vaja'),
(326, 'Vámospércs'),
(327, 'Várpalota'),
(328, 'Vásárosnamény'),
(329, 'Vasvár'),
(330, 'Vecsés'),
(331, 'Velence'),
(332, 'Vép'),
(333, 'Veresegyház'),
(334, 'Verpelét'),
(335, 'Veszprém'),
(336, 'Vésztő'),
(337, 'Villány'),
(338, 'Visegrád'),
(339, 'Záhony'),
(340, 'Zalaegerszeg'),
(341, 'Zalakaros'),
(342, 'Zalalövő'),
(343, 'Zalaszentgrót'),
(344, 'Zamárdi');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `esemeny`
--
ALTER TABLE `esemeny`
  ADD PRIMARY KEY (`id`),
  ADD KEY `helyszin` (`helyszinid`),
  ADD KEY `tipusid` (`tipusid`);

--
-- A tábla indexei `helyszin`
--
ALTER TABLE `helyszin`
  ADD PRIMARY KEY (`helyszin_id`),
  ADD KEY `varosid` (`varosid`);

--
-- A tábla indexei `tipus`
--
ALTER TABLE `tipus`
  ADD PRIMARY KEY (`tipus_id`),
  ADD KEY `tipus_nev` (`tipus_nev`);

--
-- A tábla indexei `varos`
--
ALTER TABLE `varos`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `esemeny`
--
ALTER TABLE `esemeny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `helyszin`
--
ALTER TABLE `helyszin`
  MODIFY `helyszin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tipus`
--
ALTER TABLE `tipus`
  MODIFY `tipus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `varos`
--
ALTER TABLE `varos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=348;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `esemeny`
--
ALTER TABLE `esemeny`
  ADD CONSTRAINT `esemeny_ibfk_1` FOREIGN KEY (`helyszinid`) REFERENCES `varos` (`id`);

--
-- Megkötések a táblához `helyszin`
--
ALTER TABLE `helyszin`
  ADD CONSTRAINT `helyszin_ibfk_1` FOREIGN KEY (`varosid`) REFERENCES `varos` (`id`);

--
-- Megkötések a táblához `tipus`
--
ALTER TABLE `tipus`
  ADD CONSTRAINT `tipus_ibfk_1` FOREIGN KEY (`tipus_id`) REFERENCES `esemeny` (`tipusid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
