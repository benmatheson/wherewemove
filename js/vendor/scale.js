!(function(r, n) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = n())
		: "function" == typeof define && define.amd
			? define("d3scaleCluster", [], n)
			: "object" == typeof exports
				? (exports.d3scaleCluster = n())
				: (r.d3scaleCluster = n());
})("undefined" != typeof self ? self : this, function() {
	return (function(r) {
		function n(t) {
			if (e[t]) return e[t].exports;
			var o = (e[t] = { i: t, l: !1, exports: {} });
			return r[t].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
		}
		var e = {};
		return (
			(n.m = r),
			(n.c = e),
			(n.d = function(r, e, t) {
				n.o(r, e) ||
					Object.defineProperty(r, e, {
						configurable: !1,
						enumerable: !0,
						get: t
					});
			}),
			(n.n = function(r) {
				var e =
					r && r.__esModule
						? function() {
								return r.default;
						  }
						: function() {
								return r;
						  };
				return n.d(e, "a", e), e;
			}),
			(n.o = function(r, n) {
				return Object.prototype.hasOwnProperty.call(r, n);
			}),
			(n.p = ""),
			n((n.s = 0))
		);
	})([
		function(r, n, e) {
			function t() {
				function r() {
					if (!(a.length <= 2)) {
						var r = o(e, Math.min(e.length, a.length));
						(n = 0 !== r.length), (u = []);
						for (var t = 0; t < r.length; t++) u.push(r[t]);
					}
				}
				var n = !1,
					e = [],
					a = [],
					u = [],
					f = function(r) {
						if (n) {
							for (var e = u.length - 1; e >= 0; e--)
								if (r >= u[e]) return a[e];
							return a[0];
						}
					};
				return (
					(f.domain = function() {
						return arguments.length
							? ((e = arguments[0]), r(), f)
							: e;
					}),
					(f.range = function() {
						if (arguments.length) {
							var n = arguments[0],
								e = n.length !== a.length;
							return (a = n), e && r(), f;
						}
						return a;
					}),
					(f.invertExtent = function(r) {
						for (var n = NaN, e = NaN, t = 0; t < a.length; t++)
							if (a[t] === r) {
								(n = u[t]),
									(e = t + 1 < a.length ? u[t + 1] : NaN);
								break;
							}
						return [n, e];
					}),
					(f.clusters = function() {
						return u.slice(1);
					}),
					(f.export = function() {
						return {
							isReady: n,
							domain: e,
							range: a,
							breakpoints: u
						};
					}),
					(f.import = function(r) {
						if (!r) throw new Error("Import requires parameters");
						return (
							(n = r.isReady),
							(e = r.domain),
							(a = r.range),
							(u = r.breakpoints),
							f
						);
					}),
					(f.copy = function() {
						return t()
							.domain(e)
							.range(a);
					}),
					f
				);
			}
			var o = e(1);
			"object" == typeof d3 && (d3.scaleCluster = t), (r.exports = t);
		},
		function(r, n, e) {
			var t = e(2);
			r.exports = t;
		},
		function(r, n) {
			function e(r) {
				return r.slice().sort(function(r, n) {
					return r - n;
				});
			}
			function t(r) {
				for (var n, e = 0, t = 0; t < r.length; t++)
					(0 !== t && r[t] === n) || ((n = r[t]), e++);
				return e;
			}
			function o(r, n) {
				for (var e = [], t = 0; t < r; t++) {
					for (var o = [], a = 0; a < n; a++) o.push(0);
					e.push(o);
				}
				return e;
			}
			function a(r, n, e, t) {
				var o;
				if (r > 0) {
					var a = (e[n] - e[r - 1]) / (n - r + 1);
					o = t[n] - t[r - 1] - (n - r + 1) * a * a;
				} else o = t[n] - (e[n] * e[n]) / (n + 1);
				return o < 0 ? 0 : o;
			}
			function u(r, n, e, t, o, f, i) {
				if (!(r > n)) {
					var l = Math.floor((r + n) / 2);
					(t[e][l] = t[e - 1][l - 1]), (o[e][l] = l);
					var c = e;
					r > e && (c = Math.max(c, o[e][r - 1] || 0)),
						(c = Math.max(c, o[e - 1][l] || 0));
					var s = l - 1;
					n < t.length - 1 && (s = Math.min(s, o[e][n + 1] || 0));
					for (
						var h, p, g, v, d = s;
						d >= c &&
						!((h = a(d, l, f, i)) + t[e - 1][c - 1] >= t[e][l]);
						--d
					)
						(p = a(c, l, f, i)),
							(g = p + t[e - 1][c - 1]),
							g < t[e][l] && ((t[e][l] = g), (o[e][l] = c)),
							c++,
							(v = h + t[e - 1][d - 1]) < t[e][l] &&
								((t[e][l] = v), (o[e][l] = d));
					u(r, l - 1, e, t, o, f, i), u(l + 1, n, e, t, o, f, i);
				}
			}
			function f(r, n, e) {
				for (
					var t = n[0].length,
						o = new Array(t),
						f = new Array(t),
						i = r[Math.floor(t / 2)],
						l = 0;
					l < t;
					++l
				)
					0 === l
						? ((o[0] = r[0] - i), (f[0] = (r[0] - i) * (r[0] - i)))
						: ((o[l] = o[l - 1] + r[l] - i),
						  (f[l] = f[l - 1] + (r[l] - i) * (r[l] - i))),
						(n[0][l] = a(0, l, o, f)),
						(e[0][l] = 0);
				for (var c, s = 1; s < n.length; ++s)
					(c = s < n.length - 1 ? s : t - 1),
						u(c, t - 1, s, n, e, o, f);
			}
			function i(r, n) {
				if (n > r.length)
					throw new Error(
						"Cannot generate more classes than there are data values"
					);
				var a = r.length,
					u = e(r),
					i = t(u);
				if (1 === i) return [u];
				n = Math.min(i, n);
				var l = o(n, a),
					c = o(n, a);
				f(u, l, c);
				for (
					var s = [], h = c[0].length - 1, p = c.length - 1;
					p >= 0;
					p--
				) {
					var g = c[p][h];
					(s[p] = u[g]), p > 0 && (h = g - 1);
				}
				return s;
			}
			r.exports = i;
		}
	]);
});
