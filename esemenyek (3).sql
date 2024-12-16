-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 16. 09:07
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
  `varosid` int(11) NOT NULL,
  `tipusid` int(11) NOT NULL,
  `leiras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `esemeny`
--

INSERT INTO `esemeny` (`id`, `nev`, `datum`, `varosid`, `tipusid`, `leiras`) VALUES
(718, 'Gyulai Mézfesztivál 2024', '2024. december 14. (szombat) - 2024. december 15. (vasárnap) ', 1, 1, '15. Gyulai Mézfesztivál 2024. december 14-15-én. Ezen a hétvégén minden az édes finomságról és a méhészetről szól. A látogatók megismerkedhetnek a méhészettel és a mézkészítéssel is, melyről sok hasznos és érdekes információt tudhatnak meg a szakmai napon'),
(719, 'Gyulai fesztiválok 2024 / 2025', '2024. december 14. (szombat) - 2024. december 15. (vasárnap) ', 1, 1, 'Gyula az év folyamán több alkalommal is különböző fesztiválokkal várja a városlakókat és a városba érkező turistákat. A Gyulai vár, a várfürdő, a pálinka és a kolbász hazája számos kulturális, zenés és gasztro rendezvénnyel, múzeumokkal, koncertekkel, szí'),
(720, 'Barokk Fesztivál Érd 2024', '2024. december 13. (péntek) ', 2, 1, '2024 őszén Barokk zenei fesztivállal várja Érden a klasszikus zene iránt érdeklődőket. Októbertől decemberig az Érdi Kamarazenekar előadásában három lenyűgöző hangversennyel, és szakértők tolmácsolásában három izgalmas, a barokk kor hangszereiről szóló el'),
(721, 'Cziffra György Fesztivál 2024 / 2025', '2024. december 14. (szombat) ', 2, 1, 'A Cziffra György Fesztivál 2024 / 2025-ben is változatos programokkal várja az érdeklődőket. Tizedik alkalommal rendezik meg a Cziffra György Fesztivált Budapest több helyszínén. A Balázs János Kossuth-díjas zongoraművész által alapított hiánypótló rendez'),
(722, 'Hungarikum fesztiválok 2024 / 2025', '2024. december 14. (szombat) - 2024. december 15. (vasárnap) ', 2, 1, 'A `hungarikum` a magyarság csúcsteljesítményét jelölő gyűjtőfogalom, amely olyan, kiemelésre méltó értéket jelez, amely a magyarságra jellemző különlegesség és minőség. A  hungarikummá nyilvánítást  bárki kezdeményezheti. Hungarikumnak minősített  fesztiv'),
(723, 'Winterfest Budapest 2024', '2024. december 20. (péntek) - 2024. december 21. (szombat) ', 3, 1, '2024. december 20-21-én érkezik a Budapest Park első téli fesztiválja a Winterfest. Két napon át nyolc produkciót láthatnak, akik ellátogatnak az MVM Dome-ba. A koncerteket afterparty követi, de egyéb meglepetésekkel, pop-up aktivitásokkal és a Parkban me'),
(724, 'Fehérvári Futballfesztivál 2024. Székesfehérvár. Mindigvár Nonstop Ünnepi Fehérvári Futballfesztivál', '2024. december 27. (péntek) - 2024. december 30. (hétfő) ', 4, 1, '24. MINDIGVÁR NONSTOP Ünnepi Fehérvári Futballfesztivál nemzetközi kispályás labdarúgó kupa 2024. december 27-30. között. A Futball Fesztivál célja a labdarúgás, az egészséges életmód, a közösségi élmény, a Fehérvár FC és Székesfehérvár népszerűsítése a a'),
(725, 'Pécsi Sváb Fesztivál 2024', '2024. december 28. (szombat) ', 5, 1, '3. Pécsi Sváb Fesztivál az Expo Centerben 2024. december 28-án.'),
(726, 'Hanukafeszt 2024', '2024. december 28. (szombat) - 2024. december 29. (vasárnap) ', 3, 1, 'Hanukafeszt 2024. Ünnepeljünk együtt, gyújtsuk meg a hanukai gyertyákat, melegedjünk a jóság, tisztaság és remény lángjainál közösen! A nyolc napos Hanuka a zsidóknak a szíriai görög hódítók felett i. e. 165-ben aratott győzelmére, a jeruzsálemi szentély '),
(727, 'Made in Pécs Fesztivál 2025', '2025. január 4. (szombat) ', 5, 1, '2025. január 4-én Pécs tizedszer is a húrokba csap!  Velünk tartotok? Részletek hamarosan...'),
(728, 'Palacsintafesztivál 2024 Balatonalmádi. Palacsinta, Kolbász és Mikulásfesztivál Almádiban', '2024. december 6. (péntek) - 2024. december 12. (csütörtök) ', 6, 1, 'Várunk mindenkit szeretettel a Balaton legszebb karácsonyi vásárába, ahol Palacsinta, Kolbász és Mikulásfesztivál várja a látogatókat 2024. december 6 és 12 között. Hatalmas jégpálya is üzemel, ami a vásár alatt nyitva tart. A belépés ingyenes és kutyabar'),
(729, 'Advent Balatonlelle 2024 / 2025', '2024.11.30. (szombat) - 2025.01.31. (péntek) ', 7, 1, 'Jégfesztivál Balatonlellén  2024. november 30 és 2025. január 31. között. A  fesztivál helyszíne a Balatonlellei Napfény strand területén, valamint a vele határos Rózsapark területén kialakított rendezvényhelyszínen lesz. Jégpálya, fűtött sátor is helyet '),
(730, 'Magyar Filmszemle 2025', '2025. február 3. (hétfő) - 2025. február 9. (vasárnap) ', 3, 1, '2025. február 3-9. között a budapesti Corvin Mozi lesz a színhelye a megújuló 44. Magyar Filmszemlének, ahol 13 év szünet után találkozhatunk.'),
(731, 'Országos Táncművészeti Fesztivál 2025', '2025.02.08. (szombat) - 2025.05.17. (szombat) ', 3, 1, 'XXXIV. Országos Táncművészeti Fesztivál rendezvénysorozat 2025. évi eseményei.'),
(732, 'OFF-Biennále 2025 Budapest', '2025.05.01. (csütörtök) - 2025.06.15. (vasárnap) ', 3, 1, '2025-ben lesz az OFF-Biennále ötödik kiadása! Nagy örömmel jelentjük be, hogy 2025. május 1. és június 15. között újra megrendezzük az OFF-Biennálét! Az ötödik kiadás egyben az OFF tizedik születésnapjának ünnepe is lesz: épp egy évtizede, 2015 tavaszán i'),
(733, 'Magyar Vár Tábor és Népművészeti Fesztivál 2025 Pomáz', '2025. július 7. (hétfő) - 2025. július 13. (vasárnap) ', 8, 1, 'Jövőre újra Magyar Vár Tábor és Népművészeti Fesztivál 2025. július 7 és 23. között Pomázon! Tánccsoportok jelentkezését már most fogadjuk!'),
(734, 'Cziffra György Fesztivál 2024 / 2025', '2024. december 14. (szombat) ', 8, 1, 'A Cziffra György Fesztivál 2024 / 2025-ben is változatos programokkal várja az érdeklődőket. Tizedik alkalommal rendezik meg a Cziffra György Fesztivált Budapest több helyszínén. A Balázs János Kossuth-díjas zongoraművész által alapított hiánypótló rendez'),
(735, 'Hanukafeszt 2024', '2024. december 28. (szombat) - 2024. december 29. (vasárnap) ', 3, 1, 'Hanukafeszt 2024. Ünnepeljünk együtt, gyújtsuk meg a hanukai gyertyákat, melegedjünk a jóság, tisztaság és remény lángjainál közösen! A nyolc napos Hanuka a zsidóknak a szíriai görög hódítók felett i. e. 165-ben aratott győzelmére, a jeruzsálemi szentély '),
(736, 'Régizene Fesztivál 2025. Online jegyvásárlás', '2025. február 21. (péntek) ', 3, 1, 'Világhírű szólisták és a legismertebb együttesek szerepelnek a Régizene Fesztiválon. Online jegyvásárlás.'),
(737, 'Bartók Tavasz 2025. Nemzetközi Művészeti Hetek', '2025. április 4. (péntek) - 2025. április 13. (vasárnap) ', 3, 1, 'A Bartók Tavasz Nemzetközi Művészeti Hetek 2025. Április 4. és 13. között ismét kihagyhatatlan programokkal várja a nézőket Budapest-szerte a Bartók Tavasz: közös koncertet ad Diana Damrau és Jonas Kaufmann, miközben Kelemen Barnabás a Münchner Philharmon'),
(738, 'Budapest Ritmo Fesztivál 2025', '2025. április 10. (csütörtök) - 2025. április 12. (szombat) ', 3, 1, 'Utazás a világ körül a 10. Budapest Ritmóval! A Budapest Ritmo, Közép-Európa egyik legjelentősebb világzenei fesztiválja.  A korábbi fesztiválokon 66 országot jártunk be 168 zenekarral. Sivatagi rock, afro-francia chansonok vagy éppen ciprusi pszichedélia'),
(739, 'Jazztavasz 2025. Online jegyvásárlás', '2025. május 9. (péntek) - 2025. május 11. (vasárnap) ', 3, 1, 'A Jazztavasz zenei fesztivál a Művészetek Palotájában 2025-ben. Online jegyvásárlás!'),
(740, 'Budapesti Wagner Napok 2025. Online jegyvásárlás', '2025. június 6. (péntek) ', 3, 1, 'Méltán népszerű Budapesti Wagner-napok a Müpában 2025-ben. Online jegyvásárlás. A mára kultikussá vált eseménysorozat évről évre Budapestre csábítja a Wagner-rajongókat a világ minden tájáról.'),
(741, 'Óperencián túl - Mese Zene Fesztivál 2025 Budapest. Kulturális és szórakoztató fesztivál gyerekeknek', '2025. június 7. (szombat) ', 3, 1, 'Mese zene fesztivál 2025. Online jegyvásárlás! Érkezik Magyarország első kulturális és szórakoztató gyerekfesztiválja Feke Pál rendezésében. Ajándékozzon élményt idén karácsonykor az egész családnak!'),
(742, 'VeszprémFest 2025 Veszprém', '2025. július 8. (kedd) - 2025. július 12. (szombat) ', 9, 1, '5 nap, 5 világsztár - VeszprémFest 2025. július 8–12. A VeszprémFest egy immár 15 éves múltra visszatekintő kulturális nagyrendezvény, amely igazi értéket teremt helyi és országos viszonylatban is az igényes zene- és művészetkedvelők örömére.'),
(743, 'Egri Advent 2024. Ünnepi programok, események, rendezvények', '2024.11.29. (péntek) - 2024.12.24. (kedd) ', 10, 2, 'Magyarország egyik legszebb és legvarázslatosabb karácsonyi vásárát 2024. november 29. és december 24. között rendezik meg Egerben. A történelmi belváros meghittsége és a fényárban úszó Dobó tér, háttérben a csodálatos Egri várral, évről-évre sokakat leny'),
(744, 'Karácsonyi vásár Eger 2024', '2024.11.29. (péntek) - 2024.12.24. (kedd) ', 10, 2, 'Magyarország egyik legszebb és legvarázslatosabb karácsonyi vásárát 2024. november 29. és december 24. között rendezik meg Egerben. Váljon Eger a Te igazi történeteddé, zárd szívedbe az élményt! Eger Advent - több, mint egy ünnep! Töltődj fel, Budapesttől'),
(745, 'Nagy Budapesti Kultúrzsibi 2024. Gozsdu Weekend Market', '2024. december 13. (péntek) - 2024. december 16. (hétfő) ', 3, 2, 'Nagy Budapesti Kultúrzsibi 2024. Gozsdu Weekend Market - Kézműves, design, art, vintage, ékszer- és dísztárgyvásár a Gozsdu Udvarban! A Gozsdu Weekend Market egy streetmarket (utcai vásár) amely fergeteges piaci hangulattal, változatos portékákkal,antik é'),
(746, 'Kézműves kirakodóvásár Halászi 2024. Adventi Kézműves és kirakodóvásár', '2024. december 14. (szombat) ', 11, 2, 'Gyere és fedezd fel a helyi kézművesek egyedi alkotásait Halásziban! Várunk benneteket, a kézműves és kirakodóvásárba 2024. december 14-én Szombaton a Regia étterem kertjébe! Idei utolsó vásár lesz Halászin, mindenképpen látogassatok el hozzánk! Kisvonat,'),
(747, 'Mórahalom Országos Kirakodó és Állatvásár 2024', '2024. december 15. (vasárnap) ', 12, 2, 'Országos Kirakodó és Állatvásár Mórahalmon! 2024-ben is minden hónap 3. vasárnapja a vásárról szól Mórahalmon, ahol árusok és eladók sokasága érkezik a mórahalmi vásártérre. Színes áruválasztékkal, igazi vásári forgataggal várják a látogatókat,a piacon ru'),
(748, 'TerraPlaza 2024 Budapest. Nemzetközi egzotikus állat kiállítás, vásár és szakmai nap', '2024. december 15. (vasárnap) ', 3, 2, 'TerraPlaza 2024, Budapest - Egzotikus állat kiállítás és vásár, mely nem csak Közép-Európa egyik legnagyobb terrarisztikai és akvarisztikai rendezvénye, hanem közönségtalálkozó és egy életforma is egyben. Száz válogatott nemzetközi kiállító és több ezer l'),
(749, 'Debreceni Régiségvásár 2024. Idén 25 éve rendezik meg Debrecenben a méltán népszerű régiségvásárt!', '2024. december 15. (vasárnap) ', 13, 2, 'Idén 25 éves a Debreceni Régiségvásár! Márciustól minden hónap második és negyedik vasárnapján, reggel 7-től a Nagyerdei Stadionnál, a  régiségek, műtárgyak körébe tartozó tárgyak, eszközök, pénzérmék, medálok, fegyverek, bútorok mellett antikváriusok is '),
(750, 'Buffalo Market Kézműves Régiségvásár és Zsibvásár 2024 Szerencs', '2024. december 14. (szombat) ', 14, 2, 'Hagyományteremtő vásárok és gourmet ízek, Szerencsen! 2024 márciusától, minden hónap 3. szombatján, Buffalo Market kézműves-, régiségvásár és zsibvásár Szerencsen, a Buffalo Bill western étterem melletti piactéren. A vásár 8.00-tól 14.00-ig látogatható, a'),
(751, 'Pólus Karácsony 2024 Budapest. Varázslatos hely mesebeli dekorációkkal és változatos programokkal', '2024. december 6. (péntek) - 2024. december 22. (vasárnap) ', 3, 2, 'Hangolódjunk az ünnepre: karácsonyi csodaország vár ránk a Pólusban! Látványos, varázslatos dekorációk, óriáscukorkák, mesebeli diótörő-figurák gondoskodnak arról, hogy ez a csodaország egy olyan lenyűgöző hely legyen, amely felejthetetlen élményt nyújt a'),
(752, 'Liliomkert termelői piac Káptalantóti 2024', '2024. december 15. (vasárnap) ', 15, 2, 'A Káli-medence szívében fellelhető termelői piacot Harmathy Ildikó biológus-mérnök álmodta meg és hozta létre. Jól teszi, aki a vasárnaponkénti káptalantóti piacra üres hassal érkezik, mert képtelenség megállni, hogy a helyi termelők asztalkái közt járva '),
(753, 'Palacsintafesztivál 2024 Balatonalmádi. Palacsinta, Kolbász és Mikulásfesztivál Almádiban', '2024. december 6. (péntek) - 2024. december 12. (csütörtök) ', 6, 2, 'Várunk mindenkit szeretettel a Balaton legszebb karácsonyi vásárába, ahol Palacsinta, Kolbász és Mikulásfesztivál várja a látogatókat 2024. december 6 és 12 között. Hatalmas jégpálya is üzemel, ami a vásár alatt nyitva tart. A belépés ingyenes és kutyabar'),
(754, 'Advent Hatvan 2024. Ünnepi programok, események, rendezvények', '2024.11.30. (szombat) - 2024.12.22. (vasárnap) ', 16, 2, 'Ünnepi programok Hatvanban. 2024. november 30-án Hatvanban is kezdetét veszi az adventi időszak, városunk ünnepi díszbe öltözik.'),
(755, 'Nemesvámosi Vásár 2024. Adventi vásár', '2024.11.29. (péntek) - 2024.12.22. (vasárnap) ', 17, 2, 'Az idei évben Nemesvámos egy nagyszabású Adventi Vásárt szervez 2024. november 19 és december 22. között, amelyen az ünnepi ráhangolódás és a közösségek összefogása lesz a központban.'),
(756, 'Karácsonyi vásár Miskolc 2024. Adventi varázslat a Szent István téren', '2024.11.29. (péntek) - 2024.12.23. (hétfő) ', 18, 2, 'Karácsonyi Vásár Miskolc belvárosában, a Szent István téren 2024. november 29 - december 23. között.  Ünnepi hangulat, gyertyagyújtás, kézműves foglalkozások, gyermekeknek szóló programok, szabadtéri koncertek és sok finomság várja az érdeklődőket.'),
(757, 'Advent Makó 2024. Makói Adventi Vásár', '2024.11.30. (szombat) - 2024.12.22. (vasárnap) ', 19, 2, 'Makó Városa 2024. november 30 és december 22. között színesebbnél színesebb programokkal kedveskedik az adventi hétvégéken. Az elsőtől az utolsóig kulturális és szórakoztató programok lepik el a Makovecz teret, ezek után pedig a környéken sétálva az ünnep'),
(758, 'Adventi Kézműves Vásár 2024 Békéscsaba', '2024.11.30. (szombat) - 2024.12.24. (kedd) ', 20, 2, 'Idén új attrakció, kézműves karácsonyi vásár is lesz a csabai piacon, kézműves portékákat kínálnak majd a csabai piac karácsonyi vásárán. Aki idén karácsonyi hangulatra, programkavalkádra vágyik, az a Szent István térre menjen, aki pedig egyedi ajándékoka'),
(759, 'Advent Csabrendek 2024', '2024. december 1. (vasárnap) - 2024. december 24. (kedd) ', 21, 2, 'Adventi programok Csabrendeken.'),
(760, 'Advent Dunavecse 2024', '2024. december 1. (vasárnap) - 2024. december 24. (kedd) ', 22, 2, 'Adventi programok Dunavecsén.'),
(761, 'Advent Bátonyterenye 2024', '2024. december 4. (szerda) - 2024. december 24. (kedd) ', 23, 2, 'Adventi programok Bátonyterenyén. Készülődjünk az ünnepekre közösen!'),
(762, 'Siófoki adventi programok 2024. Téli Varázs Siófokon', '2024.11.30. (szombat) - 2024.12.24. (kedd) ', 24, 3, 'Adventi programkavalkád  Siófok városában, hisz Siófok télen is varázslatos! Az idei évben is egy mesebeli Adventi időszakkal vár Siófok! Siófok és a Balaton téli varázsa idén is mindenkinek jár! Siófok idén decemberben is mindenki lelkét az ünnepekre han'),
(763, 'Gárdonyi Levendula workshop programok 2024. Alkossunk együtt adventi - karácsonyi ünnepi hangulatban', '2024. december 14. (szombat) ', 25, 3, 'Csatlakozz hozzánk különleges, kreatív workshop sorozatunkra! Minden, amit a workshopon használunk, természetes és környezetbarát alapanyagokkal és kellemes levendulaillatú környezetben. Neked semmit sem kell magaddal hoznod – minden alapanyagot és eszköz'),
(764, '2024. december 24. Budapest, karácsonyi hajós program Szenteste ínyencségekkel és élőzenével', '2024. december 24. (kedd)  19:00', 3, 3, 'Ha szeretné egy különleges, és meghitt karácsonyi hangulatban tölteni a téli ünnepeket akkor a karácsonyi varázzsal átitatott Gróf Széchenyi hajón a helye. Töltsük együtt ezt a meghitt és békés adventi időszakot!'),
(765, 'Karácsonyi program Budapesten, karácsonyi vacsora sétahajózással és élőzenével', '2024. december 24. (kedd)  19:00', 3, 3, 'Ha szeretné egy különleges, és meghitt karácsonyi hangulatban tölteni a téli ünnepeket akkor a karácsonyi varázzsal átitatott Gróf Széchenyi hajón a helye. Töltsük együtt ezt a meghitt és békés adventi időszakot!'),
(766, 'Karácsonyi program Budapesten, ünnepi sétahajózás gyertyafényes vacsorával és élőzenével', '2024. december 24. (kedd)  19:00', 3, 3, 'Ünnepi hangulatú hajókázással várjuk vendégeinket karácsonykor, 19:00 órától. A különleges karácsonyi hajós programot azon vendégeknek hoztuk létre, akik szeretnének meghitt karácsonyi hangulatban ünnepelni a Dunán. Vendégeink megcsodálhatják a fényben ús'),
(767, 'Nagytemplomi Adventi Koncertek Debrecen 2024', '2024. december 16. (hétfő) ', 13, 3, '2024. évi Nagytemplomi Adventi Koncertek Debrecenben. Ebben az évben négy koncert kerül megrendezésre. Híres és méltán népszerű művészek lépnek fel a remek akusztikájú Debreceni Református Nagytemplomban. Koncertet ad Soltész Rezső, Szekeres Tamás az Omeg'),
(768, 'Zenekarácsony Békéscsaba 2024. Ünnepi szuperkoncertek sztárokkal kicsiknek és nagyoknak', '2024. december 26. (csütörtök) ', 20, 3, 'Zenekarácsony, ünnepi koncertek Békéscsabán, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit a'),
(769, 'Zenekarácsony Debrecen 2024. Karácsonyi sztárözön, ünnepi szuperkoncertek kicsiknek és nagyoknak', '2024. december 26. (csütörtök) ', 13, 3, 'Zenekarácsony, ünnepi koncertek Debrecenben, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit a'),
(770, 'Zenekarácsony Szeged 2024. Ünnepi szuperkoncertek kicsiknek és nagyoknak karácsonyi hangulatban', '2024. december 26. (csütörtök) ', 26, 3, 'Zenekarácsony, ünnepi koncertek Szegeden, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit a hé'),
(771, 'Zenekarácsony Szombathely 2024. Ünnepi koncertek sztárokkal kicsiknek és nagyoknak', '2024. december 26. (csütörtök) ', 27, 3, 'Zenekarácsony, ünnepi koncertek Szombathelyen, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit'),
(772, 'Szilveszter Egerben 2024. Programok, események, rendezvények', '2024. december 31. (kedd) ', 10, 3, 'Töltse a szilvesztert Egerben! Programajánló.'),
(773, 'Adventi hétvégék Dobogókőn, wellnesszel és ünnepi programokkal a Cardoner Hotelben', '2024. december 13. (péntek) - 2024. december 15. (vasárnap) ', 28, 3, 'A karácsonyi hangolódás egy várakozásteli időszak, melyet az adventi hétvégék tesznek varázslatossá. Dobogókőn megpihenhetsz, kizárva a külvilágot, és megtervezheted, hogyan szeretnéd ünnepelni a karácsonyt. Töltődj fel a természettel, az illatokkal és pi'),
(774, 'Szilveszter Dobogókőn gálavacsorával és wellnesszel a Cardoner Hotelben', '2024.12.29. (vasárnap) - 2025.01.01. (szerda) ', 28, 3, 'Élményekkel teli szilveszter a Cardoner Hotelben! Köszöntsük együtt a 2025-es esztendőt a csodálatos Dobogókőn, ahol élményprogramokkal és élőzenével, gálavacsorával, korlátlan italcsomaggal és egész estés szórakozással várjuk vendégeinket! A gálavacsora '),
(775, 'Mikulás rendelés 2024. Házhoz jön a Mikulás, és valóra váltja a gyermekek álmát', '2024. december 1. (vasárnap) - 2024. december 23. (hétfő) ', 3, 3, 'A Mikulás eljön, ha hívják! Mikulás szolgáltatásunk 2024. december 23-ig elérhető Budapesten és vonzáskörzetében. A családoknál és a cégeknél, valóra váltjuk a mesét, de az üzletekben is vevő csalogató lehet a megrendelt Mikulás.'),
(776, 'Luxus karácsony Siófokon, ünnepi finomságokkal a Reed Luxury Hotelben', '2024. december 24. (kedd) - 2024. december 26. (csütörtök) ', 24, 3, 'Luxus karácsony megannyi gasztro élménnyel különleges környezeteben a siófoki Reed Hotelben. Karácsonykor nálunk megtalálja az igazi ünnepi békét és kényelmet, ahol minden részlet a tökéletességre törekszik. Hagyja magát elvarázsolni nálunk, és fedezze fe'),
(777, 'Két ünnep közötti pihenés Siófokon, gasztro és wellness élményekkel a Reed Luxury Hotelben', '2024. december 27. (péntek) - 2024. december 30. (hétfő) ', 24, 3, 'Két ünnep közötti luxus pihenés Siófokon, a nyugalom szigetén, a Reed Luxury Hotelben. Ebben az egyedülálló időszakban, kissé megpihenve az ünnepek között szállodánk varázslatos díszekkel és meleg hangulattal várja Önöket, miközben egyedi szolgáltatásaink'),
(778, 'Fénykomp Szántód 2024 / 2025. Adventi, karácsonyi és újévi balatoni kompjárat Tihanyba', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 29, 3, 'Különleges élmény a téli Balaton vizén! A BAHART télen is különleges élménnyel várja utasait a révben: az ünnepi fényekbe öltöztetett Széchényi komp 2024 december 6-tól a megadott időben minden nap közlekedik Szántódrév és Tihanyrév között egészen 2025. j'),
(779, 'Fénykomp Tihany 2024 / 2025. Adventi, karácsonyi és újévi balatoni kompjárat Szántódra', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 30, 3, 'Különleges élmény a téli Balaton vizén! A BAHART télen is különleges élménnyel várja utasait a révben: az ünnepi fényekbe öltöztetett Széchényi komp 2024 december 6-tól a megadott időben minden nap közlekedik Tihanyrév és Szántódrév között egészen 2025. j'),
(780, 'Karácsonyi vásár 2024 Budapest. Minden ajándék egy helyen, a World Mall bevásárlóközpontban!', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 3, 'Az advent időszakában is várja a látogatókat a World Mall, ahova már megérkezett a karácsonyi varázslat – és biztos, hogy nem lesz hiány sem ajándékból, sem dekorációból! Ha elkerülnéd a bevásárlási hajszát és inkább kényelmesen, egy csésze forró csokolád'),
(781, 'Karácsony előtti wellness pihenés kedvezményes áron a Tisza Balneum Hotelben', '2024. december 1. (vasárnap) - 2024. december 20. (péntek) ', 31, 3, 'Pihenjen rá a karácsonyi pörgésre a tiszafüredi Balneum Hotelben. Svédasztalos félpanziós ellátással, korlátlan wellness használattal, masszázs- és wellness kezelésekkel, szaunarituálékkal várjuk vendégeinket.'),
(782, 'Diótörő balett 2024 / 2025. Online jegyvásárlás', '2024. december 10. (kedd) - 2024. december 11. (szerda) ', 31, 3, 'Diótörő balett előadások, vetítések több helyszínen 2024 / 2025-ben. Online jegyvásárlás!'),
(783, 'Karácsonyi koncertek 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 31, 3, 'Különleges ünnepi koncertek, és hangversenyek várják az érdeklődőket karácsonykor 2024-ben. Online jegyvásárlás. Zenés programok minden műfajban az adventi és a karácsonyi időszakban, családi és gyermekprogramokkal, több helyszínen.'),
(784, 'Budafoki Advent 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Adventi programajánló 2024. Programok a Budafok-Tétényi Klauzál Gábor Művelődési Központban az adventi időszakban.'),
(785, 'Jegyek Karácsonyra 2024. Karácsonyi programok és online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Jegyek programokra, koncertekre a karácsonyi időszakban 2024-ben. Adventkor és a karácsonyt megelőző hetekben is számos ünnepi rendezvény, előadás, színház, családi és gyermekprogram várja a közönséget. Hazai együttesek, zenekarok és előadóművészek az ünn'),
(786, 'Karácsonyi cirkusz 2024 / 2025. Karácsonyi CsodaShow előadások, online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Karácsonyi cirkuszi előadások 2024 / 2025.  Online jegyvásárlás. Karácsonyi CsodaShow-Magic around Christmas műsor a Fővárosi Nagycirkuszban.'),
(787, 'Karácsonyi gyerekprogramok 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Karácsonyi gyerekprogramok több helyszínen 2024-ben. Online jegyvásáslás! Karácsonyi témájú előadások, programok a kisebb korosztálynak. Játékos foglalkozások, gyermek előadások, bábjátékok, szórakoztató műsorok, színház, gyerekkoncertek, zenés programok '),
(788, 'Karácsonyi programok 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Ünnepi koncertek, családi és gyermekprogramok 2024. Karácsonykor több színes program közül válogathat az érdeklődő. A karácsonyi időszakban több rendszeresen megrendezésre kerülő program színesíti a kínálatot. Vallási és világi rendezvények segítenek megt'),
(789, 'Klebelsberg Kultúrkúria advent 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Klebelsberg Kultúrkúria adventi programok 2024-ben. Online jegyvásárlás! Programok, rendezvények az adventi időszakban.'),
(790, 'Zeneakadémia adventi koncert 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Adventi koncertek a Zeneakadémián 2024-ben. Online jegyvásárlás!'),
(791, 'Adventi koncertek 2024. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 3, 'Adventi koncertek eseménynaptára online jegyvásárlási lehetőséggel 2024-ben. A várakozás időszakában, a karácsonyi rohanás közepette jól esik megpihenni. Erre adhat lehetőséget egy koncert, ahol megfeledkezhetünk a készülődéssel kapcsolatos problémákról. '),
(792, 'Budapesti esti hajózás élőzenével, vacsorával 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, '2 órás hajókázásunk egy köszöntő itallal kezdődik, melyet légkondicionált hajóinkon szolgálunk fel Önnek. A hajón a zenét a Kodály Zoltán díjas Hungária Zenekarból 3 zenész szolgáltatja.'),
(793, 'Éjszakai hajós városnézés Budapesten - JEGYVÁSÁRLÁS', '2024. december 24. (kedd)  22:00', 3, 4, 'Éjszakai hajós városnézés Budapesten májustól október végéig minden pénteken és szombaton 22:00 órától, májustól szeptember végéig csütörtök este is.'),
(794, 'Budapesti éjszakai program, hajókirándulás élőzenével, vacsorával 22:00 órakor', '2024. december 24. (kedd)  22:00', 3, 4, 'Egyedi romantikus és felejthetetlen élményt kínálunk Önnek Budapesten! Éjszakai panoráma hajókirándulást vacsorával vagy vacsora nélkül, miközben megcsodálhatja a kulturális világörökségnek nyilvánított budapesti panorámát. A este 10 órakor induló látvány'),
(795, 'Siófoki adventi programok 2024. Téli Varázs Siófokon', '2024.11.30. (szombat) - 2024.12.24. (kedd) ', 24, 4, 'Adventi programkavalkád  Siófok városában, hisz Siófok télen is varázslatos! Az idei évben is egy mesebeli Adventi időszakkal vár Siófok! Siófok és a Balaton téli varázsa idén is mindenkinek jár! Siófok idén decemberben is mindenki lelkét az ünnepekre han'),
(796, 'Kecskeméti programok 2024 / 2025. Fesztiválok, rendezvények, események, jeles napok, ünnepek', '2024.11.29. (péntek) - 2024.12.13. (péntek) ', 32, 4, 'Kecskemét 2024. évi programajánló naptára. Fesztiválok, kiállítások, művészeti és kulturális események, gasztronómiai programok, vásárok, konferenciák, vendégváró események egész évben a hírös városban minden korosztálynak. Színes programkínálattal, szính'),
(797, 'Keszthelyi programok 2024 / 2025. Fesztiválok, események, rendezvények, jeles napok, ünnepek', '2024. december 9. (hétfő) - 2024. december 13. (péntek) ', 33, 4, 'Keszthelyi programajánló érdekes és értékes programokkal. Színes a kulturális programkínálat egész évben. A Festetics-kastély, a történelmi belváros, szervezett városi séták, fesztiválok, kiállítások, koncertek, színházi előadások, filmvetítések, múzeumi '),
(798, 'Siófoki programok 2024 / 2025. Fesztiválok, események, rendezvények', '2024.11.30. (szombat) - 2024.12.31. (kedd) ', 24, 4, 'Városnapi forgatag, adventi programkavalkád, panorámás jégpálya és hófánkpálya, óriáskerék - Siófok télen is varázslatos! A  Balaton fővárosában töltött téli pihenés garantáltan élményekkel és varázslatos pillanatokkal teli lesz 2024-ben is. Legyen szó kö'),
(799, 'Balatonfüredi eseménynaptár 2024 / 2025. Programok, rendezvények, fesztiválok', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 34, 4, 'Balatonfüredi 2024. évi programajánló. Balatonfüred egész évben változatos programokkal fogadja az ide érkezőket. A népszerű kisváros a Balaton északi partján rendkívül gazdag kulturális, bor-és gasztronómiai fesztiválokban, látnivalókban, Balatonfüred a '),
(800, 'Zalakarosi programok 2024 / 2025. Események, rendezvények, fesztiválok', '2024. december 14. (szombat) - 2024. december 15. (vasárnap) ', 35, 4, 'Zalakarosi programajánló érdekes és értékes programokkal. A fürdővárosban színes a kulturális, a gasztronómiai- és a fürdőprogram kínálat egész évben. Kiállítások, koncertek, színházi előadások, filmvetítések, fesztiválok, gyógy- és élményfürdő, sportesem'),
(801, 'Koktélhajó Budapesten 19:00 órától, városnézés koktélokkal a Dunán  -JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'Gyönyörködjön Budapest nevezetességeiben, miközben egy pohár hideg koktélt szürcsölget hangulatos városnéző hajónk nyitott erkélyén! Hajónkon zárt, belső fedélzet is található, ahol panoráma ablakok mögül szemlélheti a várost. A program 2 alkoholtartalmú,'),
(802, 'Budapest esti hajó, városnézés a Dunán élőzenével 19:00 órától - jEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'A hajó a város 6 legfőbb hídja alatt halad át, miközben a nap lassan lenyugszik a budai hegyek mögött átfestve Budapest látványosságait. Gyönyörködj a Parlament, a Budai vár, a Nemzeti Színház, a Művészetek Palotája és a város sok más lélegzetelállító épü'),
(803, 'Budapesti városnézés hajóval minden nap 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'Városnéző hajóprogram Budapesten.  2 órás hajókázásra várjuk nyáron légkondicionált, télen fűtött hajóinkon.'),
(804, 'Budapesti randevú a Dunán, sétahajózás itallal vagy vacsorával 19:00 órától- JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, '2 órás hajókázásunk egy köszöntő itallal kezdődik, melyet légkondicionált hajóinkon szolgálunk fel Önnek. A hajón a zenét a Kodály Zoltán díjas Hungária Zenekarból 3 zenész szolgáltatja. Programunk vacsora nélkül is meglátogatható.'),
(805, 'Budapesti sétahajózás vacsorával 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'Budapesti sétahajózás vacsorával programunk azon vendégeink számára készült, akik  szívesen fogyasztanák el vacsorájukat romantikus hangulatban. Találkozás a program kezdete előtt 30 perccel.'),
(806, 'Sétahajózás a Dunán Budapesten, minden nap 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'Sétahajózás a Dunán Budapesten ínyencségekkel és élő zenével fűszerezve programunk azon vendégeink számára készült, akik szeretik az élőzenét, és szívesen fogyasztanák el vacsorájukat romantikus hangulatban. 2 órás hajókázásunk egy köszöntő itallal kezdőd'),
(807, 'Zenés vacsora romantikus hajós városnézéssel Budapesten 19:00 órától- JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'Hozza el kedvesét egy romantikus vacsorára és tegye egy hajókázással emlékezetessé! Köszöntőitallal, gyertyafénnyel, ínycsiklandó büfévacsorával és további italokkal várjuk! A romantikus hangulatról az élőzene és Budapest esti fényei gondoskodnak.'),
(808, 'Borhajó Budapesten, élőzenés sétahajózás borkóstolóval, ínyencségekkel 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 4, 'Lépjen fedélzetünkre és ismerje meg a várost a lehető legszebb perspektívából. A Duna vizéről Budapest leggyönyörűbb látványosságai tárulnak a szeme elé, mint a Parlament, a Bazilika vagy a Nagy Vásárcsarnok. A folyó túloldalán feltekinthet a lélegzetelál'),
(809, '15. kerületi programok Budapest 2024 / 2025. Újpalotai, Rákospalotai és Pestújhely események', '2024.12.02 (hétfő) 13:00 - 2024.12.13 (péntek) 00:00 ', 3, 4, '15. kerületi programajánló Budapesten. Események, rendezvények Újpalotán, Rákospalotán és Pestújhelyen. A 15. kerület három városrészében számos kulturális és egyéb szabadidős program várja a kerület lakosságát. A kerületi művelődési központban és a hozzá'),
(810, 'Borsos Miklós Emléklakás programok 2024 Budapest', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 4, 'A Borsos Emléklakásban a régi bútorok és használati tárgyak – mint például a művész Firenzében vásárolt reneszánsz székei, gyönyörű erdélyi utazóládája, kézi csomózású perzsa szőnyege, eredeti csillárja és könyvei – mellett állandó kiállítást alakítottak '),
(811, 'Virág Benedek Ház programok 2024 Budapest', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 4, 'Igényes szórakozás, minőségi időtöltés, minden generáció érdeklődését felölelő kulturális programpaletta, értékes kapcsolatok és barátságos fogadtatás Budán. A Virág Benedek Ház gyönyörű tabáni épület, kiállítótér és kulturális-közösségi központ. Felejthe'),
(812, 'Szombathelyi programok 2024 / 2025. Fesztiválok, rendezvények, események', '2024.11.22. (péntek) - 2024.12.23. (hétfő) ', 27, 4, 'Szombathely minden évszakban színes kulturális programokat kínál. Az Érezd Szombathelyt! elnevezésű  programkavalkád szinte minden hétvégén változatos, izgalmas, könnyed, szórakoztató zenei-, gasztro-, művészeti-, sőt sporteseményekkel vár minden kikapcso'),
(813, 'Salgótarjáni programok 2024 / 2025. Fesztiválok, rendezvények, események', '2024.11.29. (péntek) - 2024.12.21. (szombat) ', 36, 4, 'Változatos programok, fesztiválok, rendezvények, események Salgótarjánban. Gasztronómia fesztiválok, városi ünnepségek, zenés programok, családi és gyermek előadások, színházi bemutatók, múzeumok egész évben Salgótarjánban.'),
(814, 'Debreceni programok 2024 / 2025. Fesztiválok, rendezvények, események, jeles napok, ünnepek', '2024.11.29. (péntek) - 2024.12.23. (hétfő) ', 13, 4, 'Debrecenben sosem lehet unatkozni! Debrecen turisztikailag rendkívül érdekes és vonzó város, amely gazdag kulturális örökséggel és történelmi látnivalókkal büszkélkedhet. A város számos lenyűgöző múzeummal, impozáns templomokkal és a híres Nagytemplommal '),
(815, 'Győri programok 2024 / 2025. Fesztiválok, rendezvények, események', '2024.11.29. (péntek) - 2024.12.23. (hétfő) ', 37, 4, 'Győri programajánló érdekes és értékes programokkal. Színes a kulturális programkínálat egész évben. Ebben a műemlékekben gazdag városban, kiállítások, koncertek, színházi előadások, fesztiválok, múzeumi foglalkozások, sportesemények és még számos szabadi'),
(816, 'Miskolci programok 2024 / 2025. Fesztiválok, események, rendezvények', '2024.11.29. (péntek) - 2024.12.23. (hétfő) ', 18, 4, 'Miskolci programajánló érdekes és értékes programokkal. Színes a kulturális programkínálat egész évben. Miskolcon kiállítások, koncertek, fesztiválok, színházi előadások, filmvetítések, barlangfürdő, gasztronómiai és zenés programok, szabadtéri színpadi e'),
(817, 'Makói programok 2024 / 2025. Események, rendezvények, fesztiválok', '2024.11.30. (szombat) - 2024.12.22. (vasárnap) ', 19, 4, '2024. évi makói programajánló. Makó nemcsak a hagymájáról híres, de bővelkedik kulturális programokban, koncertek, kiállítások, színházi előadások, gasztronómiai programok, filmvetítések, fesztiválok várják az érdeklődő közönséget. Makón, a Hagymaház egés'),
(818, 'Dombóvári programok 2024 / 2025. Események, rendezvények, fesztiválok', '2024.11.30. (szombat) - 2024.12.31. (kedd) ', 38, 4, 'Dombóvári programajánló. Dombóvár koncertekkel, rendezvényekkel, színházzal, gyermek előadásokkal, zenés programokkal várja a közönséget. A kulturális és gasztronómiai kikapcsolódási lehetőségek mellett számos kiránduló és túraútvonal is várja a Dombóvárr'),
(819, 'Balatonboglár programok 2024 / 2025. Fesztiválok, rendezvények, események', '2024. december 1. (vasárnap) - 2024. december 20. (péntek) ', 39, 4, 'Balatonboglári programajánló érdekes és értékes programokkal. Színes a kulturális programkínálat egész évben. Kiállítások, koncertek, gyermekprogramok, színházi előadások, filmvetítések, sportesemények, gasztrofesztiválok és még számos szabadidős garantál'),
(820, 'Oroszlány programok 2024 / 2025. Fesztiválok, események, rendezvények', '2024. december 1. (vasárnap) - 2024. december 21. (szombat) ', 40, 4, 'Oroszlányi programajánló. Változatos programok a település lakóinak és látogatóinak. Mindenkit szeretettel várnak Oroszlányba.'),
(821, 'Zsámbéki programok 2024 / 2025. Események, rendezvények, fesztiválok', '2024. december 1. (vasárnap) - 2024. december 21. (szombat) ', 41, 4, 'Zsámbéki programajánló 2024 / 2025. A Budapesttől 35 km-re fekvő települést élénk kulturális élet jellemzi. A Zsámbéki Rakétabázison,mely jelenleg már műemléki védelem alatt áll, tavasztól őszig szerveznek kulturális és ismeretterjesztő programokat, rende'),
(822, 'Éjszakai hajós városnézés Budapesten - JEGYVÁSÁRLÁS', '2024. december 24. (kedd)  22:00', 3, 5, 'Éjszakai hajós városnézés Budapesten májustól október végéig minden pénteken és szombaton 22:00 órától, májustól szeptember végéig csütörtök este is.'),
(823, 'Budapesti orgonakoncertek híres áriákkal a Szent István Bazilikában', '2024. december 12. (csütörtök)  20:00', 3, 5, 'Budapesti orgonakoncertjeink este 20:00 órakor kezdődnek, és kb. 70 perc időtartamúak, szünet nincs. A koncert anyagát Teleki Miklós orgonaművész állította össze, aki  Magyarország legjobb orgonaművészei közé tartozik.'),
(824, 'Budapest Jazz Club programok 2024', '2024. december 11. (szerda) ', 3, 5, 'A Budapest Jazz Clubban változatos programokkal, élőzenével, magyar és világsztárokat felvonultató koncertekkel, csúcstechnikával felszerelt koncertteremben várják a minőségi zene kedvelőit. A békebeli, nosztalgikus hangulatú budapesti kávézóba és a moder'),
(825, 'Alma Együttes koncertek 2024 / 2025. Fellépések, előadások műsornaptára', '2024. december 14. (szombat) ', 3, 5, 'Az Alma Együttes mára az egyik legkedveltebb zenekar a gyermekek körében. Koncertjeiken az egyedi stílusú etno zenét játszó együttes improvizatív módon kezeli a táncos-zenés együttlétet. A gyerekek, sőt a szülők is aktív részesei és formálói a sok vidámsá'),
(826, 'MáraiKult programok 2024  Budapest. Események, rendezvények, élmény és inspiráció Buda szívében', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'A MáraiKult egyedi élményt nyújt, ahol a művelődés és a kulturális sokszínűség találkozik. Fedezze fel változatos helyszíneinket! Kulturális programkínálatunk a legszélesebb korosztály érdeklődési körének igényeit kívánja kielégíteni, az első kerületben é'),
(827, 'Tér-Kép Galéria programok 2024 Budapest', '2024. december 10. (kedd) - 2024. december 14. (szombat) ', 3, 5, 'A Tér-Kép Galéria programjai összekapcsolják a kortárs művészetet annak közönségével. A galéria letisztult, modern terében szeretjük meglepni a betérőket. A helytörténeti, a múlt hangsúlyos eseményeit, épületeit felelevenítő és megidéző tárlatok mellett f'),
(828, 'Várnegyed Galéria programok 2024 Budapest', '2024. december 12. (csütörtök) - 2024. december 14. (szombat) ', 3, 5, 'A 2004-ben alapított Várnegyed Galéria a kezdetektől fogad képzőművészeti, fotográfiai, iparművészeti tárlatokat. A grafikustól és a szobrásztól a textilművészig számos alkotó otthonra talált a Vízivárosban található kiállítótérben, amely a helyi, budai m'),
(829, 'Ismerős Arcok koncertek 2024 / 2025', '2024. december 13. (péntek) ', 3, 5, 'Az Ismerős Arcok zenekar 1999 óta van jelen a magyar könnyűzenei életben. Rendszeres szövegírói-zeneszerzői munkájával, nagyszámú közönséget vonzó koncertjeivel népszerűsíti, tudatosítja az egyetemes magyar kultúra szeretetének fontosságát. A jelenkor div'),
(830, 'Nagytemplomi Adventi Koncertek Debrecen 2024', '2024. december 16. (hétfő) ', 13, 5, '2024. évi Nagytemplomi Adventi Koncertek Debrecenben. Ebben az évben négy koncert kerül megrendezésre. Híres és méltán népszerű művészek lépnek fel a remek akusztikájú Debreceni Református Nagytemplomban. Koncertet ad Soltész Rezső, Szekeres Tamás az Omeg'),
(831, 'Csík -Presser-Karácsony: A Dal a Miénk 2.0 – Új dalokkal újratöltve', '2024. december 21. (szombat) ', 13, 5, 'Izgalmas vállalkozásba fogott a Csík Zenekar, amikor 2020-ban egy olyan lemezt adott ki, amely csak feldolgozásokat tartalmazott, ráadásul egyetlen zenekar, a Locomotív GT dalaiból válogatva! Az album megjelenését egy kétéves lemezbemutató turné követte, '),
(832, 'Borsos Miklós Emléklakás programok 2024 Budapest', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'A Borsos Emléklakásban a régi bútorok és használati tárgyak – mint például a művész Firenzében vásárolt reneszánsz székei, gyönyörű erdélyi utazóládája, kézi csomózású perzsa szőnyege, eredeti csillárja és könyvei – mellett állandó kiállítást alakítottak '),
(833, 'Jókai Anna Szalon programok 2024 Budapest', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'A Jókai Anna Szalon egy romantikus épületben helyet foglaló egyedülálló kulturális helyszín. Programkínálatában szerepelnek irodalmi és zenei előadások, kiállítások, könyvbemutatók, beszélgetések, komolyzenei koncertek, találkozások különleges emberekkel.'),
(834, 'Virág Benedek Ház programok 2024 Budapest', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'Igényes szórakozás, minőségi időtöltés, minden generáció érdeklődését felölelő kulturális programpaletta, értékes kapcsolatok és barátságos fogadtatás Budán. A Virág Benedek Ház gyönyörű tabáni épület, kiállítótér és kulturális-közösségi központ. Felejthe'),
(835, 'Center Színház programok 2024 Budapest. Előadások kisebb és nagyobb gyerekeknek, családoknak', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'Előadások gyermekeknek, családoknak, óvodás és kisiskolás gyermekcsoportoknak. Mesejátékok, bábelőadások, gyerekkoncertek. Küldetésünk, hogy a gyermekek találkozhassanak a színházkultúrával. Törekszünk rá, hogy megmutassuk nekik és megszerettessük velük e'),
(836, 'Gyula kiállítás programok 2024. Időszaki kiállítások a város kiállítóhelyein és a múzeumaiban', '2024.11.14. (csütörtök) - 2024.12.13. (péntek) ', 1, 5, 'Gyula népszerű turisztikai központ Békés megyében. A történelmi város kulturális intézményei számos kiállításnak, programnak adnak otthont egész évben. A kiállításokon többnyire a helyi és a megyén belüli művészek mutatkoznak be különböző alkotásaikkal. A'),
(837, 'Eötvös Károly Könyvtár kiállítások Veszprém 2024', '2024.12.06. (péntek) - 2025.01.05. (vasárnap) ', 9, 5, 'Időszaki kiállítások a veszprémi Eötvös Károly Könyvtárban és intézményeiben.'),
(838, 'Rececsipke kiállítás 2024 Szomolya. Megtekinthetők a szebbnél szebb terítők és tetszetős kézimunkák', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 42, 5, 'A Fekete Cseresznye Művelődési házban találhatják meg a kulturális Örökségünk részét képező rece csipke kiállításunkat. Azért is ajánlom a figyelmükbe, mert olyan különleges lehetőségben is részük lehet, hogy láthatják hogyan készülnek ezek a különleges k'),
(839, 'Falumúzeum látogatás Szomolyán, ismerje meg a jellegzetes használati eszközöket, népi mesterségeket', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 42, 5, 'A Tájház mellett van nekünk itt Szomolyán még egy, a régi korok hangulatát idéző Falumúzeumunk, ahol 300 évre visszamenőleg bemutatjuk be a jellegzetes szomolyai használati eszközöket, népi mesterségeket. Ilyenek a kőfaragó eszközök, helyi népi bútorok.'),
(840, 'Fizikai kísérletek minden nap a Csodák Palotájában', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'Elektromosságtan, hőtan és mechanika témakörében tartunk izgalmas kísérlet bemutatókat az Öveges teremben, ahol gyakran a látogatók is részesei a demonstrációknak. A Fizika show-kon a legkülönfélébb fizikai – és olykor kémiai – kísérleteket vesszük elő.'),
(841, 'Hőtan ismereti előadások a Csodák Palotájában', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 5, 'Hőtan témakörében tartunk izgalmas kísérlet bemutatókat az Öveges teremben, ahol gyakran a látogatók is részesei a demonstrációknak. A Fizika show-kon a legkülönfélébb fizikai – és olykor kémiai – kísérleteket vesszük elő.'),
(842, 'Budaörsi jegyek 2024 / 2025. Jegyvásárlás koncertekre, rendezvényekre, színházi előadásokra', '2024. december 7. (szombat) - 2024. december 11. (szerda) ', 43, 5, 'Budaörsi programajánló, online jegyvásárlási lehetőség koncertekre, rendezvényekre, színházi előadásokra 2024 / 2025-ben. A Budaörsi Latinovits Színház és a Jókai Mór Művelődési Központ által szervezett programok egész évben gondoskodnak a színvonalas szó'),
(843, 'Jegyek győri koncertekre, rendezvényekre, színházi előadásokra 2024 / 2025', '2024. december 7. (szombat) - 2024. december 12. (csütörtök) ', 37, 5, 'Online jegyvásárlási lehetőség koncertekre, rendezvényekre, színházi előadásokra Győrben 2024 / 2025-ben. A város kulturális tereiben számtalan programon lehet részt venni. Nemzetközi előadók és hazai kedvencek egyaránt többféle műfajban képviseltetik mag'),
(844, '6szín Teátrum jegyvásárlás 2024 / 2025', '2024. december 8. (vasárnap) - 2024. december 11. (szerda) ', 3, 5, 'Programjainkat úgy alakítjuk, hogy napközben elsősorban a gyerekeké legyen a színpad: a beavató színháztól a játékos ismeretszerzésen át a különböző társadalmi ügyeink megvitatásáig. Esténként a 6SZIN Teátrum elsősorban befogadó színházként működik. Reper'),
(845, 'Belvárosi Színház előadások 2024 / 2025. Online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 11. (szerda) ', 3, 5, 'Belvárosi Színház előadások 2024 / 2025. Online jegyvásárlás. A Belvárosi Színház Budapest szívében várja a színház rajongóit változatos repertoárral, nagy sikerű darabokkal, kiváló színművészekkel egész évben. A Belvárosi Színház színházterme korszerű ép'),
(846, 'Zeneakadémia koncertek 2024 / 2025. Online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 11. (szerda) ', 3, 5, 'Zeneakadémia programajánló, online jegyvásárlási lehetőség 2024 / 2025-ben. Neves fellépők, színvonalas zenei programok várják az érdeklődőket egész évben. A világ 50 legjobb előadóművészeti egyeteme között van, Nagyterme legendás hangversenyhelyszín. Egy'),
(847, 'Jegyek Debrecen 2024 / 2025. Online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 12. (csütörtök) ', 13, 5, 'Koncertjegyek, színházjegyek, mozijegyek és jegyek különböző programokra Debrecenben. Az egész éves szórakozást a fesztiválok és egyéb rendszeresen megrendezésre kerülő események garantálják. A teljeség igénye nélkül ide tartozik a nagy múlttal rendelkező'),
(848, 'Müpa koncertek Budapest 2024 / 2025. Online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 12. (csütörtök) ', 3, 5, 'Müpa koncertek Budapest 2024 / 2025. Online jegyvásárlás. Komolyzenei, világzenei, jazz és könnyűzenei koncertek a Művészetek Palotájában Budapesten. Évről évre több világsztár és hazai elismert előadó lép fel a Müpában. Minden évben több tematikus feszti'),
(849, 'Vörösmarty Színház programok Székesfehérvár 2024 / 2025', '2024. december 9. (hétfő) - 2024. december 12. (csütörtök) ', 4, 5, 'A Székesfehérvári Vörösmarty Színházban komédiák, tragédiák, operettek, operák, musicalek, mesejátékok világába színházunk neves művészei kalauzolják el a nagyérdeműt. A 470 férőhelyes nagyszínház mellett a Pelikán Kamaraszínházban és a Kozák András Stúdi'),
(850, 'Jurányi Inkubátorház programok 2024 / 2025. Online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 13. (péntek) ', 3, 5, 'Jurányi Inkubátorház programok 2024 / 2025. Online jegyvásárlás. Független előadó- és alkotóművészeti inkubátorház, többfunkciós színhely. A Jurányi Produkciós Közösségi Inkubátorház otthont ad különböző művészeti területek képviselőinek, ezen belül fiata'),
(851, 'Budaörsi Latinovits Színház műsora 2024 / 2025. Előadások és online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 13. (péntek) ', 43, 5, 'Színházi előadások Budaörsön online jegyvásárlási lehetőséggel 2024 / 2025. A Budaörsi Latinovits Színház egész évbe várja a színházművészet iránt érdeklődőket. A színház minden évadban színes, változatos előadásokkal kedveskedik a látogatóknak. Kicsik és'),
(852, 'Siófoki adventi programok 2024. Téli Varázs Siófokon', '2024.11.30. (szombat) - 2024.12.24. (kedd) ', 24, 6, 'Adventi programkavalkád  Siófok városában, hisz Siófok télen is varázslatos! Az idei évben is egy mesebeli Adventi időszakkal vár Siófok! Siófok és a Balaton téli varázsa idén is mindenkinek jár! Siófok idén decemberben is mindenki lelkét az ünnepekre han'),
(853, 'Alma Együttes koncertek 2024 / 2025. Fellépések, előadások műsornaptára', '2024. december 14. (szombat) ', 24, 6, 'Az Alma Együttes mára az egyik legkedveltebb zenekar a gyermekek körében. Koncertjeiken az egyedi stílusú etno zenét játszó együttes improvizatív módon kezeli a táncos-zenés együttlétet. A gyerekek, sőt a szülők is aktív részesei és formálói a sok vidámsá'),
(854, 'Gárdonyi Levendula workshop programok 2024. Alkossunk együtt adventi - karácsonyi ünnepi hangulatban', '2024. december 14. (szombat) ', 25, 6, 'Csatlakozz hozzánk különleges, kreatív workshop sorozatunkra! Minden, amit a workshopon használunk, természetes és környezetbarát alapanyagokkal és kellemes levendulaillatú környezetben. Neked semmit sem kell magaddal hoznod – minden alapanyagot és eszköz'),
(855, 'Zenekarácsony Békéscsaba 2024. Ünnepi szuperkoncertek sztárokkal kicsiknek és nagyoknak', '2024. december 26. (csütörtök) ', 20, 6, 'Zenekarácsony, ünnepi koncertek Békéscsabán, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit a'),
(856, 'Zenekarácsony Debrecen 2024. Karácsonyi sztárözön, ünnepi szuperkoncertek kicsiknek és nagyoknak', '2024. december 26. (csütörtök) ', 13, 6, 'Zenekarácsony, ünnepi koncertek Debrecenben, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit a'),
(857, 'Zenekarácsony Szeged 2024. Ünnepi szuperkoncertek kicsiknek és nagyoknak karácsonyi hangulatban', '2024. december 26. (csütörtök) ', 26, 6, 'Zenekarácsony, ünnepi koncertek Szegeden, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit a hé');
INSERT INTO `esemeny` (`id`, `nev`, `datum`, `varosid`, `tipusid`, `leiras`) VALUES
(858, 'Zenekarácsony Szombathely 2024. Ünnepi koncertek sztárokkal kicsiknek és nagyoknak', '2024. december 26. (csütörtök) ', 27, 6, 'Zenekarácsony, ünnepi koncertek Szombathelyen, ahol olyan programokat kínálunk, amiknek a színvonala, minősége, műfaja alkalmas arra, hogy a családtagok akár ajándékként is megvegyék ezekre a jegyet a szeretteiknek. Ha az ember ki akar szakadni egy kicsit'),
(859, 'Zenekarácsony koncertsorozat 2024. Várjuk Békéscsabán, Debrecenben, Szegeden és Szombathelyen', '2024. december 26. (csütörtök) - 2024. december 29. (vasárnap) ', 27, 6, 'Zenekarácsony koncertsorozat 2024. Ritkán adatik meg, hogy a karácsony 6 egymást követő munkaszüneti napot foglal magába. Úgy gondoltuk, hogy ez a pár nap alkalmas arra, hogy egy csokorba gyűjtsünk olyan top kategóriás produkciókat, amelyek igyekeznek min'),
(860, 'Agykontroll tanfolyam gyerekeknek 2024 / 2025', '2024. december 14. (szombat) - 2024. december 15. (vasárnap) ', 27, 6, 'A tanfolyam hatására a gyerek várhatóan magabiztosabb lesz, eredményesebben tud tanulni, képes megszüntetni fájdalmai zömét, betegség esetén gyorsabban meggyógyul, megtanulja céljait elérni, képes lesz megszabadulni rossz szokásaitól, képes jobb döntéseke'),
(861, 'Kezdőrúgás vásárlás az MTK Budapest hazai mérkőzéseire a 2024 / 2025-ös szezonban', '2024. december 14. (szombat) ', 3, 6, 'Vásárold meg hazai mérkőzéseinken a szurkolói kezdőrúgás meccsnapi élményét, és tiéd lehet az első passz a meccsen, amit a kedvenc játékosodnak is  adhatsz!  A kezdőrúgáshoz személyre szabott mez is jár egyedi feliratozással. A speaker is köszönt a jeles '),
(862, 'Bowling Debrecenben minden nap, szórakozás, aktív kikapcsolódás, sport, csapatépítés', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 13, 6, 'Debrecen kedvelt szórakoztató központjában 8 sávos, professzionális bowling pályával várunk.'),
(863, 'Mikulás rendelés 2024. Házhoz jön a Mikulás, és valóra váltja a gyermekek álmát', '2024. december 1. (vasárnap) - 2024. december 23. (hétfő) ', 3, 6, 'A Mikulás eljön, ha hívják! Mikulás szolgáltatásunk 2024. december 23-ig elérhető Budapesten és vonzáskörzetében. A családoknál és a cégeknél, valóra váltjuk a mesét, de az üzletekben is vevő csalogató lehet a megrendelt Mikulás.'),
(864, 'Budapesti kaland! Szabadtéri fergeteges kalandjáték csapatban, aktív élménydús kikapcsolódás', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'Kapcsolódjatok ki egy fergeteges kalandjáték keretein belül, miközben megismerhetitek Budapest néhány nevezetességét. Töltsetek el néhány órát együtt, szerezzetek új élményeket! Programunk egy szabadtéren játszható csapatjáték, mely nyomozós, fejtörős, ka'),
(865, 'Kaposvár játék program, szabadtéri nyomozós, fejtörős, kalandos, rejtélyes és kalandos csapatjáték', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 44, 6, 'Fogd a mobilod és ismerd meg Kaposvárt egy kalandor szemével! Tölts el néhány órát a barátaid vagy családod társaságában! Kapcsolódjatok ki egy fergeteges kalandjáték keretein belül, miközben megismerhetitek Kaposvár néhány nevezetességét. Programunk egy '),
(866, 'Gokart pálya várja a száguldás szerelmeseit Budapesten, fedett pályás gokartozás minden évszakban', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'Az ASIA Gokart Center Budapest leghosszabb fedett gokart pályája, ami összesen 450 méter. Gokartjaink a francia Sodi márka kiemelkedő modelljei, melyek a legjobb beltérre tervezett gokartok. Mivel tulajdonképpen ezek adják a gokartozás legfőbb élményét, e'),
(867, 'Center Színház programok 2024 Budapest. Előadások kisebb és nagyobb gyerekeknek, családoknak', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'Előadások gyermekeknek, családoknak, óvodás és kisiskolás gyermekcsoportoknak. Mesejátékok, bábelőadások, gyerekkoncertek. Küldetésünk, hogy a gyermekek találkozhassanak a színházkultúrával. Törekszünk rá, hogy megmutassuk nekik és megszerettessük velük e'),
(868, 'Játszóház gyermekfelügyelettel, gondtalan budapesti családi bevásárlás gyerekekkel', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'A CipCirip Játszóház várja gyermekét, amíg Ön vásárol. A játszóházba 0-3 éves korig csak felnőtt kísérővel lehet tartózkodni. Amennyiben szeretné 3 évnél idősebb gyermekét nálunk hagyni, mi vigyázunk rá! Ennek egyetlen feltétele, hogy a gyermeknek ez alat'),
(869, 'MóKaland Játszóház programok szállóvendégeknek és külsős vendégeknek a Tisza Balneum Hotelben', '2024. december 13. (péntek) - 2024. december 15. (vasárnap) ', 31, 6, 'A Tisza Balneum Hotel MóKaland Játszóházát Tiszafüreden az apró szállóvendégeink és külsős vendégek is igénybe vehetik. A külsős vendégeknek a játszóház használatához Mókaland belépőjegy megváltása szükséges, amely szállodánk recepcióján vásárolható meg. '),
(870, 'Téli szüneti wellness pihenés animációs programokkal a Tisza-tónál, a Balneum Hotelben', '2025. január 2. (csütörtök) - 2025. január 5. (vasárnap) ', 31, 6, 'Töltse meghitt hangulatban téli pihenését a Tisza-tónál! Tegyenek egy sétát a Tiszavirág ártéri sétaúton, pihenjék ki az év fáradalmait wellness részlegünkön, lazító szauna rituáléinkon. A Balneum Hotel Téli szünet csomagja már 1 éjszakára foglalható félp'),
(871, 'Kaland program minden nap Gyulán, szabadulás a Kalandpincéből 60 perc alatt!', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 1, 6, 'Escape Room - Szabadulás a Pincéből 60 perc alatt! Izgalmas szabadulós játék, amely ijedelem nélkül biztosít felejthetetlen élményt mindenki számára. Kaland program minden nap Gyulán. A játék lényege, hogy egy berendezett, zárt pincéből fizikai erő haszná'),
(872, '6szín Teátrum jegyvásárlás 2024 / 2025', '2024. december 8. (vasárnap) - 2024. december 11. (szerda) ', 3, 6, 'Programjainkat úgy alakítjuk, hogy napközben elsősorban a gyerekeké legyen a színpad: a beavató színháztól a játékos ismeretszerzésen át a különböző társadalmi ügyeink megvitatásáig. Esténként a 6SZIN Teátrum elsősorban befogadó színházként működik. Reper'),
(873, 'Budapest Bábszínház műsor 2024 / 2025. Előadások és online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'Budapest Bábszínház műsor 2024 / 2025. Online jegyvásárlás! A Budapest Bábszínház színvonalas gyermekműsorai mellett főleg felnőtt előadásairól vált híressé bel- és külföldön. A Budapest Bábszínház következetesen munkálkodik azon, hogy minden gyermekkoros'),
(874, 'Budapest séta programok 2024. Online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'Ismerje meg a várost, csatlakozzon a meghirdetett sétákhoz, városnézésekhez válasszon az izgalmas programok közül! Tematikus séták, változatos helyszínek, történelmi sztorik, fedezze fel a főváros titkait különleges programjainkon! Élményekben és látnival'),
(875, 'Garden of Lights Debrecen 2024 / 2025. Pinokkió multimédia-kiállítás, online jegyvásárlás', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 13, 6, 'Garden of Lights Debrecen 2024 / 2025. Online jegyvásárlás! Hurrá! Először Debrecenben a Garden of Lights varázslatos fény és multimédia-kiállítása, ahol elmerülhetünk a képzelet és a kreativitás erdejében! Az őszi, téli estéken szeretettel várunk Pinokki'),
(876, 'Garden of Lights Budapest 2024 / 2025. Hupikék Törpikék multimédia-kiállítás, online jegyek', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 6, 'Garden of Lights Budapest 2024 / 2025. Online jegyvásárlás! Hurrá! Végre újra Budapesten a Garden of Lights varázslatos fény és multimédia-kiállítása, ahol elmerülhetünk a képzelet és a kreativitás világában! Az őszi, téli estéken szeretettel várunk a Füv'),
(877, 'A diótörő - Operaház előadások 2024 / 2025. Mesebalett előadások az Operában online jegyvásárlással', '2024. december 10. (kedd) - 2024. december 11. (szerda) ', 3, 6, 'A diótörő című mesebalett előadások a Magyar Állami Operaház színpadán online jegyvásárlási lehetőséggel. Csajkovszkij A diótörő című balettje évtizedek óta a karácsonyi készülődés elengedhetetlen része. Az előadás megtekintése 6 éven aluliak számára nem '),
(878, 'RaM - ArT Színház Budapest előadások és jegyvásárlás 2024 / 2025', '2024. december 11. (szerda) ', 3, 6, 'RaM - ArT Színház előadások Budapest első élményszínházában 2024 / 2025. A befogadó színházként működő helyszín a minőségi előadások bemutatását tűzte ki célul. Budapesti, vidéki társulatok egyaránt fellépnek az év során. Komoly és könnyűzenei koncertek, '),
(879, 'Ringató gyerekprogram zenés foglalkozás szerdánként kisgyermekeknek a Müpában', '2024. december 11. (szerda) ', 3, 6, 'A népdalok, mondókák, ölbeli játékok újrafelfedezésének, az együttes éneklés és játszás újbóli megismerésének lehetőségét kínálja gyermekek és szüleik számára az országosan ismert és méltán népszerű zenés foglalkozás, a Ringató. Az otthon szerzett korai z'),
(880, 'Diótörő előadások és jegyek 2024 / 2025. Online jegyvásárlás', '2024. december 11. (szerda) ', 3, 6, 'Diótörő előadások, vetítések, koncertek 2024 / 2025. A Diótörő, minden idők legnépszerűbb meséje, minden generációt képes elbűvölni és elgondolkoztatni arról, vajon beérhetjük-e a látszatvilággal, vagy a boldogság megtalálásához hinnünk kell abban, hogy m'),
(881, 'Kolibri Színház előadások 2024 / 2025. Online jegyvásárlás', '2024. december 11. (szerda) - 2024. december 12. (csütörtök) ', 3, 6, 'A Kolibri Színház épületében egyaránt kínál báb, gyermek, valamint felnőtt előadásokat. A Kolibri Fészek gyermek-szobaszínház. A Kolibri Pincében alternatív színházi előadások, vendégprodukciók, jazz- és irodalmi estek, idegen nyelvű előadások találnak ot'),
(882, 'Karácsonyi program Budapesten, karácsonyi vacsora sétahajózással és élőzenével', '2024. december 24. (kedd)  19:00', 3, 7, 'Ha szeretné egy különleges, és meghitt karácsonyi hangulatban tölteni a téli ünnepeket akkor a karácsonyi varázzsal átitatott Gróf Széchenyi hajón a helye. Töltsük együtt ezt a meghitt és békés adventi időszakot!'),
(883, 'Kávéház program Budapest 2024. Térjen be egy finom kávéra a Atryum  Fashion Cafe Barba!', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 7, 'Térjen be egy finom kávéra Budapest belvárosában az Atrium Fashion City bevásárlóközpontban található Atryum Fashion Café Bárba. Állatbarát kávézónkban hétről-hétre más-más akcióval várjuk kedves vendégeinket. A kávéház kiváló lehetőséget biztosít arra is'),
(884, 'Zene és Bor 2024. A 100 tagú Cigányzenekar ünnepi koncertje vacsorával és borkóstolóval Budapesten', '2024. december 30. (hétfő) ', 3, 7, 'Már hagyománnyá vált a 2024-ben 28. alkalommal megrendezésre kerülő ZENE-BOR ünnepe, melyen minden évben december 30-án nagyszabású gálakoncertet ad a világon egyedül álló 100 Tagú Cigányzenekar. Kétrészes műsoruk repertoárján a virtuóz cigányzene, a jól '),
(885, 'Egri Borszalon 2024', '2024. december 29. (vasárnap) ', 10, 7, 'Borászok és boraik társaságában zárjuk és búcsúztatjuk a 2024-es évet. Már 22. éve ezen a napon rendezzük meg az Egri Borszalont, napra pontosan 3 estével Szilveszter előtt. Lépj be a húszas évek pezsgő világába és légy részese Eger legelegánsabb évzáró ü'),
(886, 'Pécsi sörtúra 2024. Izgalmas sörfőzde gyárlátogatás felejthetetlen sörkóstolással minden szombaton', '2024. december 14. (szombat) ', 5, 7, 'Fedezd fel a Pécsi Sörfőzdét! Pécsi sörtúra programunk keretében meghívunk egy izgalmas gyárlátogatásra, ahol betekinthetsz a Pécsi Sörfőzde működésébe, a sörkészítés folyamatába és megismerheted a sör alapanyagait is, összekötve egy felejthetetlen sörkós'),
(887, 'Szilveszteri vacsora Budapest 2024. Gatsby Szilveszter élőzenével a Vogue hajón', '2024. december 31. (kedd) ', 3, 7, 'Szilveszteri vacsora Budapesten a Vogue Hajón 2024. december 31-én. Készülj egy lenyűgöző éjszakára Budapest leghangulatosabb állóhajóján! Köszöntsük együtt a 2025-ös esztendőt egy hamisítatlan Gatsby-stílusú szilveszteri bulin! Idén több, mint 100 évet u'),
(888, 'Sütemény workshop 2024 / 2025. Győr. Süss, alkoss, sütemény készítő kurzusok', '2024. december 11. (szerda) ', 37, 7, 'Sütemény készítő workshop a sütés szerelmeseinek! Tanfolyamainkon különféle stílusok és ízek között lehet válogatni: torták, hagyományos rétesek, vegán, klasszikus és monodesszertek, sütemények. Változatos tanfolyamaink között minden gyermek és felnőtt me'),
(889, 'Mezze workshop 2025 Győr. Mezze lakoma főzőtanfolyam szír és libanoni finomságokkal', '2025. január 9. (csütörtök) ', 37, 7, 'A mezze gyakorlatilag egy rendkívül kiadós lakoma, mely a libanoni konyha sajátossága. Alapvetően az előételek repertoárját jelenti, de sokszor nem csak azokat értjük mezze lakoma alatt, hanem az étkezés minden fogását. Nem ritka egyébként a 30-40 különbö'),
(890, 'Liliomkert termelői piac Káptalantóti 2024', '2024. december 15. (vasárnap) ', 15, 7, 'A Káli-medence szívében fellelhető termelői piacot Harmathy Ildikó biológus-mérnök álmodta meg és hozta létre. Jól teszi, aki a vasárnaponkénti káptalantóti piacra üres hassal érkezik, mert képtelenség megállni, hogy a helyi termelők asztalkái közt járva '),
(891, 'Gluténmentes kürtőskalács Budapesten szerdán és pénteken az Édes Mackó kürtőskalács-cukrászdában', '2024. december 11. (szerda) ', 3, 7, 'Szerdánként és péntekenként glutén- és tejmentes alapanyagból készült kürtőskalácsokat is sütünk Budapesten az Édes Mackó kürtőskalács-cukrászdában. Ezeken a napokon előrendelésre nincs szükség. A gluténmentes és tejmentes alapanyagból készült kalácsok sü'),
(892, 'Borhajó Budapesten, élőzenés sétahajózás borkóstolóval, ínyencségekkel 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 7, 'Lépjen fedélzetünkre és ismerje meg a várost a lehető legszebb perspektívából. A Duna vizéről Budapest leggyönyörűbb látványosságai tárulnak a szeme elé, mint a Parlament, a Bazilika vagy a Nagy Vásárcsarnok. A folyó túloldalán feltekinthet a lélegzetelál'),
(893, 'Karácsonyi menü ajánlat a hévízi Brix Bistroban céges vacsorához', '2024. december 1. (vasárnap) - 2024. december 22. (vasárnap) ', 45, 7, 'KARÁCSONYI VACSORA AJÁNLATUNK - Tartsa különleges környezetben céges karácsonyi eseményét és válassza szállodánk Brix Bistroját, ahol magas színvonalú, professzionális szolgáltatásokat és kiváló gasztronómiai kínálatot nyújtunk Önnek és csapatának!'),
(894, 'Gyulai Mézfesztivál szállással a Wellness Hotel Gyula szállodában', '2024. december 14. (szombat) - 2024. december 15. (vasárnap) ', 1, 7, 'Gyulai Mézesztivál 2024. december 14-15-én. Ezen a két napon mézeskalácsok, cukrászati különlegességek bemutatása, kóstolása és vására várja a látogatókat. A fesztivál idejére foglaljon szállást a négycsillagos Wellness Hotel Gyulában, csomagjaink teljes '),
(895, 'Grillkirály programok 2024. Események, rendezvények, fesztiválok, ahol találkozhattok velünk', '2024.11.29. (péntek) - 2024.12.22. (vasárnap) ', 1, 7, 'A legfinomabb grillételekkel várunk mindenkit szeretettel különböző rendezvényeken, fesztiválokon a Grillkirály standján. Kulináris élmények, gasztronómiai finomságok, grilltálak, hagyományos ízek és ételek várják a Grillkirály programjain az érdeklődőket'),
(896, 'Palacsintafesztivál 2024 Balatonalmádi. Palacsinta, Kolbász és Mikulásfesztivál Almádiban', '2024. december 6. (péntek) - 2024. december 12. (csütörtök) ', 6, 7, 'Várunk mindenkit szeretettel a Balaton legszebb karácsonyi vásárába, ahol Palacsinta, Kolbász és Mikulásfesztivál várja a látogatókat 2024. december 6 és 12 között. Hatalmas jégpálya is üzemel, ami a vásár alatt nyitva tart. A belépés ingyenes és kutyabar'),
(897, 'Bortúra Mór 2024. We Love Mór Bortúra szállással az Öreg Prés Butikhotelben', '2024. december 28. (szombat) ', 46, 7, 'Bortúrára vár az Öreg Prés Butikhotel Móron! Még van szabad szobánk… Jöhetsz egyedül - egyágyas szobáink kényelmesek, és tökéletesek számodra. Jöhettek kettesben-romantikus hangulatú szobáinkban visszarepültök az időben. Jöhettek az egész családdal-apartm'),
(898, 'Szilveszter egy igazi falusi disznóvágással és borvacsorával a Fenyőharaszt Kastélyszállóban', '2024.12.29. (vasárnap) - 2025.01.01. (szerda) ', 47, 7, 'Ha Ön is szeretné, hogy emlékezetes legyen az „évforduló”, vegyen velünk részt egy igazi, falusi, felejthetetlen disznóvágáson, ahol lesz minden, ami a vacogó téli hidegben felpezsdíti az ember vérét: pálinka, forralt bor, cigányzene, pogácsa és finom étk'),
(899, 'Karácsonyi menü Tata, rendelje meg a karácsonyi ebédet vagy vacsorát a Veranda Bistro & More-ból!', '2024.11.28. (csütörtök) - 2024.12.20. (péntek) ', 48, 7, 'Karácsonyi menü Tatán, ünnepi elviteles tálak a Veranda Bistro & More-ban. Ünnepelje a karácsonyt szeretteivel és bízza ránk a karácsonyi lakomát! Chefünk által készített ünnepi ételekkel tegye különlegessé az idei Karácsonyt! Rendelje meg tőlünk a Karács'),
(900, 'Karácsonyi céges vacsora Tatán, a Veranda Bistro & More-ban', '2024. december 1. (vasárnap) - 2024. december 23. (hétfő) ', 48, 7, 'Céges karácsonyi vacsora Tatán, a Veranda Bistro & More-ban. Nem tudja, hol tartsa a céges karácsonyi vacsorát? Szeretné lezárni az évet finom ételek mellett, jó hangulatban? Svédasztal, bőségtálak, hidegtálak, italok az alapja egy remek céges bulinak. Le'),
(901, 'Disznótor programok 2024 / 2025. Disznóvágások, böllérprogramok országszerte', '2024. december 13. (péntek) - 2024. december 15. (vasárnap) ', 48, 7, 'Disznótor programajánló. Disznóvágás, disznótor, ünnepi események, vacsorák, vidéki ízek, hagyományőrző programok várják a falusi ízek és a régies kulináris élmények kedvelőit országszerte. A disznótoros programok nemcsak gasztronómiai élményeket nyújtana'),
(902, 'Szindbád Nyíregyháza 2024. Programok és vetítések, online jegyvásárlás', '2024. december 10. (kedd) - 2024. december 11. (szerda) ', 49, 7, 'Szindbád Színháztörténeti Rendezvénytér programok online jegyvásárlási lehetőséggel 2024-ben. Nyíregyháza kulturális negyedének egyik új és izgalmas közösségi tere filmvetítésekkel, programokkal várja a látogatókat. A Szindbád VIP Mozi all inclusive mozié'),
(903, 'Borhajó Budapesten, élőzenés sétahajózás borkóstolóval, ínyencségekkel 19:00 órától - JEGYVÁSÁRLÁS', '2024. december 11. (szerda)  19:00', 3, 7, 'Lépjen fedélzetünkre és ismerje meg a várost a lehető legszebb perspektívából. A Duna vizéről Budapest leggyönyörűbb látványosságai tárulnak a szeme elé, mint a Parlament, a Bazilika vagy a Nagy Vásárcsarnok. A folyó túloldalán feltekinthet a lélegzetelál'),
(904, 'Karácsonyi program Budapesten, karácsonyi vacsora sétahajózással és élőzenével', '2024. december 24. (kedd)  19:00', 3, 7, 'Ha szeretné egy különleges, és meghitt karácsonyi hangulatban tölteni a téli ünnepeket akkor a karácsonyi varázzsal átitatott Gróf Széchenyi hajón a helye. Töltsük együtt ezt a meghitt és békés adventi időszakot!'),
(905, 'Zene és Bor 2024. A 100 tagú Cigányzenekar ünnepi koncertje vacsorával és borkóstolóval Budapesten', '2024. december 30. (hétfő) ', 3, 7, 'Már hagyománnyá vált a 2024-ben 28. alkalommal megrendezésre kerülő ZENE-BOR ünnepe, melyen minden évben december 30-án nagyszabású gálakoncertet ad a világon egyedül álló 100 Tagú Cigányzenekar. Kétrészes műsoruk repertoárján a virtuóz cigányzene, a jól '),
(906, 'Kezdőrúgás vásárlás az MTK Budapest hazai mérkőzéseire a 2024 / 2025-ös szezonban', '2024. december 14. (szombat) ', 3, 8, 'Vásárold meg hazai mérkőzéseinken a szurkolói kezdőrúgás meccsnapi élményét, és tiéd lehet az első passz a meccsen, amit a kedvenc játékosodnak is  adhatsz!  A kezdőrúgáshoz személyre szabott mez is jár egyedi feliratozással. A speaker is köszönt a jeles '),
(907, 'Pécsi sörtúra 2024. Izgalmas sörfőzde gyárlátogatás felejthetetlen sörkóstolással minden szombaton', '2024. december 14. (szombat) ', 5, 8, 'Fedezd fel a Pécsi Sörfőzdét! Pécsi sörtúra programunk keretében meghívunk egy izgalmas gyárlátogatásra, ahol betekinthetsz a Pécsi Sörfőzde működésébe, a sörkészítés folyamatába és megismerheted a sör alapanyagait is, összekötve egy felejthetetlen sörkós'),
(908, 'Törley Pezsgőmanufaktúra és Látogatóközpont csoportos látogatás Budapesten', '2024. december 9. (hétfő) - 2024. december 13. (péntek) ', 3, 8, 'A Törley pezsgők története majdnem másfél évszázadra nyúlik vissza. Ezt a sokszínű, időnként nehéz, de egyúttal sikeres 140 évet meséli el nekünk a Törley Gyűjtemény és Látogatóközpont. Egyénileg érkező látogatók számára a Törley Gyűjtemény és Látogatóköz'),
(909, 'Családi nap Budán 2024. Adventi családi ünnep a Budavári Palotanegyedben', '2024. december 22. (vasárnap) ', 3, 8, 'Merülj el az adventi várakozás varázslatában a Várkert Bazárban, ahol december 22-én egész napos adventi családi rendezvénnyel várjuk a családokat! Hozd el gyermekeidet és éljetek át egy meghitt napot közösen, ahol minden pillanat az ünnepi készülődés örö'),
(910, 'Esküvő Kiállítás Szeged 2025. Menyegző Esküvő Kiállítás az IH Rendezvényközpontban', '2025. január 4. (szombat) ', 26, 8, '2025-ben jön a XVIII. Menyegző Esküvő Kiállítás, Szeged és a dél-alföldi régió legnagyobb és legszínvonalasabb Esküvői kiállítása! Ezen a szombaton találkozhatsz kiállítóinkkal, köztük menyasszonyi ruhaszalonok, esküvői helyszínek és vendéglátósok képvise'),
(911, 'Pontfestés workshop matyó hangulatban, kreatív élmény program alkotó kedvű ínyenceknek', '2025.01.01. (szerda) - 2025.12.31. (szerda) ', 3, 8, 'Alkoss és Kortyolj! Matyó pontfestés fröccsözéssel kreatív stúdiónkban, a belváros szívében. Ez az egyedülálló 4 órás program ötvözi a kreatív alkotást és a magyar gasztronómia különleges ízeit. A résztvevők megismerkednek a tradicionális magyar Matyó mot'),
(912, 'Esküvő Kiállítás Kecskemét 2025. Találkozz az esküvő szakma nagyjaival és minőségi kiállítóival!', '2025. február 2. (vasárnap) ', 32, 8, '26. Kecskeméti Esküvő Kiállítás a szakma nagyjaival! Várjuk szeretettel az ifjú párokat és az újabb minőségi kiállítókat ezen a gyönyörű helyszínen. Minőségi szolgáltatók, ÓRIÁSI kedvezmények! Bemutatkoznak a helyi és környékbeli esküvői szolgáltatók, itt'),
(913, 'Bowling Debrecenben minden nap, szórakozás, aktív kikapcsolódás, sport, csapatépítés', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 13, 8, 'Debrecen kedvelt szórakoztató központjában 8 sávos, professzionális bowling pályával várunk.'),
(914, 'Mikulás rendelés 2024. Házhoz jön a Mikulás, és valóra váltja a gyermekek álmát', '2024. december 1. (vasárnap) - 2024. december 23. (hétfő) ', 3, 8, 'A Mikulás eljön, ha hívják! Mikulás szolgáltatásunk 2024. december 23-ig elérhető Budapesten és vonzáskörzetében. A családoknál és a cégeknél, valóra váltjuk a mesét, de az üzletekben is vevő csalogató lehet a megrendelt Mikulás.'),
(915, 'Karácsonyi céges vacsora Tiszafüreden a Balneum Hotelben', '2024. december 1. (vasárnap) - 2024. december 22. (vasárnap) ', 31, 8, 'Karácsonyi céges vacsora Tiszafüreden a Balneum Hotelben. Szeretnédmegköszönni kollégáinak egész éves munkájukat? Mi garantáljuk, hogy az évzáró vacsorára a legjobb helyszín a Tisza Balneum Hotel****! Használják ki az év utolsó perceit és értékeljék ki ná'),
(916, 'Bicikli kalandok Budapesten izgalmas fejtörőkkel, kerékpáros élményprogramok csodálatos helyeken', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 8, 'Kalandra fel, várnak a játékos kerékpáros szabadtéri élményprogramok Budapesten! Egy-egy küldetést végigjátszva Budapest legcsodálatosabb helyeit fedezheted fel úgy, hogy közben izgalmas fejtörőket kell megoldani. Feladványok fogják nehezíteni a kalandoda'),
(917, 'Budapesti kalandok a szabadban izgalmas fejtörőkkel, élményjáték programok csodálatos helyeken', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 3, 8, 'Kalandra fel, vár sok játékos budapesti szabadtéri élményprogram! Egy-egy küldetést végigjátszva Budapest legcsodálatosabb helyeit fedezheted fel úgy, hogy közben izgalmas fejtörőket kell megoldani. Feladványok fogják nehezíteni a kalandodat, amelyek hely'),
(918, 'Kaland Tatán izgalmas fejtörőkkel a ravasz szörnyek nyomában, csodálatos helyszíneken', '2024. december 9. (hétfő) - 2024. december 15. (vasárnap) ', 48, 8, 'Kalandra fel, játékos szabadtéri élményprogram Tatán! A küldetést végigjátszva Tata legcsodálatosabb helyeit fedezheted fel úgy, hogy közben izgalmas fejtörőket kell megoldani. Feladványok fogják nehezíteni a kalandodat, amelyek helyenként igazi kihívások'),
(919, 'Céges karácsonyi buli panorámás pincénkben a Strázsa-hegyi kilátónál, várjuk a Monori Pincefaluban', '2024. december 1. (vasárnap) - 2024. december 22. (vasárnap) ', 50, 8, 'Tartsák céges karácsonyi buli rendezvényüket Monori Pincefalunkban, a Strázsa-hegyi kilátó szomszédságában található Petrovai Pincénkben! Teraszos pincénkhez családias hangulatú rendezvényház is tartozik, ahol 20 főtől vállaljuk kisebb és nagyobb emlékeze'),
(920, 'Karácsonyi menü ajánlat a hévízi Brix Bistroban céges vacsorához', '2024. december 1. (vasárnap) - 2024. december 22. (vasárnap) ', 45, 8, 'KARÁCSONYI VACSORA AJÁNLATUNK - Tartsa különleges környezetben céges karácsonyi eseményét és válassza szállodánk Brix Bistroját, ahol magas színvonalú, professzionális szolgáltatásokat és kiváló gasztronómiai kínálatot nyújtunk Önnek és csapatának!'),
(921, 'Grillkirály programok 2024. Események, rendezvények, fesztiválok, ahol találkozhattok velünk', '2024.11.29. (péntek) - 2024.12.22. (vasárnap) ', 45, 8, 'A legfinomabb grillételekkel várunk mindenkit szeretettel különböző rendezvényeken, fesztiválokon a Grillkirály standján. Kulináris élmények, gasztronómiai finomságok, grilltálak, hagyományos ízek és ételek várják a Grillkirály programjain az érdeklődőket'),
(922, 'Céges Karácsony Móron az Öreg Prés Butikhotelben', '2024. december 1. (vasárnap) - 2024. december 29. (vasárnap) ', 46, 8, 'Karácsonyi céges rendezvények az Öreg Présben Móron. Az év vége közeledtével fontos együtt ünnepelni a kollégákkal, lezárni az évet, hogy aztán az egész csapat újult erővel induljon neki a munkának januárban.  Különtermeink kiválóak egy kellemes vacsora v'),
(923, 'Családi nap Budán 2024. Adventi családi ünnep a Budavári Palotanegyedben', '2024. december 22. (vasárnap) ', 3, 8, 'Merülj el az adventi várakozás varázslatában a Várkert Bazárban, ahol december 22-én egész napos adventi családi rendezvénnyel várjuk a családokat! Hozd el gyermekeidet és éljetek át egy meghitt napot közösen, ahol minden pillanat az ünnepi készülődés örö');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helyszin`
--

