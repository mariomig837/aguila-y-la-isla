/* ==========================================================
   El Águila y la Isla — datos de la colección
   ========================================================== */

const IMG = 'assets/img/';

/* Colección completa (galería filtrable + lightbox) */
window.COLECCION = [
  { id: 'san-bernardo', tipo: 'pintura', titulo: 'Bonaparte cruzando el Gran San Bernardo', autor: 'Jacques-Louis David', fecha: '1801', tecnica: 'Óleo sobre lienzo', sala: 'I', w: 1862, h: 2200,
    texto: 'El Primer Cónsul se representa sereno sobre un caballo encabritado, mientras sus nombres se graban en la roca junto a los de Aníbal y Carlomagno. Es la imagen que fundó el mito.' },
  { id: 'arcole', tipo: 'pintura', titulo: 'Bonaparte en el puente de Arcole', autor: 'Antoine-Jean Gros', fecha: '1801', tecnica: 'Óleo sobre lienzo', sala: 'I', w: 1357, h: 1926,
    texto: 'Gros captura al joven general de la campaña de Italia, con la bandera en la mano y la mirada vuelta hacia sus tropas: audacia convertida en icono.' },
  { id: 'jaffa', tipo: 'pintura', titulo: 'Bonaparte visitando a los apestados de Jaffa', autor: 'Antoine-Jean Gros', fecha: '1804', tecnica: 'Óleo sobre lienzo', sala: 'I', w: 2200, h: 1593,
    texto: 'Bajo las arcadas de una mezquita convertida en hospital, Bonaparte toca la herida de un soldado. Propaganda y pintura de historia se funden en un gesto casi taumatúrgico.' },
  { id: 'coronacion', tipo: 'pintura', titulo: 'La consagración del emperador Napoleón', autor: 'Jacques-Louis David', fecha: '1805–1807', tecnica: 'Óleo sobre lienzo', sala: 'II', w: 2200, h: 1384,
    texto: 'Notre-Dame, 2 de diciembre de 1804. David elige el instante en que Napoleón corona a Josefina, y convierte una ceremonia de Estado en un teatro de más de ciento cincuenta personajes.' },
  { id: 'trono-ingres', tipo: 'pintura', titulo: 'Napoleón I en su trono imperial', autor: 'Jean-Auguste-Dominique Ingres', fecha: '1806', tecnica: 'Óleo sobre lienzo', sala: 'II', w: 1339, h: 2200,
    texto: 'Frontal, hierático, casi bizantino. Ingres reúne el cetro de Carlos V, la mano de la justicia y el águila del Imperio en una imagen de poder absoluto.' },
  { id: 'gerard-sacre', tipo: 'pintura', titulo: 'Napoleón con los hábitos de la coronación', autor: 'François Gérard (detalle)', fecha: 'c. 1805', tecnica: 'Óleo sobre lienzo', sala: 'II', w: 1920, h: 1280,
    texto: 'El retrato oficial del emperador, replicado por el taller de Gérard para las cortes de Europa: laurel dorado, armiño y abejas bordadas.' },
  { id: 'tuileries', tipo: 'pintura', titulo: 'El emperador en su gabinete de las Tullerías', autor: 'Jacques-Louis David', fecha: '1812', tecnica: 'Óleo sobre lienzo', sala: 'II', w: 1319, h: 2200,
    texto: 'Las velas consumidas y el reloj que marca las 4:13 de la madrugada: el emperador no duerme, trabaja en el Código Civil. Un retrato del poder como disciplina.' },
  { id: 'josefina', tipo: 'pintura', titulo: 'La emperatriz Josefina en Malmaison', autor: 'Pierre-Paul Prud’hon', fecha: '1805–1809', tecnica: 'Óleo sobre lienzo', sala: 'III', w: 1644, h: 2200,
    texto: 'Recostada en una roca del parque de Malmaison, la emperatriz aparece melancólica y natural, lejos del protocolo de la corte.' },
  { id: 'recamier', tipo: 'pintura', titulo: 'Madame Récamier', autor: 'François Gérard', fecha: '1805', tecnica: 'Óleo sobre lienzo', sala: 'III', w: 1487, h: 2200,
    texto: 'La anfitriona más célebre del París consular. El vestido de muselina y el mobiliario a la antigua definen el gusto de toda una época.' },
  { id: 'reloj', tipo: 'objeto', titulo: 'Reloj de sobremesa con el emperador', autor: 'Jacques Nicolas Pierre François Dubuc', fecha: '1815–1819', tecnica: 'Bronce dorado al mercurio, esfera plateada', sala: 'III', w: 1650, h: 2200,
    texto: 'Bronce dorado al mercurio, águila coronando la esfera y una figura en pie: el estilo Imperio llevado al objeto doméstico.' },
  { id: 'sevres', tipo: 'objeto', titulo: 'Servicio egipcio de Sèvres', autor: 'Manufactura de Sèvres', fecha: '1810–1812', tecnica: 'Porcelana dura, oro', sala: 'III', w: 1920, h: 1440,
    texto: 'Nacido de la campaña de Egipto, este servicio monumental reproduce templos y obeliscos dibujados por Vivant Denon. La egiptomanía en la mesa imperial.' },
  { id: 'trono-fontainebleau', tipo: 'objeto', titulo: 'Sala del trono, Fontainebleau', autor: 'Jacob-Desmalter (atrib.)', fecha: '1804', tecnica: 'Madera tallada y dorada, terciopelo', sala: 'III', w: 1920, h: 1440,
    texto: 'Terciopelo carmesí, abejas doradas y la N imperial: el antiguo dormitorio real, convertido en el único salón del trono de Francia que se conserva intacto.' },
  { id: 'canova', tipo: 'escultura', titulo: 'Busto de Napoleón', autor: 'Antonio Canova', fecha: '1802–1822', tecnica: 'Mármol de Carrara', sala: 'II', w: 1293, h: 2200,
    texto: 'Canova idealiza los rasgos del emperador a la manera de un césar romano. El mármol fija para la eternidad un rostro de treinta y tres años.' },
  { id: 'bicornio', tipo: 'objeto', titulo: 'Bicornio del emperador', autor: 'Poupard & Cie, París', fecha: 'c. 1807', tecnica: 'Fieltro de castor, seda', sala: 'IV', w: 1920, h: 1280,
    texto: 'Lo llevaba «de costado», con los picos paralelos a los hombros, para ser reconocido en el campo de batalla. Una silueta convertida en firma.' },
  { id: 'moneda', tipo: 'objeto', titulo: '20 francos, Año XII', autor: 'Casa de la Moneda de París', fecha: '1803–1804', tecnica: 'Oro', sala: 'I', w: 1280, h: 663,
    texto: 'El napoleón de oro: la efigie del Primer Cónsul, todavía sin laurel, y el franco germinal que estabilizaría la economía francesa durante un siglo.' },
  { id: 'eylau', tipo: 'pintura', titulo: 'Napoleón en el campo de batalla de Eylau', autor: 'Antoine-Jean Gros', fecha: '1808', tecnica: 'Óleo sobre lienzo', sala: 'IV', w: 2200, h: 1575,
    texto: 'La nieve, los muertos en primer plano y un emperador que alza la mano con gesto de compasión. La gloria empieza a mostrar su precio.' },
  { id: 'campagne-1814', tipo: 'pintura', titulo: 'Campaña de Francia, 1814', autor: 'Ernest Meissonier', fecha: '1864', tecnica: 'Óleo sobre tabla', sala: 'IV', w: 1920, h: 1248,
    texto: 'El barro, el cielo plomizo y un estado mayor exhausto. Medio siglo después, Meissonier pinta la retirada como una elegía.' },
  { id: 'fontainebleau', tipo: 'pintura', titulo: 'Napoleón en Fontainebleau, 31 de marzo de 1814', autor: 'Paul Delaroche', fecha: '1845', tecnica: 'Óleo sobre lienzo', sala: 'IV', w: 1124, h: 1500,
    texto: 'Enlodado, despeinado, con la mirada perdida: la víspera de la abdicación. Delaroche despoja al emperador de toda pompa.' },
  { id: 'mascara', tipo: 'escultura', titulo: 'Máscara mortuoria de Napoleón', autor: 'Según Francesco Antommarchi', fecha: '1821', tecnica: 'Yeso', sala: 'IV', w: 1920, h: 2127,
    texto: 'Tomada en Santa Elena tras su muerte el 5 de mayo de 1821. Llegó a La Habana con el médico corso que le atendió en sus últimos días.' },
  { id: 'ossian', tipo: 'pintura', titulo: 'Osián recibe a los héroes franceses', autor: 'Anne-Louis Girodet', fecha: '1802', tecnica: 'Óleo sobre lienzo', sala: 'I', w: 1000, h: 1022,
    texto: 'Un sueño romántico encargado para Malmaison: los generales caídos de la República entran en el paraíso de los bardos celtas.' }
];

