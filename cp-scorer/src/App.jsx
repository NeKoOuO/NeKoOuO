import { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#f472b6","#a78bfa","#34d399","#fbbf24","#f87171","#38bdf8","#fb923c","#c084fc","#4ade80","#f43f5e","#22d3ee","#e879f9","#a3e635","#facc15","#2dd4bf","#818cf8","#fb7185","#6ee7b7","#fcd34d","#93c5fd"];
const GRADES = ["S","A+","A","B+","B"];
const LOOKS_LIST = ["S","A+","A"];
const LOOKS_SCORE = { S: 25, "A+": 15, A: 6 };

const EMPTY = {
  id: "", name: "", tag: "", stats: "", grade: "A+", looks: "A+", link: "",
  shortMin: 30, shortPrice: 2800, longMin: 50, longPrice: 3300,
  specialMin: "", specialPrice: "",
  servicesText: "",
  extraShotType: "none", extraShotPrice: "",
  deals: []
};

const SEED = [
  {
    id: "s1", name: "奶酥", tag: "馬來 · 新北蘆洲", stats: "155/48/F", grade: "S", looks: "S",
    link: "https://278.tw/profile.html?girl_id=MY017487",
    shortMin: 30, shortPrice: 2800, longMin: 50, longPrice: 3300, specialMin: 90, specialPrice: 4500,
    servicesText: "乳交,輕按摩,69,共浴,殘廢澡,LG,親嘴,無套BJ,舔蛋,深喉嚨",
    extraShotType: "NS", extraShotPrice: 500,
    deals: [
      { name: "90分NS", price: 4500, minutes: 90, hasNS: true },
      { name: "買2送1(150分NS)", price: 6600, minutes: 150, hasNS: true },
      { name: "買3送1(NS)", price: 9900, minutes: 200, hasNS: true },
      { name: "包夜買5送3(8H)", price: 16500, minutes: 480, hasNS: false },
    ]
  },
  {
    id: "s2", name: "麗塔", tag: "泰妹24歲 · 桃園", stats: "167/45/D", grade: "S", looks: "S",
    link: "https://278.tw/profile.html?girl_id=TH075037",
    shortMin: 40, shortPrice: 2800, longMin: 60, longPrice: 3300, specialMin: 90, specialPrice: 4400,
    servicesText: "乳交,69,殘廢澡,LG,親嘴,無套BJ,品鮑,舔蛋,奶推",
    extraShotType: "none", extraShotPrice: "",
    deals: [{ name: "90分2S", price: 4400, minutes: 90, hasNS: false }]
  },
  {
    id: "s3", name: "蛋捲", tag: "越南20歲 · 新竹", stats: "161/42/E", grade: "S", looks: "S",
    link: "https://278.tw/profile.html?girl_id=VN039309",
    shortMin: 30, shortPrice: 3200, longMin: 50, longPrice: 3600, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,帝王浴,親嘴,無套BJ,品鮑,舔蛋,奶推,屁推,冰火,浴中蕭,深喉嚨",
    extraShotType: "2S", extraShotPrice: 1000,
    deals: [
      { name: "2節3S", price: 6400, minutes: 60, hasNS: false },
      { name: "買3送1", price: 10800, minutes: 200, hasNS: false },
      { name: "包夜買5送3(5S)", price: 18000, minutes: 480, hasNS: false },
    ]
  },
  {
    id: "s4", name: "梅子", tag: "馬來妹 · 基隆市區", stats: "155/38/D", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=MY053781",
    shortMin: 40, shortPrice: 2700, longMin: 60, longPrice: 3000, specialMin: "", specialPrice: "",
    servicesText: "69,共浴,LG,親嘴,無套BJ,品鮑",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2+1(短鐘)", price: 5400, minutes: 120, hasNS: false },
    ]
  },
  {
    id: "s5", name: "申娜", tag: "泰妹 · 台北西門", stats: "158/43/E", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=TH001085",
    shortMin: 30, shortPrice: 3500, longMin: 50, longPrice: 4000, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,共浴,LG,親嘴,無套BJ,奶推,屁推",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2送1(150分3S)", price: 8000, minutes: 150, hasNS: false },
      { name: "買3送1", price: 12000, minutes: 200, hasNS: false },
      { name: "買5送3(5S)", price: 20000, minutes: 400, hasNS: false },
    ]
  },
  {
    id: "s6", name: "優咪", tag: "泰妹 · 台北西門", stats: "154/45/F", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=TH008543",
    shortMin: 30, shortPrice: 3200, longMin: 50, longPrice: 3700, specialMin: 90, specialPrice: 4900,
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,舔蛋,奶推,屁推,艷舞秀",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "90分2S(限2)", price: 4900, minutes: 90, hasNS: false },
      { name: "買2送1", price: 7400, minutes: 150, hasNS: false },
      { name: "買3送1", price: 11100, minutes: 200, hasNS: false },
    ]
  },
  {
    id: "s7", name: "翁蔓蔓", tag: "泰妹 · 台北中山", stats: "166/46/C", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=TH001852",
    shortMin: 30, shortPrice: 3500, longMin: 50, longPrice: 4000, specialMin: 90, specialPrice: 6000,
    servicesText: "輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,舔蛋,奶推,屁推",
    extraShotType: "2S", extraShotPrice: 1000,
    deals: [
      { name: "2節3S", price: 8000, minutes: 100, hasNS: false },
      { name: "90分2S", price: 6000, minutes: 90, hasNS: false },
      { name: "買3送1", price: 12000, minutes: 200, hasNS: false },
    ]
  },
  {
    id: "s8", name: "瀅嘉", tag: "越南妹 · 台中", stats: "163/43/D", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN048849",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3400, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,舔蛋",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2送1(100分3S)", price: 6800, minutes: 100, hasNS: false },
      { name: "買3送1(200分3S)", price: 10200, minutes: 200, hasNS: false },
      { name: "買5送3包夜", price: 17000, minutes: 480, hasNS: false },
    ]
  },
  {
    id: "s9", name: "白鹿", tag: "越南妹 · 台中", stats: "155/43/F", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN081567",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3300, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,舔蛋",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "2節3S", price: 6600, minutes: 100, hasNS: false },
      { name: "買3送1", price: 9900, minutes: 200, hasNS: false },
      { name: "買5送3(5S)", price: 16500, minutes: 400, hasNS: false },
    ]
  },
  {
    id: "s10", name: "萌泡泡", tag: "越南妹 · 台中", stats: "161/42/D", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN053307",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3400, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,親嘴,無套BJ,品鮑,舔蛋,艷舞秀",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2送1(100分3S)", price: 6800, minutes: 100, hasNS: false },
      { name: "買3送1(200分3S)", price: 10200, minutes: 200, hasNS: false },
      { name: "買5送3包夜", price: 17000, minutes: 480, hasNS: false },
    ]
  },
  {
    id: "s11", name: "甜小薇", tag: "越南妹 · 台中", stats: "156/45/D", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN077613",
    shortMin: 30, shortPrice: 3200, longMin: 50, longPrice: 3400, specialMin: 90, specialPrice: 6300,
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,舔蛋",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "90分NS", price: 6300, minutes: 90, hasNS: true },
      { name: "2節3S", price: 6800, minutes: 100, hasNS: false },
      { name: "買3送1", price: 10200, minutes: 200, hasNS: false },
      { name: "包夜買5送3(8H5S)", price: 17000, minutes: 480, hasNS: false },
    ]
  },
  {
    id: "s12", name: "杜雅", tag: "越南妹 · 台中", stats: "161/43/F", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN076107",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3400, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,殘廢澡,LG,親嘴,無套BJ,品鮑,舔蛋",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2送1(100分3S)", price: 6800, minutes: 100, hasNS: false },
      { name: "買3送1(200分3S)", price: 10200, minutes: 200, hasNS: false },
      { name: "買5送3(400分5S)", price: 17000, minutes: 400, hasNS: false },
    ]
  },
  {
    id: "s13", name: "傾妤", tag: "越南妹 · 台中", stats: "163/42/D", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN080395",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3400, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,舔蛋",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2送1(100分3S)", price: 6800, minutes: 100, hasNS: false },
      { name: "買3送1(200分3S)", price: 10200, minutes: 200, hasNS: false },
      { name: "買5送3包夜", price: 17000, minutes: 480, hasNS: false },
    ]
  },
  {
    id: "s14", name: "柳芸芸", tag: "越南妹 · 台中", stats: "163/43/E", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN037447",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3300, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,舔蛋,艷舞秀",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "2節3S", price: 6600, minutes: 100, hasNS: false },
      { name: "買3送1", price: 9900, minutes: 200, hasNS: false },
      { name: "買5送3(5S)", price: 16500, minutes: 400, hasNS: false },
    ]
  },
  {
    id: "s15", name: "棉花糖", tag: "越南妹 · 台中", stats: "159/43/F", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=VN025475",
    shortMin: 30, shortPrice: 3000, longMin: 50, longPrice: 3400, specialMin: "", specialPrice: "",
    servicesText: "乳交,輕按摩,69,共浴,親嘴,無套BJ,品鮑,舔蛋",
    extraShotType: "2S", extraShotPrice: 500,
    deals: [
      { name: "買2送1(100分3S)", price: 6800, minutes: 100, hasNS: false },
      { name: "買3送1(200分3S)", price: 10200, minutes: 200, hasNS: false },
    ]
  },
  {
    id: "s16", name: "菲菲", tag: "馬來妹 · 台中", stats: "167/45/E", grade: "A+", looks: "A+",
    link: "https://278.tw/profile.html?girl_id=MY057400",
    shortMin: 30, shortPrice: 2500, longMin: 50, longPrice: 3000, specialMin: 90, specialPrice: 4500,
    servicesText: "乳交,輕按摩,69,共浴,LG,親嘴,無套BJ,品鮑,奶推,屁推",
    extraShotType: "none", extraShotPrice: "",
    deals: [
      { name: "買2送1(100分NS)", price: 6000, minutes: 100, hasNS: true },
      { name: "買3送1(200分NS)", price: 9000, minutes: 200, hasNS: true },
      { name: "買5送3(400分NS)", price: 15000, minutes: 400, hasNS: true },
    ]
  }
];

