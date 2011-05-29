;
(function (window, document, undefined) {
    mti = {};
    mti.I = function (a, b) {
        var c = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : [];
        return function () {
            c.push.apply(c, arguments);
            return b.apply(a, c)
        }
    };
    mti.A = function (a, b) {
        this.h = a;
        this.b = b
    };
    mti.A.prototype.createElement = function (a, b, c) {
        a = this.h.createElement(a);
        if (b) for (var d in b) if (b.hasOwnProperty(d)) if (d == "style" && this.b.getName() == "MSIE") a.style.cssText = b[d];
        else a.setAttribute(d, b[d]);
        c && a.appendChild(this.h.createTextNode(c));
        return a
    };

    function j(a, b, c) {
        a = a.h.getElementsByTagName(b)[0];
        if (!a) a = document.documentElement;
        if (a && a.lastChild) {
            a.insertBefore(c, a.lastChild);
            return true
        }
        return false
    }

    function q(a, b) {
        function c() {
            document.body ? b() : setTimeout(c, 0)
        }
        c()
    }

    function r(a, b) {
        if (a.b.getName() == "MSIE") {
            var c = a.h,
                d = false;
            (function () {
                try {
                    c.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(arguments.callee, 50);
                    return
                }
                if (!d) {
                    d = true;
                    b()
                }
            })();
            c.onreadystatechange = function () {
                if (c.readyState == "complete") {
                    c.onreadystatechange = null;
                    if (!d) {
                        d = true;
                        b()
                    }
                }
            }
        } else if (a.b.oa == "AppleWebKit" && a.b.na < 525)(function () {
            ["loaded", "complete"].indexOf(this.h.readyState) > -1 ? b() : setTimeout(arguments.callee, 50)
        })();
        else if (a.h.addEventListener) a.h.addEventListener("DOMContentLoaded", b, false);
        else window.onload = b
    }
    function s(a, b) {
        if (b.parentNode) {
            b.parentNode.removeChild(b);
            return true
        }
        return false
    }
    function t(a, b, c) {
        a = b.className.split(/\s+/);
        for (var d = 0, e = a.length; d < e; d++) if (a[d] == c) return;
        a.push(c);
        b.className = a.join(" ").replace(/^\s+/, "")
    }
    function u(a, b, c) {
        a = b.className.split(/\s+/);
        for (var d = [], e = 0, f = a.length; e < f; e++) a[e] != c && d.push(a[e]);
        b.className = d.join(" ").replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function w(a, b) {
        var c = "";
        b = b.childNodes || b;
        for (var d = 0; d < b.length; d++) c += b[d].nodeType != 1 ? b[d].nodeValue : w(a, b[d].childNodes);
        return c
    }
    mti.A.prototype.getElementById = function (a) {
        return this.h.getElementById(a)
    };
    mti.k = function (a, b, c, d, e, f) {
        this.va = a;
        this.Aa = b;
        this.oa = c;
        this.na = d;
        this.xa = e;
        this.da = f
    };
    mti.k.prototype.getName = function () {
        return this.va
    };
    mti.e = function (a) {
        this.b = a
    };
    mti.e.f = "Unknown";
    mti.e.ka = new mti.k(mti.e.f, mti.e.f, mti.e.f, false);
    mti.e.prototype.parse = function () {
        return this.b.indexOf("MSIE") != -1 ? x(this) : this.b.indexOf("Opera") != -1 ? z(this) : this.b.indexOf("AppleWebKit") != -1 ? A(this) : this.b.indexOf("Gecko") != -1 ? B(this) : mti.e.ka
    };

    function C(a) {
        var b = F(a, a.b, /(iPod|iPad|iPhone|Android)/);
        if (b != "") return b;
        a = F(a, a.b, /(Linux|Mac_PowerPC|Macintosh|Windows)/);
        if (a != "") {
            if (a == "Mac_PowerPC") a = "Macintosh";
            return a
        }
        return mti.e.f
    }

    function x(a) {
        var b = F(a, a.b, /(MSIE [\d\w\.]+)/);
        if (b != "") {
            var c = b.split(" ");
            b = c[0];
            c = c[1];
            return new mti.k(b, c, b, c, C(a), G(a, c) >= 6)
        }
        return new mti.k("MSIE", mti.e.f, "MSIE", mti.e.f, C(a), false)
    }

    function z(a) {
        var b = mti.e.f,
            c = mti.e.f,
            d = F(a, a.b, /(Presto\/[\d\w\.]+)/);
        if (d != "") {
            c = d.split("/");
            b = c[0];
            c = c[1]
        } else {
            if (a.b.indexOf("Gecko") != -1) b = "Gecko";
            d = F(a, a.b, /rv:([^\)]+)/);
            if (d != "") c = d
        }
        if (a.b.indexOf("Version/") != -1) {
            d = F(a, a.b, /Version\/([\d\.]+)/);
            if (d != "") return new mti.k("Opera", d, b, c, C(a), G(a, d) >= 10)
        }
        d = F(a, a.b, /Opera[\/ ]([\d\.]+)/);
        if (d != "") return new mti.k("Opera", d, b, c, C(a), G(a, d) >= 10);
        return new mti.k("Opera", mti.e.f, b, c, C(a), false)
    }

    function A(a) {
        var b = C(a),
            c = F(a, a.b, /AppleWebKit\/([\d\.\+]+)/);
        if (c == "") c = mti.e.f;
        var d = mti.e.f;
        if (a.b.indexOf("Chrome") != -1) d = "Chrome";
        else if (a.b.indexOf("Safari") != -1) d = "Safari";
        var e = mti.e.f;
        if (a.b.indexOf("Version/") != -1) e = F(a, a.b, /Version\/([\d\.\w]+)/);
        else if (d == "Chrome") e = F(a, a.b, /Chrome\/([\d\.]+)/);
        var f = F(a, c, /\d+\.(\d+)/);
        return new mti.k(d, e, "AppleWebKit", c, b, G(a, c) >= 526 || G(a, c) >= 525 && parseInt(f) >= 13)
    }

    function B(a) {
        var b = mti.e.f,
            c = mti.e.f,
            d = false;
        if (a.b.indexOf("Firefox") != -1) {
            b = "Firefox";
            var e = F(a, a.b, /Firefox\/([\d\w\.]+)/);
            if (e != "") {
                d = F(a, e, /\d+\.(\d+)/);
                c = e;
                d = e != "" && G(a, e) >= 3 && parseInt(d) >= 5
            }
        } else if (a.b.indexOf("Mozilla") != -1) b = "Mozilla";
        e = F(a, a.b, /rv:([^\)]+)/);
        if (e == "") e = mti.e.f;
        else if (!d) {
            d = G(a, e);
            var f = parseInt(F(a, e, /\d+\.(\d+)/)),
                g = parseInt(F(a, e, /\d+\.\d+\.(\d+)/));
            d = d > 1 || d == 1 && f > 9 || d == 1 && f == 9 && g >= 2 || e.match(/1\.9\.1b[123]/) != null || e.match(/1\.9\.1\.[\d\.]+/) != null
        }
        return new mti.k(b, c, "Gecko", e, C(a), d)
    }
    function G(a, b) {
        a = F(a, b, /(\d+)/);
        if (a != "") return parseInt(a);
        return -1
    }
    function F(a, b, c) {
        if ((a = b.match(c)) && a[1]) return a[1];
        return ""
    };
    mti.c = function (a, b, c, d) {
        this.a = a;
        this.g = b;
        this.V = c;
        this.n = d || mti.c.z;
        this.m = new mti.w("-")
    };
    mti.c.z = "mti";
    mti.c.p = "loading";
    mti.c.v = "active";
    mti.c.B = "inactive";
    mti.c.G = "font";

    function H(a) {
        t(a.a, a.g, a.m.l(a.n, mti.c.p));
        I(a, mti.c.p)
    }
    function J(a, b, c) {
        u(a.a, a.g, a.m.l(a.n, b, c, mti.c.p));
        t(a.a, a.g, a.m.l(a.n, b, c, mti.c.v));
        I(a, mti.c.G + mti.c.v, b, c)
    }
    function K(a) {
        t(a.a, a.g, a.m.l(a.n, mti.c.B));
        I(a, mti.c.B)
    }
    function L(a) {
        u(a.a, a.g, a.m.l(a.n, mti.c.p));
        t(a.a, a.g, a.m.l(a.n, mti.c.v));
        I(a, mti.c.v)
    }

    function I(a, b, c, d) {
        a.V[b] && a.V[b](c, d)
    };
    mti.ga = function () {
        this.aa = {}
    };

    function M(a, b) {
        var c = [];
        for (var d in b) if (b.hasOwnProperty(d)) {
            var e = a.aa[d];
            e && c.push(e(b[d]))
        }
        return c
    };
    mti.o = function (a, b, c, d, e) {
        this.a = a;
        this.q = b;
        this.K = c;
        this.D = d;
        this.Z = e;
        this.W = 0;
        this.P = this.$ = false;
        this.ua = new mti.R;
        this.qa = new mti.i
    };
    mti.o.S = "_,arial,helvetica";
    mti.o.fa = "n4";
    mti.o.prototype.watch = function (a, b, c) {
        for (var d = a.length, e = 0; e < d; e++) {
            var f = a[e];
            b[f] || (b[f] = [mti.o.fa]);
            this.W += b[f].length
        }
        if (c) this.$ = c;
        for (e = 0; e < d; e++) {
            f = a[e];
            c = b[f];
            for (var g = 0, h = c.length; g < h; g++) {
                var m = c[g],
                    k = O(this, mti.o.S, m),
                    o = this.K.L(k);
                s(this.a, k);
                k = f;
                var l = this.q;
                t(l.a, l.g, l.m.l(l.n, k, m, mti.c.p));
                I(l, mti.c.G + mti.c.p, k, m);
                l = O(this, this.ua.quote(k), m);
                if (o != this.K.L(l)) {
                    s(this.a, l);
                    J(this.q, k, m);
                    this.P = true;
                    P(this)
                } else Q(this, this.Z(), o, l, k, m)
            }
        }
    };

    function P(a) {
        if (--a.W == 0 && a.$) a.P ? L(a.q) : K(a.q)
    }
    mti.o.prototype.ma = function (a, b, c, d, e) {
        if (b != this.K.L(c)) {
            s(this.a, c);
            J(this.q, d, e);
            this.P = true;
            P(this)
        } else if (this.Z() - a < 5E3) Q(this, a, b, c, d, e);
        else {
            s(this.a, c);
            a = this.q;
            u(a.a, a.g, a.m.l(a.n, d, e, mti.c.p));
            t(a.a, a.g, a.m.l(a.n, d, e, mti.c.B));
            I(a, mti.c.G + mti.c.B, d, e);
            P(this)
        }
    };

    function Q(a, b, c, d, e, f) {
        a.D(function (g, h) {
            return function () {
                h.call(g, b, c, d, e, f)
            }
        }(a, a.ma), 50)
    }

    function O(a, b, c) {
        c = a.qa.expand(c);
        b = a.a.createElement("span", {
            style: "position:absolute;top:-999px;font-size:300px;font-family:" + b + "," + mti.o.S + ";" + c
        }, "Mm");
        j(a.a, "body", b);
        return b
    };
    mti.r = function (a, b, c, d, e) {
        this.a = a;
        this.Y = b;
        this.g = c;
        this.D = d;
        this.b = e;
        this.M = this.N = 0
    };
    mti.r.prototype.U = function (a, b) {
        this.Y.aa[a] = b
    };
    mti.r.prototype.load = function (a) {
        var b = new mti.c(this.a, this.g, a);
        this.b.da ? R(this, b, a) : K(b)
    };
    mti.r.prototype.sa = function (a, b, c, d) {
        if (d) a.load(mti.I(this, this.wa, b, c));
        else {
            a = --this.N == 0;
            this.M--;
            if (a) this.M == 0 ? K(b) : H(b);
            c.watch([], {}, a)
        }
    };
    mti.r.prototype.wa = function (a, b, c, d) {
        var e = --this.N == 0;
        e && H(a);
        this.D(mti.I(this, function (f, g, h, m) {
            setTimeout(function () {
                f.watch(g, h || {}, m)
            }, 100)
        }, b, c, d, e))
    };

    function R(a, b, c) {
        c = M(a.Y, c);
        a.M = a.N = c.length;
        for (var d = new mti.o(a.a, b, {
            L: function (h) {
                return h.offsetWidth
            }
        }, a.D, function () {
            return (new Date).getTime()
        }), e = 0, f = c.length; e < f; e++) {
            var g = c[e];
            S(g, a.b, mti.I(a, a.sa, g, b, d))
        }
    };
    mti.w = function (a) {
        this.ta = a || mti.w.ea
    };
    mti.w.ea = "-";
    mti.w.prototype.l = function () {
        for (var a = [], b = 0; b < arguments.length; b++) a.push(arguments[b].replace(/[\W_]+/g, "").toLowerCase());
        return a.join(this.ta)
    };
    mti.R = function () {
        this.ca = '"'
    };
    mti.R.prototype.quote = function (a) {
        var b = [];
        a = a.split(/,\s*/);
        for (var c = 0; c < a.length; c++) {
            var d = a[c].replace(/['"]/g, "");
            d.indexOf(" ") == -1 ? b.push(d) : b.push(this.ca + d + this.ca)
        }
        return b.join(",")
    };
    mti.i = function () {
        this.ba = mti.i.ja;
        this.u = mti.i.la
    };
    mti.i.ja = ["font-style", "font-weight"];
    mti.i.la = {
        "font-style": [
            ["n", "normal"]
        ],
        "font-weight": [
            ["4", "normal"]
        ]
    };
    mti.i.T = function (a, b, c) {
        this.ra = a;
        this.za = b;
        this.u = c
    };
    mti.i.T.prototype.expand = function (a, b) {
        for (var c = 0; c < this.u.length; c++) if (b == this.u[c][0]) {
            a[this.ra] = this.za + ":" + this.u[c][1];
            return
        }
    };
    mti.i.prototype.expand = function (a) {
        if (a.length != 2) return null;
        for (var b = [null, null], c = 0, d = this.ba.length; c < d; c++) {
            var e = this.ba[c],
                f = a.substr(c, 1);
            (new mti.i.T(c, e, this.u[e])).expand(b, f)
        }
        return b[0] && b[1] ? b.join(";") + ";" : null
    };
    window.MonoTypeWebFonts = function () {
        var a = (new mti.e(navigator.userAgent)).parse();
        return new mti.r(new mti.A(document, a), new mti.ga, document.documentElement, function (b, c) {
            setTimeout(b, c)
        }, a)
    }();
    window.MonoTypeWebFonts.load = window.MonoTypeWebFonts.load;
    window.MonoTypeWebFonts.addModule = window.MonoTypeWebFonts.U;
    mti.H = function (a, b, c) {
        this.O = a;
        this.a = b;
        this.ya = c;
        this.t = {};
        this.J = []
    };
    mti.H.prototype.indexOf = function (a, b) {
        if (a.indexOf) return a.indexOf(b);
        else {
            for (var c = 0; c < a.length; c++) if (a[c] == b) return c;
            return -1
        }
    };

    function T(a, b) {
        var c = a.ya,
            d = typeof b.currentStyle != "undefined" ? b.currentStyle.fontFamily : a.a.h.defaultView.getComputedStyle(b, null).getPropertyValue("font-family");
        d = (d || "").replace(/^\s|\s$/g, "").replace(/'|"/g, "");
        if (d != "") {
            var e = new RegExp(d, "ig");
            for (i = 0; i < c.length; i++) {
                var f = c[i];
                if (e.test(f.fontfamily.replace(/^\s|\s$/g, ""))) {
                    var g;
                    if (b) g = typeof b.currentStyle != "undefined" ? b.currentStyle.visibility : a.a.h.defaultView.getComputedStyle(b, null).getPropertyValue("visibility");
                    if (g != "hidden") b.style.visibility = "hidden";
                    a.J.push(b);
                    if (f.enableSubsetting) if (a.t[d]) a.t[d] += w(a.a, b);
                    else a.t[d] = w(a.a, b)
                }
            }
        }
    }

    function U(a) {
        var b = "img,select,option,script,noscript,iframe,object,style,param,embed,link,meta,head,title,br,hr".split(","),
            c = a.O,
            d = null;
        do {
            d = c.firstChild;
            if (d == null) {
                c.nodeType == 1 && a.indexOf(b, c.tagName.toLowerCase()) < 0 && T(a, c);
                d = c.nextSibling
            }
            if (d == null) {
                c = c;
                do {
                    d = c.parentNode;
                    if (d == a.O) break;
                    d.nodeType == 1 && a.indexOf(b, d.tagName.toLowerCase()) < 0 && T(a, d);
                    c = d;
                    d = d.nextSibling
                } while (d == null)
            }
            c = d
        } while (c != a.O);
        b = false;
        for (p in a.t) {
            b = true;
            break
        }
        if (b) return a.t;
        return null
    };
    mti.j = function (a, b, c, d) {
        this.F = a;
        this.b = b;
        this.a = c;
        this.d = d;
        this.X = [];
        this.pa = {}
    };
    mti.j.ia = "monotype";
    var V = "TTF";

    function S(a, b, c) {
        V = W(a);
        var d = a.d.projectId;
        if (d) {
            a.F["__mti_fntLst" + d] = function () {
                return a.d.pfL
            };
            a.F.mti_element_cache = [];
            X(a);
            if (a.d.reqSub) r(a.a, function () {
                var e = new mti.H(document.body, a.a, a.d.pfL),
                    f = U(e);
                for (fontfamily in f) f[fontfamily] = Y(a, f[fontfamily]);
                a.F.mti_element_cache = e.J;
                Z(a, f)
            });
            else {
                Z(a);
                q(a.a, function () {
                    var e = new mti.H(document.body, a.a, a.d.pfL);
                    U(e);
                    a.F.mti_element_cache = e.J
                })
            }
            c(b.da)
        } else c(true)
    }

    function W(a) {
        var b = a.d.ffArray,
            c = a.b.getName();
        c = c.toLowerCase();
        if (c == "firefox") c = "mozilla";
        if (/ipad|ipod|iphone/.test(a.b.xa.toLowerCase())) c = "msafari";
        a = a.b.Aa;
        b = b[c];
        c = "";
        for (p in b) if (parseFloat(a) >= parseFloat(p)) c = b[p];
        return c
    }
    mti.j.C = 300;

    function Z(a, b) {
        var c = a.d.projectId,
            d = a.d.ec,
            e = a.d.fcURL,
            f = a.d.dfcURL,
            g = a.a.createElement("style", {
                type: "text/css",
                id: "mti_fontface_" + a.d.projectId
            });
        j(a.a, "head", g);
        var h = "",
            m = false,
            k = {},
            o = {
                TTF: "truetype",
                WOFF: "woff",
                SVG: "svg"
            },
            l = V != null && V.toUpperCase() == "EOT";
        for (i = 0; i < a.d.pfL.length; i++) {
            var v = a.d.pfL[i],
                n = v.fontfamily,
                D = v.contentIds;
            a.X.push(n);
            if (b && b[n] && b[n].length > mti.j.C) {
                m = true;
                k[n] || (k[n] = []);
                var N = b[n],
                    E = (N.length - 1) / mti.j.C + 1;
                E = Math.floor(E);
                for (var y = 1; y <= E; y++) {
                    newFontFamily = n + "" + y;
                    k[n].push(newFontFamily);
                    b[newFontFamily] = N.substr((y - 1) * mti.j.C, mti.j.C);
                    h += "@font-face{font-family:'" + newFontFamily + "';src:url('" + $(a, D, c, v.enableSubsetting, d, e, f, a.d.ck, newFontFamily, b) + "')";
                    l || (h += " format('" + o[V.toUpperCase()] + "')");
                    h += ";}\n"
                }
            } else {
                h += "@font-face{font-family:'" + n + "';src:url('" + $(a, D, c, v.enableSubsetting, d, e, f, a.d.ck, n, b) + "')";
                if (!l) {
                    v = D[V.toUpperCase()];
                    n = o[V.toUpperCase()];
                    v || (n = o.TTF);
                    h += " format('" + n + "')"
                }
                h += ";}\n"
            }
        }
        if (m === true) {
            s(a.a, a.a.getElementById("mti_stylesheet_" + a.d.projectId) || {});
            X(a, k)
        }
        if (g.styleSheet) g.styleSheet.cssText = h;
        else {
            a = document.createTextNode(h);
            g.appendChild(a)
        }
    }

    function X(a, b) {
        var c = a.a.createElement("style", {
            type: "text/css",
            id: "mti_stylesheet_" + a.d.projectId
        });
        j(a.a, "head", c);
        var d = "";
        for (i in a.d.selectorFontMap) {
            var e = a.d.selectorFontMap[i];
            if (b && b[e] && b[e].length > 0) e = b[e].join("','");
            d += i + "{font-family:'" + e + "';}\n";
            d += "/*fout specific code:*/\n";
            d += "." + mti.c.z + "-loading " + i + "{visibility:hidden;}\n";
            d += "." + mti.c.z + "-active " + i + ", ." + mti.c.z + "-inactive " + i + "{visibility: visible;}\n"
        }
        if (c.styleSheet) c.styleSheet.cssText = d;
        else {
            a = document.createTextNode(d);
            c.appendChild(a)
        }
    }
    function Y(a, b) {
        if (b && typeof b == "string") {
            b = b.replace(/\s/g, "").replace(/\n/g, "").replace(/\r/g, "");
            a = "";
            for (var c = b.length, d = null, e = 0; e < c; e++) {
                d = b.charAt(e);
                if (a.indexOf(d) == -1) a += d
            }
            return a
        }
        return ""
    }

    function $(a, b, c, d, e, f, g, h, m, k) {
        var o = b[V.toUpperCase()],
            l = "http://";
        if (window.location.protocol == "https:") l = "https://";
        f = f.replace("http://", "").replace("https://", "");
        g = g.replace("http://", "").replace("https://", "");
        f = l + f;
        g = l + g;
        url = d ? g + "?fctypeId=" + a.d.fctypeArray[V] + "&fcId=" + b.TTF + "&origId=" + o : e ? o ? f + o + "." + V.toLowerCase() + "?" + h : f + b.TTF + ".ttf?" + h : f + "?fctypeId=" + a.d.fctypeArray[V] + "&fcId=" + o;
        url += "&projectId=" + c;
        if (k) url += "&content=" + escape((k[m] || "") + "giMm");
        if (V != null && V.toUpperCase() == "SVG") url += "#" + o;
        return url
    }
    mti.j.prototype.load = function (a) {
        a(this.X, this.pa)
    };
    mti.ha = function (a) {
        this.s = a
    };
    mti.ha.prototype.protocol = function () {
        var a = ["http:", "https:"],
            b = a[0];
        if (this.s && this.s.location && this.s.location.protocol) {
            var c = 0;
            for (c = 0; c < a.length; c++) if (this.s.location.protocol == a[c]) return this.s.location.protocol
        }
        return b
    };
    mti.Q = function (a, b) {
        this.a = a;
        this.d = b
    };
    mti.Q.prototype.appendBannerScript = function () {
        var a;
        a = new RegExp(escape("WFS_MTI_SS") + "=([^;]+)");
        if (a.test(document.cookie + ";")) {
            a.exec(document.cookie + ";");
            a = unescape(RegExp.$1)
        } else a = false;
        var b = this.d.bannerHandlerURL;
        if (b) {
            b += "?projectId=" + this.d.projectId;
            if (a !== false) b += "&WFS_MTI_SS=" + a;
            b += "&" + escape((new Date).getTime());
            j(this.a, "head", this.a.createElement("Script", {
                type: "text/javascript",
                src: b
            }))
        }
    };
    MonoTypeWebFonts.U(mti.j.ia, function (a) {
        var b = (new mti.e(navigator.userAgent)).parse(),
            c = new mti.A(document, b);
        window.MonoTypeWebFonts.BannerHandler = new mti.Q(c, a);
        return new mti.j(window, b, c, a)
    });
})(this, document);
if (window.addEventListener) {
    window.addEventListener('load', function () {
        MonoTypeWebFonts.cleanup()
    }, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', function () {
        MonoTypeWebFonts.cleanup();
    });
}
MonoTypeWebFonts.cleanupExecuted = false;
MonoTypeWebFonts.cleanup = function () {
    if (MonoTypeWebFonts.cleanupExecuted === true) {
        return;
    }
    MonoTypeWebFonts.cleanupExecuted = (window['mti_element_cache'].length > 0);
    for (i = 0; i < window['mti_element_cache'].length; i++) {
        window['mti_element_cache'][i].style.visibility = "";
    }
    var className = document.documentElement.className;
    className = className.replace(/\b(mti\-.*?(loading|active|inactive))\b/g, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    setTimeout(function () {
        document.documentElement.className = className + ' mti-repaint';
    }, 20); /*IE sometimes requires redrawing the browser after fonts are downloaded. Adding a classname might help*/
    if (!document.getElementById('MonoTypeFontApiFontTracker')) {
        var fontTrackingUrl = "http://fast.fonts.com/t/1.css";
        if (window.location.protocol == 'https:') {
            fontTrackingUrl = fontTrackingUrl.replace(/http:/, 'https:');
        }
        var head = document.getElementsByTagName('HEAD')[0];
        var trackerStyle = document.createElement('STYLE');
        trackerStyle.setAttribute('id', 'MonoTypeFontApiFontTracker');
        head.appendChild(trackerStyle);
        var _cssText = '@import url(' + fontTrackingUrl + '?apiType=js&projectid=f045c01b-713f-4aa3-b5e4-ae515caeeb7f);';
        if (trackerStyle.styleSheet) {
            trackerStyle.styleSheet.cssText = _cssText;
        } else {
            var tt1 = document.createTextNode(_cssText);
            trackerStyle.appendChild(tt1);
        }
    }
    window['mti_element_cache'] = [];
};
MonoTypeWebFonts._fontActiveEventList = [];
MonoTypeWebFonts._fontLoadingEventList = [];
MonoTypeWebFonts._activeEventList = [];
MonoTypeWebFonts._inActiveEventList = [];
MonoTypeWebFonts.addEvent = function (eventName, callbackFunction) {
    if (eventName.toLowerCase() == 'fontactive') {
        MonoTypeWebFonts._fontActiveEventList.push(callbackFunction);
    } else if (eventName.toLowerCase() == 'fontloading') {
        MonoTypeWebFonts._fontLoadingEventList.push(callbackFunction);
    } else if (eventName.toLowerCase() == 'inactive') {
        MonoTypeWebFonts._inActiveEventList.push(callbackFunction);
    } else if (eventName.toLowerCase() == 'active') {
        MonoTypeWebFonts._activeEventList.push(callbackFunction);
    }
};
MonoTypeWebFonts.load({
    monotype: {
        reqSub: false,
        pfL: [{
            'fontfamily': "HelveticaNeue W01 25 UltLt",
            contentIds: {
                EOT: '41774233-b9da-44be-b252-6a7b612fb1c7',
                WOFF: '4bff1fbb-b4bf-4d95-9c47-efcb14384e36',
                TTF: '7f1f2a7d-3837-4c93-b373-f03c5da3f9a1',
                SVG: 'd9f2752a-8d82-4cf1-b82f-109c1105be7f'
            },
            enableSubsetting: false
        }, {
            'fontfamily': "Helvetica Neue W01 45 Light",
            contentIds: {
                EOT: 'ae1656aa-5f8f-4905-aed0-93e667bd6e4a',
                WOFF: '530dee22-e3c1-4e9f-bf62-c31d510d9656',
                TTF: '688ab72b-4deb-4e15-a088-89166978d469',
                SVG: '7816f72f-f47e-4715-8cd7-960e3723846a'
            },
            enableSubsetting: false
        }, {
            'fontfamily': "Gill Sans W01 Light",
            contentIds: {
                EOT: 'acd8a043-828c-4c2c-98cb-b5224f5d4cdb',
                WOFF: 'c56da29d-9c5b-4d94-900f-770cde3dd317',
                TTF: '378182d1-8021-4674-a814-cc8f01f9a937',
                SVG: 'd8851d95-478d-47a9-a0b0-a8d8e4ca127a'
            },
            enableSubsetting: false
        }],
        selectorFontMap: {},
        ck: 'd44f19a684109620e484157ba390e8189361fc74c0a37f20eaff75fcd44f013f6bf007708d11a0bdea70096674199980e4bd4f2f699c95f0d379c9964f390ff54cda782ff5e31f03eff36b2536b63c5da91e402e2671c206251865e8238fd9717f68801087178e34e9779033b1e2b621d2cc5a220146292d78f3244c',
        ec: 'true',
        fcURL: 'http://fast.fonts.com/d/',
        dfcURL: 'http://api.fonts.com/FontContentHandler.axd',
        sO: 'True',
        ffArray: {
            safari: {
                '3.1': 'ttf'
            },
            msafari: {
                '1': 'svg'
            },
            chrome: {
                '3': 'svg',
                '4': 'ttf',
                '5': 'woff'
            },
            opera: {
                '10': 'ttf'
            },
            msie: {
                '4': 'eot',
                '9': 'woff'
            },
            mozilla: {
                '3.5': 'ttf',
                '3.6': 'woff'
            }
        },
        fctypeArray: {
            'ttf': '1',
            'eot': '2',
            'woff': '3',
            'svg': '11'
        },
        projectId: 'f045c01b-713f-4aa3-b5e4-ae515caeeb7f',
        EOD: null
    },
    fontloading: function (fontFamily, fontDescription) {
        for (var i = 0; i < MonoTypeWebFonts._fontLoadingEventList.length; i++) {
            MonoTypeWebFonts._fontLoadingEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);
        }
    },
    fontactive: function (fontFamily, fontDescription) {
        for (var i = 0; i < MonoTypeWebFonts._fontActiveEventList.length; i++) {
            MonoTypeWebFonts._fontActiveEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);
        }
    },
    inactive: function () {
        MonoTypeWebFonts.cleanup();
        for (var i = 0; i < MonoTypeWebFonts._inActiveEventList.length; i++) {
            MonoTypeWebFonts._inActiveEventList[i].call(MonoTypeWebFonts);
        }
    },
    active: function () {
        if (!document.getElementById('mti_wfs_colophon')) {
            var colophon = document.createElement('DIV');
            colophon.style.id = 'mti_wfs_colophon';
            colophon.style.position = 'fixed';
            colophon.style.display = 'inline-block';
            colophon.style.bottom = '0px';
            colophon.style.right = '0px';
            document.body.appendChild(colophon);
            var colophonImageUrl = 'http://fast.fonts.com/colophon/Webfonts-SmallBadge.gif';
            if (window.location.protocol.toLowerCase() == 'https:') {
                colophonImageUrl = colophonImageUrl.replace('http:', 'https:');
            } else if (window.location.protocol.toLowerCase() == 'http:') {
                colophonImageUrl = colophonImageUrl.replace('https:', 'http:');
            }
            colophon.innerHTML = "<a target='_blank' href='http://webfonts.fonts.com/BannerScript/PublishersUsedFont/f045c01b-713f-4aa3-b5e4-ae515caeeb7f'><img src='" + colophonImageUrl + "' alt='View all fonts in this project' border='0' /></a>";
        }
        MonoTypeWebFonts.cleanup();
        for (var i = 0; i < MonoTypeWebFonts._activeEventList.length; i++) {
            MonoTypeWebFonts._activeEventList[i].call(MonoTypeWebFonts);
        }
    }
});
setTimeout(function () {
    MonoTypeWebFonts.cleanup();
}, 6000);
