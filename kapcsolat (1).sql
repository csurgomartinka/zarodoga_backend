-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 12. 10:20
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
-- Tábla szerkezet ehhez a táblához `kapcsolat`
--

CREATE TABLE `kapcsolat` (
  `kapcsolat_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `uzenet` varchar(255) NOT NULL,
  `datum` date NOT NULL,
  `uzenet_elfogadva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kapcsolat`
--

INSERT INTO `kapcsolat` (`kapcsolat_id`, `nev`, `email`, `uzenet`, `datum`, `uzenet_elfogadva`) VALUES
(18, 'Deák Szabolcs', 'szabber9101@gmail.com', 'Nagyon menő weboldal! Így tovább', '2024-12-12', 1),
(20, 'Jocó', 'jocigi@gmail.com', 'Ez jobb mint a mi weblapunk grat srácok!!', '2024-12-12', 1),
(24, 'admin', 'alma@gmail.com', 'khjk', '2025-01-09', 0),
(26, 'admin', 'alma@gmail.com', 'khjkdfsdfsdfsd', '2025-01-09', 0),
(27, 'admin', 'alma@gmail.com', 'mnnm', '2025-01-09', 0),
(28, 'admin', 'alma@gmail.com', 'sadasd', '2025-01-09', 0),
(29, 'wartin', 'lakatosbotika@gmail.com', '44444444444444444444444', '2025-01-09', 0),
(31, 'Hello Bello', 'csirketanaruralegjobb@gmail.com', '<3', '2025-01-21', 0),
(34, 'Teszt', 'Teszt@gmail.com', 'Teszt', '2025-02-05', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kapcsolat`
--
ALTER TABLE `kapcsolat`
  ADD PRIMARY KEY (`kapcsolat_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kapcsolat`
--
ALTER TABLE `kapcsolat`
  MODIFY `kapcsolat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
