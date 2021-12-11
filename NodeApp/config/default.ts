
const key = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCyOv6e5WNHWDx/jZzP8wT8NM0zSs2RAd5TM7G2H9TWpNzmgyzV
DMI/5H05wH13aCsBlbMwdEArLbmuz080/IC0GbqmRTuj9VTQC3SWntN/WgI9we+X
6zramNuSCxSFiCkf45x8ZpbU+HvpxGYONOaZtD9lKtSIxpIcwuFc+gw3vwIDAQAB
AoGAECo5nb/AWWAvXIJDjrjD4vwHAHfwXQ6GU5WEsLgCXdVmE6IiFtCpbZITqYFD
3+iavfIN5n8kssXa6Xfz/yJHqedDyO71EK+tY0nqvkEJC5nSeegZPz1QhaVkuopK
/VFXWHiOPVOnojzPf1hpaE0zBuzzQVEs7pi606pR8xl/MYECQQDemVgMinpCP/Wa
Sh37zU8eZkC7hk08VHdhOyxX5wsAlXhsq3gY9zuUEvYYMqXYtSMftzUbHabEjPYt
OyvqVPR3AkEAzPlUTiPpwPJFSD/Tb186Ge0kMVgXwHtzKAUCKtez4f4KsvLUrIFe
oKGfm0kVYkByGh+E+WTj1NKoQgbGyrUQ+QJAZ2vVhdYc4YT35lyDO8dy+AvIDZhj
cCFKaellO94DtZy8m7i7DtZnXu/EWQ/HED1weT7UtKl9HxrjEbbJO5GHFwJAE5T6
ReDOcx1yGv3mACzTyyhJneExm7TvgnJAC8HBsKRpd0EVqklNtgDa06X+wf0wKWi7
dmv6DBn38x7cnP8BWQJAdcdDv06Wsmib8LZc3ZjZK71lT5mZcw4vjvd5++ehpNU3
xU+CTZ4rtw8CpdOjDAxMhMuV44OaSx5LEpGCqvX1OQ==
-----END RSA PRIVATE KEY-----`

export default {
    port: process.env.PORT || 8080,
    host: process.env.HOST || "localhost",
    dbUri: "mongodb+srv://emmanuel:king123@cluster0.cf1oy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    saltFactory: 10,
    privateKey: key,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
}