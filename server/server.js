const fs = require('fs');
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Arthur:TuCroisQueJeTaiPasVu@clearfashion.ljwkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

let products = [
    {
      "link": "undefined",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "6e789c0a-7055-5ec6-b18e-e2285ddabdb5"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4217-manteau-technique-elon-1300000262576.html",
      "brand": "adresse",
      "name": "Imperm�able Elon Crossover",
      "price": 449,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d773eb8a-9a5b-5acd-8076-cb39b2101e2c"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4519-gilet-warren-sans-manche-3701480706266.html",
      "brand": "adresse",
      "name": "Gilet sans manches Warren r�versible",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ab74790b-d5b7-541b-87d4-fe7116adf317"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4502-coach-jacket-billy-warm-3701480706365.html",
      "brand": "adresse",
      "name": "Coach jacket Billy Warm",
      "price": 265,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a5068272-07b2-5bb7-b1e0-78fb472ef836"
    },
    {
      "link": "https://adresse.paris/accessoires/4529-bonnet-roy-3701480706648.html",
      "brand": "adresse",
      "name": "Bonnet Roy vert",
      "price": 50,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "2a0df48e-7b9e-5f5a-ac45-61ee6776f833"
    },
    {
      "link": "https://adresse.paris/pantalons/4250-chinos-thomas-1300000265812.html",
      "brand": "adresse",
      "name": "Chino Thomas beige",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c4ce3dda-a66b-541f-923a-0246d044e977"
    },
    {
      "link": "https://adresse.paris/chemises/4513-odeon-flanelle-coton-ea-3701480705634.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle grise",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "3e4241c2-241b-56ee-b308-89868038454a"
    },
    {
      "link": "https://adresse.paris/home/3968-blouson-gallion-1300000257800.html",
      "brand": "adresse",
      "name": "Teddy Gallion taupe",
      "price": 169,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "448b251e-e77e-5526-9a74-343c22a8bf10"
    },
    {
      "link": "https://adresse.paris/accessoires/4530-bonnet-roy-3701480706631.html",
      "brand": "adresse",
      "name": "Bonnet Roy bordeaux",
      "price": 50,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d52d1995-3887-5ebe-b041-c23cc8f983a7"
    },
    {
      "link": "undefined",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "6e789c0a-7055-5ec6-b18e-e2285ddabdb5"
    },
    {
      "link": "https://adresse.paris/chemises/4531-sur-chemise-menilmontant-3701480706211.html",
      "brand": "adresse",
      "name": "Sur-chemise Menilmontant rouge",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1e37ef50-5f24-5dea-b2a5-a893dbfa3073"
    },
    {
      "link": "https://adresse.paris/chaussettes-bonnets/4427-chaussettes-anglet-3701480704194.html",
      "brand": "adresse",
      "name": "Chaussettes Anglet motifs �cailles \"Seigaiha\" � l'unit�",
      "price": 9,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "356d9498-4f1f-5d6a-917e-933b3f4a5dd2"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4185-t-shirt-valdes-1300000259675.html",
      "brand": "adresse",
      "name": "T-shirt Valdes blanc et bleu",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "56f2f57e-c0fc-53ac-a3c9-ac0f41ad3bb6"
    },
    {
      "link": "https://adresse.paris/pantalons/4370-chinos-thomas-3701480700134.html",
      "brand": "adresse",
      "name": "Chino Thomas camel",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ed784bf9-9733-5cda-929b-5a12e03e898d"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4518-gilet-warren-sans-manches-3701480706310.html",
      "brand": "adresse",
      "name": "Gilet sans manches Warren r�versible",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5081e9d8-2b4d-52ad-8eda-e7ebb8adde8d"
    },
    {
      "link": "https://adresse.paris/chemises/4532-sur-chemise-menilmontant-3701480706167.html",
      "brand": "adresse",
      "name": "Sur-chemise Menilmontant jaune",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "07a53e24-a305-5220-aef7-6c4dfb4599fa"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4478-sweats-jaures-3701480704583.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s moutarde",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "62360eae-0a42-5761-b909-aeedfd9d7b9f"
    },
    {
      "link": "https://adresse.paris/pantalons/4369-chinos-thomas-3701480700257.html",
      "brand": "adresse",
      "name": "Chino Thomas gris",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c4797aee-69bc-548d-9f52-127c7bc85fb3"
    },
    {
      "link": "https://adresse.paris/pantalons/4246-chinos-thomas-1300000266291.html",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "54f8e179-af1d-5f8a-b0dd-c602c12f0efe"
    },
    {
      "link": "https://adresse.paris/pantalons/4368-chinos-thomas-3701480700370.html",
      "brand": "adresse",
      "name": "Chino Thomas gris bleu",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "70dcfa81-814d-5d34-af6d-e6b00826b7b8"
    },
    {
      "link": "https://adresse.paris/pantalons/4245-chinos-thomas-1300000266413.html",
      "brand": "adresse",
      "name": "Chino Thomas noir",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ee3f1cc5-bfa3-510b-a585-29be05ea6ba4"
    },
    {
      "name": "Gilet sans manches Warren r�versible",
      "link": "https://adresse.paris/manteaux-et-blousons/4420-gilet-warren-reversible-3701480703173.html",
      "brand": "adresse",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "e9e289c7-cb9a-505f-b059-beda9dfc22f4"
    },
    {
      "link": "https://adresse.paris/pantalons/4127-jean-tight-elasthane-ubranded-1300000260534.html",
      "brand": "adresse",
      "name": "Jean Unbranded Noir 99% coton",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6c6ce884-8b86-5f27-b5cd-9a4e2513e08f"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4477-sweats-jaures-3701480704545.html",
      "brand": "adresse",
      "name": "Sweat Jaur�s kaki",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "387a4a8d-4ddf-55a0-b304-1e14bdf6ef52"
    },
    {
      "link": "https://adresse.paris/home/3970-blouson-gallion-1300000257688.html",
      "brand": "adresse",
      "name": "Teddy Gallion beige",
      "price": 169,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f5225e1d-4610-58cf-8d3b-f602ea58dbb4"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3969-blouson-gallion-1300000257749.html",
      "brand": "adresse",
      "name": "Teddy Gallion kaki d�perlant",
      "price": 189,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f2329243-2044-57a7-b997-fc3570f10f27"
    },
    {
      "link": "https://adresse.paris/chemises/4215-chemise-odeon-recytech-1300000264648.html",
      "brand": "adresse",
      "name": "Chemise Od�on recytech rayures bleues",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "689c53ee-4e84-52bf-bbf3-987d14ddc637"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3895-t-shirt-villette-1300000238342.html",
      "brand": "adresse",
      "name": "T-shirt Villette gris",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "fa0c1030-8267-50ac-86c1-b6becca8528a"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4251-sweatshirt-jaures-1300000262088.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s � rayures marines",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1e5dd5a5-1846-56f7-b7e7-179db2c9b38e"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4317-t-shirt-villette-1300000282475.html",
      "brand": "adresse",
      "name": "T-shirt Villette kaki",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f2539628-4558-5d44-861b-6be700b36699"
    },
    {
      "link": "https://adresse.paris/chemises/4241-sur-chemise-roquette-1300000265768.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette kaki",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "22f84703-b7da-5e64-a86a-acda7e6afede"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4157-pull-a-col-rond-monceau-1300000257503.html",
      "brand": "adresse",
      "name": "Pull Monceau Sauge",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c7d39017-2cd9-5159-81ac-896506f39223"
    },
    {
      "link": "https://adresse.paris/chemises/4460-sur-chemise-roquette-3701480704088.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette marine",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "02e30632-b6b3-5938-89c3-f30146c8bf3c"
    },
    {
      "link": "https://adresse.paris/pantalons/4356-pantalon-phil-anthracite-1300000283625.html",
      "brand": "adresse",
      "name": "Pantalon Phil anthracite",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "12f9a1ea-4b5d-5bd0-b752-c8440d2e7b1d"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4177-manteau-soufflot-1300000258043.html",
      "brand": "adresse",
      "name": "Mackintosh Soufflot kaki",
      "price": 239,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "479285c1-582d-52bc-b3e8-95f09a50853d"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4236-saint-victor-merinos-1300000262392.html",
      "brand": "adresse",
      "name": "Pull Saint Victor vert",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b8a97244-d8a8-5cab-8443-4330c45765ea"
    },
    {
      "link": "https://adresse.paris/content/1-livraison",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "d689ff1a-2668-5382-a8fe-4874bd5adb27"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4235-blouson-supakitch-1300000266758.html",
      "brand": "adresse",
      "name": "Blouson polaire Seine ADRESSE x SupaKitch (collaboration)",
      "price": 219,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "adac8522-755f-54e2-8273-c577abf9e788"
    },
    {
      "link": "https://adresse.paris/accessoires/4474-echarpe-saint-sulpice-3701480705269.html",
      "brand": "adresse",
      "name": "Echarpe Saint-Sulpice bordeaux",
      "price": 65,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b49e224f-ab9c-5d5f-a7c6-9f37abad845e"
    },
    {
      "link": "https://adresse.paris/chemises/4514-odeon-flanelle-coton-ea-3701480705580.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle anthracite",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5977fc3b-3f32-55cb-b181-69a297fbaeb2"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4145-chemise-odeon-1300000256841.html",
      "brand": "adresse",
      "name": "Chemise Od�on bleue ciel",
      "price": 48,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1580b612-bd25-519d-b3f5-0364eebce36d"
    },
    {
      "link": "https://adresse.paris/pantalons/4487-pantalon-fleming-warm-3701480704798.html",
      "brand": "adresse",
      "name": "Pantalon Fleming warm marine",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "238be6e3-ea56-5de0-bc07-a989f72ec0b9"
    },
    {
      "link": "https://adresse.paris/chemises/4357-chemise-chaillot-1300000283809.html",
      "brand": "adresse",
      "name": "Chemise Chaillot � rayures bleues",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "edfd29c4-d118-5d52-bd2b-c4add16ef41d"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3819-blouson-neil-1300000256209.html",
      "brand": "adresse",
      "name": "Blouson Neil",
      "price": 299,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "871c18a0-6884-5a41-aa0c-a51957f485ce"
    },
    {
      "link": "https://adresse.paris/home/3889-blouson-tolbiac-1300000248501.html",
      "brand": "adresse",
      "name": "Veste Tolbiac",
      "price": 179,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "55481c82-22d7-54cd-a045-74e044c7121a"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4393-t-shirt-valdes-3701480702077.html",
      "brand": "adresse",
      "name": "T-shirt Valdes blanc et vert",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "dcd39f77-c6b7-50c9-b3c0-ed9b3dde5a8a"
    },
    {
      "link": "https://adresse.paris/chemises/4527-chemise-odeon-en-flanelle-3701480705801.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle grise",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a506fe7e-7a79-5347-9863-3d88814099c8"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4429-t-shirt-saint-ouen-3701480703340.html",
      "brand": "adresse",
      "name": "T-shirt Saint-Ouen en coton � rayures anthracites",
      "price": 45,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "02db75ec-ee9c-594c-a04c-001aa9f8833e"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4354-sweatshirt-zippe-pernety-1300000283724.html",
      "brand": "adresse",
      "name": "Sweatshirt zipp� Pernety anthracite",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5410da74-4c11-59cf-98f0-b3aa3066de0c"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4428-t-shirt-saint-ouen-3701480702145.html#/79-taille_fastmag-m/818-couleur-rayures_grises_27",
      "brand": "adresse",
      "name": "T-shirt Saint-Ouen � fines rayures grises - RAYURES...",
      "price": 45,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b6a78f24-8eee-5637-bf2d-89ff2e120e81"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3980-t-shirt-jasmin-1300000259132.html",
      "brand": "adresse",
      "name": "Sweatshirt Jasmin noir",
      "price": 59,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "3bba7fc3-5fec-5db3-a293-ec9d3256f07f"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4293-jaures-hokusai-1300000266635.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s Hokusai gris",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "af2d0c07-d8b1-5295-8642-aa890410ef6e"
    },
    {
      "link": "https://adresse.paris/chemises/4242-sur-chemise-roquette-1300000265713.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette cuivre",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "01c76640-866e-5354-bc5a-817f354222db"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3894-t-shirt-villette-1300000238403.html",
      "brand": "adresse",
      "name": "T-shirt Villette marine",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b415f667-1865-529a-bff0-b956fa61bdbe"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4333-sweatshirt-love-velo-1300000266949.html",
      "brand": "adresse",
      "name": "Sweatshirt Love Velo",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "71166ad0-31cf-5cda-98c5-58595c8d62db"
    },
    {
      "link": "https://adresse.paris/chemises/4349-sur-chemise-roquette-1300000283229.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette bleue",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d233f4be-b04f-5ce2-ade4-0a3508536ce4"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4318-t-shirt-villette-1300000282413.html",
      "brand": "adresse",
      "name": "T-shirt Villette anthracite chine",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "3490df98-a535-5acd-b4a9-b8adbabd9cfb"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3897-t-shirt-villette-1300000238229.html",
      "brand": "adresse",
      "name": "T-shirt Villette blanc",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "17ff38a2-a92d-5bf4-ae79-352b48867918"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4476-pull-monceau-merinos-3701480705085.html",
      "brand": "adresse",
      "name": "Pull Monceau marine",
      "price": 90,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "55785b0d-d6cc-543c-850a-9bf59f9243e7"
    },
    {
      "link": "https://adresse.paris/pantalons/4488-pantalon-fleming-warm-3701480704743.html",
      "brand": "adresse",
      "name": "Pantalon Fleming warm gris",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c2eb140d-a04f-5bde-9def-ba9ff3a53123"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4430-t-shirt-bel-air-3701480702206.html",
      "brand": "adresse",
      "name": "T-shirt Bel Air en coton � rayures bleues",
      "price": 45,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "16448864-4f54-5c37-9941-123843ecde05"
    },
    {
      "link": "https://adresse.paris/pantalons/3986-jean-tight-fit-ubranded-401-0000000125925.html",
      "brand": "adresse",
      "name": "Jean Unbranded Brut 100% coton",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c61e727e-7f05-5c10-ba02-dde366c3d193"
    },
    {
      "link": "https://adresse.paris/accessoires/4472-echarpe-saint-sulpice-3701480705283.html",
      "brand": "adresse",
      "name": "Echarpe Saint-Sulpice verte",
      "price": 65,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6935d21d-c7bf-5fe2-95f3-82d46cbc1221"
    },
    {
      "link": "https://adresse.paris/chemises/4218-chemise-solferino-1300000265041.html",
      "brand": "adresse",
      "name": "Chemise Solferino infroissable rayures grises",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a0f4ede8-3529-510a-a1f2-04c35d958ae2"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4238-t-shirt-ranelagh-1300000262026.html",
      "brand": "adresse",
      "name": "T-shirt raglan Ranelagh gris chine",
      "price": 15,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c2545b43-b6b1-54cc-91a3-9ab979abf68e"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4189-t-shirt-hokusai-1300000261630.html",
      "brand": "adresse",
      "name": "T-shirt Hokusai marine",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "280ffb3a-2b9d-5c8a-ab78-6e62c86466e7"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3972-pull-vincennes-1300000257442.html",
      "brand": "adresse",
      "name": "Pull Vincennes kaki",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c6fc9301-1557-5b24-8caa-9961bdebda70"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4446-saint-victor-merinos-3701480705306.html",
      "brand": "adresse",
      "name": "Pull Saint Victor marine",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1a29a4be-c876-5b47-9245-a5aa4fefd7df"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4447-saint-victor-merinos-3701480705382.html",
      "brand": "adresse",
      "name": "Pull Saint Victor bordeaux",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f4c34f55-f533-5c87-a3b4-ef9832f0a323"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4479-pull-arsenal-merinos-3701480705207.html",
      "brand": "adresse",
      "name": "Pull Arsenal vert",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "03b7c846-97be-52a0-bbdf-9e0ab77b4953"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3893-t-shirt-villette-1300000253550.html",
      "brand": "adresse",
      "name": "T-shirt Villette noir",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "8b318e4b-c82c-5a3e-8132-6c7992feb88a"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4432-t-shirt-jemmapes-3701480702770.html",
      "brand": "adresse",
      "name": "T-shirt Jemmapes en coton � rayures marines",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "4e849e3e-78ed-53e1-b488-34b07a806243"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4469-t-shirt-planete-3701480703609.html",
      "brand": "adresse",
      "name": "T-shirt broderie \"plan�te",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "eda02449-8764-5c37-a849-a18da8c762f5"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4220-jourdain-merinos-1300000262453.html",
      "brand": "adresse",
      "name": "Pull Jourdain marine",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "223037d8-1f9c-5c04-b3b3-29d9ba9cf692"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4468-t-shirt-planete-3701480703661.html",
      "brand": "adresse",
      "name": "T-shirt broderie \"plan�te",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "7160dc70-6aea-5a96-882e-86f96726e465"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4449-jourdain-merinos-3701480704941.html",
      "brand": "adresse",
      "name": "Pull Jourdain bordeaux",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6adf918b-ec2c-5e97-aa87-80978d42a781"
    },
    {
      "link": "https://adresse.paris/pantalons/4517-pantalon-fleming-basic-3701480704842.html",
      "brand": "adresse",
      "name": "Pantalon Fleming Basic beige",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6dce97d1-d9ae-5847-abb3-94419e3d2601"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4448-jourdain-merinos-3701480705016.html",
      "brand": "adresse",
      "name": "Pull Jourdain vert",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "299ec959-c948-5fd6-8e4b-6eee28e563e0"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4475-pull-monceau-merinos-3701480705146.html",
      "brand": "adresse",
      "name": "Pull Monceau vert",
      "price": 90,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "9a9eb2e3-6b7b-55a0-ab2f-d2307419a637"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4221-aligre-merinos-1300000262514.html",
      "brand": "adresse",
      "name": "Pull Aligre marine",
      "price": 115,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a9939270-77e6-5dbf-b6d3-6d18b38d1c1d"
    },
    {
      "link": "https://adresse.paris/pantalons/4355-pantalon-phil-1300000283670.html",
      "brand": "adresse",
      "name": "Pantalon Phil marine",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "205c014e-22ca-5223-9257-b0a7250973c7"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4198-pull-bicolore-gaite-1300000247764.html",
      "brand": "adresse",
      "name": "Pull fin et graphique Gait�",
      "price": 69,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d5a11469-d4f9-5dbd-b735-c0dd94b4a4eb"
    },
    {
      "link": "https://adresse.paris/pantalons/4227-pantalon-fleming-flex-1300000260671.html",
      "brand": "adresse",
      "name": "Pantalon Fleming Flex marine",
      "price": 129,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6c869623-0e79-5f36-95f3-43369d090a7a"
    },
    {
      "link": "https://adresse.paris/pantalons/4516-pantalon-fleming-basic-3701480704897.html",
      "brand": "adresse",
      "name": "Pantalon Fleming Basic bleu",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "16372c9c-838a-5561-a0cb-cb4a8e0c8fc6"
    },
    {
      "link": "https://adresse.paris/pantalons/3459-pantalon-fleming-warm-fortex-1300000251273.html",
      "brand": "adresse",
      "name": "Pantalon Fleming warm Fortex� marine",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d38e0b6d-4a25-5daf-a3f4-12b78e1c0f23"
    },
    {
      "link": "undefined",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "6e789c0a-7055-5ec6-b18e-e2285ddabdb5"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3965-manteau-sorbonne-en-laine-1300000248686.html",
      "brand": "adresse",
      "name": "Mackintosh Sorbonne",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "90f19300-7515-522d-a3b9-167bc6788abe"
    },
    {
      "link": "https://adresse.paris/pantalons/3395-jean-tight-elasthane-ubranded-1000000157130.html",
      "brand": "adresse",
      "name": "Jean Unbranded Brut 99% coton",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "66a06b34-f462-59e9-9daf-ab3244776c19"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3336-manteau-technique-elon-1300000245005.html",
      "brand": "adresse",
      "name": "Imperm�able Elon Crossover",
      "price": 449,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "790d61c5-0993-5d2b-bfed-8ea081860a85"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4379-henley-ambroise-pression-1300000282215.html",
      "brand": "adresse",
      "name": "Henley Ambroise marine chin� en coton",
      "price": 60,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "e9bb244a-712f-5236-8f59-564d8d769154"
    },
    {
      "link": "https://adresse.paris/accessoires/4473-echarpe-saint-sulpice-3701480705276.html",
      "brand": "adresse",
      "name": "Echarpe Saint-Sulpice marine",
      "price": 65,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "0a86efdd-454a-54d2-bfde-6125c9394438"
    },
    {
      "link": "https://adresse.paris/pantalons/4246-chinos-thomas-1300000266291.html",
      "brand": "adresse",
      "name": "Chino Thomas marine",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "54f8e179-af1d-5f8a-b0dd-c602c12f0efe"
    },
    {
      "link": "https://adresse.paris/chemises/4512-odeon-flanelle-coton-ea-3701480705689.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle marine",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b0db64b8-b417-5fc9-b823-b0289b0500b5"
    },
    {
      "link": "https://adresse.paris/chemises/4214-chemise-odeon-recytech-1300000264709.html",
      "brand": "adresse",
      "name": "Chemise Od�on recytech rayures vertes",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ed441f5b-25b6-50d7-b6e3-b76400602878"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3904-blouson-belleville-a-motifs-1300000248440.html",
      "brand": "adresse",
      "name": "Blouson Belleville x Fortex�",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ae7ee606-bbaa-5202-83c6-63d1a47c4793"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4147-chemise-charonne-blanche-1300000256964.html",
      "brand": "adresse",
      "name": "Chemise Charonne blanche",
      "price": 48,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b322ed7c-85f7-5bf8-8bf2-5cedf623dcc0"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4461-jaures-hokusai-3701480704491.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s Hokusai marine chine",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5a2e7e32-93b5-5038-be86-fcb6202fcefb"
    },
    {
      "link": "https://adresse.paris/derniere-chance/3477-veste-de-travail-gambetta-1300000248266.html",
      "brand": "adresse",
      "name": "Veste worker Gambetta d�perlante",
      "price": 49,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "7f210e97-9d59-54d7-8c48-0f7594b84d12"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4334-t-shirt-saint-martin-1300000262194.html",
      "brand": "adresse",
      "name": "T-shirt Saint-Martin gris",
      "price": 39,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "8ca29c16-945d-593c-be71-776da1918673"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4335-t-shirt-saint-martin-1300000262149.html",
      "brand": "adresse",
      "name": "T-shirt Saint-Martin",
      "price": 39,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a40ac564-7b1a-50e0-8ab3-81caafac6f84"
    },
    {
      "link": "https://adresse.paris/derniere-chance/3983-t-shirt-ranelagh-1300000259194.html",
      "brand": "adresse",
      "name": "T-shirt raglan Ranelagh bleu chine",
      "price": 18,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a5988480-4094-5558-a85d-0f631ce733ea"
    },
    {
      "link": "https://adresse.paris/derniere-chance/3982-t-shirt-ranelagh-1300000259255.html",
      "brand": "adresse",
      "name": "T-shirt raglan Ranelagh kaki",
      "price": 18,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "0cf8da4c-68fb-546c-bcb2-51cc3a1c56dc"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4338-t-shirt-love-velo-1300000266901.html",
      "brand": "adresse",
      "name": "T-shirt Love Velo bleu poilu",
      "price": 39,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "043df6a2-02a0-52d1-bcba-e05124ee24ff"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4193-t-shirt-hokusai-1300000261395.html",
      "brand": "adresse",
      "name": "T-shirt Hokusai Blanc",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "37c17912-28f9-5068-951f-1277edac11e5"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4470-t-shirt-planete-3701480703555.html",
      "brand": "adresse",
      "name": "T-shirt broderie \"plan�te",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "13adcd81-36af-5f64-aa04-80bc3c4a8b4b"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4244-belleville-laine-laminee-1300000263627.html",
      "brand": "adresse",
      "name": "Teddy Belleville caramel",
      "price": 215,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "25f3263f-df9d-5be3-a759-7e63f15eecde"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4243-belleville-laine-laminee-1300000263689.html",
      "brand": "adresse",
      "name": "Teddy Belleville vert",
      "price": 188,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6ea31af3-84b4-51fc-b0ad-a4fec6907b0b"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4353-sweatshirt-zippe-pernety-1300000283762.html",
      "brand": "adresse",
      "name": "Sweatshirt zipp� Pernety marine",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b1d68bea-da63-5375-a21e-ba3b88d26e4e"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3981-t-shirt-jasmin-1300000259071.html",
      "brand": "adresse",
      "name": "Sweatshirt Jasmin graphite",
      "price": 59,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "855585d5-a1a7-532c-85c2-a09cc73a58d0"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4376-jaures-hokusai-3701480702398.html",
      "brand": "adresse",
      "name": "Sweat Jaur�s Hokusai noir",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d03dc14c-6eb3-5706-b21c-ea0126699c4a"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4292-jaures-hokusai-1300000282376.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s marine",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1bee6524-9053-54f5-8123-29a2ea771342"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4294-jaures-hokusai-1300000266598.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s Hokusai bordeaux",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "dc158b34-76ac-5bd7-80bd-b234263e19b6"
    },
    {
      "link": "https://adresse.paris/chemises/4348-sur-chemise-roquette-1300000283274.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette camel",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "87a3b8c0-9068-5e69-8605-24cc30f7381e"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3973-pull-vincennes-1300000257381.html",
      "brand": "adresse",
      "name": "Pull Vincennes �cru",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "7e016b95-01d3-514a-8c8f-8746f448d6eb"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4237-saint-victor-merinos-1300000262323.html",
      "brand": "adresse",
      "name": "Pull Saint Victor caramel",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "0c6bbad4-75ea-5222-b24c-e8cd173897f4"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3919-pull-a-col-rond-monceau-1300000247948.html",
      "brand": "adresse",
      "name": "Pull Monceau Ecru",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d88e54aa-f7bf-5098-8ee8-f5a460d30c7f"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3918-pull-a-col-rond-monceau-1300000248006.html",
      "brand": "adresse",
      "name": "Pull Monceau Gris",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a44abd25-3996-5ee5-b941-b78592fa8247"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4199-pull-bicolore-gaite-1300000247702.html",
      "brand": "adresse",
      "name": "Pull bicolore Gaite marine �cru",
      "price": 69,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "8df749c0-3197-5ad2-94b7-c6146b3ee439"
    },
    {
      "link": "https://adresse.paris/derniere-chance/3827-manteau-europe-1300000251334.html",
      "brand": "adresse",
      "name": "Manteau Europe",
      "price": 74,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f96abe2e-9d73-5da8-9300-89772fddc676"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4255-sorbonne-laine-laminee-1300000263801.html",
      "brand": "adresse",
      "name": "Mackintosh Sorbonne vert",
      "price": 224,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "18d27105-7aed-5635-b5fd-e59b794e09d5"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4256-sorbonne-laine-laminee-1300000263740.html",
      "brand": "adresse",
      "name": "Mackintosh Sorbonne caramel",
      "price": 209,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "fe95acfa-7a7b-5344-9698-ae50a87c28a7"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3926-manteau-sorbonne-en-laine-1300000251099.html",
      "brand": "adresse",
      "name": "Mackintosh Sorbonne marine",
      "price": 259,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5de687bb-e19e-59df-b8bf-5943dd21149d"
    },
    {
      "link": "https://adresse.paris/chaussettes-bonnets/3822-echarpe-garibaldi-bicolore-1300000253642.html",
      "brand": "adresse",
      "name": "Echarpe Garibaldi �crue",
      "price": 44,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6a0170e9-235c-5d3b-a46d-4210b8542ed4"
    },
    {
      "link": "https://adresse.paris/chemises/4216-chemise-odeon-recytech-1300000264587.html",
      "brand": "adresse",
      "name": "Chemise Od�on recytech blanche",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "9eb9ba30-30c1-590b-a889-360a78f902b3"
    },
    {
      "link": "https://adresse.paris/chemises/4219-chemise-charonne-tech-1300000265102.html",
      "brand": "adresse",
      "name": "Chemise Charonne recytech bleu chine",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1281832f-8856-56e3-a168-60aed98e814f"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4222-chemise-charonne-1300000265164.html",
      "brand": "adresse",
      "name": "Chemise Charonne marine",
      "price": 35,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b5443893-e85a-5041-b610-90a0b84471c3"
    },
    {
      "link": "https://adresse.paris/content/4-a-propos",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "65498594-110c-5897-af1b-3b186e1a50da"
    },
    {
      "link": "undefined",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "6e789c0a-7055-5ec6-b18e-e2285ddabdb5"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4217-manteau-technique-elon-1300000262576.html",
      "brand": "adresse",
      "name": "Imperm�able Elon Crossover",
      "price": 449,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d773eb8a-9a5b-5acd-8076-cb39b2101e2c"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4519-gilet-warren-sans-manche-3701480706266.html",
      "brand": "adresse",
      "name": "Gilet sans manches Warren r�versible",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ab74790b-d5b7-541b-87d4-fe7116adf317"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4502-coach-jacket-billy-warm-3701480706365.html",
      "brand": "adresse",
      "name": "Coach jacket Billy Warm",
      "price": 265,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a5068272-07b2-5bb7-b1e0-78fb472ef836"
    },
    {
      "link": "https://adresse.paris/accessoires/4529-bonnet-roy-3701480706648.html",
      "brand": "adresse",
      "name": "Bonnet Roy vert",
      "price": 50,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "2a0df48e-7b9e-5f5a-ac45-61ee6776f833"
    },
    {
      "link": "https://adresse.paris/pantalons/4250-chinos-thomas-1300000265812.html",
      "brand": "adresse",
      "name": "Chino Thomas beige",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c4ce3dda-a66b-541f-923a-0246d044e977"
    },
    {
      "link": "https://adresse.paris/chemises/4513-odeon-flanelle-coton-ea-3701480705634.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle grise",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "3e4241c2-241b-56ee-b308-89868038454a"
    },
    {
      "link": "https://adresse.paris/home/3968-blouson-gallion-1300000257800.html",
      "brand": "adresse",
      "name": "Teddy Gallion taupe",
      "price": 169,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "448b251e-e77e-5526-9a74-343c22a8bf10"
    },
    {
      "link": "https://adresse.paris/accessoires/4530-bonnet-roy-3701480706631.html",
      "brand": "adresse",
      "name": "Bonnet Roy bordeaux",
      "price": 50,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d52d1995-3887-5ebe-b041-c23cc8f983a7"
    },
    {
      "link": "undefined",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "6e789c0a-7055-5ec6-b18e-e2285ddabdb5"
    },
    {
      "link": "https://adresse.paris/chemises/4531-sur-chemise-menilmontant-3701480706211.html",
      "brand": "adresse",
      "name": "Sur-chemise Menilmontant rouge",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1e37ef50-5f24-5dea-b2a5-a893dbfa3073"
    },
    {
      "link": "https://adresse.paris/chaussettes-bonnets/4427-chaussettes-anglet-3701480704194.html",
      "brand": "adresse",
      "name": "Chaussettes Anglet motifs �cailles \"Seigaiha\" � l'unit�",
      "price": 9,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "356d9498-4f1f-5d6a-917e-933b3f4a5dd2"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4185-t-shirt-valdes-1300000259675.html",
      "brand": "adresse",
      "name": "T-shirt Valdes blanc et bleu",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "56f2f57e-c0fc-53ac-a3c9-ac0f41ad3bb6"
    },
    {
      "link": "https://adresse.paris/pantalons/4370-chinos-thomas-3701480700134.html",
      "brand": "adresse",
      "name": "Chino Thomas camel",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ed784bf9-9733-5cda-929b-5a12e03e898d"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4518-gilet-warren-sans-manches-3701480706310.html",
      "brand": "adresse",
      "name": "Gilet sans manches Warren r�versible",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5081e9d8-2b4d-52ad-8eda-e7ebb8adde8d"
    },
    {
      "link": "https://adresse.paris/chemises/4532-sur-chemise-menilmontant-3701480706167.html",
      "brand": "adresse",
      "name": "Sur-chemise Menilmontant jaune",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "07a53e24-a305-5220-aef7-6c4dfb4599fa"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4478-sweats-jaures-3701480704583.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s moutarde",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "62360eae-0a42-5761-b909-aeedfd9d7b9f"
    },
    {
      "link": "https://adresse.paris/pantalons/4369-chinos-thomas-3701480700257.html",
      "brand": "adresse",
      "name": "Chino Thomas gris",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c4797aee-69bc-548d-9f52-127c7bc85fb3"
    },
    {
      "link": "https://adresse.paris/pantalons/4246-chinos-thomas-1300000266291.html",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "54f8e179-af1d-5f8a-b0dd-c602c12f0efe"
    },
    {
      "link": "https://adresse.paris/pantalons/4368-chinos-thomas-3701480700370.html",
      "brand": "adresse",
      "name": "Chino Thomas gris bleu",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "70dcfa81-814d-5d34-af6d-e6b00826b7b8"
    },
    {
      "link": "https://adresse.paris/pantalons/4245-chinos-thomas-1300000266413.html",
      "brand": "adresse",
      "name": "Chino Thomas noir",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "ee3f1cc5-bfa3-510b-a585-29be05ea6ba4"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4420-gilet-warren-reversible-3701480703173.html",
      "brand": "adresse",
      "name": "Gilet sans manches Warren r�versible",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "e9e289c7-cb9a-505f-b059-beda9dfc22f4"
    },
    {
      "link": "https://adresse.paris/pantalons/4127-jean-tight-elasthane-ubranded-1300000260534.html",
      "brand": "adresse",
      "name": "Jean Unbranded Noir 99% coton",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6c6ce884-8b86-5f27-b5cd-9a4e2513e08f"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4477-sweats-jaures-3701480704545.html",
      "brand": "adresse",
      "name": "Sweat Jaur�s kaki",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "387a4a8d-4ddf-55a0-b304-1e14bdf6ef52"
    },
    {
      "link": "https://adresse.paris/home/3970-blouson-gallion-1300000257688.html",
      "brand": "adresse",
      "name": "Teddy Gallion beige",
      "price": 169,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f5225e1d-4610-58cf-8d3b-f602ea58dbb4"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3969-blouson-gallion-1300000257749.html",
      "brand": "adresse",
      "name": "Teddy Gallion kaki d�perlant",
      "price": 189,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f2329243-2044-57a7-b997-fc3570f10f27"
    },
    {
      "link": "https://adresse.paris/chemises/4215-chemise-odeon-recytech-1300000264648.html",
      "brand": "adresse",
      "name": "Chemise Od�on recytech rayures bleues",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "689c53ee-4e84-52bf-bbf3-987d14ddc637"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3895-t-shirt-villette-1300000238342.html",
      "brand": "adresse",
      "name": "T-shirt Villette gris",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "fa0c1030-8267-50ac-86c1-b6becca8528a"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4251-sweatshirt-jaures-1300000262088.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s � rayures marines",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1e5dd5a5-1846-56f7-b7e7-179db2c9b38e"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4317-t-shirt-villette-1300000282475.html",
      "brand": "adresse",
      "name": "T-shirt Villette kaki",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f2539628-4558-5d44-861b-6be700b36699"
    },
    {
      "link": "https://adresse.paris/chemises/4241-sur-chemise-roquette-1300000265768.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette kaki",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "22f84703-b7da-5e64-a86a-acda7e6afede"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4157-pull-a-col-rond-monceau-1300000257503.html",
      "brand": "adresse",
      "name": "Pull Monceau Sauge",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c7d39017-2cd9-5159-81ac-896506f39223"
    },
    {
      "link": "https://adresse.paris/chemises/4460-sur-chemise-roquette-3701480704088.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette marine",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "02e30632-b6b3-5938-89c3-f30146c8bf3c"
    },
    {
      "link": "https://adresse.paris/pantalons/4356-pantalon-phil-anthracite-1300000283625.html",
      "brand": "adresse",
      "name": "Pantalon Phil anthracite",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "12f9a1ea-4b5d-5bd0-b752-c8440d2e7b1d"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4177-manteau-soufflot-1300000258043.html",
      "brand": "adresse",
      "name": "Mackintosh Soufflot kaki",
      "price": 239,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "479285c1-582d-52bc-b3e8-95f09a50853d"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4236-saint-victor-merinos-1300000262392.html",
      "brand": "adresse",
      "name": "Pull Saint Victor vert",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b8a97244-d8a8-5cab-8443-4330c45765ea"
    },
    {
      "link": "https://adresse.paris/content/1-livraison",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "d689ff1a-2668-5382-a8fe-4874bd5adb27"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/4235-blouson-supakitch-1300000266758.html",
      "brand": "adresse",
      "name": "Blouson polaire Seine ADRESSE x SupaKitch (collaboration)",
      "price": 219,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "adac8522-755f-54e2-8273-c577abf9e788"
    },
    {
      "link": "https://adresse.paris/accessoires/4474-echarpe-saint-sulpice-3701480705269.html",
      "brand": "adresse",
      "name": "Echarpe Saint-Sulpice bordeaux",
      "price": 65,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b49e224f-ab9c-5d5f-a7c6-9f37abad845e"
    },
    {
      "link": "https://adresse.paris/chemises/4514-odeon-flanelle-coton-ea-3701480705580.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle anthracite",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5977fc3b-3f32-55cb-b181-69a297fbaeb2"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4145-chemise-odeon-1300000256841.html",
      "brand": "adresse",
      "name": "Chemise Od�on bleue ciel",
      "price": 48,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1580b612-bd25-519d-b3f5-0364eebce36d"
    },
    {
      "link": "https://adresse.paris/pantalons/4487-pantalon-fleming-warm-3701480704798.html",
      "brand": "adresse",
      "name": "Pantalon Fleming warm marine",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "238be6e3-ea56-5de0-bc07-a989f72ec0b9"
    },
    {
      "link": "https://adresse.paris/chemises/4357-chemise-chaillot-1300000283809.html",
      "brand": "adresse",
      "name": "Chemise Chaillot � rayures bleues",
      "price": 85,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "edfd29c4-d118-5d52-bd2b-c4add16ef41d"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3819-blouson-neil-1300000256209.html",
      "brand": "adresse",
      "name": "Blouson Neil",
      "price": 299,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "871c18a0-6884-5a41-aa0c-a51957f485ce"
    },
    {
      "link": "https://adresse.paris/home/3889-blouson-tolbiac-1300000248501.html",
      "brand": "adresse",
      "name": "Veste Tolbiac",
      "price": 179,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "55481c82-22d7-54cd-a045-74e044c7121a"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4393-t-shirt-valdes-3701480702077.html",
      "brand": "adresse",
      "name": "T-shirt Valdes blanc et vert",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "dcd39f77-c6b7-50c9-b3c0-ed9b3dde5a8a"
    },
    {
      "link": "https://adresse.paris/chemises/4527-chemise-odeon-en-flanelle-3701480705801.html",
      "brand": "adresse",
      "name": "Chemise Od�on en flanelle grise",
      "price": 95,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a506fe7e-7a79-5347-9863-3d88814099c8"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4429-t-shirt-saint-ouen-3701480703340.html",
      "brand": "adresse",
      "name": "T-shirt Saint-Ouen en coton � rayures anthracites",
      "price": 45,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "02db75ec-ee9c-594c-a04c-001aa9f8833e"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4354-sweatshirt-zippe-pernety-1300000283724.html",
      "brand": "adresse",
      "name": "Sweatshirt zipp� Pernety anthracite",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "5410da74-4c11-59cf-98f0-b3aa3066de0c"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4428-t-shirt-saint-ouen-3701480702145.html#/79-taille_fastmag-m/818-couleur-rayures_grises_27",
      "brand": "adresse",
      "name": "T-shirt Saint-Ouen � fines rayures grises - RAYURES...",
      "price": 45,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b6a78f24-8eee-5637-bf2d-89ff2e120e81"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3980-t-shirt-jasmin-1300000259132.html",
      "brand": "adresse",
      "name": "Sweatshirt Jasmin noir",
      "price": 59,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "3bba7fc3-5fec-5db3-a293-ec9d3256f07f"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4293-jaures-hokusai-1300000266635.html",
      "brand": "adresse",
      "name": "Sweatshirt Jaur�s Hokusai gris",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "af2d0c07-d8b1-5295-8642-aa890410ef6e"
    },
    {
      "link": "https://adresse.paris/chemises/4242-sur-chemise-roquette-1300000265713.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette cuivre",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "01c76640-866e-5354-bc5a-817f354222db"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3894-t-shirt-villette-1300000238403.html",
      "brand": "adresse",
      "name": "T-shirt Villette marine",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "b415f667-1865-529a-bff0-b956fa61bdbe"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4333-sweatshirt-love-velo-1300000266949.html",
      "brand": "adresse",
      "name": "Sweatshirt Love Velo",
      "price": 75,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "71166ad0-31cf-5cda-98c5-58595c8d62db"
    },
    {
      "link": "https://adresse.paris/chemises/4349-sur-chemise-roquette-1300000283229.html",
      "brand": "adresse",
      "name": "Sur-chemise Roquette bleue",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d233f4be-b04f-5ce2-ade4-0a3508536ce4"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4318-t-shirt-villette-1300000282413.html",
      "brand": "adresse",
      "name": "T-shirt Villette anthracite chine",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "3490df98-a535-5acd-b4a9-b8adbabd9cfb"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3897-t-shirt-villette-1300000238229.html",
      "brand": "adresse",
      "name": "T-shirt Villette blanc",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "17ff38a2-a92d-5bf4-ae79-352b48867918"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4476-pull-monceau-merinos-3701480705085.html",
      "brand": "adresse",
      "name": "Pull Monceau marine",
      "price": 90,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "55785b0d-d6cc-543c-850a-9bf59f9243e7"
    },
    {
      "link": "https://adresse.paris/pantalons/4488-pantalon-fleming-warm-3701480704743.html",
      "brand": "adresse",
      "name": "Pantalon Fleming warm gris",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c2eb140d-a04f-5bde-9def-ba9ff3a53123"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4430-t-shirt-bel-air-3701480702206.html",
      "brand": "adresse",
      "name": "T-shirt Bel Air en coton � rayures bleues",
      "price": 45,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "16448864-4f54-5c37-9941-123843ecde05"
    },
    {
      "link": "https://adresse.paris/pantalons/3986-jean-tight-fit-ubranded-401-0000000125925.html",
      "brand": "adresse",
      "name": "Jean Unbranded Brut 100% coton",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c61e727e-7f05-5c10-ba02-dde366c3d193"
    },
    {
      "link": "https://adresse.paris/accessoires/4472-echarpe-saint-sulpice-3701480705283.html",
      "brand": "adresse",
      "name": "Echarpe Saint-Sulpice verte",
      "price": 65,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6935d21d-c7bf-5fe2-95f3-82d46cbc1221"
    },
    {
      "link": "https://adresse.paris/chemises/4218-chemise-solferino-1300000265041.html",
      "brand": "adresse",
      "name": "Chemise Solferino infroissable rayures grises",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a0f4ede8-3529-510a-a1f2-04c35d958ae2"
    },
    {
      "link": "https://adresse.paris/derniere-chance/4238-t-shirt-ranelagh-1300000262026.html",
      "brand": "adresse",
      "name": "T-shirt raglan Ranelagh gris chine",
      "price": 15,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c2545b43-b6b1-54cc-91a3-9ab979abf68e"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4189-t-shirt-hokusai-1300000261630.html",
      "brand": "adresse",
      "name": "T-shirt Hokusai marine",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "280ffb3a-2b9d-5c8a-ab78-6e62c86466e7"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/3972-pull-vincennes-1300000257442.html",
      "brand": "adresse",
      "name": "Pull Vincennes kaki",
      "price": 79,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "c6fc9301-1557-5b24-8caa-9961bdebda70"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4446-saint-victor-merinos-3701480705306.html",
      "brand": "adresse",
      "name": "Pull Saint Victor marine",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "1a29a4be-c876-5b47-9245-a5aa4fefd7df"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4447-saint-victor-merinos-3701480705382.html",
      "brand": "adresse",
      "name": "Pull Saint Victor bordeaux",
      "price": 110,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "f4c34f55-f533-5c87-a3b4-ef9832f0a323"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4479-pull-arsenal-merinos-3701480705207.html",
      "brand": "adresse",
      "name": "Pull Arsenal vert",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "03b7c846-97be-52a0-bbdf-9e0ab77b4953"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/3893-t-shirt-villette-1300000253550.html",
      "brand": "adresse",
      "name": "T-shirt Villette noir",
      "price": 30,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "8b318e4b-c82c-5a3e-8132-6c7992feb88a"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4432-t-shirt-jemmapes-3701480702770.html",
      "brand": "adresse",
      "name": "T-shirt Jemmapes en coton � rayures marines",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "4e849e3e-78ed-53e1-b488-34b07a806243"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4469-t-shirt-planete-3701480703609.html",
      "brand": "adresse",
      "name": "T-shirt broderie \"plan�te",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "eda02449-8764-5c37-a849-a18da8c762f5"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4220-jourdain-merinos-1300000262453.html",
      "brand": "adresse",
      "name": "Pull Jourdain marine",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "223037d8-1f9c-5c04-b3b3-29d9ba9cf692"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4468-t-shirt-planete-3701480703661.html",
      "brand": "adresse",
      "name": "T-shirt broderie \"plan�te",
      "price": 40,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "7160dc70-6aea-5a96-882e-86f96726e465"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4449-jourdain-merinos-3701480704941.html",
      "brand": "adresse",
      "name": "Pull Jourdain bordeaux",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6adf918b-ec2c-5e97-aa87-80978d42a781"
    },
    {
      "link": "https://adresse.paris/pantalons/4517-pantalon-fleming-basic-3701480704842.html",
      "brand": "adresse",
      "name": "Pantalon Fleming Basic beige",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6dce97d1-d9ae-5847-abb3-94419e3d2601"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4448-jourdain-merinos-3701480705016.html",
      "brand": "adresse",
      "name": "Pull Jourdain vert",
      "price": 125,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "299ec959-c948-5fd6-8e4b-6eee28e563e0"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4475-pull-monceau-merinos-3701480705146.html",
      "brand": "adresse",
      "name": "Pull Monceau vert",
      "price": 90,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "9a9eb2e3-6b7b-55a0-ab2f-d2307419a637"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4221-aligre-merinos-1300000262514.html",
      "brand": "adresse",
      "name": "Pull Aligre marine",
      "price": 115,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "a9939270-77e6-5dbf-b6d3-6d18b38d1c1d"
    },
    {
      "link": "https://adresse.paris/pantalons/4355-pantalon-phil-1300000283670.html",
      "brand": "adresse",
      "name": "Pantalon Phil marine",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "205c014e-22ca-5223-9257-b0a7250973c7"
    },
    {
      "link": "https://adresse.paris/pulls-et-sweatshirts/4198-pull-bicolore-gaite-1300000247764.html",
      "brand": "adresse",
      "name": "Pull fin et graphique Gait�",
      "price": 69,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d5a11469-d4f9-5dbd-b735-c0dd94b4a4eb"
    },
    {
      "link": "https://adresse.paris/pantalons/4227-pantalon-fleming-flex-1300000260671.html",
      "brand": "adresse",
      "name": "Pantalon Fleming Flex marine",
      "price": 129,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "6c869623-0e79-5f36-95f3-43369d090a7a"
    },
    {
      "link": "https://adresse.paris/pantalons/4516-pantalon-fleming-basic-3701480704897.html",
      "brand": "adresse",
      "name": "Pantalon Fleming Basic bleu",
      "price": 99,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "16372c9c-838a-5561-a0cb-cb4a8e0c8fc6"
    },
    {
      "link": "https://adresse.paris/pantalons/3459-pantalon-fleming-warm-fortex-1300000251273.html",
      "brand": "adresse",
      "name": "Pantalon Fleming warm Fortex� marine",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "d38e0b6d-4a25-5daf-a3f4-12b78e1c0f23"
    },
    {
      "link": "undefined",
      "brand": "adresse",
      "name": "",
      "price": null,
      "_id": "6e789c0a-7055-5ec6-b18e-e2285ddabdb5"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3965-manteau-sorbonne-en-laine-1300000248686.html",
      "brand": "adresse",
      "name": "Mackintosh Sorbonne",
      "price": 199,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "90f19300-7515-522d-a3b9-167bc6788abe"
    },
    {
      "link": "https://adresse.paris/pantalons/3395-jean-tight-elasthane-ubranded-1000000157130.html",
      "brand": "adresse",
      "name": "Jean Unbranded Brut 99% coton",
      "price": 119,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "66a06b34-f462-59e9-9daf-ab3244776c19"
    },
    {
      "link": "https://adresse.paris/manteaux-et-blousons/3336-manteau-technique-elon-1300000245005.html",
      "brand": "adresse",
      "name": "Imperm�able Elon Crossover",
      "price": 449,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "790d61c5-0993-5d2b-bfed-8ea081860a85"
    },
    {
      "link": "https://adresse.paris/t-shirts-et-polos/4379-henley-ambroise-pression-1300000282215.html",
      "brand": "adresse",
      "name": "Henley Ambroise marine chin� en coton",
      "price": 60,
      "photo": "https://adresse.paris/themes/warehouse/img/blank.gif",
      "_id": "e9bb244a-712f-5236-8f59-564d8d769154"
    }
  ]
