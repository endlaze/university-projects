export const MUSIC = [
    {
        id: 1,
        cover: 'https://lh3.googleusercontent.com/aUhU6Ln7O-Of8NmQCVX9RF4nCV7-U9Ji3HDv4rA2nxOnymVKGATDSp1CXEzSG2PMYNWb-3EWh0w=w200-h300-rw',
        title: 'Chromatica',
        artist: 'Lady Gaga',
        releaseDate: 'May 29, 2020',
        gender: "Pop",
        tracklist: [
            {
                number: 1,
                title: 'Chromatica',
                length: '1:00',
                price: 1.5
            },
            {
                number: 2,
                title: 'Alice',
                length: '2:57',
                price: 1.5
            },
            {
                number: 3,
                title: 'Stupid Love',
                length: '3:13',
                price: 1.5
            },
            {
                number: 4,
                title: 'Rain On Me',
                length: '3:02',
                price: 1.5
            }
        ]
    },
    {
        id: 2,
        cover: 'https://lh3.googleusercontent.com/mgTT3Xz2y87l6KnUelNFJnR_WgBXfBwuQDxxRLGx9IZeWMuf-a0-ACyd7_rWANWJHgevjlFbWBg=w200-h300-rw',
        title: 'Emmanuel',
        artist: 'Anuel AA',
        releaseDate: 'May 29, 2020',
        gender: "Latin",
        tracklist: [
            {
                number: 1,
                title: 'No Llores Mujer',
                length: '3:33',
                price: 1.5
            },
            {
                number: 2,
                title: 'Somo o No Somos',
                length: '3:56',
                price: 1.5
            },
            {
                number: 3,
                title: 'Reggaetonera',
                length: '3:32',
                price: 1.5
            },
            {
                number: 4,
                title: 'Jangueo',
                length: '3:51',
                price: 1.5
            }
        ]
    },
    {
        id: 3,
        cover: 'https://lh3.googleusercontent.com/h1wqzvqBP9oDJVm5KMP9A45wQM2FkIfu4VxPebjZu1lIOBFCOomz-8a1bBSy2Im6ICTMf8XfpVc=w200-h300-rw',
        title: 'Eternal Atake (Deluxe) - LUV vs. The World 2',
        artist: 'Lil Uzi Vert',
        releaseDate: 'March 13, 2020',
        gender: "HipHop/Rap",
        tracklist: [
            {
                number: 1,
                title: 'Myron',
                length: '3:44',
                price: 1.5
            },
            {
                number: 2,
                title: 'Lotus',
                length: '3:13',
                price: 1.5
            },
            {
                number: 3,
                title: 'Bean (Kobe) [feat. Chief Keef]',
                length: '3:58',
                price: 1.5
            },
            {
                number: 4,
                title: 'Yessirskiii',
                length: '3:39',
                price: 1.5
            }
        ]
    },
    {
        id: 4,
        cover: 'https://lh3.googleusercontent.com/k8LWlpqqQcnY1GCEt1QI2UFBuHjgKYr-ZJt3TiyRxyUhMfhwRwHO4DoQurWVUgg6FR6DLzCTTg=w200-h300-rw',
        title: 'The Plan',
        artist: 'DaniLeigh',
        releaseDate: 'November 30, 2018',
        gender: "HipHop/Rap",
        tracklist: [
            {
                number: 1,
                title: 'The Plan',
                length: '3:08',
                price: 1.5
            },
            {
                number: 2,
                title: `Can't Relate (feat. YBN Nahmir & YG)`,
                length: '3:00',
                price: 1.5
            },
            {
                number: 3,
                title: 'Be Yourself',
                length: '2:29',
                price: 1.5
            },
            {
                number: 4,
                title: 'Cruz',
                length: '1:37',
                price: 1.5
            }
        ]
    },
]


export const fetchAlbum = (albumId) => new Promise((resolve, reject) => {
    let album = MUSIC.find((album) => {
        return (album.id === albumId)
    })
    resolve(album)
});