const SKEY = "cp-scorer-v7";

function load() {
  try { const r = localStorage.getItem(SKEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function persist(d) {
  try { localStorage.setItem(SKEY, JSON.stringify(d)); } catch (e) { console.error(e); }
}
function parse(t) { return t.split(/[,，\n]/).map(s => s.trim()).filter(Boolean); }
function rd(v) { return Math.round(v * 10) / 10; }

function calcScores(entries) {
  if (!entries.length) return [];
  const p = entries.map(e => {
    const svc = parse(e.servicesText);
    const ppm = e.longPrice / e.longMin;
    return { ...e, svc, ppm };
  });
  const bestPPM = Math.min(...p.map(x => x.ppm));
  const maxSvc = Math.max(...p.map(x => x.svc.length), 1);

  return p.map((x, i) => {
    const a = (bestPPM / x.ppm) * 25;
    const b = (x.svc.length / maxSvc) * 10;

    const valid = x.deals.filter(d => !d.name.includes("包夜"));
    let bestDisc = 0, hasNSD = false;
    valid.forEach(d => {
      const norm = d.minutes * x.ppm;
      if (norm > 0) { const disc = ((norm - d.price) / norm) * 100; if (disc > bestDisc) bestDisc = disc; }
      if (d.hasNS) hasNSD = true;
    });
    const cDisc = Math.min((bestDisc / 100) * 25, 9);
    const cNS = hasNSD ? 6 : 0;
    const c = cDisc + cNS;

    let d = 0, dL = "無";
    const ep = Number(x.extraShotPrice);
    if (x.extraShotType === "NS") { d = 25; dL = "NS → 25"; }
    else if (x.extraShotType === "2S" && ep <= 500) { d = 10; dL = `2S@${ep} → 10`; }
    else if (x.extraShotType === "2S" && ep <= 1000) { d = 5; dL = `2S@${ep} → 5`; }
    else if (x.extraShotType === "2S") { d = 2; dL = `2S@${ep} → 2`; }

    const e2 = LOOKS_SCORE[x.looks] || 6;
    const total = a + b + c + d + e2;

    return { ...x, color: COLORS[i % COLORS.length], a: rd(a), b: rd(b), bestDisc: rd(bestDisc), cDisc: rd(cDisc), cNS, c: rd(c), d: rd(d), dL, e: e2, total: rd(total) };
  });
}

function DealForm({ deals, onChange }) {
  const [n, setN] = useState({ name: "", price: "", minutes: "", hasNS: false });
  const add = () => {
    if (!n.name || !n.price || !n.minutes) return;
    onChange([...deals, { name: n.name, price: Number(n.price), minutes: Number(n.minutes), hasNS: n.hasNS }]);
    setN({ name: "", price: "", minutes: "", hasNS: false });
  };
  const I = { background: "#111118", border: "1px solid #2a2a3a", borderRadius: 6, color: "#ddd", padding: "6px 8px", fontSize: 12, width: "100%", boxSizing: "border-box" };
  return (
    <div>
      {deals.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontSize: 11, color: "#999" }}>
          <span style={{ flex: 1 }}>{d.name} · ${d.price} · {d.minutes}分{d.hasNS ? " · NS" : ""}</span>
          <button onClick={() => onChange(deals.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#f43f5e", fontSize: 14, cursor: "pointer", padding: 2 }}>✕</button>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
        <input placeholder="方案名" value={n.name} onChange={e => setN({ ...n, name: e.target.value })} style={I} />
        <input placeholder="價格" type="number" value={n.price} onChange={e => setN({ ...n, price: e.target.value })} style={I} />
        <input placeholder="總分鐘數" type="number" value={n.minutes} onChange={e => setN({ ...n, minutes: e.target.value })} style={I} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <label style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
            <input type="checkbox" checked={n.hasNS} onChange={e => setN({ ...n, hasNS: e.target.checked })} />含NS
          </label>
          <button onClick={add} style={{ background: "#1a1a2e", border: "1px solid #34d399", borderRadius: 6, color: "#34d399", padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>＋</button>
        </div>
      </div>
    </div>
  );
}

function Form({ entry, onSave, onCancel, onDelete }) {
  const [f, setF] = useState(entry);
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  const I = { background: "#111118", border: "1px solid #2a2a3a", borderRadius: 8, color: "#ddd", padding: "8px 10px", fontSize: 13, width: "100%", boxSizing: "border-box" };
  const L = { fontSize: 11, color: "#666", marginBottom: 3, display: "block" };
  const G = { marginBottom: 12 };
  const R2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 };

  return (
    <div style={{ padding: "16px 14px", background: "#08080d", minHeight: "100vh", fontFamily: "'Noto Sans TC',sans-serif", color: "#e0e0e8" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button onClick={onCancel} style={{ background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer" }}>← 返回</button>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{f.id ? "編輯" : "新增"}</span>
        <button onClick={() => onSave(f)} style={{ background: "#f472b6", border: "none", borderRadius: 8, color: "#fff", padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>儲存</button>
      </div>

      <div style={G}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8 }}>
          <div><label style={L}>名稱</label><input value={f.name} onChange={e => s("name", e.target.value)} style={I} /></div>
          <div><label style={L}>等級</label><select value={f.grade} onChange={e => s("grade", e.target.value)} style={{ ...I, appearance: "auto" }}>{GRADES.map(g => <option key={g}>{g}</option>)}</select></div>
          <div><label style={L}>外觀</label><select value={f.looks} onChange={e => s("looks", e.target.value)} style={{ ...I, appearance: "auto" }}>{LOOKS_LIST.map(g => <option key={g}>{g}</option>)}</select></div>
        </div>
      </div>
      <div style={G}><div style={R2}>
        <div><label style={L}>標籤</label><input value={f.tag} onChange={e => s("tag", e.target.value)} placeholder="泰妹 · 桃園" style={I} /></div>
        <div><label style={L}>身材</label><input value={f.stats} onChange={e => s("stats", e.target.value)} placeholder="167/45/D" style={I} /></div>
      </div></div>
      <div style={G}><label style={L}>連結</label><input value={f.link} onChange={e => s("link", e.target.value)} placeholder="https://..." style={I} /></div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#f472b6", marginBottom: 8, marginTop: 16 }}>定價</div>
      <div style={G}><label style={L}>短鐘（分鐘 / 價格）</label><div style={R2}>
        <input type="number" value={f.shortMin} onChange={e => s("shortMin", Number(e.target.value))} style={I} />
        <input type="number" value={f.shortPrice} onChange={e => s("shortPrice", Number(e.target.value))} style={I} />
      </div></div>
      <div style={G}><label style={L}>長鐘（分鐘 / 價格）⭐ 計分基準</label><div style={R2}>
        <input type="number" value={f.longMin} onChange={e => s("longMin", Number(e.target.value))} style={I} />
        <input type="number" value={f.longPrice} onChange={e => s("longPrice", Number(e.target.value))} style={I} />
      </div></div>
      <div style={G}><label style={L}>特長（選填）</label><div style={R2}>
        <input type="number" value={f.specialMin} onChange={e => s("specialMin", e.target.value)} placeholder="分鐘" style={I} />
        <input type="number" value={f.specialPrice} onChange={e => s("specialPrice", e.target.value)} placeholder="價格" style={I} />
      </div></div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", marginBottom: 8, marginTop: 16 }}>服務內容（逗號分隔）</div>
      <div style={G}><textarea value={f.servicesText} onChange={e => s("servicesText", e.target.value)} placeholder="乳交,69,殘廢澡,LG,親嘴,無套BJ" rows={3} style={{ ...I, resize: "vertical", lineHeight: 1.5 }} /></div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#34d399", marginBottom: 8, marginTop: 16 }}>額外發數</div>
      <div style={G}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {[["none","無"],["NS","NS"],["2S","2S"]].map(([v, l]) => (
            <button key={v} onClick={() => s("extraShotType", v)} style={{
              flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${f.extraShotType === v ? "#34d399" : "#2a2a3a"}`,
              background: f.extraShotType === v ? "#1a1a2e" : "#0a0a10",
              color: f.extraShotType === v ? "#34d399" : "#888",
            }}>{l}</button>
          ))}
        </div>
        {f.extraShotType !== "none" && <div><label style={L}>加購價格</label><input type="number" value={f.extraShotPrice} onChange={e => s("extraShotPrice", e.target.value)} placeholder="500" style={I} /></div>}
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24", marginBottom: 8, marginTop: 16 }}>超值方案</div>
      <DealForm deals={f.deals} onChange={d => s("deals", d)} />

      {f.id && <button onClick={() => onDelete(f.id)} style={{ width: "100%", marginTop: 28, padding: 12, background: "#1a0a0a", border: "1px solid #f43f5e40", borderRadius: 10, color: "#f43f5e", fontSize: 13, cursor: "pointer" }}>刪除此筆</button>}
      <div style={{ height: 40 }} />
    </div>
  );
}

export default function App() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState("list");
  const [edit, setEdit] = useState(null);
  const [exp, setExp] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { const d = load(); setEntries(d && d.length ? d : SEED); setReady(true); }, []);
  useEffect(() => { if (ready) persist(entries); }, [entries, ready]);

  const doSave = (f) => {
    const e = { ...f, id: f.id || `e${Date.now()}`, shortMin: Number(f.shortMin), shortPrice: Number(f.shortPrice), longMin: Number(f.longMin), longPrice: Number(f.longPrice) };
    if (!e.name || !e.shortMin || !e.shortPrice || !e.longMin || !e.longPrice) return;
    setEntries(p => { const i = p.findIndex(x => x.id === e.id); return i >= 0 ? p.map((x, j) => j === i ? e : x) : [...p, e]; });
    setView("list"); setEdit(null);
  };
  const doDel = (id) => { setEntries(p => p.filter(x => x.id !== id)); setView("list"); setEdit(null); };

  if (!ready) return <div style={{ minHeight: "100vh", background: "#08080d", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>載入中...</div>;
  if (view === "form") return <Form entry={edit || { ...EMPTY }} onSave={doSave} onCancel={() => { setView("list"); setEdit(null); }} onDelete={doDel} />;

  const scored = calcScores(entries);
  const ranked = [...scored].sort((a, b) => b.total - a.total);
  const maxT = ranked.length ? ranked[0].total : 1;
  const medal = (i) => ["#fbbf24","#94a3b8","#cd7f32"][i] || "#444";

  const dims = [
    { key: "a", label: "時間單價", max: 25 },
    { key: "b", label: "服務豐富", max: 10 },
    { key: "c", label: "超值方案", max: 15 },
    { key: "d", label: "額外發數", max: 25 },
    { key: "e", label: "外觀", max: 25 },
  ];

  const radarData = dims.map(dim => {
    const obj = { dim: dim.label };
    scored.forEach(s => { obj[s.name] = (s[dim.key] / dim.max) * 10; });
    return obj;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#08080d", color: "#e0e0e8", fontFamily: "'Noto Sans TC',sans-serif", padding: "16px 14px", maxWidth: 540, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: "#f472b6", letterSpacing: 4, fontWeight: 500 }}>QUANTIFIED</div>
          <div style={{ fontSize: 20, fontWeight: 900, background: "linear-gradient(135deg,#f472b6,#a78bfa,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CP 值評分系統</div>
        </div>
        <button onClick={() => { setEdit(null); setView("form"); }} style={{ background: "linear-gradient(135deg,#f472b6,#a78bfa)", border: "none", borderRadius: 10, color: "#fff", padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>＋ 新增</button>
      </div>

      <div style={{ fontSize: 9, color: "#444", fontFamily: "monospace", lineHeight: 2, padding: "8px 10px", background: "#0c0c14", borderRadius: 8, marginBottom: 12 }}>
        <span style={{ color: "#f472b6" }}>A</span> 時間單價=(最低長鐘均價/長鐘均價)×25<br/>
        <span style={{ color: "#a78bfa" }}>B</span> 服務=(項數/最多)×10{"　"}
        <span style={{ color: "#fbbf24" }}>C</span> 超值=折扣(≤9)+NS(6) 排除包夜<br/>
        <span style={{ color: "#34d399" }}>D</span> NS→25 2S≤500→10 ≤1000→5{"　"}
        <span style={{ color: "#fb923c" }}>E</span> 外觀 S→25 A+→15 A→6<br/>
        <span style={{ color: "#888" }}>滿分 100 = A25 + B10 + C15 + D25 + E25</span>
      </div>

      {scored.length >= 2 && (
        <div style={{ background: "#0d0d14", borderRadius: 14, padding: "8px 0 0", marginBottom: 12, border: "1px solid #1a1a28" }}>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="62%">
              <PolarGrid stroke="#1e1e2e" />
              <PolarAngleAxis dataKey="dim" tick={{ fill: "#777", fontSize: 10 }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
              {scored.map(s => <Radar key={s.name} name={s.name} dataKey={s.name} stroke={s.color} fill={s.color} fillOpacity={0.1} strokeWidth={2} dot={{ r: 2, fill: s.color }} />)}
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {ranked.map((x, i) => {
        const isExp = exp === x.id;
        const pct = (x.total / maxT) * 100;
        return (
          <div key={x.id} style={{ background: `linear-gradient(170deg,${x.color}06,#0d0d14)`, border: `1px solid ${isExp ? x.color + "50" : x.color + "20"}`, borderRadius: 12, padding: "12px 12px 10px", marginBottom: 8, transition: "all 0.15s" }}>
            <div onClick={() => setExp(isExp ? null : x.id)} style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: medal(i), minWidth: 18 }}>#{i + 1}</span>
                <span style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: x.color + "20", color: x.color, fontWeight: 700 }}>{x.grade}</span>
                <span style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: "#fbbf2420", color: "#fbbf24", fontWeight: 700 }}>👁 {x.looks}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: x.color }}>{x.name}</span>
                <span style={{ fontSize: 10, color: "#555", flex: 1, textAlign: "right", marginRight: 4 }}>{x.tag}</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: x.color, fontFamily: "monospace" }}>{x.total}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: "#444", minWidth: 48 }}>{x.stats}</span>
                <div style={{ flex: 1, height: 4, background: "#1a1a24", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: x.color, borderRadius: 2, transition: "width 0.4s" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {dims.map(dim => {
                  const v = x[dim.key];
                  const hi = (dim.key === "d" && v >= 20) || (dim.key === "e" && v >= 25);
                  return <span key={dim.key} style={{ fontSize: 10, padding: "2px 5px", borderRadius: 4, background: hi ? x.color + "15" : "#0a0a10", border: `1px solid ${hi ? x.color + "35" : "#1e1e28"}`, color: hi ? x.color : "#777" }}>{dim.label.slice(0, 2)} {v}/{dim.max}</span>;
                })}
              </div>
            </div>

            {isExp && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1a1a28" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
                  <div style={{ background: "#08080d", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, color: "#555" }}>短鐘</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{x.shortMin}分/${x.shortPrice}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>{Math.round(x.shortPrice / x.shortMin)}/分</div>
                  </div>
                  <div style={{ background: "#08080d", borderRadius: 8, padding: "8px 10px", border: `1px solid ${x.color}30` }}>
                    <div style={{ fontSize: 10, color: x.color }}>長鐘 ⭐計分</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{x.longMin}分/${x.longPrice}</div>
                    <div style={{ fontSize: 10, color: x.color }}>{Math.round(x.ppm)}/分</div>
                  </div>
                </div>

                {[
                  ["A 時間單價", `長鐘${x.ppm.toFixed(1)}/分 → ${x.a}`, 25],
                  ["B 服務豐富", `${x.svc.length}項 → ${x.b}`, 10],
                  ["C 超值方案", `折${x.bestDisc}%(${x.cDisc}) + NS(${x.cNS}) = ${x.c}`, 15],
                  ["D 額外發數", x.dL, 25],
                  ["E 外觀評分", `${x.looks} → ${x.e}`, 25],
                ].map(([l, v, max]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 11 }}>
                    <span style={{ color: "#666" }}>{l} <span style={{ color: "#333" }}>/{max}</span></span>
                    <span style={{ color: x.color, fontWeight: 600, fontFamily: "monospace", fontSize: 10 }}>{v}</span>
                  </div>
                ))}

                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 10, color: "#555", marginBottom: 4 }}>服務 ({x.svc.length})</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {x.svc.map(s => <span key={s} style={{ fontSize: 10, background: "#111118", padding: "2px 6px", borderRadius: 4, color: "#888" }}>{s}</span>)}
                  </div>
                </div>

                {x.deals.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: "#555", marginBottom: 4 }}>超值方案 ({x.deals.length})</div>
                    {x.deals.map((d, j) => {
                      const norm = d.minutes * x.ppm;
                      const disc = norm > 0 ? ((norm - d.price) / norm * 100).toFixed(1) : 0;
                      const ex = d.name.includes("包夜");
                      return (
                        <div key={j} style={{ fontSize: 10, color: ex ? "#333" : "#777", padding: "2px 0" }}>
                          <span style={{ color: ex ? "#444" : x.color }}>{d.name}</span>
                          <span style={{ color: ex ? "#333" : "#555" }}> · ${d.price} · {d.minutes}分 · 折{disc}%</span>
                          {d.hasNS && <span style={{ color: "#34d399" }}> NS</span>}
                          {ex && <span style={{ color: "#333" }}> (不計分)</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {x.link && <a href={x.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 10, color: "#555", marginTop: 8, textDecoration: "none" }}>🔗 {x.link.replace("https://", "").slice(0, 40)}...</a>}

                <div style={{ borderTop: "1px solid #1a1a28", marginTop: 10, paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#888" }}>Total /100</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: x.color, fontFamily: "monospace" }}>{x.a}+{x.b}+{x.c}+{x.d}+{x.e} = {x.total}</span>
                </div>

                <button onClick={() => { setEdit(entries.find(e => e.id === x.id)); setView("form"); }} style={{ width: "100%", marginTop: 10, padding: 8, background: "#1a1a2e", border: `1px solid ${x.color}40`, borderRadius: 8, color: x.color, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>編輯</button>
              </div>
            )}
          </div>
        );
      })}

      {entries.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#444" }}><div style={{ fontSize: 28, marginBottom: 8 }}>🈳</div><div style={{ fontSize: 13 }}>還沒有資料，點右上角新增</div></div>}

      <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 24 }}>
        <button onClick={() => { setEntries(SEED); setExp(null); }} style={{ flex: 1, padding: 10, background: "#0c0c14", border: "1px solid #1e1e28", borderRadius: 8, color: "#555", fontSize: 11, cursor: "pointer" }}>重置預設</button>
        <div style={{ flex: 1, padding: 10, background: "#0c0c14", border: "1px solid #1e1e28", borderRadius: 8, color: "#555", fontSize: 11, textAlign: "center" }}>共 {entries.length} 筆</div>
      </div>
    </div>
  );
}