CREATE TABLE `helyszin` (
  `helyszin_id` int(11) NOT NULL,
  `helyszin_nev` varchar(255) NOT NULL,
  `varosid` int(11) NOT NULL,
  `esemenyid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `helyszin`
--

INSERT INTO `helyszin` (`helyszin_id`, `helyszin_nev`, `varosid`, `esemenyid`) VALUES
(703, 'Több helyszínen', 1, 718),
(704, 'Kossuth Lajos u. 7.', 1, 719),
(705, 'Több helyszínen', 2, 720),
(706, 'Több településen és helyszínen', 2, 721),
(707, 'Több településen és helyszínen', 2, 722),
(708, 'Üllői út 131.', 3, 723),
(709, 'Berényi út 101.', 4, 724),
(710, 'Megyeri út 72.', 5, 725),
(711, 'több helyszínen', 3, 726),
(712, 'Nincs megadva', 5, 727),
(713, 'Wesselényi Strand főbejárat', 6, 728),
(714, 'Napospart u. 3.', 7, 729),
(715, 'Corvin köz 1.', 3, 730),
(716, 'Több településen és helyszínen', 3, 731),
(717, 'Számos budapesti helyszínen', 3, 732),
(718, 'Magyar Vár', 8, 733),
(719, 'Több településen és helyszínen', 8, 734),
(720, 'több helyszínen', 3, 735),
(721, 'Komor Marcell utca 1.', 3, 736),
(722, 'Nincs megadva', 3, 737),
(723, 'Erzsébet tér 12.', 3, 738),
(724, 'Komor Marcell utca 1.', 3, 739),
(725, 'Komor Marcell utca 1.', 3, 740),
(726, 'Kis Rókus utca 16-20.', 3, 741),
(727, 'História Kert', 9, 742),
(728, 'Több helyszínen', 10, 743),
(729, 'Dobó tér', 10, 744),
(730, 'Király utca 13.', 3, 745),
(731, 'Kossuth Lajos utca 126.', 11, 746),
(732, 'Vásártér', 12, 747),
(733, 'Könyves Kálmán körút 12-14.', 3, 748),
(734, 'Nagyerdei park 12. Nagyerdei Stadion északi zárt parkolója', 13, 749),
(735, 'Gyár utca 13.', 14, 750),
(736, 'Szentmihályi út 131.', 3, 751),
(737, 'Petőfi u. 1.', 15, 752),
(738, 'Wesselényi Strand főbejárat', 6, 753),
(739, 'Kossuth tér', 16, 754),
(740, 'Patak park', 17, 755),
(741, 'Szent István tér', 18, 756),
(742, 'Makovecz tér', 19, 757),
(743, 'Szabó Dezső utca 14.', 20, 758),
(744, 'Több helyszínen', 21, 759),
(745, 'Több helyszínen', 22, 760),
(746, 'Több helyszínen', 23, 761),
(747, 'Fő tér 2.', 24, 762),
(748, 'Kossuth utca 12.', 25, 763),
(749, 'jegyen szereplő találkozó pont', 3, 764),
(750, 'jegyen szereplő találkozó pont', 3, 765),
(751, 'jegy szerinti helyszínen', 3, 766),
(752, 'Piac u. 4-6.', 13, 767),
(753, 'Széchenyi utca 4.', 20, 768),
(754, 'Hunyadi u. 1 - 3.', 13, 769),
(755, 'Temesvári krt. 33.', 26, 770),
(756, 'Március 15. tér 5.', 27, 771),
(757, 'több helyszínen', 10, 772),
(758, 'Fény u. 1.', 28, 773),
(759, 'Fény u. 1.', 28, 774),
(760, 'Budapesten és vonzáskörzetében', 3, 775),
(761, 'Vécsey Károly utca 20.', 24, 776),
(762, 'Vécsey Károly utca 20.', 24, 777),
(763, 'Tihany utca 1.', 29, 778),
(764, 'Rév utca 1.', 30, 779),
(765, 'Szentmihályi út 167-169.', 3, 780),
(766, 'Húszöles utca 27.', 31, 781),
(767, 'Több helyszínen', 31, 782),
(768, 'Több helyszínen', 31, 783),
(769, 'Több helyszínen', 3, 784),
(770, 'Több helyszínen', 3, 785),
(771, 'Állatkerti krt. 12/A', 3, 786),
(772, 'Több helyszínen', 3, 787),
(773, 'Több helyszínen', 3, 788),
(774, 'Templom u. 2-10.', 3, 789),
(775, 'Liszt Ferenc tér 8.', 3, 790),
(776, 'Több helyszínen', 3, 791),
(777, 'jegy szerinti találkozó pont', 3, 792),
(778, 'jegyen szereplő találkozó pont', 3, 793),
(779, 'jegyen szereplő találkozó pont', 3, 794),
(780, 'Fő tér 2.', 24, 795),
(781, 'Több helyszínen', 32, 796),
(782, 'Több helyszínen', 33, 797),
(783, 'Több helyszínen', 24, 798),
(784, 'Több helyszínen', 34, 799),
(785, 'Több helyszínen', 35, 800),
(786, 'jegy szerinti találkozó pont', 3, 801),
(787, 'jegyen szereplő találkozó pont', 3, 802),
(788, 'jegyen szereplő találkozó pont', 3, 803),
(789, 'jegyen szereplő találkozási pont', 3, 804),
(790, 'jegy szerinti találkozó pont', 3, 805),
(791, 'jegy szerinti találkozó pont', 3, 806),
(792, 'jegy szerinti találkozó pont', 3, 807),
(793, 'jegy szerinti találkozó pont', 3, 808),
(794, 'Több helyszínen', 3, 809),
(795, 'Úri utca 6.', 3, 810),
(796, 'Döbrentei utca 9.', 3, 811),
(797, 'Több helyszínen', 27, 812),
(798, 'több helyszínen', 36, 813),
(799, 'Több helyszínen', 13, 814),
(800, 'Több helyszínen', 37, 815),
(801, 'több helyszínen', 18, 816),
(802, 'Több helyszínen', 19, 817),
(803, 'Több helyszínen', 38, 818),
(804, 'Több helyszínen', 39, 819),
(805, 'Több helyszínen', 40, 820),
(806, 'Több helyszínen', 41, 821),
(807, 'jegyen szereplő találkozó pont', 3, 822),
(808, 'Szent István tér 1.', 3, 823),
(809, 'Hollán Ernő u 7.', 3, 824),
(810, 'Több településen és helyszínen', 3, 825),
(811, 'Több helyszínen', 3, 826),
(812, 'Krisztina körút 83-85.', 3, 827),
(813, 'Batthyány u. 67.', 3, 828),
(814, 'Több településen és helyszínen', 3, 829),
(815, 'Piac u. 4-6.', 13, 830),
(816, 'Több településen és helyszínen', 13, 831),
(817, 'Úri utca 6.', 3, 832),
(818, 'Iskola utca 28.', 3, 833),
(819, 'Döbrentei utca 9.', 3, 834),
(820, 'Szentmihályi út 167-169.', 3, 835),
(821, 'Kossuth u. 7.', 1, 836),
(822, 'Komakút tér 3.', 9, 837),
(823, 'Kossuth út 3.', 42, 838),
(824, 'Szent László út 9.', 42, 839),
(825, 'Mátyás király út 24.', 3, 840),
(826, 'Mátyás király út 24.', 3, 841),
(827, 'Nincs megadva', 43, 842),
(828, 'Nincs megadva', 37, 843),
(829, 'Jókai u. 6.', 3, 844),
(830, 'Károly körút 3/A', 3, 845),
(831, 'Liszt Ferenc tér 8.', 3, 846),
(832, 'Nincs megadva', 13, 847),
(833, 'Komor Marcell u. 1.', 3, 848),
(834, 'Fő u. 8.', 4, 849),
(835, 'Jurányi u. 1.', 3, 850),
(836, 'Több helyszínen', 43, 851),
(837, 'Fő tér 2.', 24, 852),
(838, 'Több településen és helyszínen', 24, 853),
(839, 'Kossuth utca 12.', 25, 854),
(840, 'Széchenyi utca 4.', 20, 855),
(841, 'Hunyadi u. 1 - 3.', 13, 856),
(842, 'Temesvári krt. 33.', 26, 857),
(843, 'Március 15. tér 5.', 27, 858),
(844, 'Több helyszínen', 27, 859),
(845, 'több településen és helyszínen', 27, 860),
(846, 'Brüll Alfréd utca 2.', 3, 861),
(847, 'Petőfi tér 10.', 13, 862),
(848, 'Budapesten és vonzáskörzetében', 3, 863),
(849, 'több helyszínen', 3, 864),
(850, 'Több helyszínen', 44, 865),
(851, 'Szentmihályi út 167-169.', 3, 866),
(852, 'Szentmihályi út 167-169.', 3, 867),
(853, 'Szentmihályi út 167-169.', 3, 868),
(854, 'Húszöles utca 27.', 31, 869),
(855, 'Húszöles utca 27.', 31, 870),
(856, 'Kossuth Lajos u. 7.', 1, 871),
(857, 'Jókai u. 6.', 3, 872),
(858, 'Andrássy út 69.', 3, 873),
(859, 'Több helyszínen', 3, 874),
(860, 'Ady Endre u. 1.', 13, 875),
(861, 'Illés utca 25.', 3, 876),
(862, 'Andrássy út 22.', 3, 877),
(863, 'Kárpát utca 23-25.', 3, 878),
(864, 'Komor Marcell u. 1.', 3, 879),
(865, 'Több településen és helyszínen', 3, 880),
(866, 'Jókai tér 10.', 3, 881),
(867, 'jegyen szereplő találkozó pont', 3, 882),
(868, 'Nyugati tér 7.', 3, 883),
(869, 'Jagelló u. 1-3.', 3, 884),
(870, 'Kőlyuk út 2.', 10, 885),
(871, 'Tavasz utca 13.', 5, 886),
(872, 'Carl Lutz rkp. XIII/19.', 3, 887),
(873, 'Szent István út 8.', 37, 888),
(874, 'Szent István út 8.', 37, 889),
(875, 'Petőfi u. 1.', 15, 890),
(876, 'Állatkerti krt. 14-16.', 3, 891),
(877, 'jegy szerinti találkozó pont', 3, 892),
(878, 'Rákóczi utca 16-18.', 45, 893),
(879, 'Part u. 5.', 1, 894),
(880, 'Több helyszínen', 1, 895),
(881, 'Wesselényi Strand főbejárat', 6, 896),
(882, 'Arany János utca 4.', 46, 897),
(883, 'Fenyőharaszt Kastélyszálló', 47, 898),
(884, 'Fáklya utca 4.', 48, 899),
(885, 'Fáklya utca 4.', 48, 900),
(886, 'Több településen és helyszínen', 48, 901),
(887, 'Színház u. 2.', 49, 902),
(888, 'jegy szerinti találkozó pont', 3, 903),
(889, 'jegyen szereplő találkozó pont', 3, 904),
(890, 'Jagelló u. 1-3.', 3, 905),
(891, 'Brüll Alfréd utca 2.', 3, 906),
(892, 'Tavasz utca 13.', 5, 907),
(893, 'Anna utca 5-7.', 3, 908),
(894, 'Ybl Miklós tér 2-6.', 3, 909),
(895, 'Felső Tisza-part 2.', 26, 910),
(896, 'Arany János utca 29.', 3, 911),
(897, 'Batthyány utca 1-7.', 32, 912),
(898, 'Petőfi tér 10.', 13, 913),
(899, 'Budapesten és vonzáskörzetében', 3, 914),
(900, 'Húszöles utca 27.', 31, 915),
(901, 'Több településen és helyszínen', 3, 916),
(902, 'Több kerületben és helyszínen', 3, 917),
(903, 'Több helyszínen', 48, 918),
(904, 'Mézes sor 1.', 50, 919),
(905, 'Rákóczi utca 16-18.', 45, 920),
(906, 'Több helyszínen', 45, 921),
(907, 'Arany János u. 4.', 46, 922),
(908, 'Ybl Miklós tér 2-6.', 3, 923);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tipus`
--

CREATE TABLE `tipus` (
  `tipus_id` int(11) NOT NULL,
  `tipus_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tipus`
--

INSERT INTO `tipus` (`tipus_id`, `tipus_nev`) VALUES
(1, 'fesztiválok'),
(2, 'vásárok'),
(3, 'ünnepek'),
(4, 'szabadidő'),
(5, 'kulturális'),
(6, 'családi'),
(7, 'gasztronómiai'),
(8, 'rendezvények');

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
(1, 'Gyula'),
(2, 'Érd'),
(3, 'Budapest'),
(4, 'Székesfehérvár'),
(5, 'Pécs'),
(6, 'Balatonalmádi'),
(7, 'Balatonlelle'),
(8, 'Pomáz'),
(9, 'Veszprém'),
(10, 'Eger'),
(11, 'Halászi'),
(12, 'Mórahalom'),
(13, 'Debrecen'),
(14, 'Szerencs'),
(15, 'Káptalantóti'),
(16, 'Hatvan'),
(17, 'Nemesvámos'),
(18, 'Miskolc'),
(19, 'Makó'),
(20, 'Békéscsaba'),
(21, 'Csabrendek'),
(22, 'Dunavecse'),
(23, 'Bátonyterenye'),
(24, 'Siófok'),
(25, 'Gárdony'),
(26, 'Szeged'),
(27, 'Szombathely'),
(28, 'Dobogókő'),
(29, 'Szántód'),
(30, 'Tihany'),
(31, 'Tiszafüred'),
(32, 'Kecskemét'),
(33, 'Keszthely'),
(34, 'Balatonfüred'),
(35, 'Zalakaros'),
(36, 'Salgótarján'),
(37, 'Győr'),
(38, 'Dombóvár'),
(39, 'Balatonboglár'),
(40, 'Oroszlány'),
(41, 'Zsámbék'),
(42, 'Szomolya'),
(43, 'Budaörs'),
(44, 'Kaposvár'),
(45, 'Hévíz'),
(46, 'Mór'),
(47, 'Verseg'),
(48, 'Tata'),
(49, 'Nyíregyháza'),
(50, 'Monor');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `esemeny`
--
ALTER TABLE `esemeny`
  ADD PRIMARY KEY (`id`),
  ADD KEY `helyszin` (`varosid`),
  ADD KEY `tipusid` (`tipusid`);

--
-- A tábla indexei `helyszin`
--
ALTER TABLE `helyszin`
  ADD PRIMARY KEY (`helyszin_id`),
  ADD KEY `varosid` (`varosid`),
  ADD KEY `esemenyid` (`esemenyid`);

--
-- A tábla indexei `tipus`
--
ALTER TABLE `tipus`
  ADD PRIMARY KEY (`tipus_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=924;

--
-- AUTO_INCREMENT a táblához `helyszin`
--
ALTER TABLE `helyszin`
  MODIFY `helyszin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=909;

--
-- AUTO_INCREMENT a táblához `tipus`
--
ALTER TABLE `tipus`
  MODIFY `tipus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `varos`
--
ALTER TABLE `varos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `esemeny`
--
ALTER TABLE `esemeny`
  ADD CONSTRAINT `esemeny_ibfk_1` FOREIGN KEY (`varosid`) REFERENCES `varos` (`id`),
  ADD CONSTRAINT `esemeny_ibfk_2` FOREIGN KEY (`tipusid`) REFERENCES `tipus` (`tipus_id`);

--
-- Megkötések a táblához `helyszin`
--
ALTER TABLE `helyszin`
  ADD CONSTRAINT `helyszin_ibfk_1` FOREIGN KEY (`varosid`) REFERENCES `varos` (`id`),
  ADD CONSTRAINT `helyszin_ibfk_2` FOREIGN KEY (`esemenyid`) REFERENCES `esemeny` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
