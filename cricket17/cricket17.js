(function() {
  var g;
  function h(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Tc = b.prototype;
    a.prototype = new c();
    for (var d in b)
      if (Object.defineProperties) {
        var e = Object.getOwnPropertyDescriptor(b, d);
        e && Object.defineProperty(a, d, e);
      } else a[d] = b[d];
  }
  var aa =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    ba =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this;
  function ca() {
    ca = function() {};
    ba.Symbol || (ba.Symbol = da);
  }
  var fa = 0;
  function da(a) {
    return "jscomp_symbol_" + (a || "") + fa++;
  }
  function ga() {
    ca();
    var a = ba.Symbol.iterator;
    a || (a = ba.Symbol.iterator = ba.Symbol("iterator"));
    "function" != typeof Array.prototype[a] &&
      aa(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return ha(this);
        }
      });
    ga = function() {};
  }
  function ha(a) {
    var b = 0;
    return ia(function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }
  function ia(a) {
    ga();
    a = { next: a };
    a[ba.Symbol.iterator] = function() {
      return this;
    };
    return a;
  }
  function k(a) {
    ga();
    var b = a[Symbol.iterator];
    return b ? b.call(a) : ha(a);
  }
  function ja(a) {
    for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
    return c;
  }
  function ka(a, b) {
    if (b) {
      var c = ba;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d &&
        null != b &&
        aa(c, a, { configurable: !0, writable: !0, value: b });
    }
  }
  function la(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  ka("WeakMap", function(a) {
    function b(a) {
      this.H = (f += Math.random() + 1).toString();
      if (a) {
        ca();
        ga();
        a = k(a);
        for (var b; !(b = a.next()).done; ) (b = b.value), this.set(b[0], b[1]);
      }
    }
    function c(a) {
      la(a, e) || aa(a, e, { value: {} });
    }
    function d(a) {
      var b = Object[a];
      b &&
        (Object[a] = function(a) {
          c(a);
          return b(a);
        });
    }
    if (
      (function() {
        if (!a || !Object.seal) return !1;
        try {
          var b = Object.seal({}),
            c = Object.seal({}),
            d = new a([[b, 2], [c, 3]]);
          if (2 != d.get(b) || 3 != d.get(c)) return !1;
          d.delete(b);
          d.set(c, 4);
          return !d.has(b) && 4 == d.get(c);
        } catch (y) {
          return !1;
        }
      })()
    )
      return a;
    var e =
      "$jscomp_hidden_" +
      Math.random()
        .toString()
        .substring(2);
    d("freeze");
    d("preventExtensions");
    d("seal");
    var f = 0;
    b.prototype.set = function(a, b) {
      c(a);
      if (!la(a, e)) throw Error("a`" + a);
      a[e][this.H] = b;
      return this;
    };
    b.prototype.get = function(a) {
      return la(a, e) ? a[e][this.H] : void 0;
    };
    b.prototype.has = function(a) {
      return la(a, e) && la(a[e], this.H);
    };
    b.prototype.delete = function(a) {
      return la(a, e) && la(a[e], this.H) ? delete a[e][this.H] : !1;
    };
    return b;
  });
  ka("Map", function(a) {
    function b() {
      var a = {};
      return (a.qb = a.next = a.head = a);
    }
    function c(a, b) {
      var c = a.H;
      return ia(function() {
        if (c) {
          for (; c.head != a.H; ) c = c.qb;
          for (; c.next != c.head; )
            return (c = c.next), { done: !1, value: b(c) };
          c = null;
        }
        return { done: !0, value: void 0 };
      });
    }
    function d(a, b) {
      var c = b && typeof b;
      "object" == c || "function" == c
        ? f.has(b)
          ? (c = f.get(b))
          : ((c = "" + ++l), f.set(b, c))
        : (c = "p_" + b);
      var d = a.v[c];
      if (d && la(a.v, c))
        for (a = 0; a < d.length; a++) {
          var e = d[a];
          if ((b !== b && e.key !== e.key) || b === e.key)
            return { id: c, list: d, index: a, Ka: e };
        }
      return { id: c, list: d, index: -1, Ka: void 0 };
    }
    function e(a) {
      this.v = {};
      this.H = b();
      this.size = 0;
      if (a) {
        a = k(a);
        for (var c; !(c = a.next()).done; ) (c = c.value), this.set(c[0], c[1]);
      }
    }
    if (
      (function() {
        if (!a || !a.prototype.entries || "function" != typeof Object.seal)
          return !1;
        try {
          var b = Object.seal({ x: 4 }),
            c = new a(k([[b, "s"]]));
          if (
            "s" != c.get(b) ||
            1 != c.size ||
            c.get({ x: 4 }) ||
            c.set({ x: 4 }, "t") != c ||
            2 != c.size
          )
            return !1;
          var d = c.entries(),
            e = d.next();
          if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
          e = d.next();
          return e.done ||
            4 != e.value[0].x ||
            "t" != e.value[1] ||
            !d.next().done
            ? !1
            : !0;
        } catch (vd) {
          return !1;
        }
      })()
    )
      return a;
    ca();
    ga();
    var f = new WeakMap();
    e.prototype.set = function(a, b) {
      var c = d(this, a);
      c.list || (c.list = this.v[c.id] = []);
      c.Ka
        ? (c.Ka.value = b)
        : ((c.Ka = {
            next: this.H,
            qb: this.H.qb,
            head: this.H,
            key: a,
            value: b
          }),
          c.list.push(c.Ka),
          (this.H.qb.next = c.Ka),
          (this.H.qb = c.Ka),
          this.size++);
      return this;
    };
    e.prototype.delete = function(a) {
      a = d(this, a);
      return a.Ka && a.list
        ? (a.list.splice(a.index, 1),
          a.list.length || delete this.v[a.id],
          (a.Ka.qb.next = a.Ka.next),
          (a.Ka.next.qb = a.Ka.qb),
          (a.Ka.head = null),
          this.size--,
          !0)
        : !1;
    };
    e.prototype.clear = function() {
      this.v = {};
      this.H = this.H.qb = b();
      this.size = 0;
    };
    e.prototype.has = function(a) {
      return !!d(this, a).Ka;
    };
    e.prototype.get = function(a) {
      return (a = d(this, a).Ka) && a.value;
    };
    e.prototype.entries = function() {
      return c(this, function(a) {
        return [a.key, a.value];
      });
    };
    e.prototype.forEach = function(a, b) {
      for (var c = this.entries(), d; !(d = c.next()).done; )
        (d = d.value), a.call(b, d[1], d[0], this);
    };
    e.prototype[Symbol.iterator] = e.prototype.entries;
    var l = 0;
    return e;
  });
  ka("Number.MAX_SAFE_INTEGER", function() {
    return 9007199254740991;
  });
  ka("Number.MIN_SAFE_INTEGER", function() {
    return -9007199254740991;
  });
  var ma = this;
  function na(a) {
    return void 0 !== a;
  }
  function oa(a) {
    return "string" == typeof a;
  }
  function pa(a) {
    return "number" == typeof a;
  }
  function qa() {}
  function ra(a) {
    a.vc = void 0;
    a.qa = function() {
      return a.vc ? a.vc : (a.vc = new a());
    };
  }
  function sa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ta(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function() {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function() {
      return a.apply(b, arguments);
    };
  }
  function ua(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf("native code")
      ? (ua = sa)
      : (ua = ta);
    return ua.apply(null, arguments);
  }
  function va(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
      var b = c.slice();
      b.push.apply(b, arguments);
      return a.apply(this, b);
    };
  }
  var wa =
    Date.now ||
    function() {
      return +new Date();
    };
  function xa() {
    var a = ["google", "doodle", "jesr"],
      b = ma;
    a[0] in b || !b.execScript || b.execScript("var " + a[0]);
    for (var c; a.length && (c = a.shift()); )
      !a.length && na(!0)
        ? (b[c] = !0)
        : b[c] && b[c] !== Object.prototype[c]
        ? (b = b[c])
        : (b = b[c] = {});
  }
  function ya(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Tc = b.prototype;
    a.prototype = new c();
    a.Wc = function(a, c, f) {
      for (
        var d = Array(arguments.length - 2), e = 2;
        e < arguments.length;
        e++
      )
        d[e - 2] = arguments[e];
      return b.prototype[c].apply(a, d);
    };
  }
  var za = String.prototype.trim
    ? function(a) {
        return a.trim();
      }
    : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
      };
  function m(a, b) {
    return -1 != a.indexOf(b);
  }
  function Aa(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  var Ba = Array.prototype.indexOf
      ? function(a, b, c) {
          return Array.prototype.indexOf.call(a, b, c);
        }
      : function(a, b, c) {
          c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if (oa(a)) return oa(b) && 1 == b.length ? a.indexOf(b, c) : -1;
          for (; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ca = Array.prototype.forEach
      ? function(a, b, c) {
          Array.prototype.forEach.call(a, b, c);
        }
      : function(a, b, c) {
          for (var d = a.length, e = oa(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a);
        },
    Da = Array.prototype.map
      ? function(a, b, c) {
          return Array.prototype.map.call(a, b, c);
        }
      : function(a, b, c) {
          for (
            var d = a.length, e = Array(d), f = oa(a) ? a.split("") : a, l = 0;
            l < d;
            l++
          )
            l in f && (e[l] = b.call(c, f[l], l, a));
          return e;
        },
    Ea = Array.prototype.reduce
      ? function(a, b, c, d) {
          d && (b = ua(b, d));
          return Array.prototype.reduce.call(a, b, c);
        }
      : function(a, b, c, d) {
          var e = c;
          Ca(a, function(c, l) {
            e = b.call(d, e, c, l, a);
          });
          return e;
        };
  function Fa(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function Ga(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function Ha(a, b) {
    a.sort(b || Ia);
  }
  function Ia(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  function Ja(a, b, c, d, e, f) {
    if (6 == arguments.length) Ka(this, a, b, c, d, e, f);
    else {
      if (0 != arguments.length) throw Error("b");
      this.Ma = this.Oa = 1;
      this.mb = this.lb = this.Xa = this.Ya = 0;
    }
  }
  function Ka(a, b, c, d, e, f, l) {
    if (!(pa(b) && pa(c) && pa(d) && pa(e) && pa(f) && pa(l))) throw Error("c");
    a.Ma = b;
    a.mb = c;
    a.lb = d;
    a.Oa = e;
    a.Xa = f;
    a.Ya = l;
    return a;
  }
  Ja.prototype.scale = function(a, b) {
    this.Ma *= a;
    this.mb *= a;
    this.lb *= b;
    this.Oa *= b;
    return this;
  };
  Ja.prototype.toString = function() {
    return (
      "matrix(" +
      [this.Ma, this.mb, this.lb, this.Oa, this.Xa, this.Ya].join() +
      ")"
    );
  };
  function La(a, b, c) {
    return Math.min(Math.max(a, b), c);
  }
  function n(a, b, c) {
    return a + c * (b - a);
  }
  function q(a) {
    return (a * Math.PI) / 180;
  }
  function r(a) {
    return (180 * a) / Math.PI;
  }
  function Ma(a, b) {
    this.x = na(a) ? a : 0;
    this.y = na(b) ? b : 0;
  }
  function Na(a, b) {
    var c = a.x - b.x;
    a = a.y - b.y;
    return Math.sqrt(c * c + a * a);
  }
  Ma.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  Ma.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  Ma.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  Ma.prototype.scale = function(a, b) {
    b = pa(b) ? b : a;
    this.x *= a;
    this.y *= b;
    return this;
  };
  function u(a, b) {
    this.width = a;
    this.height = b;
  }
  u.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  u.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  u.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  u.prototype.scale = function(a, b) {
    b = pa(b) ? b : a;
    this.width *= a;
    this.height *= b;
    return this;
  };
  function Oa(a, b, c) {
    this.x = na(a) ? a : 0;
    this.y = na(b) ? b : 0;
    this.z = na(c) ? c : 0;
  }
  Oa.prototype.H = function() {
    return new Oa(this.x, this.y, this.z);
  };
  function Pa(a, b) {
    var c = a.x - b.x,
      d = a.y - b.y;
    a = a.z - b.z;
    return Math.sqrt(c * c + d * d + a * a);
  }
  function v(a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
  }
  ya(v, Oa);
  v.prototype.H = function() {
    return new v(this.x, this.y, this.z);
  };
  function Qa(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  }
  v.prototype.scale = function(a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  };
  function Ra(a, b) {
    a.x += b.x;
    a.y += b.y;
    a.z += b.z;
    return a;
  }
  function Sa(a, b) {
    return new v(a.x + b.x, a.y + b.y, a.z + b.z);
  }
  function Ta(a, b) {
    return new v(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  function Ua(a, b, c) {
    return new v(n(a.x, b.x, c), n(a.y, b.y, c), n(a.z, b.z, c));
  }
  function w(a, b, c) {
    a = void 0 === a ? 0 : a;
    this.Va = [];
    this.ma = null;
    this.S =
      a instanceof v ? a : new v(a, void 0 === b ? 0 : b, void 0 === c ? 0 : c);
    this.Ua = new v(0, 0, 0);
    this.hc = new v(0, 0, 0);
    this.dc = this.tb = 1;
    this.Kb = this.Jb = this.H = !0;
    this.Gb = new Va();
  }
  g = w.prototype;
  g.Tb = function(a) {
    this.Jb = !0;
    for (var b = k(this.Va), c = b.next(); !c.done; c = b.next()) c.value.Tb(a);
  };
  g.ac = function(a) {
    this.Kb = !0;
    for (var b = k(this.Va), c = b.next(); !c.done; c = b.next()) c.value.ac(a);
  };
  function x(a, b) {
    a.Tb(!0);
    a.ac(!0);
    if (a.ma) {
      var c = a.ma.Va,
        d = Ba(c, a);
      0 <= d && Array.prototype.splice.call(c, d, 1);
    }
    (a.ma = b) && a.ma.Va.push(a);
  }
  function Wa(a, b) {
    x(b, a);
  }
  function z(a) {
    x(a, null);
  }
  g.Da = function(a, b, c) {
    this.Tb(!0);
    a instanceof v
      ? ((this.S.x = a.x), (this.S.y = a.y), (this.S.z = a.z))
      : ((this.S.x = a),
        (this.S.y = void 0 === b ? this.S.y : b),
        (this.S.z = void 0 === c ? this.S.z : c));
  };
  function A(a, b) {
    a.ac(!0);
    a.Tb(!0);
    a.tb = b;
  }
  function B(a) {
    a.Jb &&
      ((a.Ua.x = a.S.x),
      (a.Ua.y = a.S.y),
      (a.Ua.z = a.S.z),
      a.ma && Ra(a.Ua.scale(Xa(a.ma)), B(a.ma)),
      (a.hc = a.Ua),
      (a.Jb = !1));
    return a.hc;
  }
  function Ya(a) {
    a = B(a);
    return new Ma(a.x, a.z);
  }
  function Xa(a) {
    if (a.Kb) {
      var b = a.ma ? a.tb * Xa(a.ma) : a.tb;
      a.dc = b;
      a.Kb = !1;
    }
    return a.dc;
  }
  function Za(a, b) {
    if (a.H) {
      b(a);
      a = k(a.Va);
      for (var c = a.next(); !c.done; c = a.next()) Za(c.value, b);
    }
  }
  g.Ba = function() {
    return new u(0, 0);
  };
  g.ya = function() {};
  function Va() {
    this.H = 0;
  }
  function $a() {
    w.call(this);
    this.W = !1;
  }
  h($a, w);
  g = $a.prototype;
  g.ya = function(a) {
    this.W || ((this.W = !0), this.Kc());
    this.wc(a);
    this.Db() && this.nb();
  };
  g.wc = function() {};
  g.Kc = function() {};
  g.nb = function() {};
  g.Db = function() {
    return !1;
  };
  function ab(a, b, c) {
    b = void 0 === b ? function() {} : b;
    c = void 0 === c ? function() {} : c;
    $a.call(this);
    this.v = 0;
    this.T = a;
    b && (this.wc = b);
    this.nb = c;
  }
  h(ab, $a);
  ab.prototype.Db = function() {
    return this.v >= this.T;
  };
  ab.prototype.ya = function(a) {
    this.v += a;
    $a.prototype.ya.call(this, a);
  };
  function bb(a) {
    $a.call(this);
    this.v = a;
  }
  h(bb, $a);
  bb.prototype.ya = function(a) {
    for (var b = k(this.v), c = b.next(); !c.done; c = b.next())
      (c = c.value), c.Db() || c.ya(a);
    $a.prototype.ya.call(this, a);
  };
  bb.prototype.Db = function() {
    for (var a = k(this.v), b = a.next(); !b.done; b = a.next())
      if (!b.value.Db()) return !1;
    return !0;
  };
  function C() {
    w.call(this);
    this.v = [];
    this.R = [];
  }
  h(C, w);
  C.prototype.ya = function(a) {
    if (0 < this.v.length && 0 < a) {
      var b = this.v[0];
      b.ya(a);
      b.Db() && this.v.length && this.v[0] === b && this.v.shift();
    }
    for (b = 0; b < this.R.length; b++)
      this.R[b].ya(a), this.R[b].Db() && this.R.splice(b--, 1);
  };
  function D(a, b) {
    Array.isArray(b) ? a.v.push(new bb(b)) : a.v.push(b);
  }
  function E(a, b, c) {
    var d;
    D(
      a,
      new ab(
        b,
        void 0 === d ? function() {} : d,
        void 0 === c ? function() {} : c
      )
    );
  }
  function F(a, b, c) {
    var d;
    G(
      a,
      new ab(
        b,
        void 0 === d ? function() {} : d,
        void 0 === c ? function() {} : c
      )
    );
  }
  function G(a, b) {
    Array.isArray(b) ? a.R.push(new bb(b)) : a.R.push(b);
  }
  function cb(a) {
    var b = new Image(),
      c = db,
      d = "";
    b.onerror = b.onload = b.onabort = function() {
      delete eb[c];
    };
    eb[c] = b;
    -1 != a.search("&ei=") || (d = "&ei=");
    a = "/gen_204?atyp=i&ct=doodle&cad=" + a + d + "&zx=" + wa();
    // /^http:/i.test(a) && "https:" == window.location.protocol
    //   ? delete eb[c]
    //   : ((b.src = a), (db = c + 1));
  }
  var eb = [],
    db = 0;
  var fb =
    "StopIteration" in ma
      ? ma.StopIteration
      : { message: "StopIteration", stack: "" };
  function gb() {}
  gb.prototype.next = function() {
    throw fb;
  };
  gb.prototype.Vc = function() {
    return this;
  };
  function hb(a, b) {
    this.v = {};
    this.H = [];
    this.R = this.S = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("d");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a) {
      if (a instanceof hb) {
        var e = a.Ob();
        d = a.Pb();
      } else {
        var c = [],
          f = 0;
        for (e in a) c[f++] = e;
        e = c;
        c = [];
        f = 0;
        for (d in a) c[f++] = a[d];
        d = c;
      }
      for (c = 0; c < e.length; c++) this.set(e[c], d[c]);
    }
  }
  g = hb.prototype;
  g.Pb = function() {
    ib(this);
    for (var a = [], b = 0; b < this.H.length; b++) a.push(this.v[this.H[b]]);
    return a;
  };
  g.Ob = function() {
    ib(this);
    return this.H.concat();
  };
  function ib(a) {
    var b, c;
    if (a.S != a.H.length) {
      for (b = c = 0; c < a.H.length; ) {
        var d = a.H[c];
        jb(a.v, d) && (a.H[b++] = d);
        c++;
      }
      a.H.length = b;
    }
    if (a.S != a.H.length) {
      var e = {};
      for (b = c = 0; c < a.H.length; )
        (d = a.H[c]), jb(e, d) || ((a.H[b++] = d), (e[d] = 1)), c++;
      a.H.length = b;
    }
  }
  g.get = function(a, b) {
    return jb(this.v, a) ? this.v[a] : b;
  };
  g.set = function(a, b) {
    jb(this.v, a) || (this.S++, this.H.push(a), this.R++);
    this.v[a] = b;
  };
  g.forEach = function(a, b) {
    for (var c = this.Ob(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  g.Vc = function(a) {
    ib(this);
    var b = 0,
      c = this.R,
      d = this,
      e = new gb();
    e.next = function() {
      if (c != d.R) throw Error("e");
      if (b >= d.H.length) throw fb;
      var e = d.H[b++];
      return a ? e : d.v[e];
    };
    return e;
  };
  function jb(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var kb = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
  function lb(a, b) {
    if (a) {
      a = a.split("&");
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="),
          e = null;
        if (0 <= d) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else f = a[c];
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  }
  function mb(a, b) {
    this.R = this.W = this.S = "";
    this.ma = null;
    this.U = this.T = "";
    this.H = !1;
    if (a instanceof mb) {
      this.H = na(b) ? b : a.H;
      nb(this, a.S);
      this.W = a.W;
      this.R = a.R;
      ob(this, a.ma);
      this.T = a.T;
      b = a.v;
      var c = new pb();
      c.S = b.S;
      b.H && ((c.H = new hb(b.H)), (c.v = b.v));
      qb(this, c);
      this.U = a.U;
    } else
      a && (c = String(a).match(kb))
        ? ((this.H = !!b),
          nb(this, c[1] || "", !0),
          (this.W = rb(c[2] || "")),
          (this.R = rb(c[3] || "", !0)),
          ob(this, c[4]),
          (this.T = rb(c[5] || "", !0)),
          qb(this, c[6] || "", !0),
          (this.U = rb(c[7] || "")))
        : ((this.H = !!b), (this.v = new pb(null, 0, this.H)));
  }
  mb.prototype.toString = function() {
    var a = [],
      b = this.S;
    b && a.push(sb(b, tb, !0), ":");
    var c = this.R;
    if (c || "file" == b)
      a.push("//"),
        (b = this.W) && a.push(sb(b, tb, !0), "@"),
        a.push(
          encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
        ),
        (c = this.ma),
        null != c && a.push(":", String(c));
    if ((c = this.T))
      this.R && "/" != c.charAt(0) && a.push("/"),
        a.push(sb(c, "/" == c.charAt(0) ? ub : vb, !0));
    (c = this.v.toString()) && a.push("?", c);
    (c = this.U) && a.push("#", sb(c, wb));
    return a.join("");
  };
  function nb(a, b, c) {
    a.S = c ? rb(b, !0) : b;
    a.S && (a.S = a.S.replace(/:$/, ""));
  }
  function ob(a, b) {
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) throw Error("f`" + b);
      a.ma = b;
    } else a.ma = null;
  }
  function qb(a, b, c) {
    b instanceof pb
      ? ((a.v = b), xb(a.v, a.H))
      : (c || (b = sb(b, yb)), (a.v = new pb(b, 0, a.H)));
  }
  function rb(a, b) {
    return a
      ? b
        ? decodeURI(a.replace(/%25/g, "%2525"))
        : decodeURIComponent(a)
      : "";
  }
  function sb(a, b, c) {
    return oa(a)
      ? ((a = encodeURI(a).replace(b, zb)),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a)
      : null;
  }
  function zb(a) {
    a = a.charCodeAt(0);
    return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
  }
  var tb = /[#\/\?@]/g,
    vb = /[\#\?:]/g,
    ub = /[\#\?]/g,
    yb = /[\#\?@]/g,
    wb = /#/g;
  function pb(a, b, c) {
    this.v = this.H = null;
    this.S = a || null;
    this.R = !!c;
  }
  function Ab(a) {
    a.H ||
      ((a.H = new hb()),
      (a.v = 0),
      a.S &&
        lb(a.S, function(b, c) {
          Bb(a, decodeURIComponent(b.replace(/\+/g, " ")), c);
        }));
  }
  function Bb(a, b, c) {
    Ab(a);
    a.S = null;
    b = Cb(a, b);
    var d = a.H.get(b);
    d || a.H.set(b, (d = []));
    d.push(c);
    a.v += 1;
  }
  function Db(a, b) {
    Ab(a);
    b = Cb(a, b);
    jb(a.H.v, b) &&
      ((a.S = null),
      (a.v -= a.H.get(b).length),
      (a = a.H),
      jb(a.v, b) &&
        (delete a.v[b], a.S--, a.R++, a.H.length > 2 * a.S && ib(a)));
  }
  function Eb(a, b) {
    Ab(a);
    b = Cb(a, b);
    return jb(a.H.v, b);
  }
  g = pb.prototype;
  g.forEach = function(a, b) {
    Ab(this);
    this.H.forEach(function(c, d) {
      Ca(
        c,
        function(c) {
          a.call(b, c, d, this);
        },
        this
      );
    }, this);
  };
  g.Ob = function() {
    Ab(this);
    for (var a = this.H.Pb(), b = this.H.Ob(), c = [], d = 0; d < b.length; d++)
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  g.Pb = function(a) {
    Ab(this);
    var b = [];
    if (oa(a)) Eb(this, a) && (b = Fa(b, this.H.get(Cb(this, a))));
    else {
      a = this.H.Pb();
      for (var c = 0; c < a.length; c++) b = Fa(b, a[c]);
    }
    return b;
  };
  g.set = function(a, b) {
    Ab(this);
    this.S = null;
    a = Cb(this, a);
    Eb(this, a) && (this.v -= this.H.get(a).length);
    this.H.set(a, [b]);
    this.v += 1;
    return this;
  };
  g.get = function(a, b) {
    a = a ? this.Pb(a) : [];
    return 0 < a.length ? String(a[0]) : b;
  };
  g.toString = function() {
    if (this.S) return this.S;
    if (!this.H) return "";
    for (var a = [], b = this.H.Ob(), c = 0; c < b.length; c++)
      for (
        var d = b[c], e = encodeURIComponent(String(d)), d = this.Pb(d), f = 0;
        f < d.length;
        f++
      ) {
        var l = e;
        "" !== d[f] && (l += "=" + encodeURIComponent(String(d[f])));
        a.push(l);
      }
    return (this.S = a.join("&"));
  };
  function Cb(a, b) {
    b = String(b);
    a.R && (b = b.toLowerCase());
    return b;
  }
  function xb(a, b) {
    b &&
      !a.R &&
      (Ab(a),
      (a.S = null),
      a.H.forEach(function(a, b) {
        var c = b.toLowerCase();
        b != c &&
          (Db(this, b),
          Db(this, c),
          0 < a.length &&
            ((this.S = null),
            this.H.set(Cb(this, c), Ga(a)),
            (this.v += a.length)));
      }, a));
    a.R = b;
  }
  var Fb,
    Gb = navigator.userAgent,
    Hb = window.location.href,
    Ib = m(Gb, "iPad") || m(Gb, "iPhone") || m(Gb, "iPod"),
    Jb = m(Gb.toLowerCase(), "gsa"),
    Kb = Ib && Jb,
    Lb = Jb && !Ib,
    Mb =
      Ib ||
      m(Gb, "Android") ||
      m(Gb, "Mobile") ||
      m(Gb, "Silk") ||
      m(Gb, "UCBrowser") ||
      m(Gb, "UCWEB"),
    Nb = 0 <= Gb.indexOf("MSIE"),
    Ob = m(Hb, "/logos/") && m(Hb, ".html");
  function Pb() {
    return (
      0 <= Hb.indexOf("fpdoodle=1") && !!document.getElementById("fpdoodle")
    );
  }
  function Qb(a, b) {
    for (var c = 1; c < arguments.length; c += 2) {
      var d = arguments[c],
        e = arguments[c + 1],
        f = a.style;
      f && d in f
        ? (f[d] = e)
        : d in a
        ? (a[d] = e)
        : Nb &&
          f &&
          "opacity" == d &&
          ((a.zoom = 1),
          (d = (f.filter || "").replace(/alpha\([^)]*\)/, "")),
          isNaN(parseFloat(e)) || (d += "alpha(opacity=" + 100 * e + ")"),
          (f.filter = d));
    }
  }
  var Rb = ["", "moz", "ms", "o", "webkit"];
  function Sb(a, b) {
    if (!a) return null;
    for (var c = 0; c < Rb.length; c++) {
      var d = Rb[c],
        e = b;
      0 < d.length && (e = b.charAt(0).toUpperCase() + b.substr(1));
      d += e;
      if ("undefined" != typeof a[d]) return d;
    }
    return null;
  }
  function Tb(a, b) {
    var c = window.google ? window.google.doodle : null;
    return c && void 0 != c[a] ? c[a] : b;
  }
  var Ub = Tb("alt", ""),
    Vb = Tb("hl", "en");
  function Wb() {
    var a = Tb("alltranslations", {});
    if (!a) return "";
    var b = a.messages,
      a = a.translations;
    if (!b || !a) return "";
    for (var c = -1, d = 0; d < b.length; d++)
      if ("Share Message" == b[d]) {
        c = d;
        break;
      }
    return -1 == c ? "" : (a[Vb] || a.en).ALL[c];
  }
  function Xb() {
    for (
      var a = [
          "requestAnimationFrame",
          "mozRequestAnimationFrame",
          "msRequestAnimationFrame",
          "oRequestAnimationFrame",
          "webkitRequestAnimationFrame"
        ],
        b = 0;
      b < a.length;
      b++
    ) {
      var c = window[a[b]];
      if (c)
        return function(a, b, d) {
          return c(function(b) {
            return a.call(d, b);
          }, b);
        };
    }
    var d = 0,
      e = 33,
      f = 50;
    return function(a, b, c) {
      b &&
        0 > --f &&
        (1.25 < b / e
          ? ((d = 0), (e = Math.min(66, ++e)))
          : 10 < ++d && ((d = 0), (e = Math.max(17, --e))));
      window.setTimeout(function(b) {
        a.call(c, b);
      }, e);
    };
  }
  function Yb(a, b, c) {
    Yb = Xb();
    return Yb(a, b, c);
  }
  function Zb(a) {
    a += "px";
    var b = document.getElementById("lga");
    b && Qb(b, "marginBottom", a);
    document.getElementById("fkbx") ||
      ((b =
        document.getElementById("tsf") || document.getElementById("gbq2")) &&
        Qb(b, "marginTop", a),
      (a = document.createEvent("UIEvents")),
      a.initUIEvent("resize", !1, !1, window, 0),
      window.dispatchEvent(a));
  }
  function $b(a) {
    if (window.google && window.google.log) {
      var b;
      Fb ||
        ((b = document.getElementById("hplogoved")) &&
          (Fb = b.getAttribute("data-ved")));
      (b = Fb) && (a += "&ved=" + b);
      window.google.log("doodle", a);
    } else cb(a);
  }
  function ac(a, b, c, d) {
    this.H = a;
    this.v = b;
    this.width = c;
    this.height = d;
  }
  ac.prototype.ceil = function() {
    this.H = Math.ceil(this.H);
    this.v = Math.ceil(this.v);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  ac.prototype.floor = function() {
    this.H = Math.floor(this.H);
    this.v = Math.floor(this.v);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  ac.prototype.round = function() {
    this.H = Math.round(this.H);
    this.v = Math.round(this.v);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  ac.prototype.scale = function(a, b) {
    b = pa(b) ? b : a;
    this.H *= a;
    this.width *= a;
    this.v *= b;
    this.height *= b;
    return this;
  };
  var bc = 1e3 / 60,
    cc = Mb ? 600 : 768,
    dc = Mb ? 338 : 432,
    ec = new ac(0, 0, 1e3, 1e3),
    fc = new v(0, 5.2, 3),
    H = new v(0, 0, 21.35),
    gc = new v(0, 0, H.z - 10.06),
    hc = new v(0, 0, H.z + 10.06),
    ic = new v(0, 0, 0),
    jc = ic;
  Object.isFrozen &&
    !Object.isFrozen(ic) &&
    ((jc = Object.create(ic)), Object.freeze(jc));
  var kc = jc,
    lc = 1 / 96,
    mc = new v(-0.9, 0, H.z - 8.64 - 0.1),
    nc = new v(-1.9, 0, H.z + 8.64 + 0.1);
  function oc(a, b, c) {
    this.H = a;
    this.v = b;
    this.S = c;
  }
  function pc(a, b) {
    if (0 == b) return 0;
    if (1 == b) return 1;
    var c = n(0, a.H, b),
      d = n(a.H, a.S, b);
    a = n(a.S, 1, b);
    c = n(c, d, b);
    d = n(d, a, b);
    return n(c, d, b);
  }
  function qc(a, b) {
    var c = (b - 0) / 1;
    if (0 >= c) return 0;
    if (1 <= c) return 1;
    for (var d = 0, e = 1, f = 0, l = 0; 8 > l; l++) {
      var f = pc(a, c),
        p = (pc(a, c + 1e-6) - f) / 1e-6;
      if (1e-6 > Math.abs(f - b)) return c;
      if (1e-6 > Math.abs(p)) break;
      else f < b ? (d = c) : (e = c), (c -= (f - b) / p);
    }
    for (l = 0; 1e-6 < Math.abs(f - b) && 8 > l; l++)
      f < b ? ((d = c), (c = (c + e) / 2)) : ((e = c), (c = (c + d) / 2)),
        (f = pc(a, c));
    return c;
  }
  function rc(a, b, c) {
    var d = new oc(a, b, c);
    return function(a) {
      a = qc(d, a);
      if (0 == a) a = 0;
      else if (1 == a) a = 1;
      else {
        var b = n(0, d.v, a),
          c = n(d.v, 1, a),
          e = n(1, 1, a),
          b = n(b, c, a),
          c = n(c, e, a);
        a = n(b, c, a);
      }
      return a;
    };
  }
  function sc(a) {
    return a;
  }
  var tc = rc(0.25, 0.1, 0.25),
    uc = rc(0.4, 0, 1),
    vc = rc(0, 0, 0.6),
    wc = rc(0.6, 0, 0.4);
  function I(a, b, c, d, e, f) {
    f = void 0 === f ? {} : f;
    var l = void 0 === f.Ha ? sc : f.Ha,
      p = void 0 === f.Ic ? void 0 : f.Ic;
    ab.call(this, a, null, void 0 === f.nb ? function() {} : f.nb);
    this.ha = e;
    this.U = p;
    this.R = b;
    if (null === this.R && void 0 === this.U) throw Error("h");
    this.Aa = c;
    this.V = d;
    this.ka = l;
  }
  h(I, ab);
  I.prototype.Kc = function() {
    null === this.R && (this.R = this.U());
  };
  I.prototype.wc = function() {
    this.ha(this.V(this.R, this.Aa, this.ka(La(this.v / this.T, 0, 1))));
  };
  function J(a, b, c, d) {
    d = void 0 === d ? {} : d;
    I.call(
      this,
      b,
      null,
      c.H(),
      Ua,
      function(b) {
        return a.Da(b);
      },
      {
        nb: void 0 === d.nb ? function() {} : d.nb,
        Ha: void 0 === d.Ha ? sc : d.Ha,
        Ic: function() {
          return a.S.H();
        }
      }
    );
  }
  h(J, I);
  function xc(a, b) {
    b = void 0 === b ? new v(0, 0, 0) : b;
    w.call(this, b);
    this.T = a;
    this.R = this.v = 0;
    this.U = new Map();
    this.ka = new C();
    x(this.ka, this);
    this.V = 3;
    this.W = 0.9 * this.T.height;
  }
  h(xc, w);
  function yc(a, b) {
    if (1 == b)
      G(a.ka, [
        new J(a, 700, new v(0, 1.6, 5.3), { Ha: tc }),
        new I(
          700,
          r(a.v),
          -0.95,
          n,
          function(b) {
            return zc(a, b);
          },
          { Ha: tc }
        )
      ]);
    else if (2 == b)
      G(a.ka, [
        new J(a, 1700, new v(0, 10.4, 48.4), { Ha: wc }),
        new I(
          1700,
          r(a.v),
          11.15,
          n,
          function(b) {
            return zc(a, b);
          },
          { Ha: wc }
        )
      ]);
    else if (0 == b) {
      var c = 2 == a.V ? 1700 : 700,
        d = 2 == a.V ? wc : tc;
      G(a.ka, [
        new J(a, c, fc, { Ha: d }),
        new I(
          c,
          r(a.v),
          15.55,
          n,
          function(b) {
            return zc(a, b);
          },
          { Ha: d }
        ),
        new I(
          c,
          r(a.R),
          0,
          n,
          function(b) {
            return Ac(a, b);
          },
          { Ha: d }
        )
      ]);
    }
    a.V = b;
  }
  xc.prototype.ya = function() {
    this.W = 0.9 * this.T.height;
  };
  xc.prototype.Da = function(a, b, c) {
    w.prototype.Da.call(this, a, b, c);
    this.U.clear();
  };
  function zc(a, b) {
    a.v = q(b);
    a.U.clear();
  }
  function Ac(a, b) {
    a.R = q(b);
    a.U.clear();
  }
  function Bc(a, b) {
    var c = a.U.get(173 * (103 * b.x + b.y) + b.z);
    if (!c) {
      var c = Ta(b, B(a)),
        d = c.x,
        e = c.y,
        f = c.z;
      a.R &&
        ((d = Math.cos(a.R) * c.x - Math.sin(a.R) * c.z),
        (f = Math.cos(a.R) * c.z + Math.sin(a.R) * c.x));
      a.v &&
        ((e = Math.sin(a.v) * f + Math.cos(a.v) * c.y),
        (f = Math.cos(a.v) * f - Math.sin(a.v) * c.y));
      c.x = d;
      c.y = e;
      c.z = f;
      a.U.set(173 * (103 * b.x + b.y) + b.z, c);
    }
    return c;
  }
  function Cc(a, b, c) {
    c = void 0 === c ? 1 : c;
    b = Bc(a, b);
    if (2 >= b.z || Math.abs(b.x) >= (a.T.width / a.T.height) * b.z * 0.8)
      return null;
    var d = a.W / b.z;
    return new Ja(
      d * c,
      0,
      0,
      d * c,
      d * b.x + a.T.width / 2,
      -1 * d * b.y + a.T.height / 2
    );
  }
  function K(a, b, c) {
    w.call(
      this,
      void 0 === a ? 0 : a,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c
    );
    this.T = new Ja();
    this.Aa = new ac(0, 0, 0, 0);
    this.Lb = new u(0, 0);
    this.W = 0;
    this.U = 1;
    this.ka = 0;
  }
  h(K, w);
  g = K.prototype;
  g.mc = function() {
    var a = this.Aa;
    return (
      ec.H <= a.H + a.width &&
      a.H <= ec.H + ec.width &&
      ec.v <= a.v + a.height &&
      a.v <= ec.v + ec.height
    );
  };
  g.Ec = function(a) {
    if ((this.T = a) && this.W) {
      a = this.T;
      var b = -this.W,
        c = new Ja(),
        d = Math.cos(b),
        b = Math.sin(b),
        c = Ka(c, d, b, -b, d, 0 - 0 * d + 0 * b, 0 - 0 * b - 0 * d),
        d = a.Ma,
        b = a.lb;
      a.Ma = c.Ma * d + c.mb * b;
      a.lb = c.lb * d + c.Oa * b;
      a.Xa += c.Xa * d + c.Ya * b;
      d = a.mb;
      b = a.Oa;
      a.mb = c.Ma * d + c.mb * b;
      a.Oa = c.lb * d + c.Oa * b;
      a.Ya += c.Xa * d + c.Ya * b;
    }
  };
  function Dc(a, b, c, d, e) {
    a.Aa.H = b;
    a.Aa.v = c;
    a.Aa.width = d;
    a.Aa.height = e;
  }
  g.Zb = function() {
    return B(this).z;
  };
  g.Ba = function() {
    return this.Lb;
  };
  function Ec(a, b, c) {
    a.Lb.width = b;
    a.Lb.height = void 0 === c ? b : c;
  }
  g.nc = function(a) {
    if (!this.Eb(a)) return !1;
    this.Wb();
    return this.mc();
  };
  g.Eb = function() {
    var a = B(this);
    this.T
      ? Ka(this.T, Xa(this), 0, 0, Xa(this), a.x, a.y)
      : (this.T = new Ja(Xa(this), 0, 0, Xa(this), a.x, a.y));
    return !0;
  };
  g.Wb = function() {
    var a = B(this),
      b = this.Ba();
    Dc(this, a.x - b.width / 2, a.y - b.height / 2, b.width, b.height);
  };
  g.Ea = function() {};
  function L(a, b, c) {
    K.call(
      this,
      void 0 === a ? 0 : a,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c
    );
    this.rb = !1;
    this.Fc = 0;
  }
  h(L, K);
  L.prototype.Zb = function(a) {
    return this.rb ? K.prototype.Zb.call(this, a) : this.Fc;
  };
  L.prototype.Sb = function(a) {
    this.rb = a;
  };
  L.prototype.Eb = function(a) {
    if (this.rb) return K.prototype.Eb.call(this, a);
    this.Fc = Bc(a, B(this)).z;
    a = Cc(a, B(this), Xa(this));
    this.Ec(a);
    return !!a;
  };
  L.prototype.Wb = function() {
    var a = this.T,
      b = this.Ba().width * a.Ma,
      c = this.Ba().height * a.Oa;
    Dc(this, a.Xa - b / 2, a.Ya - c / 2, b, c);
  };
  function M(a, b, c, d, e) {
    d = void 0 === d ? 0 : d;
    e = void 0 === e ? 360 : e;
    L.call(this, a);
    this.La = b;
    this.fillStyle = c;
    this.Ga = q(d);
    this.Ia = q(e);
    Ec(this, 2 * this.La);
  }
  h(M, L);
  M.prototype.Ea = function(a) {
    L.prototype.Ea.call(this, a);
    a.beginPath();
    a.arc(0, 0, this.La, this.Ga, this.Ia);
    a.lineTo(0, 0);
    a.closePath();
    a.fillStyle = this.fillStyle;
    a.fill();
  };
  function N() {
    this.H = [];
  }
  function O(a, b, c) {
    for (var d = a.H.slice(0), e = 0; e < d.length; e++)
      -1 != a.H.indexOf(d[e]) && d[e].Za(b, c);
  }
  function Fc(a, b) {
    a.H.push(b);
  }
  ra(N);
  function P() {
    this.v = new w();
    this.S = new w();
    this.H = new w();
    this.R = [];
    this.T = [];
    this.U = [];
  }
  P.prototype.reset = function() {
    this.v = new w();
    this.S = new w();
    this.H = new w();
    this.R = [];
    this.T = [];
    this.U = [];
  };
  function Gc(a) {
    var b = Hc;
    b.T = [];
    Za(b.v, function(c) {
      b.T.push(c);
      c.ya(a);
    });
    Za(b.S, function(c) {
      b.T.push(c);
      c.ya(a);
    });
    b.U = [];
    var c = 0;
    Za(b.H, function(d) {
      b.U.push(d);
      var e = c++;
      d.Gb.H = e;
      d.ya(a);
    });
  }
  function Ic(a) {
    var b = Hc;
    b.R = [];
    for (var c = k(b.T), d = c.next(); !d.done; d = c.next())
      (d = d.value), d.H && d.nc && d.nc(a) && b.R.push(d);
    for (var c = [], e = k(b.U), d = e.next(); !d.done; d = e.next())
      (d = d.value), d.H && d.nc && d.nc(a) && c.push(d);
    Ha(c, function(b, c) {
      var d;
      return (d = c.Zb(a) + c.ka - (b.Zb(a) + b.ka)) ? d : b.Gb.H - c.Gb.H;
    });
    b.R.push.apply(b.R, [].concat(c instanceof Array ? c : ja(k(c))));
  }
  ra(P);
  function Q(a, b, c) {
    var d = void 0 === c ? {} : c;
    c = void 0 === d.fillStyle ? null : d.fillStyle;
    var e = void 0 === d.strokeStyle ? null : d.strokeStyle,
      d = void 0 === d.lineWidth ? 0.1 : d.lineWidth;
    K.call(this, a);
    this.ha = b;
    this.V = Da(b, function(a) {
      return a.H();
    });
    this.R = !0;
    this.v = [];
    this.ra = [];
    this.$ = [];
    this.Ia = c;
    this.Fa = !!c;
    this.wa = e;
    this.Ca = !!e;
    this.Ga = d;
    this.va = !0;
    this.ta = 0;
  }
  h(Q, K);
  g = Q.prototype;
  g.mc = function() {
    return 3 <= this.v.length && K.prototype.mc.call(this);
  };
  g.Zb = function(a) {
    this.va &&
      (this.ta = Ea(
        this.ra,
        function(a, c) {
          return Math.max(a, c.z);
        },
        Bc(a, B(this)).z
      ));
    return this.ta;
  };
  g.Tb = function(a) {
    K.prototype.Tb.call(this, a);
    this.R = a || this.R;
  };
  g.ac = function(a) {
    K.prototype.ac.call(this, a);
    this.R = a || this.R;
  };
  g.Eb = function(a) {
    this.ra = [];
    this.$ = [];
    this.v = [];
    var b = !!this.wa;
    if (this.R) {
      for (var c = Xa(this), d = B(this), e = 0; e < this.ha.length; e++)
        (this.V[e].x = this.ha[e].x * c + d.x),
          (this.V[e].y = this.ha[e].y * c + d.y),
          (this.V[e].z = this.ha[e].z * c + d.z);
      this.R = !1;
    }
    c = k(this.V);
    for (d = c.next(); !d.done; d = c.next())
      (d = Bc(a, d.value)),
        0 >= d.z ||
          (this.ra.push(d),
          b && this.$.push(a.W / d.z),
          (e = a.W / d.z),
          this.v.push(
            new Ma(e * d.x + a.T.width / 2, -1 * e * d.y + a.T.height / 2)
          ));
    this.va = !0;
    return 0 < this.v.length;
  };
  g.Wb = function() {
    if (this.v.length) {
      for (
        var a = Number.MAX_SAFE_INTEGER,
          b = Number.MAX_SAFE_INTEGER,
          c = Number.MIN_SAFE_INTEGER,
          d = Number.MIN_SAFE_INTEGER,
          e = k(this.v),
          f = e.next();
        !f.done;
        f = e.next()
      )
        (f = f.value),
          (a = Math.min(f.x, a)),
          (c = Math.max(f.x, c)),
          (b = Math.min(f.y, b)),
          (d = Math.max(f.y, d));
      Dc(this, a, b, Math.abs(c - a), Math.abs(d - b));
    }
  };
  g.Ea = function(a) {
    K.prototype.Ea.call(this, a);
    a.beginPath();
    this.Ca && (a.strokeStyle = this.wa);
    for (var b = 0; b < this.v.length; b++) {
      var c = this.v[b];
      a.lineTo(Math.round(c.x), Math.round(c.y));
      this.Ca &&
        ((a.lineWidth = this.Ga * this.$[b]),
        a.stroke(),
        a.beginPath(),
        a.moveTo(Math.round(c.x), Math.round(c.y)));
    }
    this.Fa && (a.closePath(), (a.fillStyle = this.Ia), a.fill());
  };
  function Jc(a) {
    return a.x
      ? [
          new v(-a.x / 2, -a.y / 2, -a.z / 2),
          new v(a.x / 2, -a.y / 2, -a.z / 2),
          new v(a.x / 2, a.y / 2, a.z / 2),
          new v(-a.x / 2, a.y / 2, a.z / 2),
          new v(-a.x / 2, -a.y / 2, -a.z / 2)
        ]
      : [
          new v(0, -a.y / 2, -a.z / 2),
          new v(0, a.y / 2, -a.z / 2),
          new v(0, a.y / 2, a.z / 2),
          new v(0, -a.y / 2, a.z / 2),
          new v(0, -a.y / 2, -a.z / 2)
        ];
  }
  function Kc(a, b, c, d) {
    d = void 0 === d ? 22 : d;
    var e = [],
      f = a instanceof u ? a.width : a;
    a = a instanceof u ? a.height : a;
    for (var l = 0; l < d; l++)
      e.push(
        new v(
          f * Math.cos(b - ((c - b) * l) / d),
          0,
          a * Math.sin(b - ((c - b) * l) / d)
        )
      );
    return e;
  }
  function Lc(a) {
    Q.call(this, new v(0, 0, 0), Kc(new u(a, a), 0, 2 * Math.PI, 20), {
      fillStyle: "#000"
    });
    this.U = 0.12;
  }
  h(Lc, Q);
  Lc.prototype.Ea = function(a) {
    var b = this.Aa;
    3 > b.height
      ? ((a.fillStyle = "#000"), a.fillRect(b.H, b.v, b.width, b.height))
      : Q.prototype.Ea.call(this, a);
  };
  function Mc(a) {
    this.H = a;
    this.lc = !1;
    this.Cc = [];
  }
  function Nc(a) {
    if (!a.lc) {
      a.lc = !0;
      for (var b = 0, c; (c = a.Cc[b]); b++) c();
    }
  }
  function Oc(a) {
    Mc.call(this, a);
    this.Qb = new Image();
  }
  ya(Oc, Mc);
  Oc.prototype.Bc = function() {
    if (!this.Qb.src) {
      var a = this;
      this.Qb.onload = function() {
        Nc(a);
      };
      this.Qb.src = this.H;
      (this.Qb.complete || "complete" == this.Qb.readyState) && Nc(this);
    }
  };
  function Pc(a, b) {
    this.v = Da(b, function(b) {
      return new Oc(a + b);
    });
    this.H = new Map();
  }
  Pc.prototype.Bc = function(a, b) {
    a = Qc(this, a);
    a.lc ? b() : a.Cc.push(b);
    a.Bc();
  };
  function Qc(a, b) {
    return "number" == typeof b ? a.v[b] : a.v[b[0]];
  }
  function Rc(a, b, c) {
    var d = document.createElement("canvas"),
      e = a[3] + 10,
      f = a[4] + 10;
    d.width = Math.ceil(e * c);
    d.height = Math.ceil(f * c);
    var l = d.getContext("2d");
    l.scale(c, c);
    l.drawImage(b, a[1] - 5, a[2] - 5, e, f, 0, 0, e, f);
    return d;
  }
  function Sc() {
    Pc.call(this, "./cricket17/", Tc);
  }
  h(Sc, Pc);
  var Tc = ["svg-sprite.svg"],
    Uc = [0, 20, 20, 122.08, 20.39],
    Vc = [0, 20, 61, 65.02, 64.57],
    Wc = [0, 20, 146, 116, 193],
    Xc = [0, 20, 359, 21.44, 80.72],
    Yc = [0, 20, 460, 46.96, 112.94],
    Zc = [0, 20, 593, 53.17, 53.17],
    $c = [0, 20, 667, 193.82, 55.34],
    ad = [0, 20, 743, 166.51, 46.29],
    bd = [0, 20, 810, 66, 432],
    cd = [0, 20, 1262, 48.81, 81],
    dd = [0, 20, 1363, 173.79, 166.93],
    ed = [0, 20, 1550, 129.78, 212.27],
    fd = [0, 20, 1783, 129.78, 225.25],
    gd = [0, 20, 2029, 108.12, 118.91],
    hd = [0, 20, 2168, 556.4, 67.71],
    id = [0, 20, 2256, 504.75, 119.95],
    jd = [0, 20, 2396, 52.57, 77.21],
    kd = [0, 20, 3370, 254, 89],
    ld = [0, 20, 3479, 254, 89],
    md = [0, 20, 3588, 254, 89],
    nd = [0, 20, 3697, 254, 89],
    od = [0, 20, 3806, 254, 89],
    pd = [0, 20, 3915, 254, 89],
    qd = [0, 20, 4024, 254, 89],
    rd = [0, 20, 4133, 254, 89],
    sd = [0, 20, 4242, 254, 89],
    td = [0, 20, 4351, 254, 89],
    ud = [0, 20, 4460, 254, 89],
    wd = [0, 20, 4569, 254, 89],
    xd = [0, 20, 4678, 131.94, 156.32],
    yd = [0, 20, 4855, 69.1, 46.34],
    zd = [0, 20, 4922, 266.89, 266.89],
    Ad = [0, 20, 5209, 195.7, 190.95],
    Bd = [0, 20, 5420, 245.36, 172.2],
    Cd = [0, 20, 5613, 51.24, 71.52],
    Dd = [0, 20, 5705, 3, 20.78],
    Ed = [0, 20, 5746, 485.47, 469.67],
    Fd = [0, 20, 6236, 141.97, 168.71],
    Gd = [0, 20, 6425, 65, 57],
    Hd = [0, 20, 6502, 53, 54],
    Id = [0, 20, 6576, 55, 54],
    Jd = [0, 20, 6650, 169.51, 163.5],
    Kd = [0, 20, 6834, 250, 203.14],
    Ld = [0, 20, 7058, 124, 184],
    Md = [0, 20, 7262, 124, 184],
    Nd = [0, 20, 7466, 124, 184],
    Od = [0, 20, 7670, 124, 184],
    Pd = [0, 20, 7874, 124, 184],
    Qd = [0, 20, 8078, 124, 184],
    Rd = [0, 20, 8282, 124, 184],
    Sd = [0, 20, 8690, 124, 184],
    Td = [0, 20, 8894, 124, 184],
    Ud = [0, 20, 9098, 124, 184],
    Vd = [0, 20, 9302, 124, 184],
    Wd = [0, 20, 9506, 124, 184],
    Xd = [0, 20, 9710, 124, 184],
    Yd = [0, 20, 9710, 124, 184],
    Zd = [0, 20, 9710, 124, 184],
    $d = [0, 20, 9710, 124, 184],
    ae = [0, 20, 9710, 124, 184],
    be = [0, 20, 9710, 124, 184],
    ce = [0, 20, 9710, 124, 184],
    de = [0, 20, 9710, 124, 184],
    ee = [0, 20, 9710, 124, 184],
    fe = [0, 20, 9710, 124, 184],
    ge = [0, 20, 9914, 37.81, 30.99];
  ra(Sc);
  var he = Sc.qa();
  function R(a, b, c, d) {
    L.call(
      this,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c,
      void 0 === d ? 0 : d
    );
    this.Ca = (this.Ga = "number" == typeof a[0] ? null : a) ? this.Ga[0] : a;
    this.va = this.La = 0;
    this.Ia = !1;
    this.Fa = new u(0, -0.5);
    this.ub = 1;
    this.ha = new u(1, 1);
    this.Hb = !1;
    this.ra = null;
    ie(this);
    this.Ib = new Lc(this.Ba().width / 2);
    x(this.Ib, this);
  }
  h(R, L);
  function je(a, b) {
    a.Ca = b;
    ie(a);
  }
  function ie(a) {
    var b = a.rb ? 1 : lc;
    Ec(a, b * a.Ca[3], b * a.Ca[4]);
  }
  function S(a, b, c) {
    a.Fa.width = b;
    a.Fa.height = c;
  }
  function ke(a, b, c) {
    a.ha.width = b;
    a.ha.height = c;
  }
  g = R.prototype;
  g.Sb = function(a) {
    L.prototype.Sb.call(this, a);
    ie(this);
  };
  function le(a, b, c) {
    var d = a.Ba().width / a.Ba().height;
    1 < d ? Ec(a, b, b / d) : Ec(a, c * d, c);
  }
  g.reset = function() {
    this.La = this.va = 0;
    this.Ca = this.Ga[this.va];
    this.Ia = !1;
  };
  g.ya = function(a) {
    L.prototype.ya.call(this, a);
    this.La += a;
    this.Ga &&
      this.Ia &&
      40 < this.La &&
      ((this.La = 0),
      this.va < this.Ga.length - 1
        ? ((this.va += 1), (this.Ca = this.Ga[this.va]))
        : ((this.va = 0), (this.Ia = !1)));
  };
  g.Wb = function() {
    var a = this.T,
      b = this.Ba().width * this.ha.width * a.Ma,
      c = this.Ba().height * this.ha.height * a.Oa;
    Dc(
      this,
      a.Xa - b / 2 + b * this.Fa.width * (this.Hb ? -1 : 1),
      a.Ya - c / 2 + c * this.Fa.height,
      b,
      c
    );
  };
  g.Ec = function(a) {
    L.prototype.Ec.call(this, a);
    if (a) {
      a = Math.max(
        0.2,
        Math.abs((this.ha.width * this.Ba().width * this.T.Ma) / this.Ca[3])
      );
      var b = Math.abs(a - this.ub);
      if (b > 0.6 * this.ub || 0.5 < b) this.ub = a;
    }
  };
  g.Ea = function(a) {
    L.prototype.Ea.call(this, a);
    if (this.ra) {
      a.save();
      var b = this.Ba();
      a.beginPath();
      a.rect(
        this.ra.H * b.width,
        this.ra.v * b.height,
        this.ra.width * b.width,
        this.ra.height * b.height
      );
      a.clip();
    }
    var c = this.Ca,
      b = this.Fa.width * this.Ba().width * this.ha.width,
      d = this.Fa.height * this.Ba().height * this.ha.height,
      e = this.Ba().width * this.ha.width,
      f = this.Ba().height * this.ha.height,
      l = this.Hb,
      p = this.ub,
      l = void 0 === l ? !1 : l;
    var p = void 0 === p ? 1 : p,
      p = void 0 === p ? 1 : p,
      t = Qc(he, c[0]);
    if (t.lc) {
      var y = c + "," + p;
      he.H.has(y) || he.H.set(y, Rc(c, t.Qb, p));
      p = he.H.get(y);
    } else p = null;
    p &&
      (l && a.scale(-1, 1),
      (c = (10 * e) / c[3]),
      a.drawImage(p, b - (e + c) / 2, d - (f + c) / 2, e + c, f + c),
      l && a.scale(-1, 1));
    this.ra && a.restore();
  };
  function T(a) {
    a.Ib.H = !1;
  }
  function me(a) {
    w.call(this);
    var b = this;
    this.ra = a;
    this.R = new ne(0, 0, 2e3);
    this.R.Ea = function(a) {
      a.fillStyle = b.R.v;
      a.fillRect(0, b.R.R, a.canvas.width, a.canvas.height - b.R.R);
    };
    Wa(P.qa().S, this.R);
    this.ka = new ne(0, 0, 2e3);
    this.ka.Ea = function(a) {
      a.fillStyle = b.ka.v;
      a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    };
    x(this.ka, this);
    var c = new R($c, -340, 360, 2e3);
    T(c);
    A(c, 200);
    x(c, this);
    c = new R(ad, 400, 300, 2e3);
    A(c, 200);
    T(c);
    x(c, this);
    this.ha = new M(oe.H(), 30, "khaki");
    a = a.createRadialGradient(0, 0, 0, 0, 0, 50);
    a.addColorStop(0, "rgba(240, 230, 140, 1)");
    a.addColorStop(1, "rgba(240, 230, 140, 0)");
    Wa(this.ha, new M(new v(0, 0, 0), 50, a));
    x(this.ha, this);
    a = new R(Bd, 0, 0, 300);
    A(a, 25);
    T(a);
    Wa(P.qa().S, a);
    this.W = [173, 224, 239];
    this.V = [0, 160, 208];
    this.U = new pe(0, 250, 2e3);
    this.U.U = 0;
    this.U.H = !1;
    x(this.U, this);
    this.T = new M(new v(0, 1, 1e3), 2e3, "#000");
    this.T.U = 0;
    this.T.ka = 1e3;
    this.T.H = !1;
    Wa(P.qa().H, this.T);
    this.Aa = 0;
    this.v = new C();
    x(this.v, this);
    this.$ = !1;
    Fc(N.qa(), this);
    qe(this);
  }
  h(me, w);
  me.prototype.ya = function(a) {
    w.prototype.ya.call(this, a);
    this.Aa += a;
    300 < this.Aa && ((this.Aa = 0), qe(this));
  };
  function qe(a) {
    var b = a.ra.canvas.height,
      c = 0.27 * b;
    a.R.v = a.ra.createLinearGradient(0, c, 0, b - c);
    a.R.v.addColorStop(0, "#beda78");
    a.R.v.addColorStop(1, "#749948");
    a.ka.v = a.ra.createLinearGradient(0, 0, 0, b);
    a.ka.v.addColorStop(0, "rgb(" + a.V[0] + "," + a.V[1] + "," + a.V[2] + ")");
    a.ka.v.addColorStop(
      0.3,
      "rgb(" + a.W[0] + "," + a.W[1] + "," + a.W[2] + ")"
    );
    a.ka.v.addColorStop(1, "#FFF");
  }
  me.prototype.Za = function(a) {
    10 != a || this.$ ? 15 == a && qe(this) : re(this);
  };
  function re(a) {
    a.$ = !0;
    G(a.v, new J(a.ha, 1e5, new v(-180, -50, 2e3)));
    E(a.v, 5e4, function() {
      a.U.H = !0;
    });
    D(
      a.v,
      new I(25e3, [173, 224, 239], [255, 182, 193], se, function(b) {
        return (a.W = b);
      })
    );
    E(a.v, 0, function() {
      a.T.H = !0;
    });
    E(a.v, 0, function() {
      return O(N.qa(), 17);
    });
    D(a.v, [
      new I(25e3, [255, 182, 193], [25, 25, 112], se, function(b) {
        return (a.W = b);
      }),
      new I(5e4, [0, 160, 208], [0, 0, 0], se, function(b) {
        return (a.V = b);
      }),
      new I(5e4, 0, 1, n, function(b) {
        a.U.U = b;
      }),
      new I(4e4, 0, 0.2, n, function(b) {
        a.T.U = b;
      })
    ]);
    E(a.v, 5e4, function() {
      return te(a);
    });
  }
  function te(a) {
    a.$ = !0;
    F(a.v, 5e4, function() {
      G(a.v, new J(a.ha, 1e5, oe.H()));
    });
    D(a.v, [
      new I(25e3, [25, 25, 112], [255, 182, 193], se, function(b) {
        return (a.W = b);
      }),
      new I(5e4, [0, 0, 0], [0, 160, 208], se, function(b) {
        return (a.V = b);
      }),
      new I(4e4, 1, 0, n, function(b) {
        a.U.U = b;
      }),
      new I(5e4, 0.2, 0, n, function(b) {
        a.T.U = b;
      })
    ]);
    E(a.v, 0, function() {
      return O(N.qa(), 18);
    });
    E(a.v, 0, function() {
      a.T.H = !1;
      a.U.H = !1;
    });
    D(
      a.v,
      new I(25e3, [255, 182, 193], [173, 224, 239], se, function(b) {
        return (a.W = b);
      })
    );
    E(a.v, 1e5, function() {
      return re(a);
    });
  }
  function pe(a, b, c) {
    L.call(this, a, void 0 === b ? 0 : b, void 0 === c ? 0 : c);
    Ec(this, 3e3, 3e3);
    this.v = [];
    for (a = 0; 100 > a; a++)
      this.v.push([-2e3 + 4e3 * Math.random(), -1e3 + 1200 * Math.random()]);
  }
  h(pe, L);
  pe.prototype.Ea = function(a) {
    a.fillStyle = "#FFF";
    for (var b = k(this.v), c = b.next(); !c.done; c = b.next())
      (c = c.value),
        a.beginPath(),
        a.arc(c[0], c[1], 3, 0, 2 * Math.PI),
        a.fill();
  };
  function ne(a, b, c) {
    L.call(this, a, void 0 === b ? 0 : b, void 0 === c ? 0 : c);
    this.R = 0;
    this.v = null;
  }
  h(ne, L);
  ne.prototype.Eb = function(a) {
    var b = B(this),
      c = 0 == b.z ? 0 : a.W / b.z,
      d = b.y - B(a).y;
    a.v && (d = Math.sin(a.v) * b.z + Math.cos(a.v) * d);
    this.R = -1 * c * d + a.T.height / 2;
    return !0;
  };
  ne.prototype.Wb = function() {};
  ne.prototype.mc = function() {
    return !0;
  };
  var oe = new v(-180, 280, 2e3);
  function se(a, b, c) {
    return [
      Math.round(n(a[0], b[0], c)),
      Math.round(n(a[1], b[1], c)),
      Math.round(n(a[2], b[2], c))
    ];
  }
  function ue(a, b) {
    a = void 0 === a ? new v(0, 0, 0) : a;
    b = void 0 === b ? new v(0, 0, 0) : b;
    w.call(this);
    this.R = b;
    this.v = a;
  }
  h(ue, w);
  ue.prototype.ya = function(a) {
    w.prototype.ya.call(this, a);
    var b = a / 1e3;
    this.v.x += Math.max(0, this.R.x * b);
    this.v.y += this.R.y * b;
    this.v.z += Math.max(0, this.R.z * b);
    this.ma && this.ma.Da(ve(this, this.ma.S, a));
  };
  function we(a, b, c, d) {
    b instanceof v
      ? ((a.v.x = b.x), (a.v.y = b.y), (a.v.z = b.z))
      : ((a.v.x = b),
        (a.v.y = void 0 === c ? a.v.y : c),
        (a.v.z = void 0 === d ? a.v.z : d));
  }
  function ve(a, b, c) {
    c /= 1e3;
    a = Ra(a.R.H().scale(0.5 * c), a.v);
    return Ra(a.scale(c), b);
  }
  function xe(a, b, c, d) {
    a.R.x = b;
    a.R.y = c;
    a.R.z = d;
  }
  var U;
  a: {
    var ye = ma.navigator;
    if (ye) {
      var ze = ye.userAgent;
      if (ze) {
        U = ze;
        break a;
      }
    }
    U = "";
  }
  function Ae(a, b) {
    var c = Be;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
  }
  var Ce = m(U, "Opera"),
    De = m(U, "Trident") || m(U, "MSIE"),
    Ee = m(U, "Edge"),
    Fe =
      m(U, "Gecko") &&
      !(m(U.toLowerCase(), "webkit") && !m(U, "Edge")) &&
      !(m(U, "Trident") || m(U, "MSIE")) &&
      !m(U, "Edge"),
    Ge = m(U.toLowerCase(), "webkit") && !m(U, "Edge");
  function He() {
    var a = ma.document;
    return a ? a.documentMode : void 0;
  }
  var Ie;
  a: {
    var Je = "",
      Ke = (function() {
        var a = U;
        if (Fe) return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (Ee) return /Edge\/([\d\.]+)/.exec(a);
        if (De) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (Ge) return /WebKit\/(\S+)/.exec(a);
        if (Ce) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    Ke && (Je = Ke ? Ke[1] : "");
    if (De) {
      var Le = He();
      if (null != Le && Le > parseFloat(Je)) {
        Ie = String(Le);
        break a;
      }
    }
    Ie = Je;
  }
  var Me = Ie,
    Be = {};
  function Ne(a) {
    return Ae(a, function() {
      for (
        var b = 0,
          c = za(String(Me)).split("."),
          d = za(String(a)).split("."),
          e = Math.max(c.length, d.length),
          f = 0;
        0 == b && f < e;
        f++
      ) {
        var l = c[f] || "",
          p = d[f] || "";
        do {
          l = /(\d*)(\D*)(.*)/.exec(l) || ["", "", "", ""];
          p = /(\d*)(\D*)(.*)/.exec(p) || ["", "", "", ""];
          if (0 == l[0].length && 0 == p[0].length) break;
          b =
            Aa(
              0 == l[1].length ? 0 : parseInt(l[1], 10),
              0 == p[1].length ? 0 : parseInt(p[1], 10)
            ) ||
            Aa(0 == l[2].length, 0 == p[2].length) ||
            Aa(l[2], p[2]);
          l = l[3];
          p = p[3];
        } while (0 == b);
      }
      return 0 <= b;
    });
  }
  var Oe;
  var Pe = ma.document;
  Oe =
    Pe && De
      ? He() || ("CSS1Compat" == Pe.compatMode ? parseInt(Me, 10) : 5)
      : void 0;
  De && Ne("9");
  !Ge || Ne("528");
  (Fe && Ne("1.9b")) ||
    (De && Ne("8")) ||
    (Ce && Ne("9.5")) ||
    (Ge && Ne("528"));
  (Fe && !Ne("8")) || (De && Ne("9"));
  function V() {
    this.wa = this.wa;
    this.Aa = this.Aa;
  }
  V.prototype.wa = !1;
  V.prototype.Hc = function() {
    this.wa || ((this.wa = !0), this.U());
  };
  function Qe(a, b) {
    b = va(Re, b);
    a.wa
      ? na(void 0)
        ? b.call(void 0)
        : b()
      : (a.Aa || (a.Aa = []), a.Aa.push(na(void 0) ? ua(b, void 0) : b));
  }
  V.prototype.U = function() {
    if (this.Aa) for (; this.Aa.length; ) this.Aa.shift()();
  };
  function Re(a) {
    a && "function" == typeof a.Hc && a.Hc();
  }
  var Se =
      !(!window.AudioContext && !window.webkitAudioContext) &&
      !!window.GainNode,
    Te = document.createElement("audio");
  "function" ==
    (function(a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if (
            "[object Array]" == c ||
            ("number" == typeof a.length &&
              "undefined" != typeof a.splice &&
              "undefined" != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable("splice"))
          )
            return "array";
          if (
            "[object Function]" == c ||
            ("undefined" != typeof a.call &&
              "undefined" != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable("call"))
          )
            return "function";
        } else return "null";
      else if ("function" == b && "undefined" == typeof a.call) return "object";
      return b;
    })(Te.canPlayType) && Te.canPlayType("audio/ogg");
  var Ue = Se && !Mb,
    Ve = null;
  function We() {
    this.Sc();
  }
  g = We.prototype;
  g.Sc = function() {
    this.v = new (window.AudioContext || window.webkitAudioContext)();
    var a = this.v.createGain();
    a.gain.value = 0.9;
    a.connect(this.v.destination);
    this.S = this.v.createDynamicsCompressor();
    this.S.connect(a);
    this.S.threshold.value = 0;
    this.S.knee.value = 0;
    this.S.ratio.value = 20;
    this.S.attack.value = 0.005;
    this.S.release.value = 0.05;
    this.Aa = new Xe(this.v);
    this.Aa.connect(this.S);
    this.ma = new Ye(this.v);
    this.ma.connect(this.S);
    this.va = new Ze(this.v);
    this.va.connect(this.S);
    this.U = new $e(this.v);
    this.U.connect(this.S);
    this.$ = new af(this.v);
    this.$.connect(this.S);
    this.V = new bf(this.v);
    this.V.connect(this.S);
    this.R = new cf(this.v);
    this.R.connect(this.S);
    this.W = new df(this.v, {});
    this.W.connect(this.S);
    this.ka = new df(this.v, {
      Jc: 4,
      $b: 3,
      Uc: 178,
      Gc: 12,
      yb: 600,
      wb: 800,
      bc: 456,
      Xb: 114
    });
    this.ka.connect(this.S);
    this.ha = new ef(this.v);
    this.ha.connect(this.S);
    this.H = new C();
    this.ra = this.T = !0;
    a = P.qa().H;
    x(this.H, a);
    Fc(N.qa(), this);
  };
  function W() {
    Ve || (Ve = ff ? new We() : new gf());
    return Ve;
  }
  g.Ac = function() {
    var a = this.v.createBufferSource();
    a.buffer = this.v.createBuffer(1, 1, 22050);
    a.connect(this.v.destination);
    a.start();
  };
  g.zc = function(a) {
    var b = this;
    (void 0 === a
    ? 0
    : a)
      ? F(this.H, 0, function() {
          for (var a = b.R, d = 0; d < a.S.length; d++) hf(a.S[d], a.R[d]);
        })
      : F(this.H, 0, function() {
          return b.R.H();
        });
  };
  g.xc = function(a) {
    if (void 0 === a ? 0 : a) {
      a = this.R;
      for (var b = 0; b < a.S.length; b++) hf(a.S[b], 0);
    } else for (a = this.R, b = 0; b < a.S.length; b++) jf(a.S[b], 0);
  };
  g.yc = function() {
    var a = this;
    F(this.H, 0, function() {
      return a.ma.H();
    });
  };
  g.Rc = function() {
    var a = this;
    F(this.H, 0, function() {
      return a.va.H();
    });
  };
  g.Lc = function(a) {
    var b = this;
    this.T &&
      ((this.T = !1),
      F(this.H, 0, function() {
        var c = b.U;
        c.T.T[1] = 1 - La(a / 30, 0, 1.1);
        c.H();
      }),
      F(this.H, 250, function() {
        return (b.T = !0);
      }));
  };
  g.Oc = function(a) {
    var b = this;
    F(this.H, 0, function() {
      return kf(b.$, a);
    });
  };
  g.Qc = function() {
    var a = this;
    F(this.H, 0, function() {
      return a.Aa.H();
    });
  };
  g.Nc = function() {
    var a = this;
    F(this.H, 0, function() {
      return a.V.H();
    });
  };
  g.Rb = function() {
    var a = this;
    this.ra &&
      F(this.H, 0, function() {
        return a.W.H();
      });
  };
  g.Mc = function() {
    var a = this;
    this.ra &&
      F(this.H, 0, function() {
        return a.ka.H();
      });
  };
  g.Pc = function() {
    var a = this;
    F(this.H, 0, function() {
      return a.ha.H();
    });
  };
  g.Za = function(a, b) {
    var c = this;
    4 == a
      ? (this.Oc(b),
        6 <= b
          ? F(this.H, 300, function() {
              return c.Rb();
            })
          : 2 <= b &&
            0.5 > Math.random() &&
            F(this.H, 300, function() {
              return c.Mc();
            }))
      : 10 == a
      ? F(this.H, 700, function() {
          return c.Rb();
        })
      : 11 == a &&
        (F(this.H, 700, function() {
          return c.Rb();
        }),
        F(this.H, 1500, function() {
          return c.Rb();
        }),
        F(this.H, 2300, function() {
          return c.Rb();
        }));
  };
  g.uc = function() {
    if (this.v) {
      this.v.close();
      z(this.H);
      for (var a = N.qa(), b = a.H.indexOf(this); -1 != b; )
        a.H.splice(b, 1), (b = a.H.indexOf(this));
    }
  };
  var ff = Ue;
  function gf(a) {
    We.apply(this, arguments);
  }
  h(gf, We);
  g = gf.prototype;
  g.Sc = function() {};
  g.Ac = function() {};
  g.zc = function() {};
  g.xc = function() {};
  g.yc = function() {};
  g.Rc = function() {};
  g.Lc = function() {};
  g.Oc = function() {};
  g.Qc = function() {};
  g.Nc = function() {};
  g.Rb = function() {};
  g.Mc = function() {};
  g.Pc = function() {};
  g.Za = function() {};
  g.uc = function() {};
  function X(a) {
    this.U = a;
    this.v = null;
  }
  X.prototype.connect = function(a) {
    this.v && (a instanceof X && a.v ? this.v.connect(a.v) : this.v.connect(a));
  };
  X.prototype.H = function() {};
  function Y(a) {
    var b = a.Cb,
      c = void 0 === a.jc ? 0 : a.jc,
      d = void 0 === a.Ab ? 0 : a.Ab,
      e = void 0 === a.qc ? 0 : a.qc,
      f = void 0 === a.Fb ? 0.8 : a.Fb,
      l = void 0 === a.Yb ? 687 : a.Yb,
      p = void 0 === a.sc ? "noise" : a.sc,
      t = void 0 === a.Nb ? "bandpass" : a.Nb,
      y = void 0 === a.vb ? [100, 300] : a.vb,
      ea = void 0 === a.q ? 0 : a.q;
    X.call(this, b);
    "noise" == p
      ? (a = new lf(b))
      : ((a = new mf(b)), (a.S.type = p), nf(a, l));
    l = new of(b);
    l.S.type = t;
    l.S.Q.value = ea;
    t = new pf(b);
    p = y[0];
    ea = y[1];
    y = y[1];
    t.R = [c + d, 0, 0];
    t.T = [p, ea, y];
    this.S = new qf(b);
    b = new pf(b);
    b.set(c, d, e, f);
    a.connect(l);
    l.connect(this.S);
    t.S = l.R;
    b.S = this.S.S;
    this.T = b;
    this.ma = t;
    this.v = this.S.v;
  }
  h(Y, X);
  Y.prototype.H = function() {
    rf(this.T);
    rf(this.ma);
  };
  function Xe(a) {
    Y.call(this, { Cb: a, jc: 0.1, Ab: 0.1, Fb: 1.2, vb: [200, 800], q: 10 });
  }
  h(Xe, Y);
  function Ye(a) {
    Y.call(this, {
      Cb: a,
      jc: 0.01,
      Ab: 0.1,
      qc: 0.2,
      Fb: 1,
      vb: [800, 400],
      q: 10
    });
  }
  h(Ye, Y);
  function Ze(a) {
    function b(b) {
      return {
        Cb: a,
        jc: 0.001,
        Ab: 0.03 + 0.01 * b,
        qc: 0.518 + 0.1 * b,
        Fb: 1 + 0.5 * b,
        Yb: 600 - 300 * b,
        sc: "sine",
        Nb: "lowpass",
        vb: [300 - 40 * b, 0]
      };
    }
    X.call(this, a);
    this.v = a.createGain();
    this.R = new Y(b(0.1));
    this.T = new Y(b(0.3));
    this.ma = new Y(b(0.5));
    this.R.connect(this);
    this.T.connect(this);
    this.ma.connect(this);
    this.S = new C();
    Wa(P.qa().H, this.S);
  }
  h(Ze, X);
  Ze.prototype.H = function() {
    var a = this;
    this.S.v = [];
    this.R.H();
    E(this.S, 40, function() {
      return a.T.H();
    });
    E(this.S, 40, function() {
      return a.ma.H();
    });
  };
  function $e(a) {
    Y.call(this, {
      Cb: a,
      Ab: 0.1,
      Yb: 150,
      sc: "triangle",
      Nb: "lowpass",
      vb: [200, 0]
    });
  }
  h($e, Y);
  function af(a) {
    X.call(this, a);
    this.S = [];
    this.v = a.createGain();
    for (
      var b = k([523.25, 659.25, 587.33, 698.46, 659.25, 783.99]), c = b.next();
      !c.done;
      c = b.next()
    )
      (c = new Y({
        Cb: a,
        Ab: 0.1,
        Fb: 1,
        Yb: c.value,
        sc: "sine",
        Nb: "lowpass",
        vb: [600, 100]
      })),
        c.connect(this),
        this.S.push(c);
    this.R = new C();
    a = P.qa().H;
    x(this.R, a);
  }
  h(af, X);
  function kf(a, b) {
    a.R.R = [];
    for (var c = { i: 0 }; c.i < b; c = { i: c.i }, c.i++)
      F(
        a.R,
        60 * c.i,
        (function(b) {
          return function() {
            return a.S[b.i % a.S.length].H();
          };
        })(c)
      );
  }
  function bf(a) {
    Y.call(this, {
      Cb: a,
      Ab: 0.05,
      Fb: 0.7,
      qc: 0.1,
      Nb: "lowpass",
      vb: [2500, 1500]
    });
    this.R = new C();
    a = P.qa().H;
    x(this.R, a);
  }
  h(bf, Y);
  bf.prototype.H = function() {
    var a = this;
    this.R.v = [];
    E(this.R, 110, function() {
      return Y.prototype.H.call(a);
    });
  };
  function cf(a) {
    X.call(this, a);
    this.v = a.createGain();
    this.S = [];
    this.R = [];
    sf(this, 2e3, 23, 0, 0, 0, 0.007);
    sf(this, 1800, 23, 3, 3, 5, 0.014);
    sf(this, 1700, 26, 0.3, 1, 10, 0.007);
    sf(this, 1500, 20, 0.8, 1, 10, 0.014);
    sf(this, 1520, 24, 0.8, 1, 10, 0.014);
    this.T = new C();
    a = P.qa().H;
    x(this.T, a);
  }
  h(cf, X);
  function sf(a, b, c, d, e, f, l) {
    var p = a.U,
      t = new mf(p);
    t.S.type = "sine";
    nf(t, b);
    b = new qf(p);
    var y = new mf(p);
    nf(y, c);
    c = p.createWaveShaper();
    c.curve = tf(2, 3);
    y.v.connect(c);
    c.connect(b.S);
    c = new qf(p);
    0 < d
      ? ((y = new mf(p)),
        (y.S.type = "sine"),
        nf(y, d),
        (d = p.createWaveShaper()),
        (d.curve = tf(e, f)),
        y.v.connect(d),
        d.connect(c.S))
      : jf(c, 0.8);
    e = new qf(p);
    jf(e, 0);
    t.connect(b);
    b.connect(c);
    c.connect(e);
    e.connect(a);
    a.S.push(e);
    a.R.push(l);
  }
  function tf(a, b) {
    b = new Float32Array(a + b);
    for (var c = 0; c < a; c++) b[c] = 0.8;
    for (; a < b.length; a++) b[a] = 0;
    return b;
  }
  cf.prototype.H = function() {
    for (var a = 0; a < this.S.length; a++) jf(this.S[a], this.R[a]);
  };
  function df(a, b) {
    var c = void 0 === b.Jc ? 20 : b.Jc,
      d = void 0 === b.$b ? 7 : b.$b,
      e = void 0 === b.Uc ? 127 : b.Uc,
      f = void 0 === b.Gc ? 64 : b.Gc,
      l = void 0 === b.bc ? 256 : b.bc,
      p = void 0 === b.Xb ? 74 : b.Xb,
      t = void 0 === b.yb ? 600 : b.yb;
    b = void 0 === b.wb ? 1200 : b.wb;
    X.call(this, a);
    this.v = a.createGain();
    this.ma = e;
    this.T = f;
    this.S = [];
    e = new uf(a);
    f = new of(a);
    f.S.frequency.value = 3e3;
    f.S.type = "lowpass";
    for (var y = 0; y < c; y++) {
      var ea = new vf(a, { $b: d, bc: l, Xb: p, yb: t, wb: b });
      ea.connect(e);
      ea.connect(f);
      this.S.push(ea);
    }
    f.connect(this);
    e.connect(this);
    this.R = new C();
    a = P.qa().H;
    x(this.R, a);
  }
  h(df, X);
  df.prototype.H = function() {
    this.R.v = [];
    for (var a = {}, b = 0; b < this.S.length; a = { tc: a.tc }, b++)
      (a.tc = this.S[b]),
        E(
          this.R,
          this.ma + Math.random() * this.T,
          (function(a) {
            return function() {
              return a.tc.H();
            };
          })(a)
        );
  };
  function vf(a, b) {
    var c = void 0 === b.$b ? 7 : b.$b,
      d = void 0 === b.bc ? 256 : b.bc,
      e = void 0 === b.Xb ? 74 : b.Xb,
      f = void 0 === b.yb ? 600 : b.yb;
    b = void 0 === b.wb ? 1200 : b.wb;
    X.call(this, a);
    this.W = d;
    this.T = e;
    this.ma = c;
    this.R = new wf(a, { yb: f, wb: b });
    this.v = this.R.v;
    this.S = new C();
    a = P.qa().H;
    x(this.S, a);
  }
  h(vf, X);
  vf.prototype.H = function() {
    var a = this;
    this.S.R = [];
    for (var b = 0; b < this.ma; b++)
      F(this.S, b * this.W + Math.random() * this.T - this.T / 2, function() {
        return a.R.H();
      });
  };
  function wf(a, b) {
    var c = void 0 === b.yb ? 600 : b.yb,
      d = void 0 === b.wb ? 1200 : b.wb;
    X.call(this, a);
    b = new lf(a);
    var e = Math.random() * (d - c) + c,
      c = new of(a);
    c.S.type = "bandpass";
    c.S.Q.value = 0.8;
    c.S.frequency.value = e;
    d = new of(a);
    d.S.type = "bandpass";
    d.S.Q.value = 0.8;
    d.S.frequency.value = e;
    var f = new of(a);
    f.S.type = "highpass";
    f.S.Q.value = 0.1;
    f.S.frequency.value = e;
    e = new of(a);
    e.S.type = "lowpass";
    e.S.frequency.value = 2400;
    this.S = a.createGain();
    this.R = a.createGain();
    a = a.createGain();
    a.gain.value = 0.2 + 0.8 * Math.random();
    b.connect(c);
    c.connect(d);
    d.connect(f);
    f.connect(e);
    e.connect(this.S);
    this.S.connect(this.R);
    this.R.gain.value = 0;
    this.R.connect(a);
    this.v = a;
  }
  h(wf, X);
  wf.prototype.H = function() {
    for (var a = this.U.currentTime, b = a, c = 0; 3 > c; ++c) {
      var d = 0.001 * (Math.random() - Math.random());
      this.S.gain.setValueAtTime(1, b);
      this.S.gain.linearRampToValueAtTime(0, (b += 0.01 + 0.001 * c + d));
    }
    this.S.gain.setValueAtTime(1, b);
    this.R.gain.setValueAtTime(1, a);
    this.R.gain.setTargetAtTime(0, b, 0.055 * Math.random() + 0.0575);
  };
  function ef(a) {
    X.call(this, a);
    this.v = a.createGain();
    this.R = [];
    for (var b = 0; 10 > b; b++) {
      var c = new xf(a);
      c.connect(this);
      this.R.push(c);
    }
    this.S = new C();
    a = P.qa().H;
    x(this.S, a);
  }
  h(ef, X);
  ef.prototype.H = function() {
    this.S.R = [];
    for (
      var a = 0, b = {}, c = k(this.R), d = c.next();
      !d.done;
      b = { step: b.step }, d = c.next()
    )
      (b.step = d.value),
        F(
          this.S,
          100 * a++,
          (function(a) {
            return function() {
              return a.step.H();
            };
          })(b)
        );
  };
  function xf(a) {
    Y.call(this, {
      Cb: a,
      Ab: 0.02,
      Fb: 1,
      Yb: 300,
      Nb: "lowpass",
      vb: [800, 300]
    });
  }
  h(xf, Y);
  function mf(a) {
    X.call(this, a);
    this.S = a.createOscillator();
    this.S.type = "sine";
    nf(this, 440);
    this.S.start(0);
    this.v = this.S;
  }
  h(mf, X);
  function nf(a, b) {
    a.S.frequency.setValueAtTime(b, a.U.currentTime);
  }
  function of(a) {
    X.call(this, a);
    this.S = this.U.createBiquadFilter();
    this.S.type = "lowpass";
    this.S.frequency.value = 440;
    this.v = this.S;
    this.R = this.S.frequency;
  }
  h(of, X);
  function lf(a) {
    X.call(this, a);
    for (
      var b = 2 * a.sampleRate,
        c = a.createBuffer(1, b, a.sampleRate),
        d = c.getChannelData(0),
        e = 0;
      e < b;
      e++
    )
      d[e] = 2 * Math.random() - 1;
    this.S = a.createBufferSource();
    this.S.buffer = c;
    this.S.loop = !0;
    this.S.start(0);
    this.v = this.S;
  }
  h(lf, X);
  function pf(a) {
    X.call(this, a);
    this.T = [0, 1, 0];
    this.R = [0.1, 1, 0.1];
    this.S = null;
  }
  h(pf, X);
  pf.prototype.set = function(a, b, c, d) {
    this.R = [a, b, c];
    this.T = [0, d, 0];
  };
  function rf(a) {
    if (a.S) {
      var b = a.U.currentTime;
      a.S.cancelScheduledValues(b);
      a.S.setValueAtTime(a.T[0], b);
      a.S.linearRampToValueAtTime(a.T[1], b + a.R[0]);
      a.S.linearRampToValueAtTime(a.T[1], b + a.R[0] + a.R[1]);
      a.S.linearRampToValueAtTime(a.T[2], b + a.R[0] + a.R[1] + a.R[2]);
    }
  }
  function qf(a) {
    X.call(this, a);
    this.R = a.createGain();
    this.R.gain.value = 0;
    this.v = this.R;
    this.S = this.R.gain;
  }
  h(qf, X);
  function jf(a, b) {
    var c = a.U.currentTime;
    a.S.cancelScheduledValues(c);
    a.S.setValueAtTime(b, c);
  }
  function hf(a, b) {
    var c = a.U.currentTime;
    a.S.cancelScheduledValues(c);
    a.S.linearRampToValueAtTime(b, c + 15);
  }
  function uf(a) {
    X.call(this, a);
    for (
      var b = a.sampleRate,
        c = a.createBuffer(2, b, b),
        d = c.getChannelData(0),
        e = c.getChannelData(1),
        f = 0;
      f < b;
      f++
    )
      (d[f] = (2 * Math.random() - 1) * Math.pow(1 - f / b, 1)),
        (e[f] = (2 * Math.random() - 1) * Math.pow(1 - f / b, 1));
    this.v = a.createConvolver();
    this.v.buffer = c;
  }
  h(uf, X);
  function yf() {
    this.R = this.S = this.v = this.H = 0;
  }
  function zf(a, b) {
    return new Ma(n(a.H, a.S, b), n(a.v, a.R, b));
  }
  var Af = N.qa();
  function Bf() {
    M.call(this, new v(0, 0, 0), 0.15, "#b22");
    this.$ = new Lc(0.15);
    x(this.$, this);
    this.V = this.Fa = 0;
    this.R = new yf();
    this.ha = null;
    this.wa = !1;
    this.ta = 0;
    this.v = new ue();
    xe(this.v, 0, -9.8, 0);
    this.v.H = !1;
    x(this.v, this);
    this.va = [B(this).H()];
    this.ra = [];
    this.Ca = 0.7;
  }
  h(Bf, M);
  g = Bf.prototype;
  g.reset = function() {
    this.wa = !1;
    this.ha = null;
    Cf(this, 0);
    xe(this.v, 0, -9.8, 0);
  };
  function Df(a, b, c, d) {
    we(a.v, b, c, d);
    a.R.H = B(a).x;
    a.R.v = B(a).z;
    a.R.S = a.R.H + 10 * a.v.v.x;
    a.R.R = a.R.v + 10 * a.v.v.z;
  }
  function Cf(a, b) {
    a.V = b;
    2 != b && (a.va = []);
    0 == b
      ? ((a.v.H = !1), Df(a, 0, 0, 0), (a.$.H = !1))
      : ((a.v.H = !0), (a.$.H = !0));
  }
  g.getState = function() {
    return this.V;
  };
  function Ef(a, b) {
    Cf(a, 2);
    if (!(-1 > b || 1 < b)) {
      a.va = [B(a).H()];
      W().Nc();
      var c = Math.max(0.2, 1 - Math.abs(b)),
        c = -2.1 * a.v.v.z * Math.pow(c, 1.6) + 5 * (1 - c);
      a.Ca = 0.7;
      Df(a, Ff(c, 30 < c ? 60 : 85, 0 > b ? 85 + 65 * b : 95 + 65 * b));
      O(Af, 1, Gf(a));
    }
  }
  g.ya = function(a) {
    M.prototype.ya.call(this, a);
    if (62 < Pa(B(this), H) && this.ma != P.qa().v) {
      var b = P.qa().v;
      x(this, b);
    } else
      62 < Pa(B(this), H) ||
        this.ma !== P.qa().v ||
        ((b = P.qa().H), x(this, b));
    2 == this.V && 30 < this.va.push(B(this).H()) && this.va.shift();
    0 != this.V &&
      (1 == this.V && B(this).z <= gc.z && (Cf(this, 4), O(Af, 2), W().Rc()),
      (a /= 1e3),
      0 < this.S.y - this.Ba().height / 2
        ? (xe(this.v, 0, -9.8, 0),
          (this.W = q(r(this.W) + 20 * this.v.v.x * a)),
          (this.ta += (this.v.v.z / 100) * a))
        : 2 == this.V && 62 < Pa(B(this), H)
        ? (O(Af, 4, this.wa ? 4 : 6), this.reset(), O(Af, 3))
        : 3 == this.V && 62 < Pa(B(this), H)
        ? (this.reset(), O(Af, 3))
        : 0.1 < Math.abs(this.v.v.y)
        ? (xe(this.v, 0, -9.8, 0),
          this.Da(this.S.x, this.Ba().height / 2),
          (this.v.v.y = -1 * this.v.v.y * this.Ca),
          (this.v.v.x += this.Fa),
          (this.ha = null),
          (this.wa = 2 == this.V),
          (this.Fa = 0),
          W().Lc(Pa(B(this), gc)))
        : (xe(this.v, -1, 0, -1),
          this.Da(this.S.x, this.Ba().height / 2),
          (this.v.v.y = 0),
          (this.ha = null),
          (this.W = q(r(this.W) + 10 * this.v.v.x * a)),
          (this.ta += (this.v.v.z / 200) * a)),
      (this.R.H = B(this).x),
      (this.R.v = B(this).z),
      this.$.Da(0, -B(this).y, 0),
      (a = Math.max(0.05, 0.5 - B(this).y / 10)),
      (this.$.U = a),
      A(this.$, 1 + B(this).y / 20));
  };
  function Gf(a) {
    if (!a.ha)
      if (0 >= a.S.y) a.ha = a.S;
      else {
        var b =
          0 >= a.S.y
            ? 0
            : (-a.v.v.y -
                Math.sqrt(Math.pow(a.v.v.y, 2) - (-39.2 * a.S.y) / 2)) /
              -9.8;
        a.ha = new v(B(a).x + a.v.v.x * b, 0, B(a).z + a.v.v.z * b);
      }
    return a.ha;
  }
  g.Eb = function(a) {
    var b = M.prototype.Eb.call(this, a);
    if (b) {
      this.ra = [];
      for (var c = k(this.va), d = c.next(); !d.done; d = c.next())
        this.ra.push(Cc(a, d.value, Xa(this)));
    }
    return b;
  };
  g.Ea = function(a) {
    if (2 == this.V) {
      a.fillStyle = "#FFF";
      a.save();
      for (var b = 0; b < this.ra.length; b++) {
        var c = this.ra[b];
        c &&
          (a.beginPath(),
          a.setTransform(c.Ma, 0, 0, c.Oa, c.Xa, c.Ya),
          a.arc(0, 0, (0.15 * b) / this.ra.length, 0, 2 * Math.PI),
          a.closePath(),
          (a.globalAlpha = b / this.ra.length),
          a.fill());
      }
      a.restore();
    }
    M.prototype.Ea.call(this, a);
    a.save();
    a.globalAlpha = 0.8;
    a.strokeStyle = "#FFF";
    a.lineWidth = 0.04;
    a.setLineDash([0.06, 0.04]);
    a.arc(0, 0, 0.15, 0, 2 * Math.PI);
    a.clip();
    a.beginPath();
    b = -0.15 + (((Math.abs(this.ta) / 0.15) * 2) % 0.3);
    a.moveTo(b, -0.15);
    a.lineTo(b, 0.15);
    a.stroke();
    a.restore();
  };
  function Ff(a, b, c) {
    return new v(
      a * Math.sin(q(b)) * Math.cos(q(c)),
      a * Math.cos(q(b)),
      a * Math.sin(q(b)) * Math.sin(q(c))
    );
  }
  var Hf = {},
    If = ((Hf[0] = function() {
      return {
        Vb: Ff(18 + 2.5 * (Math.random() - 0.5), 85, -91),
        Ub: 0,
        Mb: 0.7
      };
    }),
    (Hf[1] = function() {
      return {
        Vb: Ff(18.5 + 2.5 * (Math.random() - 0.5), 89, -95),
        Ub: 3,
        Mb: 0.7
      };
    }),
    (Hf[2] = function() {
      return {
        Vb: Ff(18.5 + 2.5 * (Math.random() - 0.5), 87, -89),
        Ub: -2,
        Mb: 0.7
      };
    }),
    (Hf[3] = function() {
      return { Vb: Ff(23, 90, -91), Ub: 0, Mb: 0.7 };
    }),
    (Hf[4] = function() {
      return { Vb: Ff(13, 79, -91), Ub: 0, Mb: 0.7 };
    }),
    (Hf[5] = function() {
      return { Vb: Ff(14, 110, -91), Ub: 0, Mb: 0.9 };
    }),
    Hf);
  function Jf(a, b, c) {
    L.call(
      this,
      void 0 === a ? 0 : a,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c
    );
    this.R = 0;
    this.v = [new R(jd), new R(jd), new R(jd)];
    a = k(this.v);
    for (b = a.next(); !b.done; b = a.next()) x(b.value, this);
    a = k(this.v);
    for (b = a.next(); !b.done; b = a.next()) T(b.value);
    S(this.v[0], -0.5, 0);
    S(this.v[1], 0, 0);
    S(this.v[2], 0.5, 0);
    Kf(this, this.R);
  }
  h(Jf, L);
  function Kf(a, b) {
    a.R = La(b, 0, 999);
    je(a.v[2], Lf[Math.floor(a.R % 10)]);
    je(a.v[1], Lf[Math.floor((a.R / 10) % 10)]);
    je(a.v[0], Lf[Math.floor((a.R / 100) % 10)]);
    a.v[0].Da(-0.2 - a.v[1].Ba().width / 2);
    a.v[2].Da(0.2 + a.v[1].Ba().width / 2);
  }
  var Lf = [
    jd,
    [0, 20, 2494, 26.2, 79.91],
    [0, 20, 2594, 50.73, 72.33],
    [0, 20, 2687, 50.7, 73.16],
    [0, 20, 2781, 65.42, 71.71],
    [0, 20, 2873, 55.04, 76.64],
    [0, 20, 2970, 52.84, 80.41],
    [0, 20, 3071, 46, 76.82],
    [0, 20, 3168, 59.81, 81.88],
    [0, 20, 3270, 52.36, 79.92]
  ];
  function Mf(a) {
    w.call(this, a);
    this.v = [];
    for (a = 0; 21 > a; a++)
      this.v.push(new Nf(new v(-60 + 6 * a, 5, 0))),
        x(this.v[a], this),
        (this.v[a].H = !1);
    Fc(N.qa(), this);
  }
  h(Mf, w);
  Mf.prototype.Za = function(a, b) {
    if (4 == a)
      for (a = 0; a < this.v.length; a++)
        if (!(3 >= b && a % 2)) {
          this.v[a].H = !0;
          this.v[a].Da(this.v[a].S.x, 5);
          var c = this.v[a],
            d = b;
          c.fillStyle = Of[La(d, 1, 6) - 1];
          je(c.v, Lf[d]);
        }
  };
  function Nf(a) {
    M.call(this, a, 1, "#FFF");
    this.v = new R(Lf[0]);
    this.v.ka = -1;
    S(this.v, 0, 0);
    T(this.v);
    A(this.v, 1.5);
    this.v.ka = 2500;
    x(this.v, this);
    A(this, 2.5 + 0.2 * Math.random());
    x(new ue(new v(0, 10 + 8 * Math.random(), 0)), this);
    this.ka = 2500;
  }
  h(Nf, M);
  Nf.prototype.ya = function(a) {
    M.prototype.ya.call(this, a);
    100 < B(this).y && (this.H = !1);
  };
  Nf.prototype.Ea = function(a) {
    8 < B(this).y &&
      ((a.strokeStyle = "#000"),
      a.beginPath(),
      (a.lineWidth = 0.04),
      a.moveTo(0, 0),
      a.lineTo(0, 3),
      a.stroke());
    M.prototype.Ea.call(this, a);
    a.beginPath();
    a.moveTo(0, 0.9);
    a.lineTo(-0.25, 1.25);
    a.lineTo(0.25, 1.25);
    a.closePath();
    a.fill();
  };
  var Of = "#FD0 #FD0 #4ED #9F0 #9F0 #F0F".split(" ");
  function Pf(a, b, c) {
    R.call(this, Uc, a, void 0 === b ? 0 : b, void 0 === c ? 0 : c);
    S(this, 0.5, 0.3);
    T(this);
    this.v = new Qf(new v(0, 0, 0), this.Ba().width, "#FFF");
    this.v.H = !1;
    x(this.v, this);
    this.R = new C();
    x(this.R, this);
  }
  h(Pf, R);
  function Rf(a) {
    a.v.H = !0;
    a.v.U = 1;
    a.v.Ga = q(r(a.W));
    a.v.Ia = q(r(a.W));
    a.R.v = [];
    E(a.R, 100);
    D(
      a.R,
      new I(100, 1, 0, n, function(b) {
        a.v.U = b;
      })
    );
    E(a.R, 0, function() {
      a.v.H = !1;
    });
  }
  Pf.prototype.ya = function(a) {
    R.prototype.ya.call(this, a);
    this.v.H && (this.v.Ga = q(r(this.W)));
    this.ka = 90 > r(this.W) ? -0.5 : -2;
  };
  function Qf(a) {
    M.apply(this, arguments);
  }
  h(Qf, M);
  Qf.prototype.Ea = function(a) {
    this.fillStyle = a.createLinearGradient(
      -this.Ba().width / 2,
      0,
      this.Ba().width / 2,
      0.01
    );
    this.fillStyle.addColorStop(0, "rgba(255, 255, 255, 0.0)");
    this.fillStyle.addColorStop(1, "#FFF");
    M.prototype.Ea.call(this, a);
  };
  function Sf(a, b) {
    R.call(this, Wc, b);
    this.ta = new R(Yc, new v(-0.27, 0.35, 0.14));
    T(this.ta);
    S(this.ta, -0.5, -0.5);
    this.V = new R(Xc, new v(-0.4, 0.55, 0));
    T(this.V);
    S(this.V, 0, 0.5);
    x(this.ta, this);
    x(this.V, this);
    this.V.H = !1;
    this.R = a;
    this.Ja = 0;
    this.$ = new C();
    x(this.$, this);
    this.wa = 0;
    this.v = [0];
    Fc(N.qa(), this);
  }
  h(Sf, R);
  Sf.prototype.Za = function(a) {
    2 == a && ((this.wa = 0), (this.v = [0]));
  };
  function Tf(a) {
    return new v(B(a).x - 0.55, B(a).y + 1.4, B(a).z - 0.1);
  }
  function Uf(a) {
    a.ta.H = !0;
    a.V.H = !1;
    Cf(a.R, 0);
    a.Ja = 1;
    E(a.$, 200);
    D(a.$, new J(a, 600, Sa(a.S, new v(0, 0, 5))));
    E(a.$, 200);
    D(a.$, new J(a, 500, a.S, { Xc: uc }));
    E(a.$, 0, function() {
      a.Ja = 0;
      a.ta.H = !1;
      a.V.H = !0;
      var b = a.R,
        c = a.v[Math.floor(Math.random() * a.v.length)];
      b.wa = !1;
      Cf(b, 1);
      c = If[c]();
      b.Fa = c.Ub;
      b.Ca = c.Mb;
      Df(b, c.Vb);
      W().yc();
      O(Af, 0);
      a.wa++;
      1 == a.wa
        ? a.v.push(1)
        : 3 == a.wa
        ? a.v.push(2)
        : 5 == a.wa
        ? (a.v.push(3), a.v.push(4))
        : 10 == a.wa && (a.v.push(3), a.v.push(1), a.v.push(2), a.v.push(5));
    });
  }
  Sf.prototype.ya = function(a) {
    R.prototype.ya.call(this, a);
    3 == this.R.getState() && 2 > B(this.R).y && 1.1 > Na(Ya(this.R), Ya(this))
      ? Vf(this)
      : 1 == this.Ja && this.R.Da(Tf(this));
  };
  function Vf(a) {
    Cf(a.R, 0);
    a.ta.H = !0;
    a.V.H = !1;
    G(
      a.$,
      new J(a.R, 200, Tf(a), {
        nb: function() {
          a.Ja = 1;
          O(N.qa(), 3);
        }
      })
    );
  }
  function Wf(a, b, c, d, e, f) {
    d = void 0 === d ? qa : d;
    e = void 0 === e ? "#fff" : e;
    f = void 0 === f ? !1 : f;
    M.call(this, a, 39.6, "#424d21");
    this.v = new R(b);
    S(this.v, 0, 0);
    this.v.Sb(!0);
    a = this.Ba();
    le(this.v, a.width - 0.4 * a.width, a.height - 0.4 * a.height);
    this.V = new M(new v(0, -12, 0), 37.44, e);
    this.V.Sb(!0);
    x(this.V, this);
    x(this.v, this.V);
    this.$ = !1;
    this.Sb(!0);
    this.U = 0.46;
    this.R = f;
    this.va = c;
    this.ra = d;
    this.ha = !1;
  }
  h(Wf, M);
  function Z(a, b) {
    (a.$ = b) || Xf(a, !1);
  }
  function Xf(a, b, c) {
    c = void 0 === c ? !0 : c;
    if (b == a.ha) return !1;
    (a.ha = b) ? (a.V.Da(0, 0), c && a.ra()) : (a.V.Da(0, -12), c && a.va());
    return !0;
  }
  function Yf(a, b) {
    if (!a.$) return !1;
    if (a.R) return !0;
    var c = b.x - B(a).x;
    b = b.y - B(a).y + 12 * Xa(a);
    c = Math.sqrt(c * c + b * b);
    a = new u(a.Ba().width * Xa(a), a.Ba().height * Xa(a));
    return c < 0.5 * a.width;
  }
  function Zf(a, b, c) {
    V.call(this);
    this.V = a;
    this.ra = b;
    this.va = c;
    this.ka = wa();
    this.ha = Sb(document, "hidden");
    this.v = (this.W = Sb(document, "visibilityState"))
      ? this.W.replace(/state$/i, "change").toLowerCase()
      : null;
    this.R = $f(this);
    this.T = !1;
    this.ma = this.R;
    ag(this);
    bg(this);
  }
  ya(Zf, V);
  function ag(a) {
    a.v
      ? cg(a)
      : Lb &&
        dg(a, function() {
          cg(a);
        });
  }
  function cg(a) {
    a.H = function() {
      a.R = $f(a);
      a.R ? eg(a) : fg(a);
    };
    var b = window.agsa_ext;
    a.v
      ? document.addEventListener(a.v, a.H, !1)
      : b &&
        b.registerPageVisibilityListener &&
        (google.doodle || (google.doodle = {}),
        (google.doodle.pvc = function() {
          a.H && a.H();
        }),
        b.registerPageVisibilityListener("google.doodle.pvc();"));
  }
  function dg(a, b) {
    window.agsa_ext
      ? b()
      : (a.$ = window.setTimeout(function() {
          ag(a);
        }, 100));
  }
  Zf.prototype.U = function() {
    window.clearTimeout(this.S);
    window.clearTimeout(this.$);
    this.H &&
      (this.v && document.removeEventListener
        ? document.removeEventListener(this.v, this.H, !1)
        : window.agsa_ext &&
          window.agsa_ext.registerPageVisibilityListener &&
          (this.H = null));
    Zf.Tc.U.call(this);
  };
  function $f(a) {
    if (!a.ha && !a.W && window.agsa_ext && window.agsa_ext.getPageVisibility)
      return "hidden" == window.agsa_ext.getPageVisibility();
    var b = document[a.W];
    return document[a.ha] || "hidden" == b;
  }
  function eg(a) {
    var b = a.R || a.T;
    a.ma && !b
      ? ((a.ma = !1), a.va(), bg(a))
      : !a.ma && b && ((a.ma = !0), a.ra());
  }
  function bg(a) {
    a.S && window.clearTimeout(a.S);
    var b = Math.max(100, a.V - gg(a));
    a.S = window.setTimeout(function() {
      a.S = null;
      a.T = gg(a) >= a.V;
      a.T || bg(a);
      eg(a);
    }, b);
  }
  function gg(a) {
    return wa() - a.ka;
  }
  function fg(a) {
    a.ka = wa();
    a.T = !1;
    eg(a);
  }
  function hg(a, b) {
    V.call(this);
    var c = this;
    this.H = [];
    this.v = b;
    this.R = function(d) {
      if ("contextmenu" == d.type) d.preventDefault();
      else {
        var e;
        if ((e = d || window.event)) {
          var f =
            (e.targetTouches && e.targetTouches[0]) ||
            (e.changedTouches && e.changedTouches[0]);
          e =
            f && void 0 !== f.pageX
              ? [f.pageX, f.pageY]
              : void 0 !== e.clientX
              ? [
                  e.clientX +
                    ("rtl" == document.dir ? -1 : 1) *
                      (document.body.scrollLeft ||
                        document.documentElement.scrollLeft ||
                        0),
                  e.clientY +
                    (document.body.scrollTop ||
                      document.documentElement.scrollTop ||
                      0)
                ]
              : void 0 !== e.pageX
              ? [e.pageX, e.pageY]
              : [0, 0];
        } else e = [0, 0];
        var f = b,
          t = 0,
          y = 0;
        if (f) {
          do (t += f.offsetLeft), (y += f.offsetTop);
          while ((f = f.offsetParent));
        }
        f = [t, y];
        f = [e[0] - f[0], e[1] - f[1]];
        e = (f[0] * b.width) / b.clientWidth;
        f = (f[1] * b.height) / b.clientHeight;
        t = d.type;
        "touchstart" == t
          ? (t = "mousedown")
          : "touchmove" == t
          ? (t = "mousemove")
          : "touchend" == t && (t = "mouseup");
        e = new v(e, f, 0);
        if ("mousedown" == t) {
          t = k(c.H);
          for (f = t.next(); !f.done; f = t.next())
            (f = f.value), Yf(f, e) && Xf(f, !0);
          c.v.focus();
        } else if ("mouseup" == t)
          for (t = k(c.H), f = t.next(); !f.done; f = t.next())
            (f = f.value), f.ha && ((y = Yf(f, e)), Xf(f, !1, y));
        else if ("mousemove" == t) {
          t = "default";
          y = k(c.H);
          for (f = y.next(); !f.done; f = y.next())
            if (Yf(f.value, e)) {
              t = "pointer";
              break;
            }
          c.v.style.cursor = t;
        }
        d.preventDefault();
        fg(a);
      }
    };
    this.S = "mousedown mouseup mousemove touchstart touchend touchmove contextmenu".split(
      " "
    );
    for (var d = k(this.S), e = d.next(); !e.done; e = d.next())
      b.addEventListener(e.value, this.R, !1);
  }
  h(hg, V);
  hg.prototype.U = function() {
    for (var a = k(this.S), b = a.next(); !b.done; b = a.next())
      this.v.removeEventListener(b.value, this.R, !1);
    V.prototype.U.call(this);
  };
  function ig(a) {
    this.H = a;
    this.R = a.clientWidth;
    this.S = a.clientHeight;
    this.v = 2;
    jg(this);
  }
  function jg(a) {
    a.R = a.H.clientWidth;
    a.S = a.H.clientHeight;
    a.H.width = a.R * a.v;
    a.H.height = a.S * a.v;
    O(N.qa(), 15);
  }
  function kg(a) {
    var b = a.v;
    a.v = 1;
    1 != b && jg(a);
  }
  function lg(a) {
    this.v = a;
    this.T = this.U = this.R = this.S = this.H = 0;
    this.ma = 768;
  }
  function mg(a) {
    a.S = 2.5;
    a.H = 0;
    a.ma = cc;
    a.U = dc;
    a.T = a.v.clientWidth;
    a.R = a.v.clientHeight;
  }
  lg.prototype.reset = function() {
    this.H = this.S = 0;
    Qb(this.v, "width", "", "height", "");
    Zb(0);
  };
  function ng() {
    this.H = this.v = 0;
  }
  function pg(a, b, c) {
    R.call(this, Ad, c);
    this.ta = c.H();
    this.V = 0;
    this.v = a;
    this.$ = b;
    this.R = new C();
    x(this.R, this);
  }
  h(pg, R);
  function qg(a, b) {
    a.R.v = [];
    a.V = b;
  }
  function rg(a) {
    return new v(B(a).x, B(a).y + 0.6, B(a).z);
  }
  pg.prototype.ya = function(a) {
    R.prototype.ya.call(this, a);
    var b = this.v.Aa.H - this.Aa.H;
    2 < Math.abs(b) && (this.Hb = 0 > b);
    if (2 == this.v.getState() && 2 >= B(this.v).y) {
      b = Na(Ya(this.v), Ya(this));
      if (1.1 > b) {
        sg(this);
        return;
      }
      b < 1.1 * 3 && (this.V = 1);
    }
    if (1 == this.V) {
      var b = B(this.v),
        c = B(this),
        d = this.v.v.v;
      if (2 > Pa(b, c)) b = b.H();
      else {
        var c = Ya(this),
          e = this.v.R,
          f = c;
        if (f instanceof Ma) {
          var l = f.y;
          f = f.x;
        } else l = void 0;
        var p = e.H,
          t = e.v,
          y = e.S - e.H,
          ea = e.R - e.v,
          c = Na(
            c,
            zf(
              e,
              La(
                ((Number(f) - p) * (e.S - p) + (Number(l) - t) * (e.R - t)) /
                  (y * y + ea * ea),
                0,
                1
              )
            )
          );
        2 > b.y && 1.1 > c
          ? (b = b.H())
          : ((c /= 5),
            (e = Ra(d.H().scale(c), b)),
            2 < Math.max(0, b.y + d.y * c + -4.9 * Math.pow(c, 2)) &&
              Gf(this.v) &&
              (e = Gf(this.v)),
            (b = e));
      }
      b.y = 0;
      0.2 < Pa(b, this.S) &&
        ((b = Ta(b, B(this))),
        (b = b.scale(1 / Qa(b))),
        (a = Ra(b.scale((5 * a) / 1e3), B(this))),
        62 > Pa(a, H) && this.Da(a));
    }
  };
  function sg(a) {
    Cf(a.v, 0);
    O(Af, 9);
    qg(a, 2);
    D(a.R, new J(a.v, 200, rg(a)));
    E(a.R, 100, function() {
      var b = a.v,
        c = B(a.$);
      Cf(b, 3);
      var c = Ta(c, B(b)),
        d = Qa(c),
        e = Math.pow(30, 4) - Math.pow(-9.8, 2) * Math.pow(d, 2),
        d =
          0 > e
            ? 45
            : -r(Math.atan((Math.pow(30, 2) + Math.sqrt(e)) / (-9.8 * d)));
      W().yc();
      Df(b, Ff(30, d, r(Math.atan2(c.z, c.x))));
    });
  }
  function tg(a, b) {
    b = void 0 === b ? !0 : b;
    qg(a, 3);
    var c = a.ta.H();
    b && ((c.x += -3 + 6 * Math.random()), (c.z += -3 + 6 * Math.random()));
    b = Pa(B(a), c);
    D(
      a.R,
      new J(a, ((800 + 200 * Math.random()) * b) / 5, c, {
        nb: function() {
          return qg(a, 0);
        }
      })
    );
  }
  var ug = [
    new v(-6, 0, H.z + 15),
    new v(10, 0, H.z + 15),
    new v(-8, 0, H.z + 50),
    new v(8, 0, H.z + 50),
    new v(-25, 0, H.z + 20),
    new v(26, 0, H.z + 22),
    new v(-25, 0, H.z + 10),
    new v(26, 0, H.z + 10),
    new v(15, 0, H.z)
  ];
  function vg(a, b) {
    w.call(this);
    this.U = a;
    this.v = [];
    for (var c = k(ug), d = c.next(); !d.done; d = c.next())
      (d = new pg(a, b, d.value)), this.v.push(d), x(d, this);
    this.T = this.R = null;
    Fc(N.qa(), this);
  }
  h(vg, w);
  vg.prototype.Za = function(a, b) {
    if (1 == a) {
      a = this.U.R;
      for (
        var c = Number.MAX_SAFE_INTEGER, d = k(this.v), e = d.next();
        !e.done;
        e = d.next()
      ) {
        e = e.value;
        Ya(e);
        var f = Pa(B(e), b);
        f < c && 0 <= b.x * B(e).x && ((c = f), (this.R = e));
      }
      c = Number.MAX_SAFE_INTEGER;
      d = k(this.v);
      for (e = d.next(); !e.done; e = d.next())
        (e = e.value),
          e !== this.R &&
            ((f = Na(Ya(e), zf(a, 0.5))), f < c && ((c = f), (this.T = e)));
      qg(this.R, 1);
      qg(this.T, 1);
      a = k(this.v);
      for (e = a.next(); !e.done; e = a.next())
        (c = e.value),
          c !== this.R &&
            c !== this.T &&
            ((e = b),
            (c.R.v = []),
            (e = Ua(B(c), e, 0.05 + 0.2 * Math.random())),
            (d = Pa(B(c), e)),
            D(c.R, new J(c, ((800 + 200 * Math.random()) * d) / 5, e)));
    } else if (3 == a || 2 == a)
      for (b = k(this.v), e = b.next(); !e.done; e = b.next())
        tg(e.value, 2 != a);
  };
  function wg(a, b) {
    M.call(
      this,
      a,
      0.5,
      ["#0FF", "#FF0", "#F0F", "lime", "#FFD"][Math.floor(5 * Math.random())]
    );
    this.v = new ue();
    xe(this.v, 0, -9.8, 0);
    we(this.v, b);
    x(this.v, this);
    this.R = 0;
    this.V = [];
  }
  h(wg, M);
  wg.prototype.ya = function(a) {
    M.prototype.ya.call(this, a);
    for (var b = k(this.V), c = b.next(); !c.done; c = b.next())
      (c = c.value),
        (c[0] += (c[2] * a) / 1e3),
        (c[1] -= (c[3] * a) / 1e3),
        (c[5] -= a / 2e3);
    if (0.1 > this.v.v.y && 0 == this.R)
      for (this.R = 1, a = 0; 10 > a; a++)
        this.V.push([
          0,
          0,
          -10 + 20 * Math.random(),
          -5 + 20 * Math.random(),
          "#FD0 #FD0 #4ED #9F0 #9F0 #F0F".split(" ")[
            Math.floor(5 * Math.random())
          ],
          1
        ]);
    else 1 == this.R && 0 >= B(this).y && z(this);
  };
  wg.prototype.Ea = function(a) {
    if (0 == this.R) M.prototype.Ea.call(this, a);
    else {
      a.globalCompositeOperation = "screen";
      for (var b = k(this.V), c = b.next(); !c.done; c = b.next())
        (c = c.value),
          0 >= c[5] ||
            (a.beginPath(),
            (a.globalAlpha = c[5]),
            a.arc(c[0], c[1], 0.3, 0, 2 * Math.PI),
            (a.fillStyle = c[4]),
            a.fill());
      a.globalCompositeOperation = "source-over";
    }
  };
  function xg() {
    w.call(this);
    var a = this;
    this.v = new C();
    x(this.v, this);
    for (var b = { i: 0 }; 21 > b.i; b = { i: b.i }, b.i++)
      F(
        this.v,
        50 * b.i,
        (function(b) {
          return function() {
            var c = new wg(
              new v(-60 + 6 * b.i, 0, H.z + 62),
              new v(0, 15 + 5 * Math.random(), 0)
            );
            x(c, a);
          };
        })(b)
      );
  }
  h(xg, w);
  function yg(a) {
    V.call(this);
    this.v = a;
    this.H = function(a) {
      return a.preventDefault();
    };
    Ib &&
      (window.addEventListener("touchmove", this.H, !1),
      document.addEventListener("touchmove", this.H, !1),
      document.body.addEventListener("touchmove", this.H, !1));
  }
  h(yg, V);
  yg.prototype.U = function() {
    Ib &&
      (window.removeEventListener("touchmove", this.H, !1),
      document.removeEventListener("touchmove", this.H, !1),
      document.body.removeEventListener("touchmove", this.H, !1));
    V.prototype.U.call(this);
  };
  function zg(a, b, c) {
    Wf.call(this, a, Vc, c, b, "gold", !0);
  }
  h(zg, Wf);
  var Ag,
    Bg = {
      Pa: !0,
      Qa: !0,
      Ra: !1,
      $a: !1,
      Na: !1,
      Sa: !1,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !1,
      hb: !1,
      name: 0
    },
    Cg = {
      Pa: !0,
      Qa: !0,
      Ra: !1,
      $a: !1,
      Na: !1,
      Sa: !1,
      Ta: !1,
      ab: !0,
      kb: !1,
      Wa: !1,
      hb: !1,
      name: 1
    },
    Dg = {
      Pa: !0,
      Qa: !1,
      Ra: !0,
      $a: !0,
      Na: !1,
      Sa: !1,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !0,
      hb: !0,
      name: 2
    },
    Eg = {
      Pa: !0,
      Qa: !1,
      Ra: !1,
      $a: !0,
      Na: !0,
      Sa: !1,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !0,
      hb: !0,
      name: 3
    },
    Fg = {
      Pa: !0,
      Qa: !1,
      Ra: !1,
      $a: !0,
      Na: !1,
      Sa: !1,
      Ta: !0,
      ab: !1,
      kb: !0,
      Wa: !0,
      hb: !0,
      name: 4
    },
    Gg = {
      Pa: !1,
      Qa: !0,
      Ra: !1,
      $a: !1,
      Na: !1,
      Sa: !1,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !1,
      hb: !1,
      name: 5
    },
    Hg = {
      Pa: !0,
      Qa: !1,
      Ra: !1,
      $a: !0,
      Na: !0,
      Sa: !0,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !0,
      hb: !0,
      name: 6
    },
    Ig = {
      Pa: !0,
      Qa: !1,
      Ra: !1,
      $a: !0,
      Na: !1,
      Sa: !1,
      Ta: !1,
      ab: !1,
      kb: !0,
      Wa: !0,
      hb: !1,
      name: 8
    },
    Jg = {
      Pa: !0,
      Qa: !1,
      Ra: !1,
      $a: !0,
      Na: !0,
      Sa: !0,
      Ta: !1,
      ab: !1,
      kb: !0,
      Wa: !0,
      hb: !0,
      name: 7
    },
    Kg = {
      Pa: !0,
      Qa: !1,
      Ra: !1,
      $a: !0,
      Na: !0,
      Sa: !0,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !0,
      hb: !0,
      name: 9
    },
    Lg = {
      Pa: !0,
      Qa: !0,
      Ra: !1,
      $a: !1,
      Na: !1,
      Sa: !1,
      Ta: !1,
      ab: !1,
      kb: !1,
      Wa: !1,
      hb: !1,
      name: 10
    };
  function Mg() {
    Ng();
    return Ag.Ra;
  }
  function Ng() {
    null == Ag &&
      (Ag =
        Kb && !Ob
          ? Dg
          : Lb
          ? Eg
          : m(Gb, "Gbot")
          ? Fg
          : document.getElementById("fkbx") && !Mb
          ? Gg
          : Pb()
          ? Hg
          : document.querySelector("body.hp")
          ? Mb
            ? Cg
            : Bg
          : Ob
          ? Mb
            ? Jg
            : Ig
          : Mb
          ? Kg
          : Lg);
  }
  function Og(a, b) {
    if (!Pg) return b;
    try {
      var c = window.localStorage.getItem(a);
    } catch (d) {
      return b;
    }
    return null == c ? b : JSON.parse(c);
  }
  function Qg(a, b) {
    if (Pg)
      try {
        window.localStorage.setItem(a, JSON.stringify(b));
      } catch (c) {}
  }
  var Pg = !!self.localStorage;
  function Rg(a, b, c) {
    w.call(
      this,
      void 0 === a ? 0 : a,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c
    );
    a = new Q(kc, Jc(new v(8, 6, 0)), { fillStyle: "#48B" });
    x(a, this);
    a = new Q(new v(0, 0, -2), Jc(new v(8, 6, 0)), {
      strokeStyle: "#FFF",
      lineWidth: 0.2
    });
    x(a, this);
    this.v = 0;
    this.R = Og("doodle-cricket17-score", 0);
    this.W = new Jf(0, 0, -2);
    A(this.W, 3);
    x(this.W, this);
    a = new R(Jd, -3.5, 4);
    A(a, 1.3);
    T(a);
    x(a, this);
    this.U = new Jf(1, 5, 0);
    A(this.U, 2.5);
    Kf(this.U, this.R);
    x(this.U, this);
    this.ka = new C();
    x(this.ka, this);
    this.T = 50;
    Fc(N.qa(), this);
  }
  h(Rg, w);
  Rg.prototype.reset = function() {
    this.v = 0;
    this.T = 50;
    Kf(this.W, this.v);
  };
  Rg.prototype.Za = function(a, b) {
    var c = this;
    if (4 == a) {
      var d = this.v;
      this.v += b;
      a = {};
      for (var e = 1; e <= b; a = { j: a.j }, e++)
        (a.j = e),
          E(
            this.ka,
            150,
            (function(a) {
              return function() {
                Kf(c.W, d + a.j);
                d + a.j > c.R && Kf(c.U, d + a.j);
              };
            })(a)
          );
      d < this.T &&
        this.v >= this.T &&
        (50 == this.T % 100 ? O(N.qa(), 10) : O(N.qa(), 11), (this.T += 50));
      E(this.ka, 0, function() {
        c.v > c.R && ((c.R = c.v), Kf(c.U, c.R));
      });
    } else
      2 == a &&
        (Ng(),
        Ag.Ta && (document.cookie = "sessionHighScore=" + this.v),
        this.v >= this.R && Qg("doodle-cricket17-score", this.R));
  };
  (!Fe && !De) || (De && 9 <= Number(Oe)) || (Fe && Ne("1.9.1"));
  De && Ne("9");
  var Sg = 0,
    Tg = {};
  function Ug(a) {
    Tg.c = a;
    Vg(1);
  }
  function Vg(a) {
    var b = wa();
    0 == a && (Sg = b);
    Tg.e = a;
    Tg.t = 0 == Sg ? -1 : Math.floor(b - Sg);
    Tg.m = Mb ? 1 : 0;
    a = window.document;
    a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
    a = new u(a.clientWidth, a.clientHeight);
    Tg.w = a.width > a.height ? 1 : 0;
    Tg.o = "orientation" in window ? parseInt(window.orientation, 10) : "_";
    a = [];
    for (var c in Tg) Tg.hasOwnProperty(c) && a.push(c + ":" + Tg[c]);
    $b(a.join(","));
  }
  function Wg(a) {
    return 0 == a.indexOf("//") ? "https:" + a : a;
  }
  function Xg() {
    return Tb("shortlink", "http://www.google.com/?doodle=33674259");
  }
  function Yg(a) {
    var b,
      c = Tb("msgs", {});
    na(b) || (b = "Share Message");
    return (c["Share Message"] || Wb() || b).replace(/\[.*\]/, "" + a);
  }
  function Zg(a, b, c) {
    w.call(this);
    var d = this;
    this.ta = a;
    this.Ga = c;
    this.T = new zg(
      new v(0, 150, 0),
      function() {
        d.v.R = [];
        O(N.qa(), 7);
      },
      function() {
        O(N.qa(), 8, 2 == d.W);
      }
    );
    Z(this.T, !0);
    x(this.T, this);
    this.R = new Wf(new v(0, 0, 0), Zc, function() {
      if (d.R.R) {
        var a = d.Ga,
          b = Sb(a.v, "requestFullscreen");
        if (b) a.v[b]();
      } else if ((a = Sb(document, "exitFullscreen"))) document[a]();
    });
    A(this.R, 0.7);
    S(this.R.v, 0.03, -0.01);
    this.R.H = !1;
    this.R.R = !0;
    x(this.R, this);
    Ng();
    (this.Fa = Ag.Sa) && Z(this.R, !0);
    this.$ = new w(0, 150, 0);
    x(this.$, this);
    this.v = new C();
    x(this.v, this);
    this.W = 3;
    a = 1.5 * this.T.Ba().width;
    this.V = new Wf(new v(a, 0, 0), Mg() ? Cd : Id, function() {
      var a = b.v;
      Mg()
        ? (window.location =
            "http://www.google.com/doodles/_SHARE?description=" +
            encodeURIComponent(String(Yg(a))) +
            "&url=" +
            encodeURIComponent(String(Xg())))
        : $g(d);
    });
    Mg() || S(this.V.v, -0.09, 0);
    x(this.V, this.$);
    this.ka = new Wf(new v(-a, 0, 0), Hd, function() {
      O(N.qa(), 13);
      var a = google.doodle ? google.doodle.url : "";
      if (a) {
        var b = void 0;
        if (google.nav && google.nav.go) {
          var c = a;
          if (0 == a.indexOf("/search")) {
            c = new mb(window.location);
            c.T = "/search";
            for (
              var a = (a instanceof mb ? new mb(a) : new mb(a, void 0)).v,
                d = a.Ob(),
                t = 0;
              t < d.length;
              t++
            ) {
              var y = d[t],
                ea = c,
                vd = y,
                y = a.get(y);
              ea.v.set(vd, y);
            }
            c = c.toString();
          }
          b ? window.open(c) : google.nav.go(c);
        } else
          b
            ? window.open(a)
            : window.parent
            ? window.parent.location.assign(a)
            : window.location.assign(a);
      }
    });
    S(this.ka.v, 0.05, -0.01);
    x(this.ka, this.$);
    this.U = new Wf(new v(0, 0, 0), Gd, function() {
      return O(N.qa(), 5);
    });
    A(this.U.v, 1.1);
    S(this.U.v, 0.05, 0);
    x(this.U, this.$);
    this.Ca = !1;
    this.va = new ah();
    this.va.Da(0, -20, 0);
    A(this.va, 0.4);
    this.va.W = q(-80);
    x(this.va, this.T);
    this.ha = new w(0, -100, 0);
    this.ha.H = !1;
    this.ra = new Wf(new v(-a, 0, 0), zd, function() {
      var a = Xg(),
        a = Wg(a),
        b = new mb("http://www.facebook.com/sharer.php"),
        c = new pb();
      Bb(c, "u", a);
      qb(b, c);
      window.open(b.toString());
      Vg(5);
    });
    x(this.ra, this.ha);
    this.wa = new Wf(
      new v(0, 0, 0),
      Kd,
      function() {
        var a = Xg(),
          c = Yg(b.v),
          a = Wg(a);
        window.open(
          "http://twitter.com/intent/tweet?text=" +
            encodeURIComponent(String(c + "\n" + a))
        );
        Vg(6);
      },
      function() {},
      "#1DA1F2"
    );
    x(this.wa, this.ha);
    this.Aa = new Wf(new v(a, 0, 0), yd, function() {
      var a = b.v;
      $b("share,5,x");
      var c = window.location,
        d = Xg(),
        a = Yg(a),
        d = Wg(d),
        a = { subject: Ub, body: a + "\n" + d },
        d = new pb();
      for (p in a) Bb(d, p, a[p]);
      var p = new mb("mailto:");
      qb(p, d);
      c.href = p.toString();
    });
    x(this.Aa, this.ha);
    x(this.ha, this.$);
    bh(this);
  }
  h(Zg, w);
  function ch(a) {
    return [a.R, a.T, a.V, a.ka, a.U, a.ra, a.wa, a.Aa];
  }
  function $g(a) {
    a.Ca = !a.Ca;
    a.Ca
      ? ((a.ha.H = !0),
        A(a.Aa, 0),
        A(a.ra, 0),
        A(a.wa, 0),
        E(a.v, 0, function() {
          G(
            a.v,
            new I(200, 0, 1, n, function(b) {
              return A(a.ra, b);
            })
          );
        }),
        E(a.v, 100, function() {
          G(
            a.v,
            new I(200, 0, 1, n, function(b) {
              return A(a.wa, b);
            })
          );
        }),
        E(a.v, 100, function() {
          G(
            a.v,
            new I(200, 0, 1, n, function(b) {
              return A(a.Aa, b);
            })
          );
        }),
        E(a.v, 0, function() {
          Z(a.Aa, !0);
          Z(a.ra, !0);
          Z(a.wa, !0);
        }))
      : ((a.ha.H = !1), Z(a.Aa, !1), Z(a.ra, !1), Z(a.wa, !1));
  }
  function dh(a, b) {
    b != a.W &&
      ((a.W = b),
      (a.v.v = []),
      (a.v.R = []),
      2 != b && z(a.va),
      (a.Ca = !1),
      (a.ha.H = !1),
      Z(a.Aa, !1),
      Z(a.ra, !1),
      Z(a.wa, !1),
      0 == b || 2 == b
        ? (Z(a.V, !1),
          Z(a.ka, !1),
          Z(a.U, !1),
          D(a.v, [
            new J(a.$, 500, new v(0, 150, 0), { Ha: uc }),
            new J(a.T, 500, new v(0, 0, 0), { Ha: uc })
          ]),
          2 == b &&
            E(a.v, 0, function() {
              G(
                a.v,
                new I(2e4, 0, 20 * Math.PI, n, function(b) {
                  b = !!Math.round(Math.abs(Math.sin(b)) - 0.44);
                  a.va.Da(a.va.S.x, -20 + 15 * b);
                  Xf(a.T, b, !1) && (b ? O(N.qa(), 7) : O(N.qa(), 8, !1));
                })
              );
            }),
          E(a.v, 0, function() {
            Z(a.T, !0);
          }))
        : 1 == b &&
          (Z(a.T, !1),
          a.$.Da(0, 0, 0),
          A(a.V, 0),
          A(a.ka, 0),
          A(a.U, 0),
          G(a.v, new J(a.T, 500, new v(0, 150, 0), { Ha: uc })),
          E(a.v, 1e3, function() {
            G(
              a.v,
              new I(200, 0, 1, n, function(b) {
                return A(a.ka, b);
              })
            );
          }),
          E(a.v, 100, function() {
            G(
              a.v,
              new I(200, 0, 1, n, function(b) {
                return A(a.U, b);
              })
            );
          }),
          E(a.v, 100, function() {
            G(
              a.v,
              new I(200, 0, 1, n, function(b) {
                return A(a.V, b);
              })
            );
          }),
          E(a.v, 0, function() {
            Z(a.V, !0);
            Z(a.ka, !0);
            Z(a.U, !0);
          })));
  }
  Zg.prototype.ya = function() {
    if (
      B(this).y != this.ta.height - 0.07 * this.ta.height ||
      B(this).x != this.ta.width / 2
    )
      bh(this), 1 == this.W && (Z(this.V, !0), Z(this.ka, !0), Z(this.U, !0));
    if (this.Fa) {
      var a = Sb(document, "fullscreenElement");
      (a = null != a && null != document[a]) && !this.R.H
        ? ((this.R.H = !0), (this.R.R = !1))
        : !a && this.R.H && ((this.R.H = !1), (this.R.R = !0));
    }
  };
  function bh(a) {
    var b = a.ta.width / 2,
      c = a.ta.height - 0.07 * a.ta.height,
      d = a.ta.height / 720;
    a.Da(b, c, 0);
    A(a, d);
    a.R.Da(b / d - 42, c / d - 1279, 0);
  }
  function ah(a, b, c, d) {
    K.call(
      this,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c,
      void 0 === d ? 0 : d
    );
  }
  h(ah, K);
  ah.prototype.Ea = function(a) {
    a.save();
    a.translate(-73, -15);
    a.beginPath();
    a.moveTo(66.7, 352.6);
    a.bezierCurveTo(66.7, 352.6, 67.8, 279.6, 67.8, 263.1);
    a.bezierCurveTo(67.8, 246.6, 50.3, 247.1, 43.3, 234.8);
    a.bezierCurveTo(36.4, 222.6, 8.7, 156.5, 49.7, 150.1);
    a.bezierCurveTo(52.4, 115.5, 56.1, 50.6, 57.7, 29.2);
    a.bezierCurveTo(59.3, 7.9, 90.2, 13.3, 89.7, 29.8);
    a.bezierCurveTo(89.1, 46.3, 87.5, 111.3, 87.5, 111.3);
    a.bezierCurveTo(87.5, 111.3, 93.4, 103.3, 107.2, 105.9);
    a.bezierCurveTo(121.1, 108.6, 124.8, 122.5, 124.8, 122.5);
    a.bezierCurveTo(124.8, 122.5, 149.9, 98.5, 161, 134.7);
    a.bezierCurveTo(176.5, 117.7, 188.2, 133.6, 189.8, 145.9);
    a.bezierCurveTo(191, 155.5, 196.2, 192.8, 189.3, 215.7);
    a.bezierCurveTo(182.3, 238.6, 163.7, 264.7, 163.7, 264.7);
    a.lineTo(162.6, 352.6);
    a.lineWidth = 9;
    a.fillStyle = "rgb(255, 255, 255)";
    a.strokeStyle = "#424d21";
    a.lineCap = "round";
    a.lineJoin = "round";
    a.closePath();
    a.stroke();
    a.fill();
    a.restore();
  };
  function eh(a, b, c, d) {
    V.call(this);
    var e = this;
    this.R = {};
    for (var f = 0, l; (l = b[f++]); ) this.R[l] = !0;
    this.H = null;
    b = document.getElementsByTagName("input");
    for (f = 0; (l = b[f++]); ) "q" == l.name && (this.H = l);
    this.v = function(b) {
      fh(e, b) && (fg(a), b.preventDefault(), b.stopPropagation(), c(b));
    };
    this.S = function(b) {
      fh(e, b) && (fg(a), b.preventDefault(), b.stopPropagation(), d(b));
    };
    document.addEventListener("keydown", this.v, !1);
    document.addEventListener("keyup", this.S, !1);
  }
  h(eh, V);
  function fh(a, b) {
    return (
      a.R[b.which] &&
      !b.ctrlKey &&
      !b.metaKey &&
      !b.altKey &&
      (!a.H || a.H != document.activeElement)
    );
  }
  eh.prototype.U = function() {
    document.removeEventListener("keydown", this.v, !1);
    document.removeEventListener("keyup", this.S, !1);
    V.prototype.U.call(this);
  };
  function gh() {
    this.H = 0;
  }
  gh.prototype.reset = function() {
    this.H = 0;
    Tg.s = this.H;
  };
  function hh(a) {
    gh.qa();
    Tg.d1 = a;
  }
  gh.prototype.Za = function(a, b) {
    4 == a
      ? ((this.H += b), (Tg.s = this.H))
      : 2 == a
      ? (Vg(2), Ug(4), (this.H = 0), (Tg.s = this.H))
      : 13 == a
      ? Vg(3)
      : 5 == a
      ? (Vg(4), Vg(0), Ug(5))
      : 16 == a
      ? (Tg.d2 = Math.round(b))
      : 12 == a
      ? (Vg(0), Ug(3))
      : 19 == a && Ug(2);
  };
  ra(gh);
  function ih(a) {
    R.call(this, Ed, a);
    this.R = new C();
    x(this.R, this);
    this.ra = new ac(-0.5, -1, 1, 1);
    S(this, 0, 0.5);
    A(this, 1.7);
    T(this);
    this.v = new R([kd, ld, od, pd, qd, rd, sd, td, ud, wd, md, nd]);
    x(this.v, this);
    S(this.v, 0, -0.3);
    A(this.v, 0);
    ke(this.v, 1.15, 1.15);
    this.v.U = 0;
  }
  h(ih, R);
  function jh(a) {
    D(a.R, [
      new I(300, 0, 1, n, function(b) {
        a.v.U = b;
      }),
      new I(300, 0, 3, n, function(b) {
        return A(a.v, b);
      })
    ]);
    E(a.R, 0, function() {
      a.v.Ia = !0;
    });
    D(
      a.R,
      new I(
        600,
        0.5,
        -0.5,
        n,
        function(b) {
          return S(a, 0, b);
        },
        { Ha: uc }
      )
    );
  }
  function kh(a) {
    D(
      a.R,
      new I(600, -0.5, 0.5, n, function(b) {
        return S(a, 0, b);
      })
    );
    D(a.R, [
      new I(300, 1, 0, n, function(b) {
        a.v.U = b;
      }),
      new I(300, 3, 0, n, function(b) {
        return A(a.v, b);
      })
    ]);
    E(a.R, 0, function() {
      a.H = !1;
      a.v.reset();
    });
  }
  function lh(a) {
    w.call(this, a);
    a = new Q(new v(0, 0, -5.64), Jc(new v(3.66, 0, 11.28)), {
      fillStyle: "tan"
    });
    x(a, this);
    a = new Q(kc, Jc(new v(3.66, 0, 11.28)), { fillStyle: "tan" });
    x(a, this);
    a = new Q(new v(0, 0, 5.64), Jc(new v(3.66, 0, 11.28)), {
      fillStyle: "tan"
    });
    x(a, this);
    a = new v(3.66, 0, 0.15);
    var b = new Q(new v(0, 0, 8.64), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(b, this);
    a = new Q(new v(0, 0, -8.64), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(a, this);
    a = new v(2.49, 0, 0.15);
    b = new Q(new v(0, 0, 10.06), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(b, this);
    a = new Q(new v(0, 0, -10.06), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(a, this);
    a = new v(0.15, 0, 11.28 - 8.64 - 0.075);
    b = new Q(new v(-1.32, 0, -10.06 + 0.075), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(b, this);
    b = new Q(new v(-1.32, 0, 10.06 - 0.075), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(b, this);
    b = new Q(new v(1.32, 0, -10.06 + 0.075), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(b, this);
    a = new Q(new v(1.32, 0, 10.06 - 0.075), Jc(a), {
      fillStyle: "rgba(255,255,255,0.3)"
    });
    x(a, this);
    a = Math.PI;
    var b = 2 * Math.PI,
      c = new Q(kc, Kc(new u(62, 62), a, b), { strokeStyle: "white" });
    x(c, this);
    for (
      var c = Kc(90, a, b, 20), c = k(c), d = c.next();
      !d.done;
      d = c.next()
    ) {
      for (var d = d.value, e = new w(d), f = 0; 6 > f; f++) {
        var l = d.x + -4.5 + 1.5 * f;
        (13 >= l && -13 <= l) ||
          ((l = new R(bd)),
          A(l, 2.5),
          S(l, -4.5 + 1.5 * f, -0.5 - Math.random() / 3),
          T(l),
          x(l, e));
      }
      x(e, this);
    }
    c = 15;
    for (d = 0; d < c + 1; d++) {
      var e = 112 * Math.cos(a - ((d + 1) / c) * (b - a)),
        f = 112 * Math.sin(a - ((d + 1) / c) * (b - a)),
        l = 112 * Math.cos(a - (d / c) * (b - a)),
        p = 112 * Math.sin(a - (d / c) * (b - a)),
        e = new Q(
          new v(0, 0, 0),
          [new v(e, 0, f), new v(l, 0, p), new v(l, 6, p), new v(e, 6, f)],
          { fillStyle: "#F9EC31" }
        );
      x(e, this);
    }
    this.R = [];
    mh(this, id, 86, a - 0.3, b - 0.3, 11);
    mh(this, hd, 82, a, b, 10);
    c = 20;
    for (d = 0; d < c + 1; d++)
      (e = 72 * Math.cos(a - ((d + 1) / c) * (b - a))),
        (f = 72 * Math.sin(a - ((d + 1) / c) * (b - a))),
        (l = 72 * Math.cos(a - (d / c) * (b - a))),
        (p = 72 * Math.sin(a - (d / c) * (b - a))),
        (e = new Q(
          new v(0, 0, 0),
          [new v(e, 0, f), new v(l, 0, p), new v(l, 1, p), new v(e, 1, f)],
          { fillStyle: "white" }
        )),
        x(e, this);
    Fc(N.qa(), this);
    this.v = new C();
    x(this.v, this);
  }
  h(lh, w);
  function mh(a, b, c, d, e, f) {
    c = Kc(c, d, e, f);
    Ha(c, function(a, b) {
      return b.z - a.z;
    });
    c = k(c);
    for (d = c.next(); !d.done; d = c.next())
      (d = new R(b, d.value)), A(d, 5.5), T(d), a.R.push(d), x(d, a);
  }
  lh.prototype.Za = function(a, b) {
    if (10 == a || 11 == a || 4 == a) {
      this.v.R = [];
      for (
        var c = {}, d = k(this.R), e = d.next();
        !e.done;
        c = { kc: c.kc, target: c.target, action: c.action, Dc: c.Dc },
          e = d.next()
      )
        (c.kc = e.value),
          (c.target = 0.04 + 0.04 * Math.random()),
          (c.Dc = 4 == a ? 7 + Math.floor(5 * Math.random()) : 12),
          (c.action = new ab(
            4 == a ? Math.max(2e3, 500 * b) : 5e3,
            (function(a) {
              return function() {
                var b = a.action;
                S(
                  a.kc,
                  0,
                  -0.5 +
                    a.target * Math.sin(La(b.v / b.T, 0, 1) * a.Dc * Math.PI)
                );
              };
            })(c),
            (function(a) {
              return function() {
                return S(a.kc, 0, -0.5);
              };
            })(c)
          )),
          G(this.v, c.action);
    }
  };
  function nh(a, b, c) {
    R.call(this, cd, a, void 0 === b ? 0 : b, void 0 === c ? 0 : c);
    this.$ = new R(dd, 0, this.Ba().height);
    S(this.$, 0, -0.48);
    T(this.$);
    this.$.ka = -1;
    x(this.$, this);
    this.v = 0;
    this.V = new Pf(0.1, 0.73);
    this.V.W = q(oh[this.v]);
    x(this.V, this);
    this.R = new C();
    x(this.R, this);
    this.ta = new R(Dd, -0.05, 0, 0);
    A(this.ta, 1.5);
    T(this.ta);
    this.ta.ka = 1;
    this.wa = new R(Dd, 0.07);
    A(this.wa, 1.5);
    T(this.wa);
    this.wa.ka = 1;
    this.Ja = new R(ge, 0.1, 0.4);
    T(this.Ja);
    A(this.Ja, 1.5);
    this.Ja.ka = -1;
    this.Bb = !0;
  }
  h(nh, R);
  function ph(a, b) {
    if (6 == a.v && 6 != b) qh(a), (a.v = b);
    else {
      a.v = b;
      if (5 == a.v || 3 == a.v || 4 == a.v)
        S(a, 0, -0.35), z(a.$), (a.V.v.H = !1), z(a.V), x(a.ta, a), x(a.wa, a);
      if (3 == a.v || 4 == a.v) {
        var c = 0;
        G(
          a.R,
          new ab(1e3, function(b) {
            c += b / 25;
            S(a, 0, -0.35 + Math.sin(c) / 22);
            S(a.ta, 0, -0.5 - Math.round(Math.sin(c / 2) / 2 + 0.5) / 3);
            S(
              a.wa,
              0,
              -0.5 - Math.round(Math.cos(c / 2 + Math.PI / 2) / 2 + 0.5) / 3
            );
          })
        );
      }
      3 == a.v
        ? (W().Pc(),
          je(a, ed),
          D(a.R, new J(a, 1e3, nc)),
          E(a.R, 0, function() {
            return ph(a, 5);
          }))
        : 4 == a.v
        ? (je(a, fd), D(a.R, new J(a, 1e3, mc)))
        : 5 == a.v
        ? (je(a, fd), S(a.ta, 0, -0.5), S(a.wa, 0, -0.5))
        : 6 == a.v
        ? rh(a)
        : (je(a, cd), S(a, 0, -0.5), x(a.$, a), x(a.V, a), z(a.ta), z(a.wa));
      G(
        a.R,
        new I(100, r(a.V.W), oh[b], n, function(b) {
          a.V.W = q(b);
        })
      );
    }
  }
  function sh(a, b, c) {
    3 != a.v &&
      4 != a.v &&
      5 != a.v &&
      6 != a.v &&
      2 != b.getState() &&
      a.Bb &&
      (0 == a.v && ph(a, 1),
      ph(a, 2),
      c && W().Qc(),
      Rf(a.V),
      (a.Bb = !1),
      F(a.R, 200, function() {
        return (a.Bb = !0);
      }),
      (c = B(b).z - B(a).z),
      3 >= Math.abs(c) && 1 == b.getState()
        ? (Ef(b, c / 3),
          E(a.R, 200, function() {
            2 == a.v && ph(a, 0);
          }))
        : 3 < c && 4 > c && 1 == b.getState()
        ? E(a.R, 100, function() {
            return Ef(b, 1);
          })
        : E(a.R, 200, function() {
            return ph(a, 1);
          }));
  }
  function th(a, b) {
    b = void 0 === b ? qa : b;
    a.R.v = [];
    ph(a, 5 == a.v ? 4 : 3);
    E(a.R, 0, b);
  }
  function rh(a) {
    je(a, gd);
    S(a, 0.05, -0.5);
    ke(a, 1.2, 1.2);
    z(a.$);
    D(
      a.R,
      new I(100, 1.2, 1, n, function(b) {
        ke(a, 1.2, b);
      })
    );
    D(
      a.R,
      new I(100, 1, 1.5, n, function(b) {
        ke(a, b, b);
      })
    );
    E(a.R, 0, function() {
      je(a, xd);
      x(a.Ja, a);
      ke(a, 1.5, 1.5);
      S(a, 0.05, -0.5);
    });
  }
  function qh(a) {
    je(a, gd);
    z(a.Ja);
    S(a, 0.05, -0.5);
    ke(a, 1.2, 1.4);
    D(
      a.R,
      new I(100, 1.4, 1, n, function(b) {
        ke(a, 1.2, b);
      })
    );
    D(
      a.R,
      new I(100, 1, 1.2, n, function(b) {
        ke(a, 1.2, b);
      })
    );
    E(a.R, 0, function() {
      S(a, 0, -0.5);
      a.V.Da(0.1, 0.73);
      ke(a, 1, 1);
      je(a, cd);
      x(a.$, a);
    });
  }
  var uh = {},
    oh = ((uh[0] = 33),
    (uh[1] = 200),
    (uh[2] = -140),
    (uh[3] = 33),
    (uh[4] = 33),
    (uh[5] = 33),
    (uh[6] = 33),
    uh);
  function vh(a, b, c) {
    R.call(
      this,
      [
        Ld,
        Ld,
        Md,
        Nd,
        Od,
        Pd,
        Qd,
        Rd,
        Sd,
        Td,
        Ud,
        Vd,
        Wd,
        Xd,
        Yd,
        Zd,
        $d,
        ae,
        be,
        ce,
        de,
        ee,
        fe
      ],
      void 0 === a ? 0 : a,
      void 0 === b ? 0 : b,
      void 0 === c ? 0 : c
    );
    S(this, 0, -0.35);
    ke(this, 1.2, 1);
    A(this.Ib, 0.8);
  }
  h(vh, R);
  function wh(a, b) {
    window.google &&
      google.doodle &&
      (b && (google.doodle.cpDestroy = b),
      (google.doodle.cpInit = function() {
        b && b();
        a();
      }));
  }
  function xh(a, b, c) {
    if (window.google) {
      var d = function() {
          var a = google.msg && google.msg.unlisten;
          a && (a(106, d), c && a(94, c));
          b();
          return !0;
        },
        e = function() {
          var a = document.getElementById("hplogo");
          a &&
            "hidden" != a.style.visibility &&
            ((a = google.msg && google.msg.listen),
            google.psy && google.psy.q && a && (a(106, d), c && a(94, c)));
        };
      e();
      (google.doodle && google.doodle.jesr) ||
        (xa(),
        google.raas &&
          google.raas("doodle", {
            init: function() {
              e();
              google.doodle.jesrd && (a(), (google.doodle.jesrd = !1));
            },
            dispose: function() {
              d();
              google.doodle.jesrd = !0;
            }
          }));
    }
  }
  var Hc = P.qa(),
    yh = Sc.qa();
  function zh(a, b) {
    V.call(this);
    var c = this;
    this.V = b.getContext("2d");
    this.Bb = !1;
    this.La = new Zf(
      6e4,
      function() {
        var a = Ah;
        a && a.va && ((a.va = !1), (a.ta = !0));
        W().xc();
      },
      function() {
        Bh();
      }
    );
    Qe(this, this.La);
    this.Kb = function() {
      fg(c.La);
    };
    window.addEventListener("orientationchange", this.Kb, !1);
    this.Jb = new yg(b);
    this.Hb = new ig(b);
    this.rb = new lg(a);
    this.tb = wa();
    this.ta = this.va = !1;
    this.S = 2;
    this.$ = 1;
    this.Ja = 0;
    this.Ca = this.Lb = !1;
    this.H = new xc(b);
    this.H.Da(Sa(fc, new v(-12, 12, -12)));
    zc(this.H, 15.55);
    Ac(this.H, 15);
    a = Hc.H;
    x(this.H, a);
    this.ma = new w();
    this.ub = new vh(gc);
    x(this.ub, this.ma);
    Wa(this.ma, new vh(hc));
    this.T = new nh(mc.H());
    x(this.T, this.ma);
    this.Fa = new nh(nc.H());
    ph(this.Fa, 5);
    x(this.Fa, this.ma);
    this.ka = new Bf();
    x(this.ka, this.ma);
    this.ra = new Sf(this.ka, new v(1, 0, H.z + 10.06));
    x(this.ra, this.ma);
    this.ka.Da(Tf(this.ra));
    Wa(this.ma, new vg(this.ka, this.ra));
    this.R = new C();
    x(this.R, a);
    this.Ga = new Rg(new v(0, 19, H.z + 62 + 20));
    A(this.Ga, 1.4);
    this.W = new Zg(b, this.Ga, this.Jb);
    x(this.W, this.ma);
    this.Gb = new hg(this.La, b);
    this.Gb.H = ch(this.W);
    Qe(this, this.Gb);
    this.hc = new eh(
      this.La,
      [32],
      function(a) {
        32 == a.which &&
          ((a = c.W),
          0 == a.W || 2 == a.W ? Xf(a.T, !0) : 1 == a.W && Xf(a.U, !0));
      },
      function(a) {
        32 == a.which &&
          ((a = c.W),
          0 == a.W || 2 == a.W ? Xf(a.T, !1) : 1 == a.W && Xf(a.U, !1));
      }
    );
    Qe(this, this.hc);
    this.ha = new ih(new v(0, 0, H.z + 62 - 13));
    this.ha.H = !1;
    x(this.ha, this.ma);
    this.Va = new w();
    this.Va.ya = function(a) {
      var b = Math.asin(B(c.ka).x / Pa(B(c.H), B(c.ka)));
      Ac(
        c.H,
        r(c.H.R) + (a / 500) * (r(La(b, -Math.PI / 5, Math.PI / 5)) - r(c.H.R))
      );
    };
    this.Ua = new w();
    this.Ua.ya = function(a) {
      var b = -B(c.ka).x / 6;
      c.H.Da(c.H.S.x + (a / 500) * (b - c.H.S.x));
    };
    Fc(N.qa(), this);
    Fc(N.qa(), gh.qa());
    this.dc = new ng();
    if (Pb()) hh(4), Ch(this);
    else if ((Ng(), Ag.Pa)) {
      this.S = 4;
      this.v = new R(Fd, 0.3 * b.width, 0.5 * b.height);
      S(this.v, 0, 0);
      T(this.v);
      this.v.Sb(!0);
      var d = function() {
        return Math.min(0.4 * b.height, 0.2 * b.width);
      };
      le(this.v, d(), d());
      A(this.v, 0.75);
      var e = Dh(this);
      this.v.ya = function(a) {
        le(c.v, d(), d());
        c.v.Da(
          0.5 * b.width - 1.2 * c.v.Ba().width,
          0.5 * b.height + 0.5 * c.v.Ba().height
        );
        e(a);
      };
      this.Ia = new K();
      this.Ia.Ea = function(a) {
        return a.clearRect(0, 0, b.width, b.height);
      };
      x(this.Ia, a);
      x(this.v, a);
    } else hh(5), (this.S = 4);
  }
  h(zh, V);
  function Ch(a) {
    Qe(a, W());
    a.v && z(a.v);
    a.Ia && z(a.Ia);
    Ng();
    Ag.Qa && mg(a.rb);
    document.getElementById("hplogo").title = "";
    Wa(Hc.v, new me(a.V));
    Wa(Hc.S, new Mf(new v(0, 0, H.z + 62 + 40)));
    Wa(Hc.S, new lh(H));
    x(a.Ga, Hc.S);
    x(a.ma, Hc.H);
    a.S = 2;
    D(a.R, [
      new J(a.H, 2e3, fc, { Ha: vc }),
      new I(
        2e3,
        r(a.H.R),
        0,
        n,
        function(b) {
          return Ac(a.H, b);
        },
        { Ha: vc }
      )
    ]);
    E(a.R, 100, function() {
      a.S = 0;
      dh(a.W, 2);
    });
  }
  function Eh(a, b) {
    a.$ = 1;
    z(a.Ua);
    z(a.Va);
    a.ub.Ia = !0;
    b
      ? (E(a.R, 600, function() {
          ph(a.T, 0);
          dh(a.W, 1);
          yc(a.H, 2);
        }),
        E(a.R, 1700, function() {
          a.S = 3;
          a.ha.H = !0;
          jh(a.ha);
        }),
        (a.S = 2))
      : ((a.ha.H = !0), jh(a.ha), (a.S = 3), dh(a.W, 1), a.Lb && ph(a.T, 6));
  }
  function Fh(a) {
    a.S = 2;
    ph(a.T, 0);
    a.Ga.reset();
    a.ub.reset();
    dh(a.W, 0);
    kh(a.ha);
    yc(a.H, 0);
    E(a.R, 1700, function() {
      a.$ = 0.9;
      a.S = 1;
      Uf(a.ra);
      ph(a.T, 1);
    });
  }
  function Gh(a) {
    a.Ja++;
    th(a.Fa);
    th(a.T, function() {
      2 == a.ka.getState() ? Gh(a) : ph(a.T, 0);
    });
    var b = a.T;
    a.T = a.Fa;
    a.Fa = b;
  }
  zh.prototype.Za = function(a, b) {
    var c = this;
    if (1 == a)
      62 < Pa(b, H)
        ? yc(this.H, 1)
        : (E(this.R, 100, function() {
            return Gh(c);
          }),
          x(this.Ua, this.H)),
        x(this.Va, this.H);
    else if (2 == a) Eh(this, 0 < this.Ga.v);
    else if (3 == a)
      E(this.R, 200, function() {
        yc(c.H, 0);
        E(c.T.R, 0, function() {
          ph(c.T, 1);
          Uf(c.ra);
        });
      });
    else if (4 == a)
      (this.$ = Math.min(this.$ + 0.01 * b, 2)),
        (this.Ja = 0),
        (this.Lb = !0),
        z(this.Ua),
        z(this.Va),
        F(this.R, 200, function() {
          yc(c.H, 0);
        }),
        6 == b && E(this.R, 4e3);
    else if (7 == a)
      (1 != this.S && 0 != this.S) || sh(this.T, this.ka, this.Ca);
    else if (8 == a)
      b && 0 == this.S
        ? (this.Ca || ((this.Ca = !0), W().Ac()),
          dh(this.W, 0),
          E(this.R, 1e3, function() {
            dh(c.W, 0);
            c.S = 1;
            O(N.qa(), 12);
            ph(c.T, 1);
            c.$ = 0.9;
            Uf(c.ra);
          }))
        : 4 == this.S &&
          (O(N.qa(), 19), this.Ca || ((this.Ca = !0), W().Ac()), Ch(this));
    else if (5 == a) Fh(this);
    else if (10 == a || 11 == a) {
      a = 11 == a ? 5 : 3;
      for (b = 0; b < a; b++)
        E(this.R, 0, function() {
          var a = new xg();
          x(a, Hc.v);
        }),
          E(this.R, 1e3);
      E(this.R, 3e3);
    } else
      9 == a
        ? (O(N.qa(), 4, this.Ja), (this.Ja = 0))
        : 16 == a
        ? (30 > b && kg(this.Hb),
          21 > b && (Ve && Ve.uc(), (Ve = null), (ff = !1)))
        : 18 == a
        ? ((this.Bb = !1), W().xc(!0))
        : 17 == a && ((this.Bb = !0), W().zc(!0));
  };
  function Bh() {
    var a = Ah;
    if (a) {
      a.tb = wa();
      var b = !a.ta && !a.va;
      a.ta = !1;
      a.va = !0;
      b && a.Ib();
      a.Bb && W().zc();
    }
  }
  function Dh(a) {
    var b = Og("doodle-cricket17-cta", Hh());
    Qg("doodle-cricket17-cta", b);
    hh(b);
    var c = 0,
      d = a.v.tb;
    return 0 == b || 3 == b
      ? function(b) {
          A(a.v, d + Math.abs(Math.sin(c) / 5));
          c += b / 500;
        }
      : 1 == b
      ? function(b) {
          A(a.v, d + Math.abs(Math.sin(c) / 3));
          c += b / 250;
        }
      : function() {};
  }
  function Hh() {
    var a = Math.random();
    return 0.01 > a ? 2 : 0.02 > a ? 1 : 0.03 > a ? 3 : 0;
  }
  zh.prototype.Ib = function() {
    if (this.ta) this.ta = !1;
    else {
      Yb(this.Ib, bc, this);
      var a = wa(),
        b = Math.min(a - this.tb, 50) * this.$,
        c = this.dc,
        d = b / this.$;
      c.v++;
      c.H += d;
      1e4 <= c.H &&
        ((d = c.H / c.v / 1e3), O(N.qa(), 16, 1 / d), (c.v = 0), (c.H = 0));
      if (!(4 == this.S && 33 > b)) {
        this.tb = a;
        ec.width = this.V.canvas.width;
        ec.height = this.V.canvas.height;
        a = this.rb;
        0 < a.S &&
          ((a.H += (a.S * b) / 1e3),
          1 < a.H &&
            ((a.H = 1),
            (a.S = 0),
            (c = document.getElementById("searchform"))) &&
            (a.v.style.zIndex = parseInt(getComputedStyle(c).zIndex, 10) + 1),
          (c = a.R + a.H * (a.U - a.R)),
          (d =
            Math.max(0, c - 230) +
            (document.querySelector("div.og-pdp") ? 36 : 12)),
          Qb(a.v, "width", a.T + a.H * (a.ma - a.T) + "px", "height", c + "px"),
          Zb(d));
        Ib &&
          ((this.Jb.v.style.maxHeight = window.innerHeight + "px"),
          window.scrollTo(0, 0));
        a = this.Hb;
        (a.H.clientWidth == a.R && a.H.clientHeight == a.S) || jg(a);
        this.V.save();
        this.V.clearRect(0, 0, this.V.canvas.width, this.V.canvas.height);
        a = this.V;
        c = this.H;
        Gc(b);
        Ic(c);
        b = k(Hc.R);
        for (c = b.next(); !c.done; c = b.next())
          (c = c.value),
            (d = a),
            c.T &&
              ((d.globalAlpha = c.U),
              d.setTransform(c.T.Ma, c.T.lb, c.T.mb, c.T.Oa, c.T.Xa, c.T.Ya),
              c.Ea(d));
        this.V.restore();
      }
    }
  };
  zh.prototype.U = function() {
    this.va && ((this.ta = !0), (this.va = !1));
    window.removeEventListener("orientationchange", this.Kb, !1);
    this.rb.reset();
    P.qa().reset();
    N.qa().H = [];
    gh.qa().reset();
    Ve && Ve.uc();
    Ve = null;
    V.prototype.U.call(this);
  };
  var Ah = null;
  (function(a, b, c) {
    function d() {
      xh(e, b, c);
      wh(e, b);
      e();
    }
    function e() {
      a();
      window.lol && window.lol();
    }
    window.google && google.x ? google.x({ id: "DOODLE" }, d) : d();
  })(
    function() {
      Dg.Na = !1;
      Eg.Na = !1;
      Hg.Na = !1;
      var a = document.getElementById("hplogo"),
        b = a ? a.querySelector("canvas") : null;
      b &&
        ((b.width = Pb() ? 720 : 1280),
        (b.height = Pb() ? 1280 : 720),
        Ug(0),
        yh.Bc(0, function() {
          Ug(1);
          a && b && ((Ah = new zh(a, b)), Bh());
        }));
    },
    function() {
      for (var a = k(yh.v), b = a.next(); !b.done; b = a.next())
        b.value.Cc = [];
      Re(Ah);
    }
  );
}.call(this));
