/**
 * PUSH Notification server V 0.2
 * (c) Telefonica Digital, 2012 - All rights reserver
 * Fernando Rodríguez Sela <frsela@tid.es>
 * Guillermo Lopez Leal <gll@tid.es>
 */

var crypto = require('crypto');

function cryptography() {}

cryptography.prototype = {
  ////////////////////////////////////////////
  // Simmetric encryption
  ////////////////////////////////////////////

  /**
   * Simmetric Encrypt
   */
  _encrypt: function(data, key, algorithm)
  {
    var clearEncoding = 'utf8';
    var cipherEncoding = 'hex';            // hex, base64 

    var cipher = crypto.createCipher(algorithm, key);
    var ciphertext = "";
    ciphertext = cipher.update(data, clearEncoding, cipherEncoding);
    ciphertext += cipher.final(cipherEncoding);

    return (ciphertext);
  },

  /**
   * Simmetric Decrypt
   */
  _decrypt: function(ciphertext, key, algorithm) {
    var clearEncoding = 'utf8';
    var cipherEncoding = 'hex';            // hex, base64 

    var decipher = crypto.createDecipher(algorithm, key);
    var data = "";
    data = decipher.update(ciphertext, cipherEncoding, clearEncoding);
    data += decipher.final(cipherEncoding);
    
    return (data);
  },

  /**
   * AES Encrypt
   */
  encryptAES: function(data,key) {
    var algorithm = 'aes-128-cbc';
    return this._encrypt(data,key,algorithm);
  },

  /**
   * AES Decrypt
   */
  decryptAES: function(data,key) {
    var algorithm = 'aes-128-cbc';
    return this._decrypt(data,key,algorithm);
  },

  ////////////////////////////////////////////
  // Signature validations
  ////////////////////////////////////////////

  /**
   * Verify signature using RSA-SHA256
   * Use Public/Private keys for signatures:
   * Private Key generation:
   *  openssl genrsa 1024 > private.key
   * Public Key generation:
   *  openssl rsa -in private.key -out public.pem -outform PEM -pubout
   * Signing data using private key:
   *  openssl dgst -hex -sha256 -sign private.key msg.txt
   */
  verifySignature: function(data,signature,publicKey) {
    var algorithm = 'RSA-SHA256';
    var verifier = crypto.createVerify(algorithm);
    verifier.update(data);
    return verifier.verify(publicKey, signature, 'hex');
  },

  ////////////////////////////////////////////
  // HASH funcitons
  ////////////////////////////////////////////
  hashMD5: function(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  },

  hashSHA256: function(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  },

  hashSHA512: function(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
  }
}

///////////////////////////////////////////
// Singleton
///////////////////////////////////////////
var crypt = new cryptography();
function getCrypto() {
  return crypt;
}
exports.getCrypto = new getCrypto();