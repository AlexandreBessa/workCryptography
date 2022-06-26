const crypto = require('crypto');
const secretPhrase = 'aabbccddaabbccddaabbccddaabbccdd'

const encrypt = text => {
    console.log(`Texto inserido: ${text}`)
    const iv = Buffer.from(crypto.randomBytes(16))
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretPhrase), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return `${iv.toString('hex')}|${encrypted.toString('hex')}`
}

const dencrypt = text => {
    const [iv, encrypted] = text.split('|')
    const ivBuffer = Buffer.from(iv, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretPhrase), ivBuffer)
    let content = decipher.update(Buffer.from(encrypted, 'hex'))
    content = Buffer.concat([content, decipher.final()])
    return content.toString()
}

const crypted = encrypt('Alexandre')
console.log("Texto criptografado:", crypted)
const dencrypted = dencrypt(crypted)
console.log("Texto descriptografado", dencrypted)