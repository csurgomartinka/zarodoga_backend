-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 21. 12:07
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
-- Tábla szerkezet ehhez a táblához `varos`
--

CREATE TABLE `varos` (
  `id` int(11) NOT NULL,
  `vnev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `varos`
--

INSERT INTO `varos` (`id`, `vnev`) VALUES
(1, 'Kistarcsa'),
(2, 'Sukoró'),
(3, 'Ecser'),
(4, 'Budapest'),
(5, 'Nagyvárad'),
(6, 'Békéscsaba'),
(7, 'Esztergom'),
(8, 'Göd'),
(9, 'Balatonfüred'),
(10, 'Fertőd'),
(11, 'Veszprém'),
(12, 'Dabas'),
(13, 'Mórahalom'),
(14, 'Káptalantóti'),
(15, 'Kecskemét'),
(16, 'Jászapáti'),
(17, 'Fonyód'),
(18, 'Szalafő'),
(19, 'Balassagyarmat'),
(20, 'Bárdudvarnok'),
(21, 'Csanádpalota'),
(22, 'Devecser'),
(23, 'Pécs'),
(24, 'Szentendre'),
(25, 'Pannonhalma'),
(26, 'Gödöllő'),
(27, 'Szántód'),
(28, 'Tihany'),
(29, 'Eger'),
(30, 'Komárom'),
(31, 'Györköny'),
(32, 'Keszthely'),
(33, 'Hévíz'),
(34, 'Harkány'),
(35, 'Kiskunmajsa'),
(36, 'Mátészalka'),
(37, 'Százhalombatta'),
(38, 'Bátonyterenye'),
(39, 'Vecsés'),
(40, 'Fót'),
(41, 'Siófok'),
(42, 'Hatvan'),
(43, 'Gárdony'),
(44, 'Makó'),
(45, 'Debrecen'),
(47, 'Veresegyház'),
(48, 'Balatonlelle'),
(49, 'Győr'),
(50, 'Szombathely'),
(51, 'Mosonmagyaróvár'),
(52, 'Zirc'),
(53, 'Lajosmizse'),
(54, 'Ajka'),
(55, 'Kaposvár'),
(56, 'Tiszafüred'),
(57, 'Gyula'),
(58, 'Tata'),
(59, 'Csömör'),
(60, 'Tápiószőlős'),
(61, 'Nyíregyháza'),
(62, 'Tokaj'),
(63, 'Győrújbarát'),
(64, 'Miskolc'),
(65, 'Túrkeve'),
(66, 'Balatonalmádi'),
(67, 'Marcali'),
(68, 'Halászi'),
(69, 'Szeged'),
(70, 'Ráckeve'),
(71, 'Szigetszentmiklós'),
(72, 'Budaörs'),
(73, 'Gyöngyös'),
(74, 'Hajdúszoboszló'),
(75, 'Tolcsva'),
(76, 'Várpalota'),
(77, 'Ópusztaszer');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `varos`
--
ALTER TABLE `varos`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `varos`
--
ALTER TABLE `varos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
