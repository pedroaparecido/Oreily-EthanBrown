
const fortuneCookies = [
    'Conquer your fears of they will conquer you.',
    'Rivers need springs.',
    'Do not fear what you dont know.',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.'
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
}