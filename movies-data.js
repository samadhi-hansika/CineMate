/**
 * CineMate - Master Movies & TV Shows Dataset
 * Comprehensive collection of real blockbuster films and top-rated television shows.
 */

const MOVIES_DATABASE = [
  {
    id: "interstellar",
    title: "Interstellar",
    type: "movie",
    poster: "Interstellar_film_poster.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    year: 2014,
    rating: 8.7,
    match: "99% Match",
    ageRating: "PG-13",
    duration: "2h 49m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos 5.1",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans through a mysterious wormhole near Saturn.",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
    trailerYoutubeId: "zSWdZVtXT7E",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    featured: true,
    trending: true,
    top10Rank: 3,
    badges: ["Top 10", "4K UHD"]
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    type: "movie",
    poster: "Dune-part2.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    year: 2024,
    rating: 8.6,
    match: "98% Match",
    ageRating: "PG-13",
    duration: "2h 46m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos 5.1",
    genres: ["Sci-Fi", "Adventure", "Action"],
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    tagline: "Long live the fighters.",
    director: "Denis Villeneuve",
    cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem, Austin Butler",
    trailerYoutubeId: "Way9Dexny3w",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: true,
    trending: true,
    top10Rank: 1,
    badges: ["#1 in Movies", "4K UHD"]
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    type: "movie",
    poster: "Oppenheimer.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    year: 2023,
    rating: 8.9,
    match: "97% Match",
    ageRating: "R",
    duration: "3h 00m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos 5.1",
    genres: ["Biography", "Drama", "History"],
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II under the secretive Manhattan Project.",
    tagline: "The world forever changes.",
    director: "Christopher Nolan",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr., Florence Pugh",
    trailerYoutubeId: "uYPbbksJxIg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trending: true,
    top10Rank: 2,
    badges: ["Oscar Winner", "4K UHD"]
  },
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    type: "movie",
    poster: "TheDarkKnight.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    year: 2008,
    rating: 9.0,
    match: "99% Match",
    ageRating: "PG-13",
    duration: "2h 32m",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Action", "Crime", "Drama"],
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    tagline: "Why so serious?",
    director: "Christopher Nolan",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine, Maggie Gyllenhaal",
    trailerYoutubeId: "EXeTwQWrcwY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trending: true,
    top10Rank: 4,
    badges: ["Must Watch", "Classic"]
  },
  {
    id: "inception",
    title: "Inception",
    type: "movie",
    poster: "inception.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    year: 2010,
    rating: 8.8,
    match: "96% Match",
    ageRating: "PG-13",
    duration: "2h 28m",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Sci-Fi", "Action", "Adventure"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    tagline: "Your mind is the scene of the crime.",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy, Ken Watanabe",
    trailerYoutubeId: "YoHD9XEInc0",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: true,
    top10Rank: 5,
    badges: ["Mind-Bender", "4K UHD"]
  },
  {
    id: "smile-2",
    title: "Smile 2",
    type: "movie",
    poster: "Smile 2.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/by8tDF4yL3q978vd9hgip8m2a0m.jpg",
    year: 2024,
    rating: 7.2,
    match: "93% Match",
    ageRating: "R",
    duration: "2h 07m",
    quality: "HD",
    audio: "5.1 Surround",
    genres: ["Horror", "Mystery", "Thriller"],
    description: "About to embark on a world tour, global pop sensation Skye Riley begins experiencing increasingly terrifying and inexplicable events. Overwhelmed by the escalating horrors and the pressures of fame, Skye is forced to face her past.",
    tagline: "It will never let you go.",
    director: "Parker Finn",
    cast: "Naomi Scott, Rosemarie DeWitt, Lukas Gage, Miles Gutierrez-Riley",
    trailerYoutubeId: "0HYmbMvK_kA",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trending: true,
    top10Rank: 6,
    badges: ["New Horror"]
  },
  {
    id: "get-out",
    title: "Get Out",
    type: "movie",
    poster: "Get Out.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/m5zk74v1h78Fz13Ym54FpYdE34B.jpg",
    year: 2017,
    rating: 7.8,
    match: "95% Match",
    ageRating: "R",
    duration: "1h 44m",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Horror", "Mystery", "Thriller"],
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point, uncovering a terrifying secret.",
    tagline: "Just because you're invited, doesn't mean you're welcome.",
    director: "Jordan Peele",
    cast: "Daniel Kaluuya, Allison Williams, Bradley Whitford, Catherine Keener",
    trailerYoutubeId: "DzfpyUB60YY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trending: true,
    top10Rank: 7,
    badges: ["Oscar Winner", "Thriller"]
  },
  {
    id: "stranger-things",
    title: "Stranger Things",
    type: "tv",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    year: 2024,
    rating: 8.7,
    match: "98% Match",
    ageRating: "16+",
    duration: "4 Seasons",
    quality: "4K Ultra HD",
    audio: "Spatial Audio",
    genres: ["Sci-Fi", "Drama", "Horror"],
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl with telekinetic powers.",
    tagline: "Every ending has a beginning.",
    director: "The Duffer Brothers",
    cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour",
    trailerYoutubeId: "b9EkMc79ZSU",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: true,
    top10Rank: 8,
    badges: ["Top Series", "4K UHD"],
    episodes: [
      { ep: 1, title: "Chapter One: The Vanishing of Will Byers", duration: "48m", desc: "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab." },
      { ep: 2, title: "Chapter Two: The Weirdo on Maple Street", duration: "55m", desc: "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call." },
      { ep: 3, title: "Chapter Three: Holly, Jolly", duration: "51m", desc: "An increasingly frantic Joyce tries to communicate with Will. An uninvited visitor arrives at the lab." }
    ]
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    type: "tv",
    poster: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    year: 2013,
    rating: 9.5,
    match: "99% Match",
    ageRating: "18+",
    duration: "5 Seasons",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Crime", "Drama", "Thriller"],
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's financial future.",
    tagline: "All bad things must come to an end.",
    director: "Vince Gilligan",
    cast: "Bryan Cranston, Aaron Paul, Anna Gunn, Dean Norris, Giancarlo Esposito",
    trailerYoutubeId: "HhesaQXLuRY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trending: true,
    top10Rank: 9,
    badges: ["#1 All Time", "Masterpiece"],
    episodes: [
      { ep: 1, title: "Pilot", duration: "58m", desc: "Unassuming high school chemistry teacher Walter White discovers he has lung cancer, leading him to make desperate financial choices." },
      { ep: 2, title: "Cat's in the Bag...", duration: "48m", desc: "Walt and Jesse attempt to dispose of two bodies in the RV, with messy and horrifying complications." },
      { ep: 3, title: "...And the Bag's in the River", duration: "48m", desc: "Walt faces the moral dilemma of what to do with their captive survivor Krazy-8." }
    ]
  },
  {
    id: "the-last-of-us",
    title: "The Last of Us",
    type: "tv",
    poster: "https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    year: 2023,
    rating: 8.8,
    match: "98% Match",
    ageRating: "18+",
    duration: "1 Season",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos",
    genres: ["Action", "Adventure", "Drama"],
    description: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    tagline: "When you're lost in the darkness, look for the light.",
    director: "Craig Mazin, Neil Druckmann",
    cast: "Pedro Pascal, Bella Ramsey, Gabriel Luna, Anna Torv",
    trailerYoutubeId: "uLtkt8BonwM",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trending: true,
    top10Rank: 10,
    badges: ["Emmy Winner", "4K UHD"],
    episodes: [
      { ep: 1, title: "When You're Lost in the Darkness", duration: "1h 21m", desc: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Tess are tasked with a mission that could change everything." },
      { ep: 2, title: "Infected", duration: "53m", desc: "Tess, Joel and Ellie navigate a desolate, flooded Boston hotel while evading clickers." }
    ]
  },
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/ilRyASDvt7vRBF11a3tAocK4yv0.jpg",
    year: 2017,
    rating: 8.0,
    match: "95% Match",
    ageRating: "R",
    duration: "2h 44m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos 5.1",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    tagline: "There's still a page left.",
    director: "Denis Villeneuve",
    cast: "Ryan Gosling, Harrison Ford, Ana de Armas, Sylvia Hoeks",
    trailerYoutubeId: "gCcx85zbxz4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: false,
    badges: ["Visual Feast", "4K UHD"]
  },
  {
    id: "spider-verse",
    title: "Spider-Man: Across the Spider-Verse",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    year: 2023,
    rating: 8.7,
    match: "98% Match",
    ageRating: "PG",
    duration: "2h 20m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos",
    genres: ["Animation", "Action", "Adventure"],
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    tagline: "It's how you wear the mask that matters.",
    director: "Joaquim Dos Santos, Kemp Powers",
    cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac, Daniel Kaluuya",
    trailerYoutubeId: "cqGjhVJWtEg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trending: true,
    badges: ["Award Winner", "Animation"]
  },
  {
    id: "gladiator-2",
    title: "Gladiator II",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/euYIwmwkmz95mnXvufEmbL69ovr.jpg",
    year: 2024,
    rating: 7.7,
    match: "94% Match",
    ageRating: "R",
    duration: "2h 28m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos 5.1",
    genres: ["Action", "Adventure", "Drama"],
    description: "Years after witnessing the death of revered hero Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.",
    tagline: "What we do in life echoes in eternity.",
    director: "Ridley Scott",
    cast: "Paul Mescal, Pedro Pascal, Denzel Washington, Connie Nielsen",
    trailerYoutubeId: "4rgYUipGJNo",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trending: true,
    badges: ["New Release", "Epic"]
  },
  {
    id: "arcane",
    title: "Arcane",
    type: "tv",
    poster: "https://th.bing.com/th/id/R.986772f718b4282cd9a6cc546aa5536c?rik=hIRHJgNp1IKe7w&pid=ImgRaw&r=0",
    backdrop: "https://th.bing.com/th/id/R.986772f718b4282cd9a6cc546aa5536c?rik=hIRHJgNp1IKe7w&pid=ImgRaw&r=0",
    year: 2024,
    rating: 9.0,
    match: "99% Match",
    ageRating: "16+",
    duration: "2 Seasons",
    quality: "4K Ultra HD",
    audio: "Spatial Audio",
    genres: ["Animation", "Action", "Sci-Fi"],
    description: "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions-and the power that will tear them apart.",
    tagline: "Every legend has a beginning.",
    director: "Christian Linke, Alex Yee",
    cast: "Hailee Steinfeld, Ella Purnell, Kevin Alejandro, Katie Leung",
    trailerYoutubeId: "fXmAurh012s",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: true,
    badges: ["Masterpiece", "Top Rated"],
    episodes: [
      { ep: 1, title: "Welcome to the Playground", duration: "43m", desc: "Orphan sisters Vi and Powder bring trouble to Zaun's underground streets following a heist in posh Piltover." },
      { ep: 2, title: "Some Mysteries Are Better Left Unsolved", duration: "41m", desc: "Idealistic inventor Jayce attempts to harness magic through science despite mentor warnings." }
    ]
  },
  {
    id: "cyberpunk-edgerunners",
    title: "Cyberpunk: Edgerunners",
    type: "tv",
    poster: "https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    year: 2022,
    rating: 8.3,
    match: "96% Match",
    ageRating: "18+",
    duration: "1 Season",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Animation", "Action", "Sci-Fi"],
    description: "A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner: a mercenary outlaw also known as a cyberpunk.",
    tagline: "Stay human or burn bright.",
    director: "Hiroyuki Imaishi",
    cast: "KENN, Aoi Yuki, Hiroki Touchi, Michiko Kaiden",
    trailerYoutubeId: "JtqIas3bYhg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trending: false,
    badges: ["Anime Hit", "Cult Classic"]
  },
  {
    id: "parasite",
    title: "Parasite",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
    year: 2019,
    rating: 8.5,
    match: "98% Match",
    ageRating: "R",
    duration: "2h 12m",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Drama", "Thriller", "Comedy"],
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    tagline: "Act like you own the place.",
    director: "Bong Joon Ho",
    cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik",
    trailerYoutubeId: "5xH0R_uie1U",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trending: false,
    badges: ["Best Picture", "Masterpiece"]
  },
  {
    id: "deadpool-and-wolverine",
    title: "Deadpool & Wolverine",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv82aC.jpg",
    year: 2024,
    rating: 7.8,
    match: "97% Match",
    ageRating: "R",
    duration: "2h 08m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos",
    genres: ["Action", "Comedy", "Sci-Fi"],
    description: "Deadpool's peaceful existence comes crashing down when the Time Variance Authority recruits him to safeguard the multiverse, partnering him with a reluctant, broken Wolverine.",
    tagline: "Come together.",
    director: "Shawn Levy",
    cast: "Ryan Reynolds, Hugh Jackman, Emma Corrin, Matthew Macfadyen",
    trailerYoutubeId: "73_1biulkYk",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trending: true,
    badges: ["Blockbuster", "Comedy Hit"]
  },
  {
    id: "wednesday",
    title: "Wednesday",
    type: "tv",
    poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
    year: 2022,
    rating: 8.1,
    match: "95% Match",
    ageRating: "13+",
    duration: "1 Season",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Comedy", "Crime", "Fantasy"],
    description: "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability, thwart and solve the monster mystery that terrorizes the local town.",
    tagline: "Smart, sarcastic and a little dead inside.",
    director: "Tim Burton",
    cast: "Jenna Ortega, Gwendoline Christie, Riki Lindhome, Christina Ricci",
    trailerYoutubeId: "Di310BC8zMg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: false,
    badges: ["Fan Favorite", "Binge-Worthy"],
    episodes: [
      { ep: 1, title: "Wednesday's Child is Full of Woe", duration: "59m", desc: "When a deliciously wicked prank gets Wednesday expelled, her parents ship her off to Nevermore Academy." },
      { ep: 2, title: "Woe is the Loneliest Number", duration: "57m", desc: "The sheriff questions Wednesday about the night's strange happenings as she enters the cutthroat Poe Cup race." }
    ]
  },
  {
    id: "the-batman",
    title: "The Batman",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    year: 2022,
    rating: 7.8,
    match: "94% Match",
    ageRating: "PG-13",
    duration: "2h 56m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos 5.1",
    genres: ["Action", "Crime", "Drama"],
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    tagline: "Unmask the truth.",
    director: "Matt Reeves",
    cast: "Robert Pattinson, Zoë Kravitz, Paul Dano, Jeffrey Wright, Colin Farrell",
    trailerYoutubeId: "mqqft2x_Aa4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trending: false,
    badges: ["Neo-Noir", "4K UHD"]
  },
  {
    id: "alien-romulus",
    title: "Alien: Romulus",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    year: 2024,
    rating: 7.3,
    match: "93% Match",
    ageRating: "R",
    duration: "1h 59m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos",
    genres: ["Horror", "Sci-Fi", "Thriller"],
    description: "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    tagline: "In space, no one can hear you scream.",
    director: "Fede Álvarez",
    cast: "Cailee Spaeny, David Jonsson, Archie Renaux, Isabela Merced",
    trailerYoutubeId: "x0XDEhP4MQs",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trending: true,
    badges: ["Sci-Fi Horror", "New"]
  },
  {
    id: "shutter-island",
    title: "Shutter Island",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysagvk29z.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/k9rhn037yvVomJ621W9O97H7jGv.jpg",
    year: 2010,
    rating: 8.2,
    match: "97% Match",
    ageRating: "R",
    duration: "2h 18m",
    quality: "HD",
    audio: "5.1 Surround",
    genres: ["Mystery", "Thriller", "Drama"],
    description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on Boston Harbor's isolated Shutter Island.",
    tagline: "Someone is missing.",
    director: "Martin Scorsese",
    cast: "Leonardo DiCaprio, Mark Ruffalo, Ben Kingsley, Michelle Williams",
    trailerYoutubeId: "5iaYLCiq5RM",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: false,
    badges: ["Mind-Bender", "Scorsese Classic"]
  },
  {
    id: "severance",
    title: "Severance",
    type: "tv",
    poster: "https://image.tmdb.org/t/p/w1280/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
    year: 2024,
    rating: 8.7,
    match: "98% Match",
    ageRating: "16+",
    duration: "2 Seasons",
    quality: "4K Ultra HD",
    audio: "Spatial Audio",
    genres: ["Drama", "Mystery", "Sci-Fi"],
    description: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
    tagline: "Please do not attempt to contact your outie.",
    director: "Ben Stiller",
    cast: "Adam Scott, Zach Cherry, Britt Lower, Patricia Arquette, Christopher Walken",
    trailerYoutubeId: "xEQP4VVuyrY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trending: true,
    badges: ["Award Winner", "Must Watch"]
  },
  {
    id: "fight-club",
    title: "Fight Club",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    year: 1999,
    rating: 8.8,
    match: "98% Match",
    ageRating: "R",
    duration: "2h 19m",
    quality: "4K Ultra HD",
    audio: "5.1 Surround",
    genres: ["Drama", "Thriller"],
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    tagline: "Mischief. Mayhem. Soap.",
    director: "David Fincher",
    cast: "Brad Pitt, Edward Norton, Helena Bonham Carter, Meat Loaf",
    trailerYoutubeId: "c83tK5r9m-E",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trending: false,
    badges: ["Cult Classic", "Top 250"]
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    type: "movie",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    year: 2019,
    rating: 8.4,
    match: "99% Match",
    ageRating: "PG-13",
    duration: "3h 01m",
    quality: "4K Ultra HD",
    audio: "Dolby Atmos",
    genres: ["Action", "Adventure", "Sci-Fi"],
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    tagline: "Part of the journey is the end.",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson",
    trailerYoutubeId: "TcMBFSGVi1c",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trending: false,
    badges: ["Record Breaker", "Marvel Studios"]
  }
];