window.SALAS = [
  { num: 'I',   titulo: 'El Cónsul',   años: '1796 — 1804', img: 'arcole',       alt: 'san-bernardo', piezas: 5,
    texto: 'De Arcole a las pirámides: el ascenso de un general de veintisiete años.' },
  { num: 'II',  titulo: 'La Corona',   años: '1804 — 1812', img: 'trono-ingres', alt: 'tuileries',    piezas: 5,
    texto: 'Notre-Dame, el Código Civil y una nueva iconografía del poder.' },
  { num: 'III', titulo: 'La Corte',    años: '1804 — 1814', img: 'recamier',     alt: 'josefina',     piezas: 5,
    texto: 'Malmaison, Sèvres y el gusto Imperio, del salón al tocador.' },
  { num: 'IV',  titulo: 'El Ocaso',    años: '1812 — 1821', img: 'fontainebleau',alt: 'campagne-1814',piezas: 5,
    texto: 'Rusia, la abdicación y el silencio de Santa Elena.' }
];

/* Créditos de imagen (Wikimedia Commons) */
window.CREDITOS = [
  ['Pinturas de David, Gros, Ingres, Gérard, Delaroche, Meissonier y Girodet', 'Dominio público', 'https://commons.wikimedia.org/wiki/Category:Napoleon_I_in_paintings'],
  ['Retrato de Napoleón, taller de Gérard — foto: Livioandronico2013', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Napoleon_in_Coronation_Robes_(Fran%C3%A7ois_Gerard)_in_Museo_di_capodimonte.jpg'],
  ['Josefina, Prud’hon — foto en Wikimedia Commons', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Pierre-paul_prud%27hon,_l%27imperatrice_giuseppina,_1805-09,_01.jpg'],
  ['Busto de Napoleón, Canova — foto: Urek Meniashvili', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Antonio_Canova_-_Bust_of_Napoleon_I.JPG'],
  ['Máscara mortuoria — foto: Rama', 'CC BY-SA 3.0 FR', 'https://commons.wikimedia.org/wiki/File:Death_mask_of_Napoleon-MAHG_002793-IMG_8871.JPG'],
  ['Bicornio — foto: Thesupermat', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Paris_-_Mus%C3%A9e_de_l%27Arm%C3%A9e_-_Chapeau_ayant_appartenu_%C3%A0_Napol%C3%A9on_Bonaparte.jpg'],
  ['Reloj de Dubuc — foto: Daderot', 'CC0', 'https://commons.wikimedia.org/wiki/File:Mantel_Clock,_Jacques_Nicolas_Pierre_Francois_Dubuc,_Paris,_1815-1819,_ormolu,_iron,_glass,_silvered_dial_-_National_Gallery_of_Art,_Washington_-_DSC08776.JPG'],
  ['Servicio egipcio de Sèvres — foto: SiefkinDR', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Sevres_Egyptian_Service.JPG'],
  ['Sala del trono, Fontainebleau — foto: Stuart Mudie', 'CC BY-SA 2.0', 'https://commons.wikimedia.org/wiki/File:Throne_of_Napoleon,_in_the_throne_room_of_Fontainebleau_Palace.jpg'],
  ['20 francos, Año XII — National Museum of American History', 'Dominio público', 'https://commons.wikimedia.org/wiki/File:France_1803-04-A_20_Francs.jpg'],
  ['Interior de Malmaison — foto: Zairon', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Rueil-Malmaison_Ch%C3%A2teau_de_Malmaison_Innen_Bibliothek_6.jpg'],
  ['Museo Napoleónico, La Habana — fotos: Germanramos2', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Museo_Napole%C3%B3nico_(La_Habana)_20250829_001.jpg']
];