let collection=null;
let db=null;
 
const Connection = async()=>
{
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    db =  client.db(MONGODB_DB_NAME)
    await importData();
    //await productsOfABrand('dedicated');
    //await productsLessThanAprice(10);
    //await productsSortedByDate();
    //await productsSortedByPrice();
    //await productsScrapedLessThanTwoWeeksAgo();
	//await productsById("1418eebd-4f43-52a6-bd36-9f51406bea67");
    process.exit()   
}

const importData = async()=>
{
    const collection = db.collection('products')
    const result = collection.insertMany(products)
    console.log(result);    
}

const productsOfABrand = async(brand)=>
{
    collection = db.collection('products')
    const products = await collection.find({brand}).toArray();
    console.log(products);
}

const productsLessThanAprice = async(price)=>
{
    collection = db.collection('products')
    const products = await collection.find({price:{$lt:price}}).toArray();
    console.log(products);
}


const productsSortedByPrice = async()=>
{
    collection = db.collection('products')
    const products = await collection.find({}).sort({'price':1}).toArray();
    console.log(products);
}

const productsSortedByDate = async()=>
{
    collection = db.collection('products')
    const products = await collection.find({}).sort({"date":1}).toArray();
    console.log(products);
}

const productsScrapedLessThanTwoWeeksAgo=async()=>
{
    const date=Date.now()
    console.log(date)
    const products = await collection.aggregate([
        {$project:{'_id':1,'brand':1,'price':1,'name':1,'link':1,'photo':1,dateDifference: {$subtract: [ date, "$date" ] }}},
        {$match: {dateDifference:{$lt:1000000000000000000000000000000000}}}
    ]).toArray();
    console.log(products);
}

const productsById = async(id)=>
{
    collection = db.collection('products')
    const products = await collection.find({"_id":id}).toArray();
    console.log(products);
}


Connection();