// Helper functions for database operations
const CineDB = {
  getAll: () => MOVIES_DATABASE,
  
  getById: (id) => MOVIES_DATABASE.find(m => m.id === id),
  
  getByType: (type) => MOVIES_DATABASE.filter(m => m.type === type),
  
  getTrending: () => MOVIES_DATABASE.filter(m => m.trending),
  
  getTop10: () => {
    return MOVIES_DATABASE
      .filter(m => m.top10Rank != null)
      .sort((a, b) => a.top10Rank - b.top10Rank)
      .slice(0, 10);
  },
  
  getByGenre: (genre) => {
    if (!genre || genre === "All Genres" || genre === "All") return MOVIES_DATABASE;
    return MOVIES_DATABASE.filter(m => m.genres.some(g => g.toLowerCase() === genre.toLowerCase()));
  },
  
  search: (query, genre, year, type) => {
    let results = [...MOVIES_DATABASE];
    
    if (type && type !== "All") {
      results = results.filter(m => m.type === type);
    }
    
    if (genre && genre !== "All Genres" && genre !== "All") {
      results = results.filter(m => m.genres.some(g => g.toLowerCase() === genre.toLowerCase()));
    }
    
    if (year && year !== "All Years" && year !== "All") {
      if (year.includes("2020s")) {
        results = results.filter(m => m.year >= 2020);
      } else if (year.includes("Classics")) {
        results = results.filter(m => m.year < 2010);
      } else {
        const yNum = parseInt(year, 10);
        if (!isNaN(yNum)) {
          results = results.filter(m => m.year === yNum);
        }
      }
    }
    
    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      results = results.filter(m => 
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q)) ||
        (m.cast && m.cast.toLowerCase().includes(q)) ||
        (m.director && m.director.toLowerCase().includes(q))
      );
    }
    
    return results;
  },
  
  getRelated: (movie, limit = 6) => {
    if (!movie) return [];
    return MOVIES_DATABASE
      .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
      .slice(0, limit);
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.MOVIES_DATABASE = MOVIES_DATABASE;
  window.CineDB = CineDB;
}

