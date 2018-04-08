/*
    Jenkins lookup3 (hashlittle2)
    ---------------
    Jenkins lookup3 hash implemented by bryc (github.com/bryc)
    Can also output 64-bit hash. Possibly even 96-bit hash.
    
    Note from Bob about using two hash values:
    *pc is better mixed than *pb, so use *pc first.  If you want
    * a 64-bit value do something like "*pc + (((uint64_t)*pb)<<32)".
*/

function lookup3(k, init = 0, init2 = 0) {
    init |= 0; init2 |= 0; // 32-bitify input
    var len = k.length, o = 0,
        a = 0xdeadbeef + len + init,
        b = 0xdeadbeef + len + init,
        c = 0xdeadbeef + len + init + init2;
  
    while (len > 12) {
        a += k[o] | k[o+1] << 8 | k[o+2] << 16 | k[o+3] << 24;
        b += k[o+4] | k[o+5] << 8 | k[o+6] << 16 | k[o+7] << 24;
        c += k[o+8] | k[o+9] << 8 | k[o+10] << 16 | k[o+11] << 24;
        
        a -= c; a ^= c<<4 | c>>>28; c += b;
        b -= a; b ^= a<<6 | a>>>26; a += c;
        c -= b; c ^= b<<8 | b>>>24; b += a;
        a -= c; a ^= c<<16 | c>>>16; c += b;
        b -= a; b ^= a<<19 | a>>>13; a += c;
        c -= b; c ^= b<<4 | b>>>28; b += a;
        a |= 0; b |= 0; c |= 0; // |0 = prevent float

        len -= 12, o += 12;
    }

    if(len > 0) { // final mix only if len > 0
        switch (len) {
            case 12: c += k[o+11] << 24;
            case 11: c += k[o+10] << 16;
            case 10: c += k[o+9] << 8;
            case  9: c += k[o+8];
            case  8: b += k[o+7] << 24;
            case  7: b += k[o+6] << 16;
            case  6: b += k[o+5] << 8;
            case  5: b += k[o+4];
            case  4: a += k[o+3] << 24;
            case  3: a += k[o+2] << 16;
            case  2: a += k[o+1] << 8;
            case  1: a += k[o];
        }

        c ^= b; c -= b<<14 | b>>>18;
        a ^= c; a -= c<<11 | c>>>21;
        b ^= a; b -= a<<25 | a>>>7;
        c ^= b; c -= b<<16 | b>>>16;
        a ^= c; a -= c<<4 | c>>>28;
        b ^= a; b -= a<<14 | a>>>18;
        c ^= b; c -= b<<24 | b>>>8;
    }

    return [b >>> 0, c >>> 0];
}
